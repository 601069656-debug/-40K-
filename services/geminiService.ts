import { GoogleGenerativeAI, ChatSession, Content, GenerateContentResponse, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { INITIAL_SYSTEM_INSTRUCTION } from "../constants";
import { Message, LogSummary, NPCProfile, NPCRecord, Character } from "../types";
import { FULL_BESTIARY } from '../lib/knowledge/bestiary';

let chatSession: ChatSession | null = null;
let currentModelId = 'gemini-3-flash-preview';

const defaultSafetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const getAIClient = (isCustom: boolean = false) => {
  if (isCustom) {
    const customKey = localStorage.getItem('thirdPartyApiKey');
    if (!customKey) {
      throw new Error("自定义 API Key 未配置。请在设置中填写您的 API Key。");
    }
    return new GoogleGenerativeAI(customKey);
  } else {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      console.error("API Key missing. Checked GEMINI_API_KEY and API_KEY.");
      throw new Error("API Key not found. Please ensure it is set in the environment.");
    }
    return new GoogleGenerativeAI(apiKey);
  }
};

const extractJSON = (text: string): any => {
  if (!text) return null;
  
  let cleanText = text;
  
  // 1. Remove markdown code blocks if present
  const mdMatch = cleanText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (mdMatch && mdMatch[1]) {
    cleanText = mdMatch[1];
  } else {
    // 3. Find the first { or [ and last } or ] if no markdown block
    const firstBrace = cleanText.indexOf('{');
    const firstBracket = cleanText.indexOf('[');
    let firstCharIndex = -1;
    
    if (firstBrace !== -1 && firstBracket !== -1) {
      firstCharIndex = Math.min(firstBrace, firstBracket);
    } else if (firstBrace !== -1) {
      firstCharIndex = firstBrace;
    } else if (firstBracket !== -1) {
      firstCharIndex = firstBracket;
    }
    
    if (firstCharIndex !== -1) {
      cleanText = cleanText.substring(firstCharIndex);
    }
    
    // Find the last } or ]
    const lastBrace = cleanText.lastIndexOf('}');
    const lastBracket = cleanText.lastIndexOf(']');
    let lastCharIndex = -1;
    
    if (lastBrace !== -1 && lastBracket !== -1) {
      lastCharIndex = Math.max(lastBrace, lastBracket);
    } else if (lastBrace !== -1) {
      lastCharIndex = lastBrace;
    } else if (lastBracket !== -1) {
      lastCharIndex = lastBracket;
    }
    
    if (lastCharIndex !== -1) {
      cleanText = cleanText.substring(0, lastCharIndex + 1);
    }
  }
  
  if (!cleanText) return null;

  // 4. Try to parse
  try {
    return JSON.parse(cleanText);
  } catch (e) {
    // Try to fix common AI JSON errors
    try {
      let fixed = cleanText
        .replace(/\/\/.*$/gm, '') // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/,\s*([\]}])/g, '$1') // Remove trailing commas
        .replace(/"\s*"/g, '", "') // Fix missing commas in arrays
        .replace(/}\s*{/g, '}, {'); // Fix missing commas between objects
        
      // Replace literal newlines and tabs with spaces
      fixed = fixed.replace(/[\n\r\t]/g, ' ');
      
      return JSON.parse(fixed);
    } catch (e2) {
      // If it's truncated, try to close open structures
      try {
        let truncated = cleanText;
        // Remove trailing incomplete strings
        truncated = truncated.replace(/"[^"]*$/, '');
        // Remove trailing commas
        truncated = truncated.replace(/,\s*$/, '');
        
        // Count open braces and brackets
        let openBraces = 0;
        let openBrackets = 0;
        let inString = false;
        let escape = false;
        
        for (let i = 0; i < truncated.length; i++) {
          const char = truncated[i];
          if (escape) {
            escape = false;
            continue;
          }
          if (char === '\\') {
            escape = true;
            continue;
          }
          if (char === '"') {
            inString = !inString;
            continue;
          }
          if (!inString) {
            if (char === '{') openBraces++;
            else if (char === '}') openBraces = Math.max(0, openBraces - 1);
            else if (char === '[') openBrackets++;
            else if (char === ']') openBrackets = Math.max(0, openBrackets - 1);
          }
        }
        
        // Dynamically build the suffix to close open structures
        // If we are inside an array of objects, we might need to close the object first, then the array.
        // The previous logic just appended } and ] based on counts, but order matters.
        // A common truncation is `[ { "a": 1 }, { "b": 2 ` -> needs `} ]`
        let suffix = '';
        if (openBraces > 0) {
          suffix += '}';
        }
        if (openBrackets > 0) {
          suffix += ']';
        }
        
        try {
          return JSON.parse(truncated + suffix);
        } catch (e3) {
          // If dynamic suffix fails, try a few common combinations just in case
          const combinations = [
            ']', '}', ']}', '}]', '}]}', '}}', ']]', '}]}]', '"} ]', '"}', '"]'
          ];
          
          for (const comb of combinations) {
            try {
              return JSON.parse(truncated + comb);
            } catch (e4) {}
          }
        }
        
        // If all fails, throw error with raw text for debugging
        console.error("Failed to parse JSON even after cleanup and truncation fix:", cleanText);
        throw new Error(`JSON解析失败。AI返回的原始文本: ${cleanText.substring(0, 200)}...`);
      } catch (e4) {
        throw e;
      }
    }
  }
};

export const initializeGame = async (history?: Message[], modelId: string = 'gemini-3-flash-preview', currentDate?: string): Promise<void> => {
  currentModelId = modelId;
  const isCustomGemini = modelId === 'gemini-custom';
  const isCustomOpenAi = modelId === 'openai-custom';
  
  let formattedHistory: Content[] | undefined = undefined;

  if (history && history.length > 0) {
    // 1. 增加历史记录限制，Gemini 3.1 Pro 支持极长上下文，放宽到 50 条
    // 同时确保前 4 条（通常是开场白和初始设定）始终保留，中间部分如果过长再进行切片
    let recentHistory: Message[];
    if (history.length > 50) {
      // 保留前 4 条（初始化指令和开场）以及最近的 46 条
      recentHistory = [...history.slice(0, 4), ...history.slice(-46)];
    } else {
      recentHistory = history;
    }

    // 2. 构建发送给 AI 的历史记录 (深度净化)
    const rawFormattedHistory = recentHistory.map((msg) => {
      // 提取消息中的日期 (适配第 41 个千年)
      const dateMatch = msg.content.match(/\[(M\d+\.\d+[^\]]*)\]/);
      const dateLabel = dateMatch ? `[历史片段 - ${dateMatch[1]}] ` : '';
      
      // 深度净化内容：移除冗余的结构化 JSON 数据和重复的系统提示/状态快照
      // 我们在给 AI 历史记录时折叠这些块，防止历史记录体积恶性膨胀
      const cleanedContent = msg.content
        // 移除各种标签块
        .replace(/<sector_monitor>[\s\S]*?<\/sector_monitor>/gi, '[SECTOR_SYNCED]')
        .replace(/\[NPC_SYNC_START\][\s\S]*?\[NPC_SYNC_END\]/gi, '[NPC_SYNCED]')
        .replace(/<system_state>[\s\S]*?<\/system_state>/gi, '[STATE_SYNCED]')
        .replace(/<battle_log>[\s\S]*?<\/battle_log>/gi, '[BATTLE_SYNCED]')
        .replace(/<campaign_log>[\s\S]*?<\/campaign_log>/gi, '[CAMPAIGN_SYNCED]')
        .replace(/<unit_registry\b[^>]*>[\s\S]*?<\/unit_registry\s*>/gi, '[UNIT_SYNCED]')
        .replace(/<system_data\b[^>]*>[\s\S]*?<\/system_data\s*>/gi, '[DATA_SYNCED]')
        // 移除重复的 IDENTITY LOCK 和状态快照提示 (这是最占 Token 的部分)
        .replace(/\*\*\[IDENTITY LOCK\]\*\*[\s\S]*?<system_metadata>[\s\S]*?<\/system_metadata>/gi, '[CORE_STATUS_SNAPSHOT]')
        .replace(/\[System Note: Current Sector Time Reference\][\s\S]*?【当前日期：[^\]]*】/gi, '[TIME_SYNCED]');
      
      return {
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: dateLabel + cleanedContent.trim() }]
      };
    });

    // 修复：确保 history 以 user 角色开始
    const firstUserIdx = rawFormattedHistory.findIndex(m => m.role === 'user');
    if (firstUserIdx === -1) {
       // 没有 user 消息，可能是空对话或只有 model 消息，这种情况下我们不需要 history，或者添加个 dummy
       formattedHistory = undefined;
    } else {
       formattedHistory = rawFormattedHistory.slice(firstUserIdx);
    }
  }

  // 构建动态系统指令，注入当前绝对日期锚点
  const timelineLock = currentDate ? `
\n[System Note: 当前日期参考 (Current Date Reference)]
【当前战区日期】: ${currentDate}
1. 请确保您的叙事逻辑与当前日期保持连贯。
2. 历史记录中早于此日期的事件为过去发生的事实。
3. 如果玩家的行为消耗了大量时间（如长途跋涉或深度训练），请根据实际消耗在回复中推进日期。
4. 回复的第一行必须是：【当前日期：[纪年与日期], [标准泰拉时间]】。
` : '';

  if (!isCustomOpenAi) {
    const ai = getAIClient(isCustomGemini);
    const actualModelId = isCustomGemini ? (localStorage.getItem('thirdPartyModelName') || 'gemini-3.1-pro-preview') : modelId;
    
    // Configure model
    const model = ai.getGenerativeModel({
      model: actualModelId,
      systemInstruction: INITIAL_SYSTEM_INSTRUCTION + timelineLock,
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
      },
      safetySettings: defaultSafetySettings,
    });

    chatSession = model.startChat({
      history: formattedHistory,
    });
    console.log(`Chat session initialized with model: ${actualModelId}`);
  } else {
    chatSession = null;
    console.log(`Initializing custom AI model: (using proxy)`);
  }
};

export const switchSessionModel = async (modelId: string, history: Message[], currentDate?: string): Promise<void> => {
  // Re-initialize with existing history but new model
  await initializeGame(history, modelId, currentDate);
};

export const sendMessage = async (
  message: string,
  onChunk?: (text: string) => void,
  stage?: string,
  unlockedTrueNames?: string[],
  history?: Message[],
  currentDate?: string,
  timeline?: string,
  modelOverride?: string
): Promise<{ text: string; groundingMetadata?: any }> => {
  // 注入当前绝对日期锚点，允许线性流逝
  const datePrompt = currentDate ? `
[System Note: 当前战区时间 (Current Sector Time Reference)]
【当前战区日期】: ${currentDate}
1. 请确保您的叙事逻辑与当前日期保持连贯。早于此日期的事件均为过去发生的历史。
2. **[时间流逝准则]**：绝对禁止拒绝时间流逝。如果玩家的行为消耗了大量时间（如特训、赶路、亚空间航行），你必须根据实际消耗在回复中推进日期。
3. **[第一行强制宣告]**：你回复的第一行必须宣告最新时刻：【当前日期：[纪年与日期，必须 ≥ ${currentDate}]，[标准泰拉时间]】。
` : "";
  const finalMessage = `${datePrompt}\n\n${message}`;

  try {
    const effectiveModelId = modelOverride || currentModelId;
    const isCustom = effectiveModelId === 'openai-custom';
    
    let fullText = "";
    let groundingMetadata: any = undefined;

    if (isCustom) {
      console.log("Starting fetch to /api/proxy with model:", effectiveModelId);
      
      // Prepare history for proxy
      let formattedHistory: Content[] | undefined = undefined;
      if (history && history.length > 0) {
        let recentHistory: Message[];
        if (history.length > 200) {
          recentHistory = [...history.slice(0, 4), ...history.slice(-196)];
        } else {
          recentHistory = history;
        }
        formattedHistory = recentHistory.map((msg) => {
          const dateMatch = msg.content.match(/\[(M\d+\.\d+[^\]]*)\]/);
          const dateLabel = dateMatch ? `[历史片段 - ${dateMatch[1]}] ` : '';
          const cleanedContent = msg.content
            .replace(/<sector_monitor>[\s\S]*?<\/sector_monitor>/gi, '[SECTOR_ARCHIVE_SYNCED]')
            .replace(/\[NPC_SYNC_START\][\s\S]*?\[NPC_SYNC_END\]/gi, '[NPC_PROFILE_SYNCED]')
            .replace(/<system_state>[\s\S]*?<\/system_state>/gi, '[STATE_ENGINE_SYNCED]')
            .replace(/<battle_log>[\s\S]*?<\/battle_log>/gi, '[LOGISTICS_CALCULATION_SYNCED]')
            .replace(/<historical_state_monitor>[\s\S]*?<\/historical_state_monitor>/gi, '[CHRONICLE_MONITOR_SYNCED]')
            .replace(/<unit_registry\b[^>]*>[\s\S]*?<\/unit_registry\s*>/gi, '[UNIT_REGISTRY_SYNCED]')
            .replace(/<officer_registry\b[^>]*>[\s\S]*?<\/officer_registry\s*>/gi, '[OFFICER_REGISTRY_SYNCED]')
            .replace(/<warlord_registry\b[^>]*>[\s\S]*?<\/warlord_registry\s*>/gi, '[WARLORD_REGISTRY_SYNCED]')
            .replace(/<hero_registry\b[^>]*>[\s\S]*?<\/hero_registry\s*>/gi, '[HERO_REGISTRY_SYNCED]')
            .replace(/<system_data\b[^>]*>[\s\S]*?<\/system_data\s*>/gi, '[SYSTEM_DATA_SYNCED]')
            .replace(/<gaia_resource_monitor\b[^>]*>[\s\S]*?<\/gaia_resource_monitor\s*>/gi, '[GAIA_RESOURCE_MONITOR_SYNCED]');
          return {
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: dateLabel + cleanedContent.trim() }]
          };
        });
      }

      const body: any = {
        provider: 'openai',
        model: effectiveModelId,
        contents: formattedHistory ? [...formattedHistory, { role: 'user', parts: [{ text: finalMessage }] }] : finalMessage,
        config: {
          systemInstruction: INITIAL_SYSTEM_INSTRUCTION,
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
          safetySettings: defaultSafetySettings,
        },
        customApiKey: localStorage.getItem('thirdPartyApiKey'),
        customBaseUrl: localStorage.getItem('thirdPartyBaseUrl'),
        customModelName: localStorage.getItem('thirdPartyModelName')
      };

      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        let errorMsg = response.statusText;
        try {
          const errorJson = await response.json();
          if (errorJson.error) {
            errorMsg = errorJson.error;
          }
        } catch (e) {}
        throw new Error(`Proxy error: ${errorMsg}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          
          let newlineIndex;
          while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
            const line = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);
            
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              let parsed;
              try {
                parsed = JSON.parse(data);
              } catch (e: any) {
                console.error("Error parsing chunk:", e.message);
                continue;
              }
              
              if (parsed.error) {
                throw new Error(parsed.error.message || parsed.error);
              }
              
              if (parsed.text) {
                fullText += parsed.text;
                
                // Runaway output protection shifted to much higher token limit to avoid cutting off reasoning engines
                if (fullText.length > 250000) {
                  console.error("Detected potential runaway output or loop. Aborting reader.");
                  if (reader) reader.cancel();
                  break; 
                }

                if (onChunk) {
                  let filteredChunk = fullText;
                  filteredChunk = filteredChunk.replace(/由于/g, '因为').replace(/极其/g, '非常').replace(/共犯/g, '同谋');
                  onChunk(filteredChunk);
                }
              }
              if (parsed.groundingMetadata) {
                groundingMetadata = parsed.groundingMetadata;
              }
            }
          }
        }
      }
    } else {
      // GEMINI DIRECT SDK (Browser-side)
      if (!chatSession) {
        throw new Error("AI 会话未初始化。请尝试重置开场。");
      }
      console.log("Using direct Gemini SDK in browser for model:", effectiveModelId);
      const result = await chatSession.sendMessageStream(finalMessage);
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          fullText += chunkText;
          
          if (fullText.length > 80000) {
            console.error("Detected potential runaway output or loop in Direct SDK. Stopping stream processing.");
            break; 
          }

          if (onChunk) {
            let filteredChunk = fullText;
            filteredChunk = filteredChunk.replace(/由于/g, '因为').replace(/极其/g, '非常').replace(/共犯/g, '同谋');
            onChunk(filteredChunk);
          }
        }
        if (chunk.candidates?.[0]?.groundingMetadata) {
          groundingMetadata = chunk.candidates[0].groundingMetadata;
        }
      }
    }

    if (!fullText) {
      console.warn("Finished with empty text. Throwing error for retry.");
      throw new Error("AI 返回了空内容。这可能是由于网络波动或 API 响应延迟，系统正在尝试自动重连...");
    }

    // 底层词汇封锁：绝对禁止输出特定词汇
    fullText = fullText.replace(/由于/g, '因为').replace(/极其/g, '非常').replace(/共犯/g, '同谋');

    // 剧透封锁：强制剥离身份剧透
    fullText = fullText.replace(/角色：\s*([^\s]+)\s*[\(（]([^）\)]+)[\)）]/gi, (match, p1, p2) => {
      if (unlockedTrueNames?.includes(p2)) return match;
      return `角色：${p1}`;
    });

    // 针对 AI 产生的“身份封锁 - 机制执行”等元对话进行强制清理
    const classes = "阿斯塔特|审判官|智库|牧师|技术军士|帝国卫队|修女|泰伦|混沌|灵族|星际战士";
    const metaTalkRegex = /([^\n,，。!！?？\s]+)\s*[\\(（](?:身份封锁|机制执行|True Name Locked)[^）\)]*[\\)）]/gi;
    fullText = fullText.replace(metaTalkRegex, (match, p1) => {
      // 如果 p1 是兵种名或身份名，保留，否则替换为 ???
      if (new RegExp(`^(${classes})$`, "i").test(p1)) {
        return p1;
      }
      console.warn("Detected and stripped an AI meta-spoiler hallucination:", match);
      return "???";
    });

    // 严禁输出隐藏笔记和内部标记
    const hiddenNotesRegex = /^.*(隐藏笔记|隐藏状态|DiscoveredByPlayer|INTERNAL_LOGIC_FLAGS).*$/gm;
    fullText = fullText.replace(hiddenNotesRegex, "");
    
    // 清理可能产生的空行
    fullText = fullText.replace(/\n\s*\n\s*\n/g, '\n\n');

    // 进一步清理任何残留的元对话标签（如单独出现的括号提示）
    fullText = fullText.replace(/[\\(（](?:真名封锁|机制执行|True Name Locked|Spoiler Protected)[^）\)]*[\\)）]/gi, "");

    // 针对旁白、【现状分析】、Status 中的显式真名泄露进行二次清理
    // 增加对“真名：”、“身份：”、“Identity：”等字段的深度清理，确保其在未解锁时显示为 ???
    const spoilerFields = ["身份", "史实关联", "Identity", "真实身份"];
    if (Array.isArray(spoilerFields)) {
      spoilerFields.forEach(field => {
        const fieldRegex = new RegExp(`${field}[:：]\\s*[^\\n,，。!！?？\\)\\]\\}]+`, "gi");
        fullText = fullText.replace(fieldRegex, (match) => {
          // 如果已经包含 ??? 或 未知，则跳过
          if (match.includes('???') || match.includes('未知') || match.includes('Unknown') || match.includes('隐藏')) return match;
          
          // Check if true name is unlocked
          const trueName = match.split(/[:：]/)[1]?.trim();
          if (trueName && Array.isArray(unlockedTrueNames) && unlockedTrueNames.includes(trueName)) {
              return match; // Don't strip
          }

          // 检查是否是玩家自己的真名（这里简单处理，如果包含玩家名字则保留，但通常玩家名字在 Status 里是已知的）
          // 但为了保险，我们对 NPC 的记录进行更严格的清理
          console.warn(`Stripped explicit ${field} field:`, match);
          return `${field}: ???`;
        });
      });
    }

    // 10. 核心黑幕封锁 (Core Lore Blackout) - 运行时强制清理
    // 针对【现状分析】中的特定剧透词汇进行强制清理
    const analysisMatch = fullText.match(/【现状分析】[\s\S]*?(?=<details>|<\/narrative>|$)/);
    if (analysisMatch) {
      let analysisText = analysisMatch[0];
      
      // 0. 绝对结构清洗：移除所有非“客观观察”和“主观疑虑”的条目（如“- 当前阵营架构评估”）
      const analysisLines = analysisText.split('\n');
      const cleanedAnalysisLines = [];
      let isLookingAtLegalBullet = true;
      
      for (const line of analysisLines) {
        if (line.trim().startsWith('-')) {
          if (line.includes('客观观察') || line.includes('主观疑虑')) {
            isLookingAtLegalBullet = true;
            cleanedAnalysisLines.push(line);
          } else {
            console.warn("Stripped hallucinative analysis bullet point:", line);
            isLookingAtLegalBullet = false; // Drop this line and its continuations
          }
        } else {
          // If it's the heading "【现状分析】..." or continuation of a legal bullet
          if (line.includes('【现状分析】') || isLookingAtLegalBullet) {
            cleanedAnalysisLines.push(line);
          }
        }
      }
      analysisText = cleanedAnalysisLines.join('\n');

      // 1. 强制剥离行动建议 (Strip Action Suggestions)
      // 匹配“建议”、“应该”、“可以”、“打算”、“计划”等引导的句子
      const advicePatterns = [
        /建议[^。！?？]*[。！?？]/g,
        /应该[^。！?？]*[。！?？]/g,
        /或许可以[^。！?？]*[。！?？]/g,
        /可以尝试[^。！?？]*[。！?？]/g,
        /计划[^。！?？]*[。！?？]/g,
        /打算[^。！?？]*[。！?？]/g,
        /接下来[^。！?？]*(?:应该|可以|准备)[^。！?？]*[。！?？]/g
      ];
      advicePatterns.forEach(pattern => {
        analysisText = analysisText.replace(pattern, (match) => {
          console.warn("Stripped an action suggestion from Analysis:", match);
          return ""; // 直接移除建议性句子
        });
      });

      // 2. 增强型黑幕封锁 (Enhanced Lore Blackout)
      const forbiddenLore = [
        { term: "卡迪亚之战", replacement: "恐惧之眼的终极对决" },
        { term: "泰拉围攻", replacement: "神圣核心的决战" },
        { term: "首席智库", replacement: "战团中的贤智者" },
        { term: "机魂觉醒", replacement: "失控的机械意志" },
        { term: "亚空间风暴", replacement: "现实维度的撕裂" },
        { term: "历史走向", replacement: "机魂深处的预言" },
        { term: "剧情", replacement: "局势" },
        { term: "剧透", replacement: "机密泄露" },
        { term: "穿越者", replacement: "异质之魂" }
      ];
      
      // 检查这些词汇是否在【战区远征志 (Campaign Log)】或【异端与英雄档案 (Dramatis Personae)】中出现过
      const logSection = message.match(/\[System Note: 战区远征志 \(Campaign Log\)\]([\s\S]*?)(?=\[System Note:|$)/)?.[1] || "";
      const npcSection = message.match(/\[System Note: 异端与英雄档案 \(Dramatis Personae\)\]([\s\S]*?)(?=\[System Note:|$)/)?.[1] || "";
      const allowedContext = logSection + npcSection;

      forbiddenLore.forEach(({ term, replacement }) => {
        if (analysisText.includes(term) && !allowedContext.includes(term)) {
          console.warn(`Stripped forbidden lore from Analysis (not in logs): ${term}`);
          analysisText = analysisText.replace(new RegExp(term, 'g'), replacement);
        }
      });

      // 3. 针对分析中的 NPC 真名进行二次清理
      // 如果分析中出现了 NPCProfile 中的 name，但该 NPC 尚未 Discovered，则替换为代称
      if (Array.isArray(history)) {
        // 尝试从 message 中提取 NPC 列表（虽然有点复杂，但我们可以通过正则粗略提取）
        // 匹配格式: - NPC名称 [幕后]: ...
        const npcNamesMatch = message.match(/- ([^ ]+) \[幕后\]:/g);
        if (npcNamesMatch) {
          npcNamesMatch.forEach(m => {
            const name = m.match(/- ([^ ]+) \[幕后\]:/)?.[1];
            if (name && analysisText.includes(name)) {
              console.warn("Detected undiscovered NPC name in Analysis, stripping:", name);
              analysisText = analysisText.replace(new RegExp(name, 'g'), "那名在幕后活动的人物");
            }
          });
        }
      }
      
      fullText = fullText.replace(analysisMatch[0], analysisText);
    }

    // 针对 <details> 总结块中的时间线进行额外清理
    // 如果时间线中出现了类似 "Lancer (库丘林)" 的结构（即使没有括号），我们也尝试通过关键词匹配
    // 但由于我们没有真名列表，我们只能依靠模式匹配

    if (onChunk) {
      onChunk(fullText);
    }

    return {
      text: fullText,
      groundingMetadata
    };
  } catch (error: any) {
    console.error("Proxy error in geminiService:", error);
    throw error; // Re-throw so callers (like executeAiCall) can catch and retry
  }
};

export const resetGame = () => {
  chatSession = null;
};

/**
 * Normalizes a date/time string by stripping non-digit characters for comparison.
 */
export const normalizeDateTime = (s: string): string => {
  if (!s) return "";
  // Keep only digits
  return s.replace(/\D/g, '');
};

/**
 * Helper to extract location from timeline context based on timestamp.
 * Now exported and improved with fuzzy time matching and day-level fallback.
 */
export const getLogLocation = (timestamp: string, logs: LogSummary[]) => {
  if (!timestamp || !logs || logs.length === 0) return null;

  const targetDigits = normalizeDateTime(timestamp);
  if (targetDigits.length < 8) return null; // Need at least YYYYMMDD

  // We want to match the date and time parts
  const targetDateDigits = targetDigits.substring(0, 8); // YYYYMMDD
  const targetTimeDigits = targetDigits.length >= 12 ? targetDigits.substring(8, 12) : null; // HHMM

  let dayFallbackLocation = null;

  // Sort logs by timestamp descending to get the most recent location info first
  const sortedLogs = [...logs].sort((a, b) => b.timestamp - a.timestamp);

  for (const log of sortedLogs) {
    const logDateDigits = normalizeDateTime(log.date || "");
    const isLogDateMatch = logDateDigits.includes(targetDateDigits);

    if (log.days) {
      for (const day of log.days) {
        const dayDateDigits = normalizeDateTime(day.date || "");
        const dayTimeDigits = normalizeDateTime(day.time || "");

        // Check date match: either day.date has it, or the parent log.date has it
        const isDayDateMatch = dayDateDigits.includes(targetDateDigits) || isLogDateMatch;

        if (isDayDateMatch) {
          // 1. Try exact or partial time match
          if (targetTimeDigits && dayTimeDigits.includes(targetTimeDigits)) {
            if (day.location && day.location !== "地点" && day.location !== "未知地点") {
              return day.location;
            }
          }
          
          // 2. Store the first valid location found for this day as a fallback
          if (!dayFallbackLocation && day.location && day.location !== "地点" && day.location !== "未知地点") {
            dayFallbackLocation = day.location;
          }
        }
        
        // Fallback to parsing day.date string if it contains the full tag
        if (day.date && day.date.includes('[时间线：')) {
          const clean = day.date.replace('[时间线：', '').replace(']', '');
          const parts = clean.split('-');
          if (parts.length >= 5) {
            const tagDateDigits = normalizeDateTime(parts[0]);
            const tagTimeDigits = normalizeDateTime(parts[2]);
            
            if (tagDateDigits.includes(targetDateDigits) || isLogDateMatch) {
              const locationParts = parts.slice(3, -1);
              const loc = locationParts.join('-');
              if (loc && loc !== "地点" && loc !== "未知地点") {
                if (targetTimeDigits && tagTimeDigits.includes(targetTimeDigits)) {
                  return loc; // Exact time match from tag
                }
                if (!dayFallbackLocation) dayFallbackLocation = loc; // Day fallback from tag
              }
            }
          }
        }
      }
    }
  }
  return dayFallbackLocation;
};

export const formatNPCRecords = async (records: NPCRecord[], logs: LogSummary[]): Promise<NPCRecord[]> => {
  try {
    if (!records || records.length === 0) return [];

    // Include the full TimeFormat tag in the timeline context for AI to extract accurate location data
    const timelineContext = logs.map(l => {
      const days = (l.days || []);
      return days.map(d => {
        const events = (d.events || []).map(e => e.title).join(', ');
        // Use structured data if available, otherwise fallback to date string
        if (d.location && d.time) {
          return `[时间线：${d.date}-${d.time}-${d.location}] | 事件: ${events}`;
        }
        return `[时间线：${d.date}] | 事件: ${events}`;
      }).join('\n');
    }).join('\n');

    const prompt = `
[System Instruction: Format NPC Records]
You are a data formatter. Your task is to standardize the timestamps and locations for the provided NPC records.

**CRITICAL**: Every game log entry follows this format: [时间线：纪年-月份-日期-标准泰拉时间-地点-天气]. Use this as the definitive source of truth for time and location.

**Rules**:
1. Standardize "timestamp" to "纪年 月份 日期 标准泰拉时间". If no specific time exists, use "纪年 月份 日期".
2. **TIME SYSTEM (IMPERIAL STANDARD)**: 
   - Use Imperial Standard Time (Galactic Standard Time).
3. **LOCATION RULE (CRITICAL)**:
   - **MATCHING**: You MUST match the NPC record's "timestamp" (e.g., "2002年08月02日 15:30") with the corresponding [时间线：...] tag in the "Timeline Context".
   - **EXTRACTION**: Once matched, you MUST extract the "地点" (Location) part from the [时间线：...] tag EXACTLY as it is written.
   - **NO COMPRESSION**: You are STRICTLY FORBIDDEN from shortening, summarizing, or simplifying location names.
   - **OVERRIDE**: The extracted location from the log tag MUST override any existing location in the NPC record.
   - **INFERENCE**: If NO matching timestamp is found in the logs, try to infer the location from the "content" of the record itself (e.g., if the content mentions "London", the location should be "London").
   - **FALLBACK**: Only if NO matching timestamp is found in the logs and NO location can be inferred, use the original record's location.
   - **STRICTNESS**: Do NOT use vague locations like "地点" or "未知地点" if any specific location can be found or inferred.
3. **COMPLETENESS (ABSOLUTE REQUIREMENT)**: You MUST process and return **EVERY SINGLE RECORD** provided in the "Records to Format" section. DO NOT omit, truncate, or skip any records. If ${records.length} records are provided, ${records.length} records MUST be returned.
4. Do NOT change the "id" or "content" of the records.

**Timeline Context**:
${timelineContext || '无历史日志'}

**Records to Format (Total: ${records.length} records)**:
${records.map((r, i) => `${i+1}. [ID: ${r.id}] [Time: ${r.timestamp}] [Content: ${r.content}]`).join('\n')}

**Output Format (Strict JSON Array)**:
Return the exact array of records with updated "timestamp" and "location" fields.
**CRITICAL**: You MUST return ALL ${records.length} records.
[
  {
    "id": "...",
    "content": "...",
    "timestamp": "YYYY年MM月DD日 HH:MM",
    "location": "..."
  }
]
`;

    const config: any = {
      safetySettings: defaultSafetySettings,
      maxOutputTokens: 8192,
    };

    const isCustom = currentModelId === 'openai-custom';
    let text = "";

    if (isCustom) {
      const body: any = {
        provider: 'openai',
        model: currentModelId,
        contents: prompt,
        config,
        customApiKey: localStorage.getItem('thirdPartyApiKey'),
        customBaseUrl: localStorage.getItem('thirdPartyBaseUrl'),
        customModelName: localStorage.getItem('thirdPartyModelName')
      };

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const textResponse = await response.text();
      try {
        const data = JSON.parse(textResponse);
        if (!response.ok) {
          console.error(`API Error (${response.status}):`, data);
          throw new Error(`Generate error: ${response.status} ${data.error || response.statusText}`);
        }
        text = data.text;
      } catch (e) {
        console.error("Failed to parse JSON response from /api/generate. Raw response:", textResponse.substring(0, 1000));
        throw new Error("服务器返回了非 JSON 格式的数据。请检查控制台日志以获取更多信息。");
      }
    } else {
      const genAI = getAIClient(false);
      const model = genAI.getGenerativeModel({ model: currentModelId });
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: config,
        safetySettings: defaultSafetySettings,
      });
      text = result.response.text() || "";
    }

    let parsedData;
    try {
      parsedData = extractJSON(text);
    } catch (e) {
      console.warn("extractJSON failed, attempting regex fallback for array of objects", e);
      // Fallback: try to extract individual objects and reconstruct the array
      const objectRegex = /{[^{}]*"id"\s*:\s*"[^"]*"[^{}]*}/g;
      const matches = text.match(objectRegex);
      if (matches && matches.length > 0) {
        try {
          parsedData = JSON.parse(`[${matches.join(',')}]`);
        } catch (e2) {
          console.error("Regex fallback also failed", e2);
        }
      }
    }

    const mergedRecords = records.map(originalRecord => {
      const parsedRecord = (parsedData && Array.isArray(parsedData)) ? parsedData.find(p => p.id === originalRecord.id) : null;
      
      // Force location lookup from logs
      const logLocation = getLogLocation(originalRecord.timestamp, logs);
      
      const aiLocation = (parsedRecord && parsedRecord.location && parsedRecord.location !== "地点" && parsedRecord.location !== "未知地点") ? parsedRecord.location : null;
      
      // IF logLocation is null AND aiLocation is null, we MUST NOT set location to undefined.
      // We should keep the original location if it's not a placeholder, or try to infer it.
      let finalLocation = logLocation || aiLocation;
      
      if (!finalLocation) {
        if (originalRecord.location && originalRecord.location !== "地点" && originalRecord.location !== "未知地点") {
          finalLocation = originalRecord.location;
        } else {
          finalLocation = "未知地点";
        }
      }
      
      console.log(`[HARD-FIX] Record ${originalRecord.id}. Log: ${logLocation}, AI: ${parsedRecord?.location}, Final: ${finalLocation}`);
      
      return {
        ...originalRecord,
        timestamp: parsedRecord?.timestamp || originalRecord.timestamp,
        location: finalLocation,
      };
    });
    
    console.log(`Formatted ${mergedRecords.length} records.`);
    return mergedRecords;
  } catch (error) {
    console.error('Error in formatNPCRecords:', error);
    throw error;
  }
};

export const batchInferAppearances = async (profiles: any[], logs: any[]): Promise<{ id: string; hasAppeared: boolean; appearanceTime: string; appearanceLocation: string }[]> => {
  try {
    // Target profiles that have records but haven't had their appearance time inferred yet
    const profilesToAnalyze = profiles.filter(p => !p.appearanceTime && p.records && p.records.length > 0);
    if (profilesToAnalyze.length === 0) return [];

    const profilesContext = profilesToAnalyze.map(p => {
      return `ID: ${p.id}\nName: ${p.name}\nRecords:\n${(p.records || []).map((r: any) => `- ${r.timestamp || ''} ${r.location ? '@' + r.location : ''}: ${r.content}`).join('\n')}\n`;
    }).join('\n---\n');

    const prompt = `
[System Instruction: Batch Infer NPC Appearance]
You are an AI assistant helping to migrate old RPG save data. 
We have added new fields to track if an NPC has directly met the protagonist: "hasAppeared", "appearanceTime", and "appearanceLocation".
Based on the provided NPC records, determine these fields for each NPC.

**Rules**:
1. If the records indicate the NPC has directly interacted with, spoken to, or been in the same scene as the protagonist, set "hasAppeared" to true.
2. If the records only describe the NPC's actions elsewhere (group ensemble/群像剧视角) and they haven't met the protagonist, set "hasAppeared" to false.
3. If true, extract the earliest "appearanceTime" and "appearanceLocation" (formatted as "星域-星系-行星", e.g., "太阳星域-神圣泰拉") from their records. If location is unknown, use "未知地点". If time is unknown, use "未知时间".

**NPC Data**:
${profilesContext}

**Output Format (Strict JSON Array)**:
[
  {
    "id": "NPC_ID_HERE",
    "hasAppeared": false, // 注意：如果只是群像视角没和主角见过面，必须是false！不要全搞成true！
    "appearanceTime": "M41.999-第42天",
    "appearanceLocation": "太阳星域-神圣泰拉"
  }
]
`;

    const config: any = {
      safetySettings: defaultSafetySettings,
      maxOutputTokens: 8192,
    };

    const isCustom = currentModelId === 'openai-custom';
    let text = "";

    if (isCustom) {
      const body: any = {
        provider: 'openai',
        model: currentModelId,
        contents: prompt,
        config,
        customApiKey: localStorage.getItem('thirdPartyApiKey'),
        customBaseUrl: localStorage.getItem('thirdPartyBaseUrl'),
        customModelName: localStorage.getItem('thirdPartyModelName')
      };

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error(`Generate error: ${response.statusText}`);
      const data = await response.json();
      text = data.text;
    } else {
      const genAI = getAIClient(false);
      const model = genAI.getGenerativeModel({ model: currentModelId });
      const response = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: config,
      });
      text = response.response.text() || "";
    }

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch (error) {
    console.error('Error in batchInferAppearances:', error);
    throw error;
  }
};


export const analyzeNPCData = async (prompt: string, setting?: string): Promise<any> => {
  try {
    const body: any = {
      provider: currentModelId.startsWith('openai') || currentModelId.startsWith('gpt') ? 'openai' : 'gemini',
      model: currentModelId,
      contents: prompt,
      config: {
        maxOutputTokens: 2000,
        temperature: 0.1,
        responseMimeType: "application/json"
      },
      customApiKey: localStorage.getItem('thirdPartyApiKey'),
      customBaseUrl: localStorage.getItem('thirdPartyBaseUrl'),
      customModelName: localStorage.getItem('thirdPartyModelName')
    };

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`NPC analysis failed: ${response.statusText}`);
    const result = await response.json();
    return extractJSON(result.text);
  } catch (error) {
    console.error('Error in analyzeNPCData:', error);
    return null;
  }
};

export const synthesizeEntities = async (userAction: string, logs: LogSummary[], gaiaState?: any, character?: Character): Promise<string> => {
  try {
    const getLogContent = (l: LogSummary) => l.days.flatMap(d => d.events.map(e => e.description)).join('\n');
    const logsSummary = logs.slice(-2).map(l => getLogContent(l)).join('\n');

    const prompt = `
[System Instruction: Entity Synthesizer]
玩家核心档案: ${character?.name} / ${character?.lineage}
历史日志: ${logsSummary.substring(0, 500)}
玩家意图: ${userAction}

提取并合成即将在推演中产生的所有新实体（物品、敌人或NPC）。
`;

    const body: any = {
      provider: 'gemini',
      model: 'gemini-1.5-flash', // Always use a fast model for background tasks
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json'
      },
      customApiKey: localStorage.getItem('thirdPartyApiKey'),
      customBaseUrl: localStorage.getItem('thirdPartyBaseUrl'),
      customModelName: localStorage.getItem('thirdPartyModelName')
    };

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) return "";
    const result = await response.json();
    const parsed = extractJSON(result.text);

    if (parsed && parsed.entities && parsed.entities.length > 0) {
      return `\n\n【内置程序强制提取与生成插件】\n生成实体列表:\n\`\`\`json\n${JSON.stringify(parsed.entities, null, 2)}\n\`\`\`\n`;
    }
    return "";
  } catch (e) {
    console.warn("Synthesis plugin failed:", e);
    return "";
  }
};

export const generateLogEntry = async (messages: Message[], character: any, logs: LogSummary[], stageSettings?: string, npcProfiles: NPCProfile[] = []): Promise<LogSummary> => {
  try {
    // 1. Content Pruning - Essential to prevent oversized payloads
    const content = messages
      .slice(-15) 
      .map(m => `[${m.role === 'user' ? 'Player' : 'Game'}]: ${m.content.substring(0, 1500)}`)
      .join('\n\n');

    if (!content) throw new Error("选定内容为空。");

    // 2. Compact context
    const npcSummary = (npcProfiles || []).slice(0, 10).map(p => p.name).join(', ');
    const logSummaryText = (logs || []).slice(-2).map(l => l.summary || l.title).join('; ');

    const prompt = `
[System Instruction: 战锤40K战事纪要编撰协议]
你是一台忠诚的沉思者引擎。请根据以下选定的【战地记录】，提取生成一份符合 40K 哥特风格的结构化日志 JSON。

**上下文环境**:
- 主角: ${character?.name || '未知身份人员'}
- 战区活跃NPC: ${npcSummary || '无'}
- 前序事态: ${logSummaryText || '无'}

**待处理记录**:
${content}

**输出任务**:
1. 提取 3-5 个关键词 (keywords)。
2. 撰写一份 100 字左右的战况纪要 (summary)，风格需冷峻、严谨。
3. 从这部分文本中提取至少 1 个到 3 个具体事件放入 events 列表中。哪怕是闲谈或休息，也必须总结为一个事件。

**JSON 结构定义**:
{
  "title": "战报标题 (如: 巢都底层遭遇战)",
  "date": "M41.XXX-第X天",
  "summary": "纪要文本...",
  "keywords": ["关键词1", "关键词2"],
  "days": [
    {
      "date": "日期字符串",
      "events": [
        { "title": "事件简述", "description": "详细描述" }
      ]
    }
  ]
}
输出仅限绝对标准的纯 JSON 格式对象，无 markdown 标签。
`;

    const effectiveModelId = currentModelId || 'gemini-1.5-flash';
    const body: any = {
      provider: effectiveModelId.includes('gpt') || effectiveModelId.includes('openai') ? 'openai' : 'gemini',
      model: effectiveModelId,
      contents: prompt,
      config: {
        maxOutputTokens: 1500,
        temperature: 0.2,
        responseMimeType: "application/json"
      },
      customApiKey: localStorage.getItem('thirdPartyApiKey'),
      customBaseUrl: localStorage.getItem('thirdPartyBaseUrl'),
      customModelName: localStorage.getItem('thirdPartyModelName')
    };

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errDetail = await response.json().catch(() => ({}));
      throw new Error(errDetail.error || `HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data.text) throw new Error("AI 未返回有效数据。");

    const parsed = extractJSON(data.text);
    if (!parsed) throw new Error("无法解析 AI 返回的 JSON 数据。");

    return {
      id: Date.now().toString(),
      timestamp: Date.now(),
      title: String(parsed.title || "战术行动报告"),
      summary: String(parsed.summary || "详细战况已录入沉思者引擎。"),
      keywords: Array.isArray(parsed.keywords) ? parsed.keywords.map(String) : [],
      date: String(parsed.date || (parsed.days && parsed.days[0]?.date) || "M41.XXX"),
      days: Array.isArray(parsed.days) ? parsed.days : []
    };
  } catch (error: any) {
    console.error('generateLogEntry 失败:', error);
    throw error;
  }
};

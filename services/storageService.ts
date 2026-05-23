import { Character, Message, NPCProfile, GameStatus, LogSummary, GaiaState } from '../types';

export const STORAGE_KEY = '战锤40K：无尽战火';

interface SaveData {
  character: Character;
  history: Message[];
  npcProfiles?: NPCProfile[];
  stageSettings?: string;
  selectedStages?: string[];
  status?: GameStatus;
  difficulty?: 'normal' | 'grand';
  
  gaiaState?: GaiaState;
  logs?: LogSummary[];
  timestamp: number;
}

export const saveGame = (character: Character, history: Message[], npcProfiles: NPCProfile[] = [], stageSettings?: string, status?: GameStatus, difficulty?: 'normal' | 'grand', selectedStages?: string[], logs: LogSummary[] = [], gaiaState?: GaiaState) => {
  try {
    const data: SaveData = {
      character,
      // Keep only the LAST message's snapshot to allow rollback after reload, strip others to save significantly on space
      history: history.map((msg, idx) => {
        if (idx === history.length - 1) {
          const { groundingMetadata, ...rest } = msg;
          return rest;
        }
        const { snapshot, groundingMetadata, ...rest } = msg;
        return rest;
      }),
      npcProfiles,
      stageSettings,
      selectedStages,
      status,
      difficulty,
      gaiaState,
      logs,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save game:", e);
  }
}

export const loadGame = (): { character: Character; history: Message[]; npcProfiles: NPCProfile[]; stageSettings?: string; status?: GameStatus; difficulty?: 'normal' | 'grand';  selectedStages?: string[]; logs: LogSummary[]; gaiaState?: GaiaState; timestamp?: number } | null => {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return null;
    const data = JSON.parse(json) as SaveData;
    
    // Migration logic
    const npcProfiles = (data.npcProfiles || []).map(npc => {
      if ('description' in npc && !('aiGeneratedRecord' in npc)) {
        const oldNpc = npc as any;
        return {
          ...oldNpc,
          aiGeneratedRecord: oldNpc.description,
          userNotes: '',
        };
      }
      return npc;
    });

    // Sanitize Logs
    const sanitizedLogs = (data.logs || []).map(log => ({
      ...log,
      title: typeof log.title === 'string' ? log.title : "战事记录",
      date: typeof log.date === 'string' ? log.date : "未知日期",
      summary: typeof log.summary === 'string' ? log.summary : "",
      keywords: Array.isArray(log.keywords) ? log.keywords.map(k => String(k)) : []
    }));

    return { 
      character: data.character, 
      history: data.history || [],
      npcProfiles: npcProfiles,
      stageSettings: data.stageSettings,
      selectedStages: data.selectedStages,
      status: data.status,
      difficulty: data.difficulty || 'normal',
      gaiaState: data.gaiaState,
      logs: sanitizedLogs,
      timestamp: data.timestamp
    };
  } catch (e) {
    console.error("Failed to load game:", e);
    return null;
  }
};

export const hasSave = (): boolean => {
  return !!localStorage.getItem(STORAGE_KEY);
};

export const clearSave = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// 净化叙事内容中的技术标签
const purifyContent = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/<system_state\b[^>]*>[\s\S]*?<\/system_state\s*>/gi, '')
    .replace(/<thought\b[^>]*>[\s\S]*?<\/thought\s*>/gi, '')
    .replace(/<think\b[^>]*>[\s\S]*?<\/think\s*>/gi, '')
    .replace(/<system_data\b[^>]*>[\s\S]*?<\/system_data\s*>/gi, '')
    .replace(/<gaia_state_monitor\b[^>]*>[\s\S]*?<\/gaia_state_monitor\s*>/gi, '')
    .replace(/<historical_state_monitor\b[^>]*>[\s\S]*?<\/historical_state_monitor\s*>/gi, '')
    .replace(/\[NPC_SYNC_START\][\s\S]*?\[NPC_SYNC_END\]/gi, '')
    .replace(/<slot_registry\b[^>]*>[\s\S]*?<\/slot_registry\s*>/gi, '')
    .replace(/<hero_registry\b[^>]*>[\s\S]*?<\/hero_registry\s*>/gi, '')
    .replace(/<warlord_registry\b[^>]*>[\s\S]*?<\/warlord_registry\s*>/gi, '')
    .replace(/<battle_log\b[^>]*>[\s\S]*?<\/battle_log\s*>/gi, '')
    .replace(/\[战果结算: [\s\S]*?\]/gi, '')
    .replace(/\[TIMELINE_LOCK\]|\[\/TIMELINE_LOCK\]/gi, '')
    .replace(/\[NPC_SYNC_ARCHIVED\]/gi, '')
    .replace(/\[NPC状态已同步并入库\/NPC_SYNC_ARCHIVED\]/gi, '')
    .replace(/\[已移除冗余同步数据\]/gi, '')
    .replace(/\[SLOT_REGISTRY_ARCHIVED\]/gi, '')
    .replace(/\[HERO_REGISTRY_ARCHIVED\]/gi, '')
    .replace(/\[SYSTEM_STATE_ARCHIVED\]/gi, '')
    .replace(/\[SETTLEMENT_ARCHIVED\]/gi, '')
    .replace(/\[GAIA_MONITOR_ARCHIVED\]/gi, '')
    .replace(/\n{3,}/g, '\n\n') // 移除多余空行
    .trim();
};

// 导出存档为 JSON 文件
export const exportSaveToFile = async (character: Character, history: Message[], npcProfiles: NPCProfile[] = [], stageSettings?: string, status?: GameStatus, difficulty?: 'normal' | 'grand', selectedStages?: string[], logs: LogSummary[] = [], gaiaState?: GaiaState, options?: { purify?: boolean }) => {
  try {
    const isPurify = options?.purify ?? false;
    const data: SaveData = {
      character,
      history: history.map((msg, idx) => {
        // Keep snapshot ONLY for the very last message to allow rollback after manual import/file restore
        if (idx === history.length - 1) {
          const { groundingMetadata, ...rest } = msg;
          return {
            ...rest,
            content: isPurify ? purifyContent(rest.content) : rest.content
          };
        }
        const { groundingMetadata, snapshot, ...rest } = msg;
        return {
          ...rest,
          content: isPurify ? purifyContent(rest.content) : rest.content
        };
      }),
      npcProfiles,
      stageSettings,
      selectedStages,
      status,
      difficulty,
      gaiaState,
      logs,
      timestamp: Date.now(),
    };
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const typeLabel = isPurify ? 'Story' : 'FullSave';
    const fileName = `战锤40K：无尽战火_${character.name}_${typeLabel}_${new Date().toISOString().split('T')[0]}.json`;

    // Try sharing first for mobile
    if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      const file = new File([blob], fileName, { type: "application/json" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: fileName,
            text: `[${STORAGE_KEY}] 远征存档: ${fileName}`
          });
          return;
        } catch (shareErr: any) {
          if (shareErr.name === 'AbortError') {
             return; // User cancelled
          }
          console.error("Share failed, falling back to download", shareErr);
        }
      }
    }

    // Standard download fallback
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    
    // For iOS/Android browsers that might block programmatic clicks
    const triggerDownload = () => {
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 500);
    };

    triggerDownload();
  } catch (e) {
    console.error("Failed to export save file:", e);
    alert("导出存档失败，请重试。");
  }
};

// 验证导入的数据格式
export const validateSaveData = (data: any): data is SaveData => {
  return (
    data &&
    typeof data === 'object' &&
    'character' in data &&
    'history' in data &&
    Array.isArray(data.history)
  );
};
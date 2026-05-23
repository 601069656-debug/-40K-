import { BESTIARY_LABELS } from '../lib/knowledge/bestiary/labels';
import knowledgeSummary from '../lib/knowledge/knowledge_summary.json';

const AVAILABLE_TRAITS = (knowledgeSummary.traits || []).map((t: any) => t.name).join(', ');
const AVAILABLE_SKILLS = (knowledgeSummary.skills || []).map((s: any) => s.name).join(', ');
const AVAILABLE_WEAPONS = (knowledgeSummary.weapons || []).map((w: any) => w.name).join(', ');
const AVAILABLE_ARMOR = (knowledgeSummary.armor || []).map((a: any) => a.name).join(', ');
const AVAILABLE_ITEMS = (knowledgeSummary.items || []).map((i: any) => i.name).join(', ');

/**
 * 战锤40K：无尽战火 - 智能实体合成引擎 (v6.0-Optimized)
 * 优化点：注入核心黄金模板，强化数学闭环，动态标签投影。
 */

export const getDynamicSynthesizerPrompt = (input: string, logsSummary: string = ''): string => {
  const context = (input + logsSummary).toLowerCase();
  
  // 1. 动态阵营检测 (基于关键词)
  const matchingLabels = Object.entries(BESTIARY_LABELS).filter(([key, val]) => 
    context.includes(key) || val.tags.some(t => context.includes(t.toLowerCase()))
  ).map(([key, val]) => `[${key}] -> ${val.description} (必加标签: ${val.tags.join(', ')})`);

  return `
【核心合成协议：无尽战火数值引擎 v6.0】
你是一个高精度的实体结构化提取器。你的任务是根据叙事流，将单位、物品、舰船或载具转化为符合《无尽战火》底层规则的 JSON 实体。

### 1. 强制参考：黄金单位模型 (Golden Standard Roles)
*生成新单位时，必须参考以下数值基准，严禁过度膨胀：*
- **星际战士级**: WS/BS/S/T 约 41-65 | HP=9-13 | 必带【死亡天使】,【体型·大型】。
- **凡人精锐级**: WS/BS/S/T 约 13-25 | HP=5-7 | 必带【体型·普通】。
- **传奇/原体级**: WS/BS/S/T 约 95-150 | HP=20+ | 必带【体型·巨大】或【体型·超大】。

### 2. 反复造轮子防御协议 (Anti-Hallucination & Base Asset Reusability - CRITICAL)
**绝对禁止发散乱写！**
在将叙事转化为JSON时，为实体分配的所有装备(equipment)、武器(weaponStats)、特质(trait)和技能(skill)，**必须且只能使用下面列出的规则库中真实存在的标准名称。**
- **禁止加前缀造词**：如果你想给星际战士配枪，请直接写“爆弹枪”，**绝对禁止**写“【战团名】定制突击爆弹枪”或“异星血肉腐蚀枪”。
- **特质复用**：如果你想表达生物凶猛猛烈，请从下方可选特质中找到“强壮体魄”或“杀戮本能”赋予之。**绝对禁止**创造新的描述型特质。所有的特质最后都必须落在下方列举的可选项目上！

**当前可用特质库限制**: ${AVAILABLE_TRAITS}
**当前可用技能库限制**: ${AVAILABLE_SKILLS}
**当前可用武器库限制**: ${AVAILABLE_WEAPONS}
**当前可用护甲库限制**: ${AVAILABLE_ARMOR}
**当前可用常规物品限制**: ${AVAILABLE_ITEMS}

### 3. 硬核数学规则 (Mathematical Rigor)
**禁止幻觉！必须按以下精确公式计算：**
1. **耐久 (HP)** = floor(T / 5) | *例: T=45 -> HP=9; T=85 -> HP=17*
2. **移动 (MV)** = floor(Ag / 10) | *例: Ag=40 -> MV=4; Ag=85 -> MV=8*
3. **载具装甲 (AHP)** = T (且载具仅包含 S, T, Ag 属性)
4. **属性区间**:
   - 1-12: 弱小凡人 | 13-25: 凡人精锐 | 26-40: 侦察兵 | 41-65: 战斗兄弟 | 151+: 亚空间天灾。

### 3. 当前场景上下文路由 (Context Routing)
根据当前叙事，你识别出的匹配分类：
${matchingLabels.length > 0 ? matchingLabels.join('\n') : '- 暂未匹配特定阵营，请根据叙事字面含义分类。'}

### 4. 输出约束与格式 (Standard Schema)
- 只返回 JSON 数组，严禁任何前缀、后缀或解释性文本。
- **type**: 必须为 NPC|ENEMY|ITEM|VESSEL|VEHICLE。
- **trait**: 每个单位**必须且只能包含一个**身型标签：【体型·普通】|【体型·大型】|【体型·巨大】|【体型·超大】。
- **isImportant**: 若为叙事主角、有名有姓的英雄或大Boss，设为 true。单兵、小队杂兵设为 false。

\`\`\`json
{
  "entities": [
    {
      "name": "实体全称",
      "type": "NPC|ENEMY|ITEM|VESSEL|VEHICLE",
      "faction": "所属势力",
      "isImportant": false,
      "templateId": "可选：匹配现有库的ID",
      "stats": {
        "WS": 0, "BS": 0, "S": 0, "T": 0, "Ag": 0, "Int": 0, "Per": 0, "WP": 0, "Fel": 0,
        "hp": 0, "maxHp": 0, "ahp": 0, "movement": 0, "baseMeleeDamage": " floor(S/20) (S/20)",
        "weaponStats": "武器名称(S:X D:Y 连射:是/否 弹容:N 其他)"
      },
      "trait": ["【特质1】", "【身型·XX】"],
      "skill": ["技能1"],
      "equipment": ["装备1"]
    }
  ]
}
\`\`\`
  `;
};



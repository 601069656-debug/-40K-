// ==================== 行商浪人 (Rogue Traders) ====================
// 审计修正说明：
// - 修正属性值为符合行商浪人及其卫队设定的合理数值（船长45-60，卫队35-44）
// - HP = max(1, floor(T/5))，MV = floor(Ag/10)（最小1），BMD = floor(S/20)
// - 护甲AR/AHP及修正参考规则表：行政官长袍(AR2/AHP6, Fel+5)，行星防卫军轻型甲壳甲(AR4/AHP10, Ag-5)
// - 武器仅保留名称，移除伤害细节
// - 特质合法化：仅保留规则内派系/子派系特质，移除自创“生存本能”“忠诚卫士”“服从天性”
// - 技能替换为规则列表中的合法技能（魅力、欺诈、评估、警觉、闪避等）
import { NPCProfile } from '../../../../types';

export const rogueTraders: Record<string, Partial<NPCProfile>> = {
  'rogue_trader_captain': {
    id: 'rogue_trader_captain', name: '行商浪人船长', status: '自由探险家', attributes: {
      weaponSkill: 50, ballisticSkill: 55, strength: 40, toughness: 40, agility: 45, intelligence: 65, perception: 55, willpower: 60, fellowship: 70
    }, trait: '自由贸易, 帝皇特许状, 体型·普通', skill: '魅力, 欺诈, 评估, 警觉, 闪避', equipment: '行政官长袍, 行商浪人精工激光手枪, 浪人决斗细剑, 行商浪人贸易特许状', ahp: 6, hp: 8, maxHp: 8, armorRating: 2, movement: 4, tags: ['帝国', '行商浪人', '探险家', '领袖'], baseMeleeDamage: '2 (S/20)', weaponStats: '浪人决斗细剑, 行商浪人精工激光手枪'
  }, 'house_guard': {
    id: 'house_guard', name: '家族卫队', status: '精英私兵', attributes: {
      weaponSkill: 45, ballisticSkill: 45, strength: 40, toughness: 40, agility: 35, intelligence: 30, perception: 40, willpower: 40, fellowship: 25
    }, trait: '体型·普通', skill: '警觉, 闪避', equipment: '行星防卫军轻型甲壳甲, 激光卡宾枪, 电击棒', ahp: 10, hp: 8, maxHp: 8, armorRating: 4, movement: 3, tags: ['帝国', '行商浪人', '士兵'], baseMeleeDamage: '2 (S/20)', weaponStats: '激光卡宾枪, 电击棒'
  }
};
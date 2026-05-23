import { NPCProfile } from '../../../../types';

/**
 * 机械教 - 护教军先锋 (Skitarii Vanguard)
 * 审计修正说明：
 * - 修正属性值为符合护教军设定的合理数值（凡人极限45-54）
 * - HP = max(1, floor(T/5)) = floor(40/5)=8
 * - MV = floor(Ag/10) = floor(40/10)=4，体型普通无修正
 * - BMD = floor(S/20) = floor(40/20)=2
 * - 护甲：先锋军抗辐射装甲（AR4/AHP14，敏捷-5，已体现在属性中）
 * - 特质：辐射焚化（机械教子派系特质）、机械化·中级、体型·普通
 * - 技能：普通知识·机械教、战术、闪避、警觉（合法技能）
 * - weaponStats仅保留武器名称（镭步枪、动力棍）
 * - 移除自创技能“突击”“忍耐”
 */
export const SKITARII_VANGUARD_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'skitarii_vanguard': {
    name: '护教军先锋军', status: '辐射战士', attributes: {
      weaponSkill: 45, ballisticSkill: 55, strength: 40, toughness: 45, agility: 35, intelligence: 45, perception: 45, willpower: 50, fellowship: 10
    }, trait: '辐射焚化, 机械化·中级, 体型·普通', skill: '普通知识·机械教, 战术, 闪避, 警觉', equipment: '镭步枪, 动力棍, 先锋军抗辐射装甲', tags: ['帝国', '机械教', '护教军'], ahp: 14, hp: 9, maxHp: 9, armorRating: 4, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '镭步枪, 动力棍'
  }
};
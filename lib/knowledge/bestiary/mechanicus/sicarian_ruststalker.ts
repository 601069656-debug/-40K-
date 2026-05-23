import { NPCProfile } from '../../../../types';

/**
 * 机械教 - 机械教铁卫 (Sicarian Ruststalker)
 * 审计修正说明：
 * - 修正属性值为符合精英护教军设定的合理数值（凡人极限45-54，部分属性略高）
 * - HP = max(1, floor(T/5)) = floor(45/5)=9
 * - MV = floor(Ag/10) = floor(55/10)=5，体型普通无修正
 * - BMD = floor(S/20) = floor(45/20)=2
 * - 护甲：机械教护教军战甲（AR4/AHP10，无属性修正）
 * - 特质：机械化·中级、体型·普通（合法特质）
 * - 技能：普通知识·机械教、闪避、潜行、警觉（合法技能）
 * - weaponStats仅保留武器名称（高频斩波剑）
 * - 移除自创特质“无情猎杀”“突击”“忍耐”，替换为合法技能/特质
 */
export const SICARIAN_RUSTSTALKER_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'sicarian_ruststalker': {
    name: '机械教铁卫', status: '高频杀手', attributes: {
      weaponSkill: 60, ballisticSkill: 35, strength: 45, toughness: 45, agility: 55, intelligence: 40, perception: 55, willpower: 50, fellowship: 10
    }, trait: '机械化·中级, 体型·普通', skill: '普通知识·机械教, 闪避, 潜行, 警觉', equipment: '高频斩波剑, 机械教护教军战甲', tags: ['帝国', '机械教', '铁卫', '猎手'], ahp: 10, hp: 9, maxHp: 9, armorRating: 4, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '高频斩波剑'
  }
};
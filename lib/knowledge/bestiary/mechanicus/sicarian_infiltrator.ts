import { NPCProfile } from '../../../../types';

/**
 * 机械教 - 机械教渗透者 (Sicarian Infiltrator)
 * 审计修正说明：
 * - 修正属性值为符合精英护教军设定的合理数值（凡人极限45-54，部分属性略高）
 * - HP = max(1, floor(T/5)) = floor(45/5)=9
 * - MV = floor(Ag/10) = floor(55/10)=5，体型普通无修正
 * - BMD = floor(S/20) = floor(45/20)=2
 * - 护甲：机械教护教军战甲（AR4/AHP10，无属性修正）
 * - 特质：机械化·中级、暗影渗透（合法特质）、体型·普通
 * - 技能：普通知识·机械教、战术、潜行、闪避、警觉（均为合法技能）
 * - weaponStats仅保留武器名称（电激战矛、自动手枪）
 * - 移除自创特质“神经干扰”“潜行”（改为合法特质“暗影渗透”）
 */
export const SICARIAN_INFILTRATOR_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'sicarian_infiltrator': {
    name: '机械教渗透者', status: '神经干扰者', attributes: {
      weaponSkill: 55, ballisticSkill: 45, strength: 45, toughness: 45, agility: 55, intelligence: 50, perception: 55, willpower: 50, fellowship: 15
    }, trait: '机械化·中级, 暗影渗透, 体型·普通', skill: '普通知识·机械教, 战术, 潜行, 闪避, 警觉', equipment: '电激战矛, 自动手枪, 机械教护教军战甲', tags: ['帝国', '机械教', '护教军', '渗透者'], ahp: 10, hp: 9, maxHp: 9, armorRating: 4, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '电激战矛, 自动手枪'
  }
};
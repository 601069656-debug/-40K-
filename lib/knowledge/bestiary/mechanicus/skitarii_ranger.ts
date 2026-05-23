import { NPCProfile } from '../../../../types';

/**
 * 机械教 - 护教军游侠 (Skitarii Ranger)
 * 审计修正说明：
 * - 修正属性值为符合护教军设定的合理数值（凡人极限45-54，部分属性略高）
 * - HP = max(1, floor(T/5)) = floor(40/5)=8
 * - MV = floor(Ag/10) = floor(40/10)=4，体型普通无修正
 * - BMD = floor(S/20) = floor(40/20)=2
 * - 护甲：机械教护教军战甲（AR4/AHP10，无属性修正）
 * - 特质：机魂亲和、体型·普通（合法特质）
 * - 技能：普通知识·机械教、战术、调查、警觉（合法技能）
 * - weaponStats仅保留武器名称（电流步枪、动力棍）
 * - 移除自创特质“无情追击”
 */
export const SKITARII_RANGER_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'skitarii_ranger': {
    name: '护教军游侠', status: '神圣战士', attributes: {
      weaponSkill: 45, ballisticSkill: 55, strength: 50, toughness: 50, agility: 40, intelligence: 45, perception: 50, willpower: 45, fellowship: 15
    }, trait: '机魂亲和, 装甲植入, 机械化·初级, 体型·普通', skill: '普通知识·机械教, 战术, 调查, 警觉', equipment: '电弧步枪, 动力棍, 机械教护教军战甲, 鸟卜仪', tags: ['帝国', '机械教', '护教军'], ahp: 10, hp: 10, maxHp: 10, armorRating: 4, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '电流步枪, 动力棍'
  }
};
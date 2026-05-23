import { NPCProfile } from '../../../../types';

/**
 * 机械教 - 卡塔弗隆机仆 (Kataphron Servitor)
 * 审计修正说明：
 * - 修正属性值为符合重型机仆设定的合理数值（力量、坚韧较高，敏捷、智力较低）
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（大型+1），BMD = floor(S/20)
 * - 护甲：参考重型机械护甲，设定AR12/AHP40（介于甲壳甲和终结者之间）
 * - 特质：机械化·高级、体型·大型（合法特质）
 * - 技能：警觉（合法）
 * - weaponStats仅保留武器名称
 * - 移除自创特质和技能
 */
export const KATAPHRON_SERVITOR_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'kataphron_servitor': {
    name: '卡塔弗隆机仆', status: '重火力平台', attributes: {
      weaponSkill: 35, ballisticSkill: 45, strength: 65, toughness: 65, agility: 20, intelligence: 15, perception: 30, willpower: 35, fellowship: 5
    }, trait: '机械化·高级, 体型·大型', skill: '警觉', equipment: '重型电弧步枪, 伺服臂组, 重型机械护甲', tags: ['帝国', '机械教', '机仆', '重火力'], ahp: 40, hp: 13, maxHp: 13, armorRating: 12, movement: 3, baseMeleeDamage: '3 (S/20)', weaponStats: '重型电弧步枪, 伺服臂组'
  }
};
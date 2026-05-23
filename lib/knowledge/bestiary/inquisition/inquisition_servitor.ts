import { NPCProfile } from '../../../../types';

/**
 * 审判庭 - 审判庭武装侍从 (Inquisitorial Armed Servitor)
 * 审计修正说明：
 * - 修正属性值为符合机械改造机仆设定的合理数值（高力量/坚韧，低敏捷/智力/意志）
 * - 属性范围参考：力量45-54，坚韧45-54，敏捷25-34，智力10-19
 * - HP = max(1, floor(T/5)) = floor(45/5)=9
 * - MV = floor(Ag/10) = floor(30/10)=3，加上体型普通无修正
 * - BMD = floor(S/20) = floor(45/20)=2
 * - 护甲：重型防弹甲，AR3，AHP10，敏捷-5（已体现在敏捷属性中）
 * - 特质：合法保留（重火力支援、机械化·中级、体型·普通）
 * - 技能：警觉（合法）
 * - weaponStats仅保留武器名称
 */
export const INQUISITION_SERVITOR_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'inquisition_servitor': {
    name: '审判庭武装侍从', status: '机仆卫士', attributes: {
      weaponSkill: 35, ballisticSkill: 40, strength: 45, toughness: 45, agility: 30, intelligence: 15, perception: 25, willpower: 20, fellowship: 5
    }, trait: '重火力支援, 机械化·中级, 体型·普通', skill: '警觉', equipment: '重型爆弹枪, 重型防弹甲, 监视颅骨', tags: ['帝国', '审判庭', '机仆', '重火力'], ahp: 10, hp: 9, maxHp: 9, armorRating: 3, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '重型爆弹枪'
  }
};
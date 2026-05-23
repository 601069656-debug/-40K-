import { NPCProfile } from '../../../../types';

/**
 * 审判庭 - 罗塞塔持有者 (Rosette Bearer)
 * 审计修正说明：
 * - 修正属性值为符合审判庭随从/代理人设定的合理数值（精锐凡人水平35-44）
 * - 属性范围参考：WS 35-45，BS 35-45，S 30-40，T 35-45，Ag 35-45（甲壳甲-5后），Int 40-50，Per 40-50，WP 40-50，Fel 35-45
 * - HP = max(1, floor(T/5)) = floor(40/5)=8
 * - MV = floor(Ag/10) = floor(35/10)=3，体型普通无修正
 * - BMD = floor(S/20) = floor(35/20)=1
 * - 护甲：甲壳甲提供AR4/AHP12，敏捷-5（已体现在敏捷属性中）
 * - 特质：罗塞塔之证、圣典公民、体型·普通（修正体型）
 * - 技能：普通知识·审判庭、魅力、调查、欺诈、闪避（均为合法技能）
 * - weaponStats仅保留武器名称（激光手枪、动力棍）
 */
export const ROSETTE_BEARER_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'rosette_bearer': {
    name: '罗塞塔持有者', status: '权威象征', attributes: {
      weaponSkill: 40, ballisticSkill: 40, strength: 35, toughness: 40, agility: 35, intelligence: 45, perception: 45, willpower: 45, fellowship: 40
    }, trait: '罗塞塔之证, 圣典公民, 体型·普通', skill: '普通知识·审判庭, 魅力, 调查, 欺诈, 闪避', equipment: '激光手枪, 动力棍, 甲壳甲, 数据板', tags: ['帝国', '审判庭', '持有者'], ahp: 12, hp: 8, maxHp: 8, armorRating: 4, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '激光手枪, 动力棍'
  }
};
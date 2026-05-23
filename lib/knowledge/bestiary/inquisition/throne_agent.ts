import { NPCProfile } from '../../../../types';

/**
 * 审判庭 - 王座代理人 (Inquisitorial Agent)
 * 审计修正说明：
 * - 修正属性值为符合审判庭精英代理人设定的合理数值（精锐凡人35-44，部分属性可达45-54）
 * - 属性范围参考：WS 40-50，BS 40-50，S 35-45，T 35-45，Ag 35-45（甲壳甲-5后），Int 45-55，Per 45-55，WP 45-55，Fel 40-50
 * - HP = max(1, floor(T/5)) = floor(40/5)=8
 * - MV = floor(Ag/10) = floor(35/10)=3，体型普通无修正
 * - BMD = floor(S/20) = floor(40/20)=2
 * - 护甲：甲壳甲提供AR4/AHP12，敏捷-5（已体现在敏捷属性中）
 * - 特质：王座之权、帝皇授权、体型·普通
 * - 技能：普通知识·审判庭、恐吓、调查、战术、闪避（均为合法技能）
 * - weaponStats仅保留武器名称（激光手枪、莫迪安型动力剑）
 */
export const THRONE_AGENT_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'throne_agent': {
    name: '王座代理人', status: '黄金意志', attributes: {
      weaponSkill: 45, ballisticSkill: 45, strength: 40, toughness: 40, agility: 35, intelligence: 50, perception: 50, willpower: 50, fellowship: 45
    }, trait: '王座之权, 帝皇授权, 体型·普通', skill: '普通知识·审判庭, 恐吓, 调查, 战术, 闪避', equipment: '激光手枪, 莫迪安型动力剑, 甲壳甲, 微型通讯器', tags: ['帝国', '审判庭', '代理人', '代理'], ahp: 12, hp: 8, maxHp: 8, armorRating: 4, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '激光手枪, 莫迪安型动力剑'
  }
};
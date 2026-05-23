import { NPCProfile } from '../../../../types';

/**
 * 审判庭 - 异端庭审判者 (Inquisitor of the Ordo Hereticus)
 * 审计修正说明：
 * - 修正属性值为符合审判官设定的合理数值（凡人极限45-54，智力、意志、感知较高）
 * - 属性范围参考：WS 45-55，BS 50-60，S 35-45，T 40-50，Ag 40-50，Int 60-70，Per 55-65，WP 65-75，Fel 50-60
 * - HP = max(1, floor(T/5)) = floor(45/5)=9
 * - MV = floor(Ag/10) = floor(45/10)=4，体型普通无修正
 * - BMD = floor(S/20) = floor(40/20)=2
 * - 护甲：甲壳甲提供AR4/AHP12，敏捷-5（已体现在敏捷属性中）
 * - 特质：审判异端、帝皇之眼、体型·普通（审判官默认普通体型）
 * - 技能使用规则中的合法技能名称
 * - weaponStats仅保留武器名称
 */
export const ORDO_HERETICUS_INQUISITOR_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'ordo_hereticus_inquisitor': {
    name: '异端庭审判者', status: '审判异端', attributes: {
      weaponSkill: 50, ballisticSkill: 55, strength: 40, toughness: 45, agility: 45, intelligence: 65, perception: 60, willpower: 70, fellowship: 55
    }, trait: '审判异端, 帝皇之眼, 体型·普通', skill: '禁忌知识·异端, 禁忌知识·审判庭, 审讯, 欺诈, 察言观色, 闪避', equipment: '卡迪安型动力剑, 精工阿斯塔特爆弹手枪, 甲壳甲, 医疗包', tags: ['帝国', '审判庭', '异端庭', '审判官'], ahp: 12, hp: 9, maxHp: 9, armorRating: 4, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '卡迪安型动力剑, 精工阿斯塔特爆弹手枪'
  }
};
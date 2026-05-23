import { NPCProfile } from '../../../../types';

/**
 * 审判庭 - 异形庭审判官 (Inquisitor of the Ordo Xenos)
 * 审计修正说明：
 * - 修正属性值为符合审判官设定的合理数值（凡人极限45-54，但考虑到审判官往往经过改造或经验丰富，适当提高）
 * - 属性范围参考：WS 50-60，BS 55-65，S 40-50，T 40-50，Ag 40-50（甲壳甲-5后），Int 60-70，Per 55-65，WP 65-75，Fel 50-60
 * - HP = max(1, floor(T/5)) = floor(45/5)=9
 * - MV = floor(Ag/10) = floor(40/10)=4，体型普通无修正
 * - BMD = floor(S/20) = floor(40/20)=2
 * - 护甲：甲壳甲提供AR4/AHP12，敏捷-5（已体现在敏捷属性中）
 * - 特质：异形庭猎手、帝皇之眼、体型·普通（审判官默认普通体型）
 * - 技能使用规则中的合法技能名称
 * - weaponStats仅保留武器名称
 */
export const ORDO_XENOS_INQUISITOR_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'ordo_xenos_inquisitor': {
    name: '异形庭审判官', status: '异形猎手', attributes: {
      weaponSkill: 55, ballisticSkill: 60, strength: 40, toughness: 45, agility: 40, intelligence: 65, perception: 60, willpower: 70, fellowship: 55
    }, trait: '异形庭猎手, 帝皇之眼, 体型·普通', skill: '禁忌知识·异形, 禁忌知识·审判庭, 战术, 调查, 警觉, 闪避', equipment: '异相之刃, 精工阿斯塔特爆弹手枪, 甲壳甲, 鸟卜仪', tags: ['帝国', '审判庭', '异形庭', '审判官'], ahp: 12, hp: 9, maxHp: 9, armorRating: 4, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '异相之刃, 精工阿斯塔特爆弹手枪'
  }
};
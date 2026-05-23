import { NPCProfile } from '../../../../types';

/**
 * 审判庭 - 恶魔庭封印使 (Exorcist of the Ordo Malleus)
 * 审计修正说明：
 * - 修正属性值为符合审判庭恶魔猎手设定的合理数值（灵能者高意志，其他中等）
 * - 属性范围参考：WS 35-45，BS 35-45，S 30-40，T 35-45，Ag 35-45（甲壳甲-5后），Int 50-60，Per 50-60，WP 65-75，Fel 35-45
 * - HP = max(1, floor(T/5)) = floor(40/5)=8
 * - MV = floor(Ag/10) = floor(40/10)=4，体型普通无修正
 * - BMD = floor(S/20) = floor(35/20)=1
 * - 护甲：甲壳甲提供AR4/AHP12，敏捷-5（已体现在敏捷属性中）
 * - 特质：恶魔封印、灵魂誓约、体型·普通（均为合法特质）
 * - 技能包含灵能天赋“门扉轻推”(PR3)，以及合法技能：灵能掌控、禁忌知识·恶魔学、禁忌知识·亚空间、祈求、闪避
 * - weaponStats仅保留武器名称
 */
export const ORDO_MALLEUS_EXORCIST_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'ordo_malleus_exorcist': {
    name: '恶魔庭封印使', status: '恶魔封印', attributes: {
      weaponSkill: 40, ballisticSkill: 40, strength: 35, toughness: 40, agility: 40, intelligence: 55, perception: 55, willpower: 70, fellowship: 40
    }, trait: '恶魔封印, 灵魂誓约, 体型·普通', skill: '灵能掌控, 门扉轻推, 禁忌知识·恶魔学, 禁忌知识·亚空间, 祈求, 闪避', equipment: '灵能法杖, 灵能手雷（虚空石）, 甲壳甲, 圣洁经文', tags: ['帝国', '审判庭', '恶魔庭', '灵能者', '封印者'], ahp: 12, hp: 8, maxHp: 8, armorRating: 4, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '灵能法杖'
  }
};
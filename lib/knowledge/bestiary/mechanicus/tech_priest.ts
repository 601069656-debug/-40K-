import { NPCProfile } from '../../../../types';

/**
 * 机械教 - 技术神甫 (Tech-Priest Enginseer)
 * 审计修正说明：
 * - 修正属性值为符合技术神甫设定的合理数值（精锐凡人，智力、意志较高）
 * - HP = max(1, floor(T/5)) = floor(40/5)=8
 * - MV = floor(Ag/10) = floor(35/10)=3，体型普通无修正
 * - BMD = floor(S/20) = floor(35/20)=1
 * - 护甲：重型防弹甲（AR3/AHP10，敏捷-5，已体现在属性中）
 * - 特质：万机庇护、机械化·中级、多臂、体型·普通（均为合法特质）
 * - 技能：逻辑、普通知识·技术、禁忌知识·古代技术、战术（合法技能）
 * - weaponStats仅保留武器名称（万机神之斧、伺服臂组、磷火手枪）
 * - 移除自创技能“技术运用”“学术知识·星工”等
 */
export const TECH_PRIEST_ENGINSEER_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'tech_priest_enginseer': {
    name: '技术神甫', status: '引擎先知', attributes: {
      weaponSkill: 40, ballisticSkill: 40, strength: 35, toughness: 40, agility: 35, intelligence: 65, perception: 45, willpower: 55, fellowship: 20
    }, trait: '万机庇护, 机械化·中级, 多臂, 体型·普通', skill: '逻辑, 普通知识·技术, 禁忌知识·古代技术, 战术', equipment: '万机神之斧, 伺服臂组, 磷火手枪, 重型防弹甲', tags: ['帝国', '机械教', '技术神甫'], ahp: 10, hp: 8, maxHp: 8, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '万机神之斧, 伺服臂组, 磷火手枪'
  }
};
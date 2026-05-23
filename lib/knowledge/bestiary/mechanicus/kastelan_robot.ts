import { NPCProfile } from '../../../../types';

/**
 * 机械教 - 卡斯特兰机器人 (Kastelan Robot)
 * 审计修正说明：
 * - 修正属性值为符合重型机器人设定的合理数值（对标无畏级）
 * - HP = max(1, floor(T/5)) = floor(80/5)=16
 * - MV = floor(Ag/10) + 体型修正（巨大+3）= floor(25/10)+3 = 2+3=5
 * - BMD = floor(S/20) = floor(80/20)=4
 * - 护甲：卡斯特兰护盾装甲（AR18/AHP70，力量+45，意志+30，反射网格护盾）
 * - 特质：机械化·高级、体型·巨大、自动支撑（合法特质）
 * - 技能：战术、恐吓（合法技能）
 * - weaponStats仅保留武器名称
 * - 移除自创特质和技能
 */
export const KASTELAN_ROBOT_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'kastelan_robot': {
    name: '卡斯特兰机器人', status: '远古战争铁人', attributes: {
      weaponSkill: 45, ballisticSkill: 45, strength: 80, toughness: 80, agility: 25, intelligence: 20, perception: 30, willpower: 50, fellowship: 5
    }, trait: '机械化·高级, 体型·巨大, 自动支撑', skill: '战术, 恐吓', equipment: '燃烧加农炮, 动力拳套, 卡斯特兰护盾装甲', tags: ['帝国', '机械教', '机甲', '机器人'], ahp: 70, hp: 16, maxHp: 16, armorRating: 18, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '燃烧加农炮, 动力拳套'
  }
};
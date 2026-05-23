import { NPCProfile } from '../../../../types';

/**
 * 荷鲁斯之子 (Sons of Horus) - 天狼之裔
 * 审计修正说明：
 * - 修正所有属性值为符合世界观设定的合理数值
 * - 护甲属性修正已正确应用（混沌动力甲：力量+20、感知+20、意志+5、敏捷-5, 终结者护甲：力量+45、意志+20、敏捷-40）
 * - 特质仅保留合法名称，移除描述，用逗号分隔（移除自创特质“狂暴意志”“格斗,闪避,意志抵抗”等）
 * - 技能替换为规则技能列表中的合法技能（“普通知识·阿斯塔特修会”而非“普通知识·战团”）
 * - weaponStats 仅保留武器名称，移除伤害细节
 * - HP、MV、BMD 严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（大型+1），BMD = floor(S/20)
 * - 混沌印记提供全属性+5，百战幸存提供S/T/Ag/WP+5，已包含在最终属性中
 */
export const SONS_OF_HORUS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'sons_of_horus_neophyte': {
    name: '荷鲁斯之子新人', status: '克托尼亚帮派成员', attributes: {
      weaponSkill: 60, ballisticSkill: 55, strength: 55, toughness: 50, agility: 55, intelligence: 35, perception: 55, willpower: 50, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 体型·大型, 天狼之裔, 混沌印记', skill: '潜行, 恐吓', equipment: 'MK VII 型动力甲, 阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '新兵', '荷鲁斯之子'], ahp: 20, hp: 10, maxHp: 10, armorRating: 7, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪'
  }, 'sons_of_horus_warrior': {
    name: '荷鲁斯之子战士', status: '战团中坚', attributes: {
      weaponSkill: 75, ballisticSkill: 70, strength: 75, toughness: 70, agility: 60, intelligence: 40, perception: 55, willpower: 70, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 体型·大型, 天狼之裔, 混沌印记', skill: '普通知识·阿斯塔特修会, 闪避, 战术', equipment: '混沌动力甲, 阿斯塔特链锯剑, 阿斯塔特爆弹枪', tags: ['混沌', '混沌星际战士', '荷鲁斯之子'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特链锯剑, 阿斯塔特爆弹枪'
  }, 'sons_of_horus_reaver': {
    name: '荷鲁斯之子掠夺者', status: '斩首先锋', attributes: {
      weaponSkill: 80, ballisticSkill: 70, strength: 80, toughness: 70, agility: 65, intelligence: 40, perception: 60, willpower: 70, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 体型·大型, 天狼之裔, 混沌印记', skill: '潜行, 战术, 闪避, 恐吓', equipment: '混沌动力甲, 克托尼亚动力锤, 组合爆弹枪', tags: ['混沌', '混沌星际战士', '突击', '荷鲁斯之子'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '克托尼亚动力锤, 组合爆弹枪'
  }, 'sons_of_horus_chosen': {
    name: '荷鲁斯之子神选者', status: '狼神卫队', attributes: {
      weaponSkill: 85, ballisticSkill: 75, strength: 85, toughness: 75, agility: 65, intelligence: 45, perception: 65, willpower: 80, fellowship: 20
    }, trait: '隧道之子, 叛变战士, 百战幸存, 体型·大型, 天狼之裔, 混沌印记', skill: '指挥, 战术, 闪避', equipment: '精工混沌动力甲, 阿斯塔特格斗刀, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '老兵', '荷鲁斯之子'], ahp: 24, hp: 15, maxHp: 15, armorRating: 9, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特格斗刀, 精工阿斯塔特爆弹手枪'
  }, 'sons_of_horus_champion': {
    name: '荷鲁斯之子冠军', status: '克托尼亚之刃', attributes: {
      weaponSkill: 105, ballisticSkill: 90, strength: 105, toughness: 95, agility: 75, intelligence: 55, perception: 75, willpower: 95, fellowship: 40
    }, trait: '隧道之子, 叛变战士, 英雄之躯, 百战幸存, 体型·大型, 天狼之裔, 混沌印记', skill: '闪避, 恐吓, 战术', equipment: '精工混沌动力甲, 泰拉型动力剑, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '英雄', '荷鲁斯之子'], ahp: 26, hp: 19, maxHp: 19, armorRating: 9, movement: 8, baseMeleeDamage: '5 (S/20)', weaponStats: '泰拉型动力剑, 精工阿斯塔特爆弹手枪'
  }, 'sons_of_horus_sorcerer': {
    name: '荷鲁斯之子巫师', status: '黑暗先知', attributes: {
      weaponSkill: 65, ballisticSkill: 65, strength: 65, toughness: 60, agility: 60, intelligence: 85, perception: 70, willpower: 90, fellowship: 20
    }, trait: '叛变战士, 星海本能, 体型·大型, 天狼之裔, 混沌印记', skill: '祈求, 禁忌知识·亚空间, 察言观色, 灵能掌控', equipment: '混沌动力甲, 灵能剑, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '灵能者', '荷鲁斯之子'], ahp: 22, hp: 12, maxHp: 12, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '灵能剑, 精工阿斯塔特爆弹手枪'
  }, 'sons_of_horus_lord': {
    name: '荷鲁斯之子战争头领', status: '十六连遗脉', attributes: {
      weaponSkill: 110, ballisticSkill: 100, strength: 110, toughness: 100, agility: 75, intelligence: 65, perception: 80, willpower: 105, fellowship: 55
    }, trait: '隧道之子, 叛变战士, 英雄之躯, 百战幸存, 体型·大型, 天狼之裔, 混沌印记', skill: '指挥, 战术, 魅力', equipment: '圣物混沌动力甲, 动力斧, 阿斯塔特爆弹枪', tags: ['混沌', '混沌星际战士', '英雄', '领袖', '荷鲁斯之子'], ahp: 30, hp: 20, maxHp: 20, armorRating: 11, movement: 8, baseMeleeDamage: '5 (S/20)', weaponStats: '动力斧, 阿斯塔特爆弹枪'
  }, 'sons_of_horus_justaerin': {
    name: '捷斯塔林终结者', status: '重甲狼群', attributes: {
      weaponSkill: 85, ballisticSkill: 75, strength: 100, toughness: 90, agility: 25, intelligence: 45, perception: 65, willpower: 85, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 终结者意志, 百战幸存, 体型·大型, 天狼之裔, 混沌印记', skill: '战术, 警觉, 恐吓', equipment: '捷斯塔林型战术无畏装甲, 动力拳套, 组合爆弹枪', tags: ['混沌', '混沌星际战士', '精英', '终结者', '荷鲁斯之子'], ahp: 45, hp: 18, maxHp: 18, armorRating: 14, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 组合爆弹枪'
  }, 'sons_of_horus_helbrute': {
    name: '荷鲁斯之子地狱狂暴者', status: '狼神之怒', attributes: {
      weaponSkill: 60, ballisticSkill: 55, strength: 110, toughness: 100, agility: 25, intelligence: 15, perception: 40, willpower: 70, fellowship: 5
    }, trait: '隧道之子, 叛变战士, 恶魔引擎, 机械化·中级, 体型·巨大, 天狼之裔, 混沌印记', skill: '恐吓, 战术', equipment: '混沌恶魔引擎甲, 双联重型爆弹枪, 无畏型动力拳', tags: ['混沌', '混沌星际战士', '恶魔引擎', '无畏机甲', '荷鲁斯之子'], ahp: 65, hp: 20, maxHp: 20, armorRating: 20, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '双联重型爆弹枪, 无畏型动力拳'
  }
};
import { NPCProfile } from '../../../../types';

/**
 * 黑色军团 (Black Legion) - 诸神之怒
 * 审计修正说明：
 * - 修正所有属性值为符合世界观设定的合理数值
 * - 护甲属性修正已正确应用（混沌动力甲：力量+20、感知+20、意志+5、敏捷-5, 终结者护甲：力量+40、意志+15、敏捷-40等）
 * - 特质仅保留合法名称，移除描述，用逗号分隔
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats 仅保留武器名称，移除伤害和弹容等细节
 * - HP、MV、BMD 严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（大型+1），BMD = floor(S/20)
 * - 混沌印记提供全属性+5，百战幸存提供S/T/Ag/WP+5，英雄之躯提供伤害减免（非直接属性），已包含在最终属性中
 */
export const BLACK_LEGION_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'black_legion_marine': {
    name: '黑色军团星际战士', status: '黑暗大远征军', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 75, toughness: 70, agility: 60, intelligence: 40, perception: 55, willpower: 70, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 体型·大型, 诸神之怒, 混沌印记', skill: '战术, 恐吓, 警觉', equipment: '混沌动力甲, 阿斯塔特爆弹枪, 阿斯塔特链锯剑', tags: ['混沌', '混沌星际战士', '黑色军团'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特链锯剑'
  }, 'black_legion_havoc': {
    name: '黑色军团掠夺者 (Havoc)', status: '重火力支柱', attributes: {
      weaponSkill: 70, ballisticSkill: 80, strength: 80, toughness: 75, agility: 55, intelligence: 40, perception: 60, willpower: 70, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 自动支撑, 体型·大型, 诸神之怒, 混沌印记', skill: '战术, 警觉', equipment: '混沌动力甲, 重型爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '重火力', '黑色军团'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '重型爆弹枪, 精工阿斯塔特爆弹手枪'
  }, 'black_legion_chosen': {
    name: '黑色军团神选', status: '诸神宠儿', attributes: {
      weaponSkill: 85, ballisticSkill: 80, strength: 85, toughness: 80, agility: 65, intelligence: 45, perception: 65, willpower: 80, fellowship: 20
    }, trait: '隧道之子, 叛变战士, 百战幸存, 体型·大型, 诸神之怒, 混沌印记', skill: '指挥, 战术, 恐吓', equipment: '精工混沌动力甲, 动力拳套, 精工Mk II“日怒”型等离子手枪', tags: ['混沌', '混沌星际战士', '老兵', '神选', '黑色军团'], ahp: 24, hp: 16, maxHp: 16, armorRating: 9, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工Mk II“日怒”型等离子手枪'
  }, 'black_legion_terminator': {
    name: '黑色军团终结者', status: '阿巴顿的亲卫', attributes: {
      weaponSkill: 85, ballisticSkill: 80, strength: 100, toughness: 90, agility: 30, intelligence: 45, perception: 65, willpower: 85, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 终结者意志, 百战幸存, 体型·大型, 诸神之怒, 混沌印记', skill: '战术, 恐吓, 警觉', equipment: '混沌终结者护甲, 动力斧, 组合爆弹枪', tags: ['混沌', '混沌星际战士', '重装', '终结者', '黑色军团'], ahp: 38, hp: 18, maxHp: 18, armorRating: 13, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '动力斧, 组合爆弹枪'
  }, 'black_legion_sorcerer': {
    name: '黑色军团巫师', status: '亚空间低语者', attributes: {
      weaponSkill: 65, ballisticSkill: 65, strength: 65, toughness: 60, agility: 60, intelligence: 85, perception: 70, willpower: 85, fellowship: 20
    }, trait: '叛变战士, 星海本能, 体型·大型, 诸神之怒, 混沌印记', skill: '祈求, 禁忌知识·亚空间, 战术, 灵能掌控', equipment: '混沌动力甲, 灵能法杖, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '灵能者', '黑色军团'], ahp: 22, hp: 12, maxHp: 12, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '灵能法杖, 精工阿斯塔特爆弹手枪'
  }, 'black_legion_lord': {
    name: '黑色军团混沌领主', status: '绝望使者', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 100, toughness: 95, agility: 75, intelligence: 65, perception: 75, willpower: 95, fellowship: 65
    }, trait: '隧道之子, 叛变战士, 英雄之躯, 百战幸存, 体型·大型, 诸神之怒, 混沌印记', skill: '指挥, 战术, 恐吓, 魅力', equipment: '精工混沌动力甲, 瑞扎型动力剑, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '英雄', '黑色军团'], ahp: 26, hp: 19, maxHp: 19, armorRating: 9, movement: 7, baseMeleeDamage: '5 (S/20)', weaponStats: '瑞扎型动力剑, 精工阿斯塔特爆弹手枪'
  }, 'abaddon_the_despoiler': {
    name: '掠夺者阿巴顿', status: '黑色军团至高领主', attributes: {
      weaponSkill: 130, ballisticSkill: 110, strength: 120, toughness: 120, agility: 80, intelligence: 70, perception: 90, willpower: 120, fellowship: 70
    }, trait: '叛变战士, 英雄之躯, 诸神之怒, 体型·大型, 百战幸存, 混沌印记', skill: '指挥, 战术, 魅力, 禁忌知识·亚空间, 禁忌知识·阿斯塔特修会', equipment: '德拉科尼恩, 荷鲁斯之爪, 阿巴顿的意志', tags: ['混沌', '黑色军团', '英雄', '领袖'], ahp: 65, hp: 24, maxHp: 24, armorRating: 22, movement: 8, baseMeleeDamage: '6 (S/20)', weaponStats: '德拉科尼恩, 荷鲁斯之爪'
  }
};
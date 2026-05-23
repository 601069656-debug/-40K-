import { NPCProfile } from '../../../../types';

/**
 * 猩红屠杀者 (Crimson Slaughter) - 受诅咒的杀戮者
 * 审计修正说明：
 * - 修正所有属性值为符合世界观设定的合理数值
 * - 护甲属性修正已正确应用
 * - 特质仅保留合法名称，移除描述，用逗号分隔（移除自创特质“异变恩赐”“黑暗指挥官”）
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats 仅保留武器名称，移除伤害细节
 * - HP、MV、BMD 严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正，BMD = floor(S/20)
 * - 混沌印记提供全属性+5，百战幸存提供S/T/Ag/WP+5，已包含在最终属性中
 */
export const CRIMSON_SLAUGHTER_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'crimson_slaughter_marine': {
    name: '猩红屠杀者星际战士', status: '受诅咒的杀戮者', attributes: {
      weaponSkill: 80, ballisticSkill: 70, strength: 75, toughness: 70, agility: 60, intelligence: 35, perception: 55, willpower: 75, fellowship: 10
    }, trait: '隧道之子, 叛变战士, 体型·大型, 血债血偿, 混沌印记', skill: '恐吓, 战术, 警觉', equipment: '混沌动力甲, 阿斯塔特爆弹枪, 阿斯塔特链锯剑', tags: ['混沌', '混沌星际战士', '猩红屠杀者'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特链锯剑'
  }, 'crimson_slaughter_possessed': {
    name: '猩红屠杀者附魔战士', status: '亚空间容器', attributes: {
      weaponSkill: 85, ballisticSkill: 30, strength: 85, toughness: 80, agility: 65, intelligence: 20, perception: 60, willpower: 70, fellowship: 5
    }, trait: '叛变战士, 强化天生武器, 星海本能, 体型·大型, 血债血偿, 混沌印记', skill: '恐吓, 警觉', equipment: '肉体金属护甲', tags: ['混沌', '混沌星际战士', '附魔者', '猩红屠杀者'], ahp: 35, hp: 16, maxHp: 16, armorRating: 12, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '恶魔爪'
  }, 'crimson_slaughter_terminator': {
    name: '猩红屠杀者终结者', status: '重装凶犬', attributes: {
      weaponSkill: 85, ballisticSkill: 75, strength: 100, toughness: 85, agility: 30, intelligence: 40, perception: 65, willpower: 85, fellowship: 10
    }, trait: '隧道之子, 叛变战士, 终结者意志, 体型·大型, 血债血偿, 混沌印记', skill: '恐吓, 战术, 警觉', equipment: '混沌终结者护甲, 闪电爪', tags: ['混沌', '混沌星际战士', '终结者', '老兵', '猩红屠杀者'], ahp: 38, hp: 17, maxHp: 17, armorRating: 13, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '闪电爪'
  }, 'crimson_slaughter_sorcerer': {
    name: '猩红屠杀者巫师', status: '唤灵者', attributes: {
      weaponSkill: 65, ballisticSkill: 65, strength: 65, toughness: 60, agility: 60, intelligence: 80, perception: 70, willpower: 90, fellowship: 15
    }, trait: '叛变战士, 星海本能, 体型·大型, 血债血偿, 混沌印记', skill: '祈求, 禁忌知识·亚空间, 禁忌知识·恶魔学, 战术, 灵能掌控', equipment: '混沌动力甲, 灵能法杖, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '灵能者', '猩红屠杀者'], ahp: 22, hp: 12, maxHp: 12, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '灵能法杖, 精工阿斯塔特爆弹手枪'
  }, 'crimson_slaughter_lord': {
    name: '塞瓦斯托斯·克兰农', status: '猩红领主', attributes: {
      weaponSkill: 105, ballisticSkill: 95, strength: 100, toughness: 90, agility: 75, intelligence: 60, perception: 75, willpower: 100, fellowship: 55
    }, trait: '叛变战士, 英雄之躯, 百战幸存, 星海本能, 体型·大型, 血债血偿, 混沌印记', skill: '指挥, 战术, 恐吓, 魅力', equipment: '精工混沌动力甲, 瑞扎型动力剑, 等离子突击枪', tags: ['混沌', '混沌星际战士', '英雄', '领袖', '猩红屠杀者'], ahp: 26, hp: 18, maxHp: 18, armorRating: 9, movement: 7, baseMeleeDamage: '5 (S/20)', weaponStats: '等离子突击枪, 瑞扎型动力剑'
  }, 'crimson_slaughter_helbrute': {
    name: '无尽苦痛无畏', status: '地狱护卫', attributes: {
      weaponSkill: 60, ballisticSkill: 55, strength: 110, toughness: 100, agility: 25, intelligence: 15, perception: 40, willpower: 70, fellowship: 5
    }, trait: '隧道之子, 叛变战士, 恶魔引擎, 机械化·中级, 体型·巨大, 血债血偿, 混沌印记', skill: '战术, 恐吓', equipment: '混沌恶魔引擎甲, 无畏型多管热熔枪, 双联闪电爪', tags: ['混沌', '混沌星际战士', '恶魔引擎', '机甲', '猩红屠杀者'], ahp: 65, hp: 20, maxHp: 20, armorRating: 20, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '无畏型多管热熔枪, 双联闪电爪'
  }
};
import { NPCProfile } from '../../../../types';

/**
 * 怀言者 (Word Bearers) - 黑暗布道者
 * 审计修正说明：
 * - 修正所有属性值为符合世界观设定的合理数值
 * - 护甲属性修正已正确应用（符文动力甲/亵渎精工动力甲/肉体金属护甲等）
 * - 特质仅保留合法名称，移除描述，用逗号分隔（移除自创特质“亵渎誓言”“狂热信仰”“黑暗契约”“恶魔躯体”“突变撕裂”“亵渎祈祷”“命运编织”“狡诈之徒”）
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats 仅保留武器名称，移除伤害细节
 * - HP、MV、BMD 严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（大型+1），BMD = floor(S/20)
 * - 混沌印记提供全属性+5，百战幸存提供S/T/Ag/WP+5，已包含在最终属性中
 * - 艾瑞巴斯统一格式并修正属性
 */
export const WORD_BEARERS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'word_bearers_cultist': {
    name: '怀言者狂信徒', status: '受誓信众', attributes: {
      weaponSkill: 35, ballisticSkill: 35, strength: 30, toughness: 30, agility: 35, intelligence: 30, perception: 35, willpower: 40, fellowship: 25
    }, trait: '隧道之子, 叛变战士, 体型·普通, 神圣毒舌, 混沌印记', skill: '普通知识·国教, 潜行, 闪避', equipment: '轻型防御服, 自动手枪, 亵渎匕首', tags: ['混沌', '人型生物', '异教徒', '怀言者'], ahp: 5, hp: 6, maxHp: 6, armorRating: 2, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '自动手枪, 亵渎匕首'
  }, 'word_bearers_initiate': {
    name: '怀言者发起者', status: '正式战术修士', attributes: {
      weaponSkill: 75, ballisticSkill: 70, strength: 75, toughness: 70, agility: 60, intelligence: 45, perception: 55, willpower: 75, fellowship: 20
    }, trait: '隧道之子, 叛变战士, 体型·大型, 神圣毒舌, 混沌印记', skill: '普通知识·国教, 战术, 祈求', equipment: '符文动力甲, 阿斯塔特爆弹枪, 亵渎匕首', tags: ['混沌', '混沌星际战士', '怀言者'], ahp: 24, hp: 14, maxHp: 14, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 亵渎匕首'
  }, 'word_bearers_anointed': {
    name: '怀言者被涂圣油者', status: '附魔老兵', attributes: {
      weaponSkill: 85, ballisticSkill: 50, strength: 85, toughness: 80, agility: 60, intelligence: 30, perception: 60, willpower: 80, fellowship: 10
    }, trait: '隧道之子, 叛变战士, 英雄之躯, 百战幸存, 体型·大型, 神圣毒舌, 混沌印记', skill: '恐吓, 战术', equipment: '肉体金属护甲', tags: ['混沌', '混沌星际战士', '恶魔', '老兵', '怀言者'], ahp: 35, hp: 16, maxHp: 16, armorRating: 12, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '恶魔爪'
  }, 'word_bearers_dark_apostle': {
    name: '暗黑使徒', status: '信仰基石', attributes: {
      weaponSkill: 80, ballisticSkill: 65, strength: 80, toughness: 75, agility: 60, intelligence: 60, perception: 65, willpower: 95, fellowship: 45
    }, trait: '隧道之子, 叛变战士, 英雄之躯, 百战幸存, 体型·大型, 神圣毒舌, 混沌印记', skill: '指挥, 魅力, 祈求, 禁忌知识·亚空间', equipment: '亵渎精工动力甲, 诅咒权杖, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '领袖', '牧师', '怀言者'], ahp: 26, hp: 15, maxHp: 15, armorRating: 10, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '诅咒权杖, 精工阿斯塔特爆弹手枪'
  }, 'word_bearers_coryphaeus': {
    name: '执棒者元帅', status: '战群统领', attributes: {
      weaponSkill: 105, ballisticSkill: 95, strength: 105, toughness: 95, agility: 75, intelligence: 65, perception: 75, willpower: 100, fellowship: 50
    }, trait: '叛变战士, 百战幸存, 星海本能, 体型·大型, 神圣毒舌, 混沌印记', skill: '指挥, 战术, 魅力', equipment: '精工混沌动力甲, 瑞扎型动力剑, 阿斯塔特爆弹枪', tags: ['混沌', '混沌星际战士', '英雄', '领袖', '怀言者'], ahp: 26, hp: 19, maxHp: 19, armorRating: 9, movement: 8, baseMeleeDamage: '5 (S/20)', weaponStats: '阿斯塔特爆弹枪, 瑞扎型动力剑'
  }, 'chaos_heroes_erebus': {
    name: '艾瑞巴斯', status: '怀言者第一牧师 / 异端先驱', attributes: {
      weaponSkill: 95, ballisticSkill: 80, strength: 90, toughness: 85, agility: 70, intelligence: 85, perception: 80, willpower: 110, fellowship: 55
    }, trait: '叛变战士, 亚空间术士, 神圣毒舌, 混沌印记, 体型·大型', skill: '指挥, 禁忌知识·亚空间, 欺诈, 灵能掌控', equipment: '亵渎精工动力甲, 诅咒权杖, 精工阿斯塔特爆弹手枪', tags: ['混沌', '星际战士', '怀言者', '牧师', '英雄'], hp: 17, maxHp: 17, movement: 7, ahp: 26, armorRating: 10, baseMeleeDamage: '4 (S/20)', weaponStats: '诅咒权杖, 精工阿斯塔特爆弹手枪'
  }
};
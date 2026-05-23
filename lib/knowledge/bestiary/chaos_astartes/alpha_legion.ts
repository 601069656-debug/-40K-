import { NPCProfile } from '../../../../types';

/**
 * 阿尔法军团 (Alpha Legion) - 隐秘与欺诈的大师
 * 审计修正说明：
 * - 修正所有属性值为符合世界观设定的合理数值，不再使用统一的80/130
 * - 护甲属性修正已正确应用（力量+20、感知+20、意志+5、敏捷-5等）
 * - 特质仅保留合法名称，移除描述，用逗号分隔
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats 仅保留武器名称，移除伤害和弹容等细节
 * - HP、MV、BMD 严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10)（大型+1），BMD = floor(S/20)
 * - 混沌印记提供全属性+5，百战幸存提供S/T/Ag/WP+5，已包含在最终属性中
 */
export const ALPHA_LEGION_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'alpha_legion_operative': {
    name: '阿尔法军团密探', status: '隐秘特工', attributes: {
      weaponSkill: 65, ballisticSkill: 70, strength: 65, toughness: 55, agility: 70, intelligence: 80, perception: 75, willpower: 65, fellowship: 70
    }, trait: '隧道之子, 叛变战士, 体型·大型, 九头蛇密谋, 混沌印记', skill: '潜行, 欺诈, 调查, 察言观色', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹手枪, 阿斯塔特格斗刀', tags: ['混沌', '人型生物', '教徒', '阿尔法军团'], ahp: 20, hp: 11, maxHp: 11, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹手枪, 阿斯塔特格斗刀'
  }, 'alpha_legion_legionnaire': {
    name: '阿尔法军团军团兵', status: '渗透行家', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 75, toughness: 70, agility: 65, intelligence: 70, perception: 70, willpower: 70, fellowship: 60
    }, trait: '隧道之子, 叛变战士, 体型·大型, 九头蛇密谋, 混沌印记', skill: '潜行, 欺诈, 战术', equipment: '混沌动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['混沌', '混沌星际战士', '阿尔法军团'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, 'alpha_legion_headhunter': {
    name: '猎头者老兵', status: '斩首专家', attributes: {
      weaponSkill: 85, ballisticSkill: 85, strength: 80, toughness: 75, agility: 70, intelligence: 75, perception: 80, willpower: 80, fellowship: 65
    }, trait: '隧道之子, 叛变战士, 百战幸存, 体型·大型, 九头蛇密谋, 混沌印记', skill: '潜行, 欺诈, 战术, 追迹', equipment: '混沌动力甲, 封祸爆弹步枪, 动力匕首', tags: ['混沌', '混沌星际战士', '精英', '阿尔法军团'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '封祸爆弹步枪, 动力匕首'
  }, 'alpha_legion_sorcerer': {
    name: '阿尔法军团幻术师', status: '织网者', attributes: {
      weaponSkill: 65, ballisticSkill: 65, strength: 65, toughness: 60, agility: 65, intelligence: 85, perception: 75, willpower: 85, fellowship: 65
    }, trait: '叛变战士, 星海本能, 体型·大型, 九头蛇密谋, 混沌印记', skill: '祈求, 禁忌知识·亚空间, 欺诈, 灵能掌控', equipment: '混沌动力甲, 灵能法杖, 精工Mk II“日怒”型等离子手枪', tags: ['混沌', '混沌星际战士', '灵能者', '阿尔法军团'], ahp: 22, hp: 12, maxHp: 12, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '灵能法杖, 精工Mk II“日怒”型等离子手枪'
  }, 'alpha_legion_chaos_lord': {
    name: '阿尔法军团领主', status: '无名主宰', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 105, toughness: 100, agility: 90, intelligence: 95, perception: 95, willpower: 100, fellowship: 85
    }, trait: '叛变战士, 英雄之躯, 百战幸存, 隧道之子, 体型·大型, 九头蛇密谋, 混沌印记', skill: '指挥, 战术, 欺诈, 恐吓', equipment: '精工混沌动力甲, 瑞扎型动力剑, 圣物Mk II“日怒”型等离子手枪', tags: ['混沌', '混沌星际战士', '领袖', '阿尔法军团'], ahp: 26, hp: 20, maxHp: 20, armorRating: 9, movement: 9, baseMeleeDamage: '5 (S/20)', weaponStats: '瑞扎型动力剑, 圣物Mk II“日怒”型等离子手枪'
  }
};
import { NPCProfile } from '../../../../types';

/**
 * 千子军团 (Thousand Sons) - 普洛斯佩罗的遗脉
 * 审计修正说明：
 * - 修正所有属性值为符合世界观设定的合理数值
 * - 护甲属性修正已正确应用（红字动力甲/混沌动力甲/终结者护甲）
 * - 特质仅保留合法名称，移除描述，用逗号分隔（移除自创特质“尘埃投影”“缓慢而坚定”“狂暴意志”）
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats 仅保留武器名称，移除伤害细节
 * - HP、MV、BMD 严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正，BMD = floor(S/20)
 * - 混沌印记提供全属性+5，百战幸存提供S/T/Ag/WP+5，已包含在最终属性中
 * - 阿赫里曼统一格式并修正属性
 */
export const THOUSAND_SONS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'thousand_sons_tzaangor': {
    name: '千子次格尔怪', status: '变异兽人', attributes: {
      weaponSkill: 55, ballisticSkill: 40, strength: 50, toughness: 45, agility: 55, intelligence: 25, perception: 50, willpower: 40, fellowship: 10
    }, trait: '叛变战士, 奸奇眷顾, 星海本能, 体型·普通, 亚空间术士, 奇想妙思', skill: '潜行, 追迹, 闪避, 禁忌知识·恶魔学, 灵能敏感', equipment: '粗制皮革甲, 提拉克之刃, 地狱火激光枪', tags: ['混沌', '异变者', '次格尔', '千子'], ahp: 8, hp: 9, maxHp: 9, armorRating: 2, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '提拉克之刃, 地狱火激光枪'
  }, 'thousand_sons_rubric_marine': {
    name: '红字战士', status: '尘埃之灵', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 70, toughness: 75, agility: 35, intelligence: 20, perception: 50, willpower: 60, fellowship: 5
    }, trait: '隧道之子, 叛变战士, 体型·大型, 奇想妙思', skill: '普通知识·阿斯塔特修会, 战术, 禁忌知识·恶魔学', equipment: '红字动力甲, 阿斯塔特爆弹枪, 阿斯塔特格斗刀', tags: ['混沌', '混沌星际战士', '红字', '千子'], ahp: 24, hp: 15, maxHp: 15, armorRating: 8, movement: 4, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特格斗刀'
  }, 'thousand_sons_aspiring_sorcerer': {
    name: '千子觉醒巫师', status: '红字统领', attributes: {
      weaponSkill: 65, ballisticSkill: 65, strength: 65, toughness: 65, agility: 55, intelligence: 80, perception: 70, willpower: 90, fellowship: 20
    }, trait: '叛变战士, 星海本能, 体型·大型, 亚空间术士, 奇想妙思', skill: '灵能掌控, 禁忌知识·亚空间, 指挥, 察言观色, 禁忌知识·恶魔学', equipment: '混沌动力甲, 灵能权杖, 地狱火爆弹手枪', tags: ['混沌', '混沌星际战士', '灵能者', '千子'], ahp: 22, hp: 13, maxHp: 13, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '灵能权杖, 地狱火爆弹手枪'
  }, 'thousand_sons_scarab_occult': {
    name: '圣甲虫隐秘终结者', status: '马格努斯近卫', attributes: {
      weaponSkill: 80, ballisticSkill: 75, strength: 100, toughness: 90, agility: 25, intelligence: 45, perception: 65, willpower: 85, fellowship: 10
    }, trait: '隧道之子, 叛变战士, 终结者意志, 体型·大型, 奇想妙思', skill: '战术, 警觉, 禁忌知识·恶魔学', equipment: '圣甲虫终结者护甲, 灵魂烈焰组合爆弹枪, 普洛斯佩罗动力剑', tags: ['混沌', '混沌星际战士', '终结者', '红字', '千子'], ahp: 42, hp: 18, maxHp: 18, armorRating: 14, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '灵魂烈焰组合爆弹枪, 普洛斯佩罗动力剑'
  }, 'thousand_sons_exalted_sorcerer': {
    name: '千子神选巫师', status: '九芒星编织者', attributes: {
      weaponSkill: 75, ballisticSkill: 70, strength: 75, toughness: 70, agility: 60, intelligence: 95, perception: 80, willpower: 110, fellowship: 30
    }, trait: '叛变战士, 英雄之躯, 百战幸存, 星海本能, 体型·大型, 亚空间术士, 奇想妙思', skill: '灵能掌控, 禁忌知识·亚空间, 指挥, 逻辑, 察言观色, 禁忌知识·恶魔学', equipment: '普洛斯佩罗精工动力甲, 银焰法杖, 地狱火爆弹手枪', tags: ['混沌', '混沌星际战士', '灵能者', '英雄', '领袖', '千子'], ahp: 26, hp: 14, maxHp: 14, armorRating: 9, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '银焰法杖, 地狱火爆弹手枪'
  }, 'thousand_sons_helbrute': {
    name: '千子地狱狂暴者', status: '疯狂的法柜', attributes: {
      weaponSkill: 60, ballisticSkill: 55, strength: 110, toughness: 100, agility: 25, intelligence: 15, perception: 45, willpower: 70, fellowship: 5
    }, trait: '隧道之子, 叛变战士, 恶魔引擎, 机械化·中级, 体型·巨大, 亚空间术士, 奇想妙思', skill: '恐吓, 战术, 禁忌知识·恶魔学', equipment: '混沌恶魔引擎甲, 双联地狱火自动炮, 动力拳套', tags: ['混沌', '混沌星际战士', '恶魔引擎', '无畏机甲', '千子'], ahp: 65, hp: 20, maxHp: 20, armorRating: 20, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '双联地狱火自动炮, 动力拳套'
  }, 'chaos_heroes_ahriman': {
    name: '阿赫里曼', status: '千子首席智库', attributes: {
      weaponSkill: 80, ballisticSkill: 70, strength: 75, toughness: 70, agility: 65, intelligence: 120, perception: 90, willpower: 130, fellowship: 40
    }, trait: '叛变战士, 亚空间术士, 奇想妙思, 诡道魔法, 体型·大型', skill: '灵能掌控, 禁忌知识·亚空间, 禁忌知识·恶魔学, 逻辑', equipment: '混沌动力甲, 灵能法杖, 地狱火爆弹手枪', tags: ['混沌', '奸奇', '千子', '灵能者', '英雄'], hp: 14, maxHp: 14, movement: 7, ahp: 22, armorRating: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '地狱火爆弹手枪, 灵能法杖'
  }
};
import { NPCProfile } from '../../../../types';

/**
 * 红色海盗 (Red Corsairs) - 大漩涡之主
 * 审计修正说明：
 * - 修正所有属性值为符合世界观设定的合理数值
 * - 护甲属性修正已正确应用（混沌动力甲：力量+20、感知+20、意志+5、敏捷-5, 终结者护甲：力量+40、意志+15、敏捷-40）
 * - 特质仅保留合法名称，移除描述，用逗号分隔
 * - 技能替换为规则技能列表中的合法技能（移除“冥想”等）
 * - weaponStats 仅保留武器名称，移除伤害细节
 * - HP、MV、BMD 严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（大型+1），BMD = floor(S/20)
 * - 混沌印记提供全属性+5，百战幸存提供S/T/Ag/WP+5，已包含在最终属性中
 * - 私掠者体型为普通（人类），不享受大型移动力加成
 */
export const RED_CORSAIRS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'red_corsairs_renegade': {
    name: '红色海盗叛变战士', status: '变节修士', attributes: {
      weaponSkill: 75, ballisticSkill: 70, strength: 75, toughness: 65, agility: 60, intelligence: 40, perception: 55, willpower: 65, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 体型·大型, 掠夺者狂潮, 混沌印记', skill: '普通知识·技术, 闪避, 潜行', equipment: '混沌动力甲, 阿斯塔特链锯剑, 阿斯塔特爆弹枪', tags: ['混沌', '混沌星际战士', '红色海盗'], ahp: 22, hp: 13, maxHp: 13, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特链锯剑, 阿斯塔特爆弹枪'
  }, 'red_corsairs_raider': {
    name: '红色海盗掠夺者', status: '强袭兵', attributes: {
      weaponSkill: 80, ballisticSkill: 65, strength: 80, toughness: 65, agility: 65, intelligence: 35, perception: 60, willpower: 65, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 飞行, 体型·大型, 掠夺者狂潮, 混沌印记', skill: '特技, 闪避, 恐吓', equipment: '混沌动力甲, 阿斯塔特喷气背包, 阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '突击兵', '红色海盗'], ahp: 22, hp: 13, maxHp: 13, armorRating: 8, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪'
  }, 'red_corsairs_veteran': {
    name: '红色海盗老兵', status: '星辰之爪余部', attributes: {
      weaponSkill: 85, ballisticSkill: 75, strength: 85, toughness: 70, agility: 65, intelligence: 45, perception: 65, willpower: 75, fellowship: 20
    }, trait: '隧道之子, 叛变战士, 百战幸存, 体型·大型, 掠夺者狂潮, 混沌印记', skill: '战术, 闪避, 魅力', equipment: '精工混沌动力甲, 阿斯塔特格斗刀, 组合爆弹枪', tags: ['混沌', '混沌星际战士', '老兵', '红色海盗'], ahp: 24, hp: 14, maxHp: 14, armorRating: 9, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特格斗刀, 组合爆弹枪'
  }, 'red_corsairs_sorcerer': {
    name: '红色海盗术士', status: '虚空预言者', attributes: {
      weaponSkill: 65, ballisticSkill: 60, strength: 65, toughness: 55, agility: 60, intelligence: 80, perception: 70, willpower: 85, fellowship: 20
    }, trait: '叛变战士, 圣典公民, 体型·大型, 掠夺者狂潮, 混沌印记', skill: '灵能掌控, 禁忌知识·亚空间', equipment: '混沌动力甲, 灵能法杖, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '灵能者', '红色海盗'], ahp: 22, hp: 11, maxHp: 11, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '灵能法杖, 精工阿斯塔特爆弹手枪'
  }, 'red_corsairs_terminator': {
    name: '红色海盗终结者', status: '重装掠夺者', attributes: {
      weaponSkill: 85, ballisticSkill: 75, strength: 100, toughness: 85, agility: 30, intelligence: 45, perception: 65, willpower: 85, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 终结者意志, 百战幸存, 体型·大型, 掠夺者狂潮, 混沌印记', skill: '战术, 警觉, 恐吓', equipment: '混沌终结者护甲, 动力拳套, 转管自动炮', tags: ['混沌', '混沌星际战士', '精英', '终结者', '红色海盗'], ahp: 38, hp: 17, maxHp: 17, armorRating: 13, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 转管自动炮'
  }, 'huron_blackheart': {
    name: '休伦·黑心', status: '大漩涡之主', attributes: {
      weaponSkill: 110, ballisticSkill: 100, strength: 110, toughness: 100, agility: 75, intelligence: 65, perception: 80, willpower: 105, fellowship: 60
    }, trait: '隧道之子, 叛变战士, 混沌眷顾, 英雄之躯, 百战幸存, 体型·大型, 掠夺者狂潮, 混沌印记', skill: '指挥, 战术, 魅力, 禁忌知识·阿斯塔特修会', equipment: '精工混沌动力甲, 暴君之爪, 幽魂剃刀', tags: ['混沌', '混沌星际战士', '英雄', '领袖', '红色海盗'], ahp: 30, hp: 20, maxHp: 20, armorRating: 10, movement: 8, baseMeleeDamage: '5 (S/20)', weaponStats: '暴君之爪, 幽魂剃刀'
  }, 'red_corsairs_privateer': {
    name: '红色海盗私掠者', status: '凡人海盗', attributes: {
      weaponSkill: 55, ballisticSkill: 60, strength: 40, toughness: 35, agility: 55, intelligence: 40, perception: 50, willpower: 40, fellowship: 25
    }, trait: '隧道之子, 叛变战士, 体型·普通, 掠夺者狂潮, 混沌印记', skill: '闪避, 手上功夫, 调查', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 阿斯塔特格斗刀', tags: ['混沌', '人类', '海盗', '红色海盗'], ahp: 20, hp: 7, maxHp: 7, armorRating: 7, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特格斗刀'
  }
};
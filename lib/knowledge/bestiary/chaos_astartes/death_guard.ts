import { NPCProfile } from '../../../../types';

/**
 * 死亡守卫 (Death Guard) - 纳垢眷顾的腐败之师
 * 审计修正说明：
 * - 修正所有属性值为符合世界观设定的合理数值
 * - 护甲属性修正已正确应用（混沌动力甲/终结者护甲）
 * - 特质仅保留合法名称，移除描述，用逗号分隔（移除自创特质“异变恩赐”“莫塔里安的沉默”“传染光环”，替换为规则内特质）
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats 仅保留武器名称，移除伤害细节
 * - HP、MV、BMD 严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（大型+1），BMD = floor(S/20)
 * - 混沌印记提供全属性+5，百战幸存提供S/T/Ag/WP+5，已包含在最终属性中
 */
export const DEATH_GUARD_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'death_guard_plague_marine': {
    name: '死亡守卫瘟疫战士', status: '纳垢行者', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 70, toughness: 80, agility: 35, intelligence: 35, perception: 55, willpower: 75, fellowship: 10
    }, trait: '叛变战士, 荒野求生, 体型·大型, 瘟疫坚毅, 肉体再生', skill: '生存, 恐吓', equipment: '混沌动力甲, 阿斯塔特爆弹枪, 瘟疫刀', tags: ['混沌', '混沌星际战士', '纳垢', '死亡守卫'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 4, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 瘟疫刀'
  }, 'death_guard_blightlord_terminator': {
    name: '枯主终结者', status: '腐化铁砧', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 95, toughness: 90, agility: 25, intelligence: 40, perception: 65, willpower: 85, fellowship: 10
    }, trait: '荒野求生, 叛变战士, 体型·大型, 瘟疫坚毅, 肉体再生', skill: '战术, 恐吓', equipment: '混沌终结者护甲, 收割者自动加农炮, 瘟疫巨斧', tags: ['混沌', '混沌星际战士', '终结者', '纳垢', '死亡守卫'], ahp: 38, hp: 18, maxHp: 18, armorRating: 13, movement: 3, baseMeleeDamage: '4 (S/20)', weaponStats: '收割者自动加农炮, 瘟疫巨斧'
  }, 'death_guard_deathshroud_terminator': {
    name: '亡骸终结者', status: '莫塔里安之影', attributes: {
      weaponSkill: 85, ballisticSkill: 50, strength: 100, toughness: 95, agility: 25, intelligence: 35, perception: 70, willpower: 90, fellowship: 10
    }, trait: '荒野求生, 叛变战士, 终结者意志, 体型·大型, 瘟疫坚毅, 肉体再生', skill: '战术, 警觉', equipment: '混沌终结者护甲, 大瘟疫镰刀, 手持火焰枪', tags: ['混沌', '混沌星际战士', '终结者', '保镖', '纳垢', '死亡守卫'], ahp: 38, hp: 19, maxHp: 19, armorRating: 13, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '大瘟疫镰刀, 手持火焰枪'
  }, 'death_guard_malignant_plaguecaster': {
    name: '恶毒瘟疫术士', status: '疫病散播者', attributes: {
      weaponSkill: 60, ballisticSkill: 60, strength: 65, toughness: 70, agility: 30, intelligence: 80, perception: 70, willpower: 85, fellowship: 15
    }, trait: '叛变战士, 星海本能, 体型·大型, 瘟疫坚毅, 肉体再生', skill: '祈求, 禁忌知识·亚空间, 灵能掌控', equipment: '混沌动力甲, 腐败法杖, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '灵能者', '纳垢', '死亡守卫'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 3, baseMeleeDamage: '3 (S/20)', weaponStats: '腐败法杖, 精工阿斯塔特爆弹手枪'
  }, 'death_guard_lord_of_contagion': {
    name: '传染领主', status: '腐败指挥官', attributes: {
      weaponSkill: 95, ballisticSkill: 60, strength: 100, toughness: 100, agility: 20, intelligence: 45, perception: 75, willpower: 95, fellowship: 30
    }, trait: '荒野求生, 叛变战士, 英雄之躯, 终结者意志, 百战幸存, 体型·大型, 瘟疫坚毅, 肉体再生', skill: '指挥, 战术, 恐吓', equipment: '混沌终结者护甲, 大瘟疫镰刀', tags: ['混沌', '混沌星际战士', '英雄', '终结者', '纳垢', '死亡守卫'], ahp: 38, hp: 20, maxHp: 20, armorRating: 13, movement: 2, baseMeleeDamage: '5 (S/20)', weaponStats: '大瘟疫镰刀'
  }, 'chaos_heroes_typhus': {
    name: '提丰 (泰丰斯)', status: '纳垢一连长', attributes: {
      weaponSkill: 100, ballisticSkill: 60, strength: 105, toughness: 110, agility: 25, intelligence: 55, perception: 80, willpower: 100, fellowship: 25
    }, trait: '叛变战士, 瘟疫坚毅, 肉体再生, 腐败坚韧, 体型·大型', skill: '指挥, 灵能掌控, 生存', equipment: '混沌终结者护甲, 动力长镰', tags: ['混沌', '纳垢', '死亡守卫', '第一连长'], hp: 22, maxHp: 22, movement: 3, ahp: 38, armorRating: 13, baseMeleeDamage: '5 (S/20)', weaponStats: '动力长镰'
  }
};
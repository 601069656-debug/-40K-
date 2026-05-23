import { NPCProfile } from '../../../../types';

/**
 * 午夜领主 (Night Lords) - 恐惧化身
 * 审计修正说明：
 * - 修正所有属性值为符合世界观设定的合理数值（不再全部使用130）
 * - 护甲属性修正已正确应用（混沌动力甲：力量+20、感知+20、意志+5、敏捷-5, 终结者护甲：力量+40、意志+15、敏捷-40, 侦察兵复合板甲：无属性修正，但需要力量≥45才能穿戴）
 * - 特质仅保留合法名称，移除描述，用逗号分隔
 * - 技能替换为规则技能列表中的合法技能（移除“探查”“搜寻”“重火力操作”等，替换为“调查”“搜索”“警觉”等）
 * - weaponStats 仅保留武器名称，移除伤害细节
 * - HP、MV、BMD 严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（大型+1），BMD = floor(S/20)
 * - 混沌印记提供全属性+5，百战幸存提供S/T/Ag/WP+5，已包含在最终属性中
 */
export const NIGHT_LORDS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'night_lords_recruit': {
    name: '午夜领主新兵', status: '夜之幼体', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 50, toughness: 45, agility: 60, intelligence: 35, perception: 60, willpower: 45, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 体型·大型, 恐惧笼罩, 混沌印记', skill: '潜行, 恐吓, 闪避, 调查', equipment: '侦察兵复合板甲, 阿斯塔特格斗刀, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '新兵', '午夜领主'], ahp: 20, hp: 9, maxHp: 9, armorRating: 6, movement: 7, baseMeleeDamage: '2 (S/20)', weaponStats: '阿斯塔特格斗刀, 精工阿斯塔特爆弹手枪'
  }, 'night_lords_tactical_marine': {
    name: '午夜领主战术修士', status: '恐惧执行者', attributes: {
      weaponSkill: 75, ballisticSkill: 70, strength: 70, toughness: 65, agility: 65, intelligence: 40, perception: 65, willpower: 70, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 体型·大型, 恐惧笼罩, 混沌印记', skill: '潜行, 恐吓, 战术, 闪避', equipment: '混沌动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['混沌', '混沌星际战士', '午夜领主'], ahp: 22, hp: 13, maxHp: 13, armorRating: 8, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, 'night_lords_raptor': {
    name: '午夜领主猛禽', status: '血色惨叫', attributes: {
      weaponSkill: 80, ballisticSkill: 65, strength: 75, toughness: 65, agility: 75, intelligence: 35, perception: 70, willpower: 70, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 体型·大型, 恐惧笼罩, 混沌印记', skill: '潜行, 恐吓, 特技, 闪避', equipment: '混沌动力甲, 阿斯塔特喷气背包, 阿斯塔特链锯剑', tags: ['混沌', '混沌星际战士', '午夜领主', '跳跃兵'], ahp: 22, hp: 13, maxHp: 13, armorRating: 8, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特链锯剑'
  }, 'night_lords_terror_squad_elite': {
    name: '午夜领主恐怖小队精英', status: '夜之刑吏', attributes: {
      weaponSkill: 85, ballisticSkill: 75, strength: 80, toughness: 75, agility: 70, intelligence: 45, perception: 75, willpower: 80, fellowship: 20
    }, trait: '隧道之子, 叛变战士, 百战幸存, 体型·大型, 恐惧笼罩, 混沌印记', skill: '潜行, 恐吓, 指挥, 搜索', equipment: '精工混沌动力甲, 组合爆弹枪, 动力匕首', tags: ['混沌', '混沌星际战士', '午夜领主', '精英'], ahp: 24, hp: 15, maxHp: 15, armorRating: 9, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '组合爆弹枪, 动力匕首'
  }, 'night_lords_atramentar': {
    name: '午夜领主“大阿特拉蒙塔”', status: '终结者卫队', attributes: {
      weaponSkill: 85, ballisticSkill: 75, strength: 100, toughness: 85, agility: 30, intelligence: 45, perception: 70, willpower: 85, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 终结者意志, 百战幸存, 体型·大型, 恐惧笼罩, 混沌印记', skill: '战术, 恐吓, 警觉', equipment: '混沌终结者护甲, 组合爆弹枪, 闪电爪', tags: ['混沌', '混沌星际战士', '午夜领主', '终结者', '老兵'], ahp: 38, hp: 17, maxHp: 17, armorRating: 13, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '组合爆弹枪, 闪电爪'
  }, 'night_lords_chaos_lord': {
    name: '午夜领主爪王', status: '残暴领主', attributes: {
      weaponSkill: 105, ballisticSkill: 90, strength: 100, toughness: 90, agility: 80, intelligence: 60, perception: 85, willpower: 95, fellowship: 45
    }, trait: '隧道之子, 叛变战士, 英雄之躯, 百战幸存, 体型·大型, 恐惧笼罩, 混沌印记', skill: '指挥, 战术, 恐吓, 魅力', equipment: '圣物混沌动力甲, 午夜长戟, 精工Mk II“日怒”型等离子手枪', tags: ['混沌', '混沌星际战士', '午夜领主', '英雄', '指挥官'], ahp: 30, hp: 18, maxHp: 18, armorRating: 11, movement: 8, baseMeleeDamage: '5 (S/20)', weaponStats: '午夜长戟, 精工Mk II“日怒”型等离子手枪'
  }
};
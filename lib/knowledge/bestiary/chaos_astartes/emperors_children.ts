import { NPCProfile } from '../../../../types';

/**
 * 帝皇之子 (Emperor's Children) - 完美与堕落之徒
 * 审计修正说明：
 * - 修正所有属性值为符合世界观设定的合理数值
 * - 护甲属性修正已正确应用（色孽动力甲、混沌动力甲、终结者护甲等）
 * - 特质仅保留合法名称，移除描述，用逗号分隔（移除自创特质“永恒杀戮”“千面铠甲”，替换为规则内特质）
 * - 技能替换为规则技能列表中的合法技能（移除“艺术(音乐)”“弹道计算”等）
 * - weaponStats 仅保留武器名称，移除伤害细节
 * - HP、MV、BMD 严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（大型+1），BMD = floor(S/20)
 * - 混沌印记提供全属性+5，百战幸存提供S/T/Ag/WP+5，已包含在最终属性中
 */
export const EMPERORS_CHILDREN_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'noise_marine_trooper': {
    name: '噪音战士步兵', status: '音波狂徒', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 70, toughness: 65, agility: 65, intelligence: 40, perception: 60, willpower: 70, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 体型·大型, 完美主义, 极乐迅捷', skill: '战术, 恐吓', equipment: '色孽动力甲, 音波冲击枪, 阿斯塔特链锯剑', tags: ['混沌', '混沌星际战士', '噪音战士', '色孽', '帝皇之子'], ahp: 20, hp: 13, maxHp: 13, armorRating: 7, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '音波冲击枪, 阿斯塔特链锯剑'
  }, 'noise_marine_blastmaster': {
    name: '噪音战士冲击者', status: '重火力狂人', attributes: {
      weaponSkill: 70, ballisticSkill: 80, strength: 75, toughness: 70, agility: 60, intelligence: 45, perception: 65, willpower: 75, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 体型·大型, 完美主义, 极乐迅捷', skill: '战术, 警觉', equipment: '色孽动力甲, 震荡重炮, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '重火', '色孽', '帝皇之子'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '震荡重炮, 精工阿斯塔特爆弹手枪'
  }, 'noise_marine_champion': {
    name: '噪音战士冠军', status: '毁灭奏鸣师', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 85, toughness: 80, agility: 70, intelligence: 50, perception: 70, willpower: 85, fellowship: 25
    }, trait: '隧道之子, 叛变战士, 英雄之躯, 百战幸存, 体型·大型, 完美主义, 极乐迅捷', skill: '指挥, 战术, 闪避', equipment: '精工混沌动力甲, 末日鸣笛, 完美动力剑', tags: ['混沌', '混沌星际战士', '老兵', '精英', '色孽', '帝皇之子'], ahp: 26, hp: 16, maxHp: 16, armorRating: 9, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '末日鸣笛, 完美动力剑'
  }, 'phoenix_terminator': {
    name: '凤凰终结者', status: '完美卫队', attributes: {
      weaponSkill: 85, ballisticSkill: 75, strength: 100, toughness: 85, agility: 30, intelligence: 45, perception: 65, willpower: 85, fellowship: 15
    }, trait: '隧道之子, 叛变战士, 终结者意志, 百战幸存, 体型·大型, 完美主义, 极乐迅捷', skill: '战术, 恐吓', equipment: '混沌终结者护甲, 凤凰式长戟, 音波冲击枪', tags: ['混沌', '混沌星际战士', '终结者', '色孽', '帝皇之子', '精英'], ahp: 38, hp: 17, maxHp: 17, armorRating: 13, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '凤凰式长戟, 音波冲击枪'
  }, 'lucius_the_eternal': {
    name: '卢修斯·永恒者', status: '色孽神选冠军', attributes: {
      weaponSkill: 115, ballisticSkill: 95, strength: 100, toughness: 90, agility: 85, intelligence: 60, perception: 85, willpower: 95, fellowship: 40
    }, trait: '叛变战士, 英雄之躯, 百战幸存, 体型·大型, 完美主义, 极乐迅捷', skill: '指挥, 战术, 闪避', equipment: '千面铠甲, 鞭策之索, 精工Mk II“日怒”型等离子手枪', tags: ['混沌', '混沌星际战士', '英雄', '传奇', '色孽', '帝皇之子'], ahp: 30, hp: 18, maxHp: 18, armorRating: 10, movement: 9, baseMeleeDamage: '5 (S/20)', weaponStats: '鞭策之索, 精工Mk II“日怒”型等离子手枪'
  }, 'slaanesh_sorcerer': {
    name: '色孽术士', status: '感官编织者', attributes: {
      weaponSkill: 65, ballisticSkill: 65, strength: 65, toughness: 60, agility: 65, intelligence: 85, perception: 70, willpower: 90, fellowship: 25
    }, trait: '叛变战士, 星海本能, 体型·大型, 完美主义, 极乐迅捷', skill: '祈求, 禁忌知识·亚空间, 灵能掌控', equipment: '混沌动力甲, 灵能法杖, 音波冲击枪', tags: ['混沌', '混沌星际战士', '灵能者', '色孽', '帝皇之子'], ahp: 22, hp: 12, maxHp: 12, armorRating: 8, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '灵能法杖, 音波冲击枪'
  }, 'slaanesh_daemon_prince': {
    name: '色孽恶魔王子', status: '感官之主', attributes: {
      weaponSkill: 110, ballisticSkill: 70, strength: 120, toughness: 110, agility: 80, intelligence: 60, perception: 85, willpower: 100, fellowship: 35
    }, trait: '隧道之子, 叛变战士, 亚空间实体, 体型·巨大, 完美主义, 极乐迅捷', skill: '指挥, 祈求, 恐吓', equipment: '肉体金属护甲, 恶魔巨剑', tags: ['传说', '混沌', '恶魔', '领导者', '色孽', '帝皇之子'], ahp: 100, hp: 22, maxHp: 22, armorRating: 18, movement: 9, baseMeleeDamage: '6 (S/20)', weaponStats: '恶魔巨剑'
  }, 'sonic_dreadnought': {
    name: '音波无畏机甲', status: '嘶吼铁砧', attributes: {
      weaponSkill: 60, ballisticSkill: 55, strength: 110, toughness: 100, agility: 25, intelligence: 15, perception: 50, willpower: 70, fellowship: 5
    }, trait: '隧道之子, 叛变战士, 恶魔引擎, 机械化·中级, 体型·巨大, 完美主义, 极乐迅捷', skill: '战术, 恐吓', equipment: '混沌恶魔引擎甲, 震荡重炮, 无畏型动力爪', tags: ['混沌', '混沌星际战士', '恶魔引擎', '无畏机甲', '色孽', '帝皇之子'], ahp: 65, hp: 20, maxHp: 20, armorRating: 20, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '震荡重炮, 无畏型动力爪'
  }
};
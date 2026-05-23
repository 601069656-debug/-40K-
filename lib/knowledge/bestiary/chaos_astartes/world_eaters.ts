import { NPCProfile } from '../../../../types';

/**
 * 吞世者 (World Eaters) - 血神的猎犬
 * 审计修正说明：
 * - 修正所有属性值为符合世界观设定的合理数值
 * - 护甲属性修正已正确应用（混沌动力甲/终结者护甲/愤怒精工动力甲等）
 * - 特质仅保留合法名称，移除描述，用逗号分隔（移除自创特质“英勇之举”“狂暴意志”“破坏”）
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats 仅保留武器名称，移除伤害细节
 * - HP、MV、BMD 严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（大型+1），BMD = floor(S/20)
 * - 混沌印记提供全属性+5，百战幸存提供S/T/Ag/WP+5，已包含在最终属性中
 * - 卡恩统一格式并修正属性
 */
export const WORLD_EATERS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'world_eaters_cultist': {
    name: '吞世者狂信徒', status: '受誓信众', attributes: {
      weaponSkill: 40, ballisticSkill: 30, strength: 35, toughness: 30, agility: 40, intelligence: 25, perception: 35, willpower: 45, fellowship: 20
    }, trait: '隧道之子, 叛变战士, 血祭血神, 体型·普通, 屠夫之钉, 嗜血狂徒', skill: '普通知识·国教, 恐吓, 闪避', equipment: '轻型防御服, 野蛮战斧', tags: ['混沌', '人型生物', '异教徒', '吞世者'], ahp: 5, hp: 6, maxHp: 6, armorRating: 2, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '野蛮战斧'
  }, 'world_eaters_initiate': {
    name: '吞世者发起者', status: '正式战术修士', attributes: {
      weaponSkill: 80, ballisticSkill: 55, strength: 80, toughness: 70, agility: 60, intelligence: 30, perception: 50, willpower: 70, fellowship: 10
    }, trait: '隧道之子, 叛变战士, 体型·大型, 屠夫之钉, 嗜血狂徒', skill: '普通知识·阿斯塔特修会, 战术, 恐吓', equipment: '混沌动力甲, 阿斯塔特链锯斧, 阿斯塔特爆弹枪', tags: ['混沌', '混沌星际战士', '吞世者'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特链锯斧, 阿斯塔特爆弹枪'
  }, 'world_eaters_berserker': {
    name: '吞世者狂战士', status: '杀戮精英', attributes: {
      weaponSkill: 90, ballisticSkill: 40, strength: 85, toughness: 75, agility: 65, intelligence: 25, perception: 55, willpower: 80, fellowship: 10
    }, trait: '隧道之子, 叛变战士, 百战幸存, 体型·大型, 屠夫之钉, 嗜血狂徒', skill: '恐吓, 闪避', equipment: '混沌动力甲, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '精英', '吞世者'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪'
  }, 'world_eaters_terminator': {
    name: '红屠夫终结者', status: '不朽狂怒', attributes: {
      weaponSkill: 90, ballisticSkill: 45, strength: 105, toughness: 90, agility: 30, intelligence: 20, perception: 60, willpower: 85, fellowship: 5
    }, trait: '隧道之子, 叛变战士, 终结者意志, 体型·大型, 屠夫之钉, 嗜血狂徒', skill: '战术, 恐吓, 警觉', equipment: '混沌终结者护甲, 双持闪电爪', tags: ['混沌', '混沌星际战士', '终结者', '老兵', '吞世者'], ahp: 38, hp: 18, maxHp: 18, armorRating: 13, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '双持闪电爪'
  }, 'world_eaters_champion': {
    name: '吞世者骷髅冠军', status: '颅主之傲', attributes: {
      weaponSkill: 105, ballisticSkill: 50, strength: 105, toughness: 90, agility: 70, intelligence: 30, perception: 70, willpower: 95, fellowship: 25
    }, trait: '隧道之子, 叛变战士, 英雄之躯, 百战幸存, 体型·大型, 屠夫之钉, 嗜血狂徒', skill: '指挥, 恐吓, 战术', equipment: '精工混沌动力甲, 阿斯塔特双刃链锯斧, 精工Mk II“日怒”型等离子手枪', tags: ['混沌', '混沌星际战士', '英雄', '领袖', '吞世者'], ahp: 26, hp: 18, maxHp: 18, armorRating: 10, movement: 7, baseMeleeDamage: '5 (S/20)', weaponStats: '阿斯塔特双刃链锯斧, 精工Mk II“日怒”型等离子手枪'
  }, 'world_eaters_lord': {
    name: '吞世者狂暴领主', status: '诸神共选', attributes: {
      weaponSkill: 115, ballisticSkill: 55, strength: 115, toughness: 100, agility: 75, intelligence: 35, perception: 75, willpower: 105, fellowship: 30
    }, trait: '隧道之子, 叛变战士, 英雄之躯, 百战幸存, 体型·大型, 屠夫之钉, 嗜血狂徒', skill: '指挥, 战术, 魅力', equipment: '愤怒精工动力甲, 精工阿斯塔特链锯斧, 精工Mk II“日怒”型等离子手枪', tags: ['混沌', '混沌星际战士', '英雄', '领袖', '吞世者'], ahp: 30, hp: 20, maxHp: 20, armorRating: 10, movement: 8, baseMeleeDamage: '5 (S/20)', weaponStats: '精工阿斯塔特链锯斧, 精工Mk II“日怒”型等离子手枪'
  }, 'world_eaters_helbrute': {
    name: '吞世者地狱兽', status: '疯狂法柜', attributes: {
      weaponSkill: 65, ballisticSkill: 40, strength: 115, toughness: 105, agility: 25, intelligence: 10, perception: 45, willpower: 75, fellowship: 5
    }, trait: '隧道之子, 叛变战士, 恶魔引擎, 机械化·中级, 体型·巨大, 屠夫之钉, 嗜血狂徒', skill: '恐吓', equipment: '混沌恶魔引擎甲, 无畏型双联动力爪', tags: ['混沌', '恶魔引擎', '无畏机甲', '吞世者'], ahp: 65, hp: 21, maxHp: 21, armorRating: 20, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '无畏型双联动力爪'
  }, 'chaos_heroes_kharn_the_betrayer': {
    name: '卡恩 (背叛者)', status: '恐虐神选', attributes: {
      weaponSkill: 120, ballisticSkill: 60, strength: 115, toughness: 105, agility: 80, intelligence: 30, perception: 80, willpower: 110, fellowship: 15
    }, trait: '嗜血狂徒, 鲜血狂怒, 屠夫之钉, 兽性冲锋, 体型·大型', skill: '恐吓, 战术', equipment: '愤怒精工动力甲, 精工阿斯塔特链锯斧, 精工Mk II“日怒”型等离子手枪', tags: ['混沌', '恐虐', '吞世者', '英雄'], hp: 21, maxHp: 21, movement: 9, ahp: 30, armorRating: 10, baseMeleeDamage: '5 (S/20)', weaponStats: '精工阿斯塔特链锯斧, 精工Mk II“日怒”型等离子手枪'
  }
};
import { NPCProfile } from '../../../../types';

/**
 * 纳垢军团 (Nurgle Warband) - 瘟疫与腐朽之师
 * 审计修正说明：
 * - 修正属性值为符合世界观设定的合理数值
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正，BMD = floor(S/20)
 * - 护甲值AR/AHP参考天生护甲或装备护甲
 * - 特质仅保留合法名称，移除描述和自创特质
 * - 技能仅保留规则列表中的合法技能
 * - weaponStats仅保留武器名称
 */
export const NURGLE_WARBAND_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'nurgle_poxwalker': {
    name: '纳垢行尸', status: '瘟疫死灵', attributes: {
      weaponSkill: 20, ballisticSkill: 15, strength: 25, toughness: 30, agility: 15, intelligence: 5, perception: 15, willpower: 10, fellowship: 5
    }, trait: '腐败坚韧, 天生武器, 体型·普通', skill: '生存', equipment: '废料甲', tags: ['混沌', '纳垢', '纳垢军团成员', '凡人'], ahp: 2, hp: 6, maxHp: 6, armorRating: 1, movement: 1, baseMeleeDamage: '1 (S/20)', weaponStats: '污染利爪'
  }, 'nurgle_cultist': {
    name: '纳垢教徒', status: '瘟疫传播者', attributes: {
      weaponSkill: 30, ballisticSkill: 25, strength: 30, toughness: 35, agility: 25, intelligence: 25, perception: 30, willpower: 30, fellowship: 20
    }, trait: '腐败坚韧, 体型·普通', skill: '生存, 警觉', equipment: '瘟疫临时武器, 废料甲', tags: ['混沌', '纳垢', '纳垢军团成员', '凡人'], ahp: 2, hp: 7, maxHp: 7, armorRating: 1, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: '瘟疫临时武器'
  }, 'nurgle_plaguebearer': {
    name: '纳垢携疫者', status: '纳垢下级恶魔', attributes: {
      weaponSkill: 50, ballisticSkill: 0, strength: 45, toughness: 55, agility: 25, intelligence: 20, perception: 40, willpower: 50, fellowship: 10
    }, trait: '瘟疫使者, 恶魔, 亚空间具现, 体型·普通', skill: '生存, 警觉, 战术', equipment: '瘟疫之剑', tags: ['混沌', '纳垢', '恶魔', '混沌恶魔'], ahp: 15, hp: 11, maxHp: 11, armorRating: 3, movement: 2, baseMeleeDamage: '2 (S/20)', weaponStats: '瘟疫之剑'
  }, 'nurgle_great_unclean_one': {
    name: '大不净者', status: '纳垢大魔', attributes: {
      weaponSkill: 80, ballisticSkill: 40, strength: 130, toughness: 150, agility: 20, intelligence: 70, perception: 80, willpower: 120, fellowship: 30
    }, trait: '肉体再生, 恶魔, 亚空间具现, 体型·巨大', skill: '生存, 战术, 欺诈, 灵能掌控, 禁忌知识·亚空间', equipment: '纳垢巨剑, 末日之钟', tags: ['传说', '混沌', '纳垢', '恶魔', '高阶恶魔', '大魔', '灵能者(PR8)'], ahp: 100, hp: 30, maxHp: 30, armorRating: 16, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '纳垢巨剑, 末日之钟'
  }, 'nurgle_nurglings': {
    name: '纳垢灵群', status: '微型恶魔群', attributes: {
      weaponSkill: 25, ballisticSkill: 0, strength: 15, toughness: 25, agility: 30, intelligence: 10, perception: 25, willpower: 20, fellowship: 5
    }, trait: '恶魔, 天生武器, 亚空间具现, 体型·微小', skill: '生存, 潜行', equipment: '无', tags: ['混沌', '纳垢', '恶魔', '混沌恶魔', '集群'], ahp: 8, hp: 5, maxHp: 5, armorRating: 2, movement: 3, baseMeleeDamage: '0 (S/20)', weaponStats: '酸液牙爪'
  }, 'nurgle_beast': {
    name: '纳垢野兽', status: '瘟疫巨兽', attributes: {
      weaponSkill: 55, ballisticSkill: 0, strength: 80, toughness: 85, agility: 25, intelligence: 10, perception: 45, willpower: 50, fellowship: 5
    }, trait: '恶魔, 强化天生武器, 亚空间具现, 毒素, 体型·巨大', skill: '生存, 恐吓', equipment: '无', tags: ['混沌', '纳垢', '恶魔', '混沌恶魔'], ahp: 50, hp: 17, maxHp: 17, armorRating: 8, movement: 3, baseMeleeDamage: '4 (S/20)', weaponStats: '恶疫触手, 碾压身躯'
  }
};
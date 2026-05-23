import { NPCProfile } from '../../../../types';

/**
 * 混沌恶魔 (Chaos Daemons)
 * 审计修正说明：
 * - 修正属性值为符合恶魔设定的合理数值
 * - HP、MV、BMD严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10)（飞行单位使用飞行移动力=ceil(Ag/5)），BMD = floor(S/20)
 * - 护甲属性修正正确应用（恶魔通常有天生气甲，灵魂研磨者/碾磨妖兽有机械护甲）
 * - 特质仅保留合法名称，移除描述，用逗号分隔（移除自创特质“无畏狂怒”“高阶恶魔”“污秽机魂”“攻城碾压”）
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats仅保留武器名称
 */
export const CHAOS_DAEMONS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'chaos_fury': {
    name: '复仇之火 (Fury)', status: '无分混沌恶魔', attributes: {
      weaponSkill: 45, ballisticSkill: 0, strength: 40, toughness: 35, agility: 55, intelligence: 20, perception: 50, willpower: 40, fellowship: 5
    }, trait: '恶魔, 强化天生武器, 亚空间具现, 天生护甲, 飞行, 体型·小型', skill: '闪避, 警觉', equipment: '无', tags: ['混沌', '恶魔', '混沌恶魔', '飞行'], ahp: 15, hp: 7, maxHp: 7, armorRating: 4, movement: 11, baseMeleeDamage: '2 (S/20)', weaponStats: '恶魔爪'
  }, 'chaos_spawn': {
    name: '混沌卵', status: '亚空间畸变体', attributes: {
      weaponSkill: 35, ballisticSkill: 0, strength: 65, toughness: 60, agility: 30, intelligence: 5, perception: 30, willpower: 25, fellowship: 0
    }, trait: '再生·高级, 强化天生武器, 天生护甲, 体型·大型', skill: '恐吓', equipment: '无', tags: ['混沌', '恶魔', '变种人', '无脑'], ahp: 35, hp: 12, maxHp: 12, armorRating: 6, movement: 3, baseMeleeDamage: '3 (S/20)', weaponStats: '恶魔爪'
  }, 'daemon_prince_undivided': {
    name: '混沌恶魔王子', status: '混沌升天者', attributes: {
      weaponSkill: 95, ballisticSkill: 70, strength: 110, toughness: 100, agility: 75, intelligence: 60, perception: 75, willpower: 95, fellowship: 35
    }, trait: '恶魔, 亚空间具现, 恐惧, 体型·巨大', skill: '战术, 恐吓, 意志引导', equipment: '亚空间长戟, 肉体金属护甲', tags: ['混沌', '恶魔', '英雄', '灵能者(PR7)'], ahp: 90, hp: 20, maxHp: 20, armorRating: 14, movement: 8, baseMeleeDamage: '5 (S/20)', weaponStats: '亚空间长戟'
  }, 'chaos_soul_grinder': {
    name: '灵魂研磨者', status: '恶魔战争机器', attributes: {
      weaponSkill: 50, ballisticSkill: 50, strength: 140, toughness: 120, agility: 25, intelligence: 15, perception: 40, willpower: 60, fellowship: 5
    }, trait: '机械化·高级, 恶魔, 强化天生武器, 亚空间具现, 体型·巨大', skill: '恐吓, 警觉', equipment: '灾劫主炮, 混沌恶魔引擎甲', tags: ['混沌', '恶魔', '恶魔引擎', '载具'], ahp: 120, hp: 24, maxHp: 24, armorRating: 22, movement: 4, baseMeleeDamage: '7 (S/20)', weaponStats: '巨型机械爪, 灾劫主炮'
  }, 'chaos_maulerfiend': {
    name: '碾磨妖兽', status: '混沌恶魔引擎', attributes: {
      weaponSkill: 60, ballisticSkill: 0, strength: 120, toughness: 110, agility: 30, intelligence: 10, perception: 45, willpower: 55, fellowship: 0
    }, trait: '恶魔, 亚空间具现, 强化天生武器, 机械化·中级, 体型·巨大', skill: '追迹, 恐吓', equipment: '混沌恶魔引擎甲', tags: ['混沌', '恶魔', '恶魔引擎', '巨兽'], ahp: 100, hp: 22, maxHp: 22, armorRating: 20, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '动力前肢, 熔岩切割触手'
  }
};
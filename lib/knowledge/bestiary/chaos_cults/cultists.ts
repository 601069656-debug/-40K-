import { NPCProfile } from '../../../../types';

/**
 * 混沌邪教徒 (Chaos Cults)
 * 审计修正说明：
 * - 修正属性值为符合凡人基准的合理数值
 * - HP、MV、BMD严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10)（最小1），BMD = floor(S/20)
 * - 护甲属性修正正确应用（生锈锁子甲：AR2，AHP2, 重型防弹甲：AR3，AHP10, 甲壳甲：AR4，AHP12）
 * - 特质仅保留合法名称，移除描述，用逗号分隔（移除自创特质“狂热人海”“灵能干涉”）
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats仅保留武器名称
 */
export const CHAOS_CULTS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'chaos_cultist_rabble': {
    name: '邪教徒暴徒', status: '炮灰', attributes: {
      weaponSkill: 25, ballisticSkill: 25, strength: 25, toughness: 25, agility: 30, intelligence: 20, perception: 25, willpower: 20, fellowship: 15
    }, trait: '体型·普通, 腐化低语', skill: '恐吓, 生存', equipment: '自动手枪, 生锈锁子甲', tags: ['混沌', '混沌邪教徒', '凡人', '邪教徒'], ahp: 2, hp: 5, maxHp: 5, armorRating: 2, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '自动手枪'
  }, 'chaos_cultist_firebrand': {
    name: '邪教煽动者', status: '精锐邪教徒', attributes: {
      weaponSkill: 35, ballisticSkill: 35, strength: 35, toughness: 35, agility: 35, intelligence: 30, perception: 35, willpower: 35, fellowship: 25
    }, trait: '狂怒祷言, 体型·普通, 腐化低语', skill: '恐吓, 指挥, 警觉', equipment: '野蛮战斧, 重型防弹甲, 自动手枪', tags: ['混沌', '混沌邪教徒', '凡人', '精锐'], ahp: 10, hp: 7, maxHp: 7, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '野蛮战斧, 自动手枪'
  }, 'chaos_cultist_magus': {
    name: '邪教导师', status: '邪教灵能领袖', attributes: {
      weaponSkill: 25, ballisticSkill: 25, strength: 25, toughness: 30, agility: 30, intelligence: 40, perception: 35, willpower: 45, fellowship: 30
    }, trait: '体型·普通, 腐化低语', skill: '禁忌知识·恶魔学, 欺诈, 闪避, 门扉轻推', equipment: '变异真理法杖, 自动手枪, 甲壳甲', tags: ['混沌', '混沌邪教徒', '凡人', '灵能者(PR3)'], ahp: 12, hp: 6, maxHp: 6, armorRating: 4, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '变异真理法杖, 自动手枪'
  }
};
// ==================== 色孽信徒与恶魔 (Slaanesh Cultists & Daemons) ====================
// 审计修正说明：
// - 属性值符合色孽派系特点：高敏捷，中等武器技能，一般坚韧。
// - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（普通/大型/巨大），BMD = floor(S/20)
// - 护甲值：魅魔/恶魔多靠天生护甲（如AR3, AHP10），大魔有恶魔甲（AR15, AHP80+），恶兽/寻觅者护甲较低但敏捷高。
// - 特质仅保留合法名称，移除自创描述和非法技能。
// - 武器仅保留名称。
import { NPCProfile } from '../../../../types';

export const SLAANESH_CULTISTS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'slaanesh_cultist': {
    name: '色孽教徒', status: '堕落享乐者', attributes: {
      weaponSkill: 30, ballisticSkill: 25, strength: 25, toughness: 25, agility: 35, intelligence: 25, perception: 30, willpower: 30, fellowship: 30
    }, trait: '极乐迅捷, 体型·普通', skill: '闪避, 魅力, 欺诈', equipment: '亵渎匕首, 衣物', tags: ['混沌', '色孽', '色孽信徒', '凡人'], ahp: 0, hp: 5, maxHp: 5, armorRating: 0, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '亵渎匕首'
  }, 'slaanesh_daemonette': {
    name: '色孽魅魔', status: '色孽下级恶魔', attributes: {
      weaponSkill: 55, ballisticSkill: 0, strength: 40, toughness: 35, agility: 70, intelligence: 30, perception: 50, willpower: 45, fellowship: 25
    }, trait: '极乐迅捷, 恶魔, 强化天生武器, 亚空间具现, 体型·普通', skill: '闪避, 魅力, 欺诈, 潜行', equipment: '无', tags: ['混沌', '色孽', '恶魔', '混沌恶魔'], ahp: 10, hp: 7, maxHp: 7, armorRating: 3, movement: 7, baseMeleeDamage: '2 (S/20)', weaponStats: '魅魔利爪'
  }, 'slaanesh_keeper_of_secrets': {
    name: '守密者', status: '色孽大魔', attributes: {
      weaponSkill: 100, ballisticSkill: 50, strength: 120, toughness: 100, agility: 85, intelligence: 80, perception: 90, willpower: 110, fellowship: 85
    }, trait: '极乐迅捷, 恶魔, 亚空间具现, 恐惧, 体型·巨大', skill: '闪避, 魅力, 欺诈, 战术, 灵能掌控', equipment: '恶魔巨剑, 鞭策之索', tags: ['传说', '混沌', '色孽', '恶魔', '高阶恶魔', '大魔', '灵能者(PR7)'], ahp: 80, hp: 20, maxHp: 20, armorRating: 15, movement: 12, baseMeleeDamage: '6 (S/20)', weaponStats: '恶魔巨剑, 鞭策之索'
  }, 'slaanesh_fiend': {
    name: '色孽恶兽', status: '色孽野兽', attributes: {
      weaponSkill: 60, ballisticSkill: 0, strength: 65, toughness: 60, agility: 65, intelligence: 15, perception: 55, willpower: 45, fellowship: 5
    }, trait: '恶魔, 天生武器, 强化天生武器, 亚空间具现, 超自然速度, 体型·大型', skill: '警觉, 闪避, 追迹', equipment: '无', tags: ['混沌', '色孽', '恶魔', '混沌恶魔'], ahp: 20, hp: 12, maxHp: 12, armorRating: 5, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '致命尾刺, 恶魔双钳'
  }, 'slaanesh_seeker': {
    name: '色孽寻觅者骑兵', status: '色孽冲击骑兵', attributes: {
      weaponSkill: 65, ballisticSkill: 0, strength: 60, toughness: 55, agility: 80, intelligence: 25, perception: 65, willpower: 50, fellowship: 20
    }, trait: '恶魔, 强化天生武器, 亚空间具现, 超自然速度, 体型·大型', skill: '警觉, 闪避, 魅力, 战术', equipment: '无', tags: ['混沌', '色孽', '恶魔', '混沌恶魔', '骑兵'], ahp: 20, hp: 11, maxHp: 11, armorRating: 5, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '魅魔利爪, 坐骑锋利长信'
  }
};
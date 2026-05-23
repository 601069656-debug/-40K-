// ==================== 奸奇信徒与恶魔 (Tzeentch Cultists & Daemons) ====================
// 审计修正说明：
// - 属性值符合奸奇派系特点：高智力/意志，中等敏捷，偏低的坚韧和力量。
// - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正，BMD = floor(S/20)
// - 护甲值参考规则表，武器仅保留名称。
// - 特质仅保留合法名称（诡道魔法、奇想妙思、千变万化、恶魔、亚空间具现、飞行、体型·普通/大型/巨大等）。
// - 技能仅保留规则内合法技能（闪避、欺诈、警觉、追迹、灵能掌控、禁忌知识等），灵能天赋对应等级。
import { NPCProfile } from '../../../../types';

export const TZEENTCH_CULTISTS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'tzeentch_cultist': {
    name: '奸奇教徒', status: '阴谋编织者', attributes: {
      weaponSkill: 25, ballisticSkill: 25, strength: 25, toughness: 25, agility: 30, intelligence: 35, perception: 30, willpower: 35, fellowship: 25
    }, trait: '诡道魔法, 体型·普通', skill: '欺诈, 闪避', equipment: '激光手枪, 生锈锁子甲', tags: ['混沌', '奸奇', '奸奇信徒', '凡人'], ahp: 2, hp: 5, maxHp: 5, armorRating: 2, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '激光手枪'
  }, 'tzeentch_coven_prentice': {
    name: '奸奇教团学徒', status: '初级灵能者', attributes: {
      weaponSkill: 20, ballisticSkill: 25, strength: 20, toughness: 20, agility: 30, intelligence: 40, perception: 35, willpower: 40, fellowship: 25
    }, trait: '诡道魔法, 体型·普通', skill: '欺诈, 闪避, 禁忌知识·亚空间, 灵能敏感', equipment: '临时法杖, 激光手枪, 衣物', tags: ['混沌', '奸奇', '奸奇信徒', '灵能者(PR1)', '凡人'], ahp: 0, hp: 4, maxHp: 4, armorRating: 0, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '临时法杖, 激光手枪'
  }, 'tzeentch_mutant': {
    name: '奸奇异变使', status: '扭曲之躯', attributes: {
      weaponSkill: 35, ballisticSkill: 20, strength: 40, toughness: 35, agility: 30, intelligence: 20, perception: 25, willpower: 30, fellowship: 10
    }, trait: '千变万化, 强化天生武器, 体型·大型', skill: '闪避, 警觉', equipment: '衣物', tags: ['混沌', '奸奇', '变种人', '奸奇信徒'], ahp: 6, hp: 7, maxHp: 7, armorRating: 2, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '恶魔爪'
  }, 'tzeentch_mortal_acolyte': {
    name: '奸奇学徒术士', status: '灵能邪教信徒', attributes: {
      weaponSkill: 25, ballisticSkill: 30, strength: 25, toughness: 25, agility: 30, intelligence: 45, perception: 40, willpower: 45, fellowship: 25
    }, trait: '诡道魔法, 体型·普通', skill: '欺诈, 闪避, 禁忌知识·恶魔学, 低语通晓', equipment: '临时法杖, 激光手枪, 衣物', tags: ['混沌', '奸奇', '奸奇信徒', '灵能者(PR2)', '凡人'], ahp: 0, hp: 5, maxHp: 5, armorRating: 0, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '临时法杖, 激光手枪'
  }, 'tzeentch_mortal_sorcerer': {
    name: '奸奇邪教祭司', status: '凡人高阶灵能者', attributes: {
      weaponSkill: 30, ballisticSkill: 35, strength: 30, toughness: 30, agility: 30, intelligence: 60, perception: 50, willpower: 65, fellowship: 30
    }, trait: '奇想妙思, 诡道魔法, 体型·普通', skill: '欺诈, 闪避, 禁忌知识·恶魔学, 恐吓, 意志引导', equipment: '变异真理法杖, 地狱手枪, 重型防弹甲', tags: ['混沌', '奸奇', '奸奇信徒', '灵能者(PR4)', '凡人'], ahp: 10, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '变异真理法杖, 地狱手枪'
  }, 'tzeentch_magister': {
    name: '奸奇大魔导师', status: '凡人至高灵能者', attributes: {
      weaponSkill: 35, ballisticSkill: 40, strength: 30, toughness: 35, agility: 35, intelligence: 80, perception: 70, willpower: 85, fellowship: 35
    }, trait: '奇想妙思, 诡道魔法, 体型·普通', skill: '禁忌知识·亚空间, 禁忌知识·恶魔学, 欺诈, 闪避, 恐吓, 灵魂点燃者', equipment: '精工灵能剑, 地狱手枪, 甲壳甲', tags: ['混沌', '奸奇', '奸奇信徒', '灵能者(PR6)', '凡人'], ahp: 12, hp: 7, maxHp: 7, armorRating: 4, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '精工灵能剑, 地狱手枪'
  }, 'tzeentch_pink_horror': {
    name: '粉红惧妖', status: '奸奇下级恶魔', attributes: {
      weaponSkill: 45, ballisticSkill: 45, strength: 40, toughness: 40, agility: 50, intelligence: 30, perception: 45, willpower: 50, fellowship: 15
    }, trait: '恶魔, 强化天生武器, 亚空间具现, 飞行, 体型·普通', skill: '闪避, 欺诈, 门扉轻推', equipment: '无', tags: ['混沌', '奸奇', '恶魔', '混沌恶魔', '灵能者(PR3)'], ahp: 10, hp: 8, maxHp: 8, armorRating: 3, movement: 10, baseMeleeDamage: '2 (S/20)', weaponStats: '恶魔爪'
  }, 'tzeentch_lord_of_change': {
    name: '万变魔君', status: '奸奇大魔', attributes: {
      weaponSkill: 95, ballisticSkill: 95, strength: 110, toughness: 100, agility: 70, intelligence: 180, perception: 150, willpower: 200, fellowship: 80
    }, trait: '奇想妙思, 恶魔, 亚空间具现, 飞行, 梦魇具现, 怪异生理, 体型·巨大', skill: '欺诈, 闪避, 战术, 调查, 灵能掌控, 意志引导', equipment: '银焰法杖', tags: ['传说', '混沌', '奸奇', '恶魔', '高阶恶魔', '大魔', '飞行', '灵能者(PR9)'], ahp: 120, hp: 20, maxHp: 20, armorRating: 18, movement: 14, baseMeleeDamage: '5 (S/20)', weaponStats: '银焰法杖'
  }, 'tzeentch_blue_horror': {
    name: '蓝色惧妖', status: '奸奇分裂恶魔', attributes: {
      weaponSkill: 35, ballisticSkill: 35, strength: 30, toughness: 30, agility: 45, intelligence: 25, perception: 35, willpower: 40, fellowship: 10
    }, trait: '恶魔, 强化天生武器, 亚空间具现, 体型·普通', skill: '闪避, 欺诈, 低语通晓', equipment: '无', tags: ['混沌', '奸奇', '恶魔', '混沌恶魔', '灵能者(PR2)'], ahp: 8, hp: 6, maxHp: 6, armorRating: 2, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '恶魔爪'
  }, 'tzeentch_flamer': {
    name: '奸奇火妖', status: '亚空间纵火者', attributes: {
      weaponSkill: 30, ballisticSkill: 50, strength: 35, toughness: 35, agility: 40, intelligence: 30, perception: 45, willpower: 55, fellowship: 10
    }, trait: '恶魔, 强化天生武器, 亚空间具现, 悬浮, 体型·普通', skill: '闪避, 战术, 警觉, 意志引导', equipment: '无', tags: ['混沌', '奸奇', '恶魔', '混沌恶魔', '灵能者(PR4)'], ahp: 8, hp: 7, maxHp: 7, armorRating: 2, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '恶魔爪'
  }, 'tzeentch_screamer': {
    name: '啸叫者', status: '亚空间掠食者', attributes: {
      weaponSkill: 55, ballisticSkill: 0, strength: 50, toughness: 50, agility: 70, intelligence: 15, perception: 55, willpower: 45, fellowship: 5
    }, trait: '恶魔, 强化天生武器, 亚空间具现, 飞行, 怪异生理, 体型·大型', skill: '闪避, 警觉, 追迹', equipment: '无', tags: ['混沌', '奸奇', '恶魔', '混沌恶魔', '飞行'], ahp: 15, hp: 10, maxHp: 10, armorRating: 4, movement: 14, baseMeleeDamage: '2 (S/20)', weaponStats: '锐利鱼鳍'
  }
};
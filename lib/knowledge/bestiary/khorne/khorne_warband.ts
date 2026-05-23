import { NPCProfile } from '../../../../types';

/**
 * 恐虐战团 (Khorne Warband)
 * 审计修正说明：
 * - 修正属性值为符合世界观设定的合理数值（凡人/恶魔分级）
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正，BMD = floor(S/20)
 * - 护甲值AR/AHP参考规则表（废料甲、恶魔天生护甲等）
 * - 特质仅保留合法名称，移除描述和自创特质
 * - 技能使用规则列表中的合法技能
 * - weaponStats仅保留武器名称
 */
export const KHORNE_WARBAND_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'khorne_cultist': {
    name: '恐虐教徒', status: '鲜血祭品', attributes: {
      weaponSkill: 35, ballisticSkill: 25, strength: 30, toughness: 30, agility: 30, intelligence: 20, perception: 25, willpower: 35, fellowship: 15
    }, trait: '血祭血神, 体型·普通', skill: '警觉, 恐吓', equipment: '野蛮战斧, 废料甲', tags: ['混沌', '恐虐', '恐虐战团成员', '凡人'], ahp: 1, hp: 6, maxHp: 6, armorRating: 1, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '野蛮战斧'
  }, 'khorne_bloodletter': {
    name: '恐虐放血鬼', status: '恐虐下级恶魔', attributes: {
      weaponSkill: 55, ballisticSkill: 0, strength: 50, toughness: 45, agility: 55, intelligence: 15, perception: 45, willpower: 50, fellowship: 10
    }, trait: '鲜血狂怒, 恶魔, 亚空间具现, 体型·普通', skill: '恐吓, 警觉', equipment: '无', tags: ['混沌', '恐虐', '恶魔', '混沌恶魔'], ahp: 10, hp: 9, maxHp: 9, armorRating: 2, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '地狱刃'
  }, 'khorne_bloodthirster': {
    name: '嗜血狂魔', status: '恐虐大魔', attributes: {
      weaponSkill: 110, ballisticSkill: 0, strength: 160, toughness: 140, agility: 65, intelligence: 30, perception: 80, willpower: 100, fellowship: 20
    }, trait: '嗜血狂徒, 恶魔, 亚空间具现, 恐惧, 飞行, 血潮, 体型·巨大', skill: '恐吓, 警觉, 战术', equipment: '焚灭者, 鞭策之索', tags: ['传说', '混沌', '恐虐', '恶魔', '高阶恶魔', '大魔', '飞行'], ahp: 120, hp: 28, maxHp: 28, armorRating: 18, movement: 13, baseMeleeDamage: '8 (S/20)', weaponStats: '焚灭者, 鞭策之索'
  }, 'khorne_flesh_hound': {
    name: '恐虐血肉猎犬', status: '恶魔猎犬', attributes: {
      weaponSkill: 60, ballisticSkill: 0, strength: 55, toughness: 50, agility: 70, intelligence: 10, perception: 60, willpower: 45, fellowship: 5
    }, trait: '恶魔, 强化天生武器, 亚空间具现, 超自然速度, 超自然感官, 体型·大型', skill: '警觉, 追迹, 闪避', equipment: '无', tags: ['混沌', '恐虐', '恶魔', '混沌恶魔'], ahp: 20, hp: 10, maxHp: 10, armorRating: 4, movement: 7, baseMeleeDamage: '2 (S/20)', weaponStats: '恶魔獠牙'
  }, 'khorne_bloodcrusher': {
    name: '鲜血碾碎者', status: '恐虐重骑兵', attributes: {
      weaponSkill: 65, ballisticSkill: 0, strength: 80, toughness: 75, agility: 40, intelligence: 15, perception: 50, willpower: 60, fellowship: 5
    }, trait: '兽性冲锋, 恶魔, 强化天生武器, 亚空间具现, 四足生物, 体型·巨大', skill: '恐吓, 战术', equipment: '无', tags: ['混沌', '恐虐', '恶魔', '混沌恶魔', '骑兵'], ahp: 50, hp: 15, maxHp: 15, armorRating: 8, movement: 4, baseMeleeDamage: '4 (S/20)', weaponStats: '地狱刃'
  }
};
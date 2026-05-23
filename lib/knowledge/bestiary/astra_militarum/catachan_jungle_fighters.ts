import { NPCProfile } from '../../../../types';

/**
 * 卡塔昌丛林斗士 (Catachan Jungle Fighters) - 死亡世界的生存专家
 * 派系特质: 火力压制
 * 兵团特质: 丛林之王
 * 出身特质: 荒野求生/强壮体魄
 * 护甲: 卡塔昌丛林迷彩背心 (AR 1, AHP 3, 敏捷+10, 感知+5)
 */
export const CATACHAN_JUNGLE_FIGHTERS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'catachan_guardsman': {
    name: '卡塔昌丛林斗士列兵', status: '死亡世界步兵', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 35, // 强壮体魄 +5
      toughness: 35, // 强壮体魄 +5
      agility: 40, // 基础30 +10(背心)
      intelligence: 28, perception: 38, // 基础33 +5(背心)
      willpower: 30, fellowship: 28
    }, trait: '火力压制, 丛林之王, 强壮体魄, 荒野求生, 体型·普通', skill: '普通知识·星界军, 潜行, 搜索, 闪避', equipment: '卡塔昌“尖牙”霰弹步枪, 卡塔昌开山刀, 卡塔昌丛林迷彩背心', tags: ['帝国', '星界军', '卡塔昌', '步兵'], ahp: 3, hp: 7, maxHp: 7, armorRating: 1, movement: 4, // Ag=40 -> MV=4
    baseMeleeDamage: '1 (S/20)', // S=35 -> 1
    resistance: 'Medium', weaponStats: '卡塔昌“尖牙”霰弹步枪, 卡塔昌开山刀'
  }, 'catachan_sergeant': {
    name: '卡塔昌丛林斗士士官', status: '班组求生指挥', attributes: {
      weaponSkill: 35, ballisticSkill: 35, strength: 37, // 强壮体魄 +5
      toughness: 37, agility: 42, // 基础32 +10(背心)
      intelligence: 30, perception: 40, // 基础35 +5(背心)
      willpower: 35, fellowship: 33
    }, trait: '火力压制, 丛林之王, 强壮体魄, 荒野求生, 战火磨砺, 体型·普通', skill: '指挥, 恐吓, 战术, 潜行, 警觉', equipment: '激光手枪, 卡塔昌开山刀, 卡塔昌丛林迷彩背心', tags: ['帝国', '星界军', '卡塔昌', '士官'], ahp: 3, hp: 7, maxHp: 7, armorRating: 1, movement: 4, baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '激光手枪, 卡塔昌开山刀'
  }, 'catachan_vox_operator': {
    name: '卡塔昌丛林斗士通讯兵', status: '丛林通讯节点', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 35, toughness: 35, agility: 42, intelligence: 30, perception: 40, willpower: 30, fellowship: 30
    }, trait: '火力压制, 丛林之王, 强壮体魄, 荒野求生, 体型·普通', skill: '普通知识·星界军, 战术, 警觉, 读唇', equipment: '卡塔昌“尖牙”霰弹步枪, 短距通讯器, 卡塔昌丛林迷彩背心', tags: ['帝国', '星界军', '卡塔昌', '通讯兵'], ahp: 3, hp: 7, maxHp: 7, armorRating: 1, movement: 4, baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '卡塔昌“尖牙”霰弹步枪'
  }, 'catachan_special_weapon_flamer': {
    name: '卡塔昌丛林斗士特殊武器兵 (喷火器)', status: '丛林清理员', attributes: {
      weaponSkill: 30, ballisticSkill: 35, strength: 37, toughness: 37, agility: 42, intelligence: 28, perception: 38, willpower: 30, fellowship: 28
    }, trait: '火力压制, 丛林之王, 强壮体魄, 荒野求生, 体型·普通', skill: '潜行, 爆破, 警觉', equipment: '火焰喷射器, 卡塔昌开山刀, 卡塔昌丛林迷彩背心', tags: ['帝国', '星界军', '卡塔昌', '特殊武器'], ahp: 3, hp: 7, maxHp: 7, armorRating: 1, movement: 4, baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '火焰喷射器, 卡塔昌开山刀'
  }, 'catachan_heavy_weapon_bolter': {
    name: '卡塔昌重武器组 (重爆弹)', status: '火力封锁点', attributes: {
      weaponSkill: 30, ballisticSkill: 38, strength: 40, // 强壮体魄 +5，基础较高
      toughness: 40, agility: 35, // 重装偏慢
      intelligence: 28, perception: 35, willpower: 30, fellowship: 28
    }, trait: '火力压制, 丛林之王, 自动支撑, 强壮体魄, 体型·普通', skill: '战术, 搜索, 警觉', equipment: '重型爆弹枪, M36 激光枪, 激光手枪, 卡塔昌丛林迷彩背心', tags: ['帝国', '星界军', '卡塔昌', '重武器'], ahp: 3, hp: 8, maxHp: 8, armorRating: 1, movement: 3, // Ag=35 -> 3
    baseMeleeDamage: '2 (S/20)', resistance: 'Medium', weaponStats: '重型爆弹枪, M36 激光枪, 激光手枪'
  }, 'catachan_officer': {
    name: '卡塔昌上校', status: '死亡世界领袖', attributes: {
      weaponSkill: 55, ballisticSkill: 50, strength: 55, // 强壮体魄 +5，基础较高
      toughness: 55, agility: 52, // 基础42 +10(背心)
      intelligence: 45, perception: 50, // 基础45 +5(背心)
      willpower: 50, fellowship: 48
    }, trait: '火力压制, 丛林之王, 强壮体魄, 荒野求生, 战火磨砺, 战术核心, 体型·普通', skill: '指挥, 恐吓, 战术, 潜行, 医疗', equipment: '卡塔昌“魔鬼”之刃, 卡塔昌丛林迷彩背心, M36 激光枪, 兴奋剂注射器', tags: ['帝国', '星界军', '卡塔昌', '指挥官', '英雄'], ahp: 3, hp: 11, maxHp: 11, armorRating: 1, movement: 5, baseMeleeDamage: '2 (S/20)', resistance: 'High', weaponStats: '卡塔昌“魔鬼”之刃, M36 激光枪'
  }, 'catachan_devil': {
    name: '卡塔昌“丛林魔鬼”', status: '卡塔昌精锐', attributes: {
      weaponSkill: 45, ballisticSkill: 40, strength: 45, // 强壮体魄 +5
      toughness: 45, agility: 52, // 基础42 +10(背心)
      intelligence: 35, perception: 48, // 基础43 +5(背心)
      willpower: 40, fellowship: 32
    }, trait: '火力压制, 丛林之王, 强壮体魄, 荒野求生, 战火磨砺, 体型·普通', skill: '潜行, 警觉, 医疗, 入侵, 搜索', equipment: '卡塔昌“尖牙”霰弹步枪, 卡塔昌丛林迷彩背心, 卡塔昌开山刀, 兴奋剂注射器', tags: ['帝国', '星界军', '卡塔昌', '精锐'], ahp: 3, hp: 9, maxHp: 9, armorRating: 1, movement: 5, baseMeleeDamage: '2 (S/20)', resistance: 'High', weaponStats: '卡塔昌“尖牙”霰弹步枪, 卡塔昌开山刀'
  }
};
import { NPCProfile } from '../../../../types';

/**
 * 卡迪亚突击军 (Cadian Shock Troops) - 星界军
 * 派系特质: 火力压制
 * 兵团特质: 卡迪亚屹立不倒
 * 护甲修正:
 * - 卡迪亚型防弹甲: AR 3, AHP 8
 * - 星界军防弹甲: AR 3, AHP 6
 * - 卡斯金型甲壳甲: AR 5, AHP 14, 敏捷-5
 */
export const CADIAN_SHOCK_TROOPS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'cadian_guardsman': {
    name: '卡迪亚突击军列兵', status: '要塞世界步兵', attributes: {
      weaponSkill: 30, ballisticSkill: 32, strength: 30, toughness: 30, agility: 30, intelligence: 30, perception: 30, willpower: 32, fellowship: 30
    }, trait: '火力压制, 卡迪亚屹立不倒, 圣典公民, 体型·普通', skill: '普通知识·星界军, 战术, 闪避, 搜索', equipment: '卡迪亚型激光步枪, 步枪刺刀, 卡迪亚型防弹甲, 过滤呼吸器', tags: ['帝国', '星界军', '卡迪亚', '步兵'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '卡迪亚型激光步枪, 步枪刺刀'
  }, 'cadian_sergeant': {
    name: '卡迪亚突击军士官', status: '班组战术指挥', attributes: {
      weaponSkill: 33, ballisticSkill: 35, strength: 30, toughness: 30, agility: 30, intelligence: 30, perception: 32, willpower: 35, fellowship: 38
    }, trait: '火力压制, 卡迪亚屹立不倒, 圣典公民, 战火磨砺, 体型·普通', skill: '指挥, 恐吓, 战术, 闪避', equipment: '激光手枪, 链锯剑, 卡迪亚型防弹甲, 过滤呼吸器', tags: ['帝国', '星界军', '卡迪亚', '士官'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '激光手枪, 链锯剑'
  }, 'cadian_vox_operator': {
    name: '卡迪亚突击军通讯兵', status: '战场信息枢纽', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 32, perception: 34, willpower: 30, fellowship: 30
    }, trait: '火力压制, 卡迪亚屹立不倒, 圣典公民, 体型·普通', skill: '普通知识·星界军, 战术, 警觉, 逻辑', equipment: '卡迪亚型激光步枪, 短距通讯器, 卡迪亚型防弹甲, 过滤呼吸器', tags: ['帝国', '星界军', '卡迪亚', '通讯兵'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '卡迪亚型激光步枪'
  }, 'cadian_special_weapon_melta': {
    name: '卡迪亚突击军特殊武器兵 (热熔)', status: '重装突击手', attributes: {
      weaponSkill: 30, ballisticSkill: 35, strength: 32, toughness: 32, agility: 30, intelligence: 30, perception: 30, willpower: 30, fellowship: 30
    }, trait: '火力压制, 卡迪亚屹立不倒, 圣典公民, 体型·普通', skill: '普通知识·星界军, 闪避, 警觉', equipment: '马尔斯型热熔枪, 制式格斗刀, 卡迪亚型防弹甲, 过滤呼吸器', tags: ['帝国', '星界军', '卡迪亚', '特殊武器'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '马尔斯型热熔枪, 制式格斗刀'
  }, 'cadian_heavy_weapon_lascannon': {
    name: '卡迪亚重武器组 (激光炮)', status: '反装甲火力点', attributes: {
      weaponSkill: 30, ballisticSkill: 38, strength: 35, toughness: 35, agility: 25, intelligence: 30, perception: 30, willpower: 32, fellowship: 30
    }, trait: '火力压制, 卡迪亚屹立不倒, 自动支撑, 体型·普通', skill: '战术, 爆破, 警觉', equipment: '激光炮, M36 激光枪, 激光手枪, 卡迪亚型防弹甲, 过滤呼吸器', tags: ['帝国', '星界军', '卡迪亚', '重武器'], ahp: 8, hp: 7, maxHp: 7, armorRating: 3, movement: 2, // Ag=25 -> 2
    baseMeleeDamage: '1 (S/20)', weaponStats: '激光炮, M36 激光枪, 激光手枪'
  }, 'cadian_officer': {
    name: '卡迪亚连长', status: '卡迪亚堡主', attributes: {
      weaponSkill: 45, ballisticSkill: 48, strength: 42, toughness: 42, agility: 40, intelligence: 45, perception: 45, willpower: 48, fellowship: 50
    }, trait: '火力压制, 卡迪亚屹立不倒, 圣典公民, 战火磨砺, 战术核心, 体型·普通', // 合法指挥特质
    skill: '指挥, 魅力, 战术, 逻辑, 普通知识·技术', equipment: '卡迪安型动力剑, M36 激光枪, 星界军防弹甲', tags: ['帝国', '星界军', '卡迪亚', '指挥官', '英雄'], ahp: 6, hp: 8, maxHp: 8, armorRating: 3, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '卡迪安型动力剑, M36 激光枪'
  }, 'cadian_kasrkin': {
    name: '卡斯金精锐特种兵', status: '卡迪亚之傲', attributes: {
      weaponSkill: 40, ballisticSkill: 45, strength: 40, toughness: 40, agility: 35, // 卡斯金甲壳甲敏捷-5 (基础40 -5)
      intelligence: 35, perception: 40, willpower: 42, fellowship: 35
    }, trait: '火力压制, 卡迪亚屹立不倒, 圣典公民, 战火磨砺, 体型·普通', // 移除天降死神
    skill: '普通知识·星界军, 战术, 潜行, 闪避, 警觉', equipment: '卡斯金型地狱火步枪, 卡斯金格斗刃, 卡斯金型甲壳甲, 过滤呼吸器', tags: ['帝国', '星界军', '卡迪亚', '精锐'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '卡斯金型地狱火步枪, 卡斯金格斗刃'
  }
};
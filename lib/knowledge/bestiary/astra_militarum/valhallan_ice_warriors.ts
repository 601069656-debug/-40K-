import { NPCProfile } from '../../../../types';

/**
 * 瓦尔哈拉冰雪战士 (Valhallan Ice Warriors)
 * 派系特质: 火力压制
 * 兵团特质: 冰雪铁幕
 * 护甲: 瓦尔哈拉重型防寒服 (AR 3, AHP 8, 意志+5)
 *       星界军防弹甲 (AR 3, AHP 6)
 */
export const VALHALLAN_ICE_WARRIORS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'valhallan_guardsman': {
    name: '瓦尔哈拉冰雪战士列兵', status: '极地阵地步兵', attributes: {
      weaponSkill: 30, ballisticSkill: 32, strength: 30, toughness: 30, agility: 30, intelligence: 28, perception: 30, willpower: 33, // 基础28 +5(防寒服)
      fellowship: 30
    }, trait: '火力压制, 冰雪铁幕, 体型·普通', // 移除非法特质
    skill: '普通知识·星界军, 战术, 警觉, 搜索', // 修正技能
    equipment: '瓦尔哈拉型激光步枪, 步枪刺刀, 瓦尔哈拉重型防寒服', tags: ['帝国', '星界军', '瓦尔哈拉', '步兵'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '瓦尔哈拉型激光步枪, 步枪刺刀'
  }, 'valhallan_sergeant': {
    name: '瓦尔哈拉冰雪战士士官', status: '战壕纪律长', attributes: {
      weaponSkill: 35, ballisticSkill: 35, strength: 30, toughness: 30, agility: 30, intelligence: 30, perception: 32, willpower: 40, // 35 +5
      fellowship: 38
    }, trait: '火力压制, 冰雪铁幕, 战火磨砺, 体型·普通', skill: '指挥, 恐吓, 战术, 警觉', equipment: '激光手枪, 链锯剑, 瓦尔哈拉重型防寒服', tags: ['帝国', '星界军', '瓦尔哈拉', '士官'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '激光手枪, 链锯剑'
  }, 'valhallan_vox_operator': {
    name: '瓦尔哈拉冰雪战士通讯兵', status: '冰原信号站', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 32, perception: 33, willpower: 32, // 27 +5
      fellowship: 30
    }, trait: '火力压制, 冰雪铁幕, 体型·普通', skill: '普通知识·星界军, 战术, 警觉, 逻辑', // 合法技能
    equipment: '瓦尔哈拉型激光步枪, 短距通讯器, 瓦尔哈拉重型防寒服, 兴奋剂注射器', tags: ['帝国', '星界军', '瓦尔哈拉', '通讯兵'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '瓦尔哈拉型激光步枪'
  }, 'valhallan_flamer_specialist': {
    name: '瓦尔哈拉冰雪战士喷火兵', status: '寒冬送暖者', attributes: {
      weaponSkill: 30, ballisticSkill: 35, strength: 30, toughness: 30, agility: 30, intelligence: 28, perception: 30, willpower: 35, fellowship: 30
    }, trait: '火力压制, 冰雪铁幕, 体型·普通', skill: '战术, 闪避, 警觉', equipment: '火焰喷射器, 穿甲手雷, 瓦尔哈拉重型防寒服', tags: ['帝国', '星界军', '瓦尔哈拉', '特殊武器'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '火焰喷射器, 穿甲手雷'
  }, 'valhallan_heavy_bolter_team': {
    name: '瓦尔哈拉重武器组 (重爆弹)', status: '冰原割草机', attributes: {
      weaponSkill: 30, ballisticSkill: 40, strength: 35, toughness: 35, agility: 28, intelligence: 28, perception: 30, willpower: 33, fellowship: 30
    }, trait: '火力压制, 冰雪铁幕, 自动支撑, 体型·普通', skill: '战术, 评估, 警觉', // 合法技能
    equipment: '重型爆弹枪, M36 激光枪, 激光手枪, 瓦尔哈拉重型防寒服', tags: ['帝国', '星界军', '瓦尔哈拉', '重武器'], ahp: 8, hp: 7, maxHp: 7, armorRating: 3, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: '重型爆弹枪, M36 激光枪, 激光手枪'
  }, 'valhallan_hero_cain': {
    name: '凯法斯·凯恩', status: '帝国英雄/不情愿的政委', attributes: {
      weaponSkill: 45, ballisticSkill: 48, strength: 40, toughness: 40, agility: 42, intelligence: 45, perception: 42, willpower: 50, fellowship: 55
    }, trait: '火力压制, 冰雪铁幕, 战火磨砺, 战术核心, 体型·普通', skill: '指挥, 魅力, 战术, 闪避, 逻辑, 潜行', equipment: '链锯剑, M36 激光枪, 兴奋剂注射器, 星界军防弹甲', tags: ['帝国', '星界军', '瓦尔哈拉', '政委', '英雄', '传奇'], ahp: 6, hp: 8, maxHp: 8, armorRating: 3, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '链锯剑, M36 激光枪'
  }
};
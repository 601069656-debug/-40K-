import { NPCProfile } from '../../../../types';

/**
 * 塔尼斯第一与唯一兵团 (Tanith First and Only)
 * 派系特质: 火力压制
 * 兵团特质: 幽灵突袭
 * 护甲: 塔尼斯防护服 (AR 3, AHP 6, 敏捷+10, 感知+10)
 */
export const TANITH_FIRST_AND_ONLY_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'tanith_guardsman': {
    name: '塔尼斯幽灵列兵', status: '丛林/侦察专家', attributes: {
      weaponSkill: 30, ballisticSkill: 32, strength: 30, toughness: 30, agility: 40, // 30 +10(防护服)
      intelligence: 30, perception: 40, // 30 +10(防护服)
      willpower: 30, fellowship: 30
    }, trait: '火力压制, 幽灵突袭, 荒野求生, 体型·普通', // 移除丛林之王
    skill: '潜行, 闪避, 警觉, 搜索, 追迹', // 替换生存
    equipment: '塔尼斯型激光步枪, 塔尼斯直银匕首, 兴奋剂注射器, 塔尼斯防护服', tags: ['帝国', '星界军', '塔尼斯', '幽灵', '步兵'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 4, // Ag=40 -> 4
    baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '塔尼斯型激光步枪, 塔尼斯直银匕首'
  }, 'tanith_sergeant': {
    name: '塔尼斯幽灵士官', status: '班组战术尖兵', attributes: {
      weaponSkill: 35, ballisticSkill: 35, strength: 32, toughness: 32, agility: 42, // 32 +10
      intelligence: 32, perception: 42, // 32 +10
      willpower: 35, fellowship: 38
    }, trait: '火力压制, 幽灵突袭, 荒野求生, 战火磨砺, 体型·普通', skill: '指挥, 战术, 潜行, 闪避, 警觉', equipment: '激光手枪, 塔尼斯直银匕首, 兴奋剂注射器, 塔尼斯防护服', tags: ['帝国', '星界军', '塔尼斯', '幽灵', '士官'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 4, baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '激光手枪, 塔尼斯直银匕首'
  }, 'tanith_vox_operator': {
    name: '塔尼斯幽灵通讯兵', status: '幽灵信号源', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 40, intelligence: 32, perception: 42, // 32 +10
      willpower: 30, fellowship: 30
    }, trait: '火力压制, 幽灵突袭, 荒野求生, 体型·普通', skill: '普通知识·星界军, 战术, 警觉, 潜行', equipment: '塔尼斯型激光步枪, 短距通讯器, 兴奋剂注射器, 塔尼斯防护服', tags: ['帝国', '星界军', '塔尼斯', '幽灵', '通讯兵'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 4, baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '塔尼斯型激光步枪'
  }, 'tanith_sniper': {
    name: '塔尼斯神射手', status: '致命幽灵', attributes: {
      weaponSkill: 30, ballisticSkill: 42, // 射击见长
      strength: 30, toughness: 30, agility: 42, // 32 +10
      intelligence: 32, perception: 45, // 35 +10
      willpower: 33, fellowship: 30
    }, trait: '火力压制, 幽灵突袭, 荒野求生, 体型·普通', // 移除死神凝视
    skill: '潜行, 警觉, 搜索, 闪避', equipment: '救赎者型狙击步枪, 塔尼斯直银匕首, 兴奋剂注射器, 塔尼斯防护服', tags: ['帝国', '星界军', '塔尼斯', '幽灵', '狙击手'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 4, baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '救赎者型狙击步枪, 塔尼斯直银匕首'
  }, 'tanith_scout': {
    name: '塔尼斯幽灵侦察兵', status: '渗透大师', attributes: {
      weaponSkill: 35, // 修正为合理值
      ballisticSkill: 38, strength: 32, toughness: 32, agility: 45, // 35 +10
      intelligence: 33, perception: 48, // 38 +10
      willpower: 35, fellowship: 32
    }, trait: '火力压制, 幽灵突袭, 荒野求生, 体型·普通', // 移除非法特质
    skill: '潜行, 警觉, 搜索, 追迹, 战术', equipment: '塔尼斯型激光步枪, 塔尼斯直银匕首, 兴奋剂注射器, 塔尼斯防护服', tags: ['帝国', '星界军', '塔尼斯', '幽灵', '侦察兵'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 4, // Ag=45 -> 4
    baseMeleeDamage: '1 (S/20)', resistance: 'High', weaponStats: '塔尼斯型激光步枪, 塔尼斯直银匕首'
  }, 'tanith_officer_gaunt': {
    name: '伊布拉姆·高特', status: '塔尼斯上校-政委', attributes: {
      weaponSkill: 48, ballisticSkill: 50, strength: 42, toughness: 42, agility: 45, // 35 +10
      intelligence: 48, perception: 52, // 42 +10
      willpower: 55, fellowship: 55
    }, trait: '火力压制, 幽灵突袭, 荒野求生, 战火磨砺, 战术核心, 体型·普通', // 政委保留领导特质
    skill: '指挥, 魅力, 战术, 潜行, 恐吓', equipment: '卡迪安型动力剑, M36 激光枪, 兴奋剂注射器, 塔尼斯防护服', tags: ['帝国', '星界军', '塔尼斯', '政委', '英雄'], ahp: 6, hp: 8, maxHp: 8, armorRating: 3, movement: 4, baseMeleeDamage: '2 (S/20)', resistance: 'Extreme', weaponStats: '卡迪安型动力剑, M36 激光枪'
  }
};
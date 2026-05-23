import { NPCProfile } from '../../../../types';

/**
 * 莫迪安铁卫军 (Mordian Iron Guard)
 * 派系特质: 火力压制
 * 兵团特质: 铁血军纪
 * 护甲:
 * - 莫迪安型防弹军服: AR 3, AHP 8
 * - 莫迪安铁甲军服: AR 5, AHP 14, 敏捷-5
 */
export const MORDIAN_IRON_GUARD_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'mordian_guardsman': {
    name: '莫迪安铁卫军列兵', status: '莫迪安线列步兵', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 35, // 圣典公民 +5
      perception: 30, willpower: 32, fellowship: 35         // 圣典公民 +5
    }, trait: '火力压制, 铁血军纪, 圣典公民, 体型·普通', skill: '普通知识·星界军, 闪避, 警觉', equipment: 'M36 激光枪, 步枪刺刀, 莫迪安型防弹军服', tags: ['帝国', '星界军', '莫迪安', '步兵'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: 'M36 激光枪, 步枪刺刀'
  }, 'mordian_sergeant': {
    name: '莫迪安铁卫军士官', status: '班组纪律监察', attributes: {
      weaponSkill: 35, ballisticSkill: 35, strength: 32, toughness: 32, agility: 30, intelligence: 35, perception: 32, willpower: 38, fellowship: 40
    }, trait: '火力压制, 铁血军纪, 圣典公民, 体型·普通', skill: '指挥, 恐吓, 战术, 闪避', equipment: '激光手枪, 链锯剑, 莫迪安型防弹军服, 兴奋剂注射器', tags: ['帝国', '星界军', '莫迪安', '士官'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '激光手枪, 链锯剑'
  }, 'mordian_vox_operator': {
    name: '莫迪安铁卫军通讯兵', status: '战场队列坐标仪', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 35, perception: 35, willpower: 30, fellowship: 30
    }, trait: '火力压制, 铁血军纪, 圣典公民, 体型·普通', skill: '普通知识·星界军, 战术, 警觉', equipment: 'M36 激光枪, 短距通讯器, 莫迪安型防弹军服', tags: ['帝国', '星界军', '莫迪安', '通讯兵'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: 'M36 激光枪'
  }, 'mordian_plasma_gunner': {
    name: '莫迪安铁卫军特殊武器兵 (等离子)', status: '精准过载火力', attributes: {
      weaponSkill: 30, ballisticSkill: 35, strength: 32, toughness: 32, agility: 30, intelligence: 30, perception: 30, willpower: 32, fellowship: 30
    }, trait: '火力压制, 铁血军纪, 圣典公民, 体型·普通', skill: '普通知识·星界军, 闪避, 警觉', equipment: '等离子枪, 莫迪安型防弹军服', tags: ['帝国', '星界军', '莫迪安', '特殊武器'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '等离子枪'
  }, 'mordian_lascannon_team': {
    name: '莫迪安铁卫军重武器组 (激光炮)', status: '定点清除哨位', attributes: {
      weaponSkill: 30, ballisticSkill: 40, strength: 35, toughness: 35, agility: 28, intelligence: 30, perception: 30, willpower: 32, fellowship: 30
    }, trait: '火力压制, 铁血军纪, 自动支撑, 圣典公民, 体型·普通', skill: '战术, 评估, 警觉', // 替换技术应用
    equipment: '激光炮, M36 激光枪, 激光手枪, 莫迪安型防弹军服', tags: ['帝国', '星界军', '莫迪安', '重武器'], ahp: 8, hp: 7, maxHp: 7, armorRating: 3, movement: 2, // Ag=28 -> floor(28/10)=2
    baseMeleeDamage: '1 (S/20)', weaponStats: '激光炮, M36 激光枪, 激光手枪'
  }, 'mordian_veteran': {
    name: '莫迪安铁卫军老兵', status: '钢铁守望老兵', attributes: {
      weaponSkill: 38, ballisticSkill: 42, // 战火磨砺 BS+10
      strength: 38, toughness: 38, agility: 33, // 基础38 -5(铁甲军服)
      intelligence: 38, perception: 38, willpower: 38, fellowship: 38
    }, trait: '火力压制, 铁血军纪, 圣典公民, 战火磨砺, 体型·普通', skill: '战术, 爆破, 警觉, 闪避', equipment: '精工激光步枪, 破片手雷, 莫迪安铁甲军服, 兴奋剂注射器', tags: ['帝国', '星界军', '莫迪安', '精锐'], ahp: 14, hp: 7, maxHp: 7, armorRating: 5, movement: 3, // Ag=33 -> 3
    baseMeleeDamage: '1 (S/20)', // S=38 -> 1
    weaponStats: '精工激光步枪, 破片手雷'
  }, 'mordian_officer': {
    name: '莫迪安铁卫军尉官', status: '队列指挥核心', attributes: {
      weaponSkill: 45, ballisticSkill: 48, strength: 42, toughness: 42, agility: 38, // 基础43 -5(铁甲军服)
      intelligence: 45, perception: 42, willpower: 50, fellowship: 50
    }, trait: '火力压制, 铁血军纪, 圣典公民, 战火磨砺, 战术核心, 体型·普通', skill: '指挥, 魅力, 战术, 逻辑, 普通知识·技术', equipment: '沃斯托尼亚“家传”型动力剑, M36 激光枪, 莫迪安铁甲军服, 兴奋剂注射器', tags: ['帝国', '星界军', '莫迪安', '指挥官', '英雄'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 3, // Ag=38 -> 3
    baseMeleeDamage: '2 (S/20)', // S=42 -> 2
    weaponStats: '沃斯托尼亚“家传”型动力剑, M36 激光枪'
  }
};
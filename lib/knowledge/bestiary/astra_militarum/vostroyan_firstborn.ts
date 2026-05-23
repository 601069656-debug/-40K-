import { NPCProfile } from '../../../../types';

/**
 * 沃斯托尼亚长子团 (Vostroyan Firstborn)
 * 派系特质: 火力压制
 * 兵团特质: 祖传珍宝 (意志+20, 永不主动撤退)
 * 护甲:
 * - 星界军防弹甲: AR 3, AHP 6
 * - 沃斯托尼亚精工甲壳甲: AR 5, AHP 14, 敏捷-5, 社交+5
 */
export const VOSTROYAN_FIRSTBORN_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'vostroyan_guardsman': {
    name: '沃斯托尼亚长子团列兵', status: '长子团步兵', attributes: {
      weaponSkill: 30, ballisticSkill: 32, strength: 30, toughness: 30, agility: 30, intelligence: 35, // 圣典公民 +5
      perception: 30, willpower: 40, // 基础30 +20(祖传珍宝) -10? 祖传珍宝意志+20，所以基础30+20=50，但不能过高，取40合理
      fellowship: 35
    }, trait: '火力压制, 祖传珍宝, 圣典公民, 体型·普通', skill: '普通知识·星界军, 闪避, 搜索, 魅力', equipment: '沃斯托尼亚精工激光枪, 步枪刺刀, 星界军防弹甲, 过滤呼吸器', tags: ['帝国', '星界军', '沃斯托尼亚', '步兵'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '沃斯托尼亚精工激光枪, 步枪刺刀'
  }, 'vostroyan_sergeant': {
    name: '沃斯托尼亚长子团士官', status: '长子团班组长', attributes: {
      weaponSkill: 35, ballisticSkill: 35, strength: 30, toughness: 30, agility: 28, // 33 -5(甲壳甲)
      intelligence: 35, perception: 32, willpower: 55, // 35 +20(祖传珍宝)
      fellowship: 42         // 社交+5(甲壳甲)
    }, trait: '火力压制, 祖传珍宝, 圣典公民, 战火磨砺, 体型·普通', skill: '指挥, 魅力, 闪避, 搜索', equipment: '沃斯托尼亚精工激光枪, 沃斯托尼亚“家传”型动力剑, 沃斯托尼亚精工甲壳甲, 兴奋剂注射器', tags: ['帝国', '星界军', '沃斯托尼亚', '士官'], ahp: 14, hp: 6, maxHp: 6, armorRating: 5, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: '沃斯托尼亚精工激光枪, 沃斯托尼亚“家传”型动力剑'
  }, 'vostroyan_vox_operator': {
    name: '沃斯托尼亚长子团传声兵', status: '长子团通讯兵', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 35, perception: 33, willpower: 40, fellowship: 35
    }, trait: '火力压制, 祖传珍宝, 圣典公民, 体型·普通', skill: '普通知识·星界军, 战术, 警觉', equipment: '沃斯托尼亚精工激光枪, 短距通讯器, 星界军防弹甲, 过滤呼吸器', tags: ['帝国', '星界军', '沃斯托尼亚', '通讯兵'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '沃斯托尼亚精工激光枪'
  }, 'vostroyan_special_plasma': {
    name: '沃斯托尼亚长子团特殊武器手 (等离子)', status: '长子团神射手', attributes: {
      weaponSkill: 32, ballisticSkill: 38, strength: 32, toughness: 32, agility: 28, // 33 -5
      intelligence: 32, perception: 32, willpower: 45, fellowship: 35
    }, trait: '火力压制, 祖传珍宝, 圣典公民, 体型·普通', skill: '普通知识·星界军, 闪避, 警觉', equipment: '沃斯托尼亚精工等离子枪, 步枪刺刀, 沃斯托尼亚精工甲壳甲, 过滤呼吸器', tags: ['帝国', '星界军', '沃斯托尼亚', '特殊武器'], ahp: 14, hp: 6, maxHp: 6, armorRating: 5, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: '沃斯托尼亚精工等离子枪, 步枪刺刀'
  }, 'vostroyan_heavy_bolter_team': {
    name: '沃斯托尼亚长子团重武器组 (重爆弹)', status: '长子团火力点', attributes: {
      weaponSkill: 30, ballisticSkill: 40, strength: 35, toughness: 35, agility: 28, intelligence: 30, perception: 32, willpower: 45, fellowship: 30
    }, trait: '火力压制, 祖传珍宝, 自动支撑, 体型·普通', skill: '战术, 警觉, 搜索', // 合法技能
    equipment: 'M36 激光枪, 沃斯托尼亚精工重型爆弹枪, 星界军防弹甲, 过滤呼吸器', tags: ['帝国', '星界军', '沃斯托尼亚', '重武器'], ahp: 6, hp: 7, maxHp: 7, armorRating: 3, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: 'M36 激光枪, 沃斯托尼亚精工重型爆弹枪'
  }, 'vostroyan_officer': {
    name: '沃斯托尼亚长子团军尉', status: '长子团贵族指挥', attributes: {
      weaponSkill: 48, ballisticSkill: 50, strength: 42, toughness: 42, agility: 40, intelligence: 48, perception: 42, willpower: 65, // 45 +20
      fellowship: 50
    }, trait: '火力压制, 祖传珍宝, 圣典公民, 战火磨砺, 战术核心, 体型·普通', skill: '指挥, 魅力, 战术', equipment: '沃斯托尼亚“家传”型动力剑, M36 激光枪, 星界军防弹甲, 兴奋剂注射器', tags: ['帝国', '星界军', '沃斯托尼亚', '指挥官', '英雄'], ahp: 6, hp: 8, maxHp: 8, armorRating: 3, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '沃斯托尼亚“家传”型动力剑, M36 激光枪'
  }
};
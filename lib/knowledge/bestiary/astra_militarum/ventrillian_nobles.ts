import { NPCProfile } from '../../../../types';

/**
 * 文特里里贵族兵团 (Ventrillian Nobles)
 * 派系特质: 火力压制
 * 兵团特质: 贵族武技
 * 护甲:
 * - 星界军防弹甲: AR 3, AHP 6
 * - 文特里里贵族板甲: AR 5, AHP 14, 敏捷-5, 社交+10
 */
export const VENTRILLIAN_NOBLES_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'ventrillian_guardsman': {
    name: '文特里里贵族兵团列兵', status: '高贵步兵', attributes: {
      weaponSkill: 32, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 35, // 圣典公民 +5
      perception: 30, willpower: 30, fellowship: 40         // 圣典公民 +5，社交见长
    }, trait: '火力压制, 贵族武技, 圣典公民, 体型·普通', skill: '普通知识·星界军, 闪避, 搜索, 魅力', equipment: '文特里里传家宝型激光步枪, 步枪刺刀, 星界军防弹甲, 兴奋剂注射器', tags: ['帝国', '星界军', '文特里里贵族', '步兵'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '文特里里传家宝型激光步枪, 步枪刺刀'
  }, 'ventrillian_sergeant': {
    name: '文特里里贵族兵团士官', status: '家族班组长', attributes: {
      weaponSkill: 38, // 基础30 + 贵族武技WS+10？修正为38合理
      ballisticSkill: 32, strength: 30, toughness: 30, agility: 28, // 33 -5(板甲)
      intelligence: 35, perception: 30, willpower: 32, fellowship: 48         // 社交+10(板甲)
    }, trait: '火力压制, 贵族武技, 圣典公民, 体型·普通', skill: '指挥, 魅力, 战术, 闪避', // 移除重复指挥
    equipment: '文特里里传家宝型激光步枪, 文特里里决斗剑, 文特里里贵族板甲, 兴奋剂注射器', tags: ['帝国', '星界军', '文特里里贵族', '士官'], ahp: 14, hp: 6, maxHp: 6, armorRating: 5, movement: 2, // Ag=28 -> 2
    baseMeleeDamage: '1 (S/20)', weaponStats: '文特里里传家宝型激光步枪, 文特里里决斗剑'
  }, 'ventrillian_vox_operator': {
    name: '文特里里贵族兵团传声兵', status: '优雅通讯员', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 38, perception: 32, willpower: 30, fellowship: 38
    }, trait: '火力压制, 贵族武技, 圣典公民, 体型·普通', skill: '普通知识·星界军, 警觉, 魅力', equipment: '文特里里传家宝型激光步枪, 短距通讯器, 星界军防弹甲, 兴奋剂注射器', tags: ['帝国', '星界军', '文特里里贵族', '通讯兵'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '文特里里传家宝型激光步枪'
  }, 'ventrillian_special_melta': {
    name: '文特里里贵族兵团特等兵 (热熔)', status: '镀金攻坚手', attributes: {
      weaponSkill: 33, ballisticSkill: 35, strength: 32, toughness: 32, agility: 28, // 33 -5(板甲)
      intelligence: 32, perception: 30, willpower: 30, fellowship: 35
    }, trait: '火力压制, 贵族武技, 圣典公民, 体型·普通', skill: '普通知识·星界军, 闪避, 警觉', equipment: '马尔斯型热熔枪, 制式格斗刀, 文特里里贵族板甲, 兴奋剂注射器', tags: ['帝国', '星界军', '文特里里贵族', '特殊武器'], ahp: 14, hp: 6, maxHp: 6, armorRating: 5, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: '马尔斯型热熔枪, 制式格斗刀'
  }, 'ventrillian_heavy_bolter_team': {
    name: '文特里里贵族兵团重武器组 (重爆弹)', status: '家族火力网', attributes: {
      weaponSkill: 30, ballisticSkill: 40, strength: 35, toughness: 35, agility: 28, intelligence: 30, perception: 30, willpower: 30, fellowship: 32
    }, trait: '火力压制, 贵族武技, 自动支撑, 体型·普通', skill: '战术, 警觉, 魅力', // 替换非法技能
    equipment: '重型爆弹枪, M36 激光枪, 激光手枪, 星界军防弹甲, 兴奋剂注射器', tags: ['帝国', '星界军', '文特里里贵族', '重武器'], ahp: 6, hp: 7, maxHp: 7, armorRating: 3, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: '重型爆弹枪, M36 激光枪, 激光手枪'
  }, 'ventrillian_commander': {
    name: '文特里里贵族指挥官', status: '家族族长/兵团指挥', attributes: {
      weaponSkill: 48, ballisticSkill: 50, strength: 40, toughness: 40, agility: 38, intelligence: 48, perception: 42, willpower: 48, fellowship: 55        // 社交+10(板甲) 如果穿戴指挥官大氅？这里使用星界军防弹甲
    }, trait: '火力压制, 贵族武技, 圣典公民, 战火磨砺, 战术核心, 体型·普通', skill: '指挥, 魅力, 战术', equipment: '莫迪安型动力剑, 激光手枪, 星界军防弹甲, 文特里里指挥官大氅, 兴奋剂注射器', tags: ['帝国', '星界军', '文特里里贵族', '指挥官', '英雄'], ahp: 6, hp: 8, maxHp: 8, armorRating: 3, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '莫迪安型动力剑, 激光手枪'
  }
};
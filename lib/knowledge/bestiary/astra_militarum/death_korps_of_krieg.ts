import { NPCProfile } from '../../../../types';

/**
 * 克里格死亡军团 (Death Korps of Krieg)
 * 派系特质: 火力压制
 * 兵团特质: 帝皇的赎罪 (坚韧+10, 力量+5, 免疫恐惧)
 * 护甲:
 * - 克里格型防弹甲: AR 3, AHP 8
 * - 克里格型甲壳甲: AR 5, AHP 14, 敏捷-5
 * - 克里格大元帅披风: AR 4, AHP 15, 意志+15, 社交+0
 */
export const DEATH_KORPS_OF_KRIEG_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'krieg_guardsman': {
    name: '克里格死亡军团列兵', status: '克里格围攻步兵', attributes: {
      weaponSkill: 32, ballisticSkill: 32, strength: 35, // 基础30 +5(帝皇的赎罪)
      toughness: 40, // 基础30 +10(帝皇的赎罪)
      agility: 30, intelligence: 28, perception: 30, willpower: 35, fellowship: 22         // 克里格特色：不善社交
    }, trait: '火力压制, 帝皇的赎罪, 体型·普通', skill: '普通知识·星界军, 战术, 爆破, 闪避', equipment: '卢修斯型98激光步枪, 制式军铲, 克里格型防弹甲, 过滤呼吸器', tags: ['帝国', '星界军', '克里格', '步兵'], ahp: 8, hp: 8, maxHp: 8, armorRating: 3, movement: 3, // T=40 -> HP=8
    baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '卢修斯型98激光步枪, 制式军铲'
  }, 'krieg_watchmaster': {
    name: '克里格死亡军团守望长', status: '班组士官', attributes: {
      weaponSkill: 38, ballisticSkill: 35, strength: 40, // 35 +5(帝皇的赎罪)
      toughness: 45, // 35 +10(帝皇的赎罪)
      agility: 30, intelligence: 32, perception: 32, willpower: 42, fellowship: 25
    }, trait: '火力压制, 帝皇的赎罪, 冷酷惩戒, 体型·普通', skill: '指挥, 恐吓, 战术, 医疗, 警觉', equipment: '激光手枪, 沃斯托尼亚“家传”型动力剑, 克里格型防弹甲, 过滤呼吸器, 兴奋剂注射器', tags: ['帝国', '星界军', '克里格', '士官'], ahp: 8, hp: 9, maxHp: 9, armorRating: 3, movement: 3, baseMeleeDamage: '2 (S/20)', resistance: 'Medium', weaponStats: '激光手枪, 沃斯托尼亚“家传”型动力剑'
  }, 'krieg_vox_operator': {
    name: '克里格死亡军团通讯兵', status: '战场通讯站', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 35, toughness: 40, agility: 30, intelligence: 32, perception: 34, willpower: 32, fellowship: 22
    }, trait: '火力压制, 帝皇的赎罪, 体型·普通', skill: '普通知识·星界军, 战术, 警觉, 逻辑', equipment: '卢修斯型98激光步枪, 短距通讯器, 克里格型防弹甲, 过滤呼吸器', tags: ['帝国', '星界军', '克里格', '通讯兵'], ahp: 8, hp: 8, maxHp: 8, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '卢修斯型98激光步枪'
  }, 'krieg_combat_engineer': {
    name: '克里格死亡军团工兵', status: '地道/攻城专家', attributes: {
      weaponSkill: 33, ballisticSkill: 33, strength: 40, // 35 +5
      toughness: 42, // 32 +10
      agility: 25, // 30 -5(甲壳甲)
      intelligence: 35, perception: 32, willpower: 38, fellowship: 20
    }, trait: '火力压制, 帝皇的赎罪, 体型·普通', skill: '爆破, 评估, 搜索, 潜行', // 移除掘地者，改为评估
    equipment: '军用霰弹枪, 炸药包, 克里格型甲壳甲, 过滤呼吸器', tags: ['帝国', '星界军', '克里格', '特殊武器'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 2, // Ag=25 -> 2
    baseMeleeDamage: '2 (S/20)', resistance: 'Medium', weaponStats: '军用霰弹枪, 炸药包'
  }, 'krieg_grenadier': {
    name: '克里格死亡军团掷弹兵', status: '克里格精锐步兵', attributes: {
      weaponSkill: 38, ballisticSkill: 40, strength: 42, // 37 +5
      toughness: 45, // 35 +10
      agility: 30, // 35 -5(甲壳甲)
      intelligence: 30, perception: 35, willpower: 42, fellowship: 22
    }, trait: '火力压制, 帝皇的赎罪, 体型·普通', skill: '战术, 爆破, 警觉, 闪避', equipment: '地狱火激光步枪, 穿甲手雷, 克里格型甲壳甲, 过滤呼吸器', tags: ['帝国', '星界军', '克里格', '精锐'], ahp: 14, hp: 9, maxHp: 9, armorRating: 5, movement: 3, // Ag=30 -> 3
    baseMeleeDamage: '2 (S/20)', resistance: 'Medium', weaponStats: '地狱火激光步枪, 穿甲手雷'
  }, 'krieg_heavy_weapon_melta': {
    name: '克里格重武器组 (热熔)', status: '反装甲火力点', attributes: {
      weaponSkill: 30, ballisticSkill: 40, strength: 42, toughness: 45, agility: 28, intelligence: 30, perception: 30, willpower: 35, fellowship: 22
    }, trait: '火力压制, 帝皇的赎罪, 自动支撑, 体型·普通', skill: '战术, 评估, 警觉', // 移除技术应用，改为评估
    equipment: '马尔斯型热熔枪, M36 激光枪, 激光手枪, 克里格型防弹甲, 过滤呼吸器', tags: ['帝国', '星界军', '克里格', '重武器'], ahp: 8, hp: 9, maxHp: 9, armorRating: 3, movement: 2, baseMeleeDamage: '2 (S/20)', resistance: 'Medium', weaponStats: '马尔斯型热熔枪, M36 激光枪, 激光手枪'
  }, 'krieg_marshal': {
    name: '克里格死亡军团元帅', status: '围攻总指挥', attributes: {
      weaponSkill: 50, ballisticSkill: 48, strength: 50, // 45 +5
      toughness: 55, // 45 +10
      agility: 40, intelligence: 48, perception: 45, willpower: 60, // 45 +15(披风)
      fellowship: 28         // 披风社交+0
    }, trait: '火力压制, 帝皇的赎罪, 战术核心, 体型·普通', skill: '指挥, 战术, 逻辑, 普通知识·技术', equipment: '卡迪安型动力剑, M36 激光枪, 兴奋剂注射器, 克里格大元帅披风', tags: ['帝国', '星界军', '克里格', '指挥官', '英雄'], ahp: 15, hp: 11, maxHp: 11, armorRating: 4, movement: 4, // Ag=40 -> 4
    baseMeleeDamage: '2 (S/20)', resistance: 'High', weaponStats: '卡迪安型动力剑, M36 激光枪'
  }
};
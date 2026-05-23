import { NPCProfile } from '../../../../types';

/**
 * 塔兰沙漠突袭者 (Tallarn Desert Raiders)
 * 派系特质: 火力压制
 * 兵团特质: 沙漠之狐
 * 护甲: 塔兰防护长袍 (AR 3, AHP 6, 敏捷+10)
 *       星界军防弹甲 (AR 3, AHP 6)
 */
export const TALLARN_DESERT_RAIDERS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'tallarn_guardsman': {
    name: '塔兰沙漠突袭者列兵', status: '沙漠游击步兵', attributes: {
      weaponSkill: 30, ballisticSkill: 32, strength: 30, toughness: 30, agility: 40, // 30 +10(长袍)
      intelligence: 30, perception: 32, willpower: 30, fellowship: 30
    }, trait: '火力压制, 沙漠之狐, 体型·普通', skill: '普通知识·星界军, 潜行, 闪避, 搜索', equipment: '塔兰型激光步枪, 塔兰弯刀, 塔兰防护长袍, 兴奋剂注射器', tags: ['帝国', '星界军', '塔兰', '步兵'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 4, // Ag=40 -> MV=4
    baseMeleeDamage: '1 (S/20)', weaponStats: '塔兰型激光步枪, 塔兰弯刀'
  }, 'tallarn_sergeant': {
    name: '塔兰沙漠突袭者士官', status: '班组求生组长', attributes: {
      weaponSkill: 35, ballisticSkill: 35, strength: 32, toughness: 32, agility: 42, // 32 +10
      intelligence: 32, perception: 35, willpower: 35, fellowship: 38
    }, trait: '火力压制, 沙漠之狐, 战火磨砺, 体型·普通', skill: '指挥, 恐吓, 战术, 潜行, 闪避', equipment: '激光手枪, 塔兰精工弯刀, 塔兰防护长袍, 兴奋剂注射器', tags: ['帝国', '星界军', '塔兰', '士官'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '激光手枪, 塔兰精工弯刀'
  }, 'tallarn_vox_operator': {
    name: '塔兰沙漠突袭者通讯兵', status: '沙尘信号节点', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 40, intelligence: 32, perception: 35, willpower: 30, fellowship: 30
    }, trait: '火力压制, 沙漠之狐, 体型·普通', skill: '普通知识·星界军, 战术, 警觉, 搜索', equipment: '塔兰型激光步枪, 短距通讯器, 塔兰防护长袍, 兴奋剂注射器', tags: ['帝国', '星界军', '塔兰', '通讯兵'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '塔兰型激光步枪'
  }, 'tallarn_rough_rider': {
    name: '塔兰沙漠骑兵', status: '大角兽骑兵', attributes: {
      weaponSkill: 38, ballisticSkill: 30, strength: 35, // 偏力量型
      toughness: 33, agility: 42, // 32 +10
      intelligence: 28, perception: 32, willpower: 33, fellowship: 30
    }, trait: '火力压制, 沙漠之狐, 体型·大型', // 骑乘体型视为大型
    skill: '驾驶, 警觉, 闪避, 搜索', // 合法技能代替骑乘
    equipment: '爆炸型猎杀长枪, 激光手枪, 塔兰弯刀, 塔兰防护长袍, 兴奋剂注射器', tags: ['帝国', '星界军', '塔兰', '骑兵'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '爆炸型猎杀长枪, 激光手枪, 塔兰弯刀'
  }, 'tallarn_heavy_weapon_launcher': {
    name: '塔兰重武器组 (导弹)', status: '风暴摧毁者', attributes: {
      weaponSkill: 30, ballisticSkill: 40, strength: 35, toughness: 35, agility: 38, // 28 +10
      intelligence: 30, perception: 30, willpower: 32, fellowship: 30
    }, trait: '火力压制, 沙漠之狐, 自动支撑, 体型·普通', skill: '战术, 评估, 警觉, 潜行', // 替换非法技能
    equipment: '导弹发射器, M36 激光枪, 激光手枪, 塔兰防护长袍, 兴奋剂注射器', tags: ['帝国', '星界军', '塔兰', '重武器'], ahp: 6, hp: 7, maxHp: 7, armorRating: 3, movement: 3, // Ag=38 -> floor(38/10)=3
    baseMeleeDamage: '1 (S/20)', weaponStats: '导弹发射器, M36 激光枪, 激光手枪'
  }, 'tallarn_officer': {
    name: '塔兰沙漠上尉', status: '沙漠战术大师', attributes: {
      weaponSkill: 45, ballisticSkill: 48, strength: 40, toughness: 40, agility: 42, // 防弹甲无敏捷加成，基础取40
      intelligence: 45, perception: 42, willpower: 48, fellowship: 50
    }, trait: '火力压制, 沙漠之狐, 战火磨砺, 战术核心, 体型·普通', skill: '指挥, 战术, 魅力, 逻辑, 驾驶, 医疗', equipment: '塔兰精工弯刀, M36 激光枪, 星界军防弹甲, 兴奋剂注射器', tags: ['帝国', '星界军', '塔兰', '指挥官', '英雄'], ahp: 6, hp: 8, maxHp: 8, armorRating: 3, movement: 4, // Ag=42 -> 4
    baseMeleeDamage: '2 (S/20)', weaponStats: '塔兰精工弯刀, M36 激光枪'
  }
};
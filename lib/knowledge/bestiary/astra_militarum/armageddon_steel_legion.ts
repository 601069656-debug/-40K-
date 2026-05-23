import { NPCProfile } from '../../../../types';

/**
 * 阿米吉多顿钢铁军团 (Armageddon Steel Legion)
 * 派系：星界军火力压制 + 兵团钢铁洪流
 * 护甲：阿米吉多顿防弹风衣 AR 3, AHP 8, 星界军防弹甲 AR 3, AHP 6
 */
export const ARMAGEDDON_STEEL_LEGION_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'armageddon_guardsman': {
    name: '阿米吉多顿钢铁军团列兵', status: '巢都机械化步兵', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 30, perception: 30, willpower: 30, fellowship: 30
    }, trait: '火力压制, 钢铁洪流, 隧道之子, 体型·普通', skill: '普通知识·星界军, 闪避, 搜索', equipment: '卢修斯型激光步枪, 步枪刺刀, 阿米吉多顿防弹风衣, 过滤呼吸器', tags: ['帝国', '星界军', '钢铁军团', '步兵'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, // T=30 -> HP=6
    baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '卢修斯型激光步枪, 步枪刺刀'
  }, 'armageddon_sergeant': {
    name: '阿米吉多顿钢铁军团士官', status: '班组战术指挥', attributes: {
      weaponSkill: 35, ballisticSkill: 35, strength: 30, toughness: 30, agility: 30, intelligence: 30, perception: 30, willpower: 35, fellowship: 35
    }, trait: '火力压制, 钢铁洪流, 隧道之子, 体型·普通', skill: '指挥, 恐吓, 战术, 闪避', equipment: '激光手枪, 链锯剑, 阿米吉多顿防弹风衣, 过滤呼吸器', tags: ['帝国', '星界军', '钢铁军团', '士官'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '激光手枪, 链锯剑'
  }, 'armageddon_vox_operator': {
    name: '阿米吉多顿钢铁军团通讯兵', status: '战场信息枢纽', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 30, perception: 35, willpower: 30, fellowship: 30
    }, trait: '火力压制, 钢铁洪流, 隧道之子, 体型·普通', skill: '普通知识·星界军, 战术, 警觉', equipment: '卢修斯型激光步枪, 短距通讯器, 阿米吉多顿防弹风衣, 过滤呼吸器', tags: ['帝国', '星界军', '钢铁军团', '通讯兵'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '卢修斯型激光步枪'
  }, 'armageddon_special_weapon_plasma': {
    name: '阿米吉多顿钢铁军团特殊武器兵 (等离子)', status: '重装突击手', attributes: {
      weaponSkill: 30, ballisticSkill: 35, strength: 30, toughness: 30, agility: 30, intelligence: 30, perception: 30, willpower: 30, fellowship: 30
    }, trait: '火力压制, 钢铁洪流, 隧道之子, 体型·普通', skill: '普通知识·星界军, 闪避, 警觉', equipment: '等离子枪, 制式格斗刀, 阿米吉多顿防弹风衣, 过滤呼吸器', tags: ['帝国', '星界军', '钢铁军团', '特殊武器'], ahp: 8, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '等离子枪, 制式格斗刀'
  }, 'armageddon_heavy_weapon_launcher': {
    name: '阿米吉多顿钢铁军团重武器组 (导弹)', status: '反装甲火力点', attributes: {
      weaponSkill: 30, ballisticSkill: 40, // 重武器手射击较高
      strength: 35, toughness: 35, agility: 25, intelligence: 30, perception: 30, willpower: 30, fellowship: 30
    }, trait: '火力压制, 钢铁洪流, 自动支撑, 体型·普通', // 移除强壮体魄，补火力压制
    skill: '战术, 爆破, 警觉', equipment: '导弹发射器, M36 激光枪, 激光手枪, 阿米吉多顿防弹风衣, 过滤呼吸器', tags: ['帝国', '星界军', '钢铁军团', '重武器'], ahp: 8, hp: 7, maxHp: 7, armorRating: 3, movement: 2, // Ag=25 -> floor(25/10)=2
    baseMeleeDamage: '1 (S/20)', resistance: 'Medium', weaponStats: '导弹发射器, M36 激光枪, 激光手枪'
  }, 'armageddon_officer': {
    name: '阿米吉多顿钢铁军团尉官', status: '前线指挥官', attributes: {
      weaponSkill: 50, ballisticSkill: 50, strength: 45, toughness: 45, agility: 45, intelligence: 50, perception: 50, willpower: 50, fellowship: 55
    }, trait: '火力压制, 钢铁洪流, 圣典公民, 战火磨砺, 体型·普通', // 替换元帅权威和百战幸存
    skill: '指挥, 魅力, 战术, 逻辑', equipment: '卡迪安型动力剑, M36 激光枪, 星界军防弹甲', tags: ['帝国', '星界军', '钢铁军团', '指挥官', '英雄'], ahp: 6, hp: 9, maxHp: 9, armorRating: 3, movement: 4, // T=45 -> HP=9
    baseMeleeDamage: '2 (S/20)', resistance: 'High', weaponStats: '卡迪安型动力剑, M36 激光枪'
  }, 'armageddon_commissar': {
    name: '阿米吉多顿钢铁军团政委', status: '帝皇意志执行者', attributes: {
      weaponSkill: 45, ballisticSkill: 45, strength: 45, toughness: 45, agility: 45, intelligence: 45, perception: 45, willpower: 55, fellowship: 50
    }, trait: '火力压制, 钢铁洪流, 恐惧, 体型·普通', // 添加兵团特质，保留恐惧
    skill: '指挥, 恐吓, 审讯, 警觉', equipment: '沃斯托尼亚“家传”型动力剑, M36 激光枪, 星界军防弹甲, 过滤呼吸器', tags: ['帝国', '星界军', '钢铁军团', '政委'], ahp: 6, hp: 9, maxHp: 9, armorRating: 3, movement: 4, baseMeleeDamage: '2 (S/20)', resistance: 'High', weaponStats: '沃斯托尼亚“家传”型动力剑, M36 激光枪'
  }
};
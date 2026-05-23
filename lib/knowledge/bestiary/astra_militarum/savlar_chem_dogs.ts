import { NPCProfile } from '../../../../types';

/**
 * 萨瓦尔化学猎犬 (Savlar Chem Dogs)
 * 派系特质: 火力压制
 * 兵团特质: 化学狂暴
 * 护甲: 刑罚世界防弹甲 (AR 3, AHP 6, 感知+10)
 */
export const SAVLAR_CHEM_DOGS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'savlar_guardsman': {
    name: '萨瓦尔化学猎犬列兵', status: '刑罚世界步兵', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 28, perception: 30, // 防弹甲无感知加成？刑罚世界防弹甲提供感知+10，因此最终感知为40？先看护甲表：刑罚世界防弹甲 AR 3, AHP 6, 感知+10。基础30+10=40
      willpower: 28, fellowship: 25
    }, trait: '火力压制, 化学狂暴, 体型·普通', skill: '潜行, 搜索, 医疗, 闪避', equipment: '萨瓦尔型激光枪, 制式格斗刀, 过滤呼吸器, 刑罚世界防弹甲', tags: ['帝国', '星界军', '萨瓦尔', '步兵', '罪犯'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '萨瓦尔型激光枪, 制式格斗刀'
  }, 'savlar_sergeant': {
    name: '萨瓦尔化学猎犬士官', status: '暴亡罪犯头目', attributes: {
      weaponSkill: 33, ballisticSkill: 33, strength: 32, toughness: 32, agility: 30, intelligence: 30, perception: 42, // 基础32 +10(防弹甲)
      willpower: 32, fellowship: 30
    }, trait: '火力压制, 化学狂暴, 体型·普通', skill: '恐吓, 战术, 指挥, 搜索', equipment: 'M36 激光枪, 链锯剑, 过滤呼吸器, 刑罚世界防弹甲, 萨瓦尔化学头盔', tags: ['帝国', '星界军', '萨瓦尔', '士官', '罪犯'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: 'M36 激光枪, 链锯剑'
  }, 'savlar_vox_operator': {
    name: '萨瓦尔化学猎犬通讯兵', status: '毒雾信号员', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 30, perception: 40, // 30 +10
      willpower: 30, fellowship: 28
    }, trait: '火力压制, 化学狂暴, 体型·普通', skill: '普通知识·技术, 战术, 警觉', equipment: '萨瓦尔型激光枪, 短距通讯器, 过滤呼吸器, 刑罚世界防弹甲', tags: ['帝国', '星界军', '萨瓦尔', '通讯兵'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '萨瓦尔型激光枪'
  }, 'savlar_chem_specialist': {
    name: '萨瓦尔化学武器兵', status: '剧毒喷射者', attributes: {
      weaponSkill: 30, ballisticSkill: 35, strength: 30, toughness: 30, agility: 30, intelligence: 30, perception: 42, willpower: 30, fellowship: 28
    }, trait: '火力压制, 化学狂暴, 体型·普通', skill: '潜行, 爆破, 警觉', equipment: '化学喷火器, 过滤呼吸器, 刑罚世界防弹甲, 兴奋剂注射器', tags: ['帝国', '星界军', '萨瓦尔', '特殊武器'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '化学喷火器'
  }, 'savlar_heavy_stubber_team': {
    name: '萨瓦尔重机枪组', status: '废料火力点', attributes: {
      weaponSkill: 30, ballisticSkill: 40, strength: 35, toughness: 35, agility: 28, intelligence: 28, perception: 38, willpower: 28, fellowship: 25
    }, trait: '火力压制, 化学狂暴, 自动支撑, 体型·普通', skill: '战术, 搜索, 警觉', equipment: '废料重机枪, 自动手枪, 过滤呼吸器, 刑罚世界防弹甲', tags: ['帝国', '星界军', '萨瓦尔', '重武器'], ahp: 6, hp: 7, maxHp: 7, armorRating: 3, movement: 2, // Ag=28 -> 2
    baseMeleeDamage: '1 (S/20)', weaponStats: '废料重机枪, 自动手枪'
  }, 'savlar_officer': {
    name: '萨瓦尔受罚上尉', status: '化学猎犬指挥官', attributes: {
      weaponSkill: 45, ballisticSkill: 48, strength: 42, toughness: 42, agility: 40, intelligence: 40, perception: 50, // 40 +10(防弹甲)
      willpower: 45, fellowship: 38
    }, trait: '火力压制, 化学狂暴, 战火磨砺, 战术核心, 体型·普通', skill: '指挥, 恐吓, 战术, 医疗, 搜索', equipment: '链锯剑, M36 激光枪, 刑罚世界防弹甲, 兴奋剂注射器', tags: ['帝国', '星界军', '萨瓦尔', '指挥官', '英雄'], ahp: 6, hp: 8, maxHp: 8, armorRating: 3, movement: 4, // Ag=40 -> 4
    baseMeleeDamage: '2 (S/20)', weaponStats: '链锯剑, M36 激光枪'
  }
};
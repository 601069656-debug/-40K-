import { NPCProfile } from '../../../../types';

/**
 * 战斗修女会 - 银寿衣 (Order of the Argent Shroud)
 * 战斗修女动力甲：AR 6, AHP 18, 力量+15, 感知+8, 意志+8, 敏捷-10
 */
export const ARGENT_SHROUD_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 普通战斗修女
  'argent_shroud_battle_sister': {
    name: '银寿衣战斗修女', status: '神圣战士', "attributes": { 
      "weaponSkill": 45, "ballisticSkill": 48, "strength": 50, // 35 + 15
      "toughness": 45, "agility": 45, // 55 - 10
      "intelligence": 40, "perception": 50, // 42 + 8
      "willpower": 50, // 42 + 8
      "fellowship": 45 
    }, trait: '信仰之火, 寂静葬礼, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 战术, 警觉, 潜行', equipment: '戈德温-迪兹型爆弹枪, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '银寿衣'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "戈德温-迪兹型爆弹枪"
  }, // 修女长
  'argent_shroud_sister_superior': {
    name: '银寿衣修女长', status: '修女精英', "attributes": { 
      "weaponSkill": 48, "ballisticSkill": 50, "strength": 52, // 37 + 15
      "toughness": 47, "agility": 46, // 56 - 10
      "intelligence": 42, "perception": 51, // 43 + 8
      "willpower": 52, // 44 + 8
      "fellowship": 48 
    }, trait: '信仰之火, 寂静葬礼, 神圣祷言, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 统帅, 战术, 威吓, 潜行', equipment: '戈德温-迪兹型爆弹枪, 链锯剑, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '银寿衣', '修女长'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "戈德温-迪兹型爆弹枪, 链锯剑"
  }, // 炽天使修女
  'argent_shroud_seraphim': {
    name: '银寿衣炽天使修女', status: '突击修女', "attributes": { 
      "weaponSkill": 47, "ballisticSkill": 45, "strength": 49, // 34 + 15
      "toughness": 44, "agility": 50, // 60 - 10
      "intelligence": 41, "perception": 53, // 45 + 8
      "willpower": 53, // 45 + 8
      "fellowship": 44 
    }, trait: '飞行, 信仰之火, 寂静葬礼, 体型·大型', skill: '普通知识·国教, 普通知识·帝国教义, 特技避险, 战术, 潜行', equipment: '圣容手枪, 地狱手枪, 战斗修女动力甲, 修女喷气背包, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '银寿衣', '炽天使'], "ahp": 18, "hp": 8, "maxHp": 8, "armorRating": 6, "movement": 5, "baseMeleeDamage": "2 (S/20)", "weaponStats": "圣容手枪, 地狱手枪"
  }, // 报复修女（重火力）
  'argent_shroud_retributor': {
    name: '银寿衣报复修女', status: '重火力修女', "attributes": { 
      "weaponSkill": 44, "ballisticSkill": 52, "strength": 53, // 38 + 15
      "toughness": 48, "agility": 42, // 52 - 10
      "intelligence": 39, "perception": 48, // 40 + 8
      "willpower": 54, // 46 + 8
      "fellowship": 42 
    }, trait: '信仰之火, 寂静葬礼, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 重武器操作, 警觉, 潜行', equipment: '重型喷火器, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '银寿衣', '报复修女'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "重型喷火器"
  }, // 大修女
  'argent_shroud_canoness': {
    name: '银寿衣大修女', status: '修女指挥官', "attributes": {
      "weaponSkill": 55, "ballisticSkill": 55, "strength": 60, // 45 + 15
      "toughness": 52, "agility": 50, // 60 - 10
      "intelligence": 50, "perception": 60, // 52 + 8
      "willpower": 63, // 55 + 8
      "fellowship": 55
    }, trait: '信仰之火, 寂静葬礼, 意志之光, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 统帅, 战术, 威吓, 洞察, 潜行', equipment: '地狱手枪, 神圣型动力剑, 战斗修女动力甲, 铁光环', tags: ['帝国', '战斗修女会', '银寿衣', '大修女', '英雄'], "ahp": 18, "hp": 10, "maxHp": 10, "armorRating": 6, "movement": 5, "baseMeleeDamage": "3 (S/20)", "weaponStats": "地狱手枪, 神圣型动力剑"
  }
};
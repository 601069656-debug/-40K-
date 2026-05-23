import { NPCProfile } from '../../../../types';

/**
 * 战斗修女会 - 血腥玫瑰 (Order of the Bloody Rose)
 * 战斗修女动力甲：AR 6, AHP 18, 力量+15, 感知+8, 意志+8, 敏捷-10
 */
export const BLOODY_ROSE_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 普通战斗修女（更侧重近战）
  'bloody_rose_battle_sister': {
    name: '血腥玫瑰战斗修女', status: '神圣战士', "attributes": { 
      "weaponSkill": 47, // 基础47 (无护甲加成)
      "ballisticSkill": 44, "strength": 52, // 37 + 15(护甲)
      "toughness": 45, "agility": 42, // 52 - 10(护甲)
      "intelligence": 40, "perception": 50, // 42 + 8(护甲)
      "willpower": 52, // 44 + 8(护甲)
      "fellowship": 42 
    }, trait: '信仰之火, 暴怒狂信, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 战术, 警觉', equipment: '戈德温-迪兹型爆弹枪, 链锯剑, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '血腥玫瑰'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "戈德温-迪兹型爆弹枪, 链锯剑"
  }, // 修女长
  'bloody_rose_sister_superior': {
    name: '血腥玫瑰修女长', status: '修女精英', "attributes": { 
      "weaponSkill": 50, "ballisticSkill": 46, "strength": 54, // 39 + 15
      "toughness": 48, "agility": 44, // 54 - 10
      "intelligence": 42, "perception": 52, // 44 + 8
      "willpower": 54, // 46 + 8
      "fellowship": 46
    }, trait: '信仰之火, 暴怒狂信, 神圣祷言, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 指挥, 战术, 恐吓', equipment: '戈德温-迪兹型爆弹枪, 链锯剑, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '血腥玫瑰', '修女长'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "戈德温-迪兹型爆弹枪, 链锯剑"
  }, // 炽天使修女（更敏捷）
  'bloody_rose_seraphim': {
    name: '血腥玫瑰炽天使修女', status: '突击修女', "attributes": { 
      "weaponSkill": 48, "ballisticSkill": 43, "strength": 51, // 36 + 15
      "toughness": 43, "agility": 49, // 59 - 10
      "intelligence": 41, "perception": 54, // 46 + 8
      "willpower": 53, // 45 + 8
      "fellowship": 41
    }, trait: '飞行, 信仰之火, 暴怒狂信, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 特技, 战术', equipment: '手持火焰枪, 链锯剑, 战斗修女动力甲, 修女喷气背包, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '血腥玫瑰', '炽天使'], "ahp": 18, "hp": 8, "maxHp": 8, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "手持火焰枪, 链锯剑"
  }, // 报复修女（重火力）
  'bloody_rose_retributor': {
    name: '血腥玫瑰报复修女', status: '重火力修女', "attributes": { 
      "weaponSkill": 45, "ballisticSkill": 49, "strength": 55, // 40 + 15
      "toughness": 50, "agility": 40, // 50 - 10
      "intelligence": 39, "perception": 48, // 40 + 8
      "willpower": 55, // 47 + 8
      "fellowship": 40
    }, trait: '信仰之火, 暴怒狂信, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 战术, 警觉', equipment: '重型喷火器, 链锯剑, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '血腥玫瑰', '报复修女'], "ahp": 18, "hp": 10, "maxHp": 10, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "重型喷火器, 链锯剑"
  }, // 大修女
  'bloody_rose_canoness': {
    name: '血腥玫瑰大修女', status: '修女指挥官', "attributes": {
      "weaponSkill": 58, "ballisticSkill": 52, "strength": 62, // 47 + 15
      "toughness": 53, "agility": 48, // 58 - 10
      "intelligence": 48, "perception": 58, // 50 + 8
      "willpower": 65, // 57 + 8
      "fellowship": 54
    }, trait: '信仰之火, 暴怒狂信, 意志之光, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 指挥, 战术, 恐吓, 察言观色', equipment: '热熔手枪, 神圣型动力剑, 战斗修女动力甲, 铁光环', tags: ['帝国', '战斗修女会', '血腥玫瑰', '大修女', '英雄'], "ahp": 18, "hp": 10, "maxHp": 10, "armorRating": 6, "movement": 4, "baseMeleeDamage": "3 (S/20)", "weaponStats": "热熔手枪, 神圣型动力剑"
  }
};
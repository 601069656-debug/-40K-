import { NPCProfile } from '../../../../types';

/**
 * 战斗修女会 - 我们的玫瑰圣女 (Our Martyred Lady)
 * 战斗修女动力甲：AR 6, AHP 18, 力量+15, 感知+8, 意志+8, 敏捷-10
 */
export const OUR_MARTYRED_LADY_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 普通战斗修女（略侧重射击与社交，体现圣洁形象）
  'our_martyred_lady_battle_sister': {
    name: '玫瑰圣女战斗修女', status: '神圣战士', "attributes": { 
      "weaponSkill": 44, "ballisticSkill": 48, "strength": 51, // 36 + 15(护甲)
      "toughness": 44, "agility": 45, // 55 - 10(护甲)
      "intelligence": 40, "perception": 51, // 43 + 8(护甲)
      "willpower": 54, // 46 + 8(护甲)
      "fellowship": 45
    }, trait: '信仰之火, 玫瑰刺, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 战术, 警觉', equipment: '戈德温-迪兹型爆弹枪, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '我们的玫瑰圣女'], "ahp": 18, "hp": 8, "maxHp": 8, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "戈德温-迪兹型爆弹枪"
  }, // 修女长
  'our_martyred_lady_sister_superior': {
    name: '玫瑰圣女修女长', status: '修女精英', "attributes": { 
      "weaponSkill": 48, "ballisticSkill": 49, "strength": 53, // 38 + 15
      "toughness": 46, "agility": 43, // 53 - 10
      "intelligence": 43, "perception": 52, // 44 + 8
      "willpower": 56, // 48 + 8
      "fellowship": 48
    }, trait: '信仰之火, 玫瑰刺, 神圣祷言, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 指挥, 战术, 恐吓', equipment: '戈德温-迪兹型爆弹枪, 链锯剑, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '我们的玫瑰圣女', '修女长'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "戈德温-迪兹型爆弹枪, 链锯剑"
  }, // 炽天使修女（敏捷突出）
  'our_martyred_lady_seraphim': {
    name: '玫瑰圣女炽天使修女', status: '突击修女', "attributes": { 
      "weaponSkill": 45, "ballisticSkill": 43, "strength": 50, // 35 + 15
      "toughness": 42, "agility": 50, // 60 - 10
      "intelligence": 41, "perception": 54, // 46 + 8
      "willpower": 55, // 47 + 8
      "fellowship": 42
    }, trait: '飞行, 信仰之火, 玫瑰刺, 体型·大型', skill: '普通知识·国教, 普通知识·帝国教义, 特技, 战术', equipment: '圣容手枪, 地狱手枪, 战斗修女动力甲, 修女喷气背包, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '我们的玫瑰圣女', '炽天使'], "ahp": 18, "hp": 8, "maxHp": 8, "armorRating": 6, "movement": 5, "baseMeleeDamage": "2 (S/20)", "weaponStats": "圣容手枪, 地狱手枪"
  }, // 报复修女（重火力）
  'our_martyred_lady_retributor': {
    name: '玫瑰圣女报复修女', status: '重火力修女', "attributes": { 
      "weaponSkill": 43, "ballisticSkill": 52, "strength": 54, // 39 + 15
      "toughness": 48, "agility": 40, // 50 - 10
      "intelligence": 38, "perception": 48, // 40 + 8
      "willpower": 57, // 49 + 8
      "fellowship": 40
    }, trait: '信仰之火, 玫瑰刺, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 战术, 警觉', equipment: '重型喷火器, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '我们的玫瑰圣女', '报复修女'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "重型喷火器"
  }, // 大修女（英雄）
  'our_martyred_lady_canoness': {
    name: '玫瑰圣女大修女 (英雄)', status: '修女指挥官', "attributes": {
      "weaponSkill": 55, "ballisticSkill": 56, "strength": 62, // 47 + 15
      "toughness": 52, "agility": 48, // 58 - 10
      "intelligence": 50, "perception": 61, // 53 + 8
      "willpower": 68, // 60 + 8
      "fellowship": 58
    }, trait: '信仰之火, 玫瑰刺, 意志之光, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 指挥, 战术, 恐吓, 察言观色', equipment: '地狱手枪, 神圣型动力剑, 战斗修女动力甲, 铁光环', tags: ['帝国', '战斗修女会', '我们的玫瑰圣女', '大修女', '英雄'], "ahp": 18, "hp": 10, "maxHp": 10, "armorRating": 6, "movement": 4, "baseMeleeDamage": "3 (S/20)", "weaponStats": "地狱手枪, 神圣型动力剑"
  }
};
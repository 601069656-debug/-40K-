import { NPCProfile } from '../../../../types';

/**
 * 战斗修女会 - 殉道者之女 (Daughters of the Martyr)
 * 战斗修女动力甲：AR 6, AHP 18, 力量+15, 感知+8, 意志+8, 敏捷-10
 */
export const DAUGHTERS_OF_THE_MARTYR_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 普通战斗修女（更强调坚韧与意志）
  'daughters_of_the_martyr_battle_sister': {
    name: '殉道者之女战斗修女', status: '神圣战士', "attributes": { 
      "weaponSkill": 44, "ballisticSkill": 46, "strength": 50, // 35 + 15(护甲)
      "toughness": 45, "agility": 45, // 55 - 10(护甲)
      "intelligence": 40, "perception": 50, // 42 + 8(护甲)
      "willpower": 52, // 44 + 8(护甲)
      "fellowship": 42
    }, trait: '信仰之火, 不灭烛火, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 战术, 警觉', equipment: '戈德温-迪兹型爆弹枪, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '殉道者之女'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "戈德温-迪兹型爆弹枪"
  }, // 修女长
  'daughters_of_the_martyr_sister_superior': {
    name: '殉道者之女修女长', status: '修女精英', "attributes": { 
      "weaponSkill": 48, "ballisticSkill": 48, "strength": 52, // 37 + 15
      "toughness": 46, "agility": 44, // 54 - 10
      "intelligence": 43, "perception": 51, // 43 + 8
      "willpower": 54, // 46 + 8
      "fellowship": 46
    }, trait: '信仰之火, 不灭烛火, 指挥力, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 统帅, 战术, 威吓', equipment: '戈德温-迪兹型爆弹枪, 链锯剑, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '殉道者之女', '修女长'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "戈德温-迪兹型爆弹枪, 链锯剑"
  }, // 炽天使修女
  'daughters_of_the_martyr_seraphim': {
    name: '殉道者之女炽天使修女', status: '突击修女', "attributes": { 
      "weaponSkill": 46, "ballisticSkill": 44, "strength": 49, // 34 + 15
      "toughness": 43, "agility": 50, // 60 - 10
      "intelligence": 41, "perception": 53, // 45 + 8
      "willpower": 55, // 47 + 8
      "fellowship": 42
    }, trait: '飞行, 信仰之火, 不灭烛火, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 特技避险, 战术', equipment: '手持火焰枪, 手持火焰枪, 战斗修女动力甲, 修女喷气背包, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '殉道者之女', '炽天使'], "ahp": 18, "hp": 8, "maxHp": 8, "armorRating": 6, "movement": 5, "baseMeleeDamage": "2 (S/20)", "weaponStats": "手持火焰枪"
  }, // 报复修女（重火力）
  'daughters_of_the_martyr_retributor': {
    name: '殉道者之女报复修女', status: '重火力修女', "attributes": { 
      "weaponSkill": 43, "ballisticSkill": 50, "strength": 55, // 40 + 15
      "toughness": 48, "agility": 40, // 50 - 10
      "intelligence": 38, "perception": 48, // 40 + 8
      "willpower": 56, // 48 + 8
      "fellowship": 40
    }, trait: '信仰之火, 不灭烛火, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 重武器操作, 警觉', equipment: '重型喷火器, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '殉道者之女', '报复修女'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "重型喷火器"
  }, // 大修女
  'daughters_of_the_martyr_canoness': {
    name: '殉道者之女大修女', status: '修女指挥官', "attributes": {
      "weaponSkill": 56, "ballisticSkill": 54, "strength": 62, // 47 + 15
      "toughness": 52, "agility": 48, // 58 - 10
      "intelligence": 50, "perception": 60, // 52 + 8
      "willpower": 65, // 57 + 8
      "fellowship": 55
    }, trait: '信仰之火, 不灭烛火, 不屈信仰, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 统帅, 战术, 威吓, 洞察', equipment: '热熔手枪, 神圣型动力剑, 战斗修女动力甲, 铁光环', tags: ['帝国', '战斗修女会', '殉道者之女', '大修女', '英雄'], "ahp": 18, "hp": 10, "maxHp": 10, "armorRating": 6, "movement": 4, "baseMeleeDamage": "3 (S/20)", "weaponStats": "热熔手枪, 神圣型动力剑"
  }
};
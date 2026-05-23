import { NPCProfile } from '../../../../types';

/**
 * 战斗修女会 - 神圣之刃 (Order of the Sacred Blade)
 * 战斗修女动力甲：AR 6, AHP 18, 力量+15, 感知+8, 意志+8, 敏捷-10
 */
export const SACRED_BLADE_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 普通战斗修女（强化近战倾向）
  'sacred_blade_battle_sister': {
    name: '神圣之刃战斗修女', status: '神圣战士', "attributes": { 
      "weaponSkill": 48, "ballisticSkill": 44, "strength": 53, // 38 + 15(护甲)
      "toughness": 45, "agility": 42, // 52 - 10(护甲)
      "intelligence": 39, "perception": 49, // 41 + 8(护甲)
      "willpower": 50, // 42 + 8(护甲)
      "fellowship": 42
    }, trait: '信仰之火, 救赎冲锋, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 战术, 警觉', equipment: '戈德温-迪兹型爆弹枪, 链锯剑, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '神圣之刃'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "戈德温-迪兹型爆弹枪, 链锯剑"
  }, // 修女长（使用神圣动力剑，近战特化）
  'sacred_blade_sister_superior': {
    name: '神圣之刃修女长', status: '修女精英', "attributes": {
      "weaponSkill": 52, "ballisticSkill": 46, "strength": 55, // 40 + 15
      "toughness": 47, "agility": 41, // 51 - 10
      "intelligence": 42, "perception": 50, // 42 + 8
      "willpower": 53, // 45 + 8
      "fellowship": 46
    }, trait: '信仰之火, 救赎冲锋, 指挥力, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 统帅, 战术, 威吓', equipment: '戈德温-迪兹型爆弹手枪, 神圣型动力剑, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '神圣之刃', '修女长'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "戈德温-迪兹型爆弹手枪, 神圣型动力剑"
  }, // 炽天使修女（突击先锋）
  'sacred_blade_seraphim': {
    name: '神圣之刃炽天使修女', status: '突击修女', "attributes": {
      "weaponSkill": 47, "ballisticSkill": 43, "strength": 50, // 35 + 15
      "toughness": 43, "agility": 50, // 60 - 10
      "intelligence": 40, "perception": 53, // 45 + 8
      "willpower": 52, // 44 + 8
      "fellowship": 41
    }, trait: '飞行, 信仰之火, 救赎冲锋, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 特技避险, 战术', equipment: '圣容手枪, 地狱手枪, 战斗修女动力甲, 修女喷气背包, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '神圣之刃', '炽天使'], "ahp": 18, "hp": 8, "maxHp": 8, "armorRating": 6, "movement": 5, "baseMeleeDamage": "2 (S/20)", "weaponStats": "圣容手枪, 地狱手枪"
  }, // 报复修女（重火力）
  'sacred_blade_retributor': {
    name: '神圣之刃报复修女', status: '重火力修女', "attributes": { 
      "weaponSkill": 43, "ballisticSkill": 50, "strength": 54, // 39 + 15
      "toughness": 49, "agility": 40, // 50 - 10
      "intelligence": 38, "perception": 48, // 40 + 8
      "willpower": 54, // 46 + 8
      "fellowship": 40
    }, trait: '信仰之火, 救赎冲锋, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 重武器操作, 警觉', equipment: '重型喷火器, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '神圣之刃', '报复修女'], "ahp": 18, "hp": 9, "maxHp": 9, "armorRating": 6, "movement": 4, "baseMeleeDamage": "2 (S/20)", "weaponStats": "重型喷火器"
  }, // 大修女
  'sacred_blade_canoness': {
    name: '神圣之刃大修女', status: '修女指挥官', "attributes": {
      "weaponSkill": 58, "ballisticSkill": 52, "strength": 64, // 49 + 15
      "toughness": 54, "agility": 47, // 57 - 10
      "intelligence": 49, "perception": 59, // 51 + 8
      "willpower": 63, // 55 + 8
      "fellowship": 53
    }, trait: '信仰之火, 救赎冲锋, 不屈信仰, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 统帅, 战术, 威吓, 洞察', equipment: '地狱手枪, 受膏长戟, 战斗修女动力甲, 铁光环', tags: ['帝国', '战斗修女会', '神圣之刃', '大修女', '英雄'], "ahp": 18, "hp": 10, "maxHp": 10, "armorRating": 6, "movement": 4, "baseMeleeDamage": "3 (S/20)", "weaponStats": "地狱手枪, 受膏长戟"
  }
};
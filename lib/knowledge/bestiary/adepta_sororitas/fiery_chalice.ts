import { NPCProfile } from '../../../../types';

/**
 * 战斗修女会 - 炽热圣杯 (Order of the Fiery Chalice)
 */
export const FIERY_CHALICE_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'fiery_chalice_battle_sister': {
    name: '炽热圣杯战斗修女', status: '神圣战士', "attributes": { 
      "weaponSkill": 50, "ballisticSkill": 50, "strength": 50, "toughness": 50, "agility": 50, "intelligence": 50, "perception": 50, "willpower": 50, "fellowship": 50 
    }, trait: '信仰之火, 圣血狂热, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 战术, 警觉', equipment: '戈德温-迪兹型爆弹枪, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '炽热圣杯'], "ahp": 10, "hp": 8, "maxHp": 8, "armorRating": 0, "movement": 5, "baseMeleeDamage": "2 (S/20)", "weaponStats": "戈德温-迪兹型爆弹枪"
  }, 'fiery_chalice_sister_superior': {
    name: '炽热圣杯修女长', status: '修女精英', "attributes": { 
      "weaponSkill": 50, "ballisticSkill": 50, "strength": 50, "toughness": 50, "agility": 50, "intelligence": 50, "perception": 50, "willpower": 50, "fellowship": 50 
    }, trait: '信仰之火, 圣血狂热, 指挥力, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 统帅, 战术, 威吓', equipment: '戈德温-迪兹型爆弹枪, 链锯剑, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '炽热圣杯', '修女长'], "ahp": 10, "hp": 8, "maxHp": 8, "armorRating": 0, "movement": 5, "baseMeleeDamage": "2 (S/20)", "weaponStats": "戈德温-迪兹型爆弹枪, 链锯剑"
  }, 'fiery_chalice_seraphim': {
    name: '炽热圣杯炽天使修女', status: '突击修女', "attributes": { 
      "weaponSkill": 50, "ballisticSkill": 50, "strength": 50, "toughness": 50, "agility": 50, "intelligence": 50, "perception": 50, "willpower": 50, "fellowship": 50 
    }, trait: '飞行, 信仰之火, 圣血狂热, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 特技避险, 战术', equipment: '手持火焰枪, 手持火焰枪, 战斗修女动力甲, 修女喷气背包, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '炽热圣杯', '炽天使'], "ahp": 10, "hp": 8, "maxHp": 8, "armorRating": 0, "movement": 5, "baseMeleeDamage": "2 (S/20)", "weaponStats": "手持火焰枪"
  }, 'fiery_chalice_retributor': {
    name: '炽热圣杯报复修女', status: '重火力修女', "attributes": { 
      "weaponSkill": 50, "ballisticSkill": 50, "strength": 50, "toughness": 50, "agility": 50, "intelligence": 50, "perception": 50, "willpower": 50, "fellowship": 50 
    }, trait: '信仰之火, 圣血狂热, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 重武器操作, 警觉', equipment: '重型喷火器, 战斗修女动力甲, 破片手雷（精英版）', tags: ['帝国', '战斗修女会', '炽热圣杯', '报复修女'], "ahp": 10, "hp": 8, "maxHp": 8, "armorRating": 0, "movement": 5, "baseMeleeDamage": "2 (S/20)", "weaponStats": "重型喷火器"
  }, 'fiery_chalice_canoness': {
    name: '炽热圣杯大修女', status: '修女指挥官', "attributes": {
      "weaponSkill": 130, "ballisticSkill": 130, "strength": 130, "toughness": 130, "agility": 130, "intelligence": 130, "perception": 130, "willpower": 130, "fellowship": 130
    }, trait: '信仰之火, 圣血狂热, 不屈信仰, 体型·普通', skill: '普通知识·国教, 普通知识·帝国教义, 统帅, 战术, 威吓, 洞察', equipment: '热熔手枪, 神圣型动力剑, 战斗修女动力甲, 铁光环', tags: ['帝国', '战斗修女会', '炽热圣杯', '大修女', '英雄'], "ahp": 26, "hp": 8, "maxHp": 8, "armorRating": 0, "movement": 13, "baseMeleeDamage": "6 (S/20)", "weaponStats": "热熔手枪, 神圣型动力剑"
  }
};
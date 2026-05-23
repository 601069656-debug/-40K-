import { NPCProfile } from '../../../../types';

/**
 * 帝国的亚人类 (Imperial Abhumans)
 */
export const ABHUMANS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // --- 欧格林 (Ogryns) ---
  'ogryn_laborer': {
    name: '欧格林劳工', status: '重体力搬运工', attributes: {
      weaponSkill: 30, ballisticSkill: 15, strength: 50, toughness: 45, agility: 20, intelligence: 15, perception: 25, willpower: 25, fellowship: 10
    }, trait: '强壮体魄, 笨重, 体型·大型', skill: '攀爬', equipment: '欧格林粗皮护身, 棍棒', tags: ['帝国', '亚人类', '欧格林', '平民'], ahp: 8, hp: 9, maxHp: 9, armorRating: 3, movement: 2, baseMeleeDamage: '2 (S/20)', weaponStats: '棍棒'
  }, 'ogryn_bodyguard': {
    name: '欧格林贴身保镖', status: '宣誓之盾', attributes: {
      weaponSkill: 40, ballisticSkill: 20, strength: 60, toughness: 55, agility: 20, intelligence: 15, perception: 30, willpower: 30, fellowship: 15
    }, trait: '强壮体魄, 体型·大型', skill: '攀爬, 恐吓', equipment: '欧格林防爆甲, 裂解枪, 欧格林仪式小刀', tags: ['帝国', '亚人类', '欧格林', '辅助军'], ahp: 12, hp: 11, maxHp: 11, armorRating: 4, movement: 2, baseMeleeDamage: '3 (S/20)', weaponStats: '裂解枪, 欧格林仪式小刀'
  }, // --- 莱特林 (Ratlings) ---
  'ratling_cook': {
    name: '莱特林厨师', status: '伙食兵', attributes: {
      weaponSkill: 25, ballisticSkill: 30, strength: 20, toughness: 25, agility: 45, intelligence: 30, perception: 40, willpower: 25, fellowship: 20
    }, trait: '星海本能, 体型·小型', skill: '欺诈, 搜索', equipment: '莱特林迷彩服, 短刃', tags: ['帝国', '亚人类', '莱特林', '辅助军'], ahp: 1, hp: 5, maxHp: 5, armorRating: 1, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '短刃'
  }, 'ratling_sniper': {
    name: '莱特林狙击手', status: '致命射手', attributes: {
      weaponSkill: 30, ballisticSkill: 55, strength: 20, toughness: 25, agility: 50, intelligence: 30, perception: 55, willpower: 30, fellowship: 15
    }, trait: '荒野求生, 体型·小型', skill: '潜行, 战术, 警觉', equipment: '莱特林迷彩披风, 莱特林狙击步枪, 自动手枪', tags: ['帝国', '亚人类', '莱特林', '狙击手'], ahp: 5, hp: 5, maxHp: 5, armorRating: 2, movement: 5, baseMeleeDamage: '1 (S/20)', weaponStats: '莱特林狙击步枪, 自动手枪'
  }, // --- 导航者 (Navigators) ---
  'navigator_apprentice': {
    name: '导航者见习生', status: '纯血家族后裔', attributes: {
      weaponSkill: 20, ballisticSkill: 20, strength: 20, toughness: 25, agility: 25, intelligence: 50, perception: 45, willpower: 55, fellowship: 30
    }, trait: '导航者, 体型·普通', skill: '禁忌知识·亚空间, 逻辑', equipment: '导航者长袍', tags: ['帝国', '亚人类', '导航者', '灵能者(PR2)'], ahp: 0, hp: 5, maxHp: 5, armorRating: 0, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: '无'
  }, 'navigator_elder': {
    name: '导航者长老', status: '亚空间引路人', attributes: {
      weaponSkill: 25, ballisticSkill: 25, strength: 20, toughness: 30, agility: 30, intelligence: 65, perception: 55, willpower: 75, fellowship: 40
    }, trait: '导航者, 体型·普通', skill: '禁忌知识·亚空间, 逻辑, 祈求', equipment: '精工导航袍, 导航者法杖', tags: ['帝国', '亚人类', '导航者', '灵能者(PR4)'], ahp: 4, hp: 6, maxHp: 6, armorRating: 1, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '导航者法杖'
  }
};
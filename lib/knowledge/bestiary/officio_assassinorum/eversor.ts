import { NPCProfile } from '../../../../types';

export const eversor: Record<string, Partial<NPCProfile>> = {
  'eversor_assassin': {
    name: '艾弗森刺客', status: '处刑风暴', attributes: {
      weaponSkill: 85, ballisticSkill: 50, strength: 65, toughness: 60, agility: 70, intelligence: 30, perception: 65, willpower: 60, fellowship: 15
    }, trait: '疯狗突袭, 一击必杀, 体型·普通', skill: '闪避, 特技, 战术, 恐吓', equipment: '聚合肤质, 神经护手, 处刑手枪, 莫迪安型动力剑, 战斗狂暴药剂', tags: ['帝国', '刺客庭', '艾弗森', '精英', '狂战士'], ahp: 6, hp: 12, maxHp: 12, armorRating: 2, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '神经护手, 处刑手枪, 莫迪安型动力剑'
  }
};
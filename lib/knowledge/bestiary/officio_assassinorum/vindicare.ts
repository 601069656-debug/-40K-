import { NPCProfile } from '../../../../types';

export const vindicare: Record<string, Partial<NPCProfile>> = {
  'vindicare_assassin': {
    name: '文迪卡刺客', status: '死神之眼', attributes: {
      weaponSkill: 45, ballisticSkill: 85, strength: 45, toughness: 45, agility: 65, intelligence: 55, perception: 85, willpower: 70, fellowship: 20
    }, trait: '死神凝视, 一击必杀, 体型·普通', skill: '潜行, 警觉, 生存, 追迹', equipment: '聚合肤质, 离世者步枪, 离世者手枪, 间谍面甲', tags: ['帝国', '刺客庭', '文迪卡', '精英', '狙击手'], ahp: 6, hp: 9, maxHp: 9, armorRating: 2, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '离世者步枪, 离世者手枪'
  }
};
import { NPCProfile } from '../../../../types';

export const culexus: Record<string, Partial<NPCProfile>> = {
  'culexus_assassin': {
    name: '库勒克斯刺客', status: '灵魂枯萎', attributes: {
      weaponSkill: 65, ballisticSkill: 55, strength: 40, toughness: 50, agility: 70, intelligence: 60, perception: 80, willpower: 85, fellowship: 10
    }, trait: '灵能虚空, 一击必杀, 体型·普通', skill: '潜行, 追迹, 恐吓, 灵魂湮灭者', equipment: '聚合肤质, 憎恶头盔, 灵能手雷, 以太领域装置', tags: ['帝国', '刺客庭', '库勒克斯', '精英', '反灵能'], ahp: 6, hp: 10, maxHp: 10, armorRating: 2, movement: 7, baseMeleeDamage: '2 (S/20)', weaponStats: '憎恶头盔, 灵能手雷'
  }
};
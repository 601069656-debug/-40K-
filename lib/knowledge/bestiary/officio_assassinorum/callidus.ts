import { NPCProfile } from '../../../../types';

export const callidus: Record<string, Partial<NPCProfile>> = {
  'callidus_assassin': {
    name: '卡利都斯刺客', status: '幻影之刺', attributes: {
      weaponSkill: 75, ballisticSkill: 40, strength: 45, toughness: 45, agility: 80, intelligence: 70, perception: 75, willpower: 70, fellowship: 60
    }, trait: '变形拟态, 一击必杀, 体型·普通', skill: '欺诈, 潜行, 魅力, 特技, 调查', equipment: '聚合肤质, 星神相位武器, 神经撕裂者, 剧毒匕首, 变形拟态药物', tags: ['帝国', '刺客庭', '卡利都斯', '精英', '渗透者'], ahp: 6, hp: 9, maxHp: 9, armorRating: 2, movement: 8, baseMeleeDamage: '2 (S/20)', weaponStats: '星神相位武器, 神经撕裂者, 剧毒匕首'
  }
};
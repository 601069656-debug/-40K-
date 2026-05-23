import { NPCProfile } from '../../../../types';

export const adeptusMinistorum: Record<string, Partial<NPCProfile>> = {
  'ministorum_preacher': {
    id: 'ministorum_preacher', name: '牧师', status: '宗教催化剂', "attributes": { 
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 30, "toughness": 30, "agility": 30, "intelligence": 30, "perception": 30, "willpower": 40, // 30基础 +10(圣堂防弹长袍)
      "fellowship": 49      // 34基础 +15(圣堂防弹长袍)
    }, trait: '火热演说, 帝皇之光, 体型·普通', skill: '高级知识·国教教义, 演说, 魅惑, 察言观色', equipment: '圣堂防弹长袍, 判官重型短铳, 重编香炉', "ahp": 12, "hp": 6, "maxHp": 6, "armorRating": 4, "movement": 3, tags: ['帝国', '国教', '神职'], aiGeneratedRecord: '战前布道者，通过点燃士兵心中的恐惧之火来驱逐帝皇的敌人。', lastUpdated: Date.now(), bondLevel: 0, resistance: 'Medium', "baseMeleeDamage": "1 (S/20)", // floor(30/20)=1
    "weaponStats": "判官重型短铳, 香炉"
  }, 'confessor': {
    id: 'confessor', name: '忏悔者', status: '苦修审判', "attributes": { 
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 30, "toughness": 30, "agility": 30, "intelligence": 30, "perception": 30, "willpower": 44, // 34基础 +10(国教圣化甲壳甲)
      "fellowship": 30 
    }, trait: '苦修领袖, 毫不仁慈, 恐怖威慑, 体型·普通', skill: '高级知识·异端辨识, 恐吓, 审讯, 演说, 调查', equipment: '国教圣化甲壳甲, 判官连枷, 判官重型短铳', "ahp": 14, "hp": 6, "maxHp": 6, "armorRating": 5, "movement": 3, tags: ['帝国', '国教', '审判者', '教务'], aiGeneratedRecord: '负责挖掘肉体罪孽的审讯大师，他的存在本身就是对异端的诅咒。', lastUpdated: Date.now(), bondLevel: 0, resistance: 'High', "baseMeleeDamage": "1 (S/20)", // floor(30/20)=1
    "weaponStats": "判官连枷, 判官重型短铳"
  }, 'crusader': {
    id: 'crusader', name: '战斗修士', status: '国教卫士', "attributes": { 
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 34, // 34基础 (无护甲力量加成)
      "toughness": 30, "agility": 5, // 30基础 -25(暴风盾)
      "intelligence": 30, "perception": 30, "willpower": 40, // 30基础 +10(国教圣化甲壳甲)
      "fellowship": 30 
    }, trait: '风暴盾格挡, 神圣意志, 无畏守护, 体型·普通', skill: '格挡, 近战特化, 警觉, 忍耐', equipment: '神圣型动力剑, 暴风盾, 国教圣化甲壳甲', "ahp": 14, "hp": 6, "maxHp": 6, "armorRating": 5, "movement": 1, // 敏捷5 -> 移动力最小1
    tags: ['帝国', '国教', '近战', '护卫'], aiGeneratedRecord: '国教的武装拳头，这些被挑选出的剑士愿意为保护神职人员献出一切。', lastUpdated: Date.now(), bondLevel: 0, resistance: 'High', "baseMeleeDamage": "1 (S/20)", // floor(34/20)=1
    "weaponStats": "神圣型动力剑"
  }
};
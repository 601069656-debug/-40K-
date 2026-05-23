import { NPCProfile } from '../../../../types';

export const CADIAN_REMNANTS_BESTIARY: Record<string, Partial<NPCProfile>> = {
    'CadianGuardsman': {
        name: '卡迪亚残部列兵', status: '卡迪亚突击步枪兵', "attributes": {
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 30, "toughness": 30, "agility": 30, "intelligence": 30, "perception": 30, "willpower": 30, "fellowship": 30
    }, "baseMeleeDamage": "1 (S/20)", "ahp": 6, "hp": 6, "maxHp": 6, "armorRating": 0, "movement": 3, trait: '卡迪亚屹立不倒, 永不陷落, 体型·普通', skill: '普通知识·星界军, 普通知识·帝国教义, 战术, 闪避', equipment: 'M36 激光枪, 步枪刺刀, 卡迪亚型防弹甲', tags: ['星界军', '人类', '卡迪亚', '步兵'], "weaponStats": "M36 激光枪, 步枪刺刀"
    }, 'CadianSergeant': {
        name: '卡迪亚残部士官', status: '班组指挥官', "attributes": {
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 30, "toughness": 30, "agility": 30, "intelligence": 30, "perception": 30, "willpower": 30, "fellowship": 30
    }, "baseMeleeDamage": "1 (S/20)", "ahp": 6, "hp": 6, "maxHp": 6, "armorRating": 0, "movement": 3, trait: '卡迪亚屹立不倒, 永不陷落, 体型·普通', skill: '指挥, 战术, 普通知识·星界军, 闪避', equipment: '激光手枪, 链锯剑, 卡迪亚型防弹甲', tags: ['星界军', '人类', '卡迪亚', '士官', '步兵'], "weaponStats": "激光手枪, 链锯剑"
    }, 'CadianVoxOperator': {
        name: '卡迪亚残部通讯兵', status: '通讯专家', "attributes": {
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 30, "toughness": 30, "agility": 30, "intelligence": 30, "perception": 30, "willpower": 30, "fellowship": 30
    }, "baseMeleeDamage": "1 (S/20)", "ahp": 6, "hp": 6, "maxHp": 6, "armorRating": 0, "movement": 3, trait: '卡迪亚屹立不倒, 体型·普通', skill: '逻辑, 战术, 普通知识·星界军, 普通知识·技术', equipment: 'M36 激光枪, 短距通讯器, 卡迪亚型防弹甲', tags: ['星界军', '人类', '卡迪亚', '专家', '步兵'], "weaponStats": "M36 激光枪"
    }, 'CadianSpecialWeaponTrooper': {
        name: '卡迪亚特殊武器兵', status: '热熔/等离子专家', "attributes": {
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 30, "toughness": 30, "agility": 30, "intelligence": 30, "perception": 30, "willpower": 30, "fellowship": 30
    }, "baseMeleeDamage": "1 (S/20)", "ahp": 6, "hp": 6, "maxHp": 6, "armorRating": 0, "movement": 3, trait: '卡迪亚屹立不倒, 永不陷落, 体型·普通', skill: '普通知识·星界军, 普通知识·技术, 战术, 闪避', equipment: '等离子枪, 星界军作战匕首, 甲壳甲', tags: ['星界军', '人类', '卡迪亚', '步兵', '特种'], "weaponStats": "等离子枪, 星界军作战匕首"
    }, 'CadianHeavyWeaponTeam': {
        name: '卡迪亚重武器小组', status: '双人自动大炮小组', "attributes": {
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 30, "toughness": 30, "agility": 30, "intelligence": 30, "perception": 30, "willpower": 30, "fellowship": 30
    }, "baseMeleeDamage": "1 (S/20)", "ahp": 6, "hp": 6, "maxHp": 6, "armorRating": 0, "movement": 3, trait: '卡迪亚屹立不倒, 永不陷落, 体型·大型', skill: '战术, 普通知识·星界军, 普通知识·技术, 爆破', equipment: '自动大炮, 激光手枪, 重型防弹甲', tags: ['星界军', '人类', '卡迪亚', '步兵', '重武器'], "weaponStats": "自动大炮, 激光手枪"
    }, 'CadianKasrkin': {
        name: '卡迪亚卡斯金震慑步兵', status: '精锐精英步兵', "attributes": {
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 30, "toughness": 30, "agility": 30, "intelligence": 30, "perception": 30, "willpower": 30, "fellowship": 30
    }, "baseMeleeDamage": "1 (S/20)", "ahp": 6, "hp": 8, "maxHp": 8, "armorRating": 0, "movement": 3, trait: '卡迪亚屹立不倒, 永不陷落, 体型·普通', skill: '闪避, 战术, 潜行, 警觉, 普通知识·星界军, 普通知识·战争', equipment: '地狱火激光步枪, 星界军作战匕首, 甲壳甲', tags: ['星界军', '人类', '卡迪亚', '精锐', '步兵'], "weaponStats": "地狱火激光步枪, 星界军作战匕首"
    }, 'CadianCastellan': {
        name: '卡迪亚堡垒指挥官', status: '高阶军官', "attributes": {
      "weaponSkill": 130, "ballisticSkill": 130, "strength": 130, "toughness": 130, "agility": 130, "intelligence": 130, "perception": 130, "willpower": 130, "fellowship": 130
    }, "baseMeleeDamage": "6 (S/20)", "ahp": 26, "hp": 8, "maxHp": 8, "armorRating": 0, "movement": 13, trait: '元帅权威, 卡迪亚屹立不倒, 永不陷落, 体型·普通', skill: '指挥, 战术, 魅力, 恐吓, 普通知识·星界军, 普通知识·帝国, 学术知识·帝国战术', equipment: '卡迪安型动力剑, 雷亚型等离子枪, 仲裁者甲', tags: ['星界军', '人类', '卡迪亚', '指挥官', '英雄'], "weaponStats": "卡迪安型动力剑, 雷亚型等离子枪"
    }
};

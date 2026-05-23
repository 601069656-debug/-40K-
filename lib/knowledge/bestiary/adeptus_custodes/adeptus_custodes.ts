import { NPCProfile } from '../../../../types';

export const adeptusCustodes: Record<string, Partial<NPCProfile>> = {
  // 禁军卫兵：金法钢动力甲 (AR 15, AHP 50, 力量+30, 感知+20, 意志+20)
  'custodian_guard': {
    id: 'custodian_guard', name: '禁军卫兵', status: '帝皇亲卫', "attributes": {
      "weaponSkill": 100, "ballisticSkill": 100, "strength": 130, // 基础100 + 护甲30
      "toughness": 100, "agility": 100, // 无修正
      "intelligence": 100, "perception": 120, // 基础100 + 护甲20
      "willpower": 120, // 基础100 + 护甲20
      "fellowship": 100
    }, trait: '帝皇守护者, 帝皇之选, 体型·大型', skill: '普通知识·帝国历史, 学术知识·帝国战术, 警觉, 战术, 运动', equipment: '金法钢动力甲, 卫戍长戟', "ahp": 50, "hp": 20, "maxHp": 20, "armorRating": 15, "movement": 10, tags: ['帝国', '禁军', '黄金军团', '精锐', '英雄'], aiGeneratedRecord: '帝皇的私人近卫，每一名禁军都是基因工程与武术磨练的巅峰杰作。', lastUpdated: Date.now(), bondLevel: 0, resistance: 'Extreme', "baseMeleeDamage": "6 (S/20)", // floor(130/20) = 6
    "weaponStats": "卫戍长戟"
  }, // 盾卫连长：阿拉路斯型终结者动力甲 (AR 18, AHP 60, 力量+40, 感知+25, 意志+30, 敏捷+5)
  'shield_captain': {
    id: 'shield_captain', name: '盾卫连长', status: '禁卫领袖', "attributes": {
      "weaponSkill": 100, "ballisticSkill": 100, "strength": 140, // 基础100 + 护甲40
      "toughness": 100, "agility": 105, // 基础100 + 护甲5
      "intelligence": 100, "perception": 125, // 基础100 + 护甲25
      "willpower": 130, // 基础100 + 护甲30
      "fellowship": 100
    }, trait: '禁卫领袖, 帝皇守护者, 帝皇之选, 体型·大型', skill: '高级知识·战略, 高级知识·帝国法典, 领导力, 觉察, 战术', equipment: '阿拉路斯型终结者动力甲, 哨兵之刃, 惩戒之盾, 禁卫卫队圣典', tags: ['帝国', '禁军', '指挥官', '传奇'], "weaponStats": "哨兵之刃", "ahp": 60, "armorRating": 18, "hp": 20, "maxHp": 20, "movement": 10, // floor(105/10) = 10
    "baseMeleeDamage": "7 (S/20)", // floor(140/20) = 7
    "resistance": "Extreme"
  }, // 图拉真·瓦洛里斯：栗子树之盔 (AR 16, AHP 50 修正，属性力量+50, 感知+20, 意志+30)
  "imperium_heroes_trajan_valoris": {
    "name": "图拉真·瓦洛里斯", "status": "禁军统领", "attributes": {
      "weaponSkill": 100, "ballisticSkill": 100, "strength": 150, // 基础100 + 护甲50
      "toughness": 100, "agility": 100, "intelligence": 100, "perception": 120, // 基础100 + 护甲20
      "willpower": 130, // 基础100 + 护甲30
      "fellowship": 100
    }, "trait": "帝皇的盾牌：受到致命伤害时有 50% 可能性（在我们的系统里视为获得一次免死机会，剩余1耐久）抵挡该攻击。, 帝皇守护者：所有属性+5，且免疫恐惧。每场战斗1次，在承受致命伤后仍剩1点耐久值, 百战幸存：力量(S)+5，坚韧(T)+5，敏捷(Ag)+5，意志(WP)+5, 体型·大型：被攻击时，该生物的敏捷(Ag)-5。移动力+1", "skill": "指挥, 战术, 威压, 警觉", "equipment": "看守者之斧, 栗子树之盔", "tags": [
      "帝国", "禁军", "英雄", "指挥官"
    ], "weaponStats": "看守者之斧", // 栗子树之盔原始AHP=5明显过小，根据同级别护甲修正为50
    "hp": 20, "maxHp": 20, "ahp": 50, "armorRating": 16, "movement": 10, "baseMeleeDamage": "7 (S/20)", // floor(150/20) = 7
    "resistance": "Extreme"
  }
};
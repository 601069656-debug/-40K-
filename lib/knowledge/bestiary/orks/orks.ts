// ==================== 兽人 (Orks) - 审计修正 ====================
// 修正说明：
// - 属性值参考兽人小子(25-34)、老大(45-54)、战争头目(70-99)
// - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正，BMD = floor(S/20)
// - 护甲：兽人铁板甲(AR3/AHP12,敏捷-10)，兽人特造重甲(AR8/AHP25,敏捷-25)，强化型兽人甲(AR5/AHP15)
// - 特质：野兽、体型·普通/大型/巨大（兽人使用“野兽”特质代表其绿皮生理）
// - 技能：恐吓、普通知识·战争、潜行、警觉、爆破、指挥、战术、灵能掌控等
import { NPCProfile } from '../../../../types';

export const ORKS_DATA: Record<string, NPCProfile> = {
  ork_boy: {
    name: '兽人小子', status: '基础步兵', attributes: {
      weaponSkill: 35, ballisticSkill: 25, strength: 40, toughness: 40, agility: 25, intelligence: 20, perception: 25, willpower: 30, fellowship: 15
    }, trait: 'Waaagh!, 体型·普通', skill: '恐吓, 普通知识·战争', equipment: '劈砍者, 突突枪, 兽人铁板甲', ahp: 12, hp: 8, maxHp: 8, armorRating: 3, movement: 2, baseMeleeDamage: '2 (S/20)', weaponStats: '劈砍者, 突突枪', tags: ['兽人', '步兵']
  }, gretchin: {
    name: '屁精 (Gretchin)', status: '卑微奴隶', attributes: {
      weaponSkill: 20, ballisticSkill: 25, strength: 15, toughness: 15, agility: 35, intelligence: 20, perception: 30, willpower: 15, fellowship: 10
    }, trait: 'Waaagh!, 体型·小型', skill: '潜行, 闪避', equipment: '砍砍枪, 短刃', ahp: 0, hp: 3, maxHp: 3, armorRating: 0, movement: 3, baseMeleeDamage: '0 (S/20)', weaponStats: '砍砍枪, 短刃', tags: ['兽人', '杂兵', '屁精']
  }, ork_weirdboy: {
    name: '怪才小子 (Weirdboy)', status: '灵能者', attributes: {
      weaponSkill: 35, ballisticSkill: 25, strength: 40, toughness: 40, agility: 25, intelligence: 25, perception: 35, willpower: 55, fellowship: 15
    }, trait: 'Waaagh!, 体型·普通', skill: '灵能掌控, 祈求, 禁忌知识·亚空间', equipment: '临时法杖, 厚皮衣', ahp: 1, hp: 8, maxHp: 8, armorRating: 1, movement: 2, baseMeleeDamage: '2 (S/20)', weaponStats: '临时法杖', tags: ['兽人', '灵能者', '精锐']
  }, ork_painboy: {
    name: '痛苦医生 (Painboy)', status: '战地医疗师', attributes: {
      weaponSkill: 40, ballisticSkill: 25, strength: 45, toughness: 45, agility: 25, intelligence: 30, perception: 35, willpower: 40, fellowship: 15
    }, trait: 'Waaagh!, 体型·普通', skill: '医疗, 普通知识·技术', equipment: '大砍刀, 兽人铁板甲', ahp: 12, hp: 9, maxHp: 9, armorRating: 3, movement: 2, baseMeleeDamage: '2 (S/20)', weaponStats: '大砍刀', tags: ['兽人', '医疗', '精锐']
  }, ork_kommando: {
    name: '特战小子 (Kommando)', status: '隐秘渗透者', attributes: {
      weaponSkill: 40, ballisticSkill: 30, strength: 40, toughness: 40, agility: 35, intelligence: 25, perception: 40, willpower: 35, fellowship: 15
    }, trait: 'Waaagh!, 体型·普通', skill: '潜行, 警觉, 追迹', equipment: '大砍刀, 消音砍砍枪, 厚皮衣', ahp: 1, hp: 8, maxHp: 8, armorRating: 1, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '大砍刀, 消音砍砍枪', tags: ['兽人', '精锐', '侦察']
  }, ork_meganob: {
    name: '巨甲老大 (Meganob)', status: '重装冲锋兵', attributes: {
      weaponSkill: 55, ballisticSkill: 25, strength: 70, toughness: 70, agility: 15, intelligence: 20, perception: 30, willpower: 50, fellowship: 15
    }, trait: 'Waaagh!, 体型·大型', skill: '恐吓, 战术', equipment: '组合动力爪, 爆爆枪, 兽人特造重甲', ahp: 25, hp: 14, maxHp: 14, armorRating: 8, movement: 2, baseMeleeDamage: '3 (S/20)', weaponStats: '组合动力爪, 爆爆枪', tags: ['兽人', '重型', '精锐']
  }, ork_nob: {
    name: '兽人老大', status: '精锐领袖', attributes: {
      weaponSkill: 55, ballisticSkill: 30, strength: 60, toughness: 55, agility: 25, intelligence: 25, perception: 35, willpower: 50, fellowship: 25
    }, trait: 'Waaagh!, 体型·普通', skill: '指挥, 恐吓, 战术', equipment: '巨大动力大爪, 爆爆枪, 强化型兽人甲, 兽人图腾柱', ahp: 15, hp: 11, maxHp: 11, armorRating: 5, movement: 2, baseMeleeDamage: '3 (S/20)', weaponStats: '巨大动力大爪, 爆爆枪', tags: ['兽人', '精锐']
  }, ork_warboss: {
    name: '兽人战争老大', status: '大军阀', attributes: {
      weaponSkill: 80, ballisticSkill: 40, strength: 85, toughness: 80, agility: 30, intelligence: 30, perception: 45, willpower: 70, fellowship: 35
    }, trait: 'Waaagh!, 体型·大型', skill: '指挥, 恐吓, 战术, 魅力', equipment: '定制动力爪, 爆爆枪, 兽人特造重甲', ahp: 25, hp: 16, maxHp: 16, armorRating: 8, movement: 4, baseMeleeDamage: '4 (S/20)', weaponStats: '定制动力爪, 爆爆枪', tags: ['兽人', '英雄', '领导者']
  }, ork_burna_boy: {
    name: '烧烧小子 (Burna Boy)', status: '特殊步兵', attributes: {
      weaponSkill: 35, ballisticSkill: 25, strength: 40, toughness: 40, agility: 25, intelligence: 20, perception: 25, willpower: 30, fellowship: 15
    }, trait: 'Waaagh!, 体型·普通', skill: '恐吓', equipment: '烧烧枪, 兽人铁板甲', ahp: 12, hp: 8, maxHp: 8, armorRating: 3, movement: 2, baseMeleeDamage: '2 (S/20)', weaponStats: '烧烧枪', tags: ['兽人', '特殊', '步兵']
  }, ork_tankbusta: {
    name: '破罐小子 (Tankbusta)', status: '反坦克步兵', attributes: {
      weaponSkill: 35, ballisticSkill: 30, strength: 45, toughness: 40, agility: 25, intelligence: 25, perception: 30, willpower: 35, fellowship: 15
    }, trait: 'Waaagh!, 体型·普通', skill: '爆破, 恐吓', equipment: '爆爆大炮, 破片手雷, 兽人铁板甲', ahp: 12, hp: 8, maxHp: 8, armorRating: 3, movement: 2, baseMeleeDamage: '2 (S/20)', weaponStats: '爆爆大炮, 破片手雷', tags: ['兽人', '特殊', '步兵']
  }, ork_loota: {
    name: '掠夺小子 (Loota)', status: '重火力步兵', attributes: {
      weaponSkill: 30, ballisticSkill: 25, strength: 40, toughness: 40, agility: 20, intelligence: 25, perception: 30, willpower: 30, fellowship: 15
    }, trait: 'Waaagh!, 体型·普通', skill: '警觉, 普通知识·技术', equipment: '掠夺大炮, 兽人铁板甲', ahp: 12, hp: 8, maxHp: 8, armorRating: 3, movement: 2, baseMeleeDamage: '2 (S/20)', weaponStats: '掠夺大炮', tags: ['兽人', '重火力', '步兵']
  }, ork_stormboy: {
    name: '飙风小子 (Stormboy)', status: '冲击步兵', attributes: {
      weaponSkill: 40, ballisticSkill: 25, strength: 40, toughness: 40, agility: 40, intelligence: 20, perception: 30, willpower: 35, fellowship: 15
    }, trait: 'Waaagh!, 飞行, 体型·普通', skill: '特技, 闪避', equipment: '劈砍者, 砍砍枪, 厚皮衣', ahp: 1, hp: 8, maxHp: 8, armorRating: 1, movement: 8, baseMeleeDamage: '2 (S/20)', weaponStats: '劈砍者, 砍砍枪', tags: ['兽人', '突击', '步兵']
  }, ork_megaboss: {
    name: '巨型战争老大 (Mega Warboss)', status: '传说大军阀', attributes: {
      weaponSkill: 100, ballisticSkill: 45, strength: 130, toughness: 120, agility: 20, intelligence: 35, perception: 55, willpower: 85, fellowship: 40
    }, trait: 'Waaagh!, 体型·巨大', skill: '指挥, 恐吓, 战术', equipment: '超级动力爪, 爆爆大炮, 兽人特造重甲', ahp: 80, hp: 24, maxHp: 24, armorRating: 16, movement: 5, baseMeleeDamage: '6 (S/20)', weaponStats: '超级动力爪, 爆爆大炮', tags: ['兽人', '英雄', '传说']
  }
};
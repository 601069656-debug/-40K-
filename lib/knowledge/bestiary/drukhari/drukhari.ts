import { NPCProfile } from '../../../../types';

/**
 * 黑暗灵族 (Drukhari) - 科摩罗的掠夺者
 * 审计修正说明：
 * - 修正属性值为符合黑暗灵族设定的合理数值（高敏捷、中等武器技能、低坚韧）
 * - HP、MV、BMD严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10)（最小1），BMD = floor(S/20)
 * - 护甲属性参考规则表：歌本海姆战甲(AR5, AHP14, 敏捷+5)，掠夺者紧身服(AR3, AHP10, 敏捷+10)，精工暗物质护甲(AR8, AHP20, 力量+5, 敏捷+10)，生化改造皮肤(AR6, AHP25)
 * - 特质使用规则内合法特质，移除自创“痛苦中变强”“异界存在”实际规则中“异界存在”合法，保留
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats仅保留武器名称，参考规则表中的黑暗灵族武器
 * - 黑暗灵族体型均为普通
 */
export const DRUKHARI_DATA: Record<string, NPCProfile> = {
  kabalite_warrior: {
    name: '阴谋团战士 (Kabalite Warrior)', status: '核心步兵', attributes: {
      weaponSkill: 50, ballisticSkill: 55, strength: 35, toughness: 35, agility: 60, intelligence: 40, perception: 50, willpower: 45, fellowship: 20
    }, trait: '异界存在, 体型·普通', skill: '潜行, 警觉, 战术', equipment: '碎片步枪, 歌本海姆战甲', tags: ['德鲁卡里', '阴谋团', '步兵'], ahp: 14, hp: 7, maxHp: 7, armorRating: 5, movement: 6, baseMeleeDamage: '1 (S/20)', weaponStats: '碎片步枪'
  }, wych: {
    name: '薇奇竞技场战士 (Wych)', status: '格斗专家', attributes: {
      weaponSkill: 65, ballisticSkill: 45, strength: 35, toughness: 30, agility: 75, intelligence: 35, perception: 55, willpower: 50, fellowship: 25
    }, trait: '超自然速度, 体型·普通', skill: '闪避, 特技, 战术', equipment: '碎片手枪, 毒刃, 掠夺者紧身服, 战斗兴奋剂', tags: ['德鲁卡里', '竞技场', '精锐'], ahp: 10, hp: 6, maxHp: 6, armorRating: 3, movement: 7, baseMeleeDamage: '1 (S/20)', weaponStats: '碎片手枪, 毒刃'
  }, incubi: {
    name: '梦魇卫队 (Incubi)', status: '刀刃大师', attributes: {
      weaponSkill: 80, ballisticSkill: 40, strength: 45, toughness: 40, agility: 65, intelligence: 40, perception: 60, willpower: 60, fellowship: 15
    }, trait: '异界存在, 恐惧, 体型·普通', skill: '战术, 恐吓, 警觉', equipment: '克莱夫巨剑, 影域发生器, 歌本海姆战甲', tags: ['德鲁卡里', '圣地', '精锐'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '克莱夫'
  }, wrack: {
    name: '尸魔 (Wrack)', status: '生化构造体', attributes: {
      weaponSkill: 45, ballisticSkill: 30, strength: 50, toughness: 55, agility: 40, intelligence: 30, perception: 45, willpower: 50, fellowship: 5
    }, trait: '机械化·中级, 异界存在, 体型·普通', skill: '恐吓, 医疗', equipment: '解剖利刃, 生化改造皮肤', tags: ['德鲁卡里', '赫蒙库鲁斯', '杂兵'], ahp: 25, hp: 11, maxHp: 11, armorRating: 6, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '解剖利刃'
  }, archon: {
    name: '阴谋团执政官 (Archon)', status: '最高领主', attributes: {
      weaponSkill: 85, ballisticSkill: 75, strength: 45, toughness: 40, agility: 80, intelligence: 70, perception: 70, willpower: 75, fellowship: 60
    }, trait: '异界存在, 体型·普通', skill: '指挥, 战术, 恐吓, 欺诈', equipment: '爆破手手枪, 毒刃, 精工暗物质护甲, 影域发生器', tags: ['德鲁卡里', '英雄', '指挥官'], ahp: 20, hp: 8, maxHp: 8, armorRating: 8, movement: 8, baseMeleeDamage: '2 (S/20)', weaponStats: '爆破手手枪, 毒刃'
  }, haemonculus: {
    name: '血伶人 (Haemonculus)', status: '血肉工匠', attributes: {
      weaponSkill: 55, ballisticSkill: 50, strength: 40, toughness: 45, agility: 55, intelligence: 85, perception: 70, willpower: 80, fellowship: 30
    }, trait: '异界存在, 多臂, 恐惧, 体型·普通', skill: '医疗, 化学应用, 欺诈, 恐吓', equipment: '痛苦拳套, 解剖利刃, 生化改造皮肤', tags: ['德鲁卡里', '血伶人', '英雄'], ahp: 25, hp: 9, maxHp: 9, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '痛苦拳套, 解剖利刃'
  }, talos_pain_engine: {
    name: '塔洛斯痛苦引擎 (Talos Pain Engine)', status: '重型构造体', attributes: {
      weaponSkill: 55, ballisticSkill: 40, strength: 80, toughness: 75, agility: 35, intelligence: 15, perception: 45, willpower: 50, fellowship: 5
    }, trait: '机械化·中级, 强化天生武器, 多臂, 恐惧, 体型·大型', skill: '恐吓', equipment: '痛苦拳套, 毒晶卡宾枪, 生化改造皮肤', tags: ['德鲁卡里', '赫蒙库鲁斯', '重型单位'], ahp: 25, hp: 15, maxHp: 15, armorRating: 6, movement: 4, baseMeleeDamage: '4 (S/20)', weaponStats: '痛苦拳套, 毒晶卡宾枪'
  }
};
import { NPCProfile } from '../../../../types';

/**
 * 审判庭 - 审判庭战略师 (Inquisitorial Strategos)
 * 审计修正说明：
 * - 修正属性值为符合审判庭精英参谋设定的合理数值（智力、感知、意志较高）
 * - HP = max(1, floor(T/5)) = floor(35/5)=7
 * - MV = floor(Ag/10) = floor(30/10)=3，体型普通无修正
 * - BMD = floor(S/20) = floor(25/20)=1
 * - 护甲：甲壳甲提供AR4/AHP12，敏捷-5（已体现在敏捷属性中）
 * - 特质：战术分析师、逻辑至上、体型·普通（均为合法特质）
 * - 技能使用规则中的合法技能名称（战术、逻辑、普通知识·战争、学术知识·帝国战术、调查）
 * - weaponStats仅保留武器名称（激光卡宾枪）
 */
export const INQUISITION_STRATEGISTER_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'inquisition_strategister': {
    name: '审判庭战略师', status: '战术分析师', attributes: {
      weaponSkill: 30, ballisticSkill: 35, strength: 25, toughness: 35, agility: 30, intelligence: 55, perception: 50, willpower: 45, fellowship: 40
    }, trait: '战术分析师, 逻辑至上, 体型·普通', skill: '战术, 逻辑, 普通知识·战争, 学术知识·帝国战术, 调查', equipment: '激光卡宾枪, 鸟卜仪, 数据颅骨, 数据板, 甲壳甲', tags: ['帝国', '审判庭', '战略', '指挥'], ahp: 12, hp: 7, maxHp: 7, armorRating: 4, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '激光卡宾枪'
  }
};
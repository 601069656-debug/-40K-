import { NPCProfile } from '../../../../types';

/**
 * 机械教 - 电抗修士 (Electro-Priest)
 * 审计修正说明：
 * - 修正属性值为符合机械教精锐信徒设定的合理数值（精锐凡人35-44，意志较高）
 * - HP = max(1, floor(T/5)) = floor(40/5)=8
 * - MV = floor(Ag/10) = floor(35/10)=3，体型普通无修正
 * - BMD = floor(S/20) = floor(35/20)=1
 * - 护甲：机械教防护服（AR3/AHP8/智力+1，智力+1在属性中体现）
 * - 特质：机魂亲和（机械教派系技能）、体型·普通
 * - 技能：战斗训练（机械教派系技能，提供WS/BS+5）、意志（合法技能）
 * - 装备：电激战矛（规则中为第三等级近战武器，力量+8、伤害+6，对坚韧低于30目标麻痹）
 * - weaponStats仅保留武器名称
 * - 移除自创特质和技能
 */
export const ELECTRO_PRIEST_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'electro_priest': {
    name: '电抗修士', status: '动力源泉崇拜者', attributes: {
      weaponSkill: 45, ballisticSkill: 30, strength: 35, toughness: 40, agility: 35, intelligence: 40, perception: 35, willpower: 55, fellowship: 20
    }, trait: '机械化·高级, 电磁感知, 电能涌动, 机魂亲和, 体型·普通', skill: '战斗训练, 普通知识·技术, 普通知识·机械教', equipment: '电激战矛, 机械教防护服', tags: ['帝国', '机械教', '狂热者', '修士'], ahp: 8, hp: 8, maxHp: 8, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '电激战矛'
  }
};
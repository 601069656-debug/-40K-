import { NPCProfile } from '../../../../types';

/**
 * 审判庭 - 灵能抑制者 (Psychic Suppressor)
 * 审计修正说明：
 * - 修正属性值为符合空白/不可接触者设定的合理数值（高意志、低社交）
 * - 属性范围参考：WS 35-45，BS 35-45，S 30-40，T 35-45，Ag 35-45（甲壳甲-5后），Int 45-55，Per 40-50，WP 60-70，Fel 10-20
 * - HP = max(1, floor(T/5)) = floor(40/5)=8
 * - MV = floor(Ag/10) = floor(35/10)=3，体型普通无修正
 * - BMD = floor(S/20) = floor(35/20)=1
 * - 护甲：甲壳甲提供AR4/AHP12，敏捷-5（已体现在敏捷属性中）
 * - 特质：灵能静默（审判庭子派系）、体型·普通
 * - 技能：灵能抑制者（负向灵能者技能，NR3）、禁忌知识·灵能者、警觉、闪避
 * - weaponStats仅保留武器名称（零能法杖）
 */
export const PSYCHIC_SUPPRESSOR_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'psychic_suppressor': {
    name: '灵能抑制者', status: '不可接触者', attributes: {
      weaponSkill: 40, ballisticSkill: 35, strength: 35, toughness: 40, agility: 35, intelligence: 50, perception: 45, willpower: 65, fellowship: 15
    }, trait: '灵能静默, 体型·普通', skill: '灵能抑制者, 禁忌知识·灵能者, 警觉, 闪避', equipment: '零能法杖, 甲壳甲, 零能抑制项圈', tags: ['帝国', '审判庭', '反灵能', '空白'], ahp: 12, hp: 8, maxHp: 8, armorRating: 4, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '零能法杖'
  }
};
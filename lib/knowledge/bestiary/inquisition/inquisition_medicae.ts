import { NPCProfile } from '../../../../types';

/**
 * 审判庭 - 审判庭医官 (Inquisitorial Medicae)
 * 审计修正说明：
 * - 修正属性值为符合审判庭精锐凡人设定的合理数值（35-44范围）
 * - HP、MV、BMD严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10)（最小1），BMD = floor(S/20)
 * - 护甲甲壳甲提供AR4/AHP12，敏捷-5，已计入最终敏捷
 * - 特质包含帝皇之眼（审判庭通用）和法医专家（审判庭医官子派系）
 * - 技能使用规则中的合法技能名称（医疗、闪避、学术知识·动物学等）
 * - weaponStats仅保留武器名称
 */
export const INQUISITION_MEDICAE_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'inquisition_medicae': {
    name: '审判庭医官', status: '法医专家', attributes: {
      weaponSkill: 35, ballisticSkill: 40, strength: 30, toughness: 35, agility: 30, intelligence: 50, perception: 45, willpower: 45, fellowship: 30
    }, trait: '帝皇之眼, 法医专家, 体型·普通', skill: '医疗, 闪避, 学术知识·动物学, 学术知识·化学', equipment: '医疗包, 激光手枪, 地狱火激光步枪, 甲壳甲, 解毒剂', tags: ['帝国', '审判庭', '医疗'], ahp: 12, hp: 7, maxHp: 7, armorRating: 4, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '激光手枪, 地狱火激光步枪'
  }
};
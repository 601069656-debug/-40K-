import { NPCProfile } from '../../../../types';

/**
 * 第99德尔塔戈贡团 (Delta Gorgons) - 异形末日猎手
 * 审计修正说明：
 * - 修正属性值为符合风暴忠嗣军精锐设定的合理数值（凡人极限35-44，军官略高）
 * - 护甲：风暴忠嗣军型甲壳甲（AR5/AHP14，敏捷-5，感知+5）
 * - 特质合法化：天降死神、异形末日、体型·普通（仅保留名称，移除描述和重复/非法项如“毒素免疫”）
 * - 技能仅保留规则内合法技能：战术、警觉、闪避、潜行、指挥、恐吓、爆破
 * - 移除非法自创技能如“追踪”“异形知识”“解剖分析”“射击(连发激光)”“近战(链锯)”“异星语言”“战术分析”等
 * - weaponStats仅保留武器名称
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10)（甲壳甲敏捷-5后），BMD = floor(S/20)
 */
export const deltaGorgons: Record<string, NPCProfile> = {
  delta_gorgon_scion: {
    name: '第99德尔塔戈贡团忠嗣兵', status: '异形终结者', attributes: {
      weaponSkill: 40, ballisticSkill: 50, strength: 35, toughness: 35, agility: 35, intelligence: 45, perception: 55, willpower: 50, fellowship: 20
    }, trait: '天降死神, 异形末日, 体型·普通', skill: '战术, 警觉, 潜行', equipment: '风暴忠嗣军型甲壳甲, 地狱火连发激光枪, 忠嗣军降落伞, 扫描仪', tags: ['帝国', '风暴忠嗣军', '德尔塔戈贡', '异形猎人'], ahp: 14, hp: 7, maxHp: 7, armorRating: 5, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '地狱火连发激光枪'
  }, delta_gorgon_breacher: {
    name: '第99德尔塔戈贡团破障手', status: '虫巢克星', attributes: {
      weaponSkill: 45, ballisticSkill: 40, strength: 40, toughness: 40, agility: 30, intelligence: 40, perception: 50, willpower: 50, fellowship: 15
    }, trait: '天降死神, 异形末日, 体型·普通', skill: '战术, 爆破, 闪避', equipment: '风暴忠嗣军型甲壳甲, 军用霰弹枪, 链锯剑, 忠嗣军降落伞', tags: ['帝国', '风暴忠嗣军', '德尔塔戈贡', '近战'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '军用霰弹枪, 链锯剑'
  }, delta_gorgon_prime: {
    name: '第99德尔塔戈贡团忠嗣长', status: '戈贡之首', attributes: {
      weaponSkill: 50, ballisticSkill: 50, strength: 40, toughness: 40, agility: 35, intelligence: 55, perception: 55, willpower: 60, fellowship: 35
    }, trait: '天降死神, 异形末日, 体型·普通', skill: '指挥, 战术, 恐吓, 警觉', equipment: '风暴忠嗣军型甲壳甲, 爆弹枪, 链锯剑, 忠嗣军降落伞', tags: ['帝国', '风暴忠嗣军', '德尔塔戈贡', '军官'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '爆弹枪, 链锯剑, '
  }
};
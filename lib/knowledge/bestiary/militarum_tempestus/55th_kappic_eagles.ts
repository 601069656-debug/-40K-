import { NPCProfile } from '../../../../types';

/**
 * 第55卡皮克老鹰团 (Kappic Eagles) - 传奇异形猎手
 * 审计修正说明：
 * - 修正属性值为符合风暴忠嗣军精锐设定的合理数值（凡人极限35-44，军官略高）
 * - 护甲：风暴忠嗣军型甲壳甲（AR5/AHP14，敏捷-5，感知+5）
 * - 特质合法化：天降死神、传奇老鹰、火力压制、神圣职责、体型·普通
 * - 技能仅保留规则内合法技能：战术、警觉、闪避、潜行、指挥、恐吓
 * - 移除非法自创技能如“射击(地狱火)”“异星知识”“追踪”“弹药维护”“领导力”等
 * - weaponStats仅保留武器名称
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10)（甲壳甲敏捷-5后），BMD = floor(S/20)
 */
export const kappicEagles: Record<string, NPCProfile> = {
  kappic_eagle_scion: {
    name: '第55卡皮克老鹰团忠嗣兵', status: '异形猎手', attributes: {
      weaponSkill: 40, ballisticSkill: 50, strength: 35, toughness: 35, agility: 35, intelligence: 45, perception: 50, willpower: 45, fellowship: 20
    }, trait: '天降死神, 传奇老鹰, 体型·普通', skill: '战术, 警觉, 潜行', equipment: '风暴忠嗣军型甲壳甲, 制式格斗刀, 地狱火激光步枪, 忠嗣军降落伞, 忠嗣军型引能包', tags: ['帝国', '风暴忠嗣军', '卡皮克老鹰', '精锐'], ahp: 14, hp: 7, maxHp: 7, armorRating: 5, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '地狱火激光步枪, 制式格斗刀'
  }, kappic_eagle_specialist: {
    name: '第55卡皮克老鹰团特种兵', status: '重火支援', attributes: {
      weaponSkill: 35, ballisticSkill: 55, strength: 40, toughness: 40, agility: 30, intelligence: 40, perception: 45, willpower: 45, fellowship: 20
    }, trait: '天降死神, 传奇老鹰, 火力压制, 体型·普通', skill: '战术, 警觉, 闪避', equipment: '风暴忠嗣军型甲壳甲, 制式格斗刀, 地狱火连发激光枪, 忠嗣军降落伞, 忠嗣军型引能包', tags: ['帝国', '风暴忠嗣军', '卡皮克老鹰', '重火力'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '地狱火连发激光枪, 制式格斗刀'
  }, kappic_eagle_prime: {
    name: '第55卡皮克老鹰团忠嗣长', status: '高阶指挥官', attributes: {
      weaponSkill: 45, ballisticSkill: 55, strength: 40, toughness: 40, agility: 35, intelligence: 55, perception: 55, willpower: 60, fellowship: 35
    }, trait: '天降死神, 传奇老鹰, 神圣职责, 体型·普通', skill: '指挥, 战术, 恐吓, 警觉', equipment: '风暴忠嗣军型甲壳甲, 爆弹枪, 链锯剑, 忠嗣军降落伞', tags: ['帝国', '风暴忠嗣军', '卡皮克老鹰', '军官'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '爆弹枪, 链锯剑'
  }
};
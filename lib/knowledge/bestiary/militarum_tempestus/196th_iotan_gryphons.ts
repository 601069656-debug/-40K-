import { NPCProfile } from '../../../../types';

/**
 * 第196伊欧坦狮鹫团 (Iotan Gryphons) - 顽固至死的阵地守卫者
 * 审计修正说明：
 * - 修正属性值为符合风暴忠嗣军精锐设定的合理数值（凡人极限35-44，军官略高）
 * - 护甲：风暴忠嗣军型甲壳甲（AR5/AHP14，敏捷-5，感知+5）
 * - 特质合法化：天降死神、顽固至死、稳固、体型·普通（仅保留名称，移除描述）
 * - 技能仅保留规则内合法技能：战术、警觉、闪避、指挥、恐吓
 * - 移除非法自创技能如“射击(地狱火)”“意志对抗”“阵地构筑”“阵地防御”“力量训练”“阵地指挥”等
 * - weaponStats仅保留武器名称
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10)（甲壳甲敏捷-5后），BMD = floor(S/20)
 */
export const iotanGryphons: Record<string, NPCProfile> = {
  iotan_gryphon_scion: {
    name: '第196伊欧坦狮鹫团忠嗣兵', status: '阵地守卫者', attributes: {
      weaponSkill: 35, ballisticSkill: 45, strength: 35, toughness: 35, agility: 35, intelligence: 40, perception: 45, willpower: 50, fellowship: 20
    }, trait: '天降死神, 顽固至死, 体型·普通', skill: '战术, 警觉, 闪避', equipment: '风暴忠嗣军型甲壳甲, 地狱火激光步枪, 忠嗣军降落伞', tags: ['帝国', '风暴忠嗣军', '伊欧坦狮鹫', '顽固'], ahp: 14, hp: 7, maxHp: 7, armorRating: 5, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '地狱火激光步枪'
  }, iotan_gryphon_defender: {
    name: '第196伊欧坦狮鹫团重甲手', status: '铁壁', attributes: {
      weaponSkill: 40, ballisticSkill: 40, strength: 45, toughness: 40, agility: 30, intelligence: 35, perception: 40, willpower: 55, fellowship: 15
    }, trait: '天降死神, 顽固至死, 稳固, 体型·普通', skill: '战术, 警觉, 闪避', equipment: '风暴忠嗣军型甲壳甲, 地狱火连发激光枪, 暴风盾', tags: ['帝国', '风暴忠嗣军', '伊欧坦狮鹫', '重装'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '地狱火连发激光枪'
  }, iotan_gryphon_prime: {
    name: '第196伊欧坦狮鹫团忠嗣长', status: '不拔高塔', attributes: {
      weaponSkill: 45, ballisticSkill: 45, strength: 40, toughness: 40, agility: 35, intelligence: 50, perception: 50, willpower: 60, fellowship: 30
    }, trait: '天降死神, 顽固至死, 体型·普通', skill: '指挥, 战术, 恐吓, 闪避', equipment: '风暴忠嗣军型甲壳甲, 马尔斯型热熔枪, 链锯剑, 忠嗣军降落伞', tags: ['帝国', '风暴忠嗣军', '伊欧坦狮鹫', '军官'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '马尔斯型热熔枪, 链锯剑'
  }
};
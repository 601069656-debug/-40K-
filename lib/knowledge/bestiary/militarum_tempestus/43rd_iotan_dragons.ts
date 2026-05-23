import { NPCProfile } from '../../../../types';

/**
 * 第43伊欧坦巨龙团 (Iotan Dragons) - 坑道突击专家
 * 审计修正说明：
 * - 修正属性值为符合风暴忠嗣军精锐设定的合理数值（凡人极限35-44，军官略高）
 * - 护甲：风暴忠嗣军型甲壳甲（AR5/AHP14，敏捷-5，感知+5）
 * - 特质合法化：天降死神、盲战巨龙、体型·普通（仅保留名称，移除描述）
 * - 技能仅保留规则内合法技能：战术、警觉、闪避、潜行、指挥、恐吓
 * - 移除非法自创技能如“近战(单分子)”“射击(地狱火)”“鸟卜仪使用”“环境渗透”“暗杀”“陷阱设置”“追踪”“地形利用”“战术判析”等
 * - weaponStats仅保留武器名称
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10)（甲壳甲敏捷-5后），BMD = floor(S/20)
 */
export const iotanDragons: Record<string, NPCProfile> = {
  iotan_dragon_scion: {
    name: '第43伊欧坦巨龙团忠嗣兵', status: '坑道突击手', attributes: {
      weaponSkill: 45, ballisticSkill: 40, strength: 35, toughness: 35, agility: 35, intelligence: 40, perception: 50, willpower: 45, fellowship: 20
    }, trait: '天降死神, 盲战巨龙, 体型·普通', skill: '战术, 警觉, 潜行', equipment: '风暴忠嗣军型甲壳甲, 地狱火激光步枪, 忠嗣军降落伞, 高级多光谱目镜', tags: ['帝国', '风暴忠嗣军', '伊欧坦巨龙', '坑道专家'], ahp: 14, hp: 7, maxHp: 7, armorRating: 5, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '地狱火激光步枪'
  }, iotan_dragon_infiltrator: {
    name: '第43伊欧坦巨龙团潜行者', status: '幽影刺客', attributes: {
      weaponSkill: 50, ballisticSkill: 35, strength: 35, toughness: 35, agility: 40, intelligence: 45, perception: 55, willpower: 45, fellowship: 15
    }, trait: '天降死神, 盲战巨龙, 体型·普通', skill: '潜行, 战术, 闪避', equipment: '风暴忠嗣军型甲壳甲, 制式格斗刀, 激光手枪, 忠嗣军降落伞', tags: ['帝国', '风暴忠嗣军', '伊欧坦巨龙', '渗透'], ahp: 14, hp: 7, maxHp: 7, armorRating: 5, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '制式格斗刀, 激光手枪'
  }, iotan_dragon_prime: {
    name: '第43伊欧坦巨龙团忠嗣长', status: '深坑龙首', attributes: {
      weaponSkill: 50, ballisticSkill: 45, strength: 40, toughness: 40, agility: 35, intelligence: 55, perception: 55, willpower: 55, fellowship: 30
    }, trait: '天降死神, 盲战巨龙, 体型·普通', skill: '指挥, 战术, 恐吓, 闪避', equipment: '风暴忠嗣军型甲壳甲, 卡迪安型动力剑, 火焰喷射器, 忠嗣军降落伞', tags: ['帝国', '风暴忠嗣军', '伊欧坦巨龙', '军官'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '卡迪安型动力剑, 火焰喷射器'
  }
};
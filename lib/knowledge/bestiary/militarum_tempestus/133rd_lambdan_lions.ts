import { NPCProfile } from '../../../../types';

/**
 * 第133兰姆达狮子团 (Lambdan Lions) - 机械教辅助军
 * 审计修正说明：
 * - 修正属性值为符合风暴忠嗣军精锐设定的合理数值（凡人极限35-44，经特质修正后）
 * - 护甲：风暴忠嗣军型甲壳甲（AR5/AHP14，敏捷-5，感知+5）
 * - 特质合法化：天降死神、机械教辅助军、神圣职责、百战幸存、火力压制（仅保留合法名称，移除描述）
 * - 技能仅保留规则内合法技能：战术、警觉、闪避、潜行、指挥、逻辑、普通知识·技术、医疗、特技
 * - 移除非法自创技能如“射击(地狱火)”、“弹药维护”、“逻辑分析”、“装备调试”等
 * - weaponStats仅保留武器名称
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10)，BMD = floor(S/20)
 */
export const lambdanLions: Record<string, NPCProfile> = {
  lambdan_lion_scion: {
    name: '第133兰姆达狮子团忠嗣兵', status: '机械教先锋步兵', attributes: {
      weaponSkill: 35, ballisticSkill: 45, strength: 35, toughness: 35, agility: 35, intelligence: 50, perception: 45, willpower: 40, fellowship: 20
    }, trait: '天降死神, 机械教辅助军, 体型·普通', skill: '战术, 警觉, 潜行', equipment: '风暴忠嗣军型甲壳甲, 地狱火激光步枪, 忠嗣军降落伞, 忠嗣军型引能包, 鸟卜仪', tags: ['帝国', '风暴忠嗣军', '兰姆达狮子', '精锐'], ahp: 14, hp: 7, maxHp: 7, armorRating: 5, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '地狱火激光步枪'
  }, lambdan_lion_volley_gunner: {
    name: '第133兰姆达狮子团连发激光手', status: '重装压制手', attributes: {
      weaponSkill: 35, ballisticSkill: 50, strength: 40, toughness: 40, agility: 30, intelligence: 50, perception: 45, willpower: 45, fellowship: 20
    }, trait: '天降死神, 机械教辅助军, 火力压制, 体型·普通', skill: '战术, 警觉, 闪避', equipment: '风暴忠嗣军型甲壳甲, 地狱火连发激光枪, 忠嗣军降落伞, 忠嗣军型引能包', tags: ['帝国', '风暴忠嗣军', '兰姆达狮子', '重火力'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '地狱火连发激光枪'
  }, lambdan_lion_plasma_specialist: {
    name: '第133兰姆达狮子团等离子专家', status: '欧姆尼赛亚之怒', attributes: {
      weaponSkill: 35, ballisticSkill: 50, strength: 35, toughness: 35, agility: 30, intelligence: 55, perception: 50, willpower: 45, fellowship: 20
    }, trait: '天降死神, 机械教辅助军, 体型·普通', skill: '战术, 逻辑, 警觉', equipment: '风暴忠嗣军型甲壳甲, 等离子步枪, 忠嗣军降落伞, 高级多光谱目镜', tags: ['帝国', '风暴忠嗣军', '兰姆达狮子', '渗透'], ahp: 14, hp: 7, maxHp: 7, armorRating: 5, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '等离子步枪'
  }, lambdan_lion_tempestor: {
    name: '第133兰姆达狮子团士官', status: '战术判析官', attributes: {
      weaponSkill: 45, ballisticSkill: 50, strength: 40, toughness: 40, agility: 35, intelligence: 55, perception: 50, willpower: 55, fellowship: 25
    }, trait: '天降死神, 机械教辅助军, 神圣职责, 体型·普通', skill: '指挥, 战术, 魅力, 警觉', equipment: '风暴忠嗣军型甲壳甲, 激光手枪, 卡迪安型动力剑, 忠嗣军降落伞, 鸟卜仪', tags: ['帝国', '风暴忠嗣军', '兰姆达狮子', '军官'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '激光手枪, 卡迪安型动力剑'
  }, lambdan_lion_prime: {
    name: '第133兰姆达狮子团忠嗣长', status: '机械教之音', attributes: {
      weaponSkill: 50, ballisticSkill: 55, strength: 45, toughness: 45, agility: 40, intelligence: 60, perception: 55, willpower: 65, fellowship: 30
    }, trait: '天降死神, 机械教辅助军, 百战幸存, 体型·普通', skill: '指挥, 战术, 逻辑, 普通知识·技术, 特技', equipment: '风暴忠嗣军型甲壳甲, 激光手枪, 动力棍, 忠嗣军降落伞', tags: ['帝国', '风暴忠嗣军', '兰姆达狮子', '领袖'], ahp: 14, hp: 9, maxHp: 9, armorRating: 5, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '激光手枪, 动力棍'
  }
};
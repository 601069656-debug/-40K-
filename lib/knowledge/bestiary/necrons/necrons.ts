import { NPCProfile } from '../../../../types';

/**
 * 太空死灵 (Necrons) - 苏醒的王朝
 * 审计修正说明：
 * - 修正属性值为符合世界观设定的合理数值（参考规则表：战士45-54，不朽者55-69，领主100-149等）
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10)（体型普通无修正），BMD = floor(S/20)
 * - 护甲值AR和AHP参考规则表（活体金属外壳AR8/AHP20，强化型AR9/AHP25，霸主王权甲AR14/AHP45）
 * - 特质仅保留合法名称，移除描述，用逗号分隔
 * - 技能使用规则列表中的合法技能（战术、警觉、闪避、潜行、追迹、指挥、恐吓、逻辑）
 * - weaponStats仅保留武器名称
 */
export const NECRONS_DATA: Record<string, NPCProfile> = {
  necron_warrior: {
    name: '死灵武士', status: '无意识士兵', attributes: {
      weaponSkill: 45, ballisticSkill: 45, strength: 45, toughness: 45, agility: 25, intelligence: 10, perception: 35, willpower: 40, fellowship: 5
    }, trait: '活体金属, 协议驱动, 无尽军团, 体型·普通', skill: '', equipment: '高斯裂解步枪, 活体金属外壳', ahp: 20, hp: 9, maxHp: 9, armorRating: 8, movement: 2, baseMeleeDamage: '2 (S/20)', weaponStats: '高斯裂解步枪', tags: ['太空死灵', '步兵']
  }, necron_immortal: {
    name: '死灵不朽者', status: '精锐步兵', attributes: {
      weaponSkill: 60, ballisticSkill: 60, strength: 55, toughness: 55, agility: 30, intelligence: 15, perception: 45, willpower: 50, fellowship: 5
    }, trait: '强化协议, 高级活体金属, 体型·普通', skill: '战术, 警觉', equipment: '高斯爆裂枪, 强化型活体金属外壳', ahp: 25, hp: 11, maxHp: 11, armorRating: 9, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '高斯爆裂枪', tags: ['太空死灵', '步兵']
  }, deathmark: {
    name: '死亡印记', status: '刺客', attributes: {
      weaponSkill: 45, ballisticSkill: 65, strength: 35, toughness: 40, agility: 60, intelligence: 30, perception: 70, willpower: 50, fellowship: 10
    }, trait: '跨维度猎手, 猎人印记, 体型·普通', skill: '潜行, 闪避, 警觉, 追迹', equipment: '共振狙击枪, 活体金属外壳', ahp: 20, hp: 8, maxHp: 8, armorRating: 8, movement: 6, baseMeleeDamage: '1 (S/20)', weaponStats: '共振狙击枪', tags: ['太空死灵', '刺客']
  }, lychguard: {
    name: '圣盾卫队', status: '皇室禁卫', attributes: {
      weaponSkill: 75, ballisticSkill: 30, strength: 70, toughness: 75, agility: 35, intelligence: 30, perception: 50, willpower: 60, fellowship: 10
    }, trait: '效忠誓言, 超相位防御, 体型·普通', skill: '恐吓, 战术', equipment: '超相位剑, 强化型活体金属外壳', ahp: 25, hp: 15, maxHp: 15, armorRating: 9, movement: 3, baseMeleeDamage: '3 (S/20)', weaponStats: '超相位剑', tags: ['太空死灵', '精锐']
  }, necron_overlord: {
    name: '太空死灵霸主', status: '王朝统治者', attributes: {
      weaponSkill: 100, ballisticSkill: 80, strength: 90, toughness: 90, agility: 60, intelligence: 80, perception: 80, willpower: 100, fellowship: 40
    }, trait: '不灭意志, 支配律令, 战术统帅, 体型·普通', skill: '指挥, 战术, 逻辑, 恐吓', equipment: '虚空之镰, 圣光法杖, 霸主王权甲', ahp: 45, hp: 18, maxHp: 18, armorRating: 14, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '虚空之镰, 圣光法杖', tags: ['太空死灵', '英雄', '领导者']
  }, flayed_one: {
    name: '死灵剥皮者', status: '遭诅咒的死灵掠食者', attributes: {
      weaponSkill: 65, ballisticSkill: 0, strength: 50, toughness: 50, agility: 60, intelligence: 20, perception: 60, willpower: 40, fellowship: 5
    }, trait: '活体金属, 协议驱动, 强化天生武器, 剥皮狂热, 体型·普通', skill: '恐吓, 潜行', equipment: '活体金属外壳', ahp: 20, hp: 10, maxHp: 10, armorRating: 8, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '剔骨利爪', tags: ['太空死灵', '步兵', '突击兵']
  }
};
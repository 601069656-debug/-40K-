import { NPCProfile } from '../../../../types';

/**
 * 沃坦联盟 (Leagues of Votann)
 * 审计修正说明：
 * - 修正属性值为符合沃坦设定的合理数值（改良人类，属性在凡人极限至星际战士侦察兵水平）
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正，BMD = floor(S/20)
 * - 护甲值AR/AHP参考规则表（虚空战斗服、赫金先锋护甲、坚毅者外骨骼等）
 * - 特质仅保留合法名称，移除自创描述，替换为规则内特质
 * - 技能使用规则技能列表中的合法技能
 * - weaponStats仅保留武器名称
 */
export const LEAGUES_OF_VOTANN_DATA: Record<string, NPCProfile> = {
  hearthkyn_warrior: {
    name: '赫金战士 (Hearthkyn Warrior)', status: '核心步兵', attributes: {
      weaponSkill: 45, ballisticSkill: 45, strength: 45, toughness: 45, agility: 35, intelligence: 40, perception: 40, willpower: 50, fellowship: 30
    }, trait: '稳固, 体型·普通', skill: '警觉, 战术', equipment: '爆弹步枪, 虚空战斗服', tags: ['沃坦', '步兵'], ahp: 14, hp: 9, maxHp: 9, armorRating: 6, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '爆弹步枪'
  }, hernkyn_pioneer: {
    name: '赫金先锋 (Hernkyn Pioneer)', status: '反重力侦察兵', attributes: {
      weaponSkill: 40, ballisticSkill: 50, strength: 40, toughness: 40, agility: 55, intelligence: 40, perception: 50, willpower: 45, fellowship: 25
    }, trait: '体型·大型', skill: '驾驶, 侦察, 警觉', equipment: '脉冲步枪, 赫金先锋护甲', tags: ['沃坦', '侦察', '骑兵'], ahp: 14, hp: 8, maxHp: 8, armorRating: 5, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '脉冲步枪'
  }, einhyr_hearthguard: {
    name: '海瑟精锐卫队 (Einhyr Hearthguard)', status: '重装精锐', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 60, toughness: 60, agility: 35, intelligence: 45, perception: 45, willpower: 55, fellowship: 25
    }, trait: '稳固, 体型·普通', skill: '战术, 警觉', equipment: '等离子斧, 离子爆能枪, 坚毅者外骨骼装甲', tags: ['沃坦', '精锐', '战斗服'], ahp: 40, hp: 12, maxHp: 12, armorRating: 12, movement: 3, baseMeleeDamage: '3 (S/20)', weaponStats: '等离子斧, 离子爆能枪'
  }, cthonian_beserk: {
    name: '克索尼亚狂战士 (Cthonian Beserk)', status: '生化强化突击兵', attributes: {
      weaponSkill: 60, ballisticSkill: 30, strength: 55, toughness: 50, agility: 45, intelligence: 30, perception: 40, willpower: 50, fellowship: 20
    }, trait: '稳固, 体型·普通', skill: '恐吓, 闪避', equipment: '震荡锤', tags: ['沃坦', '步兵', '突击'], ahp: 6, hp: 10, maxHp: 10, armorRating: 0, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '震荡锤'
  }, kahl: {
    name: '卡尔 (Kâhl)', status: '血脉领主', attributes: {
      weaponSkill: 65, ballisticSkill: 60, strength: 55, toughness: 55, agility: 40, intelligence: 60, perception: 55, willpower: 70, fellowship: 55
    }, trait: '稳固, 体型·普通', skill: '指挥, 战术, 恐吓', equipment: '暗星战刀, 爆弹步枪, 虚空战斗服, 传送顶饰', tags: ['沃坦', '英雄', '指挥官'], ahp: 14, hp: 11, maxHp: 11, armorRating: 6, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '暗星战刀, 爆弹步枪'
  }, ironkin: {
    name: '铁金无人机 (Ironkin)', status: 'AI兄弟', attributes: {
      weaponSkill: 45, ballisticSkill: 45, strength: 50, toughness: 50, agility: 40, intelligence: 55, perception: 45, willpower: 60, fellowship: 15
    }, trait: '机械化·高级, 稳固, 体型·普通', skill: '逻辑, 警觉, 战术', equipment: '离子爆能枪', tags: ['沃坦', 'AI', '精锐'], ahp: 6, hp: 10, maxHp: 10, armorRating: 0, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '离子爆能枪'
  }, hekaton_land_fortress: {
    name: '赫卡顿陆上要塞 (Hekaton Land Fortress)', status: '重型战车', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 120, agility: 10, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '火山重炮, 双联爆弹炮, 陆上要塞镀层', tags: ['沃坦', '重型单位', '载具'], ahp: 60, hp: 24, maxHp: 24, armorRating: 18, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '火山重炮, 双联爆弹炮'
  }
};
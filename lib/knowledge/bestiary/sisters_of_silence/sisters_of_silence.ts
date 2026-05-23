// ==================== 寂静修女会 (Sisters of Silence) ====================
// 审计修正说明：
// - 修正属性值为符合寂静修女会精英设定的合理数值（凡人极限45-54，修女长略高）
// - HP = max(1, floor(T/5))，MV = floor(Ag/10)（圣契型动力甲敏捷+10后），BMD = floor(S/20)
// - 护甲：圣契型动力甲（AR6/AHP18，力量+10，敏捷+10，感知+10）
// - 武器仅保留名称，移除伤害细节
// - 特质合法化：寂静誓言、稳定齐射、救赎大剑、猎巫之焰、体型·普通（均为合法特质）
// - 技能替换为规则列表中的合法技能（警觉、调查、战术、闪避等）
import { NPCProfile } from '../../../../types';

export const SISTERS_OF_SILENCE_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'sisters_of_silence_prosecutor': {
    id: 'sisters_of_silence_prosecutor', name: '寂静修女·驱魔人', status: '反灵能步兵', attributes: {
      weaponSkill: 50, ballisticSkill: 55, strength: 45, toughness: 45, agility: 55, intelligence: 45, perception: 55, willpower: 65, fellowship: 15
    }, trait: '寂静誓言, 稳定齐射, 体型·普通', skill: '警觉, 调查, 战术, 闪避', equipment: '圣契型动力甲, 圣契型爆弹枪, 破片手雷', tags: ['帝国', '寂静修女会', '驱魔人', '精英'], ahp: 18, hp: 9, maxHp: 9, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '圣契型爆弹枪'
  }, 'sisters_of_silence_vigilator': {
    id: 'sisters_of_silence_vigilator', name: '寂静修女·探求者', status: '近战处刑少女', attributes: {
      weaponSkill: 60, ballisticSkill: 40, strength: 45, toughness: 45, agility: 55, intelligence: 45, perception: 55, willpower: 65, fellowship: 15
    }, trait: '寂静誓言, 救赎大剑, 体型·普通', skill: '警觉, 战术, 闪避', equipment: '圣契型动力甲, 行刑者大剑, 破片手雷', tags: ['帝国', '寂静修女会', '探求者', '精英'], ahp: 18, hp: 9, maxHp: 9, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '行刑者大剑'
  }, 'sisters_of_silence_witchseeker': {
    id: 'sisters_of_silence_witchseeker', name: '寂静修女·猎巫人', status: '净化火炮手', attributes: {
      weaponSkill: 45, ballisticSkill: 55, strength: 45, toughness: 45, agility: 50, intelligence: 45, perception: 60, willpower: 65, fellowship: 15
    }, trait: '寂静誓言, 猎巫之焰, 体型·普通', skill: '警觉, 调查, 战术, 闪避', equipment: '圣契型动力甲, 净化之焰, 破片手雷', tags: ['帝国', '寂静修女会', '猎巫人', '精英'], ahp: 18, hp: 9, maxHp: 9, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '净化之焰'
  }, 'sisters_of_silence_superior': {
    id: 'sisters_of_silence_superior', name: '寂静修女·修女长', status: '战斗小队指挥官', attributes: {
      weaponSkill: 65, ballisticSkill: 55, strength: 50, toughness: 50, agility: 60, intelligence: 50, perception: 60, willpower: 75, fellowship: 20
    }, trait: '寂静誓言, 救赎大剑, 体型·普通', skill: '指挥, 警觉, 战术, 闪避, 调查', equipment: '圣契型动力甲, 行刑者双剑, 圣契型爆弹枪, 灵能手雷', tags: ['帝国', '寂静修女会', '探求者', '修女长', '精锐'], ahp: 18, hp: 10, maxHp: 10, armorRating: 6, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '行刑者双剑, 圣契型爆弹枪'
  }
};
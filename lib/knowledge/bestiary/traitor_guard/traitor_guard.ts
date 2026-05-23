// ==================== 叛教星界军 (Traitor Guard) ====================
// 审计修正说明：
// - 属性值符合凡人基准（25-34），老兵略高（35-44）。
// - HP = floor(T/5)，MV = floor(Ag/10)，BMD = floor(S/20)
// - 护甲：星界军防弹甲（AR3, AHP6）
// - 特质合法化：黑暗献祭（叛教星界军派系特质）、百战幸存、体型·普通
// - 技能仅保留规则内合法技能：战术、闪避、生存
// - 武器仅保留名称，移除伤害细节。
import { NPCProfile } from '../../../../types';

export const TRAITOR_GUARD_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'traitor_guardsman': {
    name: '叛教星界军步兵', status: '混沌阵营大头', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 25, perception: 25, willpower: 30, fellowship: 15
    }, trait: '黑暗献祭, 体型·普通', skill: '战术, 闪避, 生存', equipment: 'M36 激光枪, 星界军防弹甲, 破片手雷', tags: ['混沌', '叛教星界军', '凡人'], ahp: 6, hp: 6, maxHp: 6, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: 'M36 激光枪'
  }, 'traitor_guard_veteran': {
    name: '叛教星界军老兵', status: '百战邪门大头', attributes: {
      weaponSkill: 40, ballisticSkill: 40, strength: 35, toughness: 35, agility: 35, intelligence: 30, perception: 30, willpower: 40, fellowship: 15
    }, trait: '黑暗献祭, 百战幸存, 体型·普通', skill: '战术, 闪避, 生存', equipment: '雷亚型等离子枪, 星界军防弹甲, 破片手雷', tags: ['混沌', '叛教星界军', '凡人', '老兵'], ahp: 6, hp: 7, maxHp: 7, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '雷亚型等离子枪'
  }
};
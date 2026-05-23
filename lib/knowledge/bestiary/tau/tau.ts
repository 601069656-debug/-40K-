// ==================== 钛族 (T'au Empire) ====================
// 审计修正说明：
// - 属性值符合钛族设定：火战士基准25-34，精锐35-44，战斗服更高。
// - HP = max(1, floor(T/5))，MV = floor(Ag/10)（最小1）+ 体型修正，BMD = floor(S/20)
// - 护甲值和属性修正参考规则表：火战士护甲(AR5/AHP14, 意志+5)，XV25隐形服(AR6/AHP20, 敏捷+15)，XV8危机甲(AR8/AHP24, 力量+25, 敏捷-30, 移动力-1)，XV88广域式(AR12/AHP40, 意志+10)，克鲁特简易皮革(AR2/AHP6)。
// - 武器仅保留名称，移除细节。
// - 特质仅保留合法名称（上上善道、体型·普通/大型、飞行、机械化·中级/高级等），移除自创特质。
// - 技能替换为规则内合法技能（战术、警觉、潜行、指挥、恐吓、追迹等）。
import { NPCProfile } from '../../../../types';

export const TAU_DATA: Record<string, NPCProfile> = {
  fire_warrior: {
    name: '火战士 (Fire Warrior)', status: '火阶步兵', attributes: {
      weaponSkill: 25, ballisticSkill: 35, strength: 25, toughness: 30, agility: 30, intelligence: 35, perception: 35, willpower: 35, fellowship: 25
    }, trait: '上上善道, 体型·普通', skill: '战术, 警觉', equipment: '脉冲步枪, 火战士护甲, 光子榴弹', tags: ['钛族', '步兵'], ahp: 14, hp: 6, maxHp: 6, armorRating: 5, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '脉冲步枪'
  }, kroot_carnivore: {
    name: '克鲁特食肉者 (Kroot Carnivore)', status: '核心辅助步兵', attributes: {
      weaponSkill: 40, ballisticSkill: 30, strength: 35, toughness: 35, agility: 40, intelligence: 25, perception: 45, willpower: 35, fellowship: 15
    }, trait: '荒野求生, 天生武器, 体型·普通', skill: '生存, 潜行, 警觉', equipment: '克鲁特长枪, 破损的兽皮', tags: ['克鲁特', '辅助军', '步兵'], ahp: 2, hp: 7, maxHp: 7, armorRating: 1, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '克鲁特长枪, 长枪利刃'
  }, kroot_shaper: {
    name: '克鲁特塑形者 (Kroot Shaper)', status: '族群领袖', attributes: {
      weaponSkill: 45, ballisticSkill: 35, strength: 40, toughness: 40, agility: 45, intelligence: 30, perception: 50, willpower: 45, fellowship: 25
    }, trait: '荒野求生, 强化天生武器, 体型·普通', skill: '指挥, 生存, 追迹', equipment: '精制克鲁特步枪, 塑形者之刃, 塑形者萨满基因药囊', tags: ['克鲁特', '领导者', '辅助军'], ahp: 0, hp: 8, maxHp: 8, armorRating: 0, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '精制克鲁特步枪, 塑形者之刃'
  }, pathfinder: {
    name: '寻迹者 (Pathfinder)', status: '前锋侦察兵', attributes: {
      weaponSkill: 25, ballisticSkill: 40, strength: 25, toughness: 30, agility: 35, intelligence: 40, perception: 45, willpower: 35, fellowship: 25
    }, trait: '上上善道, 体型·普通', skill: '潜行, 警觉, 侦察', equipment: '脉冲卡宾枪, 标记灯, 火战士护甲', tags: ['钛族', '侦察'], ahp: 14, hp: 6, maxHp: 6, armorRating: 5, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '脉冲卡宾枪'
  }, stealth_suit: {
    name: '隐形战士 (XV25 Stealth Suit)', status: '隐秘渗透者', attributes: {
      weaponSkill: 30, ballisticSkill: 45, strength: 35, toughness: 35, agility: 55, intelligence: 40, perception: 50, willpower: 40, fellowship: 15
    }, trait: '上上善道, 飞行, 体型·普通', skill: '潜行, 警觉, 战术', equipment: '爆破加农炮, XV25 隐形服', tags: ['钛族', '隐形', '战斗服'], ahp: 20, hp: 7, maxHp: 7, armorRating: 6, movement: 5, baseMeleeDamage: '1 (S/20)', weaponStats: '爆破加农炮'
  }, crisis_battlesuit: {
    name: '危机战斗服 (XV8 Crisis Battlesuit)', status: '多用途精锐', attributes: {
      weaponSkill: 35, ballisticSkill: 50, strength: 50, toughness: 50, agility: 20, intelligence: 45, perception: 45, willpower: 45, fellowship: 15
    }, trait: '上上善道, 飞行, 机械化·高级, 体型·大型', skill: '战术, 恐吓', equipment: '等离子步枪, 导弹荚舱, XV8 危机式战斗服', tags: ['钛族', '精锐', '战斗服'], ahp: 24, hp: 10, maxHp: 10, armorRating: 8, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '等离子步枪, 导弹荚舱'
  }, broadside_battlesuit: {
    name: '广域战斗服 (XV88 Broadside)', status: '重火力平台', attributes: {
      weaponSkill: 25, ballisticSkill: 55, strength: 45, toughness: 50, agility: 15, intelligence: 35, perception: 45, willpower: 55, fellowship: 10
    }, trait: '上上善道, 机械化·高级, 体型·大型', skill: '战术', equipment: '磁轨步枪, 导弹荚舱, XV88 广域式战斗服', tags: ['钛族', '重型单位', '战斗服'], ahp: 40, hp: 10, maxHp: 10, armorRating: 12, movement: 2, baseMeleeDamage: '2 (S/20)', weaponStats: '磁轨步枪, 导弹荚舱'
  }, commander_farsight: {
    name: '远见指挥官 (Commander Farsight)', status: '远见盟之主', attributes: {
      weaponSkill: 85, ballisticSkill: 80, strength: 70, toughness: 70, agility: 40, intelligence: 75, perception: 70, willpower: 85, fellowship: 65
    }, trait: '上上善道, 飞行, 机械化·高级, 体型·大型', skill: '指挥, 战术, 恐吓, 追迹', equipment: '黎明之剑, 等离子步枪, XV8-02 危机战斗服', tags: ['钛族', '英雄', '指挥官', '远见盟'], ahp: 24, hp: 14, maxHp: 14, armorRating: 8, movement: 4, baseMeleeDamage: '3 (S/20)', weaponStats: '黎明之剑, 等离子步枪'
  }, drone_gun: {
    name: '武装无人机 (Gun Drone)', status: 'AI单元', attributes: {
      weaponSkill: 0, ballisticSkill: 40, strength: 15, toughness: 20, agility: 50, intelligence: 10, perception: 40, willpower: 15, fellowship: 5
    }, trait: '飞行, 体型·微小', skill: '警觉', equipment: '脉冲卡宾枪, 无人机外壳', tags: ['钛族', '无人机', '杂兵'], ahp: 0, hp: 4, maxHp: 4, armorRating: 0, movement: 10, baseMeleeDamage: '0 (S/20)', weaponStats: '脉冲卡宾枪'
  }
};
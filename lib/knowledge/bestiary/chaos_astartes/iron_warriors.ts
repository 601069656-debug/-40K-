import { NPCProfile } from '../../../../types';

/**
 * 钢铁勇士 (Iron Warriors) - 围攻专家与机械大师
 * 审计修正说明：
 * - 修正所有属性值为符合世界观设定的合理数值
 * - 护甲属性修正已正确应用（混沌动力甲：力量+20、感知+20、意志+5、敏捷-5, 终结者护甲：力量+40、意志+15、敏捷-40等）
 * - 特质仅保留合法名称，移除描述，用逗号分隔（移除自创特质“内无怜悯”“战争大师”“狂暴意志”）
 * - 技能替换为规则技能列表中的合法技能（普通知识·技术、爆破、逻辑、祈求等）
 * - weaponStats 仅保留武器名称，移除伤害细节
 * - HP、MV、BMD 严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（大型+1），BMD = floor(S/20)
 * - 混沌印记提供全属性+5，百战幸存提供S/T/Ag/WP+5，已包含在最终属性中
 */
export const IRON_WARRIORS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'iron_warriors_marine': {
    name: '钢铁勇士战术修士', status: '围攻老兵', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 75, toughness: 70, agility: 55, intelligence: 50, perception: 55, willpower: 70, fellowship: 15
    }, trait: '工业直觉, 叛变战士, 体型·大型, 攻城大师, 混沌印记', skill: '战术, 普通知识·技术, 逻辑', equipment: '混沌动力甲, 阿斯塔特爆弹枪, 阿斯塔特格斗刀', tags: ['混沌', '混沌星际战士', '钢铁勇士'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特格斗刀'
  }, 'iron_warriors_havoc': {
    name: '钢铁勇士浩劫者', status: '火力支柱', attributes: {
      weaponSkill: 70, ballisticSkill: 80, strength: 80, toughness: 75, agility: 50, intelligence: 45, perception: 60, willpower: 70, fellowship: 15
    }, trait: '工业直觉, 叛变战士, 体型·大型, 攻城大师, 混沌印记', skill: '战术, 爆破, 警觉', equipment: '混沌动力甲, 转管自动炮, 精工阿斯塔特爆弹手枪', tags: ['混沌', '混沌星际战士', '重火力', '浩劫', '钢铁勇士'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '转管自动炮, 精工阿斯塔特爆弹手枪'
  }, 'iron_warriors_terminator': {
    name: '钢铁勇士终结者', status: '要塞粉碎者', attributes: {
      weaponSkill: 85, ballisticSkill: 80, strength: 100, toughness: 90, agility: 30, intelligence: 50, perception: 65, willpower: 85, fellowship: 15
    }, trait: '工业直觉, 叛变战士, 终结者意志, 体型·大型, 攻城大师, 混沌印记', skill: '战术, 恐吓', equipment: '混沌终结者护甲, 无畏型动力爪, 组合爆弹枪', tags: ['混沌', '混沌星际战士', '精英', '终结者', '钢铁勇士'], ahp: 38, hp: 18, maxHp: 18, armorRating: 13, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '无畏型动力爪, 组合爆弹枪'
  }, 'iron_warriors_warpsmith': {
    name: '战团铸造魔师', status: '恶魔引擎牧者', attributes: {
      weaponSkill: 65, ballisticSkill: 65, strength: 70, toughness: 65, agility: 55, intelligence: 85, perception: 70, willpower: 85, fellowship: 15
    }, trait: '工业直觉, 叛变战士, 体型·大型, 攻城大师, 混沌印记', skill: '逻辑, 禁忌知识·亚空间, 祈求, 灵能掌控', equipment: '混沌动力甲, 伺服臂组, 动力斧, Mk II“日怒”型等离子手枪', tags: ['混沌', '混沌星际战士', '灵能者', '技术', '钢铁勇士'], ahp: 22, hp: 13, maxHp: 13, armorRating: 8, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '伺服臂组, 动力斧, Mk II“日怒”型等离子手枪'
  }, 'iron_warriors_warsmith': {
    name: '战争铁匠', status: '围攻督军', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 105, toughness: 95, agility: 65, intelligence: 80, perception: 75, willpower: 95, fellowship: 40
    }, trait: '工业直觉, 叛变战士, 英雄之躯, 百战幸存, 机械化·高级, 体型·大型, 攻城大师, 混沌印记', skill: '指挥, 战术, 逻辑, 禁忌知识·技术', equipment: '精工混沌动力甲, 伺服臂组, 雷霆锤, 铁格里斯型复合热熔枪', tags: ['混沌', '混沌星际战士', '英雄', '技术', '钢铁勇士'], ahp: 26, hp: 19, maxHp: 19, armorRating: 9, movement: 7, baseMeleeDamage: '5 (S/20)', weaponStats: '伺服臂组, 雷霆锤, 铁格里斯型复合热熔枪'
  }, 'iron_warriors_obliterator': {
    name: '湮灭者', status: '变异武器库', attributes: {
      weaponSkill: 70, ballisticSkill: 85, strength: 90, toughness: 85, agility: 25, intelligence: 30, perception: 60, willpower: 75, fellowship: 5
    }, trait: '工业直觉, 叛变战士, 体型·大型, 攻城大师, 混沌印记', skill: '警觉, 恐吓', equipment: '肉体金属护甲, 湮灭者流体武器', tags: ['混沌', '混沌星际战士', '恶魔', '湮灭者', '钢铁勇士'], ahp: 35, hp: 17, maxHp: 17, armorRating: 12, movement: 3, baseMeleeDamage: '4 (S/20)', weaponStats: '湮灭者流体武器'
  }, 'iron_warriors_helbrute': {
    name: '地狱机兵 (攻城型)', status: '疯狂的钢铁灵柩', attributes: {
      weaponSkill: 60, ballisticSkill: 55, strength: 110, toughness: 100, agility: 25, intelligence: 15, perception: 40, willpower: 70, fellowship: 5
    }, trait: '工业直觉, 叛变战士, 恶魔引擎, 机械化·中级, 体型·巨大, 攻城大师, 混沌印记', skill: '战术, 恐吓', equipment: '混沌恶魔引擎甲, 转管自动炮, 破城锤', tags: ['混沌', '混沌星际战士', '载具', '地狱机兵', '钢铁勇士'], ahp: 65, hp: 20, maxHp: 20, armorRating: 20, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '转管自动炮, 破城锤'
  }
};
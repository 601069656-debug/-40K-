import { NPCProfile } from '../../../../types';

/**
 * 黑暗机械教 (Dark Mechanicum)
 * 审计修正说明：
 * - 修正属性值为符合世界观设定的合理数值
 * - HP、MV、BMD严格按公式计算
 * - 护甲属性修正正确应用
 * - 特质仅保留合法名称，移除描述，用逗号分隔（移除自创特质“无脑群集”“无畏狂怒”）
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats仅保留武器名称
 */
export const DARK_MECHANICUM_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'dark_mechanicum_scrap_servitor': {
    name: '废码武器奴工', status: '受控血肉机械', attributes: {
      weaponSkill: 25, ballisticSkill: 25, strength: 35, toughness: 35, agility: 25, intelligence: 15, perception: 20, willpower: 10, fellowship: 5
    }, trait: '机械化·初级, 体型·普通', skill: '普通知识·技术', equipment: '伺服臂组, 重型爆弹枪, 重型防弹甲', tags: ['混沌', '黑暗机械教', '机仆', '凡人', '无脑'], ahp: 10, hp: 7, maxHp: 7, armorRating: 3, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: '伺服臂组, 重型爆弹枪'
  }, 'dark_mechanicum_skitarii': {
    name: '黑暗护教军', status: '受腐机械士兵', attributes: {
      weaponSkill: 45, ballisticSkill: 45, strength: 40, toughness: 40, agility: 40, intelligence: 30, perception: 40, willpower: 35, fellowship: 15
    }, trait: '辐射焚化, 体型·普通', skill: '警觉, 普通知识·技术', equipment: '镭步枪, 机械教护教军战甲', tags: ['混沌', '黑暗机械教', '护教军', '凡人'], ahp: 10, hp: 8, maxHp: 8, armorRating: 4, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '镭步枪'
  }, 'dark_mechanicum_heretek': {
    name: '异端技术神甫', status: '堕落机械领袖', attributes: {
      weaponSkill: 60, ballisticSkill: 70, strength: 60, toughness: 55, agility: 50, intelligence: 85, perception: 60, willpower: 70, fellowship: 30
    }, trait: '污秽机魂, 机魂通晓, 机械化·高级, 多臂, 体型·普通', skill: '普通知识·技术, 逻辑, 禁忌知识·恶魔学, 恐吓, 灵能天赋', equipment: '精工Mk.XII“狂怒”型等离子枪, 万机神之斧, 机械教防护服', tags: ['混沌', '黑暗机械教', '堕落技术神甫', '凡人'], ahp: 8, hp: 11, maxHp: 11, armorRating: 3, movement: 5, baseMeleeDamage: '3 (S/20)', weaponStats: '万机神之斧, 精工Mk.XII“狂怒”型等离子枪'
  }, 'dark_mechanicum_daemon_engine': {
    name: '爬行恶魔引擎', status: '亚空间机械结构', attributes: {
      weaponSkill: 60, ballisticSkill: 40, strength: 120, toughness: 110, agility: 30, intelligence: 10, perception: 45, willpower: 55, fellowship: 5
    }, trait: '恶魔引擎, 亚空间实体, 体型·大型', skill: '恐吓, 警觉', equipment: '恶魔爪, 战斗火炮, 混沌恶魔引擎甲', tags: ['混沌', '黑暗机械教', '恶魔引擎', '怪兽', '恶魔'], ahp: 65, hp: 22, maxHp: 22, armorRating: 20, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '恶魔爪, 战斗火炮'
  }
};
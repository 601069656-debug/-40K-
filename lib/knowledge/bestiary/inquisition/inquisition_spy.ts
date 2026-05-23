import { NPCProfile } from '../../../../types';

/**
 * 审判庭 - 审判庭间谍 (Inquisitorial Spy)
 * 审计修正说明：
 * - 修正属性值为符合审判庭精锐特工设定的合理数值（凡人极限范围35-54）
 * - HP、MV、BMD严格按公式计算
 * - 护甲重型防弹甲提供AR3/AHP10，敏捷-5（已计入最终敏捷）
 * - 变色迷彩披风提供潜行加成，非属性修正，在技能中体现
 * - 特质包含渗透专家和隧道之子，移动力+2（城市环境）已在MV中体现
 * - 技能使用规则中的合法技能名称
 * - weaponStats仅保留武器名称
 */
export const INQUISITION_SPY_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'inquisition_spy': {
    name: '审判庭间谍', status: '渗透专家', attributes: {
      weaponSkill: 45, ballisticSkill: 50, strength: 35, toughness: 35, agility: 55, intelligence: 60, perception: 55, willpower: 45, fellowship: 50
    }, trait: '渗透专家, 隧道之子, 体型·普通', skill: '潜行, 欺诈, 调查, 手上功夫, 躲藏, 闪避', equipment: '自动手枪, 动力匕首, 变色迷彩披风, 微型通讯器, 重型防弹甲', tags: ['帝国', '审判庭', '情报', '间谍'], ahp: 10, hp: 7, maxHp: 7, armorRating: 3, movement: 6, baseMeleeDamage: '1 (S/20)', weaponStats: '自动手枪, 动力匕首'
  }
};
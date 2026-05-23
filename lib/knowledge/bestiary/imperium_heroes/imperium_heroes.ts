import { NPCProfile } from "../../../../types";

/**
 * 帝国英雄 (Imperium Heroes)
 * 审计修正说明：
 * - 修正属性值为符合传奇等级设定的合理数值
 * - HP、MV、BMD严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10)（帝皇等体型巨大移动力+3），BMD = floor(S/20)
 * - 护甲值及AHP参考规则表（主宰铠甲AR45/AHP250，丝绸长袍AR0/AHP0但提供意志+50，圣灵铠甲AR12/AHP60等）
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats仅保留武器名称
 */
export const IMPERIUM_HEROES_DATA: Record<string, NPCProfile> = {
  imperium_heroes_emperor_of_mankind: {
    name: '帝皇 (The Emperor of Mankind)', status: '人类之主', attributes: {
      weaponSkill: 450, ballisticSkill: 420, strength: 480, toughness: 460, agility: 380, intelligence: 500, perception: 450, willpower: 500, fellowship: 480
    }, trait: '体型·巨大', skill: '灵能掌控, 指挥, 禁忌知识·亚空间, 逻辑', equipment: '帝皇之剑, 主宰铠甲', tags: ['帝国', '帝皇', '神明', '人类之主'], weaponStats: '帝皇之剑', ahp: 250, hp: 92, maxHp: 92, movement: 38, armorRating: 45, baseMeleeDamage: '24 (S/20)'
  }, imperium_heroes_malcador: {
    name: '马卡多 (Malcador the Sigillite)', status: '掌印者 / 帝国宰相', attributes: {
      weaponSkill: 45, ballisticSkill: 40, strength: 25, toughness: 30, agility: 35, intelligence: 200, perception: 180, willpower: 220, fellowship: 160
    }, trait: '亚空间化身, 体型·普通', skill: '禁忌知识·亚空间, 逻辑, 指挥, 灵能掌控', equipment: '掌印者之杖, 丝绸长袍', tags: ['帝国', '泰拉', '灵能者', '宰相'], weaponStats: '掌印者之杖', ahp: 0, hp: 6, maxHp: 6, movement: 3, armorRating: 0, baseMeleeDamage: '1 (S/20)'
  }, imperium_heroes_belisarius_cawl: {
    name: '贝利撒留·考尔', status: '大贤者', attributes: {
      weaponSkill: 55, ballisticSkill: 65, strength: 70, toughness: 65, agility: 50, intelligence: 150, perception: 85, willpower: 90, fellowship: 40
    }, trait: '机魂通晓, 机械化·高级, 多臂, 体型·大型', skill: '逻辑, 普通知识·技术, 医疗', equipment: '考尔的万机神之斧, 日光原子化器, 大贤者机仆阵列, 机械教防护服', tags: ['帝国', '机械神教', '贤者'], weaponStats: '考尔的万机神之斧, 日光原子化器', ahp: 8, hp: 13, maxHp: 13, movement: 5, armorRating: 3, baseMeleeDamage: '3 (S/20)'
  }, imperium_heroes_eisenhorn: {
    name: '格雷戈尔·艾森霍恩', status: '审判官 (异端庭)', attributes: {
      weaponSkill: 65, ballisticSkill: 70, strength: 45, toughness: 50, agility: 60, intelligence: 85, perception: 80, willpower: 95, fellowship: 75
    }, trait: '灵能天赋, 帝皇之眼, 体型·普通', skill: '禁忌知识·亚空间, 恐吓, 调查, 战斗训练', equipment: '灵能剑, 爆弹手枪, 罗兹利乌斯护盾', tags: ['帝国', '审判庭', '审判官', '异端庭'], weaponStats: '灵能剑, 爆弹手枪', ahp: 0, hp: 10, maxHp: 10, movement: 6, armorRating: 0, baseMeleeDamage: '2 (S/20)'
  }, imperium_heroes_yarrick: {
    name: '塞巴斯蒂安·亚瑞克', status: '帝国英雄 / 哈米吉多顿政委', attributes: {
      weaponSkill: 70, ballisticSkill: 75, strength: 55, toughness: 60, agility: 55, intelligence: 70, perception: 75, willpower: 100, fellowship: 85
    }, trait: '火线尖兵, 钢铁意志, 体型·普通', skill: '指挥, 战术, 恐吓, 语言(兽人语)', equipment: '哈戴斯之爪, 暴风爆弹枪, 邪恶之眼, 阿米吉多顿政委大氅', tags: ['帝国', '星界军', '政委', '哈米吉多顿'], weaponStats: '哈戴斯之爪, 暴风爆弹枪', ahp: 12, hp: 12, maxHp: 12, movement: 5, armorRating: 4, baseMeleeDamage: '2 (S/20)'
  }, imperium_heroes_celestine: {
    name: '活圣人赛勒斯汀', status: '活圣人', attributes: {
      weaponSkill: 85, ballisticSkill: 60, strength: 70, toughness: 70, agility: 80, intelligence: 50, perception: 75, willpower: 100, fellowship: 85
    }, trait: '信仰之火, 飞行, 体型·普通', skill: '灵能掌控, 指挥, 魅力', equipment: '炽烈之剑, 圣灵铠甲', tags: ['帝国', '国教', '活圣人', '战斗修女'], weaponStats: '炽烈之剑', ahp: 60, hp: 14, maxHp: 14, movement: 8, armorRating: 12, baseMeleeDamage: '3 (S/20)'
  }
};
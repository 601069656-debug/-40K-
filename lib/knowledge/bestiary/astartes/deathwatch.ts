import { NPCProfile } from '../../../../types';

/**
 * 死亡守望 (Deathwatch) - 灭绝异端
 *
 * 护甲修正：
 * - MK VIII 型跑哨动力甲: AR 8, AHP 22, 力量+20, 感知+12, 意志+5, 敏捷-10
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - 载具厚重陶钢装甲: AR 16, AHP 60, 载具规则：仅保留 S, T, Ag, BS, Per，AHP = T, HP = floor(T/5)
 *
 * 特质规则：
 * - 所有正式死亡守望单位：主派系死亡天使 + 战团灭绝异端
 * - 移除其他派系特质（如圣典公民等），保留通用特质
 * - 拥有百战幸存的单位：最终属性已包含 S+5, T+5, Ag+5, WP+5
 */
export const DEATHWATCH_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 守望老兵（MK VIII甲，百战幸存）
  'deathwatch_veteran': {
    name: '死亡守望守望老兵', status: '异形死兆', attributes: {
      weaponSkill: 80, ballisticSkill: 85, strength: 95, // 70 +5(幸存) +20(护甲)
      toughness: 75, // 70 +5(幸存)
      agility: 75, // 80 +5(幸存) -10(护甲)
      intelligence: 70, perception: 87, // 75 +12(护甲)
      willpower: 85, // 75 +5(幸存) +5(护甲)
      fellowship: 60
    }, trait: '死亡天使, 灭绝异端, 异形猎手, 任务灵活, 隧道之子, 百战幸存, 体型·大型', skill: '禁忌知识·异形, 指挥, 战斗训练, 战术', equipment: 'MK VIII 型跑哨动力甲, 死亡守望爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '死亡守望', '老兵', '审判庭'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '死亡守望爆弹枪, 阿斯塔特格斗刀'
  }, // 黑盾（MK VIII甲，百战幸存，近战特化）
  'deathwatch_black_shield': {
    name: '死亡守望黑盾', status: '无名苦行', attributes: {
      weaponSkill: 88, ballisticSkill: 72, strength: 105, // 80 +5(幸存) +20(护甲)
      toughness: 80, // 75 +5(幸存)
      agility: 70, // 75 +5(幸存) -10(护甲)
      intelligence: 62, perception: 77, // 65 +12(护甲)
      willpower: 80, // 70 +5(幸存) +5(护甲)
      fellowship: 48
    }, trait: '死亡天使, 灭绝异端, 无名之誓, 死斗狂热, 骑士精神, 百战幸存, 体型·大型', skill: '战斗训练, 特技, 战术, 普通知识·战争, 祈求', equipment: 'MK VIII 型跑哨动力甲, 动力拳套, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '死亡守望', '狂暴', '近战'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 7, baseMeleeDamage: '5 (S/20)', resistance: 'High', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 守望连长（MK VIII甲，英雄，百战幸存）
  'deathwatch_watch_captain': {
    name: '死亡守望守望连长', status: '异形湮灭者', attributes: {
      weaponSkill: 105, ballisticSkill: 110, strength: 130, // 105 +5(幸存) +20(护甲)
      toughness: 105, // 100 +5(幸存)
      agility: 95, // 100 +5(幸存) -10(护甲)
      intelligence: 100, perception: 117, // 105 +12(护甲)
      willpower: 120, // 110 +5(幸存) +5(护甲)
      fellowship: 100
    }, trait: '死亡天使, 灭绝异端, 收割权威, 战术全能, 星海本能, 百战幸存, 体型·大型', skill: '战术, 指挥, 禁忌知识·异形, 战斗训练, 普通知识·技术', equipment: 'MK VIII 型跑哨动力甲, 幽冥刃, 圣物爆弹步枪, 罗兹利乌斯护盾', tags: ['帝国', '阿斯塔特', '死亡守望', '英雄', '指挥官'], ahp: 22, hp: 21, maxHp: 21, armorRating: 8, movement: 9, // floor(95/10)=9
    baseMeleeDamage: '6 (S/20)', resistance: 'Extreme', weaponStats: '幽冥刃, 圣物爆弹步枪'
  }, // 智库（MK VIII甲，百战幸存）
  'deathwatch_librarian': {
    name: '死亡守望智库', status: '亚空间哨兵', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 90, // 65 +5(幸存) +20(护甲)
      toughness: 70, // 65 +5(幸存)
      agility: 65, // 70 +5(幸存) -10(护甲)
      intelligence: 105, perception: 97, // 85 +12(护甲)
      willpower: 115, // 105 +5(幸存) +5(护甲)
      fellowship: 65
    }, trait: '死亡天使, 灭绝异端, 灵能干涉, 逻辑至上, 百战幸存, 体型·大型', skill: '灵能掌控, 祈求, 禁忌知识·异形, 学术知识·密码学, 能量通道', equipment: 'MK VIII 型跑哨动力甲, 灵能杖, 灵能兜帽, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '死亡守望', '灵能者'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '精工阿斯塔特爆弹手枪'
  }, // 牧师（MK VIII甲，无百战幸存，移除圣典公民）
  'deathwatch_chaplain': {
    name: '死亡守望牧师', status: '仇恨之锚', attributes: {
      weaponSkill: 75, ballisticSkill: 70, strength: 90, // 70 +20(护甲)
      toughness: 70, agility: 65, // 75 -10(护甲)
      intelligence: 72, perception: 87, // 75 +12(护甲)
      willpower: 100, // 95 +5(护甲)
      fellowship: 85
    }, trait: '死亡天使, 灭绝异端, 仇恨之誓, 体型·大型', skill: '指挥, 魅力, 禁忌知识·异形, 战斗训练, 特技', equipment: 'MK VIII 型跑哨动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '死亡守望', '牧师'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 原铸仲裁者（Mk X战术甲，百战幸存）
  'deathwatch_intercessor': {
    name: '死亡守望仲裁者 (原铸)', status: '要塞守望', attributes: {
      weaponSkill: 78, ballisticSkill: 82, strength: 95, // 70 +5(幸存) +20(护甲)
      toughness: 75, // 70 +5(幸存)
      agility: 80, // 75 +5(幸存) (无护甲敏捷惩罚)
      intelligence: 68, perception: 90, // 80 +10(护甲)
      willpower: 85, // 75 +5(幸存) +5(护甲)
      fellowship: 62
    }, trait: '死亡天使, 灭绝异端, 原铸改造, 百战幸存, 隧道之子, 体型·大型', skill: '战斗训练, 战术, 医疗', equipment: 'Mk X 战术型动力甲, 死亡守望爆弹步枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '死亡守望', '原铸'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', resistance: 'High', weaponStats: '死亡守望爆弹步枪, 精工阿斯塔特爆弹手枪'
  }, // 乌鸦黑星（载具，只保留 S, T, Ag, BS, Per，其他属性置0）
  'deathwatch_corvus_blackstar': {
    name: '死亡守望乌鸦黑星', status: '异形收割者', attributes: {
      weaponSkill: 0, ballisticSkill: 60, strength: 180, toughness: 200, agility: 80, intelligence: 0, perception: 60, willpower: 0, fellowship: 0
    }, trait: '死亡天使, 灭绝异端, 机魂觉醒, 空中霸权, 重型飞行载具, 体型·大型', skill: '爆破, 普通知识·战争, 普通知识·帝国海军, 战术, 警觉, 搜索, 追迹', equipment: '载具厚重陶钢装甲, 双联突击炮, 黑色星暴导弹阵列', tags: ['帝国', '阿斯塔特', '死亡守望', '载具', '飞行器'], ahp: 200, hp: 40, maxHp: 40, armorRating: 16, movement: 16, // AHP=T, HP=floor(200/5)=40, MV=floor(80/5)=16
    baseMeleeDamage: '9 (S/20)', // floor(180/20)=9
    weaponStats: '双联突击炮, 黑色星暴导弹阵列'
  }
};
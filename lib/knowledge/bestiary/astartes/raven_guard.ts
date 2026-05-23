import { NPCProfile } from '../../../../types';

/**
 * 暗鸦守卫 (Raven Guard) - 暗影猎手
 *
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - Mk VI “鸦喙”型动力甲: AR 6, AHP 18, 力量+20, 感知+15, 敏捷+5
 * - 精工MK VII 型动力甲: AR 8, AHP 22, 力量+20, 感知+10, 意志+5 (无敏捷惩罚)
 * - 圣物MK VII 型动力甲: AR 9, AHP 26, 力量+25, 感知+15, 意志+15, 敏捷+5
 * - Mk X 福波斯型动力甲: AR 6, AHP 18, 力量+15, 感知+15
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - Mk X 格拉维斯型动力甲: AR 9, AHP 26, 力量+25, 感知+5, 敏捷-30
 * - 不屈型战术无畏装甲: AR 12, AHP 35, 力量+40, 意志+15, 敏捷-40, 移动力减半
 * - 精工不屈型战术无畏装甲: AR 13, AHP 38, 力量+40, 意志+15, 敏捷-30, 移动力减半
 * - 百夫长装甲: AR 14, AHP 45, 力量+30, 移动力-2
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 * - 暗夜铠甲: AR 11, AHP 35, 力量+25, 敏捷+15, 感知+25
 *
 * 特质规则：
 * - 正式星际战士/无畏：主派系死亡天使 + 战团暗影猎手
 * - 侦察兵（含原铸）：仅暗影猎手，无死亡天使
 * - 拥有百战幸存的单位：S+5, T+5, Ag+5, WP+5 已计入最终属性
 */
export const RAVEN_GUARD_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'raven_guard_scout': {
    name: '暗鸦守卫侦察兵', status: '暗影学徒', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 62, intelligence: 50, perception: 62, willpower: 55, fellowship: 45
    }, trait: '暗影猎手, 隧道之子, 体型·普通', skill: '潜行, 追迹, 调查', equipment: '侦察兵复合板甲, 狙击爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '侦察兵', '暗鸦守卫'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '狙击爆弹枪, 阿斯塔特格斗刀'
  }, // 原铸侦察兵（无死亡天使）
  'raven_guard_primaris_scout': {
    name: '暗鸦守卫侦察快遣兵 (原铸)', status: '移动阴影 (暗鸦守卫)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15(福波斯甲)
      toughness: 60, agility: 75, intelligence: 58, perception: 80, // 63 +15 +2(侦查倾向)
      willpower: 62, fellowship: 50
    }, trait: '暗影猎手, 原铸改造, 隧道之子, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '暗鸦守卫'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 正式战士（Mk VI甲，敏捷+5，感知+15）
  'raven_guard_initiate': {
    name: '暗鸦守卫发起者', status: '影子战士', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 78, // 58 +20
      toughness: 70, agility: 72, // 67 +5
      intelligence: 60, perception: 80, // 65 +15
      willpower: 68, fellowship: 55
    }, trait: '死亡天使, 暗影猎手, 隧道之子, 体型·大型', skill: '潜行, 战术, 闪避, 警觉', equipment: 'Mk VI “鸦喙”型动力甲, 阿斯塔特爆弹枪, 阿斯塔特格斗刀, 变色迷彩披风', tags: ['帝国', '阿斯塔特', '暗鸦守卫'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特格斗刀'
  }, // 暗影遗孤老兵（Mk VI甲，百战幸存）
  'raven_guard_mor_deythan': {
    name: '暗影遗孤老兵', status: '寂静判官', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 88, // 63 +5(幸存) +20
      toughness: 78, // 73 +5
      agility: 85, // 75 +5(幸存) +5
      intelligence: 68, perception: 95, // 80 +15
      willpower: 82, // 77 +5(幸存)
      fellowship: 58
    }, trait: '死亡天使, 暗影猎手, 致命隐匿, 百战幸存, 隧道之子, 体型·大型', skill: '潜行, 狙击, 警觉, 战术', equipment: 'Mk VI “鸦喙”型动力甲, 狙击爆弹枪, 阿斯塔特格斗刀, 变色迷彩披风', tags: ['帝国', '阿斯塔特', '老兵', '暗鸦守卫'], ahp: 18, hp: 15, maxHp: 15, armorRating: 6, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '狙击爆弹枪, 阿斯塔特格斗刀'
  }, // 暗夜连长（Mk VI甲，百战幸存）
  'raven_guard_shadow_captain': {
    name: '暗夜连长', status: '阴影指挥官', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 120, // 95 +5(幸存) +20
      toughness: 100, // 95 +5
      agility: 105, // 95 +5(幸存) +5
      intelligence: 90, perception: 120, // 105 +15
      willpower: 120, // 115 +5(幸存) (Mk VI无意志加成)
      fellowship: 95
    }, trait: '死亡天使, 暗影猎手, 阴影突袭, 百战幸存, 体型·大型', skill: '指挥, 战术, 闪避, 潜行', equipment: 'Mk VI “鸦喙”型动力甲, 瑞扎型动力剑, 精工阿斯塔特爆弹手枪, 阿斯塔特喷气背包, 变色迷彩披风', tags: ['帝国', '阿斯塔特', '英雄', '暗鸦守卫'], ahp: 18, hp: 20, maxHp: 20, armorRating: 6, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '瑞扎型动力剑, 精工阿斯塔特爆弹手枪'
  }, // 凯万·希瑞克（暗夜铠甲，百战幸存）
  'raven_guard_kayvaan_shrike': {
    name: '凯万·希瑞克', status: '暗鸦守卫战团长', attributes: {
      weaponSkill: 120, ballisticSkill: 115, strength: 150, // 125 +25
      toughness: 125, // 120 +5
      agility: 140, // 120 +5(幸存) +15
      intelligence: 100, perception: 155, // 130 +25
      willpower: 135, // 130 +5(幸存)
      fellowship: 100
    }, trait: '死亡天使, 暗影猎手, 鸦王之影, 百战幸存, 隧道之子, 体型·大型', skill: '指挥, 战术, 闪避, 警觉, 潜行', equipment: '暗夜铠甲, 暗鸦之爪, 精工阿斯塔特爆弹手枪, 阿斯塔特喷气背包', tags: ['帝国', '阿斯塔特', '英雄', '战团长', '暗鸦守卫'], ahp: 35, hp: 25, maxHp: 25, armorRating: 11, movement: 15, baseMeleeDamage: '7 (S/20)', weaponStats: '暗鸦之爪, 精工阿斯塔特爆弹手枪'
  }, // 士官（精工MK VII甲，百战幸存）
  'raven_guard_sergeant': {
    name: '暗鸦守卫士官', status: '小队战识 (暗鸦守卫)', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 90, // 65 +5 +20
      toughness: 80, // 75 +5
      agility: 82, intelligence: 68, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 68
    }, trait: '死亡天使, 暗影猎手, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力爪, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '暗鸦守卫'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力爪, 精工阿斯塔特爆弹手枪'
  }, // 老兵（福波斯甲，百战幸存）
  'raven_guard_veteran': {
    name: '暗鸦守卫先锐老兵', status: '虚空先锋 (暗鸦守卫)', attributes: {
      weaponSkill: 80, ballisticSkill: 78, strength: 72, // 52 +5 +15
      toughness: 72, // 67 +5
      agility: 85, intelligence: 68, perception: 88, // 73 +15
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 暗影猎手, 虚空先锋, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '暗鸦守卫'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 渗透者（福波斯甲）
  'raven_guard_primaris_infiltrator': {
    name: '暗鸦守卫渗透者', status: '暗影原铸 (暗鸦守卫)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 62, perception: 82, // 67 +15
      willpower: 72, fellowship: 50
    }, trait: '死亡天使, 暗影猎手, 原铸改造, 暗影渗透, 隧道之子, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '暗鸦守卫'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 标准原铸仲裁者（战术甲，百战幸存）
  'raven_guard_primaris_intercessor': {
    name: '暗鸦守卫仲裁者 (标准原铸)', status: '钢铁防线 (暗鸦守卫)', attributes: {
      weaponSkill: 80, ballisticSkill: 82, strength: 87, // 62 +5 +20
      toughness: 80, // 75 +5
      agility: 75, intelligence: 62, perception: 78, // 68 +10
      willpower: 83, // 73 +5 +5
      fellowship: 58
    }, trait: '死亡天使, 暗影猎手, 原铸改造, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '暗鸦守卫'], ahp: 22, hp: 16, maxHp: 16, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲，百战幸存）
  'raven_guard_primaris_hellblaster': {
    name: '暗鸦守卫地狱火战士', status: '毁灭之光 (暗鸦守卫)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 90, // 65 +5 +20
      toughness: 78, // 73 +5
      agility: 65, intelligence: 62, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 55
    }, trait: '死亡天使, 暗影猎手, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '暗鸦守卫'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，百战幸存）
  'raven_guard_primaris_aggressor': {
    name: '暗鸦守卫重装火兵', status: '重装毁灭 (暗鸦守卫)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 100, // 70 +5 +25
      toughness: 88, // 83 +5
      agility: 22, // 47 +5 -30
      intelligence: 58, perception: 65, // 60 +5
      willpower: 77, // 72 +5
      fellowship: 48
    }, trait: '死亡天使, 暗影猎手, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '暗鸦守卫'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，百战幸存）
  'raven_guard_destroyer': {
    name: '暗鸦守卫毁灭者', status: '虚空毁灭 (暗鸦守卫)', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 125, // 80 +5 +40
      toughness: 105, // 100 +5
      agility: 23, // 58 +5 -40
      intelligence: 65, perception: 78, willpower: 105, // 85 +5 +15
      fellowship: 50
    }, trait: '死亡天使, 暗影猎手, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '暗鸦守卫'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，百战幸存）
  'raven_guard_terminator': {
    name: '暗鸦守卫老兵终结者', status: '虚空毁灭者 (暗鸦守卫)', attributes: {
      weaponSkill: 95, ballisticSkill: 90, strength: 130, // 85 +5 +40
      toughness: 110, // 105 +5
      agility: 35, // 60 +5 -30
      intelligence: 68, perception: 80, willpower: 110, // 90 +5 +15
      fellowship: 52
    }, trait: '死亡天使, 暗影猎手, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '暗鸦守卫'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，百战幸存）
  'raven_guard_destroyer_veteran': {
    name: '暗鸦守卫毁灭者老兵', status: '重型清洗者 (暗鸦守卫)', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 125, // 90 +5 +30
      toughness: 115, // 110 +5
      agility: 55, // 50 +5, 移动力5-2=3
      intelligence: 72, perception: 88, willpower: 100, // 95 +5
      fellowship: 55
    }, trait: '死亡天使, 暗影猎手, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '暗鸦守卫'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（百夫长甲，百战幸存）
  'raven_guard_centurion': {
    name: '暗鸦守卫百夫长', status: '移动堡垒 (暗鸦守卫)', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 130, // 95 +5 +30
      toughness: 120, // 115 +5
      agility: 55, intelligence: 75, perception: 90, willpower: 105, // 100 +5
      fellowship: 58
    }, trait: '死亡天使, 暗影猎手, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '暗鸦守卫'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 无畏（无畏甲）
  'raven_guard_dreadnought': {
    name: '暗鸦守卫古老无畏', status: '钢铁执政官 (暗鸦守卫)', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 80, perception: 110, // 95 +15
      willpower: 110, // 100 +10
      fellowship: 50
    }, trait: '死亡天使, 暗影猎手, 不朽生命, 隧道之子, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 双联激光炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '暗鸦守卫'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联激光炮, 无畏型动力爪'
  }
};
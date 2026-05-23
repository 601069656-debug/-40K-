import { NPCProfile } from '../../../../types';

/**
 * 游侠战士 (Ranger Warriors) - 荒野之影
 *
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - MK VII 型动力甲: AR 7, AHP 20, 力量+20, 感知+10, 意志+5, 敏捷-15
 * - Mk VI “鸦喙”型动力甲: AR 6, AHP 18, 力量+20, 感知+15, 敏捷+5
 * - 精工Mk VI “鸦喙”型动力甲: AR 7, AHP 22, 力量+20, 感知+15, 敏捷+10
 * - 圣物Mk VI “鸦喙”型动力甲: AR 8, AHP 26, 力量+25, 感知+20, 意志+10, 敏捷+15
 * - 精工MK VII 型动力甲: AR 8, AHP 22, 力量+20, 感知+10, 意志+5 (无敏捷惩罚)
 * - 圣物MK VII 型动力甲: AR 9, AHP 26, 力量+25, 感知+15, 意志+15, 敏捷+5
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - Mk X 福波斯型动力甲: AR 6, AHP 18, 力量+15, 感知+15
 * - Mk X 格拉维斯型动力甲: AR 9, AHP 26, 力量+25, 感知+5, 敏捷-30
 * - 不屈型战术无畏装甲: AR 12, AHP 35, 力量+40, 意志+15, 敏捷-40, 移动力减半
 * - 精工不屈型战术无畏装甲: AR 13, AHP 38, 力量+40, 意志+15, 敏捷-30, 移动力减半
 * - 百夫长装甲: AR 14, AHP 45, 力量+30, 移动力-2
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 *
 * 特质规则：
 * - 正式星际战士/无畏：主派系死亡天使 + 战团游侠战士(荒野羁绊)
 * - 侦察兵（含原铸）：仅游侠战士，无死亡天使
 * - 移除其他派系特质，保留通用特质
 * - 拥有百战幸存的单位：S+5, T+5, Ag+5, WP+5 已计入
 */
export const RANGER_WARRIORS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'ranger_warriors_scout': {
    name: '游侠战士侦察兵', status: '荒野学徒', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 58, intelligence: 50, perception: 60, willpower: 55, fellowship: 48
    }, trait: '游侠战士, 荒野求生, 体型·普通', skill: '生存, 追迹, 闪避, 潜行', equipment: '侦察兵复合板甲, 阿斯塔特格斗刀, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '新兵', '游侠战士'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '阿斯塔特格斗刀, 精工阿斯塔特爆弹手枪'
  }, // 原铸侦察兵（无死亡天使）
  'ranger_warriors_primaris_scout': {
    name: '游侠战士侦察快遣兵 (原铸)', status: '移动阴影 (游侠战士)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15(福波斯甲)
      toughness: 60, agility: 72, intelligence: 58, perception: 78, // 63 +15
      willpower: 62, fellowship: 50
    }, trait: '游侠战士, 原铸改造, 荒野求生, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '游侠战士'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 斥候狙击手（MK VII甲，正式战士）
  'ranger_warriors_scout_sniper': {
    name: '游侠战士斥候狙击手', status: '荒野之眼', attributes: {
      weaponSkill: 70, ballisticSkill: 82, // 射击特化
      strength: 78, // 58 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 62, perception: 75, // 65 +10
      willpower: 72, // 67 +5
      fellowship: 55
    }, trait: '死亡天使, 游侠战士, 致命猎手, 静默行军, 荒野求生, 体型·大型', skill: '生存, 追迹, 闪避, 潜行, 狙击', equipment: 'MK VII 型动力甲, 变色迷彩披风, 狙击爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '斥候', '游侠战士'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特格斗刀, 狙击爆弹枪'
  }, // 战斗修士（Mk VI甲，敏捷+5）
  'ranger_warriors_marine': {
    name: '游侠战士战斗修士', status: '荒野守望者', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 78, // 58 +20
      toughness: 72, agility: 72, // 67 +5
      intelligence: 60, perception: 80, // 65 +15
      willpower: 68, // 无加成
      fellowship: 55
    }, trait: '死亡天使, 游侠战士, 荒野共鸣, 荒野求生, 体型·大型', skill: '生存, 闪避, 战术, 潜行', equipment: 'Mk VI “鸦喙”型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '游侠战士'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 游猎老兵（精工Mk VI甲，百战幸存，敏捷+10）
  'ranger_warriors_stalker_veteran': {
    name: '游侠战士游猎老兵', status: '阴影阔步者', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 90, // 65 +5(幸存) +20
      toughness: 80, // 75 +5
      agility: 85, // 70 +5(幸存) +10
      intelligence: 70, perception: 100, // 85 +15
      willpower: 82, // 77 +5(幸存) (无护甲意志加成)
      fellowship: 65
    }, trait: '死亡天使, 游侠战士, 致命猎手, 百战幸存, 荒野求生, 体型·大型', skill: '指挥, 战术, 闪避, 狙击, 追迹', equipment: '精工Mk VI “鸦喙”型动力甲, 狙击爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '老兵', '精英', '游侠战士'], ahp: 22, hp: 16, maxHp: 16, armorRating: 7, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '狙击爆弹枪, 阿斯塔特格斗刀'
  }, // 狩猎大师（圣物Mk VI甲，百战幸存，敏捷+15，感知+20，意志+10）
  'ranger_warriors_master_of_hunt': {
    name: '狩猎大师·塞拉斯', status: '首席荒野官', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 125, // 100 +25
      toughness: 105, // 100 +5
      agility: 115, // 95 +5(幸存) +15
      intelligence: 95, perception: 125, // 105 +20
      willpower: 120, // 105 +5(幸存) +10
      fellowship: 90
    }, trait: '死亡天使, 游侠战士, 荒野统领, 荒野共鸣, 百战幸存, 荒野求生, 体型·大型', skill: '指挥, 战术, 魅力, 警觉, 生存', equipment: '圣物Mk VI “鸦喙”型动力甲, 游侠荣耀 (动力剑), 消音爆弹枪, 游侠旗帜', tags: ['帝国', '阿斯塔特', '英雄', '指挥官', '游侠战士'], ahp: 26, hp: 21, maxHp: 21, armorRating: 8, movement: 12, baseMeleeDamage: '6 (S/20)', weaponStats: '游侠荣耀, 消音爆弹枪'
  }, // 士官（精工MK VII甲，百战幸存）
  'ranger_warriors_sergeant': {
    name: '游侠战士士官', status: '小队战识 (游侠战士)', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 90, // 65 +5 +20
      toughness: 80, // 75 +5
      agility: 82, // 77 +5
      intelligence: 68, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 68
    }, trait: '死亡天使, 游侠战士, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力拳套, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '游侠战士'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 老兵（福波斯甲，百战幸存）
  'ranger_warriors_veteran': {
    name: '游侠战士先锐老兵', status: '虚空先锋 (游侠战士)', attributes: {
      weaponSkill: 80, ballisticSkill: 78, strength: 72, // 52 +5 +15
      toughness: 72, // 67 +5
      agility: 85, // 80 +5
      intelligence: 68, perception: 88, // 73 +15
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 游侠战士, 虚空先锋, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '游侠战士'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 渗透者（福波斯甲）
  'ranger_warriors_primaris_infiltrator': {
    name: '游侠战士渗透者', status: '暗影原铸 (游侠战士)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 62, perception: 82, // 67 +15
      willpower: 72, fellowship: 50
    }, trait: '死亡天使, 游侠战士, 原铸改造, 暗影渗透, 荒野求生, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '游侠战士'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 标准原铸仲裁者（战术甲，百战幸存）
  'ranger_warriors_primaris_intercessor': {
    name: '游侠战士仲裁者 (标准原铸)', status: '钢铁防线 (游侠战士)', attributes: {
      weaponSkill: 80, ballisticSkill: 82, strength: 87, // 62 +5 +20
      toughness: 80, // 75 +5
      agility: 75, // 70 +5
      intelligence: 62, perception: 78, // 68 +10
      willpower: 83, // 73 +5 +5
      fellowship: 58
    }, trait: '死亡天使, 游侠战士, 原铸改造, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '游侠战士'], ahp: 22, hp: 16, maxHp: 16, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲，百战幸存）
  'ranger_warriors_primaris_hellblaster': {
    name: '游侠战士地狱火战士', status: '毁灭之光 (游侠战士)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 90, // 65 +5 +20
      toughness: 78, // 73 +5
      agility: 65, // 60 +5
      intelligence: 62, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 55
    }, trait: '死亡天使, 游侠战士, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '游侠战士'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，百战幸存）
  'ranger_warriors_primaris_aggressor': {
    name: '游侠战士重装火兵', status: '重装毁灭 (游侠战士)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 100, // 70 +5 +25
      toughness: 88, // 83 +5
      agility: 22, // 47 +5 -30
      intelligence: 58, perception: 65, // 60 +5
      willpower: 77, // 72 +5
      fellowship: 48
    }, trait: '死亡天使, 游侠战士, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '游侠战士'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，百战幸存）
  'ranger_warriors_destroyer': {
    name: '游侠战士毁灭者', status: '虚空毁灭 (游侠战士)', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 125, // 80 +5 +40
      toughness: 105, // 100 +5
      agility: 23, // 58 +5 -40
      intelligence: 65, perception: 78, willpower: 105, // 85 +5 +15
      fellowship: 50
    }, trait: '死亡天使, 游侠战士, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '游侠战士'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，百战幸存）
  'ranger_warriors_terminator': {
    name: '游侠战士老兵终结者', status: '虚空毁灭者 (游侠战士)', attributes: {
      weaponSkill: 95, ballisticSkill: 90, strength: 130, // 85 +5 +40
      toughness: 110, // 105 +5
      agility: 35, // 60 +5 -30
      intelligence: 68, perception: 80, willpower: 110, // 90 +5 +15
      fellowship: 52
    }, trait: '死亡天使, 游侠战士, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '游侠战士'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，百战幸存）
  'ranger_warriors_destroyer_veteran': {
    name: '游侠战士毁灭者老兵', status: '重型清洗者 (游侠战士)', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 125, // 90 +5 +30
      toughness: 115, // 110 +5
      agility: 55, // 50 +5, 移动力5-2=3
      intelligence: 72, perception: 88, willpower: 100, // 95 +5
      fellowship: 55
    }, trait: '死亡天使, 游侠战士, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '游侠战士'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（百夫长甲，百战幸存）
  'ranger_warriors_centurion': {
    name: '游侠战士百夫长', status: '移动堡垒 (游侠战士)', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 130, // 95 +5 +30
      toughness: 120, // 115 +5
      agility: 55, intelligence: 75, perception: 90, willpower: 105, // 100 +5
      fellowship: 58
    }, trait: '死亡天使, 游侠战士, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '游侠战士'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 无畏（无畏甲）
  'ranger_warriors_dreadnought': {
    name: '游侠战士古老无畏', status: '钢铁执政官 (游侠战士)', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 80, perception: 110, // 95 +15
      willpower: 110, // 100 +10
      fellowship: 50
    }, trait: '死亡天使, 游侠战士, 不朽生命, 荒野求生, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 双联激光炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '游侠战士'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联激光炮, 无畏型动力爪'
  }
};
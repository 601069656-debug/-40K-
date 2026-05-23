import { NPCProfile } from '../../../../types';

/**
 * 猛禽 (Raptors) - 寂静猎杀
 *
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - MK VII 型动力甲: AR 7, AHP 20, 力量+20, 感知+10, 意志+5, 敏捷-15
 * - Mk VI “鸦喙”型动力甲: AR 6, AHP 18, 力量+20, 感知+15, 敏捷+5
 * - 精工Mk VI “鸦喙”型动力甲: AR 7, AHP 22, 力量+20, 感知+15, 敏捷+10
 * - 圣物Mk VI “鸦喙”型动力甲: AR 8, AHP 26, 力量+25, 感知+20, 意志+10, 敏捷+15
 * - 精工MK VII 型动力甲: AR 8, AHP 22, 力量+20, 感知+10, 意志+5 (无敏捷惩罚)
 * - 圣物MK VII 型动力甲: AR 9, AHP 26, 力量+25, 感知+15, 意志+15, 敏捷+5
 * - Mk X 福波斯型动力甲: AR 6, AHP 18, 力量+15, 感知+15
 * - 精工Mk X 福波斯型动力甲: AR 7, AHP 20, 力量+15, 感知+15, 敏捷+5
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - Mk X 格拉维斯型动力甲: AR 9, AHP 26, 力量+25, 感知+5, 敏捷-30
 * - 不屈型战术无畏装甲: AR 12, AHP 35, 力量+40, 意志+15, 敏捷-40, 移动力减半
 * - 精工不屈型战术无畏装甲: AR 13, AHP 38, 力量+40, 意志+15, 敏捷-30, 移动力减半
 * - 百夫长装甲: AR 14, AHP 45, 力量+30, 移动力-2
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 *
 * 特质规则：
 * - 正式星际战士/无畏：主派系死亡天使 + 战团寂静猎杀
 * - 侦察兵（含原铸）：仅寂静猎杀，无死亡天使
 * - 移除其他派系特质，保留通用特质
 * - 拥有百战幸存的单位：S+5, T+5, Ag+5, WP+5 已计入
 */
export const RAPTORS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'raptors_scout': {
    name: '猛禽侦察兵', status: '新兵 (猛禽)', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 60, intelligence: 50, perception: 62, willpower: 55, fellowship: 45
    }, trait: '寂静猎杀, 荒野求生, 隐秘机动, 体型·普通', skill: '潜行, 警觉, 躲藏, 战术', equipment: '侦察兵复合板甲, 阿斯塔特格斗刀, 阿斯塔特爆弹手枪, 变色迷彩披风', tags: ['帝国', '阿斯塔特', '新兵', '猛禽'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '阿斯塔特格斗刀, 阿斯塔特爆弹手枪'
  }, // 原铸侦察兵（无死亡天使）
  'raptors_primaris_scout': {
    name: '猛禽侦察快遣兵 (原铸)', status: '移动阴影 (猛禽)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15
      toughness: 60, agility: 75, intelligence: 58, perception: 80, // 63 +15 (护甲) +2 (特质对侦察兵无死亡天使? 寂静猎杀常在潜行生效不常驻)
      willpower: 62, fellowship: 50
    }, trait: '寂静猎杀, 原铸改造, 隐秘机动, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '猛禽'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 战斗修士（Mk VI甲，敏捷+5，感知+15）
  'raptors_marine': {
    name: '猛禽战斗修士', status: '寂静杀手', attributes: {
      weaponSkill: 75, ballisticSkill: 80, strength: 78, // 58 +20
      toughness: 70, agility: 72, // 67 +5
      intelligence: 60, perception: 80, // 65 +15
      willpower: 68, fellowship: 55
    }, trait: '死亡天使, 寂静猎杀, 致命猎手, 荒野求生, 体型·大型', skill: '潜行, 警觉, 躲藏, 战术', equipment: 'Mk VI “鸦喙”型动力甲, 狙击爆弹枪, 阿斯塔特格斗刀, 变色迷彩披风', tags: ['帝国', '阿斯塔特', '猛禽'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '狙击爆弹枪, 阿斯塔特格斗刀'
  }, // 先锋老兵（精工福波斯甲，百战幸存，敏捷+5）
  'raptors_vanguard_veteran': {
    name: '猛禽先锋老兵', status: '密林幽灵', attributes: {
      weaponSkill: 85, ballisticSkill: 88, strength: 77, // 57 +5 +15
      toughness: 72, // 67 +5
      agility: 88, // 78 +5 +5
      intelligence: 68, perception: 93, // 78 +15
      willpower: 80, // 75 +5
      fellowship: 60
    }, trait: '死亡天使, 寂静猎杀, 致命猎手, 隐秘机动, 百战幸存, 体型·大型', skill: '潜行, 警觉, 战术, 伪装', equipment: '精工Mk X 福波斯型动力甲, 精工阿斯塔特爆弹枪, 阿斯塔特格斗刀, 变色迷彩披风', tags: ['传说', '帝国', '阿斯塔特', '老兵', '猛禽'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '精工阿斯塔特爆弹枪, 阿斯塔特格斗刀'
  }, // 战团长（圣物Mk VI甲，百战幸存，敏捷+15，感知+20，意志+10）
  'raptors_master_lias_issel': {
    name: '里亚斯·伊塞尔', status: '猛禽战团长', attributes: {
      weaponSkill: 110, ballisticSkill: 115, strength: 130, // 105 +25
      toughness: 105, // 100 +5
      agility: 120, // 100 +5 +15
      intelligence: 95, perception: 125, // 105 +20
      willpower: 120, // 105 +5 +10
      fellowship: 90
    }, trait: '死亡天使, 寂静猎杀, 荒野统领, 荒野共鸣, 百战幸存, 荒野求生, 体型·大型', skill: '指挥, 战术, 警觉, 潜行, 狙击', equipment: '圣物Mk VI “鸦喙”型动力甲, 圣物爆弹步枪, 阿斯塔特格斗刀, 变色迷彩披风, 折射场发生器', tags: ['帝国', '阿斯塔特', '英雄', '猛禽'], ahp: 26, hp: 21, maxHp: 21, armorRating: 8, movement: 13, baseMeleeDamage: '6 (S/20)', weaponStats: '圣物爆弹步枪, 阿斯塔特格斗刀'
  }, // 士官（精工MK VII甲，百战幸存）
  'raptors_sergeant': {
    name: '猛禽士官', status: '小队战识 (猛禽)', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 90, // 65 +5 +20
      toughness: 80, // 75 +5
      agility: 82, intelligence: 68, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 68
    }, trait: '死亡天使, 寂静猎杀, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力拳套, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '猛禽'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 老兵（福波斯甲，百战幸存）
  'raptors_veteran': {
    name: '猛禽先锐老兵', status: '虚空先锋 (猛禽)', attributes: {
      weaponSkill: 80, ballisticSkill: 78, strength: 72, // 52 +5 +15
      toughness: 72, // 67 +5
      agility: 85, intelligence: 68, perception: 88, // 73 +15
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 寂静猎杀, 虚空先锋, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '猛禽'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 渗透者（福波斯甲）
  'raptors_primaris_infiltrator': {
    name: '猛禽渗透者', status: '暗影原铸 (猛禽)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 62, perception: 82, // 67 +15
      willpower: 72, fellowship: 50
    }, trait: '死亡天使, 寂静猎杀, 原铸改造, 暗影渗透, 荒野求生, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '猛禽'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 标准原铸仲裁者（战术甲，百战幸存）
  'raptors_primaris_intercessor': {
    name: '猛禽仲裁者 (标准原铸)', status: '钢铁防线 (猛禽)', attributes: {
      weaponSkill: 80, ballisticSkill: 82, strength: 87, // 62 +5 +20
      toughness: 80, // 75 +5
      agility: 75, intelligence: 62, perception: 78, // 68 +10
      willpower: 83, // 73 +5 +5
      fellowship: 58
    }, trait: '死亡天使, 寂静猎杀, 原铸改造, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '猛禽'], ahp: 22, hp: 16, maxHp: 16, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲，百战幸存）
  'raptors_primaris_hellblaster': {
    name: '猛禽地狱火战士', status: '毁灭之光 (猛禽)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 90, // 65 +5 +20
      toughness: 78, // 73 +5
      agility: 65, intelligence: 62, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 55
    }, trait: '死亡天使, 寂静猎杀, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '猛禽'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，百战幸存）
  'raptors_primaris_aggressor': {
    name: '猛禽重装火兵', status: '重装毁灭 (猛禽)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 100, // 70 +5 +25
      toughness: 88, // 83 +5
      agility: 22, // 47 +5 -30
      intelligence: 58, perception: 65, // 60 +5
      willpower: 77, // 72 +5
      fellowship: 48
    }, trait: '死亡天使, 寂静猎杀, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '猛禽'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，百战幸存）
  'raptors_destroyer': {
    name: '猛禽毁灭者', status: '虚空毁灭 (猛禽)', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 125, // 80 +5 +40
      toughness: 105, // 100 +5
      agility: 23, // 58 +5 -40
      intelligence: 65, perception: 78, willpower: 105, // 85 +5 +15
      fellowship: 50
    }, trait: '死亡天使, 寂静猎杀, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '猛禽'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，百战幸存）
  'raptors_terminator': {
    name: '猛禽老兵终结者', status: '虚空毁灭者 (猛禽)', attributes: {
      weaponSkill: 95, ballisticSkill: 90, strength: 130, // 85 +5 +40
      toughness: 110, // 105 +5
      agility: 35, // 60 +5 -30
      intelligence: 68, perception: 80, willpower: 110, // 90 +5 +15
      fellowship: 52
    }, trait: '死亡天使, 寂静猎杀, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '猛禽'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，百战幸存）
  'raptors_destroyer_veteran': {
    name: '猛禽毁灭者老兵', status: '重型清洗者 (猛禽)', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 125, // 90 +5 +30
      toughness: 115, // 110 +5
      agility: 55, // 50 +5 移动力5-2=3
      intelligence: 72, perception: 88, willpower: 100, // 95 +5
      fellowship: 55
    }, trait: '死亡天使, 寂静猎杀, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '猛禽'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（百夫长甲，百战幸存）
  'raptors_centurion': {
    name: '猛禽百夫长', status: '移动堡垒 (猛禽)', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 130, // 95 +5 +30
      toughness: 120, // 115 +5
      agility: 55, intelligence: 75, perception: 90, willpower: 105, // 100 +5
      fellowship: 58
    }, trait: '死亡天使, 寂静猎杀, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '猛禽'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 药剂师（MK VII甲）
  'raptors_apothecary': {
    name: '猛禽药剂师', status: '基因守护者 (猛禽)', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 70, agility: 52, // 67 -15
      intelligence: 85, perception: 82, // 72 +10
      willpower: 80, // 75 +5
      fellowship: 60
    }, trait: '死亡天使, 寂静猎杀, 守护职责, 战地急救, 荒野求生, 体型·大型', skill: '医疗, 逻辑, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '猛禽'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 技术军士（MK VII甲）
  'raptors_techmarine': {
    name: '猛禽技术军士', status: '机械先行者 (猛禽)', attributes: {
      weaponSkill: 70, ballisticSkill: 68, strength: 82, // 62 +20
      toughness: 72, agility: 48, // 63 -15
      intelligence: 88, perception: 82, // 72 +10
      willpower: 72, // 67 +5
      fellowship: 50
    }, trait: '死亡天使, 寂静猎杀, 机械修复, 多功能操作, 工业直觉, 体型·大型', skill: '评估, 逻辑, 调查, 普通知识·技术', equipment: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术支持', '猛禽'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪'
  }, // 智库（MK VII甲）
  'raptors_librarian': {
    name: '猛禽智库', status: '虚空灵能者 (猛禽)', attributes: {
      weaponSkill: 72, ballisticSkill: 68, strength: 80, // 60 +20
      toughness: 70, agility: 55, // 70 -15
      intelligence: 105, perception: 88, // 78 +10
      willpower: 115, // 110 +5
      fellowship: 60
    }, trait: '死亡天使, 寂静猎杀, 虚空扭曲, 荒野求生, 体型·大型', skill: '祈求, 逻辑, 调查, 灵能掌控, 能量通道', equipment: '灵能剑, 灵能兜帽, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '灵能者', '猛禽'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 阿斯塔特爆弹枪'
  }, // 牧师（精工MK VII甲）
  'raptors_chaplain': {
    name: '猛禽牧师', status: '执政官意志 (猛禽)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 88, // 68 +20
      toughness: 72, agility: 72, intelligence: 68, perception: 80, // 70 +10
      willpower: 98, // 93 +5
      fellowship: 80
    }, trait: '死亡天使, 寂静猎杀, 狂怒祷言, 不屈核心, 荒野求生, 体型·大型', skill: '指挥, 恐吓, 魅力', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '猛禽'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 连长（圣物MK VII甲，百战幸存）
  'raptors_captain': {
    name: '猛禽连长', status: '虚空领主 (猛禽)', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 125, // 95 +5 +25
      toughness: 105, // 100 +5
      agility: 105, // 95 +5 +5
      intelligence: 90, perception: 115, // 100 +15
      willpower: 125, // 105 +5 +15
      fellowship: 100
    }, trait: '死亡天使, 寂静猎杀, 执政官权威, 英雄之躯, 荒野求生, 百战幸存, 体型·大型', skill: '指挥, 魅力, 战术', equipment: '圣物MK VII 型动力甲, 瑞扎型动力剑, 精工Mk II“日怒”型等离子手枪', tags: ['帝国', '阿斯塔特', '英雄', '猛禽'], ahp: 26, hp: 21, maxHp: 21, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '精工Mk II“日怒”型等离子手枪, 瑞扎型动力剑'
  }, // 无畏（无畏甲）
  'raptors_dreadnought': {
    name: '猛禽古老无畏', status: '钢铁执政官 (猛禽)', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 80, perception: 110, // 95 +15
      willpower: 110, // 100 +10
      fellowship: 50
    }, trait: '死亡天使, 寂静猎杀, 不朽生命, 荒野求生, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 双联激光炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '猛禽'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联激光炮, 无畏型动力爪'
  }
};
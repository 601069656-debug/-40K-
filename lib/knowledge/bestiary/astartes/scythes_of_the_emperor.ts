import { NPCProfile } from '../../../../types';

/**
 * 帝皇之镰 (Scythes of the Emperor) - 虫群猎手
 *
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - MK VII 型动力甲: AR 7, AHP 20, 力量+20, 感知+10, 意志+5, 敏捷-15
 * - 精工MK VII 型动力甲: AR 8, AHP 22, 力量+20, 感知+10, 意志+5 (无敏捷惩罚)
 * - 圣物MK VII 型动力甲: AR 9, AHP 26, 力量+25, 感知+15, 意志+15, 敏捷+5
 * - Mk X 福波斯型动力甲: AR 6, AHP 18, 力量+15, 感知+15
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - Mk X 格拉维斯型动力甲: AR 9, AHP 26, 力量+25, 感知+5, 敏捷-30
 * - 不屈型战术无畏装甲: AR 12, AHP 35, 力量+40, 意志+15, 敏捷-40, 移动力减半
 * - 精工不屈型战术无畏装甲: AR 13, AHP 38, 力量+40, 意志+15, 敏捷-30, 移动力减半
 * - 百夫长装甲: AR 14, AHP 45, 力量+30, 移动力-2
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 *
 * 特质规则：
 * - 正式星际战士/无畏：主派系死亡天使 + 战团虫群猎手
 * - 侦察兵（含原铸）：仅虫群猎手，无死亡天使
 * - 拥有百战幸存的单位：S+5, T+5, Ag+5, WP+5 已计入最终属性
 * - 保留通用特质如强壮体魄等
 */
export const SCYTHES_OF_THE_EMPEROR_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'scythes_of_the_emperor_scout': {
    name: '帝皇之镰侦察兵', status: '索萨之子', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 58, intelligence: 50, perception: 60, willpower: 55, fellowship: 48
    }, trait: '虫群猎手, 强壮体魄, 体型·普通', skill: '生存, 追踪, 禁忌知识·异形, 闪避', equipment: '侦察兵复合板甲, 阿斯塔特爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '新兵', '帝皇之镰'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特格斗刀'
  }, // 原铸侦察兵（无死亡天使）
  'scythes_of_the_emperor_primaris_scout': {
    name: '帝皇之镰侦察快遣兵 (原铸)', status: '移动阴影 (帝皇之镰)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15(福波斯甲)
      toughness: 60, agility: 72, intelligence: 58, perception: 78, // 63 +15
      willpower: 62, fellowship: 50
    }, trait: '虫群猎手, 原铸改造, 强壮体魄, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '帝皇之镰'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 战斗修士（MK VII甲）
  'scythes_of_the_emperor_tactical_marine': {
    name: '帝皇之镰战斗修士', status: '索萨守护者', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 78, // 58 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 62, perception: 72, // 62 +10
      willpower: 72, // 67 +5
      fellowship: 55
    }, trait: '死亡天使, 虫群猎手, 强壮体魄, 体型·大型', skill: '禁忌知识·异形, 战术, 闪避, 警觉', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '帝皇之镰'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特格斗刀'
  }, // 泰伦战争老兵（精工MK VII甲，百战幸存）
  'scythes_of_the_emperor_tyranic_war_veteran': {
    name: '泰伦战争老兵', status: '残破长镰', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 90, // 65 +5(幸存) +20
      toughness: 80, // 75 +5
      agility: 82, // 77 +5
      intelligence: 70, perception: 82, // 72 +10
      willpower: 82, // 72 +5(幸存) +5
      fellowship: 65
    }, trait: '死亡天使, 虫群猎手, 虫群屠夫, 百战幸存, 强壮体魄, 体型·大型', skill: '禁忌知识·异形, 指挥, 战术, 闪避, 警觉', equipment: '精工MK VII 型动力甲, 阿斯塔特爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '老兵', '帝皇之镰'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特格斗刀'
  }, // 战团长索西亚斯（圣物MK VII甲，百战幸存）
  'scythes_of_the_emperor_thorcyas': {
    name: '索西亚斯', status: '帝皇之镰战团长', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 125, // 95 +5(幸存) +25
      toughness: 105, // 100 +5
      agility: 105, // 95 +5(幸存) +5
      intelligence: 95, perception: 115, // 100 +15
      willpower: 125, // 105 +5(幸存) +15
      fellowship: 100
    }, trait: '死亡天使, 虫群猎手, 最后长镰, 英雄之躯, 百战幸存, 强壮体魄, 体型·大型', skill: '指挥, 战术, 魅力, 禁忌知识·异形, 普通知识·阿斯塔特修会', equipment: '圣物MK VII 型动力甲, 索萨之镰, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '英雄', '战团长', '帝皇之镰'], ahp: 26, hp: 21, maxHp: 21, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '精工阿斯塔特爆弹手枪, 索萨之镰'
  }, // 士官（精工MK VII甲，百战幸存）
  'scythes_of_the_emperor_sergeant': {
    name: '帝皇之镰士官', status: '小队战识 (帝皇之镰)', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 90, // 65 +5 +20
      toughness: 80, // 75 +5
      agility: 82, // 77 +5
      intelligence: 68, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 68
    }, trait: '死亡天使, 虫群猎手, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力爪, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '帝皇之镰'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力爪, 精工阿斯塔特爆弹手枪'
  }, // 老兵（福波斯甲，百战幸存）
  'scythes_of_the_emperor_veteran': {
    name: '帝皇之镰先锐老兵', status: '星海本能 (帝皇之镰)', attributes: {
      weaponSkill: 80, ballisticSkill: 78, strength: 72, // 52 +5 +15
      toughness: 72, // 67 +5
      agility: 85, intelligence: 68, perception: 88, // 73 +15
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 虫群猎手, 星海本能, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '帝皇之镰'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 渗透者（福波斯甲）
  'scythes_of_the_emperor_primaris_infiltrator': {
    name: '帝皇之镰渗透者', status: '暗影原铸 (帝皇之镰)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 62, perception: 82, // 67 +15
      willpower: 72, fellowship: 50
    }, trait: '死亡天使, 虫群猎手, 原铸改造, 暗影渗透, 强壮体魄, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '帝皇之镰'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 标准原铸仲裁者（战术甲，百战幸存）
  'scythes_of_the_emperor_primaris_intercessor': {
    name: '帝皇之镰仲裁者 (标准原铸)', status: '钢铁防线 (帝皇之镰)', attributes: {
      weaponSkill: 80, ballisticSkill: 82, strength: 87, // 62 +5 +20
      toughness: 80, // 75 +5
      agility: 75, intelligence: 62, perception: 78, // 68 +10
      willpower: 83, // 73 +5 +5
      fellowship: 58
    }, trait: '死亡天使, 虫群猎手, 原铸改造, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '帝皇之镰'], ahp: 22, hp: 16, maxHp: 16, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲，百战幸存）
  'scythes_of_the_emperor_primaris_hellblaster': {
    name: '帝皇之镰地狱火战士', status: '毁灭之光 (帝皇之镰)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 90, // 65 +5 +20
      toughness: 78, // 73 +5
      agility: 65, intelligence: 62, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 55
    }, trait: '死亡天使, 虫群猎手, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '帝皇之镰'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，百战幸存）
  'scythes_of_the_emperor_primaris_aggressor': {
    name: '帝皇之镰重装火兵', status: '重装毁灭 (帝皇之镰)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 100, // 70 +5 +25
      toughness: 88, // 83 +5
      agility: 22, // 47 +5 -30
      intelligence: 58, perception: 65, // 60 +5
      willpower: 77, // 72 +5
      fellowship: 48
    }, trait: '死亡天使, 虫群猎手, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '帝皇之镰'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，百战幸存）
  'scythes_of_the_emperor_destroyer': {
    name: '帝皇之镰毁灭者', status: '虚空毁灭 (帝皇之镰)', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 125, // 80 +5 +40
      toughness: 105, // 100 +5
      agility: 23, // 58 +5 -40
      intelligence: 65, perception: 78, willpower: 105, // 85 +5 +15
      fellowship: 50
    }, trait: '死亡天使, 虫群猎手, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '帝皇之镰'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，百战幸存）
  'scythes_of_the_emperor_terminator': {
    name: '帝皇之镰老兵终结者', status: '虚空毁灭者 (帝皇之镰)', attributes: {
      weaponSkill: 95, ballisticSkill: 90, strength: 130, // 85 +5 +40
      toughness: 110, // 105 +5
      agility: 35, // 60 +5 -30
      intelligence: 68, perception: 80, willpower: 110, // 90 +5 +15
      fellowship: 52
    }, trait: '死亡天使, 虫群猎手, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '帝皇之镰'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，百战幸存）
  'scythes_of_the_emperor_destroyer_veteran': {
    name: '帝皇之镰毁灭者老兵', status: '重型清洗者 (帝皇之镰)', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 125, // 90 +5 +30
      toughness: 115, // 110 +5
      agility: 55, // 50 +5, 移动力5-2=3
      intelligence: 72, perception: 88, willpower: 100, // 95 +5
      fellowship: 55
    }, trait: '死亡天使, 虫群猎手, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '帝皇之镰'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（百夫长甲，百战幸存）
  'scythes_of_the_emperor_centurion': {
    name: '帝皇之镰百夫长', status: '移动堡垒 (帝皇之镰)', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 130, // 95 +5 +30
      toughness: 120, // 115 +5
      agility: 55, intelligence: 75, perception: 90, willpower: 105, // 100 +5
      fellowship: 58
    }, trait: '死亡天使, 虫群猎手, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '帝皇之镰'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 药剂师（MK VII甲）
  'scythes_of_the_emperor_apothecary': {
    name: '帝皇之镰药剂师', status: '基因守护者 (帝皇之镰)', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 85, perception: 82, // 72 +10
      willpower: 80, // 75 +5
      fellowship: 60
    }, trait: '死亡天使, 虫群猎手, 守护职责, 战地急救, 强壮体魄, 体型·大型', skill: '医疗, 逻辑, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '帝皇之镰'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 技术军士（MK VII甲）
  'scythes_of_the_emperor_techmarine': {
    name: '帝皇之镰技术军士', status: '机械先行者 (帝皇之镰)', attributes: {
      weaponSkill: 70, ballisticSkill: 68, strength: 82, // 62 +20
      toughness: 75, agility: 48, // 63 -15
      intelligence: 88, perception: 82, // 72 +10
      willpower: 72, // 67 +5
      fellowship: 50
    }, trait: '死亡天使, 虫群猎手, 机械修复, 多功能操作, 工业直觉, 体型·大型', skill: '评估, 逻辑, 调查, 普通知识·技术', equipment: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术支持', '帝皇之镰'], ahp: 20, hp: 15, maxHp: 15, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪'
  }, // 智库（MK VII甲）
  'scythes_of_the_emperor_librarian': {
    name: '帝皇之镰智库', status: '虚空灵能者 (帝皇之镰)', attributes: {
      weaponSkill: 72, ballisticSkill: 68, strength: 80, // 60 +20
      toughness: 72, agility: 55, // 70 -15
      intelligence: 105, perception: 88, // 78 +10
      willpower: 115, // 110 +5
      fellowship: 60
    }, trait: '死亡天使, 虫群猎手, 虚空扭曲, 强壮体魄, 体型·大型', skill: '灵能掌控, 祈求, 逻辑, 调查, 能量通道', equipment: '灵能剑, 灵能兜帽, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '灵能者', '帝皇之镰'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 阿斯塔特爆弹枪'
  }, // 牧师（精工MK VII甲）
  'scythes_of_the_emperor_chaplain': {
    name: '帝皇之镰牧师', status: '执政官意志 (帝皇之镰)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 88, // 68 +20
      toughness: 72, agility: 72, intelligence: 68, perception: 80, // 70 +10
      willpower: 98, // 93 +5
      fellowship: 80
    }, trait: '死亡天使, 虫群猎手, 狂怒祷言, 不屈核心, 强壮体魄, 体型·大型', skill: '指挥, 恐吓, 魅力', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '帝皇之镰'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 连长（圣物MK VII甲，百战幸存）
  'scythes_of_the_emperor_captain': {
    name: '帝皇之镰连长', status: '虚空领主 (帝皇之镰)', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 125, // 95 +5 +25
      toughness: 105, // 100 +5
      agility: 105, // 95 +5 +5
      intelligence: 90, perception: 115, // 100 +15
      willpower: 125, // 105 +5 +15
      fellowship: 100
    }, trait: '死亡天使, 虫群猎手, 执政官权威, 英雄之躯, 强壮体魄, 百战幸存, 体型·大型', skill: '指挥, 魅力, 战术', equipment: '圣物MK VII 型动力甲, 泰拉型动力剑, 精工Mk II“日怒”型等离子手枪', tags: ['帝国', '阿斯塔特', '英雄', '帝皇之镰'], ahp: 26, hp: 21, maxHp: 21, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '精工Mk II“日怒”型等离子手枪, 泰拉型动力剑'
  }, // 无畏（无畏甲）
  'scythes_of_the_emperor_dreadnought': {
    name: '帝皇之镰古老无畏', status: '钢铁执政官 (帝皇之镰)', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 80, perception: 110, // 95 +15
      willpower: 110, // 100 +10
      fellowship: 50
    }, trait: '死亡天使, 虫群猎手, 不朽生命, 强壮体魄, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 双联激光炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '帝皇之镰'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联激光炮, 无畏型动力爪'
  }
};
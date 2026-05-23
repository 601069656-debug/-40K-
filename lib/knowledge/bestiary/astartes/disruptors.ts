import { NPCProfile } from '../../../../types';

/**
 * 破坏者 (Disruptors) - 狂怒冲锋
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
 * - 无敌型机甲: AR 0, AHP 20 (外壳), 敏捷+10, 移动力+2, 免疫力量≤50的攻击
 *
 * 特质规则：
 * - 正式星际战士/无畏：主派系死亡天使 + 战团狂怒冲锋
 * - 侦察兵（含原铸）：仅狂怒冲锋，无死亡天使
 * - 移除所有其他派系特质（如圣典公民、机魂亲和），保留通用特质
 */
export const DISRUPTORS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'disruptors_scout': {
    name: '破坏者侦察兵', status: '静默渗透', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 58, intelligence: 50, perception: 58, willpower: 55, fellowship: 48
    }, trait: '狂怒冲锋, 暗影猎手, 隧道之子, 体型·普通', skill: '潜行, 战术, 警觉', equipment: '侦察兵复合板甲, 消音爆弹枪, 阿斯塔特格斗刀, 扫描仪（精工型号）', tags: ['帝国', '阿斯塔特', '侦察兵', '破坏者'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 战斗修士（MK VII甲）
  'disruptors_marine': {
    name: '破坏者战斗修士', status: '阴影打击', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 78, // 58 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 60, perception: 72, // 62 +10
      willpower: 72, // 67 +5
      fellowship: 55
    }, trait: '死亡天使, 狂怒冲锋, 隧道之子, 体型·大型', skill: '闪避, 特技, 战术', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 阿斯塔特链锯剑, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '破坏者'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特链锯剑, 破片手雷（精英版）'
  }, // 侵入者（福波斯甲）
  'disruptors_incursor': {
    name: '破坏者侵入者 (原铸)', status: '多维扫描', attributes: {
      weaponSkill: 72, ballisticSkill: 72, strength: 68, // 53 +15
      toughness: 68, agility: 82, intelligence: 65, perception: 85, // 70 +15
      willpower: 72, fellowship: 58
    }, trait: '死亡天使, 狂怒冲锋, 原铸改造, 全谱扫描, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 福波斯型动力甲, 斗秤型爆弹卡宾枪, 配对战刃, 震慑手雷', tags: ['帝国', '阿斯塔特', '原铸', '精英', '破坏者'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '斗秤型爆弹卡宾枪, 配对战刃, 震慑手雷'
  }, // 渗透者（福波斯甲）
  'disruptors_infiltrator': {
    name: '破坏者渗透者 (原铸)', status: '电子遮断', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 65, // 50 +15
      toughness: 70, agility: 82, intelligence: 68, perception: 85, // 70 +15
      willpower: 72, fellowship: 55
    }, trait: '死亡天使, 狂怒冲锋, 原铸改造, 全方位阻断, 体型·大型', skill: '战术, 警觉, 调查', equipment: 'Mk X 福波斯型动力甲, 射手型爆弹卡宾枪, 阿斯塔特格斗刀, 扫描仪（精工型号）', tags: ['帝国', '阿斯塔特', '原铸', '渗透', '破坏者'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '射手型爆弹卡宾枪, 阿斯塔特格斗刀'
  }, // 先锋老兵（精工MK VII甲，百战幸存）
  'disruptors_vanguard_veteran': {
    name: '破坏者先锋老兵', status: '暗影刺杀', attributes: {
      weaponSkill: 85, ballisticSkill: 75, strength: 90, // 65 +5(幸存) +20
      toughness: 80, // 75 +5
      agility: 82, // 77 +5
      intelligence: 68, perception: 82, // 72 +10
      willpower: 85, // 75 +5(幸存) +5
      fellowship: 62
    }, trait: '死亡天使, 狂怒冲锋, 暗影猎手, 隧道之子, 百战幸存, 体型·大型', skill: '闪避, 特技, 潜行', equipment: '精工MK VII 型动力甲, 动力拳套, 精工阿斯塔特爆弹手枪, 阿斯塔特喷气背包', tags: ['传说', '帝国', '阿斯塔特', '老兵', '破坏者'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 技术军士（MK VII甲，移除机械教特质）
  'disruptors_techmarine': {
    name: '破坏者技术军士', status: '系统瓦解者', attributes: {
      weaponSkill: 70, ballisticSkill: 68, strength: 82, // 62 +20
      toughness: 72, agility: 48, // 63 -15
      intelligence: 88, perception: 82, // 72 +10
      willpower: 72, // 67 +5
      fellowship: 50
    }, trait: '死亡天使, 狂怒冲锋, 机械修复, 反向工程, 体型·大型', skill: '普通知识·战争, 逻辑, 评估', equipment: '伺服臂组, 万机神之斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术', '破坏者'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 万机神之斧, 精工阿斯塔特爆弹手枪'
  }, // 智库（MK VII甲）
  'disruptors_librarian': {
    name: '破坏者智库', status: '神经脉冲', attributes: {
      weaponSkill: 72, ballisticSkill: 68, strength: 80, // 60 +20
      toughness: 72, agility: 55, // 70 -15
      intelligence: 105, perception: 88, // 78 +10
      willpower: 115, // 110 +5
      fellowship: 60
    }, trait: '死亡天使, 狂怒冲锋, 全息幻象, 体型·大型', skill: '祈求, 战术, 禁忌知识·亚空间, 灵能掌控, 能量通道', equipment: '灵能剑, 灵能兜帽, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '灵能者', '破坏者'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 精工阿斯塔特爆弹手枪'
  }, // 守望连长（圣物MK VII甲，百战幸存）
  'disruptors_captain': {
    name: '破坏者守望连长', status: '阴影统帅', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 120, // 95 +5(幸存) +25
      toughness: 105, // 100 +5
      agility: 105, // 95 +5(幸存) +5
      intelligence: 95, perception: 115, // 100 +15
      willpower: 125, // 105 +5(幸存) +15
      fellowship: 100
    }, trait: '死亡天使, 狂怒冲锋, 英雄之躯, 全军潜伏, 隧道之子, 百战幸存, 体型·大型', skill: '指挥, 战术, 潜行', equipment: '圣物MK VII 型动力甲, 泰拉型动力剑, 阿斯塔特爆弹枪, 全息诱饵', tags: ['帝国', '阿斯塔特', '英雄', '指挥官', '破坏者'], ahp: 26, hp: 21, maxHp: 21, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '阿斯塔特爆弹枪, 泰拉型动力剑'
  }, // 战术机甲（无敌型机甲，无力量修正，敏捷+10，移动力+2）
  'disruptors_invictor': {
    name: '破坏者战术机甲', status: '静默要塞', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 70, toughness: 75, agility: 85, // 75 +10
      intelligence: 65, perception: 72, willpower: 72, fellowship: 50
    }, trait: '死亡天使, 狂怒冲锋, 静默活塞, 体型·大型', skill: '战术, 恐吓, 警觉', equipment: '无敌型机甲, 无敌型大口径自动炮, 无畏型动力爪', tags: ['帝国', '阿斯塔特', '机甲', '破坏者'], ahp: 20, hp: 15, maxHp: 15, armorRating: 0, movement: 11, baseMeleeDamage: '3 (S/20)', weaponStats: '无敌型大口径自动炮, 无畏型动力爪'
  }, // 士官（精工MK VII甲，百战幸存）
  'disruptors_sergeant': {
    name: '破坏者士官', status: '小队战识 (破坏者)', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 90, // 65 +5 +20
      toughness: 80, // 75 +5
      agility: 82, // 77 +5
      intelligence: 68, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 68
    }, trait: '死亡天使, 狂怒冲锋, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力拳套, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '破坏者'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 老兵（福波斯甲，百战幸存）
  'disruptors_veteran': {
    name: '破坏者先锐老兵', status: '虚空先锋 (破坏者)', attributes: {
      weaponSkill: 80, ballisticSkill: 78, strength: 72, // 52 +5 +15
      toughness: 72, // 67 +5
      agility: 85, // 80 +5
      intelligence: 68, perception: 88, // 73 +15
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 狂怒冲锋, 虚空先锋, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '破坏者'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 原铸侦察兵（无死亡天使）
  'disruptors_primaris_scout': {
    name: '破坏者侦察快遣兵 (原铸)', status: '移动阴影 (破坏者)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15
      toughness: 60, agility: 72, intelligence: 58, perception: 78, // 63 +15
      willpower: 62, fellowship: 50
    }, trait: '狂怒冲锋, 原铸改造, 暗影猎手, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '破坏者'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 渗透者（福波斯甲，正式战士，已有死亡天使）
  'disruptors_primaris_infiltrator': {
    name: '破坏者渗透者', status: '暗影原铸 (破坏者)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 68, agility: 82, intelligence: 65, perception: 85, // 70 +15
      willpower: 72, fellowship: 52
    }, trait: '死亡天使, 狂怒冲锋, 原铸改造, 暗影渗透, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '破坏者'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 标准原铸仲裁者（战术甲）
  'disruptors_primaris_intercessor': {
    name: '破坏者仲裁者 (标准原铸)', status: '钢铁防线 (破坏者)', attributes: {
      weaponSkill: 78, ballisticSkill: 82, strength: 82, // 62 +20
      toughness: 78, agility: 72, intelligence: 62, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 狂怒冲锋, 原铸改造, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '破坏者'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲，百战幸存）
  'disruptors_primaris_hellblaster': {
    name: '破坏者地狱火战士', status: '毁灭之光 (破坏者)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 90, // 65 +5 +20
      toughness: 78, // 73 +5
      agility: 65, // 60 +5
      intelligence: 62, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 55
    }, trait: '死亡天使, 狂怒冲锋, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '破坏者'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，百战幸存）
  'disruptors_primaris_aggressor': {
    name: '破坏者重装火兵', status: '重装毁灭 (破坏者)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 100, // 70 +5 +25
      toughness: 88, // 83 +5
      agility: 22, // 47 +5 -30
      intelligence: 58, perception: 65, // 60 +5
      willpower: 77, // 72 +5
      fellowship: 48
    }, trait: '死亡天使, 狂怒冲锋, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '破坏者'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，百战幸存）
  'disruptors_destroyer': {
    name: '破坏者毁灭者', status: '虚空毁灭 (破坏者)', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 125, // 80 +5 +40
      toughness: 105, // 100 +5
      agility: 23, // 58 +5 -40
      intelligence: 65, perception: 78, willpower: 105, // 85 +5 +15
      fellowship: 52
    }, trait: '死亡天使, 狂怒冲锋, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '破坏者'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，百战幸存）
  'disruptors_terminator': {
    name: '破坏者老兵终结者', status: '虚空毁灭者 (破坏者)', attributes: {
      weaponSkill: 95, ballisticSkill: 90, strength: 130, // 85 +5 +40
      toughness: 110, // 105 +5
      agility: 35, // 60 +5 -30
      intelligence: 68, perception: 80, willpower: 110, // 90 +5 +15
      fellowship: 55
    }, trait: '死亡天使, 狂怒冲锋, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '破坏者'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，百战幸存）
  'disruptors_destroyer_veteran': {
    name: '破坏者毁灭者老兵', status: '重型清洗者 (破坏者)', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 125, // 90 +5 +30
      toughness: 115, // 110 +5
      agility: 55, // 50 +5 移动力5-2=3
      intelligence: 72, perception: 88, willpower: 100, // 95 +5
      fellowship: 55
    }, trait: '死亡天使, 狂怒冲锋, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '破坏者'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（百夫长甲，百战幸存）
  'disruptors_centurion': {
    name: '破坏者百夫长', status: '移动堡垒 (破坏者)', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 130, // 95 +5 +30
      toughness: 120, // 115 +5
      agility: 55, intelligence: 75, perception: 90, willpower: 105, // 100 +5
      fellowship: 58
    }, trait: '死亡天使, 狂怒冲锋, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '破坏者'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 药剂师（MK VII甲）
  'disruptors_apothecary': {
    name: '破坏者药剂师', status: '基因守护者 (破坏者)', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 82, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 60
    }, trait: '死亡天使, 狂怒冲锋, 守护职责, 战地急救, 隧道之子, 体型·大型', skill: '医疗, 逻辑, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '破坏者'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 牧师（精工MK VII甲）
  'disruptors_chaplain': {
    name: '破坏者牧师', status: '执政官意志 (破坏者)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 88, // 68 +20
      toughness: 72, agility: 72, intelligence: 68, perception: 80, // 70 +10
      willpower: 98, // 93 +5
      fellowship: 80
    }, trait: '死亡天使, 狂怒冲锋, 狂怒祷言, 不屈核心, 隧道之子, 体型·大型', skill: '指挥, 恐吓, 魅力', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '破坏者'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 无畏（无畏甲）
  'disruptors_dreadnought': {
    name: '破坏者古老无畏', status: '钢铁执政官 (破坏者)', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 72, perception: 110, // 95 +15
      willpower: 110, // 100 +10
      fellowship: 50
    }, trait: '死亡天使, 狂怒冲锋, 不朽生命, 隧道之子, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 双联激光炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '破坏者'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联激光炮, 无畏型动力爪'
  }
};
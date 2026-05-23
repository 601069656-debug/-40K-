import { NPCProfile } from '../../../../types';

/**
 * 血鸦 (Blood Ravens) - 知识就是力量
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - MK VII 型动力甲: AR 7, AHP 20, 力量+20, 感知+10, 意志+5, 敏捷-15
 * - 精工MK VII 型动力甲: AR 8, AHP 22, 力量+20, 感知+10, 意志+5
 * - 圣物MK VII 型动力甲: AR 9, AHP 26, 力量+25, 感知+15, 意志+15, 敏捷+5
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - Mk X 福波斯型动力甲: AR 6, AHP 18, 力量+15, 感知+15
 * - Mk X 格拉维斯型动力甲: AR 9, AHP 26, 力量+25, 感知+5, 敏捷-30
 * - 不屈型战术无畏装甲: AR 12, AHP 35, 力量+40, 意志+15, 敏捷-40
 * - 精工不屈型战术无畏装甲: AR 13, AHP 38, 力量+40, 意志+15, 敏捷-30
 * - 百夫长装甲: AR 14, AHP 45, 力量+30, 移动力-2
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 *
 * 特质规则：
 * - 正式星际战士与无畏：主派系特质死亡天使+ 战团特质知识就是力量
 * - 侦察兵（含原铸侦察兵）：仅战团特质知识就是力量（无死亡天使）
 * - 移除所有其他战团特质（如“战术大师”等）
 * - 保留非派系通用特质（如“预判直觉”、“逻辑至上”、“百战幸存”等）
 * - 特质字符串仅保留名称，去除效果描述
 */
export const BLOOD_RAVENS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'blood_ravens_scout': {
    name: '血鸦侦察兵', status: '真理追求者', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 55, intelligence: 65, perception: 65, willpower: 60, fellowship: 50
    }, trait: '知识就是力量, 预判直觉, 逻辑至上, 体型·普通', skill: '调查, 警觉, 潜行, 逻辑', equipment: '侦察兵复合板甲, 狙击爆弹枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '侦察兵', '血鸦'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '狙击爆弹枪'
  }, // 战术星际战士（MK VII）
  'blood_ravens_tactical_marine': {
    name: '血鸦星际战士', status: '战术学者', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 75, // 55 +20
      toughness: 72, agility: 55, // 70 -15
      intelligence: 80, perception: 80, // 70 +10
      willpower: 85, // 80 +5
      fellowship: 60
    }, trait: '死亡天使, 知识就是力量, 预判直觉, 逻辑至上, 体型·大型', skill: '普通知识·阿斯塔特修会, 战术, 闪避', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '标准', '血鸦'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 士官（精工MK VII，无敏捷惩罚）
  'blood_ravens_sergeant': {
    name: '血鸦士官', status: '战场指挥官', attributes: {
      weaponSkill: 85, ballisticSkill: 80, strength: 85, // 65 +20
      toughness: 80, agility: 80, intelligence: 85, perception: 88, // 78 +10
      willpower: 90, // 85 +5
      fellowship: 75
    }, trait: '死亡天使, 知识就是力量, 战术核心, 圣典公民, 体型·大型', skill: '指挥, 战术, 逻辑, 调查', equipment: '精工MK VII 型动力甲, 瑞扎型动力剑, 精工阿斯塔特爆弹手枪, 灵感阵列', tags: ['帝国', '阿斯塔特', '精英', '士官', '血鸦'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '瑞扎型动力剑, 精工阿斯塔特爆弹手枪'
  }, // 智库（精工MK VII）
  'blood_ravens_librarian': {
    name: '血鸦灵能智库', status: '知识守护者', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 80, // 60 +20
      toughness: 72, agility: 75, intelligence: 100, perception: 95, // 85 +10
      willpower: 110, // 105 +5
      fellowship: 65
    }, trait: '死亡天使, 知识就是力量, 圣典公民, 体型·大型', skill: '灵能掌控, 祈求, 逻辑, 学术知识·传说, 能量通道', equipment: '复仇女神灵能杖, 灵能兜帽, 精工MK VII 型动力甲, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '灵能者', '血鸦'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '复仇女神灵能杖, 精工阿斯塔特爆弹手枪'
  }, // 高级智库（精工MK VII）
  'blood_ravens_epistolary': {
    name: '血鸦高级智库(Epistolary)', status: '秘教大师', attributes: {
      weaponSkill: 72, ballisticSkill: 70, strength: 80, // 60 +20
      toughness: 75, agility: 78, intelligence: 110, perception: 98, // 88 +10
      willpower: 115, // 110 +5
      fellowship: 70
    }, trait: '死亡天使, 知识就是力量, 全知视野, 逻辑至上, 百战幸存, 体型·大型', skill: '灵能掌控, 祈求, 逻辑, 评估, 魅力, 深渊回响', equipment: '精工灵能剑, 灵能兜帽, 精工MK VII 型动力甲, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '灵能者', '血鸦'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '精工灵能剑, 阿斯塔特爆弹枪'
  }, // 首席智库（圣物MK VII）
  'blood_ravens_chief_librarian': {
    name: '血鸦首席智库', status: '古物保管人', attributes: {
      weaponSkill: 95, ballisticSkill: 90, strength: 100, // 75 +25
      toughness: 95, agility: 95, // 90 +5
      intelligence: 120, perception: 115, // 100 +15
      willpower: 130, // 115 +15
      fellowship: 85
    }, trait: '死亡天使, 知识就是力量, 古物大师, 英雄之躯, 圣典公民, 体型·大型', skill: '指挥, 逻辑, 评估, 灵能掌控, 深渊回响', equipment: '圣物MK VII 型动力甲, 泰拉型灵能剑, 灵能兜帽', tags: ['帝国', '阿斯塔特', '英雄', '灵能者', '血鸦'], ahp: 26, hp: 19, maxHp: 19, armorRating: 9, movement: 10, baseMeleeDamage: '5 (S/20)', weaponStats: '泰拉型灵能剑'
  }, // 连长（圣物MK VII，移除“战术大师”）
  'blood_ravens_captain': {
    name: '血鸦连长', status: '远征指挥官', attributes: {
      weaponSkill: 100, ballisticSkill: 95, strength: 105, // 80 +25
      toughness: 100, agility: 100, // 95 +5
      intelligence: 105, perception: 115, // 100 +15
      willpower: 120, // 105 +15
      fellowship: 100
    }, trait: '死亡天使, 知识就是力量, 百战幸存, 逻辑至上, 体型·大型', skill: '指挥, 战术, 魅力', equipment: '圣物MK VII 型动力甲, 阿斯塔特格斗刀, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '英雄', '血鸦'], ahp: 26, hp: 20, maxHp: 20, armorRating: 9, movement: 11, baseMeleeDamage: '5 (S/20)', weaponStats: '阿斯塔特格斗刀, 阿斯塔特爆弹枪'
  }, // 原铸仲裁者（战术甲）
  'blood_ravens_primaris_intercessor': {
    name: '血鸦仲裁者', status: '原铸之血', attributes: {
      weaponSkill: 80, ballisticSkill: 82, strength: 82, // 62 +20
      toughness: 78, agility: 72, intelligence: 75, perception: 80, // 70 +10
      willpower: 82, // 77 +5
      fellowship: 65
    }, trait: '死亡天使, 知识就是力量, 原铸改造, 预判直觉, 圣典公民, 体型·大型', skill: '战术, 逻辑, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '标准', '血鸦'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪'
  }, // 智库无畏
  'blood_ravens_librarian_dreadnought': {
    name: '血鸦智库无畏', status: '不朽真理', attributes: {
      weaponSkill: 95, ballisticSkill: 95, strength: 130, // 80 +50
      toughness: 110, agility: 55, intelligence: 100, perception: 115, // 100 +15
      willpower: 120, // 110 +10
      fellowship: 60
    }, trait: '死亡天使, 知识就是力量, 不朽生命, 圣典公民, 体型·超大', skill: '战术, 灵能掌控, 恐吓, 能量通道', equipment: '无畏机甲, 智库无畏灵能爪, 灵能兜帽, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '无畏机甲', '灵能者', '血鸦'], ahp: 60, hp: 22, maxHp: 22, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '重型爆弹枪, 智库无畏灵能爪'
  }, // 原铸侦察兵（无死亡天使）
  'blood_ravens_primaris_scout': {
    name: '血鸦侦察快遣兵 (原铸)', status: '移动阴影 (血鸦)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15(福波斯甲)
      toughness: 58, agility: 72, intelligence: 65, perception: 75, // 60 +15(福波斯甲)
      willpower: 62, fellowship: 52
    }, trait: '知识就是力量, 原铸改造, 预判直觉, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '血鸦'], ahp: 18, hp: 11, maxHp: 11, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 老兵（福波斯甲，缺“知识就是力量”补上）
  'blood_ravens_veteran': {
    name: '血鸦先锐老兵', status: '星海本能 (血鸦)', attributes: {
      weaponSkill: 78, ballisticSkill: 75, strength: 68, // 53 +15
      toughness: 70, agility: 82, intelligence: 75, perception: 85, // 70 +15
      willpower: 72, fellowship: 65
    }, trait: '死亡天使, 知识就是力量, 预判直觉, 星海本能, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '血鸦'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 原铸渗透者（福波斯甲，补“知识就是力量”）
  'blood_ravens_primaris_infiltrator': {
    name: '血鸦渗透者', status: '暗影原铸 (血鸦)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 80, intelligence: 70, perception: 85, // 70 +15
      willpower: 70, fellowship: 58
    }, trait: '知识就是力量, 原铸改造, 预判直觉, 暗影渗透, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '血鸦'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 地狱火战士（战术甲，补“知识就是力量”）
  'blood_ravens_primaris_hellblaster': {
    name: '血鸦地狱火战士', status: '毁灭之光 (血鸦)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 85, // 65 +20
      toughness: 78, agility: 62, intelligence: 68, perception: 82, // 72 +10
      willpower: 82, // 77 +5
      fellowship: 55
    }, trait: '死亡天使, 知识就是力量, 原铸改造, 预判直觉, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '血鸦'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，补“知识就是力量”）
  'blood_ravens_primaris_aggressor': {
    name: '血鸦重装火兵', status: '重装毁灭 (血鸦)', attributes: {
      weaponSkill: 75, ballisticSkill: 65, strength: 95, // 70 +25
      toughness: 85, agility: 20, // 50 -30
      intelligence: 62, perception: 68, // 63 +5
      willpower: 72, fellowship: 48
    }, trait: '死亡天使, 知识就是力量, 原铸改造, 预判直觉, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '血鸦'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，补“知识就是力量”）
  'blood_ravens_destroyer': {
    name: '血鸦毁灭者', status: '虚空毁灭 (血鸦)', attributes: {
      weaponSkill: 90, ballisticSkill: 90, strength: 120, // 80 +40
      toughness: 105, agility: 15, // 55 -40
      intelligence: 72, perception: 85, willpower: 100, // 85 +15
      fellowship: 55
    }, trait: '死亡天使, 知识就是力量, 预判直觉, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '血鸦'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 2, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，补“知识就是力量”）
  'blood_ravens_terminator': {
    name: '血鸦老兵终结者', status: '虚空毁灭者 (血鸦)', attributes: {
      weaponSkill: 95, ballisticSkill: 95, strength: 125, // 85 +40
      toughness: 110, agility: 30, // 60 -30
      intelligence: 75, perception: 90, willpower: 105, // 90 +15
      fellowship: 60
    }, trait: '死亡天使, 知识就是力量, 预判直觉, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '血鸦'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，补“死亡天使”和“知识就是力量”）
  'blood_ravens_destroyer_veteran': {
    name: '血鸦毁灭者老兵', status: '重型清洗者 (血鸦)', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 120, // 90 +30
      toughness: 115, agility: 50, // 移动力 = floor(50/10)=5 -2 = 3
      intelligence: 80, perception: 95, willpower: 100, fellowship: 60
    }, trait: '死亡天使, 知识就是力量, 钢铁长城, 预判直觉, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '血鸦'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（百夫长甲，补“死亡天使”和“知识就是力量”）
  'blood_ravens_centurion': {
    name: '血鸦百夫长', status: '移动堡垒 (血鸦)', attributes: {
      weaponSkill: 110, ballisticSkill: 110, strength: 125, // 95 +30
      toughness: 120, agility: 50, // 移动力 5-2=3
      intelligence: 85, perception: 100, willpower: 105, fellowship: 65
    }, trait: '死亡天使, 知识就是力量, 钢铁长城, 预判直觉, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '血鸦'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 药剂师（MK VII甲，补“知识就是力量”）
  'blood_ravens_apothecary': {
    name: '血鸦药剂师', status: '基因守护者 (血鸦)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 80, // 60 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 88, perception: 82, // 72 +10
      willpower: 82, // 77 +5
      fellowship: 62
    }, trait: '死亡天使, 知识就是力量, 守护职责, 预判直觉, 战地急救, 逻辑至上, 体型·大型', skill: '医疗, 逻辑, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '血鸦'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 技术军士（MK VII甲，补“知识就是力量”）
  'blood_ravens_techmarine': {
    name: '血鸦技术军士', status: '机械先行者 (血鸦)', attributes: {
      weaponSkill: 70, ballisticSkill: 68, strength: 82, // 62 +20
      toughness: 75, agility: 48, // 63 -15
      intelligence: 95, perception: 85, // 75 +10
      willpower: 82, // 77 +5
      fellowship: 55
    }, trait: '死亡天使, 知识就是力量, 机械修复, 预判直觉, 多功能操作, 工业直觉, 体型·大型', skill: '评估, 逻辑, 调查, 普通知识·技术', equipment: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术支持', '血鸦'], ahp: 20, hp: 15, maxHp: 15, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪'
  }, // 牧师（精工MK VII，补“知识就是力量”）
  'blood_ravens_chaplain': {
    name: '血鸦牧师', status: '执政官意志 (血鸦)', attributes: {
      weaponSkill: 78, ballisticSkill: 72, strength: 85, // 65 +20
      toughness: 78, agility: 72, intelligence: 78, perception: 85, // 75 +10
      willpower: 98, // 93 +5
      fellowship: 82
    }, trait: '死亡天使, 知识就是力量, 狂怒祷言, 预判直觉, 不屈核心, 逻辑至上, 体型·大型', skill: '指挥, 恐吓, 魅力', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '血鸦'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 标准无畏（补“知识就是力量”）
  'blood_ravens_dreadnought': {
    name: '血鸦古老无畏', status: '钢铁执政官 (血鸦)', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 80, perception: 105, // 90 +15
      willpower: 110, // 100 +10
      fellowship: 55
    }, trait: '死亡天使, 知识就是力量, 不朽生命, 预判直觉, 逻辑至上, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 双联激光炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '血鸦'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 8, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联激光炮, 无畏型动力爪'
  }
};
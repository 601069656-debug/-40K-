import { NPCProfile } from '../../../../types';

/**
 * 红蝎 (Red Scorpions) - 基因圣权
 *
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - MK IV “马克西姆斯”型动力甲: AR 7, AHP 22, 力量+25, 感知+10
 * - 精工MK IV “马克西姆斯”型动力甲: AR 8, AHP 24, 力量+25, 敏捷+5, 感知+10
 * - 圣物MK IV “马克西姆斯”型动力甲: AR 9, AHP 26, 力量+25, 敏捷+10, 感知+10
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
 * - 正式星际战士/无畏：主派系死亡天使 + 战团基因圣权
 * - 侦察兵（含原铸）：仅基因圣权，无死亡天使
 * - 拥有百战幸存的单位：S+5, T+5, Ag+5, WP+5 已计入最终属性
 */
export const RED_SCORPIONS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'red_scorpions_scout': {
    name: '红蝎侦察兵', status: '新兵 (红蝎)', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 58, intelligence: 50, perception: 60, willpower: 55, fellowship: 48
    }, trait: '基因圣权, 隧道之子, 体型·普通', skill: '潜行, 追迹, 调查', equipment: '侦察兵复合板甲, 狙击爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '侦察兵', '红蝎'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '狙击爆弹枪, 阿斯塔特格斗刀'
  }, // 原铸侦察兵（无死亡天使）
  'red_scorpions_primaris_scout': {
    name: '红蝎侦察快遣兵 (原铸)', status: '移动阴影 (红蝎)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15(福波斯甲)
      toughness: 60, agility: 72, intelligence: 58, perception: 78, // 63 +15
      willpower: 62, fellowship: 50
    }, trait: '基因圣权, 原铸改造, 隧道之子, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '红蝎'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 正式战士（MK IV甲，力量+25，感知+10）
  'red_scorpions_marine': {
    name: '红蝎战斗修士', status: '基因守卫', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 83, // 58 +25
      toughness: 72, agility: 68, intelligence: 62, perception: 78, // 68 +10
      willpower: 68, fellowship: 55
    }, trait: '死亡天使, 基因圣权, 隧道之子, 体型·大型', skill: '医疗, 调查, 闪避, 战术', equipment: 'MK IV “马克西姆斯”型动力甲, 阿斯塔特爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '红蝎'], ahp: 22, hp: 14, maxHp: 14, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特格斗刀'
  }, // 药剂师（精工MK IV甲，敏捷+5，感知+10，百战幸存）
  'red_scorpions_apothecary': {
    name: '红蝎药剂师', status: '生命守护者', attributes: {
      weaponSkill: 72, ballisticSkill: 68, strength: 93, // 68 +25
      toughness: 78, // 73 +5
      agility: 75, // 65 +5(幸存) +5
      intelligence: 88, perception: 90, // 80 +10
      willpower: 82, // 77 +5(幸存) (精工MK IV无意志加成)
      fellowship: 65
    }, trait: '死亡天使, 基因圣权, 药剂大师, 百战幸存, 隧道之子, 体型·大型', skill: '医疗, 学术知识·解剖学, 普通知识·技术, 战术', equipment: '精工MK IV “马克西姆斯”型动力甲, 护道器, 还原者, 阿斯塔特格斗刀, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '药剂师', '红蝎'], ahp: 24, hp: 15, maxHp: 15, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特格斗刀, 精工阿斯塔特爆弹手枪'
  }, // 卡桑·萨比乌斯（圣物MK IV甲，敏捷+10，感知+10，百战幸存）
  'red_scorpions_casan_sabius': {
    name: '卡桑·萨比乌斯', status: '红蝎战团副统领', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 130, // 105 +25
      toughness: 110, // 105 +5
      agility: 115, // 100 +5(幸存) +10
      intelligence: 100, perception: 120, // 110 +10
      willpower: 120, // 115 +5(幸存) (无护甲加成)
      fellowship: 100
    }, trait: '死亡天使, 基因圣权, 纯洁领袖, 英雄之躯, 百战幸存, 隧道之子, 体型·大型', skill: '指挥, 战术, 调查, 魅力, 普通知识·阿斯塔特修会', equipment: '圣物MK IV “马克西姆斯”型动力甲, 瑞扎型动力剑, 爆弹步枪', tags: ['帝国', '阿斯塔特', '英雄', '指挥官', '红蝎'], ahp: 26, hp: 22, maxHp: 22, armorRating: 9, movement: 12, baseMeleeDamage: '6 (S/20)', weaponStats: '瑞扎型动力剑, 爆弹步枪'
  }, // 士官（精工MK VII甲，百战幸存）
  'red_scorpions_sergeant': {
    name: '红蝎士官', status: '小队战识 (红蝎)', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 90, // 65 +5 +20
      toughness: 80, // 75 +5
      agility: 82, intelligence: 68, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 68
    }, trait: '死亡天使, 基因圣权, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力爪, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '红蝎'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力爪, 精工阿斯塔特爆弹手枪'
  }, // 老兵（福波斯甲，百战幸存）
  'red_scorpions_veteran': {
    name: '红蝎先锐老兵', status: '虚空先锋 (红蝎)', attributes: {
      weaponSkill: 80, ballisticSkill: 78, strength: 72, // 52 +5 +15
      toughness: 72, // 67 +5
      agility: 85, intelligence: 68, perception: 88, // 73 +15
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 基因圣权, 虚空先锋, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '红蝎'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 渗透者（福波斯甲）
  'red_scorpions_primaris_infiltrator': {
    name: '红蝎渗透者', status: '暗影原铸 (红蝎)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 62, perception: 82, // 67 +15
      willpower: 72, fellowship: 50
    }, trait: '死亡天使, 基因圣权, 原铸改造, 暗影渗透, 隧道之子, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '红蝎'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 标准原铸仲裁者（战术甲，百战幸存）
  'red_scorpions_primaris_intercessor': {
    name: '红蝎仲裁者 (标准原铸)', status: '钢铁防线 (红蝎)', attributes: {
      weaponSkill: 80, ballisticSkill: 82, strength: 87, // 62 +5 +20
      toughness: 80, // 75 +5
      agility: 75, intelligence: 62, perception: 78, // 68 +10
      willpower: 83, // 73 +5 +5
      fellowship: 58
    }, trait: '死亡天使, 基因圣权, 原铸改造, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '红蝎'], ahp: 22, hp: 16, maxHp: 16, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲，百战幸存）
  'red_scorpions_primaris_hellblaster': {
    name: '红蝎地狱火战士', status: '毁灭之光 (红蝎)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 90, // 65 +5 +20
      toughness: 78, // 73 +5
      agility: 65, intelligence: 62, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 55
    }, trait: '死亡天使, 基因圣权, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '红蝎'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，百战幸存）
  'red_scorpions_primaris_aggressor': {
    name: '红蝎重装火兵', status: '重装毁灭 (红蝎)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 100, // 70 +5 +25
      toughness: 88, // 83 +5
      agility: 22, // 47 +5 -30
      intelligence: 58, perception: 65, // 60 +5
      willpower: 77, // 72 +5
      fellowship: 48
    }, trait: '死亡天使, 基因圣权, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '红蝎'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，百战幸存）
  'red_scorpions_destroyer': {
    name: '红蝎毁灭者', status: '虚空毁灭 (红蝎)', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 125, // 80 +5 +40
      toughness: 105, // 100 +5
      agility: 23, // 58 +5 -40
      intelligence: 65, perception: 78, willpower: 105, // 85 +5 +15
      fellowship: 50
    }, trait: '死亡天使, 基因圣权, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '红蝎'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，百战幸存）
  'red_scorpions_terminator': {
    name: '红蝎老兵终结者', status: '虚空毁灭者 (红蝎)', attributes: {
      weaponSkill: 95, ballisticSkill: 90, strength: 130, // 85 +5 +40
      toughness: 110, // 105 +5
      agility: 35, // 60 +5 -30
      intelligence: 68, perception: 80, willpower: 110, // 90 +5 +15
      fellowship: 52
    }, trait: '死亡天使, 基因圣权, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '红蝎'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，百战幸存）
  'red_scorpions_destroyer_veteran': {
    name: '红蝎毁灭者老兵', status: '重型清洗者 (红蝎)', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 125, // 90 +5 +30
      toughness: 115, // 110 +5
      agility: 55, // 50 +5, 移动力5-2=3
      intelligence: 72, perception: 88, willpower: 100, // 95 +5
      fellowship: 55
    }, trait: '死亡天使, 基因圣权, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '红蝎'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（百夫长甲，百战幸存）
  'red_scorpions_centurion': {
    name: '红蝎百夫长', status: '移动堡垒 (红蝎)', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 130, // 95 +5 +30
      toughness: 120, // 115 +5
      agility: 55, intelligence: 75, perception: 90, willpower: 105, // 100 +5
      fellowship: 58
    }, trait: '死亡天使, 基因圣权, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '红蝎'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 无畏（无畏甲）
  'red_scorpions_dreadnought': {
    name: '红蝎古老无畏', status: '钢铁执政官 (红蝎)', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 80, perception: 110, // 95 +15
      willpower: 110, // 100 +10
      fellowship: 50
    }, trait: '死亡天使, 基因圣权, 不朽生命, 隧道之子, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 双联激光炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '红蝎'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 8, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联激光炮, 无畏型动力爪'
  }
};
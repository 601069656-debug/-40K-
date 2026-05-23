import { NPCProfile } from '../../../../types';

/**
 * 星界骑士 (Celestial Knights) - 星陨之拳
 *
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - MK VII 型动力甲: AR 7, AHP 20, 力量+20, 感知+10, 意志+5, 敏捷-15
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
 * - 正式星际战士/无畏：主派系死亡天使 + 战团星陨之拳
 * - 侦察兵（含原铸）：仅星陨之拳，无死亡天使
 * - 移除所有其他派系特质（如圣典公民、圣言激励）
 * - 保留通用特质（如战术核心、百战幸存等）
 */
export const CELESTIAL_KNIGHTS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'celestial_knights_scout': {
    name: '星界骑士侦察兵', status: '牺牲之影', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 58, intelligence: 52, perception: 60, willpower: 55, fellowship: 48
    }, trait: '星陨之拳, 体型·普通', skill: '潜行, 战斗训练, 战术, 警觉, 搜索, 追迹', equipment: '侦察兵复合板甲, 狙击爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '新兵', '星界骑士'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '狙击爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 正式战士（MK VII甲）
  'celestial_knights_marine': {
    name: '星界骑士战士', status: '星陨之拳', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 78, // 58 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 60, perception: 72, // 62 +10
      willpower: 72, // 67 +5
      fellowship: 55
    }, trait: '死亡天使, 星陨之拳, 体型·大型', skill: '战术, 战斗训练, 警觉', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '标准', '星界骑士'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 毁灭者（重武器，MK VII甲）
  'celestial_knights_devastator': {
    name: '星界骑士毁灭者', status: '重火阵地', attributes: {
      weaponSkill: 72, ballisticSkill: 80, strength: 78, // 58 +20
      toughness: 72, agility: 50, // 65 -15
      intelligence: 62, perception: 75, // 65 +10
      willpower: 72, // 67 +5
      fellowship: 52
    }, trait: '死亡天使, 星陨之拳, 体型·大型', skill: '普通知识·技术, 战斗训练, 战术', equipment: 'MK VII 型动力甲, 导弹发射器, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '重火支援', '星界骑士'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '导弹发射器, 精工阿斯塔特爆弹手枪'
  }, // 荣卫老兵（精工MK VII甲，无敏捷惩罚）
  'celestial_knights_sternguard': {
    name: '星界骑士荣卫老兵', status: '守誓之盾', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 85, // 65 +20
      toughness: 80, agility: 78, intelligence: 68, perception: 82, // 72 +10
      willpower: 82, // 77 +5
      fellowship: 65
    }, trait: '死亡天使, 星陨之拳, 百战幸存, 体型·大型', skill: '战术, 指挥, 战斗训练', equipment: '精工MK VII 型动力甲, 特种弹药爆弹步枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '老兵', '精英', '星界骑士'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '特种弹药爆弹步枪, 阿斯塔特格斗刀'
  }, // 战团冠军（圣物甲）
  'celestial_knights_champion': {
    name: '星界骑士战团冠军', status: '牺牲之刃', attributes: {
      weaponSkill: 110, ballisticSkill: 95, strength: 115, // 90 +25
      toughness: 105, agility: 105, // 100 +5
      intelligence: 85, perception: 105, // 90 +15
      willpower: 115, // 100 +15
      fellowship: 80
    }, trait: '死亡天使, 星陨之拳, 体型·大型', skill: '战斗训练, 特技, 恐吓, 祈求', equipment: '圣物MK VII 型动力甲, 瑞扎型动力剑, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '英雄', '近战精英', '星界骑士'], ahp: 26, hp: 21, maxHp: 21, armorRating: 9, movement: 11, baseMeleeDamage: '5 (S/20)', weaponStats: '精工阿斯塔特爆弹手枪, 瑞扎型动力剑'
  }, // 智库（精工MK VII甲）
  'celestial_knights_librarian': {
    name: '星界骑士智库', status: '亚空间真理', attributes: {
      weaponSkill: 72, ballisticSkill: 70, strength: 80, // 60 +20
      toughness: 72, agility: 75, intelligence: 105, perception: 92, // 82 +10
      willpower: 115, // 110 +5
      fellowship: 68
    }, trait: '死亡天使, 星陨之拳, 体型·大型', skill: '灵能掌控, 祈求, 学术知识·古代史, 普通知识·战争, 战术, 能量通道', equipment: '精工MK VII 型动力甲, 灵能剑, 灵能兜帽, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '灵能者', '星界骑士'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 精工阿斯塔特爆弹手枪'
  }, // 牧师（精工MK VII甲，移除圣言激励）
  'celestial_knights_chaplain': {
    name: '星界骑士牧师', status: '最终圣礼', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 85, // 65 +20
      toughness: 78, agility: 72, intelligence: 68, perception: 80, // 70 +10
      willpower: 98, // 93 +5
      fellowship: 82
    }, trait: '死亡天使, 星陨之拳, 体型·大型', skill: '指挥, 魅力, 战斗训练, 特技', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '星界骑士'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 连长（圣物甲）
  'celestial_knights_captain': {
    name: '星界骑士连长', status: '永恒之星', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 120, // 95 +25
      toughness: 110, agility: 105, // 100 +5
      intelligence: 90, perception: 115, // 100 +15
      willpower: 120, // 105 +15
      fellowship: 95
    }, trait: '死亡天使, 星陨之拳, 体型·大型', skill: '指挥, 战术, 魅力', equipment: '圣物MK VII 型动力甲, 瑞扎型动力剑, 圣物爆弹步枪', tags: ['帝国', '阿斯塔特', '英雄', '星界骑士'], ahp: 26, hp: 22, maxHp: 22, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '圣物爆弹步枪, 瑞扎型动力剑'
  }, // 仲裁者（战术甲，移除圣典公民）
  'celestial_knights_intercessor': {
    name: '星界骑士仲裁者', status: '原铸之盾', attributes: {
      weaponSkill: 78, ballisticSkill: 80, strength: 82, // 62 +20
      toughness: 78, agility: 72, intelligence: 62, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 星陨之拳, 体型·大型', skill: '战术, 战斗训练, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '标准', '星界骑士'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪'
  }, // 地狱火（战术甲）
  'celestial_knights_hellblaster': {
    name: '星界骑士地狱火', status: '炽焰裁决', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 85, // 65 +20
      toughness: 78, agility: 62, intelligence: 65, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 55
    }, trait: '死亡天使, 星陨之拳, 体型·大型', skill: '普通知识·技术, 战斗训练, 战术', equipment: 'Mk X 战术型动力甲, 机甲型等离子焚化炉, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '支援', '星界骑士'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '机甲型等离子焚化炉, 精工阿斯塔特爆弹手枪'
  }, // 尊者无畏（注意：无畏非载具，保留所有属性，护甲给予感知+15，意志+10）
  'celestial_knights_dreadnought_venerable': {
    name: '星界骑士尊者无畏', status: '不灭之魂', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 85, perception: 110, // 95 +15
      willpower: 115, // 105 +10
      fellowship: 55
    }, trait: '死亡天使, 星陨之拳, 自动支撑, 体型·超大', skill: '战术, 恐吓, 学术知识·古代史, 普通知识·战争', equipment: '无畏机甲, 激光炮, 无畏型动力爪', tags: ['帝国', '阿斯塔特', '无畏机甲', '英雄', '星界骑士'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '激光炮, 无畏型动力爪, 火焰喷射器'
  }, // 原铸侦察兵（无死亡天使）
  'celestial_knights_primaris_scout': {
    name: '星界骑士侦察快遣兵 (原铸)', status: '移动阴影 (星界骑士)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15(福波斯甲)
      toughness: 60, agility: 72, intelligence: 58, perception: 78, // 63 +15
      willpower: 62, fellowship: 50
    }, trait: '星陨之拳, 原铸改造, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '星界骑士'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 士官（精工MK VII）
  'celestial_knights_sergeant': {
    name: '星界骑士士官', status: '小队战识 (星界骑士)', attributes: {
      weaponSkill: 85, ballisticSkill: 80, strength: 85, // 65 +20
      toughness: 80, agility: 78, intelligence: 68, perception: 82, // 72 +10
      willpower: 82, // 77 +5
      fellowship: 68
    }, trait: '死亡天使, 星陨之拳, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力拳套, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '星界骑士'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 老兵（福波斯甲）
  'celestial_knights_veteran': {
    name: '星界骑士先锐老兵', status: '虚空先锋 (星界骑士)', attributes: {
      weaponSkill: 78, ballisticSkill: 75, strength: 68, // 53 +15
      toughness: 70, agility: 82, intelligence: 65, perception: 85, // 70 +15
      willpower: 72, fellowship: 58
    }, trait: '死亡天使, 星陨之拳, 虚空先锋, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '星界骑士'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 渗透者（福波斯甲）
  'celestial_knights_primaris_infiltrator': {
    name: '星界骑士渗透者', status: '暗影原铸 (星界骑士)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 62, perception: 82, // 67 +15
      willpower: 70, fellowship: 50
    }, trait: '死亡天使, 星陨之拳, 原铸改造, 暗影渗透, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '星界骑士'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 标准原铸仲裁者（战术甲，移除圣典公民）
  'celestial_knights_primaris_intercessor': {
    name: '星界骑士仲裁者 (标准原铸)', status: '钢铁防线 (星界骑士)', attributes: {
      weaponSkill: 80, ballisticSkill: 82, strength: 82, // 62 +20
      toughness: 78, agility: 72, intelligence: 62, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 星陨之拳, 原铸改造, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '星界骑士'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲）
  'celestial_knights_primaris_hellblaster': {
    name: '星界骑士地狱火战士', status: '毁灭之光 (星界骑士)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 85, // 65 +20
      toughness: 78, agility: 62, intelligence: 65, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 55
    }, trait: '死亡天使, 星陨之拳, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '星界骑士'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲）
  'celestial_knights_primaris_aggressor': {
    name: '星界骑士重装火兵', status: '重装毁灭 (星界骑士)', attributes: {
      weaponSkill: 78, ballisticSkill: 65, strength: 95, // 70 +25
      toughness: 88, agility: 22, // 52 -30
      intelligence: 55, perception: 65, // 60 +5
      willpower: 72, fellowship: 48
    }, trait: '死亡天使, 星陨之拳, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '星界骑士'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，移动力减半）
  'celestial_knights_destroyer': {
    name: '星界骑士毁灭者', status: '虚空毁灭 (星界骑士)', attributes: {
      weaponSkill: 92, ballisticSkill: 88, strength: 120, // 80 +40
      toughness: 105, agility: 18, // 58 -40
      intelligence: 65, perception: 80, willpower: 100, // 85 +15
      fellowship: 52
    }, trait: '死亡天使, 星陨之拳, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '星界骑士'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 2, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，移动力减半）
  'celestial_knights_terminator': {
    name: '星界骑士老兵终结者', status: '虚空毁灭者 (星界骑士)', attributes: {
      weaponSkill: 95, ballisticSkill: 92, strength: 125, // 85 +40
      toughness: 110, agility: 35, // 65 -30
      intelligence: 68, perception: 82, willpower: 105, // 90 +15
      fellowship: 55
    }, trait: '死亡天使, 星陨之拳, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '星界骑士'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲）
  'celestial_knights_destroyer_veteran': {
    name: '星界骑士毁灭者老兵', status: '重型清洗者 (星界骑士)', attributes: {
      weaponSkill: 105, ballisticSkill: 102, strength: 120, // 90 +30
      toughness: 115, agility: 55, // 移动力 = floor(55/10)=5 -2 =3
      intelligence: 72, perception: 92, willpower: 95, fellowship: 55
    }, trait: '死亡天使, 星陨之拳, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '星界骑士'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长
  'celestial_knights_centurion': {
    name: '星界骑士百夫长', status: '移动堡垒 (星界骑士)', attributes: {
      weaponSkill: 110, ballisticSkill: 108, strength: 125, // 95 +30
      toughness: 120, agility: 55, intelligence: 75, perception: 95, willpower: 100, fellowship: 58
    }, trait: '死亡天使, 星陨之拳, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '星界骑士'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 药剂师（MK VII甲）
  'celestial_knights_apothecary': {
    name: '星界骑士药剂师', status: '基因守护者 (星界骑士)', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 85, perception: 82, // 72 +10
      willpower: 80, // 75 +5
      fellowship: 60
    }, trait: '死亡天使, 星陨之拳, 守护职责, 战地急救, 逻辑至上, 体型·大型', skill: '医疗, 逻辑, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '星界骑士'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 技术军士（MK VII甲）
  'celestial_knights_techmarine': {
    name: '星界骑士技术军士', status: '机械先行者 (星界骑士)', attributes: {
      weaponSkill: 70, ballisticSkill: 68, strength: 82, // 62 +20
      toughness: 75, agility: 45, // 60 -15
      intelligence: 92, perception: 85, // 75 +10
      willpower: 78, // 73 +5
      fellowship: 50
    }, trait: '死亡天使, 星陨之拳, 机械修复, 多功能操作, 工业直觉, 体型·大型', skill: '评估, 逻辑, 调查, 普通知识·技术', equipment: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术支持', '星界骑士'], ahp: 20, hp: 15, maxHp: 15, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪'
  }, // 标准无畏
  'celestial_knights_dreadnought': {
    name: '星界骑士古老无畏', status: '钢铁执政官 (星界骑士)', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 72, perception: 105, // 90 +15
      willpower: 110, // 100 +10
      fellowship: 50
    }, trait: '死亡天使, 星陨之拳, 不朽生命, 圣典公民, 体型·超大', // 注意：圣典公民保留？不，移除，改为通用
    skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 双联激光炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '星界骑士'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联激光炮, 无畏型动力爪'
  }
};
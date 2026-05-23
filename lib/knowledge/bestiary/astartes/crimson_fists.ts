import { NPCProfile } from '../../../../types';

/**
 * 绯红之拳 (Crimson Fists) - 孤军奋战
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
 * - 救赎者型无畏装甲: AR 20, AHP 75, 力量+60, 感知+15, 意志+15
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 *
 * 特质规则：
 * - 正式星际战士/无畏：主派系死亡天使 + 战团孤军奋战
 * - 侦察兵（含原铸）：仅孤军奋战，无死亡天使
 * - 移除其他派系特质（如圣言激励），保留通用特质（如百战幸存等）
 * - 孤军奋战为条件触发，不常驻属性，故未直接计入基础属性
 */
export const CRIMSON_FISTS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'crimson_fists_scout': {
    name: '绯红之拳侦察兵', status: '瑞恩之星幸存者', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 58, intelligence: 50, perception: 58, willpower: 55, fellowship: 48
    }, trait: '孤军奋战, 圣典公民, 体型·普通', skill: '潜行, 战斗训练, 战术, 警觉, 搜索, 追迹', equipment: '侦察兵复合板甲, 狙击爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '新兵', '绯红之拳'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '狙击爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 战术战士（MK VII甲）
  'crimson_fists_tactical_marine': {
    name: '绯红之拳战术战士', status: '瑞恩之拳', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 78, // 58 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 60, perception: 72, // 62 +10
      willpower: 72, // 67 +5
      fellowship: 55
    }, trait: '死亡天使, 孤军奋战, 圣典公民, 体型·大型', skill: '战术, 战斗训练, 警觉', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '标准', '绯红之拳'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 荣卫老兵（精工MK VII甲）
  'crimson_fists_sternguard': {
    name: '绯红之拳荣卫老兵', status: '不屈防线', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 85, // 65 +20
      toughness: 80, agility: 78, intelligence: 70, perception: 82, // 72 +10
      willpower: 82, // 77 +5
      fellowship: 65
    }, trait: '死亡天使, 孤军奋战, 百战幸存, 圣典公民, 体型·大型', skill: '战斗训练, 战术, 指挥, 普通知识·技术, 化学应用', equipment: '精工MK VII 型动力甲, 特种弹药爆弹步枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '老兵', '精英', '绯红之拳'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '特种弹药爆弹步枪, 阿斯塔特格斗刀'
  }, // 终结者（不屈甲）
  'crimson_fists_terminator': {
    name: '绯红之拳终结者', status: '钢铁誓言', attributes: {
      weaponSkill: 90, ballisticSkill: 88, strength: 120, // 80 +40
      toughness: 105, agility: 18, // 58 -40
      intelligence: 65, perception: 80, willpower: 100, // 85 +15
      fellowship: 55
    }, trait: '死亡天使, 孤军奋战, 不屈意志, 体型·大型', skill: '战术, 战斗训练, 攀爬, 游泳, 特技', equipment: '不屈型战术无畏装甲, 动力拳套, 暴风爆弹枪', tags: ['帝国', '阿斯塔特', '终结者', '精华', '绯红之拳'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 2, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 暴风爆弹枪'
  }, // 智库（MK VII甲）
  'crimson_fists_librarian': {
    name: '绯红之拳智库', status: '亚空间真理', attributes: {
      weaponSkill: 72, ballisticSkill: 68, strength: 80, // 60 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 105, perception: 88, // 78 +10
      willpower: 115, // 110 +5
      fellowship: 55
    }, trait: '死亡天使, 孤军奋战, 亚空间道标, 圣典公民, 体型·大型', skill: '灵能掌控, 祈求, 学术知识·古代史, 普通知识·战争, 逻辑, 能量通道', equipment: '灵能剑, 灵能兜帽, MK VII 型动力甲, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '灵能者', '绯红之拳'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 精工阿斯塔特爆弹手枪'
  }, // 牧师（精工MK VII甲，移除圣言激励）
  'crimson_fists_chaplain': {
    name: '绯红之拳牧师', status: '信念之火', attributes: {
      weaponSkill: 85, ballisticSkill: 75, strength: 90, // 70 +20
      toughness: 82, agility: 78, intelligence: 72, perception: 82, // 72 +10
      willpower: 100, // 95 +5
      fellowship: 85
    }, trait: '死亡天使, 孤军奋战, 圣典公民, 体型·大型', skill: '指挥, 魅力, 战斗训练, 特技', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '绯红之拳'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 连长（圣物MK VII甲）
  'crimson_fists_captain': {
    name: '绯红之拳连长', status: '最后之拳', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 120, // 95 +25
      toughness: 110, agility: 105, // 100 +5
      intelligence: 90, perception: 115, // 100 +15
      willpower: 120, // 105 +15
      fellowship: 100
    }, trait: '死亡天使, 孤军奋战, 瑞恩之仇, 英雄领袖, 体型·大型', skill: '指挥, 战术, 魅力', equipment: '圣物MK VII 型动力甲, 圣物动力拳套, 圣物爆弹步枪', tags: ['帝国', '阿斯塔特', '英雄', '绯红之拳'], ahp: 26, hp: 22, maxHp: 22, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '圣物动力拳套, 圣物爆弹步枪'
  }, // 原铸仲裁者（战术甲）
  'crimson_fists_intercessor': {
    name: '绯红之拳仲裁者', status: '新血之拳', attributes: {
      weaponSkill: 78, ballisticSkill: 80, strength: 82, // 62 +20
      toughness: 78, agility: 72, intelligence: 62, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 孤军奋战, 原铸改造, 圣典公民, 体型·大型', skill: '战斗训练, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '标准', '绯红之拳'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪'
  }, // 救赎者无畏（救赎者型无畏装甲）
  'crimson_fists_redemptor': {
    name: '绯红之拳救赎者无畏', status: '永恒守护者', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 140, // 80 +60
      toughness: 120, agility: 55, intelligence: 85, perception: 110, // 95 +15
      willpower: 115, // 100 +15
      fellowship: 50
    }, trait: '死亡天使, 孤军奋战, 大裂缝幸存者, 自动支撑, 体型·超大', skill: '战术, 恐吓, 学术知识·古代史, 普通知识·战争', equipment: '救赎者型无畏装甲, 机甲型大口径加特林爆弹枪, 重型喷火器, 无畏型动力爪', tags: ['帝国', '阿斯塔特', '无畏机甲', '英雄', '绯红之拳'], ahp: 75, hp: 24, maxHp: 24, armorRating: 20, movement: 7, baseMeleeDamage: '7 (S/20)', weaponStats: '机甲型大口径加特林爆弹枪, 重型喷火器, 无畏型动力爪'
  }, // 原铸侦察兵（无死亡天使）
  'crimson_fists_primaris_scout': {
    name: '绯红之拳侦察快遣兵 (原铸)', status: '移动阴影 (绯红之拳)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15(福波斯甲)
      toughness: 60, agility: 72, intelligence: 58, perception: 78, // 63 +15
      willpower: 62, fellowship: 50
    }, trait: '孤军奋战, 原铸改造, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '绯红之拳'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 士官（精工MK VII甲）
  'crimson_fists_sergeant': {
    name: '绯红之拳士官', status: '小队战识 (绯红之拳)', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 85, // 65 +20
      toughness: 80, agility: 80, intelligence: 68, perception: 82, // 72 +10
      willpower: 82, // 77 +5
      fellowship: 68
    }, trait: '死亡天使, 孤军奋战, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力拳套, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '绯红之拳'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 先锋老兵（福波斯甲）
  'crimson_fists_veteran': {
    name: '绯红之拳先锐老兵', status: '虚空先锋 (绯红之拳)', attributes: {
      weaponSkill: 78, ballisticSkill: 75, strength: 68, // 53 +15
      toughness: 70, agility: 82, intelligence: 65, perception: 85, // 70 +15
      willpower: 72, fellowship: 58
    }, trait: '死亡天使, 孤军奋战, 虚空先锋, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '绯红之拳'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 渗透者（福波斯甲）
  'crimson_fists_primaris_infiltrator': {
    name: '绯红之拳渗透者', status: '暗影原铸 (绯红之拳)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 62, perception: 82, // 67 +15
      willpower: 72, fellowship: 50
    }, trait: '死亡天使, 孤军奋战, 原铸改造, 暗影渗透, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '绯红之拳'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 标准原铸仲裁者（战术甲）
  'crimson_fists_primaris_intercessor': {
    name: '绯红之拳仲裁者 (标准原铸)', status: '钢铁防线 (绯红之拳)', attributes: {
      weaponSkill: 80, ballisticSkill: 82, strength: 82, // 62 +20
      toughness: 78, agility: 72, intelligence: 62, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 孤军奋战, 原铸改造, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '绯红之拳'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲）
  'crimson_fists_primaris_hellblaster': {
    name: '绯红之拳地狱火战士', status: '毁灭之光 (绯红之拳)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 85, // 65 +20
      toughness: 78, agility: 62, intelligence: 65, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 55
    }, trait: '死亡天使, 孤军奋战, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '绯红之拳'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲）
  'crimson_fists_primaris_aggressor': {
    name: '绯红之拳重装火兵', status: '重装毁灭 (绯红之拳)', attributes: {
      weaponSkill: 78, ballisticSkill: 65, strength: 95, // 70 +25
      toughness: 88, agility: 22, // 52 -30
      intelligence: 55, perception: 65, // 60 +5
      willpower: 72, fellowship: 48
    }, trait: '死亡天使, 孤军奋战, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '绯红之拳'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲）
  'crimson_fists_destroyer': {
    name: '绯红之拳毁灭者', status: '虚空毁灭 (绯红之拳)', attributes: {
      weaponSkill: 92, ballisticSkill: 88, strength: 120, // 80 +40
      toughness: 105, agility: 18, // 58 -40
      intelligence: 65, perception: 80, willpower: 100, // 85 +15
      fellowship: 52
    }, trait: '死亡天使, 孤军奋战, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '绯红之拳'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 2, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲）
  'crimson_fists_destroyer_veteran': {
    name: '绯红之拳毁灭者老兵', status: '重型清洗者 (绯红之拳)', attributes: {
      weaponSkill: 105, ballisticSkill: 102, strength: 120, // 90 +30
      toughness: 115, agility: 55, intelligence: 72, perception: 92, willpower: 95, fellowship: 55
    }, trait: '死亡天使, 孤军奋战, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '绯红之拳'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（百夫长甲）
  'crimson_fists_centurion': {
    name: '绯红之拳百夫长', status: '移动堡垒 (绯红之拳)', attributes: {
      weaponSkill: 110, ballisticSkill: 108, strength: 125, // 95 +30
      toughness: 120, agility: 55, intelligence: 75, perception: 95, willpower: 100, fellowship: 58
    }, trait: '死亡天使, 孤军奋战, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '绯红之拳'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 药剂师（MK VII甲）
  'crimson_fists_apothecary': {
    name: '绯红之拳药剂师', status: '基因守护者 (绯红之拳)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 80, // 60 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 85, perception: 82, // 72 +10
      willpower: 80, // 75 +5
      fellowship: 60
    }, trait: '死亡天使, 孤军奋战, 守护职责, 战地急救, 圣典公民, 体型·大型', skill: '医疗, 逻辑, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '绯红之拳'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 技术军士（MK VII甲）
  'crimson_fists_techmarine': {
    name: '绯红之拳技术军士', status: '机械先行者 (绯红之拳)', attributes: {
      weaponSkill: 70, ballisticSkill: 68, strength: 82, // 62 +20
      toughness: 75, agility: 48, // 63 -15
      intelligence: 92, perception: 85, // 75 +10
      willpower: 78, // 73 +5
      fellowship: 50
    }, trait: '死亡天使, 孤军奋战, 机械修复, 多功能操作, 工业直觉, 体型·大型', skill: '评估, 逻辑, 调查, 普通知识·技术', equipment: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术支持', '绯红之拳'], ahp: 20, hp: 15, maxHp: 15, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪'
  }, // 标准无畏（无畏甲）
  'crimson_fists_dreadnought': {
    name: '绯红之拳古老无畏', status: '钢铁执政官 (绯红之拳)', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 72, perception: 105, // 90 +15
      willpower: 110, // 100 +10
      fellowship: 50
    }, trait: '死亡天使, 孤军奋战, 不朽生命, 圣典公民, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 双联激光炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '绯红之拳'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联激光炮, 无畏型动力爪'
  }
};
import { NPCProfile } from '../../../../types';

/**
 * 星空雄狮 (Celestial Lions) - 傲气不屈
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
 * - 正式星际战士/无畏：主派系死亡天使 + 战团傲气不屈
 * - 侦察兵（含原铸侦察兵）：仅傲气不屈，无死亡天使
 * - 渗透者等福波斯甲使用者若为正式战士，仍保留死亡天使
 * - 移除所有其他派系特质，保留通用特质
 * - 特质傲气不屈提供常驻意志(WP)+10，计入最终属性
 */
export const CELESTIAL_LIONS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使，意志+10来自傲气不屈）
  'celestial_lions_scout': {
    name: '星空雄狮侦察兵', status: '新血之傲', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 58, intelligence: 50, perception: 58, willpower: 65, // 基础55 + 特质10
      fellowship: 48
    }, trait: '傲气不屈, 体型·普通', skill: '战斗训练, 战术, 警觉, 搜索, 追迹, 潜行', equipment: '侦察兵复合板甲, 狙击爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '新兵', '星空雄狮'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '狙击爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 正式战士（MK VII甲，意志+5护甲 +10特质 = +15）
  'celestial_lions_marine': {
    name: '星空雄狮战士', status: '傲慢之血', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 78, // 58 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 60, perception: 72, // 62 +10
      willpower: 77, // 62 +5 +10
      fellowship: 55
    }, trait: '死亡天使, 傲气不屈, 体型·大型', skill: '战斗训练, 战术, 生存, 纵酒', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '标准', '星空雄狮'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 5, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 死语者（牧师，精工MK VII甲，意志+5护甲 +10特质 = +15）
  'celestial_lions_death_speaker': {
    name: '星空雄狮死语者 (牧师)', status: '战团之魂', attributes: {
      weaponSkill: 90, ballisticSkill: 80, strength: 90, // 70 +20
      toughness: 82, agility: 78, intelligence: 75, perception: 82, // 72 +10
      willpower: 108, // 93 +5 +10
      fellowship: 90
    }, trait: '死亡天使, 傲气不屈, 死语者的哀悼, 体型·大型', skill: '指挥, 魅力, 战斗训练, 特技', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '英雄', '星空雄狮'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 药剂师（MK VII甲，意志+5+10）
  'celestial_lions_apothecary': {
    name: '星空雄狮药剂师', status: '血脉守望', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 80, // 60 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 85, perception: 82, // 72 +10
      willpower: 85, // 70 +5 +10
      fellowship: 62
    }, trait: '死亡天使, 傲气不屈, 医疗之星, 体型·大型', skill: '医疗, 逻辑, 战术', equipment: '护道器, 还原者, MK VII 型动力甲, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '药剂师', '支持', '星空雄狮'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '精工阿斯塔特爆弹手枪'
  }, // 傲卫老兵（精工MK VII甲，意志+5+10）
  'celestial_lions_veteran': {
    name: '星空雄狮傲卫老兵', status: '狮群荣光', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 85, // 65 +20
      toughness: 82, agility: 80, intelligence: 70, perception: 82, // 72 +10
      willpower: 90, // 75 +5 +10
      fellowship: 68
    }, trait: '死亡天使, 傲气不屈, 百战幸存, 体型·大型', skill: '战斗训练, 战术, 指挥, 闪避', equipment: '精工MK VII 型动力甲, 特种弹药爆弹步枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '老兵', '精英', '星空雄狮'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '特种弹药爆弹步枪, 阿斯塔特格斗刀'
  }, // 连长（圣物MK VII甲，意志+15+10 = +25）
  'celestial_lions_captain': {
    name: '星空雄狮连长 (埃肯尼·杜巴库)', status: '战团长', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 120, // 95 +25
      toughness: 110, agility: 105, // 100 +5
      intelligence: 90, perception: 115, // 100 +15
      willpower: 130, // 105 +15 +10
      fellowship: 105
    }, trait: '死亡天使, 傲气不屈, 英雄之躯, 英雄领袖, 体型·大型', skill: '指挥, 魅力, 战术', equipment: '圣物MK VII 型动力甲, 泰拉型动力剑, 圣物爆弹步枪', tags: ['帝国', '阿斯塔特', '英雄', '星空雄狮'], ahp: 26, hp: 22, maxHp: 22, armorRating: 9, movement: 10, baseMeleeDamage: '6 (S/20)', weaponStats: '圣物爆弹步枪, 泰拉型动力剑'
  }, // 仲裁者（战术甲，意志+5+10）
  'celestial_lions_intercessor': {
    name: '星空雄狮仲裁者 (原铸)', status: '新时代之爪', attributes: {
      weaponSkill: 78, ballisticSkill: 80, strength: 82, // 62 +20
      toughness: 78, agility: 72, intelligence: 62, perception: 78, // 68 +10
      willpower: 83, // 68 +5 +10
      fellowship: 58
    }, trait: '死亡天使, 傲气不屈, 原铸改造, 体型·大型', skill: '战斗训练, 战术, 攀爬, 游泳, 特技', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '星空雄狮'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪'
  }, // 尊者无畏（无畏甲，意志+10护甲 +10特质 = +20）
  'celestial_lions_dreadnought': {
    name: '星空雄狮尊者无畏', status: '不屈雄狮', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 80, perception: 110, // 95 +15
      willpower: 120, // 100 +10 +10
      fellowship: 55
    }, trait: '死亡天使, 傲气不屈, 百战荣勋, 自动支撑, 体型·超大', skill: '战术, 恐吓, 学术知识·古代史, 普通知识·战争', equipment: '无畏机甲, 机甲型突击炮, 无畏型动力拳', tags: ['帝国', '阿斯塔特', '无畏机甲', '英雄', '星空雄狮'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 无畏型动力拳'
  }, // 原铸侦察兵（无死亡天使，福波斯甲无意志加成，仅特质+10）
  'celestial_lions_primaris_scout': {
    name: '星空雄狮侦察快遣兵 (原铸)', status: '移动阴影 (星空雄狮)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15
      toughness: 60, agility: 72, intelligence: 58, perception: 78, // 63 +15
      willpower: 72, // 62 +10
      fellowship: 50
    }, trait: '傲气不屈, 原铸改造, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '星空雄狮'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 士官（精工MK VII甲，意志+5+10）
  'celestial_lions_sergeant': {
    name: '星空雄狮士官', status: '小队战识 (星空雄狮)', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 85, // 65 +20
      toughness: 80, agility: 80, intelligence: 68, perception: 82, // 72 +10
      willpower: 87, // 72 +5 +10
      fellowship: 68
    }, trait: '死亡天使, 傲气不屈, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力拳套, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '星空雄狮'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 渗透者（正式战士，福波斯甲，无意志护甲加成，特质+10）
  'celestial_lions_primaris_infiltrator': {
    name: '星空雄狮渗透者', status: '暗影原铸 (星空雄狮)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 62, perception: 82, // 67 +15
      willpower: 80, // 70 +10
      fellowship: 50
    }, trait: '死亡天使, 傲气不屈, 原铸改造, 暗影渗透, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '星空雄狮'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 标准原铸仲裁者（战术甲，意志+5+10）
  'celestial_lions_primaris_intercessor': {
    name: '星空雄狮仲裁者 (标准原铸)', status: '钢铁防线 (星空雄狮)', attributes: {
      weaponSkill: 80, ballisticSkill: 82, strength: 82, // 62 +20
      toughness: 78, agility: 72, intelligence: 62, perception: 78, // 68 +10
      willpower: 83, // 68 +5 +10
      fellowship: 58
    }, trait: '死亡天使, 傲气不屈, 原铸改造, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '星空雄狮'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲，意志+5+10）
  'celestial_lions_primaris_hellblaster': {
    name: '星空雄狮地狱火战士', status: '毁灭之光 (星空雄狮)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 85, // 65 +20
      toughness: 78, agility: 62, intelligence: 65, perception: 78, // 68 +10
      willpower: 83, // 68 +5 +10
      fellowship: 55
    }, trait: '死亡天使, 傲气不屈, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '星空雄狮'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，意志无护甲加成，特质+10）
  'celestial_lions_primaris_aggressor': {
    name: '星空雄狮重装火兵', status: '重装毁灭 (星空雄狮)', attributes: {
      weaponSkill: 78, ballisticSkill: 65, strength: 95, // 70 +25
      toughness: 88, agility: 22, // 52 -30
      intelligence: 55, perception: 65, // 60 +5
      willpower: 82, // 72 +10
      fellowship: 48
    }, trait: '死亡天使, 傲气不屈, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '星空雄狮'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，意志+15护甲 +10特质 = +25，移动力减半）
  'celestial_lions_destroyer': {
    name: '星空雄狮毁灭者', status: '虚空毁灭 (星空雄狮)', attributes: {
      weaponSkill: 92, ballisticSkill: 88, strength: 120, // 80 +40
      toughness: 105, agility: 18, // 58 -40
      intelligence: 65, perception: 80, willpower: 110, // 85 +15 +10
      fellowship: 52
    }, trait: '死亡天使, 傲气不屈, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '星空雄狮'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 2, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，意志+15护甲 +10特质 = +25，敏捷惩罚-30）
  'celestial_lions_terminator': {
    name: '星空雄狮老兵终结者', status: '虚空毁灭者 (星空雄狮)', attributes: {
      weaponSkill: 95, ballisticSkill: 92, strength: 125, // 85 +40
      toughness: 110, agility: 35, // 65 -30
      intelligence: 68, perception: 82, willpower: 115, // 90 +15 +10
      fellowship: 55
    }, trait: '死亡天使, 傲气不屈, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力爪, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '星空雄狮'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力爪, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，力量+30，移动力-2）
  'celestial_lions_destroyer_veteran': {
    name: '星空雄狮毁灭者老兵', status: '重型清洗者 (星空雄狮)', attributes: {
      weaponSkill: 105, ballisticSkill: 102, strength: 120, // 90 +30
      toughness: 115, agility: 55, // 移动力 = floor(55/10)=5 -2 = 3
      intelligence: 72, perception: 92, willpower: 105, // 95 +10
      fellowship: 55
    }, trait: '死亡天使, 傲气不屈, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '星空雄狮'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（百夫长甲）
  'celestial_lions_centurion': {
    name: '星空雄狮百夫长', status: '移动堡垒 (星空雄狮)', attributes: {
      weaponSkill: 110, ballisticSkill: 108, strength: 125, // 95 +30
      toughness: 120, agility: 55, intelligence: 75, perception: 95, willpower: 110, // 100 +10
      fellowship: 58
    }, trait: '死亡天使, 傲气不屈, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '星空雄狮'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 技术军士（MK VII甲，意志+5护甲 +10特质）
  'celestial_lions_techmarine': {
    name: '星空雄狮技术军士', status: '机械先行者 (星空雄狮)', attributes: {
      weaponSkill: 70, ballisticSkill: 68, strength: 82, // 62 +20
      toughness: 75, agility: 48, // 63 -15
      intelligence: 92, perception: 85, // 75 +10
      willpower: 83, // 68 +5 +10
      fellowship: 50
    }, trait: '死亡天使, 傲气不屈, 机械修复, 多功能操作, 工业直觉, 体型·大型', skill: '评估, 逻辑, 调查, 普通知识·技术', equipment: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术支持', '星空雄狮'], ahp: 20, hp: 15, maxHp: 15, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪'
  }, // 智库（MK VII甲，意志+5护甲 +10特质）
  'celestial_lions_librarian': {
    name: '星空雄狮智库', status: '虚空灵能者 (星空雄狮)', attributes: {
      weaponSkill: 72, ballisticSkill: 68, strength: 80, // 60 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 105, perception: 88, // 78 +10
      willpower: 120, // 105 +5 +10
      fellowship: 55
    }, trait: '死亡天使, 傲气不屈, 虚空扭曲, 星海本能, 体型·大型', skill: '祈求, 逻辑, 调查, 灵能掌控, 能量通道', equipment: '灵能剑, 灵能兜帽, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '灵能者', '星空雄狮'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 阿斯塔特爆弹枪'
  }, // 牧师（精工MK VII甲，意志+5护甲 +10特质）
  'celestial_lions_chaplain': {
    name: '星空雄狮牧师', status: '执政官意志 (星空雄狮)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 85, // 65 +20
      toughness: 78, agility: 72, intelligence: 68, perception: 80, // 70 +10
      willpower: 103, // 88 +5 +10
      fellowship: 80
    }, trait: '死亡天使, 傲气不屈, 不屈核心, 体型·大型', skill: '指挥, 恐吓, 魅力', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '星空雄狮'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }
};
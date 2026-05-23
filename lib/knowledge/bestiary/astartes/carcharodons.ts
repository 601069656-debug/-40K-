import { NPCProfile } from '../../../../types';

/**
 * 噬人鲨 (Carcharodons) - 虚空掠食者
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
 * - 铁骑型战术无畏装甲: AR 14, AHP 40, 力量+45, 意志+20, 敏捷-45
 * - 百夫长装甲: AR 14, AHP 45, 力量+30, 移动力-2
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 * - 利维坦型无畏装甲: AR 22, AHP 80, 力量+65, 感知+15, 意志+15
 *
 * 特质：
 * - 正式星际战士/无畏：主派系死亡天使+ 战团特质虚空掠食者
 * - 侦察兵（含原铸）：仅虚空掠食者，无死亡天使
 * - 移除所有其他战团特质（如血渴狂怒），保留非派系通用特质（如星海本能等）
 * - 特质字符串仅保留名称，不含描述
 */
export const CARCHARODONS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（新兵，无死亡天使）
  'carcharodons_scout': {
    name: '噬人鲨侦察兵', status: '灰血学徒', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 58, intelligence: 50, perception: 62, willpower: 55, fellowship: 40  // 沉默寡言
    }, trait: '虚空掠食者, 星海本能, 体型·普通', skill: '潜行, 闪避, 追迹', equipment: '侦察兵复合板甲, 狙击爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '侦察兵', '噬人鲨'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '狙击爆弹枪, 阿斯塔特格斗刀'
  }, // 原铸侦察兵（无死亡天使）
  'carcharodons_primaris_scout': {
    name: '噬人鲨侦察快遣兵 (原铸)', status: '移动阴影 (噬人鲨)', attributes: {
      weaponSkill: 60, ballisticSkill: 62, strength: 60, // 45 +15(福波斯甲)
      toughness: 60, agility: 72, intelligence: 55, perception: 78, // 63 +15
      willpower: 60, fellowship: 42
    }, trait: '虚空掠食者, 原铸改造, 星海本能, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '噬人鲨'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 正式战士（MK VII）
  'carcharodons_tactical_marine': {
    name: '噬人鲨战士', status: '虚空掠夺者', attributes: {
      weaponSkill: 80, ballisticSkill: 72, strength: 78, // 58 +20
      toughness: 70, agility: 52, // 67 -15
      intelligence: 58, perception: 72, // 62 +10
      willpower: 72, // 67 +5
      fellowship: 48
    }, trait: '死亡天使, 虚空掠食者, 残暴打击, 星海本能, 体型·大型', skill: '战术, 闪避, 身体素质', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 阿斯塔特链锯剑', tags: ['帝国', '阿斯塔特', '标准', '噬人鲨'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 65, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特链锯剑'
  }, // 连体型突击兵（登舱方盾，属性惩罚叠加）
  'carcharodons_assault_breaker': {
    name: '噬人鲨连体型突击兵', status: '舱内噩梦', attributes: {
      weaponSkill: 82, ballisticSkill: 70, strength: 82, // 62 +20
      toughness: 72, agility: 35, // 70 -15(护甲) -20(持盾敏捷修正)
      intelligence: 55, perception: 72, // 62 +10
      willpower: 75, // 70 +5
      fellowship: 45
    }, trait: '死亡天使, 虚空掠食者, 残暴打击, 体型·大型', skill: '特技, 闪避, 恐吓', equipment: 'MK VII 型动力甲, 登舱方盾, 动力斧, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '突击', '跳帮', '噬人鲨'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 4, // 盾牌额外惩罚？
    baseMeleeDamage: '4 (S/20)', weaponStats: '动力斧, 精工阿斯塔特爆弹手枪'
  }, // 士官（精工MK VII）
  'carcharodons_sergeant': {
    name: '噬人鲨士官', status: '小队战识 (噬人鲨)', attributes: {
      weaponSkill: 85, ballisticSkill: 78, strength: 85, // 65 +20
      toughness: 78, agility: 78, intelligence: 65, perception: 80, // 70 +10
      willpower: 80, // 75 +5
      fellowship: 58
    }, trait: '死亡天使, 虚空掠食者, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力爪, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '噬人鲨'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '动力爪, 精工阿斯塔特爆弹手枪'
  }, // 老兵（福波斯甲）
  'carcharodons_veteran': {
    name: '噬人鲨先锐老兵', status: '虚空先锋 (噬人鲨)', attributes: {
      weaponSkill: 78, ballisticSkill: 75, strength: 68, // 53 +15
      toughness: 70, agility: 82, intelligence: 65, perception: 85, // 70 +15
      willpower: 72, fellowship: 50
    }, trait: '死亡天使, 虚空掠食者, 虚空先锋, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '噬人鲨'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 原铸渗透者（福波斯甲）
  'carcharodons_primaris_infiltrator': {
    name: '噬人鲨渗透者', status: '暗影原铸 (噬人鲨)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 62, perception: 82, // 67 +15
      willpower: 70, fellowship: 45
    }, trait: '死亡天使, 虚空掠食者, 原铸改造, 暗影渗透, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '噬人鲨'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 原铸仲裁者（战术甲）
  'carcharodons_primaris_intercessor': {
    name: '噬人鲨仲裁者 (标准原铸)', status: '钢铁防线 (噬人鲨)', attributes: {
      weaponSkill: 80, ballisticSkill: 80, strength: 82, // 62 +20
      toughness: 78, agility: 72, intelligence: 62, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 50
    }, trait: '死亡天使, 虚空掠食者, 原铸改造, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '噬人鲨'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲）
  'carcharodons_primaris_hellblaster': {
    name: '噬人鲨地狱火战士', status: '毁灭之光 (噬人鲨)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 85, // 65 +20
      toughness: 78, agility: 60, intelligence: 58, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 48
    }, trait: '死亡天使, 虚空掠食者, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '噬人鲨'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲）
  'carcharodons_primaris_aggressor': {
    name: '噬人鲨重装火兵', status: '重装毁灭 (噬人鲨)', attributes: {
      weaponSkill: 78, ballisticSkill: 65, strength: 95, // 70 +25
      toughness: 88, agility: 22, // 52 -30
      intelligence: 55, perception: 60, // 55 +5
      willpower: 70, fellowship: 45
    }, trait: '死亡天使, 虚空掠食者, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '噬人鲨'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，移动力减半）
  'carcharodons_destroyer': {
    name: '噬人鲨毁灭者', status: '虚空毁灭 (噬人鲨)', attributes: {
      weaponSkill: 92, ballisticSkill: 88, strength: 120, // 80 +40
      toughness: 105, agility: 20, // 60 -40
      intelligence: 65, perception: 80, willpower: 100, // 85 +15
      fellowship: 50
    }, trait: '死亡天使, 虚空掠食者, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '噬人鲨'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，移动力减半）
  'carcharodons_terminator': {
    name: '噬人鲨老兵终结者', status: '虚空毁灭者 (噬人鲨)', attributes: {
      weaponSkill: 95, ballisticSkill: 92, strength: 125, // 85 +40
      toughness: 110, agility: 35, // 65 -30
      intelligence: 68, perception: 82, willpower: 105, // 90 +15
      fellowship: 52
    }, trait: '死亡天使, 虚空掠食者, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力爪, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '噬人鲨'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力爪, 双联重型爆弹枪'
  }, // 红兄弟（铁骑型终结者甲）
  'carcharodons_red_brethren': {
    name: '噬人鲨“红兄弟”老兵', status: '血色终结者', attributes: {
      weaponSkill: 98, ballisticSkill: 90, strength: 130, // 85 +45
      toughness: 115, agility: 15, // 60 -45
      intelligence: 65, perception: 80, willpower: 110, // 90 +20
      fellowship: 48
    }, trait: '死亡天使, 虚空掠食者, 终结者意志, 星海本能, 百战幸存, 体型·大型', skill: '战术, 恐吓, 意志抵抗', equipment: '铁骑型战术无畏装甲, 雷霆锤, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '精英', '终结者', '噬人鲨'], ahp: 40, hp: 23, maxHp: 23, armorRating: 14, movement: 2, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 阿斯塔特爆弹枪'
  }, // 毁灭者老兵（百夫长甲）
  'carcharodons_destroyer_veteran': {
    name: '噬人鲨毁灭者老兵', status: '重型清洗者 (噬人鲨)', attributes: {
      weaponSkill: 105, ballisticSkill: 102, strength: 120, // 90 +30
      toughness: 115, agility: 55, // 移动力 = floor(55/10)=5 -2 =3
      intelligence: 72, perception: 92, willpower: 95, fellowship: 52
    }, trait: '死亡天使, 虚空掠食者, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '噬人鲨'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长
  'carcharodons_centurion': {
    name: '噬人鲨百夫长', status: '移动堡垒 (噬人鲨)', attributes: {
      weaponSkill: 110, ballisticSkill: 108, strength: 125, // 95 +30
      toughness: 120, agility: 55, intelligence: 75, perception: 95, willpower: 100, fellowship: 55
    }, trait: '死亡天使, 虚空掠食者, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '噬人鲨'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 药剂师
  'carcharodons_apothecary': {
    name: '噬人鲨药剂师', status: '基因守护者 (噬人鲨)', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 72, agility: 50, // 65 -15
      intelligence: 85, perception: 82, // 72 +10
      willpower: 80, // 75 +5
      fellowship: 52
    }, trait: '死亡天使, 虚空掠食者, 守护职责, 战地急救, 星海本能, 体型·大型', skill: '医疗, 逻辑, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '噬人鲨'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 技术军士
  'carcharodons_techmarine': {
    name: '噬人鲨技术军士', status: '机械先行者 (噬人鲨)', attributes: {
      weaponSkill: 70, ballisticSkill: 68, strength: 82, // 62 +20
      toughness: 75, agility: 45, // 60 -15
      intelligence: 92, perception: 85, // 75 +10
      willpower: 78, // 73 +5
      fellowship: 45
    }, trait: '死亡天使, 虚空掠食者, 机械修复, 多功能操作, 工业直觉, 体型·大型', skill: '评估, 逻辑, 调查, 普通知识·技术', equipment: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术支持', '噬人鲨'], ahp: 20, hp: 15, maxHp: 15, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪'
  }, // 智库
  'carcharodons_librarian': {
    name: '噬人鲨智库', status: '虚空灵能者 (噬人鲨)', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 70, agility: 52, // 67 -15
      intelligence: 105, perception: 88, // 78 +10
      willpower: 115, // 110 +5
      fellowship: 50
    }, trait: '死亡天使, 虚空掠食者, 虚空扭曲, 星海本能, 体型·大型', skill: '祈求, 逻辑, 调查, 灵能掌控, 能量通道', equipment: '灵能剑, 灵能兜帽, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '灵能者', '噬人鲨'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 阿斯塔特爆弹枪'
  }, // 牧师
  'carcharodons_chaplain': {
    name: '噬人鲨牧师', status: '执政官意志 (噬人鲨)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 85, // 65 +20
      toughness: 78, agility: 60, intelligence: 68, perception: 80, // 70 +10
      willpower: 100, // 95 +5
      fellowship: 62
    }, trait: '死亡天使, 虚空掠食者, 狂怒祷言, 不屈核心, 星海本能, 体型·大型', skill: '指挥, 恐吓, 魅力', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '噬人鲨'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 连长（圣物甲）
  'carcharodons_captain': {
    name: '噬人鲨连长', status: '虚空领主 (噬人鲨)', attributes: {
      weaponSkill: 115, ballisticSkill: 110, strength: 120, // 95 +25
      toughness: 110, agility: 105, // 100 +5
      intelligence: 90, perception: 115, // 100 +15
      willpower: 125, // 110 +15
      fellowship: 85
    }, trait: '死亡天使, 虚空掠食者, 执政官权威, 英雄之躯, 星海本能, 百战幸存, 体型·大型', skill: '指挥, 魅力, 战术', equipment: '圣物MK VII 型动力甲, 瑞扎型动力剑, 精工Mk II“日怒”型等离子手枪', tags: ['帝国', '阿斯塔特', '英雄', '噬人鲨'], ahp: 26, hp: 22, maxHp: 22, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '精工Mk II“日怒”型等离子手枪, 瑞扎型动力剑'
  }, // 指挥官（原“shiver lord”，圣物甲）
  'carcharodons_shiver_lord': {
    name: '噬人鲨指挥官', status: '虚空幽灵', attributes: {
      weaponSkill: 120, ballisticSkill: 115, strength: 125, // 100 +25
      toughness: 115, agility: 110, // 105 +5
      intelligence: 95, perception: 120, // 105 +15
      willpower: 130, // 115 +15
      fellowship: 80
    }, trait: '死亡天使, 虚空掠食者, 收割权威, 英雄之躯, 无声掠夺, 星海本能, 百战幸存, 残暴打击, 体型·大型', skill: '指挥, 战术, 潜行, 挑战', equipment: '圣物MK VII 型动力甲, 动力拳套, 精工Mk II“日怒”型等离子手枪', tags: ['帝国', '阿斯塔特', '英雄', '噬人鲨'], ahp: 26, hp: 23, maxHp: 23, armorRating: 9, movement: 12, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 精工Mk II“日怒”型等离子手枪'
  }, // 标准无畏
  'carcharodons_dreadnought': {
    name: '噬人鲨古老无畏', status: '钢铁执政官 (噬人鲨)', attributes: {
      weaponSkill: 105, ballisticSkill: 102, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 72, perception: 105, // 90 +15
      willpower: 110, // 100 +10
      fellowship: 45
    }, trait: '死亡天使, 虚空掠食者, 不朽生命, 星海本能, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 双联激光炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '噬人鲨'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联激光炮, 无畏型动力爪'
  }, // 利维坦无畏
  'carcharodons_leviathan_dreadnought': {
    name: '噬人鲨利维坦无畏', status: '远古屠夫', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 145, // 80 +65
      toughness: 130, agility: 45, intelligence: 65, perception: 95, // 80 +15
      willpower: 110, // 95 +15
      fellowship: 40
    }, trait: '死亡天使, 虚空掠食者, 粉碎冲锋, 不朽生命, 钢铁意志, 残暴打击, 体型·超大', skill: '战术, 恐吓', equipment: '利维坦型无畏装甲, 利维坦攻城钻, 旋风导弹巢, 无畏型多管热熔枪', tags: ['帝国', '阿斯塔特', '无畏机甲', '重型', '噬人鲨'], ahp: 80, hp: 26, maxHp: 26, armorRating: 22, movement: 7, baseMeleeDamage: '7 (S/20)', weaponStats: '利维坦攻城钻, 无畏型多管热熔枪, 旋风导弹巢'
  }
};
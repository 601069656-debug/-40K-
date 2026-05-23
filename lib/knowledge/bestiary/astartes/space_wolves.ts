import { NPCProfile } from '../../../../types';

/**
 * 太空野狼 (Space Wolves) - 芬里斯之狼
 *
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - MK VII 型动力甲 (符文动力甲等效): AR 7, AHP 20, 力量+20, 感知+10, 意志+5, 敏捷-15
 * - 精工MK VII 型动力甲: AR 8, AHP 22, 力量+20, 感知+10, 意志+5 (无敏捷惩罚)
 * - 圣物MK VII 型动力甲: AR 9, AHP 26, 力量+25, 感知+15, 意志+15, 敏捷+5
 * - Mk X 福波斯型动力甲: AR 6, AHP 18, 力量+15, 感知+15
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - Mk X 格拉维斯型动力甲: AR 9, AHP 26, 力量+25, 感知+5, 敏捷-30
 * - 不屈型战术无畏装甲: AR 12, AHP 35, 力量+40, 意志+15, 敏捷-40, 移动力减半
 * - 精工不屈型战术无畏装甲: AR 13, AHP 38, 力量+40, 意志+15, 敏捷-30, 移动力减半
 * - 百夫长装甲: AR 14, AHP 45, 力量+30, 移动力-2
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 * - 埃癸斯之铠: AR 14, AHP 45, 力量+45, 意志+25, 敏捷-25
 *
 * 特质规则：
 * - 正式星际战士/无畏：主派系死亡天使 + 战团芬里斯之狼
 * - 侦察兵（含原铸）：仅芬里斯之狼，无死亡天使
 * - 保留通用特质如荒野求生，移除所有其他派系特质
 * - 拥有百战幸存的单位：最终属性已包含 S+5, T+5, Ag+5, WP+5
 */
export const SPACE_WOLVES_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'space_wolves_scout': {
    name: '太空野狼侦察兵', status: '新兵 (太空野狼)', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 60, intelligence: 50, perception: 60, willpower: 55, fellowship: 48
    }, trait: '芬里斯之狼, 荒野求生, 体型·普通', skill: '潜行, 追迹, 调查', equipment: '侦察兵复合板甲, 狙击爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '侦察兵', '太空野狼'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '狙击爆弹枪, 阿斯塔特格斗刀'
  }, // 血爪新兵（侦察兵，无死亡天使）
  'space_wolves_blood_claw': {
    name: '血爪新兵', status: '芬里斯之雏', attributes: {
      weaponSkill: 57, ballisticSkill: 52, strength: 57, toughness: 55, agility: 62, intelligence: 48, perception: 58, willpower: 55, fellowship: 45
    }, trait: '芬里斯之狼, 荒野求生, 体型·普通', skill: '追迹, 恐吓, 闪避, 生存', equipment: '侦察兵复合板甲, 阿斯塔特格斗刀, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '新兵', '血爪', '太空野狼'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '阿斯塔特格斗刀, 精工阿斯塔特爆弹手枪'
  }, // 原铸侦察兵（无死亡天使）
  'space_wolves_primaris_scout': {
    name: '太空野狼侦察快遣兵 (原铸)', status: '移动阴影 (太空野狼)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15(福波斯甲)
      toughness: 60, agility: 72, intelligence: 58, perception: 78, // 63 +15
      willpower: 62, fellowship: 50
    }, trait: '芬里斯之狼, 原铸改造, 荒野求生, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '太空野狼'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 灰猎手（正式战士，MK VII甲/符文甲等效）
  'space_wolves_grey_hunter': {
    name: '灰猎手', status: '芬里斯之影', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 78, // 58 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 60, perception: 72, // 62 +10
      willpower: 72, // 67 +5
      fellowship: 55
    }, trait: '死亡天使, 芬里斯之狼, 荒野求生, 体型·大型', skill: '追迹, 战术, 闪避, 警觉', equipment: '符文动力甲, 阿斯塔特爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '太空野狼'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特格斗刀'
  }, // 标准战士（MK VII甲）
  'space_wolves_marine': {
    name: '太空野狼战士', status: '虚空之速 (太空野狼)', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 78, // 58 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 60, perception: 72, // 62 +10
      willpower: 72, // 67 +5
      fellowship: 55
    }, trait: '死亡天使, 芬里斯之狼, 荒野求生, 体型·大型', skill: '闪避, 特技, 战术', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '太空野狼'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 长牙老兵（MK VII甲，百战幸存）
  'space_wolves_long_fang': {
    name: '长牙老兵', status: '凛冬利齿', attributes: {
      weaponSkill: 80, ballisticSkill: 85, strength: 83, // 58 +5(幸存) +20
      toughness: 77, // 72 +5
      agility: 57, // 67 +5 -15
      intelligence: 65, perception: 77, // 67 +10
      willpower: 77, // 67 +5(幸存) +5
      fellowship: 60
    }, trait: '死亡天使, 芬里斯之狼, 百战幸存, 荒野求生, 体型·大型', skill: '警觉, 战术, 闪避, 枪械保养', equipment: '符文动力甲, 单兵式激光炮, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '老兵', '重火力', '太空野狼'], ahp: 20, hp: 15, maxHp: 15, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '精工阿斯塔特爆弹手枪, 单兵式激光炮'
  }, // 罗根·格里姆纳（埃癸斯之铠，百战幸存）
  'space_wolves_logan_grimnar': {
    name: '罗根·格里姆纳', status: '太空野狼大狼 / 战团长', attributes: {
      weaponSkill: 115, ballisticSkill: 105, strength: 150, // 100 +5(幸存) +45(护甲)
      toughness: 105, // 100 +5
      agility: 75, // 95 +5(幸存) -25(护甲)
      intelligence: 95, perception: 100, willpower: 130, // 100 +5(幸存) +25(护甲)
      fellowship: 100
    }, trait: '死亡天使, 芬里斯之狼, 大狼威仪, 莫凯之选, 英雄之躯, 百战幸存, 荒野求生, 体型·大型', skill: '指挥, 战术, 魅力, 警觉, 普通知识·阿斯塔特修会', equipment: '莫凯之斧, 暴风爆弹枪, 埃癸斯之铠', tags: ['帝国', '阿斯塔特', '英雄', '大狼', '太空野狼'], ahp: 45, hp: 21, maxHp: 21, armorRating: 14, movement: 8, baseMeleeDamage: '7 (S/20)', resistance: 'Extreme', weaponStats: '莫凯之斧, 暴风爆弹枪'
  }, // 士官（精工MK VII甲，百战幸存）
  'space_wolves_sergeant': {
    name: '太空野狼士官', status: '小队战识 (太空野狼)', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 90, // 65 +5 +20
      toughness: 80, // 75 +5
      agility: 82, // 77 +5
      intelligence: 68, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 68
    }, trait: '死亡天使, 芬里斯之狼, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力拳套, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '太空野狼'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 老兵（福波斯甲，百战幸存）
  'space_wolves_veteran': {
    name: '太空野狼先锐老兵', status: '星海本能 (太空野狼)', attributes: {
      weaponSkill: 80, ballisticSkill: 78, strength: 72, // 52 +5 +15
      toughness: 72, // 67 +5
      agility: 85, intelligence: 68, perception: 88, // 73 +15
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 芬里斯之狼, 星海本能, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '太空野狼'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 渗透者（福波斯甲）
  'space_wolves_primaris_infiltrator': {
    name: '太空野狼渗透者', status: '暗影原铸 (太空野狼)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 62, perception: 82, // 67 +15
      willpower: 72, fellowship: 50
    }, trait: '死亡天使, 芬里斯之狼, 原铸改造, 暗影渗透, 荒野求生, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '太空野狼'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 标准原铸仲裁者（战术甲，百战幸存）
  'space_wolves_primaris_intercessor': {
    name: '太空野狼仲裁者 (标准原铸)', status: '钢铁防线 (太空野狼)', attributes: {
      weaponSkill: 80, ballisticSkill: 82, strength: 87, // 62 +5 +20
      toughness: 80, // 75 +5
      agility: 75, intelligence: 62, perception: 78, // 68 +10
      willpower: 83, // 73 +5 +5
      fellowship: 58
    }, trait: '死亡天使, 芬里斯之狼, 原铸改造, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '太空野狼'], ahp: 22, hp: 16, maxHp: 16, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲，百战幸存）
  'space_wolves_primaris_hellblaster': {
    name: '太空野狼地狱火战士', status: '毁灭之光 (太空野狼)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 90, // 65 +5 +20
      toughness: 78, // 73 +5
      agility: 65, intelligence: 62, perception: 82, // 72 +10
      willpower: 82, // 72 +5 +5
      fellowship: 55
    }, trait: '死亡天使, 芬里斯之狼, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '太空野狼'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，百战幸存）
  'space_wolves_primaris_aggressor': {
    name: '太空野狼重装火兵', status: '重装毁灭 (太空野狼)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 100, // 70 +5 +25
      toughness: 88, // 83 +5
      agility: 22, // 47 +5 -30
      intelligence: 58, perception: 65, // 60 +5
      willpower: 77, // 72 +5
      fellowship: 48
    }, trait: '死亡天使, 芬里斯之狼, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '太空野狼'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，百战幸存）
  'space_wolves_destroyer': {
    name: '太空野狼毁灭者', status: '虚空毁灭 (太空野狼)', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 125, // 80 +5 +40
      toughness: 105, // 100 +5
      agility: 23, // 58 +5 -40
      intelligence: 65, perception: 78, willpower: 105, // 85 +5 +15
      fellowship: 50
    }, trait: '死亡天使, 芬里斯之狼, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '太空野狼'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，百战幸存）
  'space_wolves_terminator': {
    name: '太空野狼老兵终结者', status: '虚空毁灭者 (太空野狼)', attributes: {
      weaponSkill: 95, ballisticSkill: 90, strength: 130, // 85 +5 +40
      toughness: 110, // 105 +5
      agility: 35, // 60 +5 -30
      intelligence: 68, perception: 80, willpower: 110, // 90 +5 +15
      fellowship: 52
    }, trait: '死亡天使, 芬里斯之狼, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '太空野狼'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，百战幸存）
  'space_wolves_destroyer_veteran': {
    name: '太空野狼毁灭者老兵', status: '重型清洗者 (太空野狼)', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 125, // 90 +5 +30
      toughness: 115, // 110 +5
      agility: 55, // 50 +5, 移动力5-2=3
      intelligence: 72, perception: 88, willpower: 100, // 95 +5
      fellowship: 55
    }, trait: '死亡天使, 芬里斯之狼, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '太空野狼'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（百夫长甲，百战幸存）
  'space_wolves_centurion': {
    name: '太空野狼百夫长', status: '移动堡垒 (太空野狼)', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 130, // 95 +5 +30
      toughness: 120, // 115 +5
      agility: 55, intelligence: 75, perception: 90, willpower: 105, // 100 +5
      fellowship: 58
    }, trait: '死亡天使, 芬里斯之狼, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '太空野狼'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 药剂师（MK VII甲）
  'space_wolves_apothecary': {
    name: '太空野狼药剂师', status: '基因守护者 (太空野狼)', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 85, perception: 82, // 72 +10
      willpower: 80, // 75 +5
      fellowship: 60
    }, trait: '死亡天使, 芬里斯之狼, 守护职责, 战地急救, 荒野求生, 体型·大型', skill: '医疗, 逻辑, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '太空野狼'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 技术军士（MK VII甲）
  'space_wolves_techmarine': {
    name: '太空野狼技术军士', status: '机械先行者 (太空野狼)', attributes: {
      weaponSkill: 70, ballisticSkill: 68, strength: 82, // 62 +20
      toughness: 75, agility: 48, // 63 -15
      intelligence: 88, perception: 82, // 72 +10
      willpower: 72, // 67 +5
      fellowship: 50
    }, trait: '死亡天使, 芬里斯之狼, 机械修复, 多功能操作, 工业直觉, 体型·大型', skill: '评估, 逻辑, 调查, 普通知识·技术', equipment: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术支持', '太空野狼'], ahp: 20, hp: 15, maxHp: 15, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪'
  }, // 智库（MK VII甲）
  'space_wolves_librarian': {
    name: '太空野狼智库', status: '虚空灵能者 (太空野狼)', attributes: {
      weaponSkill: 72, ballisticSkill: 68, strength: 80, // 60 +20
      toughness: 72, agility: 55, // 70 -15
      intelligence: 105, perception: 88, // 78 +10
      willpower: 115, // 110 +5
      fellowship: 60
    }, trait: '死亡天使, 芬里斯之狼, 虚空扭曲, 荒野求生, 体型·大型', skill: '灵能掌控, 祈求, 逻辑, 调查, 能量通道', equipment: '灵能剑, 灵能兜帽, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '灵能者', '太空野狼'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 阿斯塔特爆弹枪'
  }, // 牧师（精工MK VII甲）
  'space_wolves_chaplain': {
    name: '太空野狼牧师', status: '执政官意志 (太空野狼)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 88, // 68 +20
      toughness: 72, agility: 72, intelligence: 68, perception: 80, // 70 +10
      willpower: 98, // 93 +5
      fellowship: 80
    }, trait: '死亡天使, 芬里斯之狼, 狂怒祷言, 不屈核心, 荒野求生, 体型·大型', skill: '指挥, 恐吓, 魅力', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '太空野狼'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 连长（圣物MK VII甲，百战幸存）
  'space_wolves_captain': {
    name: '太空野狼连长', status: '虚空领主 (太空野狼)', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 125, // 95 +5 +25
      toughness: 105, // 100 +5
      agility: 105, // 95 +5 +5
      intelligence: 90, perception: 115, // 100 +15
      willpower: 125, // 105 +5 +15
      fellowship: 100
    }, trait: '死亡天使, 芬里斯之狼, 执政官权威, 英雄之躯, 荒野求生, 百战幸存, 体型·大型', skill: '指挥, 魅力, 战术', equipment: '圣物MK VII 型动力甲, 泰拉型动力剑, 精工Mk II“日怒”型等离子手枪', tags: ['帝国', '阿斯塔特', '英雄', '太空野狼'], ahp: 26, hp: 21, maxHp: 21, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '精工Mk II“日怒”型等离子手枪, 泰拉型动力剑'
  }, // 无畏（无畏甲）
  'space_wolves_dreadnought': {
    name: '太空野狼古老无畏', status: '钢铁执政官 (太空野狼)', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 80, perception: 110, // 95 +15
      willpower: 110, // 100 +10
      fellowship: 50
    }, trait: '死亡天使, 芬里斯之狼, 不朽生命, 荒野求生, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 双联激光炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '太空野狼'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联激光炮, 无畏型动力爪'
  }
};
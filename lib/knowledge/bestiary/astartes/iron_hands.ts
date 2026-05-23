import { NPCProfile } from '../../../../types';

/**
 * 钢铁之手 (Iron Hands) - 钢铁意志，肉体苦弱
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
 * - 正式星际战士/无畏：主派系死亡天使 + 战团钢铁之躯
 * - 侦察兵（含原铸）：仅钢铁之躯，无死亡天使
 * - 钢铁之躯提供「机械化·初级」特质，故不再额外列出机械化·初级，但可保留更高级别的机械化特质
 * - 移除其他派系特质（如圣典公民），保留通用特质
 * - 拥有百战幸存的单位：最终属性已包含 S+5, T+5, Ag+5, WP+5
 */
export const IRON_HANDS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'iron_hands_scout': {
    name: '钢铁之手侦察兵', status: '新兵 (钢铁之手)', attributes: {
      weaponSkill: 55, ballisticSkill: 60, // 基础50 + 钢铁之躯在特定条件下BS+25，但不常驻，这里取较佳射击基础
      strength: 55, toughness: 55, agility: 58, intelligence: 55, perception: 58, willpower: 55, fellowship: 45
    }, trait: '钢铁之躯, 逻辑至上, 机械化·初级, 多臂, 体型·普通', // 保留通用特质
    skill: '潜行, 追迹, 调查', equipment: '侦察兵复合板甲, 狙击爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '侦察兵', '钢铁之手'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '狙击爆弹枪, 阿斯塔特格斗刀'
  }, // 正式战士（MK VII甲）
  'iron_hands_tactical_marine': {
    name: '钢铁之手战术修士', status: '逻辑执行者', attributes: {
      weaponSkill: 75, ballisticSkill: 78, // 较高BS，基础58+20? 实际需计算护甲加成：力量+20, 感知+10, 意志+5, 敏捷-15
      strength: 78, // 58 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 70, perception: 72, // 62 +10
      willpower: 72, // 67 +5
      fellowship: 50
    }, trait: '死亡天使, 钢铁之躯, 逻辑至上, 机械化·中级, 多臂, 体型·大型', skill: '普通知识·技术, 战术, 修复, 机械改造体', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '钢铁之手'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特格斗刀'
  }, // 仲裁者（原铸，战术甲）
  'iron_hands_intercessor': {
    name: '钢铁之手仲裁者', status: '原铸之铁', attributes: {
      weaponSkill: 78, ballisticSkill: 82, // 62 +20
      strength: 82, // 62 +20
      toughness: 78, agility: 72, intelligence: 65, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 55
    }, trait: '死亡天使, 钢铁之躯, 原铸改造, 机械化·中级, 多臂, 体型·大型', skill: '战术, 修复, 警觉, 机械改造体', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '钢铁之手'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪'
  }, // 技术军士（精工MK VII甲，百战幸存）
  'iron_hands_techmarine': {
    name: '钢铁之手技术军士', status: '齿心誓约', attributes: {
      weaponSkill: 75, ballisticSkill: 80, // 60 +20
      strength: 90, // 65 +5(幸存) +20
      toughness: 80, // 75 +5
      agility: 75, // 70 +5
      intelligence: 95, perception: 82, // 72 +10
      willpower: 85, // 75 +5(幸存) +5
      fellowship: 50
    }, trait: '死亡天使, 钢铁之躯, 百战幸存, 逻辑至上, 机械化·高级, 多臂, 体型·大型', skill: '修复, 机械维修, 普通知识·技术, 战术, 逻辑分析, 机械改造体', equipment: '精工MK VII 型动力甲, 万机神之斧, 精工阿斯塔特爆弹手枪, 伺服臂组', tags: ['帝国', '阿斯塔特', '技术神甫', '钢铁之手'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '万机神之斧, 精工阿斯塔特爆弹手枪, 伺服臂组'
  }, // 钢铁之父（圣物MK VII甲，百战幸存）
  'iron_hands_iron_father': {
    name: '钢铁之父', status: '战团统领', attributes: {
      weaponSkill: 110, ballisticSkill: 115, // 使用机械武器时BS+25，此处为常态高值
      strength: 125, // 95 +5(幸存) +25
      toughness: 105, // 100 +5
      agility: 105, // 95 +5(幸存) +5
      intelligence: 110, perception: 115, // 100 +15
      willpower: 125, // 105 +5(幸存) +15
      fellowship: 80
    }, trait: '死亡天使, 钢铁之躯, 百战幸存, 逻辑至上, 机械化·高级, 多臂, 体型·大型', skill: '指挥, 战术, 修复, 机械维修, 普通知识·技术, 机械改造体', equipment: '圣物MK VII 型动力甲, 圣物万机神之斧, 圣物爆弹步枪, 伺服臂组', tags: ['帝国', '阿斯塔特', '英雄', '钢铁之手'], ahp: 26, hp: 21, maxHp: 21, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '圣物万机神之斧, 圣物爆弹步枪, 伺服臂组'
  }, // 毁灭者（MK VII甲）
  'iron_hands_devastator': {
    name: '钢铁之手毁灭者', status: '逻辑歼灭', attributes: {
      weaponSkill: 72, ballisticSkill: 85, // 65 +20
      strength: 78, // 58 +20
      toughness: 72, agility: 50, // 65 -15
      intelligence: 65, perception: 75, // 65 +10
      willpower: 72, // 67 +5
      fellowship: 48
    }, trait: '死亡天使, 钢铁之躯, 机械化·中级, 多臂, 自动支撑, 体型·大型', skill: '战术, 修复, 警觉, 普通知识·技术, 机械改造体', equipment: 'MK VII 型动力甲, 重型爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '重火支援', '钢铁之手'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '重型爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 尊者无畏（无畏甲）
  'iron_hands_dreadnought': {
    name: '钢铁之手尊者无畏', status: '钢铁永存', attributes: {
      weaponSkill: 105, ballisticSkill: 110, // 85 +25(特质) 或通过高基础
      strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 85, perception: 110, // 95 +15
      willpower: 110, // 100 +10
      fellowship: 45
    }, trait: '死亡天使, 钢铁之躯, 不朽生命, 自动支撑, 机械化·高级, 多臂, 体型·超大', skill: '战术, 恐吓, 修理, 普通知识·战争, 机械改造体', equipment: '无畏机甲, 双联激光炮, 无畏型动力拳', tags: ['帝国', '阿斯塔特', '无畏机甲', '英雄', '钢铁之手'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '双联激光炮, 无畏型动力拳'
  }, // 原铸侦察兵（无死亡天使）
  'iron_hands_primaris_scout': {
    name: '钢铁之手侦察快遣兵 (原铸)', status: '移动阴影 (钢铁之手)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15(福波斯甲)
      toughness: 60, agility: 72, intelligence: 60, perception: 78, // 63 +15
      willpower: 62, fellowship: 48
    }, trait: '钢铁之躯, 原铸改造, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '钢铁之手'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 士官（精工MK VII甲，百战幸存）
  'iron_hands_sergeant': {
    name: '钢铁之手士官', status: '小队战识 (钢铁之手)', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 90, // 65 +5(幸存) +20
      toughness: 80, // 75 +5
      agility: 82, // 77 +5
      intelligence: 72, perception: 82, // 72 +10
      willpower: 82, // 72 +5(幸存) +5
      fellowship: 62
    }, trait: '死亡天使, 钢铁之躯, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力拳套, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '钢铁之手'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 老兵（福波斯甲，百战幸存）
  'iron_hands_veteran': {
    name: '钢铁之手先锐老兵', status: '虚空先锋 (钢铁之手)', attributes: {
      weaponSkill: 80, ballisticSkill: 78, strength: 72, // 52 +5(幸存) +15
      toughness: 72, // 67 +5
      agility: 85, // 80 +5
      intelligence: 70, perception: 88, // 73 +15
      willpower: 78, // 73 +5
      fellowship: 55
    }, trait: '死亡天使, 钢铁之躯, 机械化·中级, 多臂, 虚空先锋, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '钢铁之手'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 渗透者（福波斯甲）
  'iron_hands_primaris_infiltrator': {
    name: '钢铁之手渗透者', status: '暗影原铸 (钢铁之手)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 62, perception: 82, // 67 +15
      willpower: 72, fellowship: 48
    }, trait: '死亡天使, 钢铁之躯, 原铸改造, 机械化·中级, 多臂, 暗影渗透, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '钢铁之手'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 标准原铸仲裁者（战术甲）
  'iron_hands_primaris_intercessor': {
    name: '钢铁之手仲裁者 (标准原铸)', status: '钢铁防线 (钢铁之手)', attributes: {
      weaponSkill: 80, ballisticSkill: 82, strength: 82, // 62 +20
      toughness: 78, agility: 72, intelligence: 62, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 55
    }, trait: '死亡天使, 钢铁之躯, 原铸改造, 机械化·中级, 多臂, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '钢铁之手'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲，百战幸存）
  'iron_hands_primaris_hellblaster': {
    name: '钢铁之手地狱火战士', status: '毁灭之光 (钢铁之手)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 90, // 65 +5(幸存) +20
      toughness: 78, // 73 +5
      agility: 65, // 60 +5
      intelligence: 62, perception: 82, // 72 +10
      willpower: 82, // 72 +5(幸存) +5
      fellowship: 52
    }, trait: '死亡天使, 钢铁之躯, 原铸改造, 机械化·中级, 多臂, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '钢铁之手'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，百战幸存）
  'iron_hands_primaris_aggressor': {
    name: '钢铁之手重装火兵', status: '重装毁灭 (钢铁之手)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 100, // 70 +5(幸存) +25
      toughness: 88, // 83 +5
      agility: 22, // 47 +5 -30
      intelligence: 58, perception: 65, // 60 +5
      willpower: 77, // 72 +5
      fellowship: 48
    }, trait: '死亡天使, 钢铁之躯, 原铸改造, 机械化·高级, 多臂, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '钢铁之手'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，百战幸存）
  'iron_hands_destroyer': {
    name: '钢铁之手毁灭者', status: '虚空毁灭 (钢铁之手)', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 125, // 80 +5(幸存) +40
      toughness: 105, // 100 +5
      agility: 23, // 58 +5 -40
      intelligence: 65, perception: 78, willpower: 105, // 85 +5(幸存) +15
      fellowship: 50
    }, trait: '死亡天使, 钢铁之躯, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '钢铁之手'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，百战幸存）
  'iron_hands_terminator': {
    name: '钢铁之手老兵终结者', status: '虚空毁灭者 (钢铁之手)', attributes: {
      weaponSkill: 95, ballisticSkill: 90, strength: 130, // 85 +5(幸存) +40
      toughness: 110, // 105 +5
      agility: 35, // 60 +5 -30
      intelligence: 68, perception: 80, willpower: 110, // 90 +5(幸存) +15
      fellowship: 52
    }, trait: '死亡天使, 钢铁之躯, 机械化·中级, 多臂, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '钢铁之手'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，百战幸存）
  'iron_hands_destroyer_veteran': {
    name: '钢铁之手毁灭者老兵', status: '重型清洗者 (钢铁之手)', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 125, // 90 +5(幸存) +30
      toughness: 115, // 110 +5
      agility: 55, // 50 +5 → 移动力5-2=3
      intelligence: 72, perception: 88, willpower: 100, // 95 +5
      fellowship: 55
    }, trait: '死亡天使, 钢铁之躯, 钢铁长城, 机械化·中级, 多臂, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '钢铁之手'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（百夫长甲，百战幸存）
  'iron_hands_centurion': {
    name: '钢铁之手百夫长', status: '移动堡垒 (钢铁之手)', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 130, // 95 +5(幸存) +30
      toughness: 120, // 115 +5
      agility: 55, intelligence: 75, perception: 90, willpower: 105, // 100 +5
      fellowship: 58
    }, trait: '死亡天使, 钢铁之躯, 钢铁长城, 机械化·中级, 多臂, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '钢铁之手'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 药剂师（MK VII甲）
  'iron_hands_apothecary': {
    name: '钢铁之手药剂师', status: '基因守护者 (钢铁之手)', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 85, perception: 82, // 72 +10
      willpower: 80, // 75 +5
      fellowship: 55
    }, trait: '死亡天使, 钢铁之躯, 守护职责, 机械化·中级, 多臂, 战地急救, 逻辑至上, 体型·大型', skill: '医疗, 逻辑, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '钢铁之手'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 智库（MK VII甲）
  'iron_hands_librarian': {
    name: '钢铁之手智库', status: '虚空灵能者 (钢铁之手)', attributes: {
      weaponSkill: 72, ballisticSkill: 68, strength: 80, // 60 +20
      toughness: 72, agility: 55, // 70 -15
      intelligence: 105, perception: 88, // 78 +10
      willpower: 115, // 110 +5
      fellowship: 55
    }, trait: '死亡天使, 钢铁之躯, 虚空扭曲, 机械化·中级, 多臂, 逻辑至上, 体型·大型', skill: '祈求, 逻辑, 调查, 灵能掌控, 能量通道', equipment: '灵能剑, 灵能兜帽, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '灵能者', '钢铁之手'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 阿斯塔特爆弹枪'
  }, // 牧师（精工MK VII甲）
  'iron_hands_chaplain': {
    name: '钢铁之手牧师', status: '执政官意志 (钢铁之手)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 88, // 68 +20
      toughness: 72, agility: 72, intelligence: 68, perception: 80, // 70 +10
      willpower: 98, // 93 +5
      fellowship: 75
    }, trait: '死亡天使, 钢铁之躯, 狂怒祷言, 不屈核心, 机械化·中级, 多臂, 逻辑至上, 体型·大型', skill: '指挥, 恐吓, 魅力', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '钢铁之手'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 连长（圣物MK VII甲，百战幸存）
  'iron_hands_captain': {
    name: '钢铁之手连长', status: '虚空领主 (钢铁之手)', attributes: {
      weaponSkill: 110, ballisticSkill: 105, strength: 125, // 95 +5(幸存) +25
      toughness: 105, // 100 +5
      agility: 105, // 95 +5(幸存) +5
      intelligence: 100, perception: 115, // 100 +15
      willpower: 125, // 105 +5(幸存) +15
      fellowship: 90
    }, trait: '死亡天使, 钢铁之躯, 执政官权威, 机械化·中级, 多臂, 英雄之躯, 逻辑至上, 百战幸存, 体型·大型', skill: '指挥, 魅力, 战术', equipment: '圣物MK VII 型动力甲, 泰拉型动力剑, 精工Mk II“日怒”型等离子手枪', tags: ['帝国', '阿斯塔特', '英雄', '钢铁之手'], ahp: 26, hp: 21, maxHp: 21, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '精工Mk II“日怒”型等离子手枪, 泰拉型动力剑'
  }
};
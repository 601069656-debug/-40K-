import { NPCProfile } from '../../../../types';

/**
 * 黑色执政官 (Black Archons) - 虚空之速
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - Mk X 福波斯型动力甲: AR 6, AHP 18, 力量+15, 感知+15
 * - MK VII 型动力甲: AR 7, AHP 20, 力量+20, 感知+10, 意志+5, 敏捷-15
 * - 精工MK VII 型动力甲: AR 8, AHP 22, 力量+20, 感知+10, 意志+5
 * - 圣物MK VII 型动力甲: AR 9, AHP 26, 力量+25, 感知+15, 意志+15, 敏捷+5
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - Mk X 格拉维斯型动力甲: AR 9, AHP 26, 力量+25, 感知+5, 敏捷-30
 * - 不屈型战术无畏装甲: AR 12, AHP 35, 力量+40, 意志+15, 敏捷-40
 * - 精工不屈型战术无畏装甲: AR 13, AHP 38, 力量+40, 意志+15, 敏捷-30
 * - 百夫长装甲: AR 14, AHP 45, 力量+30, 移动力-2
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 */
export const BLACK_ARCHONS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（新兵，极度敏捷与感知）
  'black_archons_scout': {
    name: '黑色执政官侦察兵', status: '新兵', attributes: {
      weaponSkill: 50, ballisticSkill: 55, strength: 55, toughness: 55, agility: 65, intelligence: 45, perception: 65, willpower: 55, fellowship: 45
    }, trait: '虚空之速, 星海本能, 体型·普通', skill: '潜行, 追迹, 调查', equipment: '侦察兵复合板甲, 狙击爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '侦察兵', '黑色执政官'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '狙击爆弹枪, 阿斯塔特格斗刀'
  }, // 原铸侦察兵（高敏高感知）
  'black_archons_primaris_scout': {
    name: '黑色执政官侦察快遣兵 (原铸)', status: '移动阴影', attributes: {
      weaponSkill: 60, ballisticSkill: 70, strength: 60, // 45 +15(福波斯甲)
      toughness: 60, agility: 75, intelligence: 55, perception: 80, // 65 +15(福波斯甲)
      willpower: 60, fellowship: 50
    }, trait: '原铸改造, 虚空之速, 星海本能, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '黑色执政官'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 正式战士（MK VII甲，速度被抵消但仍较快）
  'black_archons_marine': {
    name: '黑色执政官战士', status: '虚空之速', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 80, // 60 +20(MK VII)
      toughness: 75, agility: 65, // 80 -15
      intelligence: 60, perception: 75, // 65 +10
      willpower: 75, // 70 +5
      fellowship: 55
    }, trait: '死亡天使, 虚空之速, 星海本能, 体型·大型', skill: '闪避, 特技, 战术', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '黑色执政官'], ahp: 20, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 士官（精工MK VII，近战与指挥）
  'black_archons_sergeant': {
    name: '黑色执政官士官', status: '小队战识', attributes: {
      weaponSkill: 80, ballisticSkill: 75, strength: 85, // 65 +20
      toughness: 80, agility: 80, intelligence: 65, perception: 80, // 70 +10
      willpower: 80, // 75 +5
      fellowship: 70
    }, trait: '死亡天使, 战术核心, 虚空之速, 隧道之子, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力爪, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '黑色执政官'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力爪, 精工阿斯塔特爆弹手枪'
  }, // 先锐老兵（福波斯甲，潜行突袭）
  'black_archons_veteran': {
    name: '黑色执政官先锐老兵', status: '虚空先锋', attributes: {
      weaponSkill: 75, ballisticSkill: 80, strength: 65, // 50 +15
      toughness: 70, agility: 85, intelligence: 70, perception: 85, // 70 +15
      willpower: 75, fellowship: 60
    }, trait: '死亡天使, 虚空先锋, 虚空之速, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '黑色执政官'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 瑞扎型动力剑'
  }, // 渗透者（原铸福波斯甲，暗影行动）
  'black_archons_primaris_infiltrator': {
    name: '黑色执政官渗透者', status: '暗影原铸', attributes: {
      weaponSkill: 65, ballisticSkill: 70, strength: 65, // 50 +15
      toughness: 65, agility: 85, intelligence: 65, perception: 85, // 70 +15
      willpower: 70, fellowship: 55
    }, trait: '原铸改造, 暗影渗透, 虚空之速, 隧道之子, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '黑色执政官'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 仲裁者（标准原铸战术甲）
  'black_archons_primaris_intercessor': {
    name: '黑色执政官仲裁者 (标准原铸)', status: '钢铁防线', attributes: {
      weaponSkill: 70, ballisticSkill: 75, strength: 80, // 60 +20
      toughness: 75, agility: 70, intelligence: 60, perception: 75, // 65 +10
      willpower: 75, // 70 +5
      fellowship: 60
    }, trait: '原铸改造, 虚空之速, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '黑色执政官'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（原铸重火力，意志坚定）
  'black_archons_primaris_hellblaster': {
    name: '黑色执政官地狱火战士', status: '毁灭之光', attributes: {
      weaponSkill: 65, ballisticSkill: 85, strength: 85, // 65 +20
      toughness: 80, agility: 60, intelligence: 55, perception: 80, // 70 +10
      willpower: 80, // 75 +5
      fellowship: 50
    }, trait: '原铸改造, 死亡天使, 虚空之速, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '黑色执政官'], ahp: 22, hp: 16, maxHp: 16, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，极强力量，极低敏捷）
  'black_archons_primaris_aggressor': {
    name: '黑色执政官重装火兵', status: '重装毁灭', attributes: {
      weaponSkill: 75, ballisticSkill: 70, strength: 95, // 70 +25(格拉维斯甲)
      toughness: 85, agility: 10, // 40 -30
      intelligence: 55, perception: 65, // 60 +5
      willpower: 75, fellowship: 45
    }, trait: '原铸改造, 隧道之子, 连射压制, 死亡天使, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '黑色执政官'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 2, // floor(10/10)=1
    baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，终结者）
  'black_archons_destroyer': {
    name: '黑色执政官毁灭者', status: '虚空毁灭', attributes: {
      weaponSkill: 90, ballisticSkill: 90, strength: 120, // 80 +40(不屈甲)
      toughness: 100, agility: 20, // 60 -40
      intelligence: 70, perception: 85, willpower: 100, // 85 +15
      fellowship: 55
    }, trait: '死亡天使, 终结者意志, 隧道之子, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '黑色执政官'], ahp: 35, hp: 20, maxHp: 20, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，更高敏捷）
  'black_archons_terminator': {
    name: '黑色执政官老兵终结者', status: '虚空毁灭者', attributes: {
      weaponSkill: 95, ballisticSkill: 95, strength: 125, // 85 +40
      toughness: 105, agility: 35, // 65 -30
      intelligence: 75, perception: 90, willpower: 105, // 90 +15
      fellowship: 60
    }, trait: '死亡天使, 终结者意志, 星海本能, 虚空之速, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '黑色执政官'], ahp: 38, hp: 21, maxHp: 21, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长装甲，移动堡垒）
  'black_archons_destroyer_veteran': {
    name: '黑色执政官毁灭者老兵', status: '重型清洗者', attributes: {
      weaponSkill: 100, ballisticSkill: 100, strength: 120, // 90 +30(百夫长)
      toughness: 110, agility: 55, intelligence: 80, perception: 95, willpower: 95, fellowship: 55
    }, trait: '钢铁长城, 终结者意志, 百战幸存, 虚空之速, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '黑色执政官'], ahp: 45, hp: 22, maxHp: 22, armorRating: 14, movement: 4, // floor(55/10)=5 -2
    baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（类似毁灭者老兵）
  'black_archons_centurion': {
    name: '黑色执政官百夫长', status: '移动堡垒', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 125, // 95 +30
      toughness: 115, agility: 50, intelligence: 85, perception: 100, willpower: 100, fellowship: 60
    }, trait: '钢铁长城, 终结者意志, 百战幸存, 虚空之速, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '黑色执政官'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 药剂师（智力高，医疗）
  'black_archons_apothecary': {
    name: '黑色执政官药剂师', status: '基因守护者', attributes: {
      weaponSkill: 65, ballisticSkill: 65, strength: 75, // 55 +20(MK VII)
      toughness: 70, agility: 55, // 70 -15
      intelligence: 85, perception: 80, // 70 +10
      willpower: 80, // 75 +5
      fellowship: 60
    }, trait: '守护职责, 战地急救, 逻辑至上, 死亡天使, 虚空之速, 体型·大型', skill: '医疗, 逻辑, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '黑色执政官'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 技术军士（智力极高，伺服臂）
  'black_archons_techmarine': {
    name: '黑色执政官技术军士', status: '机械先行者', attributes: {
      weaponSkill: 65, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 70, agility: 45, // 60 -15
      intelligence: 90, perception: 85, // 75 +10
      willpower: 75, // 70 +5
      fellowship: 50
    }, trait: '机械修复, 多功能操作, 工业直觉, 死亡天使, 虚空之速, 体型·大型', skill: '评估, 逻辑, 调查, 普通知识·技术', equipment: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术支持', '黑色执政官'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪'
  }, // 智库（高意志高智力）
  'black_archons_librarian': {
    name: '黑色执政官智库', status: '虚空灵能者', attributes: {
      weaponSkill: 65, ballisticSkill: 65, strength: 75, // 55 +20
      toughness: 70, agility: 55, // 70 -15
      intelligence: 95, perception: 90, // 80 +10
      willpower: 105, // 100 +5
      fellowship: 60
    }, trait: '虚空扭曲, 星海本能, 死亡天使, 虚空之速, 体型·大型', skill: '祈求, 逻辑, 调查, 灵能掌控, 能量通道', equipment: '灵能剑, 灵能兜帽, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '灵能者', '黑色执政官'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '灵能剑, 阿斯塔特爆弹枪'
  }, // 牧师（精工MK VII，意志与社交极高）
  'black_archons_chaplain': {
    name: '黑色执政官牧师', status: '执政官意志', attributes: {
      weaponSkill: 80, ballisticSkill: 70, strength: 85, // 65 +20
      toughness: 75, agility: 70, intelligence: 70, perception: 85, // 75 +10
      willpower: 95, // 90 +5
      fellowship: 85
    }, trait: '狂怒祷言, 不屈核心, 隧道之子, 死亡天使, 体型·大型', skill: '指挥, 恐吓, 魅力', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '黑色执政官'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 连长（圣物甲，敏捷与力量兼备）
  'black_archons_captain': {
    name: '黑色执政官连长', status: '虚空领主', attributes: {
      weaponSkill: 100, ballisticSkill: 100, strength: 105, // 80 +25(圣物MK VII)
      toughness: 100, agility: 105, // 100 +5
      intelligence: 100, perception: 115, // 100 +15
      willpower: 125, // 110 +15
      fellowship: 110
    }, trait: '执政官权威, 英雄之躯, 隧道之子, 死亡天使, 百战幸存, 体型·大型', skill: '指挥, 魅力, 战术', equipment: '圣物MK VII 型动力甲, 瑞扎型动力剑, 精工Mk II“日怒”型等离子手枪', tags: ['帝国', '阿斯塔特', '英雄', '黑色执政官'], ahp: 26, hp: 20, maxHp: 20, armorRating: 9, movement: 11, baseMeleeDamage: '5 (S/20)', weaponStats: '精工Mk II“日怒”型等离子手枪, 瑞扎型动力剑'
  }, // 无畏（古老机甲）
  'black_archons_dreadnought': {
    name: '黑色执政官古老无畏', status: '钢铁执政官', attributes: {
      weaponSkill: 110, ballisticSkill: 110, strength: 140, // 90 +50(无畏机甲)
      toughness: 120, agility: 50, intelligence: 80, perception: 115, // 100 +15
      willpower: 120, // 110 +10
      fellowship: 60
    }, trait: '虚空之速, 不朽生命, 圣典公民, 死亡天使, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 双联激光炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '黑色执政官'], ahp: 60, hp: 24, maxHp: 24, armorRating: 15, movement: 7, baseMeleeDamage: '7 (S/20)', weaponStats: '机甲型突击炮, 双联激光炮, 无畏型动力爪'
  }
};
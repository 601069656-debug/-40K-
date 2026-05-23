import { NPCProfile } from '../../../../types';

/**
 * 圣洁天使 (Angels Halo) - 血色圣战 (Crimson Crusade)
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - 精工Mk X 战术型动力甲: AR 8, AHP 24, 力量+20, 感知+10, 意志+5, 敏捷+5
 * - 精工MK VII 型动力甲: AR 8, AHP 22, 力量+20, 感知+10, 意志+5
 * - 圣物Mk X 战术型动力甲: AR 9, AHP 28, 力量+25, 感知+15, 意志+15, 敏捷+10
 * - Mk X 福波斯型动力甲: AR 6, AHP 18, 力量+15, 感知+15
 * - Mk X 格拉维斯型动力甲: AR 9, AHP 26, 力量+25, 感知+5, 敏捷-30
 * - 不屈型战术无畏装甲: AR 12, AHP 35, 力量+40, 意志+15, 敏捷-40
 * - 精工不屈型战术无畏装甲: AR 13, AHP 38, 力量+40, 意志+15, 敏捷-30
 * - 百夫长装甲: AR 14, AHP 45, 力量+30, 移动力-2
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 */
export const ANGELS_HALO_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（新兵，侧重潜行与敏捷）
  'angels_halo_scout': {
    name: '圣洁天使侦察兵', status: '受誓学徒', attributes: {
      weaponSkill: 55, ballisticSkill: 60, strength: 65, toughness: 60, agility: 65, intelligence: 50, perception: 60, willpower: 55, fellowship: 50
    }, trait: '血色圣战, 隧道之子, 体型·普通', skill: '潜行, 战术, 警觉, 闪避, 战斗训练', equipment: '侦察兵复合板甲, 精工阿斯塔特爆弹手枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '新兵', '侦察兵', '圣洁天使'], ahp: 20, hp: 12, maxHp: 12, armorRating: 6, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '精工阿斯塔特爆弹手枪, 阿斯塔特格斗刀'
  }, // 战斗修士（正式修士，均衡）
  'angels_halo_marine': {
    name: '圣洁天使战斗修士', status: '正式修士', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 75, // 55 +20(护甲)
      toughness: 75, agility: 70, intelligence: 60, perception: 75, // 65 +10(护甲)
      willpower: 75, // 70 +5(护甲)
      fellowship: 60
    }, trait: '死亡天使, 血色圣战, 强壮体魄, 体型·大型', skill: '战斗训练, 战术, 闪避, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 阿斯塔特链锯剑', tags: ['帝国', '阿斯塔特', '标准', '圣洁天使'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特链锯剑'
  }, // 先锋老兵（第一连精英，敏捷提升）
  'angels_halo_veteran': {
    name: '圣洁天使先锋老兵', status: '第一连精英', attributes: {
      weaponSkill: 85, ballisticSkill: 80, strength: 80, // 60 +20
      toughness: 80, agility: 70, // 65 +5
      intelligence: 65, perception: 80, // 70 +10
      willpower: 80, // 75 +5
      fellowship: 70
    }, trait: '死亡天使, 血色圣战, 百战荣勋, 百战幸存, 体型·大型', skill: '战斗训练, 战术, 指挥, 闪避, 警觉', equipment: '精工Mk X 战术型动力甲, 精工Mk II“日怒”型等离子手枪, 瑞扎型动力剑', tags: ['帝国', '阿斯塔特', '老兵', '精英', '圣洁天使'], ahp: 24, hp: 16, maxHp: 16, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '精工Mk II“日怒”型等离子手枪, 瑞扎型动力剑'
  }, // 牧师（信仰基石，意志与社交极高）
  'angels_halo_chaplain': {
    name: '圣洁天使牧师', status: '信仰基石', attributes: {
      weaponSkill: 80, ballisticSkill: 70, strength: 80, // 60 +20
      toughness: 75, agility: 65, intelligence: 70, perception: 80, // 70 +10
      willpower: 90, // 85 +5
      fellowship: 80
    }, trait: '死亡天使, 血色圣战, 狂怒祷言, 骑士精神, 体型·大型', skill: '战斗训练, 祈祷, 恐吓, 指挥, 战术', equipment: '玫瑰念珠, 克洛休斯权杖, 精工阿斯塔特爆弹手枪, 精工Mk VII 型动力甲', tags: ['传说', '帝国', '阿斯塔特', '牧师', '圣洁天使'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 连长（英雄，属性巅峰）
  'angels_halo_captain': {
    name: '圣洁天使连长', status: '远征指挥官', attributes: {
      weaponSkill: 100, ballisticSkill: 100, strength: 100, // 75 +25
      toughness: 100, agility: 90, // 80 +10
      intelligence: 90, perception: 100, // 85 +15
      willpower: 105, // 90 +15
      fellowship: 100
    }, trait: '死亡天使, 血色圣战, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 魅力, 战斗训练', equipment: '圣物Mk X 战术型动力甲, 精工雷霆锤, 暴风盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '英雄', '指挥官', '圣洁天使'], ahp: 28, hp: 20, maxHp: 20, armorRating: 9, movement: 10, baseMeleeDamage: '5 (S/20)', weaponStats: '精工雷霆锤, 精工阿斯塔特爆弹手枪'
  }, // 药剂师（医疗专精）
  'angels_halo_apothecary': {
    name: '圣洁天使药剂师', status: '基因回收者', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 75, // 55 +20
      toughness: 70, agility: 70, intelligence: 80, perception: 80, // 70 +10
      willpower: 80, // 75 +5
      fellowship: 60
    }, trait: '死亡天使, 血色圣战, 战地急救, 圣典公民, 体型·大型', skill: '医疗, 战术, 警觉, 战斗训练', equipment: 'Mk X 战术型动力甲, 护道器, 阿斯塔特格斗刀, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '药剂师', '圣洁天使'], ahp: 22, hp: 14, maxHp: 14, armorRating: 7, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特格斗刀, 精工阿斯塔特爆弹手枪'
  }, // 技术军士（智力与机械专精）
  'angels_halo_techmarine': {
    name: '圣洁天使技术军士', status: '机械修士', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 80, // 60 +20
      toughness: 70, agility: 60, intelligence: 85, perception: 75, // 65 +10
      willpower: 75, // 70 +5
      fellowship: 50
    }, trait: '死亡天使, 血色圣战, 机魂亲和, 机械化·初级, 工业直觉, 多功能操作, 体型·大型', skill: '修理, 逻辑, 战术, 战斗训练', equipment: 'Mk X 战术型动力甲, 伺服臂组, 动力斧, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '技术员', '圣洁天使'], ahp: 22, hp: 14, maxHp: 14, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 动力斧, 阿斯塔特爆弹枪'
  }, // 智库（灵能专精，高意志高智力）
  'angels_halo_librarian': {
    name: '圣洁天使智库', status: '亚空间哨兵', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 75, // 55 +20
      toughness: 75, agility: 70, intelligence: 90, perception: 85, // 75 +10
      willpower: 100, // 95 +5
      fellowship: 60
    }, trait: '死亡天使, 血色圣战, 星海本能, 体型·大型', skill: '灵能掌控, 战术, 禁忌知识·亚空间, 战斗训练, 能量通道', equipment: 'Mk X 战术型动力甲, 灵能兜帽, 灵能法杖, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '灵能者', '圣洁天使'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '灵能法杖, 精工阿斯塔特爆弹手枪'
  }, // 无畏（不朽卫士，非载具）
  'angels_halo_dreadnought': {
    name: '圣洁天使重装无畏', status: '不朽卫士', attributes: {
      weaponSkill: 110, ballisticSkill: 110, strength: 130, // 80 +50(无畏机甲)
      toughness: 120, agility: 70, intelligence: 80, perception: 105, // 90 +15(无畏机甲)
      willpower: 110, // 100 +10(无畏机甲)
      fellowship: 60
    }, trait: '死亡天使, 百战荣勋, 百战幸存, 体型·超大', skill: '战术, 警觉, 指挥, 战斗训练', equipment: '无畏机甲, 机甲型突击炮, 无畏型动力爪, 暴风爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '机甲', '圣洁天使'], ahp: 60, hp: 24, maxHp: 24, armorRating: 15, movement: 9, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 无畏型动力爪, 暴风爆弹枪'
  }, // 原铸侦察兵（高敏潜行）
  'angels_halo_primaris_scout': {
    name: '圣洁天使侦察快遣兵 (原铸)', status: '移动阴影 (圣洁天使)', attributes: {
      weaponSkill: 65, ballisticSkill: 75, strength: 60, // 45 +15(福波斯甲)
      toughness: 65, agility: 85, intelligence: 60, perception: 85, // 70 +15(福波斯甲)
      willpower: 65, fellowship: 50
    }, trait: '原铸改造, 血色圣战, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '圣洁天使'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 士官（小队领导者，偏重近战与指挥）
  'angels_halo_sergeant': {
    name: '圣洁天使士官', status: '小队战识 (圣洁天使)', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 85, // 65 +20(精工MK VII)
      toughness: 85, agility: 75, intelligence: 70, perception: 85, // 75 +10(精工MK VII)
      willpower: 85, // 80 +5(精工MK VII)
      fellowship: 75
    }, trait: '死亡天使, 血色圣战, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 闪电爪, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '圣洁天使'], ahp: 22, hp: 17, maxHp: 17, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '闪电爪, 精工阿斯塔特爆弹手枪'
  }, // 渗透者（原铸暗影行动）
  'angels_halo_primaris_infiltrator': {
    name: '圣洁天使渗透者', status: '暗影原铸 (圣洁天使)', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 65, // 50 +15(福波斯甲)
      toughness: 70, agility: 85, intelligence: 65, perception: 90, // 75 +15(福波斯甲)
      willpower: 70, fellowship: 55
    }, trait: '原铸改造, 血色圣战, 暗影渗透, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '圣洁天使'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 仲裁者（标准原铸步兵）
  'angels_halo_primaris_intercessor': {
    name: '圣洁天使仲裁者 (标准原铸)', status: '钢铁防线 (圣洁天使)', attributes: {
      weaponSkill: 75, ballisticSkill: 80, strength: 80, // 60 +20(战术甲)
      toughness: 80, agility: 70, intelligence: 65, perception: 80, // 70 +10(战术甲)
      willpower: 80, // 75 +5(战术甲)
      fellowship: 60
    }, trait: '原铸改造, 血色圣战, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '圣洁天使'], ahp: 22, hp: 16, maxHp: 16, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（原铸重火力）
  'angels_halo_primaris_hellblaster': {
    name: '圣洁天使地狱火战士', status: '毁灭之光 (圣洁天使)', attributes: {
      weaponSkill: 70, ballisticSkill: 85, strength: 85, // 65 +20(战术甲)
      toughness: 85, agility: 65, intelligence: 60, perception: 85, // 75 +10(战术甲)
      willpower: 80, // 75 +5(战术甲)
      fellowship: 55
    }, trait: '原铸改造, 血色圣战, 死亡天使, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '圣洁天使'], ahp: 22, hp: 17, maxHp: 17, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，极端力量）
  'angels_halo_primaris_aggressor': {
    name: '圣洁天使重装火兵', status: '重装毁灭 (圣洁天使)', attributes: {
      weaponSkill: 80, ballisticSkill: 75, strength: 95, // 70 +25(格拉维斯甲)
      toughness: 90, agility: 20, // 50 -30(格拉维斯甲)
      intelligence: 60, perception: 75, // 70 +5(格拉维斯甲)
      willpower: 75, fellowship: 50
    }, trait: '原铸改造, 血色圣战, 连射压制, 死亡天使, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '圣洁天使'], ahp: 26, hp: 18, maxHp: 18, armorRating: 9, movement: 3, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（终结者老兵）
  'angels_halo_destroyer': {
    name: '圣洁天使毁灭者', status: '虚空毁灭 (圣洁天使)', attributes: {
      weaponSkill: 100, ballisticSkill: 100, strength: 120, // 80 +40(不屈甲)
      toughness: 110, agility: 20, // 60 -40(不屈甲)
      intelligence: 80, perception: 90, // 不屈甲无感知加成
      willpower: 105, // 90 +15(不屈甲)
      fellowship: 60
    }, trait: '死亡天使, 血色圣战, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '圣洁天使'], ahp: 35, hp: 22, maxHp: 22, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，略高机动）
  'angels_halo_terminator': {
    name: '圣洁天使老兵终结者', status: '虚空毁灭者 (圣洁天使)', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 125, // 85 +40(精工不屈甲)
      toughness: 115, agility: 40, // 70 -30(精工不屈甲)
      intelligence: 85, perception: 95, willpower: 110, // 95 +15(精工不屈甲)
      fellowship: 65
    }, trait: '死亡天使, 血色圣战, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '圣洁天使'], ahp: 38, hp: 23, maxHp: 23, armorRating: 13, movement: 5, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长装甲，移动堡垒）
  'angels_halo_destroyer_veteran': {
    name: '圣洁天使毁灭者老兵', status: '重型清洗者 (圣洁天使)', attributes: {
      weaponSkill: 110, ballisticSkill: 110, strength: 130, // 100 +30(百夫长甲)
      toughness: 120, agility: 50, intelligence: 85, perception: 100, willpower: 100, fellowship: 60
    }, trait: '钢铁长城, 血色圣战, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '圣洁天使'], ahp: 45, hp: 24, maxHp: 24, armorRating: 14, movement: 6, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（移动堡垒，装备同百夫长装甲）
  'angels_halo_centurion': {
    name: '圣洁天使百夫长', status: '移动堡垒 (圣洁天使)', attributes: {
      weaponSkill: 115, ballisticSkill: 115, strength: 135, // 105 +30(百夫长甲)
      toughness: 125, agility: 50, intelligence: 90, perception: 100, willpower: 105, fellowship: 60
    }, trait: '钢铁长城, 血色圣战, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '圣洁天使'], ahp: 45, hp: 25, maxHp: 25, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }
};
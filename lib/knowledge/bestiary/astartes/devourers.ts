import { NPCProfile } from '../../../../types';

/**
 * 吞噬者 (Devourers) - 噬魂饥渴
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
 * - 正式星际战士/无畏：主派系死亡天使 + 战团噬魂饥渴
 * - 侦察兵（含原铸侦察兵）：仅噬魂饥渴，无死亡天使
 * - 渗透者、掠夺者等若为正式战士，仍需携带死亡天使
 * - 移除其他派系特质，保留通用特质（如百战幸存、荒野求生等）
 */
export const DEVOURERS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'devourers_scout': {
    name: '吞噬者侦察兵', status: '潜伏野兽', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 55, intelligence: 48, perception: 55, willpower: 55, fellowship: 42
    }, trait: '噬魂饥渴, 荒野求生, 体型·普通', skill: '潜行, 追迹, 调查', equipment: '侦察兵复合板甲, 阿斯塔特霰弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '侦察兵', '吞噬者'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '阿斯塔特霰弹枪, 阿斯塔特格斗刀'
  }, // 原铸侦察兵（无死亡天使）
  'devourers_primaris_scout': {
    name: '吞噬者侦察快遣兵 (原铸)', status: '移动阴影 (吞噬者)', attributes: {
      weaponSkill: 60, ballisticSkill: 62, strength: 60, // 45 +15
      toughness: 60, agility: 72, intelligence: 55, perception: 75, // 60 +15
      willpower: 62, fellowship: 45
    }, trait: '噬魂饥渴, 原铸改造, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '吞噬者'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 正式战士（MK VII甲）
  'devourers_marine': {
    name: '吞噬者战士', status: '噬魂饥渴', attributes: {
      weaponSkill: 75, ballisticSkill: 70, strength: 78, // 58 +20
      toughness: 70, agility: 52, // 67 -15
      intelligence: 55, perception: 72, // 62 +10
      willpower: 72, // 67 +5
      fellowship: 48
    }, trait: '死亡天使, 噬魂饥渴, 荒野求生, 体型·大型', skill: '战术, 恐吓', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '吞噬者'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 5, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪'
  }, // 士官（精工MK VII甲，百战幸存）
  'devourers_sergeant': {
    name: '吞噬者士官', status: '小队战识 (吞噬者)', attributes: {
      weaponSkill: 85, ballisticSkill: 78, strength: 90, // 65 +5(幸存) +20
      toughness: 78, // 73 +5
      agility: 80, // 75 +5 (无惩罚)
      intelligence: 62, perception: 82, // 72 +10
      willpower: 82, // 72 +5(幸存) +5
      fellowship: 58
    }, trait: '死亡天使, 噬魂饥渴, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力拳套, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '吞噬者'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 先锋老兵（精工MK VII甲，百战幸存）
  'devourers_vanguard_veteran': {
    name: '吞噬者先锋老兵', status: '杀戮化身', attributes: {
      weaponSkill: 88, ballisticSkill: 72, strength: 95, // 70 +5 +20
      toughness: 82, // 77 +5
      agility: 85, // 80 +5
      intelligence: 65, perception: 85, // 75 +10
      willpower: 88, // 78 +5 +5
      fellowship: 55
    }, trait: '死亡天使, 噬魂饥渴, 百战幸存, 荒野求生, 体型·大型', skill: '特技, 闪避, 战术', equipment: '精工MK VII 型动力甲, 双联闪电爪, 阿斯塔特喷气背包', tags: ['帝国', '阿斯塔特', '老兵', '精英', '吞噬者'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '双联闪电爪'
  }, // 仲裁者（Mk X战术甲）
  'devourers_primaris_intercessor': {
    name: '吞噬者仲裁者 (原铸)', status: '钢铁饥渴', attributes: {
      weaponSkill: 78, ballisticSkill: 80, strength: 82, // 62 +20
      toughness: 75, agility: 70, intelligence: 60, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 55
    }, trait: '死亡天使, 噬魂饥渴, 原铸改造, 体型·大型', skill: '攀爬, 战术', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 阿斯塔特链锯剑', tags: ['帝国', '阿斯塔特', '原铸', '吞噬者'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 阿斯塔特链锯剑'
  }, // 掠夺者（福波斯甲，正式战士）
  'devourers_primaris_reiver': {
    name: '吞噬者掠夺者 (恐怖原铸)', status: '恐惧之源', attributes: {
      weaponSkill: 72, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 68, agility: 80, intelligence: 58, perception: 82, // 67 +15
      willpower: 72, fellowship: 45
    }, trait: '死亡天使, 噬魂饥渴, 原铸改造, 恐怖波动, 体型·大型', skill: '潜行, 恐吓, 特技', equipment: 'Mk X 福波斯型动力甲, 重型爆弹手枪, 阿斯塔特格斗刀, 震慑手雷', tags: ['帝国', '阿斯塔特', '原铸', '恐怖', '吞噬者'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '重型爆弹手枪, 阿斯塔特格斗刀, 震慑手雷'
  }, // 攻城百夫长（百夫长甲，百战幸存）
  'devourers_centurion': {
    name: '吞噬者攻城百夫长', status: '移动绞肉机', attributes: {
      weaponSkill: 100, ballisticSkill: 95, strength: 125, // 90 +5(幸存) +30
      toughness: 115, // 110 +5
      agility: 50, // 45 +5 移动力5-2=3
      intelligence: 72, perception: 88, willpower: 100, // 95 +5
      fellowship: 52
    }, trait: '死亡天使, 噬魂饥渴, 钢铁长城, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 无畏型动力拳', tags: ['帝国', '阿斯塔特', '精英', '百夫长', '吞噬者'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 无畏型动力拳'
  }, // 药剂师（MK VII甲）
  'devourers_apothecary': {
    name: '吞噬者药剂师', status: '鲜血祭司', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 70, agility: 52, // 67 -15
      intelligence: 82, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 55
    }, trait: '死亡天使, 噬魂饥渴, 守护职责, 战地急救, 体型·大型', skill: '医疗, 评估, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '吞噬者'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 技术军士（MK VII甲）
  'devourers_techmarine': {
    name: '吞噬者技术军士', status: '机械屠夫', attributes: {
      weaponSkill: 70, ballisticSkill: 65, strength: 82, // 62 +20
      toughness: 72, agility: 48, // 63 -15
      intelligence: 88, perception: 82, // 72 +10
      willpower: 72, // 67 +5
      fellowship: 48
    }, trait: '死亡天使, 噬魂饥渴, 机械修复, 多功能操作, 体型·大型', skill: '评估, 逻辑, 普通知识·战争', equipment: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术支持', '吞噬者'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 4, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪'
  }, // 智库（MK VII甲）
  'devourers_librarian': {
    name: '吞噬者智库', status: '血脉先知', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 70, agility: 55, // 70 -15
      intelligence: 105, perception: 88, // 78 +10
      willpower: 115, // 110 +5
      fellowship: 52
    }, trait: '死亡天使, 噬魂饥渴, 血祭感应, 体型·大型', skill: '躲藏, 特技, 柔术, 祈求, 警觉, 灵能掌控, 能量通道', equipment: '灵能剑, 灵能兜帽, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '灵能者', '吞噬者'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 精工阿斯塔特爆弹手枪'
  }, // 牧师（精工MK VII甲）
  'devourers_chaplain': {
    name: '吞噬者牧师', status: '仇恨引路人', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 88, // 68 +20
      toughness: 72, agility: 72, intelligence: 68, perception: 80, // 70 +10
      willpower: 98, // 93 +5
      fellowship: 80
    }, trait: '死亡天使, 噬魂饥渴, 狂怒祷言, 仇恨锚点, 体型·大型', skill: '指挥, 恐吓, 魅力', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '吞噬者'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 连长（圣物MK VII甲，百战幸存）
  'devourers_captain': {
    name: '吞噬者连长', status: '剥皮领主', attributes: {
      weaponSkill: 110, ballisticSkill: 100, strength: 125, // 95 +5(幸存) +25
      toughness: 105, // 100 +5
      agility: 105, // 95 +5(幸存) +5
      intelligence: 90, perception: 115, // 100 +15
      willpower: 130, // 110 +5(幸存) +15
      fellowship: 95
    }, trait: '死亡天使, 噬魂饥渴, 杀戮领主, 英雄之躯, 百战幸存, 荒野求生, 体型·大型', skill: '指挥, 恐吓, 战术', equipment: '圣物MK VII 型动力甲, 瑞扎型动力剑, 精工阿斯塔特爆弹手枪, 圣教符文', tags: ['帝国', '阿斯塔特', '英雄', '吞噬者'], ahp: 26, hp: 21, maxHp: 21, armorRating: 9, movement: 10, baseMeleeDamage: '6 (S/20)', weaponStats: '精工阿斯塔特爆弹手枪, 瑞扎型动力剑'
  }, // 无畏（无畏甲）
  'devourers_dreadnought': {
    name: '吞噬者古老无畏', status: '永恒饥渴', attributes: {
      weaponSkill: 100, ballisticSkill: 100, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 70, perception: 110, // 95 +15
      willpower: 110, // 100 +10
      fellowship: 48
    }, trait: '死亡天使, 噬魂饥渴, 粉碎冲锋, 不朽生命, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 机甲型突击炮, 无畏型动力爪, 导弹巢', tags: ['帝国', '阿斯塔特', '无畏机甲', '吞噬者'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 无畏型动力爪'
  }, // 先锐老兵（福波斯甲，百战幸存）
  'devourers_veteran': {
    name: '吞噬者先锐老兵', status: '虚空先锋 (吞噬者)', attributes: {
      weaponSkill: 80, ballisticSkill: 78, strength: 72, // 52 +5(幸存) +15
      toughness: 72, // 67 +5
      agility: 85, // 80 +5
      intelligence: 68, perception: 88, // 73 +15
      willpower: 78, // 73 +5
      fellowship: 55
    }, trait: '死亡天使, 噬魂饥渴, 虚空先锋, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '吞噬者'], ahp: 18, hp: 14, maxHp: 14, armorRating: 6, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 渗透者（福波斯甲，正式战士）
  'devourers_primaris_infiltrator': {
    name: '吞噬者渗透者', status: '暗影原铸 (吞噬者)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 60, perception: 82, // 67 +15
      willpower: 72, fellowship: 48
    }, trait: '死亡天使, 噬魂饥渴, 原铸改造, 暗影渗透, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '吞噬者'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 地狱火战士（战术甲，百战幸存）
  'devourers_primaris_hellblaster': {
    name: '吞噬者地狱火战士', status: '毁灭之光 (吞噬者)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 90, // 65 +5(幸存) +20
      toughness: 78, // 73 +5
      agility: 65, // 60 +5
      intelligence: 62, perception: 82, // 72 +10
      willpower: 82, // 72 +5(幸存) +5
      fellowship: 52
    }, trait: '死亡天使, 噬魂饥渴, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '吞噬者'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，百战幸存）
  'devourers_primaris_aggressor': {
    name: '吞噬者重装火兵', status: '重装毁灭 (吞噬者)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 100, // 70 +5(幸存) +25
      toughness: 88, // 83 +5
      agility: 22, // 47 +5 -30
      intelligence: 58, perception: 65, // 60 +5
      willpower: 77, // 72 +5
      fellowship: 48
    }, trait: '死亡天使, 噬魂饥渴, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '吞噬者'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 2, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，百战幸存）
  'devourers_destroyer': {
    name: '吞噬者毁灭者', status: '虚空毁灭 (吞噬者)', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 125, // 80 +5(幸存) +40
      toughness: 105, // 100 +5
      agility: 23, // 58 +5 -40
      intelligence: 65, perception: 78, willpower: 105, // 85 +5(幸存) +15
      fellowship: 50
    }, trait: '死亡天使, 噬魂饥渴, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '吞噬者'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，百战幸存）
  'devourers_terminator': {
    name: '吞噬者老兵终结者', status: '虚空毁灭者 (吞噬者)', attributes: {
      weaponSkill: 95, ballisticSkill: 90, strength: 130, // 85 +5(幸存) +40
      toughness: 110, // 105 +5
      agility: 35, // 60 +5 -30
      intelligence: 68, perception: 80, willpower: 110, // 90 +5(幸存) +15
      fellowship: 52
    }, trait: '死亡天使, 噬魂饥渴, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力爪, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '吞噬者'], ahp: 38, hp: 22, maxHp: 22, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力爪, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，百战幸存）
  'devourers_destroyer_veteran': {
    name: '吞噬者毁灭者老兵', status: '重型清洗者 (吞噬者)', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 125, // 90 +5(幸存) +30
      toughness: 115, // 110 +5
      agility: 55, // 50 +5 移动力5-2=3
      intelligence: 72, perception: 88, willpower: 100, // 95 +5
      fellowship: 55
    }, trait: '死亡天使, 噬魂饥渴, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '吞噬者'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }
};
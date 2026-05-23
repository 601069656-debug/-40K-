import { NPCProfile } from '../../../../types';

/**
 * 帝国之拳 (Imperial Fists) - 不动要塞
 *
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - MK VII 型动力甲: AR 7, AHP 20, 力量+20, 感知+10, 意志+5, 敏捷-15
 * - 精工MK VII 型动力甲: AR 8, AHP 22, 力量+20, 感知+10, 意志+5 (无敏捷惩罚)
 * - 圣物Mk X 战术型动力甲: AR 9, AHP 28, 力量+25, 感知+15, 意志+15, 敏捷+10
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - Mk X 福波斯型动力甲: AR 6, AHP 18, 力量+15, 感知+15
 * - Mk X 格拉维斯型动力甲: AR 9, AHP 26, 力量+25, 感知+5, 敏捷-30
 * - 不屈型战术无畏装甲: AR 12, AHP 35, 力量+40, 意志+15, 敏捷-40, 移动力减半
 * - 百夫长装甲: AR 14, AHP 45, 力量+30, 移动力-2
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 *
 * 特质规则：
 * - 正式星际战士/无畏：主派系死亡天使 + 战团不动要塞
 * - 侦察兵（含原铸）：仅不动要塞，无死亡天使
 * - 保留通用特质，移除其他派系特质（如圣典公民）
 * - 拥有百战幸存的单位：最终属性已包含 S+5, T+5, Ag+5, WP+5
 */
export const IMPERIAL_FISTS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'imperial_fists_scout': {
    name: '帝国之拳侦察兵', status: '受誓学徒', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 58, intelligence: 50, perception: 60, willpower: 55, fellowship: 48
    }, trait: '不动要塞, 隧道之子, 体型·普通', skill: '潜行, 战术, 警觉, 闪避', equipment: '侦察兵复合板甲, 狙击爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '新兵', '侦察兵', '帝国之拳'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '狙击爆弹枪, 阿斯塔特格斗刀'
  }, // 战术修士（MK VII甲）
  'imperial_fists_marine': {
    name: '帝国之拳战术修士', status: '正式修士', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 78, // 58 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 60, perception: 72, // 62 +10
      willpower: 72, // 67 +5
      fellowship: 55
    }, trait: '死亡天使, 不动要塞, 隧道之子, 体型·大型', skill: '战斗训练, 战术, 警觉', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '标准', '帝国之拳'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 阿斯塔特格斗刀'
  }, // 仲裁者（原铸，战术甲）
  'imperial_fists_intercessor': {
    name: '帝国之拳仲裁者', status: '原铸战士', attributes: {
      weaponSkill: 78, ballisticSkill: 80, strength: 82, // 62 +20
      toughness: 78, agility: 72, intelligence: 62, perception: 78, // 68 +10
      willpower: 78, // 73 +5
      fellowship: 58
    }, trait: '死亡天使, 不动要塞, 原铸改造, 体型·大型', skill: '战斗训练, 战术, 警觉, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '帝国之拳'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪'
  }, // 重装仲裁者（格拉维斯甲）
  'imperial_fists_heavy_intercessor': {
    name: '帝国之拳重装仲裁者', status: '阵地核心', attributes: {
      weaponSkill: 75, ballisticSkill: 78, strength: 95, // 70 +25
      toughness: 88, agility: 22, // 52 -30
      intelligence: 58, perception: 65, // 60 +5
      willpower: 72, fellowship: 48
    }, trait: '死亡天使, 不动要塞, 原铸改造, 围攻大师, 体型·大型', skill: '战斗训练, 战术（防御）, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 重型爆弹步枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '帝国之拳'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '4 (S/20)', weaponStats: '重型爆弹步枪, 精工阿斯塔特爆弹手枪'
  }, // 老兵军士（圣物Mk X战术甲，百战幸存）
  'imperial_fists_veteran': {
    name: '帝国之拳老兵军士', status: '一连老兵', attributes: {
      weaponSkill: 85, ballisticSkill: 85, strength: 100, // 70 +5(幸存) +25
      toughness: 85, // 80 +5
      agility: 80, // 65 +5(幸存) +10
      intelligence: 70, perception: 90, // 75 +15
      willpower: 95, // 75 +5(幸存) +15
      fellowship: 68
    }, trait: '死亡天使, 不动要塞, 百战幸存, 隧道之子, 体型·大型', skill: '战术, 指挥, 警觉, 闪避', equipment: '圣物Mk X 战术型动力甲, 圣物爆弹步枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '老兵', '帝国之拳'], ahp: 28, hp: 17, maxHp: 17, armorRating: 9, movement: 9, baseMeleeDamage: '5 (S/20)', weaponStats: '圣物爆弹步枪, 阿斯塔特格斗刀'
  }, // 终结者（不屈甲，百战幸存）
  'imperial_fists_terminator': {
    name: '帝国之拳终结者', status: '攻坚勇士', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 125, // 80 +5(幸存) +40
      toughness: 105, // 100 +5
      agility: 23, // 58 +5 -40
      intelligence: 65, perception: 78, willpower: 100, // 80 +5(幸存) +15
      fellowship: 52
    }, trait: '死亡天使, 不动要塞, 终结者意志, 围攻大师, 百战幸存, 体型·大型', skill: '战斗训练, 战术（围攻）, 警觉', equipment: '不屈型战术无畏装甲, 雷霆锤, 暴风盾', tags: ['帝国', '阿斯塔特', '精英', '终结者', '帝国之拳'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤'
  }, // 连长（圣物Mk X战术甲，百战幸存）
  'imperial_fists_captain': {
    name: '帝国之拳连长', status: '要塞指挥官', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 120, // 90 +5(幸存) +25
      toughness: 105, // 100 +5
      agility: 100, // 85 +5(幸存) +10
      intelligence: 90, perception: 115, // 100 +15
      willpower: 125, // 105 +5(幸存) +15
      fellowship: 100
    }, trait: '死亡天使, 不动要塞, 战术核心, 百战幸存, 隧道之子, 英雄之躯, 体型·大型', skill: '指挥, 战术（围攻）, 魅力, 战斗训练', equipment: '圣物Mk X 战术型动力甲, 圣物雷霆锤, 暴风盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '英雄', '指挥官', '帝国之拳'], ahp: 28, hp: 21, maxHp: 21, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '圣物雷霆锤, 精工阿斯塔特爆弹手枪'
  }, // 百夫长（百夫长甲）
  'imperial_fists_centurion': {
    name: '帝国之拳百夫长', status: '攻城铁卫', attributes: {
      weaponSkill: 82, ballisticSkill: 78, strength: 110, // 80 +30
      toughness: 100, agility: 50, // 移动力 = floor(50/10)=5 -2 =3
      intelligence: 70, perception: 80, willpower: 85, fellowship: 55
    }, trait: '死亡天使, 不动要塞, 围攻大师, 体型·大型', skill: '战术（压制）, 警觉, 战斗训练', equipment: '百夫长装甲, 百夫长型重型重力炮, 飓风爆弹枪', tags: ['帝国', '阿斯塔特', '重装', '百夫长', '帝国之拳'], ahp: 45, hp: 20, maxHp: 20, armorRating: 14, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '百夫长型重型重力炮, 飓风爆弹枪'
  }, // 无畏（无畏甲）
  'imperial_fists_dreadnought': {
    name: '帝国之拳铸铁无畏', status: '不朽卫士', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 80, perception: 110, // 95 +15
      willpower: 110, // 100 +10
      fellowship: 50
    }, trait: '死亡天使, 不动要塞, 围攻大师, 体型·超大', skill: '战术, 警觉, 战斗训练', equipment: '无畏机甲, 双联重型爆弹枪, 无畏型动力拳, 重型喷火器', tags: ['帝国', '阿斯塔特', '无畏机甲', '帝国之拳'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '双联重型爆弹枪, 无畏型动力拳, 重型喷火器'
  }, // 原铸侦察兵（无死亡天使）
  'imperial_fists_primaris_scout': {
    name: '帝国之拳侦察快遣兵 (原铸)', status: '移动阴影 (帝国之拳)', attributes: {
      weaponSkill: 62, ballisticSkill: 65, strength: 60, // 45 +15(福波斯甲)
      toughness: 60, agility: 72, intelligence: 58, perception: 78, // 63 +15
      willpower: 62, fellowship: 50
    }, trait: '不动要塞, 原铸改造, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '帝国之拳'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 士官（精工MK VII甲，百战幸存）
  'imperial_fists_sergeant': {
    name: '帝国之拳士官', status: '小队战识 (帝国之拳)', attributes: {
      weaponSkill: 85, ballisticSkill: 82, strength: 90, // 65 +5(幸存) +20
      toughness: 80, // 75 +5
      agility: 82, // 77 +5
      intelligence: 68, perception: 82, // 72 +10
      willpower: 82, // 72 +5(幸存) +5
      fellowship: 68
    }, trait: '死亡天使, 不动要塞, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力拳套, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '帝国之拳'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 渗透者（福波斯甲，正式战士）
  'imperial_fists_primaris_infiltrator': {
    name: '帝国之拳渗透者', status: '暗影原铸 (帝国之拳)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 65, // 50 +15
      toughness: 65, agility: 82, intelligence: 62, perception: 82, // 67 +15
      willpower: 72, fellowship: 50
    }, trait: '死亡天使, 不动要塞, 原铸改造, 暗影渗透, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '帝国之拳'], ahp: 18, hp: 13, maxHp: 13, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 标准原铸仲裁者（战术甲，百战幸存）
  'imperial_fists_primaris_intercessor': {
    name: '帝国之拳仲裁者 (标准原铸)', status: '钢铁防线 (帝国之拳)', attributes: {
      weaponSkill: 80, ballisticSkill: 82, strength: 87, // 62 +5(幸存) +20
      toughness: 80, // 75 +5
      agility: 75, // 70 +5
      intelligence: 62, perception: 78, // 68 +10
      willpower: 83, // 73 +5(幸存) +5
      fellowship: 58
    }, trait: '死亡天使, 不动要塞, 原铸改造, 百战幸存, 体型·大型', skill: '身体素质, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）', tags: ['帝国', '阿斯塔特', '原铸', '标准', '帝国之拳'], ahp: 22, hp: 16, maxHp: 16, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪, 破片手雷（精英版）'
  }, // 地狱火战士（战术甲，百战幸存）
  'imperial_fists_primaris_hellblaster': {
    name: '帝国之拳地狱火战士', status: '毁灭之光 (帝国之拳)', attributes: {
      weaponSkill: 72, ballisticSkill: 85, strength: 90, // 65 +5(幸存) +20
      toughness: 78, // 73 +5
      agility: 65, // 60 +5
      intelligence: 62, perception: 82, // 72 +10
      willpower: 82, // 72 +5(幸存) +5
      fellowship: 55
    }, trait: '死亡天使, 不动要塞, 原铸改造, 工业直觉, 百战幸存, 体型·大型', skill: '战术, 警觉', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '重装火力', '帝国之拳'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 重装火兵（格拉维斯甲，百战幸存）
  'imperial_fists_primaris_aggressor': {
    name: '帝国之拳重装火兵', status: '重装毁灭 (帝国之拳)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 100, // 70 +5(幸存) +25
      toughness: 88, // 83 +5
      agility: 22, // 47 +5 -30
      intelligence: 58, perception: 65, // 60 +5
      willpower: 77, // 72 +5
      fellowship: 48
    }, trait: '死亡天使, 不动要塞, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '帝国之拳'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，百战幸存）
  'imperial_fists_destroyer': {
    name: '帝国之拳毁灭者', status: '虚空毁灭 (帝国之拳)', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 125, // 80 +5(幸存) +40
      toughness: 105, // 100 +5
      agility: 23, // 58 +5 -40
      intelligence: 65, perception: 78, willpower: 105, // 85 +5(幸存) +15
      fellowship: 50
    }, trait: '死亡天使, 不动要塞, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '帝国之拳'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，百战幸存）
  'imperial_fists_destroyer_veteran': {
    name: '帝国之拳毁灭者老兵', status: '重型清洗者 (帝国之拳)', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 125, // 90 +5(幸存) +30
      toughness: 115, // 110 +5
      agility: 55, // 50 +5 移动力5-2=3
      intelligence: 72, perception: 88, willpower: 100, // 95 +5
      fellowship: 55
    }, trait: '死亡天使, 不动要塞, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '帝国之拳'], ahp: 45, hp: 23, maxHp: 23, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 药剂师（MK VII甲）
  'imperial_fists_apothecary': {
    name: '帝国之拳药剂师', status: '基因守护者 (帝国之拳)', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 72, agility: 52, // 67 -15
      intelligence: 85, perception: 82, // 72 +10
      willpower: 80, // 75 +5
      fellowship: 60
    }, trait: '死亡天使, 不动要塞, 守护职责, 战地急救, 隧道之子, 体型·大型', skill: '医疗, 逻辑, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '帝国之拳'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 技术军士（MK VII甲）
  'imperial_fists_techmarine': {
    name: '帝国之拳技术军士', status: '机械先行者 (帝国之拳)', attributes: {
      weaponSkill: 70, ballisticSkill: 68, strength: 82, // 62 +20
      toughness: 75, agility: 48, // 63 -15
      intelligence: 88, perception: 82, // 72 +10
      willpower: 72, // 67 +5
      fellowship: 50
    }, trait: '死亡天使, 不动要塞, 机械修复, 多功能操作, 工业直觉, 体型·大型', skill: '评估, 逻辑, 调查, 普通知识·技术', equipment: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术支持', '帝国之拳'], ahp: 20, hp: 15, maxHp: 15, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 阿斯塔特链锯斧, 精工阿斯塔特爆弹手枪'
  }, // 智库（MK VII甲）
  'imperial_fists_librarian': {
    name: '帝国之拳智库', status: '虚空灵能者 (帝国之拳)', attributes: {
      weaponSkill: 72, ballisticSkill: 68, strength: 80, // 60 +20
      toughness: 72, agility: 55, // 70 -15
      intelligence: 105, perception: 88, // 78 +10
      willpower: 115, // 110 +5
      fellowship: 60
    }, trait: '死亡天使, 不动要塞, 虚空扭曲, 隧道之子, 体型·大型', skill: '祈求, 逻辑, 调查, 灵能掌控, 能量通道', equipment: '灵能剑, 灵能兜帽, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '灵能者', '帝国之拳'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 阿斯塔特爆弹枪'
  }, // 牧师（精工MK VII甲）
  'imperial_fists_chaplain': {
    name: '帝国之拳牧师', status: '执政官意志 (帝国之拳)', attributes: {
      weaponSkill: 78, ballisticSkill: 68, strength: 88, // 68 +20
      toughness: 72, agility: 72, intelligence: 68, perception: 80, // 70 +10
      willpower: 98, // 93 +5
      fellowship: 80
    }, trait: '死亡天使, 不动要塞, 狂怒祷言, 不屈核心, 隧道之子, 体型·大型', skill: '指挥, 恐吓, 魅力', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '帝国之拳'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }
};
import { NPCProfile } from '../../../../types';

/**
 * 根除天使 (Eradication Angels) - 科技亵渎
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
 *
 * 特质规则：
 * - 正式星际战士/无畏：主派系死亡天使 + 战团科技亵渎
 * - 侦察兵（含原铸）：仅科技亵渎，无死亡天使
 * - 移除所有其他派系特质，保留通用特质
 * - 拥有百战幸存的单位：最终属性已包含 S+5, T+5, Ag+5, WP+5
 */
export const ERADICATION_ANGELS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'eradication_angels_scout': {
    name: '根除天使侦察兵', status: '弱点分析', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 55, intelligence: 50, perception: 55, willpower: 55, fellowship: 45
    }, trait: '科技亵渎, 工业直觉, 体型·普通', skill: '警觉, 潜行, 评估', equipment: '侦察兵复合板甲, 阿斯塔特霰弹枪, 阿斯塔特格斗刀, 扫描仪（精工型号）', tags: ['帝国', '阿斯塔特', '侦察兵', '根除天使'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '阿斯塔特霰弹枪, 阿斯塔特格斗刀'
  }, // 战斗修士（MK VII甲）
  'eradication_angels_marine': {
    name: '根除天使战斗修士', status: '灭绝之火', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 75, // 55 +20
      toughness: 55, agility: 50, // 65 -15
      intelligence: 55, perception: 70, // 60 +10
      willpower: 65, // 60 +5
      fellowship: 50
    }, trait: '死亡天使, 科技亵渎, 工业直觉, 体型·大型', skill: '战术, 评估', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 热熔枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '根除天使'], ahp: 20, hp: 11, maxHp: 11, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪, 热熔枪, 精工阿斯塔特爆弹手枪'
  }, // 原铸仲裁者（Mk X战术甲）
  'eradication_angels_primaris_intercessor': {
    name: '根除天使仲裁者', status: '钢铁纪律', attributes: {
      weaponSkill: 70, ballisticSkill: 72, strength: 80, // 60 +20
      toughness: 60, agility: 65, intelligence: 58, perception: 75, // 65 +10
      willpower: 70, // 65 +5
      fellowship: 55
    }, trait: '死亡天使, 科技亵渎, 原铸改造, 体型·大型', skill: '战术, 闪避', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '根除天使'], ahp: 22, hp: 12, maxHp: 12, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪'
  }, // 地狱火战士（Mk X战术甲）
  'eradication_angels_primaris_hellblaster': {
    name: '根除天使地狱火战士', status: '日冕焚烧', attributes: {
      weaponSkill: 68, ballisticSkill: 75, strength: 82, // 62 +20
      toughness: 60, agility: 58, intelligence: 58, perception: 75, // 65 +10
      willpower: 73, // 68 +5
      fellowship: 52
    }, trait: '死亡天使, 科技亵渎, 原铸改造, 体型·大型', skill: '评估, 战术', equipment: 'Mk X 战术型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '精英', '根除天使'], ahp: 22, hp: 12, maxHp: 12, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 根除者（格拉维斯甲）
  'eradication_angels_primaris_eradicator': {
    name: '根除天使根除者', status: '重型熔毁', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 93, // 68 +25
      toughness: 65, agility: 25, // 55 -30
      intelligence: 55, perception: 67, // 62 +5
      willpower: 68, fellowship: 48
    }, trait: '死亡天使, 科技亵渎, 原铸改造, 自动支撑, 体型·大型', skill: '攀爬, 评估', equipment: 'Mk X 格拉维斯型动力甲, 热熔步枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '根除天使'], ahp: 26, hp: 13, maxHp: 13, armorRating: 9, movement: 3, baseMeleeDamage: '4 (S/20)', weaponStats: '热熔步枪, 精工阿斯塔特爆弹手枪'
  }, // 技术军士（MK VII甲）
  'eradication_angels_techmarine': {
    name: '根除天使技术军士', status: '系统拆解者', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 80, // 60 +20
      toughness: 58, agility: 45, // 60 -15
      intelligence: 85, perception: 82, // 72 +10
      willpower: 70, // 65 +5
      fellowship: 48
    }, trait: '死亡天使, 科技亵渎, 机械修复, 反向工程, 体型·大型', skill: '普通知识·战争, 逻辑, 评估', equipment: '伺服臂组, 万机神之斧, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '技术', '根除天使'], ahp: 20, hp: 11, maxHp: 11, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '伺服臂组, 万机神之斧, 精工阿斯塔特爆弹手枪'
  }, // 智库（MK VII甲，百战幸存）
  'eradication_angels_librarian': {
    name: '根除天使智库', status: '电磁裂痕', attributes: {
      weaponSkill: 68, ballisticSkill: 65, strength: 85, // 65 +20
      toughness: 63, agility: 55, // 70 -15
      intelligence: 105, perception: 88, // 78 +10
      willpower: 115, // 110 +5
      fellowship: 60
    }, trait: '死亡天使, 科技亵渎, 百战幸存, 工业直觉, 体型·大型', skill: '祈求, 战术, 调查, 灵能掌控, 能量通道', equipment: '灵能法杖, 灵能兜帽, 精工阿斯塔特爆弹手枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '灵能者', '根除天使'], ahp: 20, hp: 12, maxHp: 12, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能法杖, 精工阿斯塔特爆弹手枪'
  }, // 守望连长（圣物MK VII甲，百战幸存）
  'eradication_angels_captain': {
    name: '根除天使守望连长', status: '根除指令', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 125, // 100 +25
      toughness: 100, agility: 105, // 100 +5
      intelligence: 95, perception: 115, // 100 +15
      willpower: 125, // 110 +15
      fellowship: 95
    }, trait: '死亡天使, 科技亵渎, 英雄之躯, 全谱扫描, 百战幸存, 工业直觉, 体型·大型', skill: '指挥, 战术, 评估', equipment: '圣物MK VII 型动力甲, 泰拉型动力剑, 阿斯塔特爆弹枪, 高级多光谱目镜', tags: ['帝国', '阿斯塔特', '英雄', '指挥官', '根除天使'], ahp: 26, hp: 20, maxHp: 20, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '阿斯塔特爆弹枪, 泰拉型动力剑'
  }, // 救赎者无畏（救赎者型无畏装甲）
  'eradication_angels_dreadnought': {
    name: '根除天使救赎者无畏', status: '根除引擎', attributes: {
      weaponSkill: 100, ballisticSkill: 100, strength: 140, // 80 +60
      toughness: 90, agility: 50, intelligence: 70, perception: 105, // 90 +15
      willpower: 115, // 100 +15
      fellowship: 45
    }, trait: '死亡天使, 科技亵渎, 自动支撑, 体型·超大', skill: '战术, 评估, 警觉', equipment: '救赎者型无畏装甲, 机甲型等离子焚化炉, 机甲型大口径加特林爆弹枪, 无畏型动力爪', tags: ['帝国', '阿斯塔特', '无畏机甲', '英雄', '根除天使'], ahp: 75, hp: 18, maxHp: 18, armorRating: 20, movement: 7, baseMeleeDamage: '7 (S/20)', weaponStats: '机甲型等离子焚化炉, 机甲型大口径加特林爆弹枪, 无畏型动力爪'
  }, // 原铸侦察兵（无死亡天使）
  'eradication_angels_primaris_scout': {
    name: '根除天使侦察快遣兵 (原铸)', status: '移动阴影 (根除天使)', attributes: {
      weaponSkill: 60, ballisticSkill: 62, strength: 57, // 42 +15
      toughness: 55, agility: 68, intelligence: 55, perception: 73, // 58 +15
      willpower: 60, fellowship: 45
    }, trait: '科技亵渎, 原铸改造, 体型·普通', skill: '潜行, 调查, 特技', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '侦察', '根除天使'], ahp: 18, hp: 11, maxHp: 11, armorRating: 6, movement: 7, baseMeleeDamage: '2 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 士官（精工MK VII甲，百战幸存）
  'eradication_angels_sergeant': {
    name: '根除天使士官', status: '小队战识 (根除天使)', attributes: {
      weaponSkill: 87, ballisticSkill: 83, strength: 90, // 70 +20
      toughness: 70, agility: 77, intelligence: 65, perception: 82, // 72 +10
      willpower: 80, // 75 +5
      fellowship: 68
    }, trait: '死亡天使, 科技亵渎, 战术核心, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '精工MK VII 型动力甲, 动力拳套, 精工阿斯塔特爆弹手枪, 鸟卜仪', tags: ['帝国', '阿斯塔特', '士官', '根除天使'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 精工阿斯塔特爆弹手枪'
  }, // 老兵（福波斯甲，百战幸存）
  'eradication_angels_veteran': {
    name: '根除天使先锐老兵', status: '虚空先锋 (根除天使)', attributes: {
      weaponSkill: 80, ballisticSkill: 80, strength: 72, // 57 +15
      toughness: 60, agility: 80, intelligence: 65, perception: 83, // 68 +15
      willpower: 70, fellowship: 55
    }, trait: '死亡天使, 科技亵渎, 虚空先锋, 百战幸存, 体型·大型', skill: '特技, 闪避, 潜行', equipment: 'Mk X 福波斯型动力甲, 瑞扎型动力剑, 消音爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '根除天使'], ahp: 18, hp: 12, maxHp: 12, armorRating: 6, movement: 9, baseMeleeDamage: '3 (S/20)', weaponStats: '瑞扎型动力剑, 消音爆弹枪'
  }, // 渗透者（福波斯甲）
  'eradication_angels_primaris_infiltrator': {
    name: '根除天使渗透者', status: '暗影原铸 (根除天使)', attributes: {
      weaponSkill: 68, ballisticSkill: 68, strength: 63, // 48 +15
      toughness: 55, agility: 78, intelligence: 62, perception: 83, // 68 +15
      willpower: 68, fellowship: 48
    }, trait: '死亡天使, 科技亵渎, 原铸改造, 暗影渗透, 体型·大型', skill: '潜行, 调查, 警觉', equipment: 'Mk X 福波斯型动力甲, 消音爆弹枪, 阿斯塔特格斗刀', tags: ['帝国', '阿斯塔特', '原铸', '根除天使'], ahp: 18, hp: 11, maxHp: 11, armorRating: 6, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '消音爆弹枪, 阿斯塔特格斗刀'
  }, // 重装火兵（格拉维斯甲，百战幸存）
  'eradication_angels_primaris_aggressor': {
    name: '根除天使重装火兵', status: '重装毁灭 (根除天使)', attributes: {
      weaponSkill: 77, ballisticSkill: 67, strength: 95, // 70 +25
      toughness: 73, agility: 23, // 53 -30
      intelligence: 55, perception: 63, // 58 +5
      willpower: 70, fellowship: 45
    }, trait: '死亡天使, 科技亵渎, 原铸改造, 连射压制, 百战幸存, 体型·大型', skill: '恐吓, 战术, 警觉', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '根除天使'], ahp: 26, hp: 14, maxHp: 14, armorRating: 9, movement: 3, baseMeleeDamage: '4 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, // 毁灭者（不屈甲，百战幸存）
  'eradication_angels_destroyer': {
    name: '根除天使毁灭者', status: '虚空毁灭 (根除天使)', attributes: {
      weaponSkill: 87, ballisticSkill: 83, strength: 120, // 80 +40
      toughness: 80, agility: 20, // 60 -40
      intelligence: 62, perception: 68, willpower: 95, // 80 +15
      fellowship: 48
    }, trait: '死亡天使, 科技亵渎, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '不屈型战术无畏装甲, 雷霆锤, 重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '根除天使'], ahp: 35, hp: 16, maxHp: 16, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤, 重型爆弹枪'
  }, // 老兵终结者（精工不屈甲，百战幸存）
  'eradication_angels_terminator': {
    name: '根除天使老兵终结者', status: '虚空毁灭者 (根除天使)', attributes: {
      weaponSkill: 90, ballisticSkill: 85, strength: 125, // 85 +40
      toughness: 85, agility: 30, // 60 -30
      intelligence: 65, perception: 70, willpower: 100, // 85 +15
      fellowship: 50
    }, trait: '死亡天使, 科技亵渎, 终结者意志, 百战幸存, 体型·大型', skill: '战术, 警觉, 恐吓', equipment: '精工不屈型战术无畏装甲, 动力拳套, 双联重型爆弹枪', tags: ['帝国', '阿斯塔特', '精英', '终结者', '老兵', '根除天使'], ahp: 38, hp: 17, maxHp: 17, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '动力拳套, 双联重型爆弹枪'
  }, // 毁灭者老兵（百夫长甲，百战幸存）
  'eradication_angels_destroyer_veteran': {
    name: '根除天使毁灭者老兵', status: '重型清洗者 (根除天使)', attributes: {
      weaponSkill: 100, ballisticSkill: 95, strength: 120, // 90 +30
      toughness: 90, agility: 53, // 移动力 = floor(53/10)=5 -2 =3
      intelligence: 70, perception: 78, willpower: 85, fellowship: 52
    }, trait: '死亡天使, 科技亵渎, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 侦察', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '毁灭者', '根除天使'], ahp: 45, hp: 18, maxHp: 18, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 百夫长（百夫长甲，百战幸存）
  'eradication_angels_centurion': {
    name: '根除天使百夫长', status: '移动堡垒 (根除天使)', attributes: {
      weaponSkill: 105, ballisticSkill: 100, strength: 125, // 95 +30
      toughness: 95, agility: 53, intelligence: 75, perception: 82, willpower: 90, fellowship: 55
    }, trait: '死亡天使, 科技亵渎, 钢铁长城, 终结者意志, 百战幸存, 体型·大型', skill: '指挥, 战术, 警觉', equipment: '百夫长装甲, 机甲型突击炮, 双联重型爆弹枪', tags: ['传说', '帝国', '阿斯塔特', '老兵', '精英', '百夫长', '根除天使'], ahp: 45, hp: 19, maxHp: 19, armorRating: 14, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '机甲型突击炮, 双联重型爆弹枪'
  }, // 药剂师（MK VII甲）
  'eradication_angels_apothecary': {
    name: '根除天使药剂师', status: '基因守护者 (根除天使)', attributes: {
      weaponSkill: 66, ballisticSkill: 65, strength: 78, // 58 +20
      toughness: 58, agility: 50, // 65 -15
      intelligence: 82, perception: 82, // 72 +10
      willpower: 75, // 70 +5
      fellowship: 55
    }, trait: '死亡天使, 科技亵渎, 守护职责, 战地急救, 工业直觉, 体型·大型', skill: '医疗, 逻辑, 调查', equipment: '护道器, 还原者, 阿斯塔特爆弹枪, MK VII 型动力甲', tags: ['帝国', '阿斯塔特', '药剂师', '根除天使'], ahp: 20, hp: 11, maxHp: 11, armorRating: 7, movement: 6, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特爆弹枪'
  }, // 牧师（精工MK VII甲）
  'eradication_angels_chaplain': {
    name: '根除天使牧师', status: '执政官意志 (根除天使)', attributes: {
      weaponSkill: 75, ballisticSkill: 66, strength: 85, // 65 +20
      toughness: 62, agility: 72, intelligence: 68, perception: 82, // 72 +10
      willpower: 95, // 90 +5
      fellowship: 78
    }, trait: '死亡天使, 科技亵渎, 狂怒祷言, 不屈核心, 工业直觉, 体型·大型', skill: '指挥, 恐吓, 魅力', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '根除天使'], ahp: 22, hp: 12, maxHp: 12, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }
};
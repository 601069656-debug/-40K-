import { NPCProfile } from '../../../../types';

/**
 * 黑色圣堂 (Black Templars) - 永恒圣战
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - MK VII 型动力甲: AR 7, AHP 20, 力量+20, 感知+10, 意志+5, 敏捷-15
 * - 精工MK VII 型动力甲: AR 8, AHP 22, 力量+20, 感知+10, 意志+5
 * - 圣物MK VII 型动力甲: AR 9, AHP 26, 力量+25, 感知+15, 意志+15, 敏捷+5
 * - 精工黑色甲胄: AR 9, AHP 26, 力量+25, 感知+10, 意志+20
 * - Mk X 福波斯型动力甲: AR 6, AHP 18, 力量+15, 感知+15
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - 不屈型战术无畏装甲: AR 12, AHP 35, 力量+40, 意志+15, 敏捷-40
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 */
export const BLACK_TEMPLARS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 新兵（侧重近战与意志，敏捷略低）
  'black_templars_neophyte': {
    name: '黑色圣堂新兵', status: '受誓学徒', attributes: {
      weaponSkill: 60, ballisticSkill: 50, strength: 58, toughness: 55, agility: 55, intelligence: 45, perception: 52, willpower: 62, fellowship: 48
    }, trait: '永恒圣战, 圣战冲锋, 骑士精神, 体型·普通', skill: '普通知识·国教, 闪避, 潜行', equipment: '侦察兵复合板甲, 阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '新兵', '黑色圣堂'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪'
  }, // 正式十字军（MK VII甲，力量大增，敏捷惩罚但仍保持一定速度）
  'black_templars_initiate': {
    name: '黑色圣堂发起者', status: '正式十字军', attributes: {
      weaponSkill: 78, ballisticSkill: 65, strength: 82, // 62 +20
      toughness: 72, agility: 58, // 73 -15
      intelligence: 55, perception: 70, // 60 +10
      willpower: 75, // 70 +5
      fellowship: 55
    }, trait: '死亡天使, 永恒圣战, 隧道之子, 圣战冲锋, 体型·大型', skill: '普通知识·国教, 闪避, 战术', equipment: 'MK VII 型动力甲, 阿斯塔特链锯剑, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '黑色圣堂'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特链锯剑, 阿斯塔特爆弹枪'
  }, // 剑之兄弟（精工MK VII，无敏捷惩罚，精英）
  'black_templars_sword_brother': {
    name: '黑色圣堂剑之兄弟', status: '圣堂精英', attributes: {
      weaponSkill: 90, ballisticSkill: 70, strength: 90, // 70 +20
      toughness: 82, agility: 78, intelligence: 65, perception: 80, // 70 +10
      willpower: 85, // 80 +5
      fellowship: 68
    }, trait: '死亡天使, 永恒圣战, 隧道之子, 百战幸存, 圣战冲锋, 体型·大型', skill: '指挥, 战术, 闪避', equipment: '精工MK VII 型动力甲, 瑞扎型动力剑, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '老兵', '黑色圣堂'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '瑞扎型动力剑, 精工阿斯塔特爆弹手枪'
  }, // 帝皇冠军（精工黑色甲胄，力量+25,感知+10,意志+20，无敏捷惩罚）
  'black_templars_emperors_champion': {
    name: '黑色圣堂帝皇冠军', status: '神选勇士', attributes: {
      weaponSkill: 120, ballisticSkill: 80, strength: 125, // 100 +25
      toughness: 110, agility: 105, intelligence: 85, perception: 110, // 100 +10
      willpower: 130, // 110 +20
      fellowship: 90
    }, trait: '死亡天使, 黄金卫士, 英雄之躯, 天皇神启, 永恒圣战, 隧道之子, 百战幸存, 圣战冲锋, 体型·大型', skill: '挑战, 闪避, 意志抵抗', equipment: '精工黑色甲胄, 泰拉型动力剑, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '英雄', '黑色圣堂'], ahp: 26, hp: 22, maxHp: 22, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '泰拉型动力剑, 精工阿斯塔特爆弹手枪'
  }, // 牧师（精工MK VII，极高意志与社交）
  'black_templars_chaplain': {
    name: '黑色圣堂牧师', status: '信仰基石', attributes: {
      weaponSkill: 82, ballisticSkill: 65, strength: 85, // 65 +20
      toughness: 78, agility: 72, intelligence: 72, perception: 82, // 72 +10
      willpower: 98, // 93 +5
      fellowship: 88
    }, trait: '狂怒祷言, 永恒圣战, 圣典公民, 死亡天使, 圣战冲锋, 体型·大型', skill: '指挥, 恐吓, 魅力, 祈祷', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 精工阿斯塔特爆弹手枪, 罗兹利乌斯护盾', tags: ['帝国', '阿斯塔特', '牧师', '黑色圣堂'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, // 元帅（圣物MK VII，敏捷+5，力量+25，意志+15，感知+15）
  'black_templars_marshal': {
    name: '黑色圣堂元帅', status: '远征统帅', attributes: {
      weaponSkill: 115, ballisticSkill: 95, strength: 120, // 95 +25
      toughness: 105, agility: 100, // 95 +5
      intelligence: 90, perception: 115, // 100 +15
      willpower: 125, // 110 +15
      fellowship: 105
    }, trait: '死亡天使, 永恒圣战, 元帅权威, 隧道之子, 百战幸存, 圣战冲锋, 体型·大型', skill: '指挥, 战术, 魅力', equipment: '圣物MK VII 型动力甲, 泰拉型动力剑, 圣物阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '英雄', '黑色圣堂'], ahp: 26, hp: 21, maxHp: 21, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '圣物阿斯塔特爆弹枪, 泰拉型动力剑'
  }, // 原铸新兵（福波斯甲，敏捷感知特化）
  'black_templars_primaris_neophyte': {
    name: '黑色圣堂原铸新兵', status: '受誓学者', attributes: {
      weaponSkill: 68, ballisticSkill: 58, strength: 60, // 45 +15
      toughness: 58, agility: 75, intelligence: 52, perception: 75, // 60 +15
      willpower: 65, fellowship: 55
    }, trait: '原铸改造, 永恒圣战, 圣典公民, 圣战冲锋, 体型·普通', skill: '潜行, 战术, 闪避', equipment: 'Mk X 福波斯型动力甲, 阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '新兵', '黑色圣堂'], ahp: 18, hp: 11, maxHp: 11, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪'
  }, // 仲裁者（战术甲，标准原铸）
  'black_templars_intercessor': {
    name: '黑色圣堂仲裁者', status: '原铸十字军', attributes: {
      weaponSkill: 82, ballisticSkill: 72, strength: 85, // 65 +20
      toughness: 78, agility: 75, intelligence: 60, perception: 78, // 68 +10
      willpower: 82, // 77 +5
      fellowship: 62
    }, trait: '原铸改造, 永恒圣战, 圣典公民, 死亡天使, 圣战冲锋, 体型·大型', skill: '战术, 闪避, 警觉', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '黑色圣堂'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪'
  }, // 原铸剑兄弟（战术甲，精英）
  'black_templars_primaris_sword_brother': {
    name: '黑色圣堂原铸剑兄弟', status: '原铸精英', attributes: {
      weaponSkill: 95, ballisticSkill: 78, strength: 92, // 72 +20
      toughness: 85, agility: 80, intelligence: 68, perception: 85, // 75 +10
      willpower: 90, // 85 +5
      fellowship: 72
    }, trait: '原铸改造, 永恒圣战, 百战幸存, 圣典公民, 死亡天使, 圣战冲锋, 体型·大型', skill: '指挥, 战术, 闪避', equipment: 'Mk X 战术型动力甲, 阿斯塔特格斗刀, 爆弹步枪', tags: ['帝国', '阿斯塔特', '原铸', '老兵', '黑色圣堂'], ahp: 22, hp: 17, maxHp: 17, armorRating: 7, movement: 9, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特格斗刀, 爆弹步枪'
  }, // 无畏（古老机甲，非载具）
  'black_templars_dreadnought': {
    name: '黑色圣堂重装无畏', status: '不朽卫士', attributes: {
      weaponSkill: 105, ballisticSkill: 105, strength: 130, // 80 +50
      toughness: 115, agility: 55, intelligence: 70, perception: 105, // 90 +15
      willpower: 110, // 100 +10
      fellowship: 55
    }, trait: '永恒圣战, 不朽生命, 圣典公民, 死亡天使, 圣战冲锋, 体型·超大', skill: '战术, 恐吓, 警觉', equipment: '无畏机甲, 伏尔甘型热熔枪, 无畏型动力爪', tags: ['帝国', '阿斯塔特', '无畏机甲', '黑色圣堂'], ahp: 60, hp: 23, maxHp: 23, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '伏尔甘型热熔枪, 无畏型动力爪'
  }, // 终结者（不屈甲，极度力量，极低敏捷）
  'black_templars_terminator': {
    name: '黑色圣堂终结者', status: '毁灭之拳', attributes: {
      weaponSkill: 95, ballisticSkill: 80, strength: 125, // 85 +40
      toughness: 105, agility: 35, // 75 -40
      intelligence: 65, perception: 82, willpower: 105, // 90 +15
      fellowship: 60
    }, trait: '死亡天使, 终结者意志, 永恒圣战, 圣战冲锋, 体型·大型', skill: '战术, 警觉', equipment: '不屈型战术无畏装甲, 雷霆锤, 暴风盾', tags: ['帝国', '阿斯塔特', '精英', '终结者', '黑色圣堂'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '雷霆锤'
  }
};
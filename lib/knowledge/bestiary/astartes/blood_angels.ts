import { NPCProfile } from '../../../../types';

/**
 * 圣血天使 (Blood Angels) - 巴尔的优雅死神
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - MK VII 型动力甲: AR 7, AHP 20, 力量+20, 感知+10, 意志+5, 敏捷-15
 * - 精工MK VII 型动力甲: AR 8, AHP 22, 力量+20, 感知+10, 意志+5
 * - 圣物MK VII 型动力甲: AR 9, AHP 26, 力量+25, 感知+15, 意志+15, 敏捷+5
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - 圣物Mk X 战术型动力甲: AR 9, AHP 28, 力量+25, 感知+15, 意志+15, 敏捷+10
 * - Mk X 格拉维斯型动力甲: AR 9, AHP 26, 力量+25, 感知+5, 敏捷-30
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 */
export const BLOOD_ANGELS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'blood_angels_scout_neophyte': {
    name: '圣血天使新兵', status: '受誓学徒', attributes: {
      weaponSkill: 55, ballisticSkill: 45, strength: 55, toughness: 55, agility: 60, intelligence: 45, perception: 55, willpower: 55, fellowship: 45
    }, trait: '血渴狂怒, 荒野求生, 体型·普通', skill: '普通知识·阿斯塔特修会, 闪避, 潜行', equipment: '侦察兵复合板甲, 阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '新兵', '圣血天使'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪'
  }, 'blood_angels_tactical_marine': {
    name: '圣血天使战士', status: '血色刀锋', attributes: {
      weaponSkill: 78, ballisticSkill: 72, strength: 82, // 62 +20
      toughness: 72, agility: 60, // 75 -15
      intelligence: 55, perception: 70, // 60 +10
      willpower: 75, // 70 +5
      fellowship: 55
    }, trait: '死亡天使, 血渴狂怒, 荒野求生, 体型·大型', skill: '普通知识·阿斯塔特修会, 闪避, 战术', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '圣血天使'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, 'blood_angels_assault_marine': {
    name: '圣血天使突击兵', status: '天降死神', attributes: {
      weaponSkill: 82, ballisticSkill: 65, strength: 85, // 65 +20
      toughness: 70, agility: 65, // 80 -15
      intelligence: 52, perception: 70, // 60 +10
      willpower: 73, // 68 +5
      fellowship: 52
    }, trait: '死亡天使, 血渴狂怒, 飞行, 体型·大型', skill: '特技, 闪避, 战术', equipment: 'MK VII 型动力甲, 阿斯塔特喷气背包, 阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '突击', '圣血天使'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪'
  }, 'blood_angels_death_company': {
    name: '圣血天使死亡连成员', status: '黑怒化身', attributes: {
      weaponSkill: 88, ballisticSkill: 55, strength: 92, // 72 +20
      toughness: 78, agility: 53, // 68 -15
      intelligence: 45, perception: 68, // 58 +10
      willpower: 70, // 65 +5
      fellowship: 35
    }, trait: '死亡天使, 黑怒意志, 血渴狂怒, 无尽狂怒, 体型·大型', skill: '恐吓, 战术, 意志抵抗', equipment: 'MK VII 型动力甲, 动力斧, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '精英', '死亡连', '圣血天使'], ahp: 20, hp: 15, maxHp: 15, armorRating: 7, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '动力斧, 精工阿斯塔特爆弹手枪'
  }, 'blood_angels_sanguinary_guard': {
    name: '圣血天使圣血卫队', status: '黄金战神', attributes: {
      weaponSkill: 95, ballisticSkill: 80, strength: 95, // 75 +20
      toughness: 85, agility: 85, intelligence: 70, perception: 90, // 80 +10
      willpower: 90, // 85 +5
      fellowship: 95
    }, trait: '死亡天使, 圣血面具, 飞行, 百战幸存, 荒野求生, 体型·大型', skill: '指挥, 魅力, 闪避', equipment: '精工MK VII 型动力甲, 阿斯塔特喷气背包, 瑞扎型动力剑, 腕部爆弹枪', tags: ['帝国', '阿斯塔特', '老兵', '精英', '圣血天使'], ahp: 22, hp: 17, maxHp: 17, armorRating: 8, movement: 9, baseMeleeDamage: '4 (S/20)', resistance: 'High', weaponStats: '瑞扎型动力剑, 腕部爆弹枪'
  }, 'blood_angels_sanguinary_priest': {
    name: '圣血天使圣血教祭司', status: '圣血守护', attributes: {
      weaponSkill: 75, ballisticSkill: 65, strength: 88, // 68 +20
      toughness: 72, agility: 72, intelligence: 85, perception: 85, // 75 +10
      willpower: 85, // 80 +5
      fellowship: 75
    }, trait: '血杯祝福, 战地急救, 荒野求生, 死亡天使, 血渴狂怒, 体型·大型', skill: '医疗, 逻辑, 评估', equipment: '精工MK VII 型动力甲, 护道器, 阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '药剂师', '圣血天使'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', resistance: 'Medium', weaponStats: '阿斯塔特链锯剑, 精工阿斯塔特爆弹手枪'
  }, 'blood_angels_librarian': {
    name: '圣血天使智库', status: '圣血预言者', attributes: {
      weaponSkill: 70, ballisticSkill: 65, strength: 85, // 65 +20
      toughness: 72, agility: 72, intelligence: 95, perception: 95, // 85 +10
      willpower: 105, // 100 +5
      fellowship: 65
    }, trait: '翼之恩赐, 荒野求生, 死亡天使, 血渴狂怒, 体型·大型', skill: '祈求, 逻辑, 调查, 灵能掌控, 能量通道', equipment: '灵能剑, 灵能兜帽, 精工MK VII 型动力甲, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '灵能者', '圣血天使'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 精工阿斯塔特爆弹手枪'
  }, 'blood_angels_mephiston': {
    name: '首席智库梅菲斯特', status: '死亡之领主', attributes: {
      weaponSkill: 100, ballisticSkill: 95, strength: 110, // 85 +25(圣物Mk X)
      toughness: 100, agility: 105, // 95 +10
      intelligence: 120, perception: 125, // 110 +15
      willpower: 135, // 120 +15
      fellowship: 100
    }, trait: '超越死亡, 血之圣徒, 死亡天使, 百战幸存, 英雄之躯, 体型·大型', skill: '指挥, 战术, 祈求, 逻辑, 调查, 灵魂暴君', equipment: '圣物Mk X 战术型动力甲, 维塔里斯, 灵能兜帽, 圣物Mk II“日怒”型等离子手枪', tags: ['帝国', '阿斯塔特', '英雄', '首席智库', '圣血天使'], ahp: 28, hp: 20, maxHp: 20, armorRating: 9, movement: 11, baseMeleeDamage: '5 (S/20)', weaponStats: '维塔里斯, 圣物Mk II“日怒”型等离子手枪'
  }, 'blood_angels_chaplain': {
    name: '圣血天使牧师', status: '灵魂导师', attributes: {
      weaponSkill: 80, ballisticSkill: 70, strength: 90, // 70 +20
      toughness: 78, agility: 75, intelligence: 70, perception: 90, // 80 +10
      willpower: 100, // 95 +5
      fellowship: 90
    }, trait: '劝解黑怒, 狂怒祷言, 圣典公民, 死亡天使, 血渴狂怒, 体型·大型', skill: '指挥, 魅力, 恐吓', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 罗兹利乌斯护盾, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '牧师', '圣血天使'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '克洛休斯权杖, 精工阿斯塔特爆弹手枪'
  }, 'blood_angels_captain': {
    name: '圣血天使连长', status: '血红领主', attributes: {
      weaponSkill: 110, ballisticSkill: 100, strength: 120, // 95 +25(圣物MK VII)
      toughness: 105, agility: 100, // 95 +5
      intelligence: 95, perception: 115, // 100 +15
      willpower: 125, // 110 +15
      fellowship: 110
    }, trait: '圣血权威, 英雄之躯, 荒野求生, 百战幸存, 死亡天使, 体型·大型', skill: '指挥, 战术, 魅力', equipment: '圣物MK VII 型动力甲, 泰拉型动力剑, 圣物爆弹步枪', tags: ['帝国', '阿斯塔特', '英雄', '圣血天使'], ahp: 26, hp: 21, maxHp: 21, armorRating: 9, movement: 11, baseMeleeDamage: '6 (S/20)', weaponStats: '圣物爆弹步枪, 泰拉型动力剑'
  }, 'blood_angels_dreadnought_furioso': {
    name: '圣血天使狂怒无畏', status: '不朽狂徒', attributes: {
      weaponSkill: 100, ballisticSkill: 90, strength: 130, // 80 +50(无畏机甲)
      toughness: 120, agility: 55, intelligence: 70, perception: 100, // 85 +15
      willpower: 110, // 100 +10
      fellowship: 50
    }, trait: '狂怒冲锋, 不朽生命, 圣典公民, 死亡天使, 血渴狂怒, 体型·超大', skill: '战术, 恐吓', equipment: '无畏机甲, 双联闪电爪', tags: ['帝国', '阿斯塔特', '无畏机甲', '圣血天使'], ahp: 60, hp: 24, maxHp: 24, armorRating: 15, movement: 7, baseMeleeDamage: '6 (S/20)', weaponStats: '双联闪电爪'
  }, 'blood_angels_primaris_intercessor': {
    name: '圣血天使仲裁者', status: '血脉传承', attributes: {
      weaponSkill: 78, ballisticSkill: 75, strength: 85, // 65 +20
      toughness: 78, agility: 75, intelligence: 60, perception: 78, // 68 +10
      willpower: 77, // 72 +5
      fellowship: 60
    }, trait: '原铸改造, 血渴狂怒, 圣典公民, 死亡天使, 体型·大型', skill: '战术, 闪避, 身体素质', equipment: 'Mk X 战术型动力甲, 爆弹步枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '原铸', '标准', '圣血天使'], ahp: 22, hp: 15, maxHp: 15, armorRating: 7, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '爆弹步枪, 精工阿斯塔特爆弹手枪'
  }, 'blood_angels_primaris_inceptor': {
    name: '圣血天使穿刺者', status: '毁灭俯冲', attributes: {
      weaponSkill: 75, ballisticSkill: 80, strength: 95, // 70 +25(格拉维斯甲)
      toughness: 82, agility: 30, // 60 -30
      intelligence: 58, perception: 65, // 60 +5
      willpower: 70, fellowship: 55
    }, trait: '原铸改造, 飞行, 连射压制, 圣典公民, 死亡天使, 血渴狂怒, 体型·大型', skill: '战术, 特技, 射击', equipment: 'Mk X 格拉维斯型动力甲, 原铸拦截式喷气背包, 双持突击爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '突击', '圣血天使'], ahp: 26, hp: 16, maxHp: 16, armorRating: 9, movement: 4, baseMeleeDamage: '4 (S/20)', weaponStats: '双持突击爆弹枪'
  }, 'blood_angels_primaris_aggressor': {
    name: '圣血天使重装火兵', status: '血火洗礼', attributes: {
      weaponSkill: 80, ballisticSkill: 65, strength: 100, // 75 +25
      toughness: 85, agility: 25, // 55 -30
      intelligence: 55, perception: 60, // 55 +5
      willpower: 72, fellowship: 50
    }, trait: '原铸改造, 连射压制, 圣典公民, 死亡天使, 血渴狂怒, 体型·大型', skill: '恐吓, 战术, 特种武器', equipment: 'Mk X 格拉维斯型动力甲, 动力拳套, 阿斯塔特爆弹枪', tags: ['帝国', '阿斯塔特', '原铸', '重装', '圣血天使'], ahp: 26, hp: 17, maxHp: 17, armorRating: 9, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '动力拳套, 阿斯塔特爆弹枪'
  }, "imperium_heroes_astorath": {
    "name": "阿斯托瑞斯 (Astorath the Grim)", "status": "圣血天使死亡大牧师", "attributes": {
      "weaponSkill": 120, "ballisticSkill": 90, "strength": 135, // 110 +25(圣物MK VII)
      "toughness": 110, "agility": 110, // 105 +5
      "intelligence": 90, "perception": 115, // 100 +15
      "willpower": 135, // 120 +15
      "fellowship": 95
    }, "trait": "救赎者之裁, 百战幸存, 飞行, 体型·大型", "skill": "指挥, 威压, 圣歌, 史学知识", "equipment": "圣物MK VII 型动力甲, 执行者之斧, 阿斯塔特喷气背包", "tags": [
      "帝国", "星际战士", "圣血天使", "牧师"
    ], "weaponStats": "执行者之斧", "hp": 22, "maxHp": 22, "movement": 12, "ahp": 26, "armorRating": 9, "baseMeleeDamage": "6 (S/20)", "resistance": "High"
  }, "imperium_heroes_dante": {
    "name": "但丁 (Lord Commander Dante)", "status": "圣血天使战团长 / 帝国暗面摄政", "attributes": {
      "weaponSkill": 140, "ballisticSkill": 110, "strength": 140, // 115 +25
      "toughness": 120, "agility": 120, // 115 +5
      "intelligence": 110, "perception": 130, // 115 +15
      "willpower": 145, // 130 +15
      "fellowship": 130
    }, "trait": "血渴狂怒, 百战幸存, 飞行, 体型·大型", "skill": "指挥, 战术, 威压", "equipment": "莫塔里斯之斧, 圣吉列斯之光, 圣物MK VII 型动力甲", "tags": [
      "帝国", "星际战士", "圣血天使", "战团长"
    ], "weaponStats": "莫塔里斯之斧, 圣吉列斯之光", "hp": 24, "maxHp": 24, "movement": 13, "ahp": 26, "armorRating": 9, "baseMeleeDamage": "7 (S/20)", "resistance": "High"
  }
};
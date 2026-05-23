import { NPCProfile } from '../../../../types';

/**
 * 暗黑天使 (Dark Angels) - 第一军团守秘者
 *
 * 护甲修正：
 * - 侦察兵复合板甲: AR 6, AHP 20, 无属性修正
 * - MK VII 型动力甲: AR 7, AHP 20, 力量+20, 感知+10, 意志+5, 敏捷-15
 * - 精工MK VII 型动力甲: AR 8, AHP 22, 力量+20, 感知+10, 意志+5 (无敏捷惩罚)
 * - 圣物MK VII 型动力甲: AR 9, AHP 26, 力量+25, 感知+15, 意志+15, 敏捷+5
 * - Mk X 战术型动力甲: AR 7, AHP 22, 力量+20, 感知+10, 意志+5
 * - 不屈型战术无畏装甲: AR 12, AHP 35, 力量+40, 意志+15, 敏捷-40, 移动力减半
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 *
 * 特质规则：
 * - 正式星际战士/无畏：主派系死亡天使 + 战团内环隐秘
 * - 侦察兵：仅内环隐秘，无死亡天使
 * - 移除所有其他派系特质（如圣言激励等），保留通用特质
 * - 内环隐秘为条件触发，无常驻属性修正
 * - 英雄单位常驻加成（如百战幸存）已计入基础属性
 */
export const DARK_ANGELS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 侦察兵（无死亡天使）
  'dark_angels_scout': {
    name: '暗黑天使侦察兵', status: '静默猎手', attributes: {
      weaponSkill: 55, ballisticSkill: 55, strength: 55, toughness: 55, agility: 60, intelligence: 50, perception: 60, willpower: 55, fellowship: 45
    }, trait: '内环隐秘, 星海本能, 体型·普通', skill: '潜行, 警觉, 搜索, 追迹, 战斗训练, 战术', equipment: '侦察兵复合板甲, 精工阿斯塔特爆弹手枪, 狙击爆弹枪', tags: ['帝国', '阿斯塔特', '侦察兵', '暗黑天使'], ahp: 20, hp: 11, maxHp: 11, armorRating: 6, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '狙击爆弹枪'
  }, // 战术战士（MK VII甲）
  'dark_angels_tactical_marine': {
    name: '暗黑天使战术战士', status: '顽强守卫', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 80, // 60 +20
      toughness: 72, agility: 55, // 70 -15
      intelligence: 60, perception: 75, // 65 +10
      willpower: 75, // 70 +5
      fellowship: 55
    }, trait: '死亡天使, 内环隐秘, 星海本能, 体型·大型', skill: '战术, 普通知识·星界军, 战斗训练', equipment: 'MK VII 型动力甲, 阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '标准', '暗黑天使'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '阿斯塔特爆弹枪, 精工阿斯塔特爆弹手枪'
  }, // 鸦翼黑骑士（MK VII甲，敏捷较高）
  'dark_angels_ravenwing_biker': {
    name: '鸦翼黑骑士', status: '追猎之影', attributes: {
      weaponSkill: 75, ballisticSkill: 75, strength: 78, // 58 +20
      toughness: 70, agility: 65, // 80 -15
      intelligence: 60, perception: 78, // 68 +10
      willpower: 75, // 70 +5
      fellowship: 55
    }, trait: '死亡天使, 内环隐秘, 鸦翼专家, 先锋追猎, 体型·大型', skill: '驾驶（地面车辆）, 战斗训练, 战术, 闪避', equipment: 'MK VII 型动力甲, 鸦翼突击摩托, 鸦翼链锯剑', tags: ['帝国', '阿斯塔特', '鸦翼', '快速打击', '暗黑天使'], ahp: 20, hp: 14, maxHp: 14, armorRating: 7, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '鸦翼链锯剑'
  }, // 死翼终结者（不屈甲，移动力减半）
  'dark_angels_deathwing_terminator': {
    name: '死翼终结者', status: '不退之墙', attributes: {
      weaponSkill: 85, ballisticSkill: 85, strength: 120, // 80 +40
      toughness: 105, agility: 20, // 60 -40
      intelligence: 65, perception: 80, willpower: 100, // 85 +15
      fellowship: 50
    }, trait: '死亡天使, 内环隐秘, 死翼誓言, 百战幸存, 隧道之子, 体型·大型', skill: '战术, 战斗训练, 祈求', equipment: '不屈型战术无畏装甲, 暴风爆弹枪, 动力拳套', tags: ['帝国', '阿斯塔特', '死翼', '终结者', '精华', '暗黑天使'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 3, baseMeleeDamage: '6 (S/20)', resistance: 'High', weaponStats: '暴风爆弹枪, 动力拳套'
  }, // 死翼骑士（不屈甲 + 暴风盾，敏捷极低）
  'dark_angels_deathwing_knight': {
    name: '死翼骑士', status: '内环守护者', attributes: {
      weaponSkill: 90, ballisticSkill: 80, strength: 125, // 85 +40
      toughness: 105, agility: 5, // 60 -40 -25(暴风盾持用敏捷修正，最低5)
      intelligence: 60, perception: 80, willpower: 105, // 90 +15
      fellowship: 45
    }, trait: '死亡天使, 内环隐秘, 圣洁坚壁, 体型·大型', skill: '战斗训练, 特技, 恐吓, 战术', equipment: '不屈型战术无畏装甲, 赦免权杖, 暴风盾', tags: ['帝国', '阿斯塔特', '死翼', '精锐', '暗黑天使'], ahp: 35, hp: 21, maxHp: 21, armorRating: 12, movement: 6, baseMeleeDamage: '6 (S/20)', weaponStats: '赦免权杖'
  }, // 审判牧师（精工MK VII甲，英雄）
  'dark_angels_interrogator_chaplain': {
    name: '审判牧师', status: '悔悟主宰', attributes: {
      weaponSkill: 90, ballisticSkill: 80, strength: 90, // 70 +20
      toughness: 82, agility: 78, intelligence: 85, perception: 90, // 80 +10
      willpower: 105, // 100 +5
      fellowship: 90
    }, trait: '死亡天使, 内环隐秘, 审判之言, 百战幸存, 隧道之子, 体型·大型', skill: '审讯, 恐吓, 指挥', equipment: '精工MK VII 型动力甲, 克洛休斯权杖, 重编香炉, 罗兹利乌斯护盾', tags: ['帝国', '阿斯塔特', '牧师', '英雄', '暗黑天使'], ahp: 22, hp: 16, maxHp: 16, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', resistance: 'High', weaponStats: '克洛休斯权杖'
  }, // 智库（精工MK VII甲）
  'dark_angels_librarian': {
    name: '暗黑天使智库', status: '隐秘记录者', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 80, // 60 +20
      toughness: 72, agility: 75, intelligence: 105, perception: 95, // 85 +10
      willpower: 115, // 110 +5
      fellowship: 60
    }, trait: '死亡天使, 内环隐秘, 断罪预言, 体型·大型', skill: '灵能掌控, 祈求, 学术知识·古代史, 普通知识·战争, 禁忌知识·亚空间, 禁忌知识·异端, 能量通道', equipment: '精工MK VII 型动力甲, 灵能剑, 灵能兜帽, 精工阿斯塔特爆弹手枪', tags: ['帝国', '阿斯塔特', '灵能者', '暗黑天使'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '灵能剑, 精工阿斯塔特爆弹手枪'
  }, // 内环伴客（MK X 战术甲，使用仲裁之剑和仲裁副盾）
  'dark_angels_inner_circle_companion': {
    name: '内环伴客', status: '无声守望', attributes: {
      weaponSkill: 85, ballisticSkill: 85, strength: 85, // 65 +20
      toughness: 80, agility: 80, // 仲裁副盾仅在近战对抗时提供+10，不常驻
      intelligence: 70, perception: 90, // 80 +10
      willpower: 87, // 82 +5
      fellowship: 60
    }, trait: '死亡天使, 内环隐秘, 誓言守卫, 百战幸存, 隧道之子, 体型·大型', skill: '战斗训练, 特技, 战术, 普通知识·战争, 警觉', equipment: 'MK X 战术型动力甲, 仲裁之剑, 仲裁副盾', tags: ['传说', '帝国', '阿斯塔特', '原铸', '精锐', '暗黑天使'], ahp: 22, hp: 16, maxHp: 16, armorRating: 7, movement: 9, baseMeleeDamage: '4 (S/20)', resistance: 'High', weaponStats: '仲裁之剑'
  }, // 英雄：阿斯莫戴（圣物MK VII甲）
  "imperium_heroes_asmodai": {
    "name": "阿斯莫戴 (Asmodai)", "status": "暗黑天使审讯牧师", "attributes": {
      "weaponSkill": 95, "ballisticSkill": 80, "strength": 100, // 75 +25
      "toughness": 90, "agility": 90, // 85 +5
      "intelligence": 100, "perception": 95, // 80 +15
      "willpower": 125, // 110 +15
      "fellowship": 85
    }, "trait": "死亡天使, 内环隐秘, 残酷审讯, 忏悔光环, 体型·大型", "skill": "刑讯, 指挥, 威压, 圣歌", "equipment": "迷茫之杖, 圣物MK VII 型动力甲, 阿斯塔特爆弹手枪", "tags": [
      "帝国", "星际战士", "暗黑天使", "审讯牧师"
    ], "weaponStats": "迷茫之杖, 阿斯塔特爆弹手枪", "hp": 18, "maxHp": 18, "movement": 10, "ahp": 26, "armorRating": 9, "baseMeleeDamage": "5 (S/20)", "resistance": "High"
  }, // 英雄：阿兹瑞尔（圣物MK VII甲 + 百战幸存常驻）
  "imperium_heroes_azrael": {
    "name": "阿兹瑞尔 (Supreme Grand Master Azrael)", "status": "暗黑天使至高大导师", "attributes": {
      "weaponSkill": 110, "ballisticSkill": 105, // 基础 S 90 + 百战幸存(+5) = 95，护甲+25 = 120
      "strength": 120, // 95 +25
      // 基础 T 95 + 百战幸存(+5) = 100
      "toughness": 100, // 基础 Ag 90 + 百战幸存(+5) = 95，护甲+5 = 100
      "agility": 100, // 95 +5
      "intelligence": 110, // 基础 Per 100，护甲+15 = 115
      "perception": 115, // 100 +15
      // 基础 WP 115 + 百战幸存(+5) = 120，护甲+15 = 135
      "willpower": 135, // 120 +15
      "fellowship": 120
    }, "trait": "死亡天使, 内环隐秘, 至高大导师, 战术大师, 百战幸存, 体型·大型", "skill": "指挥, 战术, 威压, 史学知识", "equipment": "秘密之剑, 复仇之怒, 圣物MK VII 型动力甲, 雄狮之盔", "tags": [
      "帝国", "星际战士", "暗黑天使", "至高大导师"
    ], "weaponStats": "秘密之剑, 复仇之怒", "hp": 20, "maxHp": 20, "movement": 11, "ahp": 26, "armorRating": 9, "baseMeleeDamage": "6 (S/20)", "resistance": "High"
  }
};
import { NPCProfile } from '../../../../types';

/**
 * 灰骑士 (Grey Knights) - 恶魔审判
 *
 * 护甲修正：
 * - 圣盾型动力甲: AR 8, AHP 22, 力量+25, 感知+15, 意志+15, 敏捷-15
 * - 圣盾型战术无畏装甲: AR 13, AHP 38, 力量+45, 感知+20, 意志+20, 敏捷-40, 移动力减半
 * - 无畏机甲: AR 15, AHP 60, 力量+50, 感知+15, 意志+10
 *
 * 特质规则：
 * - 所有正式灰骑士单位均需携带主派系死亡天使与战团特质恶魔审判。
 * - 保留通用特质（如星海本能、百战幸存等）。
 * - 百战幸存常驻加成：力量+5、坚韧+5、敏捷+5、意志+5，已计入对应单位的最终属性。
 */
export const GREY_KNIGHTS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  // 打击修士（圣盾型动力甲，百战幸存）
  'grey_knights_strike_marine': {
    name: '灰骑士打击修士', status: '净化执行', attributes: {
      weaponSkill: 80, ballisticSkill: 75, strength: 95, // 65 +25护甲 +5幸存
      toughness: 75, // 70 +5幸存
      agility: 60, // 70 +5幸存 -15护甲
      intelligence: 70, perception: 85, // 70 +15护甲
      willpower: 105, // 85 +15护甲 +5幸存
      fellowship: 55
    }, trait: '死亡天使, 恶魔审判, 星海本能, 百战幸存, 体型·大型', skill: '祈求, 战术, 调查, 灵魂点燃者', equipment: '圣盾型动力甲, 复仇女神灵能战戟, 风暴爆弹枪 (腕置)', tags: ['帝国', '阿斯塔特', '灰骑士', '灵能'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '复仇女神灵能战戟, 风暴爆弹枪'
  }, // 拦截者（圣盾甲，百战幸存，敏捷偏高）
  'grey_knights_interceptor': {
    name: '灰骑士拦截者', status: '传送突击', attributes: {
      weaponSkill: 78, ballisticSkill: 78, strength: 93, // 63 +25 +5
      toughness: 73, // 68 +5
      agility: 70, // 80 +5 -15
      intelligence: 68, perception: 83, // 68 +15
      willpower: 100, // 80 +15 +5
      fellowship: 50
    }, trait: '死亡天使, 恶魔审判, 亚空间跳跃, 星海本能, 百战幸存, 体型·大型', skill: '特技, 战术, 祈求, 灵魂点燃者', equipment: '圣盾型动力甲, 个人传送器, 复仇女神灵能对剑, 风暴爆弹枪 (腕置)', tags: ['帝国', '阿斯塔特', '灰骑士', '灵能', '先锋'], ahp: 22, hp: 14, maxHp: 14, armorRating: 8, movement: 8, baseMeleeDamage: '4 (S/20)', weaponStats: '复仇女神灵能对剑, 风暴爆弹枪'
  }, // 净化者（圣盾甲，百战幸存，极高意志）
  'grey_knights_purifier': {
    name: '灰骑士净化者', status: '洁净之火', attributes: {
      weaponSkill: 80, ballisticSkill: 70, strength: 92, // 62 +25 +5
      toughness: 77, // 72 +5
      agility: 58, // 68 +5 -15
      intelligence: 72, perception: 87, // 72 +15
      willpower: 110, // 90 +15 +5
      fellowship: 52
    }, trait: '死亡天使, 恶魔审判, 星海本能, 百战幸存, 体型·大型', skill: '祈求, 调查, 意志洪流', equipment: '圣盾型动力甲, 魂火喷射器, 复仇女神灵能剑', tags: ['帝国', '阿斯塔特', '灰骑士', '灵能', '精英'], ahp: 22, hp: 15, maxHp: 15, armorRating: 8, movement: 6, baseMeleeDamage: '4 (S/20)', weaponStats: '魂火喷射器, 复仇女神灵能剑'
  }, // 终结者（圣盾型无畏甲，百战幸存）
  'grey_knights_terminator': {
    name: '灰骑士终结者', status: '坚毅圣盾', attributes: {
      weaponSkill: 82, ballisticSkill: 78, strength: 118, // 68 +45 +5
      toughness: 80, // 75 +5
      agility: 25, // 60 +5 -40 → 移动力 floor(25/10)=2 减半=1
      intelligence: 72, perception: 92, // 72 +20
      willpower: 110, // 85 +20 +5
      fellowship: 50
    }, trait: '死亡天使, 恶魔审判, 钢铁意志, 星海本能, 百战幸存, 体型·大型', skill: '祈求, 战术, 调查, 意志洪流', equipment: '圣盾型战术无畏装甲, 复仇女神灵能战戟, 风暴爆弹枪 (腕置)', tags: ['帝国', '阿斯塔特', '灰骑士', '灵能', '终结者'], ahp: 38, hp: 16, maxHp: 16, armorRating: 13, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '复仇女神灵能战戟, 风暴爆弹枪'
  }, // 圣骑士（圣盾无畏甲，无百战幸存）
  'grey_knights_paladin': {
    name: '灰骑士圣骑士', status: '战团冠军', attributes: {
      weaponSkill: 95, ballisticSkill: 90, strength: 125, // 80 +45
      toughness: 85, agility: 25, // 65 -40 → MV 1
      intelligence: 85, perception: 100, // 80 +20
      willpower: 115, // 95 +20
      fellowship: 65
    }, trait: '死亡天使, 恶魔审判, 铁卫骑士, 体型·大型', skill: '战术, 指挥, 祈求, 先知视界', equipment: '圣盾型战术无畏装甲, 复仇女神灵能战锤, 风暴爆弹枪 (腕置), 圣洁经文', tags: ['帝国', '阿斯塔特', '灰骑士', '灵能', '英雄'], ahp: 38, hp: 17, maxHp: 17, armorRating: 13, movement: 3, baseMeleeDamage: '6 (S/20)', weaponStats: '复仇女神灵能战锤, 风暴爆弹枪'
  }, // 智库（圣盾无畏甲，百战幸存，补充恶魔审判）
  'grey_knights_librarian': {
    name: '灰骑士智库', status: '亚空间学者', attributes: {
      weaponSkill: 70, ballisticSkill: 70, strength: 115, // 65 +45 +5
      toughness: 73, // 68 +5
      agility: 27, // 62 +5 -40 → MV 1
      intelligence: 105, perception: 92, // 72 +20
      willpower: 135, // 110 +20 +5
      fellowship: 60
    }, trait: '死亡天使, 恶魔审判, 圣仪解析, 星海本能, 百战幸存, 体型·大型', skill: '祈求, 逻辑, 调查, 灵能掌控, 能量通道', equipment: '圣盾型战术无畏装甲, 复仇女神灵能杖, 灵能兜帽, 利伯灵能手册', tags: ['帝国', '阿斯塔特', '灰骑士', '灵能者', '智库'], ahp: 38, hp: 14, maxHp: 14, armorRating: 13, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '复仇女神灵能杖'
  }, // 大导师（圣盾无畏甲，百战幸存，补充恶魔审判）
  'grey_knights_grand_master': {
    name: '灰骑士大导师', status: '至高导师', attributes: {
      weaponSkill: 100, ballisticSkill: 95, strength: 135, // 85 +45 +5
      toughness: 95, // 90 +5
      agility: 35, // 70 +5 -40 → MV 1
      intelligence: 100, perception: 105, // 85 +20
      willpower: 145, // 120 +20 +5
      fellowship: 85
    }, trait: '死亡天使, 恶魔审判, 真名持有者, 英雄之躯, 星海本能, 百战幸存, 体型·大型', skill: '指挥, 战术, 祈求, 灵魂暴君', equipment: '圣盾型战术无畏装甲, 复仇女神灵能剑, 灵能加农炮, 圣教符文', tags: ['帝国', '阿斯塔特', '灰骑士', '英雄', '指挥官'], ahp: 38, hp: 19, maxHp: 19, armorRating: 13, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '复仇女神灵能剑, 灵能加农炮'
  }, // 复仇女神自走机甲（视同无畏护甲）
  'grey_knights_nemesis_dreadknight': {
    name: '复仇女神自走机甲', status: '恶魔猎杀者', attributes: {
      weaponSkill: 85, ballisticSkill: 80, strength: 130, // 80 +50
      toughness: 90, agility: 55, intelligence: 75, perception: 90, // 75 +15
      willpower: 100, // 90 +10
      fellowship: 50
    }, trait: '死亡天使, 恶魔审判, 外骨骼链接, 体型·超大', skill: '战术, 警觉, 祈求, 灵魂点燃者', equipment: '复仇女神灵能巨剑, 灵能消灭者, 魂火喷射器', tags: ['帝国', '机甲', '灰骑士', '灵能', '反甲'], ahp: 90, hp: 18, maxHp: 18, armorRating: 22, movement: 8, baseMeleeDamage: '6 (S/20)', weaponStats: '复仇女神灵能巨剑, 灵能消灭者, 魂火喷射器'
  }, // 远古无畏（无畏甲）
  'grey_knights_venerable_dreadnought': {
    name: '灰骑士远古无畏', status: '恒久戒卫', attributes: {
      weaponSkill: 100, ballisticSkill: 100, strength: 135, // 85 +50
      toughness: 100, agility: 55, intelligence: 85, perception: 95, // 80 +15
      willpower: 110, // 100 +10
      fellowship: 50
    }, trait: '死亡天使, 恶魔审判, 灵能余火, 体型·超大', skill: '指挥, 战术, 警觉, 祈求, 先知视界', equipment: '无畏机甲, 灵能加农炮, 爆弹枪', tags: ['帝国', '阿斯塔特', '无畏机甲', '灰骑士', '灵能'], ahp: 60, hp: 20, maxHp: 20, armorRating: 15, movement: 8, baseMeleeDamage: '6 (S/20)', weaponStats: '灵能加农炮'
  }
};
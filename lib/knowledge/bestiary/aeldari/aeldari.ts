import { NPCProfile } from '../../../../types';

/**
 * 灵族数据
 * 护甲参考：
 * - 灵族灵骨甲: AR 5, AHP 15, 力量+5, 感知+15
 * - 灵族符文甲: AR 7, AHP 20, 意志+10, 感知+15
 * - 灵族斥候甲: AR 4, AHP 12, 感知+15, 敏捷+5
 * - 幻象冥府装甲 (泰坦): AR 25, AHP 80, 力量+50
 * 载具规则：只保留 S, T, Ag, BS, Per, HP = max(1, floor(T/5)), AHP = T, MV = floor(Ag/5), BMD = floor(S/20)
 */
export const AELDARI_DATA: Record<string, Partial<NPCProfile>> = {
  // 灵族守护者（征召兵）
  aeldari_guardian: {
    name: '灵族守护者', status: '征召兵', attributes: {
      weaponSkill: 35, ballisticSkill: 35, strength: 35, // 30基础 +5灵骨甲
      toughness: 30, agility: 40, intelligence: 35, perception: 50, // 35基础 +15灵骨甲
      willpower: 35, fellowship: 30
    }, trait: '灵骨反馈, 战道宿命, 体型·普通', skill: '闪避, 警觉, 搜寻, 普通知识·技术, 逻辑', equipment: '星镖射手步枪, 灵族灵骨甲, 魂石', ahp: 15, hp: 6, maxHp: 6, armorRating: 5, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '星镖射手步枪', tags: ['灵族', '步兵']
  }, // 复仇者（道武士，远程专精）
  dire_avenger: {
    name: '复仇复仇者', status: '道武士', attributes: {
      weaponSkill: 38, ballisticSkill: 42, strength: 37, // 32基础 +5
      toughness: 32, agility: 42, intelligence: 38, perception: 55, // 40基础 +15
      willpower: 38, fellowship: 32
    }, trait: '复仇风暴, 体型·普通', skill: '闪避, 警觉, 战术, 逻辑, 普通知识·战争', equipment: '复仇者星镖弹射器, 灵族灵骨甲, 魂石', ahp: 15, hp: 6, maxHp: 6, armorRating: 5, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '复仇者星镖弹射器', tags: ['灵族', '道武士']
  }, // 咆哮女妖（近战敏捷）
  howling_banshee: {
    name: '咆哮女妖', status: '道武士', attributes: {
      weaponSkill: 45, ballisticSkill: 35, strength: 40, // 35基础 +5
      toughness: 30, agility: 50, intelligence: 35, perception: 55, // 40基础 +15
      willpower: 40, fellowship: 35
    }, trait: '女妖面具, 杂技, 体型·普通', skill: '特技, 闪避, 潜行, 攀爬, 恐吓', equipment: '执行者动力剑, 星镖手枪, 灵族灵骨甲, 魂石', ahp: 15, hp: 6, maxHp: 6, armorRating: 5, movement: 5, baseMeleeDamage: '2 (S/20)', weaponStats: '执行者动力剑, 星镖手枪', tags: ['灵族', '道武士']
  }, // 突击蝎（潜行近战）
  striking_scorpion: {
    name: '突击蝎', status: '道武士', attributes: {
      weaponSkill: 45, ballisticSkill: 38, strength: 43, // 38基础 +5
      toughness: 35, agility: 45, intelligence: 36, perception: 57, // 42基础 +15
      willpower: 40, fellowship: 30
    }, trait: '下颚发射器, 隐蔽大师, 体型·普通', skill: '潜行, 躲藏, 追迹, 警觉, 柔术', equipment: '蝎之链锯剑, 星镖手枪, 灵族灵骨甲, 魂石', ahp: 15, hp: 7, maxHp: 7, armorRating: 5, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '蝎之链锯剑, 星镖手枪', tags: ['灵族', '道武士']
  }, // 烈焰火龙（重火力）
  fire_dragon: {
    name: '烈焰火龙', status: '道武士', attributes: {
      weaponSkill: 38, ballisticSkill: 43, strength: 41, // 36基础 +5
      toughness: 35, agility: 40, intelligence: 38, perception: 55, // 40基础 +15
      willpower: 42, fellowship: 30
    }, trait: '坦克杀手, 炽热意志, 体型·普通', skill: '闪避, 警觉, 战术, 逻辑, 评估', equipment: '火龙热熔枪, 灵族灵骨甲, 魂石', ahp: 15, hp: 7, maxHp: 7, armorRating: 5, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '火龙热熔枪', tags: ['灵族', '道武士']
  }, // 灵族游侠（斥候）
  ranger: {
    name: '灵族游侠', status: '流放者', attributes: {
      weaponSkill: 35, ballisticSkill: 45, strength: 30, toughness: 30, agility: 53, // 48基础 +5斥候甲
      intelligence: 40, perception: 57, // 42基础 +15斥候甲
      willpower: 38, fellowship: 32
    }, trait: '长程干扰, 迷彩斗篷, 体型·普通', skill: '潜行, 躲藏, 追迹, 警觉, 生存', equipment: '游侠长靶步枪, 星镖手枪, 灵族斥候甲, 魂石', ahp: 12, hp: 6, maxHp: 6, armorRating: 4, movement: 5, baseMeleeDamage: '1 (S/20)', weaponStats: '游侠长靶步枪, 星镖手枪', tags: ['灵族', '步兵']
  }, // 灵族先知（英雄）
  farseer: {
    name: '灵族先知', status: '命运编织者', attributes: {
      weaponSkill: 100, ballisticSkill: 100, strength: 110, // 100基础 +0
      toughness: 100, agility: 100, intelligence: 120, perception: 135, // 120基础 +15
      willpower: 140, // 130基础 +10
      fellowship: 100
    }, trait: '预知, 非凡容姿, 体型·普通', skill: '灵能掌控, 祈求, 逻辑, 禁忌知识·亚空间, 禁忌知识·黑图书馆', equipment: '执行者动力剑, 灵族符文甲, 魂石', ahp: 20, hp: 20, maxHp: 20, armorRating: 7, movement: 10, baseMeleeDamage: '5 (S/20)', weaponStats: '执行者动力剑', tags: ['灵族', '英雄', '灵能者']
  }, // 术士（道巫师）
  warlock: {
    name: '术士', status: '道巫师', attributes: {
      weaponSkill: 65, ballisticSkill: 65, strength: 60, toughness: 65, agility: 70, intelligence: 75, perception: 90, // 75基础 +15
      willpower: 90, // 80基础 +10
      fellowship: 60
    }, trait: '毁灭-守护, 战团领袖, 体型·普通', skill: '灵能掌控, 祈求, 战术, 禁忌知识·亚空间, 逻辑', equipment: '灵能长棍, 灵族符文甲, 魂石, 灵魂暴君', ahp: 20, hp: 13, maxHp: 13, armorRating: 7, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '灵能长棍', tags: ['灵族', '灵能者']
  }, // 凯恩化身（传奇生物，非载具）
  avatar_of_khaine: {
    name: '凯恩化身', status: '战争之神', attributes: {
      weaponSkill: 200, ballisticSkill: 200, strength: 350, // 300基础 +50幻象冥府装甲
      toughness: 280, agility: 200, intelligence: 150, perception: 200, willpower: 250, fellowship: 50        // 神明无社交
    }, trait: '熔融之躯, 战争化身, 体型·巨大', skill: '恐吓, 普通知识·战争, 战术', equipment: '悲鸣末日, 幻象冥府装甲', ahp: 80, hp: 56, maxHp: 56, armorRating: 25, movement: 20, // floor(200/10) = 20
    baseMeleeDamage: '17 (S/20)', weaponStats: '悲鸣末日', tags: ['灵族', '传奇']
  }, // 掠夺者级灵族泰坦（载具）
  revenant_titan: {
    name: '掠夺者级灵族泰坦', status: '侦察泰坦', // 载具仅保留 S, T, Ag, BS, Per
    attributes: {
      weaponSkill: 0, // 载具无此属性
      ballisticSkill: 60, strength: 400, // 350基础 +50幻象冥府装甲
      toughness: 300, agility: 150, intelligence: 0, // 载具无
      perception: 80, willpower: 0, // 载具无
      fellowship: 0         // 载具无
    }, trait: '超凡敏捷, 全息场, 体型·巨大', skill: '战术, 警觉, 驾驶（地面车辆）', equipment: '脉冲激光炮 x2, 灵晶长枪, 幻象冥府装甲', hp: 60, maxHp: 60, ahp: 300, armorRating: 25, movement: 33, // floor(150/5) = 30
    baseMeleeDamage: '20 (S/20)', weaponStats: '脉冲激光炮 x2, 灵晶长枪', tags: ['灵族', '载具', '泰坦']
  }
};
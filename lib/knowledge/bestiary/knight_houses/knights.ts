import { NPCProfile } from '../../../../types';

/**
 * 骑士机甲 (Imperial Knights)
 * 审计修正说明：
 * - 载具单位没有WS/BS/Int/Per/WP/Fel，统一设为0
 * - 骑士驾驶员是人类，属性按精锐凡人/轻度改造范围设定
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正，BMD = floor(S/20)
 * - 护甲值AR/AHP参考规则表（骑士装甲）
 * - 特质仅保留合法名称，移除自创描述
 * - 技能使用规则技能
 * - weaponStats仅保留武器名称
 * - 移除不存在的resistance字段
 */
export const KNIGHTS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'imperium_knight_armiger_helverin': {
    name: '侍从级海尔佛林骑士', status: '骑士随从/轻型火力支援', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 60, toughness: 70, agility: 25, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·大型', skill: '', equipment: '侍从级骑士复合护胸, 看守者自动加农炮, 重型短程通讯器', tags: ['帝国', '载具', '骑士机甲', '骑士家族', '随从'], ahp: 80, hp: 14, maxHp: 14, armorRating: 25, movement: 3, baseMeleeDamage: '3 (S/20)', weaponStats: '看守者自动加农炮'
  }, 'imperium_knight_armiger_warglaive': {
    name: '侍从级战刃骑士', status: '骑士随从/近战突击', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 60, toughness: 70, agility: 30, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·大型', skill: '', equipment: '侍从级骑士复合护胸, 热熔长矛, 刈割链锯握爪', tags: ['帝国', '载具', '骑士机甲', '骑士家族', '随从'], ahp: 80, hp: 14, maxHp: 14, armorRating: 25, movement: 4, baseMeleeDamage: '3 (S/20)', weaponStats: '热熔长矛, 刈割链锯握爪'
  }, 'imperium_knight_questoris_paladin': {
    name: '任务者级帕拉丁骑士', status: '骑士家族中坚/全能战士', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 110, agility: 20, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '任务者级骑士装甲, 内置式离子盾, 速射战斗加农炮, 骑士级刈割链锯剑', tags: ['帝国', '载具', '骑士机甲', '骑士家族', '任务者'], ahp: 100, hp: 22, maxHp: 22, armorRating: 30, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '速射战斗加农炮, 骑士级刈割链锯剑'
  }, 'imperium_knight_questoris_errant': {
    name: '任务者级游侠骑士', status: '反坦克突击专家', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 110, agility: 20, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '任务者级骑士装甲, 内置式离子盾, 热熔加农炮, 雷震手套', tags: ['帝国', '载具', '骑士机甲', '骑士家族', '游侠'], ahp: 100, hp: 22, maxHp: 22, armorRating: 30, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '热熔加农炮, 雷震手套'
  }, 'imperium_knight_dominus_castellan': {
    name: '主宰者级堡垒骑士', status: '机甲重炮要塞', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 120, toughness: 130, agility: 15, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '主宰者级骑士装甲, 内置式离子盾, 火山长矛, 等离子毁灭炮', tags: ['帝国', '载具', '骑士机甲', '骑士家族', '主宰者'], ahp: 120, hp: 26, maxHp: 26, armorRating: 35, movement: 2, baseMeleeDamage: '6 (S/20)', weaponStats: '火山长矛, 等离子毁灭炮'
  }, 'imperium_knight_acastus_porphyrion': {
    name: '阿卡斯图斯级波菲里翁骑士', status: '重火力平台', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 150, toughness: 160, agility: 10, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '阿卡斯图斯级骑士装甲, 内置式离子盾, 双联双管大口径岩浆炮, 铁暴型导弹吊舱', tags: ['帝国', '载具', '骑士机甲', '骑士家族', '阿卡斯图斯'], ahp: 160, hp: 32, maxHp: 32, armorRating: 45, movement: 2, baseMeleeDamage: '7 (S/20)', weaponStats: '双联双管大口径岩浆炮, 铁暴型导弹吊舱'
  }, 'knight_pilot': {
    name: '骑士领主 (Knight Scion)', status: '骑士家族驾驶员', attributes: {
      weaponSkill: 50, ballisticSkill: 50, strength: 40, toughness: 40, agility: 45, intelligence: 45, perception: 45, willpower: 55, fellowship: 50
    }, trait: '骑士精神, 体型·普通', skill: '驾驶, 魅力, 战术', equipment: '家族纹章紧身防护服, 激光手枪', tags: ['帝国', '骑士家族', '人类', '精英', '贵族'], ahp: 6, hp: 8, maxHp: 8, armorRating: 2, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '激光手枪'
  }
};
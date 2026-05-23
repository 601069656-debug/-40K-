import { NPCProfile } from '../../../../types';

/**
 * 超重型载具 (Super-Heavy Vehicles)
 * 审计修正说明：
 * - 载具没有WS/BS/Int/Per/WP/Fel，统一设为0
 * - HP = max(1, floor(T/5))，按公式计算
 * - 移动力MV = floor(Ag/10) + 体型修正（巨大+3）
 * - BMD = floor(S/20)
 * - 护甲值AR和AHP参考规则表（超重型坦克装甲层AR35/AHP120）
 * - 武器仅保留名称，移除伤害细节
 * - 特质仅保留合法名称（机械载具，体型·巨大），移除自创“第二代超重型”“主将威压”“泰坦杀手”等
 * - 移除不存在的resistance字段
 */
export const SUPER_HEAVY_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'imperium_macharius': {
    name: '马卡里乌斯重型坦克', status: '重火力突降', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 140, agility: 10, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '超重型坦克装甲层, 马卡里乌斯加农炮, 车载重型爆弹枪', tags: ['帝国', '载具', '超重型', '坦克', '星界军'], ahp: 120, hp: 28, maxHp: 28, armorRating: 35, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '马卡里乌斯加农炮, 车载重型爆弹枪'
  }, 'imperium_baneblade': {
    name: '毒刃超重型坦克', status: '万古堡垒', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 150, agility: 5, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '超重型坦克装甲层, 毒刃巨炮, 双联自动炮', tags: ['帝国', '载具', '超重型', '坦克', '机械修会'], ahp: 120, hp: 30, maxHp: 30, armorRating: 35, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '毒刃巨炮, 双联自动炮'
  }, 'imperium_shadowsword': {
    name: '影剑泰坦杀手', status: '弑神者', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 160, agility: 5, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '超重型坦克装甲层, 火山炮', tags: ['帝国', '载具', '超重型', '武器平台'], ahp: 120, hp: 32, maxHp: 32, armorRating: 35, movement: 3, baseMeleeDamage: '5 (S/20)', weaponStats: '火山炮'
  }
};
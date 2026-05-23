import { NPCProfile } from '../../../../types';

/**
 * 轻型载具 (Light Vehicles)
 * 审计修正说明：
 * - 载具没有WS/BS/Int/Per/WP/Fel，统一设为0
 * - HP = max(1, floor(T/5))，按公式计算
 * - 移动力MV = floor(Ag/10) + 体型修正（大型+1）
 * - BMD = floor(S/20)
 * - 护甲值AR和AHP参考规则表
 * - 武器仅保留名称，移除伤害细节
 * - 特质仅保留合法名称（机械载具，体型·大型），移除自创“全地形步行”等
 * - 移除不存在的resistance字段
 */
export const LIGHT_VEHICLES_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'imperium_centaur': {
    name: '半人马轻型履带牵引车', status: '帝国后勤/侦察', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 70, agility: 40, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·大型', skill: '', equipment: '航空级轻型装甲, 车载重型爆弹枪', tags: ['帝国', '载具', '轻型载具', '后勤'], ahp: 50, hp: 14, maxHp: 14, armorRating: 14, movement: 5, baseMeleeDamage: '5 (S/20)', weaponStats: '车载重型爆弹枪'
  }, 'imperium_sentinel': {
    name: '哨兵步行机', status: '高机动侦察', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 65, agility: 45, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·大型', skill: '', equipment: '哨兵前置装甲, 车载多管激光炮', tags: ['帝国', '载具', '步行机', '侦察'], ahp: 45, hp: 13, maxHp: 13, armorRating: 13, movement: 5, baseMeleeDamage: '5 (S/20)', weaponStats: '车载多管激光炮'
  }, 'imperium_armoured_sentinel': {
    name: '装甲哨兵步行机', status: '重火力支援', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 70, agility: 35, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·大型', skill: '', equipment: '哨兵前置装甲, 双联激光炮 (载具型)', tags: ['帝国', '载具', '步行机', '支援'], ahp: 45, hp: 14, maxHp: 14, armorRating: 13, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '双联激光炮'
  }, 'imperium_taurox': {
    name: '金牛座装甲高机动运兵车', status: '暴风兵/步兵运输', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 80, agility: 40, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·大型', skill: '', equipment: '奇美拉复合装甲, 双联自动炮', tags: ['帝国', '载具', '运输车', '装甲车'], ahp: 80, hp: 16, maxHp: 16, armorRating: 18, movement: 5, baseMeleeDamage: '5 (S/20)', weaponStats: '双联自动炮'
  }
};
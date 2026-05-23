import { NPCProfile } from '../../../../types';

/**
 * 运兵车/装甲运输车 (Transports)
 * 审计修正说明：
 * - 载具没有WS/BS/Int/Per/WP/Fel，统一设为0
 * - HP = max(1, floor(T/5))，按公式计算
 * - 移动力MV = floor(Ag/10) + 体型修正（大型+1，巨大+3）
 * - BMD = floor(S/20)
 * - 护甲值AR和AHP参考规则表
 * - 武器仅保留名称，移除伤害细节
 * - 特质仅保留合法名称（机械载具，体型·大型/巨大），移除自创描述
 * - 移除不存在的resistance字段
 */
export const TRANSPORTS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'imperium_chimera': {
    name: '奇美拉装甲运兵车', status: '星界军主力步兵战车', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 60, toughness: 70, agility: 30, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·大型', skill: '', equipment: '奇美拉复合装甲, 车载多管激光炮, 车载重型爆弹枪', tags: ['帝国', '载具', '运输车', '星界军'], ahp: 80, hp: 14, maxHp: 14, armorRating: 18, movement: 4, baseMeleeDamage: '3 (S/20)', weaponStats: '车载多管激光炮, 车载重型爆弹枪'
  }, 'imperium_rhino': {
    name: '犀牛装甲运兵车', status: '阿斯塔特标准运输', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 60, toughness: 70, agility: 30, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·大型', skill: '', equipment: '坦克级精金外壳, 暴风爆弹枪', tags: ['帝国', '载具', '阿斯塔特', '运输车'], ahp: 70, hp: 14, maxHp: 14, armorRating: 20, movement: 4, baseMeleeDamage: '3 (S/20)', weaponStats: '暴风爆弹枪'
  }, 'imperium_razorback': {
    name: '剃刀背装甲车', status: '阿斯塔特步兵战车', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 60, toughness: 70, agility: 35, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·大型', skill: '', equipment: '坦克级精金外壳, 双联重型爆弹枪, 双联激光炮', tags: ['帝国', '载具', '阿斯塔特', '装甲车'], ahp: 70, hp: 14, maxHp: 14, armorRating: 20, movement: 4, baseMeleeDamage: '3 (S/20)', weaponStats: '双联重型爆弹枪, 双联激光炮'
  }, 'imperium_repulsor': {
    name: '斥力者悬浮主战运输车', status: '原铸星际战士主力运输', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 80, agility: 40, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '超重型坦克装甲层, 机甲型大口径加特林爆弹枪, 破片手雷（精英版）', tags: ['帝国', '载具', '阿斯塔特', '原铸', '反重力'], ahp: 120, hp: 16, maxHp: 16, armorRating: 35, movement: 7, baseMeleeDamage: '5 (S/20)', weaponStats: '机甲型大口径加特林爆弹枪, 破片手雷（精英版）'
  }
};
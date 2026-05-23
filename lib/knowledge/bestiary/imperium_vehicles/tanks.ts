import { NPCProfile } from '../../../../types';

/**
 * 主战坦克 (Tanks)
 * 审计修正说明：
 * - 载具没有WS/BS/Int/Per/WP/Fel，统一设为0
 * - HP = max(1, floor(T/5))，按公式计算
 * - 移动力MV = floor(Ag/10) + 体型修正（巨大+3）
 * - BMD = floor(S/20)
 * - 护甲值AR和AHP参考规则表（坦克级精金外壳AR20/AHP70，超重型坦克装甲层AR35/AHP120）
 * - 武器仅保留名称，移除伤害细节
 * - 特质仅保留合法名称（机械载具，体型·巨大），移除自创描述
 * - 移除不存在的resistance字段
 */
export const TANKS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'imperium_leman_russ': {
    name: '黎曼鲁斯主战坦克', status: '星界军钢铁脊梁', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 120, agility: 12, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '坦克级精金外壳, 战车加农炮, 单兵式激光炮', tags: ['帝国', '载具', '坦克', '星界军'], ahp: 70, hp: 24, maxHp: 24, armorRating: 20, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '战车加农炮, 单兵式激光炮'
  }, 'imperium_predator': {
    name: '捕食者主战坦克', status: '阿斯塔特攻坚装甲', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 120, agility: 15, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '坦克级精金外壳, 双联激光炮, 车载重型爆弹枪', tags: ['帝国', '载具', '坦克', '阿斯塔特'], ahp: 70, hp: 24, maxHp: 24, armorRating: 20, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '双联激光炮, 车载重型爆弹枪'
  }, 'imperium_vindicator': {
    name: '守护者攻城坦克', status: '近距攻坚/废墟破坏', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 120, agility: 10, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '坦克级精金外壳, 破坏者攻城炮', tags: ['帝国', '载具', '坦克', '攻城'], ahp: 70, hp: 24, maxHp: 24, armorRating: 20, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '破坏者攻城炮'
  }, 'imperium_rogal_dorn': {
    name: '罗格多恩主战坦克', status: '重火力战线核心', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 140, agility: 12, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 体型·巨大', skill: '', equipment: '超重型坦克装甲层, 战车加农炮, 重型爆弹枪', tags: ['帝国', '载具', '坦克', '星界军', '重型'], ahp: 120, hp: 28, maxHp: 28, armorRating: 35, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '战车加农炮, 重型爆弹枪'
  }
};
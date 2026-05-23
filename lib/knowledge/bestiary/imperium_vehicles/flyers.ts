import { NPCProfile } from '../../../../types';

/**
 * 飞行器 (Flyers)
 * 审计修正说明：
 * - 载具属性遵循规则：载具没有WS/BS/Int/WP/Fel，但类型要求，设为0
 * - HP = max(1, floor(T/5)) 按坚韧计算（载具本体耐久）
 * - 移动力：飞行单位移动力 = ceil(Ag/5)，并加上体型修正（大型+1，巨大+2）
 * - 护甲值AR和AHP参考规则表中的航空级轻型装甲(AR14, AHP50)、载具厚重陶钢装甲(AR16, AHP60)
 * - 武器仅保留名称，移除伤害细节
 * - 特质仅保留合法名称，移除自创“空中悬停”“超音速”“重构武器挂载”“火力堡垒”
 * - 体型：女武神/复仇者为巨型（泰坦/大型飞行器），雷鹰为巨型
 */
export const FLYERS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'imperium_valkyrie': {
    name: '女武神突击运输机', status: '垂直空降/空中支援', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 70, agility: 40, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 飞行, 体型·巨大', skill: '', equipment: '航空级轻型装甲, 车载多管激光炮, 航空型多管火箭巢, 舱门重爆弹', tags: ['帝国', '载具', '飞行器', '运输', '星界军'], ahp: 50, hp: 14, maxHp: 14, armorRating: 14, movement: 10, baseMeleeDamage: '0', weaponStats: '车载多管激光炮, 航空型多管火箭巢, 舱门重爆弹'
  }, 'imperium_vendetta': {
    name: '复仇者重型武装直升机', status: '反装甲空中扫荡', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 100, toughness: 70, agility: 45, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 飞行, 体型·巨大', skill: '', equipment: '航空级轻型装甲, 双联激光炮 (载具型)x3', tags: ['帝国', '载具', '飞行器', '支援', '星界军'], ahp: 50, hp: 14, maxHp: 14, armorRating: 14, movement: 11, baseMeleeDamage: '0', weaponStats: '双联激光炮'
  }, 'imperium_thunderhawk': {
    name: '雷鹰炮艇', status: '阿斯塔特轨道突击母舰', attributes: {
      weaponSkill: 0, ballisticSkill: 0, strength: 150, toughness: 85, agility: 35, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    }, trait: '机械载具, 飞行, 体型·巨大', skill: '', equipment: '载具厚重陶钢装甲, 巨型涡轮激光炮, 双联重型爆弹枪, 双联突击炮', tags: ['帝国', '载具', '飞行器', '超重型', '阿斯塔特'], ahp: 60, hp: 17, maxHp: 17, armorRating: 16, movement: 9, baseMeleeDamage: '0', weaponStats: '巨型涡轮激光炮, 双联重型爆弹枪, 双联突击炮'
  }
};
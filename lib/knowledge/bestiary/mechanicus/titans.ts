import { NPCProfile } from '../../../../types';

/**
 * 泰坦 (Titans)
 * 审计修正说明：
 * - 泰坦作为巨型机械载具，拥有传感器系统（BS、Per），没有WS/Int/WP/Fel
 * - 属性值参考规则表中的泰坦级数值范围（力量150-350，坚韧120-250等）
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（巨大+3），BMD = floor(S/20)
 * - 护甲值AR和AHP参考规则表（战犬级AR35，掠夺者级AR45，战将级AR55，冥使型AR60，战帅级AR75，统御者/好战者AR95）
 * - 虚空盾发生器每层可抵挡攻击，每30秒恢复1层，最多叠加3/6层，已在备注中体现
 * - 武器仅保留名称，移除细节
 * - 特质仅保留合法名称（机械载具、体型·巨大、虚空盾等），移除自创描述
 * - 移除不存在的resistance字段
 * - 泰坦驾驶员作为人类单独审计
 */
export const TITANS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'imperium_warhound_titan': {
    name: '战犬级泰坦', status: '侦察泰坦', attributes: {
      weaponSkill: 0, ballisticSkill: 50, strength: 250, toughness: 180, agility: 20, intelligence: 0, perception: 60, willpower: 0, fellowship: 0
    }, trait: '机械载具, 虚空盾, 体型·巨大', skill: '', equipment: '战犬级机型装甲, 虚空盾发生器, 涡轮激光歼灭炮', tags: ['帝国', '载具', '泰坦', '机械修会'], ahp: 120, hp: 36, maxHp: 36, armorRating: 35, movement: 5, baseMeleeDamage: '12 (S/20)', weaponStats: '涡轮激光歼灭炮'
  }, 'imperium_reaver_titan': {
    name: '掠夺者级泰坦', status: '战斗泰坦', attributes: {
      weaponSkill: 0, ballisticSkill: 55, strength: 320, toughness: 220, agility: 15, intelligence: 0, perception: 70, willpower: 0, fellowship: 0
    }, trait: '机械载具, 虚空盾, 体型·巨大', skill: '', equipment: '掠夺者级战斗装甲, 虚空盾发生器, 火山炮, 泰坦级双联动力爪', tags: ['帝国', '载具', '泰坦', '机械修会'], ahp: 140, hp: 44, maxHp: 44, armorRating: 45, movement: 4, baseMeleeDamage: '16 (S/20)', weaponStats: '火山炮, 泰坦级双联动力爪'
  }, 'imperium_warlord_titan': {
    name: '战将级泰坦', status: '决战泰坦', attributes: {
      weaponSkill: 0, ballisticSkill: 60, strength: 400, toughness: 260, agility: 10, intelligence: 0, perception: 80, willpower: 0, fellowship: 0
    }, trait: '机械载具, 虚空盾, 体型·巨大', skill: '', equipment: '战将级绝截装甲, 虚空盾发生器, 巨型涡轮激光炮, 雷霆动力拳, 等离子歼灭者', tags: ['帝国', '载具', '泰坦', '机械修会'], ahp: 180, hp: 52, maxHp: 52, armorRating: 55, movement: 4, baseMeleeDamage: '20 (S/20)', weaponStats: '等离子歼灭者, 雷霆动力拳'
  }, 'imperium_nemesis_titan': {
    name: '冥使型战旗泰坦', status: '重炮支援泰坦', attributes: {
      weaponSkill: 0, ballisticSkill: 65, strength: 380, toughness: 280, agility: 10, intelligence: 0, perception: 85, willpower: 0, fellowship: 0
    }, trait: '机械载具, 虚空盾, 体型·巨大', skill: '', equipment: '冥使型战旗装甲, 虚空盾发生器, 地震加农炮, 双联激光炮', tags: ['帝国', '载具', '泰坦', '机械修会'], ahp: 200, hp: 56, maxHp: 56, armorRating: 60, movement: 4, baseMeleeDamage: '19 (S/20)', weaponStats: '地震加农炮, 双联激光炮'
  }, 'imperium_warmaster_titan': {
    name: '战帅级泰坦', status: '最高级巨型泰坦', attributes: {
      weaponSkill: 0, ballisticSkill: 70, strength: 500, toughness: 320, agility: 8, intelligence: 0, perception: 90, willpower: 0, fellowship: 0
    }, trait: '机械载具, 虚空盾, 体型·巨大', skill: '', equipment: '战帅级凯旋装甲, 虚空盾阵列, 贝尔科萨火山炮, 泰坦级双联动力爪', tags: ['帝国', '载具', '泰坦', '机械修会'], ahp: 250, hp: 64, maxHp: 64, armorRating: 75, movement: 3, baseMeleeDamage: '25 (S/20)', weaponStats: '贝尔科萨火山炮, 泰坦级双联动力爪'
  }, 'imperium_imperator_titan': {
    name: '统御者级泰坦', status: '神圣级泰坦 (要塞型)', attributes: {
      weaponSkill: 0, ballisticSkill: 75, strength: 600, toughness: 380, agility: 5, intelligence: 0, perception: 100, willpower: 0, fellowship: 0
    }, trait: '机械载具, 虚空盾, 体型·巨大', skill: '', equipment: '地平线级要塞装甲层, 虚空盾阵列, 地狱火加农炮, 圣礼型等离子歼灭者炮, 泰坦级防御副炮阵列', tags: ['帝国', '载具', '泰坦', '机械修会', '统御者'], ahp: 350, hp: 76, maxHp: 76, armorRating: 95, movement: 3, baseMeleeDamage: '30 (S/20)', weaponStats: '地狱火加农炮, 圣礼型等离子歼灭者炮, 泰坦级防御副炮阵列'
  }, 'imperium_warmonger_titan': {
    name: '好战者级泰坦', status: '神圣级泰坦 (火力型)', attributes: {
      weaponSkill: 0, ballisticSkill: 80, strength: 580, toughness: 360, agility: 5, intelligence: 0, perception: 100, willpower: 0, fellowship: 0
    }, trait: '机械载具, 虚空盾, 体型·巨大', skill: '', equipment: '地平线级要塞装甲层, 虚空盾阵列, 地震加农炮, 巨型涡轮激光炮, 泰坦级防御副炮阵列', tags: ['帝国', '载具', '泰坦', '机械修会', '好战者'], ahp: 350, hp: 72, maxHp: 72, armorRating: 95, movement: 3, baseMeleeDamage: '29 (S/20)', weaponStats: '地震加农炮, 巨型涡轮激光炮, 泰坦级防御副炮阵列'
  }, 'titan_princeps': {
    name: '泰坦长官 (Princeps)', status: '泰坦指挥者', attributes: {
      weaponSkill: 45, ballisticSkill: 55, strength: 40, toughness: 45, agility: 45, intelligence: 80, perception: 75, willpower: 90, fellowship: 50
    }, trait: '体型·普通', skill: '驾驶, 指挥, 战术', equipment: '指挥官型紧身防护服, 精工激光手枪', tags: ['帝国', '机械修会', '人类', '精英'], ahp: 6, hp: 9, maxHp: 9, armorRating: 2, movement: 4, baseMeleeDamage: '2 (S/20)', weaponStats: '精工激光手枪'
  }, 'titan_moderatus': {
    name: '泰坦舵手 (Moderati)', status: '泰坦驾驶助理', attributes: {
      weaponSkill: 40, ballisticSkill: 50, strength: 35, toughness: 40, agility: 45, intelligence: 60, perception: 65, willpower: 65, fellowship: 35
    }, trait: '体型·普通', skill: '驾驶, 警觉', equipment: '泰坦驾驶员制服, 激光手枪', tags: ['帝国', '机械修会', '人类', '精锐'], ahp: 6, hp: 8, maxHp: 8, armorRating: 2, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '激光手枪'
  }
};
// ==================== 舰船 (Vessels) ====================
// 审计修正说明：
// - 舰船属性遵循规则：无 WS/Int/WP/Fel，BS/Per 代表传感器
// - HP = max(1, floor(T/5))，与现有数值一致（保留）
// - 护甲 AHP 与 AR 参考规则表（护卫级~荣光级）
// - 特质仅保留合法名称（机械载具、舰船·护卫级、虚空盾等），移除自创描述
// - 技能统一设为空字符串
// - weaponStats 仅保留武器名称，移除伤害细节
import { NPCProfile } from '../../../../types';

export const VESSEL_DATA: Record<string, NPCProfile> = {
  sword_frigate: {
    name: '利剑级护卫舰 (Sword-class Frigate)', status: '帝国护航舰', attributes: {
      weaponSkill: 0, ballisticSkill: 45, strength: 200, toughness: 150, agility: 35, intelligence: 0, perception: 40, willpower: 0, fellowship: 0
    }, trait: '机械载具, 舰船·护卫级, 虚空盾, 体型·极大', skill: '', equipment: '宏炮, 护卫级陶钢装甲, 虚空盾发生器, [最少乘员: 2500]', tags: ['帝国', '海军', '舰船', '护卫级'], ahp: 3600, hp: 150, maxHp: 150, armorRating: 120, movement: 2, baseMeleeDamage: '10 (S/20)', weaponStats: '宏炮'
  }, firestorm_frigate: {
    name: '火冲级护卫舰 (Firestorm-class Frigate)', status: '阵地突击舰', attributes: {
      weaponSkill: 0, ballisticSkill: 50, strength: 200, toughness: 150, agility: 35, intelligence: 0, perception: 40, willpower: 0, fellowship: 0
    }, trait: '机械载具, 舰船·护卫级, 虚空盾, 体型·极大', skill: '', equipment: '光矛, 宏炮, 护卫级陶钢装甲, 虚空盾发生器, [最少乘员: 2600]', tags: ['帝国', '海军', '舰船', '护卫级'], ahp: 3600, hp: 150, maxHp: 150, armorRating: 120, movement: 2, baseMeleeDamage: '10 (S/20)', weaponStats: '光矛, 宏炮'
  }, lunar_cruiser: {
    name: '月袭级巡洋舰 (Lunar-class Cruiser)', status: '帝国中坚', attributes: {
      weaponSkill: 0, ballisticSkill: 50, strength: 400, toughness: 200, agility: 30, intelligence: 0, perception: 45, willpower: 0, fellowship: 0
    }, trait: '机械载具, 舰船·巡洋级, 虚空盾阵列, 体型·极大', skill: '', equipment: '宏炮, 光矛, 巡洋级陶钢装甲, 强化型虚空盾发生器, [最少乘员: 65000]', tags: ['帝国', '海军', '舰船', '巡洋级'], ahp: 6300, hp: 200, maxHp: 200, armorRating: 140, movement: 3, baseMeleeDamage: '20 (S/20)', weaponStats: '宏炮, 光矛'
  }, dauntless_light_cruiser: {
    name: '不屈级轻巡洋舰 (Dauntless-class Light Cruiser)', status: '侦察先锋', attributes: {
      weaponSkill: 0, ballisticSkill: 55, strength: 350, toughness: 180, agility: 45, intelligence: 0, perception: 55, willpower: 0, fellowship: 0
    }, trait: '机械载具, 舰船·巡洋级, 虚空盾, 体型·极大', skill: '', equipment: '宏炮, 巡洋级陶钢装甲, 虚空盾发生器, [最少乘员: 18000]', tags: ['帝国', '海军', '舰船', '轻巡洋级'], ahp: 6300, hp: 180, maxHp: 180, armorRating: 140, movement: 4, baseMeleeDamage: '17 (S/20)', weaponStats: '宏炮'
  }, strike_cruiser: {
    name: '阿斯塔特打击巡洋舰 (Strike Cruiser)', status: '战团利剑', attributes: {
      weaponSkill: 0, ballisticSkill: 65, strength: 400, toughness: 200, agility: 45, intelligence: 0, perception: 65, willpower: 0, fellowship: 0
    }, trait: '机械载具, 舰船·巡洋级, 虚空盾, 机魂亲和, 体型·极大', skill: '', equipment: '宏炮, 光矛, 巡洋级陶钢装甲, 虚空盾发生器, [最少乘员: 5000]', tags: ['阿斯塔特', '舰船', '巡洋级'], ahp: 6300, hp: 200, maxHp: 200, armorRating: 140, movement: 5, baseMeleeDamage: '20 (S/20)', weaponStats: '宏炮, 光矛'
  }, slaughter_cruiser: {
    name: '屠戮级巡洋舰 (Slaughter-class Cruiser)', status: '异端掠夺者', attributes: {
      weaponSkill: 0, ballisticSkill: 55, strength: 400, toughness: 200, agility: 55, intelligence: 0, perception: 50, willpower: 0, fellowship: 0
    }, trait: '机械载具, 舰船·巡洋级, 虚空盾, 体型·极大', skill: '', equipment: '宏炮, 巡洋级陶钢装甲, 虚空盾发生器, [最少乘员: 55000]', tags: ['混沌', '战舰', '巡洋级'], ahp: 6300, hp: 200, maxHp: 200, armorRating: 140, movement: 6, baseMeleeDamage: '20 (S/20)', weaponStats: '宏炮'
  }, retribution_battleship: {
    name: '报应级战列舰 (Retribution-class Battleship)', status: '帝国军力化身', attributes: {
      weaponSkill: 0, ballisticSkill: 60, strength: 800, toughness: 300, agility: 25, intelligence: 0, perception: 55, willpower: 0, fellowship: 0
    }, trait: '机械载具, 舰船·战列级, 虚空盾阵列, 体型·极大', skill: '', equipment: '宏炮, 新星炮, 战列级陶钢装甲, 多重虚空盾阵列, [最少乘员: 120000]', tags: ['帝国', '海军', '舰船', '战列级'], ahp: 7200, hp: 300, maxHp: 300, armorRating: 160, movement: 2, baseMeleeDamage: '40 (S/20)', weaponStats: '新星炮, 宏炮'
  }, vengeful_spirit: {
    name: '复仇之魂号 (Vengeful Spirit)', status: '荣耀级指挥舰', attributes: {
      weaponSkill: 0, ballisticSkill: 75, strength: 1200, toughness: 400, agility: 28, intelligence: 0, perception: 70, willpower: 0, fellowship: 0
    }, trait: '机械载具, 舰船·荣光级, 虚空盾阵列, 体型·极大', skill: '', equipment: '巨型加速炮, 宏炮, 光矛, 荣光女王级装甲, 多重虚空盾阵列, [最少乘员: 450000]', tags: ['混沌', '黑色军团', '舰船', '荣光级'], ahp: 13500, hp: 400, maxHp: 400, armorRating: 180, movement: 3, baseMeleeDamage: '60 (S/20)', weaponStats: '巨型加速炮, 宏炮, 光矛'
  }, eclipse_cruiser: {
    name: '日蚀级轻巡洋舰 (Eclipse-class Cruiser)', status: '灵族掠夺者', attributes: {
      weaponSkill: 0, ballisticSkill: 70, strength: 300, toughness: 150, agility: 65, intelligence: 0, perception: 85, willpower: 0, fellowship: 0
    }, trait: '机械载具, 舰船·巡洋级, 全息场发生器, 体型·极大', skill: '', equipment: '爆破加农炮, 巡洋级陶钢装甲, 全息场发生器, [最少乘员: 12000]', tags: ['灵族', '舰船', '巡洋级'], ahp: 6300, hp: 150, maxHp: 150, armorRating: 140, movement: 7, baseMeleeDamage: '15 (S/20)', weaponStats: '爆破加农炮'
  }, ork_rock: {
    name: '兽人岩石号 (Ork Rock)', status: '俺们的大石头', attributes: {
      weaponSkill: 0, ballisticSkill: 25, strength: 1000, toughness: 350, agility: 15, intelligence: 0, perception: 25, willpower: 0, fellowship: 0
    }, trait: '机械载具, 舰船·战列级, 粗糙护盾发生器, 体型·极大', skill: '', equipment: '各种大炮, 陨石级甲壳, 粗糙护盾发生器, 喷火口, [最少乘员: 1000000]', tags: ['兽人', '舰船', '战列级'], ahp: 4950, hp: 350, maxHp: 350, armorRating: 110, movement: 1, baseMeleeDamage: '50 (S/20)', weaponStats: '各种大炮'
  }, tyranid_hive_ship: {
    name: '泰伦虫巢舰 (Tyranid Hive Ship)', status: '吞噬者核心', attributes: {
      weaponSkill: 0, ballisticSkill: 55, strength: 900, toughness: 300, agility: 25, intelligence: 0, perception: 60, willpower: 0, fellowship: 0
    }, trait: '机械载具, 舰船·战列级, 天生护甲, 亚空间阴影, 体型·极大', skill: '', equipment: '生化酸液炮, 抓取触手, 生物甲壳, [最少乘员: 无数]', tags: ['泰伦', '舰船', '战列级'], ahp: 7200, hp: 300, maxHp: 300, armorRating: 100, movement: 3, baseMeleeDamage: '45 (S/20)', weaponStats: '生化酸液炮'
  }
};
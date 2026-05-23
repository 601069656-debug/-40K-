import { NPCProfile } from '../../../../types';

/**
 * 非战斗人员 (Non-Combatants)
 * 审计修正说明：
 * - 修正属性值为符合出身阶层和世界观的合理数值（凡人基准25-34）
 * - 出身阶层特质提供属性修正：巢都(敏捷+20潜行限定，移动力+2)，农业(力量+5，坚韧+5)，文明(智力+5，社交+5)，高科技(智力+10)，铸造(感知+10)，死亡(感知+20)，虚空(零重力敏捷+20)，忠嗣(射击+5，意志+10，社交-10)
 * - 装备提供少量修正（如机械教工作袍智力+5等）
 * - HP、MV、BMD严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10)（隧道之子移动力+2），BMD = floor(S/20)
 * - 护甲AR/AHP参考规则表（破损兽皮AR1/AHP2，密封服AR1/AHP1等）
 * - 特质仅保留合法名称，移除描述，用逗号分隔
 * - 技能替换为规则技能列表中的合法技能
 * - weaponStats仅保留武器名称
 */
export const NON_COMBATANTS_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'hive_world_citizen': {
    name: '巢都世界居民', status: '底层平民', attributes: {
      weaponSkill: 25, ballisticSkill: 25, strength: 25, toughness: 25, agility: 30, intelligence: 25, perception: 25, willpower: 25, fellowship: 20
    }, trait: '隧道之子, 体型·普通', skill: '潜行, 搜索', equipment: '旧工服', tags: ['帝国', '凡人', '平民', '巢都世界'], ahp: 0, hp: 5, maxHp: 5, armorRating: 0, movement: 5, baseMeleeDamage: '1 (S/20)', weaponStats: '无'
  }, 'agri_world_citizen': {
    name: '农业世界居民', status: '农场劳工', attributes: {
      weaponSkill: 25, ballisticSkill: 25, strength: 30, toughness: 30, agility: 25, intelligence: 20, perception: 25, willpower: 25, fellowship: 20
    }, trait: '强壮体魄, 体型·普通', skill: '生存, 攀爬', equipment: '耐磨工作服, 农具', tags: ['帝国', '凡人', '平民', '农业世界'], ahp: 0, hp: 6, maxHp: 6, armorRating: 0, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: '农具'
  }, 'civilized_world_citizen': {
    name: '文明世界居民', status: '城市职员', attributes: {
      weaponSkill: 20, ballisticSkill: 20, strength: 20, toughness: 20, agility: 25, intelligence: 30, perception: 25, willpower: 25, fellowship: 30
    }, trait: '圣典公民, 体型·普通', skill: '魅力, 逻辑, 普通知识·帝国', equipment: '整洁的制服', tags: ['帝国', '凡人', '平民', '文明世界'], ahp: 0, hp: 4, maxHp: 4, armorRating: 0, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: '无'
  }, 'high_tech_elite': {
    name: '高科技世界精英', status: '中层技师', attributes: {
      weaponSkill: 20, ballisticSkill: 20, strength: 20, toughness: 20, agility: 25, intelligence: 40, perception: 25, willpower: 25, fellowship: 25
    }, trait: '逻辑至上, 体型·普通', skill: '普通知识·技术, 逻辑, 调查', equipment: '高级技师袍, 数据板', tags: ['帝国', '凡人', '平民', '技术精英'], ahp: 0, hp: 4, maxHp: 4, armorRating: 0, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: '无'
  }, 'forge_world_layman': {
    name: '铸造世界信徒', status: '工厂劳奴', attributes: {
      weaponSkill: 25, ballisticSkill: 25, strength: 30, toughness: 30, agility: 20, intelligence: 30, perception: 35, willpower: 25, fellowship: 15
    }, trait: '工业直觉, 体型·普通', skill: '普通知识·技术, 搜索', equipment: '机械教工作袍, 扳手', tags: ['帝国', '凡人', '机械教', '铸造世界'], ahp: 2, hp: 6, maxHp: 6, armorRating: 1, movement: 2, baseMeleeDamage: '1 (S/20)', weaponStats: '扳手'
  }, 'death_world_survivor': {
    name: '死亡世界遗孤', status: '求生者', attributes: {
      weaponSkill: 35, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 20, perception: 40, willpower: 35, fellowship: 15
    }, trait: '荒野求生, 体型·普通', skill: '生存, 潜行, 追迹', equipment: '破损的兽皮, 骨刀', tags: ['帝国', '凡人', '幸存者', '死亡世界'], ahp: 2, hp: 6, maxHp: 6, armorRating: 1, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '骨刀'
  }, 'void_born_citizen': {
    name: '虚空之子', status: '舰船船员', attributes: {
      weaponSkill: 25, ballisticSkill: 25, strength: 20, toughness: 25, agility: 30, intelligence: 30, perception: 30, willpower: 30, fellowship: 25
    }, trait: '星海本能, 体型·普通', skill: '特技, 普通知识·技术, 学术知识·星象学', equipment: '密封服', tags: ['帝国', '凡人', '虚空之子', '空间站'], ahp: 1, hp: 5, maxHp: 5, armorRating: 1, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '无'
  }, 'schola_progenium_student': {
    name: '忠嗣学院学生', status: '见习生', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 25, toughness: 25, agility: 30, intelligence: 30, perception: 25, willpower: 35, fellowship: 15
    }, trait: '神圣职责, 体型·普通', skill: '战术, 普通知识·国教', equipment: '忠嗣领带制服, 练习剑', tags: ['帝国', '凡人', '精英教育', '忠嗣学院'], ahp: 0, hp: 5, maxHp: 5, armorRating: 0, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '练习剑'
  }
};
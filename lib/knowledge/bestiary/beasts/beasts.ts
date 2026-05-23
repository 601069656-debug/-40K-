import { NPCProfile } from '../../../../types';

/**
 * 野兽单位审计修正说明：
 * - 所有属性根据世界观设定进行合理分配，不再使用默认30
 * - HP、MV、BMD严格按公式计算：HP = max(1, floor(T/5))，MV = floor(Ag/10)（飞行单位使用飞行移动力=ceil(Ag/5)），BMD = floor(S/20)
 * - 天生护甲提供AR和AHP，数值根据体型和强度设定
 * - 特质仅保留规则内合法名称，移除描述，用逗号分隔
 * - 技能替换为规则技能列表中的合法技能
 * - 天生武器参照规则表中的数据
 */
export const BEASTS_DATA: Record<string, NPCProfile> = {
  ambull: {
    name: '安博兽 (Ambull)', status: '地下掠食者', attributes: {
      weaponSkill: 45, ballisticSkill: 10, strength: 65, toughness: 70, agility: 40, intelligence: 20, perception: 50, willpower: 50, fellowship: 10
    }, trait: '强化天生武器, 掘进突袭, 天生护甲, 体型·大型', skill: '追迹, 恐吓, 警觉', equipment: '无', tags: ['异形', '野兽', '掠食者', '大型'], ahp: 40, hp: 14, maxHp: 14, armorRating: 8, movement: 4, baseMeleeDamage: '3 (S/20)', weaponStats: '巨型挖掘螯'
  }, krootox: {
    name: '克鲁特野兽 (Krootox)', status: '重型骑兽', attributes: {
      weaponSkill: 50, ballisticSkill: 30, strength: 70, toughness: 65, agility: 35, intelligence: 25, perception: 45, willpower: 40, fellowship: 15
    }, trait: '天生武器, 体型·大型, 天生护甲, 四足生物', skill: '警觉, 恐吓', equipment: '无', tags: ['异形', '钛族', '野兽', '骑兽', '大型'], ahp: 35, hp: 13, maxHp: 13, armorRating: 7, movement: 3, baseMeleeDamage: '3 (S/20)', weaponStats: '粗壮肢体打击, 背负式克鲁特加农炮'
  }, kroot_hound: {
    name: '克鲁特犬 (Kroot Hound)', status: '猎犬', attributes: {
      weaponSkill: 45, ballisticSkill: 0, strength: 40, toughness: 40, agility: 60, intelligence: 20, perception: 55, willpower: 35, fellowship: 10
    }, trait: '天生武器, 天生护甲, 四足生物', skill: '追迹, 警觉', equipment: '无', tags: ['异形', '钛族', '野兽', '猎犬', '小型'], ahp: 12, hp: 8, maxHp: 8, armorRating: 2, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '撕扯利齿'
  }, fenrisian_wolf: {
    name: '芬里斯狼 (Fenrisian Wolf)', status: '极地掠食者', attributes: {
      weaponSkill: 40, ballisticSkill: 0, strength: 35, toughness: 35, agility: 55, intelligence: 20, perception: 50, willpower: 30, fellowship: 10
    }, trait: '天生武器, 寒霜气息, 天生护甲, 四足生物', skill: '追迹, 警觉', equipment: '无', tags: ['帝国', '芬里斯', '野兽', '狼群', '小型'], ahp: 10, hp: 7, maxHp: 7, armorRating: 2, movement: 5, baseMeleeDamage: '1 (S/20)', weaponStats: '寒霜利牙'
  }, thunderwolf: {
    name: '雷霆野狼 (Thunderwolf)', status: '重型战狼', attributes: {
      weaponSkill: 55, ballisticSkill: 0, strength: 70, toughness: 70, agility: 45, intelligence: 20, perception: 50, willpower: 40, fellowship: 10
    }, trait: '强化天生武器, 寒霜气息, 四足生物, 天生护甲, 体型·大型', skill: '恐吓, 追迹', equipment: '无', tags: ['帝国', '芬里斯', '野兽', '巨狼', '大型'], ahp: 35, hp: 14, maxHp: 14, armorRating: 7, movement: 4, baseMeleeDamage: '3 (S/20)', weaponStats: '粉碎性鄂部'
  }, catachan_devil: {
    name: '卡塔昌恶魔 (Catachan Devil)', status: '丛林霸主', attributes: {
      weaponSkill: 80, ballisticSkill: 0, strength: 120, toughness: 110, agility: 40, intelligence: 15, perception: 60, willpower: 70, fellowship: 5
    }, trait: '强化天生武器, 剧毒刺钩, 天生护甲, 体型·巨大', skill: '潜行, 恐吓, 警觉', equipment: '无', tags: ['异形', '卡塔昌', '野兽', '巨大'], ahp: 80, hp: 22, maxHp: 22, armorRating: 12, movement: 4, baseMeleeDamage: '6 (S/20)', weaponStats: '镰刀足, 剧毒尾刺'
  }, clawed_fiend: {
    name: '利爪猛兽 (Clawed Fiend)', status: '致命角斗兽', attributes: {
      weaponSkill: 70, ballisticSkill: 0, strength: 85, toughness: 80, agility: 50, intelligence: 15, perception: 45, willpower: 50, fellowship: 5
    }, trait: '强化天生武器, 狂暴捕食, 天生护甲, 体型·大型', skill: '恐吓', equipment: '无', tags: ['异形', '角斗兽', '野兽', '大型'], ahp: 50, hp: 16, maxHp: 16, armorRating: 9, movement: 5, baseMeleeDamage: '4 (S/20)', weaponStats: '多重利爪缠绕'
  }, megarachnid_prime: {
    name: '巨齿兽主宰 (Megarachnid Prime)', status: '虫巢掠食者', attributes: {
      weaponSkill: 85, ballisticSkill: 0, strength: 130, toughness: 120, agility: 50, intelligence: 15, perception: 55, willpower: 60, fellowship: 5
    }, trait: '强化天生武器, 天生护甲, 体型·巨大', skill: '恐吓, 警觉', equipment: '无', tags: ['异形', '巨齿兽', '野兽', '超大'], ahp: 90, hp: 24, maxHp: 24, armorRating: 14, movement: 5, baseMeleeDamage: '6 (S/20)', weaponStats: '飞旋足刃'
  }, harridan: {
    name: '哈利苏斯 (Harridan)', status: '泰伦生化泰坦', attributes: {
      weaponSkill: 90, ballisticSkill: 60, strength: 180, toughness: 160, agility: 60, intelligence: 30, perception: 70, willpower: 80, fellowship: 10
    }, trait: '强化天生武器, 飞行, 恐惧, 天生护甲, 体型·巨大', skill: '恐吓, 警觉', equipment: '无', tags: ['异形', '泰伦', '野兽', '飞行', '巨大'], ahp: 150, hp: 32, maxHp: 32, armorRating: 20, movement: 12, baseMeleeDamage: '9 (S/20)', weaponStats: '巨型利爪, 双联生物加农炮'
  }, carnifex_wild: {
    name: '卡尼菲克斯 (Carnifex)', status: '重装掠夺者', attributes: {
      weaponSkill: 85, ballisticSkill: 40, strength: 170, toughness: 150, agility: 35, intelligence: 15, perception: 50, willpower: 70, fellowship: 5
    }, trait: '强化天生武器, 恐惧, 天生护甲, 体型·巨大', skill: '恐吓, 生存', equipment: '无', tags: ['异形', '泰伦', '野兽', '重装', '巨大'], ahp: 120, hp: 30, maxHp: 30, armorRating: 18, movement: 3, baseMeleeDamage: '8 (S/20)', weaponStats: '碎骨大钳'
  }, fenrisian_kraken: {
    name: '芬里斯克拉肯 (Fenrisian Kraken)', status: '深海神话', attributes: {
      weaponSkill: 100, ballisticSkill: 0, strength: 300, toughness: 280, agility: 30, intelligence: 20, perception: 60, willpower: 90, fellowship: 5
    }, trait: '强化天生武器, 恐惧, 天生护甲, 体型·巨大', skill: '潜行, 恐吓', equipment: '无', tags: ['帝国', '芬里斯', '野兽', '神话', '巨大'], ahp: 200, hp: 56, maxHp: 56, armorRating: 25, movement: 3, baseMeleeDamage: '15 (S/20)', weaponStats: '缠绕触肢, 星辰吞噬者之口'
  }




};
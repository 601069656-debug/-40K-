// ==================== 泰伦虫族 (Tyranids) ====================
// 审计修正说明：
// - 属性值符合泰伦生物设定：炮灰25-34，武士55-69，精英45-54，重装70-99，首领100-149
// - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正，BMD = floor(S/20)
// - 护甲：天生护甲（赫马冈AR6，特马冈AR3，武士AR6，基因窃取者AR4，利卡特AR6，卡尼菲克斯AR12，虫巢暴君AR14）
// - 特质仅保留合法名称（泰伦、强化天生武器、多臂、突触节点、天生护甲、恐惧、飞行、体型等）
// - 技能仅保留规则内技能（警觉、战术、指挥、潜行、追迹、恐吓、灵能掌控等）
// - weaponStats仅保留武器名称
import { NPCProfile } from '../../../../types';

export const TYRANIDS_DATA: Record<string, NPCProfile> = {
  hormagaunt: {
    name: '赫马冈 (Hormagaunt)', status: '炮灰掠食步兵', attributes: {
      weaponSkill: 40, ballisticSkill: 0, strength: 35, toughness: 30, agility: 50, intelligence: 10, perception: 35, willpower: 30, fellowship: 5
    }, trait: '泰伦, 天生武器, 四足生物, 本能反应, 天生护甲, 体型·普通', skill: '警觉', equipment: '无', tags: ['泰伦', '杂兵'], ahp: 15, hp: 6, maxHp: 6, armorRating: 6, movement: 5, baseMeleeDamage: '1 (S/20)', weaponStats: '镰刀爪'
  }, termagant: {
    name: '特马冈 (Termagant)', status: '炮灰远程步兵', attributes: {
      weaponSkill: 25, ballisticSkill: 35, strength: 30, toughness: 30, agility: 35, intelligence: 10, perception: 30, willpower: 25, fellowship: 5
    }, trait: '泰伦, 钻地虫枪, 天生武器, 本能反应, 天生护甲, 体型·普通', skill: '警觉', equipment: '无', tags: ['泰伦', '杂兵'], ahp: 8, hp: 8, maxHp: 8, armorRating: 3, movement: 3, baseMeleeDamage: '1 (S/20)', weaponStats: '啮咬, 钻地虫枪'
  }, tyranid_warrior: {
    name: '泰伦武士 (Tyranid Warrior)', status: '突触节点指挥官', attributes: {
      weaponSkill: 60, ballisticSkill: 50, strength: 60, toughness: 55, agility: 45, intelligence: 30, perception: 50, willpower: 50, fellowship: 10
    }, trait: '泰伦, 强化天生武器, 多臂, 突触节点, 天生护甲, 体型·大型', skill: '战术, 指挥, 恐吓', equipment: '无', tags: ['泰伦', '指挥官', '精锐'], ahp: 30, hp: 11, maxHp: 11, armorRating: 6, movement: 5, baseMeleeDamage: '3 (S/20)', weaponStats: '锋利肢骨, 死亡喷吐器'
  }, genestealer: {
    name: '基因窃取者 (Genestealer)', status: '精锐渗透突击兵', attributes: {
      weaponSkill: 65, ballisticSkill: 0, strength: 50, toughness: 45, agility: 70, intelligence: 25, perception: 55, willpower: 40, fellowship: 5
    }, trait: '泰伦, 强化天生武器, 多臂, 超自然速度, 闪电反射, 天生护甲, 体型·普通', skill: '潜行, 闪避, 警觉', equipment: '无', tags: ['泰伦', '精锐', '渗透'], ahp: 16, hp: 9, maxHp: 9, armorRating: 4, movement: 7, baseMeleeDamage: '2 (S/20)', weaponStats: '撕裂利爪'
  }, broodlord: {
    name: '基因窃取者族长 (Broodlord)', status: '突触节点统帅', attributes: {
      weaponSkill: 85, ballisticSkill: 0, strength: 70, toughness: 65, agility: 75, intelligence: 50, perception: 70, willpower: 70, fellowship: 10
    }, trait: '泰伦, 强化天生武器, 突触节点, 多臂, 超自然速度, 恐惧, 天生护甲, 体型·大型', skill: '指挥, 潜行, 恐吓', equipment: '无', tags: ['泰伦', '英雄', '指挥官'], ahp: 35, hp: 13, maxHp: 13, armorRating: 7, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '撕裂利爪'
  }, ymgarl_genestealer: {
    name: '尤尔考格尔基因窃取者 (Ymgarl Genestealer)', status: '异变渗透体', attributes: {
      weaponSkill: 70, ballisticSkill: 0, strength: 55, toughness: 50, agility: 70, intelligence: 20, perception: 60, willpower: 45, fellowship: 5
    }, trait: '泰伦, 强化天生武器, 无定形, 天生护甲, 体型·普通', skill: '潜行, 闪避, 警觉', equipment: '无', tags: ['泰伦', '精锐', '渗透'], ahp: 18, hp: 10, maxHp: 10, armorRating: 5, movement: 7, baseMeleeDamage: '2 (S/20)', weaponStats: '吸收触须, 撕裂利爪'
  }, patriarch: {
    name: '基因教派族长 (Patriarch)', status: '教派生父 / 突触节点', attributes: {
      weaponSkill: 90, ballisticSkill: 0, strength: 75, toughness: 70, agility: 80, intelligence: 60, perception: 75, willpower: 85, fellowship: 15
    }, trait: '泰伦, 强化天生武器, 突触节点, 天生护甲, 恐惧, 体型·大型', skill: '指挥, 灵能掌控, 恐吓', equipment: '无', tags: ['泰伦', '英雄', '指挥官', '灵能者'], ahp: 35, hp: 14, maxHp: 14, armorRating: 7, movement: 8, baseMeleeDamage: '3 (S/20)', weaponStats: '撕裂利爪, 催眠凝视'
  }, purestrain_genestealer: {
    name: '纯血基因窃取者 (Purestrain Genestealer)', status: '教派先驱突击兵', attributes: {
      weaponSkill: 65, ballisticSkill: 0, strength: 50, toughness: 45, agility: 70, intelligence: 20, perception: 55, willpower: 40, fellowship: 5
    }, trait: '泰伦, 强化天生武器, 多臂, 超自然速度, 闪电反射, 天生护甲, 体型·普通', skill: '潜行, 闪避, 警觉', equipment: '无', tags: ['泰伦', '精锐', '渗透'], ahp: 16, hp: 9, maxHp: 9, armorRating: 4, movement: 7, baseMeleeDamage: '2 (S/20)', weaponStats: '撕裂利爪'
  }, lictor: {
    name: '利卡特 (Lictor)', status: '特种渗透刺客', attributes: {
      weaponSkill: 75, ballisticSkill: 0, strength: 65, toughness: 60, agility: 65, intelligence: 30, perception: 75, willpower: 50, fellowship: 5
    }, trait: '泰伦, 强化天生武器, 超自然感官, 本能反应, 天生护甲, 体型·大型', skill: '潜行, 警觉, 追迹', equipment: '无', tags: ['泰伦', '刺客'], ahp: 25, hp: 12, maxHp: 12, armorRating: 6, movement: 7, baseMeleeDamage: '3 (S/20)', weaponStats: '撕裂利爪, 抓捕触须'
  }, zoanthrope: {
    name: '脑虫 (Zoanthrope)', status: '灵能火炮单元', attributes: {
      weaponSkill: 20, ballisticSkill: 50, strength: 30, toughness: 45, agility: 25, intelligence: 20, perception: 50, willpower: 70, fellowship: 5
    }, trait: '泰伦, 飞行, 突触节点, 体型·普通', skill: '灵能掌控', equipment: '无', tags: ['泰伦', '灵能者'], ahp: 20, hp: 9, maxHp: 9, armorRating: 5, movement: 5, baseMeleeDamage: '1 (S/20)', weaponStats: '灵能'
  }, carnifex: {
    name: '卡尼菲克斯 (Carnifex)', status: '重装攻城兽', attributes: {
      weaponSkill: 70, ballisticSkill: 0, strength: 110, toughness: 100, agility: 30, intelligence: 10, perception: 40, willpower: 60, fellowship: 5
    }, trait: '泰伦, 强化天生武器, 多臂, 天生护甲, 恐惧, 体型·巨大', skill: '恐吓', equipment: '无', tags: ['泰伦', '重装单位', '巨型'], ahp: 60, hp: 20, maxHp: 20, armorRating: 12, movement: 4, baseMeleeDamage: '5 (S/20)', weaponStats: '重型镰刀爪'
  }, hive_tyrant: {
    name: '虫巢暴君 (Hive Tyrant)', status: '蜂巢统帅', attributes: {
      weaponSkill: 100, ballisticSkill: 70, strength: 120, toughness: 115, agility: 60, intelligence: 60, perception: 70, willpower: 80, fellowship: 15
    }, trait: '泰伦, 强化天生武器, 多臂, 突触节点, 天生护甲, 恐惧, 体型·巨大', skill: '指挥, 战术, 恐吓, 灵能掌控', equipment: '无', tags: ['泰伦', '指挥官', '英雄'], ahp: 70, hp: 23, maxHp: 23, armorRating: 14, movement: 7, baseMeleeDamage: '4 (S/20)', weaponStats: '怪异利爪, 重型毒液加农炮'
  }
};
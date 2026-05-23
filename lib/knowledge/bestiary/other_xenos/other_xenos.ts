// ==================== 其他异形 (Other Xenos) ====================
// 审计修正说明：
// - 修正属性值为符合各个异形种族设定的合理数值
// - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正，BMD = floor(S/20)
// - 护甲值参考天生护甲或装备护甲
// - 特质仅保留合法名称，移除描述，用逗号分隔（如熵能场、蛆虫集合体等已在规则特质中）
// - 技能仅保留规则列表中的合法技能（潜行、警觉、指挥、战术、恐吓、闪避、欺诈、医疗等）
// - weaponStats仅保留武器名称，武器均为异形特有，已在规则武器列表中
import { NPCProfile } from "../../../../types";

export const OTHER_XENOS_DATA: Record<string, NPCProfile> = {
  hrud_migrator: {
    name: '赫鲁德迁徙者 (Hrud Migrator)', status: '拾荒者', attributes: {
      weaponSkill: 30, ballisticSkill: 45, strength: 25, toughness: 35, agility: 40, intelligence: 40, perception: 50, willpower: 45, fellowship: 15
    }, trait: '熵能场, 异界存在, 体型·普通', skill: '潜行, 警觉', equipment: '熵能步枪, 衣物', tags: ['异形', '赫鲁德', '拾荒者'], ahp: 0, hp: 7, maxHp: 7, armorRating: 0, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '熵能步枪'
  }, rangdan_elder: {
    name: '朗格长老 (Rangdan Elder)', status: '灭绝者', attributes: {
      weaponSkill: 85, ballisticSkill: 70, strength: 120, toughness: 110, agility: 40, intelligence: 80, perception: 75, willpower: 100, fellowship: 30
    }, trait: '异界存在, 怪异生理, 体型·巨大', skill: '指挥, 战术, 恐吓', equipment: '屠杀射线', tags: ['异形', '朗格', '灾厄'], ahp: 0, hp: 22, maxHp: 22, armorRating: 0, movement: 5, baseMeleeDamage: '6 (S/20)', weaponStats: '屠杀射线'
  }, slaugth_destructor: {
    name: '斯拉德毁灭者 (Slaugth Destructor)', status: '食尸怪物', attributes: {
      weaponSkill: 55, ballisticSkill: 40, strength: 60, toughness: 65, agility: 35, intelligence: 70, perception: 65, willpower: 70, fellowship: 20
    }, trait: '蛆虫集合体, 异界存在, 体型·大型', skill: '医疗, 欺诈, 闪避', equipment: '衣物', tags: ['异形', '斯拉德', '恐怖'], ahp: 0, hp: 13, maxHp: 13, armorRating: 0, movement: 4, baseMeleeDamage: '3 (S/20)', weaponStats: '腐尸震荡波'
  }, catachan_face_eater: {
    name: '卡塔昌噬脸者 (Face-eater)', status: '寄生掠食者', attributes: {
      weaponSkill: 35, ballisticSkill: 0, strength: 20, toughness: 20, agility: 45, intelligence: 15, perception: 50, willpower: 25, fellowship: 5
    }, trait: '基因锚定, 天生武器, 体型·微小', skill: '潜行, 追迹', equipment: '无', tags: ['异形', '野兽', '寄生'], ahp: 4, hp: 4, maxHp: 4, armorRating: 2, movement: 4, baseMeleeDamage: '1 (S/20)', weaponStats: '生物咬勾'
  }, thyrrus_performer: {
    name: '索姆族表演者 (Thyrrus Performer)', status: '表演者', attributes: {
      weaponSkill: 60, ballisticSkill: 50, strength: 45, toughness: 40, agility: 65, intelligence: 50, perception: 55, willpower: 50, fellowship: 60
    }, trait: '戏剧性战争, 体型·普通', skill: '特技, 欺诈, 闪避', equipment: '闪光源射枪, 提鲁斯表演服', tags: ['异形', '索姆', '战士'], ahp: 0, hp: 8, maxHp: 8, armorRating: 2, movement: 0, baseMeleeDamage: '2 (S/20)', weaponStats: '闪光源射枪'
  }, megarachnid_warrior: {
    name: '梅格拉尼战士 (Megarachnid)', status: '杀戳之子', attributes: {
      weaponSkill: 65, ballisticSkill: 0, strength: 55, toughness: 60, agility: 50, intelligence: 20, perception: 55, willpower: 45, fellowship: 5
    }, trait: '天生武器, 天生护甲, 体型·大型', skill: '闪避, 警觉', equipment: '无', tags: ['异形', '梅格拉尼', '野兽'], ahp: 30, hp: 12, maxHp: 12, armorRating: 6, movement: 6, baseMeleeDamage: '2 (S/20)', weaponStats: '尖刺足刃'
  }, nephilim_parasite: {
    name: '内菲林寄生体 (Nephilim)', status: '灵魂掠食者', attributes: {
      weaponSkill: 50, ballisticSkill: 50, strength: 40, toughness: 35, agility: 60, intelligence: 65, perception: 70, willpower: 70, fellowship: 45
    }, trait: '灵质进食, 异界存在, 飞行, 体型·普通', skill: '欺诈, 魅惑, 潜行', equipment: '悲鸣爆能枪', tags: ['异形', '内菲林', '渗透者'], ahp: 6, hp: 7, maxHp: 7, armorRating: 2, movement: 12, baseMeleeDamage: '2 (S/20)', weaponStats: '悲鸣爆能枪'
  }, rakgol_marauder: {
    name: '拉克莱掠夺者 (Rak\'Gol)', status: '辐射海盗', attributes: {
      weaponSkill: 55, ballisticSkill: 45, strength: 70, toughness: 65, agility: 35, intelligence: 35, perception: 50, willpower: 55, fellowship: 15
    }, trait: '辐射力场, 机械化·中级, 多臂, 体型·大型', skill: '恐吓, 驾驶', equipment: '辐射斩首刀, 粒子刺枪', tags: ['异形', '拉克莱', '海盗'], ahp: 25, hp: 13, maxHp: 13, armorRating: 5, movement: 4, baseMeleeDamage: '3 (S/20)', weaponStats: '辐射斩首刀, 粒子刺枪'
  }
};
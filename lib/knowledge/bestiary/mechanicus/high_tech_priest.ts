import { NPCProfile } from '../../../../types';

/**
 * 机械教 - 高阶技术神甫 (High Tech-Priest / Magos)
 * 审计修正说明：
 * - 修正属性值为符合高阶技术神甫设定的合理数值（传奇/英雄级，智力、意志极高）
 * - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（大型+1），BMD = floor(S/20)
 * - 护甲：冥府型战术无畏装甲（AR11/AHP30，力量+35，意志+10，敏捷-25）
 * - 特质：机魂通晓、机械化·高级、多臂、体型·大型（均为合法特质）
 * - 技能：逻辑、普通知识·技术、学术知识·古代史（替代“星工”）、禁忌知识·古代技术、指挥、战术
 * - weaponStats仅保留武器名称
 * - 移除自创特质和技能
 */
export const HIGH_TECH_PRIEST_BESTIARY: Record<string, Partial<NPCProfile>> = {
  'high_tech_priest': {
    name: '高阶技术神甫', status: '真理探索者', attributes: {
      weaponSkill: 50, ballisticSkill: 60, strength: 55, toughness: 60, agility: 25, intelligence: 95, perception: 70, willpower: 85, fellowship: 35
    }, trait: '机魂通晓, 机械化·高级, 多臂, 体型·大型', skill: '逻辑, 普通知识·技术, 学术知识·古代史, 禁忌知识·古代技术, 指挥, 战术', equipment: '万机神之斧, 伺服臂组, 磷火手枪, 冥府型战术无畏装甲', tags: ['帝国', '机械教', '高阶神甫', '指挥官'], ahp: 30, hp: 12, maxHp: 12, armorRating: 11, movement: 3, baseMeleeDamage: '2 (S/20)', weaponStats: '万机神之斧, 伺服臂组, 磷火手枪'
  }
};
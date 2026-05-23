import { NPCProfile } from '../../../../types';

/**
 * 行星防卫军 (PDF)
 * 派系特质: 家乡守卫者
 * 护甲:
 * - 简易防弹衣: AR 1, AHP 4
 * - 行星防卫军轻型甲壳甲: AR 4, AHP 10, 敏捷-5
 */
export const pdfUnits: Record<string, Partial<NPCProfile>> = {
  'pdf_soldier': {
    id: 'pdf_soldier', name: '行星防卫军士兵', status: '本土守备', attributes: {
      weaponSkill: 30, ballisticSkill: 30, strength: 30, toughness: 30, agility: 30, intelligence: 28, perception: 30, willpower: 28, fellowship: 28
    }, trait: '家乡守卫者, 体型·普通', // 移除非法特质
    skill: '普通知识·帝国, 搜索', // 替换初级知识
    equipment: '简易防弹衣, 激光手枪, 刺刀', ahp: 4, hp: 6, maxHp: 6, armorRating: 1, movement: 3, tags: ['帝国', '行星防卫军', '士兵', '民兵'], aiGeneratedRecord: '星球本土的二线防御力量，通常缺乏训练与实战经验。', lastUpdated: Date.now(), bondLevel: 0, resistance: 'Low', baseMeleeDamage: '1 (S/20)', weaponStats: '激光手枪, 刺刀'
  }, 'pdf_veteran': {
    id: 'pdf_veteran', name: '行星防卫军老兵', status: '沙场幸存者', attributes: {
      weaponSkill: 35, ballisticSkill: 35, strength: 35, toughness: 35, agility: 28, // 33基础 -5(轻型甲壳甲)
      intelligence: 30, perception: 35, willpower: 33, fellowship: 30
    }, trait: '家乡守卫者, 战火磨砺, 体型·普通', // 添加老兵特质
    skill: '警觉, 战术, 搜索, 闪避', // 移除非法技能，替换
    equipment: '行星防卫军轻型甲壳甲, 激光冲锋枪, 破片手雷', ahp: 10, hp: 7, maxHp: 7, armorRating: 4, movement: 2, // Ag=28 -> floor(28/10)=2
    tags: ['帝国', '行星防卫军', '老兵'], aiGeneratedRecord: '在多次叛乱或外敌入侵中幸存下来的本土战士，比一般士兵更具韧性。', lastUpdated: Date.now(), bondLevel: 0, resistance: 'Low', baseMeleeDamage: '1 (S/20)', weaponStats: '激光冲锋枪, 破片手雷'
  }
};
// ==================== 40K原体/恶魔原体 (Primarchs of 40K) - 统一修正版 ====================
// 修正说明：
// - 未升魔原体（基里曼、狮王）：属性150-220（同30K标准）
// - 恶魔原体：属性250-350（天灾级），部分极端值（安格隆WS可稍高但不超过380）
// - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（巨大+3），BMD = floor(S/20)
// - 护甲AR/AHP参考恶魔原体甲（约35 AR/150 AHP）
// - 特质合法化：原体、恶魔、体型·巨大、百战幸存、英雄之躯、星海本能等
// - 技能仅保留规则内合法技能（指挥、战术、闪避、恐吓、灵能掌控等）
// - weaponStats仅保留武器名称
export const primarchsData = {
  "imperium_guilliman": {
    "name": "罗伯特·基里曼 (Roboute Guilliman)", "status": "帝国摄政 / 极限战士原体", "attributes": {
      "weaponSkill": 195, "ballisticSkill": 175, "strength": 190, "toughness": 195, "agility": 180, "intelligence": 225, "perception": 185, "willpower": 210, "fellowship": 215
    }, "trait": "人类帝国摄政, 原体, 百战幸存, 英雄之躯, 星海本能, 体型·大型", "skill": "指挥, 战术, 逻辑, 警觉", "equipment": "帝皇之剑, 统御之手, 命运铠甲", "tags": ["帝国", "阿斯塔特", "原体", "极限战士", "英雄"], "hp": 39, "maxHp": 39, "ahp": 120, "armorRating": 28, "movement": 19, "baseMeleeDamage": "9 (S/20)", "weaponStats": "帝皇之剑, 统御之手"
  }, "imperium_lion": {
    "name": "莱昂·艾尔·庄森 (Lion El'Jonson)", "status": "虚无骑士 / 暗黑天使原体", "attributes": {
      "weaponSkill": 210, "ballisticSkill": 160, "strength": 195, "toughness": 205, "agility": 195, "intelligence": 185, "perception": 200, "willpower": 205, "fellowship": 155
    }, "trait": "森林步法, 第一军团之主, 原体, 百战幸存, 英雄之躯, 体型·大型", "skill": "潜行, 战术, 警觉, 追迹", "equipment": "忠诚之剑, 费尔之盾, 忠诚铠甲", "tags": ["帝国", "阿斯塔特", "原体", "暗黑天使", "英雄"], "hp": 41, "maxHp": 41, "ahp": 135, "armorRating": 30, "movement": 20, "baseMeleeDamage": "9 (S/20)", "weaponStats": "忠诚之剑, 费尔之盾"
  }, "chaos_mortarion": {
    "name": "莫塔里安 (Mortarion)", "status": "纳垢恶魔原体", "attributes": {
      "weaponSkill": 250, "ballisticSkill": 200, "strength": 280, "toughness": 320, "agility": 150, "intelligence": 190, "perception": 190, "willpower": 280, "fellowship": 100
    }, "trait": "恶魔原体, 剧毒世界领主, 宿命之翼, 原体, 恶魔, 肉体再生, 腐败坚韧, 体型·巨大", "skill": "生存, 灵能掌控, 战术, 恐吓", "equipment": "寂静, 提灯, 恶魔原体甲", "tags": ["混沌", "纳垢", "恶魔", "死亡守卫", "原体"], "hp": 64, "maxHp": 64, "ahp": 150, "armorRating": 35, "movement": 18, "baseMeleeDamage": "14 (S/20)", "weaponStats": "寂静, 提灯"
  }, "chaos_magnus": {
    "name": "马格努斯 (Magnus the Red)", "status": "奸奇恶魔原体", "attributes": {
      "weaponSkill": 190, "ballisticSkill": 190, "strength": 210, "toughness": 210, "agility": 190, "intelligence": 350, "perception": 310, "willpower": 380, "fellowship": 180
    }, "trait": "恶魔原体, 灵能至高者, 虚实体, 全知之眼, 原体, 恶魔, 亚空间化身, 体型·巨大", "skill": "灵能掌控, 禁忌知识·亚空间, 逻辑, 警觉", "equipment": "马格努斯之刃, 恶魔原体甲", "tags": ["混沌", "奸奇", "恶魔", "千子", "原体"], "hp": 42, "maxHp": 42, "ahp": 150, "armorRating": 35, "movement": 22, "baseMeleeDamage": "10 (S/20)", "weaponStats": "马格努斯之刃"
  }, "chaos_angron": {
    "name": "安格隆 (Angron)", "status": "恐虐恶魔原体", "attributes": {
      "weaponSkill": 360, "ballisticSkill": 90, "strength": 350, "toughness": 340, "agility": 280, "intelligence": 100, "perception": 180, "willpower": 300, "fellowship": 60
    }, "trait": "恶魔原体, 重生之怒, 原体, 恶魔, 屠夫之钉, 鲜血狂怒, 体型·巨大", "skill": "战术, 恐吓, 闪避", "equipment": "黑刃, 萨马列尔, 恶魔原体甲", "tags": ["混沌", "恐虐", "恶魔", "吞世者", "原体"], "hp": 68, "maxHp": 68, "ahp": 150, "armorRating": 35, "movement": 31, "baseMeleeDamage": "17 (S/20)", "weaponStats": "黑刃, 萨马列尔"
  }, "chaos_fulgrim": {
    "name": "福格瑞姆 (Fulgrim)", "status": "色孽恶魔原体", "attributes": {
      "weaponSkill": 340, "ballisticSkill": 180, "strength": 240, "toughness": 220, "agility": 350, "intelligence": 200, "perception": 220, "willpower": 220, "fellowship": 280
    }, "trait": "恶魔原体, 完美国度, 原体, 恶魔, 完美主义, 极乐迅捷, 体型·巨大", "skill": "闪避, 魅力, 警觉, 灵能掌控", "equipment": "剌人剑, 恶魔原体甲", "tags": ["混沌", "色孽", "恶魔", "帝皇之子", "原体"], "hp": 44, "maxHp": 44, "ahp": 150, "armorRating": 35, "movement": 38, "baseMeleeDamage": "12 (S/20)", "weaponStats": "剌人剑"
  }
};
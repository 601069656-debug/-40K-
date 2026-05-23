// ==================== 30K原体 (Primarchs of 30K) - 统一修正版 ====================
// 修正说明：
// - 未升魔原体属性范围：150-220（传奇英雄级，符合规则表）
// - HP = max(1, floor(T/5))，MV = floor(Ag/10) + 体型修正（大型+1），BMD = floor(S/20)
// - 护甲AR/AHP参考规则表中的原体级护甲（约20-25 AR, 100-140 AHP）
// - 特质合法化：原体、体型·大型、百战幸存、英雄之躯、星海本能等
// - 技能仅保留规则内合法技能（指挥、战术、潜行、警觉、闪避、灵能掌控、恐吓等）
// - weaponStats仅保留武器名称
export const primarchs30kData = {
  "lion_el_jonson_30k": {
    "name": "莱昂·艾尔庄森 (Lion El'Jonson) - 30K", "status": "暗黑天使原体 / 第一军团之主", "attributes": {
      "weaponSkill": 200, "ballisticSkill": 160, "strength": 190, "toughness": 190, "agility": 180, "intelligence": 170, "perception": 180, "willpower": 190, "fellowship": 150
    }, "trait": "森林步法, 第一军团之主, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "指挥, 战术, 逻辑, 警觉", "equipment": "狮心剑, 狮子盔甲", "tags": ["帝国", "阿斯塔特", "原体", "暗黑天使", "30K", "英雄"], "hp": 38, "maxHp": 38, "ahp": 120, "armorRating": 25, "movement": 19, "baseMeleeDamage": "9 (S/20)", "weaponStats": "狮心剑"
  }, "fulgrim_30k": {
    "name": "福格瑞姆 (Fulgrim) - 30K", "status": "帝皇之子原体 / 完美追求者", "attributes": {
      "weaponSkill": 210, "ballisticSkill": 160, "strength": 180, "toughness": 170, "agility": 200, "intelligence": 170, "perception": 170, "willpower": 180, "fellowship": 190
    }, "trait": "完美国度, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "闪避, 魅力, 战术, 警觉", "equipment": "剌人剑, 完美之铠", "tags": ["帝国", "阿斯塔特", "原体", "帝皇之子", "30K", "英雄"], "hp": 34, "maxHp": 34, "ahp": 110, "armorRating": 22, "movement": 21, "baseMeleeDamage": "9 (S/20)", "weaponStats": "剌人剑"
  }, "perturabo_30k": {
    "name": "佩图拉博 (Perturabo) - 30K", "status": "钢铁勇士原体 / 围攻大师", "attributes": {
      "weaponSkill": 185, "ballisticSkill": 170, "strength": 200, "toughness": 200, "agility": 160, "intelligence": 200, "perception": 170, "willpower": 190, "fellowship": 140
    }, "trait": "围攻大师, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "战术, 逻辑, 普通知识·技术, 指挥", "equipment": "破炉者, 标志之甲", "tags": ["帝国", "阿斯塔特", "原体", "钢铁勇士", "30K", "英雄"], "hp": 40, "maxHp": 40, "ahp": 140, "armorRating": 32, "movement": 17, "baseMeleeDamage": "10 (S/20)", "weaponStats": "碎裂者"
  }, "jaghatai_khan_30k": {
    "name": "察合台可汗 (Jaghatai Khan) - 30K", "status": "白色伤疤原体 / 大汗", "attributes": {
      "weaponSkill": 195, "ballisticSkill": 155, "strength": 185, "toughness": 180, "agility": 215, "intelligence": 165, "perception": 180, "willpower": 175, "fellowship": 170
    }, "trait": "迅捷如风, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "战术, 驾驶, 警觉, 闪避", "equipment": "白虎弯刀, 追风者盔甲", "tags": ["帝国", "阿斯塔特", "原体", "白色伤疤", "30K", "英雄"], "hp": 36, "maxHp": 36, "ahp": 110, "armorRating": 22, "movement": 22, "baseMeleeDamage": "9 (S/20)", "weaponStats": "白虎弯刀"
  }, "konrad_curze_30k": {
    "name": "康拉德·科兹 (Konrad Curze) - 30K", "status": "午夜领主原体 / 夜之主", "attributes": {
      "weaponSkill": 210, "ballisticSkill": 140, "strength": 195, "toughness": 185, "agility": 200, "intelligence": 180, "perception": 210, "willpower": 190, "fellowship": 130
    }, "trait": "恐惧笼罩, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "潜行, 审讯, 战术, 警觉", "equipment": "慈悲与宽恕, 恶梦之甲", "tags": ["帝国", "阿斯塔特", "原体", "午夜领主", "30K", "英雄"], "hp": 37, "maxHp": 37, "ahp": 110, "armorRating": 22, "movement": 21, "baseMeleeDamage": "9 (S/20)", "weaponStats": "慈悲与宽恕"
  }, "ferrus_manus_30k": {
    "name": "费鲁斯·马努斯 (Ferrus Manus) - 30K", "status": "钢铁之手原体 / 戈尔贡", "attributes": {
      "weaponSkill": 195, "ballisticSkill": 150, "strength": 215, "toughness": 210, "agility": 170, "intelligence": 185, "perception": 170, "willpower": 190, "fellowship": 145
    }, "trait": "钢铁之躯, 冷酷信仰, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "逻辑, 普通知识·技术, 战术, 恐吓", "equipment": "破炉者, 戈尔贡之铠", "tags": ["帝国", "阿斯塔特", "原体", "钢铁之手", "30K", "英雄"], "hp": 42, "maxHp": 42, "ahp": 140, "armorRating": 32, "movement": 18, "baseMeleeDamage": "10 (S/20)", "weaponStats": "碎裂者"
  }, "angron_30k": {
    "name": "安格隆 (Angron) - 30K", "status": "吞世者原体 / 红天使", "attributes": {
      "weaponSkill": 225, "ballisticSkill": 120, "strength": 215, "toughness": 200, "agility": 195, "intelligence": 130, "perception": 165, "willpower": 190, "fellowship": 120
    }, "trait": "原体, 体型·大型, 屠夫之钉, 百战幸存, 英雄之躯", "skill": "战术, 恐吓, 闪避", "equipment": "血父与血子, 吞世者原体甲", "tags": ["帝国", "阿斯塔特", "原体", "吞世者", "30K", "英雄"], "hp": 40, "maxHp": 40, "ahp": 120, "armorRating": 25, "movement": 20, "baseMeleeDamage": "10 (S/20)", "weaponStats": "血父与血子"
  }, "roboute_guilliman_30k": {
    "name": "罗伯特·基里曼 (Roboute Guilliman) - 30K", "status": "极限战士原体 / 奥特拉玛之主", "attributes": {
      "weaponSkill": 190, "ballisticSkill": 170, "strength": 185, "toughness": 185, "agility": 175, "intelligence": 215, "perception": 180, "willpower": 200, "fellowship": 200
    }, "trait": "战术大师, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "指挥, 战术, 逻辑, 魅力", "equipment": "統御之剑, 统御之手, 理智之甲", "tags": ["帝国", "阿斯塔特", "原体", "极限战士", "30K", "英雄"], "hp": 37, "maxHp": 37, "ahp": 120, "armorRating": 25, "movement": 18, "baseMeleeDamage": "9 (S/20)", "weaponStats": "統御之剑, 统御之手"
  }, "mortarion_30k": {
    "name": "莫塔里安 (Mortarion) - 30K", "status": "死亡守卫原体 / 苍白之主", "attributes": {
      "weaponSkill": 190, "ballisticSkill": 150, "strength": 200, "toughness": 220, "agility": 160, "intelligence": 170, "perception": 170, "willpower": 200, "fellowship": 140
    }, "trait": "瘟疫坚毅, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "战术, 警觉, 生存, 恐吓", "equipment": "寂静, 提灯, 巴巴鲁斯之甲", "tags": ["帝国", "阿斯塔特", "原体", "死亡守卫", "30K", "英雄"], "hp": 44, "maxHp": 44, "ahp": 140, "armorRating": 32, "movement": 17, "baseMeleeDamage": "10 (S/20)", "weaponStats": "寂静, 提灯"
  }, "magnus_the_red_30k": {
    "name": "马格努斯 (Magnus the Red) - 30K", "status": "千子原体 / 独眼巨人", "attributes": {
      "weaponSkill": 170, "ballisticSkill": 170, "strength": 180, "toughness": 175, "agility": 175, "intelligence": 240, "perception": 210, "willpower": 245, "fellowship": 160
    }, "trait": "原体, 体型·大型, 亚空间术士, 百战幸存, 英雄之躯", "skill": "灵能掌控, 禁忌知识·亚空间, 逻辑, 战术", "equipment": "普洛斯佩罗法杖, 阿蒙之铠", "tags": ["帝国", "阿斯塔特", "原体", "千子", "30K", "英雄"], "hp": 35, "maxHp": 35, "ahp": 100, "armorRating": 20, "movement": 18, "baseMeleeDamage": "9 (S/20)", "weaponStats": "普洛斯佩罗法杖"
  }, "horus_lupercal_30k": {
    "name": "荷鲁斯·卢佩卡尔 (Horus Lupercal) - 30K", "status": "影月苍狼原体 / 帝国战帅", "attributes": {
      "weaponSkill": 215, "ballisticSkill": 180, "strength": 205, "toughness": 200, "agility": 190, "intelligence": 195, "perception": 185, "willpower": 215, "fellowship": 215
    }, "trait": "天狼之裔, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "指挥, 战术, 魅力, 警觉", "equipment": "荷鲁斯之爪, 碎船者, 巨蟒之鳞", "tags": ["帝国", "阿斯塔特", "原体", "影月苍狼", "30K", "英雄"], "hp": 40, "maxHp": 40, "ahp": 130, "armorRating": 30, "movement": 20, "baseMeleeDamage": "10 (S/20)", "weaponStats": "碎船者, 荷鲁斯之爪"
  }, "lorgar_aurelian_30k": {
    "name": "洛嘉·奥瑞利安 (Lorgar Aurelian) - 30K", "status": "怀言者原体 / 圣言者", "attributes": {
      "weaponSkill": 175, "ballisticSkill": 160, "strength": 180, "toughness": 180, "agility": 165, "intelligence": 195, "perception": 180, "willpower": 215, "fellowship": 210
    }, "trait": "神圣毒舌, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "指挥, 魅力, 祈求, 灵能掌控", "equipment": "圣光, 圣言金甲", "tags": ["帝国", "阿斯塔特", "原体", "怀言者", "30K", "英雄"], "hp": 36, "maxHp": 36, "ahp": 110, "armorRating": 25, "movement": 17, "baseMeleeDamage": "9 (S/20)", "weaponStats": "圣光"
  }, "vulkan_30k": {
    "name": "伏尔甘 (Vulkan) - 30K", "status": "火蜥蜴原体 / 普罗米修斯", "attributes": {
      "weaponSkill": 200, "ballisticSkill": 155, "strength": 215, "toughness": 215, "agility": 170, "intelligence": 180, "perception": 180, "willpower": 200, "fellowship": 180
    }, "trait": "熔炉之火, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "普通知识·技术, 战术, 恐吓, 指挥", "equipment": "黎明之光, 德拉克鳞铠", "tags": ["帝国", "阿斯塔特", "原体", "火蜥蜴", "30K", "英雄"], "hp": 43, "maxHp": 43, "ahp": 150, "armorRating": 35, "movement": 18, "baseMeleeDamage": "10 (S/20)", "weaponStats": "黎明之光"
  }, "corvus_corax_30k": {
    "name": "科沃斯·科拉克斯 (Corvus Corax) - 30K", "status": "暗鸦守卫原体 / 解放者", "attributes": {
      "weaponSkill": 200, "ballisticSkill": 160, "strength": 185, "toughness": 185, "agility": 210, "intelligence": 185, "perception": 200, "willpower": 195, "fellowship": 160
    }, "trait": "暗影猎手, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "潜行, 战术, 警觉, 灵能掌控", "equipment": "暗鸦之爪, 复仇之鞭, 暗影步甲", "tags": ["帝国", "阿斯塔特", "原体", "暗鸦守卫", "30K", "英雄"], "hp": 37, "maxHp": 37, "ahp": 100, "armorRating": 20, "movement": 22, "baseMeleeDamage": "9 (S/20)", "weaponStats": "暗鸦之爪, 复仇之鞭"
  }, "alpharius_omegon_30k": {
    "name": "阿尔法瑞斯 (Alpharius/Omegon) - 30K", "status": "阿尔法军团原体 / 我即阿尔法", "attributes": {
      "weaponSkill": 195, "ballisticSkill": 180, "strength": 190, "toughness": 190, "agility": 190, "intelligence": 215, "perception": 200, "willpower": 195, "fellowship": 185
    }, "trait": "九头蛇密谋, 原体, 体型·普通, 百战幸存, 英雄之躯", "skill": "欺诈, 潜行, 逻辑, 战术", "equipment": "苍白之矛, 毒蛇之铠", "tags": ["帝国", "阿斯塔特", "原体", "阿尔法军团", "30K", "英雄"], "hp": 38, "maxHp": 38, "ahp": 110, "armorRating": 25, "movement": 20, "baseMeleeDamage": "9 (S/20)", "weaponStats": "苍白之矛"
  }, "sanguinius_30k": {
    "name": "圣吉列斯 (Sanguinius) - 30K", "status": "圣血天使原体 / 圣洁者", "attributes": {
      "weaponSkill": 220, "ballisticSkill": 165, "strength": 195, "toughness": 190, "agility": 220, "intelligence": 180, "perception": 200, "willpower": 215, "fellowship": 200
    }, "trait": "血渴狂怒, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "闪避, 战术, 魅力, 灵能掌控", "equipment": "狂红之刃, 黄金盔甲", "tags": ["帝国", "阿斯塔特", "原体", "圣血天使", "30K", "英雄"], "hp": 38, "maxHp": 38, "ahp": 110, "armorRating": 25, "movement": 23, "baseMeleeDamage": "9 (S/20)", "weaponStats": "狂红之刃"
  }, "rogal_dorn_30k": {
    "name": "罗格·多恩 (Rogal Dorn) - 30K", "status": "帝国之拳原体 / 泰拉禁卫", "attributes": {
      "weaponSkill": 200, "ballisticSkill": 165, "strength": 205, "toughness": 210, "agility": 170, "intelligence": 185, "perception": 175, "willpower": 210, "fellowship": 170
    }, "trait": "不动要塞, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "战术, 指挥, 逻辑, 恐吓", "equipment": "风暴之牙, 黄金护甲", "tags": ["帝国", "阿斯塔特", "原体", "帝国之拳", "30K", "英雄"], "hp": 42, "maxHp": 42, "ahp": 140, "armorRating": 32, "movement": 18, "baseMeleeDamage": "10 (S/20)", "weaponStats": "风暴之牙"
  }, "leman_russ_30k": {
    "name": "黎曼·鲁斯 (Leman Russ) - 30K", "status": "太空野狼原体 / 王狼", "attributes": {
      "weaponSkill": 210, "ballisticSkill": 150, "strength": 205, "toughness": 200, "agility": 190, "intelligence": 160, "perception": 190, "willpower": 200, "fellowship": 185
    }, "trait": "芬里斯之狼, 原体, 体型·大型, 百战幸存, 英雄之躯", "skill": "追迹, 战术, 恐吓, 警觉", "equipment": "狄翁尼斯之矛, 寒冰之爪, 鲁斯之甲", "tags": ["帝国", "阿斯塔特", "原体", "太空野狼", "30K", "英雄"], "hp": 40, "maxHp": 40, "ahp": 120, "armorRating": 28, "movement": 20, "baseMeleeDamage": "10 (S/20)", "weaponStats": "狄翁尼斯之矛, 寒冰之爪"
  }
};
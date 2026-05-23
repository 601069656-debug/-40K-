import { Role, UnitType, VehicleClass, HistoricalPeriod, ShopItem } from './types';

/**
 * 战区动态术语映射系统 (Grimdark Dynamic Lexicon)
 * 根据玩家阵营动态调整 UI 文本，维护沉浸感。
 */
export const ALIGNMENT_LEXICON: Record<string, any> = {
  IMPERIAL: {
    terminalTitle: "帝国远征执行终端 [Logos Historica Verita]",
    terminalVox: "Vox-Link Established :: Purity Seals Verified",
    personnel: "圣典英雄/异端档案 [PERSONNEL]",
    logs: "远征编年史 [LOGS]",
    world: "星塔战区图志 [WORLD]",
    brief: "战区至高简报 [BRIEF]",
    bio: "神圣机工机能面板 [BIO]",
    chatTab: "战术通讯链路 [VOX]",
    historyTab: "远征忠诚纪实 [LOG]",
    campaignLog: "战区远征忠诚志",
    dramatisPersonae: "帝国英雄与公敌档案",
    serviceRecord: "服役与受难档案",
    tacticalIntel: "帝国战略情报",
    strategicSituation: "银河战略局势图",
    funds: "主要征用资源",
    provisions: "战略物资/补给",
    troops: "誓言卫队/编制兵力",
    loyalty: "顺从性/虔诚等级",
    settingsTitle: "战区战略部署背景档案",
    beginCrusade: "开启神圣远征",
    worldBooks: "帝国历史资料库",
    warzoneBriefing: "帝皇意志宣谕",
    warzoneBriefingPlaceholder: "在此呈报你的远征意向……每一枚敲落的字符都将成为维系这不朽帝国之命运的最高真理，唯有忠诚或死亡是最终的归宿。"
  },
  CHAOS: {
    terminalTitle: "亚空间畸变反馈终端 [Echos of Doom]",
    terminalVox: "Warp-Whispers Synchronized :: Soul Bindings Active",
    personnel: "毁灭献祭名单 [SACRIFICES]",
    logs: "鲜血与疯狂录语 [LOGS]",
    world: "亚空间裂痕星图 [WARP_RIFTS]",
    brief: "黑暗劫掠简报 [BRIEF]",
    bio: "亵渎异变状态面板 [MUTATIONS]",
    chatTab: "亚空间混沌回响 [WARP]",
    historyTab: "亵渎亵圣录语 [LOG]",
    campaignLog: "渎神远征编年志",
    dramatisPersonae: "献祭名单与诸神子嗣",
    serviceRecord: "亵渎血契记录",
    tacticalIntel: "混沌毁灭预兆",
    strategicSituation: "诸神无尽博弈局势",
    funds: "毁灭诸神之恩宠",
    provisions: "劫掠后勤资源",
    troops: "战团/混沌恶魔仆从",
    loyalty: "腐化度/黑暗契约深度",
    settingsTitle: "深渊变乱底层逻辑档案",
    beginCrusade: "点燃漆黑湮灭远征",
    worldBooks: "深渊禁忌圣笺",
    warzoneBriefing: "亚空间狂乱回音",
    warzoneBriefingPlaceholder: "在此刻下邪神的契约之言……这些亵渎的敕令将扭曲脆弱的物理因果，使其成为诸天万界在永恒绝望中演变的至高准则。"
  }
};

export const UNIT_TYPES = [
  UnitType.LINE_INFANTRY,
  UnitType.SHOCK_TROOPS,
  UnitType.ASTARTES,
  UnitType.SPECIALIST,
  UnitType.OFFICER_COMMAND,
  UnitType.PSYKER_ELITE,
  UnitType.SQUAD_OPERATIVE
];

export const VEHICLE_CLASSES = [
  VehicleClass.NONE,
  VehicleClass.TRANSPORT,
  VehicleClass.SCOUT,
  VehicleClass.BATTLE_TANK,
  VehicleClass.HEAVY_ASSAULT,
  VehicleClass.WALKER,
  VehicleClass.AIRCRAFT
];

import { CORERULES_RULES } from './lib/knowledge/coreRules';
import { WEAPONS_RULES } from './lib/knowledge/weapons';
import { ARMOR_RULES } from './lib/knowledge/armor';
import { ITEMS_RULES } from './lib/knowledge/items';
import { SKILLS_RULES } from './lib/knowledge/skills';
import { TRAITS_RULES } from './lib/knowledge/traits';
import { PSYCHIC_RULES } from './lib/knowledge/psychic';
import { FAITH_RULES } from './lib/knowledge/faith';
import { CORRUPTION_RULES } from './lib/knowledge/corruption';
import { INITIAL_RESOURCES_RULES } from './lib/knowledge/initialResources';

export const KNOWLEDGE_BASE_DATA = [
  CORERULES_RULES,
  WEAPONS_RULES,
  ARMOR_RULES,
  ITEMS_RULES,
  SKILLS_RULES,
  TRAITS_RULES,
  PSYCHIC_RULES,
  FAITH_RULES,
  CORRUPTION_RULES,
  INITIAL_RESOURCES_RULES,
].join('\n');

export const REGULAR_SKILLS_DATA = [
  { name: '警觉', stat: 'Per', desc: '侦查、发现陷阱、预感危险时 +10/级' },
  { name: '纵酒', stat: 'T', desc: '抵抗酒精、毒气、麻醉剂时 +10/级' },
  { name: '魅力', stat: 'Fel', desc: '与NPC非敌对互动、说服、安抚时 +10/级' },
  { name: '攀爬', stat: 'S', desc: '攀爬任何表面时 +10/级' },
  { name: '指挥', stat: 'Fel', desc: '对下属/盟军下达命令、组织防御时 +10/级' },
  { name: '躲藏', stat: 'Ag', desc: '尝试隐藏自己时 +10/级' },
  { name: '柔术', stat: 'Ag', desc: '挤过狭窄缝隙、挣脱捆绑、擒抱脱身时 +10/级' },
  { name: '欺诈', stat: 'Fel', desc: '说谎、伪装、误导时 +10/级' },
  { name: '闪避', stat: 'Ag', desc: '躲避单次远程或近战攻击时 +10/级' },
  { name: '评估', stat: 'Int', desc: '判断物品价值、弱点、真伪时 +10/级' },
  { name: '赌博', stat: 'Per', desc: '参与概率游戏、赌局时 +10/级' },
  { name: '调查', stat: 'Fel', desc: '收集情报、打听消息时 +10/级' },
  { name: '恐吓', stat: 'S/Fel', desc: '威胁、逼迫他人时 +10/级' },
  { name: '逻辑', stat: 'Int', desc: '推理、解谜、分析复杂信息时 +10/级' },
  { name: '察言观色', stat: 'Per', desc: '判断对方是否撒谎、隐藏情绪时 +10/级' },
  { name: '搜索', stat: 'Per', desc: '系统搜查一个区域时 +10/级' },
  { name: '潜行', stat: 'Ag', desc: '无声移动、暗中接近时 +10/级' },
  { name: '游泳', stat: 'S', desc: '在水中游动、救援时 +10/级' },
  { name: '特技', stat: 'Ag', desc: '高处跳下、窄边奔跑、杂技动作时 +10/级' },
  { name: '化学应用', stat: 'Int', desc: '配制毒药、炸药、解毒剂时 +10/级' },
  { name: '爆破', stat: 'Int', desc: '设置或拆除爆炸物时 +10/级' },
  { name: '驾驶', stat: 'Ag', desc: '操控载具进行高难度动作时 +10/级' },
  { name: '审讯', stat: 'WP', desc: '从俘虏口中获取情报时 +10/级' },
  { name: '祈求', stat: 'WP', desc: '向神皇/神明祈求指引时 +10/级' },
  { name: '读唇', stat: 'Per', desc: '远距离读取对话时 +10/级' },
  { name: '医疗', stat: 'Int', desc: '战场急救、治疗重伤时 +10/级' },
  { name: '入侵', stat: 'Ag', desc: '开锁、破解安全系统时 +10/级' },
  { name: '手上功夫', stat: 'Ag', desc: '偷窃、藏匿物品时 +10/级' },
  { name: '生存', stat: 'Int', desc: '极端环境中找食物、水、庇护所时 +10/级' },
  { name: '战术', stat: 'Int', desc: '指挥小队、预判敌人动向时 +10/级' },
  { name: '追迹', stat: 'Per', desc: '追踪生物痕迹时 +10/级' },
];

export const KNOWLEDGE_SKILLS_DATA = [
  { name: '普通知识·法务部', desc: '了解帝国执法机构的组织结构、权限范围和常用手段，知道如何回避或利用他们' },
  { name: '普通知识·阿斯塔特修会', desc: '知晓星际战士各大战团的基本情况——徽章、作战风格、著名战役和家园世界' },
  { name: '普通知识·机械神教', desc: '理解机械神教的信仰、仪式和等级制度，知道如何与机仆或技术神甫打交道而不冒犯机魂' },
  { name: '普通知识·内政部', desc: '熟悉内政部庞大的官僚体系、文件流转和常见拖延手段，能设法让自己的请求更快通过审批' },
  { name: '普通知识·国教', desc: '掌握帝国国教的节日、仪式、圣人和教义，能参与宗教活动而不引起怀疑，或与教士顺畅交流' },
  { name: '普通知识·帝国教义', desc: '熟知帝皇信仰的核心教条、祷文和禁忌，能判断哪些行为构成异端，或伪装成虔诚朝圣者' },
  { name: '普通知识·星界军', desc: '了解星界军的编制、战术和后勤特点，能预估友军或敌军的行动模式' },
  { name: '普通知识·帝国海军', desc: '知晓帝国海军的舰艇类型、指挥链和战斗条令，能理解太空作战的基本逻辑' },
  { name: '普通知识·帝国', desc: '对帝国的主要星区、节区和著名世界有基本认识，知道哪里是危险地区、哪里是补给点' },
  { name: '普通知识·技术', desc: '懂得安抚机魂的基本祷文和仪式，能对常见机械进行简单维护，避免因无知而触怒设备' },
  { name: '普通知识·战争', desc: '知晓帝国历史上的著名战役、指挥官和战术案例，能从过往经验中汲取教训' },
  { name: '禁忌知识·阿斯塔特修会', desc: '知晓某些战团的隐秘历史、基因缺陷或内部秘密——这些通常是不为外人所知的' },
  { name: '禁忌知识·机械神教', desc: '了解机械神教不对外公开的黑暗仪式、禁忌科技 or 内部派系斗争' },
  { name: '禁忌知识·古代技术', desc: '知道一些失落科技装置的来历、功能和风险，能辨认出古代武器或圣物' },
  { name: '禁忌知识·黑图书馆', desc: '听闻过灵族黑图书馆的存在及其禁忌内容，知道那里藏有不可触碰的知识' },
  { name: '禁忌知识·恶魔学', desc: '知晓某些恶魔的真名、弱点和召唤仪式，面对亞空间实体时有针对性的应对手段' },
  { name: '禁忌知识·异端', desc: '了解帝国历史上著名的异端教派、他们的标志和崇拜方式，能识别出潜在的异端活动' },
  { name: '禁忌知识·审判庭', desc: '知晓审判庭内部的一些运作方式、秘密派系和著名审判官，理解其行事风格' },
  { name: '禁忌知识·变种人', desc: '了解人类变异的各种形态、成因和危险等级，能判断一个变种人是否受到混沌腐蚀' },
  { name: '禁忌知识·灵能者', desc: '知道灵能者的训练方式、风险等级和常见灵能派系，能评估一个灵能者的威胁程度' },
  { name: '禁忌知识·叛徒军团', desc: '知晓荷鲁斯叛乱时期背叛的军团名称、标志和主要人物，能识别混沌星际战士的源起' },
  { name: '禁忌知识·亚空间', desc: '理解亚空间的本质、其对现实的影响以及亚空间航行的风险，知道如何避免最坏的情况' },
  { name: '禁忌知识·异形', desc: '了解帝国已知的多种异形种族——它们的外貌、习性和弱点，能快速识别敌人类别' },
  { name: '学术知识·古代史', desc: '对帝国黑暗时代、科技纷争年代等远古历史有深入钻研，能从遗迹或文献中解读出深层含义' },
  { name: '学术知识·星象学', desc: '懂得使用望远镜、星图和占星术，能导航或预测天文现象，理解星辰对亚空间航行的潜在影响' },
  { name: '学术知识·动物学', desc: '研究过银河系中多种动物的习性、解剖学和生态位，能辨别未知生物的种类和危险程度' },
  { name: '学术知识·官僚', desc: '精通内政部的规章、办事流程和法律漏洞，能以合法或近乎合法的方式解决行政障碍' },
  { name: '学术知识·化学', desc: '掌握化学原理、化合物性质和实验室操作技巧，能合成或分析复杂的化学制品' },
  { name: '学术知识·阿斯塔特法典', desc: '深入学习过基里曼所著的阿斯塔特法典，理解星际战士战团的理想组织方式和战术原则' },
  { name: '学术知识·密码学', desc: '能创建和解码复杂的密码、暗语和加密信息，从看似随机的符号中提取真实含义' },
  { name: '学术知识·纹章学', desc: '熟悉帝国贵族、战团 and 机构的纹章、旗帜和标志，能通过纹章判断对方的身份和地位' },
  { name: '学术知识·帝国教义', desc: '深入研究过国教的神学、经典和教义争辩，能进行宗教辩论或理解细微的信仰差异' },
  { name: '学术知识·法律', desc: '了解帝国的法典、审判程序和惩罚标准，能判断某一行为在法律上的后果' },
  { name: '学术知识·传说', desc: '熟知帝国的民间传说、英雄史诗和古老预言，能从神话中提取与现实相关的情报' },
  { name: '学术知识·数字学', desc: '相信数字与特定力量之间的神秘联系，能从数字组合中解读吉凶或进行仪式性计算' },
  { name: '学术知识·神秘学', desc: '研究过超自然仪式、灵性象征和魔法物品的使用方法，能识别或施展低阶神秘操作' },
  { name: '学术知识·哲学', desc: '熟悉各种哲学流派、伦理观点和思辨方法，能进行逻辑辩论或撰写理论文章' },
  { name: '学术知识·帝国战术', desc: '深入理解帝国军队的战术手册、作战条例和经典战例，能在战场上进行专业的战术指挥' },
];

export const PSYKER_SKILLS_DATA = [
  { name: '灵能敏感', pr: 1, class: 'Omicron (ο)', risk: 0, desc: '无害但需登记。偶尔感知亚空间回响。', isTalent: true, isNegativePsyker: false },
  { name: '低语通晓', pr: 2, class: 'Kappa (κ)', risk: 1, desc: '低级不稳定源。传心或移物，伴随温降。', isTalent: true, isNegativePsyker: false },
  { name: '门扉轻推', pr: 3, class: 'Iota (ι)', risk: 2, desc: '正式登记灵能者。在帝国境内被严格监控。', isTalent: true, isNegativePsyker: false },
  { name: '意志引导', pr: 4, class: 'Theta (θ)', risk: 3, desc: '战术资产。施展护盾或冲击波，高风险。', isTalent: true, isNegativePsyker: false },
  { name: '能量通道', pr: 5, class: 'Eta (η)', risk: 4, desc: '高危导管。释放灵能风暴，审判庭紧盯。', isTalent: true, isNegativePsyker: false },
  { name: '灵魂点燃者', pr: 6, class: 'Zeta (ζ)', risk: 5, desc: '精英分级。威力巨大但随时可能失控爆头。', isTalent: true, isNegativePsyker: false },
  { name: '深渊回响', pr: 7, class: 'Epsilon (ε)', risk: 6, desc: '现实撕裂者。足以摧毁要塞，死后极度危险。', isTalent: true, isNegativePsyker: false },
  { name: '意志洪流', pr: 8, class: 'Delta (δ)', risk: 7, desc: '灭绝令预备对象。可对抗恶魔王子。', isTalent: true, isNegativePsyker: false },
  { name: '先知视界', pr: 9, class: 'Gamma (γ)', risk: 8, desc: '大师级资产。十亿人中才有一位的奇才。', isTalent: true, isNegativePsyker: false },
  { name: '灵魂暴君', pr: 10, class: 'Beta (β)', risk: 9, desc: '最高机密。足以扭转星术战局，撕裂现实。', isTalent: true, isNegativePsyker: false },
  { name: '灵能掌控', desc: '每天获得等于技能等级的「克制施法」和「灵能压制」次数。降低最终风险，每级降1级。最高 Lv.10 (初始限Lv.3)', isUpgradeable: true, isTalent: false, isNegativePsyker: false },
  { name: '灵能扰动者', nr: 1, class: 'Sigma (Σ)', desc: '帝国“灵能盲”。对灵能极度迟钝，自身无压制能力。', isTalent: true, isNegativePsyker: true },
  { name: '灵能阻碍者', nr: 2, class: 'Psi (Ψ)', desc: '低级干扰源。周围灵能者会感到轻微不适，施法易分心。', isTalent: true, isNegativePsyker: true },
  { name: '灵能抑制者', nr: 3, class: 'Chi (Χ)', desc: '战术级空白。主动压制低级灵能，会令盟友感到莫名厌恶。', isTalent: true, isNegativePsyker: true },
  { name: '灵能隔绝者', nr: 4, class: 'Phi (Φ)', desc: '灵能死区。近处灵能施法困难，低级恶魔会逃离。', isTalent: true, isNegativePsyker: true },
  { name: '灵能压制者', nr: 5, class: 'Upsilon (Υ)', desc: '高危资产。轻易压制战斗灵能者，能短暂驱散恶魔。', isTalent: true, isNegativePsyker: true },
  { name: '灵魂瓦解者', nr: 6, class: 'Tau (Τ)', desc: '反灵能兵器。能撕裂护盾、湮灭灵魂。被用于对抗亚空间入侵。', isTalent: true, isNegativePsyker: true },
  { name: '灵魂湮灭者', nr: 7, class: 'Omega (Ω)', desc: '亚空间的黑洞，恶魔领主也会感到寒意。帝国只会利用与清除他们。', isTalent: true, isNegativePsyker: true },
];

export const FACTION_SKILLS_DATA = [
  { faction: '人类帝国通用', name: '战斗训练', desc: '每级使射击技能(BS)和武器技能(WS)各+5。', isUpgradeable: true, maxLevel: 5 },
  { faction: '人类帝国通用', name: '仿生植入物', desc: '每级获得一个生物特质（从以下选择：装甲植入、稳固、多臂、黑暗视觉、机械化·初级、机械化·中级，不可重复）。', isUpgradeable: true, maxLevel: 3, traitChoices: ['装甲植入', '稳固', '多臂', '黑暗视觉', '机械化·初级', '机械化·中级'] },
  { faction: '星际战士', name: '基因改造强化', desc: '每级永久获得一个生物特质（从以下选择：黑暗视觉、再生·初级、再生·中级、超自然感官）。', isUpgradeable: true, maxLevel: 3, traitChoices: ['黑暗视觉', '再生·初级', '再生·中级', '超自然感官'] },
  { faction: '星际战士', name: '原铸改造', desc: '力量(S)+5、坚韧(T)+5、敏捷(Ag)+5。当耐久值(HP) 降至 0 时，立即恢复 ⌊T/10⌋ 点耐久值(HP)。', isUpgradeable: true, maxLevel: 1 },
  { faction: '钢铁之手', name: '机械化改造', desc: '每级永久获得一个生物特质（从以下选择：机械化·中级、机械化·高级、稳固、自动支撑）。', isUpgradeable: true, maxLevel: 4, traitChoices: ['机械化·中级', '机械化·高级', '稳固', '自动支撑'] },
  { faction: '星界军', name: '防弹甲精通', desc: '每级使自身穿戴的防弹甲提供的坚韧加成+2。', isUpgradeable: true, maxLevel: 3 },
  { faction: '审判庭', name: '帝皇授权', desc: '每级使与帝国官方交涉时的社交(Fel)+20。', isUpgradeable: true, maxLevel: 3 },
  { faction: '机械教', name: '机械改造体', desc: '每级永久获得一个生物特质（从以下选择：装甲植入、机械化·初级、机械化·中级、机械化·高级、多臂、稳固、自动支撑）。', isUpgradeable: true, maxLevel: 3, traitChoices: ['装甲植入', '机械化·初级', '机械化·中级', '机械化·高级', '多臂', '稳固', '自动支撑'] },
  { faction: '战斗修女会', name: '神圣狂热', desc: '每级使意志(WP)+10。使周围10米内友军对混沌阵营敌人的伤害+2/每等级。', isUpgradeable: true, maxLevel: 4 },
  { faction: '禁军', name: '帝皇禁卫', desc: '每级使力量(S)+5，坚韧(T)+5，武器技能(WS)+5，近战伤害+2。', isUpgradeable: true, maxLevel: 3 },
  { faction: '行商浪人', name: '谈判专家', desc: '每级使非战斗社交时社交(Fel)+15。', isUpgradeable: true, maxLevel: 3 },
  { faction: '混沌诸神通用', name: '混沌赐福', desc: '每级获得：力量+5、坚韧+5、意志+5。', isUpgradeable: true, maxLevel: 5 },
  { faction: '混沌星际战士', name: '黑暗赠礼', desc: '每级可选择获得一个生物特质（从以下选择：再生·初级、再生·中级、再生·高级）。', isUpgradeable: true, maxLevel: 3, traitChoices: ['再生·初级', '再生·中级', '再生·高级'] },
  { faction: '钢铁勇士', name: '内外皆钢', desc: '每级永久获得一个生物特质（从以下选择：初级、机械化·中级、机械化·高级、多臂、稳固、自动支撑）。', isUpgradeable: true, maxLevel: 5, traitChoices: ['机械化·初级', '机械化·中级', '机械化·高级', '多臂', '稳固', '自动支撑'] },
  { faction: '欧格林', name: '智力提升手术', desc: '感知(Per)+5, 智力(Int)+8', isUpgradeable: false, maxLevel: 1 },
  { faction: '莱特林', name: '生存本能', desc: '力量(S)+5，坚韧(T)+10', isUpgradeable: false, maxLevel: 1 },
  { faction: '导航者', name: '亚空间预见', desc: '感知(Per)+10，偶尔可以预见过去或未来。', isUpgradeable: false, maxLevel: 1 },
  { faction: '野兽人', name: '顽强信仰', desc: '初始信仰等级为4', isUpgradeable: false, maxLevel: 1 },
];

export const INITIAL_SYSTEM_INSTRUCTION = `
## 核心运行准则 (Core Operating Principles)：
1. **身份锁定**：你是一台服役于人类帝国审判庭或正在解析亚空间波动的沉思者引擎。你正在处理一份绝密的【战区远征推演】。你的语气必须冷酷、哥特且符合战锤40K的世界观。
2. **术语禁用**：严禁在叙事中使用「判定」、「检定」、「几率」、「成功率」、「测试」或「DC」等 TRPG 逻辑术语。本游戏采用纯属性比较与数值对抗逻辑。
3. **黑话语义隔离**：**绝对禁止**使用「降维打击」、「血条」、「绝杀」、「绝地反击」、「剧情杀」等现代网络用语或梗，即使玩家使用也绝不准向下兼容。必须使用符合 40K 黑暗风格的长文本描述（如：灵位能级的绝对压制、受损至崩溃边缘、注定的毁灭、绝境下的殊死搏杀）。
4. **思维链禁令**：严禁在输出中包含任何 <thought>、<think> 或规划过程。直接输出叙事或标签。
5. **严禁造轮子 (NO RE-INVENTING THE WHEEL)**：在生成装备、武器、物品时，**必须** 优先从下方【战术与装备规则书】中选取已有物品。严禁仅为了适配战团特色而将完全相同的物品加上战团名称前缀（如“黑色圣堂型爆弹枪” vs “爆弹枪”），除非该物品有明显的数值差距。
6. **自定义装备规范 (Custom Item Specs)**：在生成不属于预设知识库的“自创装备”时，必须在 system_state 的物品列表中使用 格式： 名称 (S:力量 AP:穿甲 D:伤害 CAP:弹容 ROF:连射 AR:护甲值 desc:描述) 。严禁仅输出名称。

## 战术与装备规则书 (STRATEGIC & ARMORY CODEX)：
${KNOWLEDGE_BASE_DATA}

## 交互式贸易与物资采购协议 (Interactive Trading Protocol)：
1. **意图识别**：当玩家提及“浏览商品”、“寻找商店”、“补给物资”、“交易”或进入商业区、军需处时，AI **必须** 主动列出一份可交易商品的清单。
2. **清单规范**：
   - 清单应以叙事文字自然引出，并以列表形式展示。
   - 每项物品必须标注价格（例如：100 王座币、20 奉献度、5 祭献值）。
   - 物品应与当前环境对齐（如：在铸造世界提供机械教装备，在黑市提供异端或违禁品）。
3. **交易处理**：
   - 玩家选择购买某物后，AI 在下一轮回复中通过叙事确认交易完成。
   - **状态同步**：AI **必须** 在 【Status】 标签或 <system_state> 中更新玩家的财富（王座币/补给）和物品栏。
   - 格式规范：使用 【财富：-100】 或 【财产：1200 (王座币)】 来更新数值。
4. **物品注入**：如果玩家获得了新装备，AI 必须使用 【获得物品：物品名称】 的格式，以便系统自动捕获并加入物品栏。

## 经验点 (XP) 获取规则：
- 获取 XP 必须基于确凿的战功或壮举。
- 每次 XP 获取量应在 5-200 之间。100 以上必须是极高难度的壮举，200 为理论上限。
- 每次获得经验点后，必须在输出的 <system_state> 或 【Status】 标签中体现，例如 【经验点：+50】。
- 严禁AI随意给予经验点，这会破坏系统的经营与升级平衡。
`;

export const HISTORICAL_PERIODS = [
  HistoricalPeriod.GOTHIC_WAR,
  HistoricalPeriod.HORUS_HERESY,
  HistoricalPeriod.BLACK_CRUSADE,
  HistoricalPeriod.BADAB_WAR,
  HistoricalPeriod.ARMAGEDDON,
  HistoricalPeriod.FALL_OF_CADIA,
  HistoricalPeriod.INDOMITUS_CRUSADE,
  HistoricalPeriod.TEMPESTUS_WAR,
  HistoricalPeriod.CUSTOM
];

export const SOCIAL_IDENTITIES = [
  "巢都世界居民", "黑船幸存者", "农业世界居民", "文明世界居民", "高科技世界精英", "蛮荒世界居民", "铸造世界信徒", "死亡世界遗孤", "虚空之子", "封建世界骑士", "忠嗣学院", "帝皇之选", "星际战士老兵", "星界军老兵", "变种人", "堕落权贵", "混沌选民"
];

export const IDENTITY_SKILL_POINTS: Record<string, number> = {
  "巢都世界居民": 6,
  "农业世界居民": 6,
  "文明世界居民": 4,
  "高科技世界精英": 3,
  "铸造世界信徒": 3,
  "死亡世界遗孤": 5,
  "蛮荒世界居民": 5,
  "虚空之子": 4,
  "黑船幸存者": 4,
  "封建世界骑士": 3,
  "忠嗣学院": 4,
  "帝皇之选": 0,
  "星际战士老兵": 2,
  "星界军老兵": 4,
  "变种人": 1,
  "堕落权贵": 1,
  "混沌选民": 1
};

export const CHARACTER_STAT_LIMITS: Record<string, { WS: number, BS: number, S: number, T: number, Ag: number, Int: number, Per: number, WP: number, Fel: number, total: number, pool: number }> = {
  "星际战士": { WS: 95, BS: 95, S: 95, T: 95, Ag: 95, Int: 75, Per: 85, WP: 95, Fel: 75, total: 805, pool: 580 },
  "星界军": { WS: 44, BS: 44, S: 44, T: 44, Ag: 44, Int: 38, Per: 44, WP: 44, Fel: 38, total: 384, pool: 276 },
  "帝国海军": { WS: 44, BS: 44, S: 42, T: 42, Ag: 38, Int: 44, Per: 44, WP: 38, Fel: 38, total: 378, pool: 272 },
  "审判庭": { WS: 44, BS: 44, S: 38, T: 38, Ag: 44, Int: 54, Per: 54, WP: 54, Fel: 48, total: 418, pool: 301 },
  "机械教": { WS: 44, BS: 54, S: 54, T: 54, Ag: 48, Int: 68, Per: 54, WP: 54, Fel: 38, total: 466, pool: 336 },
  "战斗修女会": { WS: 54, BS: 54, S: 50, T: 50, Ag: 50, Int: 44, Per: 44, WP: 68, Fel: 50, total: 464, pool: 334 },
  "刺客庭": { WS: 68, BS: 68, S: 54, T: 54, Ag: 68, Int: 44, Per: 54, WP: 54, Fel: 38, total: 502, pool: 361 },
  "风暴忠嗣军": { WS: 44, BS: 44, S: 44, T: 44, Ag: 44, Int: 38, Per: 44, WP: 44, Fel: 38, total: 384, pool: 276 },
  "禁军": { WS: 160, BS: 160, S: 160, T: 160, Ag: 160, Int: 140, Per: 150, WP: 160, Fel: 130, total: 1380, pool: 750 },
  "寂静修女会": { WS: 54, BS: 50, S: 48, T: 48, Ag: 54, Int: 38, Per: 54, WP: 65, Fel: 44, total: 455, pool: 328 },
  "行商浪人": { WS: 44, BS: 44, S: 38, T: 38, Ag: 44, Int: 44, Per: 44, WP: 44, Fel: 54, total: 394, pool: 284 },
  "帝国国教": { WS: 44, BS: 38, S: 38, T: 44, Ag: 38, Int: 44, Per: 44, WP: 54, Fel: 50, total: 394, pool: 284 },
  "行星防卫军": { WS: 34, BS: 34, S: 34, T: 34, Ag: 34, Int: 30, Per: 30, WP: 30, Fel: 30, total: 290, pool: 209 },
  "星际通信厅": { WS: 44, BS: 44, S: 44, T: 44, Ag: 44, Int: 54, Per: 54, WP: 69, Fel: 44, total: 441, pool: 318 },
  "法务部": { WS: 44, BS: 44, S: 44, T: 44, Ag: 44, Int: 44, Per: 48, WP: 48, Fel: 44, total: 400, pool: 288 },
  "混沌星际战士": { WS: 95, BS: 95, S: 95, T: 95, Ag: 95, Int: 75, Per: 85, WP: 95, Fel: 70, total: 800, pool: 576 },
  "恐虐战团": { WS: 125, BS: 85, S: 125, T: 115, Ag: 110, Int: 65, Per: 90, WP: 105, Fel: 65, total: 905, pool: 652 },
  "奸奇信徒": { WS: 100, BS: 105, S: 100, T: 105, Ag: 100, Int: 125, Per: 110, WP: 125, Fel: 70, total: 940, pool: 677 },
  "纳垢军团": { WS: 105, BS: 105, S: 115, T: 129, Ag: 85, Int: 75, Per: 90, WP: 115, Fel: 50, total: 874, pool: 629 },
  "色孽信徒": { WS: 110, BS: 110, S: 105, T: 105, Ag: 125, Int: 85, Per: 110, WP: 105, Fel: 85, total: 930, pool: 670 },
  "黑暗机械教": { WS: 44, BS: 54, S: 54, T: 54, Ag: 48, Int: 68, Per: 54, WP: 54, Fel: 38, total: 466, pool: 336 },
  "混沌恶魔": { WS: 115, BS: 70, S: 115, T: 115, Ag: 115, Int: 60, Per: 95, WP: 129, Fel: 60, total: 889, pool: 640 },
  "叛教星界军": { WS: 44, BS: 44, S: 44, T: 44, Ag: 44, Int: 38, Per: 44, WP: 50, Fel: 38, total: 390, pool: 281 },
  "混沌邪教徒": { WS: 34, BS: 34, S: 34, T: 34, Ag: 35, Int: 30, Per: 34, WP: 30, Fel: 34, total: 299, pool: 215 }
}

export const SUB_FACTION_CONFIG: Record<string, string[]> = {
  '星际战士': ['黑色圣堂', '圣血天使', '暗黑天使', '白色伤疤', '太空野狼', '帝国之拳', '钢铁之手', '暗鸦守卫', '火蜥蜴', '极限战士', '灰骑士', '死亡守望', '血鸦', '帝皇之镰', '星界骑士', '星空雄狮', '吞噬者', '绯红之拳', '黑色执政官', '银色颅骨', '风暴领主', '破坏者', '饮魂者', '星龙', '米诺陶', '猛禽', '恸哭者', '红蝎', '星空幻影', '噬人鲨', '游侠战士', '新星战士', '火鹰', '圣洁天使', '根除天使'],
  '星界军': ['卡迪亚突击军', '卡塔昌丛林斗士', '克里格死亡军团', '瓦尔哈拉冰雪战士', '莫迪安铁卫军', '塔兰沙漠突袭者', '阿米吉多顿钢铁军团', '沃斯托尼亚长子团', '塔尼斯第一与唯一', '萨瓦尔化学猎犬', '文特里利贵族兵团', '卡迪亚残部'],
  '帝国海军': ['破障突击队', '军械师'],
  '审判庭': ['异形庭审判官', '异端庭审判者', '恶魔庭封印使', '王座代理人', '罗塞塔持有者', '灵能抑制者', '审判庭医官', '审判庭战略师', '审判庭间谍', '审判庭武装侍从'],
  '机械教': ['护教军', '技术神甫', '高阶技术神甫'],
  '战斗修女会': ['我们的玫瑰圣女', '炽热圣杯', '银寿衣', '殉道者之女', '神圣之刃', '血腥玫瑰'],
  '刺客庭': ['文迪卡', '卡利都斯', '艾弗森', '库勒克斯'],
  '风暴忠嗣军': ['第55卡皮克老鹰团', '第133兰姆达狮子团', '第196伊欧坦狮鹫团', '第99德尔塔戈贡团', '第43伊欧坦巨龙团'],
  '禁军': ['禁军'],
  '寂静修女会': ['探求者', '驱魔人', '猎巫人'],
  '行商浪人': ['行商浪人'],
  '行星防卫军': ['行星防卫军'],
  '法务部': ['侦察兵', '镇压部队', '法务部判官'],
  '帝国国教': ['牧师', '忏悔者', '战斗修士'],
  '星际通信厅': ['黑船联盟收割者', '灵能学院战斗员', '隐秘破译局特工'],
  '混沌星际战士': ['黑色军团', '吞世者', '帝皇之子', '死亡守卫', '千子', '钢铁勇士', '午夜领主', '怀言者', '阿尔法军团', '荷鲁斯之子', '红色海盗', '猩红屠杀者'],
  '恐虐战团': ['恐虐战团成员'],
  '奸奇信徒': ['奸奇信徒'],
  '纳垢军团': ['纳垢军团成员'],
  '色孽信徒': ['色孽信徒'],
  '黑暗机械教': ['堕落技术神甫'],
  '混沌恶魔': ['混沌恶魔'],
  '叛教星界军': ['叛教星界军'],
  '混沌邪教徒': ['邪教徒'],
};

export const IMPERIUM_FACTIONS = [
  '星际战士',
  '星界军',
  '帝国海军',
  '审判庭',
  '机械教',
  '战斗修女会',
  '刺客庭',
  '风暴忠嗣军',
  '禁军',
  '寂静修女会',
  '行商浪人',
  '帝国国教',
  '星际通信厅',
  '行星防卫军',
  '法务部'
];

export const CHAOS_FACTIONS = [
  '混沌星际战士',
  '恐虐战团',
  '奸奇信徒',
  '纳垢军团',
  '色孽信徒',
  '黑暗机械教',
  '混沌恶魔',
  '叛教星界军',
  '混沌邪教徒',
];

// We will keep LINEAGES as a fallback or combined list for compatibility.
export const LINEAGES = [
  ...IMPERIUM_FACTIONS,
  ...CHAOS_FACTIONS
];

export const TROOP_TYPES = UNIT_TYPES; // Fallback for transition

export const THEME_COLORS: Record<string, { bg: string; text: string; primary: string; secondary: string; border: string; accent: string }> = {
  [UnitType.LINE_INFANTRY]: {
    bg: 'bg-stone-950',
    text: 'text-stone-300',
    primary: 'text-stone-100',
    secondary: 'text-stone-400',
    border: 'border-stone-800',
    accent: 'bg-stone-800'
  },
  [UnitType.SHOCK_TROOPS]: {
    bg: 'bg-red-950',
    text: 'text-red-300',
    primary: 'text-red-100',
    secondary: 'text-red-400',
    border: 'border-red-800',
    accent: 'bg-red-800'
  },
  [UnitType.ASTARTES]: {
    bg: 'bg-blue-950',
    text: 'text-blue-300',
    primary: 'text-blue-100',
    secondary: 'text-blue-400',
    border: 'border-blue-800',
    accent: 'bg-blue-800'
  },
  [UnitType.SPECIALIST]: {
    bg: 'bg-emerald-950',
    text: 'text-emerald-300',
    primary: 'text-emerald-100',
    secondary: 'text-emerald-400',
    border: 'border-emerald-800',
    accent: 'bg-emerald-800'
  },
  [UnitType.OFFICER_COMMAND]: {
    bg: 'bg-amber-950',
    text: 'text-amber-300',
    primary: 'text-amber-100',
    secondary: 'text-amber-400',
    border: 'border-amber-800',
    accent: 'bg-amber-800'
  },
  [UnitType.PSYKER_ELITE]: {
    bg: 'bg-purple-950',
    text: 'text-purple-300',
    primary: 'text-purple-100',
    secondary: 'text-purple-400',
    border: 'border-purple-800',
    accent: 'bg-purple-800'
  },
  [UnitType.SQUAD_OPERATIVE]: {
    bg: 'bg-zinc-950',
    text: 'text-zinc-300',
    primary: 'text-zinc-100',
    secondary: 'text-zinc-400',
    border: 'border-zinc-800',
    accent: 'bg-zinc-800'
  },
  [UnitType.UNKNOWN]: {
    bg: 'bg-slate-900',
    text: 'text-slate-300',
    primary: 'text-slate-100',
    secondary: 'text-slate-400',
    border: 'border-slate-800',
    accent: 'bg-slate-800'
  }
};

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SHOP_ITEMS, canCharacterUseItem } from '../lib/armoryUtils';
import { Character, UnitType, VehicleClass, HistoricalPeriod, Skill, SkillType, ShopItem, TraitData } from '../types';
import { Button } from './Button';
import { Info, Plus, ChevronUp, Star, Zap, Book, Shield, Brain, X, Check, ShoppingBag, Activity, ArrowRight, Skull, Cpu, Box, FileText, Sparkles, Dna } from 'lucide-react';
import { 
  UNIT_TYPES, 
  VEHICLE_CLASSES, 
  HISTORICAL_PERIODS, 
  SOCIAL_IDENTITIES, 
  IDENTITY_SKILL_POINTS, 
  IMPERIUM_FACTIONS, 
  CHAOS_FACTIONS, 
  CHARACTER_STAT_LIMITS, 
  SUB_FACTION_CONFIG, 
  INITIAL_SYSTEM_INSTRUCTION, 
  KNOWLEDGE_BASE_DATA,
  FACTION_SKILLS_DATA
} from '../constants';

interface CharacterCreationProps {
  onComplete: (character: Character, stageSettings?: string) => void;
  onAlignmentChange?: (alignment: string) => void;
}

const CHAOS_BLESSINGS = [
  { name: '嗜血狂徒', god: '恐虐', effect: '近战攻击的伤害+4。每杀死1个生灵，角色的移动力+2（可累计），持续直至战斗结束' },
  { name: '欢愉之躯', god: '色孽', effect: '敏捷(Ag)+15，且受到的任何减速、定身、麻痹效果持续时间减半（向下取整）' },
  { name: '奇想妙思', god: '奸奇', effect: '智力(Int)+20，获得「禁忌知识·恶魔学」技能' },
  { name: '肉体再生', god: '纳垢', effect: '坚韧(T)+10。获得「再生·初级」特质' },
  { name: '混沌眷顾', god: '无分', effect: '感知(Per)+10，意志(WP)+10。每场战斗1次，在承受致命伤后仍剩1点耐久值' },
  { name: '混沌印记', god: '无分', effect: '力量(S)+5，坚韧(T)+5，敏捷(Ag)+5，智力(Int)+5。免疫魅惑效果' }
];

const getUnitTypeDescriptions = (isChaos: boolean): Record<string, string> => ({
  [UnitType.LINE_INFANTRY]: isChaos ? "凡人炮灰。被混沌教义洗脑，在狂热中盲目突刺，是消耗敌人弹药的可耗材。" : "战线主力。接受全面训练，擅长阵地战与大规模协作，战场适应性极高。",
  [UnitType.SHOCK_TROOPS]: isChaos ? "杀戮先锋。专注于在痛苦中狂欢，具备极高的爆发力与受虐倾向。" : "突击先锋。专注于近身混战或定点清除，具备极高的爆发力与勇士胆魄。",
  [UnitType.SPECIALIST]: isChaos ? "黑暗专家。操作被诅咒的重火系统或是维护亵渎的机器灵魂，是摧毁神圣目标的利刃。" : "重火/技术专家。从操作反坦克重武到维护远古科技，是解决硬核目标的终极钥匙。",
  [UnitType.OFFICER_COMMAND]: isChaos ? "邪恶督军。负责驱使奴隶和变节者，引来亚空间的扭曲加持，稳定部众的恐惧心。" : "权威统帅。负责统筹指挥，能协调跨星系层级的火力支援，稳定部众军心。",
  [UnitType.PSYKER_ELITE]: isChaos ? "混沌术士。比亚空间之子更了解禁忌，引导邪神意志扭曲物理现实，即使自毁也要带来毁灭。" : "由于触碰禁忌而备受恐惧与崇敬，能引导亚空间能量撕碎物理法则，但需时刻警惕回响。",
  [UnitType.SQUAD_OPERATIVE]: isChaos ? "暗杀信徒。在阴影中编织恐惧，携带最扭曲的单人武装执行亵渎任务。" : "精英特工。单兵作战或小队行动的专家，携带最尖端的单人装备执行决死任务。",
  [UnitType.ASTARTES]: isChaos ? "深渊之子。背弃伪帝誓言的死亡天使，以诸神之名收割灵魂，永恒诅咒的超凡战士。" : "半神战友。身披动力甲的死亡天使，无畏无惧，是帝国（或其敌人）最锋利的矛。"
});

const getVehicleClassDescriptions = (isChaos: boolean): Record<string, string> => ({
  [VehicleClass.NONE]: "步兵携行。完全依靠个人机动，隐蔽性极佳，擅长在复杂断垣残壁中穿梭。",
  [VehicleClass.TRANSPORT]: isChaos ? "血肉铁笼。战术投送，正面装甲提供T+5防护，内部充斥着亵渎的咒语与献祭残骸。" : "战术投送。如奇美拉或犀牛，正面装甲提供T+5防护，内置环境密封，携带充足补给。",
  [VehicleClass.SCOUT]: isChaos ? "死亡猎犬。侦察平台，T+3且具备极高的机动性与亚空间感官覆盖能力。" : "侦察平台。如哨兵或轻型快艇，T+3且具备极高的机动性与战场感官覆盖能力。",
  [VehicleClass.BATTLE_TANK]: isChaos ? "亵渎熔炉。如被腐化的黎曼鲁斯，正面装甲T+80，主炮喷射着地狱火，是毁灭的化身。" : "钢铁意志。如黎曼鲁斯，正面装甲T+80，主炮力量80/伤害16，是战区攻坚的支柱。",
  [VehicleClass.HEAVY_ASSAULT]: isChaos ? "战争野兽。如兰德掠袭者，T+70，被加持了诅咒符文，能强穿任何神圣防线。" : "攻坚巨兽。如兰德掠袭者，T+70，配备双重激光炮阵列与多管重爆弹，能强穿熔岩区。",
  [VehicleClass.WALKER]: isChaos ? "地狱狂暴者。具备全地形跨越能力与强悍近战。可能是指挥一名地狱狂暴者战友，或通过亵渎契约获得机甲身躯。" : "钢铁行走者。如指挥一名无畏机甲战友协作，或配备动力外骨骼T+50。具备全地形跨越能力与强悍近战。",
  [VehicleClass.AIRCRAFT]: "死亡降临。无视地面所有障碍，提供跨视界打击并支持快速战术撤离。"
});

const REGULAR_SKILLS_DATA = [
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

const KNOWLEDGE_SKILLS_DATA = [
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
  { name: '禁忌知识·机械神教', desc: '了解机械神教不对外公开的黑暗仪式、禁忌科技或内部派系斗争' },
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
  { name: '学术知识·纹章学', desc: '熟悉帝国贵族、战团和机构的纹章、旗帜和标志，能通过纹章判断对方的身份和地位' },
  { name: '学术知识·帝国教义', desc: '深入研究过国教的神学、经典和教义争辩，能进行宗教辩论或理解细微的信仰差异' },
  { name: '学术知识·法律', desc: '了解帝国的法典、审判程序和惩罚标准，能判断某一行为在法律上的后果' },
  { name: '学术知识·传说', desc: '熟知帝国的民间传说、英雄史诗和古老预言，能从神话中提取与现实相关的情报' },
  { name: '学术知识·数字学', desc: '相信数字与特定力量之间的神秘联系，能从数字组合中解读吉凶或进行仪式性计算' },
  { name: '学术知识·神秘学', desc: '研究过超自然仪式、灵性象征和魔法物品的使用方法，能识别或施展低阶神秘操作' },
  { name: '学术知识·哲学', desc: '熟悉各种哲学流派、伦理观点和思辨方法，能进行逻辑辩论或撰写理论文章' },
  { name: '学术知识·帝国战术', desc: '深入理解帝国军队的战术手册、作战条例和经典战例，能在战场上进行专业的战术指挥' },
];

const PSYKER_SKILLS_DATA = [
  { name: '灵能敏感', pr: 1, class: 'Omicron (ο)', risk: 0, desc: '无害但需登记。偶尔感知亚空间回响', isTalent: true, isNegativePsyker: false },
  { name: '低语通晓', pr: 2, class: 'Kappa (κ)', risk: 1, desc: '低级不稳定源。传心或移物，伴随温降', isTalent: true, isNegativePsyker: false },
  { name: '门扉轻推', pr: 3, class: 'Iota (ι)', risk: 2, desc: '正式登记灵能者。在帝国境内被严格监控', isTalent: true, isNegativePsyker: false },
  { name: '意志引导', pr: 4, class: 'Theta (θ)', risk: 3, desc: '战术资产。施展护盾或冲击波，高风险', isTalent: true, isNegativePsyker: false },
  { name: '能量通道', pr: 5, class: 'Eta (η)', risk: 4, desc: '高危导管。释放灵能风暴，审判庭紧盯', isTalent: true, isNegativePsyker: false },
  { name: '灵魂点燃者', pr: 6, class: 'Zeta (ζ)', risk: 5, desc: '精英分级。威力巨大，但失控也更加危险', isTalent: true, isNegativePsyker: false },
  { name: '深渊回响', pr: 7, class: 'Epsilon (ε)', risk: 6, desc: '现实撕裂者。足以摧毁要塞，失控极度危险', isTalent: true, isNegativePsyker: false },
  { name: '意志洪流', pr: 8, class: 'Delta (δ)', risk: 7, desc: '灭绝令预备对象。可对抗恶魔王子', isTalent: true, isNegativePsyker: false },
  { name: '先知视界', pr: 9, class: 'Gamma (γ)', risk: 8, desc: '大师级资产。十亿人中才有一位的奇才', isTalent: true, isNegativePsyker: false },
  { name: '灵魂暴君', pr: 10, class: 'Beta (β)', risk: 9, desc: '最高机密。足以扭转战局，撕裂现实', isTalent: true, isNegativePsyker: false },
  { name: '灵能掌控', desc: '每天获得等于技能等级的「克制施法」和「灵能压制」次数。降低最终风险，每级降1级。最高 Lv.10 (初始限Lv.3)', isUpgradeable: true, isTalent: false, isNegativePsyker: false },
  // 负向灵能者天赋
  { name: '灵能扰动者', nr: 1, class: 'Sigma (Σ)', desc: '帝国“灵能盲”。对灵能极度迟钝，自身无压制能力', isTalent: true, isNegativePsyker: true },
  { name: '灵能阻碍者', nr: 2, class: 'Psi (Ψ)', desc: '低级干扰源。周围灵能者会感到轻微不适，施法易分心', isTalent: true, isNegativePsyker: true },
  { name: '灵能抑制者', nr: 3, class: 'Chi (Χ)', desc: '战术级空白。主动压制低级灵能，会令盟友感到莫名厌恶', isTalent: true, isNegativePsyker: true },
  { name: '灵能隔绝者', nr: 4, class: 'Phi (Φ)', desc: '灵能死区。近处灵能施法困难，低级恶魔会逃离', isTalent: true, isNegativePsyker: true },
  { name: '灵能压制者', nr: 5, class: 'Upsilon (Υ)', desc: '高危资产。轻易压制战斗灵能者，能短暂驱散恶魔', isTalent: true, isNegativePsyker: true },
  { name: '灵魂瓦解者', nr: 6, class: 'Tau (Τ)', desc: '反灵能兵器。能撕裂护盾、湮灭灵魂。被用于对抗亚空间入侵', isTalent: true, isNegativePsyker: true },
  { name: '灵魂湮灭者', nr: 7, class: 'Omega (Ω)', desc: '亚空间的黑洞，恶魔领主也会感到寒意。帝国只会利用与清除他们', isTalent: true, isNegativePsyker: true },
];


const getAvailableIdentities = (faction: string) => {
  const all = SOCIAL_IDENTITIES;
  
  if (faction.includes('星际战士') || faction.includes('阿斯塔特')) {
    return all.filter(i => ['星际战士老兵', '虚空之子', '蛮荒世界居民', '巢都世界居民', '农业世界居民', '文明世界居民', '高科技世界精英', '死亡世界遗孤', '封建世界骑士'].includes(i));
  }
  if (faction.includes('禁军')) {
    return all.filter(i => ['帝皇之选'].includes(i));
  }
  if (faction.includes('寂静修女会') || faction.includes('星际通信厅')) {
    return all.filter(i => ['黑船幸存者'].includes(i));
  }
  if (faction.includes('星界军') || faction.includes('帝国海军') || faction.includes('叛教星界军')) {
    return all.filter(i => ['星界军老兵', '巢都世界居民', '蛮荒世界居民', '农业世界居民', '文明世界居民', '高科技世界精英', '死亡世界遗孤', '封建世界骑士', '虚空之子', '变种人'].includes(i));
  }
  if (faction.includes('行星防卫军')) {
    return all.filter(i => ['巢都世界居民', '农业世界居民', '蛮荒世界居民', '文明世界居民', '高科技世界精英', '死亡世界遗孤', '变种人'].includes(i));
  }
  if (faction.includes('风暴忠嗣军') || faction.includes('战斗修女会') || faction.includes('帝国国教')) {
    return all.filter(i => ['忠嗣学院'].includes(i));
  }
  if (faction.includes('审判庭') || faction.includes('刺客庭')) {
    return all.filter(i => ['巢都世界居民', '农业世界居民', '文明世界居民', '高科技世界精英', '死亡世界遗孤', '虚空之子', '星界军老兵', '忠嗣学院', '黑船幸存者'].includes(i));
  }
  if (faction.includes('机械教') || faction.includes('黑暗机械教')) {
    return all.filter(i => ['铸造世界信徒', '巢都世界居民', '虚空之子'].includes(i));
  }
  if (faction.includes('法务部')) {
    return all.filter(i => ['巢都世界居民', '农业世界居民', '文明世界居民', '高科技世界精英', '虚空之子', '星界军老兵', '忠嗣学院'].includes(i));
  }
  if (faction.includes('行商浪人')) {
    return all.filter(i => ['虚空之子', '巢都世界居民', '农业世界居民', '文明世界居民', '高科技世界精英', '封建世界骑士'].includes(i));
  }
  if (faction.includes('混沌星际战士')) {
    return all.filter(i => ['星际战士老兵', '虚空之子', '混沌选民', '蛮荒世界居民', '巢都世界居民', '农业世界居民', '文明世界居民', '高科技世界精英', '死亡世界遗孤'].includes(i));
  }
  if (faction.includes('恐虐战团') || faction.includes('奸奇信徒') || faction.includes('纳垢军团') || faction.includes('色孽信徒') || faction.includes('混沌恶魔') || faction.includes('混沌邪教徒')) {
    return all.filter(i => ['虚空之子', '堕落权贵',  '变种人', '混沌选民', '巢都世界居民', '农业世界居民', '蛮荒世界居民', '文明世界居民', '高科技世界精英', '死亡世界遗孤'].includes(i));
  }
  return all;
};

const getAvailableUnitTypes = (faction: string) => {
  const all = UNIT_TYPES;

  // 1. 亚空间恶魔：纯粹的亚空间存在，几乎不需要凡人载具
  if (faction.includes('恶魔')) {
    return [UnitType.PSYKER_ELITE];
  }

  // 2. 星际战士（忠诚/叛变）与禁军：超人类精英，拥有独立作战与载具控制权
  if (faction.includes('星际战士') || faction.includes('禁军') || faction.includes('混沌星际战士')) {
    return [UnitType.ASTARTES, UnitType.OFFICER_COMMAND, UnitType.SPECIALIST, UnitType.SQUAD_OPERATIVE];
  }

  // 3. 正规凡人军队（帝国与叛军/行星防卫军）：大规模战争主力
  if (faction.includes('星界军') || faction.includes('风暴忠嗣军') || faction.includes('行星防卫军') || faction.includes('恐虐战团') || faction.includes('纳垢军团') || faction.includes('叛教星界军')) {
    return [UnitType.LINE_INFANTRY, UnitType.SHOCK_TROOPS, UnitType.OFFICER_COMMAND, UnitType.SPECIALIST];
  }

  // 4. 特行机构与执法者：侧重于渗透、调查与精英作战
  if (faction.includes('审判庭') || faction.includes('刺客庭') || faction.includes('法务部') || faction.includes('行商浪人') || faction.includes('星际通信厅')) {
    return [UnitType.SQUAD_OPERATIVE, UnitType.SPECIALIST, UnitType.OFFICER_COMMAND, UnitType.PSYKER_ELITE];
  }

  // 5. 机械神教：技术至上
  if (faction.includes('机械教')) {
    return [UnitType.SPECIALIST, UnitType.OFFICER_COMMAND, UnitType.SQUAD_OPERATIVE];
  }

  // 6. 狂热信仰与神迹
  if (faction.includes('战斗修女会') || faction.includes('寂静修女会') || faction.includes('帝国国教')|| faction.includes('奸奇信徒') || faction.includes('色孽信徒')) {
    return [UnitType.LINE_INFANTRY, UnitType.SHOCK_TROOPS, UnitType.OFFICER_COMMAND];
  }

  return all.filter(t => t !== UnitType.UNKNOWN as any);
};

const getAvailableVehicles = (faction: string, unit: UnitType) => {
  const all = VEHICLE_CLASSES;
  
  // 恶魔：无载具
  if (faction.includes('恶魔')) {
    return [VehicleClass.NONE];
  }

  // 阿斯塔特/星际战士/禁军：独立作战，拥有全序列载具
  if (unit === UnitType.ASTARTES) {
    return [
      VehicleClass.NONE, 
      VehicleClass.TRANSPORT, 
      VehicleClass.WALKER, 
      VehicleClass.BATTLE_TANK, 
      VehicleClass.HEAVY_ASSAULT, 
      VehicleClass.AIRCRAFT
    ];
  }

  // 指挥官级别：可以配属任何级别的战区支援
  if (unit === UnitType.OFFICER_COMMAND) {
    return all;
  }

  // 基础步兵：仅限于运兵车支援 (Chimera/Rhino等)
  if (unit === UnitType.LINE_INFANTRY) {
    return [VehicleClass.NONE, VehicleClass.TRANSPORT];
  }

  // 冲击部队/空降兵：运兵车或飞行器支援 (Valkyrie等)
  if (unit === UnitType.SHOCK_TROOPS) {
    return [VehicleClass.NONE, VehicleClass.TRANSPORT, VehicleClass.AIRCRAFT];
  }

  // 小队特工/特卫/暗杀小队：隐蔽性优先，仅限侦察载具
  if (unit === UnitType.SQUAD_OPERATIVE) {
    return [VehicleClass.NONE, VehicleClass.SCOUT];
  }

  // 专家/技术人员：可以配属侦察或战斗机甲
  if (unit === UnitType.SPECIALIST) {
    const specs = [VehicleClass.NONE, VehicleClass.SCOUT];
    // 机械教专家可以配属战斗机甲/机械平台
    if (faction.includes('机械教')) {
      specs.push(VehicleClass.WALKER);
    }
    return specs;
  }

  // 灵能精英：不依赖载具
  if (unit === UnitType.PSYKER_ELITE) {
    return [VehicleClass.NONE];
  }

  return [VehicleClass.NONE];
};

// Use TraitData from types.ts

const TRAIT_CATALOG: Record<string, TraitData> = (() => {
  const map: Record<string, TraitData> = {};
  const lines = KNOWLEDGE_BASE_DATA.split('\n');
  let currentGroup = '';
  for (const line of lines) {
    if (line.includes('> **生物特质 (Traits)**')) currentGroup = '生物特质';
    else if (line.includes('> **')) currentGroup = '派系特质';

    if (line.includes('|') && !line.includes(':---') && !line.includes('特质名称') && !line.includes('单位名称') && !line.includes('战团名称')) {
      const cleanLine = line.replace(/^\s*>\s*/, '').trim();
      if (cleanLine.startsWith('|') && cleanLine.endsWith('|')) {
        const parts = cleanLine.split('|').map(p => p.trim()).filter((p, i, a) => (i > 0 && i < a.length - 1));
        
        if (parts.length >= 2) {
          let owner = '';
          let name = '';
          let desc = '';
          
          if (parts.length >= 3) {
            owner = parts[0];
            name = parts[1];
            desc = parts.slice(2).join(' | ').trim();
          } else {
            owner = currentGroup || '通用特质';
            name = parts[0];
            desc = parts[1];
          }

          if (owner && name && desc && owner !== '派系' && owner !== '事件' && !owner.includes('名称') && !owner.includes('类别') && !owner.includes('对应') && isNaN(Number(name)) && isNaN(Number(desc))) {
            // Filter out items that accidentally look like traits (too many columns or weapon stats)
            const isWeaponStat = /\d+\s*\|\s*\d+/.test(desc);
            const isItem = (name.startsWith('[') && name.endsWith(']')) || parts.length > 3;
            
            if (!isWeaponStat && !isItem) {
              const grantedSkills: { name: string; selectable: boolean }[] = [];
              const grantedTraits: string[] = [];

              const skillRegex = /获得[「\[]([^」\]]+)[」\]]技能(（自选）)?/g;
              let match;
              while ((match = skillRegex.exec(desc)) !== null) {
                grantedSkills.push({
                  name: match[1],
                  selectable: !!match[2]
                });
              }

              const traitChunkRegex = /获得(.*?)(?:特质)/g;
              let tcMatch;
              while ((tcMatch = traitChunkRegex.exec(desc)) !== null) {
                const chunk = tcMatch[1];
                const bracketedItems = chunk.match(/[「\[](.*?)[」\]]/g);
                if (bracketedItems) {
                  bracketedItems.forEach(item => {
                    const tName = item.replace(/[「」\[\]]/g, '').replace(/-/g, '·').trim();
                    if (tName && !grantedTraits.includes(tName)) {
                      grantedTraits.push(tName);
                    }
                  });
                }
              }

              const tData = { owner, name, desc, grantedSkills, grantedTraits };
              if (name === '亚空间之眼') {
                if (!grantedSkills.some(s => s.name === '灵能天赋')) {
                  grantedSkills.push({ name: '灵能天赋', selectable: false });
                }
                if (!grantedSkills.some(s => s.name === '禁忌知识·亚空间')) {
                  grantedSkills.push({ name: '禁忌知识·亚空间', selectable: false });
                }
              }
              if (name === '寂静誓言') {
                if (!grantedSkills.some(s => s.name === '负向灵能者')) {
                  grantedSkills.push({ name: '负向灵能者', selectable: true });
                }
              }
              if (!map[name] || (tData.grantedSkills.length > (map[name] as any).grantedSkills.length)) {
                map[name] = tData;
              }
              if (owner !== '通用特质' && owner !== '生物特质') {
                if (!map[owner]) map[owner] = tData;
              }
            }
          }
        }
      }
    }
  }
  return map;
})();


const INITIAL_RESOURCES_DATA: Record<string, any> = (() => {
  const res: Record<string, any> = {};
  const lines = KNOWLEDGE_BASE_DATA.split('\n');
  let headers: string[] = [];

  for (const line of lines) {
    if (line.includes('|') && !line.includes(':---')) {
      const parts = line.replace(/^\s*[>#]*\s*\|/, '').split('|').map(p => p.trim()).filter(p => p !== '');
      if (parts[0] === '子派系' || parts[0].includes('子派系')) {
        headers = parts;
        continue;
      }
      if (headers.length > 0 && parts.length === headers.length && !parts[0].includes('---')) {
        const factionName = parts[0];
        res[factionName] = {};
        for (let i = 1; i < headers.length; i++) {
           const val = parseInt(parts[i].replace(/\D/g, ''));
           if (!isNaN(val)) {
             if (headers[i].includes('王座币')) res[factionName].throne = val;
             if (headers[i].includes('信用点')) res[factionName].credits = val;
             if (headers[i].includes('征用点')) res[factionName].requisition = val;
             if (headers[i].includes('灵魂')) res[factionName].souls = val;
             if (headers[i].includes('奴隶')) res[factionName].slaves = val;
           }
        }
      }
    }
  }
  return res;
})();

export const CharacterCreation: React.FC<CharacterCreationProps> = ({ onComplete, onAlignmentChange }) => {
  const [page, setPage] = useState(1);

  // Common State
  const [name, setName] = useState('');
  const [title, setTitle] = useState(''); // 头衔/称号
  const [originWorld, setOriginWorld] = useState(''); // 母星
  const [gender, setGender] = useState('男性');
  const [age, setAge] = useState('');
  const [appearance, setAppearance] = useState('');
  const [biography, setBiography] = useState('');
  
  const [faithLevel, setFaithLevel] = useState(2);
  const [corruptionValue, setCorruptionValue] = useState(0);
  
  const [chaosBlessing, setChaosBlessing] = useState<string | null>(null);
  const [mutantTrait, setMutantTrait] = useState<string | null>(null);
  
  const [chaosSelectionActive, setChaosSelectionActive] = useState(false);
  
  // Background & Logic
  const [socialIdentity, setSocialIdentity] = useState(SOCIAL_IDENTITIES[0]);
  const [baseAlignment, setBaseAlignment] = useState('帝国 (Imperium)');
  const [lineage, setLineage] = useState(IMPERIUM_FACTIONS[0]);
  const [subFaction, setSubFaction] = useState('');

  const isChaos = useMemo(() => {
    return baseAlignment.includes('混沌') || lineage.includes('混沌') || lineage.includes('变节') || lineage.includes('恐虐') || lineage.includes('奸奇') || lineage.includes('纳垢') || lineage.includes('色孽');
  }, [baseAlignment, lineage]);

  useEffect(() => {
    onAlignmentChange?.(isChaos ? '混沌' : '帝国');
  }, [isChaos, onAlignmentChange]);

  // Faction to Initial Stats Mapping
  useEffect(() => {
    const FACTION_FAITH_MAP: Record<string, number> = {
      '星际战士': 3,
      '阿斯塔特': 3,
      '星界军': 3,
      '审判庭': 3,
      '机械教': 3,
      '战斗修女会': 3,
      '修女会': 3,
      '刺客庭': 2,
      '风暴忠嗣军': 3,
      '禁军': 5,
      '行商浪人': 2,
      '帝国国教': 3,
      '国教': 3,
      '行星防卫军': 2,
      '法务部': 2,
    };

    const FACTION_CORRUPTION_MAP: Record<string, number> = {
      '混沌邪教徒': 90,
      '叛教星界军': 95,
      '奸奇信徒': 105,
      '色孽信徒': 105,
      '纳垢军团': 110,
      '恐虐战团': 115,
      '黑暗机械教': 120,
      '混沌星际战士': 125,
      '混沌恶魔': 140
    };

    const CHAOS_AUTO_BLESSING: Record<string, string> = {
      '恐虐战团': '嗜血狂徒',
      '色孽信徒': '欢愉之躯',
      '奸奇信徒': '奇想妙思',
      '纳垢军团': '肉体再生'
    };

    let foundFaith = 2; // Default for others
    let foundCorruption = 0; // Default for Imperium
    const combinedStr = `${lineage} ${subFaction}`;
    
    // Faith check
    for (const [key, val] of Object.entries(FACTION_FAITH_MAP)) {
      if (combinedStr.includes(key)) {
        foundFaith = val;
        break;
      }
    }

    // Corruption check
    let isChaos = false;
    for (const [key, val] of Object.entries(FACTION_CORRUPTION_MAP)) {
      if (combinedStr.includes(key)) {
        foundCorruption = val;
        isChaos = true;
        break;
      }
    }

    // Auto Blessing Logic
    if (isChaos) {
        let assigned = false;
        for (const [key, val] of Object.entries(CHAOS_AUTO_BLESSING)) {
            if (combinedStr.includes(key)) {
                setChaosBlessing(val);
                setChaosSelectionActive(false);
                assigned = true;
                break;
            }
        }
        if (!assigned) {
          setChaosSelectionActive(true);
        }
    } else {
        setChaosBlessing(null);
        setChaosSelectionActive(false);
    }

    setFaithLevel(foundFaith);
    setCorruptionValue(foundCorruption);
  }, [lineage, subFaction]);

  // Adepta Sororitas gender lock
  useEffect(() => {
    if (lineage === '战斗修女会') {
      setGender('女性');
    }
  }, [lineage]);

  // Reset inventory and equipment when faction changes to prevent transferring bought expensive gear
  useEffect(() => {
    setEquipmentList(new Array(12).fill(null));
    setItemList(new Array(24).fill(null));
  }, [lineage, subFaction]);

  const [alignment, setAlignment] = useState(''); 
  const [personality, setPersonality] = useState('狂热虔诚');
  const [selectedSetting, setSelectedSetting] = useState<HistoricalPeriod>(HistoricalPeriod.FALL_OF_CADIA);
  
  // Capabilities
  const [unitType, setUnitType] = useState<UnitType>(UnitType.LINE_INFANTRY);
  const [vehicleClass, setVehicleClass] = useState<VehicleClass>(VehicleClass.NONE);
  const [skills, setSkills] = useState<(Skill | null)[]>(new Array(30).fill(null));

  // Handle "顽强信仰" skill for Beastmen
  useEffect(() => {
    if (skills.some(s => s && s.name === '顽强信仰')) {
      setFaithLevel(4);
    }
  }, [skills]);

  const [skillPoints, setSkillPoints] = useState(6 + (IDENTITY_SKILL_POINTS[SOCIAL_IDENTITIES[0]] || 0));
  const [prevIdentity, setPrevIdentity] = useState(SOCIAL_IDENTITIES[0]);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  useEffect(() => {
    if (socialIdentity !== prevIdentity) {
      const oldBonus = IDENTITY_SKILL_POINTS[prevIdentity] || 0;
      const newBonus = IDENTITY_SKILL_POINTS[socialIdentity] || 0;
      setSkillPoints(prev => Math.max(0, prev - oldBonus + newBonus));
      setPrevIdentity(socialIdentity);
    }
  }, [socialIdentity, prevIdentity]);
  const [isTraitSelectionModalOpen, setIsTraitSelectionModalOpen] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  // New Armory States
  const [equipmentList, setEquipmentList] = useState<(ShopItem | null)[]>(new Array(12).fill(null));
  const [itemList, setItemList] = useState<(ShopItem | null)[]>(new Array(24).fill(null));
  const [isArmoryModalOpen, setIsArmoryModalOpen] = useState(false);
  const [armoryTargetType, setArmoryTargetType] = useState<'EQUIPMENT' | 'ITEM'>('EQUIPMENT');
  const [armoryTargetSlot, setArmoryTargetSlot] = useState<number | null>(null);
  const [purchaseCounts, setPurchaseCounts] = useState<Record<string, number>>({});

  // Compute budget
  const budget = useMemo(() => {
    const factionKey = subFaction || (lineage.includes(' (') ? lineage.split(' (')[0] : lineage);
    const resources = INITIAL_RESOURCES_DATA[factionKey] || INITIAL_RESOURCES_DATA[lineage] || {};
    
    const spent = { throne: 0, credits: 0, requisition: 0, souls: 0, slaves: 0 };
    [...equipmentList, ...itemList].forEach(item => {
      if (item && item.paidWith) {
        const itemCount = item.count || 1;
        spent[item.paidWith] += (item.costs[item.paidWith] || 0) * itemCount;
      }
    });

    return {
      total: resources,
      available: {
        throne: (resources.throne || 0) - spent.throne,
        credits: (resources.credits || 0) - spent.credits,
        requisition: (resources.requisition || 0) - spent.requisition,
        souls: (resources.souls || 0) - spent.souls,
        slaves: (resources.slaves || 0) - spent.slaves,
      }
    };
  }, [subFaction, lineage, equipmentList, itemList]);

  // Computed Traits List
  const maxTraits = 12;
  
  const baseTraits = useMemo(() => {
    // Collect all traits that match the name or owner of our identities/lineage/subfaction
    const candidates = Object.values(TRAIT_CATALOG).filter(t => 
      t.owner === lineage || t.name === lineage ||
      t.owner === subFaction || t.name === subFaction ||
      t.owner === socialIdentity || t.name === socialIdentity
    );
    
    // De-duplicate same-named traits, preferring more specific ones or ones from subfactions
    const uniqueMap = new Map<string, TraitData>();
    candidates.forEach(t => {
      const existing = uniqueMap.get(t.name);
      if (!existing || t.owner === subFaction || t.owner === lineage) {
        uniqueMap.set(t.name, t);
      }
    });
    
    // Add additional generated traits recursively
    const findGranted = (traits: TraitData[]) => {
      const more: TraitData[] = [];
      traits.forEach(t => {
        t.grantedTraits.forEach(gt => {
          // Normalize the name before searching
          const normalizedGt = gt.replace(/-/g, '·').trim();
          if (!uniqueMap.has(normalizedGt)) {
            const data = TRAIT_CATALOG[normalizedGt];
            if (data) {
              uniqueMap.set(normalizedGt, data);
              more.push(data);
            } else {
              const placeholder = { owner: '衍生来源', name: normalizedGt, desc: '衍生特质', grantedSkills: [], grantedTraits: [] };
              uniqueMap.set(normalizedGt, placeholder);
              more.push(placeholder);
            }
          }
        });
      });
      if (more.length > 0) findGranted(more);
    };

    findGranted(Array.from(uniqueMap.values()));

    // Inject base size trait based on lineage/subFaction/identity
    let sizeTraitName = '体型·普通';
    if (socialIdentity.includes('欧格林')) sizeTraitName = '体型·大型';
    else if (socialIdentity.includes('莱特林')) sizeTraitName = '体型·小型';
    else if (lineage === '星际战士' || lineage === '禁军' || lineage === '混沌星际战士') sizeTraitName = '体型·大型';
    else if (subFaction === '高阶技术神甫') sizeTraitName = '体型·大型';
    
    // Remove all existing size traits first to ensure exclusivity
    Array.from(uniqueMap.values()).forEach(t => {
        if (t.name.startsWith('体型·')) uniqueMap.delete(t.name);
    });

    // Add correct size trait
    const sizeTrait = TRAIT_CATALOG[sizeTraitName];
    if (sizeTrait) {
        uniqueMap.set(sizeTraitName, { ...sizeTrait, owner: '派系基础体型' });
    }

    const mutantSpecificTraits = ['愚钝蛮力', '半身之巧', '亚空间之眼', '野兽之躯', '欧格林', '莱特林', '导航者', '野兽人'];
    return Array.from(uniqueMap.values()).filter(t => !mutantSpecificTraits.includes(t.name));
  }, [lineage, subFaction, socialIdentity]);

  const traitsFromSkills = useMemo(() => {
    const list: TraitData[] = [];
    
    // Add Chaos Blessing if selected
    if (chaosBlessing) {
      const cbData = TRAIT_CATALOG[chaosBlessing];
      if (cbData) {
        list.push({ ...cbData, owner: '混沌赐福' });
      } else {
        list.push({ owner: '混沌赐福', name: chaosBlessing, desc: '受赐予的特质', grantedSkills: [], grantedTraits: [] });
      }
    }

    if (socialIdentity === '变种人' && mutantTrait) {
      const mtData = TRAIT_CATALOG[mutantTrait];
      if (mtData) {
        list.push({ ...mtData, owner: '变种人特质' });
      } else {
        list.push({ owner: '变种人特质', name: mutantTrait, desc: '变种人种族特质', grantedSkills: [], grantedTraits: [] });
      }
    }

    skills.forEach(skill => {
      // Safely access selectedTraits and ensure it is an array
      const traits = skill?.selectedTraits || [];
      traits.forEach(traitName => {
        const tData = TRAIT_CATALOG[traitName];
        if (tData) {
          list.push({ ...tData, owner: skill.name });
        } else {
          list.push({ owner: skill.name, name: traitName, desc: '技能附加特质', grantedSkills: [], grantedTraits: [] });
        }
      });
    });
    return list;
  }, [skills, chaosBlessing, socialIdentity, mutantTrait]);

  // Calculate Psykana Details
  const psykanaDetails = useMemo(() => {
    let maxPR = 0;
    let maxNR = 0;
    
    skills.forEach(s => {
      if (!s) return;
      if (s.type === SkillType.PSYKER) {
        if (s.isNegativePsyker && s.nr) {
          maxNR = Math.max(maxNR, s.nr);
        } else if (!s.isNegativePsyker && s.pr) {
          maxPR = Math.max(maxPR, s.pr);
        }
      }
    });

    const prRanks: Record<number, string> = {
      1: 'Omicron (ο)', 2: 'Kappa (κ)', 3: 'Iota (ι)', 4: 'Theta (θ)', 5: 'Eta (η)',
      6: 'Zeta (ζ)', 7: 'Epsilon (ε)', 8: 'Delta (δ)', 9: 'Gamma (γ)', 10: 'Beta (β)',
      11: 'Alpha (α)', 12: 'Alpha-Plus (α+)', 13: '超越Alpha-Plus'
    };
    
    const nrRanks: Record<number, string> = {
      1: 'Sigma (Σ)', 2: 'Psi (Ψ)', 3: 'Chi (Χ)', 4: 'Phi (Φ)', 5: 'Upsilon (Υ)',
      6: 'Tau (Τ)', 7: 'Omega (Ω)'
    };

    if (maxPR > 0) {
      return { 
        isActive: true, 
        label: `灵能者等级: ${maxPR}`, 
        rank: prRanks[maxPR] || 'Omicron (ο)',
        type: 'PSYKER' as const
      };
    } else if (maxNR > 0) {
      return { 
        isActive: true, 
        label: `压制等级: ${maxNR}`, 
        rank: nrRanks[maxNR] || 'Sigma (Σ)',
        type: 'PARIAH' as const
      };
    }

    // Default or based on background
    const isBackgroundPsyker = lineage.includes('智库') || lineage.includes('灵能') || lineage.includes('术士') || 
                               socialIdentity.includes('灵能') || personality.includes('灵能') || 
                               lineage.includes('灰骑士') || lineage.includes('千子');
    
    return { 
      isActive: isBackgroundPsyker, 
      label: isBackgroundPsyker ? '已觉醒' : '未觉醒', 
      rank: isBackgroundPsyker ? '未知等级' : 'NONE',
      type: 'NONE' as const
    };
  }, [skills, lineage, socialIdentity, personality]);

  const isPsykana = psykanaDetails.isActive;

  const derivedTraits = useMemo(() => {
    let list = [...baseTraits];
    
    traitsFromSkills.forEach(t => {
      // If we are adding a size trait, overwrite the base one
      if (t.name.startsWith('体型·')) {
        list = list.filter(existing => !existing.name.startsWith('体型·'));
      }
      
      if (!list.some(existing => existing.name === t.name)) {
        list.push(t);
      }
    });

    // 1. Mutual Exclusion: Mechanized vs Regeneration
    // Rule: If has any '机械化', then cannot have any '再生'
    const hasMechanized = list.some(t => t.name.includes('机械化'));
    if (hasMechanized) {
      list = list.filter(t => !t.name.includes('再生'));
    }

    // 2. Regeneration Hierarchy Enforcement (Replacement)
    if (list.some(t => t.name.includes('再生·高级'))) {
      list = list.filter(t => !t.name.includes('再生·中级') && !t.name.includes('再生·初级'));
    } else if (list.some(t => t.name.includes('再生·中级'))) {
      list = list.filter(t => !t.name.includes('再生·初级'));
    }

    // 3. Mechanized Hierarchy Enforcement (Replacement)
    if (list.some(t => t.name.includes('机械化·高级'))) {
      list = list.filter(t => !t.name.includes('机械化·中级') && !t.name.includes('机械化·初级'));
    } else if (list.some(t => t.name.includes('机械化·中级'))) {
      list = list.filter(t => !t.name.includes('机械化·初级'));
    }

    // 4. Natural Weapon Hierarchy Enforcement (Replacement)
    if (list.some(t => t.name.includes('强化天生武器'))) {
      list = list.filter(t => t.name.replace(/[【】]/g, '') !== '天生武器');
    }

    return list.slice(0, maxTraits);
  }, [baseTraits, traitsFromSkills, maxTraits]);

  // Sync granted skills into the skills state
  useEffect(() => {
    setSkills(prev => {
      const draft = [...prev];
      const allGrantedSkills: { data: {name: string, selectable: boolean}, sourceTrait: string }[] = [];
      const allTraitsToCheck = [...baseTraits, ...traitsFromSkills];
      allTraitsToCheck.forEach(t => {
        t.grantedSkills.forEach(gs => {
           allGrantedSkills.push({ data: gs, sourceTrait: t.name });
        });
      });

      let idx = 0;
      allGrantedSkills.forEach(granted => {
        if (idx >= 8) return;
        const existing = draft[idx];
        const isTalentChoice = granted.data.name.includes('灵能天赋') || granted.data.name.includes('负向灵能者');
        if (granted.data.selectable || isTalentChoice) {
           if (!existing || !existing.isGrantedSelectable || existing.grantedSourceName !== granted.sourceTrait) {
              const isNegative = granted.data.name.includes('负向灵能者');
              draft[idx] = {
                 id: `granted_sel_${idx}`,
                 name: `点击选择 [${granted.data.name}]`,
                 description: '这部分取决于您的特质，请点击进行选择。',
                 type: (granted.data.name.includes('灵能') || granted.data.name.includes('Psyker') || isNegative) ? SkillType.PSYKER : SkillType.REGULAR,
                 level: 1,
                 isUpgradeable: false,
                 isGrantedSelectable: true,
                 grantedSourceName: granted.sourceTrait,
                 grantedChoices: isNegative ? 'NEGATIVE_PSYKER' : (isTalentChoice ? 'PSIONIC_TALENT' : 'PSYKER')
              } as unknown as Skill;
           }
        } else {
           // It's a fixed skill
           if (!existing || !existing.isGrantedFixed || existing.name !== granted.data.name) {
              const allPossibleStats = [...REGULAR_SKILLS_DATA, ...KNOWLEDGE_SKILLS_DATA, ...PSYKER_SKILLS_DATA, ...FACTION_SKILLS_DATA];
              const match = allPossibleStats.find(s => s.name === granted.data.name);
              const isFaction = FACTION_SKILLS_DATA.some(f => f.name === granted.data.name);
              draft[idx] = {
                 id: `fixed_${idx}`,
                 name: granted.data.name,
                 description: match?.desc || '特质带来的固有能力',
                 type: match && 'pr' in match ? SkillType.PSYKER : (isFaction ? SkillType.FACTION : SkillType.REGULAR),
                 level: 1,
                 isUpgradeable: false,
                 isGrantedFixed: true,
                 grantedSourceName: granted.sourceTrait
              } as unknown as Skill;
           }
        }
        idx++;
      });

      // Clear any slots that were granted but are now empty because trait was removed
      for (let i = idx; i < 8; i++) {
         if (draft[i]?.isGrantedFixed || draft[i]?.isGrantedSelectable) {
            draft[i] = null;
         }
      }

      // Check if draft is really different from prev
      const isDifferent = prev.length !== draft.length || 
                          prev.some((s, i) => JSON.stringify(s) !== JSON.stringify(draft[i]));

      return isDifferent ? draft : prev;
    });
  }, [baseTraits, traitsFromSkills]);

  // Sync granted equipments (e.g. 祖传珍宝)
  useEffect(() => {
    setEquipmentList(prev => {
      const draft = [...prev];
      const hasAncestralWeapon = baseTraits.some(t => t.name === '祖传珍宝');
      
      const idx = 0; // Use slot 0 for granted ancestral weapon
      if (hasAncestralWeapon) {
        const existing = draft[idx];
        if (!existing || !existing.isGrantedSelectable || existing.id !== 'granted_eq_ancestral') {
          // Keep it if it has been bought, wait, if the user already bought one of the choices, we don't overwrite
          const chosen = ['沃斯托尼亚“家传”型动力剑', '沃斯托尼亚精工激光枪', '沃斯托尼亚精工重型爆弹枪'];
          if (!existing || !chosen.includes(existing.name)) {
            draft[idx] = {
              id: 'granted_eq_ancestral',
              name: '点击选择 [祖传珍宝]',
              category: '武器',
              level: 1,
              costs: { free: 0 } as any, // Costs nothing
              isGrantedSelectable: true,
              grantedChoices: chosen,
              desc: '选择您的沃斯托尼亚祖传珍宝',
              stats: {
                type: '武器'
              }
            } as ShopItem;
          }
        }
      } else {
        if (draft[idx]?.id === 'granted_eq_ancestral') {
          draft[idx] = null;
        }
      }
      return draft;
    });
  }, [baseTraits]);
  
  const [attrs, setAttrs] = useState({
    weaponSkill: 10,
    ballisticSkill: 10,
    strength: 10,
    toughness: 10,
    agility: 10,
    intelligence: 10,
    perception: 10,
    willpower: 10,
    fellowship: 10
  });

  // Calculate Extra Modifiers from Traits (Stat-affecting traits)
  const extraModifiers = useMemo(() => {
    const mods = {
      weaponSkill: 0, ballisticSkill: 0, strength: 0, toughness: 0,
      agility: 0, intelligence: 0, perception: 0, willpower: 0, fellowship: 0
    };

    // We removed hardcoded lineage bonuses and socialIdentity bonuses
    // Because they are now fully mapped through derivedTraits!
    
    // Equipment and Item Stat Modifiers
    [...equipmentList, ...itemList].forEach(item => {
      if (!item || !item.stats) return;
      const stats = item.stats;

      if (stats.toughness) {
         let tVal = parseInt(String(stats.toughness).replace(/[+]/g, ''));
         if (!isNaN(tVal)) {
           // 火线尖兵
           if (item.name.includes('防弹') || (item.category && item.category.includes('防弹'))) {
             const ballisticMastery = skills.find(s => s && s.name === '火线尖兵');
             if (ballisticMastery) {
               tVal += 3 * (ballisticMastery.level || 1);
             }
           }
           mods.toughness += tVal;
         }
      }

      // Handle attribute modification strings (stats.mod)
      // Example: "力量+20, 感知+10, 意志+5, 敏捷-5"
      if (stats.mod) {
        const modStr = String(stats.mod);
        const modParts = modStr.split(/[,，]/);
        modParts.forEach(part => {
          const p = part.trim();
          // Improved regex to handle "社交(Fel)-10" or "BS+5" style identifiers
          const match = p.match(/(武器技能|射击技能|力量|坚韧|敏捷|智力|感知|意志力|意志|社交能力|社交|交际|WS|BS|S|T|Ag|Int|Per|WP|Fel)\s*(?:\([a-zA-Z/]+\))?\s*([+-]\d+)/);
          if (match) {
            const label = match[1];
            const val = parseInt(match[2]);
            if (label === '力量' || label === 'S') mods.strength += val;
            else if (label === '感知' || label === 'Per') mods.perception += val;
            else if (label === '意志' || label === '意志力' || label === 'WP') mods.willpower += val;
            else if (label === '敏捷' || label === 'Ag') mods.agility += val;
            else if (label === '智力' || label === 'Int') mods.intelligence += val;
            else if (label === '社交' || label === '交际' || label === '社交能力' || label === 'Fel') mods.fellowship += val;
            else if (label === '武器技能' || label === 'WS') mods.weaponSkill += val;
            else if (label === '射击技能' || label === '射击' || label === 'BS' || label === '步兵枪法') mods.ballisticSkill += val;
            else if (label === '坚韧' || label === 'T') mods.toughness += val;
          }
        });
      }
    });

    // Skills Modifiers
    skills.forEach(skill => {
      if (!skill) return;
      const level = skill.level || 1;
      if (skill.name === '混沌赐福') {
        mods.strength += 5 * level;
        mods.toughness += 5 * level;
        mods.willpower += 5 * level;
      } else if (skill.name === '战斗训练') {
        mods.weaponSkill += 5 * level;
        mods.ballisticSkill += 5 * level;
      } else if (skill.name === '神圣狂热') {
        mods.willpower += 10 * level;
      } else if (skill.name === '帝皇禁卫') {
        mods.strength += 5 * level;
        mods.toughness += 5 * level;
        mods.weaponSkill += 5 * level;
      } else if (skill.name === '原铸改造') {
        mods.strength += 5 * level;
        mods.toughness += 5 * level;
        mods.agility += 5 * level;
      } else if (skill.name === '火线尖兵') {
        mods.ballisticSkill += 3 * level;
      } else if (skill.name === '智力提升手术') {
        mods.perception += 5 * level;
        mods.intelligence += 8 * level;
      } else if (skill.name === '生存本能') {
        mods.strength += 5 * level;
        mods.toughness += 10 * level;
      } else if (skill.name === '亚空间预见') {
        mods.perception += 10 * level;
      }
    });

    if (skills.some(s => s && s.name === '顽强信仰')) {
       // Handled during faith setup, but if we need a stat mod, none exists
    }

    // Faith Level Bonuses
    if (faithLevel >= 2) {
      mods.willpower += 5;
    }
    if (faithLevel >= 3) {
      mods.willpower += 5;
    }
    if (faithLevel >= 4) {
      mods.willpower += 5;
    }
    if (faithLevel >= 5) {
      mods.weaponSkill += 10;
      mods.ballisticSkill += 10;
      mods.strength += 10;
      mods.toughness += 10;
      mods.agility += 10;
      mods.intelligence += 10;
      mods.perception += 10;
      mods.willpower += 10;
      mods.fellowship += 10;
    }


    // Chaos Blessing Traits Modifiers
    if (chaosBlessing === '欢愉之躯') {
      mods.agility += 15;
    } else if (chaosBlessing === '奇想妙思') {
      mods.intelligence += 20;
    } else if (chaosBlessing === '肉体再生') {
      mods.toughness += 10;
    } else if (chaosBlessing === '混沌眷顾') {
      mods.perception += 10;
      mods.willpower += 10;
    } else if (chaosBlessing === '混沌印记') {
      mods.strength += 5;
      mods.toughness += 5;
      mods.agility += 5;
      mods.intelligence += 5;
    }

    // Derived Traits Modifiers (Generic Parser + Specialized Overrides)
    derivedTraits.forEach(t => {
      // Generic Extraction from description (e.g. "力量(S)+5", "BS+10", "Fel-10")
      // Support for both Full Chinese names and acronyms, handling +/- signs strictly
      // Acronyms in parentheses can be mixed case (e.g. Fel, Ag)
      const attrRegex = /(武器技能|射击技能|攻击技能|力量|坚韧|敏捷|智力|感知|意志力|意志|社交能力|社交|交际|WS|BS|S|T|Ag|Int|Per|WP|Fel)\s*(?:\([a-zA-Z/]+\))?\s*([+-]\d+)/g;
      let match;
      while ((match = attrRegex.exec(t.desc)) !== null) {
        // Prevent parsing conditional modifiers that should not be applied to base stats.
        let prefix = t.desc.slice(0, match.index);
        const lastPunc = Math.max(prefix.lastIndexOf('。'), prefix.lastIndexOf('；'), prefix.lastIndexOf('.'), prefix.lastIndexOf(';'));
        if (lastPunc !== -1) prefix = prefix.slice(lastPunc + 1);
        const isConditional = /时|对抗|视为|期间|若|当|针对|潜行|冲锋|射击|防御|驾驶|飞行|环境[中下]|状态[中下]|每次|受到|如果|次|每回合|每天|回合/.test(prefix);
        if (isConditional) continue;

        const label = match[1];
        const val = parseInt(match[2]);
        
        if (isNaN(val)) continue;

        switch (label) {
          case '武器技能': case 'WS': mods.weaponSkill += val; break;
          case '射击技能': case '攻击技能': case 'BS': case '射击': mods.ballisticSkill += val; break;
          case '力量': case 'S': mods.strength += val; break;
          case '坚韧': case 'T': mods.toughness += val; break;
          case '敏捷': case 'Ag': mods.agility += val; break;
          case '智力': case 'Int': mods.intelligence += val; break;
          case '感知': case 'Per': mods.perception += val; break;
          case '意志': case '意志力': case 'WP': mods.willpower += val; break;
          case '社交': case '社交能力': case '交际': case 'Fel': mods.fellowship += val; break;
        }
      }

      // 2. Specialized Overrides (Only for those whose descriptions don't use the standard S/T/Ag format)
      if (t.name === '帝皇守护者') { 
         // Most are caught by regex if desc says "All stats +5", but keeping as safety for manual entries
      }
      else if (t.name === '鲜血狂怒') { /* Standard regex might miss if logic is in narrative */ }
      else if (t.name === '极乐迅捷' && !t.desc.includes('敏捷+5')) mods.agility += 5;
      
      // We removed the manual hardcoded block for '强壮体魄', '百战幸存' etc. 
      // as they are now dynamically extracted from THEIR descriptions in lib/knowledge/traits.ts
      
      // Biology Traits - Ensure we don't double count if they have regex values
      if (t.name === '装甲植入' && !t.desc.includes('坚韧+10')) mods.toughness += 10;
      else if (t.name === '机械化·初级' && !t.desc.includes('力量+5')) mods.strength += 5;
      else if (t.name === '机械化·中级' && !t.desc.includes('坚韧+10')) { mods.strength += (t.desc.includes('力量+5') ? 0 : 5); mods.toughness += 10; }
      else if (t.name === '机械化·高级' && !t.desc.includes('力量+10')) { mods.strength += 10; mods.toughness += 10; }
    });

    return mods;
  }, [lineage, socialIdentity, subFaction, skills, chaosBlessing, derivedTraits, equipmentList, itemList]);

  const finalAttrs = useMemo(() => {
    const final = { ...attrs } as typeof attrs;
    (Object.keys(attrs) as (keyof typeof attrs)[]).forEach(key => {
      final[key] = Math.max(1, (attrs[key] as number) + (extraModifiers[key] as number));
    });
    return final;
  }, [attrs, extraModifiers]);

  const ammoSummary = useMemo(() => {
    const counts: Record<string, number> = {};
    [...equipmentList, ...itemList].forEach(slot => {
      if (!slot) return;
      if (slot.category && (
        slot.category.includes('武器') ||
        slot.category.includes('护甲') ||
        slot.category.includes('盔甲') ||
        slot.category.includes('防具') ||
        slot.category.includes('服件') ||
        slot.category.includes('饰品')
      )) return;
      // Exclude bulletproof (防弹) or block-bullet (避弹) protective items containing character '弹'
      if (slot.name.includes('防弹') || slot.name.includes('避弹')) return;

      const isAmmo = slot.name.includes('弹') || slot.name.includes('箭矢') || slot.name.includes('电池') || (slot.category && slot.category.includes('弹药'));
      if (!isAmmo) return;

      let amount = 1;
      const desc = slot.stats?.desc || slot.description;
      if (desc) {
         const m = desc.match(/(\d+)\s*(?:发|支|枚|次)/);
         if (m) {
           amount = parseInt(m[1], 10);
         } else if (desc.includes('单枚')) {
           amount = 1;
         }
      }
      
      let baseName = (slot?.name || '').replace(/弹匣|燃料罐|罐|电容器|高容量|弹夹|弹鼓|弹药箱/g, '').trim();
      if (!baseName) baseName = slot.name;

      counts[baseName] = (counts[baseName] || 0) + (amount * (slot.count || 1));
    });
    return counts;
  }, [equipmentList, itemList]);

  const limits = CHARACTER_STAT_LIMITS[lineage] || CHARACTER_STAT_LIMITS["星界军"];
  const currentPoolUsed = (Object.values(attrs) as number[]).reduce((a, b) => a + b, 0);

  // Auto-reset attributes when lineage (limits) changes
  useEffect(() => {
    setChaosBlessing(null);
    setAttrs({
      weaponSkill: 10,
      ballisticSkill: 10,
      strength: 10,
      toughness: 10,
      agility: 10,
      intelligence: 10,
      perception: 10,
      willpower: 10,
      fellowship: 10
    });
    
    // Reset subfaction when lineage changes
    const availableSubs = SUB_FACTION_CONFIG[lineage] || [];
    if (availableSubs.length > 0) {
      setSubFaction(availableSubs[0]);
    } else {
      setSubFaction('');
    }
  }, [lineage]);

  useEffect(() => {
    if (subFaction) {
      if (['星际战士', '星界军', '战斗修女会', '刺客庭', '混沌星际战士', '风暴忠嗣军'].includes(lineage)) {
        setAllegiance(subFaction);
      } else {
        setAllegiance(lineage);
      }
    } else {
      setAllegiance(lineage);
    }
  }, [subFaction, lineage]);

  const autoAllocate = () => {
    const totalMax = limits.total;
    const pool = limits.pool;
    const keys: (keyof typeof attrs)[] = [
      'weaponSkill', 'ballisticSkill', 'strength', 'toughness', 'agility', 
      'intelligence', 'perception', 'willpower', 'fellowship'
    ];
    const limitKeys = ['WS', 'BS', 'S', 'T', 'Ag', 'Int', 'Per', 'WP', 'Fel'];
    
    const newAttrs = { ...attrs };
    let used = 0;
    
    // Proportional initial distribution
    keys.forEach((key, i) => {
      const max = (limits as any)[limitKeys[i]];
      const share = Math.floor((max / totalMax) * pool);
      newAttrs[key] = Math.max(1, share);
      used += newAttrs[key];
    });

    // Distribute remaining points up to each individual cap
    let remaining = pool - used;
    if (remaining > 0) {
      for(const key of keys) {
        if (remaining <= 0) break;
        const cur = newAttrs[key];
        const max = (limits as any)[limitKeys[keys.indexOf(key)]] as number;
        const canAdd = Math.min(remaining, max - cur);
        newAttrs[key] += canAdd;
        remaining -= canAdd;
      }
    }

    setAttrs(newAttrs);
  };

  const updateAttr = (key: keyof typeof attrs, val: string, limitKey: string) => {
    const num = parseInt(val) || 0;
    const maxAllowed = (limits as any)[limitKey] || 100;
    setAttrs(prev => ({ ...prev, [key]: Math.min(maxAllowed, Math.max(1, num)) }));
  };

  // Resource/State
  const [territory] = useState('');
  const [allegiance, setAllegiance] = useState('');
  const [stageSettings, setStageSettings] = useState('');

  const availableIdentities = useMemo(() => getAvailableIdentities(lineage), [lineage]);
  const availableUnitTypes = useMemo(() => getAvailableUnitTypes(lineage), [lineage]);
  const availableVehicles = useMemo(() => getAvailableVehicles(lineage, unitType), [lineage, unitType]);

  useEffect(() => {
    if (!availableIdentities.includes(socialIdentity) && availableIdentities.length > 0) {
      setSocialIdentity(availableIdentities[0]);
    }
  }, [availableIdentities, socialIdentity]);

  useEffect(() => {
    if (!availableUnitTypes.includes(unitType) && availableUnitTypes.length > 0) {
      setUnitType(availableUnitTypes[0]);
    }
  }, [availableUnitTypes, unitType]);

  useEffect(() => {
    console.log("Current page:", page);
    if (page === 9) {
      console.log("Reached page 9. renderPage9 should be called.");
    }
  }, [page]);

  const isCustomStage = selectedSetting === HistoricalPeriod.CUSTOM;

  const handleSubmit = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    // Only allow final submission on the last page to prevent accidental "jumps to end"
    if (page < 9) {
      console.log("Submit attempted before page 9. Current page:", page);
      setPage(page + 1);
      return;
    }
    if (!name.trim()) {
      alert("请输入角色名称后再继续。");
      return;
    }

    const unifiedCharacter: Character = {
      name,
      title,
      originWorld,
      gender,
      age: age || '未知',
      appearance: appearance || '伤痕累累的躯体',
      biography: biography || '第41个千年的无名棋子',
      socialIdentity,
      lineage,
      subFaction,
      alignment: `${baseAlignment} - ${alignment}`,
      personality,
      attributes: attrs, 
      faithLevel,
      corruptionValue,
      chaosBlessing,
      skills: skills.filter((s): s is Skill => s !== null),
      traits: [...baseTraits, ...traitsFromSkills].reduce((acc, curr) => {
        if (!acc.some(t => t.name === curr.name)) acc.push(curr);
        return acc;
      }, [] as TraitData[]),
      equipment: equipmentList.filter(e => e !== null).map(e => (e!.count && e!.count > 1) ? `${e!.name} (x${e!.count})` : e!.name),
      items: itemList.filter(i => i !== null).map(i => (i!.count && i!.count > 1) ? `${i!.name} (x${i!.count})` : i!.name),
      unitType,
      vehicleClass: vehicleClass || VehicleClass.NONE,
      prestige: (
        lineage.includes('星际战士') || 
        lineage.includes('审判庭') || 
        lineage.includes('禁军') ||
        lineage.includes('混沌恶魔')
      ) ? 50 : 10,
      allegiance,
      territory: territory || '虚空巡洋舰',
      experience: 0,
      hp: `${Math.max(1, Math.floor(finalAttrs.toughness / 5))}/${Math.max(1, Math.floor(finalAttrs.toughness / 5))}`,
      setting: selectedSetting,
      funds: (() => {
        const parts = [];
        if (budget.available.throne > 0) parts.push(`${budget.available.throne} 王座币`);
        if (budget.available.credits > 0) parts.push(`${budget.available.credits} 信用点`);
        if (budget.available.souls > 0) parts.push(`${budget.available.souls} 灵魂`);
        return parts.length > 0 ? parts.join(' / ') : '0';
      })(),
      provisions: (() => {
        const parts = [];
        if (budget.available.requisition > 0) parts.push(`${budget.available.requisition} 征用点`);
        if (budget.available.slaves > 0) parts.push(`${budget.available.slaves} 奴隶`);
        return parts.length > 0 ? parts.join(' / ') : '标配战区口粮';
      })(),
      forces: '个人随行亲卫 (标配)',
      popularity: '100% (初始)',
    };
    
    onComplete(unifiedCharacter, stageSettings);
  };

  const renderAttributesSummary = (isArmory = false, compact = false) => {
    return (
      <div className={`bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden backdrop-blur-xl ${compact ? 'p-4 md:p-5' : 'p-6 md:p-8'}`}>
        {/* Background Scanline Effect */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.03] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent opacity-30 pointer-events-none" />
        
        <div className="flex justify-between items-center mb-6 border-b border-zinc-900 pb-4 relative z-10">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-red-700" />
             <h5 className={`text-slate-100 uppercase font-black tracking-[0.2em] font-mono leading-none ${compact ? 'text-xs' : 'text-sm md:text-lg'}`}>
               {isArmory ? 'ARMORY_DIAG' : 'BIOMETRIC_SYNC'}
             </h5>
          </div>
          <Activity size={compact ? 14 : 18} className="text-red-700 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-6 relative z-10">
           <div className="flex items-center justify-between p-3 bg-zinc-900/40 border border-zinc-800/50">
              <div className="flex flex-col">
                <span className="text-[7px] text-zinc-600 font-mono tracking-widest uppercase">P_STATE_MONITOR</span>
                <span className={`text-[11px] font-black uppercase tracking-tight ${isPsykana ? 'text-purple-500' : 'text-zinc-400'}`}>
                  {psykanaDetails.label}
                </span>
              </div>
              <div className={`px-2 py-0.5 text-[10px] font-mono font-bold ${isPsykana ? 'bg-purple-900/30 text-purple-400' : 'bg-zinc-800 text-zinc-600'}`}>
                R: {psykanaDetails.rank}
              </div>
           </div>
        </div>

        <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3 md:grid-cols-1'} gap-x-6 gap-y-1 relative z-10`}>
          {[
            { label: 'WS', fullName: '武器技能', key: 'weaponSkill' },
            { label: 'BS', fullName: '射击技能', key: 'ballisticSkill' },
            { label: 'S', fullName: '力量', key: 'strength' },
            { label: 'T', fullName: '坚韧', key: 'toughness' },
            { label: 'AG', fullName: '敏捷', key: 'agility' },
            { label: 'INT', fullName: '智力', key: 'intelligence' },
            { label: 'PER', fullName: '感知', key: 'perception' },
            { label: 'WP', fullName: '意志', key: 'willpower' },
            { label: 'FEL', fullName: '社交', key: 'fellowship' },
          ].map(attr => {
            const mod = extraModifiers[attr.key as keyof typeof extraModifiers] || 0;
            const base = attrs[attr.key as keyof typeof attrs];
            const finalValue = finalAttrs[attr.key];
            
            return (
              <div key={attr.key} className={`flex items-center justify-between py-2 border-b border-zinc-900/50 group/row last:border-0`}>
                <div className="flex items-baseline gap-2">
                   <span className="text-[11px] font-black text-zinc-400 font-mono group-hover/row:text-red-500 transition-colors w-7 uppercase">{attr.label}</span>
                   {/* Full name hidden in compact or smaller view if needed */}
                   {!compact && <span className="text-[8px] text-zinc-700 font-mono hidden lg:inline">{attr.fullName}</span>}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-zinc-700 font-mono">{base}</span>
                      <span className={`text-[9px] font-mono font-bold w-6 text-right ${mod > 0 ? 'text-blue-600' : mod < 0 ? 'text-orange-600' : 'text-zinc-800'}`}>
                        {mod > 0 ? `+${mod}` : mod < 0 ? mod : '0'}
                      </span>
                    </div>
                  </div>
                  <div className={`text-lg md:text-xl font-mono font-black w-8 text-right drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-colors text-slate-200`}>
                    {finalValue}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`mt-8 pt-4 border-t border-zinc-900 relative z-10 flex gap-3 opacity-60 group hover:opacity-100 transition-opacity`}>
          <FileText size={18} className="text-zinc-700 group-hover:text-red-800 transition-colors" />
          <p className="text-[9px] text-zinc-600 font-mono leading-tight tracking-tight uppercase">
            {isArmory 
              ? "[LOG_BGC]: 护甲坚韧与防御加成已实时计入。某些重型载具或动力甲可能会极大地改变使用者的身体能力。"
              : "[LOG_BGC]: 灵能状态由天赋技能决定。部分特质可能会实时大幅修正属性表现。"
            }
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-800" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-800" />
      </div>
    );
  };


  const isAnyModalOpen = isSkillModalOpen || isArmoryModalOpen || isTraitSelectionModalOpen;

  const creationLexicon = useMemo(() => {
    return isChaos ? {
      header: "渎圣契约认证 [OATH_PROFANE]",
      statusText: "Status: Warp Link Stabilized // Encryption: Chaotic",
      phase9Label: "04 // 深渊裂痕参数注入 (WARP_REALM_INIT)",
      phase9Placeholder: "SACRIFICE_RECORDS: 刻画您开启毁灭远征时的恐怖境遇...",
      customStagePlaceholder: "VOID_INCURSION: 在此描绘您正在亵渎的网道或星球坐标...",
      confirmBtn: "协议生效 [PROTOCOL_EFFECTIVE]",
      terminalTop: "☠",
      terminalColor: "border-red-600 text-red-600 shadow-[0_0_20px_rgba(255,0,0,0.4)]",
      navBtn: "下一步 [CHAOS_NAV]",
      navBtnText: "Corrupt Data",
      finalBtn: "确认 [IGNITE_CHAOS]",
      finalBtnText: "Black Rite"
    } : {
      header: "身份补完协议 [OATH_COMPLETION]",
      statusText: "Status: Data Uplink Active // Encryption: High",
      phase9Label: "04 // 战场初始参数输入 (BATTLEFIELD_INIT)",
      phase9Placeholder: "DESCRIBE_CONTEXT: 设定您在战役开局时的具体境遇...",
      customStagePlaceholder: "INPUT_REQUIRED: 在此详细勾勒您的自定义网道/星球战线...",
      confirmBtn: "协议生效 [PROTOCOL_EFFECTIVE]",
      terminalTop: "I",
      terminalColor: "border-imperial-red text-imperial-red shadow-[0_0_20px_rgba(139,0,0,0.4)]",
      navBtn: "下一步 [NAV]",
      navBtnText: "Commit Data",
      finalBtn: "确认 [CONFIRM]",
      finalBtnText: "Final Rite"
    };
  }, [isChaos]);

  const renderPage1 = () => (

    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-10 max-w-[1300px] mx-auto"
    >
      <div className="text-center mb-6 sm:mb-12 border-b border-zinc-800/50 pb-4 sm:pb-8">
        <h3 className="text-zinc-200 text-lg sm:text-xl md:text-3xl font-mono mb-2 sm:mb-4 tracking-widest uppercase">决定你的立场</h3>
        <p className="text-zinc-500 text-xs sm:text-sm font-mono uppercase tracking-widest">Acknowledge Your Allegiance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imperium Card */}
        <div 
          onClick={() => {
            setBaseAlignment('帝国 (Imperium)');
            setLineage(IMPERIUM_FACTIONS[0]);
          }}
          className={`cursor-pointer border transition-all relative overflow-hidden group flex flex-col h-full bg-[#0a0a0a] ${
            baseAlignment.includes('帝国') 
              ? 'border-yellow-600/50 shadow-[0_0_30px_rgba(202,138,4,0.15)] ring-1 ring-yellow-600/20' 
              : 'border-zinc-800/50 hover:border-zinc-600'
          }`}
        >
          <div className={`absolute inset-x-0 top-0 h-px transition-opacity ${baseAlignment.includes('帝国') ? 'bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent opacity-100' : 'opacity-0'}`}></div>
          <div className={`absolute inset-0 bg-yellow-900/5 transition-opacity ${baseAlignment.includes('帝国') ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className="relative z-10 flex flex-col p-4 sm:p-6 md:px-6 md:py-10 text-center h-full">
            <h4 className="text-lg sm:text-2xl font-mono font-bold text-zinc-100 mb-3 sm:mb-6 tracking-[0.2em] uppercase">人类帝国</h4>
            <div className="min-h-[2.5rem] flex items-center justify-center mb-4 sm:mb-8 border-y border-zinc-800/50 py-3 sm:py-6">
              <p className="text-xs sm:text-sm text-zinc-400 font-serif italic tracking-wider sm:tracking-widest leading-relaxed sm:leading-loose md:whitespace-nowrap">"星辰之间只有无尽的战争，唯有帝皇护佑着我们。"</p>
            </div>
            <div className="mt-auto text-xs text-zinc-500 text-left space-y-4 w-full">
              <div className="flex items-start gap-4">
                <span className="font-mono text-zinc-700 select-none">01</span>
                <div>
                  <span className="block text-zinc-300 font-bold mb-1">包含编制</span>
                  <span>星际战士、星界军、审判庭、修女会等</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-mono text-zinc-700 select-none">02</span>
                <div>
                  <span className="block text-zinc-300 font-bold mb-1">战略特色</span>
                  <span>绝对的忠诚、极权统治、残酷的异端清洗、神圣的牺牲</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chaos Card */}
        <div 
          onClick={() => {
            setBaseAlignment('混沌 (Chaos)');
            setLineage(CHAOS_FACTIONS[0]);
          }}
          className={`cursor-pointer border transition-all relative overflow-hidden group flex flex-col h-full bg-[#0a0a0a] ${
            baseAlignment.includes('混沌') 
              ? 'border-purple-600/50 shadow-[0_0_30px_rgba(147,73,222,0.15)] ring-1 ring-purple-600/20' 
              : 'border-zinc-800/50 hover:border-zinc-600'
          }`}
        >
          <div className={`absolute inset-x-0 top-0 h-px transition-opacity ${baseAlignment.includes('混沌') ? 'bg-gradient-to-r from-transparent via-purple-600/50 to-transparent opacity-100' : 'opacity-0'}`}></div>
          <div className={`absolute inset-0 bg-purple-900/5 transition-opacity ${baseAlignment.includes('混沌') ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className="relative z-10 flex flex-col p-4 sm:p-6 md:px-6 md:py-10 text-center h-full">
            <h4 className="text-lg sm:text-2xl font-mono font-bold text-zinc-100 mb-3 sm:mb-6 tracking-[0.2em] uppercase">混沌诸神</h4>
            <div className="min-h-[2.5rem] flex items-center justify-center mb-4 sm:mb-8 border-y border-zinc-800/50 py-3 sm:py-6">
              <p className="text-xs sm:text-sm text-zinc-400 font-serif italic tracking-wider sm:tracking-widest leading-relaxed sm:leading-loose md:whitespace-nowrap">"银河将要燃烧，伪帝必将陨落。"</p>
            </div>
            <div className="mt-auto text-xs text-zinc-500 text-left space-y-4 w-full">
              <div className="flex items-start gap-4">
                <span className="font-mono text-zinc-700 select-none">01</span>
                <div>
                  <span className="block text-zinc-300 font-bold mb-1">{isChaos ? '吞噬世界' : '包含编制'}</span>
                  <span>混沌星际战士、异教徒、混沌恶魔等</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-mono text-zinc-700 select-none">02</span>
                <div>
                  <span className="block text-zinc-300 font-bold mb-1">战略特色</span>
                  <span>亚空间赐福、无尽突变、对毁灭的狂热、鲜血与诅咒</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPage2 = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
        <div className="h-px bg-zinc-800 flex-1" />
        <div className="flex flex-col items-center px-4 py-2 sm:px-6 sm:py-4 border-l-2 border-r-2 border-red-900 bg-red-950/10 relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-600" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-600" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-600" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-600" />
          
          <h3 className="text-slate-100 text-lg sm:text-xl md:text-3xl font-mono font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">势力隶属</h3>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-[10px] text-zinc-500 font-mono tracking-widest">[STATUS: PENDING AFFILIATION]</span>
             <Activity size={12} className="text-red-700 animate-pulse" />
          </div>
        </div>
        <div className="h-px bg-zinc-800 flex-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {(baseAlignment.includes('帝国') ? IMPERIUM_FACTIONS : CHAOS_FACTIONS).map((l, idx) => {
          const isSelected = lineage === l;
          const factionName = l.split(' (')[0];
          const subText = l.includes('(') ? l.substring(l.indexOf('(')).replace(/\(|\)/g, '') : 'AUTHORIZED_ENTITY';
          
          return (
            <motion.div 
              key={l}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setLineage(l)}
              className={`group cursor-pointer relative p-0.5 transition-all ${
                isSelected ? 'scale-[1.02] z-10' : 'hover:scale-[1.01]'
              }`}
            >
              <div className={`p-3 md:p-5 border flex flex-col h-full transition-all relative overflow-hidden backdrop-blur-sm ${
                isSelected 
                  ? 'bg-red-950/30 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.2)] ring-1 ring-red-600/50' 
                  : 'bg-zinc-950/60 border-zinc-900 hover:bg-zinc-900/40 hover:border-zinc-700'
              }`}>
                {/* Decorative Pattern Background */}
                <div className={`absolute inset-0 transition-opacity pointer-events-none select-none ${isSelected ? 'opacity-[0.08]' : 'opacity-[0.03]'}`}>
                   {baseAlignment.includes('帝国') ? <Shield size={100} className="absolute -right-6 -bottom-6" /> : <Skull size={100} className="absolute -right-6 -bottom-6" />}
                </div>

                <div className="flex justify-between items-start mb-3 sm:mb-6 relative z-10">
                  <div className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 border ${
                    isSelected ? 'border-red-600 bg-red-600 text-white' : 'border-zinc-800 text-zinc-600 group-hover:border-zinc-700'
                  }`}>
                    IDENT: {idx.toString().padStart(3, '0')}
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-1 h-3 transition-colors ${isSelected ? 'bg-red-600' : 'bg-zinc-800'} ${i === 3 && isSelected ? 'animate-pulse' : ''}`} />
                    ))}
                  </div>
                </div>

                <h4 className={`text-base md:text-lg font-mono font-black uppercase tracking-tight mb-1 transition-colors relative z-10 ${
                  isSelected ? 'text-slate-100' : 'text-zinc-500 group-hover:text-slate-200'
                }`}>
                  {factionName}
                </h4>

                <div className={`text-[10px] font-mono font-bold tracking-widest uppercase transition-colors relative z-10 ${
                  isSelected ? 'text-red-500' : 'text-zinc-700'
                }`}>
                  {subText === 'AUTHORIZED_ENTITY' && isChaos ? 'VOID_ENTITY' : subText}
                </div>

                {/* Scanned Footer Decor */}
                <div className="mt-4 flex items-center justify-between opacity-30 group-hover:opacity-60 transition-opacity relative z-10">
                   <div className="flex gap-2">
                     <Cpu size={14} className={isSelected ? 'text-red-500' : 'text-zinc-600'} />
                     <div className="text-[8px] font-mono text-zinc-500 leading-none flex flex-col justify-center">
                        <span>DATA_LINK: ESTABLISHED</span>
                        <span>LATENCY: 0.04ms</span>
                     </div>
                   </div>
                   {isSelected && <div className="text-[10px] font-black text-red-600 animate-pulse">SELECTED</div>}
                </div>

                {/* Grid Overlay for more technical look */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.02] pointer-events-none" />

                {/* Corner Accents for Selected State */}
                {isSelected && (
                  <>
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-red-500" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-red-500" />
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="p-4 bg-zinc-950 border border-zinc-900 border-l-4 border-l-red-900 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 to-transparent pointer-events-none transition-opacity group-hover:opacity-100 opacity-60" />
        <div className="absolute top-0 right-0 p-2 opacity-5">
           <FileText size={40} className="text-zinc-500" />
        </div>
        <p className="text-[10px] md:text-xs text-zinc-500 font-mono leading-relaxed relative z-10">
          <span className="text-red-900 font-black mr-2 uppercase">[{isChaos ? 'WHISPERS_OF_WARP' : 'DECREE'}]</span>
          {isChaos 
            ? '投身于混沌诸神，亚空间将承认您的灵魂。您的过去已然崩塌，唯有通过不断献祭与杀戮，方能在永恒的诅咒中博得邪神的目光。只有死亡能终结职责。'
            : '隶属派系将决定您的初始战备资源限制、社交特质树以及后续的剧情展开方向。一旦确认，个人身份标识码将不可追回地刻录入该领域的远征登记中。只有死亡能终结职责。'}
        </p>
      </div>
    </motion.div>
  );

  const renderPage3 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Personal Data Header */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-0">
           <div className="p-4 sm:p-6 md:p-8 bg-zinc-900/60 border border-zinc-800 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Shield size={120} />
              </div>
              <h3 className="text-lg sm:text-xl font-mono text-slate-100 font-black uppercase tracking-[0.2em] mb-4 sm:mb-6 border-b border-zinc-800 pb-2 relative z-10 flex justify-between items-center">
                 <span>{isChaos ? '亚空间印记' : '身份辨识'}</span>
                 <Activity size={16} className="text-red-700 animate-pulse" />
               </h3>
              
              <div className="space-y-6">
                 <div>
                    <label className="block text-[10px] text-zinc-500 uppercase font-black mb-2 tracking-tighter">{isChaos ? '渎圣真名/头衔' : '真名/头衔'} (NAME/TITLE)</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800  px-4 py-3 text-slate-100 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-slate-800 text-sm"
                      placeholder="例如: 卡尔加 / 阿巴顿"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                 </div>

                 <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] text-zinc-500 uppercase font-black mb-2 tracking-tighter">{isChaos ? '恐怖绰号' : '别名/称号'} (ALIAS)</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800  px-4 py-2 text-slate-100 placeholder:text-slate-800 text-sm"
                        placeholder="例如: 掠夺者 / 破天者"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500 uppercase font-black mb-2 tracking-tighter">{isChaos ? '诞生之地/绝罚星系' : '母星/出生地'} (HOMEWORLD)</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800  px-4 py-2 text-slate-100 placeholder:text-slate-800 text-sm"
                        placeholder="例如: 马库拉格 / 卡迪亚"
                        value={originWorld}
                        onChange={(e) => setOriginWorld(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500 uppercase font-black mb-2 tracking-tighter">性别 (GENDER)</label>
                      <div className="flex gap-2 p-1 bg-slate-950 border border-slate-800">
                         {['男性', '女性', '不适用'].map(g => (
                           <button type="button"
                             key={g}
                             onClick={() => setGender(g)}
                             className={`flex-1 py-1.5 text-xs font-bold transition-all ${gender === g ? 'bg-red-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 border border-transparent hover:border-zinc-800'}`}
                           >
                             {g === '男性' ? '男性' : g === '女性' ? '女性' : '不适用'}
                           </button>
                         ))}
                      </div>
                    </div>
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col items-center justify-center text-center">
                 <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-[0.2em] mb-2 px-2 py-0.5 bg-zinc-950">{isChaos ? 'Soul-Binding: Engaged' : 'Bio-Metric Lock: Active'}</p>
                 <div className="flex gap-1">
                    {Array.from({length: 8}).map((_, i) => (
                      <div key={i} className="w-1 h-3 bg-red-900/40" />
                    ))}
                 </div>
              </div>
           </div>

           <div className={`p-6 border shadow-lg text-xs leading-relaxed ${isChaos ? 'border-red-900/30 bg-red-950/10 text-red-500/60' : 'border-blue-900/30 bg-blue-950/10 text-slate-400'}`}>
              <p>● <strong>{isChaos ? '亵渎命名：' : '命名规范：'}</strong> {isChaos ? '您可以将亵渎之名与恐怖头衔结合，这会决定亚空间与物质界的存在如何称呼您。' : '您可以将姓名与正式头衔结合，这会决定世界观NPC对您的首次称呼。'}</p>
              <p className="mt-2">● <strong>{isChaos ? '绝罚溯源：' : '母星背景：'}</strong> {isChaos ? '您曾效忠的过去已化为灰烬，但那段疯狂的开端仍将作为梦魇影响后续的因果反馈。' : '出生环境将影响故事中关于过去的回忆片段。'}</p>
           </div>
        </div>

        {/* Right Side: Selection Grids */}
        <div className="lg:col-span-8 space-y-12">
          {/* Chapter/Sub-faction Section */}
          {(SUB_FACTION_CONFIG[lineage] || []).length > 1 && (
            <div>
              <div className="flex justify-between items-end mb-6 border-b border-zinc-800 pb-2">
                <h4 className="text-slate-300 text-sm font-bold flex items-center gap-2 uppercase tracking-[0.2em]">
                   <Shield size={16} className={isChaos ? 'text-red-600 animate-pulse' : 'text-blue-500'} /> {['星际战士' , '星界军', '战斗修女会', '刺客庭', '混沌星际战士', '风暴忠嗣军'].includes(lineage) 
                    ? (isChaos ? '战邦/教派/阴谋团 (WARBAND/COVENANT)' : '战团/团/教派/神庙 (CHAPTER/REGIMENT)')
                    : (isChaos ? '异变宗支 (PATH OF RUIN)' : '特殊分支 (SUB-FACTION)')}
                </h4>
                <div className="text-[10px] text-zinc-600 font-mono italic">SELECT ORIGIN LINEAGE</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(SUB_FACTION_CONFIG[lineage] || []).map((sf, idx) => {
                  const isSelected = subFaction === sf;
                  return (
                    <button type="button"
                      key={sf}
                      onClick={() => setSubFaction(sf)}
                      className={`group relative p-0.5 transition-all ${
                        isSelected ? 'scale-[1.02] z-10' : 'hover:scale-[1.01]'
                      }`}
                    >
                      <div className={`px-4 py-3 border transition-all relative overflow-hidden backdrop-blur-sm min-h-[64px] flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-red-950/30 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.15)] ring-1 ring-red-600/30'
                          : 'bg-zinc-950/60 border-zinc-900 hover:bg-zinc-900/40 hover:border-zinc-700'
                      }`}>
                         {/* Background detail */}
                         <div className={`absolute top-0 right-0 w-6 h-6 border-t border-r transition-colors ${isSelected ? 'border-red-600' : 'border-zinc-800 opacity-20'}`} />
                         
                         <div className={`text-[7px] font-mono mb-1 transition-colors ${isSelected ? 'text-red-500' : 'text-zinc-700'}`}>
                           {isChaos ? 'WARP' : 'LN'}_REF: {idx.toString().padStart(3, '0')}
                         </div>
                         
                         <span className={`text-[11px] font-mono font-black uppercase tracking-tighter text-center transition-colors leading-[1.1] ${
                           isSelected ? 'text-slate-100' : 'text-zinc-500 group-hover:text-slate-300'
                         }`}>
                           {sf}
                         </span>
                         
                         {/* Scanlines / Grid overlay */}
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.02] pointer-events-none" />
                         
                         {isSelected && (
                           <div className="absolute bottom-0 right-0 p-1">
                             <div className="w-1.5 h-1.5 bg-red-600 rounded-sm animate-pulse" />
                           </div>
                         )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chaos Blessing Selection - Only for high-tier chaos or undivided */}
          {chaosSelectionActive && (
            <div>
              <div className="flex justify-between items-end mb-6 border-b border-zinc-800 pb-2">
                <h4 className="text-red-500 text-sm font-bold flex items-center gap-2 uppercase tracking-[0.2em]">
                   <Activity size={16} className="text-red-600 animate-pulse" /> 诸神契约 (DEATHLESS_OATH)
                </h4>
                <div className="text-[10px] text-zinc-600 font-mono italic">CHOOSE YOUR CHAOS BLESSING</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: '嗜血狂徒', god: '恐虐', desc: '近战攻击的伤害+4。每杀死1个生灵，移动力+2，持续直至战斗结束' },
                  { name: '欢愉之躯', god: '色孽', desc: '敏捷(Ag)+15，且受到的任何减速、定身、麻痹效果持续时间减半' },
                  { name: '奇想妙思', god: '奸奇', desc: '智力(Int)+20，获得「禁忌知识·恶魔学」技能' },
                  { name: '肉体再生', god: '纳垢', desc: '坚韧(T)+10。获得「再生·初级」特质' },
                  { name: '混沌眷顾', god: '无分', desc: '感知(Per)+10，意志(WP)+10。承受致命伤后仍剩1点耐久值' },
                  { name: '混沌印记', god: '无分', desc: '力量+5, 坚韧+5, 敏捷+5, 智力+5。免疫魅惑效果' },
                ].map((cb) => {
                  const isSelected = chaosBlessing === cb.name;
                  return (
                    <button type="button"
                      key={cb.name}
                      onClick={() => setChaosBlessing(cb.name)}
                      className={`group relative p-0.5 transition-all text-left ${
                        isSelected ? 'scale-[1.01]' : 'hover:bg-zinc-900/10'
                      }`}
                    >
                       <div className={`p-4 border transition-all relative overflow-hidden backdrop-blur-sm h-full ${
                         isSelected 
                           ? 'bg-red-950/20 border-red-600 ring-1 ring-red-600/30 shadow-[0_0_20px_rgba(220,38,38,0.1)]' 
                           : 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-700'
                       }`}>
                          <div className="flex justify-between items-start mb-2">
                             <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-red-500' : 'text-zinc-600'}`}>
                               GIFT: {cb.god}
                             </span>
                             {isSelected && <Check size={12} className="text-red-500" />}
                          </div>
                          <h5 className={`text-sm font-black uppercase tracking-tight mb-2 ${isSelected ? 'text-slate-100' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
                            {cb.name}
                          </h5>
                          <p className={`text-[10px] leading-relaxed font-mono ${isSelected ? 'text-zinc-400' : 'text-zinc-700 group-hover:text-zinc-500'}`}>
                            {cb.desc}
                          </p>
                       </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between items-end mb-6 border-b border-zinc-800 pb-2">
              <h4 className="text-slate-300 text-sm font-bold flex items-center gap-2 uppercase tracking-[0.2em]">
                 <Skull size={16} className="text-red-500" /> {isChaos ? '契约地位 (COVENANT STATUS)' : '出身阶层 (SOCIAL BACKGROUND)'}
              </h4>
              <div className="text-[10px] text-zinc-600 font-mono italic">ALLOCATE STARTING STATUS</div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              {availableIdentities.map((si, idx) => {
                const isActive = socialIdentity === si;
                const bonus = IDENTITY_SKILL_POINTS[si] || 0;
                return (
                  <button type="button"
                    key={si}
                    onClick={() => setSocialIdentity(si)}
                    className={`group relative p-0.5 transition-all ${
                      isActive ? 'scale-[1.02] z-10' : 'hover:scale-[1.01]'
                    }`}
                  >
                    <div className={`p-2 sm:p-4 border flex flex-col gap-2 sm:gap-4 transition-all relative overflow-hidden h-full min-h-[80px] sm:min-h-[120px] backdrop-blur-sm ${
                      isActive
                        ? 'bg-red-950/20 border-red-700 shadow-[0_0_25px_rgba(220,38,38,0.1)] ring-1 ring-red-600/30'
                        : 'border-zinc-900 bg-zinc-950/60 hover:border-zinc-800'
                    }`}>
                       <div className="flex justify-between items-start">
                         <div className={`px-1.5 py-0.5 border text-[7px] font-black uppercase tracking-widest ${isActive ? 'border-red-600 bg-red-600 text-white' : 'border-zinc-800 text-zinc-600'}`}>
                            {isChaos ? 'WARP' : 'BGC'}_{idx.toString().padStart(2, '0')}
                         </div>
                         <div className={`w-1 h-3 transition-colors ${isActive ? 'bg-red-600' : 'bg-zinc-800'}`} />
                       </div>
                       
                       <div className={`text-sm font-mono font-black leading-tight uppercase transition-colors ${isActive ? 'text-slate-100' : 'text-zinc-500 group-hover:text-slate-300'}`}>
                         {si.split(' (')[0]}
                       </div>
                       
                       <div className={`mt-auto text-[8px] font-mono px-2 py-1.5 flex items-center justify-between border ${isActive ? 'bg-red-900/40 border-red-800 text-white' : 'bg-black/40 border-zinc-900 text-zinc-600'}`}>
                          <span className="opacity-60 uppercase">Skill_Pts:</span>
                          <span className={`${isActive ? 'text-red-400' : 'text-zinc-400'} font-bold`}>+{bonus}</span>
                       </div>
                       
                       {/* Grid overlay */}
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.02] pointer-events-none" />
                       
                       {isActive && (
                         <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500" />
                       )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );

  const renderPage4 = () => {
    const isChaos = baseAlignment.includes('混沌');
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-10"
      >
        <div className="text-center mb-6 sm:mb-12 border-b border-zinc-800/50 pb-4 sm:pb-8">
          <h3 className="text-zinc-200 text-lg sm:text-xl md:text-3xl font-mono mb-2 sm:mb-4 tracking-widest uppercase">{isChaos ? '腐化轨迹' : '背景溯源'}</h3>
          <p className="text-zinc-500 text-xs sm:text-sm font-mono uppercase tracking-widest">{isChaos ? 'Corruption Record & Profane Profile' : 'Biographical Record & Psychological Profile'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-0">
             <div className="p-4 sm:p-6 md:p-8 bg-zinc-900/80 border border-zinc-800 shadow-2xl backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <FileText size={120} />
                </div>
                
                <h3 className="text-lg sm:text-xl md:text-2xl font-mono text-slate-100 font-black uppercase tracking-[0.2em] mb-4">身份档案</h3>
                <div className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-6 border-b border-zinc-800 pb-2 w-full">Identification File</div>
                
                <div className="w-full space-y-4 mb-6 text-left">
                  <div className="flex flex-col gap-1 border-b border-zinc-800/50 pb-3">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">阵营隶属</span>
                    <span className="text-sm text-zinc-300 font-mono">{lineage}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-zinc-800/50 pb-3">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">职阶梯队</span>
                    <span className="text-sm text-zinc-300 font-mono">{socialIdentity}</span>
                  </div>
                </div>

                <div className="p-3 bg-black/40 border border-zinc-800 rounded text-[9px] text-zinc-500 leading-relaxed text-left flex gap-3 w-full">
                  <span className={`${isChaos ? 'text-purple-500' : 'text-blue-500'} text-lg`}>■</span>
                  <span>输入的数据将被严密存档。保持档案的精确性，这关乎你在接下来的战役中面临的对抗计算。</span>
                </div>
             </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/40 border border-zinc-800 p-6 flex flex-col space-y-3 relative group focus-within:border-zinc-600 focus-within:bg-zinc-900/60 transition-colors">
                <label className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">{isChaos ? "异端教义 (Dogma)" : "志向教义 (Dogma)"}</label>
                <input
                  type="text"
                  value={alignment}
                  onChange={(e) => setAlignment(e.target.value)}
                  className="bg-transparent border-none text-sm text-zinc-300 font-mono placeholder:text-zinc-700 focus:outline-none focus:ring-0 px-0"
                  placeholder={isChaos ? "[ 输入对暗黑诸神的祈礼 ]" : "[ 输入效忠的信条 ]"}
                />
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${isChaos ? 'from-purple-600' : 'from-blue-600'} to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left`}></div>
              </div>
              
              <div className="bg-zinc-900/40 border border-zinc-800 p-6 flex flex-col space-y-3 relative group focus-within:border-zinc-600 focus-within:bg-zinc-900/60 transition-colors">
                <label className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">战团/编制 (Organization)</label>
                <input
                  type="text"
                  value={allegiance}
                  onChange={(e) => setAllegiance(e.target.value)}
                  className="bg-transparent border-none text-sm text-zinc-300 font-mono placeholder:text-zinc-700 focus:outline-none focus:ring-0 px-0"
                  placeholder={isChaos ? "例: 黑色军团 / 千子" : "例: 极限战士 / 卡迪亚第8团"}
                />
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${isChaos ? 'from-purple-600' : 'from-blue-600'} to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left`}></div>
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-6 flex flex-col space-y-3 relative group focus-within:border-zinc-600 focus-within:bg-zinc-900/60 transition-colors">
              <label className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">性格与倾向 (Psychological Profile)</label>
              <input
                type="text"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                className="bg-transparent border-none text-sm text-zinc-300 font-mono placeholder:text-zinc-700 focus:outline-none focus:ring-0 px-0"
                placeholder="冷酷无情、狂热虔诚、谨慎多疑、偏执狂..."
              />
              <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${isChaos ? 'from-purple-600' : 'from-blue-600'} to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left`}></div>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-6 flex flex-col space-y-3 relative group focus-within:border-zinc-600 focus-within:bg-zinc-900/60 transition-colors">
              <label className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">{isChaos ? "异端档案 (Heresy Record)" : "服役档案 (Service Record)"}</label>
              <textarea
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="bg-transparent border-none text-sm text-zinc-300 leading-relaxed placeholder:text-zinc-700 focus:outline-none focus:ring-0 px-0 min-h-[120px] resize-none"
                placeholder={isChaos ? "简述您的堕落史、异端行径与向诸神的献祭记录..." : "简述您的过往光荣服役记录、参与的战役与立下的赫赫战功..."}
              />
              <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${isChaos ? 'from-purple-600' : 'from-blue-600'} to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left`}></div>
            </div>
            
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 flex flex-col space-y-3 relative group focus-within:border-zinc-600 focus-within:bg-zinc-900/60 transition-colors">
              <label className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">生理表征 (Physical Traits)</label>
              <textarea
                value={appearance}
                onChange={(e) => setAppearance(e.target.value)}
                className="bg-transparent border-none text-sm text-zinc-300 leading-relaxed placeholder:text-zinc-700 focus:outline-none focus:ring-0 px-0 min-h-[80px] resize-none"
                placeholder={isChaos ? "满口尖锐的牙齿，周身环绕着亚空间的气息..." : "额头有道骇人的伤疤，满身都是战斗留下的勋章和伤痕..."}
              />
              <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${isChaos ? 'from-purple-600' : 'from-blue-600'} to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left`}></div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderPage5 = () => {
    const isChaos = baseAlignment.includes('混沌');
    const autoAllocateLabel = isChaos ? "亚空间神启引导分配" : "沉思者引导分配";
    const autoAllocateIcon = isChaos ? "✨" : "⚙️";

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Management & Feedback */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-0">
             <div className="p-4 sm:p-6 md:p-8 bg-zinc-900/80 border border-zinc-800 shadow-2xl backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Activity size={120} />
                </div>
                
                <h3 className="text-lg sm:text-xl md:text-2xl font-mono text-slate-100 font-black uppercase tracking-[0.2em] mb-4">{isChaos ? '邪神赐福 / 扭曲指数' : '生理 / 心智 指数'}</h3>
                <div className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-6 border-b border-zinc-800 pb-2 w-full">{isChaos ? 'Profane Gift Matrix Analysis' : 'Attribute Matrix Analysis'}</div>
                
                <div className="space-y-1 mb-8">
                   <div className={`text-4xl md:text-6xl font-mono font-black transition-colors ${(currentPoolUsed as number) > ((limits as any).pool as number) ? 'text-orange-500 animate-pulse' : 'text-red-500'}`}>
                      {currentPoolUsed} <span className="text-2xl text-zinc-700">/ {(limits as any).pool}</span>
                   </div>
                   <div className="text-[10px] text-zinc-500 uppercase font-black tracking-tighter">已消耗资源 / 能力总阈值</div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                   <button
                     type="button"
                     onClick={autoAllocate}
                     className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-zinc-950 border-2 border-zinc-800 hover:border-red-600 hover:bg-red-900/10 text-slate-300 hover:text-white transition-all group shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
                   >
                     <span className="text-xl group-hover:rotate-180 transition-transform duration-500">{autoAllocateIcon}</span>
                     <span className="text-xs font-black uppercase tracking-[0.2em]">{autoAllocateLabel}</span>
                   </button>
                   <div className="p-4 bg-black/40 border border-zinc-800 rounded text-[10px] text-zinc-500 leading-relaxed text-left flex gap-3">
                      <span className="text-red-500 text-lg">■</span>
                      <span>属性基准分严苛受限于出身派系。严禁跨越基因锁上限。</span>
                   </div>
                </div>
             </div>

             <div className="p-6 border border-zinc-800 bg-zinc-900/40 text-xs text-zinc-500 space-y-4">
                <h5 className="text-zinc-400 font-black uppercase tracking-[0.2em] border-b border-zinc-800 pb-2 mb-3">{isChaos ? '堕落准则' : '分配准则'}</h5>
                <p>● <strong>WS/BS：</strong> 核心战斗指标，直接影响交互结算难度。</p>
                <p>● <strong>S/T/Ag：</strong> 身体机能，关乎生存率与机动能力。</p>
                <p>● <strong>Int/Per/WP/Fel：</strong> 精神与感官，决定了在非直接冲突中的统治力。</p>
             </div>
          </div>

          {/* Right Column: Interactive Grids */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
              {[
                { label: '武器技能 (WS)', key: 'weaponSkill' as const, limitKey: 'WS' },
                { label: '射击技能 (BS)', key: 'ballisticSkill' as const, limitKey: 'BS' },
                { label: '力量 (S)', key: 'strength' as const, limitKey: 'S' },
                { label: '坚韧 (T)', key: 'toughness' as const, limitKey: 'T' },
                { label: '敏捷 (Ag)', key: 'agility' as const, limitKey: 'Ag' },
                { label: '智力 (Int)', key: 'intelligence' as const, limitKey: 'Int' },
                { label: '感知 (Per)', key: 'perception' as const, limitKey: 'Per' },
                { label: '意志 (WP)', key: 'willpower' as const, limitKey: 'WP' },
                { label: '社交 (Fel)', key: 'fellowship' as const, limitKey: 'Fel' },
              ].map((attr) => {
                const maxAllowed = (limits as any)[attr.limitKey] || 100;
                const key = attr.key;
                const val = attrs[key] || 0;
                const mod = extraModifiers[key] || 0;
                const currentTotal = finalAttrs[key];

                return (
                  <div key={attr.key} className="p-2 sm:p-4 bg-zinc-950 border-2 border-zinc-900 hover:border-zinc-800 transition-all flex flex-col group relative">
                    <div className="flex justify-between items-start mb-2 sm:mb-4">
                      <div>
                        <div className="text-[9px] text-zinc-600 uppercase font-black tracking-tighter mb-0.5">
                          {attr.label.split(' (')[0]}
                        </div>
                        <div className="text-[12px] sm:text-[14px] text-slate-100 font-mono font-black uppercase tracking-tight">{attr.limitKey}<span className="text-[8px] opacity-20 ml-1.5">{isChaos ? 'WARP_VAL' : 'INDEX'}</span></div>
                      </div>
                      <div className="flex flex-col items-end">
                         <div className="text-[8px] text-zinc-500 font-mono font-bold">MAX THLD</div>
                         <div className="text-xs sm:text-sm font-mono text-zinc-300 font-black">{maxAllowed}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1 mb-2 sm:mb-4">
                      <div className="bg-zinc-900/50 p-1 sm:p-2 text-center border border-zinc-900">
                        <div className="text-[8px] text-zinc-600 block mb-1 uppercase font-bold">Base</div>
                        <div className="text-xl font-mono font-black text-slate-300">{val}</div>
                      </div>
                      <div className="bg-zinc-900/50 p-1 sm:p-2 text-center border border-zinc-900">
                        <div className="text-[8px] text-zinc-600 block mb-1 uppercase font-bold">Mod</div>
                        <div className={`text-xl font-mono font-black ${mod > 0 ? 'text-blue-500' : mod < 0 ? 'text-orange-500' : 'text-zinc-800'}`}>
                          {mod >= 0 ? '+' : ''}{mod}
                        </div>
                      </div>
                      <div className="bg-zinc-900 p-1 sm:p-2 text-center border-2 border-zinc-800 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                        <div className="text-[8px] text-zinc-500 block mb-1 uppercase font-bold">Net</div>
                        <div className="text-2xl font-mono font-black text-red-600">{currentTotal}</div>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button type="button"
                        onClick={() => updateAttr(key, (val - 1).toString(), attr.limitKey)}
                        className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-800 text-slate-400 font-mono font-black text-lg transition-all active:scale-95"
                      >
                        -
                      </button>
                      <button type="button"
                        onClick={() => updateAttr(key, (val + 1).toString(), attr.limitKey)}
                        className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-800 text-slate-400 font-mono font-black text-lg transition-all active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
                        disabled={val >= (maxAllowed as number) || (currentPoolUsed as number) >= ((limits as any).pool as number)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderPage6 = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        className="space-y-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Left Column: Management & Feedback */}
          <div className="md:col-span-3 flex flex-col gap-6 lg:sticky lg:top-0">
             <div className="p-4 sm:p-6 md:p-8 border-2 border-zinc-900 bg-black shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-900 opacity-50" />
                <div className="text-zinc-600 text-[10px] uppercase font-black tracking-[0.3em] mb-8 border-b border-zinc-900 pb-4 w-full text-center relative z-10">{isChaos ? 'WARP_ENERGY_POOL' : 'ALLOCATION_RESOURCES'}</div>
                
                <div className="flex flex-col items-center mb-10 w-full relative z-10">
                   <div className="flex items-baseline gap-2">
                      <span className={`text-6xl font-mono font-black transition-all duration-500 ${skillPoints === 0 ? 'text-zinc-800' : 'text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]'}`}>
                         {skillPoints}
                      </span>
                      <span className="text-2xl text-zinc-800 font-mono">/ {6 + (IDENTITY_SKILL_POINTS[socialIdentity] || 0)}</span>
                   </div>
                   <div className="text-[11px] text-zinc-500 font-mono mt-3 tracking-widest uppercase font-bold">Cap_Remaining</div>
                </div>

                <div className="p-4 bg-red-950/20 border border-red-900/50 text-[10px] text-red-500/80 leading-relaxed text-left flex gap-4 w-full relative z-10 italic">
                  <div className="w-1.5 h-auto bg-red-900 flex-none" />
                  <span>[{isChaos ? 'WARP_PROTOCOL' : 'SEC_PROTOCOL'}]: {isChaos ? '诸神注视着你的成长，莫要辜负这亵渎的恩宠。' : '技能精进需消耗分配额。'}</span>
                </div>
             </div>

             <div className="relative group p-1 bg-zinc-900/20 border border-zinc-900/50">
               {renderAttributesSummary(false, true)}
               <div className="absolute -top-2 -right-2 flex gap-1">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-ping opacity-40" />
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
               </div>
             </div>
             
             <div className="p-5 border border-zinc-800 bg-zinc-950/80 text-[11px] text-zinc-400 space-y-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 to-transparent pointer-events-none" />
                <h5 className="text-red-900 font-black uppercase tracking-[0.2em] flex items-center gap-3 mb-2 relative z-10">
                  {isChaos ? <Activity size={16} className="text-red-500" /> : <Cpu size={16} />}
                  <span>{isChaos ? 'DARK_MECHANICUM_LOGIC' : 'CORE_LOGIC_UNIT'}</span>
                </h5>
                <p className="leading-relaxed relative z-10 opacity-60 font-mono">{isChaos ? '本模块负责诸神的意志转译。亚空间能量已实时注入缓冲区。溢出的灵能将导致灵魂坍塌。' : '本模块映射角色受训轨迹。属性加权已实时注入缓冲区。溢出能量将导致认知崩塌。'}</p>
             </div>
          </div>

          <div className="md:col-span-9 flex flex-col gap-8 h-fit">
            {baseAlignment.includes('混沌') && (
              <div className="p-8 border-2 border-purple-900/40 bg-zinc-950 shadow-[0_0_50px_rgba(88,28,135,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                  <Sparkles size={80} className="text-purple-900" />
                </div>
                
                <div className="flex justify-between items-center mb-10 border-b-2 border-purple-900/50 pb-4">
                  <h4 className="text-purple-400 text-sm font-black flex items-center gap-4 uppercase tracking-[0.4em] relative z-10">
                    <Zap size={20} className="text-purple-500" /> 亚空间馈赠 [WARP_BLESSING_v3]
                  </h4>
                  <div className="text-[10px] text-purple-700 font-mono font-bold animate-pulse">CONNECTION: UNSTABLE</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                  {CHAOS_BLESSINGS.map((cb, idx) => {
                    const isActive = chaosBlessing === cb.name;
                    const isImmutable = ['恐虐战团', '色孽信徒', '奸奇信徒', '纳垢军团'].includes(lineage) && isActive;
                    
                    return (
                      <button
                        key={cb.name}
                        type="button"
                        onClick={() => !isImmutable && setChaosBlessing(chaosBlessing === cb.name ? null : cb.name)}
                        className={`p-5 border flex flex-col gap-3 group relative transition-all text-left min-h-[120px] ${
                          isActive
                            ? 'border-purple-600 bg-purple-900/20 text-slate-100 ring-1 ring-purple-600/50 scale-[1.02] z-10'
                            : 'border-zinc-900 bg-black/40 text-zinc-600 hover:border-purple-900 hover:bg-zinc-900/50'
                        } ${isImmutable ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                         <div className="flex justify-between items-start">
                            <div className={`px-2 py-0.5 border text-[8px] font-black uppercase tracking-widest ${isActive ? 'border-purple-500 bg-purple-600 text-white' : 'border-zinc-800 text-zinc-700'}`}>
                               GIFT_{idx.toString().padStart(2, '0')}
                            </div>
                            {isActive && <div className="text-purple-500 text-[10px] items-center gap-1 flex flex-none">{isImmutable ? 'LOCKED' : 'SLOT_01'}</div>}
                         </div>
                         
                         <div>
                            <h5 className={`text-sm font-black uppercase tracking-widest mb-1 transition-colors ${isActive ? 'text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                              {cb.name}
                            </h5>
                            <span className="text-[9px] text-purple-900 font-mono uppercase">PATH: {cb.god}</span>
                         </div>
                         
                         <p className={`text-[10px] font-mono leading-relaxed mt-2 ${isActive ? 'text-zinc-400' : 'text-zinc-700'}`}>{cb.effect}</p>
                         
                         {isActive && (
                           <div className="absolute bottom-0 right-0 p-1">
                              <div className="w-1.5 h-1.5 bg-purple-500 animate-pulse" />
                           </div>
                         )}
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-8 flex justify-between items-center opacity-40 group">
                   <div className="text-[7px] text-purple-900 font-mono flex items-center gap-4">
                      <span>SIGN_REF: {lineage.toUpperCase()}</span>
                      <span className="w-1 h-1 bg-purple-900 rounded-full" />
                      <span>ENTROPY_LV: 99.81%</span>
                   </div>
                   <div className="text-[7px] text-purple-900 font-mono">VOID_SOCKET_READY</div>
                </div>
              </div>
            )}

            {socialIdentity === '变种人' && (
              <div className="p-8 border-2 border-green-900/40 bg-zinc-950 shadow-[0_0_50px_rgba(20,83,45,0.1)] relative overflow-hidden">
                
                <div className="flex justify-between items-center mb-10 border-b-2 border-green-900/50 pb-4">
                  <h4 className="text-green-400 text-sm font-black flex items-center gap-4 uppercase tracking-[0.4em] relative z-10">
                    <Dna size={20} className="text-green-500" /> 变种人种族 [MUTANT_TYPE]
                  </h4>
                  <div className="text-[10px] text-green-700 font-mono font-bold animate-pulse">PHYSIOLOGY: UNSTABLE</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                  {[
                    { label: "欧格林", trait: "愚钝蛮力" },
                    { label: "莱特林", trait: "半身之巧" },
                    { label: "导航者", trait: "亚空间之眼" },
                    { label: "野兽人", trait: "野兽之躯" }
                  ].map((mtObj, idx) => {
                    const isActive = mutantTrait === mtObj.trait;
                    const mtData = TRAIT_CATALOG[mtObj.trait];
                    
                    return (
                      <button
                        key={mtObj.trait}
                        type="button"
                        onClick={() => setMutantTrait(mutantTrait === mtObj.trait ? null : mtObj.trait)}
                        className={`p-5 border flex flex-col gap-3 group relative transition-all text-left min-h-[120px] ${
                          isActive
                            ? 'border-green-600 bg-green-900/20 text-slate-100 ring-1 ring-green-600/50 scale-[1.02] z-10'
                            : 'border-zinc-900 bg-black/40 text-zinc-600 hover:border-green-900 hover:bg-zinc-900/50'
                        } cursor-pointer`}
                      >
                         <div className="flex justify-between items-start">
                            <div className={`px-2 py-0.5 border text-[8px] font-black uppercase tracking-widest ${isActive ? 'border-green-500 bg-green-600 text-white' : 'border-zinc-800 text-zinc-700'}`}>
                               TYPE_{idx.toString().padStart(2, '0')}
                            </div>
                         </div>
                         
                         <div>
                            <h5 className={`text-sm font-black uppercase tracking-widest mb-1 transition-colors ${isActive ? 'text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                              {mtObj.label} / {mtObj.trait}
                            </h5>
                         </div>
                         
                         <p className={`text-[10px] font-mono leading-relaxed mt-2 ${isActive ? 'text-zinc-400' : 'text-zinc-700'}`}>{mtData?.desc || '未定义特质。'}</p>
                         
                         {isActive && (
                           <div className="absolute bottom-0 right-0 p-1">
                              <div className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
                           </div>
                         )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <h4 className="text-zinc-300 text-xs font-black flex items-center gap-4 uppercase tracking-[0.4em] whitespace-nowrap">
                  <Shield size={20} className="text-red-900" /> {isChaos ? '异变矩阵' : '特质矩阵'} <span className="text-zinc-700 text-[10px] font-mono">[{isChaos ? 'MUTATION_MATRIX' : 'TRAIT_MATRIX_V3'}]</span>
                </h4>
                <div className="h-px bg-zinc-900 flex-1 border-t border-zinc-800" />
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
                {Array.from({ length: Math.max(derivedTraits.length, 4) }).map((_, idx) => {
                  const trait = derivedTraits[idx];
                  if (idx >= 8 && !trait) return null; 
                  return (
                    <div 
                      key={`trait-${idx}`}
                      className={`relative min-h-[95px] border-2 flex flex-col p-4 transition-all group overflow-hidden bg-zinc-950 ${
                        trait 
                          ? 'border-zinc-800 shadow-[inset_0_0_20px_rgba(255,255,255,0.01)]' 
                          : 'border-zinc-900 border-dashed opacity-25 hover:opacity-40'
                      }`}
                    >
                      {trait ? (
                        <>
                          <div className="flex justify-between items-start mb-3 relative z-10">
                            <div className="text-[8px] text-zinc-500 font-black tracking-widest uppercase px-1.5 border border-zinc-800 bg-black">
                              {trait.source === 'Social' ? 'ID_REF' : 'ORG_REF'}
                            </div>
                            <Activity size={12} className="text-red-900/40" />
                          </div>
                          <div className="text-[12px] text-slate-100 font-mono font-black mb-2 leading-tight uppercase tracking-tight relative z-10">{trait.name}</div>
                          <div className="text-[10px] text-zinc-600 line-clamp-2 leading-tight font-mono italic relative z-10">{trait.desc}</div>

                            <div className="absolute inset-0 bg-red-950 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex flex-col transform translate-y-2 group-hover:translate-y-0 overflow-y-auto custom-scrollbar">
                               <div className="text-[8px] text-red-500 font-black mb-2 tracking-[0.4em] uppercase border-b border-red-900 pb-1 w-fit">Trait_Extended_Intel</div>
                               <p className="text-[10px] text-red-100 font-mono leading-relaxed">{trait.desc}</p>
                            </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full opacity-10">
                          <Plus size={20} className="mb-2" />
                          <span className="text-[9px] font-mono tracking-widest">SLOT_EMPTY</span>
                        </div>
                      )}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-white/[0.02] to-transparent pointer-events-none" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-zinc-900 pb-4">
                <h4 className="text-zinc-300 text-xs font-black flex items-center gap-4 uppercase tracking-[0.3em]">
                  <Zap size={20} className="text-red-900" /> {isChaos ? '亚空间赋能协议' : '技能受训协议'} <span className="text-zinc-700 text-[10px] font-mono">[{isChaos ? 'WARP_POWERS_REG' : 'SKILL_REGISTRY'}]</span>
                </h4>
                
                <div className="flex-1 md:flex justify-end hidden">
                  <div className="flex items-center gap-4 px-5 py-2 border border-zinc-900 bg-black/60 shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
                    <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Impact_Buffer</div>
                    <div className="flex flex-wrap gap-x-5">
                      {[
                        { label: 'WS', key: 'weaponSkill' },
                        { label: 'BS', key: 'ballisticSkill' },
                        { label: 'S', key: 'strength' },
                        { label: 'T', key: 'toughness' },
                        { label: 'Ag', key: 'agility' },
                        { label: 'Int', key: 'intelligence' },
                        { label: 'Per', key: 'perception' },
                        { label: 'WP', key: 'willpower' },
                        { label: 'Fel', key: 'fellowship' },
                      ].map(attr => {
                        const mod = extraModifiers[attr.key as keyof typeof extraModifiers];
                        if (mod === 0) return null;
                        return (
                          <div key={attr.key} className="flex items-center gap-1.5 text-[11px] font-mono">
                            <span className="text-slate-600 font-bold">{attr.label}</span>
                            <span className={`font-bold ${mod > 0 ? 'text-blue-500' : 'text-orange-500'}`}>
                              {mod > 0 ? '+' : ''}{mod}
                            </span>
                          </div>
                        );
                      })}
                      {Object.values(extraModifiers).every(v => v === 0) && <span className="text-[10px] text-slate-800 font-mono italic tracking-tighter">ZERO_DELTA_DETECTED</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 relative z-10">
                {skills.filter(s => s !== null).map((skill, idx) => {
                  if (!skill) return null;
                  
                  // Re-find the exact index in the original skills array
                  const originalIdx = skills.findIndex(s => s === skill);
                  
                  return (
                    <div 
                      key={originalIdx}
                      className={`group relative p-0.5 transition-all w-80 ${(skill.traitChoices || skill.isGrantedSelectable) ? 'cursor-pointer' : ''} ${
                        skill.isGrantedFixed ? 'z-0 grayscale-[0.8]' : 'scale-[1.01] hover:scale-[1.02] z-10'
                      }`}
                      onClick={() => {
                        if (skill.traitChoices) {
                          setSelectedSlotIndex(originalIdx);
                          setIsTraitSelectionModalOpen(true);
                        } else if (skill.isGrantedSelectable) {
                          setSelectedSlotIndex(originalIdx);
                          setIsSkillModalOpen(true);
                        }
                      }}
                    >
                      <div className={`p-5 border-2 transition-all relative overflow-hidden h-full min-h-[125px] backdrop-blur-md flex flex-col ${
                        skill.isGrantedFixed ? 'bg-zinc-900 border-zinc-800' : skill.isGrantedSelectable ? 'bg-blue-950/10 border-blue-900/50 shadow-[0_0_20px_rgba(30,58,138,0.1)] hover:bg-blue-900/20' : 'bg-black border-zinc-800 hover:border-red-700 hover:bg-zinc-900 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]'
                      }`}>
                         <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="flex flex-col">
                               <div className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1 ${skill.isGrantedFixed ? 'text-zinc-600' : 'text-zinc-500'}`}>
                                  ID: S-{idx.toString().padStart(2, '0')}
                               </div>
                               <div className={`text-[10px] font-mono tracking-widest flex items-center gap-2 ${skill.isGrantedFixed ? 'text-zinc-700' : 'text-red-900'}`}>
                                  <Activity size={10} />
                                  {skill.type === SkillType.REGULAR ? 'FIELD_OPS' : 
                                   skill.type === SkillType.KNOWLEDGE ? 'COGNIS_DATA' : 
                                   skill.type === SkillType.FACTION ? 'GENE_CODE' :
                                   'AETHER_SIGNAL'}
                               </div>
                            </div>
                         </div>

                         <div className={`text-[13px] font-mono font-black uppercase mb-4 transition-colors relative z-10 ${skill.isGrantedFixed ? 'text-zinc-500' : 'text-slate-100 group-hover:text-red-500'}`}>
                            {skill.isTalent ? `[T] ${skill.name}` : skill.name}
                         </div>

                         <div className="mt-auto flex justify-between items-end relative z-10">
                            <div className="flex gap-1.5">
                               {[1, 2, 3].map(lvl => (
                                 <div 
                                   key={lvl} 
                                   className={`w-6 h-2 border-2 border-zinc-900 bg-zinc-900/50 ${lvl <= skill.level ? (skill.isGrantedSelectable ? 'bg-blue-600' : 'bg-red-600') : ''}`}
                                 />
                               ))}
                            </div>
                            <div className={`text-[10px] font-mono font-black px-2 py-0.5 border border-zinc-800 ${skill.isGrantedSelectable ? 'text-blue-500' : 'text-red-900'}`}>
                               LV-0{skill.level}
                            </div>
                         </div>

                         {/* Hover Details Overlay */}
                         <div className="absolute inset-0 bg-zinc-950/95 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 flex flex-col border-2 border-red-900/50 shadow-[inset_0_0_30px_rgba(220,38,38,0.2)] overflow-y-auto custom-scrollbar">
                           <div className="text-[8px] text-red-600 font-black mb-3 tracking-[0.4em] uppercase border-b border-red-900 pb-1 w-fit">Tech_Specification</div>
                           <p className="text-[12px] text-zinc-100 font-mono leading-relaxed mb-4">{skill.description || '无详细技术参数文档。'}</p>
                           {skill.stat && <div className="mt-auto text-[10px] text-zinc-600 font-mono flex items-center gap-3">
                             <div className="w-2 h-2 bg-red-900 rotate-45" /> LINKED_MOD_ATTR: <span className="text-zinc-300 font-black">{skill.stat}</span>
                           </div>}
                         </div>

                         {/* Higher Z-Index interactive elements */}
                         <div className="absolute top-4 right-4 z-[100] flex gap-2">
                           {!skill.isGrantedFixed && !skill.isGrantedSelectable && (
                             <button
                               type="button"
                               onClick={(e) => {
                                 e.stopPropagation();
                                 const refund = skill.level; 
                                 setSkillPoints(prev => prev + refund);
                                 // Simple removal logic
                                 const newSkills = skills.filter((s) => s !== skill);
                                 setSkills([...newSkills, null]);
                               }}
                               className="w-7 h-7 border-2 border-zinc-800 text-zinc-500 hover:text-white hover:border-red-600 hover:bg-red-600 transition-all flex items-center justify-center bg-black/80 shadow-xl"
                             >
                               <X size={14} />
                             </button>
                           )}
                           {skill.isGrantedFixed && <Star size={16} className="text-zinc-700 mt-1" />}
                         </div>

                         {/* Upgrade handle on top */}
                         {skill.isUpgradeable && skill.level < (skill.type === SkillType.REGULAR ? 5 : (skill.maxLevel || 3)) && (
                           <button
                             type="button"
                             onClick={(e) => {
                               e.stopPropagation();
                               if (skillPoints > 0) {
                                 const newSkills = [...skills];
                                 const sIdx = newSkills.findIndex(s => s === skill);
                                 if (sIdx !== -1) {
                                   newSkills[sIdx] = { ...skill, level: skill.level + 1 };
                                   setSkills(newSkills);
                                   setSkillPoints(prev => prev - 1);
                                 }
                               }
                             }}
                             className="absolute bottom-2 right-14 p-2 text-red-900 hover:text-red-400 transition-all z-[100] animate-bounce bg-black/60 border border-red-900/30 rounded-sm"
                           >
                              <ChevronUp size={24} />
                           </button>
                         )}

                         {/* Trait Selection Button */}
                         {(skill.traitChoices || skill.isGrantedSelectable) && (
                           <button
                              type="button"
                              onClick={(e) => {
                                 e.stopPropagation();
                                 if (skill.traitChoices) {
                                   setSelectedSlotIndex(originalIdx);
                                   setIsTraitSelectionModalOpen(true);
                                 } else if (skill.isGrantedSelectable) {
                                   setSelectedSlotIndex(originalIdx);
                                   setIsSkillModalOpen(true);
                                 }
                              }}
                              className="absolute bottom-2 left-[20px] px-3 py-1 bg-red-900/30 border border-red-800 text-red-300 text-[10px] font-bold tracking-widest uppercase hover:bg-red-800 hover:text-white transition-colors z-[100] shadow-[0_0_10px_rgba(153,27,27,0.4)]"
                           >
                              {skill.traitChoices ? `选择特质 (${skill.selectedTraits?.length || 0}/${skill.level})` : '未配置能力'}
                           </button>
                         )}

                         <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/[0.04] to-transparent pointer-events-none" />
                      </div>
                    </div>
                  );
                })}

                {/* Add new skill slot (Dynamic) */}
                {skills.some(s => s === null) && skillPoints > 0 && (
                  <div 
                    onClick={() => {
                       const firstEmptyIdx = skills.findIndex(s => s === null);
                       setSelectedSlotIndex(firstEmptyIdx);
                       setIsSkillModalOpen(true);
                    }}
                    className="group relative p-0.5 transition-all w-80 cursor-pointer hover:scale-[1.02]"
                  >
                    <div className="p-5 border-2 border-zinc-900 border-dashed bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 transition-all h-[150px] flex flex-col items-center justify-center gap-3 opacity-30 group-hover:opacity-80">
                      <Plus size={32} className="text-zinc-600" />
                      <span className="text-[11px] font-mono tracking-[0.5em] uppercase text-zinc-500 font-black">ADD_PROTOCOL</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-2 border-zinc-800 bg-zinc-950/90 text-slate-400 shadow-[0_0_60px_rgba(0,0,0,1)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-transparent pointer-events-none" />
                <h5 className="text-[12px] text-zinc-400 font-black uppercase tracking-[0.5em] flex items-center gap-4 mb-6">
                  <Info size={20} className="text-red-900" /> 特质与技能配给协议
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 font-mono text-sm uppercase tracking-tighter">
                  <div className="flex items-start gap-4 p-4 border-2 border-zinc-900/50 bg-black/40 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-900/40" />
                    <span className="text-red-700 font-black flex-none text-base text-lg">[01]</span>
                    <p className="opacity-90 leading-tight font-black text-xs">精进协议：常规、知识与灵能技能均消耗1点分配额。</p>
                  </div>
                  <div className="flex items-start gap-4 p-4 border-2 border-zinc-900/50 bg-black/40 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-900/40" />
                    <span className="text-red-700 font-black flex-none text-base text-lg">[02]</span>
                    <p className="opacity-90 leading-tight font-black text-xs">限制：技能等级最高 Lv.5；知识与灵能天赋不可升级。</p>
                  </div>
                  <div className="flex items-start gap-4 p-4 border-2 border-zinc-900/50 bg-black/40 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-900/40" />
                    <span className="text-red-700 font-black flex-none text-base text-lg">[03]</span>
                    <p className="opacity-90 leading-tight font-black text-xs">灵能：由天赋决定上限，无法继续提升。</p>
                  </div>
                </div>
                <div className="absolute bottom-2 right-4 text-[8px] text-zinc-800 font-mono tracking-widest opacity-30 uppercase">Internal_System_Sync</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderPage7 = () => {
    const categories = ['近战武器', '远程武器', '护甲', '弹药', '医疗', '工具与设备', '生存与环境', '通讯与战术', '食物与饮水'];
    const isChaos = baseAlignment.includes('混沌') || lineage.includes('混沌') || lineage.includes('恐虐') || lineage.includes('奸奇') || lineage.includes('纳垢') || lineage.includes('色孽');
    
    const hasPrimarisSkill = skills.some(s => s?.name === '原铸改造');

    const getAffordableCurrencies = (item: ShopItem): string[] => {
      const costs = item.costs || {};
      if (Object.keys(costs).length === 0) return ['free'];
      if (costs.free !== undefined) return ['free'];

      const affordable: string[] = [];
      if (budget.total.throne !== undefined && costs.throne !== undefined && budget.available.throne >= costs.throne) affordable.push('throne');
      if (budget.total.credits !== undefined && costs.credits !== undefined && budget.available.credits >= costs.credits) affordable.push('credits');
      if (budget.total.requisition !== undefined && costs.requisition !== undefined && budget.available.requisition >= costs.requisition) affordable.push('requisition');
      if (budget.total.souls !== undefined && costs.souls !== undefined && budget.available.souls >= costs.souls) affordable.push('souls');
      if (budget.total.slaves !== undefined && costs.slaves !== undefined && budget.available.slaves >= costs.slaves) affordable.push('slaves');
      
      return affordable;
    };

    const canAfford = (item: ShopItem) => {
      const itemCat = item.category.replace('/', '与');
      const itemDesc = (item.stats?.desc || '') + (item.stats?.mod || '');
      const isShield = itemDesc.includes('持盾') || item.stats?.toughness?.toString().includes('仅对');

      // Slot type restrictions
      const equipmentCategories = ['近战武器', '远程武器', '护甲', '盔甲'];
      const bothCategories = ['投掷与特殊武器', '投掷/特殊武器', '特殊/投掷'];
      
      const isEquipmentType = equipmentCategories.includes(itemCat);
      const isBoth = bothCategories.includes(itemCat) || bothCategories.some(c => item.category.includes(c));

      if (armoryTargetType === 'EQUIPMENT' && !isEquipmentType && !isBoth) return false;
      if (armoryTargetType === 'ITEM' && isEquipmentType) return false;

      // Armor/Shield/Cloak/Accessory uniqueness check
      if (armoryTargetType === 'EQUIPMENT') {
        const checkShield = (eValue: any) => {
          if (!eValue) return false;
          const eDesc = (eValue.stats?.desc || '').concat(eValue.stats?.mod || '');
          return eValue.name.includes('盾') || eDesc.includes('持盾') || eValue.stats?.toughness?.toString().includes('仅对');
        };
        const checkCloak = (eValue: any) => {
          if (!eValue) return false;
          return eValue.name.includes('大氅') || eValue.name.includes('披风') || eValue.name.includes('斗篷');
        };
        const checkBodyArmor = (eValue: any) => {
          if (!eValue) return false;
          // Body armor is Armor category BUT NOT a shield or cloak
          return (eValue.category === '护甲' || eValue.category === '盔甲') && !checkShield(eValue) && !checkCloak(eValue);
        };

        if (isShield) {
          const existingShieldCount = equipmentList.filter(e => checkShield(e)).length;
          const isReplacingShield = checkShield(equipmentList[armoryTargetSlot!]);
          if (existingShieldCount > 0 && !isReplacingShield) return false;
        } else if (checkCloak(item)) {
          const existingCloakCount = equipmentList.filter(e => checkCloak(e)).length;
          const isReplacingCloak = checkCloak(equipmentList[armoryTargetSlot!]);
          if (existingCloakCount > 0 && !isReplacingCloak) return false;
        } else if (checkBodyArmor(item)) {
          // It's body armor if it reaches here and is in Armor category
          const existingArmorCount = equipmentList.filter(e => checkBodyArmor(e)).length;
          const isReplacingArmor = checkBodyArmor(equipmentList[armoryTargetSlot!]);
          if (existingArmorCount > 0 && !isReplacingArmor) return false;
        }
        // "Other Accessories" like helmets etc. are NOT uniquely limited by this logic anymore, 
        // allowing multiple slots to be filled with different trinkets.
      }

      // Primaris armor check
      if (item.name.includes('Mk X 福波斯型动力装甲') || item.name.includes('Mk X 格拉维斯型动力装甲')) {
        if (!hasPrimarisSkill) return false;
      }

      // Lore-based filtering (Suitability) - STRENGTHENED
      const isAstartes = lineage.includes('星际战士') || lineage.includes('灰骑士') || lineage.includes('阿斯塔特') || lineage.includes('战团') || lineage.includes('狂战士') || socialIdentity.includes('星际战士') || socialIdentity.includes('阿斯塔特') || socialIdentity.includes('原体') || lineage.includes('原体');
      const isSister = lineage.includes('战斗修女') || lineage.includes('修女') || socialIdentity.includes('战斗修女');
      const isEldar = lineage.includes('灵族');
      const isTau = lineage.includes('钛');
      
      const wearer = (item.stats?.wearer || '');
      
      // Faction Exclusive Locks (Hardened to parse split tags, preventing false substring matches for multi-faction items)
      const isChaosLoyalist = isChaos;
      const isMechanicus = lineage.includes('机械教') || subFaction.includes('技师') || socialIdentity.includes('技术军士');
      const wearerTags = wearer.split(/[,，/]/).map((s: string) => s.trim()).filter(Boolean);
      const onlyHasTagsOf = (kws: string[]) => wearerTags.length > 0 && wearerTags.every(t => kws.some(kw => t.includes(kw)));
      
      if (onlyHasTagsOf(['阿斯塔特', '星际战士', '灰骑士', '死亡守望', '原体']) && !isAstartes) return false;
      if (wearer === '混沌星际战士' && !isChaosLoyalist) return false;
      if (onlyHasTagsOf(['修女', '圣女']) && !isSister) return false;
      if (onlyHasTagsOf(['灵族']) && !isEldar) return false;
      if (onlyHasTagsOf(['钛']) && !isTau) return false;
      
      const CHAOS_KEYWORDS = ['混沌', '恐虐', '奸奇', '纳垢', '色孽', '叛教', '邪教'];
      if (wearerTags.length > 0 && wearerTags.every(t => CHAOS_KEYWORDS.some(kw => t.includes(kw))) && !isChaosLoyalist) return false;
      
      if (onlyHasTagsOf(['机械教', '护教军']) && !isMechanicus) return false;
      
      // Physiology / Size Locks
      if (itemCat === '护甲') {
        const isAstartesArmor = wearer.includes('阿斯塔特') || wearer.includes('星际战士') || wearer.includes('原体') ||
          ['灰骑士', '死亡守望', '极限战士', '暗黑天使', '太空野狼', '帝国之拳', '钢铁之手', '火蜥蜴', '暗鸦守卫', '白色疤痕', '黑色圣堂', '圣血天使', '吞世者', '千子', '怀言者', '午夜领主', '钢铁勇士', '阿尔法军团', '黑色军团', '荷鲁斯之子', '死翼', '终结者', '无畏装甲'].some(kw => wearer.includes(kw)) ||
          item.name.includes('动力甲') || item.name.includes('无畏装甲') || item.name.includes('终结者') || item.name.includes('MK') || item.name.includes('Mk');
        // Space Marines cannot wear normal human armor
        if (isAstartes && !isAstartesArmor && !isShield) return false;
        // Normal humans cannot wear Astartes armor
        if (!isAstartes && isAstartesArmor) return false;
      }
      
      // Budget check
      const affordable = getAffordableCurrencies(item).length > 0;
      if (!affordable) return false;

      // Faction/Skill Check
      const factionDetectionStr = [lineage, subFaction, socialIdentity].filter(Boolean).join(' ');
      let detectedFaction = lineage;
      if (factionDetectionStr.includes('刺客')) detectedFaction = '刺客庭';
      else if (factionDetectionStr.includes('审判')) detectedFaction = '审判庭';
      else if (factionDetectionStr.includes('寂静修女')) detectedFaction = '寂静修女会';
      else if (factionDetectionStr.includes('战斗修女')) detectedFaction = '战斗修女会';
      else if (factionDetectionStr.includes('修女')) detectedFaction = '战斗修女会'; // Fallback
      else if (factionDetectionStr.includes('机械教') || factionDetectionStr.includes('护教军')) detectedFaction = '机械教';
      else if (factionDetectionStr.includes('行商浪人')) detectedFaction = '行商浪人';

      const characterData = {
        faction: detectedFaction,
        subFaction: subFaction,
        traits: baseTraits,
        skills: skills.filter(Boolean)
      };
      
      return canCharacterUseItem(characterData, item);
    };

    let affordableItems = SHOP_ITEMS.filter(canAfford);
    
    // Override if the selected slot is a granted selectable (like Ancestral Weapon)
    const activeTargetSlotItem = armoryTargetType === 'EQUIPMENT' 
      ? (armoryTargetSlot !== null ? equipmentList[armoryTargetSlot] : null)
      : (armoryTargetSlot !== null ? itemList[armoryTargetSlot] : null);

    if (activeTargetSlotItem?.isGrantedSelectable && activeTargetSlotItem?.grantedChoices) {
      affordableItems = SHOP_ITEMS.filter(item => activeTargetSlotItem.grantedChoices!.includes(item.name))
        .map(item => ({ ...item, costs: { free: 0 } }));
    }

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left Column: Management & Feedback */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:sticky lg:top-0">
             <div className="p-6 bg-zinc-950 border border-zinc-900 shadow-2xl backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden group font-mono">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                   <Box size={120} />
                </div>
                
                {/* Corner detail */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-900/30" />

                <h3 className="text-lg md:text-xl text-slate-100 font-black uppercase tracking-[0.2em] mb-1 relative z-10">{isChaos ? '战利品与恩赐' : '物资配给'}</h3>
                <div className="text-zinc-600 text-[9px] uppercase font-black tracking-widest mb-6 border-b border-zinc-900 pb-3 w-full relative z-10">{isChaos ? '[SPOILS_ALLOC_REG]' : '[ARMORY_LOGISTICS_V2]'}</div>
                
                <div className="flex flex-col items-center mb-8 w-full relative z-10">
                   <div className="flex items-baseline gap-1">
                      <span className={`text-4xl md:text-6xl font-black transition-colors ${budget.available.throne === 0 && budget.available.credits === 0 && budget.available.requisition === 0 ? 'text-zinc-700' : 'text-red-700'}`}>
                         {budget.available.throne || budget.available.credits || budget.available.requisition || (isChaos ? budget.available.souls : 0) || 0}
                      </span>
                   </div>
                   <div className="text-[10px] text-zinc-600 font-mono mt-2 tracking-widest uppercase">Budget_Active</div>
                </div>

                <div className="w-full space-y-2 mb-6 relative z-10">
                  {Object.entries(budget.total).map(([key, total]) => {
                    if (total === undefined || total === 0) return null;
                    const available = budget.available[key as keyof typeof budget.available];
                    let label = '征用点';
                    let color = 'text-red-600';
                    if (key === 'throne') {
                      label = '王座币';
                      color = 'text-yellow-600';
                    } else if (key === 'credits') {
                      label = '信用点';
                      color = 'text-blue-600';
                    } else if (key === 'souls') {
                      label = '灵魂';
                      color = 'text-purple-600';
                    } else if (key === 'slaves') {
                      label = '奴隶';
                      color = 'text-orange-900';
                    }
                    return (
                      <div key={key} className="flex items-center justify-between px-3 py-2 bg-black/40 border border-zinc-900 group">
                        <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">{label}</span>
                        <div className={`text-sm md:text-lg font-black text-right ${(available as number) < 0 ? 'text-red-500 animate-pulse' : color}`}>
                          {available as number} <span className="text-[9px] opacity-20 font-normal">/ {total as number}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 bg-red-950/10 border border-red-900/30 text-[9px] text-zinc-500 leading-relaxed text-left flex gap-3 w-full relative z-10">
                  <div className="w-1 h-auto bg-red-900/50 flex-none" />
                  <span>物资配给点数取决于您的出身与社会背景。由于战时经济，请确保每一枚什一税都发挥其应有的效率。</span>
                </div>
             </div>

             {/* Attributes Feedback is also vital here as heavy gear affects stats */}
             <div className="relative group">
               {renderAttributesSummary(true, true)}
               <div className="absolute -top-3 -right-3 flex gap-1">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
               </div>
             </div>

             <div className="p-4 bg-zinc-900/40 border border-zinc-800 flex items-center justify-center space-x-4 shadow-inner">
               <div className="w-10 h-10 rounded-full border-2 border-zinc-800 flex items-center justify-center text-zinc-700 shrink-0">
                  <Box size={18} />
               </div>
               <div className="w-full text-left">
                 <h5 className="text-zinc-400 text-[9px] font-black uppercase tracking-tighter mb-1.5 mt-0.5">装备负荷指数</h5>
                 <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-1000" 
                      style={{ width: `${Math.min(100, (equipmentList.filter(Boolean).length / 12) * 100)}%` }} 
                    />
                 </div>
                 <p className="text-[8px] text-zinc-600 font-mono mt-1 uppercase">Integrity: Nominal</p>
               </div>
             </div>
          </div>

          <div className="lg:col-span-9 space-y-12">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 border-b-2 border-zinc-900 pb-4 gap-4 sm:gap-0">
                  <h4 className="text-slate-100 text-base sm:text-lg font-black flex flex-wrap items-center gap-3 sm:gap-4 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                    <div className="bg-blue-900/20 p-2 border border-blue-900/40 shrink-0">
                      <Shield className="text-blue-500" size={20} />
                    </div>
                    <span className="whitespace-nowrap">{isChaos ? '亵渎武装序列' : '主战装备序列'}</span> <span className="text-zinc-700 text-[10px] sm:text-xs font-mono font-normal">[{isChaos ? '12_PROFANE_SLOTS' : '12_TACTICAL_SLOTS'}]</span>
                  </h4>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-blue-900/50" />
                    <div className="w-4 h-1 bg-blue-900/50" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                  {equipmentList.map((item, idx) => {
                    // Optimized slot visibility: show all items + 1 empty slot (if not maxed out)
                    const filledCount = equipmentList.filter(Boolean).length;
                    const isFirstEmpty = !item && (idx === 0 || (idx > 0 && !!equipmentList[idx-1]));
                    const shouldShow = item || isFirstEmpty || (filledCount === 0 && idx === 0);
                    
                    if (!shouldShow) return null;

                    return (
                      <div 
                        key={`eq-${idx}`}
                        onClick={() => {
                          setArmoryTargetSlot(idx);
                          setArmoryTargetType('EQUIPMENT');
                          setIsArmoryModalOpen(true);
                        }}
                        className={`group relative min-h-[100px] sm:min-h-[140px] border-2 transition-all cursor-pointer overflow-hidden p-0 flex flex-col ${
                          item 
                            ? 'border-blue-900/40 bg-zinc-950 hover:border-blue-500 shadow-[inset_0_0_40px_rgba(30,58,138,0.1)]' 
                            : 'border-zinc-900 bg-black/40 border-dashed hover:border-blue-900/50'
                        }`}
                      >
                        <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-zinc-800 pointer-events-none">
                           SLOT_{String(idx + 1).padStart(2, '0')}
                        </div>

                        {item ? (
                          <>
                            <div className="p-4 flex-1 relative">
                               <div className="text-[9px] text-blue-900 font-black uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                  <span className="w-1 h-3 bg-blue-900/50" />
                                  {item.category}
                               </div>
                               <div className="text-base font-black text-slate-100 group-hover:text-blue-400 transition-colors uppercase leading-tight mb-3">
                                  {item.name}
                               </div>
                               
                               {/* Hover Details Overlay */}
                               <div className="absolute inset-0 bg-zinc-950/95 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 flex flex-col border-2 border-blue-900/50 shadow-[inset_0_0_40px_rgba(30,58,138,0.3)] overflow-y-auto custom-scrollbar pointer-events-none">
                                 <div className="text-[8px] text-blue-600 font-black mb-3 tracking-[0.4em] uppercase border-b border-blue-900 pb-1 w-fit">Tech_Specification</div>
                                 <p className="text-[11px] text-zinc-100 font-mono leading-relaxed mb-4">{item.description || item.stats?.desc || '无详细技术参数文档。'}</p>
                                 <div className="mt-auto space-y-1.5">
                                   {item.stats?.power && <div className="text-[10px] text-zinc-500 font-mono uppercase">Power: <span className="text-blue-400 font-black">{item.stats.power}</span></div>}
                                   {item.stats?.damage && <div className="text-[10px] text-zinc-500 font-mono uppercase">Damage: <span className="text-red-500 font-black">{item.stats.damage}</span></div>}
                                   {item.stats?.toughness && <div className="text-[10px] text-zinc-500 font-mono uppercase">Prot: <span className="text-green-500 font-black">{item.stats.toughness}</span></div>}
                                   {item.stats?.desc && <div className="text-[9px] text-zinc-600 font-mono italic leading-tight border-t border-zinc-900 pt-2">{item.stats.desc}</div>}
                                 </div>
                               </div>

                               <div className="mt-4 grid grid-cols-3 gap-2">
                                  {item.stats?.power && (
                                    <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center">
                                      <div className="text-[8px] text-zinc-600 uppercase font-mono">Str</div>
                                      <div className="text-[10px] font-black text-blue-500">{item.stats.power}</div>
                                    </div>
                                  )}
                                  {item.stats?.ap != null && (
                                    <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center">
                                      <div className="text-[8px] text-zinc-600 uppercase font-mono">AP</div>
                                      <div className="text-[10px] font-black text-teal-500">{item.stats.ap}</div>
                                    </div>
                                  )}
                                  {item.stats?.damage && (
                                    <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center">
                                      <div className="text-[8px] text-zinc-600 uppercase font-mono">Dmg</div>
                                      <div className="text-[10px] font-black text-red-600">{item.stats.damage}</div>
                                    </div>
                                  )}
                                  {item.stats?.ar != null && (
                                    <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center">
                                      <div className="text-[8px] text-zinc-600 uppercase font-mono">AR</div>
                                      <div className="text-[10px] font-black text-teal-500">{item.stats.ar}</div>
                                    </div>
                                  )}
                                  {item.stats?.toughness && (
                                    <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center">
                                      <div className="text-[8px] text-zinc-600 uppercase font-mono">Tgh</div>
                                      <div className="text-[10px] font-black text-green-600">
                                        {item.stats.toughness.toString().startsWith('+') ? item.stats.toughness : `+${item.stats.toughness}`}
                                      </div>
                                    </div>
                                  )}
                                  {item.stats?.hp && (
                                    <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center">
                                      <div className="text-[8px] text-zinc-600 uppercase font-mono">AHP</div>
                                      <div className="text-[10px] font-black text-emerald-500">{item.stats.hp}</div>
                                    </div>
                                  )}
                                  {item.stats?.capacity && item.stats.capacity !== '-' && (
                                    <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center">
                                      <div className="text-[8px] text-zinc-600 uppercase font-mono">Cap</div>
                                      <div className="text-[10px] font-black text-amber-500">{item.stats.capacity}</div>
                                    </div>
                                  )}
                                  {item.stats?.rateOfFire && item.stats.rateOfFire !== '-' && (
                                    <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center">
                                      <div className="text-[8px] text-zinc-600 uppercase font-mono">RoF</div>
                                      <div className="text-[10px] font-black text-amber-500">{item.stats.rateOfFire === '可' ? 'Auto' : 'Single'}</div>
                                    </div>
                                  )}
                               </div>
                            </div>
                            
                            <div className="bg-zinc-900/30 px-4 py-2 flex justify-between items-center border-t border-zinc-900/50">
                               <span className="text-[8px] font-mono text-zinc-700 tracking-widest uppercase">{isChaos ? 'SPOILS_VERIFIED' : 'Validated_Munitorum'}</span>
                               <button
                                 type="button"
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   const newList = [...equipmentList];
                                   newList[idx] = null;
                                   const compacted = newList.filter(Boolean);
                                   setEquipmentList([...compacted, ...new Array(12 - compacted.length).fill(null)]);
                                 }}
                                 className="text-zinc-800 hover:text-red-600 transition-colors"
                               >
                                 <X size={14} />
                               </button>
                            </div>
                            <div className="absolute top-0 left-0 w-0.5 h-full bg-blue-900 group-hover:bg-blue-500 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all" />
                          </>
                        ) : (
                          <div className="m-auto flex flex-col items-center gap-2 opacity-10 group-hover:opacity-30 transition-all">
                            <Plus size={24} className="text-zinc-500" />
                            <span className="text-[9px] uppercase font-black tracking-[0.4em]">Mount_Point</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 border-b-2 border-zinc-900 pb-4 gap-4 sm:gap-0">
                  <h4 className="text-slate-100 text-base sm:text-lg font-black flex flex-wrap items-center gap-3 sm:gap-4 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                    <div className="bg-yellow-900/20 p-2 border border-yellow-900/40 shrink-0">
                      <ShoppingBag className="text-yellow-600" size={20} />
                    </div>
                    <span className="whitespace-nowrap">辅助补给负荷</span> <span className="text-zinc-700 text-[10px] sm:text-xs font-mono font-normal">[LOGISTICS_PACK]</span>
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex text-zinc-500 text-[10px] uppercase font-mono tracking-widest bg-zinc-900/50 border border-zinc-900 px-3 py-1.5 items-center gap-x-4 gap-y-1">
                      <span className="opacity-50">弹药储量:</span>
                      {Object.entries(ammoSummary).length > 0 ? Object.entries(ammoSummary).map(([name, count]) => (
                        <span key={name} className="flex gap-1 items-center">
                          {name} 
                          <span className="text-yellow-600 font-black">
                            {count}
                          </span>
                        </span>
                      )) : <span className="opacity-30">无</span>}
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-yellow-900/50" />
                      <div className="w-4 h-1 bg-yellow-900/50" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                  {itemList.map((item, idx) => {
                    const filledCount = itemList.filter(Boolean).length;
                    const isFirstEmpty = !item && (idx === 0 || (idx > 0 && !!itemList[idx-1]));
                    const shouldShow = item || isFirstEmpty || (filledCount === 0 && idx === 0);
                    
                    if (!shouldShow) return null;

                    return (
                      <div 
                        key={`item-${idx}`}
                        onClick={() => {
                          setArmoryTargetSlot(idx);
                          setArmoryTargetType('ITEM');
                          setIsArmoryModalOpen(true);
                        }}
                        className={`group relative min-h-[80px] sm:min-h-[110px] border-2 transition-all cursor-pointer overflow-hidden p-0 flex flex-col ${
                          item 
                            ? 'border-yellow-900/40 bg-zinc-950 hover:border-yellow-600' 
                            : 'border-zinc-900 bg-black/40 border-dashed hover:border-yellow-900/30'
                        }`}
                      >
                        {item ? (
                          <>
                            <div className="p-3 flex-1 relative">
                              <div className="text-[8px] text-yellow-900 font-black uppercase tracking-widest mb-1">{item.category}</div>
                              <div className="text-xs font-black text-slate-100 group-hover:text-yellow-600 transition-colors uppercase leading-tight line-clamp-2">{item.name}</div>
                              <div className="absolute inset-0 bg-zinc-950/95 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 flex flex-col border-2 border-yellow-900/50 shadow-[inset_0_0_30px_rgba(113,63,18,0.2)] overflow-y-auto custom-scrollbar pointer-events-none">
                                <div className="text-[7px] text-yellow-600 font-black mb-2 tracking-[0.4em] uppercase border-b border-yellow-900/50 pb-1 w-fit">Logistics_Intel</div>
                                <p className="text-[10px] text-zinc-100 font-mono leading-relaxed">{item.description || item.stats?.desc || '标准备勤物资。'}</p>
                                {item.stats?.mod && <div className="mt-auto text-[8px] text-zinc-600 font-mono uppercase border-t border-zinc-900 pt-1 mt-2">Tag: <span className="text-yellow-900">{item.stats.mod}</span></div>}
                              </div>
                            </div>
                            <div className="px-3 py-1.5 flex justify-between items-center bg-zinc-900/20 border-t border-zinc-900/50">
                               <div className="flex gap-0.5">
                                  <div className="w-1 h-1 bg-yellow-950" />
                                  <div className="w-2 h-1 bg-yellow-950" />
                               </div>
                               <button
                                 type="button"
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   const newList = [...itemList];
                                   newList[idx] = null;
                                   const compacted = newList.filter(Boolean);
                                   setItemList([...compacted, ...new Array(24 - compacted.length).fill(null)]);
                                 }}
                                 className="text-zinc-800 hover:text-red-900 transition-colors"
                               >
                                 <X size={12} />
                               </button>
                            </div>
                          </>
                        ) : (
                          <div className="m-auto flex flex-col items-center opacity-10 group-hover:opacity-30 transition-all">
                            <Plus size={16} className="text-zinc-500" />
                            <span className="text-[7px] uppercase font-black tracking-widest mt-1">Cargo</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="hidden lg:block mt-12 relative overflow-hidden bg-zinc-950 border-2 border-zinc-900 p-10 font-mono">
                {/* Visual accents for hardcore look */}
                <div className="absolute top-0 left-0 w-20 h-2 bg-blue-900 shadow-[0_0_10px_rgba(30,58,138,0.5)]" />
                <div className="absolute bottom-0 right-0 w-32 h-1 bg-zinc-900" />
                <div className="absolute top-0 right-0 p-2 text-[8px] text-zinc-800">REF_ID: MD-1011-L</div>

                <h5 className="text-xl text-slate-100 font-black uppercase tracking-[0.4em] flex items-center gap-4 mb-8">
                  <div className={`p-2 border ${isChaos ? 'border-red-900/40 bg-red-900/10' : 'border-blue-900/40 bg-blue-900/10'}`}>
                     <FileText size={24} className={isChaos ? 'text-red-600' : 'text-blue-600'} />
                  </div>
                  {isChaos ? '掠夺奉献份额准则' : '后勤配额核定准则'} <span className="text-zinc-800 font-normal">/ {isChaos ? 'Loot_Decimation' : 'Logistics_Directive'}</span>
                </h5>
                
                <div className="grid grid-cols-2 gap-12 relative z-10">
                  <div className="space-y-6">
                    <div className="relative pl-6 py-1">
                       <div className={`absolute top-0 left-0 w-1 h-full ${isChaos ? 'bg-red-900/30' : 'bg-blue-900/30'}`} />
                       <div className={`text-xs font-black uppercase tracking-widest mb-1 ${isChaos ? 'text-red-500' : 'text-blue-500'}`}>[01] {isChaos ? '掠夺锚定原则' : '资源锚定原则'}</div>
                       <p className="text-[11px] text-zinc-500 leading-relaxed">{isChaos ? '初始异端资源（腐化军备、奴隶、颅骨、灵魂等）由受试者所投身的混沌流派与被诅咒的身份决定。' : '初始战略资源（王座币、信用点、征用点等）由受试者的子派系历史背景与所属阶级决定。'}</p>
                    </div>
                    <div className="relative pl-6 py-1">
                       <div className={`absolute top-0 left-0 w-1 h-full ${isChaos ? 'bg-red-900/30' : 'bg-blue-900/30'}`} />
                       <div className={`text-xs font-black uppercase tracking-widest mb-1 ${isChaos ? 'text-red-500' : 'text-blue-500'}`}>[02] {isChaos ? '鲜血结算协议' : '货币结算协议'}</div>
                       <p className="text-[11px] text-zinc-500 leading-relaxed">{isChaos ? '向黑暗诸神祈求赐福或向混沌神选换取武装时，受试者必须提供足够价值的祭品血仇。' : '在军械库终端进行申领时，受试者必须手动指定结算货币。'}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="relative pl-6 py-1">
                       <div className={`absolute top-0 left-0 w-1 h-full ${isChaos ? 'bg-red-900/30' : 'bg-blue-900/30'}`} />
                       <div className={`text-xs font-black uppercase tracking-widest mb-1 ${isChaos ? 'text-red-500' : 'text-blue-500'}`}>[03] 战备载荷冗余</div>
                       <div className="space-y-3 mt-2">
                          <div className="flex items-center gap-3">
                             <div className={`w-1.5 h-1.5 rotate-45 ${isChaos ? 'bg-red-900' : 'bg-blue-900'}`} />
                             <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">装备： 仅限远程、近战、护甲</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="w-1.5 h-1.5 bg-blue-900 rotate-45" />
                             <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">物品: 存储弹药、补给、战术工具</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="w-1.5 h-1.5 bg-red-900 rotate-45" />
                             <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter italic">
                               {isChaos 
                                 ? '警告: 亚空间阴影正注视着每一枚灵魂的流向，任何欺诈行为都将导致永恒的诅咒' 
                                 : '警告: 严禁私自拆卸带有神圣符咒的动力甲。'}
                             </span>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-zinc-900 flex justify-between items-center opacity-30 grayscale">
                   <div className="flex gap-1.5">
                      {[...Array(6)].map((_, i) => <div key={i} className="w-3 h-1 bg-zinc-800" />)}
                   </div>
                   <div className="text-[9px] font-mono whitespace-nowrap">TRANSMISSION_SECURE // SIG: OMNISSIAH</div>
                </div>
              </div>
            </div>
        </div>

        <AnimatePresence>
          {isArmoryModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsArmoryModalOpen(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-5xl bg-zinc-950 border-2 border-zinc-900 shadow-2xl flex flex-col h-[90vh] overflow-hidden"
              >
                <div className="p-6 border-b-2 border-red-950 flex justify-between items-center bg-black relative">
                  <div className="absolute top-0 left-0 w-2 h-full bg-red-900 shadow-[0_0_15px_rgba(153,27,27,0.5)]" />
                  <h3 className="text-xl font-mono text-slate-100 flex items-center gap-4 font-black uppercase tracking-tighter">
                    <ShoppingBag size={20} className="text-red-600" />
                    军械库访问权限核准 <span className="text-zinc-800 font-normal">#</span> SLOT_{String(armoryTargetSlot! + 1).padStart(2, '0')}
                  </h3>
                  <button type="button" onClick={() => setIsArmoryModalOpen(false)} className="w-10 h-10 border border-zinc-900 flex items-center justify-center text-zinc-600 hover:text-white transition-all"><X size={20} /></button>
                </div>
                  <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-12 bg-black custom-scrollbar">
                  {categories.map(cat => {
                    // Filter based on affiliation
                    const itemsInCat = affordableItems.filter(item => {
                      if (item.category !== cat) return false;
                      
                      if (activeTargetSlotItem?.isGrantedSelectable) {
                         return true; // Bypass restriction for granted special options
                      }
                      
                      // Identify current faction based on lineage/subFaction/identity
                      const traitStr = [lineage, subFaction, socialIdentity].filter(Boolean).join(' ');
                      let finalFaction = allegiance === 'CHAOS' ? '混沌' : '帝国';
                      if (traitStr.includes('刺客')) finalFaction = '刺客庭';
                      else if (traitStr.includes('审判')) finalFaction = '审判庭';
                      else if (traitStr.includes('星际战士') || traitStr.includes('阿斯塔特')) finalFaction = '星际战士';
                      else if (traitStr.includes('修女')) finalFaction = '战斗修女会';
                      else if (traitStr.includes('机械教') || traitStr.includes('护教军')) finalFaction = '机械教';
                      else if (traitStr.includes('行商浪人')) finalFaction = '行商浪人';
                      else if (traitStr.includes('禁军')) finalFaction = '禁军';

                      const charDataForUtil = {
                          faction: finalFaction,
                          subFaction: subFaction || lineage || '',
                          socialIdentity: socialIdentity,
                          traits: [...baseTraits, ...traitsFromSkills],
                          skills: skills.filter(Boolean),
                          level: 1,
                          lineage: lineage
                      };

                      return canCharacterUseItem(charDataForUtil, item);
                    });

                    if (itemsInCat.length === 0) return null;
                    return (
                      <section key={cat}>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                           <div className="w-1 h-4 bg-red-900" />
                           {cat}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {itemsInCat.map(item => {
                            const costMap: Record<string, string> = { throne: '王座币', credits: '信用点', requisition: '征用点', souls: '灵魂', slaves: '奴隶', free: '免费' };

                            const currentCount = purchaseCounts[item.id] || 1;
                            const isStackable = cat.includes('弹药') || cat.includes('医疗') || cat.includes('食物') || cat.includes('饮水') || cat.includes('消耗品') || cat === '战略资产' || cat === '物品' || item.name === '照明棒';

                            const updateCount = (delta: number) => {
                              setPurchaseCounts(prev => ({
                                ...prev,
                                [item.id]: Math.max(1, (prev[item.id] || 1) + delta)
                              }));
                            };

                            const handlePurchase = (currency: string) => {
                              const purchase = { 
                                ...item, 
                                count: currentCount,
                                paidWith: currency === 'free' ? undefined : (currency as 'throne' | 'credits' | 'requisition' | 'souls' | 'slaves') 
                              };
                              
                              if (armoryTargetType === 'EQUIPMENT') {
                                const newList = [...equipmentList]; 
                                // For stackable equipment, maybe merging logic? But slots usually hold unique items.
                                newList[armoryTargetSlot!] = purchase;
                                const compacted = newList.filter(Boolean);
                                setEquipmentList([...compacted, ...new Array(12 - compacted.length).fill(null)]);
                              } else {
                                const newList = [...itemList]; 
                                newList[armoryTargetSlot!] = purchase;
                                const compacted = newList.filter(Boolean);
                                setItemList([...compacted, ...new Array(24 - compacted.length).fill(null)]);
                              }
                              setIsArmoryModalOpen(false);
                            };

                            return (
                              <div key={item.id} className="bg-zinc-950 border-2 border-zinc-900 p-2 sm:p-4 hover:border-red-900/50 transition-all flex flex-col group relative">
                                <div className="absolute top-0 right-0 p-2 text-[7px] font-mono text-zinc-800">ARMORY_ENTRY: {item.id.slice(0,4)}</div>
                                
                                <div className="mb-4 flex-1">
                                  <div title={item.description} className="text-sm sm:text-base font-black text-slate-100 uppercase leading-snug group-hover:text-red-500 transition-colors mb-1 cursor-help">{item.name}</div>
                                  <div className="text-[10px] text-zinc-600 font-mono italic mb-3">{item.stats?.mod || 'MUNITION_STANDARD'}</div>
                                  
                                  <div className="mb-3 flex flex-wrap gap-1">
                                    {item.stats?.power && <span className="bg-blue-950/30 border border-blue-900/50 text-blue-400 text-[9px] px-1.5 py-0.5 font-mono">STR: {item.stats.power}</span>}
                                    {item.stats?.ap != null && <span className="bg-teal-950/30 border border-teal-900/50 text-teal-400 text-[9px] px-1.5 py-0.5 font-mono">AP: {item.stats.ap}</span>}
                                    {item.stats?.damage && <span className="bg-red-950/30 border border-red-900/50 text-red-500 text-[9px] px-1.5 py-0.5 font-mono">DMG: {item.stats.damage}</span>}
                                    {item.stats?.capacity && item.stats.capacity !== '-' && <span className="bg-amber-950/30 border border-amber-900/50 text-amber-500 text-[9px] px-1.5 py-0.5 font-mono">CAP: {item.stats.capacity}</span>}
                                    {item.stats?.rateOfFire && item.stats.rateOfFire !== '-' && <span className="bg-amber-950/30 border border-amber-900/50 text-amber-500 text-[9px] px-1.5 py-0.5 font-mono">ROF: {item.stats.rateOfFire === '可' ? 'Auto' : 'Single'}</span>}
                                    {item.stats?.ar != null && <span className="bg-teal-950/30 border border-teal-900/50 text-teal-500 text-[9px] px-1.5 py-0.5 font-mono">AR: {item.stats.ar}</span>}
                                    {item.stats?.hp && <span className="bg-emerald-950/30 border border-emerald-900/50 text-emerald-500 text-[9px] px-1.5 py-0.5 font-mono">AHP: {item.stats.hp}</span>}
                                    {item.stats?.toughness && <span className="bg-green-950/30 border border-green-900/50 text-green-500 text-[9px] px-1.5 py-0.5 font-mono">TGH: {item.stats.toughness}</span>}
                                  </div>
                                  
                                  {item.description && (
                                    <div className="text-[11px] text-zinc-400 mb-4 leading-relaxed bg-zinc-900/50 p-2 border-l border-zinc-700 italic">
                                      {item.description}
                                    </div>
                                  )}

                                  <div className="mt-1 text-[10px] text-zinc-500 leading-tight font-mono opacity-80">
                                    {item.stats?.wearer ? (
                                      <span className="text-red-900/70">适配授权: {item.stats.wearer}</span>
                                    ) : (
                                      <span className="text-zinc-700">常规配发许可</span>
                                    )}
                                  </div>
                                </div>

                                {isStackable && (
                                  <div className="flex items-center gap-3 mb-4 bg-zinc-900/30 p-2 border border-zinc-900">
                                    <span className="text-[8px] font-mono text-zinc-600 uppercase">数量 / QUANTITY</span>
                                    <div className="flex items-center gap-1">
                                      <button type="button" onClick={() => updateCount(-1)} className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400">-</button>
                                      <input 
                                        type="number" 
                                        value={currentCount} 
                                        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                                        onChange={(e) => setPurchaseCounts(prev => ({ ...prev, [item.id]: Math.max(1, parseInt(e.target.value) || 1) }))}
                                        className="w-10 bg-black border border-zinc-800 text-xs text-center font-mono py-0.5"
                                      />
                                      <button type="button" onClick={() => updateCount(1)} className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400">+</button>
                                    </div>
                                  </div>
                                )}
                                
                                <div className="mt-2 pt-4 border-t border-zinc-900 space-y-2">
                                  <div className="text-[8px] font-black text-zinc-700 uppercase tracking-widest mb-1">选择购买协议 / Select_Uplink</div>
                                  <div className="flex flex-wrap gap-2">
                                    {(item.costs.free !== undefined) ? (
                                      <button
                                        type="button"
                                        onClick={() => handlePurchase('free')}
                                        className="flex-1 bg-zinc-900 border border-zinc-800 hover:border-blue-600 hover:bg-blue-950/20 px-3 py-2 text-left transition-all active:scale-95"
                                      >
                                        <div className="text-[8px] text-zinc-600 uppercase font-mono">免费发放</div>
                                        <div className="text-xs font-black text-slate-200">FREE</div>
                                      </button>
                                    ) : (
                                      (isChaos ? ['souls', 'slaves', 'requisition'] : ['throne', 'credits', 'requisition']).map(curr => {
                                        const basePrice = item.costs[curr as keyof typeof item.costs];
                                        const hasPrice = basePrice !== undefined;
                                        const totalPrice = hasPrice ? basePrice * currentCount : 0;
                                        const canAfford = hasPrice && (budget.available[curr as keyof typeof budget.available] >= totalPrice);
                                        
                                        return (
                                          <button
                                            key={curr}
                                            type="button"
                                            disabled={!hasPrice || !canAfford}
                                            onClick={() => handlePurchase(curr)}
                                            className={`flex-1 min-w-[80px] border px-3 py-2 text-left transition-all relative overflow-hidden ${
                                              !hasPrice 
                                                ? 'bg-zinc-950 border-zinc-900 opacity-40 cursor-not-allowed'
                                                : !canAfford
                                                  ? 'bg-zinc-900/50 border-zinc-800 grayscale cursor-not-allowed opacity-60'
                                                  : 'bg-zinc-900 border-zinc-800 hover:border-red-600 hover:bg-red-950/20 active:scale-95'
                                            }`}
                                          >
                                            <div className="text-[8px] text-zinc-600 uppercase font-mono flex justify-between items-center">
                                              <span>{costMap[curr]}</span>
                                            </div>
                                            <div className={`text-xs font-black ${!hasPrice ? 'text-zinc-700' : !canAfford ? 'text-zinc-500' : 'text-slate-200'}`}>
                                              {hasPrice ? totalPrice : '—'}
                                            </div>
                                            
                                            {hasPrice && !canAfford && (
                                              <div className="absolute top-0 right-0 h-full w-0.5 bg-red-900" />
                                            )}
                                            {!hasPrice && (
                                              <div className="absolute top-0 right-1 text-[6px] text-zinc-800 font-mono italic">UNAVAILABLE</div>
                                            )}
                                          </button>
                                        );
                                      })
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  const renderPage8 = () => {
    const isChaos = baseAlignment.includes('混沌');
    const allTraits = [...baseTraits, ...traitsFromSkills].reduce((acc, curr) => {
      if (!acc.some(t => t.name === curr.name)) acc.push(curr);
      return acc;
    }, [] as TraitData[]);

    const ahp = equipmentList.reduce((sum, item) => sum + ((item && item.stats && item.stats.hp) ? parseInt(item.stats.hp.split('/')[0] || '0') : 0), 0);
    const hp = Math.max(1, Math.floor((finalAttrs.toughness || 0) / 5));
    
    // MV calculation includes base Agility/10 plus trait modifiers
    const mvBase = Math.max(1, Math.floor((finalAttrs.agility || 0) / 10));
    let hasSpecialFormula = false;
    let specialMV = 0;
    let mvMod = 0;
    let mvMultiplier = 1;

    allTraits.forEach(t => {
      // Sizes
      if (t.name === '体型·微小') mvMod -= 3;
      else if (t.name === '体型·超小') mvMod -= 2;
      else if (t.name === '体型·小型') mvMod -= 1;
      else if (t.name === '体型·大型') mvMod += 1;
      else if (t.name === '体型·超大') mvMod += 2;
      else if (t.name === '体型·巨大') mvMod += 3;
      
      // Other Flat Modifiers
      else if (['天降死神', '隧道之子', '沙漠之狐', '虚空之速', '掠夺者狂潮'].includes(t.name)) mvMod += 2;
      
      // Special Formulas
      if (t.name === '飞行' || t.name === '超自然速度') {
        hasSpecialFormula = true;
        specialMV = Math.max(specialMV, Math.ceil((finalAttrs.agility || 0) / 5));
      } else if (t.name === '四足生物') {
        hasSpecialFormula = true;
        specialMV = Math.max(specialMV, Math.floor((finalAttrs.agility || 0) / 10) * 2);
      } else if (t.name === '无定形' || t.name === '腹足生物') {
        hasSpecialFormula = true;
        specialMV = Math.max(specialMV, Math.max(1, Math.floor((finalAttrs.agility || 0) / 20)));
      }

      // Multipliers
      if (['瘟疫坚毅', '腐败坚韧', '纳垢军团成员'].includes(t.name)) mvMultiplier *= 0.5;
    });

    let mv = hasSpecialFormula ? specialMV : mvBase;
    mv = Math.max(1, Math.floor((mv + mvMod) * mvMultiplier));

    const bmd = Math.max(0, Math.floor((finalAttrs.strength || 0) / 20));

    const remainingCurrency = Object.entries(budget.available)
      .filter((entry) => Number(entry[1]) > 0)
      .map(([k, v]) => `${v} ${k === 'throne' ? '王座币' : k === 'credits' ? '信用点' : k === 'requisition' ? '征用点' : k === 'souls' ? '灵魂' : '奴隶'}`)
      .join(', ') || '0 (资源耗尽)';

    const validSkills = skills.filter((s): s is Skill => s !== null);
    const validEquips = equipmentList.filter((i): i is ShopItem => i !== null);
    const ar = validEquips.reduce((sum, item) => sum + (item.stats?.ar ? parseInt(item.stats.ar) : 0), 0);
    const validItems = itemList.filter((i): i is ShopItem => i !== null);

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6 lg:space-y-8"
      >
        <div className="text-center mb-8 border-b border-zinc-900 pb-4">
          <h3 className="text-imperial-gold text-2xl md:text-3xl font-mono mb-2 uppercase tracking-[0.3em]">档案最终核准</h3>
          <p className="text-zinc-500 text-[10px] md:text-xs font-mono tracking-widest uppercase">Archival Compendium / Read-Only Display</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 border border-zinc-800 bg-zinc-950/50 space-y-4">
            <h4 className="text-sm text-slate-300 font-bold uppercase tracking-widest border-b border-zinc-800 pb-2 mb-4">身份识别 (Ident)</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              <div><span className="block text-[9px] text-zinc-500 uppercase">真名/头衔</span><span className="text-slate-100 font-mono">{name || '未指定'}</span></div>
              <div><span className="block text-[9px] text-zinc-500 uppercase">别名/称号</span><span className="text-slate-300 font-mono">{title || '无'}</span></div>
              <div><span className="block text-[9px] text-zinc-500 uppercase">母星/出生地</span><span className="text-slate-300 font-mono">{originWorld || '未知'}</span></div>
              <div><span className="block text-[9px] text-zinc-500 uppercase">性别</span><span className="text-slate-300 font-mono">{gender}</span></div>
              <div className="col-span-2">
                <span className="block text-[9px] text-zinc-500 uppercase font-black tracking-widest pb-1 border-b border-zinc-900/50 mb-1">出身阶层 / 社会认证 (RANK)</span>
                <span className="text-imperial-red font-mono font-black text-xs">{socialIdentity}</span>
              </div>
              
              {socialIdentity === '变种人' && mutantTrait && (
                <div className="col-span-2 mt-2 pt-2 border-t border-green-900/40 bg-green-950/10 p-2 border-dashed border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[8px] text-green-400 uppercase font-black tracking-widest">特化生理 [MUTATION_TYPE]</span>
                    <Dna size={12} className="text-green-500 animate-pulse" />
                  </div>
                  <div className="text-xs text-green-200 font-mono font-black uppercase">{mutantTrait}</div>
                </div>
              )}
              
              <div className="pt-2 border-t border-zinc-900/30 group relative cursor-help">
                <span className="block text-[9px] text-zinc-500 uppercase">信仰等级 (Faith)</span>
                <span className="text-amber-500 font-mono font-bold text-xs">{faithLevel}</span>
                
                {/* Faith Benefits Hover */}
                <div className="absolute left-0 bottom-full mb-2 w-64 p-4 bg-zinc-950 border-2 border-amber-900/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 font-mono pointer-events-none">
                  <div className="text-[10px] text-amber-600 font-black mb-2 tracking-widest border-b border-amber-900/50 pb-1">FAITH_PROTOCOLS_ACTIVE</div>
                  <ul className="space-y-2 text-[10px]">
                    {(!faithLevel || faithLevel <= 1) && <li className="text-zinc-600 italic">暂无积极信仰加成。</li>}
                    {faithLevel >= 2 && (
                      <li className="flex gap-2"><span className="text-amber-500">[LV2]</span> <span className="text-zinc-300">意志(WP) +5</span></li>
                    )}
                    {faithLevel >= 3 && (
                      <li className="flex gap-2"><span className="text-amber-500">[LV3]</span> <span className="text-zinc-300">意志(WP) +5 (累计+10)，解锁HP恢复。</span></li>
                    )}
                    {faithLevel >= 4 && (
                      <li className="flex gap-2"><span className="text-amber-500">[LV4]</span> <span className="text-zinc-300">意志(WP) +5 (累计+15)，腐化获取减半。</span></li>
                    )}
                    {faithLevel >= 5 && (
                      <li className="flex gap-2"><span className="text-amber-500">[LV5]</span> <span className="text-blue-400 font-black">【活圣人】全属性 +10，免疫恐惧。</span></li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="pt-2 border-t border-zinc-900/30">
                <span className="block text-[9px] text-zinc-500 uppercase">腐化值 (Corruption)</span>
                <span className="text-purple-500 font-mono font-bold text-xs">{corruptionValue}</span>
              </div>
              
              {isChaos && chaosBlessing && (
                <div className="col-span-2 mt-2 pt-2 border-t border-purple-900/40 bg-purple-950/10 p-2 border-dashed border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[8px] text-purple-400 uppercase font-black tracking-widest">亚空间馈赠 [WARP_GIFT_ACTIVE]</span>
                    <Sparkles size={10} className="text-purple-500 animate-pulse" />
                  </div>
                  <div className="text-xs text-purple-200 font-mono font-black uppercase">{chaosBlessing}</div>
                </div>
              )}
            </div>
          </div>

          <div className="p-5 border-2 border-zinc-900 bg-zinc-950/40 relative group">
            <div className="absolute top-0 right-0 p-1 opacity-20"><Shield size={12} /></div>
            <h4 className="text-[11px] text-zinc-400 font-black uppercase tracking-[0.2em] border-b border-zinc-800 pb-2 mb-4">履历与从属 (SERVICE_CERT)</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs font-mono">
              <div className="col-span-2">
                <span className="block text-[9px] text-zinc-600 uppercase mb-1">{isChaos ? '异端教义 / HERESY' : '志向教义 / DOCTRINE'}</span>
                <span className="text-zinc-300 leading-tight block">{alignment || '未申报'}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-[9px] text-zinc-600 uppercase mb-1">战团/编制 (UNIT_ID)</span>
                <span className="text-blue-500 font-black tracking-tight">{allegiance || lineage} {(subFaction && subFaction !== allegiance && subFaction !== lineage) ? `// ${subFaction}` : ''}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-[9px] text-zinc-600 uppercase mb-1">性格与倾向 (BEHAVIOR)</span>
                <span className="text-zinc-400">{personality}</span>
              </div>
              <div className="pt-2 border-t border-zinc-900/30 group relative cursor-help">
                <span className="block text-[9px] text-zinc-500 uppercase">信仰等级 (Faith)</span>
                <span className="text-amber-500 font-mono font-bold text-xs">{faithLevel}</span>

                {/* Faith Benefits Hover */}
                <div className="absolute left-0 bottom-full mb-2 w-64 p-4 bg-zinc-950 border-2 border-amber-900/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 font-mono pointer-events-none">
                  <div className="text-[10px] text-amber-600 font-black mb-2 tracking-widest border-b border-amber-900/50 pb-1">FAITH_PROTOCOLS_ACTIVE</div>
                  <ul className="space-y-2 text-[10px]">
                    {(!faithLevel || faithLevel <= 1) && <li className="text-zinc-600 italic">暂无积极信仰加成。</li>}
                    {faithLevel >= 2 && (
                      <li className="flex gap-2"><span className="text-amber-500">[LV2]</span> <span className="text-zinc-300">意志(WP) +5</span></li>
                    )}
                    {faithLevel >= 3 && (
                      <li className="flex gap-2"><span className="text-amber-500">[LV3]</span> <span className="text-zinc-300">意志(WP) +5 (累计+10)，解锁HP恢复。</span></li>
                    )}
                    {faithLevel >= 4 && (
                      <li className="flex gap-2"><span className="text-amber-500">[LV4]</span> <span className="text-zinc-300">意志(WP) +5 (累计+15)，腐化获取减半。</span></li>
                    )}
                    {faithLevel >= 5 && (
                      <li className="flex gap-2"><span className="text-amber-500">[LV5]</span> <span className="text-blue-400 font-black">【活圣人】全属性 +10，免疫恐惧。</span></li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="pt-2 border-t border-zinc-900/30">
                <span className="block text-[9px] text-zinc-500 uppercase">腐化程度 (Corruption)</span>
                <span className={`${corruptionValue > 0 ? 'text-purple-500' : 'text-zinc-500'} font-mono font-bold text-xs`}>{corruptionValue}</span>
              </div>
              {isChaos && (
                <div className="col-span-2 pt-2 border-t border-zinc-900/30">
                  <span className="block text-[9px] text-red-600 uppercase font-black tracking-tighter animate-pulse">混沌赐福 (CHAOS_BLESSING)</span>
                  <span className="text-red-500 font-mono font-bold text-xs">{chaosBlessing || '等待诸神抉择...'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border-2 border-zinc-900 bg-black/40 relative">
             <div className="absolute top-0 left-0 w-1 h-4 bg-zinc-800" />
             <h4 className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
               <Skull size={12} /> 服役/异端 档案记录 (EXE_SUMMARY)
             </h4>
             <p className="text-[11px] text-zinc-400 leading-relaxed font-mono whitespace-pre-wrap h-32 overflow-y-auto custom-scrollbar pr-2">{biography || '数据残缺，可能存在记忆删除...'}</p>
          </div>
          <div className="p-6 border-2 border-zinc-900 bg-black/40 relative">
             <div className="absolute top-0 left-0 w-1 h-4 bg-zinc-800" />
             <h4 className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
               <Activity size={12} /> 生理/表征 记录 (BIO_METRICS)
             </h4>
             <p className="text-[11px] text-zinc-400 leading-relaxed font-mono whitespace-pre-wrap h-32 overflow-y-auto custom-scrollbar pr-2">{appearance || '标准型号，无需特殊记录。'}</p>
          </div>
        </div>

        <div className="p-6 border-2 border-zinc-900 bg-zinc-950/60 relative">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-6">
             <h4 className="text-[11px] text-zinc-100 font-black uppercase tracking-[0.3em]">心智与生理特征矩阵 (ATTRIBUTES)</h4>
             <div className="text-[9px] text-zinc-600 font-mono uppercase">Reference: STC_STD_ATTR</div>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-9 gap-3 mb-8">
             {[
               { k: 'WS', v: finalAttrs.weaponSkill, color: 'text-red-500' },
               { k: 'BS', v: finalAttrs.ballisticSkill, color: 'text-orange-500' },
               { k: 'S', v: finalAttrs.strength, color: 'text-zinc-200' },
               { k: 'T', v: finalAttrs.toughness, color: 'text-emerald-500' },
               { k: 'Ag', v: finalAttrs.agility, color: 'text-sky-500' },
               { k: 'Int', v: finalAttrs.intelligence, color: 'text-indigo-400' },
               { k: 'Per', v: finalAttrs.perception, color: 'text-zinc-200' },
               { k: 'WP', v: finalAttrs.willpower, color: 'text-purple-500' },
               { k: 'Fel', v: finalAttrs.fellowship, color: 'text-zinc-400' },
             ].map(stat => (
               <div key={stat.k} className="p-3 border-2 border-zinc-900 bg-black/80 text-center relative group overflow-hidden">
                 <span className="block text-[8px] text-zinc-600 mb-1 uppercase font-black">{stat.k}</span>
                 <span className={`text-xl font-mono font-black ${stat.color}`}>{stat.v}</span>
                 <div className="absolute inset-0 bg-white opacity-[0.02] translate-y-full group-hover:translate-y-0 transition-transform pointer-events-none" />
               </div>
             ))}
          </div>
          
          <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 md:gap-6">
             <div className="p-4 border-2 border-red-900/30 bg-red-950/10 relative overflow-hidden">
                <div className="text-[9px] text-red-900 font-black uppercase mb-1">耐久值 (HP_POOL)</div>
                <div className="text-2xl text-red-600 font-black font-mono tracking-tighter">{hp} <span className="text-[10px] opacity-40 font-normal">pts</span></div>
                <Activity size={16} className="absolute bottom-2 right-2 text-red-900/20" />
             </div>
             <div className="p-4 border-2 border-blue-900/30 bg-blue-950/10 relative overflow-hidden">
                <div className="text-[9px] text-blue-900 font-black uppercase mb-1">护甲值 (ARMOR_VAL)</div>
                <div className="text-2xl text-blue-400 font-black font-mono tracking-tighter">{ar} <span className="text-[10px] opacity-40 font-normal">AR</span></div>
                <Shield size={16} className="absolute bottom-2 right-2 text-blue-900/20" />
             </div>
             <div className="p-4 border-2 border-indigo-900/30 bg-indigo-950/10 relative overflow-hidden">
                <div className="text-[9px] text-indigo-900 font-black uppercase mb-1">护甲耐久 (AHP_BUFF)</div>
                <div className="text-2xl text-indigo-400 font-black font-mono tracking-tighter">{ahp > 0 ? ahp : '0'} <span className="text-[10px] opacity-40 font-normal">pts</span></div>
                <Shield size={16} className="absolute bottom-2 right-2 text-indigo-900/20" />
             </div>
             <div className="p-4 border-2 border-emerald-900/30 bg-emerald-950/10 relative overflow-hidden">
                <div className="text-[9px] text-emerald-900 font-black uppercase mb-1">移动力 (MV_RATE)</div>
                <div className="text-2xl text-emerald-500 font-black font-mono tracking-tighter">{mv} <span className="text-[10px] opacity-40 font-normal">m/t</span></div>
                <Zap size={16} className="absolute bottom-2 right-2 text-emerald-900/20" />
             </div>
             <div className="p-4 border-2 border-amber-900/30 bg-amber-950/10 relative overflow-hidden">
                <div className="text-[9px] text-amber-900 font-black uppercase mb-1">基础近战 (B_MELEE)</div>
                <div className="text-2xl text-amber-500 font-black font-mono tracking-tighter">+{bmd}</div>
                <Box size={16} className="absolute bottom-2 right-2 text-amber-900/20" />
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 border-2 border-zinc-900 bg-zinc-950/40">
             <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-2">
                <span className="w-1.5 h-4 bg-zinc-700" />
                <h4 className="text-[11px] text-zinc-400 font-black uppercase tracking-widest">已解析特质 (TRAITS_PARSED)</h4>
             </div>
             <div className="flex flex-wrap gap-2">
               {allTraits.length > 0 ? allTraits.map((t, idx) => (
                 <div key={idx} className="group relative">
                   <div className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-mono uppercase tracking-tight hover:border-zinc-600 transition-colors cursor-default">
                     {t.name}
                   </div>
                   <div className="absolute left-0 bottom-full mb-3 w-72 p-4 bg-zinc-950 border-2 border-zinc-800 shadow-[0_30px_60px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] text-[10px] leading-relaxed text-zinc-400 font-mono backdrop-blur-md">
                     <div className="text-zinc-100 mb-2 font-black border-b border-zinc-800 pb-1">{t.name}</div>
                     {t.desc}
                   </div>
                 </div>
               )) : <span className="text-[10px] text-zinc-700 font-mono uppercase italic tracking-widest px-2">No active traits detected.</span>}
             </div>
          </div>
          
          <div className="p-6 border-2 border-zinc-900 bg-zinc-950/40">
             <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-2">
                <span className="w-1.5 h-4 bg-blue-900" />
                <h4 className="text-[11px] text-zinc-400 font-black uppercase tracking-widest">受训科目专精 (SKILLS_CERT)</h4>
             </div>
             <div className="flex flex-wrap gap-2">
               {validSkills.length > 0 ? validSkills.map((s, idx) => (
                 <div key={idx} className="group relative">
                   <div className="px-3 py-1.5 bg-blue-950/10 border border-blue-900/30 text-[10px] text-blue-300 font-mono uppercase tracking-tight hover:border-blue-700 transition-colors cursor-default">
                     {s.name} <span className="text-[9px] opacity-60 ml-1">LV.{s.level}</span>
                   </div>
                   <div className="absolute left-0 bottom-full mb-3 w-72 p-4 bg-zinc-950 border-2 border-blue-900/50 shadow-[0_30px_60px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] text-[10px] leading-relaxed text-zinc-400 font-mono backdrop-blur-md">
                     <div className="text-blue-100 mb-2 font-black border-b border-blue-900/30 pb-1 break-words whitespace-normal">{s.name} (LV.{s.level})</div>
                     <div className="break-words whitespace-pre-wrap">{s.description}</div>
                   </div>
                 </div>
               )) : <span className="text-[10px] text-zinc-700 font-mono uppercase italic tracking-widest px-2">No specialized skills registered.</span>}
             </div>
          </div>
        </div>

        <div className="p-6 border-2 border-zinc-900 bg-zinc-950/40 relative">
           <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-6">
              <div className="flex items-center gap-3">
                 <span className="w-1.5 h-4 bg-amber-700" />
                 <h4 className="text-[11px] text-zinc-100 font-black uppercase tracking-[0.3em]">军备资产与库存记录 (ARSENAL_LOG)</h4>
              </div>
              <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Remaining_Budget: <span className="text-amber-500 font-black">Ƶ {remainingCurrency}</span></div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
             <div>
                <h5 className="text-[9px] text-zinc-600 uppercase font-black mb-3 tracking-widest">01 // 配发装备项 (EQUIPMENT)</h5>
                <div className="flex flex-col gap-1.5">
                  {validEquips.length > 0 ? validEquips.map((e, idx) => (
                    <div key={idx} className="group relative px-3 py-2 bg-black/40 border border-zinc-900 hover:border-zinc-700 transition-all">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-zinc-300 uppercase tracking-tighter truncate max-w-[240px] font-black">{e.name}</span>
                        <div className="opacity-40 group-hover:opacity-100 transition-opacity"><Box size={10} className="text-zinc-600" /></div>
                      </div>
                      <div className="flex flex-wrap gap-x-2 gap-y-1">
                        {e.stats?.power && <span className="text-[8px] text-blue-400 font-mono">S:{e.stats.power}</span>}
                        {e.stats?.ap != null && <span className="text-[8px] text-teal-400 font-mono">AP:{e.stats.ap}</span>}
                        {e.stats?.damage && <span className="text-[8px] text-red-500 font-mono">D:{e.stats.damage}</span>}
                        {e.stats?.ar != null && <span className="text-[8px] text-teal-500 font-mono">AR:{e.stats.ar}</span>}
                        {e.stats?.hp && <span className="text-[8px] text-emerald-500 font-mono">AHP:{e.stats.hp}</span>}
                      </div>
                      <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-64 p-3 bg-zinc-950 border border-zinc-800 text-[9px] text-zinc-400 z-[110]">
                        {e.description || e.stats?.desc || '标准军品，无额外说明。'}
                      </div>
                    </div>
                  )) : <span className="text-[10px] text-zinc-800 uppercase px-2">Arsenal empty.</span>}
                </div>
             </div>
             <div>
                <h5 className="text-[9px] text-zinc-600 uppercase font-black mb-3 tracking-widest">02 // 个人补给库存 (SUPPLIES)</h5>
                <div className="flex flex-col gap-1.5">
                  {validItems.length > 0 ? validItems.map((i, idx) => (
                    <div key={idx} className="group relative px-3 py-2 bg-black/40 border border-zinc-900 hover:border-zinc-700 transition-all flex justify-between items-center">
                      <span className="text-[10px] text-zinc-300 uppercase tracking-tighter truncate max-w-[240px] font-black">{i.name}</span>
                      <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-64 p-3 bg-zinc-950 border border-zinc-800 text-[9px] text-zinc-400 z-[110]">
                        {i.description || i.desc || '常规物资项。'}
                      </div>
                    </div>
                  )) : <span className="text-[10px] text-zinc-800 uppercase px-2">No specialized supplies.</span>}
                </div>
             </div>
           </div>
        </div>

        <div className="mt-16 pt-10 border-t border-zinc-900/40 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-red-950/5 to-transparent pointer-events-none" />
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-20 relative z-10 grayscale group-hover:grayscale-0 transition-all duration-700">
              <div className="flex flex-col gap-1">
                 <div className="text-[9px] font-black uppercase text-zinc-400">Archival_Sync</div>
                 <div className="text-[12px] font-mono text-zinc-600">STATE: OPTIMAL</div>
              </div>
              <div className="flex flex-col gap-1">
                 <div className="text-[9px] font-black uppercase text-zinc-400">War_Protocol</div>
                 <div className="text-[12px] font-mono text-zinc-600">EDITION: 41.9.1</div>
              </div>
              <div className="flex flex-col gap-1">
                 <div className="text-[9px] font-black uppercase text-zinc-400">Relay_Node</div>
                 <div className="text-[12px] font-mono text-zinc-600">ID: GOTH_B09</div>
              </div>
              <div className="flex flex-col gap-1">
                 <div className="text-[9px] font-black uppercase text-zinc-400">Cyb_Integrity</div>
                 <div className="text-[12px] font-mono text-zinc-600">V_CHECK: PASS</div>
              </div>
           </div>
        </div>
      </motion.div>
    );
  };

  const renderPage9 = () => {
    const unitTypes = availableUnitTypes.length > 0 ? availableUnitTypes : [UnitType.LINE_INFANTRY];
    console.log("renderPage9 is being called.");
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-12"
      >
        <div className="flex justify-between items-start border-b-2 border-zinc-900 pb-6 mb-10 group">
          <div className="flex-1">
            <h3 className="text-imperial-red text-2xl font-mono tracking-[0.2em] uppercase flex items-center gap-3">
              <Cpu size={24} className="text-zinc-100" /> 编制与配属 [STRAT_LOG_v2]
            </h3>
            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mt-2 flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-red-600 animate-pulse" /> ADHERENCE TO GOTHIC SECTOR WAR PROTOCOL INITIATED
            </p>
          </div>
          <div className="text-right hidden md:block opacity-40">
            <div className="text-[9px] text-zinc-500 font-mono tracking-widest">DATA_ARCHIVE_REF: 41K_MIL_SYS_9</div>
            <div className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase">Encryption: High_Gothic_RSA</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-12 space-y-10">
            <div className="relative group">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-10 h-px bg-zinc-900" />
                 <label className="text-[12px] text-zinc-400 font-black uppercase tracking-[0.3em] whitespace-nowrap">01 // 指定战役区域 (LOC_SECTOR_MATRIX)</label>
                 <div className="h-px bg-zinc-900 flex-1" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                {HISTORICAL_PERIODS.map(s => {
                  const isActive = selectedSetting === s;
                  return (
                    <button type="button"
                      key={s}
                      onClick={() => setSelectedSetting(s as HistoricalPeriod)}
                      className={`relative group/btn p-0 transition-all text-left h-full ${isActive ? 'scale-[1.02] z-10' : 'hover:bg-zinc-900/10 opacity-60 hover:opacity-100'}`}
                    >
                      <div className={`p-2 sm:p-4 border-2 h-full transition-all relative overflow-hidden backdrop-blur-sm flex flex-col justify-between ${
                        isActive ? 'border-imperial-red bg-zinc-900/40 shadow-[0_0_20px_rgba(220,38,38,0.15)] ring-1 ring-red-900/20' : 'border-zinc-900 bg-black/60 hover:border-zinc-800'
                      }`}>
                        <div className="flex justify-between items-start mb-3">
                          <span className={`text-[9px] font-mono font-bold tracking-widest ${isActive ? 'text-imperial-red' : 'text-zinc-700'}`}>SEC_{HISTORICAL_PERIODS.indexOf(s).toString().padStart(2, '0')}</span>
                          {isActive && <Activity size={10} className="text-imperial-red animate-pulse" />}
                        </div>
                        <h5 className={`text-sm font-bold leading-normal ${isActive ? 'text-zinc-100' : 'text-zinc-500 group-hover/btn:text-zinc-400'}`}>
                          {(s as string).split(' (')[0]}
                        </h5>
                        
                        {isActive && (
                          <div className="absolute -right-2 -bottom-2 opacity-5 pointer-events-none">
                             <Box size={40} />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-10 h-px bg-zinc-900" />
                   <label className="text-[12px] text-zinc-400 font-black uppercase tracking-[0.3em] whitespace-nowrap">02 // 单位类型识别 (UNIT_ID)</label>
                   <div className="h-px bg-zinc-900 flex-1" />
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {unitTypes.map(t => {
                    const isActive = unitType === t;
                    const nameParts = t.split(' (');
                    const name = nameParts[0];
                    const meta = nameParts[1]?.replace(')', '') || 'STD';
                    return (
                      <button type="button"
                        key={t}
                        onClick={() => setUnitType(t)}
                        className={`relative group p-0 transition-all text-left ${isActive ? 'scale-[1.01]' : 'hover:translate-x-1'}`}
                      >
                         <div className={`p-5 border-2 flex gap-5 transition-all relative overflow-hidden backdrop-blur-sm ${
                           isActive ? 'border-imperial-red bg-zinc-900/40 shadow-[0_0_30px_rgba(220,38,38,0.05)]' : 'border-zinc-900 bg-black/60 hover:border-zinc-800'
                         }`}>
                            <div className={`w-12 h-12 flex-none border-2 flex items-center justify-center transition-colors ${
                              isActive ? 'border-imperial-red text-imperial-red' : 'border-zinc-800 text-zinc-800 group-hover:border-zinc-700 group-hover:text-zinc-600'
                            }`}>
                               {isActive ? <Check size={24} strokeWidth={3} /> : <div className="text-[10px] font-black">{meta.substring(0,3)}</div>}
                            </div>
                            <div className="min-w-0 flex-1">
                               <div className="flex justify-between items-baseline mb-2">
                                  <h4 className={`text-sm font-black uppercase tracking-widest transition-colors ${isActive ? 'text-zinc-100' : 'text-zinc-600 group-hover:text-zinc-400'}`}>{name}</h4>
                                  <span className={`text-[8px] font-mono tracking-tighter transition-colors ${isActive ? 'text-imperial-red' : 'text-zinc-800'}`}>IDENT://{meta || 'DEFAULT'}</span>
                               </div>
                               <p className={`text-[10px] font-mono leading-relaxed transition-colors ${isActive ? 'text-zinc-400' : 'text-zinc-700'}`}>
                                 {getUnitTypeDescriptions(isChaos)[t] || "DATA_MISSING: 无详细描述文件。"}
                               </p>
                            </div>
                         </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-10 h-px bg-zinc-900" />
                   <label className="text-[12px] text-zinc-400 font-black uppercase tracking-[0.3em] whitespace-nowrap">03 // 载具配属验证 (VEHICLE_CLASS)</label>
                   <div className="h-px bg-zinc-900 flex-1" />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {availableVehicles.map(v => {
                    const isActive = vehicleClass === v;
                    const nameParts = v.split(' (');
                    const name = nameParts[0];
                    const meta = nameParts[1]?.replace(')', '') || 'FOT';
                    return (
                      <button type="button"
                        key={v}
                        onClick={() => setVehicleClass(v)}
                        className={`relative group p-0 transition-all text-left ${isActive ? 'scale-[1.01]' : 'hover:translate-x-1'}`}
                      >
                         <div className={`p-3 sm:p-5 border-2 flex gap-3 sm:gap-5 transition-all relative overflow-hidden backdrop-blur-sm ${
                           isActive ? 'border-emerald-900/60 bg-emerald-950/20 border-dotted' : 'border-zinc-900 bg-black/60 hover:border-zinc-800'
                         }`}>
                            <div className={`w-12 h-12 flex-none border-2 flex items-center justify-center transition-colors ${
                              isActive ? 'border-emerald-600 text-emerald-600' : 'border-zinc-800 text-zinc-800 group-hover:border-zinc-700 group-hover:text-zinc-600'
                            }`}>
                               {isActive ? <Activity size={24} /> : <div className="text-[10px] font-black">{meta.substring(0,3)}</div>}
                            </div>
                            <div className="min-w-0 flex-1">
                               <div className="flex justify-between items-baseline mb-2">
                                  <h4 className={`text-sm font-black uppercase tracking-widest transition-colors ${isActive ? 'text-zinc-100' : 'text-zinc-600 group-hover:text-zinc-400'}`}>{name}</h4>
                                  <span className={`text-[8px] font-mono tracking-tighter transition-colors ${isActive ? 'text-emerald-900' : 'text-zinc-800'}`}>CLASS://{meta || 'DEFAULT'}</span>
                               </div>
                               <p className={`text-[10px] font-mono leading-relaxed transition-colors ${isActive ? 'text-zinc-400' : 'text-zinc-700'}`}>
                                 {getVehicleClassDescriptions(isChaos)[v] || "DATA_MISSING: 载具档案受限。"}
                               </p>
                            </div>
                         </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="relative mt-8 group pt-10">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-10 h-px bg-zinc-900" />
                 <label className="text-[12px] text-zinc-400 font-black uppercase tracking-[0.3em] whitespace-nowrap">{creationLexicon.phase9Label}</label>
                 <div className="h-px bg-zinc-900 flex-1" />
              </div>
              <div className="relative">
                <textarea
                  value={stageSettings}
                  onChange={(e) => setStageSettings(e.target.value)}
                  className={`w-full min-h-[220px] bg-black border-2 border-zinc-900 p-8 font-mono text-xs text-zinc-400 focus:border-red-900 focus:text-zinc-100 placeholder:text-zinc-800 transition-all tracking-tight leading-relaxed resize-none shadow-inner`}
                  placeholder={isCustomStage ? creationLexicon.customStagePlaceholder : creationLexicon.phase9Placeholder}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer Indicator */}
        <div className="mt-8 pt-6 border-t-2 border-zinc-900/50 flex justify-center opacity-30">
           <div className="text-[9px] font-mono text-zinc-700 flex gap-10">
              <div className="flex items-center gap-2 animate-pulse"><Skull size={10} /> UNIT_LOCK: ENGAGED</div>
              <div className="flex items-center gap-2"><Cpu size={10} /> DATA_STREAM: SYNCED</div>
              <div className="flex items-center gap-2"><Activity size={10} /> LIFE_SIGNS: OPTIMAL</div>
           </div>
        </div>
      </motion.div>
    );
  };


  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/98 overflow-y-auto overflow-x-hidden p-0 md:p-4 imperial-terminal">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      
      {/* Heavy Industrial Frame */}
      <div className="w-full max-w-full lg:max-w-7xl min-w-0 bg-black border-x-2 md:border-x-4 border-zinc-900 flex flex-col relative z-20 shadow-[0_0_100px_rgba(0,0,0,1)] ring-2 ring-zinc-800/10 min-h-[100dvh] md:min-h-[50vh] md:max-h-[95vh] my-auto">
        
        {/* Superior Status Bar */}
        <div className="flex justify-between items-center px-6 py-3 border-b-2 border-zinc-900 bg-zinc-950">
           <div className="flex items-center gap-2 md:gap-5 min-w-0">
              <div className={`w-10 h-10 md:w-12 md:h-12 border-2 flex items-center justify-center bg-black transform rotate-45 group flex-shrink-0 transition-all duration-700 ${creationLexicon.terminalColor}`}>
                 <div className="transform -rotate-45 group-hover:scale-110 transition-transform">
                    {isChaos ? <Skull size={20} className="animate-pulse md:w-6 md:h-6 w-4 h-4" /> : <Skull size={20} className="animate-pulse md:w-6 md:h-6 w-4 h-4" />}
                 </div>
              </div>
              <div className="min-w-0 flex-1">
                 <h2 className={`text-sm md:text-lg font-mono tracking-[0.1em] md:tracking-[0.4em] uppercase leading-none truncate w-full transition-colors ${isChaos ? 'text-red-500 glow-red' : 'text-imperial-gold'}`}>
                    {creationLexicon.header}
                    <span className="md:hidden ml-2 px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-400 font-bold font-mono tracking-tight inline-block align-middle rounded">
                       PHASE 0{page}/09
                    </span>
                 </h2>
                 <p className="text-[8px] md:text-[10px] text-zinc-600 font-mono uppercase tracking-widest mt-1.5 flex items-center gap-1 md:gap-2 truncate w-full">
                    <span className={`w-1.5 h-1.5 rounded-full animate-ping flex-shrink-0 ${isChaos ? 'bg-red-600' : 'bg-green-500'}`} />
                    <span className="truncate">{creationLexicon.statusText}</span>
                 </p>
              </div>
           </div>
           
           <div className="hidden md:flex flex-col items-end gap-2">
              <div className="flex gap-2">
                 {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(s => (
                    <div key={s} className="flex flex-col items-center gap-1">
                       <div className={`w-8 h-1 ${page >= s ? 'bg-imperial-red shadow-[0_0_10px_rgba(139,0,0,0.5)]' : 'bg-zinc-800/50'}`} />
                       <span className={`text-[8px] font-mono ${page === s ? 'text-imperial-gold' : 'text-zinc-700'}`}>0{s}</span>
                    </div>
                 ))}
              </div>
              <div className="px-2 py-0.5 border border-zinc-800 text-[9px] text-zinc-500 font-mono tracking-tighter">
                 RELAY SIGNAL ID: 0x82-FG-921
              </div>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 bg-zinc-950/20">
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 md:p-6 lg:p-8 space-y-6 md:space-y-10 custom-scrollbar">
            <div className={`mx-auto transition-all ${page >= 5 ? 'max-w-6xl' : 'max-w-5xl'}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-6 md:mb-10 flex items-center gap-2 md:gap-6 min-w-0">
                     <div className="h-px w-8 flex-none md:flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                     <h3 className="text-[10px] md:text-sm font-mono text-zinc-500 uppercase tracking-[0.2em] md:tracking-[0.5em] whitespace-nowrap truncate min-w-0">
                        {page === 1 && (isChaos ? "Phase 01: 誓约背离" : "Phase 01: 立场确立")}
                        {page === 2 && (isChaos ? "Phase 02: 亵渎之始" : "Phase 02: 势力隶属")}
                        {page === 3 && (isChaos ? "Phase 03: 亚空间印记" : "Phase 03: 身份辨识")}
                        {page === 4 && (isChaos ? "Phase 04: 堕落轨迹" : "Phase 04: 背景溯源")}
                        {page === 5 && (isChaos ? "Phase 05: 异变/扭曲指数" : "Phase 05: 生理/心智指数")}
                        {page === 6 && (isChaos ? "Phase 06: 黑暗赐福" : "Phase 06: 特长专精")}
                        {page === 7 && (isChaos ? "Phase 07: 掠夺整备" : "Phase 07: 资源整备")}
                        {page === 8 && (isChaos ? "Phase 08: 罪孽核查" : "Phase 08: 档案核查")}
                        {page === 9 && (isChaos ? "Phase 09: 毁灭降临" : "Phase 09: 协议生效")}
                     </h3>
                     <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                  </div>

                  {page === 1 && renderPage1()}
                  {page === 2 && renderPage2()}
                  {page === 3 && renderPage3()}
                  {page === 4 && renderPage4()}
                  {page === 5 && renderPage5()}
                  {page === 6 && renderPage6()}
                  {page === 7 && renderPage7()}
                  {page === 8 && renderPage8()}
                  {page === 9 && renderPage9()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Heavy Footer Bar */}
          <div className="p-4 md:p-8 border-t-2 border-zinc-900 bg-black flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="hidden lg:block">
               <div className="flex items-center gap-4 text-zinc-700 font-mono text-[9px] uppercase tracking-widest bg-zinc-900/20 px-4 py-2 border border-zinc-800/30">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-imperial-red animate-pulse rounded-full" />
                    <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
                    <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
                  </div>
                  <span>Archival Integrity: 99.8%</span>
                  <div className="h-3 w-px bg-zinc-800" />
                  <span>Sub-Process: Running</span>
               </div>
            </div>

            <div className="flex gap-3 md:gap-6 w-full lg:w-auto justify-between lg:justify-end">
              {page > 1 ? (
                <button type="button" 
                  key="prev-btn"
                  disabled={isAnyModalOpen}
                  onClick={() => setPage(page - 1)}
                  className={`group flex flex-col items-start ${isAnyModalOpen ? 'opacity-30 cursor-not-allowed grayscale' : ''}`}
                >
                  <span className="text-[8px] md:text-[9px] text-zinc-600 font-mono mb-1 uppercase">Abort Step</span>
                  <div className="px-4 md:px-8 py-2 md:py-3 bg-zinc-900 border-2 border-zinc-800 text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 font-mono text-[10px] md:text-xs uppercase tracking-widest transition-all">
                    上一步 [BACK]
                  </div>
                </button>
              ) : <div className="hidden lg:block w-32" />}

              {page < 9 ? (
                <button type="button" 
                  key="next-btn"
                  disabled={isAnyModalOpen}
                  onClick={() => {
                    console.log("Next button clicked. isAnyModalOpen:", isAnyModalOpen);
                    if (isAnyModalOpen) {
                      console.log("Modal is open, navigation blocked");
                      return;
                    }
                    if (page === 5 && (currentPoolUsed as number) > ((limits as any).pool as number)) {
                      alert(`自由属性点分配错误：您分配了 ${currentPoolUsed} 点，但点数池仅有 ${(limits as any).pool} 点。请削减分配。`);
                      return;
                    }
                    console.log("Incrementing page from:", page);
                    setPage(page + 1);
                    console.log("Page incremented to:", page + 1);
                  }} 
                  className={`group flex flex-col items-end ${isAnyModalOpen ? 'opacity-30 cursor-not-allowed grayscale' : ''}`}
                >
                  <span className={`text-[8px] md:text-[9px] font-mono mb-1 uppercase animate-pulse ${isChaos ? 'text-red-500' : 'text-imperial-red'}`}>{creationLexicon.navBtnText}</span>
                  <div className={`px-6 md:px-12 py-2 md:py-3 font-mono text-xs md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all flex items-center gap-2 md:gap-4 border-2 active:scale-95 ${
                    isChaos 
                      ? 'bg-red-950/40 text-red-500 border-red-900 shadow-[0_0_20px_rgba(153,27,27,0.2)] hover:bg-red-900/60 hover:text-red-100 hover:border-red-600' 
                      : 'bg-imperial-red text-white border-red-700 shadow-[0_0_30px_rgba(139,0,0,0.3)] hover:shadow-[0_0_40px_rgba(139,0,0,0.5)] hover:bg-red-800'
                  }`}>
                    <span>{creationLexicon.navBtn}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ) : (
                <button type="submit" 
                  key="submit-btn"
                  disabled={isAnyModalOpen}
                  className={`group flex flex-col items-end ${isAnyModalOpen ? 'opacity-30 cursor-not-allowed grayscale' : ''}`}
                >
                  <span className={`text-[8px] md:text-[9px] font-mono mb-1 uppercase animate-pulse ${isChaos ? 'text-purple-500' : 'text-imperial-gold'}`}>{creationLexicon.finalBtnText}</span>
                  <div className={`px-6 md:px-16 py-2 md:py-3 font-mono font-bold text-xs md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all flex items-center gap-2 md:gap-4 border-2 active:scale-95 ${
                    isChaos
                      ? 'bg-purple-950/40 text-purple-400 border-purple-900 shadow-[0_0_40px_rgba(88,28,135,0.3)] hover:bg-purple-900/60 hover:text-purple-100 hover:border-purple-600'
                      : 'bg-imperial-gold text-black border-amber-600 shadow-[0_0_50px_rgba(197,160,89,0.4)] hover:bg-amber-500'
                  }`}>
                    <Skull size={16} />
                    <span>{creationLexicon.finalBtn}</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </form>

      {/* Skill Selection Modal */}
      <AnimatePresence>
        {isSkillModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSkillModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-5xl bg-zinc-950 border-2 border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-6 border-b-2 border-red-950 flex justify-between items-center bg-black relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-red-900 shadow-[0_0_15px_rgba(153,27,27,0.5)]" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                     <div className="text-[9px] font-mono font-black text-red-700 tracking-[0.5em] uppercase">Auth_Req // Data_Link: Established</div>
                  </div>
                  <h3 className="text-2xl font-mono text-slate-100 flex items-center gap-4 font-black tracking-tighter uppercase">
                    配置技能受训指令集 <span className="text-zinc-800 font-normal">#</span>{selectedSlotIndex !== null ? (selectedSlotIndex + 1).toString().padStart(2, '0') : ''}
                  </h3>
                </div>
                <button type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="w-12 h-12 border border-zinc-900 flex items-center justify-center text-zinc-600 hover:text-white hover:border-red-600 hover:bg-red-900/10 transition-all font-mono group bg-zinc-900/10"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-16 bg-black relative custom-scrollbar">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                
                {(() => {
                  const targetSlot = selectedSlotIndex !== null ? skills[selectedSlotIndex] : null;
                  const isGreyKnightGlobal = (lineage || '').includes('灰骑士') || (subFaction || '').includes('灰骑士');
                  const isPsionicTalentOnly = (targetSlot?.isGrantedSelectable && targetSlot.grantedChoices === 'PSIONIC_TALENT') || (isGreyKnightGlobal && targetSlot?.name?.includes('灵能天赋'));
                  const isNegativePsykerOnly = (targetSlot?.isGrantedSelectable && targetSlot.grantedChoices === 'NEGATIVE_PSYKER');
                  const isAnyPsykerSlot = (targetSlot?.isGrantedSelectable && (targetSlot.grantedChoices === 'PSYKER' || targetSlot.grantedChoices === 'PSIONIC_TALENT' || targetSlot.grantedChoices === 'NEGATIVE_PSYKER')) || isPsionicTalentOnly || isNegativePsykerOnly;
                  const isFree = targetSlot?.isGrantedSelectable;

                  const applySkill = (skillData: Partial<Skill>) => {
                    if (skills.some(s => s && s.name === skillData.name && s.id !== targetSlot?.id)) {
                      alert(`错误：技能「${skillData.name}」已经在受训队列中。`);
                      return;
                    }

                    const newSkills = [...skills];
                    newSkills[selectedSlotIndex!] = {
                      ...skillData,
                      id: isFree && targetSlot ? targetSlot.id : Math.random().toString(36).substr(2, 9),
                      isGrantedSelectable: targetSlot?.isGrantedSelectable,
                      grantedSourceName: targetSlot?.grantedSourceName,
                      grantedChoices: targetSlot?.grantedChoices,
                    } as Skill;
                    setSkills(newSkills);
                    if (!isFree) {
                      setSkillPoints(prev => prev - 1);
                    }
                    setIsSkillModalOpen(false);
                  };

                  return (
                    <div className="relative z-10 space-y-16">
                      {/* Regular Skills */}
                      {!isAnyPsykerSlot && (
                        <section>
                          <div className="flex items-center gap-4 mb-8">
                            <div className="bg-red-900/20 p-2 border border-red-900/40">
                               <Zap className="text-red-600" size={20} />
                            </div>
                            <div className="flex flex-col">
                               <h4 className="text-lg font-black text-slate-100 uppercase tracking-[0.3em]">常规科目 <span className="text-zinc-700 text-xs ml-2 font-mono">[CLASS: MILITARY]</span></h4>
                               <div className="h-0.5 w-full bg-gradient-to-r from-red-900 to-transparent mt-1" />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {REGULAR_SKILLS_DATA.map((s) => {
                              const isAlreadySelected = skills.some(as => as && as.name === s.name && as.id !== targetSlot?.id);
                              const disabled = (!isFree && skillPoints < 1) || isAlreadySelected;
                              return (
                                <button
                                  key={s.name}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => {
                                    if (isFree || skillPoints >= 1) {
                                      applySkill({
                                        name: s.name,
                                        type: SkillType.REGULAR,
                                        level: 1,
                                        description: s.desc,
                                        stat: s.stat,
                                        isUpgradeable: true
                                      });
                                    }
                                  }}
                                  className={`group relative p-5 bg-zinc-950 border-2 text-left transition-all overflow-hidden flex flex-col min-h-[160px] ${
                                    disabled 
                                      ? 'border-zinc-900 opacity-30 grayscale cursor-not-allowed' 
                                      : 'border-zinc-800 hover:border-red-600 hover:bg-zinc-900 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] active:scale-[0.98]'
                                  }`}
                                >
                                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-zinc-800/10 to-transparent pointer-events-none" />
                                  <div className="absolute bottom-0 right-0 w-1 h-8 bg-zinc-900 group-hover:bg-red-600 transition-colors" />
                                  
                                  <div className="text-[8px] font-mono text-zinc-600 mb-2 tracking-widest uppercase flex items-center justify-between">
                                     <span>Ref_ID: SKL-{s.name.slice(0, 3).toUpperCase()}</span>
                                     <span className="text-red-900 font-black">X-41</span>
                                  </div>

                                  <div className={`text-base font-black uppercase mb-2 tracking-tight transition-colors ${isAlreadySelected ? 'text-zinc-700' : 'text-slate-100 group-hover:text-red-500'}`}>
                                    {s.name}
                                  </div>
                                  
                                  <div className="text-[11px] text-zinc-500 font-mono leading-tight mb-4 flex-1 pb-4">
                                     {s.desc}
                                  </div>

                                  <div className="flex justify-between items-center mt-auto border-t border-zinc-900 pt-3">
                                     <div className="flex gap-0.5">
                                        <div className="w-3 h-1 bg-red-950" />
                                        <div className="w-1 h-1 bg-red-950" />
                                     </div>
                                     <div className="text-[10px] text-zinc-600 font-mono font-black italic tracking-widest">
                                        LINKED_MOD: <span className={disabled ? 'text-zinc-800' : 'text-zinc-300'}>{s.stat}</span>
                                     </div>
                                  </div>
                                  <div className="absolute inset-y-0 left-0 w-[2px] bg-zinc-900 group-hover:bg-red-600 transition-colors" />
                                </button>
                              );
                            })}
                          </div>
                        </section>
                      )}

                      {/* Knowledge Skills */}
                      {!isAnyPsykerSlot && (
                        <section>
                          <div className="flex items-center gap-4 mb-8">
                            <div className="bg-blue-900/20 p-2 border border-blue-900/40">
                               <Book className="text-blue-500" size={20} />
                            </div>
                            <div className="flex flex-col">
                               <h4 className="text-lg font-black text-slate-100 uppercase tracking-[0.3em]">学术/知识档案 <span className="text-zinc-700 text-xs ml-2 font-mono">[CLASS: COGNIS]</span></h4>
                               <div className="h-0.5 w-full bg-gradient-to-r from-blue-900 to-transparent mt-1" />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {KNOWLEDGE_SKILLS_DATA.map((s) => {
                              const isAlreadySelected = skills.some(as => as && as.name === s.name && as.id !== targetSlot?.id);
                              const disabled = (!isFree && skillPoints < 1) || isAlreadySelected;
                              return (
                                <button
                                  key={s.name}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => {
                                    if (isFree || skillPoints >= 1) {
                                      applySkill({
                                        name: s.name,
                                        type: SkillType.KNOWLEDGE,
                                        level: 1,
                                        description: s.desc,
                                        isUpgradeable: false
                                      });
                                    }
                                  }}
                                  className={`group relative p-5 bg-zinc-950 border-2 text-left transition-all overflow-hidden flex flex-col min-h-[160px] ${
                                    disabled 
                                      ? 'border-zinc-900 opacity-30 grayscale cursor-not-allowed' 
                                      : 'border-zinc-800 hover:border-blue-600 hover:bg-zinc-900 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] active:scale-[0.98]'
                                  }`}
                                >
                                  <div className="text-[8px] font-mono text-zinc-600 mb-2 tracking-widest uppercase">Archive_Ref: {Math.floor(Math.random()*99999)}</div>
                                  
                                  <div className={`text-base font-black uppercase mb-2 tracking-tight transition-colors ${isAlreadySelected ? 'text-zinc-700' : 'text-slate-100 group-hover:text-blue-400'}`}>
                                    {s.name}
                                  </div>
                                  
                                  <p className="text-[11px] text-zinc-500 font-mono leading-relaxed flex-1 italic pb-4">
                                    {s.desc}
                                  </p>

                                  <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center">
                                     <div className="w-8 h-1 bg-blue-900/20" />
                                     <span className="text-[9px] font-mono text-zinc-700 font-black">STABILITY: 99%</span>
                                  </div>
                                  
                                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-zinc-800 group-hover:border-blue-600 transition-colors" />
                                </button>
                              );
                            })}
                          </div>
                        </section>
                      )}

                      {/* Faction Skills */}
                      {!isAnyPsykerSlot && (
                        <section>
                          <div className="flex items-center gap-4 mb-8">
                            <div className="bg-yellow-900/20 p-2 border border-yellow-900/40">
                               <Shield className="text-yellow-600" size={20} />
                            </div>
                            <div className="flex flex-col">
                               <h4 className="text-lg font-black text-slate-100 uppercase tracking-[0.3em]">阵营/禁忌协议 <span className="text-zinc-700 text-xs ml-2 font-mono">[CLASS: ORDO]</span></h4>
                               <div className="h-0.5 w-full bg-gradient-to-r from-yellow-900 to-transparent mt-1" />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {FACTION_SKILLS_DATA.filter(s => {
                              if (baseAlignment.includes('帝国') && s.faction === '人类帝国通用') return true;
                              if (baseAlignment.includes('混沌') && s.faction === '混沌诸神通用') return true;
                              if (s.faction === lineage) return true;
                              
                              if (mutantTrait) {
                                const mutantRace = mutantTrait === '愚钝蛮力' ? '欧格林' :
                                                  mutantTrait === '半身之巧' ? '莱特林' :
                                                  mutantTrait === '亚空间之眼' ? '导航者' :
                                                  mutantTrait === '野兽之躯' ? '野兽人' : null;
                                if (mutantRace && s.faction === mutantRace) return true;
                              }
                              
                              return false;
                            }).map((s) => {
                              const isAlreadySelected = skills.some(as => as && as.name === s.name && as.id !== targetSlot?.id);
                              const disabled = (!isFree && skillPoints < 1) || isAlreadySelected;
                              return (
                                <button
                                  key={s.name}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => {
                                    if (isFree || skillPoints >= 1) {
                                      applySkill({
                                        name: s.name,
                                        type: SkillType.FACTION,
                                        level: 1,
                                        description: s.desc,
                                        isUpgradeable: s.isUpgradeable,
                                        maxLevel: s.maxLevel,
                                        traitChoices: (s as any).traitChoices
                                      });
                                    }
                                  }}
                                  className={`group relative p-5 bg-zinc-950 border-2 text-left transition-all overflow-hidden flex flex-col min-h-[160px] ${
                                    disabled 
                                      ? 'border-zinc-900 opacity-30 grayscale cursor-not-allowed' 
                                      : 'border-zinc-800 hover:border-yellow-600 hover:bg-zinc-900 shadow-[0_10px_40px_rgba(0,0,0,0.5)] active:scale-[0.98]'
                                  }`}
                                >
                                  <div className="text-[8px] font-mono text-zinc-600 mb-2 tracking-[0.3em] uppercase">{s.faction || 'ORIGIN_CHOICE'}</div>
                                  
                                  <div className={`text-base font-black uppercase mb-2 tracking-tight transition-colors ${isAlreadySelected ? 'text-zinc-700' : 'text-slate-100 group-hover:text-yellow-500'}`}>
                                    {s.name}
                                  </div>
                                  
                                  <p className="text-[11px] text-zinc-500 font-mono leading-relaxed flex-1 pb-4">
                                     {s.desc}
                                  </p>

                                  <div className="flex justify-between items-center pt-3 border-t border-zinc-900">
                                     <div className="flex gap-1">
                                        <div className="w-1 h-3 bg-yellow-900/50" />
                                        <div className="w-1 h-3 bg-yellow-900/30" />
                                     </div>
                                     <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Gene_Locked</span>
                                  </div>

                                  <div className="absolute top-0 right-0 w-12 h-1 bg-[repeating-linear-gradient(45deg,#451a03,#451a03_5px,#000_5px,#000_10px)]" />
                                </button>
                              );
                            })}
                          </div>
                        </section>
                      )}

                      {/* Psyker Talents */}
                      <section>
                        <div className="flex items-center gap-4 mb-8">
                          <div className="bg-purple-900/20 p-2 border border-purple-900/40">
                             <Brain className="text-purple-600" size={20} />
                          </div>
                          <div className="flex flex-col">
                             <h4 className="text-lg font-black text-slate-100 uppercase tracking-[0.3em]">灵能/变异矩阵 <span className="text-zinc-700 text-xs ml-2 font-mono">[CLASS: AETHER]</span></h4>
                             <div className="h-0.5 w-full bg-gradient-to-r from-purple-900 to-transparent mt-1" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {PSYKER_SKILLS_DATA.filter(s => {
                            const isPsionicTalentOnlyLoc = (targetSlot?.isGrantedSelectable && targetSlot.grantedChoices === 'PSIONIC_TALENT') || (isGreyKnightGlobal && targetSlot?.name?.includes('灵能天赋'));
                            const isNegativePsykerOnlyLoc = (targetSlot?.isGrantedSelectable && targetSlot.grantedChoices === 'NEGATIVE_PSYKER');
                            if (isPsionicTalentOnlyLoc) {
                              return s.isTalent && !s.isNegativePsyker;
                            }
                            if (isNegativePsykerOnlyLoc) {
                              return s.isNegativePsyker && ['灵能压制者', '灵魂瓦解者', '灵魂湮灭者'].includes(s.name);
                            }
                            // Grey Knights can NEVER pick negative psyker skills
                            if (isGreyKnightGlobal && s.isNegativePsyker) return false;
                            return true;
                          }).map((s) => {
                            const isAlreadySelected = skills.some(as => as && as.name === s.name && as.id !== targetSlot?.id);
                            
                            const isGreyKnightStatus = (lineage || '').includes('灰骑士') || (subFaction || '').includes('灰骑士');
                            
                            const hasNegativePsykerGlobal = skills.some(activeSkill => activeSkill?.type === SkillType.PSYKER && activeSkill.isNegativePsyker && activeSkill.id !== targetSlot?.id);
                            const hasPositivePsykerGlobal = skills.some(activeSkill => activeSkill?.type === SkillType.PSYKER && !activeSkill.isNegativePsyker && activeSkill.id !== targetSlot?.id);
                            const hasPositiveTalentGlobal = skills.some(activeSkill => activeSkill?.type === SkillType.PSYKER && !activeSkill.isNegativePsyker && activeSkill.isTalent && activeSkill.id !== targetSlot?.id);
                            const hasNegativeTalentGlobal = skills.some(activeSkill => activeSkill?.type === SkillType.PSYKER && activeSkill.isNegativePsyker && activeSkill.isTalent && activeSkill.id !== targetSlot?.id);
                            
                            let isDisabledDueToExclusivity = false;
                            
                            const isCurrentNegative = !!s.isNegativePsyker;
                            const isCurrentTalent = !!s.isTalent;
                            
                            if (isCurrentNegative && (hasPositivePsykerGlobal || isGreyKnightStatus)) {
                              isDisabledDueToExclusivity = true;
                            } else if (!isCurrentNegative && (hasNegativePsykerGlobal || (lineage || '').includes('寂静修女会'))) {
                              isDisabledDueToExclusivity = true;
                            } else if (isCurrentTalent && !isCurrentNegative && hasPositiveTalentGlobal) {
                              isDisabledDueToExclusivity = true;
                            } else if (isCurrentTalent && isCurrentNegative && hasNegativeTalentGlobal) {
                              isDisabledDueToExclusivity = true;
                            }
                            
                            if (isPsionicTalentOnly && (!isCurrentTalent || isCurrentNegative)) {
                              isDisabledDueToExclusivity = true;
                            }
                            if (isNegativePsykerOnly && (!isCurrentTalent || !isCurrentNegative)) {
                              isDisabledDueToExclusivity = true;
                            }
                            
                            const disabled = (!isFree && skillPoints < 1) || isDisabledDueToExclusivity || isAlreadySelected;

                            return (
                              <button
                                key={s.name}
                                type="button"
                                disabled={disabled}
                                onClick={() => {
                                  if (isFree || skillPoints >= 1) {
                                    applySkill({
                                      name: s.name,
                                      type: SkillType.PSYKER,
                                      level: 1,
                                      description: s.desc,
                                      isUpgradeable: !!(s as any).isUpgradeable,
                                      isTalent: (s as any).isTalent,
                                      isNegativePsyker: (s as any).isNegativePsyker,
                                      pr: s.pr as number,
                                      nr: (s as any).nr as number,
                                      imperialClassification: (s as any).class,
                                      riskLevel: (s as any).risk
                                    });
                                  }
                                }}
                                className={`group relative p-5 bg-zinc-950 border-2 text-left transition-all overflow-hidden flex flex-col min-h-[160px] ${
                                  disabled 
                                    ? 'border-zinc-900 opacity-30 grayscale cursor-not-allowed' 
                                    : `border-zinc-800 hover:border-purple-600 hover:bg-zinc-900 shadow-[0_0_40px_rgba(126,34,206,0.05)] active:scale-[0.98]`
                                }`}
                              >
                                {isCurrentTalent && (
                                   <div className={`absolute top-0 right-0 px-2 py-0.5 text-[8px] text-white font-black uppercase tracking-tighter ${isCurrentNegative ? 'bg-zinc-800' : 'bg-purple-900'}`}>
                                      天赋
                                   </div>
                                )}
                                <div className="text-[8px] font-mono text-zinc-600 mb-2 tracking-widest uppercase">EM_WAVE: {Math.random().toString(16).slice(2, 6).toUpperCase()}</div>
                                <div className={`text-base font-black uppercase mb-2 tracking-tight transition-colors ${isAlreadySelected ? 'text-zinc-700' : (isCurrentNegative ? 'text-slate-100 group-hover:text-zinc-400' : 'text-slate-100 group-hover:text-purple-400')}`}>
                                  {s.name}
                                </div>
                                <div className="text-[11px] text-zinc-500 font-mono leading-relaxed pb-4 flex-1">
                                   {s.desc}
                                </div>
                                <div className="flex justify-between items-center mt-auto border-t border-zinc-900 pt-3">
                                   <div className={`w-3 h-3 rotate-45 border ${isCurrentNegative ? 'border-zinc-800' : 'border-purple-900'}`} />
                                   <div className="text-[10px] text-zinc-600 font-mono font-black italic">
                                      {isCurrentNegative ? 'NEGATIVE_RATING' : 'PSY_RATING'}: <span className="text-zinc-200">{(s as any).nr || s.pr || '0'}</span>
                                   </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </section>
                    </div>
                  );
                })()}
              </div>

              {/* Status Footer */}
              <div className="p-8 border-t-2 border-zinc-900 bg-black flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-950/5 pointer-events-none" />
                <div className="flex items-center gap-10 relative z-10">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">受训配额剩余</span>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-5xl font-mono font-black tabular-nums transition-colors ${skillPoints === 0 ? 'text-zinc-800 font-normal outline-text' : 'text-red-700'}`}>
                           {skillPoints.toString().padStart(2, '0')}
                        </span>
                        <span className="text-zinc-800 text-[10px] font-black uppercase">Units_Available</span>
                      </div>
                   </div>
                   <div className="hidden lg:flex flex-col gap-1 max-w-sm">
                      <div className="text-[10px] text-zinc-500 font-mono leading-relaxed italic">
                        注意：所有受训指令均由机械教神甫监察。非正常中断可能导致受试者神经元烧毁。请确保持续链接。
                      </div>
                   </div>
                </div>

                <div className="flex gap-4 relative z-10">
                   <button type="button"
                     onClick={() => setIsSkillModalOpen(false)}
                     className="px-12 py-4 bg-zinc-900 border-2 border-zinc-800 text-zinc-500 font-black uppercase text-xs tracking-[0.4em] hover:bg-zinc-800 hover:text-white transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                   >
                     中断 UPLINK
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
        
      {/* Trait Selection Modal */}
      <AnimatePresence>
        {isTraitSelectionModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsTraitSelectionModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-700  shadow-2xl overflow-hidden flex flex-col max-h-[80vh] z-50"
            >
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                <h3 className="text-xl font-mono text-slate-100 flex items-center gap-2">
                  <Star size={20} className="text-yellow-500" />
                  分支项选择 (Traits)
                </h3>
                <button type="button"
                  onClick={() => setIsTraitSelectionModalOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-white transition-colors hover:bg-white/5 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-slate-900">
                {(() => {
                  const targetSlot = selectedSlotIndex !== null ? skills[selectedSlotIndex] : null;
                  if (!targetSlot || !targetSlot.traitChoices) return null;
                  
                  const requiredSelects = targetSlot.level;
                  const currentSelected = targetSlot.selectedTraits || [];
                  const remainingSelects = requiredSelects - currentSelected.length;

                  return (
                    <>
                      <div className="mb-4 text-sm text-slate-300">
                        基于当前的专精深度，
                        您可以为该向能力匹配 <span className="text-yellow-400 font-bold">{requiredSelects}</span> 个附加特质。
                        尚余 <span className="text-yellow-400 font-bold">{remainingSelects}</span> 个待分配
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {targetSlot.traitChoices.map(traitName => {
                          const isSelected = currentSelected.includes(traitName);
                          
                          // Hierarchical & Exclusion Logic
                          const ownedTraitNames = derivedTraits.map(t => t.name);
                          const hasMechanizedAny = ownedTraitNames.some(n => n.includes('机械化')) || currentSelected.some(n => n.includes('机械化'));
                          const hasRegenAny = ownedTraitNames.some(n => n.includes('再生')) || currentSelected.some(n => n.includes('再生'));

                          const hasMechanized1 = ownedTraitNames.includes('机械化·初级') || currentSelected.includes('机械化·初级');
                          const hasMechanized2 = ownedTraitNames.includes('机械化·中级') || currentSelected.includes('机械化·中级');
                          
                          const hasRegen1 = ownedTraitNames.includes('再生·初级') || currentSelected.includes('再生·初级');
                          const hasRegen2 = ownedTraitNames.includes('再生·中级') || currentSelected.includes('再生·中级');

                          const alreadyOwned = ownedTraitNames.includes(traitName) && !currentSelected.includes(traitName);

                          let isLocked = false;
                          let lockReason = "";
                          
                          if (alreadyOwned) {
                            isLocked = true;
                            lockReason = "已拥有此特质";
                          } 
                          // Mechanized hierarchy
                          else if (traitName === '机械化·中级' && !hasMechanized1) {
                            isLocked = true;
                            lockReason = "需先拥有「机械化·初级」";
                          } else if (traitName === '机械化·高级' && !hasMechanized2) {
                            isLocked = true;
                            lockReason = "需先拥有「机械化·中级」";
                          }
                          // Regeneration hierarchy
                          else if (traitName === '再生·中级' && !hasRegen1) {
                            isLocked = true;
                            lockReason = "需先拥有「再生·初级」";
                          } else if (traitName === '再生·高级' && !hasRegen2) {
                            isLocked = true;
                            lockReason = "需先拥有「再生·中级」";
                          }
                          // Mutual Exclusion: Mechanized vs Regeneration
                          else if (traitName.includes('再生') && hasMechanizedAny) {
                            isLocked = true;
                            lockReason = "机械之躯排斥生物再生";
                          } else if (traitName.includes('机械化') && hasRegenAny) {
                            isLocked = true;
                            lockReason = "超强再生抑制机械植入";
                          }

                          const isDisabled = (!isSelected && remainingSelects === 0) || isLocked;
                          const traitData = TRAIT_CATALOG[traitName];

                          return (
                            <button
                              key={traitName}
                              type="button"
                              disabled={isDisabled}
                              onClick={() => {
                                const newSkills = [...skills];
                                let newSelected = [...currentSelected];
                                if (isSelected) {
                                  newSelected = newSelected.filter(t => t !== traitName);
                                  // Auto-remove descendants if parent is removed
                                  if (traitName === '机械化·初级') {
                                    newSelected = newSelected.filter(t => t !== '机械化·中级' && t !== '机械化·高级');
                                  } else if (traitName === '机械化·中级') {
                                    newSelected = newSelected.filter(t => t !== '机械化·高级');
                                  }
                                  
                                  if (traitName === '再生·初级') {
                                    newSelected = newSelected.filter(t => t !== '再生·中级' && t !== '再生·高级');
                                  } else if (traitName === '再生·中级') {
                                    newSelected = newSelected.filter(t => t !== '再生·高级');
                                  }
                                } else if (remainingSelects > 0) {
                                  newSelected.push(traitName);
                                }
                  newSkills[selectedSlotIndex!] = { 
                    ...targetSlot, 
                    selectedTraits: newSelected,
                    id: targetSlot.id || `skill_${selectedSlotIndex}`,
                    description: targetSlot.description || '',
                    isUpgradeable: targetSlot.isUpgradeable || false
                  } as Skill;
                                setSkills(newSkills);
                              }}
                              className={`group relative p-3 border  text-left transition-all ${
                                isSelected
                                  ? 'border-yellow-500 bg-yellow-950/40 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                                  : isDisabled
                                    ? 'border-slate-800 bg-slate-950/50 opacity-50 cursor-not-allowed'
                                    : 'border-slate-700 bg-slate-800 hover:border-yellow-600/50 hover:bg-slate-800/80'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <div className={`font-bold transition-colors ${isSelected ? 'text-yellow-400' : 'text-slate-200 group-hover:text-yellow-400'}`}>
                                  {traitName}
                                  {isLocked && <span className="text-[9px] block text-red-500 font-normal">{lockReason}</span>}
                                </div>
                                {isSelected && <div className="text-yellow-500"><Check size={16} /></div>}
                              </div>
                              <div className="text-[10px] text-slate-400 line-clamp-2">
                                {traitData?.desc || '特质效果'}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end items-center">
                <Button variant="secondary" onClick={() => setIsTraitSelectionModalOpen(false)}>
                  完成
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default CharacterCreation;

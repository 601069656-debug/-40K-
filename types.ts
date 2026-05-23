
export enum Role {
  WARLORD = '战帅/指挥官 (Commander)',
  OFFICER = '军官/军士 (Officer)',
  STRATEGIST = '政委/灵能者 (Specialist)',
  CIVILIAN = '平民/教徒 (Operative)'
}

export enum UnitType {
  LINE_INFANTRY = '线列步兵 (Line Infantry)',
  SHOCK_TROOPS = '突击步兵 (Shock Troops)',
  ASTARTES = '星际战士 (Adeptus Astartes)',
  SPECIALIST = '特战/专家 (Specialist)',
  OFFICER_COMMAND = '指挥官/统帅 (Command/Officer)',
  PSYKER_ELITE = '灵能者/精英 (Psyker/Elite)',
  SQUAD_OPERATIVE = '小队特工 (Squad Operative)',
  UNKNOWN = '未知/其他 (Unknown/Other)'
}

export enum VehicleClass {
  NONE = '无载具 (On Foot)',
  TRANSPORT = '运输载具 (Transport)',
  SCOUT = '侦察/轻型 (Scout)',
  BATTLE_TANK = '主战坦克 (Main Battle Tank)',
  HEAVY_ASSAULT = '重型突击 (Heavy Assault)',
  WALKER = '机甲 (Walker)',
  AIRCRAFT = '空天飞艇 (Aircraft)'
}

export enum HistoricalPeriod {
  GOTHIC_WAR = '哥特舰队之战 (Gothic War)',
  HORUS_HERESY = '荷鲁斯之乱 (Horus Heresy)',
  BLACK_CRUSADE = '黑色远征 (Black Crusade)',
  BADAB_WAR = '巴达布战争 (Badab War)',
  ARMAGEDDON = '阿米吉多顿战役 (Armageddon)',
  FALL_OF_CADIA = '卡迪亚之陨 (Fall of Cadia)',
  INDOMITUS_CRUSADE = '不屈远征 (Indomitus Crusade)',
  TEMPESTUS_WAR = '暴风星域之战 (Tempestus)',
  DARK_IMPERIUM = '暗面帝国 (Imperium Nihilus)',
  END_TIMES = '终焉之时 (The End Times)',
  CUSTOM = '自定义战区 (Custom Warzone)'
}

export enum SkillType {
  REGULAR = '常规技能 (Regular)',
  KNOWLEDGE = '知识技能 (Knowledge)',
  PSYKER = '灵能技能 (Psyker)',
  FACTION = '阵营派系技能 (Faction)'
}

export interface Skill {
  id: string;
  name: string;
  type: SkillType;
  level: number; 
  description: string;
  stat?: string;
  isUpgradeable: boolean;
  maxLevel?: number;
  traitChoices?: string[];
  selectedTraits?: string[];
  isTalent?: boolean; 
  isNegativePsyker?: boolean; 
  pr?: number; 
  nr?: number; 
  imperialClassification?: string; 
  riskLevel?: number; 
  isGrantedFixed?: boolean;
  isGrantedSelectable?: boolean;
  grantedSourceName?: string;
  grantedChoices?: string | string[]; // Can be array of weapons or string keyword
  faction?: string;
}

export interface TraitData {
  name: string;
  owner?: string;
  desc?: string;
  effect?: string; // Kept for compatibility
  grantedSkills?: { name: string; selectable: boolean }[];
  grantedTraits?: string[];
  source?: string; // Added to match CharacterCreation usage
}

export interface Character {
  name: string;
  title?: string; // 头衔/荣誉称号 (e.g., 级审判官, 战团先行者)
  originWorld?: string; // 出身星际/星系 (e.g., 泰拉, 马库拉格)
  gender: string;
  age: string;
  appearance: string; // 仪表描述
  biography?: string; // 个人志/生平摘要
  experience: number; // 经验点
  
  // 核心属性
  socialIdentity: string; // 出身背景 (e.g., 巢都出身, 虚空之子, 贵族世家)
  lineage?: string; // 战团/家族/血脉
  alignment: string; // 忠诚目标 (e.g., 效忠帝皇, 追求升变, 守护战团)
  personality: string; // 性格特征
  subFaction?: string; // 战团/子派系 (Chapter/Sub-faction)
  traits?: TraitData[]; // 特质
  
  // 能力参数 (九项基本属性)
  attributes: {
    weaponSkill: number;    // WS - 武器技能 (Weapon Skill)
    ballisticSkill: number; // BS - 射击技能 (Ballistic Skill)
    strength: number;       // S - 力量 (Strength)
    toughness: number;      // T - 坚韧 (Toughness)
    agility: number;        // Ag - 敏捷 (Agility)
    intelligence: number;   // Int - 智力 (Intelligence)
    perception: number;     // Per - 感知 (Perception)
    willpower: number;      // WP - 意志 (Willpower)
    fellowship: number;     // Fel - 社交 (Fellowship)
  };
  specialty?: string; // 特性/战技
  psykerAbilities?: string; // 灵能/亚空间特性
  geneticTraits?: string; // 基因组/突变特性
  faithLevel?: number; // 信仰等级 (1-5)
  corruptionValue?: number; // 腐化值 (上不封顶)
  chaosBlessing?: string | null; // 混沌赐福
  unitType: UnitType; // 隶属单位类型
  vehicleClass: VehicleClass; // 配属载具/支援等级
  tactics?: string; // 战术策略
  politicalInfluence?: string; // 政治影响力
  
  // 地势与资源
  prestige: number; // 声望/奉献度 (0-100)
  allegiance?: string; // 归属势力 (若为流浪则为空)
  territory?: string; // 领地/驻地/控区
  forces?: string; // 部队规模/军团人数
  funds?: string; // 王座币 (Throne Gelt)
  provisions?: string; // 补给 (Supplies)
  popularity?: string; // 忠诚度 (Compliance)
  bond?: string; // 信任度/忠诚等级
  
  // 动态生成的物品库 (Synthetic Items)
  syntheticItems?: ShopItem[];
  
  // 实时状态
  hp: string;
  skills: Skill[];
  equipment?: string[]; // 装备位 (12 slots)
  items?: string[]; // 物品位 (12 slots)
  currentStatus?: string; // 当前状态
  coreIntent?: string; // 部署/行动意图
  setting: HistoricalPeriod; // 战区设置
}

export interface ShopItem {
  id: string;
  name: string;
  level: number;
  category: string;
  count?: number; // Added to support CharacterCreation shopping logic
  costs: {
    throne?: number;
    credits?: number;
    requisition?: number;
    souls?: number;
    slaves?: number;
    free?: number;
  };
  desc?: string;
  paidWith?: 'throne' | 'credits' | 'requisition' | 'souls' | 'slaves';
  isGrantedSelectable?: boolean;
  grantedChoices?: string[];
  stats?: {
    power?: string;
    damage?: string;
    toughness?: string;
    hp?: string;
    mod?: string;
    wearer?: string;
    type?: string;
    desc?: string;
    description?: string;
    capacity?: string;
    rateOfFire?: string;
    ap?: string;
    ar?: string;
  };
  modes?: {
    name: string;
    stats: NonNullable<ShopItem['stats']>;
  }[];
  description?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  isStreaming?: boolean;
  groundingMetadata?: {
    searchQueries?: string[];
    groundingChunks?: {
      web?: {
        uri: string;
        title: string;
      };
    }[];
  };
  snapshot?: {
    gaiaState?: GaiaState;
    npcProfiles?: NPCProfile[];
    logs?: LogSummary[];
    character?: Character;
  };
  upgradeRefund?: {
    xp: number;
    attributes: Record<string, number>;
    skills: Record<string, number>;
  };
  xpChange?: number;
}

export enum GameStatus {
  START_MENU = 'START_MENU',
  CREATION = 'CREATION',
  STAGE_SETUP = 'STAGE_SETUP',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER'
}

export interface NPCRecord {
  id: string;
  content: string; // Event description or dialogue
  timestamp: string; // Time from the story
  location?: string; // Place from the story
}

export interface NPCProfile {
  id?: string;
  name: string;
  originWorld?: string; // 出身星际/星系 (e.g., 泰拉, 马库拉格)
  hasAppeared?: boolean; // 是否登场（与主角相遇）
  appearanceTime?: string; // 登场时间
  appearanceLocation?: string; // 登场地点
  aiGeneratedRecord?: string; // AI 自动更新的记录
  userNotes?: string; // 玩家手动补充/修正的记录
  status: string; // 参数状态 (Parameters, Troop, etc.)
  attributes?: {
    weaponSkill: number;    // WS - 武器技能 (Weapon Skill)
    ballisticSkill: number; // BS - 射击技能 (Ballistic Skill)
    strength: number;       // S - 力量 (Strength)
    toughness: number;      // T - 坚韧 (Toughness)
    agility: number;        // Ag - 敏捷 (Agility)
    intelligence: number;   // Int - 智力 (Intelligence)
    perception: number;     // Per - 感知 (Perception)
    willpower: number;      // WP - 意志 (Willpower)
    fellowship: number;     // Fel - 社交 (Fellowship)
  };
  parameters?: string; // Legacy/Display name for parameters
  trait?: string; // Legacy field
  traits?: TraitData[]; // New structured traits
  skill?: string; // 技能
  lineage?: string; // 战团/家族/血脉
  biography?: string; // 个人生平
  equipment?: string; // 装备
  items?: string; // 物品
  tags: string[]; // Small tags for efficiency
  isImportant?: boolean; // 是否为重要NPC/首领。杂兵、量产型敌人、路人设为 false
  records?: NPCRecord[]; // History of interactions
  hiddenNotes?: string; // Internal state/event flags for AI (e.g. [Captured: True])
  lastUpdated?: number;
  isTrueNameUnlocked?: boolean;
  bondLevel?: number; // 0-5
  resistance?: 'Low' | 'Medium' | 'High' | 'Extreme';
  nextMilestone?: string;

  // Combat Stats (New)
  hp?: number;
  maxHp?: number;
  ahp?: number; // Armor Durability
  armorRating?: number; // Armor Rating
  movement?: number;
  baseMeleeDamage?: string;
  weaponStats?: string; 
}

export interface GameEvent {
  title: string;
  description: string;
  dialogues: string[];
  notes?: string;
}

export interface DayEvents {
  date: string;
  time?: string;
  location?: string;
  events: GameEvent[];
}

export interface NPCUpdate {
  name: string;
  originWorld?: string;
  placeId: string;
  isMajorEvent: boolean;
  recordUpdate: string;
  isNew: boolean;
  status?: string;
  attributes?: {
    weaponSkill: number;    // WS - 武器技能 (Weapon Skill)
    ballisticSkill: number; // BS - 射击技能 (Ballistic Skill)
    strength: number;       // S - 力量 (Strength)
    toughness: number;      // T - 坚韧 (Toughness)
    agility: number;        // Ag - 敏捷 (Agility)
    intelligence: number;   // Int - 智力 (Intelligence)
    perception: number;     // Per - 感知 (Perception)
    willpower: number;      // WP - 意志 (Willpower)
    fellowship: number;     // Fel - 社交 (Fellowship)
  };
  parameters?: string;
  trait?: string;
  skill?: string;
  equipment?: string;
  items?: string;
  tags?: string[];
  records?: NPCRecord[];
  bondLevel?: number;

  // Combat Stats (New)
  hp?: number;
  maxHp?: number;
  ahp?: number;
  armorRating?: number;
  movement?: number;
  baseMeleeDamage?: string;
  weaponStats?: string;
}

export interface LogSummary {
  id: string;
  timestamp: number;
  title: string;
  date: string;
  summary: string;
  keywords: string[];
  days: DayEvents[];
  npcUpdates?: NPCUpdate[];
}

export interface PlanetMetrics {
  reputation: number; // 个人声望 [0-100]
  defense: number;    // 防务等级 [0-100]
  unrest: number;     // 动乱度 [0-100]
  resources: 'EXTREME_SCARCITY' | 'LIMITED' | 'SELF_SUFFICIENT' | 'PREFER_ABUNDANT' | 'FORGE_WORLD'; // 资源等级
}

export interface PlanetDescription {
  id: string;         // 星球ID (如: TERRA-01)
  name: string;       // 星球名
  type: string;       // 星球类型 (如: 巢都世界)
  metrics: PlanetMetrics;
  lastObservation: string; // 叙事时间戳
}

export interface GaiaState {
  sectors: {
    [sectorName: string]: {
      logistics_provisions: number;
      max_storage: number;
      imperial_compliance: number;
      status: string;
    }
  };
  planets: { [planetId: string]: PlanetDescription }; // 以星球为单位的监测
  entities?: Record<string, any>;
  relationships?: any[];
  locations?: Record<string, any>;
  activeQuests?: any[];
  lastUpdated: number;
  lastSummary?: string;
}

export interface GameState {
  status: GameStatus;
  character: Character | null;
  history: Message[];
  isLoading: boolean;
  isCharacterSheetOpen: boolean;
  isCompendiumOpen: boolean;
  isLogModalOpen: boolean;
  npcProfiles: NPCProfile[];
  logs: LogSummary[];
  stageSettings?: string;
  selectedStages?: string[];
  difficulty: 'normal' | 'grand';
  gaiaState?: GaiaState;
  isTutorialEnabled?: boolean;
  tutorialStep?: string;
}
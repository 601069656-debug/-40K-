import * as fs from 'fs';
import * as path from 'path';

// --- Types ---

interface AttributeSet {
  weaponSkill: number;
  ballisticSkill: number;
  strength: number;
  toughness: number;
  agility: number;
  intelligence: number;
  perception: number;
  willpower: number;
  fellowship: number;
}

interface KnowledgeSummary {
  traits: { name: string; description: string; category?: string }[];
  skills: any[];
  psychic: any[];
}

// --- Utils ---

const calculateHP = (toughness: number) => Math.max(1, Math.floor(toughness / 5));
const calculateMV = (agility: number) => Math.max(1, Math.floor(agility / 10));
const calculateBMD = (strength: number) => Math.max(0, Math.floor(strength / 20));

const formatTraits = (traitNames: string[], knowledge: KnowledgeSummary) => {
  const validTraits: string[] = [];
  
  traitNames.forEach(name => {
    // If it contains a bracket and a colon, it's a pre-formatted trait
    if (name.includes('【') && name.includes('】') && name.includes('：')) {
      validTraits.push(name);
      return;
    }
    
    const cleanName = name.replace(/[【】]/g, '');
    const t = knowledge.traits.find(trait => trait.name === cleanName);
    
    if (t) {
      validTraits.push(`【${t.name}】：${t.description}`);
    } else {
      // Fallback
      validTraits.push(`【${cleanName}】：无数据说明`);
      console.warn(`Warning: Trait '${cleanName}' is not defined in knowledge base. Used fallback.`);
    }
  });
  
  return validTraits.length > 0 ? validTraits.join('；') : '【基础单位】：无特殊能力';
};

const getResistance = (toughness: number): 'Low' | 'Medium' | 'High' | 'Extreme' => {
  if (toughness >= 80) return 'Extreme';
  if (toughness >= 60) return 'High';
  if (toughness >= 40) return 'Medium';
  return 'Low';
};

// Traverse bestiary and get all existing names
function getExistingUnitNames(): Set<string> {
  const existingNames = new Set<string>();
  const collectNames = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        collectNames(fullPath);
      } else if (fullPath.endsWith('.ts')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        // Simple regex to extract names from TS objects
        const regex = /name:\s*['"]([^'"]+)['"]/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            existingNames.add(match[1]);
            // Also add without English brackets if present
            const clean = match[1].replace(/\(.*?\)/g, '').trim();
            existingNames.add(clean);
        }
      }
    }
  };
  
  collectNames(path.join(process.cwd(), 'lib/knowledge/bestiary'));
  return existingNames;
}

// --- Generator ---

function generateFamousCharacters() {
  const knowledgePath = path.join(process.cwd(), 'lib/knowledge/knowledge_summary.json');
  if (!fs.existsSync(knowledgePath)) {
    console.error('Missing knowledge_summary.json. Run scripts/extract_knowledge_data.ts first.');
    return;
  }
  const knowledge: KnowledgeSummary = JSON.parse(fs.readFileSync(knowledgePath, 'utf-8'));
  const existingNames = getExistingUnitNames();

  const factions = [
    { id: 'imperium_heroes', name: '帝国名人' },
    { id: 'chaos_heroes', name: '混沌名人' }
  ];

  const allUnits: Record<string, Record<string, any>> = {};

  // --- Imperium ---
  allUnits['imperium_heroes'] = {
    'emperor_of_mankind': {
      name: '神皇 (The Emperor of Mankind)',
      status: '人类之主',
      attributes: { weaponSkill: 500, ballisticSkill: 500, strength: 500, toughness: 500, agility: 500, intelligence: 500, perception: 500, willpower: 500, fellowship: 500 },
      trait: formatTraits(['黄金卫士', '【神圣躯体】：不可摧毁，免疫所有物理与能量伤害。', '【免疫恐惧】：不受任何恐惧、威压或亚空间干扰影响。', '【异界存在】：免疫所有恐惧以及影响心智的灵能效果（如魅惑、控制），任何试图读取其思维的能力都会失败；', '【精神压制】：出现在场上时，所有敌对单位的意志和智力减半（向下取整）。', '体型·巨大'], knowledge),
      skill: '灵能掌控, 指挥, 禁忌知识·亚空间, 智力(逻辑)',
      equipment: '精工动力剑, 圣物动力甲',
      tags: ['帝国', '帝皇', '神明', '人类之主'],
      weaponStats: '精工动力剑(S:+30 D:+20)'
    },
    'malcador': {
      name: '马卡多 (Malcador the Sigillite)',
      status: '掌印者 / 帝国宰相',
      attributes: { weaponSkill: 30, ballisticSkill: 30, strength: 15, toughness: 30, agility: 40, intelligence: 180, perception: 150, willpower: 300, fellowship: 120 },
      trait: formatTraits(['【掌印者】：智力(Int)+50，意志(WP)+100。免疫亚空间污染，可以感知整个星区的动向。', '【灵能大师】：可以施展极高阶的亚空间魔法，灵力穿透(PR)+5。', '【永生者】：不会因自然原因死亡，且具有极强的自愈能力。', '体型·普通'], knowledge),
      skill: '禁忌知识·亚空间, 智力(逻辑), 指挥, 灵能掌控',
      equipment: '掌印者之杖, 丝绸长袍',
      tags: ['帝国', '泰拉', '灵能者', '宰相'],
      weaponStats: '掌印者之杖(S:+10 D:PR×5)'
    },
    'belisarius_cawl': {
      name: '贝利撒留·考尔',
      status: '大贤者',
      attributes: { weaponSkill: 60, ballisticSkill: 80, strength: 75, toughness: 85, agility: 40, intelligence: 130, perception: 90, willpower: 110, fellowship: 60 },
      trait: formatTraits(['机魂通晓', '机械化·高级', '多臂', '【活体金属】：每回合自动修复受损的装甲和机械组件部分耐力。', '体型·大型'], knowledge),
      skill: '科技使用, 普通知识·技术, 医疗学',
      equipment: '热熔枪, 动力电斧, 大贤者机仆阵列',
      tags: ['帝国', '机械神教', '贤者'],
      weaponStats: '热熔枪(S:90 D:15 容量:10 连发:否), 动力电斧(S:+15 D:+10)'
    },
    'trajan_valoris': {
      name: '图拉真·瓦洛里斯',
      status: '禁军统领',
      attributes: { weaponSkill: 95, ballisticSkill: 90, strength: 80, toughness: 80, agility: 80, intelligence: 85, perception: 90, willpower: 95, fellowship: 85 },
      trait: formatTraits(['【帝皇的盾牌】：受到致命伤害时有 50% 几率（在我们的系统里视为获得一次免死机会，剩余1耐久）抵挡该攻击。', '帝皇守护者', '百战幸存', '体型·大型'], knowledge),
      skill: '指挥, 战术, 威压, 警觉',
      equipment: '精工动力戟, 禁军终结者甲',
      tags: ['帝国', '禁军', '英雄', '指挥官'],
      weaponStats: '精工动力戟(S:+18 D:+12)'
    },
    'marneus_calgar': {
      name: '玛尔纽斯·卡尔加',
      status: '极限战士战团长',
      attributes: { weaponSkill: 85, ballisticSkill: 85, strength: 75, toughness: 75, agility: 70, intelligence: 80, perception: 80, willpower: 85, fellowship: 90 },
      trait: formatTraits(['战术大师', '百战幸存', '体型·大型'], knowledge),
      skill: '指挥, 战术, 威压',
      equipment: '动力拳套, 风暴爆弹枪, 终结者甲',
      tags: ['帝国', '星际战士', '极限战士', '战团长'],
      weaponStats: '风暴爆弹枪(S:45 D:8 容量:60 连发:可), 动力拳套(S:力量翻倍 D:+10)'
    },
    'dante': {
      name: '但丁 (Lord Commander Dante)',
      status: '圣血天使战团长 / 帝国暗面摄政',
      attributes: { weaponSkill: 95, ballisticSkill: 85, strength: 75, toughness: 75, agility: 80, intelligence: 90, perception: 85, willpower: 95, fellowship: 95 },
      trait: formatTraits(['战术大师', '百战幸存', '【黄金面具】：产生极强的恐惧效果，使周围敌人的全属性-10。', '飞行', '体型·大型'], knowledge),
      skill: '指挥, 战术, 威压',
      equipment: '莫塔里斯之斧, 圣吉列斯之光, 玛佩尔战甲',
      tags: ['帝国', '星际战士', '圣血天使', '战团长'],
      weaponStats: '莫塔里斯之斧(S:+15 D:+10), 圣吉列斯之光(S:60 D:15 容量:1 连发:否)'
    },
    'azrael': {
      name: '阿兹瑞尔 (Supreme Grand Master Azrael)',
      status: '暗黑天使至高大导师',
      attributes: { weaponSkill: 90, ballisticSkill: 85, strength: 70, toughness: 70, agility: 75, intelligence: 95, perception: 85, willpower: 95, fellowship: 85 },
      trait: formatTraits(['【至高大导师】：指挥所有暗黑天使和子团，所有友方暗黑天使意志(WP)+10。', '战术大师', '百战幸存', '体型·大型'], knowledge),
      skill: '指挥, 战术, 威压, 史学知识',
      equipment: '秘密之剑, 复仇之怒, 守望者之盔',
      tags: ['帝国', '星际战士', '暗黑天使', '至高大导师'],
      weaponStats: '秘密之剑(S:+12 D:+10), 复仇之怒(S:55 D:8 容量:30 连发:可)'
    },
    'titus': {
      name: '德米特里安·泰图斯 (Demetrian Titus)',
      status: '极限战士副官 / 前连长',
      attributes: { weaponSkill: 85, ballisticSkill: 80, strength: 70, toughness: 75, agility: 75, intelligence: 75, perception: 80, willpower: 95, fellowship: 70 },
      trait: formatTraits(['【抗魔体质】：对灵能攻击具有极高的韧性，受到的灵能伤害-50%。', '百战幸存', '体型·大型'], knowledge),
      skill: '体术, 战术, 武器使用',
      equipment: '动力剑, 阿斯塔特爆弹枪, Mk X 战术型动力甲',
      tags: ['帝国', '星际战士', '极限战士', '副官'],
      weaponStats: '动力剑(S:+10 D:+8), 阿斯塔特爆弹枪(S:45 D:8 容量:30 连发:可)'
    },
    'eisenhorn': {
      name: '格雷戈尔·艾森霍恩',
      status: '审判官 (异端庭)',
      attributes: { weaponSkill: 75, ballisticSkill: 70, strength: 55, toughness: 60, agility: 65, intelligence: 90, perception: 85, willpower: 95, fellowship: 75 },
      trait: formatTraits(['【灵能天赋】：具备操纵亚空间能量的能力，灵力穿透(PR)+1。', '【审判官权威】：可以征调任何帝国资源。', '【意志坚定】：免疫中低阶灵能控制。', '体型·普通'], knowledge),
      skill: '禁忌知识·亚空间, 威压, 调查, 战斗训练',
      equipment: '灵能剑, 爆弹手枪, 保护力场',
      tags: ['帝国', '审判庭', '审判官', '异端庭'],
      weaponStats: '灵能剑(S:PR×2 D:10), 爆弹手枪(S:45 D:8 容量:12 连发:否)'
    },
    'karamazov': {
      name: '费奥多尔·卡拉马佐夫',
      status: '审判长 (判罪庭)',
      attributes: { weaponSkill: 65, ballisticSkill: 75, strength: 60, toughness: 70, agility: 20, intelligence: 85, perception: 75, willpower: 100, fellowship: 50 },
      trait: formatTraits(['【判罪宝座】：由大型机械底座支撑，力量(S)和坚韧(T)+20，但敏捷(Ag)-30。', '【审判长意志】：周围敌军意志(WP)-20。', '体型·大型'], knowledge),
      skill: '威压, 战术, 禁忌知识·异端',
      equipment: '审判宝座, 热熔枪, 动力长柄剑',
      tags: ['帝国', '审判庭', '审判官', '判罪庭'],
      weaponStats: '多管热熔(S:100 D:20 容量:N 连发:否)'
    },
    'yarrick': {
      name: '塞巴斯蒂安·亚瑞克',
      status: '帝国英雄 / 哈米吉多顿政委',
      attributes: { weaponSkill: 75, ballisticSkill: 75, strength: 50, toughness: 65, agility: 55, intelligence: 85, perception: 80, willpower: 110, fellowship: 95 },
      trait: formatTraits(['【老兵政委】：周围帝国卫队士气永不崩溃。', '【绿皮克星】：对绿皮兽人作战时所有属性+10。', '【邪恶之眼】：左眼义眼可发射激光。', '体型·普通'], knowledge),
      skill: '指挥, 战术, 威压, 语言(色烈语)',
      equipment: '兽人力量之爪, 爆弹枪, 政委大氅',
      tags: ['帝国', '星界军', '政委', '哈米吉多顿'],
      weaponStats: '兽人力量之爪(S:×2 D:+12), 爆弹枪(S:45 D:8 容量:30 连发:可)'
    },
    'ciaphas_cain': {
      name: '凯法斯·凯恩',
      status: '政委 / 帝国英雄',
      attributes: { weaponSkill: 80, ballisticSkill: 75, strength: 55, toughness: 60, agility: 75, intelligence: 85, perception: 95, willpower: 70, fellowship: 105 },
      trait: formatTraits(['【求生本能】：敏捷(Ag)+10，感知(Per)+20。在逃跑或规避危险时敏捷(Ag)翻倍。', '【英雄光环】：虽然内心充满疑虑，但在他人眼中是无畏的英雄，社交(Fel)+20。', '体型·普通'], knowledge),
      skill: '武器使用, 虚伪, 社交(谈判), 追踪',
      equipment: '链锯剑, 激光手枪, 政委大氅',
      tags: ['帝国', '星界军', '政委', '英雄'],
      weaponStats: '链锯剑(S:+6 D:+5), 激光手枪(S:35 D:4 容量:30 连发:否)'
    },
    'celestine': {
      name: '活圣人赛勒斯汀',
      status: '活圣人',
      attributes: { weaponSkill: 95, ballisticSkill: 80, strength: 65, toughness: 85, agility: 95, intelligence: 80, perception: 90, willpower: 130, fellowship: 120 },
      trait: formatTraits(['【活圣人】：由神皇赐福，具有神圣力量，全属性+20，且免疫绝大部分伤害。', '【涅槃再生】：每场战斗1次，死后可瞬间以满血复活。', '飞行', '体型·普通'], knowledge),
      skill: '灵能掌控, 指挥, 魅惑',
      equipment: '炽烈之剑, 圣灵铠甲',
      tags: ['帝国', '国教', '活圣人', '战斗修女'],
      weaponStats: '炽烈之剑(S:+15 D:+12, 附带神圣火焰)'
    },
    'astorath': {
      name: '阿斯托瑞斯 (Astorath the Grim)',
      status: '圣血天使死亡大牧师',
      attributes: { weaponSkill: 90, ballisticSkill: 60, strength: 75, toughness: 75, agility: 80, intelligence: 80, perception: 95, willpower: 110, fellowship: 60 },
      trait: formatTraits(['【救赎者之裁】：对所有深陷“黑怒”的子团成员具有无上权威。', '百战幸存', '飞行', '体型·大型'], knowledge),
      skill: '指挥, 威压, 圣歌, 史学知识',
      equipment: '执行者之斧, 阿斯塔特喷气背包',
      tags: ['帝国', '星际战士', '圣血天使', '牧师'],
      weaponStats: '执行者之斧(S:+18 D:+15)'
    },
    'asmodai': {
      name: '阿斯莫戴 (Asmodai)',
      status: '暗黑天使审讯牧师',
      attributes: { weaponSkill: 85, ballisticSkill: 75, strength: 70, toughness: 75, agility: 75, intelligence: 85, perception: 85, willpower: 120, fellowship: 50 },
      trait: formatTraits(['【残酷审讯】：在进行刑讯时，智力(Int)+30。', '【忏悔光环】：周围敌人意志(WP)-10。', '体型·大型'], knowledge),
      skill: '刑讯, 指挥, 威压, 圣歌',
      equipment: '迷茫之杖, 阿斯塔特爆弹手枪',
      tags: ['帝国', '星际战士', '暗黑天使', '审讯牧师'],
      weaponStats: '迷茫之杖(S:+8 D:5, 附带意志冲击), 阿斯塔特爆弹手枪(S:45 D:8 容量:12 连发:否)'
    },
    'cassius': {
      name: '敖坦·卡修斯 (Ortan Cassius)',
      status: '极限战士圣洁大师',
      attributes: { weaponSkill: 80, ballisticSkill: 75, strength: 70, toughness: 85, agility: 65, intelligence: 85, perception: 85, willpower: 105, fellowship: 85 },
      trait: formatTraits(['【虫巢之仇】：对泰伦虫族作战时，全属性+10。', '百战幸存', '体型·大型'], knowledge),
      skill: '圣歌, 指挥, 战术, 生存',
      equipment: '审定者(精工极地爆弹枪), 圣洁权杖',
      tags: ['帝国', '星际战士', '极限战士', '牧师'],
      weaponStats: '审定者(S:55 D:10 容量:30 连发:可), 圣洁权杖(S:+10 D:+8)'
    },
    'roboute_guilliman': {
      name: '罗伯特·基里曼',
      status: '极限战士原体 / 帝国摄政',
      attributes: { weaponSkill: 95, ballisticSkill: 95, strength: 100, toughness: 100, agility: 90, intelligence: 120, perception: 95, willpower: 100, fellowship: 100 },
      trait: formatTraits(['【基因原体】：身体各个部位极其强壮，免疫毒素和虚弱，受伤能够快速愈合，战斗全属性+30。', '【极限战士统御】：在场时，所有帝国单位智力(Int)+10，且免疫恐惧。', '体型·大型', '【无畏冲锋】：冲锋不受地形限制，且移动距离翻倍。'], knowledge),
      skill: '指挥, 战术, 政务管理, 威压, 史学知识',
      equipment: '帝皇之剑, 命运之手, 执政官战甲',
      tags: ['帝国', '原体', '极限战士', '指挥官'],
      weaponStats: '帝皇之剑(S:+30 D:+15), 命运之手(S:50 D:10 容量:100 连发:可)'
    },
    'lion_el_jonson': {
      name: '莱恩·艾尔庄森',
      status: '暗黑天使原体',
      attributes: { weaponSkill: 105, ballisticSkill: 90, strength: 100, toughness: 100, agility: 95, intelligence: 100, perception: 105, willpower: 100, fellowship: 80 },
      trait: formatTraits(['【基因原体】：身体各个部位极其强壮，免疫毒素和虚弱，受伤能够快速愈合，战斗全属性+30。', '骑士精神', '体型·大型', '【无畏冲锋】：冲锋不受地形限制，且移动距离翻倍。'], knowledge),
      skill: '指挥, 战术, 追踪, 体术, 生存',
      equipment: '雄狮之剑, 帝皇之盾',
      tags: ['帝国', '原体', '暗黑天使', '剑圣'],
      weaponStats: '雄狮之剑(S:+20 D:+18)'
    }
  };

  // --- Chaos ---
  allUnits['chaos_heroes'] = {
    'typhus': {
      name: '提丰 (泰丰斯)',
      status: '纳垢一连长',
      attributes: { weaponSkill: 85, ballisticSkill: 75, strength: 80, toughness: 95, agility: 60, intelligence: 80, perception: 80, willpower: 100, fellowship: 65 },
      trait: formatTraits(['瘟疫坚毅', '瘟疫使者', '肉体再生', '腐败坚韧', '体型·大型'], knowledge),
      skill: '指挥, 灵能掌控, 生存',
      equipment: '动力长镰, 终结者甲',
      tags: ['混沌', '纳垢', '死亡守卫', '第一连长'],
      weaponStats: '动力长镰(S:+15 D:+12)'
    },
    'kharn_the_betrayer': {
      name: '卡恩 (背叛者)',
      status: '恐虐神选',
      attributes: { weaponSkill: 95, ballisticSkill: 60, strength: 85, toughness: 85, agility: 85, intelligence: 65, perception: 75, willpower: 90, fellowship: 50 },
      trait: formatTraits(['嗜血狂徒', '鲜血狂怒', '屠夫之钉', '兽性冲锋', '体型·普通'], knowledge),
      skill: '体术, 威压',
      equipment: '等离子手枪, 链锯斧',
      tags: ['混沌', '恐虐', '吞世者'],
      weaponStats: '等离子手枪(S:60 D:12 容量:10 连发:否), 链锯斧(S:+8 D:+6，撕裂目标护甲)'
    },
    'ahriman': {
      name: '阿赫里曼',
      status: '千子首席智库',
      attributes: { weaponSkill: 75, ballisticSkill: 80, strength: 70, toughness: 75, agility: 75, intelligence: 110, perception: 95, willpower: 120, fellowship: 75 },
      trait: formatTraits(['亚空间术士', '奇想妙思', '诡道魔法', '体型·普通'], knowledge),
      skill: '灵能掌控, 禁忌知识·亚空间, 禁忌知识·恶魔学, 智力(逻辑)',
      equipment: '动力法杖, 爆弹手枪',
      tags: ['混沌', '奸奇', '千子', '灵能者'],
      weaponStats: '爆弹手枪(S:45 D:8 容量:12 连发:否), 动力法杖(S:+5 D:PR×2)'
    },
    'erebus': {
      name: '艾瑞巴斯 (First Chaplain Erebus)',
      status: '怀言者第一牧师 / 异端先驱',
      attributes: { weaponSkill: 85, ballisticSkill: 70, strength: 70, toughness: 75, agility: 80, intelligence: 110, perception: 95, willpower: 120, fellowship: 115 },
      trait: formatTraits(['【命运编织】：可以操纵概率，战斗中获得50%的额外闪避几率。', '亚空间术士', '【狡诈之徒】：社交(Fel)在进行欺骗时视为+30。', '体型·大型'], knowledge),
      skill: '指挥, 禁忌知识·亚空间, 虚伪, 灵能掌控',
      equipment: '绝望法杖, 阿斯塔特爆弹手枪',
      tags: ['混沌', '星际战士', '怀言者', '牧师'],
      weaponStats: '绝望法杖(S:+10 D:PR×3)'
    },
    'apollyon': {
      name: '阿波利昂 (Apollyon)',
      status: '黑色军团毁灭者',
      attributes: { weaponSkill: 80, ballisticSkill: 70, strength: 80, toughness: 80, agility: 75, intelligence: 70, perception: 75, willpower: 90, fellowship: 40 },
      trait: formatTraits(['【毁灭之源】：周围敌人坚韧(T)-5。', '百战幸存', '体型·大型'], knowledge),
      skill: '战术, 威压, 武器使用',
      equipment: '爆弹枪, 动力剑, 混沌动力甲',
      tags: ['混沌', '星际战士', '黑色军团'],
      weaponStats: '爆弹枪(S:45 D:8 容量:30 连发:可), 动力剑(S:+10 D:+8)'
    },
    'hephaistos_grudd': {
      name: '赫淮斯托斯·格鲁德',
      status: '钢铁勇士战争铁匠',
      attributes: { weaponSkill: 75, ballisticSkill: 80, strength: 75, toughness: 85, agility: 45, intelligence: 105, perception: 85, willpower: 95, fellowship: 50 },
      trait: formatTraits(['【战争铁匠】：智力(Int)+20，科技使用技能等级视为10。', '机魂亲和', '体型·大型'], knowledge),
      skill: '科技使用, 战术, 威压',
      equipment: '震地锤, 组合爆弹手枪, 动力甲',
      tags: ['混沌', '星际战士', '钢铁勇士', '战争铁匠'],
      weaponStats: '震地锤(S:100 D:25 减低目标敏捷), 组合爆弹手枪(S:50 D:8 容量:24 连发:可)'
    },
    'abaddon_the_despoiler': {
      name: '阿巴顿 (掠夺者)',
      status: '混沌战帅',
      attributes: { weaponSkill: 100, ballisticSkill: 90, strength: 90, toughness: 90, agility: 85, intelligence: 85, perception: 85, willpower: 105, fellowship: 90 },
      trait: formatTraits(['【混沌战帅】：领导所有黑色军团成员，在场时其友军不会因恐慌而撤退，免疫所有负面心智状态。', '【四神印记】：获得力量、坚韧、敏捷与感知全面+10加成。', '【无畏冲锋】：冲锋不受地形限制，且移动距离翻倍。', '体型·大型'], knowledge),
      skill: '指挥, 战术, 威压, 禁忌知识·亚空间',
      equipment: '魔剑德拉科尼恩, 荷鲁斯之爪, 混沌终结者重甲',
      tags: ['混沌', '英雄', '黑色军团', '战帅'],
      weaponStats: '魔剑德拉科尼恩(S:+20 D:+15), 荷鲁斯之爪(S:60 D:12 容量:60 连发:可)'
    },
    'angron': {
      name: '安格隆',
      status: '恐虐恶魔原体',
      attributes: { weaponSkill: 110, ballisticSkill: 50, strength: 120, toughness: 120, agility: 90, intelligence: 60, perception: 80, willpower: 100, fellowship: 40 },
      trait: formatTraits(['【恶魔原体】：拥有极其恐怖的肉体与再生能力，所有物理伤害减免2点，力量(S)与坚韧(T)+40。', '【屠杀欲望】：近战攻击永远先手，对目标造成巨大的破甲伤害。', '【屠夫之钉】：仅能使用手枪类远程武器。进入近战后力量(S)+10，武器技能(WS)+10，冲锋距离翻倍。', '【无畏冲锋】：冲锋不受地形限制，且移动距离翻倍。', '飞行', '体型·巨大'], knowledge),
      skill: '威压, 体术',
      equipment: '脊髓巨斧, 黑刃, 黄铜战甲',
      tags: ['混沌', '恐虐', '恶魔原体', '吞世者'],
      weaponStats: '脊髓巨斧(S:+30 D:+20), 黑刃(S:+25 D:+15)'
    },
    'magnus_the_red': {
      name: '马格努斯',
      status: '奸奇恶魔原体',
      attributes: { weaponSkill: 85, ballisticSkill: 90, strength: 90, toughness: 100, agility: 80, intelligence: 140, perception: 120, willpower: 130, fellowship: 80 },
      trait: formatTraits(['【恶魔原体】：拥有极其恐怖的肉体与再生能力，所有物理伤害减免2点，力量(S)与坚韧(T)+40。', '【灵能大师】：可以施展极高阶的亚空间魔法，灵力穿透(PR)+5。', '飞行', '【真理预见】：免疫偷袭，战斗前总能提前计算对方弱点使对方闪避无效。', '体型·巨大'], knowledge),
      skill: '灵能掌控, 禁忌知识·亚空间, 禁忌知识·恶魔学, 智力(逻辑)',
      equipment: '马格努斯之刃, 奸奇法典, 变幻法袍',
      tags: ['混沌', '奸奇', '恶魔原体', '千子'],
      weaponStats: '马格努斯之刃(S:+10 D:+20+PR×3)'
    },
    'mortarion': {
      name: '莫塔里安',
      status: '纳垢恶魔原体',
      attributes: { weaponSkill: 90, ballisticSkill: 80, strength: 100, toughness: 130, agility: 70, intelligence: 90, perception: 95, willpower: 110, fellowship: 60 },
      trait: formatTraits(['【恶魔原体】：拥有极其恐怖的肉体与再生能力，所有物理伤害减免2点，力量(S)与坚韧(T)+40。', '【纳垢之赐】：免疫环境毒害与疾病，极大幅度减免任何常规伤害，坚韧(T)+30。', '【无痛者】：受到致命攻击时无视硬直。', '飞行', '【瘴气光环】：周围15米内友军获得被击命中减低，且敌军每回合强制受到毒素侵袭。', '体型·巨大'], knowledge),
      skill: '威压, 生存, 禁忌知识·生化病毒',
      equipment: '寂静巨镰, 提灯, 腐败重甲',
      tags: ['混沌', '纳垢', '恶魔原体', '死亡守卫'],
      weaponStats: '提灯(S:70 D:15 容量:N 连发:否), 寂静巨镰(S:+20 D:+22)'
    },
    'fulgrim': {
      name: '福格瑞姆',
      status: '色孽恶魔原体',
      attributes: { weaponSkill: 110, ballisticSkill: 85, strength: 90, toughness: 90, agility: 120, intelligence: 95, perception: 100, willpower: 95, fellowship: 105 },
      trait: formatTraits(['【恶魔原体】：拥有极其恐怖的肉体与再生能力，所有物理伤害减免2点，力量(S)与坚韧(T)+40。', '【完美主义】：近战命中判定极高，连续攻击可造成多次追击，敏捷(Ag)+30。', '【诡异优雅】：回避极高，让敌人几乎无法击中。', '飞行', '【四臂挥舞】：拥有超越常人的双手武器持有数量。', '体型·巨大'], knowledge),
      skill: '战术, 特技, 威压, 魅惑',
      equipment: '拉尔之剑, 蛇妖护甲, 银纹鞭',
      tags: ['混沌', '色孽', '恶魔原体', '帝皇之子'],
      weaponStats: '拉尔之剑(S:+15 D:+20), 银纹鞭(S:+10 D:+15)'
    }
  };

  // --- Process and output ---
  for (const faction of factions) {
    const units = allUnits[faction.id] || {};
    const processedUnits: Record<string, any> = {};

    for (const [key, unit] of Object.entries(units)) {
      if (existingNames.has(unit.name) || existingNames.has(unit.name.replace(/\(.*?\)/g, '').trim())) {
         console.log(`Skipping existing unit: ${unit.name}`);
         continue;
      }
      
      const stats: any = { ...unit };
      // stats.id = faction.id + '_' + key; // Don't set id in raw bestiary
      stats.hp = calculateHP(stats.attributes.toughness);
      stats.maxHp = stats.hp;
      stats.movement = calculateMV(stats.attributes.agility);
      stats.ahp = stats.attributes.toughness; 
      stats.baseMeleeDamage = `${calculateBMD(stats.attributes.strength)} (S/20)`;
      stats.resistance = getResistance(stats.attributes.toughness);
      
      processedUnits[faction.id + '_' + key] = stats;
    }

    if (Object.keys(processedUnits).length === 0) {
      console.log(`No new units to generate for ${faction.name}`);
      continue;
    }

    const factionIdUpper = faction.id.toUpperCase();
    const outputContent = 'import { NPCProfile } from "../../../../types";\n\n' +
      'export const ' + factionIdUpper + '_DATA: Record<string, NPCProfile> = ' + JSON.stringify(processedUnits, null, 2) + ';\n';

    // check out directory exists or create
    const dirPath = path.join(process.cwd(), 'lib/knowledge/bestiary/' + faction.id);
    if (!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const outputPath = path.join(dirPath, 'data.ts');
    fs.writeFileSync(outputPath, outputContent);
    console.log('Generated data for ' + faction.name + ' at ' + outputPath);
  }
}

generateFamousCharacters();


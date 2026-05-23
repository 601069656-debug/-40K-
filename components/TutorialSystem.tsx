import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  X,
  Radio,
  Slash
} from 'lucide-react';
import { GameState, Character, SkillType } from '../types';

interface TutorialSystemProps {
  gameState: GameState;
  updateGameState: (updater: (prev: GameState) => GameState) => void;
}

const getAlignmentTheme = (character?: Character) => {
  const isChaos = character?.alignment?.includes('混沌') || character?.lineage?.includes('混沌') || character?.lineage?.includes('变节');
  
  if (isChaos) {
    return {
      name: '亚空间禁忌之书 (Liber Veritatem)',
      subtitle: 'VERITAS IN CORRUPTIONE',
      adviceTitle: '低语之壳 (Whispering Shard)',
      roleName: '虚空低语者',
      primaryColor: 'text-red-500',
      accentColor: 'border-red-600',
      bgGradient: 'from-red-950/40',
      iconColor: 'text-purple-500',
      footerText: 'CORRUPTION IS STRENGTH',
      noteTitle: '亵渎笔记',
      noteQuote: '“真理在疯狂中盛开。拥抱它，或者被它吞噬。”',
      pages: [
        {
          id: 'basic',
          title: '禁忌：叙事扭曲',
          content: `这个世界不再由伪帝的意志定义。你的每一句话都在撕裂现实。

- **亵渎行为**：使用 [方括号] 描述你的欲望，例如「[向伪帝的子民降下瘟疫]」。
- **命运无常**：这里的一切都取决于因果。你的属性越高，扭曲现实的阻力就越小。
- **灵魂状态**：死亡并非终结，但在这种状态下出局意味着你的灵魂将归于诸神。
- **亚空间共鸣**：AI会根据你的行为动态调整环境。当你献祭、背叛或施虐时，周围的亚空间阴影将更加浓郁。`
        },
        {
          id: 'psyker',
          title: '巫师：深渊交易',
          content: `你不仅是在使用能量，你是在与渴求之神交易。
          
- **灵能等级(PR)**：衡量你与亚空间连接的深度。等级从1到13。
- **灵能命中**：你的 WP 必须 ≥ 目标的抵抗属性（T/Ag/WP）才能生效。
- **风险标记(RM)**：灵能反噬的导火索。RM 达到特定阈值（3, 6, 8, 9, 13）会强制触发「亚空间回响」。
- **反噬后果**：严重风险（5级+）会导致肉体崩解或恶魔附身。
- **施法模式**：
  - **灵能掌控**：如果你具备该技能，声明此模式可减半PR以规避风险。
  - **灵能压制**：通过损耗 ⌊T/20⌋ 点HP，用肉身的剧痛干扰诸神的注视，抹除1个风险标记。
- **负向压制**：小心那些“无魂者(Pariah)”。他们的 NR（负向等级）会直接扣除你的 PR，甚至让你完全无法施法。
- **异端的低语**：混沌灵能分为纳垢(瘟疫与腐烂)、色孽(极致的痛楚与快感)、奸奇(诡谲的变异与命运)。警惕那些异形——艾尔达的符文与预言、绿皮野兽那不稳定的Waaagh!搞毛能量，以及泰伦虫族令人发疯的亚空间阴影。`
        },
        {
          id: 'progression',
          title: '成长：罪恶加冕',
          content: `在诸神的注视下，唯有变强才能存活。
          
- **经验获取**：通过杀戮（20-50 XP）、完成亵渎目标（100-300 XP）或揭开帝国伪善的秘密来获得 XP。
- **灵能觉醒**：消耗 100 XP 可在「提升能力」中学习「灵能天赋」。注意：你不能同时是灵能者和不可接触者。
- **腐化结盟**：随着腐化值升高，诸神会赐予你不同的印记。一旦腐化 >= 100，你的立场将被永久锁定为混沌。`
        },
        {
          id: 'combat',
          title: '屠杀：暴戾火力',
          content: `愚蠢的凡人依仗掩体，而你依仗恐惧与屠戮。

- **破甲与防护 (AP/AR)**：武器的破甲值 (AP) 会抵消目标的护甲值 (AR)。等效 AR = max(0, AR - AP)。
- **护甲耐久 (AHP)**：强力的护甲能通过损耗 AHP 来从每次攻击中抵消等同于 AR 数值的伤害，直到该护甲碎裂。
- **自动连射 (Burst Fire)**：每5秒射击消耗至少 max(3, ⌊弹容量/5⌋) 子弹。
  - **命中罚则**：连续射击同一个目标，后续每发 BS-5；切换目标，BS-10。
- **力量与坚韧 (S vs T)**：伤害深受 S 与 T 的差值影响。
  - **压制**: S - T ≥ 30，造成 **1.5倍** 毁灭伤害。
  - **贯穿**: T ≤ S，造成 **正常** 伤害。
  - **受阻**: T > S，伤害 **减半**。
  - **无力**: T - S ≥ 30，仅能造成 **1/4** 的微弱伤害。
- **压制区域**：使用连射武器覆盖整片区域，让敌人无法反击。
- **近战屠杀**：S 差值影响巨大。你的 S 越高，近战对抗时的压制力呈阶梯式增长。`
        },
        {
          id: 'faith',
          title: '恩宠：深渊注视',
          content: `伪帝的信徒祈求庇护，而你拥抱混沌的赐福。
          
- **腐化值 (0-500+)**：代表你被亚空间侵蚀与受诸神恩宠的程度。
- **获取途径**：接触恶魔、使用混沌灵能、谋杀帝国平民、摧毁圣地等行为会增长腐化值。
- **降临的代价与恩赐**：
  - **40-59**：意志与社交遭受削弱（性格阴郁）。
  - **60-79**：获得混沌肉身特质（如嗜血狂徒、欢愉之躯）。
  - **80-99**：极度危险，若耐久降至 0 且意志不足，将化为无意识的混沌卵。
  - **100+**：正式成为诸神的棋子，所有属性获得全面提升，常规无法洗白。
  - **200+**：引来邪神的注视，赐予你强大的「恶魔武器」。
  - **500**：升华（甚至接近恶魔亲王阶段），获得飞行、恢复与召唤恶魔之力。`
        },
        {
          id: 'equipment',
          title: '邪物：禁忌造物',
          content: `通过杀戮夺回你所需要的，而非依赖虚伪的工厂。

- **动态寄存**：AI会为你生成不属于圣典记载的邪恶物品。这些被标记为 \`<synthetic_items>\` 的造物将在你的状态面板中通过 JSON 模式注册。
- **身型设定**：留意你的 ` + '`【体型】`' + ` 特质。普通、大型或巨大。这决定了你是否能穿过狭窄门廊。
- **载具掠夺**：大多数载具掠夺自帝国。它们的 HP 等于 ⌊T/5⌋，而 MV 等于 ⌊Ag/5⌋。`
        },
        {
          id: 'alignment',
          title: '立场：背弃与堕落',
          content: `立场并非一成不变，它是你灵魂的颜色。

- **动态变更**：如果你在帝国阵营中献祭战友或接受亚空间契约，AI会立即同步你的阵营转移。
- **标签联动**：一旦你是“叛徒”，帝国的圣迹将对你产生灼烧（伤害），而异端将视你为兄弟。
- **腐化挽回**：如果你的腐化值 < 100，或许还能通过极端的苦修挽回。一旦 >= 100，你便已永劫不复。`
        },
        {
          id: 'social',
          title: '狡诈：权力与魅力',
          content: `在黑暗银河中，言语有时比利刃更致命。

- **社交能级(Fel)**：你的谈吐能让恶魔犹豫，让信徒疯狂。Fel 越高，你越能扭曲凡人的心智。
- **说服与威胁**：利用你的地位进行属性对抗（Fel 或 S）。
- **资源掠夺**：人口（奴隶）与补给是维持你亵渎远征的基石。在状态面板时刻监视你的【势力资源】。`
        }
      ]
    };
  }

  return {
    name: '帝皇战术手册 (Codex Tactica)',
    subtitle: 'ADEPTUS INSTRUCTIONIS',
    adviceTitle: '伺服头骨 (Servo-skull)',
    roleName: '技术军士',
    primaryColor: 'text-blue-400',
    accentColor: 'border-blue-600',
    bgGradient: 'from-blue-950/20',
    iconColor: 'text-blue-400',
    footerText: 'DUTY UNTO DEATH',
    noteTitle: '圣典备注',
    noteQuote: '“职责至死。你的知识是对抗黑暗的利刃。阅读、学习、服从。”',
    pages: [
      {
        id: 'basic',
        title: '基础：叙事推演',
        content: `本游戏采用纯文本叙事推演模式。你的每一句话都会直接影响剧情走向。

- **行动建议**：使用 [方括号] 描述你的核心动作，例如「[寻找掩体并还击]」。
- **数值逻辑**：系统不使用概率概念，而是根据你的属性与环境直接对决并计算结果。
- **属性映射**：
  - **HP**：max(1, ⌊T/5⌋)。
  - **移动力**：max(1, ⌊Ag/10⌋)。
- **死亡与正义**：HP 归零即代表为帝皇捐躯。如果你行为不端，AI 可能会基于剧情逻辑让你受到审判庭调查并改变你的立场。`
      },
      {
        id: 'psyker',
        title: '智库：灵能掌控',
        content: `灵能者（Psyker）是战场上的半神，但也时刻面临自毁风险。
        
- **灵能等级(PR)**：输出强度上限（1-13）。
- **命中机制**：你的 WP 对抗目标的 T, Ag 或 WP。数值相等或超出即生效。
- **风险标记(RM)**：灵能波动的累积。每次施法 +2。达到 3, 6, 8, 9, 13 时触发回响。
- **防御机制**：
  - **克制施法**：声明使用，本次 PR 减半，完全不产生 RM。
  - **灵能压制**：通过损耗 ⌊T/20⌋ 点 HP 强制移除 1 点 RM。
- **不可接触者**：具有 NR 等级的单位会形成灵能死区，抵消你的 PR，必须优先清除。
- **派系与专精**：帝国标准派系为预言(Divination)、变异(Pyromancy)、念动力(Telekinesis)、心灵感应(Telepathy)与生物力学(Biomancy)。各星际战士战团亦有秘传派系（如圣吉列斯派系、风暴派系、冰霜派系、断绝派系等）。作为特化基因群体的导航者则掌控着特殊的“死亡凝视”。`
      },
      {
        id: 'progression',
        title: '成长：功勋与晋升',
        content: `凡人终有一死，唯有功勋永存。
        
- **经验点 (XP)**：
  - 战斗胜利：20-50 XP。
  - 达成阶段目标：100-300 XP。
  - 关键情报发现：20-50 XP。
- **能力提升**：在非战斗区域进入「个人面板」消耗 XP 强化属性或学习新专长。
- **排他性法则**：
  - 你只能拥有一种「灵能天赋」。
  - 「负向灵能者」天赋与所有灵能能力互斥。一旦选择变异为无魂者，你将丧失所有原本的灵能。`
      },
      {
        id: 'combat',
        title: '战术：火力与防护',
        content: `不要在空旷地带与异端对射！遵守战术手册以确保生存。

- **破甲与护甲 (AP vs AR)**：武器的破甲值 (AP) 决定了它穿透防护的能力。目标的等效护甲 (AR) = max(0, 护甲 AR - 武器 AP)。
- **防护机制 (AHP)**：护甲耐久 (AHP) 能在每次受创时抵消等同于 AR 的伤害量，直至 AHP 归零导致护甲击毁。
- **自动连射 (Burst Fire)**：每5秒射击消耗至少 max(3, ⌊弹容量/5⌋) 子弹。
  - **命中罚则**：连续射击同一个目标，后续每发 BS-5；切换目标，BS-10。
- **力量与坚韧 (S vs T)**：穿透伤害取决于 S 与 T 的对抗结果。
  - **极化优势**: S - T ≥ 30，造成 **1.5倍** 伤害。
  - **常规对等**: T ≤ S，造成 **1倍** 正常伤害。
  - **处于劣势**: T > S，造成 **0.5倍** 伤害。
  - **极化劣势**: T - S ≥ 30，仅能造成 **0.25倍** 伤害。
- **压制区域**：消耗全部弹量制造压制区。区域内所有敌人都将受到火力试炼。
- **弹药管理**：在状态面板时刻关注【物品】栏的余量。`
      },
      {
        id: 'faith',
        title: '信仰：神皇圣印',
        content: `在黑暗年代，唯有信仰是无坚不摧的装甲。
        
- **信仰等级(Lv.1-5)**：衡量一名帝国角色的虔诚。不会自然提升，需积累“信仰功绩”晋升。
- **神圣庇佑**：
  - **Lv.2 虔信者**：常驻 意志(WP)+5。每场战役可抵消一次命中自身的恐惧或灵能攻击。
  - **Lv.3 笃信者**：累积 意志(WP)+10。每场战役一次，当HP归1时，可触发奇迹恢复少量HP。
  - **Lv.4 圣洁者**：累积 意志(WP)+15。获取的任何腐化值都会不可逆转地减半；面对混沌诸神阵营敌人时产生额外真实伤害。
  - **Lv.5 活圣人**：全属性+10，免疫恐惧与腐化，灵能对抗时意志极大幅度增强。每场战役一次，死亡时可在光芒中原地满血复活（极为逆天的神迹）。
- **挽回之道**：高达 Lv.4 的信仰或在国教圣地进行残酷的苦修，是为数不多能降低低量级腐化值的方式。`
      },
      {
        id: 'equipment',
        title: '装备：Mk X 圣典',
        content: `工欲善其事，必先利其器。

- **护甲命名**：标准圣典护甲包含 \`Mk X 战术型\`、\`Mk X 福波斯型\`、\`Mk X 格拉维斯型\`。禁止私自改装非标准型号。
- **力量门槛**：若你的 S 属性不足以驾驭重型护甲，将面临 Ag-10 及 MV-1 的严厉惩罚。
- **装备排他性**：一个躯体只能穿戴一套密封护甲。更换装备时请明确叙事描述脱下旧甲的过程。
- **体型限制**：所有单位必须具备体型（普通/大型/巨大）。阿斯塔特新兵默认为 ` + '`【体型·普通】`' + `。`
      },
      {
        id: 'vessels',
        title: '载具：战争引擎',
        content: `从阿斯塔特犀牛到荣光女王级战列舰。

- **乘员限制**：载具与舰船必须具备 [最少乘员]。若低于 50%，所有对抗受 -30 惩罚。若无人操作，载具将被视为废铁。
- **舰船属性**：舰船保留 S, T, Ag 属性。HP = T × 级别系数（护卫级30，巡洋级45，战列级45，旗舰级60，荣光级75）。
- **传感器对抗**：舰船对抗依赖感知 (Per) 属性。在静默航行时，AI 会对比敌方的感知与你的隐匿行为。`
      },
      {
        id: 'social',
        title: '外交：权威与征召',
        content: `第41个千年的统治不仅依靠爆弹。

- **社交能级(Fel)**：决定你的威慑力、说服力与领导力。从 10(凡人) 到 100(原体)。
- **征召与命令**：利用你的身份标签（如：审判官、战团长）配合 Fel 属性进行对抗。
- **补给管理**：王座币与补给决定了你的战役持久力。在【状态面板】的“资源”一栏可实时查看当前存量。`
      }
    ]

  };
};

export const TutorialSystem: React.FC<TutorialSystemProps & { previewAlignment?: string }> = ({ gameState, updateGameState, previewAlignment }) => {
  const [activePage, setActivePage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState<{title: string, content: string} | null>(null);

  const { isTutorialEnabled, character, status } = gameState;
  
  // Use previewAlignment if character is not yet set (during creation)
  const isChaosPreview = previewAlignment?.includes('混沌') || previewAlignment?.includes('变节');
  const effectiveCharacter = character || (isChaosPreview ? { alignment: '混沌', lineage: '混沌' } : undefined) as any;
  const theme = getAlignmentTheme(effectiveCharacter);

  // 动态检测上下文，提供提示
  useEffect(() => {
    if (!isTutorialEnabled || !character) return;

    const lastMessage = gameState.history[gameState.history.length - 1];
    if (!lastMessage || lastMessage.role !== 'model') return;

    const content = lastMessage.content.toLowerCase();
    
    // 灵能危险检测
    const hasPsySkill = character.skills.some(s => s.type === SkillType.PSYKER);
    if (hasPsySkill && (content.includes('亚空间') || content.includes('颤动') || content.includes('灵能'))) {
       setCurrentHint({
         title: `${theme.adviceTitle}：灵能风险`,
         content: `检测到不稳定的能量回响。如果你的RM（风险标记）过高，请务必在下一次行动声明使用「克制施法」或进行「灵能压制」。`
       });
       setShowHint(true);
    }
    
    // 掩体缺失检测
    if ((content.includes('开火') || content.includes('射击')) && !content.includes('掩体')) {
        setCurrentHint({
          title: `${theme.adviceTitle}：寻求遮蔽`,
          content: `你正暴露在敌方火线下。如果不寻找掩蔽物，结算伤害时将不会计算任何防御加成。建议加入「[寻找掩体]」。`
        });
        setShowHint(true);
    }

    // 弹药告急检测
    if (content.includes('弹药') && (content.includes('耗尽') || content.includes('匮乏'))) {
        setCurrentHint({
          title: `${theme.adviceTitle}：资源告急`,
          content: '弹药存量已到达临界点。全自动连射可能导致空仓。建议寻找补给或切换为近战模式。'
        });
        setShowHint(true);
    }

    // 伤残/生命值检测
    const currentHp = parseInt(character.hp) || 0;
    const maxHp = Math.max(1, Math.floor(character.attributes.toughness / 5));
    if (currentHp <= maxHp * 0.3) {
      setCurrentHint({
        title: `${theme.adviceTitle}：生命垂危`,
        content: `你的伤势已极度严重（HP < 30%）。全属性将由于伤痛而大幅下降。建议寻求医疗支援或进行「[战地急救]」。`
      });
      setShowHint(true);
    }

    // 负重/力量检测 (假设 armor 存储在装备里)
    const currentArmor = character.equipment?.find(e => e.includes('型动力甲') || e.includes('型甲壳甲'));
    if (currentArmor && character.attributes.strength < 40 && currentArmor.includes('格拉维斯')) {
      setCurrentHint({
        title: `${theme.adviceTitle}：超负荷`,
        content: `你的力量不足以完美驾驭「${currentArmor}」。你将面临敏捷与移动力的严重扣除。建议更换较轻的「福波斯型」或提升力量。`
      });
      setShowHint(true);
    }

    // 经验提升提醒
    if (character.experience && character.experience >= 100) {
      setCurrentHint({
        title: `${theme.adviceTitle}：潜能唤醒`,
        content: `你积累了足够的战役经验（XP >= 100）。可以考虑在非战斗区域打开【个人属性】面板，点击“提升等级”或“强化属性”来增强你的战力。`
      });
      setShowHint(true);
    }

  }, [gameState.history.length, isTutorialEnabled, character]);

  if (status === 'START_MENU') return null;

  const toggleTutorial = () => {
    updateGameState(prev => ({
      ...prev,
      isTutorialEnabled: !prev.isTutorialEnabled
    }));
  };

  return (
    <>
      {/* 侧边微型触发器 */}
      <div className="fixed bottom-24 right-4 z-[60] flex flex-col gap-2">
        <button
          onClick={toggleTutorial}
          className={`p-2 rounded-none border border-zinc-700 shadow-xl transition-all duration-300 ${
            isTutorialEnabled ? 'bg-zinc-900 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'bg-zinc-950 text-zinc-600 opacity-60'
          }`}
          title={isTutorialEnabled ? "关闭教程" : "开启教学指南"}
        >
          <Radio className="w-5 h-5" />
        </button>

        {isTutorialEnabled && (
          <button
            onClick={() => setActivePage(activePage ? null : 'basic')}
            className={`px-3 py-2 rounded-none border border-zinc-700 shadow-xl bg-zinc-900 text-zinc-300 hover:text-white transition-colors`}
            title="查看手册"
          >
            <span className="text-[10px] font-bold font-mono tracking-tighter">DATA-LIB</span>
          </button>
        )}
      </div>

      {/* 动态提示 (Hint Box) - 硬核风格 */}
      <AnimatePresence>
        {isTutorialEnabled && showHint && currentHint && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-24 right-4 z-[70] w-72 bg-zinc-950 border border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className={`h-1 absolute top-0 left-0 w-full ${effectiveCharacter?.alignment?.includes('混沌') ? 'bg-red-900' : 'bg-blue-900'}`} />
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className={`font-mono font-bold text-[10px] uppercase tracking-widest ${effectiveCharacter?.alignment?.includes('混沌') ? 'text-red-600' : 'text-blue-500'}`}>
                  [ {currentHint.title} ]
                </div>
                <button 
                  onClick={() => setShowHint(false)} 
                  className="text-zinc-600 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="text-[11px] text-zinc-300 leading-relaxed font-sans border-l-2 border-zinc-800 pl-3">
                  {currentHint.content}
                </div>
                <div className="pt-2 flex justify-between items-center text-[9px] text-zinc-700 font-mono italic">
                   <span>TRANS-LINK: STABLE</span>
                   <span>UID: {Math.random().toString(16).substring(2, 6).toUpperCase()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 教程全书 Modal - 硬核冷峻分屏布局 */}
      <AnimatePresence>
        {activePage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-zinc-800 w-full max-w-3xl h-[90vh] md:h-[600px] flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden"
            >
              {/* 背景装饰线 */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white translate-y-[50px]" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white translate-y-[100px]" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white translate-y-[150px]" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white translate-y-[200px]" />
                <div className="absolute top-0 left-[50px] w-[1px] h-full bg-white transition" />
              </div>

              {/* 顶部栏 */}
              <div className={`p-4 md:p-5 border-b border-zinc-800 flex justify-between items-start md:items-center gap-4 bg-zinc-950`}>
                <div className="flex items-start md:items-center gap-3 md:gap-4 flex-1">
                   <div className="w-8 h-8 md:w-10 md:h-10 border border-zinc-800 flex-none flex items-center justify-center bg-zinc-900 relative">
                     <Slash className={`w-4 h-4 md:w-5 md:h-5 ${theme.primaryColor}`} />
                     <div className="absolute -top-1 -left-1 w-2 h-2 bg-zinc-700" />
                   </div>
                   <div>
                     <h2 className="text-base md:text-lg font-bold text-zinc-100 font-sans tracking-tight uppercase leading-tight">{theme.name}</h2>
                     <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                       <span className="text-[9px] md:text-[10px] text-zinc-500 font-mono tracking-[0.2em]">{theme.subtitle}</span>
                       <div className="h-px w-4 md:w-8 bg-zinc-800 hidden md:block" />
                       <span className="text-[9px] md:text-[10px] text-zinc-600 font-mono uppercase tracking-[0.1em]">Protocol: V8.0</span>
                     </div>
                   </div>
                </div>
                <button 
                  onClick={() => setActivePage(null)}
                  className="w-8 h-8 md:w-10 md:h-10 border border-zinc-800 flex-none flex items-center justify-center text-zinc-600 hover:text-white hover:bg-zinc-900 transition-colors"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>

              <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 w-full">
                {/* 侧边导航 - 垂直线格风格 */}
                <div className="w-full md:w-[180px] border-b md:border-b-0 md:border-r border-zinc-800 flex flex-row md:flex-col bg-zinc-950/80 overflow-x-auto md:overflow-y-auto flex-none custom-scrollbar min-h-0">
                  <div className="flex flex-row md:flex-col w-max md:w-full">
                    {theme.pages.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => setActivePage(page.id)}
                        className={`relative w-auto md:w-full flex-none px-4 md:px-4 py-2.5 md:py-6 text-center md:text-left transition-all group border-r md:border-r-0 md:border-b border-zinc-900/50 ${
                          activePage === page.id 
                            ? 'bg-zinc-900' 
                            : 'hover:bg-zinc-900/30'
                        }`}
                      >
                        <div className="flex flex-col gap-0.5 md:gap-1 md:items-start items-center px-2 md:px-0">
                          <span className={`text-[8px] md:text-[9px] font-mono tracking-widest whitespace-nowrap ${activePage === page.id ? theme.primaryColor : 'text-zinc-700'}`}>
                            - {page.id.toUpperCase()} -
                          </span>
                          <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                            activePage === page.id ? 'text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-300'
                          }`}>
                            {page.title}
                          </span>
                        </div>
                        {activePage === page.id && (
                          <div className={`absolute left-0 bottom-0 md:top-0 w-full md:w-1 h-0.5 md:h-full bg-zinc-100 shadow-[0_0_10px_rgba(255,255,255,0.3)]`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 主内容区 */}
                <div className="flex-1 w-full bg-zinc-950 p-4 md:p-10 overflow-y-auto min-w-0">
                  {theme.pages.find(p => p.id === activePage) && (
                    <motion.div 
                      key={activePage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6 md:space-y-8"
                    >
                      <div>
                        <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                           <span className="w-2 h-2 border border-zinc-700 block" />
                           Category: Logistics & Doctrine
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-zinc-100 flex flex-wrap items-center gap-3">
                          {theme.pages.find(p => p.id === activePage)?.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="text-[12px] md:text-[13px] text-zinc-400 leading-[1.8] font-sans selection:bg-zinc-100 selection:text-zinc-900 max-w-lg markdown-body prose prose-invert prose-sm">
                          <ReactMarkdown components={{
                            p: ({children}) => <p className="mb-4">{children}</p>,
                            strong: ({children}) => <strong className={`font-bold ${theme.primaryColor}`}>{children}</strong>,
                            ul: ({children}) => <ul className="space-y-2 mb-4">{children}</ul>,
                            li: ({children}) => <li className="flex gap-2"><span className="text-zinc-600 mt-1">/</span><span>{children}</span></li>
                          }}>
                            {theme.pages.find(p => p.id === activePage)?.content || ''}
                          </ReactMarkdown>
                        </div>

                        <div className="pt-8 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="p-4 border border-zinc-900 bg-zinc-900/10">
                             <div className="text-[10px] text-zinc-600 font-mono uppercase mb-2 flex items-center gap-2">
                               <Radio className="w-3 h-3 text-zinc-700" />
                               {theme.noteTitle}
                             </div>
                             <p className="text-[11px] text-zinc-500 italic leading-relaxed">
                               {theme.noteQuote}
                             </p>
                          </div>
                          <div className="p-4 border border-zinc-900 bg-zinc-900/10 flex flex-col justify-center">
                             <div className="text-[20px] font-bold text-zinc-800 opacity-20 font-mono tracking-tighter">
                               {theme.footerText}
                             </div>
                             <div className="text-[8px] text-zinc-700 font-mono mt-1">
                               REF: {Math.random().toString(16).substring(2, 10).toUpperCase()}
                             </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* 底部收起栏 */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex justify-between items-center z-10 flex-none relative">
                 <div className="flex gap-4 items-center opacity-50 hidden md:flex">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-1.5 h-1.5 bg-zinc-900" />
                      ))}
                    </div>
                    <span className="text-[9px] text-zinc-700 font-mono uppercase tracking-[0.2em]">Data Feed: Secured</span>
                 </div>
                 <button 
                  onClick={() => setActivePage(null)}
                  className="px-6 py-3 w-full md:w-auto bg-zinc-100 text-zinc-950 text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                 >
                   确认并返回战斗区域
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};



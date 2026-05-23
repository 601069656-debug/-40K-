import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Character, Skill, SkillType } from '../types';
import { CHARACTER_STAT_LIMITS, FACTION_SKILLS_DATA, REGULAR_SKILLS_DATA, KNOWLEDGE_SKILLS_DATA, PSYKER_SKILLS_DATA } from '../constants';
import { X, ArrowUpCircle, Zap, Shield, BookOpen, Brain, Plus } from 'lucide-react';

const getAttrUpgradeCost = (x: number): number => {
  if (x <= 50) return Math.max(2, Math.floor(x / 5) + 1);
  if (x <= 100) return Math.floor(x / 2) - 15;
  if (x <= 200) return Math.floor(x / 1.5) - 30;
  return Math.floor(x / 0.8) - 200;
};

const getSkillMaxLevel = (skillName: string, skillType?: string): number => {
  if (skillType === '常规技能 (Regular)' || skillType?.includes('Regular') || skillType?.includes('常规')) {
    return 5;
  }
  const skill = FACTION_SKILLS_DATA.find(s => s.name === skillName);
  return skill ? (skill.maxLevel || 5) : 5;
};

const isSkillUpgradeable = (skill: Partial<Skill>): boolean => {
  if (skill.isUpgradeable !== undefined) return skill.isUpgradeable;
  if (KNOWLEDGE_SKILLS_DATA.some(k => k.name === skill.name) || skill.name?.includes('普通知识') || skill.name?.includes('禁忌知识') || skill.name?.includes('学术知识')) return false;
  const psykerData = PSYKER_SKILLS_DATA.find(p => p.name === skill.name);
  if (psykerData) {
    if (psykerData.isTalent || psykerData.isNegativePsyker) return false;
    return !!psykerData.isUpgradeable;
  }
  return true;
};

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  isSafeZone: boolean;
  onUpgrade: (totalCost: number, newAttributes: Record<string, number>, skillUpgrades: Record<string, number>, newSkills: Skill[]) => void;
}

const ATTR_LABELS: Record<string, string> = {
  weaponSkill: 'WS', ballisticSkill: 'BS', strength: 'S', toughness: 'T',
  agility: 'Ag', intelligence: 'Int', perception: 'Per', willpower: 'WP', fellowship: 'Fel'
};

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen, onClose, character, isSafeZone, onUpgrade
}) => {
  const [attrUpgrades, setAttrUpgrades] = useState<Record<string, number>>({});
  const [skillUpgrades, setSkillUpgrades] = useState<Record<string, number>>({});
  const [newSkills, setNewSkills] = useState<Skill[]>([]);
  const [activeTab, setActiveTab] = useState<'ATTRIBUTES' | 'SKILLS' | 'NEW_SKILLS'>('ATTRIBUTES');
  const [skillFilter, setSkillFilter] = useState<'ALL' | 'REGULAR' | 'FACTION' | 'KNOWLEDGE' | 'PSYKER'>('ALL');

  if (!isOpen) return null;

  // Dynamically derive group from all available limit keys in CONSTANTS
  const allFactionKeys = Object.keys(CHARACTER_STAT_LIMITS);
  const derivedGroup = allFactionKeys.find(g => 
    (character.lineage && character.lineage.includes(g)) || 
    (character.socialIdentity && character.socialIdentity.includes(g)) || 
    (character.unitType && character.unitType.includes(g)) ||
    (g === "混沌星际战士" && (character.lineage?.includes("黑色军团") || character.lineage?.includes("吞世者") || character.lineage?.includes("帝皇之子") || character.lineage?.includes("死亡守卫") || character.lineage?.includes("叛徒"))) ||
    (g === "星际战士" && (character.unitType?.includes("阿斯塔特") || character.lineage?.includes("战团") || character.lineage?.includes("星际战士")))
  ) || "星际战士";
  
  const limits = CHARACTER_STAT_LIMITS[derivedGroup] || CHARACTER_STAT_LIMITS["星际战士"];

  const alignmentLower = (character.alignment || "").toLowerCase();
  const lineageLower = (character.lineage || "").toLowerCase();
  const subFactionLower = (character.subFaction || "").toLowerCase();
  
  const isChaos = alignmentLower.includes('混沌') || alignmentLower.includes('chaos') || 
                  lineageLower.includes('混沌') || lineageLower.includes('chaos') || 
                  lineageLower.includes('变节') || lineageLower.includes('renegade') ||
                  lineageLower.includes('恐虐') || lineageLower.includes('奸奇') ||
                  lineageLower.includes('纳垢') || lineageLower.includes('色孽') ||
                  (character.corruptionValue && character.corruptionValue > 10) ||
                  (character.chaosBlessing && character.chaosBlessing.length > 0);

  const getAttrLevel = (attr: string) => character.attributes[attr as keyof typeof character.attributes] + (attrUpgrades[attr] || 0);

  const handleUpgradeAttr = (attr: string) => {
    const current = getAttrLevel(attr);
    const label = ATTR_LABELS[attr];
    const maxLimit = Math.floor(((limits[label as keyof typeof limits] as number) || 50) * 1.15);
    if (current >= maxLimit) return;
    setAttrUpgrades(prev => ({ ...prev, [attr]: (prev[attr] || 0) + 1 }));
  };

  const handleDowngradeAttr = (attr: string) => {
    if (!attrUpgrades[attr]) return;
    setAttrUpgrades(prev => {
      const next = { ...prev };
      next[attr]--;
      if (next[attr] === 0) delete next[attr];
      return next;
    });
  };

  const handleUpgradeExistingSkill = (skillName: string, skillType?: string, skillObj?: Partial<Skill>) => {
    const sObj = skillObj || character.skills.find(s => s.name === skillName) || {};
    if (!isSkillUpgradeable({ ...sObj, type: skillType as any })) return;
    const existing = character.skills.find(s => s.name === skillName);
    const current = (existing?.level || 0) + (skillUpgrades[skillName] || 0);
    const maxLimit = getSkillMaxLevel(skillName, skillType);
    if (current >= maxLimit) return;
    setSkillUpgrades(prev => ({ ...prev, [skillName]: (prev[skillName] || 0) + 1 }));
  };

  const handleDowngradeExistingSkill = (skillName: string) => {
    if (!skillUpgrades[skillName]) return;
    setSkillUpgrades(prev => {
      const next = { ...prev };
      next[skillName]--;
      if (next[skillName] === 0) delete next[skillName];
      return next;
    });
  };

  const handleAddNewSkill = (skillData: Partial<Skill>) => {
    if (character.skills.some(s => s.name === skillData.name) || newSkills.some(s => s.name === skillData.name)) return;
    setNewSkills(prev => [...prev, {
      ...skillData,
      id: `new_${Date.now()}_${Math.random()}`,
      level: 1,
    } as Skill]);
  };

  const handleRemoveNewSkill = (skillName: string) => {
    setNewSkills(prev => prev.filter(s => s.name !== skillName));
  };

  let totalCost = 0;
  Object.keys(attrUpgrades).forEach(attr => {
    const base = character.attributes[attr as keyof typeof character.attributes];
    const up = attrUpgrades[attr];
    for (let i = 0; i < up; i++) {
        totalCost += getAttrUpgradeCost(base + i);
    }
  });
  Object.keys(skillUpgrades).forEach(skillName => {
    totalCost += skillUpgrades[skillName] * 100;
  });
  newSkills.forEach(() => {
    totalCost += 100; // Learning a new skill costs 100XP
  });

  const canAfford = totalCost <= character.experience;
  const hasChanges = totalCost > 0;

  const filteredNewSkills = () => {
    const list: Array<{ data: any; type: SkillType; category: string; icon: any }> = [];

    if (skillFilter === 'ALL' || skillFilter === 'REGULAR') {
      REGULAR_SKILLS_DATA.forEach((s) => list.push({ data: s, type: SkillType.REGULAR, category: '常规科目', icon: Zap }));
    }
    if (skillFilter === 'ALL' || skillFilter === 'FACTION') {
      FACTION_SKILLS_DATA.forEach((s) => {
        const hasTrait = (name: string) => character.traits?.some((t) => t.name === name);
        const mutantRace = hasTrait('超大巨兽') ? '欧格林' :
          hasTrait('鼠人') ? '莱特林' :
          hasTrait('亚空间之眼') ? '导航者' :
          hasTrait('野兽之躯') ? '野兽人' : null;

        if (
          (character.alignment?.includes('帝国') && s.faction === '人类帝国通用') ||
          (character.alignment?.includes('混沌') && s.faction === '混沌诸神通用') ||
          (character.lineage && (s.faction === character.lineage || character.lineage.includes(s.faction))) ||
          (character.socialIdentity && (s.faction === character.socialIdentity || character.socialIdentity.includes(s.faction))) ||
          (character.subFaction && (s.faction === character.subFaction || character.subFaction.includes(s.faction))) ||
          (mutantRace && s.faction === mutantRace)
        ) {
          list.push({ data: s, type: SkillType.FACTION, category: '阵营特长', icon: Shield });
        }
      });
    }
    if (skillFilter === 'ALL' || skillFilter === 'KNOWLEDGE') {
      KNOWLEDGE_SKILLS_DATA.forEach((s) => list.push({ data: s, type: SkillType.KNOWLEDGE, category: '知识学识', icon: BookOpen }));
    }
    if (skillFilter === 'ALL' || skillFilter === 'PSYKER') {
      PSYKER_SKILLS_DATA.forEach((s) => {
        list.push({ data: s, type: SkillType.PSYKER, category: '灵能变异', icon: Brain });
      });
    }

    return list.filter((item) => {
      // Basic duplicate check
      if (character.skills.some((s) => s.name === item.data.name) || newSkills.some((s) => s.name === item.data.name)) {
        return false;
      }

      // Check if the current item is a Psyker Talent or a Negative Psyker
      const isPsykerTalent = item.type === SkillType.PSYKER && item.data.isTalent === true && !item.data.isNegativePsyker;
      const isNegativePsyker = item.type === SkillType.PSYKER && item.data.isNegativePsyker === true;

      // Rule 1: Cannot have multiple "Psychic Talents"
      if (isPsykerTalent) {
        const hasExistingPsyTalent = character.skills.some((s) => {
          const psyData = PSYKER_SKILLS_DATA.find((p) => p.name === s.name);
          return psyData && psyData.isTalent === true && !psyData.isNegativePsyker;
        });
        const hasNewPsyTalent = newSkills.some((s) => {
          const psyData = PSYKER_SKILLS_DATA.find((p) => p.name === s.name);
          return psyData && psyData.isTalent === true && !psyData.isNegativePsyker;
        });
        if (hasExistingPsyTalent || hasNewPsyTalent) return false;
      }

      // Rule 2: Cannot have multiple "Negative Psyker" talents
      if (isNegativePsyker) {
        const hasExistingNegative = character.skills.some((s) => {
          const psyData = PSYKER_SKILLS_DATA.find((p) => p.name === s.name);
          return psyData && psyData.isNegativePsyker;
        });
        const hasNewNegative = newSkills.some((s) => {
          const psyData = PSYKER_SKILLS_DATA.find((p) => p.name === s.name);
          return psyData && psyData.isNegativePsyker;
        });
        if (hasExistingNegative || hasNewNegative) return false;
      }

      // Rule 3: Mutual exclusivity between Psyker and Negative Psyker
      if (isPsykerTalent) {
        const isAlreadyNegative = character.skills.some((s) => {
          const psyData = PSYKER_SKILLS_DATA.find((p) => p.name === s.name);
          return psyData && psyData.isNegativePsyker;
        });
        const isNewNegative = newSkills.some((s) => {
          const psyData = PSYKER_SKILLS_DATA.find((p) => p.name === s.name);
          return psyData && psyData.isNegativePsyker;
        });
        if (isAlreadyNegative || isNewNegative) return false;
      }

      if (isNegativePsyker) {
        const isAlreadyPsyker = character.skills.some((s) => {
          const psyData = PSYKER_SKILLS_DATA.find((p) => p.name === s.name);
          return psyData && psyData.isTalent === true && !psyData.isNegativePsyker;
        });
        const isNewPsyker = newSkills.some((s) => {
          const psyData = PSYKER_SKILLS_DATA.find((p) => p.name === s.name);
          return psyData && psyData.isTalent === true && !psyData.isNegativePsyker;
        });
        if (isAlreadyPsyker || isNewPsyker) return false;
      }

      return true;
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-mono"
      >
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          className="bg-zinc-950 border-2 border-zinc-900 w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          <div className="p-6 border-b-2 border-red-950 flex justify-between items-center bg-black relative">
            <div className={`absolute top-0 left-0 w-2 h-full ${isChaos ? 'bg-purple-900 shadow-[0_0_15px_rgba(88,28,135,0.5)]' : 'bg-red-900 shadow-[0_0_15px_rgba(153,27,27,0.5)]'}`} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                 <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isChaos ? 'bg-purple-600' : 'bg-red-600'}`} />
                 <div className={`text-[9px] font-black tracking-[0.5em] uppercase ${isChaos ? 'text-purple-700' : 'text-red-700'}`}>Auth_Req // Data_Link: Established</div>
              </div>
              <h3 className="text-2xl text-slate-100 flex items-center gap-4 font-black tracking-tighter uppercase">
                {isChaos ? '暗黑升华演算中枢' : '能力提升演算中枢'}
              </h3>
            </div>
            <button onClick={onClose} className="w-12 h-12 border border-zinc-900 flex items-center justify-center text-zinc-600 hover:text-white hover:border-red-600 hover:bg-red-900/10 transition-all font-mono group bg-zinc-900/10">
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-none border-b md:border-b-0 md:border-r border-zinc-900 bg-black/50 p-4 md:space-y-4 flex flex-col md:overflow-y-auto">
              <div className="text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-2 mb-4 hidden md:block">执行链路 (Action Tree)</div>
              
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden">
                <button 
                  onClick={() => setActiveTab('ATTRIBUTES')}
                  className={`flex-none md:w-full text-center md:text-left px-3 py-2 md:px-4 md:py-3 whitespace-nowrap md:border-l-2 md:border-b-0 border-b-2 transition-all font-bold tracking-widest text-xs md:text-sm ${activeTab === 'ATTRIBUTES' ? 'bg-zinc-900/50 border-red-800 text-slate-200' : 'border-transparent text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'}`}
                >
                  核心属性重塑
                </button>
                
                <button 
                  onClick={() => setActiveTab('SKILLS')}
                  className={`flex-none md:w-full text-center md:text-left px-3 py-2 md:px-4 md:py-3 whitespace-nowrap md:border-l-2 md:border-b-0 border-b-2 transition-all font-bold tracking-widest text-xs md:text-sm flex gap-2 justify-center items-center ${activeTab === 'SKILLS' ? 'bg-zinc-900/50 border-red-800 text-slate-200' : 'border-transparent text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'}`}
                >
                  精进已有专长
                  {Object.keys(skillUpgrades).length > 0 && <span className="bg-emerald-900/40 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded">{Object.keys(skillUpgrades).length}</span>}
                </button>
                
                <button 
                  onClick={() => setActiveTab('NEW_SKILLS')}
                  className={`flex-none md:w-full text-center md:text-left px-3 py-2 md:px-4 md:py-3 whitespace-nowrap md:border-l-2 md:border-b-0 border-b-2 transition-all font-bold tracking-widest text-xs md:text-sm flex gap-2 justify-center items-center ${activeTab === 'NEW_SKILLS' ? 'bg-zinc-900/50 border-red-800 text-slate-200' : 'border-transparent text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'}`}
                >
                  学习全新专长
                  {newSkills.length > 0 && <span className="bg-blue-900/40 text-blue-400 text-[10px] px-1.5 py-0.5 rounded">{newSkills.length}</span>}
                </button>
              </div>

              <div className="mt-2 pt-2 md:mt-8 md:pt-8 border-t border-zinc-900 flex flex-row md:flex-col justify-between items-center md:items-start gap-4">
                <div>
                  <div className="text-zinc-500 text-xs mb-1 uppercase tracking-wider hidden md:block">当前结余 (Avail XP)</div>
                  <div className="text-zinc-500 text-[10px] mb-0 uppercase tracking-wider block md:hidden">当前结余</div>
                  <div className="text-xl md:text-3xl font-black text-emerald-500">{character.experience - totalCost} <span className="text-xs md:text-sm text-zinc-600">/ {character.experience}</span></div>
                </div>
                
                <div className="text-right md:text-left">
                  <div className="text-zinc-500 text-xs mb-1 uppercase tracking-wider hidden md:block">预计消耗 (Cost)</div>
                  <div className="text-zinc-500 text-[10px] mb-0 uppercase tracking-wider block md:hidden">预计消耗</div>
                  <div className={`text-xl font-bold ${canAfford ? 'text-amber-500' : 'text-red-600'}`}>{totalCost} XP</div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar relative bg-black">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
              
              <div className="relative z-10 space-y-8">
                {activeTab === 'ATTRIBUTES' && (
                  <div>
                    <h3 className="text-xl font-black text-slate-100 mb-6 uppercase tracking-widest border-b border-zinc-800 pb-2">核心属性重塑</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.keys(ATTR_LABELS).map(attr => {
                        const base = character.attributes[attr as keyof typeof character.attributes];
                        const up = attrUpgrades[attr] || 0;
                        const current = base + up;
                        const label = ATTR_LABELS[attr];
                        const maxLimit = Math.floor(((limits[label as keyof typeof limits] as number) || 50) * 1.15);
                        const costNext = getAttrUpgradeCost(current);
                        
                        return (
                          <div key={attr} className="bg-zinc-950 border border-zinc-800 p-4 flex justify-between items-center group hover:border-zinc-600 transition-colors">
                            <div>
                              <div className="text-zinc-400 text-sm font-bold tracking-widest">{label}</div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl text-slate-200 font-bold">{base}</span>
                                {up > 0 && <span className="text-emerald-400 font-black tracking-tighter">+{up}</span>}
                                <span className="text-zinc-600 text-xs font-mono">/ MAX {maxLimit}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-30 transition-all font-black text-lg"
                                onClick={() => handleDowngradeAttr(attr)}
                                disabled={up === 0}
                              >-</button>
                              <div className="text-xs text-amber-600 font-black w-12 text-center select-none">{costNext} EXP</div>
                              <button 
                                className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 text-emerald-500 hover:bg-zinc-800 hover:text-emerald-400 disabled:opacity-30 transition-all font-black text-lg"
                                onClick={() => handleUpgradeAttr(attr)}
                                disabled={current >= maxLimit}
                              >+</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'SKILLS' && (
                  <div>
                    <h3 className="text-xl font-black text-slate-100 mb-6 uppercase tracking-widest border-b border-zinc-800 pb-2">精进已有专长</h3>
                    {character.skills.length === 0 ? (
                      <div className="text-zinc-600 italic">序列空载 - 尚未习得任何记忆痕迹。</div>
                    ) : (
                      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
                        {character.skills.map((skill, index) => {
                          const up = skillUpgrades[skill.name] || 0;
                          const current = skill.level + up;
                          const maxLimit = getSkillMaxLevel(skill.name, skill.type);
                          const upgradeable = isSkillUpgradeable(skill);
                          
                          return (
                            <div key={index} className="bg-zinc-950 border border-zinc-800 p-4 flex flex-col hover:border-zinc-600 transition-colors">
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex-1 pr-4">
                                  <div className="text-slate-200 font-black tracking-tight mb-1 text-base leading-tight break-words">{skill.name}</div>
                                  <div className="text-zinc-500 text-[10px] uppercase font-bold">{skill.type}</div>
                                </div>
                                <div className="flex flex-col items-end gap-1 flex-none w-32">
                                  <div className="flex items-center gap-1 w-full justify-end">
                                    <button 
                                      className="w-8 h-8 flex flex-none items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-30 transition-all font-black text-lg"
                                      onClick={() => handleDowngradeExistingSkill(skill.name)}
                                      disabled={up === 0}
                                    >-</button>
                                    <div className="w-12 flex flex-none flex-col items-center justify-center bg-black/50 py-1 border border-zinc-800/50">
                                       <div className="text-xs text-slate-300 font-bold whitespace-nowrap">Lv.{skill.level} {up > 0 && <span className="text-emerald-500">+{up}</span>}</div>
                                    </div>
                                    <button 
                                      className="w-8 h-8 flex flex-none items-center justify-center bg-zinc-900 border border-zinc-800 text-emerald-500 hover:bg-zinc-800 hover:text-emerald-400 disabled:opacity-30 transition-all font-black text-lg"
                                      onClick={() => handleUpgradeExistingSkill(skill.name, skill.type, skill)}
                                      disabled={current >= maxLimit || !upgradeable}
                                    >+</button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-end mt-auto pt-2 border-t border-zinc-900/50">
                                  {!upgradeable && <span className="text-[9px] text-red-800 font-black uppercase tracking-widest bg-red-950/20 px-2 py-0.5 rounded">LOCKED (规则禁止升级)</span>}
                                  {upgradeable && current < maxLimit && <span className="text-[9px] text-amber-700 font-black tracking-widest uppercase bg-amber-950/20 px-2 py-0.5 rounded">COST: 100 EXP</span>}
                                  {upgradeable && current >= maxLimit && <span className="text-[9px] text-emerald-900 font-black tracking-widest uppercase bg-emerald-950/20 px-2 py-0.5 rounded">MAX LEVEL REACHED</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'NEW_SKILLS' && (
                  <div>
                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-3 border-b border-zinc-800 pb-2 mb-6">
                      <h3 className="text-lg md:text-xl font-black text-slate-100 uppercase tracking-widest">学习全新专长</h3>
                      <div className="flex flex-wrap gap-2 w-full md:w-auto">
                         <button onClick={() => setSkillFilter('ALL')} className={`flex-1 md:flex-none text-[10px] px-2 py-1.5 font-black uppercase transition-all ${skillFilter === 'ALL' ? 'bg-red-900 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'}`}>全部</button>
                         <button onClick={() => setSkillFilter('REGULAR')} className={`flex-1 md:flex-none text-[10px] px-2 py-1.5 font-black uppercase transition-all ${skillFilter === 'REGULAR' ? 'bg-red-900 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'}`}>常规</button>
                         <button onClick={() => setSkillFilter('FACTION')} className={`flex-1 md:flex-none text-[10px] px-2 py-1.5 font-black uppercase transition-all ${skillFilter === 'FACTION' ? 'bg-red-900 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'}`}>阵营</button>
                         <button onClick={() => setSkillFilter('KNOWLEDGE')} className={`flex-1 md:flex-none text-[10px] px-2 py-1.5 font-black uppercase transition-all ${skillFilter === 'KNOWLEDGE' ? 'bg-red-900 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'}`}>知识</button>
                         <button onClick={() => setSkillFilter('PSYKER')} className={`flex-1 md:flex-none text-[10px] px-2 py-1.5 font-black uppercase transition-all ${skillFilter === 'PSYKER' ? 'bg-red-900 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'}`}>灵能</button>
                      </div>
                    </div>

                    {newSkills.length > 0 && (
                      <div className="mb-8 p-4 bg-zinc-900/50 border border-zinc-800">
                        <div className="text-xs font-black text-emerald-600 mb-3 uppercase tracking-widest">本次提交通道 (Pending Learning)</div>
                        <div className="flex flex-wrap gap-2">
                           {newSkills.map(s => (
                             <div key={s.name} className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-900 px-3 py-1.5">
                               <span className="text-slate-200 text-sm font-bold">{s.name}</span>
                               <button onClick={() => handleRemoveNewSkill(s.name)} className="text-zinc-500 hover:text-red-500"><X size={14} /></button>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {filteredNewSkills().map((item, idx) => {
                         const sData = item.data;
                         return (
                           <button
                             key={`${item.type}-${sData.name}-${idx}`}
                             type="button"
                             onClick={() => {
                               handleAddNewSkill({
                                 name: sData.name,
                                 type: item.type,
                                 description: sData.desc,
                                 isUpgradeable: isSkillUpgradeable({ name: sData.name, isUpgradeable: sData.isUpgradeable, type: item.type }),
                                 maxLevel: sData.maxLevel || 5,
                                 traitChoices: sData.traitChoices
                               });
                             }}
                             className="group flex flex-col p-4 bg-zinc-950 border border-zinc-800 text-left hover:border-red-900 hover:bg-zinc-900 transition-all cursor-pointer relative min-h-[140px]"
                           >
                             <div className="flex justify-between items-center mb-2">
                               <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{item.category}</div>
                               <item.icon size={12} className="text-zinc-700 group-hover:text-red-500 transition-colors" />
                             </div>
                             <div className="text-sm font-black text-slate-200 group-hover:text-white uppercase mb-2 break-words leading-tight pr-4">{sData.name}</div>
                             <p className="text-[10px] text-zinc-500 leading-relaxed max-w-full overflow-hidden break-words mb-4">{sData.desc}</p>
                             <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all text-[9px] text-amber-600 font-extrabold uppercase bg-amber-900/20 px-2 py-1 rounded">
                               COST: 100 EXP <Plus size={10} className="inline ml-1" />
                             </div>
                           </button>
                         )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-zinc-900 bg-black flex justify-end gap-4 relative z-20">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-slate-200 transition-colors uppercase tracking-[0.2em] text-xs font-black"
            >
              终止协议
            </button>
            <button
              onClick={() => {
                onUpgrade(totalCost, attrUpgrades, skillUpgrades, newSkills);
                onClose();
              }}
              disabled={!hasChanges || !canAfford}
              className={`px-8 py-3 transition-colors uppercase tracking-[0.2em] text-xs font-black border flex items-center gap-2 ${(!hasChanges || !canAfford) ? 'bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed' : 'bg-red-900 border-red-700 text-white hover:bg-red-800 hover:shadow-[0_0_20px_rgba(153,27,27,0.4)] cursor-pointer'}`}
            >
              执行部署 <ArrowUpCircle size={14} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

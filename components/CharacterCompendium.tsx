import React, { useState, useEffect } from 'react';
import { NPCProfile } from '../types';
import { Button } from './Button';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, Plus, Skull, ArrowLeft, Check, Trash2, X as XIcon } from 'lucide-react';

import { getItemByName } from '../lib/armoryUtils';
import { NPC_TRAITS } from '../lib/knowledge/npc_traits';
import { TRAITS_RULES } from '../lib/knowledge/traits';
import { SKILLS_RULES } from '../lib/knowledge/skills';

const parseStringList = (str: any): string[] => {
  if (!str) return [];
  if (Array.isArray(str)) {
    const list: string[] = [];
    str.forEach(item => {
      if (typeof item === 'string') {
        const brackets = item.match(/【(.*?)】/g);
        if (brackets && brackets.length > 0) {
          brackets.forEach(b => list.push(b.replace(/[【】]/g, '').trim()));
        } else {
          item.split(/[,，、]/).forEach(s => {
            const trimmed = s.trim();
            if (trimmed) list.push(trimmed);
          });
        }
      } else if (item) {
        list.push(String(item));
      }
    });
    return list;
  }
  if (typeof str !== 'string') {
    str = String(str);
  }
  const brackets = str.match(/【(.*?)】/g);
  if (brackets && brackets.length > 0) {
     return brackets.map(b => b.replace(/[【】]/g, '').trim());
  }
  return str.split(/[,，、]/).map(s => s.trim()).filter(Boolean);
};

const npcTraitsMap = new Map<string, string>();
const npcSkillsMap = new Map<string, string>();

const addTraitToMap = (line: string) => {
  const trimmed = line.trim().replace(/^[>\s]+/, '');
  if (!trimmed.startsWith('|')) return;
  if (trimmed.includes(':---') || trimmed.includes('特质名称') || trimmed.includes('效果描述')) return;
  
  const parts = trimmed.split('|').map(p => p.trim());
  if (parts.length >= 5 && parts[2] && parts[3]) {
    npcTraitsMap.set(parts[2], parts[3]);
  } else if (parts.length >= 4 && parts[1] && parts[2]) {
    npcTraitsMap.set(parts[1], parts[2]);
  }
};

const addSkillToMap = (line: string) => {
  const trimmed = line.trim().replace(/^[>\s]+/, '');
  if (!trimmed.startsWith('|')) return;
  if (trimmed.includes(':---') || trimmed.includes('技能名称') || trimmed.includes('效果描述') || trimmed.includes('触发情境')) return;
  
  const parts = trimmed.split('|').map(p => p.trim());
  if (parts.length >= 7 && parts[1] && parts[5]) {
    // 5 columns (Psychic): Name | Rank | PR | Risk | Desc
    npcSkillsMap.set(parts[1], `等级: ${parts[2]} (PR: ${parts[3]}, 基础风险: ${parts[4]})\n${parts[5]}`);
  } else if (parts.length >= 6 && parts[1] && parts[2] && parts[3] && parts[4]) {
    if (!isNaN(Number(parts[3]))) {
      // 4 columns (Negative Psychic): Name | Rank | NR | Desc
      npcSkillsMap.set(parts[1], `等级: ${parts[2]} (NR: ${parts[3]})\n${parts[4]}`);
    } else {
      // 4 columns (Standard): Name | Trigger | Attr | Bonus
      npcSkillsMap.set(parts[1], `${parts[2]}\n关联属性: ${parts[3]} (${parts[4]})`);
    }
  } else if (parts.length >= 5 && parts[1] && parts[2] && parts[3]) {
     // 3 columns: Name | Max Level | Desc
     npcSkillsMap.set(parts[1], `等级上限: ${parts[2]}\n${parts[3]}`);
  } else if (parts.length >= 4 && parts[1] && parts[2]) {
     // 2 columns
     npcSkillsMap.set(parts[1], parts[2]);
  }
};

NPC_TRAITS.split('\n').forEach(addTraitToMap);
TRAITS_RULES.split('\n').forEach(addTraitToMap);
SKILLS_RULES.split('\n').forEach(addSkillToMap);

const getDescription = (name: string, type: 'trait' | 'skill' | 'gear'): string => {
  // Strip trailing notes in parentheses if matching fails
  const baseName = name.replace(/\s*\(.*?\)\s*/g, '').replace(/\s*（.*?）\s*/g, '').trim();

  if (type === 'trait') {
     if (npcTraitsMap.has(name)) return npcTraitsMap.get(name)!;
     if (npcTraitsMap.has(baseName)) return npcTraitsMap.get(baseName)!;
     return '未找到该特质的详细描述。';
  }
  if (type === 'skill') {
     if (npcSkillsMap.has(name)) return npcSkillsMap.get(name)!;
     if (npcSkillsMap.has(baseName)) return npcSkillsMap.get(baseName)!;
     // Many standard skills are just names.
     return '未找到该技能的详细描述。如果是常规技能，请参考知识库设定。';
  }
  if (type === 'gear') {
    const item = getItemByName(name);
    const targetItem = item || getItemByName(baseName);
    
    if (targetItem) {
      const stats = targetItem.stats || {};
      const parts: string[] = [];
      
      if (targetItem.category) parts.push(`类别: ${targetItem.category}`);
      
      const statLabels: Record<string, string> = {
        power: '力量(S)',
        damage: '伤害(D)',
        ap: '破甲(AP)',
        ar: '护甲值(AR)',
        toughness: '坚韧(T)',
        hp: '护甲耐久(AHP)',
        capacity: '弹容量',
        rateOfFire: '连射',
        wearer: '派系限定',
        mod: '属性修正'
      };

      Object.entries(stats).forEach(([k, v]) => {
        if (k === 'desc' || k === 'modes') return;
        const label = statLabels[k] || k;
        parts.push(`${label}: ${v}`);
      });

      const mainDesc = targetItem.desc || targetItem.description || '';
      return `${mainDesc}${parts.length > 0 ? '\n\n' + parts.join('\n') : ''}`;
    }
  }
  return `No ${type} description available for ${name}.`;
};

interface CharacterCompendiumProps {
  profiles: NPCProfile[];
  playerName?: string;
  onClose: () => void;
  onAddNPC: (name: string) => void;
  onUpdateNPC: (npc: NPCProfile) => void;
  onSyncNPC: (npcId: string) => void;
  onDeleteNPC: (npcId: string) => void;
  onMergeNPCs: (sourceIds: string[], targetId: string) => void;
  onMoveNPC: (id: string, direction: 'up' | 'down') => void;
  onBatchInferAppearances?: () => Promise<number>;
  onFormatRecords?: (npcId: string) => Promise<void>;
}

export const CharacterCompendium: React.FC<CharacterCompendiumProps> = ({ 
  profiles, 
  playerName,
  onClose, 
  onAddNPC, 
  onUpdateNPC,
  onSyncNPC,
  onDeleteNPC,
  onMergeNPCs,
  onMoveNPC,
  onBatchInferAppearances,
  onFormatRecords
}) => {
  console.log('CharacterCompendium received onDeleteNPC:', typeof onDeleteNPC);
  const [selectedNPCId, setSelectedNPCId] = useState<string | null>(null);
  const [newNPCName, setNewNPCName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [isBatchInferring, setIsBatchInferring] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [selectedMergeIds, setSelectedMergeIds] = useState<Set<string>>(new Set());
  const [deletingNPCId, setDeletingNPCId] = useState<string | null>(null);
  const [showMergeConfirm, setShowMergeConfirm] = useState(false);
  const [primaryMergeId, setPrimaryMergeId] = useState<string | null>(null);
  const [editedStatus, setEditedStatus] = useState('');
  const [editedParameters, setEditedParameters] = useState('');
  const [editedTrait, setEditedTrait] = useState('');
  const [editedSkill, setEditedSkill] = useState('');
  const [editedEquipment, setEditedEquipment] = useState('');
  const [editedItems, setEditedItems] = useState('');
  const [editedUserNotes, setEditedUserNotes] = useState('');
  const [editedOriginWorld, setEditedOriginWorld] = useState('');
  const [editedTags, setEditedTags] = useState<string>('');
  const [editedName, setEditedName] = useState('');
  const [editedBondLevel, setEditedBondLevel] = useState<number>(0);
  const [editedRecords, setEditedRecords] = useState<string>('');
  const [editedHasAppeared, setEditedHasAppeared] = useState<boolean>(false);
  const [editedIsImportant, setEditedIsImportant] = useState<boolean>(true);
  const [editedAppearanceTime, setEditedAppearanceTime] = useState('');
  const [editedAppearanceLocation, setEditedAppearanceLocation] = useState('');
  const [editedHP, setEditedHP] = useState<number>(0);
  const [editedMaxHP, setEditedMaxHP] = useState<number>(0);
  const [editedAHP, setEditedAHP] = useState<number>(0);
  const [editedMovement, setEditedMovement] = useState<number>(0);
  const [editedBMD, setEditedBMD] = useState('');
  const [editedWeaponStats, setEditedWeaponStats] = useState('');

  const selectedNPC = profiles.find(p => p.id === selectedNPCId) || null;

  const renderSafeString = (val: any): string => {
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) return val.join(', ');
    if (typeof val === 'object' && val !== null) {
      try {
        return Object.entries(val).map(([k, v]) => `${k}: ${v}`).join(', ');
      } catch {
        return JSON.stringify(val);
      }
    }
    return String(val || '');
  };

  // Sync editing states when selected NPC changes
  useEffect(() => {
    if (selectedNPC && !isEditing) {
      setEditedName(selectedNPC.name);
      setEditedStatus(selectedNPC.status || '');
      setEditedParameters(selectedNPC.parameters || '');
      setEditedTrait(selectedNPC.trait || '');
      setEditedSkill(selectedNPC.skill || '');
      setEditedEquipment(selectedNPC.equipment || '');
      setEditedItems(selectedNPC.items || '');
      setEditedOriginWorld(selectedNPC.originWorld || '');
      setEditedIsImportant(selectedNPC.isImportant !== false);
      
      // Combine AI record and user notes for editing
      let combinedNotes = selectedNPC.userNotes || '';
      if (selectedNPC.aiGeneratedRecord && !combinedNotes.includes(selectedNPC.aiGeneratedRecord)) {
        combinedNotes = combinedNotes ? `${selectedNPC.aiGeneratedRecord}\n\n${combinedNotes}` : selectedNPC.aiGeneratedRecord;
      }
      setEditedUserNotes(combinedNotes);
      
      setEditedTags((selectedNPC.tags || []).join(', '));
      setEditedBondLevel(selectedNPC.bondLevel ?? 0);
      setEditedHasAppeared(selectedNPC.hasAppeared ?? false);
      setEditedAppearanceTime(selectedNPC.appearanceTime || '');
      setEditedAppearanceLocation(selectedNPC.appearanceLocation || '');
      setEditedHP(selectedNPC.hp ?? 0);
      setEditedMaxHP(selectedNPC.maxHp ?? selectedNPC.hp ?? 0);
      setEditedAHP(selectedNPC.ahp ?? 0);
      setEditedMovement(selectedNPC.movement ?? 0);
      setEditedBMD(selectedNPC.baseMeleeDamage || '');
      setEditedWeaponStats(selectedNPC.weaponStats || '');
      setEditedRecords((selectedNPC.records || []).map(r => {
        let prefix = '';
        if (r.timestamp) prefix += `[${r.timestamp}]`;
        if (r.location) prefix += `[${r.location}]`;
        return prefix ? `${prefix} ${r.content}` : r.content;
      }).join('\n---\n'));
    }
  }, [selectedNPCId, profiles, isEditing]);

  const handleAdd = () => {
    if (newNPCName.trim()) {
      onAddNPC(newNPCName.trim());
      setNewNPCName('');
      setIsAdding(false);
    }
  };

  const handleEdit = (npc: NPCProfile) => {
    setIsEditing(true);
    // State is synced by useEffect, but we ensure it here for immediate feedback
    setEditedName(npc.name);
    setEditedStatus(npc.status || '');
    setEditedParameters(npc.parameters || '');
    setEditedTrait(npc.trait || '');
    setEditedSkill(npc.skill || '');
    setEditedEquipment(npc.equipment || '');
    setEditedItems(npc.items || '');
    setEditedOriginWorld(npc.originWorld || '');
    
    let combinedNotes = npc.userNotes || '';
    if (npc.aiGeneratedRecord && !combinedNotes.includes(npc.aiGeneratedRecord)) {
      combinedNotes = combinedNotes ? `${npc.aiGeneratedRecord}\n\n${combinedNotes}` : npc.aiGeneratedRecord;
    }
    setEditedUserNotes(combinedNotes);
    
    setEditedTags((npc.tags || []).join(', '));
    setEditedIsImportant(npc.isImportant !== false);
    setEditedBondLevel(npc.bondLevel ?? 0);
    setEditedHasAppeared(npc.hasAppeared ?? false);
    setEditedAppearanceTime(npc.appearanceTime || '');
    setEditedAppearanceLocation(npc.appearanceLocation || '');
    setEditedHP(npc.hp ?? 0);
    setEditedMaxHP(npc.maxHp ?? npc.hp ?? 0);
    setEditedAHP(npc.ahp ?? 0);
    setEditedMovement(npc.movement ?? 0);
    setEditedBMD(npc.baseMeleeDamage || '');
    setEditedWeaponStats(npc.weaponStats || '');
    setEditedRecords((npc.records || []).map(r => {
      let prefix = '';
      if (r.timestamp) prefix += `[${r.timestamp}]`;
      if (r.location) prefix += `[${r.location}]`;
      return prefix ? `${prefix} ${r.content}` : r.content;
    }).join('\n---\n'));
  };

  const handleSave = () => {
    if (selectedNPC) {
      const recordLines = editedRecords.split(/\s*---\s*/)
        .map(line => line.trim())
        .filter(line => line);
      
      const existingRecords = [...(selectedNPC.records || [])];
      const updatedRecords = recordLines.map((line, index) => {
        let timestamp = '';
        let location = '';
        let content = line;

        // Parse [timestamp][location] content
        const timeMatch = content.match(/^\[(.*?)\]/);
        if (timeMatch) {
          timestamp = timeMatch[1];
          content = content.substring(timeMatch[0].length).trim();
          
          const locMatch = content.match(/^\[(.*?)\]/);
          if (locMatch) {
            location = locMatch[1];
            content = content.substring(locMatch[0].length).trim();
          }
        }

        const matchIndex = existingRecords.findIndex(r => r.content.trim() === content);
        let existing = null;
        if (matchIndex !== -1) {
          existing = existingRecords[matchIndex];
          existingRecords.splice(matchIndex, 1); // Remove so it's not matched again
        }
        return {
          id: existing?.id || `rec_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 5)}`,
          content,
          timestamp: timestamp || existing?.timestamp || new Date().toLocaleString(),
          location: location || existing?.location
        };
      });

      const updatedNPC: NPCProfile = {
        ...selectedNPC,
        name: editedName,
        status: editedStatus,
        parameters: editedParameters,
        trait: editedTrait,
        skill: editedSkill,
        equipment: editedEquipment,
        items: editedItems,
        originWorld: editedOriginWorld,
        aiGeneratedRecord: '', // Clear since it's merged into userNotes
        userNotes: editedUserNotes,
        tags: editedTags.split(',').map(t => t.trim()).filter(t => t),
        isImportant: editedIsImportant,
        bondLevel: editedBondLevel,
        hasAppeared: editedHasAppeared,
        appearanceTime: editedAppearanceTime,
        appearanceLocation: editedAppearanceLocation,
        hp: editedHP,
        maxHp: editedMaxHP,
        ahp: editedAHP,
        movement: editedMovement,
        baseMeleeDamage: editedBMD,
        weaponStats: editedWeaponStats,
        records: updatedRecords,
        hiddenNotes: selectedNPC.hiddenNotes,
        lastUpdated: Date.now()
      };
      onUpdateNPC(updatedNPC);
    }
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/95 overflow-hidden imperial-terminal font-sans">
      {/* Mobile Close Button - Aligned with the user's report about missing exit button */}
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 z-[200] md:hidden p-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white shadow-2xl"
        title="关闭图鉴"
      >
        <XIcon size={24} />
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-6xl h-full md:h-[90vh] flex bg-black border-2 border-zinc-900 shadow-[0_0_100px_rgba(0,0,0,1)] relative z-[1000] overflow-hidden"
      >
        {/* Superior Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-imperial-red to-transparent z-50" />

        {/* Sidebar List */}
        <div className={`
          ${selectedNPCId ? 'hidden md:flex' : 'flex'} 
          w-full md:w-1/3 border-r-2 border-zinc-900 flex-col bg-zinc-950/50 shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-10
        `}>
          <div className="p-4 md:p-5 border-b-2 border-zinc-900 bg-black flex justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
               <h2 className="text-[9px] md:text-[10px] font-mono text-imperial-gold tracking-[0.2em] md:tracking-[0.3em] uppercase">档案库索引 [ARCHIVE-INDEX]</h2>
               <p className="text-[8px] md:text-[9px] text-zinc-600 font-mono mt-0.5 md:mt-1">TOTAL ENTRIES: {profiles.length}</p>
            </div>
            
            <div className="flex gap-1 md:gap-2 relative z-10">
              <button 
                onClick={() => setIsAdding(true)}
                className="p-1.5 md:p-2 border border-zinc-800 text-zinc-500 hover:text-white hover:border-imperial-red transition-all"
              >
                <Plus size={14} className="md:w-4 md:h-4" />
              </button>
              <button 
                onClick={onClose}
                className="p-1.5 md:p-2 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-300 transition-all font-mono text-[9px] md:text-[10px]"
              >
                [X]
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-zinc-900/20 border-b border-zinc-800 flex gap-2">
             <button 
                onClick={() => {
                  setIsMerging(!isMerging);
                  setSelectedMergeIds(new Set());
                }}
                className={`flex-1 py-1.5 border font-mono text-[9px] uppercase tracking-[0.2em] transition-all ${isMerging ? 'bg-imperial-gold text-black border-imperial-gold' : 'border-zinc-800 text-zinc-600 hover:text-zinc-300'}`}
             >
                {isMerging ? 'CANCEL MERGE' : 'MERGE MODE'}
             </button>
             {onBatchInferAppearances && (
                <button 
                  onClick={async () => {
                    setIsBatchInferring(true);
                    try {
                      const count = await onBatchInferAppearances();
                      console.log(`已更新 ${count} 条记录。`);
                    } catch (e) {
                      console.error(`失败: ${String(e)}`);
                    } finally {
                      setIsBatchInferring(false);
                    }
                  }}
                  className="px-3 py-1.5 border border-zinc-800 text-zinc-600 hover:text-purple-400 font-mono text-[9px] uppercase"
                >
                   {isBatchInferring ? '...' : 'INFER'}
                </button>
             )}
          </div>
          
          {isMerging && selectedMergeIds.size >= 2 && (
            <div className="p-3 border-b border-amber-900/30 bg-amber-950/20">
              <Button 
                onClick={() => {
                  setPrimaryMergeId(Array.from(selectedMergeIds)[0]);
                  setShowMergeConfirm(true);
                }} 
                className="w-full text-xs py-2 bg-amber-600 hover:bg-amber-500"
              >
                确认合并 ({selectedMergeIds.size} 个角色)
              </Button>
            </div>
          )}
          {isAdding && (
            <div className="p-3 border-b border-zinc-800 bg-zinc-900">
              <input 
                className="w-full bg-zinc-950 border border-zinc-700 text-zinc-200 px-3 py-2 text-sm mb-2 rounded-none"
                placeholder="输入NPC名称..."
                value={newNPCName}
                onChange={(e) => setNewNPCName(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <Button onClick={handleAdd} className="flex-1 text-xs py-2">确认</Button>
                <Button onClick={() => setIsAdding(false)} variant="ghost" className="flex-1 text-xs py-2">取消</Button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            {profiles.filter(npc => npc && npc.id !== 'holy-grail-system' && (playerName ? npc.name !== playerName : true) && npc.id !== 'historical-system').length === 0 ? (
              <div className="p-4 text-center text-zinc-500 text-sm italic">
                暂无记录。请等待 AI 引入新角色或手动添加。
              </div>
            ) : (
              profiles.filter(npc => npc && npc.id !== 'holy-grail-system' && (playerName ? npc.name !== playerName : true) && npc.id !== 'historical-system').map((npc, idx) => {
                const displayName = npc.id === 'historical-system' ? '战略情报枢纽' : npc.name;
                return (
                <div 
                  key={`npc-${npc.id || ''}-${idx}`}
                  onClick={() => {
                    if (isEditing || isAdding) return;
                    if (isMerging) {
                      const next = new Set(selectedMergeIds);
                      if (next.has(npc.id)) next.delete(npc.id);
                      else next.add(npc.id);
                      setSelectedMergeIds(next);
                    } else {
                      setSelectedNPCId(npc.id);
                    }
                  }}
                  className={`
                    p-4 border-b border-zinc-900 cursor-pointer transition-all flex items-center gap-4 relative group
                    ${selectedNPCId === npc.id && !isMerging ? 'bg-zinc-900/50 border-l-4 border-l-imperial-red shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]' : 'hover:bg-zinc-900/30'}
                    ${isMerging && selectedMergeIds.has(npc.id) ? 'bg-amber-950/20 shadow-[inset_0_0_15px_rgba(197,160,89,0.1)]' : ''}
                    ${(isEditing || isAdding) ? 'opacity-30 cursor-not-allowed' : ''}
                  `}
                >
                  {isMerging && (
                    <div className={`w-4 h-4 border-2 flex items-center justify-center transition-all ${selectedMergeIds.has(npc.id) ? 'bg-imperial-gold border-imperial-gold' : 'border-zinc-800'}`}>
                      {selectedMergeIds.has(npc.id) && <Check size={10} className="text-black" />}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className={`font-mono text-xs tracking-widest uppercase transition-colors ${selectedNPCId === npc.id ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{displayName}</div>
                    <div className="text-[9px] text-zinc-700 font-mono mt-1 truncate uppercase tracking-tighter">{npc.aiGeneratedRecord || npc.userNotes || 'NO DATA TRACE'}</div>
                  </div>
                  {!isMerging && !isAdding && !isEditing && (
                    <div className="flex flex-col gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onMoveNPC(npc.id, 'up'); }}
                        disabled={idx === 0}
                        className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                        title="上移"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onMoveNPC(npc.id, 'down'); }}
                        disabled={idx === profiles.filter(n => n.id !== 'holy-grail-system' && (playerName ? n.name !== playerName : true) && n.id !== 'historical-system').length - 1}
                        className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                        title="下移"
                      >
                        <ChevronDown size={14} />
                      </button>
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          if (confirm(`确认要抹除角色 [${npc.name}] 的档案吗？`)) {
                            onDeleteNPC(npc.id);
                            if (selectedNPCId === npc.id) setSelectedNPCId(null);
                          }
                        }}
                        className="p-1 text-zinc-700 hover:text-red-500"
                        title="抹除档案"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </div>
                );
              })
            )}
          </div>
        </div>

        {/* Detail View */}
        <div className={`
          ${selectedNPCId ? 'flex' : 'hidden md:flex'} 
          flex-1 flex-col bg-zinc-950 relative
        `}>
          {selectedNPC ? (
            <>
              <div className="p-6 border-b-2 border-zinc-900 flex flex-col md:flex-row justify-between items-start bg-black gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 opacity-[0.03] select-none pointer-events-none">
                   <Skull size={100} />
                </div>
                
                <div className="flex items-center gap-5 w-full md:w-auto relative z-10">
                  <button 
                    onClick={() => setSelectedNPCId(null)}
                    className="md:hidden p-2 border border-zinc-800 text-zinc-500 hover:text-white"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                       <h2 className="text-xl md:text-3xl font-mono text-white tracking-widest uppercase">{selectedNPC.name}</h2>
                       <div className="px-2 py-0.5 bg-imperial-red/20 border border-imperial-red/40 text-imperial-red text-[8px] font-mono animate-pulse">CLASSIFIED</div>
                    </div>
                    <div className="text-[9px] md:text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
                       Last Sync: {selectedNPC.lastUpdated ? new Date(selectedNPC.lastUpdated).toISOString().replace('T', ' ').substring(0, 19) : 'UNKNOWN'} // REF: {selectedNPC.id?.substring(0,8).toUpperCase() || 'N/A'}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 w-full md:w-auto relative z-10">
                  <button 
                    onClick={() => onSyncNPC(selectedNPC.id)}
                    className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-imperial-gold hover:border-imperial-gold transition-all font-mono text-[10px] uppercase tracking-widest"
                  >
                    [SYNC] 指令集同步
                  </button>
                  <button 
                    type="button"
                    id="purge-npc-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!selectedNPC || !selectedNPC.id) return;
                      
                      if (deletingNPCId === selectedNPC.id) {
                        if (typeof onDeleteNPC === 'function') {
                          onDeleteNPC(selectedNPC.id);
                          setSelectedNPCId(null);
                          setDeletingNPCId(null);
                        }
                      } else {
                        setDeletingNPCId(selectedNPC.id);
                      }
                    }}
                    onMouseLeave={() => setDeletingNPCId(null)}
                    className={`px-4 py-2 border transition-all font-mono text-[10px] uppercase tracking-widest min-w-[120px] ${
                      deletingNPCId === selectedNPC.id
                        ? 'bg-red-900/40 border-red-500 text-white animate-pulse'
                        : 'border-zinc-700 text-zinc-500 hover:text-imperial-red hover:border-imperial-red hover:bg-imperial-red/10 bg-zinc-900/50'
                    }`}
                  >
                    {deletingNPCId === selectedNPC.id ? '确认抹除档案吗？' : '[PURGE] 格式化'}
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {/* Status Section */}
                <section>
                  <div className="flex justify-between items-center mb-2 border-b border-zinc-800 pb-1">
                    <h3 className="text-[10px] md:text-sm font-bold text-zinc-400 uppercase tracking-wider">
                      状态与描述
                    </h3>
                    {!isEditing ? (
                      <Button onClick={() => handleEdit(selectedNPC)} variant="ghost" className="text-[9px] py-0.5 h-auto text-amber-500 hover:text-amber-400">编辑</Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => {
                            setIsEditing(false);
                            // Re-sync from current NPC
                            if (selectedNPC) {
                              setEditedName(selectedNPC.name);
                              setEditedStatus(selectedNPC.status || '');
                              setEditedOriginWorld(selectedNPC.originWorld || '');
                              
                              let combinedNotes = selectedNPC.userNotes || '';
                              if (selectedNPC.aiGeneratedRecord && !combinedNotes.includes(selectedNPC.aiGeneratedRecord)) {
                                combinedNotes = combinedNotes ? `${selectedNPC.aiGeneratedRecord}\n\n${combinedNotes}` : selectedNPC.aiGeneratedRecord;
                              }
                              setEditedUserNotes(combinedNotes);
                              
                              setEditedTags((selectedNPC.tags || []).join(', '));
                              setEditedBondLevel(selectedNPC.bondLevel ?? 0);
                              setEditedRecords((selectedNPC.records || []).map(r => r.content).join('\n---\n'));
                            }
                          }} 
                          variant="ghost" 
                          className="text-[9px] py-0.5 h-auto text-zinc-500 hover:text-zinc-400"
                        >
                          取消
                        </Button>
                        <Button onClick={handleSave} variant="ghost" className="text-[9px] py-0.5 h-auto text-green-500 hover:text-green-400">保存</Button>
                      </div>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="space-y-2">
                        <input className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm" value={editedName} onChange={(e) => setEditedName(e.target.value)} placeholder="名称..." />
                        <input className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm" value={editedOriginWorld} onChange={(e) => setEditedOriginWorld(e.target.value)} placeholder="母星 (如 泰拉, 马库拉格)..." />
                        <textarea className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm min-h-[100px]" value={editedUserNotes} onChange={(e) => setEditedUserNotes(e.target.value)} placeholder="综合记录 (档案快照/审判记录)..." />
                        <textarea className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm min-h-[100px]" value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} placeholder="生命/机能状态..." />
                        <textarea className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm min-h-[100px]" value={editedParameters} onChange={(e) => setEditedParameters(e.target.value)} placeholder="战力评估 (如 WS 50, BS 55)..." />
                        <textarea className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm min-h-[100px]" value={editedTrait} onChange={(e) => setEditedTrait(e.target.value)} placeholder="特质" />
                        <textarea className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm min-h-[100px]" value={editedSkill} onChange={(e) => setEditedSkill(e.target.value)} placeholder="技能" />
                        <textarea className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm min-h-[100px]" value={editedEquipment} onChange={(e) => setEditedEquipment(e.target.value)} placeholder="装备" />
                        <textarea className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm min-h-[100px]" value={editedItems} onChange={(e) => setEditedItems(e.target.value)} placeholder="物品" />
                        <div className="flex items-center gap-2">
                            <label className="text-xs text-zinc-400">忠诚等级 (0-5):</label>
                            <input type="number" min="0" max="5" className="w-16 bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm" value={editedBondLevel} onChange={(e) => setEditedBondLevel(parseInt(e.target.value))} />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-xs text-zinc-400">是否登场:</label>
                            <input type="checkbox" className="bg-zinc-900 border border-zinc-700" checked={editedHasAppeared} onChange={(e) => setEditedHasAppeared(e.target.checked)} />
                        </div>
                        {editedHasAppeared && (
                          <>
                            <input className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm" value={editedAppearanceTime} onChange={(e) => setEditedAppearanceTime(e.target.value)} placeholder="登场时间..." />
                            <input className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm" value={editedAppearanceLocation} onChange={(e) => setEditedAppearanceLocation(e.target.value)} placeholder="登场地点..." />
                          </>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                           <div className="flex flex-col">
                             <label className="text-[9px] text-zinc-500 uppercase">HP / MaxHP</label>
                             <div className="flex gap-1">
                               <input type="number" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm" value={editedHP} onChange={(e) => setEditedHP(parseInt(e.target.value))} />
                               <span className="text-zinc-600">/</span>
                               <input type="number" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm" value={editedMaxHP} onChange={(e) => setEditedMaxHP(parseInt(e.target.value))} />
                             </div>
                           </div>
                           <div className="flex flex-col">
                             <label className="text-[9px] text-zinc-500 uppercase">AHP</label>
                             <input type="number" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm" value={editedAHP} onChange={(e) => setEditedAHP(parseInt(e.target.value))} />
                           </div>
                           <div className="flex flex-col">
                             <label className="text-[9px] text-zinc-500 uppercase">MV</label>
                             <input type="number" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm" value={editedMovement} onChange={(e) => setEditedMovement(parseInt(e.target.value))} />
                           </div>
                           <div className="flex flex-col">
                             <label className="text-[9px] text-zinc-500 uppercase">BMD</label>
                             <input className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm" value={editedBMD} onChange={(e) => setEditedBMD(e.target.value)} />
                           </div>
                        </div>
                        <input className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm font-mono" value={editedWeaponStats} onChange={(e) => setEditedWeaponStats(e.target.value)} placeholder="火力配置 Weapon Stats (e.g. 爆弹枪(S:4 D:2))..." />
                        <textarea className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm min-h-[100px]" value={editedRecords} onChange={(e) => setEditedRecords(e.target.value)} placeholder="重要记录 (格式: [时间][地点] 内容，用 --- 分隔)..." />
                    </div>
                  ) : (
                    <div className="bg-zinc-900/30 p-2 md:p-4 border border-zinc-800 rounded-none text-[10px] md:text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                      <div className="mb-2 font-bold flex flex-col">
                        <span className="text-green-500 text-[10px] uppercase tracking-tighter opacity-70">综合档案:</span>
                        <span>
                          {selectedNPC.aiGeneratedRecord && !((selectedNPC.userNotes || '').includes(selectedNPC.aiGeneratedRecord)) 
                            ? `${selectedNPC.aiGeneratedRecord}\n\n${selectedNPC.userNotes || ''}`.trim() 
                            : (selectedNPC.userNotes || selectedNPC.aiGeneratedRecord || '暂无机密记录')}
                        </span>
                      </div>
                      <div className="mb-2 text-amber-500">忠诚等级: {selectedNPC.bondLevel ?? 1}</div>
                      <div className="mb-2 text-purple-400 font-mono text-xs">
                        远征状态: {selectedNPC.hasAppeared ? `已就位 (${selectedNPC.appearanceTime || '未知时间'} @ ${selectedNPC.appearanceLocation || '未知坐标'})` : '未进入视界'}
                      </div>
                      {selectedNPC.originWorld && (
                        <div className="mb-2 text-cyan-400 font-mono text-xs">
                          母星/出身: {selectedNPC.originWorld}
                        </div>
                      )}
                      <div className="mb-2">
                        <span className="text-blue-400 font-bold">机能状态: </span>
                        {renderSafeString(selectedNPC.status) || '暂无描述。'}
                      </div>
                      
                      {/* Combat Stats Section */}
                      {(selectedNPC.hp !== undefined || selectedNPC.weaponStats) && (
                        <div className="mb-4 p-2 bg-zinc-950/50 border border-zinc-800/50 rounded-none border-l-2 border-l-cyan-600">
                          <div className="text-[9px] text-cyan-500 font-bold mb-1 uppercase tracking-tighter">战斗规格 (Tactical Specs):</div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] mb-2 font-mono">
                            <div className="flex justify-between border-b border-zinc-800 pb-0.5"><span className="text-zinc-500">HP:</span> <span className="text-zinc-200">{selectedNPC.hp}/{selectedNPC.maxHp || selectedNPC.hp}</span></div>
                            <div className="flex justify-between border-b border-zinc-800 pb-0.5"><span className="text-zinc-500">AHP:</span> <span className="text-zinc-200">{selectedNPC.ahp || 0}</span></div>
                            <div className="flex justify-between border-b border-zinc-800 pb-0.5"><span className="text-zinc-500">MV:</span> <span className="text-zinc-200">{selectedNPC.movement}m</span></div>
                            <div className="flex justify-between border-b border-zinc-800 pb-0.5"><span className="text-zinc-500">BMD:</span> <span className="text-zinc-200">{selectedNPC.baseMeleeDamage}</span></div>
                          </div>
                          {selectedNPC.weaponStats && (
                            <div className="text-[10px] font-mono">
                              <span className="text-zinc-500">火力配置:</span>
                              <div className="text-amber-400/90 italic">{selectedNPC.weaponStats}</div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mb-2">
                        <span className="text-purple-400 font-bold">战力/属性评估: </span>
                        {renderSafeString(selectedNPC.parameters) || '未进行深度扫描。'}
                      </div>
                      <div className="mb-2">
                        <span className="text-pink-400 font-bold text-[10px] uppercase">特质 (TRAITS): </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {parseStringList(selectedNPC.trait).map((t, idx) => (
                             <div key={`trait-${idx}`} className="group relative">
                               <div className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[10px] text-pink-300/80 font-mono uppercase tracking-tight hover:border-pink-500/50 transition-colors cursor-help">
                                 {t}
                               </div>
                               <div className="absolute left-0 bottom-full mb-2 w-72 p-4 bg-zinc-950/95 border-2 border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.9)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] text-[10px] leading-relaxed text-zinc-400 font-mono backdrop-blur-sm">
                                 <div className="text-pink-400 mb-2 font-bold border-b border-zinc-800 pb-1 flex justify-between items-center">
                                   <span className="truncate mr-2 uppercase tracking-tight">{t}</span>
                                   <span className="text-[7px] opacity-50 uppercase tracking-widest bg-pink-900/20 px-1 border border-pink-900/30 font-black">TRAIT</span>
                                 </div>
                                 <div className="whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar pr-1">{getDescription(t, 'trait')}</div>
                                 <div className="mt-2 pt-2 border-t border-zinc-900 text-[8px] text-zinc-600 italic flex justify-between">
                                    <span>DATA RECONSTRUCTION COMPLETE</span>
                                    <span>[0x7A]</span>
                                 </div>
                               </div>
                             </div>
                          ))}
                          {parseStringList(selectedNPC.trait).length === 0 && <span className="text-zinc-600 font-mono text-[10px]">无记录</span>}
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="text-blue-400 font-bold text-[10px] uppercase">技能 (SKILLS): </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {parseStringList(selectedNPC.skill).map((t, idx) => (
                             <div key={`skill-${idx}`} className="group relative">
                               <div className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[10px] text-blue-300/80 font-mono uppercase tracking-tight hover:border-blue-500/50 transition-colors cursor-help">
                                 {t}
                               </div>
                               <div className="absolute left-0 bottom-full mb-2 w-72 p-4 bg-zinc-950/95 border-2 border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.9)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] text-[10px] leading-relaxed text-zinc-400 font-mono backdrop-blur-sm">
                                 <div className="text-blue-400 mb-2 font-bold border-b border-zinc-800 pb-1 flex justify-between items-center">
                                   <span className="truncate mr-2 uppercase tracking-tight">{t}</span>
                                   <span className="text-[7px] opacity-50 uppercase tracking-widest bg-blue-900/20 px-1 border border-blue-900/30 font-black">SKILL</span>
                                 </div>
                                 <div className="whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar pr-1">{getDescription(t, 'skill')}</div>
                                 <div className="mt-2 pt-2 border-t border-zinc-900 text-[8px] text-zinc-600 italic flex justify-between">
                                    <span>COGNIS-SIGNAL ACQUIRED</span>
                                    <span>[0x4C]</span>
                                 </div>
                               </div>
                             </div>
                          ))}
                          {parseStringList(selectedNPC.skill).length === 0 && <span className="text-zinc-600 font-mono text-[10px]">无记录</span>}
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="text-amber-400 font-bold text-[10px] uppercase">配属装备与圣物 (WARGEAR): </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {[...parseStringList(selectedNPC.equipment), ...parseStringList(selectedNPC.items)].map((t, idx) => (
                             <div key={`gear-${idx}`} className="group relative">
                               <div className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[10px] text-amber-300/80 font-mono uppercase tracking-tight hover:border-amber-500/50 transition-colors cursor-help">
                                 {t}
                               </div>
                               <div className="absolute lg:left-0 lg:bottom-full right-0 bottom-full mb-2 w-80 p-4 bg-zinc-950/95 border-2 border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.9)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] text-[10px] leading-relaxed text-zinc-400 font-mono backdrop-blur-sm">
                                 <div className="text-amber-400 mb-2 font-bold border-b border-zinc-800 pb-1 flex justify-between items-center">
                                   <span className="truncate mr-2 uppercase tracking-tight">{t}</span>
                                   <span className="text-[7px] opacity-50 uppercase tracking-widest bg-amber-900/20 px-1 border border-amber-900/30 font-black">GEAR/RELIQUARY</span>
                                 </div>
                                 <div className="whitespace-pre-wrap max-h-60 overflow-y-auto custom-scrollbar pr-1">{getDescription(t, 'gear')}</div>
                                 <div className="mt-2 pt-2 border-t border-zinc-900 text-[8px] text-zinc-600 italic flex justify-between">
                                    <span>OMNISSIAH BLESSED CALIBRATION</span>
                                    <span>[0xFF]</span>
                                 </div>
                               </div>
                             </div>
                          ))}
                          {([...parseStringList(selectedNPC.equipment), ...parseStringList(selectedNPC.items)]).length === 0 && <span className="text-zinc-600 font-mono text-[10px]">无记录</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                {/* Tags Section */}
                <section>
                  <h3 className="text-[10px] md:text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 border-b border-zinc-800 pb-1">
                    标签
                  </h3>
                  {isEditing ? (
                    <input className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-2 py-1 text-sm" value={editedTags} onChange={(e) => setEditedTags(e.target.value)} placeholder="标签1, 标签2..." />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(selectedNPC.tags || []).length === 0 ? (
                        <div className="text-zinc-600 italic text-[10px] md:text-sm">暂无标签。</div>
                      ) : (
                        selectedNPC.tags.map((tag: any, idx: number) => (
                          <span key={`${renderSafeString(tag)}-${idx}`} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-[10px] rounded-full">{renderSafeString(tag)}</span>
                        ))
                      )}
                    </div>
                  )}
                </section>

                {/* Records Section */}
                <section>
                  <div className="flex justify-between items-center mb-2 border-b border-zinc-800 pb-1">
                    <h3 className="text-[10px] md:text-sm font-bold text-zinc-400 uppercase tracking-wider">
                      重要记录
                    </h3>
                    {onFormatRecords && !isEditing && (selectedNPC.records || []).length > 0 && (
                      <Button
                        onClick={async () => {
                          setIsFormatting(true);
                          try {
                            await onFormatRecords(selectedNPC.id);
                            alert('格式校正完成！');
                          } catch(e) {
                            alert(`校正失败: ${e instanceof Error ? e.message : String(e)}`);
                          } finally {
                            setIsFormatting(false);
                          }
                        }}
                        variant="ghost"
                        className="text-[9px] py-0.5 h-auto text-cyan-500 hover:text-cyan-400"
                        disabled={isFormatting}
                      >
                        {isFormatting ? '校正中...' : '格式校正'}
                      </Button>
                    )}
                  </div>
                  <div className="bg-zinc-900/30 p-2 md:p-4 border border-zinc-800 rounded-none text-[10px] md:text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed min-h-[200px]">
                    {(selectedNPC.records || []).length === 0 ? (
                      <div className="text-zinc-600 italic">暂无事件记录。</div>
                    ) : (
                      selectedNPC.records.map((record, idx) => (
                        <div key={`rec-${record.id || ''}-${idx}`} className="mb-3 border-b border-zinc-800/50 pb-2 last:border-0 last:mb-0 last:pb-0">
                          <div className="text-[8px] md:text-xs text-zinc-500 mb-1 font-mono">
                            {record.timestamp} {record.location && record.location !== "地点" && record.location !== "未知地点" && <span className="text-emerald-500/70 ml-1">@{record.location}</span>}
                          </div>
                          <div className="text-[10px] md:text-sm text-zinc-300 leading-relaxed">{record.content}</div>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-600 italic p-4 text-center">
              请选择一个实体档案以进行深度访问。
            </div>
          )}

          {/* Footer */}
          <div className="p-3 md:p-4 border-t border-slate-800 flex justify-end">
            <Button onClick={onClose} variant="secondary" className="text-xs">断开链接</Button>
          </div>
        </div>

        {/* Merge Confirmation Modal */}
        <AnimatePresence>
          {showMergeConfirm && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-lg bg-zinc-950 border border-amber-900/50 rounded-none-3xl p-8 shadow-2xl space-y-6"
              >
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-mono text-amber-100 uppercase tracking-wider">合并角色资料</h3>
                  <p className="text-zinc-400 text-sm">请选择一个作为**主要资料**（保留其基本信息），其他角色的记录和备注将合并至其中。</p>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2 p-2 bg-zinc-900/50 rounded-none border border-zinc-800">
                  {Array.from(selectedMergeIds).map((id, idx) => {
                    const npc = profiles.find(p => p.id === id);
                    if (!npc) return null;
                    return (
                      <div 
                        key={`merge-${id || ''}-${idx}`}
                        onClick={() => setPrimaryMergeId(id)}
                        className={`p-3 rounded-none cursor-pointer border transition-all ${primaryMergeId === id ? 'bg-amber-500/20 border-amber-500 text-amber-100' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                      >
                        <div className="font-bold text-sm">{npc.name}</div>
                        <div className="text-[10px] opacity-60 truncate">{npc.aiGeneratedRecord || npc.userNotes || '暂无描述'}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={() => {
                      if (primaryMergeId) {
                        onMergeNPCs(Array.from(selectedMergeIds), primaryMergeId);
                        setIsMerging(false);
                        setSelectedMergeIds(new Set());
                        setShowMergeConfirm(false);
                        setSelectedNPCId(null);
                      }
                    }}
                    className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold tracking-widest uppercase"
                  >
                    确认合并
                  </Button>
                  <Button 
                    onClick={() => setShowMergeConfirm(false)}
                    variant="ghost"
                    className="w-full py-2 text-zinc-500 hover:text-zinc-300"
                  >
                    取消
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

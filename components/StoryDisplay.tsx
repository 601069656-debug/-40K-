import React, { useEffect, useRef, useState } from 'react';
import { Message, Character, Role, UnitType, NPCProfile } from '../types';
import { THEME_COLORS } from '../constants';
import { Button } from './Button';
import { ArrowDown, Sparkles, Skull, Zap, ChevronDown, ChevronUp, MessageSquare, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StoryDisplayProps {
  messages: Message[];
  character: Character;
  isTyping: boolean;
  onUpdateMessage: (id: string, newContent: string) => void;
  onDeleteMessage: (id: string) => void;
  selectedMessageIds: Set<string>;
  onToggleMessageSelection: (id: string) => void;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  isEditMode?: boolean;
  isSyncMode?: boolean;
  onUpdateNPC?: (npc: NPCProfile) => void;
   // Add /* removed warState */
}

// Sub-component to handle the Memory Block (Details/Summary)
const MemoryBlock: React.FC<{ 
  messageId: string; 
  prefixText: string; 
  detailsBlock: string;
  fullOriginalContent: string;
  colors: { bg: string; text: string; accent: string; border: string };
  onUpdate: (id: string, newContent: string) => void;
  renderStyledText: (text: string) => React.ReactNode;
  isEditMode: boolean;
}> = ({ messageId, prefixText, detailsBlock, fullOriginalContent, colors, onUpdate, renderStyledText, isEditMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(detailsBlock);
  
  // Extract summary text for display
  const summaryRegex = /(?:<summary>|前情提要|剧情总结|剧情回顾|关键事件|叙事影响|Chronicle|Recap|Summary)[:：\s]*([\s\S]*?)(?:<\/summary>|\n|$)/i;
  const summaryMatch = detailsBlock.match(summaryRegex);
  let summaryText = summaryMatch ? summaryMatch[1].trim() : "系统记录/记忆区块";
  
  // Clean up summaryText if it's too long
  if (summaryText.length > 40) {
    summaryText = summaryText.substring(0, 40) + "...";
  }
  
  // Extract body for display
  let bodyText = detailsBlock.replace(/<summary>[\s\S]*?<\/summary>/g, '').replace(/<\/?details>/g, '').trim();

  // Minimal hide-only for strictly technical structural tags
  const cleanTechnicalNoise = (text: string) => {
    let cleaned = text
      .replace(/<thought\b[^>]*>[\s\S]*?<\/thought\s*>/gi, '')
      .replace(/<think\b[^>]*>[\s\S]*?<\/think\s*>/gi, '')
      // Also remove any leaked thinking process that has a closing tag but lacks a proper opening tag
      // (i.e. anything from the start of the string up to </thought> or </think> inclusive)
      .replace(/^[\s\S]*?<\/thought\s*>/gi, '')
      .replace(/^[\s\S]*?<\/think\s*>/gi, '')
      .replace(/\[LOG_DATA\][\s\S]*?\[LOG_DATA\]/gi, '') // Remove technical logs
      .replace(/^\s*\*\*.*?\*\*\s*(\r?\n|$)/gim, '') // Remove bold headers like **Refining the Narrative**
      .replace(/^\s*\* (?:Refining|Drafting|Addressing|Reality|Polish|Optimizing|Self-Correction|Step-by-step|Must start with|No modern slang|Keep .*? persona|Update Status|Determining|Assessing|Preparing|Ensuring|Solidifying|Considering|Anticipating|Planning|Reflecting|Cultivating|Strategizing|Analyzing|Evaluating|Continuing|Deciding|Drafting|Implementing|Validating|Checking|Fixing|Adjusting|Syncing).*?(\r?\n|$)/gim, '')
      .replace(/^\s*\* (?:Interaction|Scene|Plan|Action|Execution|Narrative|Motives|Next Day|Bond|Connection|Current|Logistic|Situation|Departure|Encounters|Hospitality|Outcome|Analysis|Summary).*?[:：].*?(\r?\n|$)/gim, '')
      .replace(/^\s*[\(（]Self-Correction.*?[\)）].*?(\r?\n|$)/gim, '') // Remove self-corrections
      .replace(/^(?:Actually|Wait|Okay|Let's start|The rule says|Okay, I will|I am now|My thoughts|I'm currently|This encounter|It is important|We should|The next step|Considering|The character's|Based on|I will adjust|Looking at).*?[.!?](\r?\n|$)/gim, '')
      .replace(/^(?:I will|Let's|We should|It is important|This will|My goal|I am primarily|I am focused).*?(?:now|next|begin|ensure|help|provide|solidifying|reinforcing|considering|assessing|preparing|navigating|implementing|analyzing).*?[.!?](\r?\n|$)/gim, '')
      .replace(/^\s*\d+\.\s+(?:Header|Narrative|Action|Result|Step|Task|Update|Addressing|Drafting|Refining|Final|Self-Correction).*?[:：].*?(\r?\n|$)/gim, '')
      .replace(/\[NPC_SYNC_PROCESSED\]/gi, '')
      .replace(/<system_state\b[^>]*>[\s\S]*?<\/system_state\s*>/gi, '')
      .replace(/<system_data\b[^>]*>[\s\S]*?<\/system_data\s*>/gi, '')
      .replace(/<unit_registry\b[^>]*>[\s\S]*?<\/unit_registry\s*>/gi, '')
      .replace(/<officer_registry\b[^>]*>[\s\S]*?<\/officer_registry\s*>/gi, '')
      .replace(/<warlord_registry\b[^>]*>[\s\S]*?<\/warlord_registry\s*>/gi, '')
      .replace(/<hero_registry\b[^>]*>[\s\S]*?<\/hero_registry\s*>/gi, '')
      .replace(/\[NPC_SYNC_START\][\s\S]*?\[NPC_SYNC_END\]/gi, '')
      .replace(/\[TIMELINE_LOCK\]/gi, '')
      .replace(/\[\/TIMELINE_LOCK\]/gi, '')
      .replace(/\[NPC_SYNC_ARCHIVED\]/gi, '')
      .replace(/\[NPC状态已同步并入库\/NPC_SYNC_ARCHIVED\]/gi, '')
      .replace(/\[已移除冗余同步数据\]/gi, '')
      .replace(/\[UNIT_REGISTRY_ARCHIVED\]/gi, '')
      .replace(/\[HERO_REGISTRY_ARCHIVED\]/gi, '')
      .replace(/\[SYSTEM_STATE_ARCHIVED\]/gi, '')
      .replace(/\[SETTLEMENT_ARCHIVED\]/gi, '')
      .replace(/\[GAIA_MONITOR_ARCHIVED\]/gi, '')
      .replace(/I'll update the .*? now\./gi, '')
      .replace(/I'll follow your instructions.*?/gi, '');

    // Safety: ensure text is string
    if (typeof cleaned !== 'string') return '';

    // Incomplete tag handling
    if (cleaned.includes('<system_state') && !cleaned.includes('</system_state>')) {
      cleaned = cleaned.replace(/<system_state\b[^>]*>[\s\S]*$/i, '');
    }
    if (cleaned.includes('<gaia_resource_monitor') && !cleaned.includes('</gaia_resource_monitor>')) {
      cleaned = cleaned.replace(/<gaia_resource_monitor\b[^>]*>[\s\S]*$/i, '');
    }
    if (cleaned.includes('<system_data') && !cleaned.includes('</system_data>')) {
      cleaned = cleaned.replace(/<system_data\b[^>]*>[\s\S]*$/i, '');
    }
    if (cleaned.includes('<unit_registry') && !cleaned.includes('</unit_registry>')) {
      cleaned = cleaned.replace(/<unit_registry\b[^>]*>[\s\S]*$/i, '');
    }
    if (cleaned.includes('<hero_registry') && !cleaned.includes('</hero_registry>')) {
      cleaned = cleaned.replace(/<hero_registry\b[^>]*>[\s\S]*$/i, '');
    }
    if (cleaned.includes('[NPC_SYNC_START]') && !cleaned.includes('[NPC_SYNC_END]')) {
      cleaned = cleaned.replace(/\[NPC_SYNC_START\][\s\S]*$/i, '');
    }

    return cleaned.trim();
  };

  bodyText = cleanTechnicalNoise(bodyText);

  // If the details block only contained technical noise that we just stripped out, don't render an empty accordion
  if (!bodyText) return null;

  const isRecap = /回顾|提要|总结|事件|影响|Chronicle|Recap|Summary/i.test(summaryText);

  const handleSave = () => {
    // Replace the specific details block in the full content
    const fullContent = fullOriginalContent.replace(detailsBlock, editText);
    onUpdate(messageId, fullContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(detailsBlock);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="mt-8 pt-4 border-t border-dashed border-slate-800/50">
        <div className="bg-slate-900 border border-slate-700 rounded-none p-4">
           <div className="flex justify-between items-center mb-2">
             <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">编辑记忆区块</span>
           </div>
           <textarea
             value={editText}
             onChange={(e) => setEditText(e.target.value)}
             className="w-full h-64 bg-black text-slate-300 font-mono text-xs p-3 border border-slate-800 focus:border-amber-600 focus:outline-none rounded-none resize-y"
             spellCheck={false}
           />
           <div className="flex justify-end gap-2 mt-3">
             <Button variant="ghost" onClick={handleCancel} className="text-xs py-1 px-3">取消</Button>
             <Button variant="primary" onClick={handleSave} className="text-xs py-1 px-3 bg-amber-700 hover:bg-amber-600 border-amber-800">保存记忆</Button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mt-8 pt-4 border-t border-dashed border-slate-800/50 group/memory ${isRecap ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}>
      <details 
        className={`group border rounded-none overflow-hidden transition-all duration-300 ${isRecap ? 'bg-blue-950/20 border-blue-900/50' : 'bg-black/20 border-slate-800'} open:bg-black/60`}
        open={isRecap}
      >
        <summary className={`cursor-pointer p-3 transition-colors font-mono text-xs tracking-[0.2em] uppercase select-none flex items-center justify-between outline-none ${isRecap ? 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/30' : 'bg-slate-900/40 text-slate-500 hover:bg-slate-800/60'}`}>
          <span className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isRecap ? 'bg-blue-500' : (colors?.bg?.replace('bg-', '') || 'bg-slate-500')} opacity-50`}></span>
            {summaryText}
          </span>
          {isEditMode && (
            <div className="flex items-center gap-3">
               <button 
                 onClick={(e) => { e.preventDefault(); setIsEditing(true); }}
                 className="opacity-0 group-hover/memory:opacity-100 transition-opacity text-[10px] text-amber-500/70 hover:text-amber-400 uppercase tracking-widest hover:underline"
                 title="修正长期记忆"
               >
                 [Edit]
               </button>
               <span className="text-[10px] opacity-50 group-open:rotate-180 transition-transform duration-300">▼</span>
            </div>
          )}
        </summary>
        <div className={`p-4 text-sm font-mono leading-relaxed border-t whitespace-pre-wrap ${isRecap ? 'text-slate-300 border-blue-900/30' : 'text-slate-400/80 border-slate-800/50'}`}>
          {renderStyledText(bodyText)}
        </div>
      </details>
    </div>
  );
};

const GroundingLinks: React.FC<{ groundingMetadata?: any }> = ({ groundingMetadata }) => {
  if (!groundingMetadata || !groundingMetadata.groundingChunks) return null;

  const links = groundingMetadata.groundingChunks
    .filter((chunk: any) => chunk.web)
    .map((chunk: any) => chunk.web);

  if (links.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-slate-800/50 animate-in fade-in slide-in-from-top-1 duration-500">
      <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-mono flex items-center gap-2">
        <span className="w-1 h-1 bg-amber-500/50 rounded-full"></span>
        根源参考资料 (Sources)
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map((link: any, idx: number) => (
          <a
            key={idx}
            href={link.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-amber-500/70 hover:text-amber-400 bg-slate-900/50 px-2 py-1 rounded-none border border-slate-800 hover:border-amber-900/50 transition-all flex items-center gap-1.5 group/link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 group-hover/link:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
            <span className="truncate max-w-[200px]">{link.title || 'Wiki Source'}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

const MessageItem = React.memo(React.forwardRef<HTMLDivElement, {
  msg: Message;
  character: Character;
  colors: any;
  isSelected: boolean;
  onUpdate: (id: string, newContent: string) => void;
  onDelete: (id: string) => void;
  onToggleSelection: (id: string) => void;
  renderStyledText: (text: string) => React.ReactNode;
  isEditMode: boolean;
  isSyncMode: boolean;
}>(({ msg, character, colors, isSelected, onUpdate, onDelete, onToggleSelection, renderStyledText, isEditMode, isSyncMode }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(msg.content);

  // Memoize heavy text processing to prevent CPU spikes during streaming
  const processedContent = React.useMemo(() => {
    const content = msg.content || '';
    
    const cleanVisibleText = (text: string) => {
      if (!text) return '';
      let cleaned = String(text)
        .replace(/\[LOG_DATA\][\s\S]*?\[LOG_DATA\]/gi, '')
        .replace(/\[(?:STATE_ENGINE_SYNCED|SYSTEM_DATA_SYNCED|NPC_PROFILE_SYNCED|LOGISTICS_CALCULATION_SYNCED|SECTOR_ARCHIVE_SYNCED|CHRONICLE_MONITOR_SYNCED|UNIT_REGISTRY_SYNCED|OFFICER_REGISTRY_SYNCED|WARLORD_REGISTRY_SYNCED|HERO_REGISTRY_SYNCED|GAIA_RESOURCE_MONITOR_SYNCED)\]/gi, '')
        .replace(/^\s*\*\*(?!【).*?\*\*\s*(\r?\n|$)/gim, '')
        .replace(/^\s*\* (?!【)(?:Refining|Drafting|Addressing|Reality|Polish|Optimizing|Self-Correction|Step-by-step|Must start|No modern|Keep .*? persona|Update Status|Determining|Assessing|Preparing|Ensuring|Solidifying|Considering|Anticipating|Planning|Reflecting|Cultivating|Strategizing|Analyzing|Evaluating|Continuing|Deciding|Drafting|Implementing|Validating|Checking|Fixing|Adjusting|Syncing|Integrating).*?(\r?\n|$)/gim, '')
        .replace(/^\s*\* (?!【)(?:Interaction|Scene|Plan|Action|Execution|Narrative|Motives|Next Day|Bond|Connection|Current|Logistic|Situation|Departure|Encounters|Hospitality|Outcome|Analysis|Summary|Reviewing).*?[:：].*?(\r?\n|$)/gim, '')
        .replace(/^\s*[\(（]Self-Correction.*?[\)）].*?(\r?\n|$)/gim, '')
        .replace(/^(?!【)(?:Actually|Wait|Okay|Let's start|The rule says|Okay, I will|I am now|My thoughts|I'm currently|This encounter|It is important|We should|The next step|Considering|The character's|Based on|I will adjust|Looking at|I'll begin|Now I will|Here is the|I will proceed).*?[.!?](\r?\n|$)/gim, '')
        .replace(/^(?!【)(?:I will|Let's|We should|It is important|This will|My goal|I am primarily|I am focused|I'll just).*?(?:now|next|begin|ensure|help|provide|solidifying|reinforcing|considering|assessing|preparing|navigating|implementing|analyzing|writing|drafting).*?[.!?](\r?\n|$)/gim, '')
        .replace(/^\s*\d+\.\s+(?!【)(?:Header|Narrative|Action|Result|Step|Task|Update|Addressing|Drafting|Refining|Final|Self-Correction|Cognitive).*?[:：].*?(\r?\n|$)/gim, '')
        .replace(/\[\s*区域[:：].*?(?:可用\s*MP|残秽值|状态)[:：].*?\]/g, '')
        .replace(/<system_state\b[^>]*>[\s\S]*?<\/system_state\s*>/gi, '')
        .replace(/<gaia_resource_monitor\b[^>]*>[\s\S]*?<\/gaia_resource_monitor\s*>/gi, '')
        .replace(/<system_data\b[^>]*>[\s\S]*?<\/system_data\s*>/gi, '')
        .replace(/<unit_registry\b[^>]*>[\s\S]*?<\/unit_registry\s*>/gi, '')
        .replace(/<officer_registry\b[^>]*>[\s\S]*?<\/officer_registry\s*>/gi, '')
        .replace(/<warlord_registry\b[^>]*>[\s\S]*?<\/warlord_registry\s*>/gi, '')
        .replace(/<hero_registry\b[^>]*>[\s\S]*?<\/hero_registry\s*>/gi, '')
        .replace(/\[NPC_SYNC_START\][\s\S]*?\[NPC_SYNC_END\]/gi, '')
        .replace(/\[TIMELINE_LOCK\]/gi, '')
        .replace(/\[\/TIMELINE_LOCK\]/gi, '')
        .replace(/\[NPC_SYNC_ARCHIVED\]/gi, '')
        .replace(/\[NPC状态已同步并入库\/NPC_SYNC_ARCHIVED\]/gi, '')
        .replace(/\[已移除冗余同步数据\]/gi, '')
        .replace(/\[UNIT_REGISTRY_ARCHIVED\]/gi, '')
        .replace(/\[HERO_REGISTRY_ARCHIVED\]/gi, '')
        .replace(/\[SYSTEM_STATE_ARCHIVED\]/gi, '')
        .replace(/\[SETTLEMENT_ARCHIVED\]/gi, '')
        .replace(/\[GAIA_MONITOR_ARCHIVED\]/gi, '');

      if (cleaned.includes('<system_state') && !cleaned.includes('</system_state>')) {
        cleaned = cleaned.replace(/<system_state\b[^>]*>[\s\S]*$/i, '');
      }
      if (cleaned.includes('[NPC_SYNC_START]') && !cleaned.includes('[NPC_SYNC_END]')) {
        cleaned = cleaned.replace(/\[NPC_SYNC_START\][\s\S]*$/i, '');
      }

      return cleaned.trim();
    };

    const dateLockMatch = content.match(/【当前日期：[^】]*?】/i);
    const dateLock = dateLockMatch ? dateLockMatch[0].trim() : '';

    const headerMatch = content.match(/(?:『|\[时间线：)[\s\S]*?(?:』|\])/i);
    const storyHeader = headerMatch ? headerMatch[0].trim() : '';

    const narrativeMatch = content.match(/<narrative>([\s\S]*?)(?:<\/narrative>|$)/i);
    const tutorialMatch = content.match(/(?:【(?:📖\s*帝皇秘语|👁️\s*亚空间低语)】|\*\*【(?:📖\s*帝皇秘语|👁️\s*亚空间低语)】\*\*)[\s\S]*?(?=<details|<system_data|<synthetic_items|<system_state|【💡现状分析】|【现状分析】|$)/i);
    const tutorialPartRaw = tutorialMatch ? tutorialMatch[0].trim() : '';

    let displayBody = narrativeMatch ? narrativeMatch[1].trim() : content;
    if (narrativeMatch) {
      const afterNarrative = content.split(/<\/narrative>/i)[1];
      if (afterNarrative && !afterNarrative.trim().startsWith('<')) {
         displayBody += "\n\n" + afterNarrative.split(/<details|<system_data|<synthetic_items|<system_state|【💡现状分析】|【现状分析】/i)[0].trim();
      }
    } else {
      displayBody = content
        .replace(/<details>[\s\S]*?<\/details>/gi, '')
        .replace(/<system_data>[\s\S]*?<\/system_data>/gi, '')
        .replace(/<synthetic_items>[\s\S]*?<\/synthetic_items>/gi, '')
        .replace(/<system_state\b[^>]*>[\s\S]*?<\/system_state\s*>/gi, '')
        .replace(/<gaia_resource_monitor\b[^>]*>[\s\S]*?<\/gaia_resource_monitor\s*>/gi, '');
    }

    if (tutorialPartRaw) {
      displayBody = displayBody.replace(tutorialPartRaw, '');
    }

    const analysisMarker = displayBody.includes('【💡现状分析】') ? '【💡现状分析】' : '【现状分析】';
    let storyPart = displayBody;
    let analysisPart = '';
    if (displayBody.includes(analysisMarker)) {
      const parts = displayBody.split(analysisMarker);
      storyPart = parts[0].trim();
      analysisPart = analysisMarker + parts[1].trim();
    }

    storyPart = cleanVisibleText(storyPart);
    analysisPart = cleanVisibleText(analysisPart);

    const systemDataRegex = /<system_data>([\s\S]*?)<\/system_data>/g;
    const systemDataMatches = Array.from(content.matchAll(systemDataRegex));
    const zoneStatusRegex = /\[\s*区域[:：].*?(?:可用\s*MP|残秽值|状态)[:：].*?\]/g;
    const zoneMatches = content.match(zoneStatusRegex) || [];
    const systemDataBlocks = systemDataMatches
      .map(m => cleanVisibleText(m[1].trim()))
      .filter(b => b.length > 5);
      
    const zoneBlocks = [...new Set(zoneMatches.map(m => m.trim()))];
    const detailsRegex = /(<details>[\s\S]*?<\/details>)/g;
    const detailsMatches = Array.from(content.matchAll(detailsRegex));
    const detailsBlocks = detailsMatches.map(m => m[0]);

    return {
      dateLock,
      storyHeader,
      tutorialPart: cleanVisibleText(tutorialPartRaw),
      storyPart,
      analysisPart,
      systemDataBlocks,
      zoneBlocks,
      detailsBlocks
    };
  }, [msg.content]);

  const handleSave = () => {
    onUpdate(msg.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(msg.content);
    setIsEditing(false);
  };

  // Helper to parse content that might contain components like MemoryBlock, GroundingLinks, etc.
  const renderMessageContent = () => {
    const { storyHeader, dateLock, analysisPart, tutorialPart, storyPart, systemDataBlocks, zoneBlocks, detailsBlocks } = processedContent;
    
    // Deduplication logic for headers
    let storyBody = storyPart;
    if (storyHeader && storyBody.includes(storyHeader)) {
      if (storyBody.indexOf(storyHeader) < 100) {
        storyBody = storyBody.replace(storyHeader, '').trim();
      }
    }
    if (dateLock && storyBody.includes(dateLock)) {
      storyBody = storyBody.replace(dateLock, '').trim();
    }

    const hasSettlement = systemDataBlocks.length > 0 || zoneBlocks.length > 0;

    return (
      <>
        {/* Date Lock Header */}
        {dateLock && (
          <div className="mb-4 text-[10px] text-imperial-red/70 font-mono tracking-widest border-b border-zinc-900 pb-2 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-imperial-red/40 animate-[pulse_2s_infinite]"></span>
            {dateLock} [SECURED]
          </div>
        )}

        {/* Story Header (TimeFormat) */}
        {storyHeader && (
          <div className="mb-6 text-sm md:text-base font-mono font-bold text-imperial-gold tracking-widest border-l-2 border-imperial-red/50 pl-4 py-2 bg-zinc-950 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 hazard-stripes opacity-5 pointer-events-none" />
            <div className="relative z-10">{storyHeader}</div>
          </div>
        )}

        {/* Main Story Content */}
        <div className="story-text whitespace-pre-wrap font-mono text-zinc-300 leading-relaxed text-sm md:text-base">
          {renderStyledText(storyBody)}
        </div>

        <GroundingLinks groundingMetadata={msg.groundingMetadata} />
        
        {/* Analysis Section */}
        {analysisPart && (
          <div className="mt-8 p-5 bg-zinc-950 border border-zinc-900 border-l-imperial-red border-l-4 italic text-zinc-400 leading-relaxed relative overflow-hidden group/analysis whitespace-pre-wrap font-mono text-xs">
            <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
              <Skull className="w-16 h-16" />
            </div>
            <div className="text-[9px] text-imperial-red font-bold mb-2 uppercase tracking-widest flex items-center gap-2">
              <Zap size={10} /> 战术演算逻辑 [OVERRIDE]
            </div>
            {renderStyledText(analysisPart.replace(/【💡现状分析】|【现状分析】/g, ''))}
          </div>
        )}

        {/* Tutorial Whisper Block */}
        {tutorialPart && (
          <div className="mt-4 p-5 bg-amber-950/10 border border-amber-900/30 border-l-amber-600 border-l-4 font-mono text-[11px] text-amber-200/90 whitespace-pre-wrap relative overflow-hidden group/tutorial shadow-[0_0_20px_rgba(217,119,6,0.05)]">
             <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none group-hover/tutorial:opacity-20 transition-opacity">
                <Sparkles size={24} />
             </div>
             <div className="text-[9px] text-amber-500 font-bold mb-3 uppercase tracking-widest flex items-center gap-2">
               <span className="w-2 h-[1px] bg-amber-500/50"></span>
               {tutorialPart.includes('亚空间') ? '亚空间传讯' : '神圣教令'}
             </div>
             {renderStyledText(tutorialPart)}
          </div>
        )}

        {/* System Data Blocks */}
        {hasSettlement && (
          <div className="mt-6 p-4 bg-slate-900/40 border border-slate-800/50 rounded-none font-mono text-[11px] text-slate-400 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-500 whitespace-pre-wrap">
            <div className="text-[10px] text-blue-400/60 uppercase tracking-[0.2em] mb-3 flex items-center gap-2 border-b border-slate-800/30 pb-2 font-bold">
              <Sparkles className="w-3 h-3" />
              LOGS / SETTLEMENT
            </div>
            {zoneBlocks.map((zone, idx) => (
              <div key={`zone-${idx}`} className="mb-2 text-amber-500/80 bg-amber-950/20 p-2 rounded-none border border-amber-900/30">
                {zone}
              </div>
            ))}
            {systemDataBlocks.map((block, index) => (
              <div key={`sys-${index}`} className={`flex gap-2 ${index > 0 ? "mt-3 pt-3 border-t border-slate-800/30" : ""}`}>
                <span className="text-blue-500/40">›</span>
                <div className="flex-1">
                  {renderStyledText(block)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Memory/Details Blocks */}
        {detailsBlocks.map((block, index) => (
          <MemoryBlock 
            key={`${msg.id}-details-${index}`}
            messageId={msg.id}
            prefixText={storyPart}
            detailsBlock={block}
            fullOriginalContent={msg.content}
            colors={colors}
            onUpdate={onUpdate}
            renderStyledText={renderStyledText}
            isEditMode={isEditMode}
          />
        ))}
      </>
    );
  };

  return (
    <div 
      ref={ref}
      className={`flex flex-col w-full mx-auto relative z-10 scroll-mt-32 px-4 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
    >
      <div className={`
        relative p-4 md:p-6 border-2 transition-all w-full md:w-[90%] lg:w-[85%]
        ${msg.role === 'user' 
          ? 'bg-zinc-950/90 border-zinc-900 text-zinc-300 rounded-none ml-auto shadow-[0_0_15px_rgba(0,0,0,0.5)] whitespace-pre-wrap font-mono text-sm' 
          : `mech-panel border-zinc-800 ${colors.text} rounded-none mr-auto shadow-[0_0_30px_rgba(0,0,0,0.8)]`
        }
        ${isSelected ? 'border-imperial-red/50 shadow-[0_0_30px_rgba(139,0,0,0.2)]' : ''}
        ${isEditing ? 'w-full' : ''}
      `}>
         {/* Decoration Corners for Grimdark feel */}
         {msg.role !== 'user' && (
           <>
             <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-imperial-red/40" />
             <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-zinc-800" />
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-zinc-800" />
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-imperial-gold/40" />
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-imperial-red/20 via-transparent to-transparent" />
           </>
         )}

         {/* Selection Checkbox - Only visible in Sync Mode */}
         {!isEditing && isSyncMode && (
           <div className="absolute -top-3 -right-3 z-20 animate-in fade-in zoom-in duration-200">
              <label className="cursor-pointer relative flex items-center justify-center w-6 h-6 bg-black border border-imperial-red/50 rounded-none hover:bg-imperial-red/20 transition-colors">
                <input 
                  type="checkbox" 
                  className="peer appearance-none w-full h-full rounded-none cursor-pointer"
                  checked={isSelected}
                  onChange={() => onToggleSelection(msg.id)}
                />
                <span className="absolute inset-0 flex items-center justify-center text-transparent peer-checked:text-imperial-red text-xs font-bold font-mono">X</span>
              </label>
           </div>
         )}

         {/* Edit/Delete Toolbar - Only visible in Edit Mode */}
         {!isEditing && isEditMode && (
            <div className={`absolute -bottom-8 md:-bottom-6 ${msg.role === 'user' ? 'right-0' : 'left-0'} flex gap-3 md:gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 z-20`}>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-black/80 md:bg-black/50 px-3 py-1.5 md:px-2 md:py-1 rounded-none backdrop-blur-sm border border-slate-800 md:border-transparent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 md:w-3 md:h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                <span className="md:inline">编辑</span>
              </button>
              <button 
                onClick={() => onDelete(msg.id)}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 bg-black/80 md:bg-black/50 px-3 py-1.5 md:px-2 md:py-1 rounded-none backdrop-blur-sm border border-red-900/30 md:border-transparent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 md:w-3 md:h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                <span className="md:inline">删除</span>
              </button>
            </div>
         )}

         {isEditing ? (
           <div className="w-full space-y-3">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full min-h-[200px] bg-black/50 text-slate-200 font-mono text-base p-4 border border-slate-700 focus:border-amber-600 focus:outline-none rounded-none resize-y"
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={handleCancel} className="text-sm py-1 px-3">取消</Button>
                <Button variant="primary" onClick={handleSave} className="text-sm py-1 px-3 bg-amber-700 hover:bg-amber-600 border-amber-800">保存修改</Button>
              </div>
           </div>
         ) : (
           renderMessageContent()
         )}
      </div>
      <span className="text-[10px] text-zinc-600 mt-2 px-1 uppercase tracking-widest font-mono flex items-center gap-2">
        {msg.role === 'user' ? (
          <>
            <span className="w-1.5 h-1.5 bg-zinc-700"></span>
            UNIT: {character.name}
          </>
        ) : (
          <>
            <span className="w-1.5 h-1.5 bg-imperial-red animate-pulse"></span>
            VOX-MANDATE // M41
          </>
        )}
      </span>
    </div>
  );
}));

export const StoryDisplay: React.FC<StoryDisplayProps> = React.memo(({ 
  messages, 
  character, 
  isTyping, 
  onUpdateMessage, 
  onDeleteMessage, 
  selectedMessageIds, 
  onToggleMessageSelection,
  onScroll,
  isEditMode = false,
  isSyncMode = false,
  onUpdateNPC,
  /* removed warState */ // Add /* removed warState */
}) => {
  const lastMsgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevTypingRef = useRef(isTyping);
  const prevMsgCountRef = useRef(0); // Initialize to 0 to trigger the first-render scroll

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  // Listen for global scroll-to-bottom event
  useEffect(() => {
    const handleGlobalScroll = () => scrollToBottom();
    window.addEventListener('scroll-to-bottom', handleGlobalScroll);
    return () => window.removeEventListener('scroll-to-bottom', handleGlobalScroll);
  }, []);

  // Determine color theme based on UnitType
  const getTheme = () => {
    return THEME_COLORS[character.unitType] || THEME_COLORS[UnitType.UNKNOWN];
  };

  const colors = getTheme();

  useEffect(() => {
    const justFinishedTyping = prevTypingRef.current && !isTyping;
    const newMessagesAdded = messages.length > prevMsgCountRef.current;
    const isFirstRender = prevMsgCountRef.current === 0;

    // 1. 初始加载：瞬间跳转到底部
    if (isFirstRender && messages.length > 0) {
      setTimeout(() => scrollToBottom('auto'), 100);
    }
    // 2. 新消息或正在打字：平滑滚动跟进
    else if (newMessagesAdded || isTyping || justFinishedTyping) {
      scrollToBottom('smooth');
    }

    prevTypingRef.current = isTyping;
    prevMsgCountRef.current = messages.length;
  }, [isTyping, messages.length]);

  // Helper to render text with Bold parsing
  const renderStyledText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <span key={index} className={`font-bold ${colors.accent} brightness-150`}>{part.slice(2, -2)}</span>;
      }
      return part;
    });
  };

  const [visibleCount, setVisibleCount] = useState(50);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 50);
  };

  const visibleMessages = messages.slice(-visibleCount);

  return (
    <div 
      ref={containerRef}
      onScroll={onScroll}
      className="flex-1 overflow-y-auto p-4 md:px-12 md:py-16 space-y-12 custom-scrollbar relative bg-black"
    >
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.02)_0%,transparent_100%)] z-0" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />

      {messages.length > visibleCount && (
        <div className="flex justify-center pb-4 relative z-10">
          <button 
            onClick={handleLoadMore}
            className="text-xs font-mono tracking-widest text-slate-500 hover:text-amber-500 transition-colors uppercase border border-slate-800 hover:border-amber-900/50 px-4 py-2 rounded-full bg-slate-900/50"
          >
            载入更早的记忆 (Load Older Memories)
          </button>
        </div>
      )}

      {visibleMessages.map((msg, index) => {
        const isLast = index === visibleMessages.length - 1;
        const isSelected = selectedMessageIds.has(msg.id);

        return (
          <MessageItem 
            key={msg.id}
            ref={isLast ? lastMsgRef : null}
            msg={msg}
            character={character}
            colors={colors}
            isSelected={isSelected}
            onUpdate={onUpdateMessage}
            onDelete={onDeleteMessage}
            onToggleSelection={onToggleMessageSelection}
            renderStyledText={renderStyledText}
            isEditMode={isEditMode}
            isSyncMode={isSyncMode}
          />
        );
      })}

      {/* Typing Indicator */}
      {isTyping && (
        <div ref={lastMsgRef} className="flex flex-col items-start max-w-4xl mx-auto relative z-10 w-full mb-12">
           <div className="bg-black border-2 border-zinc-900 p-6 shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden w-full md:w-1/2">
             <div className="absolute inset-0 hazard-stripes opacity-5 pointer-events-none" />
             <div className="flex flex-col space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-imperial-red animate-ping" />
                   <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">LINK_ESTABLISHED // INTERPRETING_COGNIS_SIGNALS...</div>
                </div>
                <div className="flex gap-1 h-1">
                   <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, repeat: Infinity }} className="bg-gradient-to-r from-imperial-red/50 to-amber-500/50" />
                </div>
             </div>
           </div>
        </div>
      )}
      
      <div className="h-4" />
    </div>
  );
});

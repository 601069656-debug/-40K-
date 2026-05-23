import React, { useState } from 'react';
import { Character } from '../types';
import { Button } from './Button';
import { User } from 'firebase/auth';
import { ALIGNMENT_LEXICON } from '../constants';
import { 
  Settings, 
  Users, 
  History, 
  BookOpen, 
  User as UserIcon, 
  Download, 
  Menu, 
  Globe,
  LogOut,
  Zap,
  ScrollText,
  Cloud,
  CloudOff,
  Home,
  AlertTriangle,
  ShieldAlert,
  ArrowUpCircle
} from 'lucide-react';

interface HeaderProps {
  character: Character | null;
  user: User | null;
  difficulty?: 'normal' | 'grand';
  previewAlignment?: string;
  onOpenCharacterSheet: () => void;
  onOpenCompendium: () => void;
  onOpenLogModal: () => void;
  onOpenWorldBook: () => void;
  onOpenStageSetup?: () => void;
  onExport: (purify?: boolean) => void;
  onOpenGameMenu?: () => void;
  onLogout?: () => void;
  onReturnToStart?: () => void;
  isEditMode?: boolean;
  onToggleEditMode?: () => void;
  isSyncMode?: boolean;
  onToggleSyncMode?: () => void;
  isCloudSyncEnabled?: boolean;
  onToggleCloudSync?: () => void;
  onOpenUpgrade?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  character, 
  user,
  difficulty = 'normal',
  previewAlignment,
  onOpenCharacterSheet, 
  onOpenCompendium,
  onOpenLogModal,
  onOpenWorldBook,
  onOpenStageSetup,
  onExport, 
  onOpenGameMenu,
  onLogout,
  onReturnToStart,
  isEditMode,
  onToggleEditMode,
  isSyncMode,
  onToggleSyncMode,
  isCloudSyncEnabled,
  onToggleCloudSync,
  onOpenUpgrade
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 获取动态术语
  const getLexicon = () => {
    if (previewAlignment) {
      return previewAlignment.includes('混沌') ? ALIGNMENT_LEXICON.CHAOS : ALIGNMENT_LEXICON.IMPERIAL;
    }

    if (!character) return ALIGNMENT_LEXICON.IMPERIAL;

    const alignment = character.alignment || '';
    const lineage = character.lineage || '';
    const corruption = character.corruptionValue || 0;

    const isOriginallyChaos = alignment.includes('混沌') || lineage.includes('混沌') || lineage.includes('变节') || lineage.includes('恐虐') || lineage.includes('奸奇') || lineage.includes('纳垢') || lineage.includes('色孽');
    
    let isEffectivelyChaos = isOriginallyChaos;
    if (corruption >= 100) {
      isEffectivelyChaos = true;
    } else if (isOriginallyChaos && corruption < 60) {
      // 混沌阵营角色如果腐化值降至60以下，被视为重归人类帝国
      isEffectivelyChaos = false;
    }

    if (isEffectivelyChaos) {
      return ALIGNMENT_LEXICON.CHAOS;
    }
    if (lineage.includes('泰伦') || lineage.includes('虫群')) {
      return ALIGNMENT_LEXICON.XENOS;
    }
    return ALIGNMENT_LEXICON.IMPERIAL;
  };

  const lexicon = getLexicon();

  return (
    <header className="px-4 py-2 border-b-2 border-zinc-900 flex justify-between items-center bg-black sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-4 min-w-0">
         <div className="relative group cursor-pointer">
            <div className={`w-8 h-8 md:w-10 md:h-10 border-2 flex-shrink-0 flex items-center justify-center bg-black transition-all overflow-hidden ${lexicon.terminalTitle.includes('亚空间') ? 'border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.3)] group-hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]' : 'border-imperial-red shadow-[0_0_15px_rgba(139,0,0,0.3)] group-hover:shadow-[0_0_20px_rgba(139,0,0,0.5)]'}`}>
               <span className={`font-bold text-xl font-mono relative z-10 ${lexicon.terminalTitle.includes('亚空间') ? 'text-red-600' : 'text-imperial-red'}`}>{lexicon.terminalTitle.includes('亚空间') ? '☠' : 'I'}</span>
               <div className="absolute inset-0 hazard-stripes opacity-10" />
            </div>
         </div>
         
         <div className="flex flex-col">
            <h1 className={`text-[10px] md:text-sm font-mono tracking-[0.1em] md:tracking-[0.2em] uppercase truncate max-w-[120px] md:max-w-none ${lexicon.terminalTitle.includes('亚空间') ? 'text-red-500 glow-red' : 'text-imperial-gold glow-red'}`}>{lexicon.terminalTitle}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_5px_rgba(0,255,0,0.2)] ${lexicon.terminalTitle.includes('亚空间') ? 'bg-red-900' : 'bg-green-900'}`} />
              <span className="text-[8px] md:text-[9px] text-zinc-600 font-mono tracking-tighter uppercase truncate max-w-[100px] md:max-w-none">{lexicon.terminalVox} // M41.999</span>
            </div>
         </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
         {character && (
           <div className="hidden md:flex items-center gap-4 border-l border-zinc-900 pl-4 h-8">
              <div className="text-right">
                 <div className="font-mono text-[10px] font-bold text-zinc-300 leading-none uppercase tracking-wider">
                    {character.name}
                 </div>
                 <div className="text-[9px] text-imperial-red font-bold uppercase tracking-widest mt-1 opacity-70 flex items-center justify-end gap-2">
                   <span>{character.socialIdentity || character.unitType}</span>
                   <span className="text-[9px] text-emerald-500 font-mono font-bold bg-emerald-500/10 px-1 border border-emerald-500/20 shadow-[0_0_5px_rgba(16,185,129,0.1)]">XP: {character.experience || 0}</span>
                 </div>
              </div>
              
              <div className="flex flex-col gap-0.5">
                 <div className="flex gap-0.5">
                    {[1, 2, 3].map(i => (
                       <div key={i} className={`w-1.5 h-1.5 border border-zinc-800 ${i <= (character.prestige || 0) / 33 ? 'bg-imperial-gold shadow-[0_0_5px_rgba(197,160,89,0.4)]' : 'bg-black'}`} />
                    ))}
                 </div>
              </div>
           </div>
         )}

         {character && onOpenUpgrade && (
            <button
               onClick={onOpenUpgrade}
               className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors uppercase tracking-widest text-[10px] font-bold"
               title="能力提升 (Capability Upgrade)"
            >
               <ArrowUpCircle size={14} className="text-emerald-500" />
               <span className="hidden md:inline text-nowrap">能力提升</span>
            </button>
         )}

         {user && (
            <div className="flex items-center gap-3 border-l border-zinc-900 pl-4 h-8">
               <div className="hidden lg:flex flex-col items-end">
                  <span className="text-[9px] text-zinc-400 font-bold leading-none uppercase tracking-tighter font-mono">{user.displayName}</span>
                  <span className="text-[8px] text-zinc-600 truncate max-w-[100px] font-mono whitespace-nowrap">{user.email}</span>
               </div>
               {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-6 h-6 border border-zinc-800 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all rounded-none" referrerPolicy="no-referrer" />
               ) : (
                  <div className="w-6 h-6 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-none">
                     <UserIcon size={12} className="text-zinc-600" />
                  </div>
               )}
            </div>
         )}
         
         {onReturnToStart && (
          <div className="border-l border-zinc-900 pl-4 h-8 flex items-center">
            <button
              onClick={onReturnToStart}
              className="group relative flex items-center justify-center w-8 h-8 md:w-auto md:px-3 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 hover:border-red-600 transition-all text-red-600 active:scale-95"
              title="中断当前序列 / Return to Main Menu"
            >
              <div className="absolute inset-0 hazard-stripes opacity-10" />
              <Home size={16} className="md:mr-2" />
              <span className="hidden md:inline text-[9px] font-black uppercase tracking-widest font-mono">撤离 / Exit</span>
            </button>
          </div>
         )}

         <div className="relative border-l border-zinc-900 pl-2">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-1.5 text-zinc-500 hover:text-imperial-gold hover:bg-imperial-gold/5 transition-all relative group"
              title="操作清单"
            >
              <Menu size={18} />
              {isMenuOpen && <div className="absolute inset-0 border border-imperial-gold/30 animate-pulse" />}
            </button>

            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-30 cursor-default" onClick={() => setIsMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-64 bg-black border-2 border-zinc-800 shadow-[0_10px_50px_rgba(0,0,0,1)] z-40 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                   <div className="absolute inset-0 hazard-stripes opacity-5 pointer-events-none" />
                   
                   {character && (
                      <div className="p-4 border-b border-zinc-900 bg-imperial-red/5 relative">
                         <div className="font-mono text-[10px] font-bold text-zinc-200 uppercase tracking-widest">{character.name}</div>
                         <div className="text-[9px] text-imperial-gold uppercase tracking-widest font-mono mt-0.5 flex items-center justify-between">
                           <span>{character.socialIdentity || character.unitType}</span>
                           <span className="text-[9px] text-emerald-500 font-bold bg-emerald-500/5 px-1 border border-emerald-500/10 tracking-widest">XP: {character.experience || 0}</span>
                         </div>
                      </div>
                   )}
                   
                   <div className="p-2 space-y-0.5 relative">
                       <button 
                        onClick={() => { onOpenCompendium(); setIsMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs text-zinc-400 hover:bg-imperial-gold/10 hover:text-imperial-gold transition-all text-left uppercase font-mono tracking-tighter"
                      >
                         <BookOpen size={14} className="opacity-50" />
                         {lexicon.personnel}
                      </button>

                      <button 
                        onClick={() => { onOpenLogModal(); setIsMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs text-zinc-400 hover:bg-emerald-900/10 hover:text-emerald-500 transition-all text-left uppercase font-mono tracking-tighter"
                      >
                         <ScrollText size={14} className="opacity-50" />
                         {lexicon.logs}
                      </button>

                      <button 
                        onClick={() => { onOpenWorldBook(); setIsMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs text-zinc-400 hover:bg-imperial-red/10 hover:text-imperial-red transition-all text-left uppercase font-mono tracking-tighter"
                      >
                         <Globe size={14} className="opacity-50" />
                         {lexicon.world}
                      </button>

                      {onOpenStageSetup && (
                        <button 
                          onClick={() => { onOpenStageSetup(); setIsMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-xs text-zinc-400 hover:bg-red-900/10 hover:text-red-600 transition-all text-left uppercase font-mono tracking-tighter"
                        >
                           <ShieldAlert size={14} className="opacity-50" />
                           {lexicon.brief}
                        </button>
                      )}

                      <button 
                        onClick={() => { onOpenCharacterSheet(); setIsMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all text-left uppercase font-mono tracking-tighter border-b border-zinc-900"
                      >
                         <UserIcon size={14} className="opacity-50" />
                         {lexicon.bio}
                      </button>

                      {onToggleEditMode && (
                        <button 
                          onClick={() => { onToggleEditMode(); setIsMenuOpen(false); }}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-xs transition-all text-left uppercase font-mono tracking-tighter ${isEditMode ? 'text-imperial-gold bg-imperial-gold/10 shadow-[inset_0_0_10px_rgba(197,160,89,0.1)]' : 'text-zinc-600 hover:text-imperial-gold hover:bg- imperial-gold/5'}`}
                        >
                           <Zap size={14} className="opacity-50" />
                           {isEditMode ? "锁定逻辑回路 (LOCK)" : "绕过逻辑限制 (EDIT)"}
                        </button>
                      )}

                       {onToggleSyncMode && (
                        <button 
                          onClick={() => { onToggleSyncMode(); setIsMenuOpen(false); }}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-xs transition-all text-left uppercase font-mono tracking-tighter ${isSyncMode ? 'text-cyan-500 bg-cyan-900/10' : 'text-zinc-600 hover:text-cyan-400'}`}
                        >
                           <History size={14} className="opacity-50" />
                           {isSyncMode ? "禁用全量同步 (OFF)" : "启用全量同步 (ON)"}
                        </button>
                      )}

                      {onToggleCloudSync && (
                        <button 
                          onClick={() => { onToggleCloudSync(); setIsMenuOpen(false); }}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-xs transition-all text-left uppercase font-mono tracking-tighter ${isCloudSyncEnabled ? 'text-sky-500 bg-sky-900/10' : 'text-zinc-600 hover:text-sky-400'}`}
                        >
                           {isCloudSyncEnabled ? <Cloud size={14} className="opacity-50" /> : <CloudOff size={14} className="opacity-50" />}
                           {isCloudSyncEnabled ? "断开云端伺服器" : "激活云端伺服器"}
                        </button>
                      )}
                      
                      <div className="h-px bg-zinc-900 my-1 pb-1" />

                      <button 
                        onClick={() => { onExport(false); setIsMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300 transition-all text-left uppercase font-mono tracking-tighter"
                      >
                         <Download size={14} className="opacity-50" />
                         数据封装导出 [DATALINK]
                      </button>

                      {onLogout && (
                         <button 
                            onClick={() => { onLogout(); setIsMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-xs text-imperial-red hover:bg-imperial-red/10 transition-all text-left uppercase font-mono tracking-widest mt-2 border-t border-zinc-900"
                          >
                             <LogOut size={14} className="opacity-50" />
                             切断灵魂链接 [DISCONNECT]
                          </button>
                      )}
                   </div>
                </div>
              </>
            )}
         </div>
      </div>
    </header>
  );
};


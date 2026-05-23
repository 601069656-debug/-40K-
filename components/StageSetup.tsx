import React, { useState, useEffect } from 'react';
import { Character, HistoricalPeriod } from '../types';
import { Skull, ShieldAlert, FileText, Zap, X, AlertTriangle } from 'lucide-react';

import { getFirestoreDb, getFirebaseAuth, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface StageSetupProps {
  character: Character;
  onComplete: (settings: string, selectedStages: string[]) => void;
  onCancel?: () => void;
  selectedStages: string[];
  hasHistory?: boolean;
  currentSettings?: string;
}

export const StageSetup: React.FC<StageSetupProps> = ({ 
  character, 
  onComplete, 
  onCancel, 
  hasHistory = false,
  currentSettings = ''
}) => {
  const [settings, setSettings] = useState(currentSettings);
  const isMidGameUpdate = hasHistory;

  useEffect(() => {
    // Initialize with existing settings if any
    if (settings) return; // Already has content

    if (character.setting === HistoricalPeriod.CUSTOM || !character.setting) {
      if (!isMidGameUpdate) {
        // For new game, try to load from the 'briefing/core' collection
        const auth = getFirebaseAuth();
        if (auth?.currentUser) {
          const loadCoreBriefing = async () => {
            try {
              const db = getFirestoreDb();
              if (db) {
                const docRef = doc(db, 'users', auth.currentUser!.uid, 'briefing', 'core');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                  const cloudBriefing = docSnap.data().content || '';
                  if (cloudBriefing) setSettings(cloudBriefing);
                }
              }
            } catch (error) {
              handleFirestoreError(error, OperationType.GET, 'users/briefing/core');
            }
          };
          loadCoreBriefing();
        }
      }
    }
  }, [character.setting, isMidGameUpdate, settings]);

  // Handle ESC to cancel if mid-game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onCancel) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onComplete(settings, ['GLOBAL_RULES']);
  };

  return (
    <div className="flex-1 w-full bg-black flex flex-col relative selection:bg-red-900 selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 hazard-stripes opacity-[0.03] pointer-events-none" />
      <div className="fixed inset-0 scanner-v opacity-[0.05] pointer-events-none" />
      
      <div className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8 pb-32 flex flex-col gap-6 animate-in fade-in duration-700 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col gap-3 border-l-4 border-red-900 pl-8 py-3 bg-gradient-to-r from-red-950/10 to-transparent relative overflow-hidden group">
           <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 animate-pulse" />
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-600">
                 <ShieldAlert size={20} className="animate-pulse" />
                 <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em]">Strategic_Command_Vox_Channel // Level_Alpha_Authorized</span>
              </div>
           </div>
           <h2 className="text-3xl md:text-5xl font-black text-zinc-100 uppercase tracking-tighter italic leading-none">
             {isMidGameUpdate ? "帝国真理协议" : "战区部署协议"}
           </h2>
           <div className="flex items-center gap-4 mt-1">
              <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-[0.2em]">Causality Simulation Node: M41-THETA-09</div>
              <div className="h-px flex-1 bg-zinc-900" />
              <div className="text-[9px] text-zinc-600 font-mono uppercase">Mode: <span className="text-red-900 font-bold">{isMidGameUpdate ? "CONSOLE_OVERRIDE" : "INITIAL_DEPLOYMENT"}</span></div>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-8 relative">
           {/* Main Input Area */}
           <div className="flex flex-col gap-5 relative">
              <div className="relative group flex flex-col bg-zinc-950/40 border border-zinc-900/50">
                <div className="p-4 bg-zinc-900/20 border-b border-zinc-900">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-700 animate-pulse rounded-full" />
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em] font-black">Strategic_Action_Briefing_Input</span>
                   </div>
                </div>

                <div className="relative flex-1 bg-black/40 min-h-[300px]">
                  <textarea
                    value={settings}
                    onChange={(e) => setSettings(e.target.value)}
                    spellCheck={false}
                    className="w-full h-full min-h-[300px] bg-transparent text-zinc-200 font-mono text-base md:text-xl p-6 md:p-8 focus:outline-none transition-all placeholder:text-zinc-900 resize-none leading-relaxed custom-scrollbar selection:bg-red-900/40"
                    placeholder="DEFINE OPERATIONAL CONTEXT..."
                  />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.02] pointer-events-none" />
                </div>

                <div className="p-5 bg-red-950/5 border-t border-zinc-900/50 flex items-center gap-5">
                   <Skull className="text-zinc-800 flex-shrink-0" size={24} />
                   <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-mono text-red-900 font-bold uppercase tracking-widest leading-none mb-1">Causality Warning</span>
                      <p className="text-[10px] text-zinc-600 font-mono italic leading-tight">
                        {isMidGameUpdate ? "正在热更新底层设定。此操作将实时影响后续叙事因果，但不会产生即时叙事回复。" : "机魂将基于此简报重塑叙事因果逻辑。"}
                      </p>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* FIXED ACTION BAR - ALWAYS VISIBLE */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-50 border-t border-red-900/20 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
          <div className="hidden md:flex flex-col gap-1">
             <div className="flex items-center gap-2 text-zinc-600">
                <AlertTriangle size={12} />
                <span className="text-[8px] font-mono uppercase tracking-widest">Protocol: Override_Gamma_9</span>
             </div>
             <div className="text-[9px] text-zinc-500 font-mono italic whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">{isMidGameUpdate ? "UPDATING_OPERATIONAL_PARAMETERS..." : "WAITING_FOR_DEPLOYMENT_CONFIRMATION..."}</div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {onCancel && (
              <button 
                onClick={onCancel}
                className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-zinc-950 border-2 border-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-all font-mono text-xs uppercase tracking-[0.2em] font-black active:scale-95 cursor-pointer"
              >
                <X size={18} />
                <span>放弃修改 [ESC]</span>
              </button>
            )}
            
            <button 
              onClick={() => handleSubmit()}
              className="flex-[2] md:flex-none group relative px-12 py-4 bg-red-900/10 border-2 border-red-900 text-red-500 hover:bg-red-900 hover:text-white transition-all active:scale-95 overflow-hidden shadow-[0_0_20px_rgba(153,27,27,0.2)] cursor-pointer"
            >
              <div className="absolute inset-0 hazard-stripes opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative z-10 flex items-center justify-center gap-3">
                 <Zap size={18} className="group-hover:animate-pulse" />
                 <span className="text-base font-black tracking-[0.2em] uppercase italic">
                   确认 [CONFIRM]
                 </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

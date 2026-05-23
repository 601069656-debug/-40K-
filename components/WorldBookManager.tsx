import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { X, BookOpen, Globe, Save } from 'lucide-react';
import { Character } from '../types';
import { ALIGNMENT_LEXICON } from '../constants';
import * as stages from '../stages';
import { getFirestoreDb, getFirebaseAuth, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface WorldBookManagerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStages: string[];
  onToggleStage: (id: string) => void;
  character?: Character;
  onUpdateBriefing?: (text: string) => void;
}

export const WorldBookManager: React.FC<WorldBookManagerProps> = ({ 
  isOpen, 
  onClose, 
  selectedStages, 
  onToggleStage,
  character,
  onUpdateBriefing
}) => {
  const [briefingText, setBriefingText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const auth = getFirebaseAuth();
    if (isOpen && auth?.currentUser) {
      const loadBriefing = async () => {
        setIsLoading(true);
        try {
          const db = getFirestoreDb();
          if (!db) return;
          const docRef = doc(db, 'users', auth.currentUser!.uid, 'briefing', 'core');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setBriefingText(docSnap.data().content || '');
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, 'users/briefing/core');
        } finally {
          setIsLoading(false);
        }
      };
      loadBriefing();
    }
  }, [isOpen]);

  const saveBriefing = async () => {
    const auth = getFirebaseAuth();
    if (!auth?.currentUser) return;
    try {
      const db = getFirestoreDb();
      if (!db) return;
      const docRef = doc(db, 'users', auth.currentUser.uid, 'briefing', 'core');
      await setDoc(docRef, {
        userId: auth.currentUser.uid,
        content: briefingText,
        updatedAt: Date.now()
      });
      if (onUpdateBriefing) onUpdateBriefing(briefingText);
      console.log('Briefing saved');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'users/briefing/core');
    }
  };

  if (!isOpen) return null;

  const lexicon = character?.alignment?.includes('混沌') || character?.lineage?.includes('混沌') || character?.lineage?.includes('变节') ? ALIGNMENT_LEXICON.CHAOS :
                 character?.lineage?.includes('泰伦') || character?.lineage?.includes('虫群') ? ALIGNMENT_LEXICON.XENOS : ALIGNMENT_LEXICON.IMPERIAL;

  const stageList = [
    { id: 'IMPERIAL_ADMIN', name: '帝国行政与权力中枢', code: 'ADM-01', desc: 'Imperium Administrative Center' },
    { id: 'CHAOS_LORE', name: '混沌势力与亚空间知识', code: 'WARP-X', desc: 'Forbidden Warp Entities Knowledge' },
    { id: 'TYRANID_INVASION', name: '泰伦虫群入侵', code: 'BIO-MORP', desc: 'Tyranid Swarm Invasion Data' },
    { id: 'HORUS_HERESY', name: '荷鲁斯之乱', code: 'M31-CIV', desc: 'Great Crusade Era Civil War' },
    { id: 'BADAB_WAR', name: '巴达布战争', code: 'SCHISM-B', desc: 'The Badab Schism Database' },
    { id: 'INDOMITUS_CRUSADE', name: '不屈远征', code: 'REB-M42', desc: 'Era Indomitus Strategic Records' },
    { id: 'FALL_OF_CADIA', name: '卡迪亚之陨', code: 'GATE-00', desc: '13th Black Crusade Climax' },
    { id: 'DARK_IMPERIUM', name: '暗面帝国', code: 'NIHILUS', desc: 'Isolated Imperium Beyond Great Rift' },
    { id: 'WARZONE_ABYSS', name: '大漩涡战区', code: 'ABYSS-WZ', desc: 'Sector Maelstrom Operations' },
    { id: 'END_TIMES', name: '终焉之时', code: 'FINIS', desc: 'Final Era Escalation Protocol' },
  ];

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[150] p-2 md:p-4 overflow-y-auto">
      {/* Background Scanner Effect */}
      <div className="absolute inset-0 scanner-v opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.05),transparent)] pointer-events-none" />
      
      {/* Floating Exit Button for Mobile */}
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 z-[200] md:hidden p-3 bg-zinc-900/80 border border-zinc-800 rounded-full text-zinc-400 hover:text-white shadow-2xl backdrop-blur-md"
        title="关闭界面"
      >
        <X size={24} />
      </button>

      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 my-auto p-1 flex flex-col items-center animate-in fade-in zoom-in duration-300">
        {/* Hardware Aesthetics */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 px-4 py-1 flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest leading-none">Sector Star-Map Selection Protocol</span>
        </div>
        
        <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-red-950/40" />
        <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-red-950/40" />
        <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-red-950/40" />
        <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-red-950/40" />

        <div className="w-full bg-zinc-950 p-6 flex flex-col space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 hazard-stripes opacity-[0.02] pointer-events-none" />
          
          <div className="flex justify-between items-center border-b border-zinc-900 pb-4 relative z-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center box-shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                  <Globe className="text-zinc-500 animate-pulse-slow" size={24} />
               </div>
               <div>
                  <h2 className="text-xl font-black text-zinc-100 uppercase tracking-[0.3em] font-mono">
                    {lexicon.worldBooks}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Tactical Schema Database Access</span>
                    <div className="h-px w-20 bg-zinc-900" />
                  </div>
               </div>
            </div>
            <button onClick={onClose} className="p-2 text-zinc-600 hover:text-red-500 transition-colors active:scale-90">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-4 bg-red-950/5 border-y border-red-900/10 flex items-start gap-4 relative">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-900/30" />
             <div className="p-2 bg-red-950/20 text-red-700">
                <BookOpen size={20} />
             </div>
             <div className="space-y-1">
                <p className="text-[11px] text-zinc-400 leading-relaxed font-mono uppercase font-bold">
                  数据同步协议: V-LINK_742
                </p>
                <p className="text-[10px] text-zinc-600 leading-tight font-mono">
                  检测到多个已归档的子推演舞台。加载不同星区设定将动态重塑模拟环境中的因果律扰动频率与势力背景。
                </p>
             </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
              <span>{lexicon.warzoneBriefing}</span>
              <button 
                onClick={saveBriefing} 
                className="flex items-center gap-1 hover:text-red-500 transition-colors bg-zinc-900 px-2 py-0.5 border border-zinc-800 rounded"
              >
                <Save size={12} />
                <span>保存设定</span>
              </button>
            </div>
            <textarea
              value={briefingText}
              onChange={(e) => setBriefingText(e.target.value)}
              className="w-full h-32 bg-zinc-900 border border-zinc-800 p-3 text-xs text-zinc-300 font-mono resize-none focus:border-red-900 outline-none transition-colors custom-scrollbar"
              placeholder={lexicon.warzoneBriefingPlaceholder}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto custom-scrollbar max-h-[45vh] pr-2 relative z-10">
            {stageList.map(stage => {
              const isActive = selectedStages.includes(stage.id);
              return (
                <button
                  key={stage.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStage(stage.id);
                  }}
                  className={`group relative flex items-center p-4 border transition-all overflow-hidden ${
                    isActive
                      ? 'bg-red-900/10 border-red-900/50 text-red-100'
                      : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:border-zinc-700'
                  }`}
                >
                  {isActive && <div className="absolute inset-0 hazard-stripes opacity-10" />}
                  <div className="relative z-10 flex flex-col items-start w-full text-left">
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[9px] font-mono text-zinc-600 tracking-tighter group-hover:text-zinc-400 transition-colors uppercase">{stage.code}</span>
                      {isActive && <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]" />}
                    </div>
                    <span className={`text-xs font-black tracking-widest uppercase transition-colors font-mono ${isActive ? 'text-zinc-100' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                      {stage.name}
                    </span>
                    <span className="text-[8px] font-mono text-zinc-700 mt-1 uppercase italic tracking-tighter">{stage.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-zinc-900 flex justify-between items-end relative z-10">
             <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-0.5 bg-red-900" />
                  <span className="text-[8px] text-zinc-700 font-mono uppercase tracking-[0.2em]">Data_Sync_Status</span>
                </div>
                <span className="text-xs text-zinc-500 font-mono font-bold">{selectedStages.length} Protocol(s) Active</span>
             </div>
             <button 
               onClick={onClose} 
               className="group relative px-10 py-3 bg-zinc-900 border border-zinc-800 hover:bg-red-900/20 hover:border-red-900 transition-all font-mono text-[10px] uppercase font-black tracking-[0.3em] text-zinc-400 hover:text-red-500"
             >
               <div className="absolute inset-0 hazard-stripes opacity-0 group-hover:opacity-10 transition-opacity" />
               核准同步 [AUTH]
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { LogSummary, NPCProfile, Character } from '../types';
import { X, Plus, Trash2, ArrowLeft, Skull, FileText, Database } from 'lucide-react';
import { Button } from './Button';
import { ALIGNMENT_LEXICON } from '../constants';

interface LogModalProps {
  logs: LogSummary[];
  npcProfiles: NPCProfile[];
  character: Character;
  onClose: () => void;
  onSyncLog: () => void;
  onAddLog: () => void;
  onSyncNPC: (npcId: string) => void;
  onDeleteLog: (logId: string) => void;
  onUpdateLog: (updatedLog: LogSummary) => void;
}

export const LogModal: React.FC<LogModalProps> = ({ logs, npcProfiles, character, onClose, onSyncLog, onAddLog, onSyncNPC, onDeleteLog, onUpdateLog }) => {
  const [selectedLogId, setSelectedLogId] = useState<string | null>(logs.length > 0 ? logs[0].id : null);
  
  useEffect(() => {
    if (!selectedLogId && logs.length > 0) {
      setSelectedLogId(logs[0].id);
    }
  }, [logs, selectedLogId]);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<{ dayIndex: number, eventIndex: number } | null>(null);
  const [editingLog, setEditingLog] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedLogTitle, setEditedLogTitle] = useState('');
  const [editedLogDate, setEditedLogDate] = useState('');

  const logContainerRef = useRef<HTMLDivElement>(null);

  // 获取动态术语
  const getLexicon = () => {
    if (!character) return ALIGNMENT_LEXICON.IMPERIAL;
    if (character.alignment?.includes('混沌') || character.lineage?.includes('混沌') || character.lineage?.includes('变节')) {
      return ALIGNMENT_LEXICON.CHAOS;
    }
    if (character.lineage?.includes('泰伦') || character.lineage?.includes('虫群')) {
      return ALIGNMENT_LEXICON.XENOS;
    }
    return ALIGNMENT_LEXICON.IMPERIAL;
  };

  const lexicon = getLexicon();

  useEffect(() => {
    if (logs.length > 0 && !selectedLogId && !selectedProfileId && window.innerWidth >= 640) {
      setSelectedLogId(logs[0].id);
    }
  }, [logs, selectedLogId, selectedProfileId]);

  const selectedLog = logs.find(l => l.id === selectedLogId);
  const selectedProfile = npcProfiles.find(p => p.id === selectedProfileId);
  
  const mandateOfHeaven = npcProfiles.find(p => p.id === 'historical-system');

  const handleEdit = (dayIndex: number, eventIndex: number) => {
    if (!selectedLog) return;
    setEditingEvent({ dayIndex, eventIndex });
    setEditedTitle(selectedLog.days[dayIndex].events[eventIndex].title);
    setEditedDescription(selectedLog.days[dayIndex].events[eventIndex].description);
  };

  const handsetSelectedLog = (id: string | null) => {
    setSelectedLogId(id);
    setSelectedProfileId(null);
  };

  const handsetSelectedProfile = (id: string | null) => {
    setSelectedProfileId(id);
    setSelectedLogId(null);
  };

  const handleSave = () => {
    if (!selectedLog || !editingEvent) return;
    
    const updatedLog = {
      ...selectedLog,
      days: selectedLog.days.map((day, dIdx) => {
        if (dIdx !== editingEvent.dayIndex) return day;
        return {
          ...day,
          events: day.events.map((event, eIdx) => {
            if (eIdx !== editingEvent.eventIndex) return event;
            return {
              ...event,
              title: editedTitle,
              description: editedDescription
            };
          })
        };
      })
    };
    
    onUpdateLog(updatedLog);
    setEditingEvent(null);
  };

  const handleEditLog = () => {
    if (!selectedLog) return;
    setEditingLog(true);
    setEditedLogTitle(selectedLog.title);
    setEditedLogDate(selectedLog.date);
  };

  const handleSaveLog = () => {
    if (!selectedLog) return;
    const updatedLog = { ...selectedLog, title: editedLogTitle, date: editedLogDate };
    onUpdateLog(updatedLog);
    setEditingLog(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 text-zinc-300 imperial-terminal">
      <div className="absolute inset-0 bg-black/95 overflow-hidden" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl h-full md:h-[90vh] bg-black border-2 border-zinc-900 shadow-[0_0_100px_rgba(0,0,0,1)] flex overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Sidebar Navigation */}
        <div className={`
          ${selectedLog || selectedProfile ? 'hidden md:flex' : 'flex'} 
          w-full md:w-1/4 border-r-2 border-zinc-900 bg-zinc-950 flex-col shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-10
        `}>
          <div className="p-5 border-b-2 border-zinc-900 bg-black flex flex-col gap-1">
             <h2 className="text-[10px] font-mono text-imperial-gold tracking-[0.3em] uppercase">战事纪略 [BATTLE-CHRONICLES]</h2>
             <div className="flex gap-1 mt-1">
                <div className="w-6 h-0.5 bg-imperial-red" />
                <div className="w-2 h-0.5 bg-zinc-800" />
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-2 space-y-1">
               {logs.map(log => (
                 <div 
                   key={log.id}
                   onClick={() => handsetSelectedLog(log.id)}
                   className={`p-4 cursor-pointer border border-transparent transition-all flex flex-col gap-1 relative group ${selectedLogId === log.id ? 'bg-zinc-900 border-zinc-800 shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white' : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300'}`}
                 >
                   {selectedLogId === log.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-imperial-red shadow-[0_0_10px_rgba(139,0,0,0.5)]" />
                   )}
                   <div className="font-mono text-[11px] tracking-widest uppercase truncate">{typeof log.title === 'string' ? log.title : '未知记录'}</div>
                   <div className="text-[9px] font-mono opacity-60">REF: {typeof log.date === 'string' ? log.date : '未知日期'}</div>
                 </div>
               ))}
               
               {mandateOfHeaven && (
                 <div
                   onClick={() => handsetSelectedProfile(mandateOfHeaven.id)}
                   className={`p-4 cursor-pointer border border-transparent transition-all flex flex-col gap-1 relative group ${selectedProfileId === mandateOfHeaven.id ? 'bg-zinc-900 border-zinc-800 shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white' : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300'}`}
                 >
                   {selectedProfileId === mandateOfHeaven.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-imperial-red shadow-[0_0_10px_rgba(139,0,0,0.5)]" />
                   )}
                   <div className="font-mono text-[11px] tracking-widest uppercase truncate">{mandateOfHeaven.name.split(' (')[0]}</div>
                   <div className="text-[9px] font-mono opacity-60">CORE DATA LINK</div>
                 </div>
               )}
            </div>
          </div>
          <div className="p-4 border-t-2 border-zinc-900 bg-black space-y-2">
            <button 
               onClick={onSyncLog} 
               className="w-full py-2.5 bg-zinc-900 border-2 border-zinc-800 text-zinc-500 hover:text-imperial-red hover:border-imperial-red transition-all font-mono text-[9px] uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Plus size={12} /> 启动数据同步协议
            </button>
            <button 
               onClick={() => onAddLog()} 
               className="w-full py-2.5 bg-zinc-950 border-2 border-zinc-900 text-zinc-600 hover:text-imperial-gold hover:border-imperial-gold transition-all font-mono text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 group"
            >
              <FileText size={12} className="group-hover:animate-pulse" /> 建立手动记录词条
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`
          ${selectedLog || selectedProfile ? 'flex' : 'hidden md:flex'} 
          flex-1 flex-col overflow-hidden bg-black
        `}>
          <div className="flex items-center justify-between p-5 border-b-2 border-zinc-900 bg-black sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => { setSelectedLogId(null); setSelectedProfileId(null); }}
                className="md:hidden p-2 border border-zinc-800 text-zinc-500 hover:text-white"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                 <h2 className="text-sm font-mono text-imperial-red tracking-[0.2em] uppercase">{lexicon.campaignLog}</h2>
                 <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-tighter mt-0.5">Authorized Clearance: S-Grade // Archive: 41K</p>
              </div>
            </div>
            <button 
               onClick={onClose} 
               className="px-4 py-2 border-2 border-zinc-800 text-zinc-600 hover:text-white hover:border-zinc-300 transition-all font-mono text-[10px] uppercase tracking-widest"
            >
              [CLOSE_ACCESS]
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-zinc-950/20" ref={logContainerRef}>
            {selectedLog ? (
              <div className="space-y-12">
                <div className="relative p-10 border-2 border-zinc-900 bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-[0.03] select-none pointer-events-none">
                     <FileText size={150} />
                  </div>
                  
                  <div className="absolute top-6 right-6">
                    <button 
                       onClick={() => onDeleteLog(selectedLog.id)} 
                       className="p-2 text-zinc-800 hover:text-imperial-red transition-colors"
                       title="PURGE LOG"
                    >
                       <Trash2 size={20} />
                    </button>
                  </div>
                  
                  {editingLog ? (
                    <div className="space-y-4 max-w-xl relative z-10">
                      <div className="flex flex-col gap-1">
                         <label className="text-[9px] text-zinc-600 font-mono uppercase">Log Title</label>
                         <input value={editedLogTitle} onChange={e => setEditedLogTitle(e.target.value)} className="w-full bg-zinc-900 border-2 border-zinc-800 p-3 text-white font-mono text-lg uppercase tracking-widest focus:border-imperial-red transition-colors outline-none" />
                      </div>
                      <div className="flex flex-col gap-1">
                         <label className="text-[9px] text-zinc-600 font-mono uppercase">Timestamp</label>
                         <input value={editedLogDate} onChange={e => setEditedLogDate(e.target.value)} className="w-full bg-zinc-900 border-2 border-zinc-800 p-3 text-zinc-400 font-mono text-sm uppercase outline-none" />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button onClick={handleSaveLog} className="px-8 py-2 bg-imperial-red text-white font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(139,0,0,0.3)]">保存 [COMMIT]</button>
                        <button onClick={() => setEditingLog(false)} className="px-6 py-2 bg-zinc-800 text-zinc-400 font-mono text-xs uppercase tracking-widest">取消 [ABORT]</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 relative z-10">
                      <div className="flex items-center gap-4">
                         <div className="w-1.5 h-8 bg-imperial-red shadow-[0_0_10px_rgba(139,0,0,0.5)]" />
                         <div>
                            <h3 className="text-2xl md:text-4xl font-mono text-white tracking-widest uppercase">{typeof selectedLog.title === 'string' ? selectedLog.title : '未知记录'}</h3>
                            <div className="text-xs text-imperial-red font-mono mt-1 uppercase tracking-widest opacity-80">{typeof selectedLog.date === 'string' ? selectedLog.date : '未知日期'}</div>
                         </div>
                      </div>
                      
                      {/* Log Summary Section */}
                      <div className="mt-4 p-4 bg-zinc-900/50 border border-zinc-900 relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-1.5 h-full bg-imperial-gold/30 shadow-[2px_0_10px_rgba(197,160,89,0.1)]" />
                         <p className="text-xs text-zinc-400 font-mono italic leading-relaxed">
                            "{typeof selectedLog.summary === 'string' ? selectedLog.summary : '战况已录入。'}"
                         </p>
                         {selectedLog.keywords && selectedLog.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                               {selectedLog.keywords.slice(0, 8).map((kw, idx) => (
                                  <span key={idx} className="text-[9px] px-2 py-0.5 bg-zinc-950 border border-zinc-900 text-zinc-600 font-mono uppercase tracking-tighter">
                                     #{kw}
                                  </span>
                               ))}
                            </div>
                         )}
                      </div>

                      <button onClick={handleEditLog} className="w-max text-[10px] text-zinc-600 hover:text-zinc-300 font-mono tracking-widest flex items-center gap-2 mt-4 uppercase border-b border-zinc-800 pb-1 transition-all">
                         [REVISIT_DATA] 编辑历史数据
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-16">
                  {selectedLog.days.map((day, dayIndex) => (
                    <div key={dayIndex} className="relative">
                      <div className="flex items-center gap-6 mb-8 group/dayheader">
                         <div className="font-mono text-imperial-gold text-lg tracking-[0.3em] uppercase flex items-center gap-2">
                           【
                           <input 
                              value={day.date} 
                              onChange={(e) => {
                                const updatedLog = { ...selectedLog };
                                updatedLog.days[dayIndex].date = e.target.value;
                                onUpdateLog(updatedLog);
                              }}
                              className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 w-[12ch] text-imperial-gold tracking-[0.3em] uppercase"
                           />
                           】
                         </div>
                         <div className="h-px flex-1 bg-gradient-to-r from-imperial-gold/50 via-zinc-900 to-transparent" />
                         <button 
                            onClick={() => {
                              if (!selectedLog || !window.confirm('确认删除此天数的所有记录？')) return;
                              const updatedLog = { ...selectedLog };
                              updatedLog.days.splice(dayIndex, 1);
                              onUpdateLog(updatedLog);
                            }}
                            className="text-[9px] text-zinc-900 hover:text-red-900 font-mono border border-zinc-900 px-2 py-1 uppercase transition-all"
                         >
                            [PURGE_DAY]
                         </button>
                         <button 
                            onClick={() => {
                              const updatedLog = { ...selectedLog };
                              updatedLog.days[dayIndex].events.push({
                                title: '新子项事件',
                                description: '记录待填充...',
                                dialogues: [],
                              });
                              onUpdateLog(updatedLog);
                            }}
                            className="text-[9px] text-zinc-700 hover:text-zinc-300 font-mono border border-zinc-900 px-2 py-1 uppercase transition-all"
                         >
                            + 新增子项 [ADD_EVENT]
                         </button>
                      </div>
                      
                      <div className="space-y-12">
                        {day.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="relative pl-10">
                            {/* Vertical Line */}
                            <div className="absolute left-[3px] top-0 bottom-0 w-px bg-zinc-900 border-l border-zinc-800" />
                            <div className="absolute left-[-4px] top-1 w-4 h-4 bg-black border-2 border-zinc-900 flex items-center justify-center transform rotate-45 ring-4 ring-black">
                               <div className="w-1.5 h-1.5 bg-imperial-red" />
                            </div>

                            {editingEvent?.dayIndex === dayIndex && editingEvent?.eventIndex === eventIndex ? (
                              <div className="space-y-4 max-w-2xl bg-zinc-900/30 p-6 border border-zinc-800 shadow-inner">
                                <div className="flex flex-col gap-1">
                                   <label className="text-[9px] text-zinc-600 font-mono uppercase">Event Summary</label>
                                   <input value={editedTitle} onChange={e => setEditedTitle(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white font-bold text-sm tracking-widest focus:border-imperial-red outline-none" />
                                </div>
                                <div className="flex flex-col gap-1">
                                   <label className="text-[9px] text-zinc-600 font-mono uppercase">Tactical Detail</label>
                                   <textarea value={editedDescription} onChange={e => setEditedDescription(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 text-zinc-300 text-sm h-48 focus:border-imperial-red outline-none resize-none overflow-y-auto custom-scrollbar" />
                                </div>
                                <div className="flex gap-3">
                                  <button onClick={handleSave} className="px-6 py-2 bg-imperial-red text-white font-mono text-[10px] uppercase tracking-widest shadow-[0_0_10px_rgba(139,0,0,0.3)]">同步 [SYNC]</button>
                                  <button onClick={() => setEditingEvent(null)} className="px-6 py-2 bg-zinc-800 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">撤销 [REVERT]</button>
                                </div>
                              </div>
                            ) : (
                              <div className="group">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                                     <div className="text-[10px] font-mono text-zinc-700 bg-zinc-950 px-2 py-0.5 border border-zinc-900 uppercase">Sequence #{(eventIndex + 1).toString().padStart(2, '0')}</div>
                                     <div className="font-mono text-xl text-zinc-200 tracking-widest uppercase group-hover:text-white transition-colors">{event.title}</div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button 
                                      onClick={() => {
                                        if (!selectedLog || !window.confirm('确认删除此事件记录？')) return;
                                        const updatedLog = { ...selectedLog };
                                        updatedLog.days[dayIndex].events.splice(eventIndex, 1);
                                        onUpdateLog(updatedLog);
                                      }}
                                      className="text-[10px] text-zinc-800 hover:text-red-900 font-mono tracking-widest uppercase transition-colors"
                                    >
                                      [ERASE]
                                    </button>
                                    <button onClick={() => handleEdit(dayIndex, eventIndex)} className="text-[10px] text-zinc-700 hover:text-imperial-red font-mono tracking-widest uppercase transition-colors">[MOD_HIST]</button>
                                  </div>
                                </div>
                                <div className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-3xl whitespace-pre-wrap font-mono opacity-90 group-hover:opacity-100 transition-opacity">
                                   {event.description}
                                </div>
                                
                                {event.dialogues && event.dialogues.length > 0 && (
                                  <div className="mt-6 mb-4 space-y-3 border-l-2 border-imperial-red/30 pl-6 py-2 bg-zinc-900/10">
                                    <div className="text-imperial-red text-[10px] font-mono tracking-widest uppercase flex items-center gap-2">
                                       <Skull size={10} /> VOX-TRANSMISSION RECOVERY
                                    </div>
                                    {event.dialogues.map((d, i) => (
                                       <div key={i} className="text-zinc-300 italic text-sm font-mono leading-relaxed opacity-80 border-b border-zinc-900/50 pb-2 last:border-0 last:pb-0">
                                          "{d}"
                                       </div>
                                    ))}
                                  </div>
                                )}
                                
                                {event.notes && (
                                   <div className="mt-6 p-4 bg-zinc-900/20 border-l border-zinc-800 text-zinc-500 text-[11px] leading-relaxed uppercase tracking-widest font-mono">
                                      <span className="text-zinc-600 block mb-1">// SUPPLEMENTARY INTEL:</span>
                                      {event.notes}
                                   </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-10 border-t border-zinc-900 flex justify-center">
                   <button 
                      onClick={() => {
                        const updatedLog = { ...selectedLog };
                        updatedLog.days.push({
                          date: `第 XX 天`,
                          events: [{ title: '新子项事件', description: '记录待填充...', dialogues: [] }]
                        });
                        onUpdateLog(updatedLog);
                      }}
                      className="px-10 py-3 bg-zinc-950 border border-zinc-800 text-zinc-600 hover:text-zinc-200 hover:border-zinc-500 transition-all font-mono text-[10px] uppercase tracking-[0.4em]"
                   >
                      + 扩展时间轴序列 [EXTEND_CHRONOLOGY]
                   </button>
                </div>
              </div>
            ) : selectedProfile ? (
              <div className="bg-black border-2 border-zinc-900 p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-2 opacity-[0.02] select-none pointer-events-none">
                   <Database size={150} />
                </div>
                
                <div className="flex justify-between items-start mb-10 relative z-10 border-b border-zinc-900 pb-6">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-10 bg-imperial-gold shadow-[0_0_15px_rgba(197,160,89,0.3)]" />
                     <div>
                        <h3 className="text-3xl md:text-5xl font-mono text-white tracking-widest uppercase">{selectedProfile.name}</h3>
                        <div className="text-xs text-imperial-gold font-mono mt-1 uppercase tracking-widest">TACTICAL INFORMATION HUB</div>
                     </div>
                  </div>
                  {/* Allow manual sync for ANY NPC to fulfill "manual synchronize and update" request */}
                  <button 
                      onClick={() => onSyncNPC(selectedProfile.id || '')} 
                      className="px-6 py-2 bg-zinc-900 border-2 border-zinc-800 text-zinc-400 hover:text-imperial-gold hover:border-imperial-gold transition-all font-mono text-[10px] uppercase tracking-widest shadow-inner group"
                  >
                      <span className="group-hover:animate-pulse">执行深度同步 [DEEP-SYNC]</span>
                  </button>
                </div>
                <div className="text-zinc-400 text-sm whitespace-pre-wrap leading-relaxed max-w-3xl relative z-10 font-mono tracking-tight opacity-90">
                   {selectedProfile.userNotes || 'NO DATA TRACES DETECTED IN LOCAL ARCHIVES.'}
                </div>
                
                <div className="mt-12 pt-8 border-t border-zinc-900 relative z-10">
                   <div className="flex gap-6">
                      <div className="text-[10px] font-mono text-zinc-700">STATUS: ACTIVE</div>
                      <div className="text-[10px] font-mono text-zinc-700">SOURCE: IMPERIAL_TRUTH</div>
                      <div className="text-[10px] font-mono text-zinc-700">INTEGRITY: 100%</div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 space-y-6">
                 <div className="w-20 h-20 border-2 border-zinc-900 flex items-center justify-center opacity-20 transform rotate-45 hover:rotate-180 transition-transform duration-1000">
                    <Skull size={40} className="transform -rotate-45" />
                 </div>
                 <div className="text-center">
                    <p className="text-sm text-zinc-700 font-mono uppercase tracking-[0.4em]">No Active Thread Selected</p>
                    <p className="text-[10px] text-zinc-800 font-mono mt-2 uppercase">Please initialize data link from the archives</p>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


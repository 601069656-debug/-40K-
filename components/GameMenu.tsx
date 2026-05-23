import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface GameMenuProps {
  isOpen: boolean;
  onClose: () => void;
  initialSettings: string;
  onSettingsChange: (newSettings: string) => void;
  onForceDeduce: (settings?: string) => void;
  onExit: () => void;
  onRepairStats?: () => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({ isOpen, onClose, initialSettings, onSettingsChange, onForceDeduce, onExit, onRepairStats }) => {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState<'settings' | 'system'>('settings');

  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Sync internal state if prop changes
  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  const handleSave = () => {
    onSettingsChange(settings);
    onClose();
  };

  const handleExitClick = () => {
    setShowExitConfirm(true);
  };

  const handleConfirmExit = () => {
    onExit();
    onClose();
    setShowExitConfirm(false);
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-0 md:p-6 bg-black/90 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative w-full min-h-[100dvh] md:min-h-0 h-auto md:max-w-2xl bg-black border-2 border-zinc-900 shadow-[0_0_100px_rgba(0,0,0,1)] animate-in slide-in-from-right-10 fade-in duration-200 p-4 md:p-12 flex flex-col gap-6 md:gap-8 my-auto imperial-terminal overflow-hidden">
        <div className="absolute inset-0 hazard-stripes opacity-[0.02] pointer-events-none" />
        
        {showExitConfirm ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-8 animate-in fade-in zoom-in duration-300 relative z-10">
            <div className="w-20 h-20 bg-imperial-red/10 flex items-center justify-center border-2 border-imperial-red shadow-[0_0_30px_rgba(139,0,0,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-imperial-red">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-mono text-white tracking-[0.2em] uppercase">终端登出确认 [LOGOUT_CONFIRM]</h3>
              <p className="text-sm font-mono text-zinc-500 max-w-sm tracking-widest uppercase">确定要中断当前认知连接并返回星区总局吗？<br/>未同步至沉思者的进度将会丢失。</p>
            </div>
            <div className="flex flex-col w-full gap-4 pt-4">
              <button 
                onClick={handleConfirmExit}
                className="w-full py-4 bg-imperial-red text-white font-mono text-sm tracking-[0.3em] uppercase hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(139,0,0,0.3)]"
              >
                确认执行 [EXECUTE_EXIT]
              </button>
              <button 
                onClick={handleCancelExit}
                className="w-full py-2 text-zinc-600 hover:text-white font-mono text-xs uppercase tracking-widest"
              >
                维持连接 [MAINTAIN_LINK]
              </button>
            </div>
          </div>
        ) : (
          <>
             <div className="flex justify-between items-center border-b-2 border-zinc-900 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-4 md:w-2 md:h-6 bg-imperial-red shadow-[0_0_10px_rgba(139,0,0,0.5)]" />
                 <h3 className="text-white font-mono text-lg md:text-2xl tracking-[0.05em] md:tracking-[0.1em] uppercase">沉思者终端管理 [COGNIS]</h3>
              </div>
              <button onClick={onClose} className="text-zinc-700 hover:text-imperial-red transition-colors p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b-2 border-zinc-900 relative z-10">
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 py-3 text-xs font-mono tracking-[0.2em] uppercase transition-all relative ${
                  activeTab === 'settings' ? 'text-imperial-gold bg-zinc-950 shadow-inner' : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                [MANIFEST] 舞台设定
                {activeTab === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-imperial-gold" />}
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`flex-1 py-3 text-xs font-mono tracking-[0.2em] uppercase transition-all relative ${
                  activeTab === 'system' ? 'text-imperial-gold bg-zinc-950 shadow-inner' : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                [OPERATIONS] 系统操作
                {activeTab === 'system' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-imperial-gold" />}
              </button>
            </div>

            <div className="relative z-10 flex flex-col flex-1">
              {activeTab === 'settings' && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="relative group">
                    <div className="absolute top-0 right-0 p-1 text-[8px] text-zinc-800 font-mono select-none">ENCRYPTED_DATA_BLOCK</div>
                    <textarea
                      value={settings}
                      onChange={(e) => setSettings(e.target.value)}
                      className="w-full h-80 bg-zinc-950 text-zinc-300 text-sm p-6 border-2 border-zinc-900 focus:border-imperial-red transition-all font-mono leading-relaxed outline-none resize-none shadow-inner"
                      placeholder="在此处修订星区背景或战役设定..."
                    />
                  </div>
                  <button 
                    onClick={handleSave}
                    className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-white transition-all font-mono text-sm tracking-[0.3em] uppercase"
                  >
                    同步至数据核心 [SYNC_DATA]
                  </button>
                </div>
              )}

              {activeTab === 'system' && (
                <div className="pt-4 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  {onRepairStats && (
                    <button 
                      onClick={onRepairStats}
                      className="w-full py-5 bg-zinc-950 border-2 border-emerald-900/30 text-emerald-500 hover:bg-emerald-900 hover:border-emerald-700 hover:text-white transition-all font-mono text-sm tracking-[0.3em] uppercase flex items-center justify-center gap-4 shadow-[inset_0_0_15px_rgba(0,100,0,0.1)] hover:shadow-[0_0_30px_rgba(0,255,0,0.1)]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.492-3.053c.217-.267.476-.58.761-.922l.829-.982A8.962 8.962 0 0021 10.5C21 5.805 17.195 2 12.5 2 7.805 2 4 5.805 4 10.5c0 1.545.395 2.993 1.08 4.22-.342.285-.655.544-.922.761L1.105 17.98c-1.56 1.56-1.56 4.09 0 5.65s4.09 1.56 5.65 0l2.493-2.493c.217-.267.476-.58.761-.922l.829-.982a8.962 8.962 0 004.22 1.08c1.545 0 2.993-.395 4.22-1.08l-2.493-2.493z" />
                      </svg>
                      执行属性诊断修复 [DIAGNOSTIC_REPAIR]
                    </button>
                  )}
                  <button 
                    onClick={handleExitClick}
                    className="w-full py-5 bg-zinc-950 border-2 border-imperial-red/30 text-imperial-red hover:bg-imperial-red hover:text-white transition-all font-mono text-sm tracking-[0.3em] uppercase group flex items-center justify-center gap-4 shadow-[inset_0_0_15px_rgba(139,0,0,0.1)] hover:shadow-[0_0_30px_rgba(139,0,0,0.2)]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:animate-pulse">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                    登离沉思者 [DEACTIVATE_LINK]
                  </button>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

import React, { useRef, useState } from 'react';
import { Cloud, CloudOff, ShieldAlert, Monitor, Terminal as TerminalIcon, Database, Zap } from 'lucide-react';

interface StartScreenProps {
  saveExists: boolean;
  savedDifficulty?: 'normal' | 'grand';
  onContinue: () => void;
  onNewGame: (difficulty: 'normal' | 'grand') => void;
  onImport: (data: any) => void;
  onDeleteSave?: () => void;
  isCloudSyncEnabled?: boolean;
  onToggleCloudSync?: () => void;
  isAuthReady?: boolean;
  currentModel?: string;
  onModelChange?: (model: string) => void;
  onOpenApiSettings?: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ 
  saveExists, 
  onContinue, 
  onNewGame, 
  onImport, 
  onDeleteSave,
  isCloudSyncEnabled = false,
  onToggleCloudSync,
  isAuthReady = false,
  currentModel = 'gemini-3.1-pro-preview',
  onModelChange,
  onOpenApiSettings
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isBooting, setIsBooting] = useState(false);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const json = e.target?.result as string;
        const data = JSON.parse(json);
        onImport(data);
      } catch (error) {
        console.error("Error parsing save file:", error);
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const handleNewGame = () => {
    setIsBooting(true);
    setTimeout(() => onNewGame('grand'), 800);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 text-center imperial-terminal overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/30 animate-[scan_4s_linear_infinite]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Top Header Label */}
        <div className="mb-12 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-red-900" />
            <span className="text-[10px] md:text-xs font-mono text-zinc-600 tracking-[0.5em] uppercase">Imperium of Man / Segmentum Solar</span>
            <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-red-900" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-slate-100 tracking-tighter uppercase italic select-none">
            <span className="text-red-700">W</span>ARHAMMER <span className="text-zinc-500">40K</span>
            <div className="text-sm md:text-xl text-zinc-500 font-mono tracking-[0.6em] mt-2 block glow-red">
              无 尽 战 火
            </div>
          </h1>
        </div>

        {/* Central Display */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Column: Lore Quote */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left p-6 mech-panel hardcore-border opacity-60">
            <div className="text-[9px] text-zinc-600 font-mono mb-4 flex items-center gap-2">
              <ShieldAlert size={10} />
              SYSTEM_QUOTATION / ARCHIVE.41
            </div>
            <p className="text-[10px] md:text-xs text-zinc-400 font-mono leading-relaxed italic">
              "忘却科技的力量。忘却和平的希望。在黑暗的无垠宇宙中，只有无尽的战争。群星之间没有和平，只有屠杀与狂热，以及饥渴神明的笑声。"
            </p>
            <div className="mt-4 flex justify-end">
              <span className="text-[8px] text-zinc-700 font-mono">— ECCLESIARCHY_APPROVED</span>
            </div>
          </div>

          {/* Center Column: Actions */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {saveExists ? (
              <button 
                onClick={onContinue}
                className="group relative flex flex-col items-center justify-center p-6 bg-zinc-900/40 border border-zinc-800 hover:border-red-900 transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-zinc-700 group-hover:border-red-600" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-zinc-700 group-hover:border-red-600" />
                <Monitor className="text-zinc-600 group-hover:text-red-600 mb-2 transition-colors" />
                <span className="text-lg md:text-xl font-bold text-zinc-300 group-hover:text-white tracking-widest">再续远征</span>
                <span className="text-[8px] text-zinc-600 mt-1 uppercase font-mono">Resume Protocol / Historical Sync</span>
              </button>
            ) : null}

            <button 
              onClick={handleNewGame}
              disabled={isBooting}
              className={`group relative flex flex-col items-center justify-center p-8 transition-all overflow-hidden ${
                isBooting ? 'bg-red-950/20 border-red-900 animate-pulse' : 'bg-red-900/10 border border-red-900/30 hover:border-red-600 hover:bg-red-900/20'
              }`}
            >
              <div className="absolute inset-0 hazard-stripes opacity-5 group-hover:opacity-10" />
              <Zap className={`mb-2 transition-colors ${isBooting ? 'text-red-500' : 'text-red-700 group-hover:text-red-500'}`} />
              <span className="text-xl md:text-2xl font-black text-red-500 tracking-[0.2em] uppercase">
                {saveExists ? "重塑命运" : "步入战火"}
              </span>
              <span className="text-[9px] text-red-900 mt-1 uppercase font-mono tracking-widest">Initialize New Combat Sequence</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={handleImportClick}
                className="flex flex-col items-center p-3 border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all group"
              >
                <Database className="text-zinc-700 group-hover:text-zinc-500 mb-1" size={16} />
                <span className="text-[9px] text-zinc-500 uppercase font-mono tracking-tighter">导入存档</span>
              </button>
              {saveExists && onDeleteSave && (
                <button 
                  onClick={onDeleteSave}
                  className="flex flex-col items-center p-3 border border-red-900/20 bg-red-950/5 hover:bg-red-900/20 hover:border-red-900/50 transition-all group"
                >
                  <ShieldAlert className="text-red-950 group-hover:text-red-700 mb-1" size={16} />
                  <span className="text-[9px] text-red-950 group-hover:text-red-700 uppercase font-mono tracking-tighter">格式化存档</span>
                </button>
              )}
            </div>
            
            <input 
               type="file" 
               accept=".json" 
               ref={fileInputRef} 
               onChange={handleFileChange} 
               className="hidden" 
            />
          </div>

          {/* Right Column: Status / Sync */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 mech-panel hardcore-border opacity-80">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono text-zinc-600 uppercase">Comm_Link / Status</span>
                <div className={`w-1.5 h-1.5 rounded-full ${isCloudSyncEnabled ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,1)]' : 'bg-red-600'}`}></div>
              </div>
              
              <div className="border-t border-zinc-800 pt-4 flex flex-col items-center gap-3">
                {onToggleCloudSync && isAuthReady ? (
                  <button 
                    onClick={onToggleCloudSync}
                    className={`flex items-center gap-3 px-4 py-2 w-full text-[9px] uppercase tracking-widest font-mono border transition-all ${
                      isCloudSyncEnabled 
                        ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-500' 
                        : 'bg-zinc-900/40 border-zinc-800 text-zinc-600 hover:text-zinc-400'
                    }`}
                  >
                    {isCloudSyncEnabled ? <Cloud size={14} /> : <CloudOff size={14} />}
                    {isCloudSyncEnabled ? "Astropath Link: Active" : "Astropath Link: Offline"}
                  </button>
                ) : (
                  <div className="text-[8px] text-zinc-700 font-mono uppercase italic px-2 text-center">
                    Authentication Protocol Required for Remote Archival
                  </div>
                )}
                
                <div className="text-[8px] text-zinc-600 font-mono uppercase space-y-1 w-full opacity-50">
                   <div className="flex justify-between"><span>CPU_LOAD:</span> <span>32%</span></div>
                   <div className="flex justify-between"><span>MEM_STACK:</span> <span>1.2TB</span></div>
                   <div className="flex justify-between"><span>COG_SYNC:</span> <span>STABLE</span></div>
                </div>

                <div className="w-full mt-4 flex flex-col gap-2">
                  <span className="text-[8px] font-mono text-zinc-600 uppercase">Logic Core Select:</span>
                  <select 
                    value={currentModel} 
                    onChange={(e) => {
                      if (e.target.value === 'gemini-custom') {
                        if ((window as any).aistudio?.openSelectKey) {
                          (window as any).aistudio.openSelectKey();
                        }
                      } else if (e.target.value === 'openai-custom') {
                        onOpenApiSettings?.();
                      } else {
                        onModelChange?.(e.target.value);
                      }
                    }}
                    className="w-full bg-zinc-950/80 border border-zinc-800 text-zinc-400 text-[9px] py-2 px-2 font-mono uppercase tracking-widest focus:border-red-900 focus:text-white transition-all outline-none"
                  >
                    <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro</option>
                    <option value="gemini-3-pro-preview">Gemini 3.0 Pro</option>
                    <option value="gemini-3.1-flash-lite-preview">Gemini 3.1 Flash Lite</option>
                    <option value="gemini-3-flash-preview">Gemini 3.0 Flash</option>
                    <option value="gemini-custom">GEN_KEY</option>
                    <option value="openai-custom">THIRD_PARTY</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-zinc-800 text-[8px] font-mono border-t border-zinc-900 pt-4">
               <TerminalIcon size={10} />
               <span>v1.0.41-STABLE</span>
            </div>
          </div>
        </div>

        {/* Footer Labels */}
        <div className="mt-auto flex flex-col items-center gap-2 pb-8">
           <div className="flex items-center gap-3">
              <span className="text-[8px] text-zinc-800">01001000 01000101</span>
              <div className="h-px w-32 bg-zinc-900" />
              <span className="text-[8px] text-zinc-800">01001100 01001111</span>
           </div>
           <p className="text-[8px] text-zinc-700 uppercase tracking-[0.4em] font-mono">
             Strictly Classified / Inquisitorial Property
           </p>
        </div>
      </div>
    </div>
  );
};

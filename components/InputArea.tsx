import React, { useRef, useEffect } from 'react';
import { Button } from './Button';

interface InputAreaProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  currentModel: string;
  customModelName: string;
  onModelChange: (model: string) => void;
  onOpenApiSettings: () => void;
  onSendMessage: () => void;
  onRegenerate: () => void;
  onResetOpening: () => void;
  onDeduce: () => void;
  selectedMessageCount: number;
  showRegenerate: boolean;
  showResetOpening: boolean;
  hasHistory: boolean;
  hideDeduceButton?: boolean;
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const InputArea: React.FC<InputAreaProps> = ({
  input,
  setInput,
  isLoading,
  currentModel,
  customModelName,
  onModelChange,
  onOpenApiSettings,
  onSendMessage,
  onRegenerate,
  onResetOpening,
  onDeduce,
  selectedMessageCount,
  showRegenerate,
  showResetOpening,
  hasHistory,
  hideDeduceButton = false
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '56px'; // Reset to min-height first
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.max(56, scrollHeight)}px`;
    }
  }, [input]);

  return (
    <div className="p-3 md:p-8 bg-black border-t-2 border-zinc-900 relative">
      <div className="absolute inset-0 hazard-stripes opacity-[0.02] pointer-events-none" />
      <div className="max-w-4xl md:max-w-6xl mx-auto flex flex-col gap-4 relative z-10">
        
        {/* Tools Row: Regenerate & Model Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-1 gap-4">
           {/* Regenerate / Reset Buttons */}
           <div className="flex gap-3">
             {showRegenerate && !isLoading && (
               <button 
                 onClick={onRegenerate}
                 className="px-3 py-1.5 border border-zinc-800 text-zinc-500 hover:text-imperial-red hover:border-imperial-red transition-all flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em]"
                 title="删除最后一条回复并重试"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                 </svg>
                 <span>[RE-GEN] 重新生成</span>
               </button>
             )}

             {showResetOpening && !isLoading && (
               <button 
                 onClick={onResetOpening}
                 className="px-3 py-1.5 border border-zinc-800 text-zinc-500 hover:text-imperial-gold hover:border-imperial-gold transition-all flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em]"
                 title="重置开场剧情"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                 </svg>
                 <span>[RESET] 重置</span>
               </button>
             )}
           </div>

           {/* Model Selector */}
           <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-[9px] text-zinc-600 uppercase tracking-[0.3em] font-mono hidden md:block">
                LOGIC_CORE:
              </span>
              <select 
                value={currentModel} 
                onChange={(e) => {
                  if (e.target.value === 'gemini-custom') {
                    window.aistudio.openSelectKey();
                  } else if (e.target.value === 'openai-custom') {
                    onOpenApiSettings();
                  } else {
                    onModelChange(e.target.value);
                  }
                }}
                className="flex-1 md:flex-none bg-zinc-950 border border-zinc-900 text-zinc-500 text-[10px] py-1.5 px-3 font-mono uppercase tracking-widest focus:border-imperial-red focus:text-white transition-all outline-none"
                disabled={isLoading}
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

        {/* Input Row */}
        <div className="flex gap-4 flex-col md:flex-row items-stretch">
          <div className="flex-1 flex gap-4 w-full items-end">
            <div className="flex-1 relative group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-imperial-red/50 via-transparent to-transparent opacity-50 group-focus-within:opacity-100 transition-opacity" />
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim() && !isLoading) {
                      onSendMessage();
                    }
                  }
                }}
                rows={1}
                placeholder={hasHistory ? "战术指令... [ENTER]" : "【系统】机魂已准备就绪。请输入您的初始指令以开启此段叙事..." }
                disabled={isLoading}
                className={`w-full bg-zinc-950/80 border-2 text-sm md:text-lg p-3 md:p-6 transition-all placeholder-zinc-800 font-mono resize-none min-h-[56px] max-h-[50vh] overflow-y-auto outline-none
                  ${isLoading ? 'opacity-30 cursor-not-allowed border-zinc-900' : `border-zinc-900 focus:border-imperial-red/50 text-white shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
                `}
              />
            </div>
            
            {/* Deduce Button (Visible when messages selected, hidden during explicit sync modes) */}
            {selectedMessageCount > 0 && !hideDeduceButton && (
              <button 
                onClick={onDeduce}
                disabled={isLoading}
                className="h-[56px] md:h-[70px] px-4 md:px-6 bg-zinc-900 border-2 border-imperial-gold/30 text-imperial-gold hover:bg-imperial-gold hover:text-black transition-all font-mono text-[10px] md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] shadow-[0_0_20px_rgba(197,160,89,0.1)] flex items-center gap-2"
                title="基于选定回复进行剧情推演"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
                <span className="hidden sm:inline">[{selectedMessageCount}] 推演</span>
                <span className="sm:hidden">[{selectedMessageCount}]</span>
              </button>
            )}

            <button 
              onClick={() => onSendMessage()}
              disabled={!input.trim() || isLoading}
              className="h-[56px] md:h-[70px] px-5 md:px-8 bg-imperial-red text-white font-mono text-sm md:text-lg uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(139,0,0,0.3)] disabled:opacity-30 disabled:cursor-not-allowed group flex-shrink-0"
            >
              <div className="flex flex-col items-center leading-none">
                 <span>执行</span>
                 <span className="text-[7px] md:text-[8px] font-mono mt-0.5 md:mt-1 opacity-50 group-hover:opacity-100 transition-opacity">EXEC</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

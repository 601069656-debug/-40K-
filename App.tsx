
import React, { useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from 'react';
import { Character, GameState, GameStatus, Message, NPCProfile, NPCRecord, UnitType, VehicleClass, HistoricalPeriod, LogSummary, GaiaState } from './types';
import { 
  safeArray, 
  extractCharacterUpdate, 
  extractGaiaState, 
  extractNPCUpdates, 
  applyNPCUpdates, 
  getDefaultWorldBooks,
  getLatestDateFromHistory,
  compareDates,
  sleep,
  isRetryableError
} from './services/parserService';
import { handleAiResponseUpdate, calculateRollbackState, calculateEffectivelyChaos } from './services/gameLogicService';
import { CharacterCreation } from './components/CharacterCreation';
import { StageSetup } from './components/StageSetup';
import { WorldBookManager } from './components/WorldBookManager';
import { StoryDisplay } from './components/StoryDisplay';
import { CharacterSheet } from './components/CharacterSheet';
import { GameMenu } from './components/GameMenu';
import { Header } from './components/Header';
import { UpgradeModal } from './components/UpgradeModal';
import { StartScreen } from './components/StartScreen';
import { InputArea } from './components/InputArea';
import { TutorialSystem } from './components/TutorialSystem';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { saveGame, loadGame, clearSave, exportSaveToFile, validateSaveData } from './services/storageService';
import { saveGameStateToCloud, loadGameStateFromCloud } from './services/cloudStorageService';
import { CharacterCompendium } from './components/CharacterCompendium';
import { LogModal } from './components/LogModal';
import { generateInitialPrompt, generateDeductionPrompt, generateForceDeducePrompt, generateStatusPrompt, generateNPCUpdatePrompt } from './services/promptService';
import { initializeGame, sendMessage, resetGame, switchSessionModel, analyzeNPCData, generateLogEntry, synthesizeEntities } from './services/geminiService';
import { Button } from './components/Button';
import { THEME_COLORS, ALIGNMENT_LEXICON } from './constants';
import { motion } from 'motion/react';
import { LogIn, MessageSquare, History, Users, Sparkles, AlertCircle, Skull } from 'lucide-react';
import { getFirebaseAuth, getFirestoreDb, signInWithGoogle, handleFirestoreError, OperationType, isFirestoreQuotaBlocked } from './firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public props: ErrorBoundaryProps;
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-900 border border-red-900/50 p-8 rounded-none-3xl shadow-2xl space-y-6">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto border border-red-900/50">
              <AlertCircle className="text-red-500 w-8 h-8" />
            </div>
            <h1 className="text-2xl font-mono text-red-100 uppercase tracking-wider">系统崩溃 (System Crash)</h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              检测到严重的推演回路故障。请尝试刷新页面以重新建立链接。
            </p>
            <div className="bg-black/40 p-4 rounded-none text-left overflow-auto max-h-32">
              <code className="text-[10px] text-red-400/70 font-mono break-all">
                {this.state.error?.message || "Unknown error"}
              </code>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-red-900 hover:bg-red-800 text-white py-3 rounded-none transition-all font-mono tracking-widest uppercase border border-red-700"
            >
              重启系统 (Reboot)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const SESSION_ID = Math.random().toString(36).substring(2, 15);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const executeAiCall = async (
    aiMsgId: string,
    callFn: () => Promise<{ text: string; groundingMetadata?: any }>,
    onRetryMsg: (count: number) => string
  ) => {
    let retryCount = 0;
    const maxRetries = 15;
    while (retryCount < maxRetries) {
      try {
        return await callFn();
      } catch (error: any) {
        if (isRetryableError(error) && retryCount < maxRetries - 1) {
          retryCount++;
          console.warn(`Retryable error (429) detected, retrying ${retryCount}/${maxRetries}...`);
          setGameState(prev => {
            const newHistory = [...prev.history];
            const lastMsg = newHistory.find(m => m.id === aiMsgId);
            if (lastMsg) {
              lastMsg.content = onRetryMsg(retryCount);
            }
            return { ...prev, history: newHistory };
          });
          await sleep(1000 * retryCount);
          continue;
        }
        throw error;
      }
    }
    throw new Error(`已尝试 ${maxRetries} 次自动重连，与现实宇宙的连接依然受阻，请检查网络或手动重新生成。`);
  };

  const [gameState, setGameState] = useState<GameState>({
    status: GameStatus.START_MENU,
    character: null,
    history: [],
    isLoading: false,
    isCharacterSheetOpen: false,
    isCompendiumOpen: false,
    isLogModalOpen: false,
    npcProfiles: [],
    logs: [],
    difficulty: 'normal',
    isTutorialEnabled: true,
  });
  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat');
  const [input, setInput] = useState('');
  const [saveExists, setSaveExists] = useState(false);
  const [savedDifficulty, setSavedDifficulty] = useState<'normal' | 'grand'>('normal');
  const [currentModel, setCurrentModel] = useState('gemini-3-flash-preview');
  const [customModelName, setCustomModelName] = useState(localStorage.getItem('thirdPartyModelName') || '');
  const [selectedMessageIds, setSelectedMessageIds] = useState<Set<string>>(new Set());

  const [isGameMenuOpen, setIsGameMenuOpen] = useState(false);
  const [isCloudSyncEnabled, setIsCloudSyncEnabled] = useState(() => {
    return localStorage.getItem('isCloudSyncEnabled') === 'true';
  });
  const [isApiSettingsOpen, setIsApiSettingsOpen] = useState(false);
  const [isWorldBookOpen, setIsWorldBookOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSyncMode, setIsSyncMode] = useState(false);
  const [previewAlignment, setPreviewAlignment] = useState<string | undefined>(undefined);
  const [isCompendiumSyncMode, setIsCompendiumSyncMode] = useState(false);
  const [isLogSyncMode, setIsLogSyncMode] = useState(false);
  const [targetNPCId, setTargetNPCId] = useState<string | null>(null);

  const toggleStage = (stageId: string) => {
    setGameState(gs => {
      const currentStages = gs.selectedStages || [];
      const next = currentStages.includes(stageId) 
        ? currentStages.filter(id => id !== stageId)
        : [...currentStages, stageId];
      
      return { ...gs, selectedStages: next };
    });
  };

  const [restoredNotification, setRestoredNotification] = useState(false);
  const [pendingCloudSave, setPendingCloudSave] = useState<GameState | null>(null);
  const [apiKeyWarning, setApiKeyWarning] = useState(false);
  const [showNewGameConfirm, setShowNewGameConfirm] = useState(false);
  const [showDeleteSaveConfirm, setShowDeleteSaveConfirm] = useState(false);
  const [pendingDifficulty, setPendingDifficulty] = useState<'normal' | 'grand'>('normal');
  const hasAutoRestoredRef = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const localSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const gameStateRef = useRef<GameState>(gameState);
  const isSendingRef = useRef(false);

  // Keep gameStateRef in sync with gameState
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Guest play helper
  const handleGuestLogin = () => {
    console.log("Entering offline guest play session...");
    const guestUser: any = {
      uid: 'local-warrior',
      displayName: '星区游侠 (Local Explorer)',
      email: 'guest@terra.imperial',
      emailVerified: true,
      isAnonymous: true,
      providerData: []
    };
    setUser(guestUser);
    setIsAuthReady(true);
    localStorage.setItem('local_play_mode', 'true');
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      localStorage.removeItem('local_play_mode');
    } catch (err: any) {
      console.error("Google Sign-In failed:", err);
      alert("灵魂链接建立失败（服务器未响应或配置未激活）。已为您降临至【本地离线沙盒】进行纯本地推演。");
      handleGuestLogin();
    }
  };

  // Auth listener
  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      handleGuestLogin();
      setIsAuthReady(true);
      return;
    }

    const savedLocalMode = localStorage.getItem('local_play_mode');
    if (savedLocalMode === 'true') {
      handleGuestLogin();
    }

    const unsub = onAuthStateChanged(auth, async (u) => {
      console.log("Auth state changed:", u ? u.uid : "null");
      setUser(u);
      setIsAuthReady(true);

      if (u) {
        // Sync user profile
        const db = getFirestoreDb();
        if (db) {
          try {
            const userRef = doc(db, 'users', u.uid);
            const userSnap = await getDoc(userRef);
            
            if (!userSnap.exists()) {
              await setDoc(userRef, {
                email: u.email || '',
                displayName: u.displayName || '无名战士 (Unknown Warrior)',
                photoURL: u.photoURL || '',
                createdAt: serverTimestamp()
              });
            } else {
              // Update only allowed fields if changed
              const currentData = userSnap.data();
              if (currentData.displayName !== u.displayName || currentData.photoURL !== u.photoURL) {
                await updateDoc(userRef, {
                  displayName: u.displayName || currentData.displayName,
                  photoURL: u.photoURL || currentData.photoURL
                });
              }
            }
          } catch (error) {
            handleFirestoreError(error, OperationType.WRITE, `users/${u.uid}`);
          }
        }
      }
    });
    return () => unsub();
  }, []);

  // Sync Game State from Firestore
  useEffect(() => {
    const db = getFirestoreDb();
    if (!db || !user || !isCloudSyncEnabled || user.uid === 'local-warrior') return;
    
    const gameDocRef = doc(db, 'games', user.uid);
    const unsub = onSnapshot(gameDocRef, (snapshot) => {
      // Ignore local updates to prevent self-conflict
      if (snapshot.metadata.hasPendingWrites) return;

      if (snapshot.exists()) {
        const data = snapshot.data() as GameState;

        // Safety check for malformed state
        if (data.status === GameStatus.PLAYING && !data.character) {
          console.warn("Detected malformed game state (PLAYING but no character), resetting to START_MENU");
          data.status = GameStatus.START_MENU;
        }
        
        setSaveExists(true);
        setSavedDifficulty(data.difficulty || 'normal');
        
        setGameState(prev => {
          const currentGameState = prev;

          // If we are in START_MENU, auto-restore is fine
          if (currentGameState.status === GameStatus.START_MENU && !hasAutoRestoredRef.current) {
            hasAutoRestoredRef.current = true;
            
            const localData = loadGame();
            const dataWithTimestamp = data as GameState & { lastUpdated?: any };
            const cloudTimestamp = dataWithTimestamp.lastUpdated?.toMillis ? dataWithTimestamp.lastUpdated.toMillis() : 0;
            const localTimestamp = localData?.timestamp || 0;
            
            // If local data is newer, prioritize it for fields that can be edited locally
            const useLocal = localTimestamp > cloudTimestamp;

            const persistentState: any = {
              status: useLocal && localData?.status ? localData.status : (data.status || prev.status),
              character: useLocal && localData?.character ? localData.character : (data.character || prev.character),
              npcProfiles: useLocal && localData?.npcProfiles ? localData.npcProfiles : (data.npcProfiles || prev.npcProfiles),
              stageSettings: useLocal && localData?.stageSettings ? localData.stageSettings : (data.stageSettings || localData?.stageSettings || prev.stageSettings),
              selectedStages: useLocal && localData?.selectedStages ? localData.selectedStages : (data.selectedStages || localData?.selectedStages || prev.selectedStages),
              difficulty: useLocal && localData?.difficulty ? localData.difficulty : (data.difficulty || prev.difficulty),
              
              gaiaState: useLocal && localData?.gaiaState ? localData.gaiaState : (data.gaiaState || prev.gaiaState),
              logs: useLocal && localData?.logs ? localData.logs : (data.logs || prev.logs || [])
            };

            if (useLocal && localData && localData.history && localData.history.length > 0) {
              persistentState.history = localData.history;
            } else if (data.history && data.history.length > 0) {
              persistentState.history = data.history;
            } else if (localData && localData.history && localData.history.length > 0) {
              persistentState.history = localData.history;
            }

            if (data.status === GameStatus.PLAYING || data.status === GameStatus.STAGE_SETUP || data.status === GameStatus.CREATION) {
              setRestoredNotification(true);
              setTimeout(() => setRestoredNotification(false), 5000);
              return {
                ...prev,
                ...persistentState,
              };
            }
            return prev;
          } 
          // If we are already playing, we don't overwrite "secretly"
          else if (currentGameState.status !== GameStatus.START_MENU) {
            // Ignore updates that were generated by this exact session
            const anyData = data as any;
            if (anyData.sessionId === SESSION_ID) {
              return prev;
            }

            // Check if cloud data is actually different from current state
            const isDifferent = 
              data.status !== currentGameState.status || 
              data.character?.name !== currentGameState.character?.name ||
              (data.gaiaState?.lastUpdated !== currentGameState.gaiaState?.lastUpdated);

            if (isDifferent) {
              setPendingCloudSave(data);
            }
            return prev;
          }
          return prev;
        });
      } else {
        setSaveExists(false);
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, `games/${user.uid}`));
    
    return () => unsub();
  }, [user]);

  // Conflict Resolution UI is now inlined at the bottom of the component

  // Check for save file on mount and auto-restore if possible
  useEffect(() => {
    // Check for API Key
    const hasKey = !!(process.env.GEMINI_API_KEY || process.env.API_KEY);
    if (!hasKey) {
      setApiKeyWarning(true);
    }

    if (!user || user.uid === 'local-warrior') {
      const savedData = loadGame();
      if (savedData) {
        setSaveExists(true);
        setSavedDifficulty(savedData.difficulty || 'normal');
        if (savedData.status === GameStatus.PLAYING || savedData.status === GameStatus.STAGE_SETUP || savedData.status === GameStatus.CREATION) {
          console.log("Auto-restoring session...");

          restoreGameSession(savedData.character, savedData.history, savedData.npcProfiles, savedData.stageSettings, savedData.status, savedData.difficulty, savedData.selectedStages, savedData.logs, savedData.gaiaState);
          setRestoredNotification(true);
          setTimeout(() => setRestoredNotification(false), 5000);
        }
      }
    }
  }, [user]);

  const handleToggleSyncMode = () => {
    setIsSyncMode(prev => {
      const newState = !prev;
      if (!newState) {
        setSelectedMessageIds(new Set()); // Clear selection when turning off
      }
      return newState;
    });
  };

  // Auto-save logic (Sync to Firestore if logged in, else LocalStorage)
  useEffect(() => {
    const shouldSave = (
      (gameState.status === GameStatus.PLAYING && gameState.character) ||
      (gameState.status === GameStatus.STAGE_SETUP && gameState.character) ||
      (gameState.status === GameStatus.CREATION && gameState.character)
    );

    if (shouldSave) {
      const lastMsg = gameState.history.length > 0 ? gameState.history[gameState.history.length - 1] : null;
      if ((!lastMsg || !lastMsg.isStreaming) && !gameState.isLoading) {
        
        // Debounce local save to prevent main thread blocking and mobile crashes
        if (localSaveTimeoutRef.current) clearTimeout(localSaveTimeoutRef.current);
        localSaveTimeoutRef.current = setTimeout(() => {
          // If we have history, the "canonical" game state is PLAYING even if the UI is in setup
          const statusToSave = (gameState.status === GameStatus.STAGE_SETUP && gameState.history.length > 0) 
            ? GameStatus.PLAYING 
            : gameState.status;

          // Always save locally to ensure local is primary
          saveGame(gameState.character!, gameState.history, gameState.npcProfiles || [], gameState.stageSettings, statusToSave, gameState.difficulty, gameState.selectedStages, gameState.logs, gameState.gaiaState);
          setSaveExists(true);
        }, 500); // 500ms debounce for local save

        // SAVE TO FIRESTORE
        const db = getFirestoreDb();
        if (user && db && !isFirestoreQuotaBlocked() && isCloudSyncEnabled && user.uid !== 'local-warrior') {
          // Debounce Firestore writes
          if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
          
          saveTimeoutRef.current = setTimeout(() => {
            const statusToSave = (gameState.status === GameStatus.STAGE_SETUP && gameState.history.length > 0) 
              ? GameStatus.PLAYING 
              : gameState.status;
            
            saveGameStateToCloud(user.uid, { ...gameState, status: statusToSave, sessionId: SESSION_ID } as any)
              .catch(err => {
                console.error("Cloud save failed:", err);
              });
          }, 3000); // 3s debounce for cloud save
        }
      }
    }

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      if (localSaveTimeoutRef.current) clearTimeout(localSaveTimeoutRef.current);
    };
  }, [gameState.status, gameState.character, gameState.history, gameState.isLoading, gameState.npcProfiles, gameState.stageSettings, gameState.difficulty, gameState.selectedStages, gameState.logs, gameState.gaiaState, user]);

  const handleReturnToStart = () => {
    console.log("Returning to start menu...");
    setIsGameMenuOpen(false);
    
    // Use a timeout to ensure the state update happens after the current render cycle
    // and isn't batched with other updates that might override it.
    setTimeout(() => {
      setGameState(prev => ({ 
        ...prev, 
        status: GameStatus.START_MENU, 
        character: null, 
        history: [],
        npcProfiles: [],
        logs: [],
        
        systemState: undefined,
        gaiaState: undefined,
        stageSettings: undefined,
        selectedStages: undefined,
        isCharacterSheetOpen: false,
        isCompendiumOpen: false,
        isLogModalOpen: false,
        isLoading: false,
        difficulty: 'normal'
      }));
      
      // Update saveExists state just in case (only for local saves)
      if (!user) {
        const savedData = loadGame();
        if (savedData) {
          setSaveExists(true);
          setSavedDifficulty(savedData.difficulty || 'normal');
        } else {
          setSaveExists(false);
        }
      }
    }, 0);
  };

  const handleStartNewGame = (difficulty: 'normal' | 'grand' = 'normal') => {
    setPendingDifficulty(difficulty);
    if (saveExists) {
      setShowNewGameConfirm(true);
    } else {
      confirmStartNewGame(difficulty);
    }
  };

  const confirmStartNewGame = (difficulty?: 'normal' | 'grand') => {
    console.log("Starting new game...");
    const diff = difficulty || pendingDifficulty;
    clearSave();
    resetGame();

    setGameState(prev => ({ 
      ...prev, 
      status: GameStatus.CREATION, 
      character: null, 
      history: [],
      logs: [],
      
      systemState: undefined,
      gaiaState: { sectors: {}, planets: {}, lastUpdated: Date.now() },
      isCharacterSheetOpen: false,
      isCompendiumOpen: false,
      npcProfiles: [
        {
          id: 'historical-system',
          name: '战略情报监测枢纽 (Strategic Intelligence Monitoring Node)',
          aiGeneratedRecord: '当前第41个千年星区局势的核心监察系统。负责帝国威望、星系局势与亚空间干涉度核算。',
          userNotes: '',
          status: '运作中',
          tags: ['系统', '局势'],
          hiddenNotes: '[Food Provisions: Initial] [Political Prestige: 10] [Unrest: 0]',
          records: [],
          lastUpdated: Date.now(),
          bondLevel: 0,
          resistance: 'High',
          nextMilestone: 'N/A'
        }
      ],
      stageSettings: undefined,
      selectedStages: undefined,
      difficulty: diff
    }));
    setSelectedMessageIds(new Set());
    setShowNewGameConfirm(false);
  };

  const cancelStartNewGame = () => {
    setShowNewGameConfirm(false);
  };

  const restoreGameSession = async (character: Character, history: Message[], npcProfiles: NPCProfile[] = [], stageSettings?: string, status: GameStatus = GameStatus.PLAYING, difficulty: 'normal' | 'grand' = 'normal', selectedStages?: string[], logs: LogSummary[] = [],  gaiaState?: GaiaState) => {
    const sanitizedHistory = history.map(msg => ({ ...msg, isStreaming: false }));

    let finalSelectedStages = selectedStages;
    if (!finalSelectedStages || finalSelectedStages.length === 0) {
      if (character && character.setting) {
        finalSelectedStages = getDefaultWorldBooks(character.setting);
      } else {
        finalSelectedStages = [];
      }
    }

    setGameState(prev => ({
      ...prev,
      character: character,
      history: sanitizedHistory,
      npcProfiles: npcProfiles,
      stageSettings: stageSettings,
      selectedStages: finalSelectedStages,
      status: status,
      difficulty: difficulty,
      
      gaiaState: gaiaState || prev.gaiaState,
      logs: logs,
      isLoading: true
    }));
    setSelectedMessageIds(new Set());

    try {
      if (status === GameStatus.PLAYING) {
        await initializeGame(sanitizedHistory, currentModel);
      }
      setGameState(prev => ({ ...prev, isLoading: false }));
      saveGame(character, sanitizedHistory, npcProfiles, stageSettings, status, difficulty, finalSelectedStages, logs, gaiaState);
      setSaveExists(true);
    } catch (e) {
      console.error("Failed to restore game session", e);
      setGameState(prev => ({ ...prev, isLoading: false }));
      console.warn("恢复会话失败");
    }
  };

  const handleContinueGame = async () => {
    const db = getFirestoreDb();
    if (user && db) {
      try {
        const cloudData = await loadGameStateFromCloud(user.uid);
        const localData = loadGame();
        
        let restored = false;
        
        if (cloudData && cloudData.character) {
          const cloudTimestamp = (cloudData as any).lastUpdated?.toMillis ? (cloudData as any).lastUpdated.toMillis() : (cloudData as any).timestamp || 0;
          const localTimestamp = localData?.timestamp || 0;
          const useLocal = localTimestamp > cloudTimestamp;

          const dataToRestore = useLocal && localData ? localData : (cloudData as any);
          const history = dataToRestore.history || [];
          // FORCE PLAYING if history exists, regardless of saved status
          const status = (history.length > 0) ? GameStatus.PLAYING : (dataToRestore.status || GameStatus.PLAYING);
          
          await restoreGameSession(
            dataToRestore.character, 
            history, 
            dataToRestore.npcProfiles || [], 
            dataToRestore.stageSettings, 
            status, 
            dataToRestore.difficulty || 'normal', 
            dataToRestore.selectedStages || [], 
            dataToRestore.logs || [], 
            dataToRestore.gaiaState
          );
          restored = true;
        }
        
        if (!restored && localData && localData.character) {
          const history = localData.history || [];
          const status = (history.length > 0) ? GameStatus.PLAYING : localData.status;
          await restoreGameSession(localData.character, history, localData.npcProfiles || [], localData.stageSettings, status, localData.difficulty, localData.selectedStages, localData.logs, localData.gaiaState);
        }
      } catch (e) {
        console.error("Cloud restore failed, falling back to local storage:", e);
        const localData = loadGame();
        if (localData && localData.character) {
          const history = localData.history || [];
          const status = (history.length > 0) ? GameStatus.PLAYING : localData.status;
          await restoreGameSession(localData.character, history, localData.npcProfiles || [], localData.stageSettings, status, localData.difficulty, localData.selectedStages, localData.logs, localData.gaiaState);
        }
      }
    } else {
      const savedData = loadGame();
      if (!savedData) return;
      const history = savedData.history || [];
      const status = (history.length > 0) ? GameStatus.PLAYING : savedData.status;
      await restoreGameSession(savedData.character, history, savedData.npcProfiles || [], savedData.stageSettings, status, savedData.difficulty, savedData.selectedStages, savedData.logs, savedData.gaiaState);
    }
  };

  const handleImportGame = async (data: any) => {
    if (validateSaveData(data)) {
      await restoreGameSession(data.character, data.history, data.npcProfiles, (data as any).stageSettings, (data as any).status, (data as any).difficulty, (data as any).selectedStages, data.logs || [], data.gaiaState);
    } else {
      console.error("存档文件格式无效。");
    }
  };

  const handleExport = (purify?: boolean) => {
    if (gameState.character && gameState.history.length > 0) {
      exportSaveToFile(gameState.character, gameState.history, gameState.npcProfiles || [], gameState.stageSettings, gameState.status, gameState.difficulty, gameState.selectedStages, gameState.logs, gameState.gaiaState, { purify });
    }
  };

  const handleModelChange = async (newModel: string) => {
    setCurrentModel(newModel);
    
    // If playing, we need to switch the live session
    if (gameState.status === GameStatus.PLAYING) {
       try {
         await switchSessionModel(newModel, gameState.history, "");
       } catch(err) {
         console.error("Failed to switch model", err);
       }
    }
  };

  const handleOpenLogModal = () => {
    setGameState(prev => ({ ...prev, isLogModalOpen: true }));
  };

  const handleAddNPC = (name: string) => {
    const newNPC: NPCProfile = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name,
      aiGeneratedRecord: '',
      userNotes: '',
      status: '',
      parameters: '',
      trait: '',
      skill: '',
      equipment: '',
      items: '',
      tags: [],
      records: [],
      hiddenNotes: '',
      lastUpdated: Date.now(),
      bondLevel: 0,
      resistance: 'Low',
      nextMilestone: 'None'
    };
    setGameState(prev => ({
      ...prev,
      npcProfiles: [...safeArray(prev.npcProfiles), newNPC]
    }));
  };

  const handleUpdateNPC = (updatedNPC: Partial<NPCProfile> & { id?: string, name?: string }) => {
    if (!updatedNPC.id && !updatedNPC.name) return;
    
    setGameState(prev => {
      // Manual updates from the UI should be treated as full updates for the provided fields
      const nextProfiles = applyNPCUpdates(prev.npcProfiles || [], [{ ...updatedNPC, _isFullUpdate: true }], prev.logs);
      
      // Force immediate local save
      if (prev.character) {
        setTimeout(() => {
          saveGame(prev.character!, prev.history, nextProfiles, prev.stageSettings, prev.status, prev.difficulty,  prev.selectedStages, prev.logs, prev.gaiaState);
        }, 0);
      }

      return { ...prev, npcProfiles: nextProfiles };
    });
  };

  const handleDeleteNPC = async (npcId: string | undefined) => {
    if (!npcId) {
      console.warn('handleDeleteNPC: Missing npcId');
      return;
    }
    console.log('PURGE: handleDeleteNPC called with ID:', npcId);
    
    // Explicitly cast to string for comparison and ensure we work with latest state
    const idToMatch = String(npcId);

    setGameState(prev => {
      const currentProfiles = safeArray(prev.npcProfiles);
      const nextProfiles = currentProfiles.filter(p => p && String(p.id) !== idToMatch);
      
      console.log(`PURGE: Filtering profiles. Before: ${currentProfiles.length}, After: ${nextProfiles.length}`);
      
      // Force immediate local save
      if (prev.character) {
        setTimeout(() => {
          saveGame(prev.character!, prev.history, nextProfiles, prev.stageSettings, prev.status, prev.difficulty,  prev.selectedStages, prev.logs, prev.gaiaState);
        }, 10);
      }

      return {
        ...prev,
        npcProfiles: nextProfiles
      };
    });

    // Cloud side
    if (isCloudSyncEnabled && user && user.uid !== 'local-warrior') {
      try {
        console.log('[Cloud] Purging NPC from Firestore:', idToMatch);
        const { deleteNPCFromCloud } = await import('./services/cloudStorageService');
        await deleteNPCFromCloud(user.uid, idToMatch);
      } catch (err) {
        console.error('[Cloud] Failed to purge NPC:', err);
      }
    }
  };

  const handleMoveNPC = (id: string, direction: 'up' | 'down') => {
    setGameState(prev => {
      const profiles = [...(prev.npcProfiles || [])];
      const index = profiles.findIndex(p => p.id === id);
      if (index === -1) return prev;

      // Find the actual visible index (excluding historical-system)
      const visibleProfiles = profiles.filter(p => p.id !== 'historical-system');
      const visibleIndex = visibleProfiles.findIndex(p => p.id === id);
      
      if (direction === 'up' && visibleIndex > 0) {
        const targetId = visibleProfiles[visibleIndex - 1].id;
        const targetIndex = profiles.findIndex(p => p.id === targetId);
        // Swap
        const temp = profiles[index];
        profiles[index] = profiles[targetIndex];
        profiles[targetIndex] = temp;
      } else if (direction === 'down' && visibleIndex < visibleProfiles.length - 1) {
        const targetId = visibleProfiles[visibleIndex + 1].id;
        const targetIndex = profiles.findIndex(p => p.id === targetId);
        // Swap
        const temp = profiles[index];
        profiles[index] = profiles[targetIndex];
        profiles[targetIndex] = temp;
      } else {
        return prev;
      }

      // Force immediate local save
      if (prev.character) {
        setTimeout(() => {
          saveGame(prev.character!, prev.history, profiles, prev.stageSettings, prev.status, prev.difficulty,  prev.selectedStages, prev.logs, prev.gaiaState);
        }, 0);
      }

      return {
        ...prev,
        npcProfiles: profiles
      };
    });
  };

  const handleSyncNPC = (npcId: string) => {
    setTargetNPCId(npcId);
    setIsCompendiumSyncMode(true);
    setGameState(prev => ({ ...prev, isCompendiumOpen: false }));
    setSelectedMessageIds(new Set());
  };

  const handleMergeNPCs = (sourceIds: string[], targetId: string) => {
    console.log('DEBUG: handleMergeNPCs called. sourceIds:', sourceIds, 'targetId:', targetId);
    console.log('DEBUG: Available IDs:', gameState.npcProfiles?.map(p => p.id));
    setGameState(prev => {
      const profiles = prev.npcProfiles || [];
      const targetNPC = profiles.find(p => p.id === targetId);
      console.log('DEBUG: targetNPC found:', !!targetNPC);
      if (!targetNPC) return prev;

      const sourceNPCs = profiles.filter(p => sourceIds.includes(p.id) && p.id !== targetId);
      console.log('DEBUG: sourceNPCs found:', sourceNPCs.length);
      
      const mergedRecords = [...safeArray(targetNPC.records)];
      let mergedUserNotes = targetNPC.userNotes || '';
      let mergedAiGeneratedRecord = targetNPC.aiGeneratedRecord || '';
      let mergedHiddenNotes = targetNPC.hiddenNotes || '';
      const mergedTags = new Set(safeArray(targetNPC.tags));
      let maxBondLevel = targetNPC.bondLevel || 0;

      if (Array.isArray(sourceNPCs)) {
        sourceNPCs.forEach(s => {
          console.log('DEBUG: merging source NPC:', s.name, s.id);
          if (s.records) {
            mergedRecords.push(...s.records);
          }
          if (s.userNotes) {
            mergedUserNotes += `\n[Merged from ${s.name}]: ${s.userNotes}`;
          }
          if (s.aiGeneratedRecord) {
            mergedAiGeneratedRecord += `\n[Merged from ${s.name}]: ${s.aiGeneratedRecord}`;
          }
          if (s.hiddenNotes) {
            mergedHiddenNotes += `\n[Merged from ${s.name}]: ${s.hiddenNotes}`;
          }
          if (s.tags && Array.isArray(s.tags)) {
            s.tags.forEach(t => mergedTags.add(t));
          }
          if ((s.bondLevel || 0) > maxBondLevel) {
            maxBondLevel = s.bondLevel || 0;
          }
        });
      }

      // Sort merged records by timestamp using custom comparator
      mergedRecords.sort((a, b) => compareDates(a.timestamp, b.timestamp));

      // Deduplicate by content to prevent duplicate lore entries, fallback to ID or index
      const uniqueRecordsMap = new Map<string, NPCRecord>();
      mergedRecords.forEach((r, index) => {
        if (!r) return;
        const key = r.content ? r.content.trim() : (r.id || `temp_${index}`);
        if (!uniqueRecordsMap.has(key)) {
          // Ensure the record has an ID if it was missing
          if (!r.id) {
            r.id = `rec_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
          }
          uniqueRecordsMap.set(key, r);
        }
      });
      
      const sortedRecords = Array.from(uniqueRecordsMap.values()).sort((a, b) => {
        // 1. Try to sort by in-game Day if available
        const parseGameDay = (ts: string) => {
          if (!ts) return -1;
          const match = ts.match(/Day\s*(\d+)/i) || ts.match(/第\s*(\d+)\s*天/);
          if (match) {
            const day = parseInt(match[1], 10);
            let timeScore = 0;
            const lowerTs = ts.toLowerCase();
            if (lowerTs.includes('morning') || lowerTs.includes('早') || lowerTs.includes('上午')) timeScore = 1;
            else if (lowerTs.includes('noon') || lowerTs.includes('中')) timeScore = 2;
            else if (lowerTs.includes('afternoon') || lowerTs.includes('下午')) timeScore = 3;
            else if (lowerTs.includes('evening') || lowerTs.includes('傍晚') || lowerTs.includes('黄昏')) timeScore = 4;
            else if (lowerTs.includes('night') || lowerTs.includes('晚') || lowerTs.includes('夜')) timeScore = 5;
            return day * 10 + timeScore;
          }
          return -1;
        };

        const gameTimeA = parseGameDay(a.timestamp);
        const gameTimeB = parseGameDay(b.timestamp);

        if (gameTimeA !== -1 && gameTimeB !== -1 && gameTimeA !== gameTimeB) {
          return gameTimeA - gameTimeB;
        }

        // 2. Fallback to real-world creation time (from ID)
        const getTs = (id: string) => {
          if (!id) return 0;
          if (id.startsWith('rec_')) {
            const parts = id.split('_');
            if (parts.length > 1) return parseInt(parts[1], 10) || 0;
          }
          const match = id.match(/^(\d{12,14})/);
          if (match) return parseInt(match[1], 10) || 0;
          return 0;
        };
        
        const tsA = getTs(a.id);
        const tsB = getTs(b.id);
        
        if (tsA !== 0 && tsB !== 0) {
          return tsA - tsB;
        } else if (tsA !== 0) {
          return 1; // a has timestamp, b doesn't. b comes first (older)
        } else if (tsB !== 0) {
          return -1; // b has timestamp, a doesn't. a comes first (older)
        }
        
        return 0;
      });

      const updatedTargetNPC: NPCProfile = {
        ...targetNPC,
        records: sortedRecords,
        userNotes: mergedUserNotes.trim(),
        aiGeneratedRecord: mergedAiGeneratedRecord.trim(),
        hiddenNotes: mergedHiddenNotes.trim(),
        tags: Array.from(mergedTags),
        bondLevel: maxBondLevel,
        lastUpdated: Date.now()
      };

      const nextProfiles = profiles
        .filter(p => !sourceIds.includes(p.id) || p.id === targetId)
        .map(p => p.id === targetId ? updatedTargetNPC : p);

      // Force immediate local save
      if (prev.character) {
        setTimeout(() => {
          saveGame(prev.character!, prev.history, nextProfiles, prev.stageSettings, prev.status, prev.difficulty,  prev.selectedStages, prev.logs, prev.gaiaState);
        }, 0);
      }

      return {
        ...prev,
        npcProfiles: nextProfiles
      };
    });
  };

  const handleCancelCompendiumSync = () => {
    setIsCompendiumSyncMode(false);
    setTargetNPCId(null);
    setGameState(prev => ({ ...prev, isCompendiumOpen: true }));
    setSelectedMessageIds(new Set());
  };

  const handleAddLog = (title: string = '新推演记录', date: string = new Date().toLocaleString()) => {
    // Force title to be string to prevent React crash if called from event handler
    const finalTitle = typeof title === 'string' ? title : '新推演记录';
    const finalDate = typeof date === 'string' ? date : new Date().toLocaleString();

    const newLog: LogSummary = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      title: finalTitle,
      date: finalDate,
      summary: '手动建立的战事纪要待完善。',
      keywords: ['手动记录'],
      timestamp: Date.now(),
      days: [
        {
          date: '天数(Day) XX',
          events: [
            {
              title: '事件摘要',
              description: '在此键入详细的推演记录内容...',
              dialogues: []
            }
          ]
        }
      ],
      npcUpdates: []
    };
    
    setGameState(prev => ({
      ...prev,
      logs: [...safeArray(prev.logs), newLog].sort((a, b) => b.timestamp - a.timestamp)
    }));
  };

  const handleSyncLog = () => {
    setIsLogSyncMode(true);
    setGameState(prev => ({ ...prev, isLogModalOpen: false }));
    setSelectedMessageIds(new Set());
  };

  const handleCancelLogSync = () => {
    setIsLogSyncMode(false);
    setGameState(prev => ({ ...prev, isLogModalOpen: true }));
    setSelectedMessageIds(new Set());
  };

  const handleConfirmLogSync = async () => {
    if (selectedMessageIds.size === 0 || gameState.isLoading) return;

    setGameState(prev => ({ ...prev, isLoading: true }));
    try {
      console.log(`Starting log generation for ${selectedMessageIds.size} messages...`);
      const selectedMessages = gameState.history.filter(m => selectedMessageIds.has(m.id));
      const logSummary = await generateLogEntry(selectedMessages, gameState.character, gameState.logs, gameState.stageSettings, gameState.npcProfiles);
      
      console.log("Log generated successfully, processing updates...");
      const hasEvents = logSummary.days && logSummary.days.some(day => day.events && day.events.length > 0);
      
      if (!hasEvents) {
        setGameState(prev => ({ ...prev, isLoading: false, isLogModalOpen: true }));
        setIsLogSyncMode(false);
        setSelectedMessageIds(new Set());
        alert("AI 未能从选中的内容中提取到新的有效事件，请尝试勾选更多或不同的对话。");
        return;
      }

      // Process and add log entry in one state update
      setGameState(prev => {
        // Apply NPC updates from the log summary if present
        let nextProfiles = prev.npcProfiles;
        if (logSummary.npcUpdates && logSummary.npcUpdates.length > 0) {
          nextProfiles = applyNPCUpdates(prev.npcProfiles, logSummary.npcUpdates, prev.logs);
        }

        return {
          ...prev,
          logs: [...safeArray(prev.logs), logSummary].sort((a, b) => b.timestamp - a.timestamp),
          npcProfiles: nextProfiles,
          isLoading: false,
          isLogModalOpen: true
        };
      });
      
      setIsLogSyncMode(false);
      setSelectedMessageIds(new Set());
    } catch (error: any) {
      console.error("Error generating log:", error);
      setGameState(prev => ({ ...prev, isLoading: false, isLogModalOpen: true }));
      setIsLogSyncMode(false);
      setSelectedMessageIds(new Set());
      alert(`日志生成失败: ${error.message || "未知错误"}`);
    }
  };

  const handleConfirmCompendiumSync = async () => {
    if (!targetNPCId || selectedMessageIds.size === 0) return;

    const targetNPC = gameState.npcProfiles?.find(p => p.id === targetNPCId);
    if (!targetNPC) return;

    // Get selected messages content
    const selectedContent = gameState.history
      .filter(msg => selectedMessageIds.has(msg.id))
      .map(msg => `[${msg.role === 'user' ? 'Player' : 'Game'}]: ${msg.content}`)
      .join('\n\n');

    setGameState(prev => ({ ...prev, isLoading: true }));

    const prompt = generateNPCUpdatePrompt(
      targetNPC.name, 
      targetNPC.status, 
      targetNPC.attributes,
      targetNPC.trait || '',
      targetNPC.skill || '',
      targetNPC.equipment || '',
      targetNPC.items || '',
      targetNPC.tags || [], 
      targetNPC.hiddenNotes || '',
      targetNPC.bondLevel || 0,
      targetNPC.resistance || 'Medium',
      targetNPC.nextMilestone || '',
      selectedContent,
      targetNPC.hasAppeared,
      targetNPC.appearanceTime,
      targetNPC.appearanceLocation
    );

    const result = await analyzeNPCData(prompt, gameState.character?.setting);

    setGameState(prev => {
      const updatedProfiles = safeArray(prev.npcProfiles).map(p => {
        if (p.id === targetNPCId) {
          // Merge new records: if content is same, update timestamp, otherwise add new
          const existingRecords = safeArray(p.records);
          const newRecords = safeArray(result.newRecords).map(r => ({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            content: r.content,
            timestamp: r.timestamp || new Date().toLocaleString(),
            location: r.location
          }));

          // Simple merge: add new records, keep old ones
          const mergedRecords = [...existingRecords, ...newRecords];

          return {
            ...p,
            status: result.status || p.status,
            parameters: result.parameters || p.parameters,
            trait: result.trait || p.trait,
            skill: result.skill || p.skill,
            equipment: result.equipment || p.equipment,
            items: result.items || p.items,
            tags: result.tags || p.tags,
            hiddenNotes: result.hiddenNotes || p.hiddenNotes,
            bondLevel: result.bondLevel !== undefined ? result.bondLevel : p.bondLevel,
            resistance: result.resistance || p.resistance,
            nextMilestone: result.nextMilestone || p.nextMilestone,
            // Strictly handle the boolean `hasAppeared`
            hasAppeared: (result.hasAppeared === true || result.hasAppeared === false) ? result.hasAppeared : p.hasAppeared,
            appearanceTime: result.appearanceTime || p.appearanceTime,
            appearanceLocation: result.appearanceLocation || p.appearanceLocation,
            records: mergedRecords,
            lastUpdated: Date.now()
          };
        }
        return p;
      });

      return {
        ...prev,
        npcProfiles: updatedProfiles,
        isLoading: false,
        isCompendiumOpen: true // Re-open compendium
      };
    });

    setIsCompendiumSyncMode(false);
    setTargetNPCId(null);
    setSelectedMessageIds(new Set());
  };

  const handleBatchInferAppearances = async (): Promise<number> => {
    setGameState(prev => ({ ...prev, isLoading: true }));
    try {
      const { batchInferAppearances } = await import('./services/geminiService');
      const updates = await batchInferAppearances(gameState.npcProfiles, gameState.logs);
      
      if (updates && updates.length > 0) {
        setGameState(prev => {
          const updatedProfiles = prev.npcProfiles.map(p => {
            const update = updates.find(u => u.id === p.id);
            if (update) {
              return {
                ...p,
                hasAppeared: update.hasAppeared,
                appearanceTime: update.appearanceTime,
                appearanceLocation: update.appearanceLocation,
                lastUpdated: Date.now()
              };
            }
            return p;
          });
          return { ...prev, npcProfiles: updatedProfiles, isLoading: false };
        });
        return updates.length;
      } else {
        setGameState(prev => ({ ...prev, isLoading: false }));
        return 0;
      }
    } catch (error) {
      console.error("Batch infer failed:", error);
      setGameState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const handleFormatNPCRecords = async (npcId: string): Promise<void> => {
    const npc = gameState.npcProfiles.find(p => p.id === npcId);
    if (!npc || !npc.records || npc.records.length === 0) return;

    setGameState(prev => ({ ...prev, isLoading: true }));
    try {
      const { formatNPCRecords } = await import('./services/geminiService');
      const updatedRecords = await formatNPCRecords(npc.records, gameState.logs);
      
      console.log("Formatted records:", updatedRecords);

      setGameState(prev => {
        const updatedProfiles = prev.npcProfiles.map(p => {
          if (p.id === npcId) {
            return { ...p, records: updatedRecords, lastUpdated: Date.now() };
          }
          return p;
        });
        return { ...prev, npcProfiles: updatedProfiles, isLoading: false };
      });
    } catch (error) {
      console.error("Format records failed:", error);
      setGameState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const handleUpdateMessage = (id: string, newContent: string) => {
    setGameState(prev => ({
      ...prev,
      history: prev.history.map(msg => 
        msg.id === id ? { ...msg, content: newContent } : msg
      )
    }));
  };

  const handleDeleteMessage = (id: string) => {
    // Avoid window.confirm as it might be blocked in iframe
    setGameState(prev => {
      const { nextChar, nextGaiaState, newHistory } = calculateRollbackState(prev.history, id, prev.character, prev.gaiaState);
      return {
        ...prev,
        character: nextChar,
        history: newHistory,
        gaiaState: nextGaiaState
      };
    });
    setSelectedMessageIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleToggleMessageSelection = (id: string) => {
    setSelectedMessageIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        const limit = isCompendiumSyncMode ? 20 : (isLogSyncMode ? 30 : 10);
        if (newSet.size >= limit) {
          return prev;
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDeducePlot = async () => {
    if (selectedMessageIds.size === 0 || gameState.isLoading || isSendingRef.current) return;
    isSendingRef.current = true;

    const selectedMessageIdsSet = new Set(selectedMessageIds);
    // Add the last message if it's a model message
    const lastMsg = gameState.history.length > 0 ? gameState.history[gameState.history.length - 1] : null;
    if (lastMsg && lastMsg.role === 'model') {
      selectedMessageIdsSet.add(lastMsg.id);
    }
    
    const selectedContent = gameState.history
      .filter(m => selectedMessageIdsSet.has(m.id))
      .map(m => `[${m.role === 'user' ? '玩家' : 'AI'}]: ${m.content}`)
      .join('\n\n');

    let prompt = generateDeductionPrompt(
      gameState.character!, 
      selectedContent, 
      input, 
      gameState.npcProfiles, 
      gameState.difficulty, 
      gameState.stageSettings, 
      gameState.selectedStages, 
      gameState.logs, 
      gameState.gaiaState,
      gameState.isTutorialEnabled
    );
    
    const userMsg: Message = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: `【系统指令：基于选定事件进行剧情推演】${input ? `\n玩家行动描述：${input}` : ''}`
    };

    const currentHistory = [...gameState.history, userMsg];

    setGameState(prev => ({
      ...prev,
      history: currentHistory,
      isLoading: true
    }));
    setInput('');

    // Inject Built-in Entity Synthesizer Plugin
    const synthesisPluginContent = await synthesizeEntities(input || '继续推演', gameState.logs, gameState.gaiaState, gameState.character);
    if (synthesisPluginContent) {
      prompt += synthesisPluginContent;
    }

    const aiMsgId = (Date.now() + 1).toString() + Math.random().toString(36).substring(2, 9);
    setGameState(prev => ({
      ...prev,
      history: [...currentHistory, { id: aiMsgId, role: 'model', content: '', isStreaming: true }]
    }));

    try {
      const response = await executeAiCall(aiMsgId, () => sendMessage(prompt, (text) => {
        setGameState(prev => {
          const newHistory = [...prev.history];
          const lastMsg = newHistory.find(m => m.id === aiMsgId);
          if (lastMsg) {
            lastMsg.content = text;
          }
          return { ...prev, history: newHistory };
        });
      }, gameState.character?.setting, getUnlockedTrueNames(), currentHistory, "", gameState.stageSettings), (count) => `[剧情推演受阻 (429)，正在尝试第 ${count} 次自动重连中...]`);

      const { character, gaiaState, npcProfiles, addedXP, snapshot } = handleAiResponseUpdate(
        gameState.npcProfiles,
        gameState.logs,
        response.text,
        gameState.character,
        gameState.gaiaState
      );

      setGameState(prev => {
        const newHistory = [...prev.history];
        const lastMsg = newHistory.find(m => m.id === aiMsgId);
        if (lastMsg) {
          lastMsg.content = response.text;
          lastMsg.groundingMetadata = response.groundingMetadata;
          lastMsg.isStreaming = false;
          lastMsg.xpChange = addedXP;
          lastMsg.snapshot = snapshot;
        }
        return { ...prev, history: newHistory, character, isLoading: false, gaiaState, npcProfiles };
      });
    } catch (error: any) {
      console.error("Failed to deduce plot", error);
      setGameState(prev => ({ ...prev, isLoading: false }));
    } finally {
      isSendingRef.current = false;
    }
  };

  const handleResetOpening = async () => {
    if (gameState.isLoading || !gameState.character || isSendingRef.current) return;
    isSendingRef.current = true;
    
    // Reset history
    setGameState(prev => ({
      ...prev,
      history: [],
      isLoading: true
    }));
    setSelectedMessageIds(new Set());

    try {
      await initializeGame([], currentModel);
      
      const initialPrompt = generateInitialPrompt(
        gameState.character, 
        gameState.stageSettings, 
        gameState.difficulty, 
        gameState.selectedStages,
        "",
        gameState.isTutorialEnabled
      );

      const msgId = Date.now().toString() + Math.random().toString(36).substring(2, 9);
      
      setGameState(prev => ({
        ...prev,
        history: [{ id: msgId, role: 'model', content: '', isStreaming: true }]
      }));

      const response = await executeAiCall(msgId, () => sendMessage(initialPrompt, (text) => {
        setGameState(prev => {
          const newHistory = [...prev.history];
          const lastMsg = newHistory.find(m => m.id === msgId);
          if (lastMsg) {
            lastMsg.content = text;
          }
          return { ...prev, history: newHistory };
        });
      }, gameState.character?.setting, getUnlockedTrueNames(), [], "", gameState.stageSettings), (count) => `[重置开场受阻 (429)，正在尝试第 ${count} 次自动重连中...]`);

      const updateResult = extractCharacterUpdate(response.text, gameState.character);
      const newCharacter = updateResult.character;
      const newGaiaState = extractGaiaState(response.text, gameState.gaiaState);
      const npcUpdates = extractNPCUpdates(response.text);

      setGameState(prev => {
         const newHistory = [...prev.history];
         const lastMsg = newHistory.find(m => m.id === msgId);
         if(lastMsg) {
             lastMsg.content = response.text;
             lastMsg.groundingMetadata = response.groundingMetadata;
             lastMsg.isStreaming = false;
             lastMsg.snapshot = {
                character: newCharacter || undefined,
                gaiaState: newGaiaState,
                npcProfiles: applyNPCUpdates(prev.npcProfiles || [], npcUpdates, prev.logs)
             };
         }
         
         const nextProfiles = applyNPCUpdates(prev.npcProfiles || [], npcUpdates, prev.logs);
         
         return { ...prev, history: newHistory, character: newCharacter, isLoading: false, gaiaState: newGaiaState, npcProfiles: nextProfiles };
      });

    } catch (error: any) {
      console.error("Failed to reset game opening", error);
      const errorMessage = error?.message || "Unknown error";
      setGameState(prev => ({ 
        ...prev, 
        history: [{ 
          id: Date.now().toString() + Math.random().toString(36).substring(2, 9), 
          role: 'model', 
          content: `[重置开场失败。错误信息: ${errorMessage}。]`, 
          isStreaming: false 
        }],
        isLoading: false 
      }));
    } finally {
      isSendingRef.current = false;
    }
  };

  const handleCharacterComplete = async (character: Character, stageSettings?: string) => {
    const defaultStages = getDefaultWorldBooks(character.setting);
    const settings = stageSettings || "";

    setGameState(prev => ({ 
      ...prev, 
      status: GameStatus.PLAYING, 
      character,
      stageSettings: settings,
      selectedStages: defaultStages,
      isLoading: true 
    }));

    // Trigger game start logic immediately
    await handleResetOpeningDirect(character, settings, defaultStages);
  };

  const handleResetOpeningDirect = async (character: Character, stageSettings: string, selectedStages: string[]) => {
    if (isSendingRef.current) return;
    
    // Clear everything and start new
    const difficulty = (gameState.difficulty as 'normal' | 'grand') || 'normal';
    const prompt = generateInitialPrompt(character, stageSettings, difficulty, selectedStages, "", gameState.isTutorialEnabled);
    
    setGameState(prev => ({
      ...prev,
      history: [],
      npcProfiles: [],
      logs: [],
      gaiaState: {
        lastSummary: "",
        entities: {},
        relationships: [],
        locations: {},
        activeQuests: [],
        sectors: {},
        planets: {},
        lastUpdated: Date.now()
      },
      isLoading: true
    }));

    const aiMsgId = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    setGameState(prev => ({
      ...prev,
      history: [{ id: aiMsgId, role: 'model', content: '', isStreaming: true }]
    }));

    try {
      isSendingRef.current = true;
      const response = await executeAiCall(aiMsgId, () => sendMessage(
        prompt, 
        (text) => {
          setGameState(prev => {
            const newHistory = [...prev.history];
            const lastMsg = newHistory.find(m => m.id === aiMsgId);
            if (lastMsg) lastMsg.content = text;
            return { ...prev, history: newHistory };
          });
        }, 
        character.setting || undefined, 
        [], 
        [], 
        undefined, // Pass undefined for currentDate to let AI determine it from prompt for new game
        stageSettings
      ), (count) => `[帝皇光辉被亚空间风暴遮蔽 (429)，正在尝试第 ${count} 次自动灵能连接中...]`);

      const newGaiaState = extractGaiaState(response.text, {
        sectors: {},
        planets: {},
        lastUpdated: Date.now(),
        lastSummary: "",
        entities: {},
        relationships: [],
        locations: {},
        activeQuests: []
      });
      const npcUpdates = extractNPCUpdates(response.text);
      const nextProfiles = applyNPCUpdates([], npcUpdates, []);

      setGameState(prev => ({ 
        ...prev, 
        isLoading: false,
        gaiaState: newGaiaState,
        npcProfiles: nextProfiles
      }));
      setSaveExists(true);
      
      // Initial save
      saveGame(character, [{ id: aiMsgId, role: 'model', content: response.text }], nextProfiles, stageSettings, GameStatus.PLAYING, difficulty, selectedStages, [], newGaiaState);

    } catch (error) {
      console.error("Failed to start game:", error);
      setGameState(prev => ({ ...prev, isLoading: false }));
    } finally {
      isSendingRef.current = false;
    }
  };

  const handleStageSetupComplete = (settings: string, characterOverride?: Character, stagesOverride?: string[]) => {
    const character = characterOverride ?? gameState.character;
    if (!character) return;

    // Check if there is already history - if so, this is a middleware console operation
    const hasHistory = gameState.history && gameState.history.length > 0;
    
    // Only allow changing world books if it's the very first setup
    const selectedStages = hasHistory 
      ? (gameState.selectedStages || []) 
      : (stagesOverride ?? gameState.selectedStages ?? getDefaultWorldBooks(character.setting));

    setGameState(prev => {
      const newState: GameState = { 
        ...prev, 
        status: GameStatus.PLAYING, 
        character: character,
        stageSettings: settings,
        selectedStages: selectedStages,
        isLoading: false 
      };
      
      // Persist the settings
      saveGame(
        character, 
        prev.history, 
        prev.npcProfiles || [], 
        settings, 
        GameStatus.PLAYING, 
        prev.difficulty, 
        selectedStages, 
        prev.logs, 
        prev.gaiaState
      );
      
      if (!hasHistory) setSaveExists(true);
      return newState;
    });
  };

  const handleForceDeduce = async (settingsOverride?: string) => {
    const currentSettings = settingsOverride ?? gameState.stageSettings;
    if (gameState.isLoading || !currentSettings) return;

        const prompt = generateForceDeducePrompt(
          gameState.character!, 
          currentSettings, 
          input, 
          gameState.npcProfiles, 
          gameState.difficulty, 
          gameState.selectedStages, 
          gameState.logs, 
          gameState.gaiaState,
          gameState.isTutorialEnabled
        );

    const userMsg: Message = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: `【系统指令：基于更新后的舞台设定进行强制推演】${input ? `\n玩家额外行动：${input}` : ''}`
    };

    setGameState(prev => ({
      ...prev,
      history: [...prev.history, userMsg],
      isLoading: true
    }));
    setInput('');

    const aiMsgId = (Date.now() + 1).toString() + Math.random().toString(36).substring(2, 9);
    setGameState(prev => ({
      ...prev,
      history: [...prev.history, { id: aiMsgId, role: 'model', content: '', isStreaming: true }]
    }));

    try {
      const response = await executeAiCall(aiMsgId, () => sendMessage(prompt, (text) => {
        setGameState(prev => {
          const newHistory = [...prev.history];
          const lastMsg = newHistory.find(m => m.id === aiMsgId);
          if (lastMsg) {
            lastMsg.content = text;
          }
          return { ...prev, history: newHistory };
        });
      }, gameState.character?.setting, getUnlockedTrueNames(), gameState.history, "", currentSettings), (count) => `[强制演化受阻 (429)，正在尝试第 ${count} 次自动重连中...]`);

            const newGaiaState = extractGaiaState(response.text, gameState.gaiaState);
            const npcUpdates = extractNPCUpdates(response.text);

      setGameState(prev => {
         const nextProfiles = applyNPCUpdates(prev.npcProfiles || [], npcUpdates, prev.logs);
         const newHistory = [...prev.history];
         const lastMsg = newHistory.find(m => m.id === aiMsgId);
         if(lastMsg) {
             lastMsg.content = response.text;
             lastMsg.groundingMetadata = response.groundingMetadata;
             lastMsg.isStreaming = false;
             lastMsg.snapshot = {
               character: prev.character || undefined,
               gaiaState: newGaiaState,
               npcProfiles: nextProfiles
             };
         }
         return { ...prev, history: newHistory, isLoading: false,  gaiaState: newGaiaState,  npcProfiles: nextProfiles };
      });
      
    } catch (error) {
      console.error("Force deduction failed", error);
      setGameState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleConfirmUpgrade = (totalCost: number, attrUpgrades: Record<string, number>, skillUpgrades: Record<string, number>, newSkills: any[] = []) => {
    if (!gameState.character) return;
    const newChar = { ...gameState.character };
    newChar.experience -= totalCost;
    
    // apply attr
    Object.keys(attrUpgrades).forEach(attr => {
      newChar.attributes[attr as keyof typeof newChar.attributes] += attrUpgrades[attr];
    });

    // apply skills
    Object.keys(skillUpgrades).forEach(skill => {
      const existing = newChar.skills.find(s => s.name === skill);
      if (existing) {
        existing.level += skillUpgrades[skill];
      }
    });

    // apply new skills
    newSkills.forEach(skill => {
      newChar.skills.push(skill);
    });

    setGameState(prev => ({
      ...prev,
      character: newChar,
      history: [
        ...prev.history,
        {
          id: Date.now().toString(),
          role: 'user',
          content: `[SYSTEM_UPGRADE]\n玩家消耗了 ${totalCost} 经验点进行了能力提升，花费了 ${totalCost / 10} 天时间。\n提升的属性：${Object.entries(attrUpgrades).map(([k, v]) => k + '+' + v).join(', ') || '无'}\n提升的技能：${Object.entries(skillUpgrades).map(([k, v]) => k + '+' + v).join(', ') || '无'}\n请生成角色的对应升级叙事表现。`,
          upgradeRefund: {
            xp: totalCost,
            attributes: attrUpgrades,
            skills: skillUpgrades
          }
        }
      ]
    }));
    
    // Automatically trigger AI narration
    setTimeout(() => {
      handleForceDeduce();
    }, 100);
  };

  const handleUpdateCharacter = (updatedCharacter: Character) => {
    setGameState(prev => ({
      ...prev,
      character: updatedCharacter
    }));
  };

  const getUnlockedTrueNames = (): string[] => {
    const names: string[] = [];
    if (gameState.npcProfiles && Array.isArray(gameState.npcProfiles)) {
      gameState.npcProfiles.forEach(npc => {
        if (!npc.isTrueNameUnlocked) return;
        names.push(npc.name);
      });
    }
    return names;
  };

  const handleSendMessage = async () => {
    console.log("handleSendMessage triggered. Input:", input, "isLoading:", gameState.isLoading, "isSendingRef:", isSendingRef.current);
    
    if (!input.trim()) {
      console.log("handleSendMessage aborted: Input is empty.");
      return;
    }
    if (gameState.isLoading) {
      console.log("handleSendMessage aborted: Game is loading.");
      return;
    }
    if (isSendingRef.current) {
      console.log("handleSendMessage aborted: Already sending.");
      return;
    }

    isSendingRef.current = true;
    console.log("handleSendMessage proceeding. isSendingRef set to true.");

    const userMsg: Message = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: input
    };

    const currentHistory = [...gameState.history, userMsg];

    setGameState(prev => ({
      ...prev,
      history: currentHistory,
      isLoading: true
    }));
    setInput('');

    let aiMsgId = "";
    try {
      let messageToSend = input;
      if (gameState.character) {
          const statusPrompt = generateStatusPrompt(gameState.character, gameState.stageSettings, gameState.npcProfiles, gameState.difficulty, gameState.selectedStages, gameState.logs, gameState.gaiaState);
          messageToSend = `${statusPrompt}\n\n${input}`;
          
          if (gameState.isTutorialEnabled) {
            const isChaos = calculateEffectivelyChaos(gameState.character);
            const whisperName = isChaos ? '【👁️ 亚空间低语】' : '【📖 帝皇秘语】';
            messageToSend += `\n\n**【💡 教学模式指令】**: 请在回复末尾添加${whisperName}，以解释情况。`;
          }
      }
      
      aiMsgId = (Date.now() + 1).toString() + Math.random().toString(36).substring(2, 9);
      setGameState(prev => ({
        ...prev,
        history: [...currentHistory, { id: aiMsgId, role: 'model', content: '【正在调配资源与分析战区局势...】', isStreaming: true }]
      }));

      // Inject Built-in Entity Synthesizer Plugin
      const synthesisPluginContent = await synthesizeEntities(input || '常规互动', gameState.logs, gameState.gaiaState, gameState.character);
      if (synthesisPluginContent) {
        messageToSend += synthesisPluginContent;
      }

      // Reset the placeholder before starting the main stream
      setGameState(prev => {
        const newHistory = [...prev.history];
        const lastMsg = newHistory.find(m => m.id === aiMsgId);
        if (lastMsg) lastMsg.content = '';
        return { ...prev, history: newHistory };
      });

      const baselineDate = getLatestDateFromHistory([...gameState.history, userMsg]) || "";

      let lastUpdateTime = Date.now();
      const response = await executeAiCall(aiMsgId, () => sendMessage(messageToSend, (text) => {
        const now = Date.now();
        if (now - lastUpdateTime > 100) {
          setGameState(prev => {
            const newHistory = [...prev.history];
            const lastMsg = newHistory.find(m => m.id === aiMsgId);
            if (lastMsg) {
              lastMsg.content = text;
            }
            return { ...prev, history: newHistory };
          });
          lastUpdateTime = now;
        }
      }, gameState.character?.setting, getUnlockedTrueNames(), gameState.history, baselineDate, gameState.stageSettings, currentModel), (count) => `[与现实宇宙的的连接拥堵 (429)，正在尝试第 ${count} 次自动重连中...]`);

      setGameState(prev => {
        const { character, gaiaState, npcProfiles, logs, addedXP, snapshot } = handleAiResponseUpdate(
          prev.npcProfiles,
          prev.logs,
          response.text,
          prev.character,
          prev.gaiaState
        );

        const newHistory = [...prev.history];
        const lastMsg = newHistory.find(m => m.id === aiMsgId);
        if(lastMsg) {
            lastMsg.content = response.text; // Retain raw text in history for AI context
            lastMsg.groundingMetadata = response.groundingMetadata;
            lastMsg.isStreaming = false;
            lastMsg.snapshot = snapshot;
            lastMsg.xpChange = addedXP;
        }
        
        console.log("NPC Profiles Sync Result:", npcProfiles.length, "NPCs recorded.");
        console.log("Log Sync Result:", logs.length, "logs overall.");
        
        return { 
          ...prev, 
          history: newHistory, 
          character: character || prev.character, 
          isLoading: false, 
          gaiaState: gaiaState || prev.gaiaState, 
          npcProfiles: npcProfiles || prev.npcProfiles,
          logs: logs || prev.logs
        };
      });
    } catch (error: any) {
      console.error("Failed to send message", error);
      const errorMessage = error?.message || "Unknown error";
      if (aiMsgId) {
        try {
          setGameState(prev => {
            const newHistory = [...prev.history];
            const lastMsg = newHistory.find(m => m.id === aiMsgId);
            if (lastMsg) {
              lastMsg.content = `[与现实宇宙的连接中断了。错误信息: ${errorMessage}。请尝试点击“重新生成”或检查网络连接。]`;
              lastMsg.isStreaming = false;
            }
            return { ...prev, history: newHistory, isLoading: false };
          });
        } catch (stateError) {
          console.error("Failed to update state after error", stateError);
        }
      }
    } finally {
      isSendingRef.current = false;
    }
  };

  const handleRegenerate = async () => {
    if (gameState.isLoading || gameState.history.length === 0 || isSendingRef.current) return;
    isSendingRef.current = true;

    const history = [...gameState.history];
    let lastUserIdx = -1;
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].role === 'user') {
        lastUserIdx = i;
        break;
      }
    }

    if (lastUserIdx === -1) return; 

    const lastUserMsg = history[lastUserIdx];
    const contextHistory = history.slice(0, lastUserIdx);

    const restoredNpcProfiles = lastUserMsg.snapshot?.npcProfiles || gameState.npcProfiles;
        const restoredLogs = lastUserMsg.snapshot?.logs || gameState.logs;
    const restoredGaiaState = lastUserMsg.snapshot?.gaiaState || gameState.gaiaState;
    
    setGameState(prev => ({
      ...prev,
      
      npcProfiles: restoredNpcProfiles,
      logs: restoredLogs,
      gaiaState: restoredGaiaState,
      
      history: history.slice(0, lastUserIdx + 1),
      isLoading: true
    }));

    let aiMsgId = "";
    try {
      await initializeGame(contextHistory, currentModel, "");

      aiMsgId = Date.now().toString() + Math.random().toString(36).substring(2, 9);
      setGameState(prev => ({
        ...prev,
        history: [...prev.history, { id: aiMsgId, role: 'model', content: '【正在重新演算亚空间扰动与战损数据...】', isStreaming: true }]
      }));

      let messageToSend = lastUserMsg.content;
      if (gameState.character) {
        const statusPrompt = generateStatusPrompt(gameState.character, gameState.stageSettings, restoredNpcProfiles, gameState.difficulty, gameState.selectedStages, restoredLogs, restoredGaiaState);
        messageToSend = `${statusPrompt}\n\n${lastUserMsg.content}`;
        
        if (gameState.isTutorialEnabled) {
          const isChaos = calculateEffectivelyChaos(gameState.character);
          const whisperName = isChaos ? '【👁️ 亚空间低语】' : '【📖 帝皇秘语】';
          messageToSend += `\n\n**【💡 教学模式指令】**: 请在回复末尾添加${whisperName}。解释规则判断并给出指令建议。`;
        }
      }

      // Inject synthesizer for regeneration too
      const synthesisPluginContent = await synthesizeEntities(lastUserMsg.content || '常规互动', restoredLogs, restoredGaiaState, gameState.character);
      if (synthesisPluginContent) {
        messageToSend += synthesisPluginContent;
      }

      // Reset the placeholder before starting the stream
      setGameState(prev => {
        const newHistory = [...prev.history];
        const lastMsg = newHistory.find(m => m.id === aiMsgId);
        if (lastMsg) lastMsg.content = '';
        return { ...prev, history: newHistory };
      });

      const baselineDate = getLatestDateFromHistory(history.slice(0, lastUserIdx + 1)) || "";

      let lastUpdateTime = Date.now();
      const response = await executeAiCall(aiMsgId, () => sendMessage(messageToSend, (text) => {
        const now = Date.now();
        if (now - lastUpdateTime > 100) {
          setGameState(prev => {
            const newHistory = [...prev.history];
            const lastMsg = newHistory.find(m => m.id === aiMsgId);
            if (lastMsg) {
              lastMsg.content = text;
            }
            return { ...prev, history: newHistory };
          });
          lastUpdateTime = now;
        }
      }, gameState.character?.setting, getUnlockedTrueNames(), contextHistory, baselineDate, gameState.stageSettings), (count) => `[重新生成受阻 (429)，正在尝试第 ${count} 次自动重拨...]`);

      const { character, gaiaState, npcProfiles, addedXP, snapshot } = handleAiResponseUpdate(
        gameState.npcProfiles,
        gameState.logs,
        response.text,
        gameState.character,
        gameState.gaiaState
      );
      
      setGameState(prev => {
          const newHistory = [...prev.history];
          const lastMsg = newHistory.find(m => m.id === aiMsgId);
          if (lastMsg) {
             lastMsg.content = response.text; // Retain raw text in history for AI context
             lastMsg.groundingMetadata = response.groundingMetadata;
             lastMsg.isStreaming = false;
             lastMsg.snapshot = snapshot;
             lastMsg.xpChange = addedXP;
          }
          
          return { ...prev, history: newHistory, character, isLoading: false, gaiaState, npcProfiles };
        });

    } catch (error: any) {
      console.error("Regeneration failed", error);
      const errorMessage = error?.message || "Unknown error";
      if (aiMsgId) {
        try {
          setGameState(prev => {
            const newHistory = [...prev.history];
            const lastMsg = newHistory.find(m => m.id === aiMsgId);
            if (lastMsg) {
              lastMsg.content = `[重新生成失败。错误信息: ${errorMessage}。]`;
              lastMsg.isStreaming = false;
            }
            return { ...prev, history: newHistory };
          });
        } catch (stateError) {
          console.error("Failed to update state after regeneration error", stateError);
        }
      }
    } finally {
      isSendingRef.current = false;
      setGameState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleApplyCloudSave = () => {
    if (!pendingCloudSave) return;
    
    setGameState(prev => {
      const data = pendingCloudSave;
      const localData = loadGame();
      const persistentState: any = {
        status: data.status || prev.status,
        character: data.character || prev.character,
        npcProfiles: data.npcProfiles || prev.npcProfiles,
        stageSettings: data.stageSettings || localData?.stageSettings || prev.stageSettings,
        selectedStages: data.selectedStages || localData?.selectedStages || prev.selectedStages,
        difficulty: data.difficulty || prev.difficulty,
                gaiaState: data.gaiaState || prev.gaiaState,
        logs: data.logs || prev.logs || []
      };

      if (data.history && data.history.length > 0) {
        persistentState.history = data.history;
      } else if (localData && localData.history && localData.history.length > 0) {
        persistentState.history = localData.history;
      }

      return { ...prev, ...persistentState };
    });
    
    setPendingCloudSave(null);
    setRestoredNotification(true);
    setTimeout(() => setRestoredNotification(false), 3000);
  };

  const handleDeleteSaveClick = () => {
    setShowDeleteSaveConfirm(true);
  };

  const handleConfirmDeleteSave = async () => {
    try {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      if (localSaveTimeoutRef.current) clearTimeout(localSaveTimeoutRef.current);

      // 1. Cloud cleanup (if applicable)
      if (user) {
        try {
          const db = getFirestoreDb();
          if (db && !isFirestoreQuotaBlocked()) {
            const gameDocRef = doc(db, 'games', user.uid);
            await deleteDoc(gameDocRef);
          }
        } catch (e) {
          console.error("Cloud delete failed - potentially non-critical if local clearing works", e);
        }
      }
      
      // 2. Local cleanup (always)
      clearSave();
      setSaveExists(false);

      setGameState(prev => ({
        ...prev,
        history: [],
        npcProfiles: [],
        logs: [],
        systemState: undefined,
        gaiaState: undefined,
        stageSettings: undefined,
        status: GameStatus.START_MENU,
        character: null
      }));
      
      setShowDeleteSaveConfirm(false);
      console.log(`Archives purged successfully${user ? ` for user: ${user.uid}` : ''}`);
    } catch (error) {
      console.error("Critical failure during archive purge:", error);
      // Fallback: at least show start menu
      setGameState(prev => ({ ...prev, status: GameStatus.START_MENU }));
      setShowDeleteSaveConfirm(false);
    }
  };

  const cancelDeleteSave = () => {
    setShowDeleteSaveConfirm(false);
  };

  const handleLogout = async () => {
    const auth = getFirebaseAuth();
    try {
      if (auth) {
        await signOut(auth);
      }
      setUser(null);
      localStorage.removeItem('local_play_mode');
      setGameState(prev => ({
        ...prev,
        status: GameStatus.START_MENU,
        character: null,
        history: [],
        npcProfiles: [],
        logs: [],
        
        systemState: undefined,
        gaiaState: undefined,
        stageSettings: undefined
      }));
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getTheme = () => {
    if (!gameState.character) return 'bg-black'; 
    
    const s = gameState.character;
    return THEME_COLORS[s.unitType]?.bg || 'bg-slate-900';
  };

  // Extract alignment info
  const isEffectivelyChaos = calculateEffectivelyChaos(gameState.character);

  const getLexicon = () => {
    const char = gameState.character;
    if (!char) return ALIGNMENT_LEXICON.IMPERIAL;

    if (isEffectivelyChaos) {
      return ALIGNMENT_LEXICON.CHAOS;
    }
    const lineage = char.lineage || "";
    if (lineage.includes('泰伦') || lineage.includes('虫群')) {
      return ALIGNMENT_LEXICON.XENOS || ALIGNMENT_LEXICON.IMPERIAL;
    }
    return ALIGNMENT_LEXICON.IMPERIAL;
  };
  const lexicon = getLexicon();

  const handleRepairStats = () => {
    if (!gameState.character) return;
    
    // Warn the user before proceeding
    const confirmed = window.confirm("【警告】\n此功能将根据您的特长与技能，重新剥离出初始身体的纯净基础属性。\n\n仅当您的基础属性异常偏高（例如：战斗训练导致的+25点被永远锁死在了基础属性中）并且升级费用昂贵时使用！\n\n是否执行数据剥离与净化协议？");
    if (!confirmed) return;

    // We must mirror the calculation from CharacterCreation.tsx's extraModifiers
    // to find what the current trait/skill/blessing modifications are.
    const mods = { weaponSkill: 0, ballisticSkill: 0, strength: 0, toughness: 0, agility: 0, intelligence: 0, perception: 0, willpower: 0, fellowship: 0 };
    const char = gameState.character;
    
    // Skills
    char.skills?.forEach(skill => {
      const level = skill.level || 1;
      if (skill.name === '混沌赐福') {
        mods.strength += 5 * level; mods.toughness += 5 * level; mods.willpower += 5 * level;
      } else if (skill.name === '战斗训练') {
        mods.weaponSkill += 5 * level; mods.ballisticSkill += 5 * level;
      } else if (skill.name === '神圣狂热') {
        mods.willpower += 10 * level;
      } else if (skill.name === '帝皇禁卫') {
        mods.strength += 5 * level; mods.toughness += 5 * level; mods.weaponSkill += 5 * level;
      } else if (skill.name === '原铸改造') {
        mods.strength += 5 * level; mods.toughness += 5 * level; mods.agility += 5 * level;
      } else if (skill.name === '火线尖兵') {
        mods.ballisticSkill += 3 * level;
      } else if (skill.name === '智力提升手术') {
        mods.perception += 5 * level; mods.intelligence += 8 * level;
      } else if (skill.name === '生存本能') {
        mods.strength += 5 * level; mods.toughness += 10 * level;
      } else if (skill.name === '亚空间预见') {
        mods.perception += 10 * level;
      }
    });

    // Faith
    const faith = char.faithLevel || 0;
    if (faith >= 2) { mods.willpower += 5; }
    if (faith >= 3) { mods.strength += 5; mods.toughness += 5; }
    if (faith >= 4) { mods.weaponSkill += 5; mods.ballisticSkill += 5; mods.agility += 5; mods.intelligence += 5; mods.perception += 5; }
    if (faith >= 5) {
      mods.weaponSkill += 10; mods.ballisticSkill += 10; mods.strength += 10; mods.toughness += 10;
      mods.agility += 10; mods.intelligence += 10; mods.perception += 10; mods.willpower += 10; mods.fellowship += 10;
    }

    // Chaos
    const cbless = char.chaosBlessing;
    if (cbless === '恐虐之怒') { mods.weaponSkill += 20; mods.strength += 10; }
    else if (cbless === '欢愉之躯') { mods.agility += 15; }
    else if (cbless === '奇想妙思') { mods.intelligence += 20; }
    else if (cbless === '肉体再生') { mods.toughness += 10; }
    else if (cbless === '混沌眷顾') { mods.perception += 10; mods.willpower += 10; }
    else if (cbless === '混沌印记') { mods.strength += 5; mods.toughness += 5; mods.agility += 5; mods.intelligence += 5; }

    // Traits (extracted previously hardcoded traits)
    char.traits?.forEach(t => {
      const desc = t.effect || '';
      const regex = /(WS|BS|S|T|Ag|Int|Per|WP|Fel|武器技能|射击技能|力量|坚韧|敏捷|智力|感知|意志|意志力|社交|社交能力)([+-]\d+)/gi;
      let match;
      while ((match = regex.exec(desc)) !== null) {
        const label = match[1];
        const val = parseInt(match[2]);
        switch (label) {
          case '武器技能': case 'WS': mods.weaponSkill += val; break;
          case '射击技能': case '攻击技能': case 'BS': case '射击': mods.ballisticSkill += val; break;
          case '力量': case 'S': mods.strength += val; break;
          case '坚韧': case 'T': mods.toughness += val; break;
          case '敏捷': case 'Ag': mods.agility += val; break;
          case '智力': case 'Int': mods.intelligence += val; break;
          case '感知': case 'Per': mods.perception += val; break;
          case '意志': case '意志力': case 'WP': mods.willpower += val; break;
          case '社交': case '社交能力': case '交际': case 'Fel': mods.fellowship += val; break;
        }
      }
      
      if (t.name === '装甲植入' && !desc.includes('坚韧+10')) mods.toughness += 10;
      else if (t.name === '机械化·初级' && !desc.includes('力量+5')) mods.strength += 5;
      else if (t.name === '机械化·中级' && !desc.includes('坚韧+10')) { mods.strength += (desc.includes('力量+5') ? 0 : 5); mods.toughness += 10; }
      else if (t.name === '机械化·高级' && !desc.includes('力量+10')) { mods.strength += 10; mods.toughness += 10; }
    });

    const newAttrs = { ...char.attributes };
    let totalStripped = 0;
    (Object.keys(newAttrs) as (keyof typeof newAttrs)[]).forEach(k => {
      const stripped = Math.max(1, newAttrs[k] - mods[k]);
      totalStripped += (newAttrs[k] - stripped);
      newAttrs[k] = stripped;
    });

    if (totalStripped > 0) {
      setGameState(prev => ({ ...prev, character: { ...prev.character!, attributes: newAttrs } }));
      setIsGameMenuOpen(false);
      alert(`[净化成功]\n已从核心属性中剥离 ${totalStripped} 点外在增幅。您的升级面板与属性呈现已恢复为纯净状态。`);
    } else {
      alert("没有检测到需要剥离的增益。您的属性并未异常叠加。");
    }
  };

  return (
    <div className={`h-screen h-[100dvh] w-full flex flex-col transition-colors duration-1000 ${getTheme()} text-slate-200 font-mono overflow-hidden`}>
      
      {!isAuthReady ? (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-red-900/20 border-t-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.3)]"
          />
        </div>
      ) : !user ? (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 imperial-terminal">
          <div className="max-w-md w-full mech-panel hardcore-border p-10 space-y-10 animate-in fade-in zoom-in duration-500 relative z-10">
            <div className="absolute inset-0 hazard-stripes opacity-5 pointer-events-none" />
            
            <div className="w-24 h-24 bg-imperial-red/20 rounded-full flex items-center justify-center mx-auto border border-imperial-red/50 shadow-[0_0_40px_rgba(139,0,0,0.3)] relative">
              <Skull className="text-imperial-red w-12 h-12" />
              <div className="absolute inset-0 rounded-full animate-pulse bg-imperial-red/10" />
            </div>

            <div className="space-y-3 text-center">
              <h1 className="text-4xl font-mono text-imperial-gold tracking-tight uppercase glow-red leading-tight">无尽战火</h1>
              <p className="text-imperial-red/80 text-[10px] uppercase tracking-[0.4em] font-bold font-mono italic">帝国远征终端 · 第41个千年</p>
            </div>

            <div className="p-4 bg-black/40 border border-zinc-900 italic relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-imperial-red/50" />
              <p className="text-zinc-500 text-xs leading-relaxed font-mono">
                “焚烧异端，屠杀突变，洗净不洁。星辰之间，唯有战争。”
              </p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleGoogleLogin}
                className="w-full bg-imperial-red hover:bg-red-800 text-white py-4 flex items-center justify-center gap-3 transition-all font-mono tracking-widest uppercase border border-red-700 shadow-[0_0_20px_rgba(139,0,0,0.4)] active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity" />
                <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                <span>建立灵魂链接 (Log-in)</span>
              </button>

              <button 
                onClick={handleGuestLogin}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-imperial-gold py-4 flex items-center justify-center gap-3 transition-all font-mono tracking-widest uppercase border border-zinc-800 shadow-[0_0_15px_rgba(0,0,0,0.5)] active:scale-95 group relative"
              >
                <span>本地离线推演 (Play Offline)</span>
              </button>
            </div>

            <div className="pt-6 border-t border-zinc-900 flex justify-between items-center text-[9px] text-zinc-600 uppercase tracking-widest font-mono">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-900 rounded-full animate-pulse" /> Vox Connection</span>
              <span>Encrypted</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Header 
            character={gameState.character}
            user={user}
            difficulty={gameState.difficulty}
            previewAlignment={previewAlignment}
            onOpenCharacterSheet={() => setGameState(prev => ({ ...prev, isCharacterSheetOpen: true }))}
            onOpenCompendium={() => setGameState(prev => ({ ...prev, isCompendiumOpen: true }))}
            onOpenLogModal={handleOpenLogModal}
            onOpenWorldBook={() => setIsWorldBookOpen(true)}
            onOpenStageSetup={gameState.status !== GameStatus.CREATION ? () => setGameState(prev => ({ ...prev, status: GameStatus.STAGE_SETUP })) : undefined}
            onExport={handleExport}
            onOpenGameMenu={gameState.status === GameStatus.PLAYING ? () => setIsGameMenuOpen(true) : undefined}
            onLogout={handleLogout}
            onReturnToStart={handleReturnToStart}
            isEditMode={isEditMode}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
            isSyncMode={isSyncMode}
            onToggleSyncMode={handleToggleSyncMode}
            isCloudSyncEnabled={isCloudSyncEnabled}
            onToggleCloudSync={() => {
              const newValue = !isCloudSyncEnabled;
              setIsCloudSyncEnabled(newValue);
              localStorage.setItem('isCloudSyncEnabled', String(newValue));
            }}
            onOpenUpgrade={() => setIsUpgradeModalOpen(true)}
          />

          {isFirestoreQuotaBlocked() && (
            <div className="bg-red-950/60 border-b border-red-500/30 p-2 flex items-center justify-center px-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <AlertCircle size={16} className="text-red-500" />
                <span className="text-[10px] text-red-200 uppercase tracking-widest font-bold">
                  云端同步配额已耗尽 (Cloud Sync Quota Exceeded) - 24小时内将仅使用本地保存
                </span>
              </div>
            </div>
          )}

          {isCloudSyncEnabled && pendingCloudSave && (
            <div className="bg-amber-900/40 border-b border-amber-500/30 p-2 flex items-center justify-between px-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Sparkles size={16} className="text-amber-400 animate-pulse" />
                <span className="text-xs text-amber-200 uppercase tracking-widest font-bold">
                  检测到云端存档 (Cloud Save Found)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setPendingCloudSave(null)}
                  className="text-[10px] text-neutral-500 hover:text-neutral-300 uppercase tracking-widest transition-colors"
                >
                  忽略 (Ignore)
                </button>
                <button 
                  onClick={handleApplyCloudSave}
                  className="bg-amber-600 hover:bg-amber-500 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold transition-all active:scale-95"
                >
                  同步 (Sync)
                </button>
              </div>
            </div>
          )}

          {/* CONTENT AREA */}
          <main className={`flex-1 flex flex-col relative w-full border-x border-zinc-900/50 bg-mechanicus-gray/30 ${isEffectivelyChaos ? 'chaos-terminal' : 'imperial-terminal'}`}>
            <div className="absolute inset-0 pointer-events-none hazard-stripes opacity-[0.02] z-0" />
        
        {/* START SCREEN */}
        {gameState.status === GameStatus.START_MENU && (
          <StartScreen 
            saveExists={saveExists}
            savedDifficulty={savedDifficulty}
            onContinue={handleContinueGame}
            onNewGame={handleStartNewGame}
            onImport={handleImportGame}
            onDeleteSave={handleDeleteSaveClick}
            isCloudSyncEnabled={isCloudSyncEnabled}
            onToggleCloudSync={() => {
              const newValue = !isCloudSyncEnabled;
              setIsCloudSyncEnabled(newValue);
              localStorage.setItem('isCloudSyncEnabled', String(newValue));
            }}
            isAuthReady={isAuthReady}
            currentModel={currentModel}
            onModelChange={setCurrentModel}
            onOpenApiSettings={() => setIsApiSettingsOpen(true)}
          />
        )}

        {/* DELETE SAVE CONFIRMATION MODAL */}
        {showDeleteSaveConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/95 backdrop-blur-xl" onClick={cancelDeleteSave} />
            <div className="relative w-full max-w-md bg-zinc-950 border border-red-900/40 p-1 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
              {/* Decorative Borders */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-900/50" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-900/50" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-900/50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-900/50" />
              
              <div className="w-full bg-zinc-900/30 p-8 border border-zinc-900 space-y-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-red-600/5 animate-pulse rounded-full" />
                    <Skull className="w-10 h-10 text-red-700 drop-shadow-[0_0_10px_rgba(185,28,28,0.5)]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-red-600 tracking-[0.3em] uppercase italic">EXTERMINATUS</h3>
                    <div className="flex items-center justify-center gap-2">
                       <div className="h-px w-8 bg-red-900/30" />
                       <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">审判庭权限核准</span>
                       <div className="h-px w-8 bg-red-900/30" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-950/10 border-x border-red-900/20 relative overflow-hidden">
                  <div className="absolute inset-0 hazard-stripes opacity-5" />
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-mono relative z-10">
                    确认执行数据彻底清除协议？<br/>
                    <span className="text-red-500/80 mt-2 block font-bold uppercase">
                      警告：云端存档与本地数据板将永久损毁，不可逆转。
                    </span>
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <button 
                    onClick={() => handleConfirmDeleteSave()}
                    className="w-full group relative flex flex-col items-center justify-center py-4 bg-red-900/20 border border-red-900/50 hover:bg-red-900/40 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 hazard-stripes opacity-10" />
                    <span className="relative z-10 text-lg font-black text-red-500 tracking-widest uppercase">核准抹除 (Confirm)</span>
                    <span className="relative z-10 text-[8px] text-red-900 font-mono">PURGE_DATAVULT_M41</span>
                  </button>
                  
                  <button 
                    onClick={cancelDeleteSave}
                    className="w-full flex items-center justify-center py-3 text-zinc-600 hover:text-zinc-300 font-mono text-xs uppercase tracking-widest transition-colors"
                  >
                    [ 取消部署 / Abort ]
                  </button>
                </div>

                <div className="pt-4 border-t border-zinc-900/50 flex justify-between items-center text-[8px] font-mono text-zinc-700 uppercase">
                  <span>ID: INQ-742-ALPHA</span>
                  <span>STATUS: WAITING_AUTH</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NEW GAME CONFIRMATION MODAL */}
        {showNewGameConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/95 backdrop-blur-xl" onClick={cancelStartNewGame} />
            <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-900/50 p-1 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-zinc-700" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-zinc-700" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-zinc-700" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-zinc-700" />

              <div className="w-full bg-zinc-900/10 p-8 border border-zinc-900/50 space-y-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center border border-sky-900/30 bg-sky-900/10">
                    <History className="w-6 h-6 text-sky-700" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100 tracking-[0.2em] uppercase">档案覆盖警示</h3>
                  <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Timeline Conflict Detected</div>
                </div>

                <div className="p-4 bg-zinc-900/40 border border-zinc-800/50">
                  <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                    检测到已存留的战史档案。开启新的推演协议将导致当前时间轴数据被重置。<br/>
                    <span className="text-sky-500/60 mt-2 block font-bold">
                      确认开启新的作战序列？
                    </span>
                  </p>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => confirmStartNewGame()}
                    className="w-full py-4 bg-sky-900/20 border border-sky-900/50 hover:bg-sky-900/30 transition-all group"
                  >
                    <span className="text-sm font-black text-sky-500 tracking-widest uppercase group-hover:text-sky-400 transition-colors">确认重塑 (Deploy New Sequence)</span>
                  </button>
                  <button 
                    onClick={cancelStartNewGame}
                    className="w-full py-2 text-[10px] text-zinc-600 hover:text-zinc-400 font-mono uppercase tracking-widest transition-colors"
                  >
                    [ 返回当前档案 / Abort ]
                  </button>
                </div>

                <div className="flex justify-center">
                   <div className="text-[8px] text-zinc-800 font-mono uppercase">COG_SYNC_READY // L_7.0</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CREATION SCREEN */}
        {gameState.status === GameStatus.CREATION && (
          <div className="flex-1 flex flex-col h-full overflow-y-auto">
            <CharacterCreation 
              onComplete={handleCharacterComplete} 
              onAlignmentChange={(alignment) => setPreviewAlignment(alignment)}
            />
          </div>
        )}

        {/* STAGE SETUP SCREEN */}
        {gameState.status === GameStatus.STAGE_SETUP && gameState.character && (
          <div className="flex-1 flex flex-col h-full overflow-y-auto">
            <StageSetup 
              character={gameState.character} 
              selectedStages={gameState.selectedStages || []}
              hasHistory={gameState.history.length > 0}
              currentSettings={gameState.stageSettings}
              onComplete={(settings, stages) => handleStageSetupComplete(settings, undefined, stages)} 
              onCancel={() => {
                if (gameState.character) {
                  setGameState(prev => ({ ...prev, status: GameStatus.PLAYING }));
                } else {
                  handleReturnToStart();
                }
              }}
            />
          </div>
        )}

        {/* GAME PLAY SCREEN */}
        {gameState.status === GameStatus.PLAYING && gameState.character && (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            <GameMenu 
              isOpen={isGameMenuOpen}
              onClose={() => setIsGameMenuOpen(false)}
              initialSettings={gameState.stageSettings || ''}
              onSettingsChange={(newSettings) => setGameState(prev => ({ ...prev, stageSettings: newSettings }))}
              onForceDeduce={handleForceDeduce}
              onExit={handleReturnToStart}
              onRepairStats={handleRepairStats}
            />

            {/* Tabs */}
            <div className="flex gap-1 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md relative z-10 overflow-x-auto px-4">
              <button 
                onClick={() => setActiveTab('chat')}
                className={`text-[10px] font-mono transition-all flex items-center gap-2 px-6 py-3 border-x border-zinc-900 relative group uppercase tracking-widest ${
                  activeTab === 'chat' ? 'text-imperial-gold bg-imperial-red/5' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <MessageSquare size={14} className={activeTab === 'chat' ? 'text-imperial-gold' : ''} />
                <span>{lexicon.chatTab}</span>
                {activeTab === 'chat' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-imperial-red shadow-[0_0_10px_rgba(139,0,0,0.5)]" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`text-[10px] font-mono transition-all flex items-center gap-2 px-6 py-3 border-r border-zinc-900 relative group uppercase tracking-widest ${
                  activeTab === 'history' ? 'text-imperial-gold bg-imperial-red/5' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <History size={14} className={activeTab === 'history' ? 'text-imperial-gold' : ''} />
                <span>{lexicon.historyTab}</span>
                {activeTab === 'history' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-imperial-red shadow-[0_0_10px_rgba(139,0,0,0.5)]" />
                )}
              </button>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden relative">
              {activeTab === 'chat' ? (
                <StoryDisplay 
                  messages={gameState.history} 
                  character={gameState.character} 
                  isTyping={gameState.isLoading}
                  onUpdateMessage={handleUpdateMessage}
                  onDeleteMessage={handleDeleteMessage}
                  selectedMessageIds={selectedMessageIds}
                  onToggleMessageSelection={handleToggleMessageSelection}
                  isEditMode={isEditMode}
                  isSyncMode={isSyncMode || isCompendiumSyncMode || isLogSyncMode}
                  
                />
              ) : (
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-neutral-950/50">


                  <section className="space-y-4">
                    <h3 className="text-sm font-mono font-bold text-imperial-gold flex items-center gap-2 uppercase tracking-widest">
                      <Users className="text-imperial-red" size={16} />
                      重点人员档案 [PERSONNEL]
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {gameState.npcProfiles?.map(npc => (
                        <div key={npc.id} className="bg-zinc-950/60 border border-zinc-900 p-4 hardcore-border space-y-2 group hover:border-imperial-red/30 transition-colors">
                          <div className="flex justify-between items-start border-b border-zinc-900 pb-2">
                            <h4 className="font-mono text-xs font-bold text-imperial-gold uppercase tracking-wider">{npc.name}</h4>
                            <div className="w-2 h-2 bg-imperial-red/20 rounded-full" />
                          </div>
                          <p className="text-[11px] text-zinc-500 leading-relaxed font-mono line-clamp-3 group-hover:text-zinc-300 transition-colors">{npc.userNotes || npc.aiGeneratedRecord}</p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {npc.tags?.map(tag => (
                              <span key={tag} className="text-[9px] bg-imperial-red/5 border border-imperial-red/10 px-2 py-0.5 text-imperial-red/80 font-mono">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                      {gameState.npcProfiles.length === 0 && (
                        <p className="text-zinc-600 text-[10px] font-mono italic">未检测到已知人员数据...</p>
                      )}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <History className="text-amber-500" size={20} />
                      历史事件 (Chronicle)
                    </h3>
                    <div className="space-y-4">
                      {gameState.history.filter(m => m.role === 'model').slice(-10).map((m, i) => (
                        <div key={i} className="relative pl-6 border-l border-white/10">
                          <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                          <p className="text-sm text-neutral-400 line-clamp-2 italic">"{m.content.substring(0, 150)}..."</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>

            {/* Auto-restored notification */}
            {restoredNotification && (
              <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-900/90 border border-amber-500/50 p-3 rounded-none shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 backdrop-blur-md">
                <div className="text-amber-200 font-mono text-xs uppercase tracking-widest">
                  检测到未完成的志业，已自动恢复 (Session Restored)
                </div>
                <button onClick={() => setRestoredNotification(false)} className="text-amber-500 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* API Key Warning */}
            {apiKeyWarning && (
              <div className="fixed top-32 left-1/2 -translate-x-1/2 z-50 bg-red-900/90 border border-red-500/50 p-3 rounded-none shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 backdrop-blur-md">
                <div className="text-red-200 font-mono text-xs uppercase tracking-widest">
                  警告：未检测到 API Key。请在设置中配置 GEMINI_API_KEY。
                </div>
                <button onClick={() => setApiKeyWarning(false)} className="text-red-500 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Compendium Sync Confirmation Bar */}
            {isCompendiumSyncMode && (
              <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 border border-cyan-500/50 p-4 rounded-none shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-4 backdrop-blur-md">
                <div className="text-cyan-400 font-mono text-sm">
                  已选择 {selectedMessageIds.size} 条记录用于同步 NPC 信息
                </div>
                <Button onClick={handleConfirmCompendiumSync} className="bg-cyan-700 hover:bg-cyan-600 text-white text-xs">
                  确认同步 (Confirm)
                </Button>
                <Button onClick={handleCancelCompendiumSync} variant="ghost" className="text-slate-400 hover:text-white text-xs">
                  取消 (Cancel)
                </Button>
              </div>
            )}

            {/* Log Sync Confirmation Bar */}
            {isLogSyncMode && (
              <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 border border-emerald-500/50 p-4 rounded-none shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-4 backdrop-blur-md">
                <div className="text-emerald-400 font-mono text-sm">
                  已选择 {selectedMessageIds.size} 条记录用于生成日志
                </div>
                <Button 
                  onClick={handleConfirmLogSync} 
                  disabled={gameState.isLoading}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs disabled:opacity-50"
                >
                  {gameState.isLoading ? '生成中...' : '生成日志 (Generate Log)'}
                </Button>
                <Button onClick={handleCancelLogSync} variant="ghost" className="text-slate-400 hover:text-white text-xs">
                  取消 (Cancel)
                </Button>
              </div>
            )}

            <InputArea 
              input={input}
              setInput={setInput}
              isLoading={gameState.isLoading}
              currentModel={currentModel}
              customModelName={customModelName}
              onModelChange={handleModelChange}
              onOpenApiSettings={() => setIsApiSettingsOpen(true)}
              onSendMessage={handleSendMessage}
              onRegenerate={handleRegenerate}
              onResetOpening={handleResetOpening}
              onDeduce={handleDeducePlot}
              selectedMessageCount={selectedMessageIds.size}
              showRegenerate={gameState.history.some(m => m.role === 'user')}
              showResetOpening={gameState.history.length <= 2}
              hasHistory={gameState.history.length > 0}
              hideDeduceButton={isCompendiumSyncMode || isLogSyncMode || isSyncMode}
            />
          </div>
        )}
      </main>

      <TutorialSystem 
        gameState={gameState} 
        updateGameState={setGameState} 
        previewAlignment={previewAlignment}
      />

      <ApiSettingsModal 
        isOpen={isApiSettingsOpen} 
        onClose={() => setIsApiSettingsOpen(false)} 
        onSave={(model) => {
          setCustomModelName(localStorage.getItem('thirdPartyModelName') || '');
          handleModelChange(model);
        }} 
      />

      {/* Character Sheet Modal */}
      {gameState.isCharacterSheetOpen && gameState.character && (
        <CharacterSheet 
          character={gameState.character}
          npcProfiles={gameState.npcProfiles || []}
          onClose={() => setGameState(prev => ({ ...prev, isCharacterSheetOpen: false }))} 
          onUpdate={handleUpdateCharacter}
        />
      )}

      {/* Character Compendium Modal */}
      {gameState.isCompendiumOpen && (
        <CharacterCompendium
          profiles={gameState.npcProfiles || []}
          playerName={gameState.character?.name}
          onClose={() => setGameState(prev => ({ ...prev, isCompendiumOpen: false }))}
          onAddNPC={handleAddNPC}
          onUpdateNPC={handleUpdateNPC}
          onSyncNPC={handleSyncNPC}
          onDeleteNPC={handleDeleteNPC}
          onMergeNPCs={handleMergeNPCs}
          onMoveNPC={handleMoveNPC}
          onBatchInferAppearances={handleBatchInferAppearances}
          onFormatRecords={handleFormatNPCRecords}
        />
      )}

      {/* World Book Manager Modal */}
      {gameState.isLogModalOpen && (
        <LogModal
          logs={gameState.logs || []}
          npcProfiles={gameState.npcProfiles || []}
          character={gameState.character!}
          onClose={() => setGameState(prev => ({ ...prev, isLogModalOpen: false }))}
          onSyncLog={handleSyncLog}
          onAddLog={handleAddLog}
          onSyncNPC={handleSyncNPC}
          onUpdateLog={(updatedLog) => {
            setGameState(prev => ({
              ...prev,
              logs: safeArray(prev.logs).map(l => l.id === updatedLog.id ? updatedLog : l)
            }));
          }}
          onDeleteLog={(logId) => {
            setGameState(prev => ({
              ...prev,
              logs: safeArray(prev.logs).filter(l => l.id !== logId)
            }));
          }}
        />
      )}

      {isWorldBookOpen && (
        <WorldBookManager
          isOpen={isWorldBookOpen}
          onClose={() => setIsWorldBookOpen(false)}
          selectedStages={gameState.selectedStages || []}
          onToggleStage={toggleStage}
          character={gameState.character!}
          onUpdateBriefing={(text) => {
            setGameState(prev => ({ ...prev, stageSettings: text }));
          }}
        />
      )}

      {isUpgradeModalOpen && (
        <UpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          character={gameState.character!}
          isSafeZone={(() => {
            if (!gameState.character) return false;
            const status = gameState.character.currentStatus || '';
            const territory = gameState.character.territory || '';
            
            // Keywords that indicate combat or active mission
            const isCombat = status.includes('交战') || status.includes('冲突') || status.includes('战斗') || 
                            status.includes('任务') || status.includes('探险') || status.includes('渗透');
            
            // Keywords that indicate a safe zone
            const isSafePlace = territory.includes('基地') || territory.includes('驻地') || territory.includes('舰船') || 
                               territory.includes('安全区') || territory.includes('要塞') || territory.includes('修道院') ||
                               territory.includes('军营') || territory.includes('指挥所');
            
            return !isCombat && isSafePlace;
          })()}
          onUpgrade={handleConfirmUpgrade}
        />
      )}

      {/* Conflict Resolution UI - Removed from UI */}
      {false && pendingCloudSave && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] backdrop-blur-sm">
          <div className="bg-white p-8 rounded-none shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-mono text-slate-900 mb-2">检测到存档冲突</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              发现云端存档与本地存档不一致。这通常是因为您在其他设备上进行了游戏。请选择保留哪一份：
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => setPendingCloudSave(null)} 
                className="py-6 bg-orange-600 hover:bg-orange-500 text-white border-none shadow-lg shadow-orange-900/20"
              >
                保留本地存档
              </Button>
              <Button 
                onClick={() => {
                  if (pendingCloudSave) {
                    // Preserve local history if cloud save doesn't have it (due to 1MB limit mitigation)
                    const localData = loadGame();
                    const historyToRestore = (pendingCloudSave.history && pendingCloudSave.history.length > 0) 
                      ? pendingCloudSave.history 
                      : (localData?.history || gameState.history);
                      
                    restoreGameSession(pendingCloudSave.character!, historyToRestore, pendingCloudSave.npcProfiles || [], pendingCloudSave.stageSettings, pendingCloudSave.status, pendingCloudSave.difficulty, pendingCloudSave.selectedStages, pendingCloudSave.logs || [], pendingCloudSave.gaiaState);
                    setPendingCloudSave(null);
                  }
                }} 
                className="py-6 bg-indigo-600 hover:bg-indigo-500 text-white border-none shadow-lg shadow-indigo-900/20"
              >
                使用云端存档
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )}
</div>
  );
};

export default () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

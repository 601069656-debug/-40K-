import { doc, setDoc, getDoc, getDocs, collection, query, orderBy, serverTimestamp, writeBatch, limit } from 'firebase/firestore';
import { getFirestoreDb, handleFirestoreError, OperationType } from '../firebase';
import { GameState, Message, NPCProfile, LogSummary, GameStatus, Character, GaiaState } from '../types';

export async function saveGameStateToCloud(userId: string, gameState: GameState) {
  if (!userId) return;
  const db = getFirestoreDb();
  if (!db) return;

  try {
    const gameDocRef = doc(db, 'games', userId);
    
    // 1. Save main state (without heavy collections)
    const rootState = {
      status: gameState.status,
      character: gameState.character || null,
      difficulty: gameState.difficulty,
      stageSettings: gameState.stageSettings || null,
      selectedStages: gameState.selectedStages || [],
      
      gaiaState: gameState.gaiaState || null,
      
      sessionId: (gameState as any).sessionId || null,
      lastUpdated: serverTimestamp(),
    };

    try {
      await setDoc(gameDocRef, rootState, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `games/${userId}`);
      throw error;
    }

    // 2. Save NPCs (only if they exist)
    if (gameState.npcProfiles && gameState.npcProfiles.length > 0) {
      const npcBatch = writeBatch(db);
      gameState.npcProfiles.forEach(npc => {
        const npcRef = doc(db, `games/${userId}/npcs`, npc.id);
        npcBatch.set(npcRef, {
          ...npc,
          lastUpdated: serverTimestamp()
        });
      });
      try {
        await npcBatch.commit();
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `games/${userId}/npcs`);
        throw error;
      }
    }

    // 3. Save Logs (only if they exist)
    if (gameState.logs && gameState.logs.length > 0) {
      const logBatch = writeBatch(db);
      gameState.logs.forEach(log => {
        const logRef = doc(db, `games/${userId}/logs`, log.id);
        logBatch.set(logRef, log);
      });
      try {
        await logBatch.commit();
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `games/${userId}/logs`);
        throw error;
      }
    }

    // 4. Save History
    const historyToSave = gameState.history.slice(-50);
    if (historyToSave.length > 0) {
      const historyBatch = writeBatch(db);
      historyToSave.forEach((msg, idx) => {
         // Keep snapshot ONLY for the very last message in the history to allow one-step rollback after cloud restore
         let cleanMsg: any;
         if (idx === historyToSave.length - 1) {
            const { groundingMetadata, isStreaming, ...rest } = msg as any;
            cleanMsg = rest;
         } else {
            const { snapshot, groundingMetadata, isStreaming, ...rest } = msg as any;
            cleanMsg = rest;
         }
         
         const msgRef = doc(db, `games/${userId}/history`, msg.id);
         historyBatch.set(msgRef, cleanMsg);
      });
      try {
        await historyBatch.commit();
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `games/${userId}/history`);
        throw error;
      }
    }

  } catch (error) {
    if (error instanceof Error && error.message.includes('{')) {
      // Already handled and stringified JSON error
      throw error;
    }
    handleFirestoreError(error, OperationType.WRITE, `games/${userId}`);
    throw error;
  }
}

export async function deleteNPCFromCloud(userId: string, npcId: string) {
  if (!userId || !npcId) return;
  const db = getFirestoreDb();
  if (!db) return;

  try {
    const npcRef = doc(db, `games/${userId}/npcs`, npcId);
    await setDoc(npcRef, { _deleted: true, lastUpdated: serverTimestamp() }, { merge: true });
    // Or actually delete it: 
    // await deleteDoc(npcRef);
    // Prefer actual deletion for clean storage
    const { deleteDoc } = await import('firebase/firestore');
    await deleteDoc(npcRef);
    console.log(`[Cloud] NPC ${npcId} deleted successfully.`);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `games/${userId}/npcs/${npcId}`);
  }
}

export async function loadGameStateFromCloud(userId: string): Promise<Partial<GameState> | null> {
  if (!userId) return null;
  const db = getFirestoreDb();
  if (!db) return null;

  try {
    const gameDocRef = doc(db, 'games', userId);
    let docSnap;
    try {
      docSnap = await getDoc(gameDocRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `games/${userId}`);
      return null;
    }

    if (!docSnap || !docSnap.exists()) return null;

    const rootData = docSnap.data();

    // Fetch subcollections
    let npcProfiles: NPCProfile[] = [];
    try {
      const npcsSnap = await getDocs(collection(db, `games/${userId}/npcs`));
      npcProfiles = npcsSnap.docs.map(d => d.data() as NPCProfile);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `games/${userId}/npcs`);
    }

    let logs: LogSummary[] = [];
    try {
      const logsSnap = await getDocs(query(collection(db, `games/${userId}/logs`), orderBy('timestamp', 'asc')));
      logs = logsSnap.docs.map(d => {
        const data = d.data() as LogSummary;
        return {
          ...data,
          title: typeof data.title === 'string' ? data.title : "战事记录",
          date: typeof data.date === 'string' ? data.date : "未知日期",
          summary: typeof data.summary === 'string' ? data.summary : "",
          keywords: Array.isArray(data.keywords) ? data.keywords.map(k => String(k)) : []
        };
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `games/${userId}/logs`);
    }

    let history: Message[] = [];
    try {
      const historySnap = await getDocs(query(collection(db, `games/${userId}/history`), orderBy('id', 'asc')));
      history = historySnap.docs.map(d => d.data() as Message);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `games/${userId}/history`);
    }

    return {
      ...rootData,
      npcProfiles,
      logs,
      history,
    } as Partial<GameState>;

  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `games/${userId}`);
    return null;
  }
}



import { Character, GaiaState, NPCProfile, LogSummary, Message } from '../types';
import { extractCharacterUpdate, extractGaiaState, extractNPCUpdates, applyNPCUpdates, extractLogUpdates } from './parserService';

export const calculateEffectivelyChaos = (character: Character | null): boolean => {
  if (!character) return false;
  const alignment = character.alignment || '';
  const lineage = character.lineage || '';
  const corruption = character.corruptionValue || 0;

  const isOriginallyChaos = alignment.includes('混沌') || lineage.includes('混沌') || lineage.includes('变节') || lineage.includes('恐虐') || lineage.includes('奸奇') || lineage.includes('纳垢') || lineage.includes('色孽');
  
  if (corruption >= 100) return true;
  if (isOriginallyChaos && corruption < 60 && !lineage.includes('恐虐') && !lineage.includes('奸奇') && !lineage.includes('纳垢') && !lineage.includes('色孽') && !lineage.includes('大魔') && !lineage.includes('恶魔原体')) {
    return false;
  }
  return isOriginallyChaos;
};

export const handleAiResponseUpdate = (
  prevProfiles: NPCProfile[],
  prevLogs: LogSummary[],
  responseText: string,
  currentCharacter: Character | null,
  currentGaiaState?: GaiaState,
  aiMsgId?: string,
  groundingMetadata?: any,
  xpChange?: number
) => {
  const updateResult = extractCharacterUpdate(responseText, currentCharacter);
  const newCharacter = updateResult.character;
  const newGaiaState = extractGaiaState(responseText, currentGaiaState);
  const npcUpdates = extractNPCUpdates(responseText);
  const nextLogs = extractLogUpdates(responseText, prevLogs);
  
  let nextProfiles = applyNPCUpdates(prevProfiles, npcUpdates, nextLogs);
  
  // Sync historical-system profile
  if (newGaiaState) {
    nextProfiles = nextProfiles.map(p => {
      if (p.id === 'historical-system') {
        const planetInfo = Object.values(newGaiaState.planets || {})
          .map(planet => `[${planet.name}] 声望:${planet.metrics.reputation} 防务:${planet.metrics.defense} 动乱:${planet.metrics.unrest} 资源:${planet.metrics.resources}`)
          .join('\n');
        
        return {
          ...p,
          aiGeneratedRecord: newGaiaState.lastSummary || p.aiGeneratedRecord,
          hiddenNotes: planetInfo || p.hiddenNotes,
          lastUpdated: Date.now()
        };
      }
      return p;
    });
  }

  const snapshot = {
    character: newCharacter || undefined,
    gaiaState: newGaiaState,
    npcProfiles: nextProfiles,
    logs: nextLogs
  };

  return {
    character: newCharacter,
    gaiaState: newGaiaState,
    npcProfiles: nextProfiles,
    logs: nextLogs,
    addedXP: updateResult.xpChange || 0,
    snapshot
  };
};

export const calculateRollbackState = (
  history: Message[],
  msgToDeleteId: string,
  currentCharacter: Character | null,
  currentGaiaState?: GaiaState
) => {
  const msgToDelete = history.find(m => m.id === msgToDeleteId);
  const newHistory = history.filter(msg => msg.id !== msgToDeleteId);
  
  let nextChar = currentCharacter;
  let nextGaiaState = currentGaiaState;

  const lastMsgWithSnapshot = [...newHistory].reverse().find(m => m.snapshot);
  
  if (lastMsgWithSnapshot && lastMsgWithSnapshot.snapshot) {
    if (lastMsgWithSnapshot.snapshot.character) {
      nextChar = lastMsgWithSnapshot.snapshot.character;
    }
    if (lastMsgWithSnapshot.snapshot.gaiaState) {
      nextGaiaState = lastMsgWithSnapshot.snapshot.gaiaState;
    }
  }

  if (msgToDelete && nextChar && !lastMsgWithSnapshot?.snapshot?.character) {
    nextChar = { 
      ...nextChar,
      attributes: { ...nextChar.attributes },
      skills: nextChar.skills.map(s => ({ ...s }))
    };
    
    if (msgToDelete.upgradeRefund) {
      const rf = msgToDelete.upgradeRefund;
      nextChar.experience += rf.xp;
      Object.keys(rf.attributes).forEach(attr => {
        const key = attr as keyof Character['attributes'];
        if (nextChar && nextChar.attributes[key] !== undefined) {
          nextChar.attributes[key] -= rf.attributes[attr];
        }
      });
      Object.keys(rf.skills).forEach(skill => {
        const s = nextChar!.skills.find(x => x.name === skill);
        if (s) {
          s.level -= rf.skills[skill];
          if (s.level <= 0) {
            nextChar!.skills = nextChar!.skills.filter(x => x.name !== skill);
          }
        }
      });
    }
    
    if (msgToDelete.xpChange) {
      nextChar.experience -= msgToDelete.xpChange;
    }
  }

  return {
    nextChar,
    nextGaiaState,
    newHistory
  };
};

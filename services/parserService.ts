
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Character, GaiaState, NPCProfile, UnitType, VehicleClass, HistoricalPeriod, LogSummary, Message } from '../types';
import { AlertCircle } from 'lucide-react';

// Utility Helpers
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const isRetryableError = (error: any): boolean => {
  if (!error) return false;
  const message = error.message || String(error);
  // Check for 429 (Too Many Requests), 503 (Service Unavailable), or network timeouts
  return message.includes('429') || 
         message.includes('503') || 
         message.includes('Too Many Requests') || 
         message.includes('fetch failed') ||
         message.includes('network error');
};

// Date Comparison Helper
export const compareDates = (dateA: string, dateB: string): number => {
  if (!dateA && !dateB) return 0;
  if (!dateA) return -1;
  if (!dateB) return 1;

  const parse = (d: string) => {
    // Standard M41 format: [M41.999] or [41st Millennium, Year 999]
    const mMatch = d.match(/M(\d+)\.(\d+)/i);
    let millennium = 41;
    let year = 999;
    
    if (mMatch) {
      millennium = parseInt(mMatch[1]);
      year = parseInt(mMatch[2]);
    } else {
      const altMatch = d.match(/(\d+)(?:st|nd|rd|th)\s+Millennium.*Year\s+(\d+)/i);
      if (altMatch) {
        millennium = parseInt(altMatch[1]);
        year = parseInt(altMatch[2]);
      }
    }

    // Day extraction: 第X天
    const dayMatch = d.match(/第\s*(\d+)\s*天/i);
    const day = dayMatch ? parseInt(dayMatch[1]) : 0;

    return millennium * 100000000 + year * 100000 + day;
  };
  return parse(dateA) - parse(dateB);
};

export const findBalancedBraces = (text: string): string[] => {
  const results: string[] = [];
  let braceCount = 0;
  let startIndex = -1;
  let inString = false;
  let escape = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (escape) {
      escape = false;
      continue;
    }
    
    if (char === '\\') {
      escape = true;
      continue;
    }
    
    if (char === '"') {
      inString = !inString;
      continue;
    }
    
    if (!inString) {
      if (char === '{') {
        if (braceCount === 0) startIndex = i;
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0 && startIndex !== -1) {
          results.push(text.substring(startIndex, i + 1));
          startIndex = -1;
        }
      }
    }
  }
  return results;
};

export const robustJSONParse = (jsonStr: string): any => {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    // Try to fix common AI errors
    let fixed = jsonStr
      .replace(/,\s*([\]}])/g, '$1') // Remove trailing commas
      // Fix missing commas in arrays: ["a" "b"] -> ["a", "b"]
      .replace(/"\s*"/g, '", "')
      // Fix missing commas between objects in arrays: {"id":1} {"id":2} -> {"id":1}, {"id":2}
      .replace(/}\s*{/g, '}, {')
      // Fix common typo where 'o' is used instead of '0'
      .replace(/:\s*o([\s,}])/gi, ': 0$1')
      .replace(/:\s*O([\s,}])/g, ': 0$1')
      // Fix full-width colons and quotes
      .replace(/：/g, ':')
      .replace(/”/g, '"')
      .replace(/“/g, '"');
    
    try {
      return JSON.parse(fixed);
    } catch {
      // If still failing, try a more aggressive fix for missing commas in arrays of objects
      // This is common in the 'records' field
      fixed = fixed.replace(/}\s*"/g, '}, "').replace(/"\s*{/g, '", {');
      try {
        return JSON.parse(fixed);
      } catch (e3) {
        console.error("Failed to parse JSON string completely, throwing error:", e3, "Original string:", jsonStr);
        throw e; // Throw original error if fix fails
      }
    }
  }
};

export const getLatestDateFromHistory = (history: any[]): string => {
  let latest = '';
  
  history.forEach(msg => {
    if (msg.content) {
      // 捕获可能包含星期的完整 TimeFormat 字符串
      const systemDateRegex = /(?:【当前日期：|\[时间线：)\s*([^\n】\]]+)/g;
      let match;
      while ((match = systemDateRegex.exec(msg.content)) !== null) {
        const foundDate = match[1].trim();
        if (compareDates(foundDate, latest) > 0) {
          latest = foundDate;
        }
      }
    }
  });
  return latest;
};

export const safeArray = (arr: any): any[] => Array.isArray(arr) ? arr : [];

// Helper from App.tsx: getLogLocation
export const getLogLocation = (timestamp: string, logs: LogSummary[]): string | null => {
  if (!timestamp || !logs) return null;
  // Look through logs and their days for matching timestamp
  for (const log of logs) {
    if (log.date === timestamp) return log.days[0]?.location || null;
    for (const day of log.days) {
      if (day.date === timestamp || day.time === timestamp) return day.location || null;
      for (const event of day.events) {
        if (event.description.includes(timestamp)) return day.location || null;
      }
    }
  }
  return null;
};

export const getDefaultWorldBooks = (setting: HistoricalPeriod): string[] => {
  switch (setting) {
    case HistoricalPeriod.GOTHIC_WAR:
      return ['WARZONE_ABYSS', 'GLOBAL_RULES'];
    case HistoricalPeriod.HORUS_HERESY:
      return ['HORUS_HERESY', 'GLOBAL_RULES'];
    case HistoricalPeriod.BLACK_CRUSADE:
      return ['FALL_OF_CADIA', 'GLOBAL_RULES'];
    case HistoricalPeriod.BADAB_WAR:
      return ['BADAB_WAR', 'GLOBAL_RULES'];
    case HistoricalPeriod.ARMAGEDDON:
      return ['TYRANID_INVASION', 'GLOBAL_RULES'];
    case HistoricalPeriod.FALL_OF_CADIA:
      return ['FALL_OF_CADIA', 'GLOBAL_RULES'];
    case HistoricalPeriod.INDOMITUS_CRUSADE:
      return ['INDOMITUS_CRUSADE', 'GLOBAL_RULES'];
    case HistoricalPeriod.TEMPESTUS_WAR:
      return ['TYRANID_INVASION', 'GLOBAL_RULES'];
    case HistoricalPeriod.DARK_IMPERIUM:
      return ['DARK_IMPERIUM', 'GLOBAL_RULES'];
    case HistoricalPeriod.END_TIMES:
      return ['END_TIMES', 'GLOBAL_RULES'];
    default:
      return ['GLOBAL_RULES'];
  }
};

export const applyNPCUpdates = (existingProfiles: NPCProfile[], updates: any[], logs?: LogSummary[]): NPCProfile[] => {
  if (!updates || updates.length === 0) return existingProfiles;
  
  // Name normalization helper
  const normalizeName = (name: string): string => {
    if (!name) return '';
    return String(name).replace(/\s*\(.*?\)\s*/g, '').replace(/\s*（.*?）\s*/g, '').trim().toLowerCase();
  };

  // Create a map for faster lookup
  const profileMap = new Map<string, number>();
  if (Array.isArray(existingProfiles)) {
    existingProfiles.forEach((p, index) => {
      if (p && p.id) profileMap.set(p.id, index);
    });
  }

  const nameMap = new Map<string, number>();
  if (Array.isArray(existingProfiles)) {
    existingProfiles.forEach((p, index) => {
      if (p && p.name) {
        const normalized = normalizeName(p.name);
        const key = `${normalized}|${(p.originWorld || '').toLowerCase()}`;
        if (!nameMap.has(key)) nameMap.set(key, index);
        
        // Also map just name if no conflict
        if (!nameMap.has(normalized)) nameMap.set(normalized, index);
      }
    });
  }

  const nextProfiles = [...existingProfiles];
  const now = Date.now();
  
  if (Array.isArray(updates)) {
    updates.forEach(update => {
      if (!update) return;
      const updateName = (update.name || '').trim();
      const normalizedUpdateName = normalizeName(updateName);
      const updatePlace = (update.originWorld || update.placeId || '').trim();
      const updateId = update.id;
      
      if (!updateName && !updateId) return;

      let targetIndex = -1;
      // List of highly generic names that the AI often uses.
      const genericNames = [
        '未知的战士', '未知灵能者', '异端', '叛军', '未知教徒', '亚空间阴影', '未知', '???',
        '混沌信徒', '细作', '刺客', '变种人', '灵能杂音', '影子', '医疗兵', '机仆', '侍者'
      ];
      const isGenericName = normalizedUpdateName ? genericNames.some(gn => normalizedUpdateName.includes(gn)) : false;

      // Only trust the ID if it's not the literal template string
      if (updateId && updateId !== 'unique_id_or_name' && profileMap.has(updateId)) {
        const potentialTarget = profileMap.get(updateId)!;
        const pName = nextProfiles[potentialTarget].name || '';
        const existingNormalized = normalizeName(pName);
        
        // If names differ significantly, we MUST prevent ID collision unless the existing one is highly generic.
        const isExistingNameGeneric = genericNames.some(gn => existingNormalized.includes(gn));
        
        if (existingNormalized !== normalizedUpdateName && !isExistingNameGeneric) {
            console.warn(`[NPC Sync] Prevented ID collision for ${updateId}: Existing name '${pName}', new name '${updateName}'`);
            update.id = `npc_${now}_${Math.random().toString(36).substring(2, 7)}`;
            
            const key = `${normalizedUpdateName}|${updatePlace.toLowerCase()}`;
            if (nameMap.has(key)) {
              targetIndex = nameMap.get(key)!;
            } else if (nameMap.has(normalizedUpdateName)) {
              targetIndex = nameMap.get(normalizedUpdateName)!;
            } else {
              targetIndex = nextProfiles.findIndex(p => p && normalizeName(p.name) === normalizedUpdateName);
            }
        } else {
           targetIndex = potentialTarget;
        }
      } else if (!isGenericName && normalizedUpdateName) {
        const key = `${normalizedUpdateName}|${updatePlace.toLowerCase()}`;
        if (nameMap.has(key)) {
          targetIndex = nameMap.get(key)!;
        } else if (nameMap.has(normalizedUpdateName)) {
          targetIndex = nameMap.get(normalizedUpdateName)!;
        } else {
          targetIndex = nextProfiles.findIndex(p => p && normalizeName(p.name) === normalizedUpdateName);
        }
      }

      if (targetIndex !== -1) {
        const p = nextProfiles[targetIndex];
        if (!p) return;

        let mergedRecords = [...safeArray(p.records)];
        
        if (update.records && Array.isArray(update.records)) {
          if (update._isFullUpdate) {
            // For manual updates, we replace the entire records list
            mergedRecords = update.records;
          } else {
            // For AI updates, we merge based on content uniqueness
            const existingContent = new Set(mergedRecords.map(r => r.content.trim()));
            if (Array.isArray(update.records)) {
              update.records.forEach((r: any) => {
                if (r.content && !existingContent.has(r.content.trim())) {
                  // AUTO-FIX LOCATION FROM LOGS
                  if (logs && r.timestamp) {
                    const logLoc = getLogLocation(r.timestamp, logs);
                    if (logLoc && logLoc !== "地点" && logLoc !== "未知地点") {
                      r.location = logLoc;
                    }
                  }

                  mergedRecords.push({ 
                    ...r, 
                    id: r.id || `rec_${now}_${Math.random().toString(36).substr(2, 9)}` 
                  });
                  existingContent.add(r.content.trim());
                }
              });
            }
          }
        }
        
        // Also fix appearanceLocation if applicable
        if (logs && update.appearanceTime && (!update.appearanceLocation || update.appearanceLocation === "地点")) {
          const appLoc = getLogLocation(update.appearanceTime, logs);
          if (appLoc) update.appearanceLocation = appLoc;
        }
        
        let mergedUserNotes = p.userNotes || '';
        if (update._isFullUpdate) {
          // For manual updates, respect the user's edited notes
          mergedUserNotes = update.userNotes !== undefined ? update.userNotes : mergedUserNotes;
        } else if (update.aiGeneratedRecord && update.aiGeneratedRecord !== p.aiGeneratedRecord) {
          // For AI updates, merge the new AI record into user notes
          if (!mergedUserNotes.includes(update.aiGeneratedRecord)) {
            mergedUserNotes = mergedUserNotes ? `${update.aiGeneratedRecord}\n\n${mergedUserNotes}` : update.aiGeneratedRecord;
          }
        }

        const nextHasAppeared = update.hasAppeared !== undefined ? update.hasAppeared : p.hasAppeared;
        
        let nextAppearanceTime = p.appearanceTime;
        let nextAppearanceLocation = p.appearanceLocation;
        
        if (update._isFullUpdate) {
            nextAppearanceTime = update.appearanceTime;
            nextAppearanceLocation = update.appearanceLocation;
        } else {
            nextAppearanceTime = p.appearanceTime || update.appearanceTime;
            nextAppearanceLocation = p.appearanceLocation || update.appearanceLocation;
        }

        // Auto-fill appearance time from latest record if they just appeared and time is empty
        if (nextHasAppeared && !nextAppearanceTime && mergedRecords.length > 0) {
           const sortedMerged = [...mergedRecords].sort((a,b) => compareDates(a.timestamp, b.timestamp));
           nextAppearanceTime = sortedMerged[0].timestamp;
           nextAppearanceLocation = sortedMerged[0].location || '未知地点';
        }

        const updateAttrs = update.attributes || update.stats;
        nextProfiles[targetIndex] = {
          ...p,
          ...update,
          name: (update._isFullUpdate || !p.name.includes('(')) ? (update.name || p.name) : p.name,
          lastUpdated: now,
          // Handle structured attributes: AI can update them if provided
          attributes: updateAttrs ? (Object.keys(updateAttrs).reduce((acc: any, key) => {
            // Map short names to long names if needed, case-insensitive
            const keyMap: Record<string, string> = {
              'WS': 'weaponSkill', 'BS': 'ballisticSkill', 'S': 'strength', 'T': 'toughness',
              'AG': 'agility', 'INT': 'intelligence', 'PER': 'perception', 'WP': 'willpower', 'FEL': 'fellowship',
              'Ag': 'agility', 'Int': 'intelligence', 'Per': 'perception', 'Wp': 'willpower', 'Fel': 'fellowship',
              '耐久': 'hp', 'hp': 'hp', 'health': 'hp', 'HP': 'hp'
            };
            const targetKey = keyMap[key] || keyMap[key.toUpperCase()] || key;
            acc[targetKey] = typeof (updateAttrs as any)[key] === 'number' ? Math.max(1, (updateAttrs as any)[key]) : (updateAttrs as any)[key];
            return acc;
          }, { ...p.attributes })) : p.attributes,
          // Prevent AI from overwriting these critical fields unless it's a manual update
          parameters: update._isFullUpdate ? update.parameters : p.parameters,
          trait: update._isFullUpdate ? reconcileTraits(update.trait) : mergeTraits(p.trait, update.trait),
          skill: update._isFullUpdate ? reconcileTraits(update.skill) : mergeTraits(p.skill, update.skill),
          equipment: update._isFullUpdate ? reconcileTraits(update.equipment) : mergeTraits(p.equipment, update.equipment),
          items: update._isFullUpdate ? reconcileTraits(update.items) : mergeTraits(p.items, update.items),
          bondLevel: update.bondLevel !== undefined ? update.bondLevel : p.bondLevel,
          // Handle appearance fields safely
          hasAppeared: nextHasAppeared,
          appearanceTime: nextAppearanceTime,
          appearanceLocation: nextAppearanceLocation,
          userNotes: mergedUserNotes,
          aiGeneratedRecord: '', // Clear it since it's merged into userNotes
          records: mergedRecords,
          tags: update._isFullUpdate ? (update.tags || []) : [...new Set([...safeArray(p.tags), ...safeArray(update.tags)])]
        };
      } else {
        // Create new NPC
        const newId = update.id || `npc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const initialHasAppeared = update.hasAppeared !== undefined ? update.hasAppeared : true;
        const newRecords = update.records || [];

        let initialAppTime = update.appearanceTime || '';
        let initialAppLoc = update.appearanceLocation || '';
        if (initialHasAppeared && !initialAppTime && newRecords.length > 0) {
           const sortedNewRecords = [...newRecords].sort((a,b) => compareDates(a.timestamp, b.timestamp));
           initialAppTime = sortedNewRecords[0].timestamp;
           initialAppLoc = sortedNewRecords[0].location || '未知地点';
        }

        const updateAttrs = update.attributes || update.stats;
        const newNpc = {
          bondLevel: 0,
          userNotes: '',
          aiGeneratedRecord: '',
          status: '健康',
          ...update,
          id: newId,
          attributes: updateAttrs ? (Object.keys(updateAttrs).reduce((acc: any, key) => {
            const keyMap: Record<string, string> = {
              'WS': 'weaponSkill', 'BS': 'ballisticSkill', 'S': 'strength', 'T': 'toughness',
              'AG': 'agility', 'INT': 'intelligence', 'PER': 'perception', 'WP': 'willpower', 'FEL': 'fellowship',
              'Ag': 'agility', 'Int': 'intelligence', 'Per': 'perception', 'Wp': 'willpower', 'Fel': 'fellowship',
              '耐久': 'hp', 'hp': 'hp', 'health': 'hp', 'HP': 'hp'
            };
            const targetKey = keyMap[key] || keyMap[key.toUpperCase()] || key;
            acc[targetKey] = typeof (updateAttrs as any)[key] === 'number' ? Math.max(1, (updateAttrs as any)[key]) : (updateAttrs as any)[key];
            return acc;
          }, {})) : undefined,
          parameters: update.parameters === 'UNCHANGED' ? '未知' : update.parameters,
          trait: reconcileTraits(update.trait === 'UNCHANGED' ? '' : update.trait) as string,
          skill: reconcileTraits(update.skill === 'UNCHANGED' ? '' : update.skill) as string,
          equipment: reconcileTraits(update.equipment === 'UNCHANGED' ? '' : update.equipment) as string,
          items: reconcileTraits(update.items === 'UNCHANGED' ? '' : update.items) as string,
          hasAppeared: initialHasAppeared,
          appearanceTime: initialAppTime,
          appearanceLocation: initialAppLoc,
          records: newRecords,
          tags: update.tags || [],
          lastUpdated: now
        };
        const newIndex = nextProfiles.length;
        nextProfiles.push(newNpc);
        
        // Update maps for subsequent updates in the same loop
        profileMap.set(newId, newIndex);
        const key = `${updateName.toLowerCase()}|${(update.originWorld || '').toLowerCase()}`;
        if (!nameMap.has(key)) nameMap.set(key, newIndex);
      }
    });
  }
  
  return nextProfiles;
};

export const reconcileTraits = (traits: string | string[]): string | string[] => {
  if (!traits) return traits;
  
  let isString = false;
  let traitList: string[] = [];
  
  if (typeof traits === 'string') {
    isString = true;
    traitList = traits.split(/[,，;；]/).map(s => s.trim()).filter(Boolean);
  } else {
    traitList = [...traits];
  }

  const hierarchyMap: Record<string, string[]> = {
    '【机械化·高级】': ['【机械化·中级】', '【机械化·初级】', '机械化·高级', '机械化·中级', '机械化·初级'],
    '【机械化·中级】': ['【机械化·初级】', '机械化·中级', '机械化·初级'],
    '【机械化·初级】': ['机械化·初级'],
    '【强化天生武器】': ['【天生武器】', '强化天生武器', '天生武器'],
    '【天生武器】': ['天生武器'],
    '【再生·高级】': ['【再生·中级】', '【再生·初级】', '再生·高级', '再生·中级', '再生·初级'],
    '【再生·中级】': ['【再生·初级】', '再生·中级', '再生·初级'],
    '【再生·初级】': ['再生·初级']
  };

  const toRemove = new Set<string>();
  traitList.forEach(t => {
    const cleanT = t.replace(/[【】]/g, '');
    const bracketedT = `【${cleanT}】`;
    
    const rules = hierarchyMap[bracketedT] || hierarchyMap[cleanT];
    if (rules) {
      rules.forEach(r => {
        if (r !== t) {
          toRemove.add(r);
          const cleanR = r.replace(/[【】]/g, '');
          if (cleanR !== cleanT) {
            toRemove.add(cleanR);
            toRemove.add(`【${cleanR}】`);
          }
        }
      });
    }
  });

  const cleaned = traitList.filter(t => !toRemove.has(t));
  const final = Array.from(new Set(cleaned));

  return isString ? final.join(', ') : final;
};

export const mergeTraits = (existing: string | string[] | undefined, incoming: string | string[] | undefined): string | string[] => {
  if (!existing && !incoming) return (typeof existing === 'string' || typeof incoming === 'string') ? '' : [];
  const e = existing ? (typeof existing === 'string' ? existing.split(/[,，;；]/) : existing) : [];
  const i = incoming ? (typeof incoming === 'string' ? incoming.split(/[,，;；]/) : incoming) : [];
  const merged = [...new Set([...e, ...i].map(s => s.trim()).filter(Boolean))];
  return reconcileTraits(typeof existing === 'string' || typeof incoming === 'string' ? merged.join(', ') : merged);
};

export const extractCharacterUpdate = (text: string, currentCharacter: Character | null): { character: Character | null, xpChange?: number } => {
  if (!text || !currentCharacter) return { character: currentCharacter };
  
  let targetParsingText = text;
  
  const sysStateMatch = targetParsingText.match(/<system_state>([\s\S]*?)<\/system_state>/i);
  if (sysStateMatch) {
      targetParsingText = sysStateMatch[1];
  } else {
      // If <system_state> is missing, use the whole text but strip out all NPC/non-player registries
      targetParsingText = targetParsingText.replace(/<unit_registry\b[^>]*>[\s\S]*?<\/unit_registry\s*>/gi, '')
                                         .replace(/<officer_registry\b[^>]*>[\s\S]*?<\/officer_registry\s*>/gi, '')
                                         .replace(/<hero_registry\b[^>]*>[\s\S]*?<\/hero_registry\s*>/gi, '')
                                         .replace(/<warlord_registry\b[^>]*>[\s\S]*?<\/warlord_registry\s*>/gi, '')
                                         .replace(/\[NPC_SYNC_START\][\s\S]*?\[NPC_SYNC_END\]/gi, '')
                                         .replace(/<system_data\b[^>]*>[\s\S]*?<\/system_data\s*>/gi, '');
  }

  const extract = (key: string) => {
    const keyPattern = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:\\/\\/\\s*)?【${keyPattern}】[：:]?\\s*(.*?)(?=\\n|$)`, 'g');
    const match = regex.exec(targetParsingText);
    return match ? match[1].trim() : null;
  };

  const newChar = { 
    ...currentCharacter,
    attributes: { ...currentCharacter.attributes },
    skills: safeArray(currentCharacter.skills).map(s => ({ ...s })),
    traits: safeArray(currentCharacter.traits).map(t => ({ ...t })),
    equipment: safeArray(currentCharacter.equipment),
    items: safeArray(currentCharacter.items),
    syntheticItems: safeArray(currentCharacter.syntheticItems)
  };
  let hasChanges = false;
  let xpChange = 0;
  
  // Extract Experience (Robust Parsing)
  let parsedXpIncrease = 0;
  let hasRelativeXp = false;
  
  const relativeXpRegexes = [
    /【经验点[：:]?】[：:]?\s*\+(\d+)/,
    /【经验点[：:]?\+(\d+)】/,
    /(?:^|\n|[^【])经验点[：:]?\s*\+(\d+)/,
    /【XP[：:]?】[：:]?\s*\+(\d+)/,
    /【XP[：:]?\+(\d+)】/,
    /\b(?:XP|xp)[：:]?\s*\+(\d+)\b/
  ];
  
  for (const regex of relativeXpRegexes) {
    const match = text.match(regex);
    if (match) {
      parsedXpIncrease = parseInt(match[1]);
      hasRelativeXp = true;
      break;
    }
  }

  if (hasRelativeXp) {
    xpChange = parsedXpIncrease;
    newChar.experience = (newChar.experience || 0) + parsedXpIncrease;
    hasChanges = true;
  } else {
    const absoluteXpRegexes = [
      /【经验点[：:]?】[：:]?\s*(\d+)/,
      /【经验点[：:]?(\d+)】/,
      /(?:^|\n|[^【])经验点[：:]?\s*(\d+)/,
      /【XP[：:]?】[：:]?\s*(\d+)/,
      /【XP[：:]?(\d+)】/,
      /\b(?:XP|xp)[：:]?\s*(\d+)\b/
    ];
    
    for (const regex of absoluteXpRegexes) {
      const match = text.match(regex);
      if (match) {
        const absXp = parseInt(match[1]);
        if (absXp !== newChar.experience) {
          newChar.experience = absXp;
          hasChanges = true;
        }
        break;
      }
    }
  }
  
  const enduranceProv = extract('耐久') || extract('状态') || extract('HP');
  if (enduranceProv) {
      // Try to match current/max format first
      const fullMatch = enduranceProv.match(/(\d+)\s*\/\s*(\d+)/);
      const calculatedMaxHP = Math.max(1, Math.floor((newChar.attributes?.toughness || 10) / 5));
      
      if (fullMatch) {
          let currentHP = parseInt(fullMatch[1]);
          let maxHP = parseInt(fullMatch[2]);
          
          // CRITICAL: Safeguard against AI-hallucinated HP (like 100/100)
          if (maxHP > calculatedMaxHP * 1.5 && calculatedMaxHP < 50) {
             maxHP = calculatedMaxHP;
          }
          if (currentHP > maxHP) currentHP = maxHP;

          const enduranceVal = `${currentHP}/${maxHP}`;
          if (enduranceVal !== newChar.hp) {
            newChar.hp = enduranceVal;
            hasChanges = true;
          }
      } else {
          const parts = enduranceProv.split(/[/,，（(]/).map(s => s.replace(/[)）]/g, '').trim());
          if (parts[0]) {
              const enduranceMatch = parts[0].match(/(\d+)/);
              let currentHP = enduranceMatch ? parseInt(enduranceMatch[1]) : parseInt(parts[0]) || calculatedMaxHP;
              
              if (currentHP > calculatedMaxHP && calculatedMaxHP < 50) {
                 currentHP = calculatedMaxHP;
              }

              const enduranceVal = `${currentHP}/${calculatedMaxHP}`;
              if (enduranceVal !== newChar.hp) {
                newChar.hp = enduranceVal.toString();
                hasChanges = true;
              }
          }
      }
  }

  const parseBaseAttribute = (text: string, key: string, cname: string): number | null => {
    try {
      const regex = new RegExp(`(?:${key}|${cname})[:：]?\\s*([^,，;；]+)`, 'i');
      const match = text.match(regex);
      if (!match) return null;
      const segment = match[1];

      // Match base within parentheses before + or -
      const complexMatch = segment.match(/[\(（][^\d]*(\d+)\s*[\+\-]/);
      if (complexMatch) {
        return parseInt(complexMatch[1], 10);
      }

      // Fallback
      const simpleMatch = segment.match(/(\d+)/);
      if (simpleMatch) {
        return parseInt(simpleMatch[1], 10);
      }
    } catch(e) {}
    return null;
  };

  // 1. Attribute Enhancement Tags (Explicit)
  const attributeGainRegex = /【属性提升[：:]?\s*([^】]+)】/g;
  let attrMatch;
  while ((attrMatch = attributeGainRegex.exec(text)) !== null) {
      const attrStr = attrMatch[1].trim();
      const parts = attrStr.split(/[,，/|]/).map(s => s.trim()).filter(Boolean);
      parts.forEach(part => {
          const m = part.match(/(力量|敏捷|坚韧|智力|感知|意志|社交|武器技能|射击技能|WS|BS|S|T|Ag|Int|Per|WP|Fel)[:：]?\s*([+-]\s*\d+)/i);
          if (m) {
              const label = m[1].toUpperCase();
              const val = parseInt(m[2].replace(/\s+/g, ''));
              let key: keyof Character['attributes'] | null = null;
              
              if (label === '力量' || label === 'S') key = 'strength';
              else if (label === '敏捷' || label === 'AG') key = 'agility';
              else if (label === '坚韧' || label === 'T') key = 'toughness';
              else if (label === '智力' || label === 'INT') key = 'intelligence';
              else if (label === '感知' || label === 'PER') key = 'perception';
              else if (label === '意志' || label === 'WP') key = 'willpower';
              else if (label === '社交' || label === 'FEL') key = 'fellowship';
              else if (label === '武器技能' || label === 'WS') key = 'weaponSkill';
              else if (label === '射击技能' || label === 'BS') key = 'ballisticSkill';

              if (key && newChar.attributes && newChar.attributes[key] !== undefined) {
                  newChar.attributes[key] += val;
                  hasChanges = true;
              }
          }
      });
  }

  // 2. Direct Core Attribute Block Extraction (Safe Upgrade Detection)
  const coreAttrsText = extract('核心属性');
  if (coreAttrsText) {
      const keysMap: Record<string, keyof Character['attributes']> = {
        '武器技能': 'weaponSkill', 'WS': 'weaponSkill',
        '射击技能': 'ballisticSkill', 'BS': 'ballisticSkill',
        '力量': 'strength', 'S': 'strength',
        '坚韧': 'toughness', 'T': 'toughness',
        '敏捷': 'agility', 'Ag': 'agility',
        '智力': 'intelligence', 'Int': 'intelligence',
        '感知': 'perception', 'Per': 'perception',
        '意志': 'willpower', 'WP': 'willpower',
        '社交': 'fellowship', 'Fel': 'fellowship'
      };

      Object.entries(keysMap).forEach(([label, key]) => {
          const regex = new RegExp(`${label}[:：]?\\s*(\\d+)\\s*[\\(（]\\s*(\\d+)`, 'i');
          const match = coreAttrsText.match(regex);
          if (match) {
              const baseValue = parseInt(match[2]); // match[2] will be the first number inside brackets, which is Base
              if (newChar.attributes[key] !== undefined && baseValue !== newChar.attributes[key]) {
                  // Only update if it's not a massive drift (protection against hallucination)
                  if (Math.abs(baseValue - newChar.attributes[key]) <= 15) {
                    newChar.attributes[key] = baseValue;
                    hasChanges = true;
                  }
              }
          }
      });
  }

  const specialty = extract('特技或作战本领') || extract('特技') || extract('作战本领');
  if (specialty) {
      const parts = specialty.split(/[/,，]/);
      const specVal = reconcileTraits(parts[0].trim()) as string;
      if (specVal !== newChar.specialty) {
        newChar.specialty = specVal;
        hasChanges = true;
      }
  }

  const unitType = extract('单位类型');
  if (unitType && unitType !== newChar.unitType) {
    newChar.unitType = unitType as UnitType;
    hasChanges = true;
  }

  const vehicleClass = extract('配属载具');
  if (vehicleClass && vehicleClass !== newChar.vehicleClass) {
    newChar.vehicleClass = vehicleClass as VehicleClass;
    hasChanges = true;
  }

  // ITEM/EQUIPMENT INCREMENTAL TAGS
  const itemGainRegex = /【获得(?:物品|装备)[：:]?\s*([^】]+)】/g;
  let gainMatch;
  while ((gainMatch = itemGainRegex.exec(text)) !== null) {
      const itemsStr = gainMatch[1].trim();
      const isEquip = gainMatch[0].includes('装备');
      const itemNames = itemsStr.split(/[,，/]/).map(s => s.trim()).filter(Boolean);
      
      itemNames.forEach(itemName => {
          if (isEquip) {
              const current = safeArray(newChar.equipment);
              if (!current.includes(itemName)) {
                  newChar.equipment = [...current, itemName];
                  hasChanges = true;
              }
          } else {
              const current = safeArray(newChar.items);
              if (!current.includes(itemName)) {
                  newChar.items = [...current, itemName];
                  hasChanges = true;
              }
          }
      });
  }

  const itemLossRegex = /【失去(?:物品|装备)[：:]?\s*([^】]+)】/g;
  let lossMatch;
  while ((lossMatch = itemLossRegex.exec(text)) !== null) {
      const itemsStr = lossMatch[1].trim();
      const isEquip = lossMatch[0].includes('装备');
      const itemNames = itemsStr.split(/[,，/]/).map(s => s.trim()).filter(Boolean);
      
      itemNames.forEach(itemName => {
          if (isEquip) {
              const current = safeArray(newChar.equipment);
              const filtered = current.filter(i => i !== itemName && !i.includes(itemName));
              if (filtered.length !== current.length) {
                  newChar.equipment = filtered;
                  hasChanges = true;
              }
          } else {
              const current = safeArray(newChar.items);
              const filtered = current.filter(i => i !== itemName && !i.includes(itemName));
              if (filtered.length !== current.length) {
                  newChar.items = filtered;
                  hasChanges = true;
              }
          }
      });
  }

  const parseListFromState = (fieldStr: string): string[] => {
      // Split by semicolon or comma, but ignore separators inside brackets/parentheses
      const result: string[] = [];
      let current = '';
      let depth = 0;
      
      for (let i = 0; i < fieldStr.length; i++) {
          const char = fieldStr[i];
          if (char === '(' || char === '[' || char === '{' || char === '（' || char === '【' || char === '「' || char === '<') {
              depth++;
              current += char;
          } else if (char === ')' || char === ']' || char === '}' || char === '）' || char === '】' || char === '」' || char === '>') {
              depth = Math.max(0, depth - 1);
              current += char;
          } else if ((char === ',' || char === '，' || char === ';' || char === '；' || char === '、') && depth === 0) {
              if (current.trim()) result.push(current.trim());
              current = '';
          } else {
              current += char;
          }
      }
      if (current.trim()) {
          result.push(current.trim());
      }
      
      return result
          .map(s => {
              // Extract description if there is a colon OUTSIDE of parentheses/tags
              let outerColonIndex = -1;
              let currentDepth = 0;
              for (let i = 0; i < s.length; i++) {
                  const char = s[i];
                  if (char === '(' || char === '[' || char === '{' || char === '（' || char === '【' || char === '「' || char === '<') currentDepth++;
                  else if (char === ')' || char === ']' || char === '}' || char === '）' || char === '】' || char === '」' || char === '>') currentDepth--;
                  else if ((char === ':' || char === '：') && currentDepth === 0) {
                      outerColonIndex = i;
                      break;
                  }
              }
              if (outerColonIndex !== -1) {
                  s = s.substring(0, outerColonIndex);
              }
              // Strip trailing parenthetical flavor/stats IF it doesn't look like stats
              // But keep it if it contains ":" (indicating stats like S:50)
              const contentInside = s.match(/[(（\[【<]([^)）\]】>]*)[)）\]】>]\s*$/);
              if (contentInside && !contentInside[1].includes(':')) {
                return s.replace(/\s*[(（\[【<][^)）\]】>]*[)）\]】>]\s*$/, '').trim();
              }
              return s.trim();
          })
          .filter(Boolean);
  };

  const items = extract('物品');
  if (items) {
      const parsedItems = parseListFromState(items);
      const currentItems = safeArray(newChar.items);
      const combinedItems = Array.from(new Set([...currentItems, ...parsedItems]));
      if (JSON.stringify(combinedItems) !== JSON.stringify(currentItems)) {
         newChar.items = combinedItems;
         hasChanges = true;
      }
  }

  const equipment = extract('装备') || extract('特征装备');
  if (equipment) {
      const parsedEquipment = parseListFromState(equipment);
      const currentEquip = safeArray(newChar.equipment);
      const combinedEquip = Array.from(new Set([...currentEquip, ...parsedEquipment]));
      if (JSON.stringify(combinedEquip) !== JSON.stringify(currentEquip)) {
         newChar.equipment = combinedEquip;
         hasChanges = true;
      }
  }

  const traitsText = extract('特质');
  if (traitsText) {
    const traitNames = parseListFromState(traitsText);
    const currentTraits = safeArray(newChar.traits);
    const existingNames = currentTraits.map(t => String(t?.name || '').replace(/[【】]/g, ''));
    traitNames.forEach(name => {
      const cleanName = String(name).replace(/[【】]/g, '').replace(/\[undefined\]/g, '').replace(/\s*[([（【\[][^\]）)】\]]*[)）】\]]\s*$/g, '').trim();
      if (cleanName && !existingNames.includes(cleanName)) {
        currentTraits.push({ name: `【${cleanName}】` });
      }
    });
    const reconciled = reconcileTraits(currentTraits.map(t => t.name));
    const finalTraits = (reconciled as string[]).map(name => {
      const existing = currentTraits.find(t => t.name === name || t.name === `【${name}】` || name === `【${t.name}】`);
      return existing || { name };
    });
    if (JSON.stringify(finalTraits) !== JSON.stringify(newChar.traits)) {
      newChar.traits = finalTraits;
      hasChanges = true;
    }
  }
  
  const faithLevel = extract('信仰等级');
  if (faithLevel) {
    const faithVal = faithLevel.replace(/Lv[.]?/i, '').trim();
    const parsed = parseInt(faithVal);
    if (!isNaN(parsed) && parsed !== newChar.faithLevel) {
       newChar.faithLevel = parsed;
       hasChanges = true;
    }
  }

  const corruptionValue = extract('腐化值');
  if (corruptionValue) {
    const parsed = parseInt(corruptionValue);
    if (!isNaN(parsed) && parsed !== newChar.corruptionValue) {
       newChar.corruptionValue = parsed;
       hasChanges = true;
    }
  }

  const resources = extract('势力资源\\/状态') || extract('势力资源/状态') || extract('后勤资源') || extract('财产') || extract('金钱') || extract('资源') || extract('战略资产');
  if (resources) {
      const parts = resources.split(/[,，/|]/).map((s: string) => s.trim()).filter(Boolean);
      parts.forEach(part => {
        // More robust unit matching
        const matchFunds = part.match(/(?:主要资源|王座币|经费|资源点|征用权|诸神恩宠|神佑|生物质|数据碎片|点数|信用点|信仰值|专属资源A)[:：]?\s*([+-]?\s*\d+.*)/i);
        const matchProv = part.match(/(?:后勤补给|军用补给|军用口粮|合成配给|基因种子|稀有力物|零件储备|掠夺物资|灵魂|异端遗物|突变池|消化液|圣物|物资|补给|专属资源B)[:：]?\s*([+-]?\s*\d+.*)/i);
        const matchForces = part.match(/(?:部队兵力|兵力|誓言卫队|阿斯塔特数量|恶魔仆从|虫巢单位|编队|战团)[:：]?\s*(.+)/i);
        const matchPop = part.match(/(?:战区影响力|忠诚等级|奉献度|顺从性|腐化度|连接度|印记深度)[:：]?\s*(.+)/i);
        
        if (matchFunds) { 
            const valStr = matchFunds[1].trim();
            const isRelative = valStr.startsWith('+') || valStr.startsWith('-');
            const numericValue = parseInt(valStr.replace(/[^\d+-]/g, '')) || 0;
            
            if (isRelative) {
                const current = parseInt(newChar.funds?.replace(/[^\d-]/g, '') || '0') || 0;
                newChar.funds = (current + numericValue).toString();
            } else {
                newChar.funds = valStr; 
            }
            hasChanges = true; 
        }
        else if (matchProv) { 
            const valStr = matchProv[1].trim();
            const isRelative = valStr.startsWith('+') || valStr.startsWith('-');
            const numericValue = parseInt(valStr.replace(/[^\d+-]/g, '')) || 0;
            
            if (isRelative) {
                const current = parseInt(newChar.provisions?.replace(/[^\d-]/g, '') || '0') || 0;
                newChar.provisions = (current + numericValue).toString();
            } else {
                newChar.provisions = valStr; 
            }
            hasChanges = true; 
        }
        else if (matchForces) { newChar.forces = matchForces[1]; hasChanges = true; }
        else if (matchPop) { newChar.popularity = matchPop[1]; hasChanges = true; }
      });
  }

  // FALLBACK: INDIVIDUAL RESOURCE TAGS (If not in combined block)
  const individualFunds = extract('王座币') || extract('资金') || extract('经费') || extract('资源点') || extract('主要资源');
  if (individualFunds) {
      newChar.funds = individualFunds;
      hasChanges = true;
  }
  const individualProv = extract('补给') || extract('后勤') || extract('物资') || extract('军用补给') || extract('后勤补给');
  if (individualProv) {
      newChar.provisions = individualProv;
      hasChanges = true;
  }
  const individualForces = extract('兵力') || extract('部队') || extract('誓言卫队');
  if (individualForces) {
      newChar.forces = individualForces;
      hasChanges = true;
  }
  const individualPop = extract('战区影响力') || extract('影响力') || extract('声望') || extract('名望');
  if (individualPop) {
      newChar.popularity = individualPop;
      hasChanges = true;
  }

  // INDIVIDUAL INCREMENTAL RESOURCE TAGS
  const individualResourceRegex = /【(?:获得|失去)(王座币|军用补给|补给|经费|口粮|资源点|物资|点数|XP|经验点)[：:]?\s*([+-]?\d+)[^】]*】/g;
  let resMatch;
  while ((resMatch = individualResourceRegex.exec(text)) !== null) {
      const resType = resMatch[1];
      const resVal = parseInt(resMatch[2]);
      const isLose = resMatch[0].includes('失去');
      const finalVal = isLose ? -Math.abs(resVal) : resVal;

      if (resType === '王座币' || resType === '经费' || resType === '资源点' || resType === '点数') {
          const current = parseInt(newChar.funds?.replace(/[^\d-]/g, '') || '0') || 0;
          newChar.funds = (current + finalVal).toString();
          hasChanges = true;
      } else if (resType === '军用补给' || resType === '补给' || resType === '口粮' || resType === '物资') {
          const current = parseInt(newChar.provisions?.replace(/[^\d-]/g, '') || '0') || 0;
          newChar.provisions = (current + finalVal).toString();
          hasChanges = true;
      } else if (resType === 'XP' || resType === '经验点') {
          xpChange += finalVal;
          newChar.experience = (newChar.experience || 0) + finalVal;
          hasChanges = true;
      }
  }

  const location = extract('当前位置') || extract('位置') || extract('地点');
  if (location && location !== newChar.territory) {
      newChar.territory = location;
      hasChanges = true;
  }

  const currentStatus = extract('当前状态');
  if (currentStatus && currentStatus !== newChar.currentStatus) {
      newChar.currentStatus = currentStatus;
      hasChanges = true;
  }

  const alignment = extract('立场与追求') || extract('阵营') || extract('立场');
  if (alignment && alignment !== newChar.alignment) {
      newChar.alignment = alignment;
      hasChanges = true;
  }

  const lineage = extract('所属派系\\/战团') || extract('所属派系/战团') || extract('派系') || extract('战团');
  if (lineage && lineage !== newChar.lineage) {
      newChar.lineage = lineage;
      hasChanges = true;
  }
  
  const coreIntent = extract('核心任务\\/部署') || extract('核心任务/部署') || extract('战略意图');
  if (coreIntent && coreIntent !== newChar.coreIntent) {
      newChar.coreIntent = coreIntent;
      hasChanges = true;
  }
  
  const bond = extract('忠诚等级');
  if (bond && bond !== newChar.bond) {
      newChar.bond = bond;
      hasChanges = true;
  }
  
  // SYNTHETIC ITEMS REGISTRATION
  const syntheticMatch = text.match(/<synthetic_items>([\s\S]*?)<\/synthetic_items>/i);
  if (syntheticMatch && syntheticMatch[1]) {
    try {
      const content = syntheticMatch[1].trim();
      const jsonObjects = findBalancedBraces(content);
      if (jsonObjects.length > 0) {
        const parsed = robustJSONParse(jsonObjects[0]);
        if (Array.isArray(parsed)) {
          const currentSynthetic = safeArray(newChar.syntheticItems);
          const existingNames = new Set(currentSynthetic.map((si: any) => si.name));
          
          parsed.forEach((item: any) => {
            if (item.name && !existingNames.has(item.name)) {
              currentSynthetic.push(item);
              existingNames.add(item.name);
              
              const cat = item.category?.toLowerCase() || '';
              const isEquipment = cat.includes('武器') || cat.includes('护甲') || cat.includes('动力甲') || cat.includes('装甲') || cat.includes('weapon') || cat.includes('armor') || cat.includes('装备');
              
              if (isEquipment) {
                 const currentEq = safeArray(newChar.equipment);
                 if (!currentEq.includes(item.name)) {
                    newChar.equipment = [...currentEq, item.name];
                 }
              } else {
                 const currentItems = safeArray(newChar.items);
                 if (!currentItems.includes(item.name)) {
                    newChar.items = [...currentItems, item.name];
                 }
              }
            }
          });
          newChar.syntheticItems = currentSynthetic;
          hasChanges = true;
        }
      }
    } catch (e) {
      console.error("Failed to parse synthetic_items JSON", e);
    }
  }

  return hasChanges ? { character: newChar, xpChange } : { character: currentCharacter };
};

export const extractGaiaState = (text: string, currentGaiaState?: GaiaState): GaiaState => {
  const baseState = currentGaiaState || { sectors: {}, planets: {}, lastUpdated: Date.now() };
  if (!text) return baseState;

  const gaiaMatch = text.match(/<historical_state_monitor>([\s\S]*?)<\/historical_state_monitor>/i);
  if (gaiaMatch && gaiaMatch[1]) {
    try {
      const content = gaiaMatch[1].trim();
      const jsonObjects = findBalancedBraces(content);
      if (jsonObjects.length > 0) {
        const parsed = robustJSONParse(jsonObjects[0]);
        const newSectors = parsed.sectors || parsed.sector_monitor || {};
        const newPlanets = parsed.planets || {};
        return {
          ...baseState,
          sectors: { ...baseState.sectors, ...newSectors },
          planets: { ...baseState.planets, ...newPlanets },
          lastUpdated: Date.now(),
          lastSummary: parsed.summary || baseState.lastSummary
        };
      }
    } catch (e) {
      console.error("Failed to parse historical_state_monitor JSON", e);
    }
  }
  return baseState;
};

export const extractNPCUpdates = (text: string): any[] => {
  if (!text) return [];
  const updates: any[] = [];
  const narrativeLocationMatch = text.match(/【当前位置】[：:]?\s*(.*?)(?=\n|$)/);
  const narrativeLocation = narrativeLocationMatch ? narrativeLocationMatch[1].trim() : null;

  // Support multiple tags and mixed formats, including wide-width brackets
  const tagPatterns = [
    /<npc_monitor\b[^>]*>([\s\S]*?)<\/npc_monitor>/gi,
    /<npc_profile_sync\b[^>]*>([\s\S]*?)<\/npc_profile_sync>/gi,
    /<npc_profile\b[^>]*>([\s\S]*?)<\/npc_profile>/gi,
    /\[NPC_SYNC_START\]([\s\S]*?)\[NPC_SYNC_END\]/gi,
    /\[NPC_PROFILE_START\]([\s\S]*?)\[NPC_PROFILE_END\]/gi,
    /［NPC_SYNC_START］([\s\S]*?)［NPC_SYNC_END］/gi, // Wide-width brackets
    /【NPC_SYNC_START】([\s\S]*?)【NPC_SYNC_END】/gi
  ];
  
  const processedIndices = new Set<string>();

  tagPatterns.forEach(pattern => {
    let match;
    pattern.lastIndex = 0;
    while ((match = pattern.exec(text)) !== null) {
      if (match[1]) {
        const content = match[1].trim();
        const jsonObjects = findBalancedBraces(content);
        jsonObjects.forEach(obj => {
          try {
            const data = robustJSONParse(obj);
            if (data && (data.id || data.name)) {
              if (!data.id && data.name) {
                data.id = `npc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
              }
              if (!data.appearanceLocation && narrativeLocation) {
                data.appearanceLocation = narrativeLocation;
              }
              if (!updates.find(u => u.id === data.id || (u.name && u.name === data.name))) {
                updates.push(data);
                processedIndices.add(obj);
              }
            }
          } catch {}
        });
      }
    }
  });

  // Fallback: search for any JSON objects that look like NPC profiles but weren't in tags
  const allJsonObjects = findBalancedBraces(text);
  allJsonObjects.forEach(obj => {
    if (processedIndices.has(obj)) return;
    try {
      if (obj.length < 50) return; // Ignore very small objects
      const data = robustJSONParse(obj);
      // Signature of an NPC update: has id(npc_*) or (name + status) or (name + records)
      const hasId = data.id && (String(data.id).startsWith('npc_') || String(data.id).includes('character'));
      const hasNameAndStatus = data.name && (data.status || data.stats || data.attributes);
      
      if (hasId || hasNameAndStatus) {
        if (!data.id && data.name) {
          data.id = `npc_auto_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
        }
        if (!data.appearanceLocation && narrativeLocation) {
          data.appearanceLocation = narrativeLocation;
        }
        if (!updates.find(u => u.id === data.id || (u.name && u.name === data.name))) {
          updates.push(data);
        }
      }
    } catch {}
  });

  return updates;
};

export const extractLogUpdates = (text: string, currentLogs: LogSummary[]): LogSummary[] => {
  if (!text) return currentLogs;
  
  const logMatch = text.match(/<campaign_log>([\s\S]*?)<\/campaign_log>/i);
  if (!logMatch || !logMatch[1]) return currentLogs;

  try {
    const content = logMatch[1].trim();
    const jsonObjects = findBalancedBraces(content);
    if (jsonObjects.length === 0) return currentLogs;

    const parsed = robustJSONParse(jsonObjects[0]);
    if (!parsed) return currentLogs;

    // Handle both single object and array of updates
    const updates = Array.isArray(parsed) ? parsed : [parsed];
    let nextLogs = [...currentLogs];

    updates.forEach(update => {
      if (!update.title && !update.id) return;

      const existingIndex = nextLogs.findIndex(l => 
        (update.id && l.id === update.id) || 
        (update.title && l.title === update.title)
      );

      if (existingIndex !== -1) {
        // Merge into existing log
        const log = nextLogs[existingIndex];
        const updatedDays = [...log.days];

        if (update.days && Array.isArray(update.days)) {
          update.days.forEach((newDay: any) => {
            const dayIndex = updatedDays.findIndex(d => d.date === newDay.date);
            if (dayIndex !== -1) {
              // Merge events into existing day
              const existingDay = updatedDays[dayIndex];
              const newEvents = Array.isArray(newDay.events) ? newDay.events : [];
              
              newEvents.forEach((newEv: any) => {
                if (!existingDay.events.find(e => e.title === newEv.title)) {
                  existingDay.events.push(newEv);
                }
              });
            } else {
              // Add new day
              updatedDays.push(newDay);
            }
          });
        }

        nextLogs[existingIndex] = {
          ...log,
          ...update,
          summary: update.summary || log.summary || "战况已由沉思者自动同步。",
          keywords: Array.isArray(update.keywords) ? update.keywords : (log.keywords || []),
          days: updatedDays.sort((a, b) => compareDates(a.date, b.date)),
          timestamp: update.timestamp || log.timestamp || Date.now()
        };
      } else {
        // Create new log
        nextLogs.push({
          id: update.id || `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          timestamp: update.timestamp || Date.now(),
          title: update.title || '新推演记录',
          summary: update.summary || "战况已由沉思者自动同步。",
          keywords: Array.isArray(update.keywords) ? update.keywords : [],
          date: update.date || getLatestDateFromHistory([{ content: text }]) || '未知日期',
          days: (update.days || []).sort((a: any, b: any) => compareDates(a.date, b.date)),
          npcUpdates: update.npcUpdates || []
        });
      }
    });

    return nextLogs.sort((a, b) => b.timestamp - a.timestamp);
  } catch (e) {
    console.error("Failed to parse campaign_log JSON", e);
    return currentLogs;
  }
};

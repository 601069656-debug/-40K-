import { KNOWLEDGE_BASE_DATA } from '../constants';
import { ShopItem } from '../types';

export const STATS_MAP: Record<string, any> = {};

export const SHOP_ITEMS: ShopItem[] = (() => {
  const items: ShopItem[] = [];
  const lines = KNOWLEDGE_BASE_DATA.split('\n');

  // Phase 1: Parse Stat Tables
  let statHeaders: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('> **') && trimmed.endsWith('**')) {
      statHeaders = [];
      continue;
    }
    if (trimmed.startsWith('> |') && !trimmed.includes(':---')) {
      const parts = trimmed.replace(/^>\s*\|/, '').split('|').map(p => p.trim()).filter(p => p !== '');
      if (parts[0] === '名称' || parts[0].includes('名称')) {
        statHeaders = parts;
        continue;
      }
      if (statHeaders.length > 0 && parts.length >= statHeaders.length && !parts[0].includes('---')) {
        const name = parts[0];
        const stats: any = {};
        for (let i = 1; i < statHeaders.length; i++) {
          const header = statHeaders[i];
          const val = parts[i];
          if (header.includes('平台') || header.includes('持有者') || header.includes('穿戴者') || header.includes('携带者')) stats.wearer = val;
          else if (header.includes('力量')) stats.power = val;
          else if (header.includes('AP') || header.includes('破甲值')) stats.ap = val;
          else if (header.includes('AR') || header.includes('护甲值')) stats.ar = val;
          else if (header.includes('伤害')) stats.damage = val;
          else if (header.includes('坚韧加成')) stats.toughness = val;
          else if (header.includes('耐久值') || header.includes('HP') || header.includes('AHP') || header.includes('护甲耐久')) stats.hp = val;
          else if (header.includes('备注')) stats.desc = val;
          else if (header.includes('属性修正')) stats.mod = val;
          else if (header.includes('效果') || header.includes('描述')) stats.desc = val;
          else if (header.includes('类型')) stats.type = val;
          else if (header.includes('弹容量')) stats.capacity = val;
          else if (header.includes('连射')) stats.rateOfFire = val;
        }
        STATS_MAP[name] = stats;

        // Parse composite modes if present
        if (stats.desc && (stats.desc.includes('[复合]') || stats.desc.includes('[Combined]'))) {
          const modes: any[] = [];
          
          // Try to parse format: 近战:+25/8/+15；内置双联装爆弹:S:55 AP:4 D:10
          const meleeMatch = stats.desc.match(/近战[:：]?\s*([^；;]*)/);
          const rangeMatch = stats.desc.match(/(?:远程|内置|射击)[:：]?\s*([^；;]*)/);
          
          if (meleeMatch) {
            const mParts = meleeMatch[1].split('/');
            let mPower = mParts[0]?.trim();
            let mAp = undefined;
            let mDamage = undefined;
            if (mParts.length === 3) {
              mPower = mParts[0]?.trim();
              mAp = mParts[1]?.trim();
              mDamage = mParts[2]?.trim();
            } else if (mParts.length === 2) {
              mPower = mParts[0]?.trim();
              mDamage = mParts[1]?.trim();
            }
            modes.push({
              name: '近战 (Melee)',
              stats: {
                ...stats,
                power: mPower,
                ap: mAp || stats.ap,
                damage: mDamage || stats.damage,
                type: 'Melee'
              }
            });
          }
          
          if (rangeMatch) {
            const rStats: any = { type: 'Ranged' };
            const rText = rangeMatch[1];
            const sMatch = rText.match(/S[:：]?\s*(\d+)/i);
            const apMatch = rText.match(/AP[:：]?\s*(-?\d+)/i);
            const dMatch = rText.match(/D[:：]?\s*(\d+)/i);
            if (sMatch) rStats.power = sMatch[1];
            if (apMatch) rStats.ap = apMatch[1];
            if (dMatch) rStats.damage = dMatch[1];
            
            modes.push({
              name: '远程 (Ranged)',
              stats: rStats
            });
          }
          
          if (modes.length > 0) {
            stats.modes = modes;
          }
        }
      }
    }
  }

  // Phase 2: Parse Price Tables and link stats
  let currentLevel = 0;
  let currentCategory = '';
  let priceHeaders: string[] = [];

  for (const line of lines) {
    if (line.includes('第一等级')) currentLevel = 1;
    else if (line.includes('第二等级')) currentLevel = 2;
    else if (line.includes('第三等级')) currentLevel = 3;

    if (line.startsWith('#### ') || line.startsWith('####')) {
      currentCategory = line.replace(/####\s*/, '').trim();
      priceHeaders = [];
    }

    if (line.includes('|') && !line.includes(':---') && !line.startsWith('>')) {
      const parts = line.replace(/^\s*[#]*\s*\|/, '').split('|').map(p => p.trim()).filter(p => p !== '');
      if (parts[0] === '名称' || parts[0].includes('名称')) {
        // Confirm it's actually a price table by checking remaining headers
        const isPriceTable = parts.some(p => p.includes('王座币') || p.includes('信用点') || p.includes('征用点') || p.includes('灵魂') || p.includes('奴隶'));
        if (isPriceTable) {
           priceHeaders = parts;
        } else {
           priceHeaders = []; // Not a price table, ignore subsequent rows
        }
        continue;
      }
      
      if (priceHeaders.length > 0 && parts.length === priceHeaders.length && currentLevel > 0 && !parts[0].includes('---')) {
        const name = parts[0];
        const stats = STATS_MAP[name] || {};
        
        let normalizedCategory = currentCategory;
        if (currentCategory === '禁军装备') {
          if (name === '守护者之矛') normalizedCategory = '近战武器';
          else if (name === '铁心盾牌' || name === '帝国荣光披风' || name === '禁军动力甲(Mk IV)') normalizedCategory = '护甲';
          else if (name === '禁卫颅骨(战术辅助/扫描)') normalizedCategory = '工具与设备';
          else if (name === '禁卫卫队圣典') normalizedCategory = '通讯与战术';
        } else if (currentCategory === '生存与环境适应' || currentCategory === '生存与陷阱') {
          normalizedCategory = '生存与环境';
        } else if (currentCategory === '通讯与战术辅助') {
          normalizedCategory = '通讯与战术';
        } else if (currentCategory === '食物') {
          normalizedCategory = '食物与饮水';
        } else if (currentCategory === '灵能物品') {
          if (name === '灵能兜帽' || name === '控能兜帽') normalizedCategory = '护甲';
          else if (name === '零能法杖') normalizedCategory = '近战武器';
          else normalizedCategory = '工具与设备';
        }

        const item: any = {
           id: `item_${currentLevel}_${items.length}`,
           name: name,
           level: currentLevel,
           category: normalizedCategory,
           costs: {},
           desc: stats.desc || `第${currentLevel}级 ${normalizedCategory}`,
           description: stats.desc || `第${currentLevel}级 ${normalizedCategory}`,
           stats: stats,
           modes: stats.modes // Link modes if they exist
        };
        
        for (let i = 1; i < priceHeaders.length; i++) {
          let costStr = parts[i].trim();
          if (costStr === '—' || costStr === '-' || costStr === '无') continue;
          
          costStr = costStr.replace(/[^\d.]/g, '');
          const costVal = parseFloat(costStr);
          
          if (!isNaN(costVal)) {
            const header = priceHeaders[i];
            if (header.includes('王座币')) item.costs.throne = costVal;
            else if (header.includes('信用点')) item.costs.credits = costVal;
            else if (header.includes('征用点')) item.costs.requisition = costVal;
            else if (header.includes('灵魂')) item.costs.souls = costVal;
            else if (header.includes('奴隶')) item.costs.slaves = costVal;
          }
        }
        
        // Auto-synthesize thrones and credits for characters relying on them
        // 1 requisition ~ 100 thrones ~ 500 credits? No, 1 credit = 5 thrones from earlier (20 throne = 4 credit). So 100 throne = 20 credit.
        if (item.costs.throne === undefined && item.costs.credits === undefined) {
           if (item.costs.requisition !== undefined) {
               item.costs.throne = item.costs.requisition * 100;
               item.costs.credits = item.costs.requisition * 20;
           } else if (item.costs.souls !== undefined) {
               // For Chaos/Xenos items lacking even requisition
               item.costs.throne = item.costs.souls * 400; 
               item.costs.credits = item.costs.souls * 80;
           } else if (item.costs.slaves !== undefined) {
               item.costs.throne = item.costs.slaves * 200;
               item.costs.credits = item.costs.slaves * 40;
           }
        }

        items.push(item);
      }
    }
  }
  return items;
})();

export const getBaseItemName = (name: string): string => {
  // Strip both (xN) count and (EnglishName) flavor suffixes
  return name.replace(/\s*\(x\d+\)$/, '').replace(/\s*\([^)]+\)$/, '').trim();
};

export const getItemCount = (name: string): number => {
  const match = name.match(/\(x(\d+)\)$/);
  return match ? parseInt(match[1], 10) : 1;
};

export const parseStoredItem = (nameString: string, syntheticItems?: ShopItem[]): (ShopItem & { count: number }) | null => {
  if (!nameString) return null;
  const countMatch = nameString.match(/^(.*?)\s*\(x(\d+)\)$/);
  let name = countMatch ? countMatch[1].trim() : nameString.trim();
  const count = countMatch ? parseInt(countMatch[2], 10) : 1;
  
  // Also strip English flavor if present: "Item Name (English)" -> "Item Name"
  const baseName = name.replace(/\s*[(（].*?[)）]$/, '').trim();
  
  let item = SHOP_ITEMS.find(i => i.name === baseName || i.name === name);
  
  if (!item && syntheticItems) {
    item = syntheticItems.find(i => i.name === baseName || i.name === name);
  }

  // Fallback: parse stats from name if explicitly provided in common pattern: Name (S:x AP:y D:z)
  if (!item && (name.includes('S:') || name.includes('AP:') || name.includes('AR:'))) {
    const sMatch = name.match(/S[:：]\s*(\d+)/i);
    const apMatch = name.match(/AP[:：]\s*(\d+)/i);
    const dMatch = name.match(/D[:：]\s*(\d+)/i);
    const arMatch = name.match(/AR[:：]\s*(\d+)/i);
    const capMatch = name.match(/CAP[:：]\s*(\d+)/i);
    const rofMatch = name.match(/ROF[:：]\s*([a-zA-Z0-9]+)/i);

    item = {
      id: `custom_parsed_${name}`,
      name: baseName,
      level: 0,
      category: arMatch ? '护甲装备' : '自创武器',
      costs: {},
      desc: '自创装备 (Parsed Stats)',
      description: '自创装备解析记录',
      stats: {
        power: sMatch ? sMatch[1] : undefined,
        ap: apMatch ? apMatch[1] : undefined,
        damage: dMatch ? dMatch[1] : (arMatch ? undefined : '0'),
        ar: arMatch ? arMatch[1] : undefined,
        capacity: capMatch ? capMatch[1] : undefined,
        rateOfFire: rofMatch ? rofMatch[1] : undefined
      }
    };
  }

  if (!item && (STATS_MAP[baseName] || STATS_MAP[name])) {
    const stats = STATS_MAP[baseName] || STATS_MAP[name];
    item = {
      id: `synthetic_${baseName}`,
      name: baseName,
      level: 0,
      category: 'Uncategorized',
      costs: {},
      desc: stats.desc || '',
      description: stats.desc || '',
      stats: stats
    };
  }

  if (!item) {
    if (name) {
      item = {
        id: `custom_${name}`,
        name,
        level: 0,
        category: '自创装备',
        costs: {},
        desc: '自定义装备',
        description: '自定义装备记录',
        stats: { desc: '自定义装备' }
      };
    } else {
      return null;
    }
  }
  
  return { ...item, count };
};

export const getItemByName = (name: string, syntheticItems?: ShopItem[]): ShopItem | undefined => {
  const trimmedName = name.trim();
  const baseName = trimmedName.replace(/\s*\([^)]+\)$/, '').trim();

  const shopItem = SHOP_ITEMS.find(i => i.name === baseName || i.name === trimmedName);
  if (shopItem) return shopItem;
  
  if (syntheticItems) {
    const synItem = syntheticItems.find(i => i.name === baseName || i.name === trimmedName);
    if (synItem) return synItem;
  }

  // Fallback: parse stats from name if explicitly provided in common pattern: Name (S:x AP:y D:z)
  if (trimmedName.includes('S:') || trimmedName.includes('AP:') || trimmedName.includes('AR:')) {
    const sMatch = trimmedName.match(/S[:：]\s*(\d+)/i);
    const apMatch = trimmedName.match(/AP[:：]\s*(\d+)/i);
    const dMatch = trimmedName.match(/D[:：]\s*(\d+)/i);
    const arMatch = trimmedName.match(/AR[:：]\s*(\d+)/i);
    const capMatch = trimmedName.match(/CAP[:：]\s*(\d+)/i);
    const rofMatch = trimmedName.match(/ROF[:：]\s*([a-zA-Z0-9]+)/i);

    return {
      id: `custom_parsed_${trimmedName}`,
      name: baseName,
      level: 0,
      category: arMatch ? '护甲装备' : '自创武器',
      costs: {},
      desc: '自创装备 (Parsed Stats)',
      description: '自创装备解析记录',
      stats: {
        power: sMatch ? sMatch[1] : undefined,
        ap: apMatch ? apMatch[1] : undefined,
        damage: dMatch ? dMatch[1] : (arMatch ? undefined : '0'),
        ar: arMatch ? arMatch[1] : undefined,
        capacity: capMatch ? capMatch[1] : undefined,
        rateOfFire: rofMatch ? rofMatch[1] : undefined
      }
    };
  }

  const foundStats = STATS_MAP[baseName] || STATS_MAP[trimmedName];
  if (foundStats) {
    return {
      id: `synthetic_${baseName}`,
      name: baseName,
      level: 0,
      category: 'Uncategorized',
      costs: {},
      desc: foundStats.desc || '',
      description: foundStats.desc || '',
      stats: foundStats
    };
  }
  
  if (name) {
     return {
        id: `custom_${name}`,
        name,
        level: 0,
        category: '自创装备',
        costs: {},
        desc: '自定义装备',
        description: '自定义装备记录',
        stats: { desc: '自定义装备' }
      };
  }
  
  return undefined;
};

export const canCharacterUseItem = (character: any, item: ShopItem): boolean => {
  if (item.name.includes('圣盾型')) {
    console.log('[ArmoryStart] canCharacterUseItem called for', item.name);
  }

  const wearer = item.stats?.wearer;
  
  // 0. Base variables
  const faction = character.faction || '';
  const subFaction = character.subFaction || '';
  const lineage = character.lineage || '';
  const socialIdentity = character.socialIdentity || '';
  const traits = character.traits || [];
  const skills = character.skills || [];
  const charLevel = character.level || 1;
  
  const hasTrait = (name: string) => traits.some((t: any) => t.name && t.name.includes(name));
  const hasSkill = (name: string) => skills.some((s: any) => s.name && s.name.includes(name));

  // Determine faction keywords across all possible fields to handle incomplete character structures
  const allCharDocs = [faction, subFaction, lineage, socialIdentity].filter(Boolean).join(' ');
  const isRogueTrader = allCharDocs.includes('行商浪人');
  const isInquisitionChar = allCharDocs.includes('审判') || allCharDocs.includes('星际战士监视者');

  // Hard-coded check for specialized factions that are inherently Psykers
  const isInherentlyPsyker = allCharDocs.includes('灰骑士') || allCharDocs.includes('千子') || allCharDocs.includes('智库');

  // 0.5 Psyker Tech Check
  const isPsykerItem = item.name.includes('灵能') || (item.stats?.desc && (item.stats.desc.includes('需要灵能') || item.stats.desc.includes('灵能者限定')));
  const isPsykerOnly = isPsykerItem && !item.name.includes('反灵能');
  if (isPsykerOnly) {
    const isPsykerCharacter = isInherentlyPsyker || hasSkill('灵能天赋') || hasTrait('灵能者') || hasSkill('灵能') || hasSkill('灵能学派') || allCharDocs.includes('灵能') || allCharDocs.includes('异能');
    if (!isPsykerCharacter) {
      if (item.name.includes('圣盾型')) console.log('[Armory] Returning false due to lack of Psyker identity');
      return false;
    }
  }
  
  // Fallback: Infer wearer tags from description if not explicitly set
  // Allow robust parenthetical split (e.g. "太空死灵（行商浪人, 审判官）" -> "太空死灵", "行商浪人", "审判官")
  let wearerTags: string[] = [];
  if (wearer && !wearer.includes('所有派系') && !wearer.includes('通用')) {
    wearerTags = wearer.split(/[,，/（）()]/).map((s: string) => s.trim()).filter(Boolean);
  } else if (!wearer && item.stats?.desc) {
    const desc = item.stats.desc;
    const inferredTags: string[] = [];
    ['死亡守卫', '纳垢', '恐虐', '奸奇', '色孽', '帝皇之子', '噪音战士', '星际战士', '刺客庭', '审判庭', '机械教', '帝国卫队', '圣血天使', '星界军', '克里格', '卡迪亚', '阿米吉多顿', '灰骑士', '死亡守望', '极限战士', '暗黑天使', '太空野狼', '帝国之拳', '钢铁之手', '火蜥蜴', '暗鸦守卫', '白色疤痕', '湮灭者', '噬人鲨', '火鹰', '鸦翼黑骑士', '千子', '吞世者', '怀言者', '午夜领主', '钢铁勇士', '阿尔法军团', '禁军', '寂静修女会'].forEach(kw => {
      if (desc.includes(kw)) inferredTags.push(kw);
    });
    if (inferredTags.length > 0) {
      wearerTags = inferredTags;
    }
  }

  // 1. Mk X 动力甲与原铸设备特殊校验 (Primaris Only)
  const isMkX = item.name.includes('Mk X') || (item.stats?.desc && item.stats.desc.includes('原铸改造')) || wearerTags.some(t => t.includes('原铸'));
  if (isMkX) {
    if (!hasSkill('原铸改造') && !hasTrait('原铸改造')) return false;
  }

  // 2. Technical Gear Restriction (Servo-arms, Mech-dentrites)
  const isTechGear = item.name.includes('伺服') || item.name.includes('机械臂') || item.name.includes('机灵');
  if (isTechGear) {
    if (!hasSkill('技术') && !hasSkill('机械') && !faction.includes('机械教') && !allCharDocs.includes('机械')) return false;
  }

  // 3. Chaos/Xenos Exclusive Tech Check
  const CHAOS_KEYWORDS = ['混沌', '恐虐', '奸奇', '纳垢', '色孽', '亚空间', '叛教', '邪教', '怀言者', '帝皇之子', '黑色军团', '噪音战士', '午夜领主', '钢铁勇士', '阿尔法军团'];
  const XENOS_KEYWORDS = ['异形', '死灵', '钛', '灵族', '兽人', '星神', '恐暴', '泰伦'];
  
  const isChaosChar = CHAOS_KEYWORDS.some(kw => faction?.includes(kw) || subFaction?.includes(kw)) || character.alignment === '混沌';
  
  const hasImperialTags = wearerTags.some(t => !CHAOS_KEYWORDS.some(kw => t.includes(kw)) && !XENOS_KEYWORDS.some(kw => t.includes(kw)));
  const hasChaosTags = wearerTags.some(t => CHAOS_KEYWORDS.some(kw => t.includes(kw)));
  const hasXenosTags = wearerTags.some(t => XENOS_KEYWORDS.some(kw => t.includes(kw)));

  const isChaosExclusive = hasChaosTags && !hasImperialTags;
  const isXenosExclusive = hasXenosTags && !hasImperialTags;

  // Restriction: Exclusive items are locked
  if (isChaosExclusive && !isChaosChar) return false;
  if (isXenosExclusive) {
    if (isRogueTrader || isInquisitionChar || faction === '行商浪人' || faction === '审判庭' || subFaction?.includes('行商浪人') || subFaction?.includes('审判')) {
       // Permitted
    } else if (hasTrait('异形科技') || hasSkill('禁忌知识·异形') || hasTrait('禁忌知识·异形')) {
       // Permitted
    } else {
       return false;
    }
  }

  // 3.5 派系专属与绝对排他逻辑 (Faction Exclusivity & Hard Lock)
  // 识别该装备是否属于某个特定的精锐或异形派系
  const EXCLUSIVE_FACTIONS = [
    '灰骑士', '禁军', '死亡守卫', '吞世者', '千子', '帝皇之子', '寂静修女', '刺客庭', '死翼', '内环伴客', 
    '圣血天使', '死亡守望', '太空野狼', '暗黑天使', '帝国之拳', '钢铁之手', '火蜥蜴', '暗鸦守卫', '白色疤痕',
    '灵族', '死灵', '钛族', '兽人', '泰伦'
  ];
  
  // 如果装备的穿戴者标签包含上述任何一个派系，它就被视为“专属装备”
  const isExclusiveItem = wearerTags.some(t => EXCLUSIVE_FACTIONS.some(ef => t.includes(ef)));

  const factionMatch = wearerTags.some(tag => {
    // 基础字符串匹配：检查角色所有身份文档中是否包含该标签（对齐“灰骑士”等关键词）
    if (allCharDocs.includes(tag)) return true;
    
    // 深度字段匹配
    if (tag === faction || tag === subFaction || tag === lineage || tag === socialIdentity) return true;
    if (subFaction && (subFaction.includes(tag) || tag.includes(subFaction)) && subFaction.length >= 2) return true;
    if (faction && (faction.includes(tag) || tag.includes(faction)) && faction.length >= 2) return true;
    if (lineage && (lineage.includes(tag) || tag.includes(lineage)) && lineage.length >= 2) return true;
    if (socialIdentity && (socialIdentity.includes(tag) || tag.includes(socialIdentity)) && socialIdentity.length >= 2) return true;
    
    // 多词素模糊匹配分析（例如：确保字符携带'灰骑士'子字段能成功激活'灰骑士老兵'、'灰骑士拦截者'专属设备）
    const docWords = allCharDocs.split(' ').map(w => w.trim()).filter(Boolean);
    if (docWords.some(word => (tag.includes(word) || word.includes(tag)) && word.length >= 2)) return true;

    // 审判官特例：仅当标签本身就是“审判庭”时才匹配
    if (isInquisitionChar && (tag === '审判' || tag === '审判庭')) return true;

    return false;
  });

  // 【核心拦截】派系专属装备硬锁
  if (isExclusiveItem) {
    if (factionMatch) {
      if (item.name.includes('圣盾型')) console.log('[Armory] Faction Match SUCCESS for exclusive item:', item.name);
      return true; // 只要派系匹配，直接放行，不受后续等级或权限逻辑干扰
    } else {
      if (item.name.includes('圣盾型')) console.log('[Armory] Faction Match FAILED for exclusive item:', item.name);
      return false; // 不是该派系的，哪怕是审判官也别想买
    }
  }

  const ELITE_FACTIONS = [
    '星际战士', '混沌星际战士', '阿斯塔特', '原铸', '灰骑士', '死亡守望', '终结者', '湮灭者', '噬人鲨', '火鹰', '鸦翼黑骑士',
    '极限战士', '圣血天使', '暗黑天使', '太空野狼', '帝国之拳', '钢铁之手', '火蜥蜴', '暗鸦守卫', '白色疤痕', '死翼',
    '黑色军团', '死亡守卫', '吞世者', '千子', '帝皇之子', '怀言者', '午夜领主', '钢铁勇士', '阿尔法军团', '内环伴客',
    '噪音战士', '瘟疫战士', '红字', '狂战士',
    '刺客庭', '文迪卡', '卡利都斯', '艾弗森', '库勒克斯',
    '禁军', '寂静修女会', '星际通信厅'
  ];
  const isAssassinChar = faction.includes('刺客庭') || subFaction.includes('刺客') || character.socialIdentity?.includes('刺客') || allCharDocs.includes('刺客');
  const isCustodesChar = faction.includes('禁军') || lineage.includes('禁军') || allCharDocs.includes('禁军');
  const isSilenceChar = faction.includes('寂静修女') || lineage.includes('寂静修女') || allCharDocs.includes('寂静修女');
  const isTelepathicaChar = faction.includes('星际通信') || lineage.includes('星际通信') || allCharDocs.includes('星际通信');
  
  const isEliteItem = 
    wearerTags.some(t => ELITE_FACTIONS.some(kw => t.includes(kw))) ||
    ELITE_FACTIONS.some(kw => item.name.includes(kw)) ||
    (item.stats?.wearer && ELITE_FACTIONS.some(kw => item.stats?.wearer?.includes(kw)));

  const isEliteCharacter = 
    ELITE_FACTIONS.some(kw => 
      faction.includes(kw) || 
      subFaction.includes(kw) || 
      (lineage && lineage.includes(kw)) ||
      (socialIdentity && socialIdentity.includes(kw)) ||
      allCharDocs.includes(kw)
    ) ||
    hasTrait('死亡天使') || 
    hasTrait('原铸改造') || 
    hasSkill('死亡天使') || 
    hasSkill('原铸改造') ||
    isAssassinChar ||
    isCustodesChar ||
    isSilenceChar ||
    isTelepathicaChar ||
    allCharDocs.includes('阿斯塔特');

  if (isEliteItem && !isEliteCharacter) {
    // If not an elite character, they can ONLY use elite items if they have an absolute faction match (e.g. Rogue Trader using specialized Rogue Trader gear)
    if (!factionMatch) return false;
  }

  // Handle global/empty tags AFTER mandatory restriction checks
  if (wearerTags.length === 0 || (wearer && (wearer.includes('所有派系') || wearer.includes('通用')))) {
    // Level restriction: regular players can't see Level 4/5 items unless they have specific traits or are very high level
    if (item.level >= 4 && charLevel < 10) return false;
    return true;
  }

  // 4. Specialized Faction Logic (Assassin, Inquisition, etc.)
  const isSistersChar = faction.includes('修女') || faction.includes('圣女') || allCharDocs.includes('修女');
  const isAstartesChar = faction.includes('星际战士') || faction.includes('阿斯塔特') || allCharDocs.includes('阿斯塔特');

  // Assassins use specialized or ultra-light gear
  if (isAssassinChar) {
    const isAssassinItem = wearerTags.some(t => t.includes('刺客庭') || t.includes('刺客'));
    const agiBonusStr = item.stats?.mod || '';
    const isLightGear = !agiBonusStr.includes('敏捷-');
    if (isAssassinItem) return true;
    
    // Professionals don't use heavy armor or standard military rifles unless they are assassin-specific
    const toughnessBonusStr = item.stats?.toughness || '';
    const toughnessBonus = parseInt(toughnessBonusStr.replace(/[^0-9]/g, '')) || 0;
    if (item.category.includes('护甲') && toughnessBonus > 15) return false;
    
    if (['远程武器', '近战武器'].some(cat => item.category.includes(cat))) {
       const isUniversalSidearm = item.name.includes('手枪') || item.name.includes('匕首') || item.name.includes('短剑');
       if (!isAssassinItem && !isUniversalSidearm) return false;
    }
  }

  // 5. Standard Faction Match
  if (factionMatch) {
    if (item.name.includes('圣盾型')) console.log('[ArmoryDebug] factionMatch true for', item.name);
    return true;
  } else {
    if (item.name.includes('圣盾型')) console.log('[ArmoryDebug] factionMatch false for', item.name, 'wearerTags:', wearerTags.join(','), 'char:', allCharDocs);
  }


  // Off-faction gear is generally fine for Level 1 and 2 (standard and civilian)
  // But Inquisition can use Level up to 3 for standard items as well
  if (item.level <= 2 || (isInquisitionChar && item.level <= 3)) return true;

  // High level off-faction gear restricted to Inquisition and Rogue Traders
  // Even they cannot buy items meant explicitly for strictlyLocked factions (checked above). 
  if (faction.includes('行商浪人') || faction.includes('审判庭') || isInquisitionChar || isRogueTrader) return true;

  // Unhandled edge cases fall back to false to be safe against power creep
  return false;
};

export const calculateArmorHp = (equipment: string[] = []): number => {
  return equipment.reduce((sum, itemName) => {
    // Strip parentheticals when searching STATS_MAP e.g. "爆弹枪(精工)"
    const baseName = itemName.replace(/\(.*?\)/g, '').replace(/（.*?）/g, '').trim();
    const item = STATS_MAP[itemName] || STATS_MAP[baseName];
    if (item && item.hp) {
      const hpVal = parseInt(item.hp.split('/')[0]) || 0;
      return sum + hpVal;
    }
    return sum;
  }, 0);
};

export const calculateArmorRating = (equipment: string[] = []): number => {
  return equipment.reduce((sum, itemName) => {
    const baseName = itemName.replace(/\(.*?\)/g, '').replace(/（.*?）/g, '').trim();
    const item = STATS_MAP[itemName] || STATS_MAP[baseName];
    if (item && item.ar) {
      const arVal = parseInt(item.ar) || 0;
      return sum + arVal;
    }
    return sum;
  }, 0);
};

/**
 * Calculates attribute modifiers based on character state, equipment, and traits.
 * Ported from CharacterSheet.tsx to be reusable for prompt generation.
 */
export const calculateAttributeModifiers = (character: any) => {
  const mods = { 
    weaponSkill: 0, ballisticSkill: 0, strength: 0, toughness: 0, 
    agility: 0, intelligence: 0, perception: 0, willpower: 0, fellowship: 0 
  };

  if (!character) return mods;

  // 1. Equipment & Items
  const allGear = [...(character.equipment || []), ...(character.items || [])];
  allGear.forEach(itemName => {
    if (!itemName) return;
    const baseName = itemName.replace(/\(.*?\)/g, '').replace(/（.*?）/g, '').trim();
    const item = STATS_MAP[itemName] || STATS_MAP[baseName];
    
    if (item) {
      if (item.toughness) {
        const tVal = parseInt(String(item.toughness).replace(/[+]/g, ''));
        if (!isNaN(tVal)) mods.toughness += tVal;
      }
      if (item.mod) {
        const modStr = String(item.mod);
        const modParts = modStr.split(/[,，]/);
        modParts.forEach(part => {
          const p = part.trim();
          const match = p.match(/(武器技能|射击技能|力量|坚韧|敏捷|智力|感知|意志力|意志|社交能力|社交|交际|WS|BS|S|T|Ag|Int|Per|WP|Fel)\s*(?:\([a-zA-Z/]+\))?\s*([+-]\d+)/);
          if (match) {
            const label = match[1];
            const val = parseInt(match[2]);
            if (label === '力量' || label === 'S') mods.strength += val;
            else if (label === '感知' || label === 'Per') mods.perception += val;
            else if (label === '意志' || label === '意志力' || label === 'WP') mods.willpower += val;
            else if (label === '敏捷' || label === 'Ag') mods.agility += val;
            else if (label === '智力' || label === 'Int') mods.intelligence += val;
            else if (label === '社交' || label === '交际' || label === '社交能力' || label === 'Fel') mods.fellowship += val;
            else if (label === '武器技能' || label === 'WS') mods.weaponSkill += val;
            else if (label === '射击技能' || label === '射击' || label === 'BS' || label === '步兵枪法') mods.ballisticSkill += val;
            else if (label === '坚韧' || label === 'T') mods.toughness += val;
          }
        });
      }
    }
  });

  // 2. Skills
  (character.skills || []).forEach((skill: any) => {
    if (!skill) return;
    const level = skill.level || 1;
    if (skill.name === '混沌赐福') {
      mods.strength += 5 * level;
      mods.toughness += 5 * level;
      mods.willpower += 5 * level;
    } else if (skill.name === '战斗训练') {
      mods.weaponSkill += 5 * level;
      mods.ballisticSkill += 5 * level;
    } else if (skill.name === '神圣狂热') {
      mods.willpower += 10 * level;
    } else if (skill.name === '帝皇禁卫') {
      mods.strength += 5 * level;
      mods.toughness += 5 * level;
      mods.weaponSkill += 5 * level;
    }
  });

  // 3. Chaos Blessings
  if (character.chaosBlessing === '欢愉之躯') mods.agility += 15;
  else if (character.chaosBlessing === '奇想妙思') mods.intelligence += 20;
  else if (character.chaosBlessing === '肉体再生') mods.toughness += 10;
  else if (character.chaosBlessing === '混沌眷顾') { mods.perception += 10; mods.willpower += 10; }
  else if (character.chaosBlessing === '混沌印记') { mods.strength += 5; mods.toughness += 5; mods.agility += 5; mods.intelligence += 5; }

  // 4. Faith Level
  if (character.faithLevel) {
    const fl = character.faithLevel;
    if (fl >= 2) mods.willpower += 5;
    if (fl >= 3) mods.willpower += 5;
    if (fl >= 4) mods.willpower += 5;
    if (fl >= 5) {
      Object.keys(mods).forEach(k => {
        (mods as any)[k] += 10;
      });
    }
  }

  // 5. Corruption
  if (character.corruptionValue) {
    const cv = character.corruptionValue;
    if (cv >= 40 && cv <= 59) {
      mods.willpower -= 5;
      mods.fellowship -= 10;
    } else if (cv >= 100 && cv <= 149) {
      Object.keys(mods).forEach(k => (mods as any)[k] += 5);
    } else if (cv >= 150 && cv <= 199) {
      Object.keys(mods).forEach(k => (mods as any)[k] += 10);
    } else if (cv >= 200 && cv <= 249) {
      Object.keys(mods).forEach(k => (mods as any)[k] += 15);
    } else if (cv >= 250 && cv <= 299) {
      Object.keys(mods).forEach(k => (mods as any)[k] += 20);
    } else if (cv >= 300 && cv <= 349) {
      Object.keys(mods).forEach(k => (mods as any)[k] += 25);
    } else if (cv >= 350 && cv <= 399) {
      Object.keys(mods).forEach(k => (mods as any)[k] += 30);
    } else if (cv >= 400 && cv <= 449) {
      Object.keys(mods).forEach(k => (mods as any)[k] += 35);
    } else if (cv >= 450 && cv <= 499) {
      Object.keys(mods).forEach(k => (mods as any)[k] += 45);
    } else if (cv >= 500) {
      Object.keys(mods).forEach(k => (mods as any)[k] += 60);
    }
  }

  // 6. Traits
  (character.traits || []).forEach((t: any) => {
    const desc = t.desc || t.description || '';
    
    // Check for "All attributes +X" (所有属性/全属性 +X)
    const allAttrMatch = desc.match(/(?:所有属性|全属性)[^+-]*([+-]\d+)/);
    if (allAttrMatch) {
      const val = parseInt(allAttrMatch[1]);
      if (!isNaN(val)) {
        Object.keys(mods).forEach(k => (mods as any)[k] += val);
      }
    }

    const attrRegex = /(武器技能|射击技能|攻击技能|力量|坚韧|敏捷|智力|感知|意志力|意志|社交能力|社交|交际|WS|BS|S|T|Ag|Int|Per|WP|Fel)\s*(?:\([a-zA-Z/]+\))?\s*([+-]\d+)/g;
    let match;
    while ((match = attrRegex.exec(desc)) !== null) {
      let prefix = desc.slice(0, match.index);
      const lastPunc = Math.max(prefix.lastIndexOf('。'), prefix.lastIndexOf('；'), prefix.lastIndexOf('.'), prefix.lastIndexOf(';'));
      if (lastPunc !== -1) prefix = prefix.slice(lastPunc + 1);
      const isConditional = /时|对抗|视为|期间|若|当|针对|潜行|冲锋|射击|防御|驾驶|飞行|环境[中下]|状态[中下]|每次|受到|如果|次|每回合|每天|回合/.test(prefix);
      
      if (!isConditional) {
        const label = match[1];
        const val = parseInt(match[2]);
        if (label === '力量' || label === 'S') mods.strength += val;
        else if (label === '感知' || label === 'Per') mods.perception += val;
        else if (label === '意志' || label === '意志力' || label === 'WP') mods.willpower += val;
        else if (label === '敏捷' || label === 'Ag') mods.agility += val;
        else if (label === '智力' || label === 'Int') mods.intelligence += val;
        else if (label === '社交' || label === '交际' || label === '社交能力' || label === 'Fel') mods.fellowship += val;
        else if (label === '武器技能' || label === 'WS') mods.weaponSkill += val;
        else if (label === '射击技能' || label === '攻击技能' || label === 'BS') mods.ballisticSkill += val;
        else if (label === '坚韧' || label === 'T') mods.toughness += val;
      }
    }
    
    // Explicit fixed traits
    if (t.name === '鲜血狂怒' && !desc.includes('WS+5')) mods.weaponSkill += 5;
    else if (t.name === '腐败坚韧' && !desc.includes('坚韧+5')) mods.toughness += 5;
    else if (t.name === '极乐迅捷' && !desc.includes('敏捷+5')) mods.agility += 5;
  });

  return mods;
};


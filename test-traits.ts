import { readFileSync } from 'fs';

const INITIAL_SYSTEM_INSTRUCTION = readFileSync('./lib/knowledge/traits.ts', 'utf-8');

const TRAIT_CATALOG: Record<string, any> = (() => {
  const map: Record<string, any> = {};
  const lines = INITIAL_SYSTEM_INSTRUCTION.split('\n');
  let currentGroup = '';
  for (const line of lines) {
    if (line.includes('> **生物特质 (Traits)**')) currentGroup = '生物特质';
    else if (line.includes('> **')) currentGroup = '派系特质';

    if (line.includes('|') && !line.includes(':---') && !line.includes('特质名称') && !line.includes('单位名称') && !line.includes('战团名称')) {
      const cleanLine = line.replace(/^\s*>\s*/, '').trim();
      if (cleanLine.startsWith('|') && cleanLine.endsWith('|')) {
        const parts = cleanLine.split('|').map(p => p.trim()).filter((p, i, a) => (i > 0 && i < a.length - 1));
        
        if (parts.length >= 2) {
          let owner = '';
          let name = '';
          let desc = '';
          
          if (parts.length >= 3) {
            owner = parts[0];
            name = parts[1];
            desc = parts.slice(2).join(' | ').trim();
          } else {
            owner = currentGroup || '通用特质';
            name = parts[0];
            desc = parts[1];
          }

          if (owner && name && desc && owner !== '派系' && owner !== '事件' && !owner.includes('名称') && !owner.includes('类别') && !owner.includes('对应') && isNaN(Number(name)) && isNaN(Number(desc))) {
            const isWeaponStat = /\d+\s*\|\s*\d+/.test(desc);
            const isItem = (name.startsWith('[') && name.endsWith(']')) || parts.length > 3;
            
            if (!isWeaponStat && !isItem) {
              const grantedSkills: any[] = [];
              const grantedTraits: string[] = [];

              map[name.trim()] = {
                owner: owner.trim(),
                name: name.trim(),
                desc: desc.trim(),
                grantedSkills,
                grantedTraits
              };
            }
          }
        }
      }
    }
  }
  return map;
})();

const lineage = '星际通信厅';
const subFaction = '黑船联盟收割者';
const socialIdentity = '黑船幸存者';

const candidates = Object.values(TRAIT_CATALOG).filter(t => 
  t.owner === lineage || t.name === lineage ||
  t.owner === subFaction || t.name === subFaction ||
  t.owner === socialIdentity || t.name === socialIdentity
);

console.log(JSON.stringify(candidates, null, 2));


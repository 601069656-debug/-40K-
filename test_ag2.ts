import * as fs from 'fs';
import { INITIAL_SYSTEM_INSTRUCTION } from './constants';

const lines = INITIAL_SYSTEM_INSTRUCTION.split('\n');
const TRAIT_CATALOG: Record<string, any> = {};
let currentGroup = '';

lines.forEach((line) => {
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
              const grantedSkills: { name: string; selectable: boolean }[] = [];
              const grantedTraits: string[] = [];

              const skillRegex = /获得[「\[]([^」\]]+)[」\]]技能(（自选）)?/g;
              let match;
              while ((match = skillRegex.exec(desc)) !== null) {
                grantedSkills.push({
                  name: match[1],
                  selectable: !!match[2]
                });
              }

              const traitChunkRegex = /获得(.*?)(?:特质)/g;
              let tcMatch;
              while ((tcMatch = traitChunkRegex.exec(desc)) !== null) {
                const chunk = tcMatch[1];
                const bracketedItems = chunk.match(/[「\[](.*?)[」\]]/g);
                if (bracketedItems) {
                  bracketedItems.forEach(item => {
                    const tName = item.replace(/[「」\[\]]/g, '').replace(/-/g, '·').trim();
                    if (tName && !grantedTraits.includes(tName)) {
                      grantedTraits.push(tName);
                    }
                  });
                }
              }

              const tData = { owner, name, desc, grantedSkills, grantedTraits };
              if (name === '亚空间之眼') {
                if (!grantedSkills.some(s => s.name === '灵能天赋')) {
                  grantedSkills.push({ name: '灵能天赋', selectable: false });
                }
                if (!grantedSkills.some(s => s.name === '警觉')) {
                  grantedSkills.push({ name: '警觉', selectable: false });
                }
              }
              TRAIT_CATALOG[name] = tData;
            }
          }
        }
      }
    }
});

console.log(JSON.stringify(TRAIT_CATALOG['亚空间之眼'], null, 2));

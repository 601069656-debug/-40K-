import * as fs from 'fs';
import * as path from 'path';

const ARMOR_FILE = 'lib/knowledge/armor.ts';
const BESTIARY_DIR = 'lib/knowledge/bestiary';

interface ArmorData {
  name: string;
  ar: number;
  ahp: number;
  bonuses: Record<string, number>;
}

function parseArmorData(): Map<string, ArmorData> {
  const content = fs.readFileSync(ARMOR_FILE, 'utf-8');
  const armorRows: Map<string, ArmorData> = new Map();

  const rows = content.split('\n').filter(line => line.includes('|') && line.includes('>'));

  for (const row of rows) {
    const cells = row.replace(/^>\s*/, '').split('|').map(c => c.trim()).filter(c => c !== '');
    if (cells.length < 5) continue;
    if (cells[0] === '名称' || cells[0].includes('---')) continue;

    const name = cells[0];
    const ar = parseInt(cells[2].replace(/,/g, '')) || 0;
    const ahp = parseInt(cells[3].replace(/,/g, '')) || 0;
    const bonusesStr = cells[4] || '';
    
    if (isNaN(ar) || isNaN(ahp)) continue;
    
    const bonuses: Record<string, number> = {};
    const bonusMatches = bonusesStr.match(/([^\d\s\+-]+)([\+-]\d+)/g);
    if (bonusMatches) {
        bonusMatches.forEach(m => {
            const parts = m.match(/([^\d\s\+-]+)([\+-]\d+)/);
            if (parts) {
                const statName = parts[1].trim();
                const value = parseInt(parts[2]);
                const map: Record<string, string> = {
                    '力量': 'strength',
                    '坚韧': 'toughness',
                    '敏捷': 'agility',
                    '感知': 'perception',
                    '意志': 'willpower',
                    '社交': 'fellowship',
                    '智力': 'intelligence',
                    '武器技能': 'weaponSkill',
                    '射击技能': 'ballisticSkill',
                    '社交(Fel)': 'fellowship',
                    '敏捷(Ag)': 'agility',
                    '意志(WP)': 'willpower',
                    '交际': 'fellowship'
                };
                const engName = map[statName] || statName;
                if (engName) bonuses[engName] = value;
            }
        });
    }

    armorRows.set(name, { name, ar, ahp, bonuses });
  }
  return armorRows;
}

const ARMOR_MAP = parseArmorData();

function cleanWeaponStats(stats: string): string {
    if (!stats) return '';
    return stats.replace(/\s*\([^)]+\)/g, '').replace(/\[近战\] \/ \[远程\]/g, '').split(',').map(s => s.trim()).filter(s => s).join(', ');
}

function processFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const fullPath = path.resolve(filePath);
    const isVessel = fullPath.includes('vessels') || content.includes("'舰船'") || content.includes('"舰船"');
    const isVehicle = fullPath.includes('vehicles') || content.includes('无畏') || content.includes('机甲') || fullPath.includes('titans.ts') || content.includes('载具');

    const profileRegex = /(['"]?([a-zA-Z0-9_\-]+)['"]?):\s*{[\s\S]*?['"]?attributes['"]?:\s*{[\s\S]*?}[\s\S]*?}/g;
    
    content = content.replace(profileRegex, (match, idGroup, idVal) => {
        const id = idVal || idGroup;
        
        const equipMatch = match.match(/['"]?equipment['"]?:\s*['"]([^'"]+)['"]/);
        const equipment = equipMatch ? equipMatch[1] : '';

        // Determine effective equipment names to lookup
        let searchEquip = equipment;
        
        // Add aliases
        if (searchEquip.includes('禁卫型动力甲') || searchEquip.includes('禁卫总领动力甲')) {
             searchEquip += ', 金法钢动力甲';
        }
        if (searchEquip.includes('禁卫终结者甲')) {
             searchEquip += ', 阿拉路斯型终结者动力甲';
        }
        if (searchEquip.includes('灵骨甲') && !searchEquip.includes('灵族灵骨甲')) {
             searchEquip += ', 灵族灵骨甲';
        }
        if (searchEquip.includes('灵族斥候甲') && !searchEquip.includes('灵族斥候甲')) {
            // Already matches
        }

        let foundArmor: ArmorData | null = null;
        // Lookup armor
        for (const [armorName, data] of ARMOR_MAP) {
            if (searchEquip.includes(armorName)) {
                if (!foundArmor || armorName.length > foundArmor.name.length) {
                    foundArmor = data;
                }
            }
        }

        const ar = foundArmor ? foundArmor.ar : 0;
        let ahp = foundArmor ? foundArmor.ahp : 0;
        if (id.includes('lion')) console.log("Lion Armor:", foundArmor ? foundArmor.name : 'NONE', "AR:", ar, "AHP:", ahp);

        // Apply bonus attributes? ONLY IF ar was 0 before (meaning we hadn't processed it)
        const hasAr = match.match(/["']?armorRating["']?:\s*([0-9]+)/);
        const hasAhp = match.match(/["']?ahp["']?:\s*([0-9]+)/);

        const attrMatch = match.match(/['"]?attributes['"]?:\s*{([\s\S]*?)}/);
        const attrsStr = attrMatch ? attrMatch[1] : '';
        const attrs: Record<string, number> = {};
        attrsStr.split(',').forEach(line => {
            const parts = line.split(':');
            if (parts.length === 2) {
                const key = parts[0].trim().replace(/['"]/g, '');
                const val = parseInt(parts[1].trim());
                if (key && !isNaN(val)) attrs[key] = val;
            }
        });

        // If armor wasn't applied or was zero, apply bonus
        // Or actually, wait. Let's look at the original Aeldari attributes:
        // Strength: 30, Perception: 29. 灵族灵骨甲 gives Str+5, Per+15. So if they are 30/29, they wasn't applied!
        // To be safe, let's just re-apply if `armorRating: 0` or missing.
        let needsBonus = false;
        if (!hasAr || parseInt(hasAr[1]) === 0) {
             needsBonus = true;
        }

        if (needsBonus && foundArmor) {
            for (const [stat, bonus] of Object.entries(foundArmor.bonuses)) {
                if (attrs[stat] !== undefined) {
                    attrs[stat] += bonus;
                }
            }
        }

        // recalculate basic combat stats
        const s = attrs.strength || 1;
        const t = attrs.toughness || 1;
        const ag = attrs.agility || 1;

        const bmd = Math.max(0, Math.floor(s / 20));
        const movement = Math.max(1, Math.floor(ag / 10));
        let hp = Math.max(1, Math.floor(t / 5));

        if (isVessel) {
            let coefficient_val = 120;
            if (match.includes('护卫级')) coefficient_val = 120;
            if (match.includes('巡洋级')) coefficient_val = 200;
            if (match.includes('战列级')) coefficient_val = 250;
            if (match.includes('旗舰级')) coefficient_val = 500;
            if (match.includes('荣光级')) coefficient_val = 500;
            
            if (foundArmor && foundArmor.ahp > 1000) {
                 ahp = foundArmor.ahp;
            } else {
                 ahp = (t || 0) * (coefficient_val / 4);
            }
            hp = ahp;
        } else if (isVehicle) {
             if (foundArmor && foundArmor.ahp > 0) {
                 ahp = foundArmor.ahp;
             } else {
                 ahp = t; // fallback if no armor found
             }
        } else {
             // biological unit, ONLY use `armor.ts` ahp, do not invent.
             ahp = foundArmor ? foundArmor.ahp : 0;
        }

        let updatedMatch = match;
        
        // Clean weaponStats heavily
        updatedMatch = updatedMatch.replace(/["']?weaponStats["']?:\s*['"]([^'"]*)['"]/, (m, ws) => {
            return `"weaponStats": "${cleanWeaponStats(ws)}"`;
        });

        const newAttrsStr = Object.entries(attrs).map(([k, v]) => `      "${k}": ${v}`).join(', \n');
        updatedMatch = updatedMatch.replace(/['"]?attributes['"]?:\s*{[\s\S]*?}/, `"attributes": { \n${newAttrsStr} \n    }`);

        // Clean up any repeated quotes from previous mistakes
        updatedMatch = updatedMatch.replace(/"+hp/g, '"hp');
        updatedMatch = updatedMatch.replace(/"+maxHp/g, '"maxHp');
        updatedMatch = updatedMatch.replace(/"+ahp/g, '"ahp');
        updatedMatch = updatedMatch.replace(/"+movement/g, '"movement');
        updatedMatch = updatedMatch.replace(/"+armorRating/g, '"armorRating');
        updatedMatch = updatedMatch.replace(/"+baseMeleeDamage/g, '"baseMeleeDamage');
        
        updatedMatch = updatedMatch.replace(/(^|[^a-zA-Z])["']?hp["']?:\s*\d+/g, `$1"hp": ${hp}`);
        updatedMatch = updatedMatch.replace(/(^|[^a-zA-Z])["']?maxHp["']?:\s*\d+/g, `$1"maxHp": ${hp}`);
        updatedMatch = updatedMatch.replace(/(^|[^a-zA-Z])["']?movement["']?:\s*\d+/g, `$1"movement": ${movement}`);
        
        // Make sure baseMeleeDamage is there and correct
        if (updatedMatch.includes('baseMeleeDamage')) {
            updatedMatch = updatedMatch.replace(/(^|[^a-zA-Z])["']?baseMeleeDamage["']?:\s*['"][^'"]*['"]/g, `$1"baseMeleeDamage": "${bmd} (S/20)"`);
        } else {
            // Need to insert baseMeleeDamage
             updatedMatch = updatedMatch.replace(/"hp": \d+/, `"baseMeleeDamage": "${bmd} (S/20)",\n    "hp": ${hp}`);
        }

        // Deal with AHP and ArmorRating
        if (updatedMatch.match(/(^|[^a-zA-Z])["']?ahp["']?:\s*\d+/g)) {
             updatedMatch = updatedMatch.replace(/(^|[^a-zA-Z])["']?ahp["']?:\s*\d+/g, `$1"ahp": ${ahp}`);
        } else {
             updatedMatch = updatedMatch.replace(/"hp": \d+/, `"ahp": ${ahp}, "hp": ${hp}`);
        }
        
        if (updatedMatch.match(/(^|[^a-zA-Z])["']?armorRating["']?:\s*\d+/g)) {
             updatedMatch = updatedMatch.replace(/(^|[^a-zA-Z])["']?armorRating["']?:\s*\d+/g, `$1"armorRating": ${ar}`);
        } else {
             updatedMatch = updatedMatch.replace(/"ahp": \d+/, `"ahp": ${ahp}, "armorRating": ${ar}`);
        }

        // Run cleanup again to catch newly created double quotes
        updatedMatch = updatedMatch.replace(/"+hp/g, '"hp');
        updatedMatch = updatedMatch.replace(/"+maxHp/g, '"maxHp');
        updatedMatch = updatedMatch.replace(/"+ahp/g, '"ahp');
        updatedMatch = updatedMatch.replace(/"+movement/g, '"movement');
        updatedMatch = updatedMatch.replace(/"+armorRating/g, '"armorRating');
        updatedMatch = updatedMatch.replace(/"+baseMeleeDamage/g, '"baseMeleeDamage');

        return updatedMatch;
    });

    fs.writeFileSync(filePath, content);
}

function walkDir(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (file.endsWith('.ts')) {
             processFile(filePath);
        }
    }
}

walkDir(BESTIARY_DIR);
console.log('Fixed aliases and re-applied audit.');

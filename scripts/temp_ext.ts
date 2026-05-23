import fs from 'fs';

const weaponsText = fs.readFileSync('lib/knowledge/weapons.ts', 'utf-8');
const armorsText = fs.readFileSync('lib/knowledge/armor.ts', 'utf-8');

const parseNames = (text: string) => {
    const names = new Set<string>();
    const lines = text.split('\n');
    let inTable = false;
    let nameIndex = 1;
    for (const line of lines) {
        if (line.match(/\|\s*名称\)?\s*\|/)) {
            inTable = true;
            const parts = line.split('|');
            nameIndex = parts.findIndex(p => p.trim().includes('名称')) || 1;
            continue;
        }
        if (inTable && line.includes('| :---')) continue;
        if (inTable && !line.trim().startsWith('|') && !line.trim().startsWith('> |')) {
            inTable = false;
            continue;
        }
        if (inTable) {
            const parts = line.split('|');
            if (parts.length > nameIndex) {
                const name = parts[nameIndex].trim();
                if (name && name !== '名称' && !name.includes('---')) {
                    names.add(name);
                }
            }
        }
    }
    return Array.from(names);
};

const weapons = parseNames(weaponsText);
const armors = parseNames(armorsText);

fs.writeFileSync('temp_extracted.json', JSON.stringify({weapons, armors}, null, 2));

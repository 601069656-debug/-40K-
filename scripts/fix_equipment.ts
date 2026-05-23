import * as fs from 'fs';
import * as path from 'path';

// read raw strings
const weaponsText = fs.readFileSync('./lib/knowledge/weapons.ts', 'utf-8');
const armorsText = fs.readFileSync('./lib/knowledge/armor.ts', 'utf-8');
const itemsText = fs.readFileSync('./lib/knowledge/items.ts', 'utf-8');

const parseNames = (text: string) => {
    const names = new Set<string>();
    const lines = text.split('\n');
    let inTable = false;
    let nameIndex = 1;
    for (const line of lines) {
        // match | 名称 | ...
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

const wNames = parseNames(weaponsText);
const aNames = parseNames(armorsText);
const iNames = parseNames(itemsText);

const allValidNames = new Set([...wNames, ...aNames, ...iNames]);

console.log("Extracted", allValidNames.size, "valid items.");

// Now we need to scan all bestiary files
const getAllFiles = (dir: string): string[] => {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(filePath));
        } else if (filePath.endsWith('.ts') && !filePath.endsWith('index.ts')) {
            results.push(filePath);
        }
    }
    return results;
};

const bestiaryFiles = getAllFiles('./lib/knowledge/bestiary');
console.log("Found", bestiaryFiles.length, "bestiary files.");

let totalModifications = 0;

for (const file of bestiaryFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // We will parse the equipment string and weaponStats string using Regex
    // equipment: 'XXX, YYY, ZZZ',
    // weaponStats: 'XXX(S:1 D:2), YYY(S:1 D:2)'
    
    // We are going to replace standard misnomers according to the prompt
    // e.g. "XX型爆弹枪" => "爆弹枪" if "XX型爆弹枪" isn't in valid names
    
    // A function to find the closest valid name
    const findClosestName = (name: string, isWeaponStat: boolean = false) => {
        let n = name.trim();
        // Remove quantities like (x2) or modifiers
        n = n.replace(/\(x\d+\)/g, '').trim();
        n = n.replace(/（[^）]+）/g, '').trim();
            
        if (allValidNames.has(n)) return name.trim(); // perfectly valid
        
        // Exact substrings checks
        // We know standard base names
        const baseWeapons = [
            "精工阿斯塔特爆弹手枪", "圣物阿斯塔特爆弹手枪", "阿斯塔特爆弹手枪", "爆弹手枪",
            "精工阿斯塔特爆弹枪", "圣物阿斯塔特爆弹枪", "阿斯塔特爆弹枪", "爆弹枪", "爆弹卡宾枪", "爆弹步枪", 
            "风暴爆弹枪", "飓风爆弹枪", "重型爆弹枪", "重型爆弹步枪", "组合爆弹枪", "狙击爆弹枪", "消音爆弹枪",
            "阿斯塔特霰弹枪", "穿甲霰弹枪", "重型地狱火自动炮", "连发激光枪",
            "精工动力剑", "圣物动力剑", "动力剑", "动力大剑", "动力锤", "动力棍", "动力斧", "动力匕首",
            "精工阿斯塔特链锯斧", "阿斯塔特链锯斧", "链锯斧",
            "精工阿斯塔特链锯剑", "圣物阿斯塔特链锯剑", "阿斯塔特链锯剑", "链锯剑",
            "精工雷霆锤", "圣物雷霆锤", "雷霆锤", "雷霆之锤",
            "动力拳套", "精工动力拳套", "圣物动力拳套", "无畏型动力拳", "无畏型动力爪", 
            "能量爪", "双联动力爪", "近战动力爪",
            "等离子手枪", "精工Mk II“日怒”型等离子手枪", "Mk II“日怒”型等离子手枪", "等离子枪", "Mk.XII“狂怒”型等离子枪",
            "热熔手枪", "热熔枪", "多管热熔", "重型热熔步枪", 
            "火焰喷射器", "重型喷火器", "手持火焰枪",
            "灵能剑", "精工灵能剑", "圣物灵能剑", "灵能法杖", "精工灵能法杖", "圣物灵能法杖",
            "突击炮", "自动炮", "激光炮", "重型激光炮",
            "复合热熔枪", "电浆突击枪"
        ];
        
        const baseArmors = [
            "精工Mk X 战术型动力甲", "圣物Mk X 战术型动力甲", "Mk X 战术型动力甲",
            "精工Mk X 福波斯型动力甲", "Mk X 福波斯型动力甲",
            "精工Mk X 格拉维斯型动力甲", "Mk X 格拉维斯型动力甲",
            "精工MK VII 型动力甲", "圣物MK VII 型动力甲", "MK VII 型动力甲", 
            "Mk III 型动力甲", "Mk VI “鸦喙”型动力甲", "MK V 型动力甲", "MK IV 型动力甲",
            "精工不屈型战术无畏装甲", "圣物不屈型战术无畏装甲", "不屈型战术无畏装甲",
            "铁骑型战术无畏装甲", "冥府型战术无畏装甲", "泰塔罗斯型战术无畏装甲", 
            "混沌终结者护甲", "混沌动力甲", "圣物混沌动力甲",
            "战斗修女动力甲", "甲壳甲", "重型防弹甲", "防弹甲", "侦察兵复合板甲",
            "无畏机甲", "救赎者型无畏装甲", "利维坦型无畏装甲"
        ];
        
        const baseItems = [
            "阿斯塔特格斗刀", "暴风盾", "战术侦测设备", "碎片手雷", "穿甲手雷"
        ];

        // Replace any "动力装甲" with "动力甲"
        if (n.includes('动力装甲') && !n.includes('无畏装甲')) {
            n = n.replace('动力装甲', '动力甲');
        }

        // Try to match the largest sequence
        let bestMatch = '';
        
        const allChecks = [...baseArmors, ...baseWeapons, ...baseItems];
        for (const check of allChecks) {
            if (n.includes(check) || check.includes(n)) {
               bestMatch = check;
               break;
            }
        }
        
        // Custom fallbacks based on user complaining about specific things
        if (n.includes('游侠型爆弹枪')) return '爆弹枪';
        if (n.includes('消音型爆弹枪')) return '消音爆弹枪';
        if (n.includes('精工型爆弹枪')) return '精工阿斯塔特爆弹枪';
        if (n.includes('精工爆弹枪')) return '精工阿斯塔特爆弹枪';
        if (n.includes('动力装甲')) n = n.replace('动力装甲', '动力甲');
        if (n.includes('动力大剑')) return '动力剑';
        if (n.includes('近战动力爪')) return '无畏型动力爪';
        if (n.includes('雷霆之锤')) return '雷霆锤';
        if (n.includes('双联装暴风爆弹枪')) return '暴风爆弹枪';
        if (n.includes('星际战士侦察兵防弹甲')) return '侦察兵复合板甲';

        // Check if there is an exact end match
        if (bestMatch === '') {
            for (const valid of allValidNames) {
                if (n.endsWith(valid)) {
                    bestMatch = valid;
                    break;
                }
            }
        }
        
        // Let's do some common substitutions:
        // if user has X战团爆弹枪 => 爆弹枪
        if (!bestMatch) {
            if (n.endsWith('爆弹枪')) return '阿斯塔特爆弹枪';
            if (n.endsWith('爆弹手枪')) return '爆弹手枪';
            if (n.endsWith('动力剑')) return '动力剑';
            if (n.endsWith('链锯剑')) return '阿斯塔特链锯剑';
            if (n.endsWith('防弹甲')) return '防弹甲';
            if (n.endsWith('甲壳甲')) return '甲壳甲';
        }
        
        return bestMatch ? bestMatch : name;
    }

    // Equipment Regex
    const equipRegex = /equipment:\s*'([^']+)'/g;
    content = content.replace(equipRegex, (match, equipStr) => {
        const parts = equipStr.split(',').map(s => s.trim());
        const mappedParts = parts.map(p => {
             const cleaned = findClosestName(p);
             return cleaned;
        });
        const finalEquipStr = mappedParts.join(', ');
        if (finalEquipStr !== equipStr) {
            modified = true;
        }
        return `equipment: '${finalEquipStr}'`;
    });
    
    // WeaponStats Regex
    // Look for format like: name(S:xx D:xx)
    const wsRegex = /weaponStats:\s*'([^']+)'/g;
    content = content.replace(wsRegex, (match, wsStr) => {
        // split by '), '
        const weapons = wsStr.split(/\)(?:, |$)/).filter(s => s.trim());
        const mappedWeapons = weapons.map(wStr => {
            const bracketIndex = wStr.indexOf('(');
            if (bracketIndex !== -1) {
                const namePart = wStr.substring(0, bracketIndex).trim();
                const statsPart = wStr.substring(bracketIndex + 1);
                const cleanedName = findClosestName(namePart, true);
                return `${cleanedName}(${statsPart})`;
            }
            return wStr + ')'; // fallback 
        });
        const finalWsStr = mappedWeapons.join(', ');
        if (finalWsStr !== wsStr && finalWsStr !== wsStr + ')') {
            modified = true;
            return `weaponStats: '${finalWsStr}'`;
        }
        return match;
    });

    if (modified) {
        fs.writeFileSync(file, content, 'utf-8');
        totalModifications++;
    }
}

console.log(`Modified ${totalModifications} files.`);

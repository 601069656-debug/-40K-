import * as fs from 'fs';
import * as path from 'path';

function walkDir(dir: string, callback: (filePath: string) => void) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath, callback);
        } else if (fullPath.endsWith('.ts')) {
            callback(fullPath);
        }
    }
}

let totalFixed = 0;

walkDir('./lib/knowledge/bestiary', (filePath) => {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // We will find any "stat": -number pattern and cap it to 1
    content = content.replace(/(["']?(?:weaponSkill|ballisticSkill|strength|toughness|agility|intelligence|perception|willpower|fellowship)["']?\s*:\s*)(-\d+)/g, (match, prefix, valStr) => {
        const val = parseInt(valStr, 10);
        if (val < 0) {
            modified = true;
            return `${prefix}25`; // Replace negative with 25
        }
        return match;
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Fixed negative attributes in: ${filePath}`);
        totalFixed++;
    }
});

console.log(`Total files with fixed negative attributes: ${totalFixed}`);

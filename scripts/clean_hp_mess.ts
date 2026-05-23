import * as fs from 'fs';
import * as path from 'path';

const BESTIARY_DIR = 'lib/knowledge/bestiary';

function cleanMess(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    // Fix a"hp": \d+
    if (content.includes('a"hp":')) {
        content = content.replace(/a"hp":\s*\d+,?/g, '');
        changed = true;
    }
    // Fix ahp"hp"
    if (content.includes('ahp"hp"')) {
        content = content.replace(/ahp"hp":\s*\d+,?/g, '');
        changed = true;
    }
    // Fix a"ahp"
    if (content.includes('a"ahp"')) {
        content = content.replace(/a"ahp":\s*\d+,?/g, '');
        changed = true;
    }

    // Standardize spacing and fix double attributes if they somehow broke (unlikely)
    if (changed) {
        fs.writeFileSync(filePath, content);
    }
}

function processFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    content = content.replace(/a"hp":\s*\d+,?\s*/g, '');

    // Now, let's fix the ahp and hp carefully.
    // Also remove missing armorRating if any.
    // Actually, maybe it's just safer to run a script that uses proper parsing if possible, or just exact regexes.
     
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
console.log('Cleaned up the hp mess.');

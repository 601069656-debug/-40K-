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

console.log("Looking for potentially un-audited or abnormal units (Average attribute outside expected bounds):");

walkDir('./lib/knowledge/bestiary', (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const blocks = content.split(/(?=\n\s*(?:['"]?[a-zA-Z0-9_\-]+['"]?):\s*\{\s*\n\s*(?:['"]?name['"]?:))/);
    
    for (const block of blocks) {
        if (!block.trim() || !block.includes('attributes')) continue;
        
        const nameMatch = block.match(/name:\s*['"](.+?)['"]/);
        const name = nameMatch ? nameMatch[1] : '';

        const tagsMatch = block.match(/tags:\s*\[([\s\S]*?)\]/);
        const tags = tagsMatch ? tagsMatch[1].replace(/['"\n\r]/g, '').split(',').map((s:string) => s.trim()) : [];

        const attrMatch = block.match(/['"]?attributes['"]?:\s*{([\s\S]*?)}/);
        if (!attrMatch) continue;
        
        const attrText = attrMatch[1];
        const getStat = (nameStr: string) => {
            const m = attrText.match(new RegExp(`['"]?${nameStr}['"]?\\s*:\\s*(-?\\d+)`));
            return m ? parseInt(m[1]) : 0;
        };

        const stats = {
            weaponSkill: getStat('weaponSkill'),
            ballisticSkill: getStat('ballisticSkill'),
            strength: getStat('strength'),
            toughness: getStat('toughness'),
            agility: getStat('agility'),
            intelligence: getStat('intelligence'),
            perception: getStat('perception'),
            willpower: getStat('willpower'),
            fellowship: getStat('fellowship')
        };
        
        const sum = Object.values(stats).reduce((a, b) => a + b, 0);
        const avg = sum / 9;

        if (avg < 25 && !tags.includes('机仆') && !tags.includes('平民') && !tags.includes('亚人类')) {
            console.log(`[LOW] ${name} (Avg: ${avg.toFixed(1)}) tags: ${tags.join(',')}`);
        } else if (avg > 150 && !tags.includes('原体') && !tags.includes('泰坦') && !name.includes('超重型') && !name.includes('影剑')) {
            console.log(`[HIGH] ${name} (Avg: ${avg.toFixed(1)}) tags: ${tags.join(',')}`);
        }
    }
});

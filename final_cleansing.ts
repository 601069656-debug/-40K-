import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * 战锤40K：数值最终肃清脚本 (The Final Cleansing)
 * 目标：彻底消灭 HP=AHP 的逻辑错误
 */

function solveFile(filePath: string) {
    const lines = readFileSync(filePath, 'utf-8').split('\n');
    let modified = false;
    let currentT = 0;
    const currentTags: string[] = [];
    let isShip = false;
    let isVehicle = false;

    const newLines = lines.map(line => {
        // 提取韧性
        const tMatch = line.match(/['"]toughness['"]:\s*(\d+)/);
        if (tMatch) {
            currentT = parseInt(tMatch[1]);
            // 舰船/原体保底逻辑
            if (isShip && currentT < 150) { 
                currentT = 150; 
                modified = true;
                return line.replace(/(\d+)/, currentT.toString());
            }
        }

        // 提取标签 (用于判断类型)
        const tagsMatch = line.match(/['"]tags['"]:\s*\[/);
        if (tagsMatch) {
            // 这里简单处理：如果当前行包含关键词，或者接下来几行包含
            // 实际上我们可以通过文件名判断
        }
        
        if (filePath.includes('vessels.ts')) isShip = true;
        if (filePath.includes('vehicles')) isVehicle = true;

        // 强行修正 HP
        if (line.includes('"hp":') || line.includes(' hp:')) {
            const expectedHp = Math.max(1, Math.floor(currentT / 5));
            const hpKeyRegex = /(['"]?hp['"]?:\s*)\d+/;
            const match = line.match(hpKeyRegex);
            if (match && parseInt(line.match(/['"]?hp['"]?:\s*(\d+)/)![1]) !== expectedHp) {
                modified = true;
                line = line.replace(hpKeyRegex, `$1${expectedHp}`);
            }
        }
        if (line.includes('"maxHp":') || line.includes(' maxHp:')) {
            const expectedHp = Math.max(1, Math.floor(currentT / 5));
            const maxHpKeyRegex = /(['"]?maxHp['"]?:\s*)\d+/;
            const match = line.match(maxHpKeyRegex);
            if (match && parseInt(line.match(/['"]?maxHp['"]?:\s*(\d+)/)![1]) !== expectedHp) {
                modified = true;
                line = line.replace(maxHpKeyRegex, `$1${expectedHp}`);
            }
        }

        // 强行修正 AHP
        if (line.includes('"ahp":') || line.includes(' ahp:')) {
            let factor = 1;
            if (isShip) {
                factor = 30; 
                if (filePath.toLowerCase().includes('cruiser') || line.includes('巡洋')) factor = 45;
                if (line.includes('战列')) factor = 45;
                if (line.includes('旗舰')) factor = 60;
                if (line.includes('荣光')) factor = 75;
            }
            
            const expectedAhp = isShip ? currentT * factor : (isVehicle ? currentT : null);
            if (expectedAhp !== null) {
                const ahpKeyRegex = /(['"]?ahp['"]?:\s*)\d+/;
                const match = line.match(ahpKeyRegex);
                if (match && parseInt(line.match(/['"]?ahp['"]?:\s*(\d+)/)![1]) !== expectedAhp) {
                    modified = true;
                    line = line.replace(ahpKeyRegex, `$1${expectedAhp}`);
                }
            }
        }

        return line;
    });

    if (modified) {
        writeFileSync(filePath, newLines.join('\n'));
        console.log(`[CLEANSED] ${filePath}`);
    }
}

function scan(dir: string) {
    readdirSync(dir).forEach(entry => {
        const p = join(dir, entry);
        if (statSync(p).isDirectory()) scan(p);
        else if (entry.endsWith('.ts')) solveFile(p);
    });
}

scan('lib/knowledge/bestiary');

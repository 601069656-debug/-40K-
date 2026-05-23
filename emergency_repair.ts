import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * 战锤40K：无尽战火 - 数值大清洗与语法抢救脚本
 * 目标：
 * 1. 恢复受损的关键词 (ttributes -> attributes, gility -> agility等)
 * 2. 强制 HP = T / 5
 * 3. 舰船/载具 AHP 校准
 * 4. 原体属性保底 (T >= 250)
 */

function getShipFactor(tags: string[]): number {
    if (tags.includes('荣光级')) return 75;
    if (tags.includes('旗舰级')) return 60;
    if (tags.includes('战列级') || tags.includes('巡洋级')) return 45;
    if (tags.includes('护卫级')) return 30;
    return 30;
}

function repairFile(filePath: string) {
    let content = readFileSync(filePath, 'utf-8');
    let modified = false;

    // 1. 语法抢救：恢复被误剥离的关键词
    const syntaxFixes: [RegExp, any][] = [
        [/ttributes/g, 'attributes'],
        [/gility/g, 'agility'],
        [/hp(?="\s*:)/g, 'ahp'], // 修复误将 ahp 变成 hp 的情况
        [/['"]?hp['"]?:\s*(\d+\.?\d*)/g, (m: any, p1: any) => `"hp": ${Math.floor(parseFloat(p1))}`], // 规范化 HP 格式
    ];

    // 应用语法抢救
    syntaxFixes.forEach(([regex, replacement]) => {
        content = content.replace(regex, replacement);
    });

    // 更安全的做法：通过解析对象块来处理
    // 由于文件是 TS 常量导出，我们使用简单的块匹配
    const unitRegex = /['"]?(\w+)['"]?:\s*\{[\s\S]*?\n\s{2,4}\}(?=\s*,|\s*\n\s*\})/g;
    
    const newContent = content.replace(unitRegex, (unitBlock) => {
        let block = unitBlock;

        // 提取核心数据
        const toughnessMatch = block.match(/['"]toughness['"]:\s*(\d+)/);
        const nameMatch = block.match(/['"]name['"]:\s*['"](.*?)['"]/);
        const tagsMatch = block.match(/['"]tags['"]:\s*\[([\s\S]*?)\]/);
        
        if (!toughnessMatch) return block;

        const name = nameMatch ? nameMatch[1] : '';
        const rawTags = tagsMatch ? tagsMatch[1] : '';
        const tags = rawTags.split(',').map(t => t.trim().replace(/['"]/g, ''));
        let T = parseInt(toughnessMatch[1]);

        const isShip = tags.some(t => t.includes('舰船') || t.includes('舰'));
        const isVehicle = tags.some(t => t.includes('载具') || t.includes('坦克') || t.includes('机甲'));
        const isPrimarch = tags.some(t => t.includes('原体') || t.includes('Primarch'));

        let unitModified = false;

        // A. 原体属性保底
        if (isPrimarch && T < 150) {
            T = 300; // 重设为天灾级基准
            block = block.replace(/(['"]toughness['"]:\s*)\d+/, `$1${T}`);
            block = block.replace(/(['"]strength['"]:\s*)\d+/, `$1${T}`);
            block = block.replace(/(['"]agility['"]:\s*)\d+/, `$1300`);
            block = block.replace(/(['"]weaponSkill['"]:\s*)\d+/, `$1300`);
            block = block.replace(/(['"]ballisticSkill['"]:\s*)\d+/, `$1300`);
            unitModified = true;
        }
        
        // B. 舰船属性保底
        if (isShip && T < 50) {
            T = 150; // 战舰不应只有凡人韧性
            block = block.replace(/(['"]toughness['"]:\s*)\d+/, `$1${T}`);
            block = block.replace(/(['"]strength['"]:\s*)\d+/, `$1${T}`);
            unitModified = true;
        }

        // C. 强制对齐 HP = T / 5
        const currentHpMatch = block.match(/['"]hp['"]:\s*(\d+)/);
        const expectedHp = Math.max(1, Math.floor(T / 5));
        
        if (!currentHpMatch || parseInt(currentHpMatch[1]) !== expectedHp) {
            block = block.replace(/(['"]hp['"]:\s*)\d+/, `$1${expectedHp}`);
            block = block.replace(/(['"]maxHp['"]:\s*)\d+/, `$1${expectedHp}`);
            unitModified = true;
        }

        // D. AHP 逻辑纠正
        const currentAhpMatch = block.match(/['"]ahp['"]:\s*(\d+)/);
        let expectedAhp = 0;
        if (isShip) expectedAhp = T * getShipFactor(tags);
        else if (isVehicle) expectedAhp = T;

        if (expectedAhp > 0) {
            if (!currentAhpMatch || parseInt(currentAhpMatch[1]) !== expectedAhp) {
                if (currentAhpMatch) {
                    block = block.replace(/(['"]ahp['"]:\s*)\d+/, `$1${expectedAhp}`);
                } else {
                    // 如果没 AHP 字段，补上
                    block = block.replace(/(['"]hp['"]:\s*\d+)/, `$1, "ahp": ${expectedAhp}`);
                }
                unitModified = true;
            }
        }

        if (unitModified) modified = true;
        return block;
    });

    if (modified) {
        writeFileSync(filePath, newContent);
        console.log(`[FIXED] ${filePath}`);
    }
}

function scanDir(dir: string) {
    const entries = readdirSync(dir);
    for (const entry of entries) {
        const fullPath = join(dir, entry);
        if (statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (fullPath.endsWith('.ts') && !fullPath.endsWith('index.ts') && !fullPath.endsWith('labels.ts')) {
            repairFile(fullPath);
        }
    }
}

console.log("开始紧急数值审计与语法抢救...");
scanDir('lib/knowledge/bestiary');
console.log("抢救完成。");

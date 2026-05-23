import * as fs from 'fs';
import * as path from 'path';

const bestiaryDir = path.join(process.cwd(), 'lib/knowledge/bestiary');

function refineContent(content: string, filePath: string): string {
    let refined = content;

    // 1. 简单替换 (背景出身净化与术语规范)
    refined = refined.replace(/星际战士老兵\/百战幸存/g, '百战幸存');

    // 严禁 TRPG 逻辑术语
    refined = refined.replace(/判定|检定|几率|成功率|测试|DC/g, (match) => {
        const map: { [key: string]: string } = {
            '判定': '计算',
            '检定': '对抗',
            '几率': '可能',
            '成功率': '效能',
            '测试': '核对',
            'DC': '目标值'
        };
        return map[match] || match;
    });

    // 清除装备中的 [派系] 标签 (如 [兽人], [灵族] 等)
    refined = refined.replace(/\[(兽人|灵族|死灵|沃坦|泰伦|帝国|混沌|钛族|星际战士)\] /g, '');

    // 2. 结构化解析并修复数值
    // 我们先找到所有的单位块
    const unitBlocks: { full: string; id: string; body: string }[] = [];
    const unitStartRegex = /(['"])([^'"]+)\1\s*:\s*{/g;
    let unitMatch;
    while ((unitMatch = unitStartRegex.exec(refined)) !== null) {
        const id = unitMatch[2];
        const startPos = unitMatch.index;
        let braceCount = 1;
        let pos = unitMatch.index + unitMatch[0].length;
        while (braceCount > 0 && pos < refined.length) {
            if (refined[pos] === '{') braceCount++;
            else if (refined[pos] === '}') braceCount--;
            pos++;
        }
        const fullBlock = refined.substring(startPos, pos);
        const bodyWithBraces = refined.substring(unitMatch.index + unitMatch[0].length - 1, pos);
        // 去掉最外层大括号
        const body = bodyWithBraces.substring(1, bodyWithBraces.length - 1);
        unitBlocks.push({ full: fullBlock, id, body });
    }

    // 逆序处理，防止位置偏移
    for (let i = unitBlocks.length - 1; i >= 0; i--) {
        const { full: unitBlock, id, body } = unitBlocks[i];
        try {
            // 提取关键字段
            const attrMatch = body.match(/attributes:\s*({[\s\S]+?})/);
            const hpMatch = body.match(/(hp|maxHp):\s*(\d+)/);
            const mvMatch = body.match(/movement:\s*(\d+)/);
            const traitsMatch = body.match(/trait:\s*(['"])([\s\S]+?)\1/);
            const nameMatch = body.match(/name:\s*(['"])([\s\S]+?)\1/);

            if (!attrMatch || !hpMatch || !mvMatch || !traitsMatch || !nameMatch) continue;

            const name = nameMatch[2];
            // 清理 attributes 字符串以便 JSON 解析
            const attributesStr = attrMatch[1]
                .replace(/(\w+):/g, '"$1":')
                .replace(/'/g, '"')
                .replace(/\/\/.*$/gm, '') // 移除注释
                .replace(/,(\s*})/g, '$1'); // 移除末尾逗号
            
            const attributes = JSON.parse(attributesStr);
            
            const traits = traitsMatch[2];
            const hp = parseInt(hpMatch[2]);
            const mv = parseInt(mvMatch[1].split(':')[1] || mvMatch[0].split(':')[1]); // fallback
            
            const isVehicle = traits.includes('机械载具') || name.includes('载具') || name.includes('坦克');
            const isVessel = traits.includes('舰船') || name.includes('舰');

            let newBody = body;
            let changed = false;

            // 修正 HP (非载具/舰船)
            const expectedHp = Math.max(1, Math.floor(attributes.toughness / 5));
            const expectedAhp = attributes.toughness; // AHP 通常等于 坚韧(T)
            
            if (!isVehicle && !isVessel) {
                // 修正 HP
                if (hp !== expectedHp) {
                    console.log(`Fixing HP for ${name} (${id}) in ${path.basename(filePath)}: ${hp} -> ${expectedHp}`);
                    newBody = newBody.replace(/\bhp:\s*\d+/g, `hp: ${expectedHp}`);
                    newBody = newBody.replace(/\bmaxHp:\s*\d+/g, `maxHp: ${expectedHp}`);
                    changed = true;
                }
                // 修正 AHP
                const ahpMatch = newBody.match(/\bahp:\s*(\d+)/);
                if (ahpMatch) {
                    const currentAhp = parseInt(ahpMatch[1]);
                    if (currentAhp !== expectedAhp) {
                        console.log(`Fixing AHP for ${name} (${id}) in ${path.basename(filePath)}: ${currentAhp} -> ${expectedAhp}`);
                        newBody = newBody.replace(/\bahp:\s*\d+/, `ahp: ${expectedAhp}`);
                        changed = true;
                    }
                }
            }

            // 修正 Movement (MV)
            if (!isVehicle && !isVessel) {
                let bonus = 0;
                if (traits.includes('体型·大型')) bonus = 1;
                else if (traits.includes('体型·超大')) bonus = 2;
                else if (traits.includes('体型·巨大')) bonus = 3;
                else if (traits.includes('体型·小型')) bonus = -1;
                else if (traits.includes('体型·超小')) bonus = -2;
                else if (traits.includes('体型·微小')) bonus = -3;
                
                if (traits.includes('先锋追猎')) bonus += 2;
                if (traits.includes('掠夺者狂潮')) bonus += 2;

                const baseMv = Math.max(1, Math.floor(attributes.agility / 10));
                const expectedMv = Math.max(1, baseMv + bonus);
                
                const currentMv = parseInt(mvMatch[1]);
                if (currentMv !== expectedMv) {
                    console.log(`Fixing MV for ${name} (${id}) in ${path.basename(filePath)}: ${currentMv} -> ${expectedMv}`);
                    newBody = newBody.replace(/movement:\s*\d+/, `movement: ${expectedMv}`);
                    changed = true;
                }
            }

            // Astartes 特判：新兵/侦察兵不能有【死亡天使】，必须是【体型·普通】
            if (name.includes('侦察兵') || name.includes('新兵')) {
                if (traits.includes('【死亡天使】')) {
                    console.log(`Removing Death Angel trait for scout: ${name}`);
                    newBody = newBody.replace(/【死亡天使】[^；;]*[；;]?/g, '');
                    changed = true;
                }
                const traitFieldMatch = newBody.match(/trait:\s*(['"])([\s\S]+?)\1/);
                if (traitFieldMatch) {
                    const currentTraits = traitFieldMatch[2];
                    if (!currentTraits.includes('【体型·普通】') && !currentTraits.includes('【体型·大型】') && !currentTraits.includes('【体型·超大】')) {
                        const newTraits = currentTraits + (currentTraits.endsWith('；') || currentTraits.endsWith(';') || currentTraits.length === 0 ? '' : '；') + '【体型·普通】：标准的人类体型';
                        newBody = newBody.replace(currentTraits, newTraits);
                        changed = true;
                    } else if (!name.includes('原铸') && currentTraits.includes('【体型·大型】')) {
                        newBody = newBody.replace(/【体型·大型】[^；;]*/g, '【体型·普通】：标准的人类体型');
                        changed = true;
                    }
                }
            }

            // 修正盔甲命名规则 (如果是 Primaris Astartes 但用了通用动力甲)
            if (name.includes('仲裁者') || name.includes('先驱员') || name.includes('渗透者')) {
                if (newBody.includes('动力甲') && !newBody.includes('Mk X')) {
                    console.log(`Fixing armor for Primaris: ${name}`);
                    newBody = newBody.replace(/Mk\.?X?\s?动力甲/g, 'Mk X 战术型动力甲');
                    changed = true;
                }
            }

            if (id === 'ogryn_bodyguard') {
                console.log(`DEBUG Ogryn Bodyguard: name=${name}, hp=${hp}, toughness=${attributes.toughness}, expectedHp=${expectedHp}, changed=${changed}`);
            }

            if (changed) {
                const newFullBlock = unitBlock.replace(body, newBody);
                refined = refined.replace(unitBlock, newFullBlock);
            }
        } catch (e) {
            // console.error(`Error processing unit ${id} in ${filePath}: ${e}`);
        }
    }

    return refined;
}

function walk(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.ts')) {
            console.log(`Processing ${fullPath}...`);
            const content = fs.readFileSync(fullPath, 'utf-8');
            const refined = refineContent(content, fullPath);
            if (content !== refined) {
                fs.writeFileSync(fullPath, refined);
            }
        }
    }
}

console.log('--- 战锤40K 数据自动精炼开始 ---');
walk(bestiaryDir);
console.log('--- 修复完成 ---');

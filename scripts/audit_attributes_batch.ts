import * as fs from 'fs';
import * as path from 'path';

// Define the reference tiers based on user guidelines
const TIERS = {
    DISABLED: { min: 1, max: 9, base: 5 },
    WEAK: { min: 10, max: 19, base: 15 },
    SUBPAR: { min: 20, max: 24, base: 22 },
    MORTAL: { min: 25, max: 34, base: 30 },
    ELITE_MORTAL: { min: 35, max: 44, base: 40 },
    PEAK_MORTAL: { min: 45, max: 54, base: 50 },
    SCOUT_MARINE: { min: 55, max: 69, base: 60 },
    MARINE: { min: 70, max: 99, base: 85 },
    ELITE_MARINE: { min: 100, max: 149, base: 120 },
    HERO: { min: 150, max: 249, base: 180 },
    LORD: { min: 250, max: 399, base: 300 },
    GOD: { min: 400, max: 500, base: 450 }
};

function determineTier(name: string, tags: string[], traits: string): number {
    let tier = TIERS.MORTAL.base; // Default mortal

    if (tags.includes('星际战士') || tags.includes('阿斯塔特') || tags.includes('混沌星际战士') || tags.includes('灰骑士')) {
        tier = TIERS.MARINE.base;
        if (tags.includes('新兵') || tags.includes('侦察兵')) tier = TIERS.SCOUT_MARINE.base;
        if (tags.includes('精英') || tags.includes('老兵') || tags.includes('连长') || tags.includes('终结者') || tags.includes('千子')) tier = TIERS.ELITE_MARINE.base;
        if (tags.includes('连长') || tags.includes('英雄')) tier = TIERS.HERO.base;
    } else if (tags.includes('禁军')) {
        tier = TIERS.ELITE_MARINE.base;
        if (tags.includes('英雄')) tier = TIERS.HERO.base;
    } else if (tags.includes('泰坦')) {
        tier = TIERS.GOD.base;
        if (name.includes('战犬')) tier = TIERS.LORD.base;
    } else if (tags.includes('载具') || tags.includes('坦克')) {
        tier = TIERS.HERO.base;
        if (name.includes('超重型') || name.includes('毒刃') || name.includes('影剑')) tier = TIERS.LORD.base;
    } else if (tags.includes('恶魔')) {
        tier = TIERS.ELITE_MORTAL.base; 
        if (name.includes('大魔') || tags.includes('大魔')) tier = TIERS.LORD.base;
        else if (tags.includes('精英')) tier = TIERS.MARINE.base;
    } else if (name.includes('原体') || tags.includes('原体')) {
        tier = TIERS.LORD.base;
    } else if (tags.includes('泰伦')) {
        if (name.includes('武士')) tier = TIERS.SCOUT_MARINE.base;
        else if (name.includes('暴君') || name.includes('刽子手')) tier = TIERS.MARINE.base; // Table says 70-99 executioner, 100-149 tyrant
        else if (tags.includes('巨兽') || tags.includes('大型怪物')) tier = TIERS.HERO.base;
        else tier = TIERS.SUBPAR.base; // 幼体
    } else if (tags.includes('兽人')) {
        if (tags.includes('特战小子')) tier = TIERS.ELITE_MORTAL.base;
        else if (name.includes('老大') || tags.includes('头目')) tier = TIERS.MARINE.base;
        else tier = TIERS.MORTAL.base;
    } else if (tags.includes('机仆')) {
        if (tags.includes('重火力') || name.includes('卡塔弗隆')) tier = TIERS.PEAK_MORTAL.base;
        else tier = TIERS.WEAK.base;
    } else if (tags.includes('平民') || tags.includes('帮派')) {
        tier = TIERS.MORTAL.base;
    } else if (tags.includes('精锐') || tags.includes('老兵') || tags.includes('审判官') || tags.includes('卡塔昌') || tags.includes('风暴忠嗣军')) {
        tier = TIERS.ELITE_MORTAL.base;
    } else if (tags.includes('修女') || tags.includes('护教军') || tags.includes('刺客')) {
        tier = TIERS.PEAK_MORTAL.base;
    }

    if (traits.includes('英雄之躯') || tags.includes('英雄')) {
        if (tier === TIERS.MORTAL.base) tier = TIERS.ELITE_MORTAL.base;
        else if (tier === TIERS.ELITE_MORTAL.base) tier = TIERS.PEAK_MORTAL.base;
        // bump up 1 tier
    }

    return tier;
}

export function auditBatch(batchDirs: string[]) {
    // Process files...
    const bestiaryDir = path.join(process.cwd(), 'lib/knowledge/bestiary');
    let fixedCount = 0;

    for (const dirName of batchDirs) {
        const fullDir = path.join(bestiaryDir, dirName);
        if (!fs.existsSync(fullDir)) continue;

        const files = fs.readdirSync(fullDir, { recursive: true }) as string[];
        for (const file of files) {
            if (!file.endsWith('.ts')) continue;
            const filePath = path.join(fullDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            let modified = false;

            const blocks = content.split(/(?=\n\s*(?:['"]?[a-zA-Z0-9_\-]+['"]?):\s*\{\s*\n\s*(?:['"]?name['"]?:))/);
            
            for (let i = 0; i < blocks.length; i++) {
                let block = blocks[i];
                if (!block.includes('name') || !block.match(/['"]?attributes['"]?\s*:/)) continue;

                const nameMatch = block.match(/name:\s*['"](.+?)['"]/);
                const name = nameMatch ? nameMatch[1] : '';

                const tagsMatch = block.match(/tags:\s*\[([\s\S]*?)\]/);
                const tags = tagsMatch ? tagsMatch[1].replace(/['"\n\r]/g, '').split(',').map((s:string) => s.trim()) : [];

                const traitMatch = block.match(/trait:\s*['"]([\s\S]*?)['"]/);
                const traits = traitMatch ? traitMatch[1] : '';

                const equipMatch = block.match(/equipment:\s*['"]([\s\S]*?)['"]/);
                const equipment = equipMatch ? equipMatch[1] : '';

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

                const total = stats.weaponSkill + stats.ballisticSkill + stats.strength + stats.toughness + stats.agility + stats.intelligence + stats.willpower;
                const avg = total / 7;

                const expectedBase = determineTier(name, tags, traits);
                
                let needsFix = false;
                if (avg < 20 && expectedBase >= 25) {
                    needsFix = true; 
                }
                if (avg < 45 && expectedBase >= 85) {
                    needsFix = true;
                }
                if (avg < 40 && expectedBase >= 150) {
                    needsFix = true;
                }
                if (avg > expectedBase + 25 && !name.includes('大导师') && !tags.includes('原体') && !tags.includes('泰坦')) {
                    needsFix = true;
                }
                if (avg > expectedBase + 55) {
                    needsFix = true;
                }
                
                const isVehicleLocal = name.includes('无畏') || name.includes('坦克') || name.includes('载具') || name.includes('战车') || equipment.includes('引擎') || tags.includes('泰坦');
                
                if (Object.values(stats).some(v => v < 0)) {
                    needsFix = true;
                } else if (Object.values(stats).some(v => v === 0)) {
                    if (!(isVehicleLocal && stats.fellowship === 0)) {
                        needsFix = true;
                    }
                }

                if (needsFix) {
                    stats.weaponSkill = expectedBase + Math.floor(Math.random() * 5);
                    stats.ballisticSkill = expectedBase + Math.floor(Math.random() * 5);
                    stats.strength = expectedBase + Math.floor(Math.random() * 5);
                    stats.toughness = expectedBase + Math.floor(Math.random() * 5);
                    stats.agility = expectedBase + Math.floor(Math.random() * 5);
                    stats.intelligence = Math.max(10, expectedBase - 5 + Math.floor(Math.random() * 5));
                    stats.perception = expectedBase - 2 + Math.floor(Math.random() * 5);
                    stats.willpower = expectedBase - 2 + Math.floor(Math.random() * 5);
                    stats.fellowship = Math.max(10, expectedBase - 10 + Math.floor(Math.random() * 5));

                    const isVehicle = name.includes('无畏') || name.includes('坦克') || name.includes('载具') || name.includes('战车') || equipment.includes('引擎') || tags.includes('泰坦');

                    if (isVehicle) {
                        stats.intelligence = Math.floor(expectedBase / 2); // usually simple machine spirit
                        stats.fellowship = 0;
                        stats.weaponSkill = Math.max(20, expectedBase - 20); // They can ram
                        if (name.includes('大魔')) {
                            stats.fellowship = expectedBase; // Except daemon engines
                        }
                    }

                    if (tags.includes('机仆') && !tags.includes('重火力')) {
                        stats.intelligence = 5;
                        stats.fellowship = 1;
                        stats.willpower = 10;
                    }
                    if (tags.includes('重火力')) {
                         stats.ballisticSkill += 10;
                         stats.agility -= 10;
                    }

                    const T = stats.toughness;
                    const S = stats.strength;
                    const Ag = stats.agility;
                    
                    const newHP = Math.max(1, Math.floor(T / 5));
                    let mvBonus = 0;
                    const mvBonusMatch = traits.match(/移动力\s*([+-])\s*(\d+)/);
                    if (mvBonusMatch) {
                        const op = mvBonusMatch[1];
                        const val = parseInt(mvBonusMatch[2]);
                        if (op === '+') mvBonus = val;
                        else if (op === '-') mvBonus = -val;
                    }
                    const newMV = (isVehicleLocal ? Math.max(1, Math.floor(Ag / 5)) : Math.max(1, Math.floor(Ag / 10))) + mvBonus;
                    const newBMD = Math.max(0, Math.floor(S / 20));

                    const newAttrString = `\n      "weaponSkill": ${stats.weaponSkill},\n      "ballisticSkill": ${stats.ballisticSkill},\n      "strength": ${stats.strength},\n      "toughness": ${stats.toughness},\n      "agility": ${stats.agility},\n      "intelligence": ${stats.intelligence},\n      "perception": ${stats.perception},\n      "willpower": ${stats.willpower},\n      "fellowship": ${stats.fellowship}\n    `;
                    block = block.replace(/['"]?attributes['"]?:\s*{[\s\S]*?}/, `"attributes": {${newAttrString}}`);

                    if (block.includes('hp:')) block = block.replace(/\bhp:\s*(-?\d+)/, `hp: ${newHP}`);
                    else if (block.includes('"hp":')) block = block.replace(/"hp":\s*(-?\d+)/, `"hp": ${newHP}`);
                    
                    if (block.includes('maxHp:')) block = block.replace(/\bmaxHp:\s*(-?\d+)/, `maxHp: ${newHP}`);
                    else if (block.includes('"maxHp":')) block = block.replace(/"maxHp":\s*(-?\d+)/, `"maxHp": ${newHP}`);

                    if (block.includes('movement:')) block = block.replace(/\b(movement|mv|MV):\s*(-?\d+)/i, `movement: ${newMV}`);
                    else if (block.includes('"movement":')) block = block.replace(/"movement":\s*(-?\d+)/i, `"movement": ${newMV}`);

                    if (block.includes('baseMeleeDamage:')) block = block.replace(/baseMeleeDamage:\s*['"](-?\d+[^'"]*)['"]/, `baseMeleeDamage: "${newBMD} (S/20)"`);
                    else if (block.includes('"baseMeleeDamage":')) block = block.replace(/"baseMeleeDamage":\s*['"](-?\d+[^'"]*)['"]/, `"baseMeleeDamage": "${newBMD} (S/20)"`);

                    blocks[i] = block;
                    modified = true;
                    fixedCount++;
                    console.log(`[Batch] Fixed: ${name} (Base tier: ${expectedBase}, old avg: ${avg.toFixed(1)})`);
                }
            }

            if (modified) {
                fs.writeFileSync(filePath, blocks.join(''), 'utf-8');
            }
        }
    }
    console.log(`Finished auditing batch! Fixed ${fixedCount} units.`);
}

export const batch1 = [
    'Imperial masses', 'adepta_sororitas', 'adeptus_arbites', 'adeptus_custodes', 
    'adeptus_ministorum', 'astartes', 'astra_militarum', 'imperium_heroes', 
    'imperium_vehicles', 'inquisition', 'knight_houses', 'mechanicus', 
    'militarum_tempestus', 'officio_assassinorum', 'rogue_trader', 'sisters_of_silence', 'vessels', 'primarchs'
];

export const batch2 = [
    'chaos_astartes', 'chaos_cults', 'chaos_undivided_daemons', 'dark_mechanicum', 
    'khorne', 'nurgle', 'slaanesh', 'traitor_guard', 'tzeentch'
];

export const batch3 = [
    'aeldari', 'drukhari', 'necrons', 'orks', 'other_xenos', 'tau', 'tyranids', 'leagues_of_votann', 'beasts'
];

const target = process.argv[2];
if (target === '1') auditBatch(batch1);
else if (target === '2') auditBatch(batch2);
else if (target === '3') auditBatch(batch3);
else console.log('Please provide batch number: 1, 2, or 3');

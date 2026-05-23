
import fs from 'fs';
import path from 'path';

const WEAPONS_FILE = path.join(process.cwd(), 'lib/knowledge/weapons.ts');
const ARMOR_FILE = path.join(process.cwd(), 'lib/knowledge/armor.ts');

const SUB_FACTION_CONFIG: Record<string, string[]> = {
  '星际战士': ['黑色圣堂', '圣血天使', '暗黑天使', '白色伤疤', '太空野狼', '帝国之拳', '钢铁之手', '暗鸦守卫', '火蜥蜴', '极限战士', '灰骑士', '死亡守望', '血鸦', '帝皇之镰', '星界骑士', '星空雄狮', '吞噬者', '绯红之拳', '黑色执政官', '银色颅骨', '风暴领主', '破坏者', '饮魂者', '星龙', '米诺陶', '猛禽', '恸哭者', '红蝎', '星空幻影', '噬人鲨', '游侠战士', '新星战士', '火鹰', '圣洁天使', '根除天使'],
  '星界军': ['卡迪亚突击军', '卡塔昌丛林斗士', '克里格死亡军团', '瓦尔哈拉冰雪战士', '莫迪安铁卫军', '塔兰沙漠突袭者', '阿米吉多顿钢铁军团', '沃斯托尼亚长子团', '塔尼斯第一与唯一', '萨瓦尔化学猎犬', '文特里利贵族兵团', '卡迪亚残部'],
  '审判庭': ['异形庭审判官', '异端庭审判者', '恶魔庭封印使', '王座代理人', '罗塞塔持有者', '灵能抑制者', '审判庭医官', '审判庭战略师', '审判庭间谍', '审判庭武装侍从'],
  '机械教': ['护教军', '技术神甫', '高阶技术神甫'],
  '战斗修女会': ['我们的玫瑰圣女', '炽热圣杯', '银寿衣', '殉道者之女', '神圣之刃', '血腥玫瑰'],
  '刺客庭': ['文迪卡', '卡利都斯', '艾弗森', '库勒克斯', '刺客庭'],
  '风暴忠嗣军': ['第55卡皮克老鹰团', '第133兰姆达狮子团', '第196伊欧坦狮鹫团', '第99德尔塔戈贡团', '第43伊欧坦巨龙团'],
};

const TAG_MAP: Record<string, string> = {
  '任意凡人': '星界军, 审判庭, 机械教, 战斗修女会, 行商浪人, 行星防卫军, 法务部, 帝国国教, 叛教星界军, 混沌邪教徒',
  '星界军士兵': '星界军',
  '星界军军官': '星界军',
  '星界军士官': '星界军',
  '刺客庭专配': '刺客庭',
  '刺客专配': '刺客庭',
  '智库': '星际战士',
  '术士': '混沌星际战士',
  '任意': '所有派系'
};

function refineTag(tag: string): string {
    const trimmed = tag.trim();
    if (trimmed.includes('异种') || trimmed.includes('异型') || trimmed.includes('异形')) return '行商浪人, 异形庭审判官';
    if (TAG_MAP[trimmed]) return TAG_MAP[trimmed];
    return trimmed;
}

function getPrice(level: number, category: string): { req: number, throne: number, credit: number } {
    const basePrices: any = {
        1: { req: 10, throne: 20, credit: 5 },
        2: { req: 50, throne: 100, credit: 20 },
        3: { req: 250, throne: 500, credit: 100 },
        4: { req: 1500, throne: 3000, credit: 600 },
        5: { req: 10000, throne: 20000, credit: 4000 }
    };
    const b = basePrices[level] || basePrices[1];
    let mult = 1;
    if (category.includes('威力') || category.includes('重型')) mult = 1.5;
    if (category.includes('单手') || category.includes('简陋')) mult = 0.8;
    
    return {
        req: Math.floor(b.req * mult),
        throne: Math.floor(b.throne * mult),
        credit: Math.floor(b.credit * mult)
    };
}

function processContent(content: string, isArmor: boolean) {
    const lines = content.split('\n');
    const stats: any[] = [];
    let currentLevel = 0;
    let currentCat = '';
    let statHeaders: string[] = [];
    const textSections: string[] = [];
    
    // 1. Extract stats and keep only top descriptive section
    const headerReached = false;
    for (const line of lines) {
        if (line.includes('等级') && line.includes('第一等级')) currentLevel = 1;
        else if (line.includes('等级') && line.includes('第二等级')) currentLevel = 2;
        else if (line.includes('等级') && line.includes('第三等级')) currentLevel = 3;
        else if (line.includes('等级') && line.includes('第四等级')) currentLevel = 4;
        else if (line.includes('等级') && line.includes('第五等级')) currentLevel = 5;

        if (line.startsWith('### ')) break; // Stop at shopping tables
        
        if (line.trim().startsWith('> **') && !line.includes('等级')) {
            currentCat = line.replace(/>\s*\*\*(.*)\*\*/, '$1').trim();
        }

        if (line.trim().startsWith('> |')) {
            const parts = line.replace(/^>\s*\|/, '').split('|').map(p => p.trim());
            if (parts[0] === '名称') {
                statHeaders = parts;
                textSections.push(line);
                continue;
            }
            if (statHeaders.length > 0 && !line.includes('---') && parts[0] && currentLevel > 0) {
                const name = parts[0];
                const wearerIdx = statHeaders.findIndex(h => h.includes('持有者') || h.includes('穿戴者'));
                if (wearerIdx !== -1) {
                    parts[wearerIdx] = parts[wearerIdx].split(/[/,，]/).map(refineTag).join(', ');
                }
                stats.push({ name, level: currentLevel, category: currentCat, wearer: parts[wearerIdx] || '' });
                textSections.push('> | ' + parts.join(' | ') + ' |');
            } else {
                textSections.push(line);
            }
        } else {
            textSections.push(line);
        }
    }

    // 2. Generate new shopping tables
    const shopLines: string[] = [];
    for (let level = 1; level <= 5; level++) {
        const levelName = ['简陋/平民', '制式军武', '精英/特种', '高阶/重型', '史诗/圣物'][level-1];
        shopLines.push(`### 第${['一','二','三','四','五'][level-1]}等级（${levelName}）购物表\n`);
        
        const itemsAtLevel = stats.filter(s => s.level === level);
        const cats = Array.from(new Set(itemsAtLevel.map(i => i.category)));
        
        for (const cat of cats) {
            shopLines.push(`#### ${cat}`);
            shopLines.push(`| 名称 | 征用点 | 王座币 | 信用点 | 灵魂 | 奴隶 |`);
            shopLines.push(`| :--- | :--- | :--- | :--- | :--- | :--- |`);
            
            const catItems = itemsAtLevel.filter(i => i.category === cat);
            for (const item of catItems) {
                const p = getPrice(level, cat);
                let soul = '—', slave = '—';
                const isChaos = item.wearer.includes('混沌') || item.wearer.includes('叛教') || item.wearer.includes('邪教');
                if (isChaos || level >= 3) {
                    soul = Math.floor(p.req * 0.8).toString();
                    slave = Math.floor(p.req * 0.5).toString();
                }
                shopLines.push(`| ${item.name} | ${p.req} | ${p.throne} | ${p.credit} | ${soul} | ${slave} |`);
            }
            shopLines.push('');
        }
    }

    return textSections.join('\n') + '\n\n' + shopLines.join('\n');
}

import { WEAPONS_RULES } from '../lib/knowledge/weapons';
import { ARMOR_RULES } from '../lib/knowledge/armor';

const weaponsClean = processContent(WEAPONS_RULES, false);
const armorClean = processContent(ARMOR_RULES, true);

fs.writeFileSync(WEAPONS_FILE, `export const WEAPONS_RULES = \`
${weaponsClean.replace(/`/g, '\\`').replace(/\${/g, '\\${')}
\`;\n`);

fs.writeFileSync(ARMOR_FILE, `export const ARMOR_RULES = \`
${armorClean.replace(/`/g, '\\`').replace(/\${/g, '\\${')}
\`;\n`);

console.log('Deep clean and refactor complete.');

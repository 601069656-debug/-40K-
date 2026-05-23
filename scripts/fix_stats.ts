import * as fs from 'fs';
import * as path from 'path';

const BESTIARY_DIR = path.join(process.cwd(), 'lib/knowledge/bestiary');

function getAllFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath));
    } else if (filePath.endsWith('.ts') && !file.includes('index.ts')) {
      results.push(filePath);
    }
  });
  return results;
}

const STANDARDS = {
  HP: (T: number) => Math.max(1, Math.floor(T / 5)),
  MV_INFANTRY: (Ag: number) => Math.max(1, Math.floor(Ag / 10)),
  MV_VEHICLE: (Ag: number) => Math.max(1, Math.floor(Ag / 5)),
  BMD: (S: number) => Math.max(0, Math.floor(S / 20)),
};

async function fixStats() {
  const allFiles = getAllFiles(BESTIARY_DIR);
  console.log(`Fixing stats in ${allFiles.length} files...`);

  for (const filePath of allFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // 分隔文件为单位块
    const units = content.split(/(\n\s*['"]?\w+['"]?\s*:\s*{\s*\n)/);
    
    for (let i = 1; i < units.length; i += 2) {
      const header = units[i];
      const body = units[i+1];
      
      // 提取单位在 body 结束前的内容
      const bodyEndIdx = body.indexOf('\n  }');
      if (bodyEndIdx === -1) continue;
      
      let unitBody = body.slice(0, bodyEndIdx);
      const rest = body.slice(bodyEndIdx);

      const nameMatch = unitBody.match(/name:\s*['"](.+?)['"]/);
      if (!nameMatch) continue;
      const unitName = nameMatch[1];
      const isVehicle = unitName.includes('无畏') || unitName.includes('坦克') || unitName.includes('载具') || unitName.includes('战车');

      const getStat = (names: string[]) => {
        for (const name of names) {
          const m = unitBody.match(new RegExp(`${name}:\\s*(\\d+)`));
          if (m) return parseInt(m[1]);
        }
        return null;
      };

      const S = getStat(['strength', 'S']);
      const T = getStat(['toughness', 'T']);
      const Ag = getStat(['agility', 'Ag']);
      const WS = getStat(['weaponSkill', 'WS']);
      const BS = getStat(['ballisticSkill', 'BS']);

      if (S !== null) {
        const expectedBMD = STANDARDS.BMD(S);
        if (unitBody.includes('baseMeleeDamage:')) {
          unitBody = unitBody.replace(/(baseMeleeDamage:\s*['"])(\d+)/, `$1${expectedBMD}`);
        } else {
          unitBody += `    baseMeleeDamage: '${expectedBMD} (S/20)',\n`;
        }
      }
      
      // 检查是否需要添加传说标签
      if (WS !== null && BS !== null) {
        if (WS > 80 || BS > 80) {
          const hasHero = unitName.match(/(英灵|传说|原体|领主|英雄|大魔|领袖|长官)/) || unitBody.includes('英雄') || unitBody.includes('传说');
          if (!hasHero) {
            // 自动在 tags 中添加 '传说'
            unitBody = unitBody.replace(/(tags:\s*\[)/, `$1'传说', `);
          }
        }
      }

      // 护甲命名归一化
      unitBody = unitBody.replace(/动力装甲/g, '动力甲');
      unitBody = unitBody.replace(/MK X 战术动力甲/g, 'Mk X 战术型动力甲');
      unitBody = unitBody.replace(/MK X 福波斯动力甲/g, 'Mk X 福波斯型动力甲');
      unitBody = unitBody.replace(/MK X 格拉维斯动力甲/g, 'Mk X 格拉维斯型动力甲');

      if (T !== null) {
        const expectedHP = STANDARDS.HP(T);
        if (unitBody.includes('hp:')) {
            unitBody = unitBody.replace(/\bhp:\s*(\d+)/, `hp: ${expectedHP}`);
        } else {
            unitBody += `    hp: ${expectedHP}, `;
        }
        if (unitBody.includes('maxHp:')) {
            unitBody = unitBody.replace(/\bmaxHp:\s*(\d+)/, `maxHp: ${expectedHP}`);
        } else {
            unitBody += `maxHp: ${expectedHP}, `;
        }
        if (unitBody.includes('ahp:')) {
            unitBody = unitBody.replace(/\bahp:\s*(\d+)/, `ahp: ${T}`);
        } else {
            unitBody += `ahp: ${T},\n`;
        }
      }
      if (Ag !== null) {
        const traitMatch = unitBody.match(/trait[s]?:\s*(?:['"](.+?)['"]|\[([\s\S]*?)\])/);
        const traits = traitMatch ? (traitMatch[1] || traitMatch[2] || '') : '';
        let bonus = 0;
        const mvBonusMatch = traits.match(/移动力\s*([+-])\s*(\d+)/);
        if (mvBonusMatch) {
            const op = mvBonusMatch[1];
            const val = parseInt(mvBonusMatch[2]);
            if (op === '+') bonus = val;
            else if (op === '-') bonus = -val;
        }
        const expectedMV = (isVehicle ? STANDARDS.MV_VEHICLE(Ag) : STANDARDS.MV_INFANTRY(Ag)) + bonus;
        if (unitBody.includes('movement:')) {
            unitBody = unitBody.replace(/\b(movement|mv|MV):\s*(\d+)/, `$1: ${expectedMV}`);
        } else {
            unitBody = unitBody.replace(/(weaponStats:)/, `movement: ${expectedMV},\n    $1`);
        }
      }

      units[i+1] = unitBody + rest;
      modified = true;
    }

    if (modified) {
      const newContent = units.join('');
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated ${path.relative(BESTIARY_DIR, filePath)}`);
      }
    }
  }
  console.log('Stats fix completed.');
}

fixStats();

import * as fs from 'fs';
import * as path from 'path';

// 审计标准定义
const STANDARDS = {
  HP: (T: number) => Math.max(1, Math.floor(T / 5)),
  MV: (Ag: number) => Math.max(1, Math.floor(Ag / 10)),
  BMD: (S: number) => Math.max(0, Math.floor(S / 20)),
  FORBIDDEN_TERMS: ['判定', '检定', '几率', '成功率', '测试', 'DC', 'DC：', '轮', '回合'],
  SIZE_TRAITS: ['【体型·普通】', '【体型·大型】', '【体型·巨大】', '【体型·微型】', '【体型·小巧】'],
};

interface AuditIssue {
  file: string;
  unit: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

export async function auditFile(filePath: string): Promise<AuditIssue[]> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues: AuditIssue[] = [];
  const fileName = path.basename(filePath);

  // 1. 术语审计
  STANDARDS.FORBIDDEN_TERMS.forEach(term => {
    if (content.includes(term)) {
      issues.push({ file: fileName, unit: 'Global', type: 'ERROR', message: `禁言术语检测到: "${term}"` });
    }
  });

  // 尝试匹配单位数据块 (兼容 attributes 和 stats)
  const unitMatches = content.matchAll(/['"]?(\w+?)['"]?\s*:\s*{\s*(?:id:\s*['"].+?['"],\s*)?name:\s*['"](.+?)['"][\s\S]*?(?:attributes|stats):\s*{([\s\S]*?)}/g);
  
  for (const match of unitMatches) {
    const unitKey = match[1];
    const unitName = match[2];
    const statsBlock = match[3];
    
    const getStat = (names: string[]) => {
      for (const name of names) {
        const m = statsBlock.match(new RegExp(`${name}:\\s*(\\d+)`));
        if (m) return parseInt(m[1]);
      }
      return 0;
    };

    const S = getStat(['strength', 'S']);
    const T = getStat(['toughness', 'T']);
    const Ag = getStat(['agility', 'Ag']);
    
    // 查找 HP/MV/BMD (可能在 statsBlock 之后，NPCProfile 的属性中)
    const findValue = (regex: RegExp) => {
      const m = content.match(new RegExp(`['"]?${unitKey}['"]?\\s*:[\\s\\S]*?${regex.source}`));
      return m ? (m[1] ? parseInt(m[1]) : 0) : null;
    };

    const HP = findValue(/hp:\s*(\d+)/i);
    const MV = findValue(/(?:movement|mv):\s*(\d+)/i);
    const BMDStrMatch = content.match(new RegExp(`['"]?${unitKey}['"]?\\s*:[\\s\\S]*?baseMeleeDamage:\\s*['"](\\d+)`));
    const BMD = BMDStrMatch ? parseInt(BMDStrMatch[1]) : null;

    const WS = getStat(['weaponSkill', 'WS']);
    const BS = getStat(['ballisticSkill', 'BS']);

    // 2. 公式审计
    if (HP !== null) {
      const expectedHP = STANDARDS.HP(T);
      if (HP !== expectedHP) {
        issues.push({ file: fileName, unit: unitName, type: 'ERROR', message: `HP 错误: 期望 ${expectedHP}, 实际 ${HP} (T=${T})` });
      }
    }

    if (MV !== null) {
      const isVehicle = unitName.includes('无畏') || unitName.includes('坦克') || unitName.includes('载具') || unitName.includes('战车');
      const isShip = unitName.includes('舰') || unitName.includes('船');
      
      let expectedMV = isVehicle ? Math.floor(Ag / 5) : Math.floor(Ag / 10);
      expectedMV = Math.max(1, expectedMV);

      // 检查特质中的移动力加成
      const traitMatch = content.match(new RegExp(`['"]?${unitKey}['"]?\\s*:[\\s\\S]*?trait[s]?\\s*:\\s*(?:['"](.+?)['"]|\\[([\\s\\S]*?)\\])`));
      const allTraits = traitMatch ? (traitMatch[1] || traitMatch[2] || '') : '';
      
      const mvBonusMatch = allTraits.match(/移动力\s*([株+-])\s*(\d+)/);
      if (mvBonusMatch) {
        const op = mvBonusMatch[1];
        const val = parseInt(mvBonusMatch[2]);
        if (op === '+') expectedMV += val;
        else if (op === '-') expectedMV -= val;
      }

      if (MV !== expectedMV) {
        issues.push({ file: fileName, unit: unitName, type: 'ERROR', message: `MV 错误: 期望 ${expectedMV}, 实际 ${MV} (Ag=${Ag}, Vehicle=${isVehicle})` });
      }
    }

    if (BMD !== null) {
      const expectedBMD = STANDARDS.BMD(S);
      if (BMD !== expectedBMD) {
        issues.push({ file: fileName, unit: unitName, type: 'ERROR', message: `BMD 错误: 期望 ${expectedBMD}, 实际 ${BMD} (S=${S})` });
      }
    }

    // 3. 特质审计 - 体型必选
    const traitMatch = content.match(new RegExp(`name:\\s*['"]${unitName}['"][\\s\\S]*?traits:\\s*\\[([\\s\\S]*?)\\]`));
    if (traitMatch) {
      const traits = traitMatch[1];
      const hasSize = STANDARDS.SIZE_TRAITS.some(st => traits.includes(st));
      if (!hasSize) {
        issues.push({ file: fileName, unit: unitName, type: 'ERROR', message: `缺少必要的体型特质` });
      }

      // 阿斯塔特新兵审计
      if ((unitName.includes('新兵') || unitName.includes('侦察兵')) && unitName.includes('阿斯塔特')) {
        if (traits.includes('【死亡天使】')) {
          issues.push({ file: fileName, unit: unitName, type: 'ERROR', message: `阿斯塔特新兵/侦察兵严禁拥有【死亡天使】特质` });
        }
      }
    }

    // 4. 数值合理性 (WS/BS > 80 限制)
    if (WS > 80 || BS > 80) {
      const tagMatch = content.match(new RegExp(`['"]?${unitKey}['"]?\\s*:[\\s\\S]*?tags:\\s*\\[([\\s\\S]*?)\\]`));
      const hasHeroTag = tagMatch && (tagMatch[1].includes('英雄') || tagMatch[1].includes('传说'));
      const hasHeroName = unitName.match(/(英灵|传说|原体|领主|英雄|大魔|领袖|长官)/);
      if (!hasHeroTag && !hasHeroName) {
        issues.push({ file: fileName, unit: unitName, type: 'WARNING', message: `WS/BS > 80 但未标注为英雄/传说单位(Name/Tags)` });
      }
    }
  }

  return issues;
}

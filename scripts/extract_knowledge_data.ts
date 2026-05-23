import fs from 'fs';
import path from 'path';

/**
 * 战锤40K：无尽战火 - 知识库提取脚本
 * 用于从 TypeScript 原始文档中精确提取特质、技能、灵能等数据
 */

interface Entry {
  name: string;
  description: string;
  category?: string;
  attributes?: Record<string, any>;
}

const parseMarkdownTable = (markdown: string): Entry[] => {
  const lines = markdown.split('\n');
  const entries: Entry[] = [];
  let currentCategory = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 捕获标题作为分类
    if (line.startsWith('**') && line.endsWith('**')) {
      currentCategory = line.replace(/\*\*/g, '');
      continue;
    }
    if (line.startsWith('> **') && line.endsWith('**')) {
      currentCategory = line.replace(/> \*\*/g, '').replace(/\*\*/g, '');
      continue;
    }

    // 处理表格行
    if (line.startsWith('|') || line.startsWith('> |')) {
      const cleanLine = line.startsWith('> ') ? line.substring(2) : line;
      if (cleanLine.includes('---')) continue; // 跳过分割线
      
      const cells = cleanLine.split('|').map(c => c.trim()).filter(c => c !== '');
      
      // 跳过表头
      if (cells[0]?.includes('名称') || cells[1]?.includes('名称')) continue;

      if (cells.length >= 2) {
        // 自动识别结构
        if (cells.length === 2) {
          // [名称, 效果描述]
          entries.push({
            name: cells[0],
            description: cells[1],
            category: currentCategory
          });
        } else if (cells.length === 3) {
          // [派系/类型, 名称, 效果描述]
          entries.push({
            name: cells[1],
            description: cells[2],
            category: cells[0] || currentCategory
          });
        } else if (cells.length === 4 && currentCategory.includes('技能')) {
           // [技能名称, 触发情境, 关联属性, 属性加成]
           entries.push({
             name: cells[0],
             description: `触发情境: ${cells[1]} | 属性加成: ${cells[3]}`,
             category: '常规技能',
             attributes: {
               context: cells[1],
               attribute: cells[2],
               bonus: cells[3]
             }
           });
        } else if (cells.length === 5 && currentCategory.includes('灵能')) {
          // [技能名称, 帝国分级, PR, 基础风险等级, 描述]
          entries.push({
            name: cells[0],
            description: cells[4],
            category: '灵能天赋',
            attributes: {
              grade: cells[1],
              pr: parseInt(cells[2]),
              brr: parseInt(cells[3])
            }
          });
        } else {
          // Default for any other size (like weapons, items, armor):
          // column 0 is name, last column is description
          entries.push({
            name: cells[0],
            description: cells[cells.length - 1],
            category: currentCategory
          });
        }
      }
    }
  }
  return entries;
};

const main = () => {
  const knowledgeDir = path.join(process.cwd(), 'lib/knowledge');
  const traitsSrc = fs.readFileSync(path.join(knowledgeDir, 'traits.ts'), 'utf-8');
  const npcTraitsSrc = fs.readFileSync(path.join(knowledgeDir, 'npc_traits.ts'), 'utf-8');
  const skillsSrc = fs.readFileSync(path.join(knowledgeDir, 'skills.ts'), 'utf-8');
  const psychicSrc = fs.readFileSync(path.join(knowledgeDir, 'psychic.ts'), 'utf-8');
  const weaponsSrc = fs.readFileSync(path.join(knowledgeDir, 'weapons.ts'), 'utf-8');
  const naturalWeaponsSrc = fs.readFileSync(path.join(knowledgeDir, 'natural_weapons.ts'), 'utf-8');
  const armorSrc = fs.readFileSync(path.join(knowledgeDir, 'armor.ts'), 'utf-8');
  const itemsSrc = fs.readFileSync(path.join(knowledgeDir, 'items.ts'), 'utf-8');

  console.log('开始解析知识库...');

  const allTraits = [
    ...parseMarkdownTable(traitsSrc),
    ...parseMarkdownTable(npcTraitsSrc)
  ];

  const allSkills = parseMarkdownTable(skillsSrc);
  const allWeapons = [
    ...parseMarkdownTable(weaponsSrc),
    ...parseMarkdownTable(naturalWeaponsSrc)
  ];
  const allArmor = parseMarkdownTable(armorSrc);
  const allItems = parseMarkdownTable(itemsSrc);
  
  // 提取灵能能力
  const psychicPowers: Entry[] = [];
  const psychicLines = psychicSrc.split('\n');
  let currentPR = 0;
  for (let i = 0; i < psychicLines.length; i++) {
    const line = psychicLines[i].trim();
    const prMatch = line.match(/\*\*PR=(\d+)\*\*/);
    if (prMatch) {
      currentPR = parseInt(prMatch[1]);
    }
    
    if (line.includes('|') && !line.includes('---') && !line.includes('能力名称')) {
      const cleanLine = line.startsWith('> ') ? line.substring(2) : line;
      const cells = cleanLine.split('|').map(c => c.trim()).filter(c => c !== '');
      if (cells.length === 2 && currentPR > 0) {
        psychicPowers.push({
          name: cells[0],
          description: cells[1],
          category: `PR ${currentPR}`,
          attributes: { pr: currentPR }
        });
      }
    }
  }

  const summary = {
    traits: allTraits,
    skills: allSkills,
    psychicPowers: psychicPowers,
    weapons: allWeapons,
    armor: allArmor,
    items: allItems,
    metadata: {
      extractedAt: new Date().toISOString(),
      totalTraits: allTraits.length,
      totalSkills: allSkills.length,
      totalPsychicPowers: psychicPowers.length,
      totalWeapons: allWeapons.length,
      totalArmor: allArmor.length,
      totalItems: allItems.length
    }
  };

  fs.writeFileSync(
    path.join(knowledgeDir, 'knowledge_summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log(`解析完成！`);
  console.log(`- 提取特质: ${allTraits.length} 条`);
  console.log(`- 提取技能: ${allSkills.length} 条`);
  console.log(`- 提取灵能能力: ${psychicPowers.length} 条`);
  console.log(`- 提取武器: ${allWeapons.length} 条`);
  console.log(`- 提取护甲: ${allArmor.length} 条`);
  console.log(`- 提取物品: ${allItems.length} 条`);
  console.log(`结果已保存至 lib/knowledge/knowledge_summary.json`);
};

main();

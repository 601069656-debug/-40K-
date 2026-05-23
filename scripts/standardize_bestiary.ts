import * as fs from 'fs';
import * as path from 'path';

/**
 * 战锤40K：无尽战火 - 知识库标准化审计脚本
 * 目的：消除 bestiary 目录下由于不同生成来源导致的格式差异 (引号、分号、Key引号等)
 */

const BASE_DIR = './lib/knowledge/bestiary';

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.ts') && file !== 'index.ts' && file !== 'labels.ts') {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function standardizeFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 使用正则提取 export const ... = { ... } 之后的内容
  const match = content.match(/export const \w+: (Record<string, (NPCProfile|NPCProfile\[\]|UnitProfile)>|any) = (\{[\s\S]*\});/);
  if (!match) return;

  const header = content.substring(0, match.index);
  const dataRaw = match[3];

  try {
    // 这种清理方式虽然暴力，但能解决引号问题。
    // 我们将其转为真正的对象再写回。
    // 注意：这里用 eval 是因为它是纯数据对象，且在本地脚本环境中可接受。
    let data;
    eval(`data = ${dataRaw}`);

    // 标准化数据内部字符串
    for (const key in data) {
      const unit = data[key];
      if (unit.trait) {
        // 统一分号，去除多余空白
        unit.trait = unit.trait.replace(/；/g, '; ').replace(/; ;/g, ';').replace(/\s+/g, ' ').trim();
      }
      // 确保数值
      if (typeof unit.hp === 'string') unit.hp = parseInt(unit.hp);
      if (typeof unit.maxHp === 'string') unit.maxHp = parseInt(unit.maxHp);
      if (typeof unit.ahp === 'string') unit.ahp = parseInt(unit.ahp);
      if (typeof unit.movement === 'string') unit.movement = parseInt(unit.movement);
    }

    const formattedData = formatAsTSObject(data);
    const newContent = `${header}export const ${match[0].split(':')[0].split(' ')[2]}: ${match[1]} = ${formattedData};`;
    
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✓ Standardized: ${filePath}`);
  } catch (e) {
    console.error(`✗ Failed to parse: ${filePath}`, e);
  }
}

function formatAsTSObject(obj: any): string {
  const json = JSON.stringify(obj, null, 2);
  // 将 "key": 转换为 key:
  let ts = json.replace(/"(\w+)":/g, '$1:');
  // 将双引号字符串转换为单引号 (处理转义)
  ts = ts.replace(/"([^"]*)"/g, (match, p1) => {
    return `'${p1.replace(/'/g, "\\'")}'`;
  });
  return ts;
}

const allFiles = getAllFiles(BASE_DIR);
console.log(`Starting standardization for ${allFiles.length} files...`);
allFiles.forEach(standardizeFile);
console.log('All files processed.');

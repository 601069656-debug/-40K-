import fs from 'fs';
const content = fs.readFileSync('lib/knowledge/items.ts', 'utf-8');

const lines = content.split('\n');
for (let i = 0; i < lines.length - 1; i++) {
  if (lines[i].includes('| 名称 | 携带者 | 类型 | 等级 | 效果与描述 |')) {
    if (lines[i+1].includes('| :--- |')) {
      lines[i+1] = '> | :--- | :--- | :--- | :--- | :--- |';
    }
  } else if (lines[i].includes('| 名称 | 携带者 | 类型 | 效果与描述 |')) {
    if (lines[i+1].includes('| :--- |')) {
      lines[i+1] = '> | :--- | :--- | :--- | :--- |';
    }
  }
}

fs.writeFileSync('lib/knowledge/items.ts', lines.join('\n'), 'utf-8');

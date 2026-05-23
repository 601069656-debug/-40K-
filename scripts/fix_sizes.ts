import fs from 'fs';
import path from 'path';

const BESTIARY_DIR = path.join(process.cwd(), 'lib/knowledge/bestiary');

function walkDir(dir: string, callback: (filePath: string) => void) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (file.endsWith('.ts')) {
      callback(fullPath);
    }
  }
}

let modifiedCount = 0;

walkDir(BESTIARY_DIR, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const replacements: [RegExp, string][] = [
    [/【体型·超大】/g, '【体型·巨大】'],
    [/【体型·极大】/g, '【体型·巨大】'],
    [/【体型·巨型】/g, '【体型·巨大】'],
    [/【体型·小型】/g, '【体型·普通】'],
    // Handle without brackets if any
    [/"体型·超大"/g, '"体型·巨大"'],
    [/'体型·超大'/g, "'体型·巨大'"],
    [/"体型·极大"/g, '"体型·巨大"'],
    [/'体型·极大'/g, "'体型·巨大'"],
    [/"体型·巨型"/g, '"体型·巨大"'],
    [/'体型·巨型'/g, "'体型·巨大'"],
    [/"体型·小型"/g, '"体型·普通"'],
    [/'体型·小型'/g, "'体型·普通'"],
  ];

  for (const [regex, replacement] of replacements) {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
    console.log(`Updated sizes in: ${filePath}`);
  }
});

console.log(`Completed. Updated ${modifiedCount} files.`);

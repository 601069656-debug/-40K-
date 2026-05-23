import fs from 'fs';

const text = fs.readFileSync('constants.ts', 'utf8');
const lines = text.split('\n');

let inArmorTable = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.match(/^>\s*\|\s*名称\s*\|\s*穿戴者\s*\|\s*坚韧加成\s*\|\s*其他属性修正\s*\|\s*备注\s*\|/)) {
    lines[i] = line.replace('坚韧加成 | 其他属性修正', '坚韧加成 | 耐久值(HP) | 其他属性修正');
    inArmorTable = true;
    continue;
  }
  
  if (inArmorTable && line.match(/^>\s*\|\s*:---\s*\|\s*:---\s*\|\s*:---\s*\|\s*:---\s*\|\s*:---\s*\|/)) {
    lines[i] = line.replace(':--- | :---', ':--- | :--- | :---');
    continue;
  }

  // Row
  if (inArmorTable && line.startsWith('> |') && line.split('|').length === 7) { 
    const parts = line.split('|');
    const name = parts[1] ? parts[1].trim() : '';
    const wearer = parts[2] ? parts[2].trim() : '';
    const toughness = parts[3] ? parts[3].trim() : '';
    const mod = parts[4] ? parts[4].trim() : '';
    const note = parts[5] ? parts[5].trim() : '';
      
    let hpStr = toughness.replace(/\s*\(.*\)/g, '').trim();
    if (hpStr.startsWith('+')) hpStr = hpStr.substring(1);
    if (hpStr === "0" && toughness.includes("（")) {
         hpStr = toughness; // copy the original if there's special conditions shield blocks etc. Wait, no, maybe just toughness.replace("持盾时正面+1", "持盾时+1") or something? Just keep it as is.
         // Actually "护甲的耐久值等于其坚韧加成" so we can just use the toughness value without the `+`.
    }

    lines[i] = `> | ${name} | ${wearer} | ${toughness} | ${hpStr} | ${mod} | ${note} |`;
  }

  // Detect end of table
  if (inArmorTable && !line.trim().startsWith('> |')) {
    inArmorTable = false;
  }
}

fs.writeFileSync('constants.ts', lines.join('\n'));

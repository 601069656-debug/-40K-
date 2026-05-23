import fs from 'fs';
let content = fs.readFileSync('lib/knowledge/items.ts', 'utf-8');

// Replace table headers for Xenos items
content = content.replace(/\| 名称 \| 类型 \| 效果与描述 \|/g, '| 名称 | 携带者 | 类型 | 效果与描述 |');
content = content.replace(/\| :--- \| :--- \| :--- \|/g, '| :--- | :--- | :--- | :--- |');

const lines = content.split('\n');
const resLines = [];

for (let i=0; i<lines.length; i++) {
  const l = lines[i];
  if (l.startsWith('|') && !l.includes('名称') && !l.includes(':---')) {
    // Check if it's one of the ones like | 兽人图腾柱 | 战术 | ... |
    // Xenos tables start with |
    const parts = l.split('|').map(s=>s.trim());
    if (parts[0] === '') parts.shift();
    if (parts[parts.length-1] === '') parts.pop();
    
    // There were 3 columns original. Due to no replacement yet, it just splits into 3.
    // So it should be Name | Type | Desc
    if (parts.length === 3) {
      if (['兽人图腾柱', '大杆炸弹', '魂石', '全息护盾发生器', '掌控律令', '复活协议节点', '痛苦增幅器', '影域发生器', '恐惧面具', '战斗兴奋剂', '广谱扫描仪', '虚空盾牌发生器', '传送顶饰', 'AI指挥节点', '标记灯', '盾牌发生器 (钛)', '战术无人机控制器', '追踪链'].includes(parts[0])) {
         resLines.push(`| ${parts[0]} | 通用 | ${parts[1]} | ${parts[2]} |`);
         continue;
      }
    }
  }
  resLines.push(l);
}

fs.writeFileSync('lib/knowledge/items.ts', resLines.join('\n'), 'utf-8');

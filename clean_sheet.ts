import fs from 'fs';
const filePath = 'components/CharacterSheet.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the "</div>}" part
content = content.replace(/<\/div>\}\s+\{item\.stats\?\.desc && item\.description && <div className="text-\[9px\] text-zinc-600 font-mono italic leading-tight border-t border-zinc-900 pt-2">\{item\.stats\.desc\}<\/div>\}\s+<\/div>/, '</div>');

// Fix the ")}`}" part
content = content.replace(/\)\}\s*\}?\s*<\/div>\s*<\/div>\s*\}\)\s*\{item\.stats\?\.hp && \(/, ')}\n                                              {item.stats?.hp && (');

// Let's try more aggressive regex
content = content.replace(/<\/div>\}\s+\{item\.stats\?\.desc && item\.description && <div class[\s\S]*?<\/div>\}/, '</div>');

fs.writeFileSync(filePath, content);
console.log('Aggressive cleanup applied');

import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('constants.ts', 'utf8');

const regex = /export const INITIAL_SYSTEM_INSTRUCTION = \`(.*?)\`;/s;
const match = content.match(regex);
if (!match) {
  console.error("Could not find INITIAL_SYSTEM_INSTRUCTION");
  process.exit(1);
}

const instructionBody = match[1];
const lines = instructionBody.split('\n');

const libraries = {
  coreRules: [],
  weapons: [],
  armor: [],
  items: [],
  skills: [],
  traits: [],
  psychic: [],
  corruption: [],
  environment: []
};

let currentLib = 'coreRules';

for (const line of lines) {
  if (line.includes('2. 武器库')) currentLib = 'weapons';
  else if (line.includes('3. 防具库')) currentLib = 'armor';
  else if (line.includes('4. 消耗品、功能物品与特殊物品')) currentLib = 'items';
  else if (line.includes('5. 技能体系 (Skills)')) currentLib = 'skills';
  else if (line.includes('特质体系 (Traits)')) currentLib = 'traits';
  else if (line.includes('6. 灵能等级体系（Psy Rating）')) currentLib = 'psychic';
  else if (line.includes('7. 腐化值系统')) currentLib = 'corruption';
  else if (line.includes('9. 掩体规则 (Cover Rules)')) currentLib = 'environment';
  else if (line.includes('10. 环境与战术规则 (Environment & Tactical Rules)')) currentLib = 'environment';
  
  libraries[currentLib].push(line);
}

fs.mkdirSync('lib/knowledge', { recursive: true });

for (const [key, lines] of Object.entries(libraries)) {
  const fileContent = `export const ${key.toUpperCase()}_RULES = \`\n${lines.join('\n')}\n\`;\n`;
  fs.writeFileSync(path.join('lib/knowledge', `${key}.ts`), fileContent, 'utf8');
}

console.log("Successfully extracted libraries to lib/knowledge/");

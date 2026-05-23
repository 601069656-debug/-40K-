import fs from 'fs';
import path from 'path';

let content = fs.readFileSync('constants.ts', 'utf8');

const regex = /export const INITIAL_SYSTEM_INSTRUCTION = \`.*?\`;\n/s;
const replacement = `import { CORERULES_RULES } from './lib/knowledge/coreRules';
import { WEAPONS_RULES } from './lib/knowledge/weapons';
import { ARMOR_RULES } from './lib/knowledge/armor';
import { ITEMS_RULES } from './lib/knowledge/items';
import { SKILLS_RULES } from './lib/knowledge/skills';
import { TRAITS_RULES } from './lib/knowledge/traits';
import { PSYCHIC_RULES } from './lib/knowledge/psychic';
import { CORRUPTION_RULES } from './lib/knowledge/corruption';

export const INITIAL_SYSTEM_INSTRUCTION = [
  CORERULES_RULES,
  WEAPONS_RULES,
  ARMOR_RULES,
  ITEMS_RULES,
  SKILLS_RULES,
  TRAITS_RULES,
  PSYCHIC_RULES,
  CORRUPTION_RULES,
  ENVIRONMENT_RULES
].join('\\n');
`;

content = content.replace(regex, replacement);
fs.writeFileSync('constants.ts', content, 'utf8');
console.log("Updated constants.ts");

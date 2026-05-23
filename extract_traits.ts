import fs from 'fs';

const primarchs30k = fs.readFileSync('lib/knowledge/bestiary/primarchs/primarchs_30k.ts', 'utf8');
const primarchs40k = fs.readFileSync('lib/knowledge/bestiary/primarchs/primarchs_40k.ts', 'utf8');

const regex = /【([^】]+)】(?:[:：]\s*(.*?))?(?:；|;|",|\n)/g;
const allTraits = new Map<string, string>();

function parseTraits(content: string) {
    let match;
    while ((match = regex.exec(content)) !== null) {
        if (match[1] && match[2] && match[2].trim().length > 0) {
            allTraits.set(match[1].trim(), match[2].trim());
        }
    }
}

parseTraits(primarchs30k);
parseTraits(primarchs40k);

const npcTraitsContent = fs.readFileSync('lib/knowledge/npc_traits.ts', 'utf8');
const newTraits: string[] = [];

allTraits.forEach((desc, name) => {
    if (!npcTraitsContent.includes(`name: '${name}'`) && !npcTraitsContent.includes(`name: "${name}"`)) {
        newTraits.push(`  { name: '${name}', desc: '${desc.replace(/'/g, "\\'")}' },`);
    }
});

if (newTraits.length > 0) {
    const updatedNpcTraits = npcTraitsContent.replace(
        /\];\s*$/,
        '\n  // Primarch Traits\n' + newTraits.join('\n') + '\n];\n'
    );
    fs.writeFileSync('lib/knowledge/npc_traits.ts', updatedNpcTraits);
    console.log(`Added ${newTraits.length} traits to npc_traits.ts`);
} else {
    console.log('No new traits to add.');
}

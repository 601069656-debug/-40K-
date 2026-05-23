import * as fs from 'fs';
import * as path from 'path';

const p30kFile = path.join(process.cwd(), 'lib/knowledge/bestiary/primarchs/primarchs_30k.ts');
const p40kFile = path.join(process.cwd(), 'lib/knowledge/bestiary/primarchs/primarchs_40k.ts');

const modifications30k: Record<string, any> = {
  "lion_el_jonson_30k": { armor: { t: 120, s: 60, per: 30, wp: 40, ag: 0 }, ahp: 120, isTraitor: false, hasPsyker: false },
  "fulgrim_30k": { armor: { t: 120, s: 60, ag: 10, wp: 40 }, ahp: 120, isTraitor: true, hasPsyker: false },
  "perturabo_30k": { armor: { t: 140, s: 70, int: 40, per: 20 }, ahp: 140, isTraitor: true, hasPsyker: false },
  "jaghatai_khan_30k": { armor: { t: 110, s: 50, ag: 30, wp: 20 }, ahp: 110, isTraitor: false, hasPsyker: false },
  "konrad_curze_30k": { armor: { t: 110, s: 50, ag: 20, per: 40 }, ahp: 110, isTraitor: true, hasPsyker: true },
  "ferrus_manus_30k": { armor: { t: 140, s: 80, int: 20 }, ahp: 140, isTraitor: false, hasPsyker: false },
  "angron_30k": { armor: { t: 120, s: 70, per: 20, wp: 10 }, ahp: 120, isTraitor: true, hasPsyker: false },
  "roboute_guilliman_30k": { armor: { t: 120, s: 50, int: 40, wp: 30 }, ahp: 120, isTraitor: false, hasPsyker: false },
  "mortarion_30k": { armor: { t: 140, s: 60, wp: 40 }, ahp: 140, isTraitor: true, hasPsyker: false },
  "magnus_the_red_30k": { armor: { t: 100, s: 40, int: 50, wp: 60 }, ahp: 100, isTraitor: true, hasPsyker: true },
  "horus_lupercal_30k": { armor: { t: 130, s: 70, per: 40, wp: 50 }, ahp: 130, isTraitor: true, hasPsyker: false },
  "lorgar_aurelian_30k": { armor: { t: 110, s: 50, fel: 50, wp: 60 }, ahp: 110, isTraitor: true, hasPsyker: true },
  "vulkan_30k": { armor: { t: 150, s: 80 }, ahp: 150, isTraitor: false, hasPsyker: false },
  "corvus_corax_30k": { armor: { t: 100, s: 45, ag: 40, per: 30 }, ahp: 100, isTraitor: false, hasPsyker: true },
  "alpharius_30k": { armor: { t: 110, s: 50, ag: 20, int: 40 }, ahp: 110, isTraitor: true, hasPsyker: false },
  "sanguinius_30k": { armor: { t: 110, s: 50, ag: 30 }, ahp: 110, isTraitor: false, hasPsyker: true },
  "rogal_dorn_30k": { armor: { t: 140, s: 70, wp: 60, per: 20 }, ahp: 140, isTraitor: false, hasPsyker: false },
  "leman_russ_30k": { armor: { t: 120, s: 60, per: 40, wp: 40 }, ahp: 120, isTraitor: false, hasPsyker: false },
};

const modifications40k: Record<string, any> = {
  "imperium_guilliman": { armor: { t: 130, int: 20, wp: 10 }, ahp: 120, isTraitor: false, hasPsyker: false },
  "imperium_lion": { armor: { t: 135, s: 65, per: 35, wp: 45 }, ahp: 135, isTraitor: false, hasPsyker: false },
  "chaos_mortarion": { armor: { t: 150, s: 70, per: 20, wp: 60, ag: -10 }, ahp: 150, isTraitor: true, hasPsyker: true },
  "chaos_magnus": { armor: { t: 150, s: 70, per: 20, wp: 60, ag: -10 }, ahp: 150, isTraitor: true, hasPsyker: true },
  "chaos_angron": { armor: { t: 150, s: 70, per: 20, wp: 60, ag: -10 }, ahp: 150, isTraitor: true, hasPsyker: false },
  "chaos_fulgrim": { armor: { t: 150, s: 70, per: 20, wp: 60, ag: -10 }, ahp: 150, isTraitor: true, hasPsyker: true }
};

function processData(contentFile: string, mods: Record<string, any>) {
  const rawContent = fs.readFileSync(contentFile, 'utf8');
  
  // Extract the object
  const startIdx = rawContent.indexOf('export const primarchs');
  const firstBrace = rawContent.indexOf('{', startIdx);
  const endIdx = rawContent.lastIndexOf('};');
  
  const objStr = rawContent.substring(firstBrace, endIdx + 1);
  let data;
  try {
    data = eval('(' + objStr + ')');
  } catch (e) {
    console.log("Error parsing " + contentFile);
    return;
  }
  
  for (const key in data) {
    if (mods[key]) {
      const p = data[key];
      const mod = mods[key];
      
      // Update attributes safely (if not already buffed, we assume it's unbuffed)
      // Actually, if we script it, we apply the buff once. We should check if T is > 150 to avoid double buff
      if (p.attributes.toughness < 150) {
        if (mod.armor.t) p.attributes.toughness += mod.armor.t;
        if (mod.armor.s) p.attributes.strength += mod.armor.s;
        if (mod.armor.ag) p.attributes.agility += mod.armor.ag;
        if (mod.armor.per) p.attributes.perception += mod.armor.per;
        if (mod.armor.wp) p.attributes.willpower += mod.armor.wp;
        if (mod.armor.int) p.attributes.intelligence += mod.armor.int;
        if (mod.armor.fel) p.attributes.fellowship += mod.armor.fel;
      }
      
      p.ahp = mod.ahp;
      p.hp = Math.max(1, Math.floor(p.attributes.toughness / 5));
      p.maxHp = p.hp;
      p.movement = Math.max(1, Math.floor(p.attributes.agility / 10));
      // T=Huge gives +1, wait we can just check trait
      if (p.trait.includes("体型·大型")) p.movement += 1;
      if (p.trait.includes("体型·巨大")) p.movement += 3;
      
      p.baseMeleeDamage = Math.floor(p.attributes.strength / 20) + " (S/20)";
      
      // Psyker skills
      if (mod.hasPsyker || (p.skill && p.skill.includes("灵能"))) {
        let skills = p.skill ? p.skill.split(",").map((s: string) => s.trim()) : [];
        if (!skills.includes("灵能掌控")) skills.push("灵能掌控");
        skills = skills.filter((s: string) => s !== "亚空间化身" && s !== "凡者极限");
        if (mod.isTraitor) {
          skills.unshift("凡者极限");
        } else {
          skills.unshift("亚空间化身");
        }
        p.skill = skills.join(", ");
      }
    }
  }
  
  const originalDef = rawContent.substring(0, firstBrace);
  const newData = originalDef + JSON.stringify(data, null, 2) + ";\n";
  fs.writeFileSync(contentFile, newData);
  console.log("Updated " + contentFile);
}

processData(p30kFile, modifications30k);
processData(p40kFile, modifications40k);

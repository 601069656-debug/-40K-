import fs from 'fs';
import path from 'path';

const baseDir = path.join(process.cwd(), 'lib/knowledge/bestiary');

const factions = [
  {
    folder: 'khorne',
    file: 'khorne_warband.ts',
    varName: 'KHORNE_WARBAND_BESTIARY',
    desc: '恐虐战团 (Khorne Warband)',
    units: {
      'khorne_warband_marauder': {
        name: '恐虐掠夺者',
        status: '血神追随者',
        attributes: '{ weaponSkill: 16, ballisticSkill: 10, strength: 18, toughness: 18, agility: 14, intelligence: 8, perception: 12, willpower: 15, fellowship: 5 }',
        trait: '【血神子嗣】：血神的恩赐，力量(S)与坚韧(T)各+5；【肉搏狂暴】：进入近战后极度疯狂，无法主动撤离，且进入近战后造成的伤害+1；【体型·普通】：标准的人类体型',
        skill: '无畏冲锋, 闪避, 威吓',
        equipment: '野蛮战斧, 激光手枪, 废料甲',
        tags: "['混沌', '恐虐', '凡人']",
        hp: 4, maxHp: 4, ahp: 5, movement: 1,
        baseMeleeDamage: "'0 (S/20)'",
        weaponStats: "'野蛮战斧(S:+5 D:+3), 激光手枪(S:30 D:4 容量:15 连发:否)'"
      },
      'khorne_warband_berserker': {
        name: '恐虐狂战士',
        status: '颅骨收集者',
        attributes: '{ weaponSkill: 55, ballisticSkill: 20, strength: 55, toughness: 50, agility: 40, intelligence: 15, perception: 35, willpower: 55, fellowship: 5 }',
        trait: '【血神子嗣】：血神的恩赐，力量(S)与坚韧(T)各+5；【肉搏狂暴】：进入近战后极度疯狂，无法主动撤离，且进入近战后造成的伤害+1；【混沌恩赐】：受到黑暗神明赐福，基础HP+2；【体型·大型】：被攻击时，该生物的敏捷(Ag)-5。移动力+1',
        skill: '恐吓, 战术, 威吓',
        equipment: '阿斯塔特链锯斧, 爆弹手枪, 混沌动力甲 (恐虐)',
        tags: "['混沌', '恐虐', '阿斯塔特', '恐虐战团成员']",
        hp: 12, maxHp: 12, ahp: 30, movement: 5,
        baseMeleeDamage: "'2 (S/20)'",
        weaponStats: "'阿斯塔特链锯斧(S:+12 D:+8), 爆弹手枪(S:40 D:6 容量:10 连发:否)'"
      }
    }
  },
  {
    folder: 'tzeentch',
    file: 'tzeentch_cultists.ts',
    varName: 'TZEENTCH_CULTISTS_BESTIARY',
    desc: '奸奇信徒 (Cultists of Tzeentch)',
    units: {
      'tzeentch_cultist': {
        name: '奸奇教徒',
        status: '命运扭曲者',
        attributes: '{ weaponSkill: 9, ballisticSkill: 12, strength: 8, toughness: 9, agility: 11, intelligence: 15, perception: 13, willpower: 16, fellowship: 12 }',
        trait: '【诡道信徒】：对亚空间魔法有抗性，对抗灵能或巫术时意志(WP)+10；【体型·普通】：标准的人类体型',
        skill: '欺瞒, 隐匿, 神秘学知识',
        equipment: 'M36 激光枪, 防弹甲, 亵渎匕首',
        tags: "['混沌', '奸奇', '凡人', '奸奇信徒']",
        hp: 2, maxHp: 2, ahp: 10, movement: 1,
        baseMeleeDamage: "'0 (S/20)'",
        weaponStats: "'M36 激光枪(S:35 D:5 容量:60 连发:可), 亵渎匕首(S:+3 D:+2)'"
      },
      'tzeentch_magus': {
        name: '奸奇术士',
        status: '诡道引导者',
        attributes: '{ weaponSkill: 12, ballisticSkill: 15, strength: 10, toughness: 12, agility: 14, intelligence: 24, perception: 20, willpower: 25, fellowship: 18 }',
        trait: '【诡道信徒】：对亚空间魔法有抗性，对抗灵能或巫术时意志(WP)+10；【灵能者】：能够施放灵能，PR=3；【混沌恩赐】：受到黑暗神明赐福，基础HP+2；【体型·普通】：标准的人类体型',
        skill: '灵能掌控, 神秘学知识, 欺瞒',
        equipment: '灵能法杖, 激光手枪, 防弹大氅',
        tags: "['混沌', '奸奇', '凡人', '术士', '奸奇信徒']",
        hp: 4, maxHp: 4, ahp: 15, movement: 1,
        baseMeleeDamage: "'0 (S/20)'",
        weaponStats: "'灵能法杖(S:PR×2 D:10+PR), 激光手枪(S:30 D:4 容量:15 连发:否)'"
      }
    }
  },
  {
    folder: 'nurgle',
    file: 'nurgle_warband.ts',
    varName: 'NURGLE_WARBAND_BESTIARY',
    desc: '纳垢军团 (Nurgle Warband)',
    units: {
      'nurgle_cultist': {
        name: '纳垢教徒',
        status: '苍白信徒',
        attributes: '{ weaponSkill: 12, ballisticSkill: 10, strength: 14, toughness: 18, agility: 8, intelligence: 8, perception: 9, willpower: 14, fellowship: 5 }',
        trait: '【腐朽之躯】：免疫毒素和疾病，坚韧(T)+10；【体型·普通】：标准的人类体型',
        skill: '坚韧不拔, 恐吓',
        equipment: '自动手枪, 瘟疫刀, 废料甲',
        tags: "['混沌', '纳垢', '凡人', '纳垢军团成员']",
        hp: 5, maxHp: 5, ahp: 5, movement: 0,
        baseMeleeDamage: "'0 (S/20)'",
        weaponStats: "'瘟疫刀(S:+2 D:+4), 自动手枪(S:30 D:4 容量:18 连发:可)'"
      },
      'nurgle_plague_marine': {
        name: '瘟疫战士',
        status: '恶疾传播者',
        attributes: '{ weaponSkill: 50, ballisticSkill: 50, strength: 52, toughness: 65, agility: 30, intelligence: 35, perception: 40, willpower: 55, fellowship: 10 }',
        trait: '【腐朽之躯】：免疫毒素和疾病，坚韧(T)+10；【行尸走肉】：受伤不会削弱能力；【混沌恩赐】：受到黑暗神明赐福，基础HP+2；【体型·大型】：被攻击时，该生物的敏捷(Ag)-5。移动力+1',
        skill: '坚韧不拔, 恐吓',
        equipment: '爆弹枪, 瘟疫刀, 混沌动力甲',
        tags: "['混沌', '纳垢', '阿斯塔特', '纳垢军团成员']",
        hp: 15, maxHp: 15, ahp: 30, movement: 4,
        baseMeleeDamage: "'2 (S/20)'",
        weaponStats: "'爆弹枪(S:45 D:8 容量:30 连发:可), 瘟疫刀(S:+2 D:+4)'"
      }
    }
  },
  {
    folder: 'slaanesh',
    file: 'slaanesh_cultists.ts',
    varName: 'SLAANESH_CULTISTS_BESTIARY',
    desc: '色孽信徒 (Cultists of Slaanesh)',
    units: {
      'slaanesh_cultist': {
        name: '色孽教徒',
        status: '欢愉追求者',
        attributes: '{ weaponSkill: 14, ballisticSkill: 11, strength: 10, toughness: 10, agility: 18, intelligence: 10, perception: 15, willpower: 12, fellowship: 18 }',
        trait: '【极速感官】：敏捷(Ag)+10，且免疫视觉或听觉干扰；【体型·普通】：标准的人类体型',
        skill: '闪避, 魅力, 隐匿',
        equipment: '自动手枪, 亵渎匕首, 衣物',
        tags: "['混沌', '色孽', '凡人', '色孽信徒']",
        hp: 2, maxHp: 2, ahp: 2, movement: 1,
        baseMeleeDamage: "'0 (S/20)'",
        weaponStats: "'自动手枪(S:30 D:4 容量:18 连发:可), 亵渎匕首(S:+3 D:+2)'"
      },
      'slaanesh_noise_champion': {
        name: '噪音战士冠军',
        status: '感官粉碎者',
        attributes: '{ weaponSkill: 55, ballisticSkill: 60, strength: 45, toughness: 45, agility: 60, intelligence: 40, perception: 50, willpower: 55, fellowship: 40 }',
        trait: '【极速感官】：敏捷(Ag)+10，且免疫视觉或听觉干扰；【混沌恩赐】：受到黑暗神明赐福，基础HP+2；【体型·大型】：被攻击时，该生物的敏捷(Ag)-5。移动力+1',
        skill: '战术, 威吓, 闪避',
        equipment: '音波爆破枪, 阿斯塔特链锯剑, 色孽动力甲',
        tags: "['混沌', '色孽', '阿斯塔特', '色孽信徒']",
        hp: 11, maxHp: 11, ahp: 25, movement: 7,
        baseMeleeDamage: "'2 (S/20)'",
        weaponStats: "'音波爆破枪(S:55 D:10 容量:无限 连发:可), 阿斯塔特链锯剑(S:+10 D:+8)'"
      }
    }
  },
  {
    folder: 'dark_mechanicum',
    file: 'fallen_tech_priest.ts',
    varName: 'DARK_MECHANICUM_BESTIARY',
    desc: '黑暗机械教 (Dark Mechanicum)',
    units: {
      'dark_mechanicum_heretek': {
        name: '异端技术神甫',
        status: '堕落机械信徒',
        attributes: '{ weaponSkill: 14, ballisticSkill: 18, strength: 16, toughness: 18, agility: 12, intelligence: 24, perception: 18, willpower: 20, fellowship: 8 }',
        trait: '【机魂异化】：能够控制或干扰帝国载具与机械，对抗机械目标时伤害+2；【肉体改造】：坚韧(T)+5；【体型·普通】：标准的人类体型',
        skill: '普通知识·技术, 逻辑, 机械学',
        equipment: '等离子手枪, 万机神之斧, 机械教防护服',
        tags: "['混沌', '黑暗机械教', '堕落技术神甫']",
        hp: 4, maxHp: 4, ahp: 15, movement: 1,
        baseMeleeDamage: "'0 (S/20)'",
        weaponStats: "'万机神之斧(S:+15 D:+10), 等离子手枪(S:60 D:8 容量:10 连发:否)'"
      }
    }
  },
  {
    folder: 'chaos_daemons',
    file: 'chaos_daemons.ts',
    varName: 'CHAOS_DAEMONS_BESTIARY',
    desc: '混沌恶魔 (Chaos Daemons)',
    units: {
      'chaos_daemon_lesser': {
        name: '低阶混沌恶魔',
        status: '亚空间投影',
        attributes: '{ weaponSkill: 38, ballisticSkill: 10, strength: 38, toughness: 35, agility: 40, intelligence: 15, perception: 25, willpower: 40, fellowship: 5 }',
        trait: '【亚空间生物】：免疫流血、疾病和毒素。物理武器伤害减半（四舍五入）；【体型·普通】：标准的人类体型',
        skill: '潜行, 威吓',
        equipment: '天生武器（恶魔爪）',
        tags: "['混沌', '恶魔', '混沌恶魔']",
        hp: 7, maxHp: 7, ahp: 0, movement: 4,
        baseMeleeDamage: "'1 (S/20)'",
        weaponStats: "'天生武器（恶魔爪）(S:+6 D:+5)'"
      }
    }
  },
  {
    folder: 'traitor_guard',
    file: 'traitor_guard.ts',
    varName: 'TRAITOR_GUARD_BESTIARY',
    desc: '叛教星界军 (Traitor Guard)',
    units: {
      'traitor_guardsman': {
        name: '叛教星界军步兵',
        status: '混沌阵营大头',
        attributes: '{ weaponSkill: 10, ballisticSkill: 11, strength: 10, toughness: 10, agility: 10, intelligence: 9, perception: 10, willpower: 9, fellowship: 10 }',
        trait: '【老兵阵型】：只要与至少两名友军相邻，坚韧(T)+5；【体型·普通】：标准的人类体型',
        skill: '战术, 闪避, 生存',
        equipment: 'M36 激光枪, 星界军防弹甲, 破片手雷',
        tags: "['混沌', '叛教星界军', '凡人']",
        hp: 2, maxHp: 2, ahp: 10, movement: 1,
        baseMeleeDamage: "'0 (S/20)'",
        weaponStats: "'M36 激光枪(S:35 D:5 容量:60 连发:可)'"
      },
      'traitor_guard_veteran': {
        name: '叛教星界军老兵',
        status: '百战邪门大头',
        attributes: '{ weaponSkill: 15, ballisticSkill: 16, strength: 13, toughness: 14, agility: 14, intelligence: 12, perception: 15, willpower: 15, fellowship: 12 }',
        trait: '【老兵阵型】：只要与至少两名友军相邻，坚韧(T)+5；【百战幸存】：力量(S)+5，坚韧(T)+5，敏捷(Ag)+5，意志(WP)+5；【体型·普通】：标准的人类体型',
        skill: '战术, 闪避, 生存',
        equipment: '等离子枪, 星界军防弹甲, 破片手雷',
        tags: "['混沌', '叛教星界军', '凡人', '老兵']",
        hp: 3, maxHp: 3, ahp: 10, movement: 1,
        baseMeleeDamage: "'0 (S/20)'",
        weaponStats: "'等离子枪(S:60 D:10 容量:30 连发:可)'"
      }
    }
  },
  {
    folder: 'chaos_cults',
    file: 'cultists.ts',
    varName: 'CHAOS_CULTS_BESTIARY',
    desc: '混沌邪教徒 (Chaos Cults)',
    units: {
      'chaos_cultist_rabble': {
        name: '邪教徒暴徒',
        status: '炮灰',
        attributes: '{ weaponSkill: 7, ballisticSkill: 7, strength: 8, toughness: 8, agility: 8, intelligence: 6, perception: 8, willpower: 7, fellowship: 8 }',
        trait: '【狂热人海】：当周围有3个以上友军时，免疫恐惧；【体型·普通】：标准的人类体型',
        skill: '威吓, 求生',
        equipment: '自动手枪, 自制手雷, 废料甲',
        tags: "['混沌', '混沌邪教徒', '凡人', '邪教徒']",
        hp: 1, maxHp: 1, ahp: 5, movement: 0,
        baseMeleeDamage: "'0 (S/20)'",
        weaponStats: "'自动手枪(S:30 D:4 容量:18 连发:可)'"
      }
    }
  }
];

// Ensure directories and generate files
factions.forEach(f => {
  const dirPath = path.join(baseDir, f.folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  let code = `import { NPCProfile } from '../../../../types';\n\n`;
  code += `/**\n * ${f.desc}\n */\n`;
  code += `export const ${f.varName}: Record<string, Partial<NPCProfile>> = {\n`;
  
  const entries = Object.entries(f.units);
  entries.forEach(([key, unit], index) => {
     code += `  '${key}': {\n`;
     code += `    name: '${unit.name}',\n`;
     code += `    status: '${unit.status}',\n`;
     code += `    attributes: ${unit.attributes},\n`;
     code += `    trait: '${unit.trait}',\n`;
     code += `    skill: '${unit.skill}',\n`;
     code += `    equipment: '${unit.equipment}',\n`;
     code += `    tags: ${unit.tags},\n`;
     code += `    hp: ${unit.hp}, maxHp: ${unit.maxHp}, ahp: ${unit.ahp}, movement: ${unit.movement},\n`;
     code += `    baseMeleeDamage: ${unit.baseMeleeDamage},\n`;
     code += `    weaponStats: ${unit.weaponStats}\n`;
     code += `  }${index === entries.length - 1 ? '' : ','}\n`;
  });

  code += '};\n';
  fs.writeFileSync(path.join(dirPath, f.file), code, 'utf-8');
});

console.log("Successfully generated all required chaos subfactions.");

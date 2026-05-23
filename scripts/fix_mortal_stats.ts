import fs from 'fs';
import path from 'path';

// Khorne Warband
const khornePath = path.join(process.cwd(), 'lib/knowledge/bestiary/khorne/khorne_warband.ts');
let khorneContent = fs.readFileSync(khornePath, 'utf8');
khorneContent = khorneContent.replace(/name: '恐虐教徒',[\s\S]*?weaponStats:/m, `name: '恐虐教徒',
    status: '鲜血祭品',
    attributes: {weaponSkill:15,ballisticSkill:10,strength:12,toughness:12,agility:10,intelligence:8,perception:10,willpower:12,fellowship:7},
    trait: '【血祭血神】：每击杀一个敌人，立即恢复1点耐久值；【体型·普通】：被攻击时，该生物的敏捷(Ag)不受影响。移动力+0',
    skill: '警觉, 恐吓',
    equipment: '野蛮战斧, 废料甲',
    tags: ['混沌','恐虐','恐虐战团成员','凡人'],
    hp: 2, maxHp: 2, ahp: 5, movement: 1,
    baseMeleeDamage: '0 (S/20)',
    weaponStats:`);
fs.writeFileSync(khornePath, khorneContent, 'utf8');

// Nurgle Warband
const nurglePath = path.join(process.cwd(), 'lib/knowledge/bestiary/nurgle/nurgle_warband.ts');
let nurgleContent = fs.readFileSync(nurglePath, 'utf8');
nurgleContent = nurgleContent.replace(/name: '纳垢行尸',[\s\S]*?weaponStats:/m, `name: '纳垢行尸',
    status: '瘟疫死灵',
    attributes: {weaponSkill:10,ballisticSkill:0,strength:12,toughness:15,agility:5,intelligence:2,perception:5,willpower:10,fellowship:1},
    trait: '【无脑群集】：免疫影响心智的灵能和恐惧；【腐败坚韧】：坚韧(T)+5，免疫毒素疾病，减少自身受到的2点所有伤害（最低为1点），但行走/冲锋/奔跑距离减半；【体型·普通】：被攻击时，该生物的敏捷(Ag)不受影响。移动力+0',
    skill: '生存',
    equipment: '污染利爪, 废料甲',
    tags: ['混沌','纳垢','纳垢军团成员','凡人'],
    hp: 3, maxHp: 3, ahp: 5, movement: 1,
    baseMeleeDamage: '0 (S/20)',
    weaponStats:`);
nurgleContent = nurgleContent.replace(/name: '纳垢教徒',[\s\S]*?weaponStats:/m, `name: '纳垢教徒',
    status: '瘟疫传播者',
    attributes: {weaponSkill:12,ballisticSkill:12,strength:10,toughness:15,agility:10,intelligence:10,perception:12,willpower:15,fellowship:10},
    trait: '【腐败坚韧】：坚韧(T)+5，免疫毒素疾病，减少自身受到的2点所有伤害（最低为1点），但行走/冲锋/奔跑距离减半；【体型·普通】：被攻击时，该生物的敏捷(Ag)不受影响。移动力+0',
    skill: '生存, 警觉, 异毒学',
    equipment: '瘟疫临时武器, 废料甲',
    tags: ['混沌','纳垢','纳垢军团成员','凡人'],
    hp: 3, maxHp: 3, ahp: 5, movement: 1,
    baseMeleeDamage: '0 (S/20)',
    weaponStats:`);
fs.writeFileSync(nurglePath, nurgleContent, 'utf8');

// Tzeentch Cultists
const tzeentchPath = path.join(process.cwd(), 'lib/knowledge/bestiary/tzeentch/tzeentch_cultists.ts');
let tzeentchContent = fs.readFileSync(tzeentchPath, 'utf8');
tzeentchContent = tzeentchContent.replace(/name: '奸奇教徒',[\s\S]*?weaponStats:/m, `name: '奸奇教徒',
    status: '阴谋编织者',
    attributes: {weaponSkill:10,ballisticSkill:12,strength:10,toughness:10,agility:12,intelligence:15,perception:15,willpower:15,fellowship:15},
    trait: '【诡道魔法】：战斗前自动获知一名敌人的一项弱点。当角色对他人使用灵能时，目标的意志(WP)-20；【体型·普通】：被攻击时，该生物的敏捷(Ag)不受影响。移动力+0',
    skill: '欺诈, 闪避',
    equipment: '激光手枪, 生锈锁子甲',
    tags: ['混沌','奸奇','奸奇信徒','凡人'],
    hp: 2, maxHp: 2, ahp: 5, movement: 1,
    baseMeleeDamage: '0 (S/20)',
    weaponStats:`);
tzeentchContent = tzeentchContent.replace(/name: '奸奇教团学徒',[\s\S]*?weaponStats:/m, `name: '奸奇教团学徒',
    status: '初级灵能者',
    attributes: {weaponSkill:10,ballisticSkill:12,strength:10,toughness:10,agility:12,intelligence:18,perception:15,willpower:20,fellowship:12},
    trait: '【诡道魔法】：战斗前自动获知一名敌人的一项弱点。当角色对他人使用灵能时，目标的意志(WP)-20；【体型·普通】：被攻击时，该生物的敏捷(Ag)不受影响。移动力+0',
    skill: '欺诈, 闪避, 禁忌知识·亚空间, 灵能天赋',
    equipment: '临时法杖, 激光手枪, 破布/工装',
    tags: ['混沌','奸奇','奸奇信徒','灵能者(PR1)','凡人'],
    hp: 2, maxHp: 2, ahp: 2, movement: 1,
    baseMeleeDamage: '0 (S/20)',
    weaponStats:`);
tzeentchContent = tzeentchContent.replace(/name: '奸奇学徒术士',[\s\S]*?weaponStats:/m, `name: '奸奇学徒术士',
    status: '灵能邪教信徒',
    attributes: {weaponSkill:12,ballisticSkill:15,strength:10,toughness:12,agility:12,intelligence:20,perception:15,willpower:25,fellowship:15},
    trait: '【诡道魔法】：战斗前自动获知一名敌人的一项弱点。当角色对他人使用灵能时，目标的意志(WP)-20；【体型·普通】：被攻击时，该生物的敏捷(Ag)不受影响。移动力+0',
    skill: '欺诈, 闪避, 禁忌知识·恶魔学, 灵能天赋',
    equipment: '临时法杖, 激光手枪, 破布/工装',
    tags: ['混沌','奸奇','奸奇信徒','灵能者(PR2)','凡人'],
    hp: 2, maxHp: 2, ahp: 2, movement: 1,
    baseMeleeDamage: '0 (S/20)',
    weaponStats:`);
tzeentchContent = tzeentchContent.replace(/name: '奸奇邪教祭司',[\s\S]*?weaponStats:/m, `name: '奸奇邪教祭司',
    status: '凡人高阶灵能者',
    attributes: {weaponSkill:15,ballisticSkill:15,strength:12,toughness:12,agility:15,intelligence:40,perception:20,willpower:35,fellowship:20},
    trait: '【奇想妙思】：智力(Int)+20，获得「禁忌知识·恶魔学」技能；【诡道魔法】：战斗前自动获知一名敌人的一项弱点。当角色对他人使用灵能时，目标的意志(WP)-20；【体型·普通】：被攻击时，该生物的敏捷(Ag)不受影响。移动力+0',
    skill: '欺诈, 闪避, 禁忌知识·恶魔学, 威吓, 灵能天赋',
    equipment: '变异真理法杖, 地狱手枪, 重型防弹甲',
    tags: ['混沌','奸奇','奸奇信徒','灵能者(PR4)','凡人'],
    hp: 2, maxHp: 2, ahp: 15, movement: 1,
    baseMeleeDamage: '0 (S/20)',
    weaponStats:`);
tzeentchContent = tzeentchContent.replace(/name: '奸奇大魔导师',[\s\S]*?weaponStats:/m, `name: '奸奇大魔导师',
    status: '凡人至高灵能者',
    attributes: {weaponSkill:20,ballisticSkill:20,strength:15,toughness:15,agility:15,intelligence:45,perception:25,willpower:45,fellowship:25},
    trait: '【奇想妙思】：智力(Int)+20，获得「禁忌知识·恶魔学」技能；【诡道魔法】：战斗前自动获知一名敌人的一项弱点。当角色对他人使用灵能时，目标的意志(WP)-20；【亚空间道标】：该单位在施展灵能时相关意志额外获得+10加成；【断罪预言】：施展预言类灵能时意志属性获得+10加成；【体型·普通】：被攻击时，该生物的敏捷(Ag)不受影响。移动力+0',
    skill: '禁忌知识·亚空间, 禁忌知识·恶魔学, 欺诈, 闪避, 威吓, 灵能天赋',
    equipment: '精工灵能剑, 地狱手枪, 甲壳甲',
    tags: ['混沌','奸奇','奸奇信徒','灵能者(PR6)','凡人'],
    hp: 3, maxHp: 3, ahp: 10, movement: 1,
    baseMeleeDamage: '0 (S/20)',
    weaponStats:`);
fs.writeFileSync(tzeentchPath, tzeentchContent, 'utf8');

// Slaanesh Cultists
const slaaneshPath = path.join(process.cwd(), 'lib/knowledge/bestiary/slaanesh/slaanesh_cultists.ts');
let slaaneshContent = fs.readFileSync(slaaneshPath, 'utf8');
slaaneshContent = slaaneshContent.replace(/name: '色孽教徒',[\s\S]*?weaponStats:/m, `name: '色孽教徒',
    status: '堕落享乐者',
    attributes: {weaponSkill:15,ballisticSkill:12,strength:10,toughness:10,agility:17,intelligence:10,perception:15,willpower:12,fellowship:20},
    trait: '【极乐迅捷】：敏捷(Ag)+5，行走/冲锋/奔跑距离翻倍；【体型·普通】：被攻击时，该生物的敏捷(Ag)不受影响。移动力+0',
    skill: '闪避, 魅力, 欺诈',
    equipment: '亵渎匕首, 衣物',
    tags: ['混沌','色孽','色孽信徒','凡人'],
    hp: 2, maxHp: 2, ahp: 2, movement: 1,
    baseMeleeDamage: '0 (S/20)',
    weaponStats:`);
fs.writeFileSync(slaaneshPath, slaaneshContent, 'utf8');

// Chaos Cultists
const cultsPath = path.join(process.cwd(), 'lib/knowledge/bestiary/chaos_cults/cultists.ts');
let cultsContent = fs.readFileSync(cultsPath, 'utf8');
cultsContent = cultsContent.replace(/name: '邪教徒暴徒',[\s\S]*?weaponStats:/m, `name: '邪教徒暴徒',
    status: '炮灰',
    attributes: {weaponSkill:10,ballisticSkill:10,strength:10,toughness:10,agility:10,intelligence:8,perception:10,willpower:10,fellowship:10},
    trait: '【狂热人海】：当周围有3个以上友军时，免疫恐惧；【体型·普通】：被攻击时，该生物的敏捷(Ag)不受影响。移动力+0',
    skill: '威吓, 求生',
    equipment: '自动手枪, 生锈锁子甲',
    tags: ['混沌', '混沌邪教徒', '凡人', '邪教徒'],
    hp: 2, maxHp: 2, ahp: 2, movement: 1,
    baseMeleeDamage: '0 (S/20)',
    weaponStats:`);
cultsContent = cultsContent.replace(/name: '邪教煽动者',[\s\S]*?weaponStats:/m, `name: '邪教煽动者',
    status: '精锐邪教徒',
    attributes: {weaponSkill:15,ballisticSkill:15,strength:15,toughness:15,agility:12,intelligence:12,perception:15,willpower:20,fellowship:20},
    trait: '【狂怒祷言】：该单位在战场高呼圣诗时，15米内所有友军的近战攻击伤害+2；【体型·普通】：被攻击时，该生物的敏捷(Ag)不受影响。移动力+0',
    skill: '威吓, 领导, 警觉',
    equipment: '野蛮战斧, 防弹甲, 自动手枪',
    tags: ['混沌', '混沌邪教徒', '凡人', '精锐'],
    hp: 3, maxHp: 3, ahp: 5, movement: 1,
    baseMeleeDamage: '0 (S/20)',
    weaponStats:`);
cultsContent = cultsContent.replace(/name: '邪教导师',[\s\S]*?weaponStats:/m, `name: '邪教导师',
    status: '邪教灵能领袖',
    attributes: {weaponSkill:12,ballisticSkill:12,strength:10,toughness:12,agility:10,intelligence:25,perception:20,willpower:30,fellowship:20},
    trait: '【灵能干涉】：可反制20米内的敌方灵能施法；【体型·普通】：被攻击时，该生物的敏捷(Ag)不受影响。移动力+0',
    skill: '禁忌知识·恶魔学, 欺诈, 闪避, 灵能天赋',
    equipment: '变异真理法杖, 自动手枪, 甲壳甲',
    tags: ['混沌', '混沌邪教徒', '凡人', '灵能者(PR3)'],
    hp: 2, maxHp: 2, ahp: 10, movement: 1,
    baseMeleeDamage: '0 (S/20)',
    weaponStats:`);
fs.writeFileSync(cultsPath, cultsContent, 'utf8');

console.log('Fixed mortal stats');

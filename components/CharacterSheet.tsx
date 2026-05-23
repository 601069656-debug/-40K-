import React, { useState, useEffect, useMemo } from 'react';
import { extractCharacterUpdate } from '../services/parserService';
import { Character, NPCProfile, Skill, TraitData, ShopItem } from '../types';
import { THEME_COLORS, FACTION_SKILLS_DATA } from '../constants';
import { Button } from './Button';
import { motion, AnimatePresence } from 'motion/react';
import { getItemByName, SHOP_ITEMS, parseStoredItem, canCharacterUseItem, calculateArmorRating } from '../lib/armoryUtils';
import { Shield, Sword, Activity, Skull, Zap, FileText, Check, Plus, X as XIcon, Box, ShoppingBag, Sparkles } from 'lucide-react';

const REGULAR_SKILLS_DATA = [
  { name: '警觉', stat: 'Per', desc: '侦查、发现陷阱、预感危险时 +10/级' },
  { name: '纵酒', stat: 'T', desc: '抵抗酒精、毒气、麻醉剂时 +10/级' },
  { name: '魅力', stat: 'Fel', desc: '与NPC非敌对互动、说服、安抚时 +10/级' },
  { name: '攀爬', stat: 'S', desc: '攀爬任何表面时 +10/级' },
  { name: '指挥', stat: 'Fel', desc: '对下属/盟军下达命令、组织防御时 +10/级' },
  { name: '躲藏', stat: 'Ag', desc: '尝试隐藏自己时 +10/级' },
  { name: '柔术', stat: 'Ag', desc: '挤过狭窄缝隙、挣脱捆绑、擒抱脱身时 +10/级' },
  { name: '欺诈', stat: 'Fel', desc: '说谎、伪装、误导时 +10/级' },
  { name: '闪避', stat: 'Ag', desc: '躲避单次远程或近战攻击时 +10/级' },
  { name: '评估', stat: 'Int', desc: '判断物品价值、弱点、真伪时 +10/级' },
  { name: '赌博', stat: 'Per', desc: '参与概率游戏、赌局时 +10/级' },
  { name: '调查', stat: 'Fel', desc: '收集情报、打听消息时 +10/级' },
  { name: '恐吓', stat: 'S/Fel', desc: '威胁、逼迫他人时 +10/级' },
  { name: '逻辑', stat: 'Int', desc: '推理、解谜、分析复杂信息时 +10/级' },
  { name: '察言观色', stat: 'Per', desc: '判断对方是否撒谎、隐藏情绪时 +10/级' },
  { name: '搜索', stat: 'Per', desc: '系统搜查一个区域时 +10/级' },
  { name: '潜行', stat: 'Ag', desc: '无声移动、暗中接近时 +10/级' },
  { name: '游泳', stat: 'S', desc: '在水中游动、救援时 +10/级' },
  { name: '特技', stat: 'Ag', desc: '高处跳下、窄边奔跑、杂技动作时 +10/级' },
  { name: '化学应用', stat: 'Int', desc: '配制毒药、炸药、解毒剂时 +10/级' },
  { name: '爆破', stat: 'Int', desc: '设置或拆除爆炸物时 +10/级' },
  { name: '驾驶', stat: 'Ag', desc: '操控载具进行高难度动作时 +10/级' },
  { name: '审讯', stat: 'WP', desc: '从俘虏口中获取情报时 +10/级' },
  { name: '祈求', stat: 'WP', desc: '向神皇/神明祈求指引时 +10/级' },
  { name: '读唇', stat: 'Per', desc: '远距离读取对话时 +10/级' },
  { name: '医疗', stat: 'Int', desc: '战场急救、治疗重伤时 +10/级' },
  { name: '入侵', stat: 'Ag', desc: '开锁、破解安全系统时 +10/级' },
  { name: '手上功夫', stat: 'Ag', desc: '偷窃、藏匿物品时 +10/级' },
  { name: '生存', stat: 'Int', desc: '极端环境中找食物、水、庇护所时 +10/级' },
  { name: '战术', stat: 'Int', desc: '指挥小队、预判敌人动向时 +10/级' },
  { name: '追迹', stat: 'Per', desc: '追踪生物痕迹时 +10/级' },
];

const KNOWLEDGE_SKILLS_DATA = [
  { name: '普通知识·法务部', stat: 'Int', desc: '了解帝国执法机构的组织结构、权限范围和常用手段，知道如何回避或利用他们' },
  { name: '普通知识·阿斯塔特修会', stat: 'Int', desc: '知晓星际战士各大战团的基本情况——徽章、作战风格、著名战役和家园世界' },
  { name: '普通知识·机械教', stat: 'Int', desc: '理解机械教的信仰、仪式和等级制度，知道如何与机仆或技术神甫打交道而不冒犯机魂' },
  { name: '普通知识·内政部', stat: 'Int', desc: '熟悉内政部庞大的官僚体系、文件流转和常见拖延手段，能设法让自己的请求更快通过审批' },
  { name: '普通知识·国教', stat: 'Int', desc: '掌握帝国国教的节日、仪式、圣人和教义，能参与宗教活动而不引起怀疑，或与教士顺畅交流' },
  { name: '普通知识·帝国教义', stat: 'Int', desc: '熟知帝皇信仰的核心教条、祷文和禁忌，能判断哪些行为构成异端，或伪装成虔诚朝圣者' },
  { name: '普通知识·星界军', stat: 'Int', desc: '了解星界军的编制、战术和后勤特点，能预估友军或敌军的行动模式' },
  { name: '普通知识·帝国海军', stat: 'Int', desc: '知晓帝国海军的舰艇类型、指挥链和战斗条令，能理解太空作战的基本逻辑' },
  { name: '普通知识·帝国', stat: 'Int', desc: '对帝国的主要星区、节区和著名世界有基本认识，知道哪里是危险地区、哪里是补给点' },
  { name: '普通知识·技术', stat: 'Int', desc: '懂得安抚机魂的基本祷文和仪式，能对常见机械进行简单维护，避免因无知而触怒设备' },
  { name: '普通知识·战争', stat: 'Int', desc: '知晓帝国历史上的著名战役、指挥官和战术案例，能从过往经验中汲取教训' },
  { name: '禁忌知识·阿斯塔特修会', stat: 'Int', desc: '知晓某些战团的隐秘历史、基因缺陷或内部秘密——这些通常是不为外人所知的' },
  { name: '禁忌知识·机械教', stat: 'Int', desc: '了解机械教不对外公开的黑暗仪式、禁忌科技 or 内部派系斗争' },
  { name: '禁忌知识·古代技术', stat: 'Int', desc: '知道一些失落科技装置的来历、功能和风险，能辨认出古代武器或圣物' },
  { name: '禁忌知识·黑图书馆', stat: 'Int', desc: '听闻过灵族黑图书馆的存在及其禁忌内容，知道那里藏有不可触碰的知识' },
  { name: '禁忌知识·恶魔学', stat: 'Int', desc: '知晓某些恶魔的真名、弱点和召唤仪式，面对亞空间实体时有针对性的应对手段' },
  { name: '禁忌知识·异端', stat: 'Int', desc: '了解帝国历史上著名的异端教派、他们的标志和崇拜方式，能识别出潜在的异端活动' },
  { name: '禁忌知识·审判庭', stat: 'Int', desc: '知晓审判庭内部的一些运作方式、秘密派系和著名审判官，理解其行事风格' },
  { name: '禁忌知识·变种人', stat: 'Int', desc: '了解人类变异的各种形态、成因和危险等级，能判断一个变种人是否受到混沌腐蚀' },
  { name: '禁忌知识·灵能者', stat: 'Int', desc: '知道灵能者的训练方式、风险等级和常见灵能派系，能评估一个灵能者的威胁程度' },
  { name: '禁忌知识·叛徒军团', stat: 'Int', desc: '知晓荷鲁斯叛乱时期背叛的军团名称、标志和主要人物，能识别混沌星际战士的源起' },
  { name: '禁忌知识·亚空间', stat: 'Int', desc: '理解亚空间的本质、其对现实的影响以及亚空间航行的风险，知道如何避免最坏的情况' },
  { name: '禁忌知识·异形', stat: 'Int', desc: '了解帝国已知的多种异形种族——它们的外貌、习性和弱点，能快速识别敌人类别' },
  { name: '学术知识·古代史', stat: 'Int', desc: '对帝国黑暗时代、科技纷争年代等远古历史有深入钻研，能从遗迹或文献中解读出深层含义' },
  { name: '学术知识·星象学', stat: 'Int', desc: '懂得使用望远镜、星图和占星术，能导航或预测天文现象，理解星辰对亚空间航行的潜在影响' },
  { name: '学术知识·动物学', stat: 'Int', desc: '研究过银河系中多种动物的习性、解剖学和生态位，能辨别未知生物的种类和危险程度' },
  { name: '学术知识·官僚', stat: 'Int', desc: '精通内政部的规章、办事流程和法律漏洞，能以合法或近乎合法的方式解决行政障碍' },
  { name: '学术知识·化学', stat: 'Int', desc: '掌握化学原理、化合物性质和实验室操作技巧，能合成或分析复杂的化学制品' },
  { name: '学术知识·阿斯塔特法典', stat: 'Int', desc: '深入学习过基里曼所著的阿斯塔特法典，理解星际战士战团的理想组织方式和战术原则' },
  { name: '学术知识·密码学', stat: 'Int', desc: '能创建和解码复杂的密码、暗语和加密信息，从看似随机的符号中提取真实含义' },
  { name: '学术知识·纹章学', stat: 'Int', desc: '熟悉帝国贵族、战团 and 机构的纹章、旗帜和标志，能通过纹章判断对方的身份和地位' },
  { name: '学术知识·帝国教义', stat: 'Int', desc: '深入研究过国教的神学、经典和教义争辩，能进行宗教辩论或理解细微的信仰差异' },
  { name: '学术知识·法律', stat: 'Int', desc: '了解帝国的法典、审判程序和惩罚标准，能判断某一行为在法律上的后果' },
  { name: '学术知识·传说', stat: 'Int', desc: '熟知帝国的民间传说、英雄史诗和古老预言，能从神话中提取与现实相关的情报' },
  { name: '学术知识·数字学', stat: 'Int', desc: '相信数字与特定力量之间的神秘联系，能从数字组合中解读吉凶或进行仪式性计算' },
  { name: '学术知识·神秘学', stat: 'Int', desc: '研究过超自然仪式、灵性象征和魔法物品的使用方法，能识别或施展低阶神秘操作' },
  { name: '学术知识·哲学', stat: 'Int', desc: '熟悉各种哲学流派、伦理观点和思辨方法，能进行逻辑辩论或撰写理论文章' },
  { name: '学术知识·帝国战术', stat: 'Int', desc: '深入理解帝国军队的战术手册、作战条例和经典战例，能在战场上进行专业的战术指挥' },
];


const PSYKANA_SKILLS_DATA = [
  { name: '灵能敏感', pr: 1, class: 'Omicron (ο)', risk: 0, desc: '无害但需登记。偶尔感知亚空间回响', isTalent: true, isNegativePsyker: false },
  { name: '低语通晓', pr: 2, class: 'Kappa (κ)', risk: 1, desc: '低级不稳定源。传心或移物，伴随温降', isTalent: true, isNegativePsyker: false },
  { name: '门扉轻推', pr: 3, class: 'Iota (ι)', risk: 2, desc: '正式登记灵能者。在帝国境内被严格监控', isTalent: true, isNegativePsyker: false },
  { name: '意志引导', pr: 4, class: 'Theta (θ)', risk: 3, desc: '战术资产。施展护盾或冲击波，高风险', isTalent: true, isNegativePsyker: false },
  { name: '能量通道', pr: 5, class: 'Eta (η)', risk: 4, desc: '高危导管。释放灵能风暴，审判庭紧盯', isTalent: true, isNegativePsyker: false },
  { name: '灵魂点燃者', pr: 6, class: 'Zeta (ζ)', risk: 5, desc: '精英分级。威力巨大，但失控也更加危险', isTalent: true, isNegativePsyker: false },
  { name: '深渊回响', pr: 7, class: 'Epsilon (ε)', risk: 6, desc: '现实撕裂者。足以摧毁要塞，失控极度危险', isTalent: true, isNegativePsyker: false },
  { name: '意志洪流', pr: 8, class: 'Delta (δ)', risk: 7, desc: '灭绝令预备对象。可对抗恶魔王子', isTalent: true, isNegativePsyker: false },
  { name: '先知视界', pr: 9, class: 'Gamma (γ)', risk: 8, desc: '大师级资产。十亿人中才有一位的奇才', isTalent: true, isNegativePsyker: false },
  { name: '灵魂暴君', pr: 10, class: 'Beta (β)', risk: 9, desc: '最高机密。足以扭转战局，撕裂现实', isTalent: true, isNegativePsyker: false },
  { name: '灵能掌控', desc: '每天获得等于技能等级的「克制施法」和「灵能压制」次数。降低最终风险，每级降1级。最高 Lv.10 (初始限Lv.3)', isUpgradeable: true, isTalent: false, isNegativePsyker: false },
  // 负向灵能者天赋
  { name: '灵能扰动者', nr: 1, class: 'Sigma (Σ)', desc: '帝国“灵能盲”。对灵能极度迟钝，自身无压制能力', isTalent: true, isNegativePsyker: true },
  { name: '灵能阻碍者', nr: 2, class: 'Psi (Ψ)', desc: '低级干扰源。周围灵能者会感到轻微不适，施法易分心', isTalent: true, isNegativePsyker: true },
  { name: '灵能抑制者', nr: 3, class: 'Chi (Χ)', desc: '战术级空白。主动压制低级灵能，会令盟友感到莫名厌恶', isTalent: true, isNegativePsyker: true },
  { name: '灵能隔绝者', nr: 4, class: 'Phi (Φ)', desc: '灵能死区。近处灵能施法困难，低级恶魔会逃离', isTalent: true, isNegativePsyker: true },
  { name: '灵能压制者', nr: 5, class: 'Upsilon (Υ)', desc: '高危资产。轻易压制战斗灵能者，能短暂驱散恶魔', isTalent: true, isNegativePsyker: true },
  { name: '灵魂瓦解者', nr: 6, class: 'Tau (Τ)', desc: '反灵能兵器。能撕裂护盾、湮灭灵魂。被用于对抗亚空间入侵', isTalent: true, isNegativePsyker: true },
  { name: '灵魂湮灭者', nr: 7, class: 'Omega (Ω)', desc: '亚空间的黑洞，恶魔领主也会感到寒意。帝国只会利用与清除他们', isTalent: true, isNegativePsyker: true },
];

interface CharacterSheetProps {
  character: Character;
  npcProfiles: NPCProfile[];
  onClose: () => void;
  onUpdate?: (updatedCharacter: Character) => void;
}

type Tab = 'status' | 'abilities' | 'inventory' | 'background' | 'npcs';

export const CharacterSheet: React.FC<CharacterSheetProps> = ({ character, npcProfiles, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<Tab>('status');
  const [isEditing, setIsEditing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncText, setSyncText] = useState('');
  const [editedCharacter, setEditedCharacter] = useState<Character>(character);

  // Skill Modal State
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  // Armory Modal State
  const [isArmoryModalOpen, setIsArmoryModalOpen] = useState(false);
  const [armoryTargetSlot, setArmoryTargetSlot] = useState<number | null>(null);
  const [armoryTargetType, setArmoryTargetType] = useState<'EQUIPMENT' | 'ITEM'>('EQUIPMENT');
  const [purchaseCounts, setPurchaseCounts] = useState<Record<string, number>>({});
  const [customArmoryInput, setCustomArmoryInput] = useState('');
  const [customArmoryCount, setCustomArmoryCount] = useState(1);

  const [skills, setSkills] = useState<(Skill | null)[]>(character.skills || []);

  const [equipmentList, setEquipmentList] = useState<((ShopItem & { count: number }) | null)[]>(
    Array(Math.max(12, character.equipment?.length || 0)).fill(null).map((_, i) => parseStoredItem(character.equipment?.[i] || '', character.syntheticItems))
  );

  const [itemList, setItemList] = useState<((ShopItem & { count: number }) | null)[]>(
    Array(Math.max(24, character.items?.length || 0)).fill(null).map((_, i) => parseStoredItem(character.items?.[i] || '', character.syntheticItems))
  );

  useEffect(() => {
    if (!isEditing && !isSyncing) {
      setEditedCharacter(character);
      setSkills(character.skills || []);
      setEquipmentList(Array(Math.max(12, character.equipment?.length || 0)).fill(null).map((_, i) => parseStoredItem(character.equipment?.[i] || '', character.syntheticItems)));
      setItemList(Array(Math.max(24, character.items?.length || 0)).fill(null).map((_, i) => parseStoredItem(character.items?.[i] || '', character.syntheticItems)));
    }
  }, [character, isEditing, isSyncing]);

  const handleDragStart = (e: React.DragEvent, type: 'EQUIPMENT' | 'ITEM', index: number) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type, index }));
  };

  const handleDrop = (e: React.DragEvent, dropType: 'EQUIPMENT' | 'ITEM', dropIndex: number) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      let newEqList = equipmentList;
      let newItemList = itemList;
      let didChange = false;

      if (data.type === 'EQUIPMENT' && dropType === 'EQUIPMENT') {
        const newList = [...equipmentList];
        const temp = newList[dropIndex];
        newList[dropIndex] = newList[data.index];
        newList[data.index] = temp;
        setEquipmentList(newList);
        newEqList = newList;
        didChange = true;
      } else if (data.type === 'ITEM' && dropType === 'ITEM') {
        const newList = [...itemList];
        const temp = newList[dropIndex];
        newList[dropIndex] = newList[data.index];
        newList[data.index] = temp;
        setItemList(newList);
        newItemList = newList;
        didChange = true;
      }

      if (!isEditing && didChange && onUpdate) {
        const updated = {
          ...editedCharacter,
          equipment: newEqList.filter((e): e is (ShopItem & { count: number }) => e !== null).map(e => e.count > 1 ? `${e.name} (x${e.count})` : e.name),
          items: newItemList.filter((i): i is (ShopItem & { count: number }) => i !== null).map(i => i.count > 1 ? `${i.name} (x${i.count})` : i.name)
        };
        onUpdate(updated);
      }
    } catch (err) {}
  };

  const handleSave = () => {
    // HP Safeguard: Ensure HP doesn't exceed calculated max from toughness
    const toughnessValue = finalAttrs.toughness || 10;
    const maxHpLimit = Math.max(1, Math.floor(toughnessValue / 5));
    const currentHpParts = (editedCharacter.hp || "").split('/');
    const curVal = parseInt(currentHpParts[0]) || maxHpLimit;
    const validatedHp = `${curVal > maxHpLimit ? maxHpLimit : curVal}/${maxHpLimit}`;

    const updated = {
      ...editedCharacter,
      hp: validatedHp,
      skills: skills.filter((s): s is Skill => s !== null),
      equipment: equipmentList.filter((e): e is (ShopItem & { count: number }) => e !== null).map(e => e.count > 1 ? `${e.name} (x${e.count})` : e.name),
      items: itemList.filter((i): i is (ShopItem & { count: number }) => i !== null).map(i => i.count > 1 ? `${i.name} (x${i.count})` : i.name)
    };
    if (onUpdate) {
      onUpdate(updated);
    }
    setIsEditing(false);
    setIsSyncing(false);
  };

  const parseStatusText = (text: string) => {
    if (!text.trim()) {
      setIsSyncing(false);
      return;
    }

    const { character: updatedChar } = extractCharacterUpdate(text, editedCharacter);
    
    if (updatedChar) {
      setEditedCharacter({...updatedChar});
      setIsEditing(true);
      // Give feedback that it was successful
      console.log("Archive synchronization completed.");
    } else {
      alert("同步失败：无法解析输入文本。请确保文本包含【Status】或正确的数值面板格式。");
    }
    
    setIsSyncing(false);
  };

  const psykanaDetails = React.useMemo(() => {
    let maxPR = 0;
    let maxNR = 0;
    (skills || []).forEach(s => {
      if (!s) return;
      if (s.pr && !s.isNegativePsyker) maxPR = Math.max(maxPR, s.pr);
      if (s.nr && s.isNegativePsyker) maxNR = Math.max(maxNR, s.nr);
    });

    const prRanks: Record<number, string> = { 1: 'ο', 2: 'κ', 3: 'ι', 4: 'θ', 5: 'η', 6: 'ζ', 7: 'ε', 8: 'δ', 9: 'γ', 10: 'β', 11: 'α', 12: 'α+', 13: 'α++' };
    const nrRanks: Record<number, string> = { 1: 'Σ', 2: 'Ψ', 3: 'Χ', 4: 'Φ', 5: 'Υ', 6: 'Τ', 7: 'Ω' };

    if (maxPR > 0) return { isActive: true, label: `灵能等级: ${maxPR}`, rank: prRanks[maxPR] || 'ο', color: 'text-purple-400' };
    if (maxNR > 0) return { isActive: true, label: `压制等级: ${maxNR}`, rank: nrRanks[maxNR] || 'Σ', color: 'text-teal-400' };

    const isPsykana = character.lineage?.includes('智库') || character.lineage?.includes('灵能');
    return { isActive: isPsykana, label: isPsykana ? '已觉醒' : '未觉醒', rank: 'NONE', color: isPsykana ? 'text-purple-500' : 'text-slate-500' };
  }, [character, skills]);

  const extraModifiers = React.useMemo(() => {
    const mods = { weaponSkill: 0, ballisticSkill: 0, strength: 0, toughness: 0, agility: 0, intelligence: 0, perception: 0, willpower: 0, fellowship: 0 };
    
    [...equipmentList, ...itemList].forEach(item => {
      if (item?.stats?.toughness) {
         const tVal = parseInt(String(item.stats.toughness).replace(/[+]/g, ''));
         if (!isNaN(tVal)) mods.toughness += tVal;
      }
      if (item?.stats?.mod) {
        const modStr = String(item.stats.mod);
        const modParts = modStr.split(/[,，]/);
        modParts.forEach(part => {
          const p = part.trim();
          const match = p.match(/(武器技能|射击技能|力量|坚韧|敏捷|智力|感知|意志力|意志|社交能力|社交|交际|WS|BS|S|T|Ag|Int|Per|WP|Fel)\s*(?:\([a-zA-Z/]+\))?\s*([+-]\d+)/);
          if (match) {
            const label = match[1];
            const val = parseInt(match[2]);
            if (label === '力量' || label === 'S') mods.strength += val;
            else if (label === '感知' || label === 'Per') mods.perception += val;
            else if (label === '意志' || label === '意志力' || label === 'WP') mods.willpower += val;
            else if (label === '敏捷' || label === 'Ag') mods.agility += val;
            else if (label === '智力' || label === 'Int') mods.intelligence += val;
            else if (label === '社交' || label === '交际' || label === '社交能力' || label === 'Fel') mods.fellowship += val;
            else if (label === '武器技能' || label === 'WS') mods.weaponSkill += val;
            else if (label === '射击技能' || label === '射击' || label === 'BS' || label === '步兵枪法') mods.ballisticSkill += val;
            else if (label === '坚韧' || label === 'T') mods.toughness += val;
          }
        });
      }
    });

    skills.forEach(skill => {
      if (!skill) return;
      const level = skill.level || 1;
      if (skill.name === '混沌赐福') {
        mods.strength += 5 * level;
        mods.toughness += 5 * level;
        mods.willpower += 5 * level;
      } else if (skill.name === '战斗训练') {
        mods.weaponSkill += 5 * level;
        mods.ballisticSkill += 5 * level;
      } else if (skill.name === '神圣狂热') {
        mods.willpower += 10 * level;
      } else if (skill.name === '帝皇禁卫') {
        mods.strength += 5 * level;
        mods.toughness += 5 * level;
        mods.weaponSkill += 5 * level;
      }
    });

    if (character.chaosBlessing === '欢愉之躯') mods.agility += 15;
    else if (character.chaosBlessing === '奇想妙思') mods.intelligence += 20;
    else if (character.chaosBlessing === '肉体再生') mods.toughness += 10;
    else if (character.chaosBlessing === '混沌眷顾') { mods.perception += 10; mods.willpower += 10; }
    else if (character.chaosBlessing === '混沌印记') { mods.strength += 5; mods.toughness += 5; mods.agility += 5; mods.intelligence += 5; }

    if (character.faithLevel) {
      const fl = character.faithLevel;
      if (fl >= 2) mods.willpower += 5;
      if (fl >= 3) mods.willpower += 5;
      if (fl >= 4) mods.willpower += 5;
      if (fl >= 5) {
        Object.keys(mods).forEach(k => {
          (mods as any)[k] += 10;
        });
      }
    }

    if (character.corruptionValue) {
      const cv = character.corruptionValue;
      if (cv >= 40 && cv <= 59) {
        mods.willpower -= 5;
        mods.fellowship -= 10;
      } else if (cv >= 100 && cv <= 149) {
        Object.keys(mods).forEach(k => (mods as any)[k] += 5);
      } else if (cv >= 150 && cv <= 199) {
        Object.keys(mods).forEach(k => (mods as any)[k] += 10);
      } else if (cv >= 200 && cv <= 249) {
        Object.keys(mods).forEach(k => (mods as any)[k] += 15);
      } else if (cv >= 250 && cv <= 299) {
        Object.keys(mods).forEach(k => (mods as any)[k] += 20);
      } else if (cv >= 300 && cv <= 349) {
        Object.keys(mods).forEach(k => (mods as any)[k] += 25);
      } else if (cv >= 350 && cv <= 399) {
        Object.keys(mods).forEach(k => (mods as any)[k] += 30);
      } else if (cv >= 400 && cv <= 449) {
        Object.keys(mods).forEach(k => (mods as any)[k] += 35);
      } else if (cv >= 450 && cv <= 499) {
        Object.keys(mods).forEach(k => (mods as any)[k] += 45);
      } else if (cv >= 500) {
        Object.keys(mods).forEach(k => (mods as any)[k] += 60);
      }
    }

    (character.traits || []).forEach(t => {
      const desc = t.desc || '';
      
      // Check for "All attributes +X" (所有属性/全属性 +X)
      const allAttrMatch = desc.match(/(?:所有属性|全属性)[^+-]*([+-]\d+)/);
      if (allAttrMatch) {
        const val = parseInt(allAttrMatch[1]);
        if (!isNaN(val)) {
          Object.keys(mods).forEach(k => (mods as any)[k] += val);
        }
      }

      // Generic Extraction from trait description
      const attrRegex = /(武器技能|射击技能|攻击技能|力量|坚韧|敏捷|智力|感知|意志力|意志|社交能力|社交|交际|WS|BS|S|T|Ag|Int|Per|WP|Fel)\s*(?:\([a-zA-Z/]+\))?\s*([+-]\d+)/g;
      let match;
      while ((match = attrRegex.exec(desc)) !== null) {
        // Prevent parsing conditional modifiers that should not be applied to base stats.
        let prefix = desc.slice(0, match.index);
        const lastPunc = Math.max(prefix.lastIndexOf('。'), prefix.lastIndexOf('；'), prefix.lastIndexOf('.'), prefix.lastIndexOf(';'));
        if (lastPunc !== -1) prefix = prefix.slice(lastPunc + 1);
        const isConditional = /时|对抗|视为|期间|若|当|针对|潜行|冲锋|射击|防御|驾驶|飞行|环境[中下]|状态[中下]|每次|受到|如果|次|每回合|每天|回合/.test(prefix);
        if (isConditional) continue;

        const label = match[1];
        const val = parseInt(match[2]);
        if (isNaN(val)) continue;
        switch (label) {
          case '武器技能': case 'WS': mods.weaponSkill += val; break;
          case '射击技能': case '攻击技能': case 'BS': case '射击': mods.ballisticSkill += val; break;
          case '力量': case 'S': mods.strength += val; break;
          case '坚韧': case 'T': mods.toughness += val; break;
          case '敏捷': case 'Ag': mods.agility += val; break;
          case '智力': case 'Int': mods.intelligence += val; break;
          case '感知': case 'Per': mods.perception += val; break;
          case '意志': case '意志力': case 'WP': mods.willpower += val; break;
          case '社交': case '社交能力': case '交际': case 'Fel': mods.fellowship += val; break;
        }
      }

      // 2. Specialized Overrides for non-standard descriptions
      if (t.name === '装甲植入' && !t.desc.includes('坚韧+10')) mods.toughness += 10;
      else if (t.name === '机械化·初级' && !t.desc.includes('力量+5')) mods.strength += 5;
      else if (t.name === '机械化·中级' && !t.desc.includes('坚韧+10')) { mods.strength += (t.desc.includes('力量+5') ? 0 : 5); mods.toughness += 10; }
      else if (t.name === '机械化·高级' && !t.desc.includes('力量+10')) { mods.strength += 10; mods.toughness += 10; }
      else if (t.name === '原铸改造' && !t.desc.includes('力量+5')) { mods.strength += 5; mods.toughness += 5; mods.agility += 5; }
      else if (t.name === '多臂' && !t.desc.includes('坚韧+10')) mods.toughness += 10;
      else if (t.name === '帝皇守护者') {
        // Handled by regex if in description, but keeping these as double-check for safety
        if (!t.desc.includes('WS+5')) {
          mods.weaponSkill +=5; mods.ballisticSkill += 5; mods.strength += 5; mods.toughness += 5; mods.agility += 5; mods.intelligence += 5; mods.perception += 5; mods.willpower += 5; mods.fellowship += 5;
        }
      }
      else if (t.name === '鲜血狂怒' && !t.desc.includes('WS+5')) mods.weaponSkill += 5;
      else if (t.name === '腐败坚韧' && !t.desc.includes('坚韧+5')) mods.toughness += 5;
      else if (t.name === '极乐迅捷' && !t.desc.includes('敏捷+5')) mods.agility += 5;
    });

    return mods;

    return mods;
  }, [character, equipmentList, itemList, skills]);

  const getDaemonWeaponStats = (item: ShopItem, cv: number) => {
    const daemonWeaponNames = ['恶魔武器', '恐虐', '奸奇', '纳垢', '色孽', '亚空间武器'];
    const isDaemon = daemonWeaponNames.some(name => item.name.includes(name)) || (item.stats?.desc && item.stats.desc.includes('恶魔武器'));
    
    if (!isDaemon || cv < 200) return null;

    const level = Math.floor((cv - 200) / 100);
    const power = Math.min(50, 20 + level * 10);
    const damage = Math.min(20, 14 + level * 2);

    return { power, damage };
  };

  const corruptionEffects = useMemo(() => {
    const cv = character.corruptionValue || 0;
    const effects: string[] = [];
    if (cv >= 40 && cv <= 59) effects.push('由于性格变得阴郁，意志(WP)-5，社交(Fel)-10');
    if (cv >= 60 && cv <= 79) effects.push('已获得一个混沌特性 (如：肉体再生/混沌印记等)');
    if (cv >= 80 && cv <= 99) effects.push('耳边回响着神秘的低语；垂死时(HP=0)且意志≤80则异变为混沌卵');
    if (cv >= 100) effects.push('堕落已被锚定，无法再通过净化手段降低任何腐化值');
    if (cv >= 100 && cv <= 149) effects.push('全属性+5，灵能伤害计算时WP+20，无法隐藏腐化');
    if (cv >= 150 && cv <= 199) effects.push('全属性+10(累计)，灵能伤害计算时WP+40，禁止与帝国正常交流');
    if (cv >= 200 && cv <= 249) effects.push('全属性+15(累计)，获赐恶魔武器，凡人见之即陷入恐惧/疯狂');
    if (cv >= 250 && cv <= 299) effects.push('全属性+20(累计)，免疫恐惧与眩晕');
    if (cv >= 300 && cv <= 349) effects.push('全属性+25(累计)，灵能伤害WP+60，无法使用任何帝国装备');
    if (cv >= 350 && cv <= 399) effects.push('全属性+30(累计)，获得「梦魇具现」特质');
    if (cv >= 400 && cv <= 449) effects.push('全属性+35(累计)，灵能伤害WP+80，非混沌单位产生永久仇恨');
    if (cv >= 450 && cv <= 499) effects.push('全属性+45(累计)，攻击无视目标的坚韧值(T)');
    if (cv >= 500) effects.push('全属性+60(累计)，每分钟恢复5HP，全负性免疫，可飞行/召唤恶魔');
    return effects;
  }, [character.corruptionValue]);

  const ammoSummary = useMemo(() => {
    const counts: Record<string, number> = {};
    [...equipmentList, ...itemList].forEach(slot => {
      if (!slot) return;
      
      if (slot.category && (
        slot.category.includes('武器') ||
        slot.category.includes('护甲') ||
        slot.category.includes('盔甲') ||
        slot.category.includes('防具') ||
        slot.category.includes('服件') ||
        slot.category.includes('饰品')
      )) return;
      // Exclude bulletproof (防弹) or block-bullet (避弹) protective items containing character '弹'
      if (slot.name.includes('防弹') || slot.name.includes('避弹')) return;

      const isAmmo = slot.name.includes('弹') || slot.name.includes('箭矢') || slot.name.includes('电池') || (slot.category && slot.category.includes('弹药'));
      const isConsumable = slot.name.includes('食物') || slot.name.includes('饮水') || slot.category?.includes('补给') || slot.category?.includes('消耗');
      
      if (!isAmmo && !isConsumable) return;

      let amount = 1;
      const desc = slot.stats?.desc;
      if (desc) {
         const m = desc.match(/(\d+)\s*(?:发|支|枚|次|日|份)/);
         if (m) {
           amount = parseInt(m[1], 10);
         } else if (desc.includes('单枚') || desc.includes('单份')) {
           amount = 1;
         }
      }
      
      let baseName = (slot.name || '').replace(/弹匣|燃料罐|罐|电容器|高容量|弹夹|弹鼓|弹药箱|配给|淡水/g, '').trim();
      if (!baseName) baseName = slot.name;

      counts[baseName] = (counts[baseName] || 0) + (amount * slot.count);
    });
    return counts;
  }, [equipmentList, itemList]);

  const finalAttrs = useMemo(() => {
    const final: Record<string, number> = { ...editedCharacter.attributes };
    (Object.keys(editedCharacter.attributes) as string[]).forEach(key => {
      final[key as keyof typeof final] = Math.max(1, ((editedCharacter.attributes as any)[key] as number) + ((extraModifiers as any)[key] || 0));
    });
    return final;
  }, [editedCharacter.attributes, extraModifiers]);

  const finalMV = useMemo(() => {
    const mvBase = Math.max(1, Math.floor(finalAttrs.agility / 10));
    let hasSpecialFormula = false;
    let specialMV = 0;
    let mvMod = 0;
    let mvMultiplier = 1;

    (editedCharacter.traits || []).forEach(t => {
      // Sizes
      if (t.name === '体型·微小') mvMod -= 3;
      else if (t.name === '体型·超小') mvMod -= 2;
      else if (t.name === '体型·小型') mvMod -= 1;
      else if (t.name === '体型·大型') mvMod += 1;
      else if (t.name === '体型·超大') mvMod += 2;
      else if (t.name === '体型·巨大') mvMod += 3;
      
      // Other Flat Modifiers
      else if (['天降死神', '隧道之子', '沙漠之狐', '虚空之速', '掠夺者狂潮'].includes(t.name)) mvMod += 2;

      // Special Formulas
      if (t.name === '飞行' || t.name === '超自然速度') {
        hasSpecialFormula = true;
        specialMV = Math.max(specialMV, Math.ceil(finalAttrs.agility / 5));
      } else if (t.name === '四足生物') {
        hasSpecialFormula = true;
        specialMV = Math.max(specialMV, Math.floor(finalAttrs.agility / 10) * 2);
      } else if (t.name === '无定形' || t.name === '腹足生物') {
        hasSpecialFormula = true;
        specialMV = Math.max(specialMV, Math.max(1, Math.floor(finalAttrs.agility / 20)));
      }

      // Multipliers
      if (['瘟疫坚毅', '腐败坚韧', '纳垢军团成员'].includes(t.name)) mvMultiplier *= 0.5;
    });

    const mv = hasSpecialFormula ? specialMV : mvBase;
    return Math.max(1, Math.floor((mv + mvMod) * mvMultiplier));
  }, [finalAttrs.agility, editedCharacter.traits]);

  const categories = [...new Set(SHOP_ITEMS.map(i => i.category))];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/95 overflow-hidden font-mono text-zinc-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="w-full h-full md:max-w-6xl md:max-h-[850px] flex flex-col bg-black border-2 border-zinc-900 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-imperial-red/50 z-50" />
        
        {/* Header */}
        <div className="p-6 md:p-8 border-b-2 border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 bg-zinc-950">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-zinc-800 flex items-center justify-center bg-zinc-900 relative shrink-0">
                 <Skull size={32} className="text-zinc-700 opacity-20 absolute" />
                 <span className="text-2xl md:text-4xl font-black text-white z-10">{character.name[0]}</span>
              </div>
              <div>
                 <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">{character.name.slice(1)}</h2>
                 <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 opacity-60">
                   {character.socialIdentity} // {character.originWorld || 'UNKNOWN ORIGIN'} // CLASSIFIED
                 </p>
              </div>
           </div>
           
           <div className="flex gap-4 items-center">
              <Button onClick={() => setIsSyncing(true)} variant="ghost" className="text-[10px] uppercase tracking-widest border-zinc-800 hover:text-white">同步终端</Button>
              <Button onClick={() => setIsEditing(!isEditing)} variant="ghost" className="text-[10px] uppercase tracking-widest border-zinc-800 hover:text-white">{isEditing ? '取消' : '开启数据链'}</Button>
              {isEditing && <Button onClick={handleSave} className="text-[10px] border-imperial-red text-imperial-red hover:bg-imperial-red hover:text-white uppercase tracking-widest font-black">存入档案</Button>}
              <Button onClick={onClose} variant="ghost" className="p-2 border-zinc-800 hover:text-white"><XIcon size={18} /></Button>
           </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-900 bg-zinc-950/50 relative z-10">
          {(['status', 'abilities', 'inventory', 'background', 'npcs'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-[10px] md:text-xs uppercase tracking-widest font-black transition-all border-r border-zinc-900 last:border-r-0 ${activeTab === tab ? 'text-white bg-zinc-900 shadow-[inset_0_-2px_0_rgba(220,38,38,1)]' : 'text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900/50'}`}
            >
              {tab === 'status' && '档案核准 (STATUS)'}
              {tab === 'abilities' && '专精特长 (ABILITIES)'}
              {tab === 'inventory' && '军械战备 (ARMORY)'}
              {tab === 'background' && '服役记录 (RECORDS)'}
              {tab === 'npcs' && '情报网 (INTEL)'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-black relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.02] pointer-events-none" />
           <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-5xl mx-auto h-full"
              >
                {activeTab === 'status' && (
                  <div className="space-y-6 lg:space-y-8 pb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 border border-zinc-800 bg-zinc-950/50 space-y-4">
                        <h4 className="text-sm text-slate-300 font-bold uppercase tracking-widest border-b border-zinc-800 pb-2 mb-4">身份识别 (Ident)</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                          <div><span className="block text-[9px] text-zinc-500 uppercase">真名/头衔</span><span className="text-slate-100 font-mono">{editedCharacter.name || '未指定'}</span></div>
                          <div><span className="block text-[9px] text-zinc-500 uppercase">别名/称号</span><span className="text-slate-300 font-mono">{editedCharacter.title || '无'}</span></div>
                          <div><span className="block text-[9px] text-zinc-500 uppercase">母星/出生地</span><span className="text-slate-300 font-mono">{editedCharacter.originWorld || '未知'}</span></div>
                          <div><span className="block text-[9px] text-zinc-500 uppercase">性别</span><span className="text-slate-300 font-mono">{editedCharacter.gender}</span></div>
                          <div className="col-span-2">
                            <span className="block text-[9px] text-zinc-500 uppercase font-black tracking-widest pb-1 border-b border-zinc-900/50 mb-1">出身阶层 / 社会认证 (RANK)</span>
                            <span className="text-imperial-red font-mono font-black text-xs">{editedCharacter.socialIdentity}</span>
                          </div>
                          <div className="pt-2 border-t border-zinc-900/30 group relative cursor-help">
                            <span className="block text-[9px] text-zinc-500 uppercase">信仰等级 (Faith)</span>
                            <span className="text-amber-500 font-mono font-bold text-xs">{editedCharacter.faithLevel || 0}</span>
                            
                            {/* Faith Benefits Hover */}
                            <div className="absolute left-0 top-full mt-2 w-64 p-4 bg-zinc-950 border-2 border-amber-900/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 font-mono pointer-events-none break-words whitespace-pre-wrap">
                              <div className="text-[10px] text-amber-600 font-black mb-2 tracking-widest border-b border-amber-900/50 pb-1">FAITH_PROTOCOLS_ACTIVE</div>
                              <ul className="space-y-2 text-[10px]">
                                {(!editedCharacter.faithLevel || editedCharacter.faithLevel <= 1) && <li className="text-zinc-600 italic">暂无积极信仰加成。</li>}
                                {editedCharacter.faithLevel && editedCharacter.faithLevel >= 2 && (
                                  <li className="flex gap-2"><span className="text-amber-500">[LV2]</span> <span className="text-zinc-300">意志(WP) +5</span></li>
                                )}
                                {editedCharacter.faithLevel && editedCharacter.faithLevel >= 3 && (
                                  <li className="flex gap-2"><span className="text-amber-500">[LV3]</span> <span className="text-zinc-300">意志(WP) +5 (累计+10)，解锁HP恢复。</span></li>
                                )}
                                {editedCharacter.faithLevel && editedCharacter.faithLevel >= 4 && (
                                  <li className="flex gap-2"><span className="text-amber-500">[LV4]</span> <span className="text-zinc-300">意志(WP) +5 (累计+15)，腐化获取减半。</span></li>
                                )}
                                {editedCharacter.faithLevel && editedCharacter.faithLevel >= 5 && (
                                  <li className="flex gap-2"><span className="text-amber-500">[LV5]</span> <span className="text-blue-400 font-black">【活圣人】全属性 +10，免疫恐惧。</span></li>
                                )}
                              </ul>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-zinc-900/30">
                            <span className="block text-[9px] text-zinc-500 uppercase">腐化值 (Corruption)</span>
                            <span className="text-purple-500 font-mono font-bold text-xs">{editedCharacter.corruptionValue || 0}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 border border-zinc-800 bg-zinc-950/40 relative group">
                        <div className="absolute top-0 right-0 p-1 opacity-20"><Zap size={12} /></div>
                        <h4 className="text-[11px] text-yellow-600 font-black uppercase tracking-[0.2em] border-b border-zinc-800 pb-2 mb-4">战略资产与资源 (STRATEGIC_ASSETS)</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs font-mono">
                          <div>
                            <span className="block text-[8px] text-zinc-600 uppercase mb-0.5">主要资源 / ASSETS</span>
                            <span className="text-yellow-500 font-black">{editedCharacter.funds || '0'}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] text-zinc-600 uppercase mb-0.5">后勤补给 / LOGISTICS</span>
                            <span className="text-amber-600 font-black">{editedCharacter.provisions || '标配'}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] text-zinc-600 uppercase mb-0.5">誓言卫队 / FORCES</span>
                            <span className="text-blue-500 font-black">{editedCharacter.forces || '个人'}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] text-zinc-600 uppercase mb-0.5">战区影响力 / PRESTIGE</span>
                            <span className="text-emerald-500 font-black">{editedCharacter.popularity || '100%'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 border border-zinc-800 bg-zinc-950/40 relative group">
                        <div className="absolute top-0 right-0 p-1 opacity-20"><Shield size={12} /></div>
                        <h4 className="text-[11px] text-zinc-400 font-black uppercase tracking-[0.2em] border-b border-zinc-800 pb-2 mb-4">履历与从属 (SERVICE_CERT)</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs font-mono">
                          <div className="col-span-2">
                            <span className="block text-[9px] text-zinc-600 uppercase mb-1">教义 / DOCTRINE</span>
                            <span className="text-zinc-300 leading-tight block">{editedCharacter.alignment || '未申报'}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="block text-[9px] text-zinc-600 uppercase mb-1">编制 (UNIT_ID)</span>
                            <span className="text-blue-500 font-black tracking-tight">{editedCharacter.allegiance || editedCharacter.lineage} {(editedCharacter.subFaction && editedCharacter.subFaction !== editedCharacter.allegiance && editedCharacter.subFaction !== editedCharacter.lineage) ? ` // ${editedCharacter.subFaction}` : ''}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="block text-[9px] text-zinc-600 uppercase mb-1">性格与倾向 (BEHAVIOR)</span>
                            <span className="text-zinc-400">{editedCharacter.personality}</span>
                          </div>
                          {editedCharacter.chaosBlessing && (
                            <div className="col-span-2 pt-2 border-t border-zinc-900/30">
                              <span className="block text-[9px] text-red-600 uppercase font-black tracking-tighter animate-pulse">混沌赐福 (CHAOS_BLESSING)</span>
                              <span className="text-red-500 font-mono font-bold text-xs">{editedCharacter.chaosBlessing}</span>
                            </div>
                          )}
                          {corruptionEffects.length > 0 && (
                            <div className="col-span-2 pt-2 border-t border-zinc-900/30">
                              <span className="block text-[9px] text-purple-600 uppercase font-black tracking-tighter">腐化扭曲效应 (CORRUPTION_EFFECTS)</span>
                              <div className="space-y-1 mt-1">
                                {corruptionEffects.map((eff, i) => (
                                  <div key={i} className="text-[10px] text-purple-400 font-mono flex gap-2">
                                    <span className="text-purple-800">•</span>
                                    <span>{eff}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                     <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 md:gap-6">
                        <div className="p-4 border border-red-900/30 bg-red-950/10 relative overflow-hidden group/hp">
                           <div className="text-[9px] text-red-900 font-black uppercase mb-1">耐久值 (HP_POOL)</div>
                           <div className="text-2xl text-red-600 font-black font-mono tracking-tighter">
                             {(() => {
                               const toughness = finalAttrs.toughness || 10;
                               const currentMaxHp = Math.max(1, Math.floor(toughness / 5));
                               const hpParts = (editedCharacter.hp || "").split('/');
                               const currentHP = parseInt(hpParts[0]) || currentMaxHp;
                               return `${currentHP > currentMaxHp ? currentMaxHp : currentHP} / ${currentMaxHp}`;
                             })()}
                           </div>
                           <div className="absolute top-0 right-0 p-1 opacity-10 group-hover/hp:opacity-30 transition-opacity">
                             <Activity size={12} className="text-red-500" />
                           </div>
                        </div>
                       <div className="p-4 border border-blue-900/30 bg-blue-950/10 relative overflow-hidden">
                          <div className="text-[9px] text-blue-900 font-black uppercase mb-1">护甲值 (ARMOR_VAL)</div>
                          <div className="text-2xl text-blue-400 font-black font-mono tracking-tighter">
                            {calculateArmorRating(editedCharacter.equipment)} <span className="text-[10px] opacity-40 font-normal">AR</span>
                          </div>
                          <Shield size={16} className="absolute bottom-2 right-2 text-blue-900/20" />
                       </div>
                       <div className="p-4 border border-indigo-900/30 bg-indigo-950/10 relative overflow-hidden">
                          <div className="text-[9px] text-indigo-900 font-black uppercase mb-1">护甲耐久 (AHP_BUFF)</div>
                          <div className="text-2xl text-indigo-400 font-black font-mono tracking-tighter">
                            {equipmentList.reduce((sum, item) => sum + ((item && item.stats && item.stats.hp) ? parseInt(item.stats.hp.split('/')[0] || '0') : 0), 0) || 0} <span className="text-[10px] opacity-40 font-normal">pts</span>
                          </div>
                       </div>
                       <div className="p-4 border border-emerald-900/30 bg-emerald-950/10 relative overflow-hidden">
                          <div className="text-[9px] text-emerald-900 font-black uppercase mb-1">移动力 (MV_RATE)</div>
                          <div className="text-2xl text-emerald-500 font-black font-mono tracking-tighter">
                            {finalMV} <span className="text-[10px] opacity-40 font-normal">m/t</span>
                          </div>
                       </div>
                       <div className="p-4 border border-amber-900/30 bg-amber-950/10 relative overflow-hidden">
                          <div className="text-[9px] text-amber-900 font-black uppercase mb-1">基础近战 (B_MELEE)</div>
                          <div className="text-2xl text-amber-500 font-black font-mono tracking-tighter">
                            +{Math.max(0, Math.floor(finalAttrs.strength / 20))}
                          </div>
                       </div>
                    </div>

                    <div className="p-6 md:p-8 bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent opacity-30 pointer-events-none" />
                      
                      <div className="flex justify-between items-center mb-6 border-b border-zinc-900 pb-4 relative z-10">
                        <div className="flex items-center gap-3">
                           <div className="w-1.5 h-6 bg-red-700" />
                           <h5 className="text-slate-100 uppercase font-black tracking-[0.2em] font-mono leading-none text-sm md:text-lg">BIOMETRIC_SYNC</h5>
                        </div>
                        <Activity size={18} className="text-red-700 animate-pulse" />
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 mb-6 relative z-10">
                         <div className="flex items-center justify-between p-3 bg-zinc-900/40 border border-zinc-800/50">
                            <div className="flex flex-col">
                              <span className="text-[7px] text-zinc-600 font-mono tracking-widest uppercase">P_STATE_MONITOR</span>
                              <span className={`text-[11px] font-black uppercase tracking-tight ${psykanaDetails.color}`}>
                                {psykanaDetails.label}
                              </span>
                            </div>
                            <div className={`px-2 py-0.5 text-[10px] font-mono font-bold ${psykanaDetails.isActive ? 'bg-purple-900/30 text-purple-400' : 'bg-zinc-800 text-zinc-600'}`}>
                              R: {psykanaDetails.rank}
                            </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-1 relative z-10">
                        {[
                          { label: 'WS', fullName: '武器技能', key: 'weaponSkill' },
                          { label: 'BS', fullName: '射击技能', key: 'ballisticSkill' },
                          { label: 'S', fullName: '力量', key: 'strength' },
                          { label: 'T', fullName: '坚韧', key: 'toughness' },
                          { label: 'AG', fullName: '敏捷', key: 'agility' },
                          { label: 'INT', fullName: '智力', key: 'intelligence' },
                          { label: 'PER', fullName: '感知', key: 'perception' },
                          { label: 'WP', fullName: '意志', key: 'willpower' },
                          { label: 'FEL', fullName: '社交', key: 'fellowship' },
                        ].map(attr => {
                          const mod = extraModifiers[attr.key as keyof typeof extraModifiers] || 0;
                          const base = editedCharacter.attributes[attr.key as keyof typeof editedCharacter.attributes];
                          const finalValue = finalAttrs[attr.key];
                          
                          return (
                            <div key={attr.key} className="flex items-center justify-between py-2 border-b border-zinc-900/50 group/row">
                              <div className="flex items-baseline gap-2">
                                 <span className="text-[11px] font-black text-zinc-400 font-mono group-hover/row:text-red-500 transition-colors w-7 uppercase">{attr.label}</span>
                                 <span className="text-[8px] text-zinc-700 font-mono">{attr.fullName}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[9px] text-zinc-700 font-mono">{base}</span>
                                    <span className={`text-[9px] font-mono font-bold w-6 text-right ${mod > 0 ? 'text-blue-600' : mod < 0 ? 'text-orange-600' : 'text-zinc-800'}`}>
                                      {mod > 0 ? `+${mod}` : mod < 0 ? mod : '0'}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-lg md:text-xl font-mono font-black w-8 text-right drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-colors text-slate-200">
                                  {finalValue}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'abilities' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
                    {/* Traits Summary */}
                    <div className="p-6 border border-zinc-900 bg-black/40 h-fit">
                      <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-3">
                         <span className="w-1.5 h-4 bg-zinc-700" />
                         <h4 className="text-xs text-zinc-300 font-black uppercase tracking-widest">已解析特质 (TRAITS_PARSED)</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {character.traits?.length ? character.traits.map((t, idx) => (
                          <div key={idx} className="group relative">
                            <div className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-mono uppercase tracking-tight hover:border-zinc-500 hover:text-white transition-all cursor-default">
                              {(t?.name || '').replace(/\[undefined\]/g, '').replace(/\[由叙事自动获得\]/g, '')}
                            </div>
                            <div className="absolute left-0 top-full mt-2 w-72 p-4 bg-zinc-950/95 border-2 border-zinc-800 shadow-[0_30px_60px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] text-[10px] leading-relaxed text-zinc-400 font-mono backdrop-blur-md break-words whitespace-pre-wrap">
                              <div className="text-zinc-100 mb-2 font-black border-b border-zinc-800 pb-1 flex justify-between items-center">
                                <span className="truncate mr-2 uppercase tracking-tight">{(t?.name || '').replace(/\[undefined\]/g, '').replace(/\[由叙事自动获得\]/g, '')}</span>
                                <span className="text-[7px] opacity-50 uppercase tracking-widest bg-zinc-900/40 px-1 border border-zinc-800 font-black tracking-[0.2em]">IDENT_SPEC</span>
                              </div>
                              <div className="max-h-48 overflow-y-auto custom-scrollbar pr-1">
                                {/* Aggressively filter out technical property strings and internal stat keys */}
                                {((t.effect === 'undefined' || t.effect === '由叙事自动获得') ? '' : t.effect || 
                                 (t.desc === 'undefined' || t.desc === '由叙事自动获得') ? '' : t.desc || '')
                                  .replace(/\[[A-Z/]+[:：][\s\S]*?\]/g, '') // Remove [ATTR:VAL]
                                  .replace(/\([A-Z/]+[:：][\s\S]*?\)/g, '') // Remove (ATTR:VAL)
                                  .replace(/(?:属性|Stats|Attributes)[:,：][\s\S]*?(?=\n|$)/gi, '') // Remove 属性: lines
                                  .replace(/\b(?:wearer|power|damage|capacity|rateOfFire|mod|id)[:：]\s*[^,]+,?/gi, '') // Remove internal keys
                                  .trim() || '该特质已通过基因或机魂验证。'}
                              </div>
                              <div className="mt-2 pt-2 border-t border-zinc-900 text-[8px] text-zinc-600 italic flex justify-between">
                                  <span>BIOMETRIC_SYNC_RECON</span>
                                  <span>[0x1A]</span>
                              </div>
                            </div>
                          </div>
                        )) : <span className="text-[10px] text-zinc-700 font-mono uppercase italic tracking-widest px-2">No active traits detected.</span>}
                      </div>
                    </div>

                    {/* Skills Summary with Add/Upgrade options */}
                    <div className="p-6 border border-zinc-900 bg-black/40">
                      <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-3">
                         <div className="flex items-center gap-3">
                           <span className="w-1.5 h-4 bg-blue-900" />
                           <h4 className="text-xs text-zinc-300 font-black uppercase tracking-widest">受训科目 (SKILLS_CERT)</h4>
                         </div>
                         {isEditing && (
                           <Button onClick={() => {
                             if (skills.length >= 24) return;
                             setSelectedSlotIndex(skills.length);
                             setSkills([...skills, null]);
                             setIsSkillModalOpen(true);
                           }} className="text-[9px] bg-blue-900/20 text-blue-400 border border-blue-900/50 hover:bg-blue-900 hover:text-white uppercase px-3 py-1.5">
                             申请技能晋升 [REQ_PROMOTION]
                           </Button>
                         )}
                      </div>
                      <div className="space-y-2">
                        {skills.filter(Boolean).length > 0 ? skills.filter(Boolean).map((s, idx) => (
                          <div key={idx} className="flex justify-between items-start bg-zinc-900/30 border border-zinc-800/50 p-3 group w-full overflow-hidden">
                            <div className="flex flex-col flex-1 pl-2 overflow-hidden min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[11px] text-slate-200 font-black uppercase whitespace-nowrap">{s!.name}</span>
                                <span className="text-[9px] text-zinc-500 font-mono tracking-tight border-l border-zinc-800 pl-2 whitespace-nowrap">{s!.stat || 'N/A'} Modified</span>
                              </div>
                              {s!.description && (
                                <span className="text-[10px] text-zinc-400 font-mono tracking-tight mt-1 whitespace-pre-wrap break-words">{s!.description}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 shrink-0 mt-0.5">
                              {(() => {
                                const isKnowledge = s!.name.includes('知识') || s!.type?.includes('SPECIALIST');
                                if (isKnowledge) return null;
                                return (
                                  <div className="text-[10px] font-mono text-blue-400 bg-blue-950/30 px-2 py-0.5 border border-blue-900/30">
                                    LV.{s!.level}
                                  </div>
                                );
                              })()}
                              {isEditing && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSkills = [...skills];
                                    newSkills.splice(idx, 1);
                                    setSkills(newSkills);
                                  }}
                                  className="text-zinc-600 hover:text-red-500 transition-colors p-1"
                                >
                                  <XIcon size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        )) : <div className="text-center text-zinc-700 italic text-[10px] py-10">缺乏战术专精记录。</div>}
                      </div>

                      {/* Open Slots if editing */}
                      {isEditing && skills.length < 24 && skills.some(s => s === null) && (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {skills.map((s, i) => !s && (
                            <div 
                              key={i}
                              onClick={() => {
                                setSelectedSlotIndex(i);
                                setIsSkillModalOpen(true);
                              }}
                              className="border border-dashed border-zinc-800 bg-black/40 hover:bg-blue-950/20 hover:border-blue-900/50 transition-colors p-3 flex justify-center items-center cursor-pointer min-h-[46px]"
                            >
                              <Plus size={14} className="text-zinc-600" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'inventory' && (
                  <div className="space-y-12 pb-10">
                    {/* Weapons & Armor */}
                    <div>
                      <div className="flex items-center justify-between mb-6 border-b-2 border-zinc-900 pb-4">
                        <h4 className="text-slate-100 text-sm font-black flex items-center gap-4 uppercase tracking-[0.3em]">
                          <div className="bg-blue-900/20 p-2 border border-blue-900/40">
                            <Shield className="text-blue-500" size={16} />
                          </div>
                          主战装备序列 <span className="text-zinc-700 text-[10px] font-mono font-normal">[12_TACTICAL_SLOTS]</span>
                        </h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {equipmentList.map((item, idx) => {
                          const filledCount = equipmentList.filter(Boolean).length;
                          const isFirstEmpty = !item && (idx === 0 || (idx > 0 && !!equipmentList[idx-1]));
                          const shouldShow = isEditing ? true : (item || isFirstEmpty || (filledCount === 0 && idx === 0));
                          
                          if (!shouldShow) return null;

                          return (
                            <div 
                              key={`eq-${idx}`}
                              draggable={!!item}
                              onDragStart={(e) => handleDragStart(e, 'EQUIPMENT', idx)}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => handleDrop(e, 'EQUIPMENT', idx)}
                              onClick={() => {
                                if (isEditing) {
                                  setArmoryTargetSlot(idx);
                                  setArmoryTargetType('EQUIPMENT');
                                  setIsArmoryModalOpen(true);
                                }
                              }}
                              className={`group relative min-h-[140px] border transition-all ${isEditing || item ? 'cursor-pointer' : ''} overflow-visible p-0 flex flex-col ${
                                item 
                                  ? 'border-blue-900/40 bg-zinc-950 hover:border-blue-500 shadow-[inset_0_0_40px_rgba(30,58,138,0.1)]' 
                                  : 'border-zinc-900 bg-black/40 border-dashed hover:border-blue-900/50'
                              }`}
                            >
                              <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-zinc-800 pointer-events-none z-0">
                                 SLOT_{String(idx + 1).padStart(2, '0')}
                              </div>

                              {item ? (
                                <>
                                  <div className="p-4 flex-1 relative z-10">
                                     <div className="text-[9px] text-blue-900 font-black uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                        <span className="w-1 h-3 bg-blue-900/50" />
                                        {item.category}
                                     </div>
                                     <div className="text-sm font-black text-slate-100 group-hover:text-blue-400 transition-colors uppercase leading-tight mb-3">
                                        {item.name} {item.count > 1 && <span className="text-blue-500 font-mono text-xs">(x{item.count})</span>}
                                     </div>
                                     
                                     {/* Hover Details Overlay */}
                                     <div className="absolute inset-0 bg-zinc-950/95 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-[30] flex flex-col border-2 border-blue-900/50 shadow-[inset_0_0_40px_rgba(30,58,138,0.3)] overflow-y-auto custom-scrollbar pointer-events-auto whitespace-pre-wrap break-words">
                                       <div className="text-[8px] text-blue-600 font-black mb-3 tracking-[0.4em] uppercase border-b border-blue-900 pb-1 w-fit">Tech_Specification</div>
                                       <p className="text-[11px] text-zinc-100 font-mono leading-relaxed mb-4">
                                         {(item.description || item.stats?.desc || '无详细技术参数文档。')
                                           .replace(/(?:属性|Stats|Attributes)[:,：][\s\S]*?(?=\n|$)/gi, '')
                                           .replace(/\b(?:wearer|power|damage|capacity|rateOfFire|mod|id)[:：]\s*[^,]+,?/gi, '')
                                           .trim()}
                                       </p>
                                        {(() => {
                                          const daemonStats = getDaemonWeaponStats(item, character.corruptionValue || 0);
                                          if (daemonStats) {
                                            return (
                                              <div className="mb-4 bg-purple-900/20 border border-purple-500/30 p-2">
                                                <div className="text-[8px] text-purple-400 font-black uppercase mb-1 flex items-center gap-1">
                                                  <Zap size={8} /> 混沌增幅 / CHAOS_INFUSED
                                                </div>
                                                <div className="flex gap-4">
                                                  <div className="text-[10px] text-zinc-300 font-mono">POWER: <span className="text-blue-400 font-black">{daemonStats.power}</span></div>
                                                  <div className="text-[10px] text-zinc-300 font-mono">DAMAGE: <span className="text-red-400 font-black">{daemonStats.damage}</span></div>
                                                </div>
                                                <div className="text-[7px] text-purple-600 font-mono mt-1 uppercase italic"> stats overwritten by entity daemon</div>
                                              </div>
                                            );
                                          }
                                          return null;
                                        })()}
                                        {item.modes && item.modes.length > 0 ? (
                                          <div className="space-y-4">
                                            {item.modes.map((mode, midx) => (
                                              <div key={midx} className="space-y-1.5 border-l border-blue-900/30 pl-3">
                                                <div className="text-[9px] text-blue-400 font-bold uppercase">{mode.name}</div>
                                                <div className="grid grid-cols-2 gap-2">
                                                  {mode.stats.power && <div className="text-[9px] text-zinc-500 font-mono uppercase">Power: <span className="text-blue-400 font-black">{mode.stats.power}</span></div>}
                                                  {mode.stats.ap && <div className="text-[9px] text-zinc-500 font-mono uppercase">AP: <span className="text-teal-400 font-black">{mode.stats.ap}</span></div>}
                                                  {mode.stats.damage && <div className="text-[9px] text-zinc-500 font-mono uppercase">Damage: <span className="text-red-500 font-black">{mode.stats.damage}</span></div>}
                                                  {mode.stats.capacity && <div className="text-[9px] text-zinc-500 font-mono uppercase">Cap: <span className="text-amber-500 font-black">{mode.stats.capacity}</span></div>}
                                                  {mode.stats.rateOfFire && <div className="text-[9px] text-zinc-500 font-mono uppercase">RoF: <span className="text-amber-500 font-black">{mode.stats.rateOfFire}</span></div>}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        ) : null}
                                       <div className="mt-auto space-y-1.5">
                                          {(() => {
                                            const daemonStats = getDaemonWeaponStats(item, character.corruptionValue || 0);
                                            if (daemonStats) {
                                              return (
                                                <>
                                                  <div className="text-[10px] text-zinc-500 font-mono uppercase">Power: <span className="text-blue-400 font-black">{daemonStats.power}</span></div>
                                                  <div className="text-[10px] text-zinc-500 font-mono uppercase">Damage: <span className="text-red-500 font-black">{daemonStats.damage}</span></div>
                                                </>
                                              );
                                            }
                                            return (
                                              <>
                                                {(item.stats?.power != null) && <div className="text-[10px] text-zinc-500 font-mono uppercase">Power: <span className="text-blue-400 font-black">{item.stats.power}</span></div>}
                                                {item.stats?.ap != null && <div className="text-[10px] text-zinc-500 font-mono uppercase">AP: <span className="text-teal-400 font-black">{item.stats.ap}</span></div>}
                                                {(item.stats?.damage != null) && <div className="text-[10px] text-zinc-500 font-mono uppercase">Damage: <span className="text-red-500 font-black">{item.stats.damage}</span></div>}
                                              </>
                                            );
                                          })()}
                                          {item.stats?.ar != null && <div className="text-[10px] text-zinc-500 font-mono uppercase">AR: <span className="text-teal-500 font-black">{item.stats.ar}</span></div>}
                                          {item.stats?.toughness && <div className="text-[10px] text-zinc-500 font-mono uppercase">Prot: <span className="text-green-500 font-black">{item.stats.toughness}</span></div>}
                                          {item.stats?.desc && item.description && <div className="text-[9px] text-zinc-600 font-mono italic leading-tight border-t border-zinc-900 pt-2">{item.stats.desc}</div>}
                                       </div>
                                     </div>

                                     <div className="mt-4 flex flex-wrap gap-2">
                                          {item.modes && item.modes.length > 0 ? (
                                            <div className="w-full flex gap-1 overflow-x-auto pb-1 no-scrollbar">
                                              {item.modes.map((mode, midx) => {
                                                const daemonStats = getDaemonWeaponStats(item, character.corruptionValue || 0);
                                                return (
                                                  <div key={midx} className="bg-zinc-900/30 border border-zinc-800/50 p-1 flex-shrink-0 min-w-[70px]">
                                                     <div className="text-[7px] text-zinc-600 uppercase font-black truncate">{mode.name.split(' ')[0]}</div>
                                                     <div className="flex justify-between items-center gap-1">
                                                        <div className="text-[9px] font-bold text-blue-500" title="Power">{daemonStats ? daemonStats.power : (mode.stats.power || '-')}</div>
                                                        {mode.stats.ap && <div className="text-[8px] font-bold text-teal-400" title="AP">AP:{mode.stats.ap}</div>}
                                                        <div className="text-[9px] font-bold text-red-500" title="Damage">{daemonStats ? daemonStats.damage : (mode.stats.damage || '-')}</div>
                                                     </div>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          ) : (
                                            <>
                                              {(() => {
                                                const daemonStats = getDaemonWeaponStats(item, character.corruptionValue || 0);
                                                if (daemonStats) {
                                                  return (
                                                    <>
                                                      <div className="bg-purple-900/40 p-1 border border-purple-800/50 text-center flex-1 min-w-[50px] animate-pulse">
                                                        <div className="text-[8px] text-purple-400 uppercase font-mono">D.Str</div>
                                                        <div className="text-[10px] font-black text-blue-400">{daemonStats.power}</div>
                                                      </div>
                                                      <div className="bg-purple-900/40 p-1 border border-purple-800/50 text-center flex-1 min-w-[50px] animate-pulse">
                                                        <div className="text-[8px] text-purple-400 uppercase font-mono">D.Dmg</div>
                                                        <div className="text-[10px] font-black text-red-400">{daemonStats.damage}</div>
                                                      </div>
                                                    </>
                                                  );
                                                }
                                                return null;
                                              })()}
                                              {!getDaemonWeaponStats(item, character.corruptionValue || 0) && item.stats?.power && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">Str</div>
                                                  <div className="text-[10px] font-black text-blue-500">{item.stats.power}</div>
                                                </div>
                                              )}
                                              {item.stats?.ap != null && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">AP</div>
                                                  <div className="text-[10px] font-black text-teal-500">{item.stats.ap}</div>
                                                </div>
                                              )}
                                              {!getDaemonWeaponStats(item, character.corruptionValue || 0) && item.stats?.damage && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">Dmg</div>
                                                  <div className="text-[10px] font-black text-red-600">{item.stats.damage}</div>
                                                </div>
                                              )}
                                              {item.stats?.ar != null && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">AR</div>
                                                  <div className="text-[10px] font-black text-teal-500">{item.stats.ar}</div>
                                                </div>
                                              )}
                                              {item.stats?.hp && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">AHP</div>
                                                  <div className="text-[10px] font-black text-emerald-500">{item.stats.hp}</div>
                                                </div>
                                              )}
                                              {item.stats?.toughness && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">Prot</div>
                                                  <div className="text-[10px] font-black text-green-600 truncate px-1">
                                                    {item.stats.toughness.toString().startsWith('+') ? item.stats.toughness : `+${item.stats.toughness}`}
                                                  </div>
                                                </div>
                                              )}
                                              {item.stats?.capacity && item.stats.capacity !== '-' && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">Cap</div>
                                                  <div className="text-[10px] font-black text-amber-500">{item.stats.capacity}</div>
                                                </div>
                                              )}
                                              {item.stats?.rateOfFire && item.stats.rateOfFire !== '-' && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">RoF</div>
                                                  <div className="text-[10px] font-black text-amber-500 truncate">{item.stats.rateOfFire === '可' ? 'Auto' : 'Single'}</div>
                                                </div>
                                              )}
                                              {item.stats?.mod && item.stats.mod !== '无' && item.stats.mod !== '-' && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px] col-span-full mt-1">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">Modifiers</div>
                                                  <div className="text-[10px] font-black text-yellow-600 py-0.5 whitespace-pre-wrap">{item.stats.mod}</div>
                                                </div>
                                              )}
                                            </>
                                          )}
                                       </div>
                                  </div>
                                  
                                  {isEditing && (
                                    <div className="bg-zinc-900/30 px-4 py-2 flex justify-between items-center border-t border-zinc-900/50">
                                       <span className="text-[8px] font-mono text-zinc-700 tracking-widest uppercase">Verified</span>
                                       <div className="flex gap-2">
                                          <button type="button" onClick={(e) => { e.stopPropagation(); const newList = [...equipmentList]; newList[idx]!.count = Math.max(1, newList[idx]!.count - 1); setEquipmentList(newList); }} className="text-zinc-600 hover:text-white">-</button>
                                          <button type="button" onClick={(e) => { e.stopPropagation(); const newList = [...equipmentList]; newList[idx]!.count += 1; setEquipmentList(newList); }} className="text-zinc-600 hover:text-white">+</button>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              const newList = [...equipmentList];
                                              newList[idx] = null;
                                              const compacted = newList.filter(Boolean);
                                              setEquipmentList([...compacted, ...new Array(Math.max(0, 12 - compacted.length)).fill(null)]);
                                            }}
                                            className="text-zinc-800 hover:text-red-600 transition-colors ml-2"
                                          >
                                            <XIcon size={14} />
                                          </button>
                                       </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="flex-1 flex flex-col items-center justify-center p-4 border-dashed border-zinc-900 group-hover:border-blue-900/50 transition-colors">
                                   <Plus size={20} className="text-zinc-900 group-hover:text-blue-900 transition-colors mb-2" />
                                   <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest">{isEditing ? 'Assign_Slot' : 'Locked'}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Logistics / Items */}
                    <div>
                      <div className="flex items-center justify-between mb-6 border-b-2 border-zinc-900 pb-4">
                        <h4 className="text-slate-100 text-sm font-black flex items-center gap-4 uppercase tracking-[0.3em]">
                          <div className="bg-yellow-900/20 p-2 border border-yellow-900/40">
                            <ShoppingBag className="text-yellow-600" size={16} />
                          </div>
                          辅助补给负荷 <span className="text-zinc-700 text-[10px] font-mono font-normal">[LOGISTICS_PACK]</span>
                        </h4>
                        <div className="text-zinc-500 text-[10px] uppercase font-mono tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span className="opacity-50">综合补给储量:</span>
                          {Object.entries(ammoSummary).length > 0 ? Object.entries(ammoSummary).map(([name, count]) => (
                            <span key={name} className="flex gap-1 items-center">
                              {name} 
                              <span className="text-yellow-500 text-sm font-black drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                                {count}
                              </span>
                            </span>
                          )) : <span className="opacity-30">无</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
                        {itemList.map((item, idx) => {
                          const filledCount = itemList.filter(Boolean).length;
                          const isFirstEmpty = !item && (idx === 0 || (idx > 0 && !!itemList[idx-1]));
                          const shouldShow = isEditing ? true : (item || isFirstEmpty || (filledCount === 0 && idx === 0));
                          
                          if (!shouldShow) return null;

                          return (
                            <div 
                              key={`item-${idx}`}
                              draggable={!!item}
                              onDragStart={(e) => handleDragStart(e, 'ITEM', idx)}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => handleDrop(e, 'ITEM', idx)}
                              onClick={() => {
                                if (isEditing) {
                                  setArmoryTargetSlot(idx);
                                  setArmoryTargetType('ITEM');
                                  setIsArmoryModalOpen(true);
                                }
                              }}
                              className={`group relative min-h-[110px] border transition-all ${isEditing || item ? 'cursor-pointer' : ''} overflow-visible p-0 flex flex-col ${
                                item 
                                  ? 'border-yellow-900/40 bg-zinc-950 hover:border-yellow-600' 
                                  : 'border-zinc-900 bg-black/40 border-dashed hover:border-yellow-900/30'
                              }`}
                            >
                              {item ? (
                                <>
                                  <div className="p-3 flex-1 h-[80px] relative z-10">
                                    <div className="text-[7px] text-yellow-900 font-black uppercase tracking-widest mb-1">{item.category}</div>
                                    <div className="text-[10px] font-black text-slate-100 group-hover:text-yellow-600 transition-colors uppercase leading-tight line-clamp-2">{item.name} {item.count > 1 && <span className="text-yellow-500 font-mono">(x{item.count})</span>}</div>
                                    <div className="mt-1 text-[9px] text-zinc-500 leading-tight line-clamp-2 font-mono h-6">{item.stats?.desc || '装备载荷'}</div>
                                    
                                    {/* Hover Details Overlay */}
                                    <div className="absolute inset-0 bg-zinc-950/95 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-[30] flex flex-col border-2 border-yellow-900/50 shadow-[inset_0_0_30px_rgba(113,63,18,0.2)] overflow-y-auto custom-scrollbar pointer-events-auto whitespace-pre-wrap break-words">
                                      <div className="text-[7px] text-yellow-600 font-black mb-2 tracking-[0.4em] uppercase border-b border-yellow-900/50 pb-1 w-fit">Logistics_Intel</div>
                                      <p className="text-[10px] text-zinc-100 font-mono leading-relaxed">{item.description || item.stats?.desc || '标准备勤物资。'}</p>
                                      {item.stats?.mod && <div className="mt-auto text-[8px] text-zinc-600 font-mono uppercase border-t border-zinc-900 pt-1 mt-2">Tag: <span className="text-yellow-900">{item.stats.mod}</span></div>}
                                    </div>
                                  </div>
                                  {isEditing && (
                                    <div className="px-3 py-1.5 flex justify-between items-center bg-zinc-900/20 border-t border-zinc-900/50">
                                       <div className="flex gap-0.5">
                                          <div className="w-1 h-1 bg-yellow-950" />
                                          <div className="w-2 h-1 bg-yellow-950" />
                                       </div>
                                       <div className="flex gap-2">
                                          <button type="button" onClick={(e) => { e.stopPropagation(); const newList = [...itemList]; newList[idx]!.count = Math.max(1, newList[idx]!.count - 1); setItemList(newList); }} className="text-zinc-600 hover:text-white">-</button>
                                          <button type="button" onClick={(e) => { e.stopPropagation(); const newList = [...itemList]; newList[idx]!.count += 1; setItemList(newList); }} className="text-zinc-600 hover:text-white">+</button>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              const newList = [...itemList];
                                              newList[idx] = null;
                                              const compacted = newList.filter(Boolean);
                                              setItemList([...compacted, ...new Array(Math.max(0, 24 - compacted.length)).fill(null)]);
                                            }}
                                            className="text-zinc-800 hover:text-red-900 transition-colors ml-2"
                                          >
                                            <XIcon size={12} />
                                          </button>
                                       </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="m-auto flex flex-col items-center opacity-10 group-hover:opacity-30 transition-all">
                                  <Plus size={16} className="text-zinc-500" />
                                  <span className="text-[7px] uppercase font-black tracking-widest mt-1">Cargo</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'background' && (
                   <div className="p-6 md:p-8 border border-zinc-900 bg-black/40">
                      <h4 className="text-[10px] text-zinc-600 font-black uppercase mb-6 tracking-widest border-b border-zinc-900 pb-2">生平叙事档案</h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed whitespace-pre-wrap font-mono uppercase tracking-tight">
                         {editedCharacter.biography || '档案已加密或由于未知事故丢失。'}
                      </p>
                      
                      <h4 className="text-[10px] text-zinc-600 font-black uppercase mt-12 mb-6 tracking-widest border-b border-zinc-900 pb-2">生理与表征</h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed whitespace-pre-wrap font-mono uppercase tracking-tight">
                         {editedCharacter.appearance || '标准数据，无异常。'}
                      </p>
                   </div>
                )}

                {activeTab === 'npcs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                    {npcProfiles?.filter(n => n && typeof n === 'object' && n.hasAppeared).map(npc => (
                      <div key={npc.id} className="p-4 bg-zinc-900/40 border border-zinc-800 flex flex-col gap-3 group hover:bg-zinc-900 transition-colors relative">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-[11px] text-white font-black uppercase flex items-center gap-2">
                              <span className={`w-1 h-3 ${(npc.bondLevel || 0) > 0 ? 'bg-emerald-600' : 'bg-red-900'}`} />
                              {npc.name}
                            </div>
                            <div className="text-[9px] text-zinc-600 uppercase font-mono">{npc.originWorld || '未知背景'} / {npc.lineage || '未知种族'}</div>
                          </div>
                          <div className="text-[10px] text-red-900/50 font-black tracking-widest bg-black px-2 py-0.5 border border-zinc-900">BOND_LV.{(npc.bondLevel || 0)}</div>
                        </div>
                        
                        {/* NPC Traits */}
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {(npc.traits || (npc.trait ? [{ name: npc.trait, desc: 'Legacy' }] : [])).filter(Boolean).map((t: any, idx: number) => (
                            <div key={idx} className="group/trait relative">
                              <div className="px-2 py-0.5 bg-zinc-950 border border-zinc-700 text-[8px] text-zinc-500 font-mono uppercase hover:border-zinc-500 transition-colors cursor-help">
                                {String(t?.name || '').replace(/\[undefined\]/g, '').replace(/\[由叙事自动获得\]/g, '')}
                              </div>
                              <div className="absolute left-0 top-full mt-1 w-56 p-2.5 bg-zinc-950 border border-zinc-800 text-[9px] leading-relaxed text-zinc-400 font-mono invisible group-hover/trait:visible z-[110] shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
                                <div className="text-zinc-100 mb-1 border-b border-zinc-800 pb-0.5 font-bold uppercase">{String(t?.name || '').replace(/\[undefined\]/g, '').replace(/\[由叙事自动获得\]/g, '')}</div>
                                {String(((t?.desc === 'undefined' || t?.desc === '由叙事自动获得') ? '' : t?.desc || '') || '已加密或无详细说明。')
                                  .replace(/(?:属性|Stats|Attributes)[:,：][\s\S]*?(?=\n|$)/gi, '')
                                  .replace(/\b(?:wearer|power|damage|capacity|rateOfFire|mod|id)[:：]\s*[^,]+,?/gi, '')
                                  .trim()}
                              </div>
                            </div>
                          ))}
                        </div>

                        <p className="text-[10px] text-zinc-500 leading-relaxed font-mono line-clamp-3 italic">
                          {npc.biography || '当前情报严重匮乏，尚无详细生平记录。'}
                        </p>
                      </div>
                    ))}
                    {npcProfiles?.filter(n => n && n.hasAppeared).length === 0 && (
                      <div className="col-span-2 text-center text-zinc-700 italic text-xs py-10">尚无已建立的情报连接。</div>
                    )}
                  </div>
                )}
              </motion.div>
           </AnimatePresence>
        </div>

        {/* Armory Modal Overlay */}
        <AnimatePresence>
          {isArmoryModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsArmoryModalOpen(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-5xl bg-zinc-950 border-2 border-zinc-900 shadow-2xl flex flex-col h-[90vh] overflow-hidden"
              >
                <div className="p-6 border-b-2 border-red-950 flex justify-between items-center bg-black relative">
                  <div className="absolute top-0 left-0 w-2 h-full bg-red-900 shadow-[0_0_15px_rgba(153,27,27,0.5)]" />
                  <h3 className="text-xl font-mono text-slate-100 flex items-center gap-4 font-black uppercase tracking-tighter">
                    <ShoppingBag size={20} className="text-red-600" />
                    领用配属核验 <span className="text-zinc-800 font-normal">#</span> SLOT_{String((armoryTargetSlot || 0) + 1).padStart(2, '0')}
                  </h3>
                  <button type="button" onClick={() => setIsArmoryModalOpen(false)} className="w-10 h-10 border border-zinc-900 flex items-center justify-center text-zinc-600 hover:text-white transition-all"><XIcon size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-12 bg-black custom-scrollbar">
                  <div className="bg-zinc-950 border-2 border-zinc-900 p-6 flex flex-col gap-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-4">
                       <div className="w-1 h-4 bg-zinc-700" />
                       自定义配装 / CUSTOM_ASSET
                    </h4>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <input
                        type="text"
                        placeholder="输入装备/物品名称"
                        value={customArmoryInput}
                        onChange={e => setCustomArmoryInput(e.target.value)}
                        className="flex-1 w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-2 font-mono text-sm focus:outline-none focus:border-red-900"
                        onKeyDown={e => {
                          if (e.key === 'Enter' && customArmoryInput.trim()) {
                            // The button onClick performs the add logic
                          }
                        }}
                      />
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex-1 md:flex-none flex items-center justify-between gap-1 bg-zinc-900/50 p-1 border border-zinc-800">
                          <button onClick={() => setCustomArmoryCount(Math.max(1, customArmoryCount - 1))} className="w-8 h-8 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400">-</button>
                          <input
                             type="number"
                             min="1"
                             value={customArmoryCount}
                             onChange={e => setCustomArmoryCount(Math.max(1, parseInt(e.target.value) || 1))}
                             className="w-12 bg-transparent text-center text-white text-sm font-bold font-mono focus:outline-none"
                          />
                          <button onClick={() => setCustomArmoryCount(customArmoryCount + 1)} className="w-8 h-8 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400">+</button>
                        </div>
                        <button
                          onClick={() => {
                            if (!customArmoryInput.trim()) return;
                            const baseItem = getItemByName(customArmoryInput.trim(), character.syntheticItems) || {
                                id: `custom_${customArmoryInput.trim()}`,
                                name: customArmoryInput.trim(),
                                level: 0,
                                category: '自创装备',
                                costs: {},
                                desc: '自定义装备',
                                description: '自定义装备记录',
                                stats: { desc: '自定义装备' }
                            };
                            
                            const finalItem = { ...baseItem, count: customArmoryCount };
                            if (armoryTargetType === 'EQUIPMENT') {
                              const newList = [...equipmentList]; 
                              newList[armoryTargetSlot!] = finalItem;
                              const compacted = newList.filter(Boolean);
                              const result = [...compacted, ...new Array(Math.max(0, 12 - compacted.length)).fill(null)];
                              setEquipmentList(result);
                              onUpdate?.({ ...editedCharacter, equipment: result.filter(Boolean).map(i => i!.count > 1 ? `${i!.name} (x${i!.count})` : i!.name) });
                            } else {
                              const newList = [...itemList]; 
                              newList[armoryTargetSlot!] = finalItem;
                              const compacted = newList.filter(Boolean);
                              const result = [...compacted, ...new Array(Math.max(0, 24 - compacted.length)).fill(null)];
                              setItemList(result);
                              onUpdate?.({ ...editedCharacter, items: result.filter(Boolean).map(i => i!.count > 1 ? `${i!.name} (x${i!.count})` : i!.name) });
                            }
                            setCustomArmoryInput('');
                            setCustomArmoryCount(1);
                            setIsArmoryModalOpen(false);
                          }}
                          disabled={!customArmoryInput.trim()}
                          className="px-6 py-2 h-10 w-full md:w-auto bg-red-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          记录 / ADD
                        </button>
                      </div>
                    </div>
                  </div>

                  {categories.map(cat => {
                    const hasPrimarisSkill = editedCharacter.skills?.some(s => s?.name === '原铸改造');

                    const itemsInCat = SHOP_ITEMS.filter(item => {
                      if (item.category !== cat) return false;
                      
                      // 1. Category logic check
                      const itemCat = item.category.replace('/', '与');
                      const equipmentCategories = ['近战武器', '远程武器', '护甲', '盔甲'];
                      const bothCategories = ['投掷与特殊武器', '投掷/特殊武器', '特殊/投掷'];
                      const isEquipmentType = equipmentCategories.includes(itemCat);
                      const isBoth = bothCategories.includes(itemCat) || bothCategories.some(c => item.category.includes(c));
                      if (armoryTargetType === 'EQUIPMENT' && !isEquipmentType && !isBoth) return false;
                      if (armoryTargetType === 'ITEM' && isEquipmentType) return false;
                      
                      // 3. Armor/Shield/Cloak/Accessory uniqueness check
                      if (armoryTargetType === 'EQUIPMENT') {
                        const checkShield = (eValue: any) => {
                          if (!eValue) return false;
                          const eDesc = (eValue.stats?.desc || '').concat(eValue.stats?.mod || '');
                          return eValue.name.includes('盾') || eDesc.includes('持盾') || eValue.stats?.toughness?.toString().includes('仅对');
                        };
                        const checkCloak = (eValue: any) => {
                          if (!eValue) return false;
                          return eValue.name.includes('大氅') || eValue.name.includes('披风') || eValue.name.includes('斗篷');
                        };
                        const checkBodyArmor = (eValue: any) => {
                          if (!eValue) return false;
                          const eDesc = (eValue.stats?.desc || '').concat(eValue.stats?.mod || '');
                          // Body armor is Armor category BUT NOT a shield or cloak
                          return (eValue.category === '护甲' || eValue.category === '盔甲' || eValue.name.includes('甲壳甲')) && !checkShield(eValue) && !checkCloak(eValue);
                        };

                        if (checkShield(item)) {
                          const existingShieldCount = equipmentList.filter(e => checkShield(e)).length;
                          const isReplacingShield = checkShield(equipmentList[armoryTargetSlot!]);
                          if (existingShieldCount > 0 && !isReplacingShield) return false;
                        } else if (checkCloak(item)) {
                          const existingCloakCount = equipmentList.filter(e => checkCloak(e)).length;
                          const isReplacingCloak = checkCloak(equipmentList[armoryTargetSlot!]);
                          if (existingCloakCount > 0 && !isReplacingCloak) return false;
                        } else if (checkBodyArmor(item)) {
                          // It's body armor if it reaches here and is in Armor category
                          const existingArmorCount = equipmentList.filter(e => checkBodyArmor(e)).length;
                          const isReplacingArmor = checkBodyArmor(equipmentList[armoryTargetSlot!]);
                          if (existingArmorCount > 0 && !isReplacingArmor) return false;
                        }
                        // "Other Accessories" are NOT uniquely limited here, allowing multiple slots to be filled.
                      }

                      // 2. Dynamic Faction/Skill Check
                      const charData = {
                        faction: editedCharacter.lineage || editedCharacter.unitType || '',
                        subFaction: editedCharacter.subFaction || '',
                        lineage: editedCharacter.lineage || '',
                        socialIdentity: editedCharacter.socialIdentity || '',
                        traits: editedCharacter.traits || [],
                        skills: editedCharacter.skills || []
                      };
                      
                      return canCharacterUseItem(charData, item);
                    });
                    if (itemsInCat.length === 0) return null;
                    return (
                      <section key={cat}>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                           <div className="w-1 h-4 bg-red-900" />
                           {cat}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {itemsInCat.map(item => {
                            const currentCount = purchaseCounts[item.id] || 1;
                            const isStackable = cat.includes('弹药') || cat.includes('医疗') || cat.includes('食物') || cat.includes('饮水') || cat.includes('消耗品') || cat === '战略资产' || cat === '物品' || item.name === '照明棒';

                            const updateCount = (delta: number) => {
                              setPurchaseCounts(prev => ({
                                ...prev,
                                [item.id]: Math.max(1, (prev[item.id] || 1) + delta)
                              }));
                            };

                            const handlePurchase = () => {
                              const baseItem = { ...item, count: currentCount };
                              if (armoryTargetType === 'EQUIPMENT') {
                                const newList = [...equipmentList]; 
                                newList[armoryTargetSlot!] = baseItem;
                                const compacted = newList.filter(Boolean);
                                const result = [...compacted, ...new Array(Math.max(0, 12 - compacted.length)).fill(null)];
                                setEquipmentList(result);
                                onUpdate?.({ ...editedCharacter, equipment: result.filter(Boolean).map(i => i!.count > 1 ? `${i!.name} (x${i!.count})` : i!.name) });
                              } else {
                                const newList = [...itemList]; 
                                newList[armoryTargetSlot!] = baseItem;
                                const compacted = newList.filter(Boolean);
                                const result = [...compacted, ...new Array(Math.max(0, 24 - compacted.length)).fill(null)];
                                setItemList(result);
                                onUpdate?.({ ...editedCharacter, items: result.filter(Boolean).map(i => i!.count > 1 ? `${i!.name} (x${i!.count})` : i!.name) });
                              }
                              setIsArmoryModalOpen(false);
                            };

                            return (
                              <div key={item.id} className="bg-zinc-950 border-2 border-zinc-900 p-5 hover:border-red-900/50 transition-all flex flex-col group relative">
                                <div className="absolute top-0 right-0 p-2 text-[7px] font-mono text-zinc-800">ARMORY: {item.id.slice(0,4)}</div>
                                
                                <div className="mb-4 flex-1">
                                  <div title={item.description} className="text-base font-black text-slate-100 uppercase leading-snug group-hover:text-red-500 transition-colors mb-1 cursor-help">{item.name}</div>
                                  <div className="text-[10px] text-zinc-600 font-mono italic mb-3">{item.stats?.mod || 'MUNITION_STANDARD'}</div>
                                  
                                  <div className="mb-3 flex flex-wrap gap-1">
                                    {item.stats?.power && <span className="bg-blue-950/30 border border-blue-900/50 text-blue-400 text-[9px] px-1.5 py-0.5 font-mono">STR: {item.stats.power}</span>}
                                    {item.stats?.ap != null && <span className="bg-teal-950/30 border border-teal-900/50 text-teal-400 text-[9px] px-1.5 py-0.5 font-mono">AP: {item.stats.ap}</span>}
                                    {item.stats?.damage && <span className="bg-red-950/30 border border-red-900/50 text-red-500 text-[9px] px-1.5 py-0.5 font-mono">DMG: {item.stats.damage}</span>}
                                    {item.stats?.capacity && item.stats.capacity !== '-' && <span className="bg-amber-950/30 border border-amber-900/50 text-amber-500 text-[9px] px-1.5 py-0.5 font-mono">CAP: {item.stats.capacity}</span>}
                                    {item.stats?.rateOfFire && item.stats.rateOfFire !== '-' && <span className="bg-amber-950/30 border border-amber-900/50 text-amber-500 text-[9px] px-1.5 py-0.5 font-mono">ROF: {item.stats.rateOfFire === '可' ? 'Auto' : 'Single'}</span>}
                                    {item.stats?.ar != null && <span className="bg-teal-950/30 border border-teal-900/50 text-teal-500 text-[9px] px-1.5 py-0.5 font-mono">AR: {item.stats.ar}</span>}
                                    {item.stats?.hp && <span className="bg-emerald-950/30 border border-emerald-900/50 text-emerald-500 text-[9px] px-1.5 py-0.5 font-mono">AHP: {item.stats.hp}</span>}
                                    {item.stats?.toughness && <span className="bg-green-950/30 border border-green-900/50 text-green-500 text-[9px] px-1.5 py-0.5 font-mono">TGH: {item.stats.toughness}</span>}
                                  </div>

                                  {item.description && (
                                    <div className="text-[11px] text-zinc-400 mb-4 leading-relaxed bg-zinc-900/50 p-2 border-l border-zinc-700 italic">
                                      {item.description}
                                    </div>
                                  )}

                                  <div className="mt-1 text-[10px] text-zinc-500 leading-tight font-mono opacity-80">
                                    {item.stats?.wearer ? (
                                      <span className="text-red-900/70">适配授权: {item.stats.wearer}</span>
                                    ) : (
                                      <span className="text-zinc-700">常规配发许可</span>
                                    )}
                                  </div>
                                </div>

                                {isStackable && (
                                  <div className="flex items-center gap-3 mb-4 bg-zinc-900/30 p-2 border border-zinc-900">
                                    <span className="text-[8px] font-mono text-zinc-600 uppercase">数量 / STACK</span>
                                    <div className="flex items-center gap-1">
                                      <button onClick={() => updateCount(-1)} className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400">-</button>
                                      <input 
                                        type="number" 
                                        value={currentCount} 
                                        onChange={(e) => setPurchaseCounts(prev => ({ ...prev, [item.id]: Math.max(1, parseInt(e.target.value) || 1) }))}
                                        className="w-10 bg-black border border-zinc-800 text-xs text-center font-mono py-0.5"
                                      />
                                      <button onClick={() => updateCount(1)} className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400">+</button>
                                    </div>
                                  </div>
                                )}
                                
                                <div className="mt-2 pt-4 border-t border-zinc-900">
                                  <button
                                    type="button"
                                    onClick={handlePurchase}
                                    className="w-full bg-zinc-900 border border-zinc-800 hover:border-red-600 hover:bg-red-950/20 px-3 py-2 text-center transition-all active:scale-95"
                                  >
                                    <div className="text-[10px] font-black text-slate-200 uppercase tracking-tighter">
                                      请求配属授权 / CONFIRM_ALLOCATION
                                    </div>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Skill Modal Overlay */}
        <AnimatePresence>
          {isSkillModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSkillModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                className="relative w-full max-w-5xl bg-zinc-950 border-2 border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[85vh]"
              >
                <div className="p-6 border-b-2 border-red-950 flex justify-between items-center bg-black relative">
                  <div className="absolute top-0 left-0 w-2 h-full bg-red-900 shadow-[0_0_15px_rgba(153,27,27,0.5)]" />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                       <div className="text-[9px] font-mono font-black text-red-700 tracking-[0.5em] uppercase">Auth_Req // Data_Link: Established</div>
                    </div>
                    <h3 className="text-2xl font-mono text-slate-100 flex items-center gap-4 font-black tracking-tighter uppercase">
                      配置技能受训指令集 <span className="text-zinc-800 font-normal">#</span>{selectedSlotIndex !== null ? (selectedSlotIndex + 1).toString().padStart(2, '0') : ''}
                    </h3>
                  </div>
                  <button type="button"
                    onClick={() => setIsSkillModalOpen(false)}
                    className="w-12 h-12 border border-zinc-900 flex items-center justify-center text-zinc-600 hover:text-white hover:border-red-600 transition-all font-mono group bg-zinc-900/10"
                  >
                    <XIcon size={24} className="group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-16 bg-black relative custom-scrollbar">
                  {[
                    { label: '阵营特长', icon: <Shield className="text-emerald-500" size={20} />, data: FACTION_SKILLS_DATA.filter(fs => {
                      const hasTrait = (name: string) => character.traits?.some((t) => t.name === name);
                      const mutantRace = hasTrait('超大巨兽') ? '欧格林' :
                        hasTrait('鼠人') ? '莱特林' :
                        hasTrait('亚空间之眼') ? '导航者' :
                        hasTrait('野兽之躯') ? '野兽人' : null;
                      
                      const align = (character.alignment || "").toLowerCase();
                      const lin = (character.lineage || "").toLowerCase();
                      const sub = (character.subFaction || "").toLowerCase();
                      const soc = (character.socialIdentity || "").toLowerCase();

                      return (
                        (align.includes('帝国') && fs.faction === '人类帝国通用') ||
                        (align.includes('混沌') && fs.faction === '混沌诸神通用') ||
                        fs.faction === character.lineage || lin.includes(fs.faction.toLowerCase()) ||
                        fs.faction === character.socialIdentity || soc.includes(fs.faction.toLowerCase()) ||
                        fs.faction === character.subFaction || sub.includes(fs.faction.toLowerCase()) ||
                        (mutantRace && fs.faction === mutantRace)
                      );
                    }), tag: 'FACTION' },
                    { label: '常规技能', icon: <Zap className="text-red-600" size={20} />, data: REGULAR_SKILLS_DATA, tag: 'MILITARY' },
                    { label: '知识技能', icon: <Activity className="text-blue-500" size={20} />, data: KNOWLEDGE_SKILLS_DATA, tag: 'SPECIALIST' },
                    { label: '灵能', icon: <Sparkles className="text-purple-500" size={20} />, data: PSYKANA_SKILLS_DATA, tag: 'ESOTERIC' }
                  ].map(sec => (
                    <section key={sec.label}>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="bg-zinc-900/80 p-2 border border-zinc-800/40">
                           {sec.icon}
                        </div>
                        <div className="flex flex-col">
                           <h4 className="text-lg font-black text-slate-100 uppercase tracking-[0.3em]">{sec.label} <span className="text-zinc-700 text-xs ml-2 font-mono">[CLASS: {sec.tag}]</span></h4>
                           <div className="h-0.5 w-full bg-gradient-to-r from-red-900 to-transparent mt-1" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {sec.data.length === 0 ? (
                          <div className="col-span-full border border-dashed border-zinc-900 p-8 text-center text-zinc-700 italic text-[10px]">
                            符合条件的指令集暂不可用。
                          </div>
                        ) : sec.data.map((s: any) => {
                          const existing = skills.find(as => as && as.name === s.name);
                          const nextLevel = existing ? existing.level + 1 : 1;
                          const maxLevel = s.maxLevel || (sec.tag === 'SPECIALIST' ? 1 : 10);
                          if (nextLevel > maxLevel) return null; 

                          return (
                            <button
                              key={s.name}
                              type="button"
                              onClick={() => {
                                const newSkills = [...skills];
                                if (existing) {
                                  // Update existing
                                  const idx = skills.findIndex(as => as && as.name === s.name);
                                  newSkills[idx] = { ...existing, level: nextLevel, description: s.desc, stat: s.stat };
                                  // remove the originally clicked empty slot if we just upgraded
                                  if (selectedSlotIndex !== null && selectedSlotIndex >= 0 && selectedSlotIndex < skills.length && skills[selectedSlotIndex] === null) {
                                    newSkills.splice(selectedSlotIndex, 1);
                                  }
                                } else {
                                  // Add new
                                  newSkills[selectedSlotIndex!] = {
                                    id: Math.random().toString(36).substr(2, 9),
                                    name: s.name,
                                    level: 1,
                                    stat: s.stat,
                                    description: s.desc,
                                    type: sec.tag as any,
                                    isUpgradeable: sec.tag !== 'SPECIALIST'
                                  } as unknown as Skill;
                                }
                                setSkills(newSkills);
                                setIsSkillModalOpen(false);
                              }}
                              className="bg-black border border-zinc-800 hover:border-red-600 hover:bg-zinc-900/50 p-4 text-left transition-all group relative overflow-hidden h-full flex flex-col"
                            >
                              <div className="absolute inset-0 bg-red-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute top-0 right-0 p-2 opacity-10">
                                <Box size={40} className="group-hover:scale-110 transition-transform" />
                              </div>
                              <div className="relative z-10 flex flex-col h-full">
                                <div className="text-[9px] font-mono text-zinc-500 mb-1">{s.stat || (sec.tag === 'SPECIALIST' ? '学识' : '综合')} / LV.{nextLevel} (Next)</div>
                                <h5 className="text-sm font-black text-slate-200 mb-2 group-hover:text-red-400 uppercase tracking-tight leading-tight">{s.name}</h5>
                                <p className="text-[10px] text-zinc-600 leading-relaxed mb-4 flex-1">{s.desc}</p>
                                <div className="mt-auto pt-2 border-t border-zinc-900/50 text-[8px] text-zinc-700 font-mono uppercase tracking-widest">
                                  {sec.tag === 'FACTION' ? `Faction: ${s.faction}` : `Category: ${sec.label}`}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Sync Terminal Overlay */}
        <AnimatePresence>
          {isSyncing && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-8 space-y-6"
             >
                <div className="w-full max-w-2xl space-y-4">
                   <h3 className="text-xs text-imperial-red font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-4">
                     <Activity size={16} /> DATA_SYNC_TERMINAL // 输入机能文本数据
                   </h3>
                   <textarea 
                     className="w-full h-64 bg-zinc-950 border border-zinc-800 p-6 text-[11px] text-zinc-400 font-mono focus:border-imperial-red outline-none resize-none shadow-inner"
                     placeholder="在此处粘贴包含【Status】标签的文本流..."
                     value={syncText}
                     onChange={(e) => setSyncText(e.target.value)}
                   />
                   <div className="flex gap-4">
                      <Button onClick={() => parseStatusText(syncText)} className="flex-1 bg-imperial-red hover:bg-red-900 text-white font-black uppercase tracking-widest text-[10px]">建立同步 [UPLINK]</Button>
                      <Button onClick={() => setIsSyncing(false)} variant="ghost" className="flex-1 text-zinc-500 border-zinc-800 hover:text-white uppercase tracking-widest text-[10px]">放弃 [DISCONNECT]</Button>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

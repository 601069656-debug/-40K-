import { NPCProfile } from '../../../../types';

export const adeptusArbites: Record<string, Partial<NPCProfile>> = {
  'arbites_vigilant': {
    id: 'arbites_vigilant', name: '仲裁者侦察兵', status: '追踪与搜捕', "attributes": { 
      "weaponSkill": 60, "ballisticSkill": 60, "strength": 60, "toughness": 60, "agility": 60, "intelligence": 60, "perception": 60, "willpower": 60, "fellowship": 60 
    }, trait: '侦察专家, 机械猎犬亲和, 体型·普通', skill: '警觉, 追迹, 潜行, 运动, 普通知识·法务部', equipment: '甲壳甲, 激光卡宾枪, 电击棒, 电子獒犬控制器', "ahp": 12, "hp": 5, "maxHp": 5, "armorRating": 0, "movement": 6, tags: ['帝国', '法务部', '侦察兵'], aiGeneratedRecord: '负责在巢都底层或荒野中追踪逃犯的专家，通常配备有致命的机械猎犬。', lastUpdated: Date.now(), bondLevel: 0, resistance: 'Medium', "baseMeleeDamage": "3 (S/20)", "weaponStats": "激光卡宾枪, 电击棒"
  }, 'arbites_subjugator': {
    id: 'arbites_subjugator', name: '法务部镇压者', status: '暴乱镇压', "attributes": { 
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 30, "toughness": 30, "agility": 30, "intelligence": 30, "perception": 30, "willpower": 30, "fellowship": 30 
    }, trait: '铁壁：护盾屏障, 镇压大师, 体型·普通', skill: '防御, 恐吓, 力量训练, 运动', equipment: '甲壳甲, 电击棒, 重型防爆盾, 惩戒者型霰弹枪', "ahp": 6, "hp": 5, "maxHp": 5, "armorRating": 0, "movement": 3, tags: ['帝国', '法务部', '镇压部队', '重装'], aiGeneratedRecord: '专门负责应对大规模骚乱的重装部队，以坚不可摧的盾墙和残酷的电击棍闻名。', lastUpdated: Date.now(), bondLevel: 0, resistance: 'High', "baseMeleeDamage": "1 (S/20)", "weaponStats": "电击棒, 惩戒者霰弹枪"
  }, 'arbites_arbitrator': {
    id: 'arbites_arbitrator', name: '法务部判官', status: '法律执行者', "attributes": { 
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 30, "toughness": 30, "agility": 30, "intelligence": 30, "perception": 30, "willpower": 30, "fellowship": 30 
    }, trait: '法律化身, 一击必杀, 体型·普通', skill: '高级知识·帝国法典, 审讯, 察言观色, 恐吓, 指挥', equipment: '甲壳甲, 惩戒者型霰弹枪', "ahp": 6, "hp": 5, "maxHp": 5, "armorRating": 0, "movement": 3, tags: ['帝国', '法务部', '法务部判官', '官方'], aiGeneratedRecord: '不仅是执法者，更是审判官与行刑官，其权力直接源自神圣泰拉。', lastUpdated: Date.now(), bondLevel: 0, resistance: 'High', "baseMeleeDamage": "1 (S/20)", "weaponStats": "惩戒者霰弹枪, 战术匕首"
  }, 'cyber_mastiff': {
    id: 'cyber_mastiff', name: '电子獒犬', status: '执行协议', "attributes": { 
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 30, "toughness": 30, "agility": 30, "intelligence": 30, "perception": 30, "willpower": 30, "fellowship": 30 
    }, trait: '机械构造, 锁定撕咬, 装甲植入, 体型·普通', skill: '运动, 追迹, 警觉', equipment: '无', "ahp": 6, "hp": 7, "maxHp": 7, "armorRating": 4, "movement": 3, tags: ['帝国', '法务部', '机械生物', '辅助'], aiGeneratedRecord: '半机械化的猎犬，专为猎杀人类而设计。', lastUpdated: Date.now(), bondLevel: 0, resistance: 'Medium', "baseMeleeDamage": "1 (S/20)", "weaponStats": "合金利齿"
  }, 'arbites_proctor': {
    id: 'arbites_proctor', name: '法务部巡官', status: '现场指挥', "attributes": { 
      "weaponSkill": 30, "ballisticSkill": 30, "strength": 30, "toughness": 30, "agility": 30, "intelligence": 30, "perception": 30, "willpower": 30, "fellowship": 30 
    }, trait: '严明纪律, 惩戒重击, 体型·普通', skill: '指挥, 恐吓, 普通知识·法务部, 察言观色', equipment: '甲壳甲, 电击棒, 惩戒者型霰弹枪', "ahp": 6, "hp": 5, "maxHp": 5, "armorRating": 0, "movement": 3, tags: ['帝国', '法务部', '指挥官'], aiGeneratedRecord: '一线执法队伍的指挥核心，负责将帝国的法律直接降临在罪犯头上。', lastUpdated: Date.now(), bondLevel: 0, resistance: 'High', "baseMeleeDamage": "1 (S/20)", "weaponStats": "电击棒, 惩戒者霰弹枪"
  }
};

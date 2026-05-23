/**
 * 战锤40K：无尽战火 - 图鉴目录标签规范 (Bestiary Labeling Guide)
 * 用于指导 AI 提取器进行分类和打标签。
 */

export const BESTIARY_LABELS: Record<string, { description: string, tags: string[] }> = {
  'astartes': {
    description: '星际战士 (Astartes) - 忠诚战团',
    tags: ['帝国', '阿斯塔特', '星际战士', '动力甲']
  },
  'chaos_astartes': {
    description: '混沌星际战士 (Chaos Space Marines)',
    tags: ['混沌', '阿斯塔特', '叛变', '动力甲']
  },
  'astra_militarum': {
    description: '星界军 (Astra Militarum) - 凡人军队',
    tags: ['帝国', '星界军', '步兵', '防弹甲']
  },
  'adepta_sororitas': {
    description: '战斗修女会 (Adepta Sororitas)',
    tags: ['帝国', '国教', '修女', '动力甲']
  },
  'aeldari': {
    description: '灵族 (Aeldari) - 方舟灵族',
    tags: ['异形', '灵族', '高敏捷', '网道']
  },
  'tyranids': {
    description: '泰伦虫族 (Tyranids)',
    tags: ['异形', '泰伦', '虫巢意识', '生物进化']
  },
  'necrons': {
    description: '太空死灵 (Necrons)',
    tags: ['异形', '死灵', '复苏', '自我修复']
  },
  'orks': {
    description: '兽人 (Orks)',
    tags: ['异形', '兽人', 'Waaagh!', '粗鲁']
  },
  'tau': {
    description: '钛帝国 (T\'au Empire)',
    tags: ['异形', '钛族', '远距离火力', '战斗服']
  },
  'chaos_undivided_daemons': {
    description: '混沌恶魔 (Chaos Daemons)',
    tags: ['混沌', '恶魔', '亚空间', '非实体']
  },
  'vessels': {
    description: '虚空舰船 (Void Vessels)',
    tags: ['舰船', '宏大比例', '虚空盾', '超视距']
  },
  'imperium_vehicles': {
    description: '帝国载具 (Imperial Vehicles)',
    tags: ['帝国', '载具', '装甲', '重武器']
  },
  'beasts': {
    description: '异星野兽与生物 (Xenos Beasts)',
    tags: ['野兽', '生物', '本能', '危险']
  }
};

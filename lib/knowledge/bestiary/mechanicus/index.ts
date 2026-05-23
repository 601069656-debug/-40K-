import { SKITARII_RANGER_BESTIARY } from './skitarii_ranger';
import { SKITARII_VANGUARD_BESTIARY } from './skitarii_vanguard';
import { TECH_PRIEST_ENGINSEER_BESTIARY } from './tech_priest';
import { HIGH_TECH_PRIEST_BESTIARY } from './high_tech_priest';
import { SICARIAN_INFILTRATOR_BESTIARY } from './sicarian_infiltrator';
import { SICARIAN_RUSTSTALKER_BESTIARY } from './sicarian_ruststalker';
import { ELECTRO_PRIEST_BESTIARY } from './electro_priest';
import { KATAPHRON_SERVITOR_BESTIARY } from './kataphron_servitor';
import { KASTELAN_ROBOT_BESTIARY } from './kastelan_robot';
import { TITANS_BESTIARY } from './titans';

export const MECHANICUS_BESTIARY = {
  ...SKITARII_RANGER_BESTIARY, ...SKITARII_VANGUARD_BESTIARY, ...TECH_PRIEST_ENGINSEER_BESTIARY, ...HIGH_TECH_PRIEST_BESTIARY, ...SICARIAN_INFILTRATOR_BESTIARY, ...SICARIAN_RUSTSTALKER_BESTIARY, ...ELECTRO_PRIEST_BESTIARY, ...KATAPHRON_SERVITOR_BESTIARY, ...KASTELAN_ROBOT_BESTIARY, ...TITANS_BESTIARY, };

import { ORDO_XENOS_INQUISITOR_BESTIARY } from './ordo_xenos_inquisitor';
import { ORDO_HERETICUS_INQUISITOR_BESTIARY } from './ordo_hereticus_inquisitor';
import { ORDO_MALLEUS_EXORCIST_BESTIARY } from './ordo_malleus_exorcist';
import { THRONE_AGENT_BESTIARY } from './throne_agent';
import { ROSETTE_BEARER_BESTIARY } from './rosette_bearer';
import { PSYCHIC_SUPPRESSOR_BESTIARY } from './psychic_suppressor';
import { INQUISITION_MEDICAE_BESTIARY } from './inquisition_medicae';
import { INQUISITION_STRATEGISTER_BESTIARY } from './inquisition_strategister';
import { INQUISITION_SPY_BESTIARY } from './inquisition_spy';
import { INQUISITION_SERVITOR_BESTIARY } from './inquisition_servitor';

export const INQUISITION_BESTIARY = {
  ...ORDO_XENOS_INQUISITOR_BESTIARY, ...ORDO_HERETICUS_INQUISITOR_BESTIARY, ...ORDO_MALLEUS_EXORCIST_BESTIARY, ...THRONE_AGENT_BESTIARY, ...ROSETTE_BEARER_BESTIARY, ...PSYCHIC_SUPPRESSOR_BESTIARY, ...INQUISITION_MEDICAE_BESTIARY, ...INQUISITION_STRATEGISTER_BESTIARY, ...INQUISITION_SPY_BESTIARY, ...INQUISITION_SERVITOR_BESTIARY, };

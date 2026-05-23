import { NPCProfile } from '../../../../types';
import { kappicEagles } from './55th_kappic_eagles';
import { lambdanLions } from './133rd_lambdan_lions';
import { iotanGryphons } from './196th_iotan_gryphons';
import { deltaGorgons } from './99th_delta_gorgons';
import { iotanDragons } from './43rd_iotan_dragons';

export const MILITARUM_TEMPESTUS_BESTIARY: Record<string, NPCProfile> = {
  ...kappicEagles, ...lambdanLions, ...iotanGryphons, ...deltaGorgons, ...iotanDragons
};

export * from './55th_kappic_eagles';
export * from './133rd_lambdan_lions';
export * from './196th_iotan_gryphons';
export * from './99th_delta_gorgons';
export * from './43rd_iotan_dragons';

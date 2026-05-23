import { LIGHT_VEHICLES_BESTIARY } from './light_vehicles';
import { TRANSPORTS_BESTIARY } from './transports';
import { TANKS_BESTIARY } from './tanks';
import { SUPER_HEAVY_BESTIARY } from './super_heavy';
import { FLYERS_BESTIARY } from './flyers';

export const IMPERIUM_VEHICLES_BESTIARY = {
  ...LIGHT_VEHICLES_BESTIARY, ...TRANSPORTS_BESTIARY, ...TANKS_BESTIARY, ...SUPER_HEAVY_BESTIARY, ...FLYERS_BESTIARY
};

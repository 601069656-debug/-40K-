import { primarchsData } from './primarchs_40k';
import { primarchs30kData } from './primarchs_30k';

export const PRIMARCHS_BESTIARY = {
  ...primarchsData, ...primarchs30kData
};

export * from './primarchs_40k';
export * from './primarchs_30k';

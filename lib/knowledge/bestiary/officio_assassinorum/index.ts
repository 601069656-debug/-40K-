import { NPCProfile } from '../../../../types';
import { vindicare } from './vindicare';
import { callidus } from './callidus';
import { eversor } from './eversor';
import { culexus } from './culexus';

export const officioAssassinorum: Record<string, Partial<NPCProfile>> = {
  ...vindicare, ...callidus, ...eversor, ...culexus
};

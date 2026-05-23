import fs from 'fs';
import path from 'path';

const indexPath = path.join(process.cwd(), 'lib/knowledge/bestiary/index.ts');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

const imports = [
  "import { KHORNE_WARBAND_BESTIARY } from './khorne/khorne_warband';",
  "import { TZEENTCH_CULTISTS_BESTIARY } from './tzeentch/tzeentch_cultists';",
  "import { NURGLE_WARBAND_BESTIARY } from './nurgle/nurgle_warband';",
  "import { SLAANESH_CULTISTS_BESTIARY } from './slaanesh/slaanesh_cultists';",
  "import { DARK_MECHANICUM_BESTIARY } from './dark_mechanicum/fallen_tech_priest';",
  "import { CHAOS_DAEMONS_BESTIARY } from './chaos_daemons/chaos_daemons';",
  "import { TRAITOR_GUARD_BESTIARY } from './traitor_guard/traitor_guard';",
  "import { CHAOS_CULTS_BESTIARY } from './chaos_cults/cultists';"
];

const expands = [
  "  ...KHORNE_WARBAND_BESTIARY,",
  "  ...TZEENTCH_CULTISTS_BESTIARY,",
  "  ...NURGLE_WARBAND_BESTIARY,",
  "  ...SLAANESH_CULTISTS_BESTIARY,",
  "  ...DARK_MECHANICUM_BESTIARY,",
  "  ...CHAOS_DAEMONS_BESTIARY,",
  "  ...TRAITOR_GUARD_BESTIARY,",
  "  ...CHAOS_CULTS_BESTIARY,"
];

const exports = [
  "export * from './khorne/khorne_warband';",
  "export * from './tzeentch/tzeentch_cultists';",
  "export * from './nurgle/nurgle_warband';",
  "export * from './slaanesh/slaanesh_cultists';",
  "export * from './dark_mechanicum/fallen_tech_priest';",
  "export * from './chaos_daemons/chaos_daemons';",
  "export * from './traitor_guard/traitor_guard';",
  "export * from './chaos_cults/cultists';"
];

// Add imports
if (!indexContent.includes('khorne/khorne_warband')) {
  indexContent = indexContent.replace(
    'import { KHORNE_BESTIARY } from \'./khorne\';',
    "import { KHORNE_BESTIARY } from './khorne';\n" + imports.join('\n')
  );
  
  indexContent = indexContent.replace(
    '...KHORNE_BESTIARY,',
    "...KHORNE_BESTIARY,\n" + expands.join('\n')
  );
  
  indexContent = indexContent + '\n' + exports.join('\n') + '\n';
  
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log("Updated index.ts");
} else {
  console.log("index.ts already updated");
}


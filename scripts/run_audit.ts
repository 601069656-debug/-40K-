import * as fs from 'fs';
import * as path from 'path';
import { auditFile } from './audit_data';

const BESTIARY_DIR = path.join(process.cwd(), 'lib/knowledge/bestiary');

function getAllFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath));
    } else if (filePath.endsWith('.ts') && !file.includes('index.ts')) {
      results.push(filePath);
    }
  });
  return results;
}

async function runBatchAudit() {
  const allFiles = getAllFiles(BESTIARY_DIR);
  console.log(`Found ${allFiles.length} bestiary files. Starting batch audit...`);

  // 每批处理 5 个文件，避免 Token 压力（针对 AI 的处理流程优化）
  const batchSize = 5;
  const currentBatchIdx = parseInt(process.argv[2] || '0');
  const start = currentBatchIdx * batchSize;
  const end = Math.min(start + batchSize, allFiles.length);

  if (start >= allFiles.length) {
    console.log('All batches completed.');
    return;
  }

  const batchFiles = allFiles.slice(start, end);
  console.log(`--- Processing Batch ${currentBatchIdx} (${start} to ${end-1}) ---`);

  for (const file of batchFiles) {
    const issues = await auditFile(file);
    if (issues.length === 0) {
      console.log(`✅ ${path.relative(BESTIARY_DIR, file)}: OK`);
    } else {
      console.log(`❌ ${path.relative(BESTIARY_DIR, file)}: ${issues.length} issues found`);
      issues.forEach(issue => {
        console.log(`   [${issue.type}] ${issue.unit}: ${issue.message}`);
      });
    }
  }

  console.log(`--- Batch ${currentBatchIdx} Done. To run next batch: npx tsx scripts/run_audit.ts ${currentBatchIdx + 1} ---`);
}

runBatchAudit();

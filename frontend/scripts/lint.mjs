import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.resolve(process.cwd(), 'components');
const APP_DIR = path.resolve(process.cwd(), 'app');

const CODE_SMELL_PATTERNS = [
  { pattern: /\bdebugger\b/, message: 'Disallowed "debugger" statement found' },
  { pattern: /\balert\s*\(/, message: 'Disallowed "alert()" window call found' },
  { pattern: /Junior Developer Primer/i, message: 'Disallowed deprecated "Junior Developer Primer" label found' },
  { pattern: /catch\s*\([^)]*\)\s*\{\s*\}/, message: 'Empty catch block swallowing error detected' },
];

let issuesFound = 0;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        scanDir(fullPath);
      }
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js') || entry.name.endsWith('.mjs')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        for (const rule of CODE_SMELL_PATTERNS) {
          if (rule.pattern.test(line)) {
            console.error(`❌ [Code Smell] ${path.relative(process.cwd(), fullPath)}:${idx + 1} - ${rule.message}`);
            issuesFound++;
          }
        }
      });
    }
  }
}

console.log('🔍 Running automated code smell & hygiene audit...');
scanDir(SRC_DIR);
scanDir(APP_DIR);

if (issuesFound > 0) {
  console.error(`\n❌ Code smell check failed: ${issuesFound} issues detected.`);
  process.exit(1);
} else {
  console.log('✅ Code smell & hygiene check passed: 0 issues found.');
  process.exit(0);
}

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');

const excludedExact = new Set([
  '.env',
  '.DS_Store',
  '.git',
  'node_modules',
  'output/demo',
  'packages',
  'tests/create-carousel-os.test.js',
  'npm-debug.log'
]);

const excludedPrefixes = [
  '.git/',
  'node_modules/',
  'output/demo/',
  'packages/'
];

export function defaultTemplateRoot() {
  return path.join(packageRoot, 'template');
}

export function shouldExcludePath(relativePath) {
  const normalized = relativePath.split(path.sep).join('/').replace(/^\.\//, '');
  if (!normalized) return false;
  if (excludedExact.has(normalized)) return true;
  if (normalized.startsWith('output/') && normalized !== 'output/.gitkeep') return true;
  return excludedPrefixes.some(prefix => normalized.startsWith(prefix));
}

function assertTargetIsWritable(targetDir) {
  if (!fs.existsSync(targetDir)) return;
  const entries = fs.readdirSync(targetDir).filter(entry => entry !== '.DS_Store');
  if (entries.length > 0) {
    throw new Error(`Target directory is not empty: ${targetDir}`);
  }
}

function copyRecursive(sourceDir, targetDir, baseDir = sourceDir) {
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const relativePath = path.relative(baseDir, sourcePath);
    if (shouldExcludePath(relativePath)) continue;

    const targetPath = path.join(targetDir, relativePath);
    if (entry.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      copyRecursive(sourcePath, targetDir, baseDir);
    } else if (entry.isFile()) {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(sourcePath, targetPath);
      fs.chmodSync(targetPath, fs.statSync(sourcePath).mode);
    }
  }
}

export function copyTemplate({ templateRoot = defaultTemplateRoot(), targetDir }) {
  if (!targetDir) throw new Error('A target directory is required.');
  if (!fs.existsSync(templateRoot)) throw new Error(`Template folder not found: ${templateRoot}`);

  const resolvedTarget = path.resolve(targetDir);
  assertTargetIsWritable(resolvedTarget);
  fs.mkdirSync(resolvedTarget, { recursive: true });
  copyRecursive(templateRoot, resolvedTarget);
  return { targetDir: resolvedTarget };
}

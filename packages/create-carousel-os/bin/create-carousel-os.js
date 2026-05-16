#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { copyTemplate } from '../lib/scaffold.js';

function printHelp() {
  console.log(`create-carousel-os

Usage:
  npm create carousel-os@latest <project-name>
  npm create carousel-os@latest <project-name> -- --install

Options:
  --yes       Skip confirmation output; scaffold with defaults
  --install   Run npm install after files are copied
  --help      Show this help message
`);
}

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  printHelp();
  process.exit(0);
}

const targetArg = args.find(arg => !arg.startsWith('-'));
if (!targetArg) {
  printHelp();
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), targetArg);
const install = args.includes('--install');

const result = copyTemplate({ targetDir });
console.log(`\nCarousel OS created at ${result.targetDir}`);

if (install) {
  console.log('\nInstalling dependencies...');
  const installResult = spawnSync('npm', ['install'], {
    cwd: result.targetDir,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  if (installResult.status !== 0) process.exit(installResult.status || 1);
}

console.log('\nNext steps:');
console.log(`  cd ${path.relative(process.cwd(), result.targetDir) || '.'}`);
if (!install) console.log('  npm install');
console.log('  cp .env.example .env');
console.log('  npm run init');
console.log('\nThen open the folder in Claude Code, Codex, Cursor, Antigravity, or VS Code with an agent.');

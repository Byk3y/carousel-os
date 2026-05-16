import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  copyTemplate,
  defaultTemplateRoot,
  shouldExcludePath
} from '../packages/create-carousel-os/lib/scaffold.js';

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'create-carousel-os-'));
}

test('shouldExcludePath excludes generated, private, and dependency paths', () => {
  assert.equal(shouldExcludePath('.git/config'), true);
  assert.equal(shouldExcludePath('node_modules/puppeteer/package.json'), true);
  assert.equal(shouldExcludePath('.env'), true);
  assert.equal(shouldExcludePath('output/demo/2026-05-16-basic-carousel/01.png'), true);
  assert.equal(shouldExcludePath('output/.gitkeep'), false);
  assert.equal(shouldExcludePath('src/carousel.js'), false);
});

test('copyTemplate creates a usable Carousel OS project', () => {
  const target = path.join(tempDir(), 'my-content-system');
  const result = copyTemplate({ templateRoot: defaultTemplateRoot(), targetDir: target });

  assert.equal(result.targetDir, target);
  assert.equal(fs.existsSync(path.join(target, 'package.json')), true);
  assert.equal(fs.existsSync(path.join(target, 'AGENTS.md')), true);
  assert.equal(fs.existsSync(path.join(target, 'src', 'carousel.js')), true);
  assert.equal(fs.existsSync(path.join(target, 'templates', 'hook.html')), true);
  assert.equal(fs.existsSync(path.join(target, 'brands', 'demo', 'config.json')), true);
  assert.equal(fs.existsSync(path.join(target, '.claude', 'skills', 'carousel-os', 'SKILL.md')), true);
});

test('copyTemplate does not copy ignored private or generated files', () => {
  const target = path.join(tempDir(), 'clean-project');
  copyTemplate({ templateRoot: defaultTemplateRoot(), targetDir: target });

  assert.equal(fs.existsSync(path.join(target, '.git')), false);
  assert.equal(fs.existsSync(path.join(target, 'node_modules')), false);
  assert.equal(fs.existsSync(path.join(target, '.env')), false);
  assert.equal(fs.existsSync(path.join(target, 'output', 'demo')), false);
  assert.equal(fs.existsSync(path.join(target, 'output', '.gitkeep')), true);
});

test('copyTemplate refuses a non-empty target directory', () => {
  const target = path.join(tempDir(), 'existing');
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, 'README.md'), 'already here');

  assert.throws(
    () => copyTemplate({ templateRoot: defaultTemplateRoot(), targetDir: target }),
    /not empty/
  );
});

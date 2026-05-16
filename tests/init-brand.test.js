import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildBrandFiles,
  slugifyBrandName,
  writeBrandFiles
} from '../src/init-brand.js';

test('slugifyBrandName creates safe folder names', () => {
  assert.equal(slugifyBrandName('Acme AI Studio'), 'acme-ai-studio');
  assert.equal(slugifyBrandName('  Next/Gen!!! Tools  '), 'next-gen-tools');
  assert.equal(slugifyBrandName(''), 'brand');
});

test('buildBrandFiles creates manual brand system files with defaults', () => {
  const files = buildBrandFiles({
    brandName: 'Acme AI',
    handle: '@acmeai',
    topics: 'AI automations for founders',
    tone: 'direct, practical, founder-led',
    carouselTypes: 'tutorials, product launches',
    visualStyle: 'mixed'
  });

  assert.equal(files.brandSlug, 'acme-ai');
  assert.equal(files.files['config.json'].name, 'acme-ai');
  assert.equal(files.files['config.json'].handle, '@acmeai');
  assert.equal(files.files['config.json'].postiz.instagram, '');
  assert.match(files.files['DESIGN-SYSTEM.md'], /AI automations for founders/);
  assert.match(files.files['DESIGN-SYSTEM.md'], /direct, practical, founder-led/);
  assert.match(files.files['SETUP.md'], /npm run postiz:discover/);
});

test('buildBrandFiles records optional website as a source', () => {
  const files = buildBrandFiles({
    brandName: 'Example Labs',
    handle: '@example',
    website: 'https://example.com',
    topics: 'developer tools',
    tone: 'technical and crisp',
    carouselTypes: 'news and tutorials',
    visualStyle: 'text-only'
  });

  assert.match(files.files['brand-sources.md'], /https:\/\/example\.com/);
  assert.match(files.files['DESIGN-SYSTEM.md'], /Website source/);
});

test('writeBrandFiles writes expected files and protects existing brands by default', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'carousel-os-init-'));
  const files = buildBrandFiles({
    brandName: 'Acme AI',
    handle: '@acmeai',
    topics: 'AI automations',
    tone: 'practical',
    carouselTypes: 'tutorials',
    visualStyle: 'mixed'
  });

  const result = writeBrandFiles(files, { rootDir: tempDir });
  assert.equal(result.brandDir, path.join(tempDir, 'brands', 'acme-ai'));
  assert.equal(fs.existsSync(path.join(result.brandDir, 'DESIGN-SYSTEM.md')), true);
  assert.equal(fs.existsSync(path.join(result.brandDir, 'config.json')), true);
  assert.equal(fs.existsSync(path.join(result.brandDir, 'logo.svg')), true);
  assert.throws(() => writeBrandFiles(files, { rootDir: tempDir }), /already exists/);
});

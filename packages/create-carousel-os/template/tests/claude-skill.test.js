import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const skillPath = '.claude/skills/carousel-os/SKILL.md';

test('Claude project skill has required frontmatter and repo references', () => {
  const skill = fs.readFileSync(skillPath, 'utf8');

  assert.equal(skill.startsWith('---\n'), true);
  assert.match(skill, /name: carousel-os/);
  assert.match(skill, /description: .*branded social carousels/i);
  assert.match(skill, /AGENTS.md/);
  assert.equal(skill.includes('docs/postiz.md'), true);
  assert.equal(skill.includes('docs/templates.md'), true);
});

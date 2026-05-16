import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSlideHtml } from '../src/generate.js';

const brand = {
  name: 'demo',
  handle: '@demo',
  colors: {
    hookBackground: '#000',
    contentBackground: '#fff',
    ctaBackground: '#000',
    textPrimary: '#111',
    textSecondary: '#555',
    accent: '#f60',
    highlight2: '#0cc',
    hookHighlight: '#fff',
    ctaText: '#111'
  },
  fonts: {
    headline: 'Anton',
    body: 'Inter',
    small: 'JetBrains Mono'
  },
  layout: {
    padding: 80,
    cornerRadius: 24
  }
};

test('buildSlideHtml escapes slide text before interpolation', () => {
  const html = buildSlideHtml({
    type: 'content',
    label: '<img src=x onerror=alert(1)>',
    number: 1,
    headline: 'Bad **<script>alert(1)</script>**',
    body: 'Use <b>literal</b> tags safely.'
  }, brand);

  assert.equal(html.includes('<script>alert(1)</script>'), false);
  assert.equal(html.includes('<img src=x onerror=alert(1)>'), false);
  assert.equal(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), true);
  assert.equal(html.includes('&lt;b&gt;literal&lt;/b&gt;'), true);
});

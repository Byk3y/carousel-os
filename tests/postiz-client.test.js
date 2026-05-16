import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildInstagramPayload,
  buildTikTokPhotoPayload,
  createPostizClient
} from '../src/postiz-client.js';

test('createPostizClient requires an API key', () => {
  assert.throws(() => createPostizClient(), /POSTIZ_API_KEY/);
});

test('buildInstagramPayload uses the selected integration id', () => {
  const payload = buildInstagramPayload({
    integrationId: 'ig-123',
    caption: 'Caption',
    uploads: [{ id: 'img-1', path: 'https://uploads.postiz.com/1.png' }],
    date: '2026-05-16T10:00:00.000Z'
  });

  assert.equal(payload.type, 'schedule');
  assert.equal(payload.posts[0].integration.id, 'ig-123');
  assert.equal(payload.posts[0].settings.__type, 'instagram');
  assert.equal(payload.posts[0].value[0].image[0].id, 'img-1');
});

test('buildTikTokPhotoPayload sets upload photo-mode requirements', () => {
  const payload = buildTikTokPhotoPayload({
    integrationId: 'tt-123',
    title: 'AI carousel workflow',
    caption: 'AI carousel workflow for founders. #aitools #contentcreation #socialmedia #founders #carousel',
    uploads: [{ id: 'img-1', path: 'https://uploads.postiz.com/1.png' }],
    date: '2026-05-16T10:00:00.000Z'
  });

  const settings = payload.posts[0].settings;
  assert.equal(settings.__type, 'tiktok');
  assert.equal(settings.content_posting_method, 'UPLOAD');
  assert.equal(settings.isPhotoMode, true);
  assert.equal(settings.privacy_level, 'SELF_ONLY');
  assert.equal(settings.title, 'AI carousel workflow');
});


test('buildTikTokPhotoPayload rejects missing title', () => {
  assert.throws(() => buildTikTokPhotoPayload({
    integrationId: 'tt-123',
    title: '',
    caption: 'AI tools for founders. #aitools #founders #automation #contentcreation #carousel',
    uploads: [{ id: 'img-1', path: 'https://uploads.postiz.com/1.png' }]
  }), /TikTok title/);
});

test('buildTikTokPhotoPayload requires exactly 5 hashtags in caption', () => {
  assert.throws(() => buildTikTokPhotoPayload({
    integrationId: 'tt-123',
    title: 'AI carousel workflow',
    caption: 'AI tools for founders. #aitools #founders',
    uploads: [{ id: 'img-1', path: 'https://uploads.postiz.com/1.png' }]
  }), /exactly 5 hashtags/);
});

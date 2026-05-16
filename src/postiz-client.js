import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_BASE_URL = 'https://api.postiz.com/public/v1';

export function createPostizClient({ apiKey, baseUrl = DEFAULT_BASE_URL, fetchImpl = fetch } = {}) {
  if (!apiKey) {
    throw new Error('POSTIZ_API_KEY is required. Add it to .env before using Postiz commands.');
  }

  const root = baseUrl.replace(/\/$/, '');

  async function request(endpoint, options = {}) {
    const res = await fetchImpl(`${root}${endpoint}`, {
      ...options,
      headers: {
        Authorization: apiKey,
        ...(options.headers || {})
      }
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      const message = data?.message || data?.error || text || `Postiz request failed with ${res.status}`;
      throw new Error(message);
    }

    return data;
  }

  return {
    listIntegrations() {
      return request('/integrations');
    },

    async uploadFile(filePath) {
      const file = fs.readFileSync(filePath);
      const blob = new Blob([file]);
      const form = new FormData();
      form.append('file', blob, path.basename(filePath));
      return request('/upload', {
        method: 'POST',
        body: form
      });
    },

    createPost(payload) {
      return request('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    }
  };
}

export function buildInstagramPayload({ integrationId, caption, uploads, date = new Date().toISOString() }) {
  return {
    type: 'schedule',
    date,
    shortLink: false,
    tags: [],
    posts: [{
      integration: { id: integrationId },
      value: [{
        content: caption,
        image: uploads
      }],
      settings: {
        __type: 'instagram',
        post_type: 'post'
      }
    }]
  };
}

function countHashtags(text) {
  return (String(text).match(/(^|\s)#[\p{L}\p{N}_]+/gu) || []).length;
}

export function validateTikTokMetadata({ title, caption }) {
  if (!String(title || '').trim()) {
    throw new Error('TikTok title is required.');
  }

  if (String(title).length > 90) {
    throw new Error('TikTok title must be 90 characters or fewer.');
  }

  if (!String(caption || '').trim()) {
    throw new Error('TikTok caption is required.');
  }

  const hashtagCount = countHashtags(caption);
  if (hashtagCount !== 5) {
    throw new Error(`TikTok caption must include exactly 5 hashtags. Found ${hashtagCount}.`);
  }
}

export function buildTikTokPhotoPayload({ integrationId, title, caption, uploads, date = new Date().toISOString() }) {
  validateTikTokMetadata({ title, caption });

  return {
    type: 'schedule',
    date,
    shortLink: false,
    tags: [],
    posts: [{
      integration: { id: integrationId },
      value: [{
        content: caption,
        image: uploads
      }],
      settings: {
        __type: 'tiktok',
        title,
        privacy_level: 'SELF_ONLY',
        duet: false,
        stitch: false,
        comment: true,
        brand_content_toggle: false,
        brand_organic_toggle: false,
        autoAddMusic: 'no',
        isPhotoMode: true,
        photoCoverIndex: 0,
        content_posting_method: 'UPLOAD'
      }
    }]
  };
}

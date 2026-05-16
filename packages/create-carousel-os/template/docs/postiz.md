# Postiz

Carousel OS can publish rendered carousel PNGs through Postiz.

## 1. Add your API key

Get your API key in Postiz from Settings > Developers > Public API.

Add it to `.env`:

```env
POSTIZ_API_KEY=your-api-key
```

Official docs: https://docs.postiz.com/public-api/introduction

## 2. Connect social accounts in Postiz

Connect Instagram, TikTok, LinkedIn, or other channels inside Postiz.

Postiz uses two terms for the same thing:

- In the Postiz UI: channel
- In the API: integration

Carousel OS needs the API integration ID.

## 3. Discover integration IDs

Run:

```bash
npm run postiz:discover
```

This calls:

```text
GET https://api.postiz.com/public/v1/integrations
```

Official docs: https://docs.postiz.com/public-api/integrations/list

Copy the selected IDs into `brands/<brand>/config.json`:

```json
{
  "postiz": {
    "instagram": "your-instagram-integration-id",
    "tiktok": "your-tiktok-integration-id"
  }
}
```

## 4. Publish

Render a carousel first, then run:

```bash
npm run post -- demo instagram
npm run post -- demo tiktok
```

TikTok photo-mode posts use `content_posting_method: "UPLOAD"` by default so the post is sent to the TikTok inbox for manual review.

Official create post docs: https://docs.postiz.com/public-api/posts/create

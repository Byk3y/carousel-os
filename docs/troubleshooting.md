# Troubleshooting

## Puppeteer install fails

Run:

```bash
npm install
```

If Chrome download fails, check your network and npm configuration.

## Fonts look wrong

The templates load fonts from Google Fonts. If you are offline, fallback fonts may render.

## Images do not render

Use local image paths relative to the repo root, such as:

```text
input/images/demo/example.png
```

## Postiz says unauthorized

Check `POSTIZ_API_KEY` in `.env`.

## Postiz integration not found

Run:

```bash
npm run postiz:discover
```

Make sure the selected ID is saved under `brands/<brand>/config.json`.

## TikTok post becomes a draft

Use `type: "schedule"` and `content_posting_method: "UPLOAD"`. `type: "draft"` saves inside Postiz and does not send to TikTok.

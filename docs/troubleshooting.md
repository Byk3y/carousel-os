# Troubleshooting

## Puppeteer install fails

Carousel OS uses `puppeteer-core`, so `npm install` should not download Chrome. If install still fails, make sure your package is current:

```bash
npm install
```

If an older generated project still uses `puppeteer`, skip the browser download and use your system Chrome:

```bash
PUPPETEER_SKIP_DOWNLOAD=true npm install
export PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

If rendering fails with "Could not find Chrome", install Google Chrome or set `PUPPETEER_EXECUTABLE_PATH` to a Chromium-compatible browser.

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

# Carousel OS Agent Instructions

You are operating Carousel OS, a local AI-agent workspace for generating branded social carousels.

## When the user asks to set up a brand

1. Ask whether they have a website.
2. If they provide a website and you have web access, inspect it for brand name, logo, colors, typography, audience, and tone.
3. If there is no website or web access, ask for brand name, handle, niche, tone, preferred colors, and content types.
4. Create `brands/<brand>/DESIGN-SYSTEM.md`.
5. Create `brands/<brand>/config.json`.
6. Add a logo file if available, or create a simple text/SVG placeholder.
7. Ask whether they want Postiz publishing. If yes, guide them through `.env` and `npm run postiz:discover`.

## When the user asks to create a carousel

1. Read `brands/HOOK-SYSTEM.md`.
2. Read `brands/<brand>/DESIGN-SYSTEM.md`.
3. Read `brands/<brand>/config.json`.
4. Check `input/images/<brand>/` for usable images.
5. Choose the slide count based on the content:
   - 2-3 slides for news, hot takes, launches, and single-stat posts.
   - 5-7 slides for tutorials, frameworks, prompt lists, and save-worthy guides.
6. Generate slide content as JSON or a small file in `examples/`.
7. Run the renderer with `createCarousel()`.
8. Report the output folder.

## When the user asks to post

1. Confirm `.env` contains `POSTIZ_API_KEY`.
2. Confirm `brands/<brand>/config.json` contains the platform integration ID.
3. Run `npm run post -- <brand> instagram` or `npm run post -- <brand> tiktok`.
4. For TikTok, include a title, keyword-rich caption, and exactly 5 hashtags.

Never commit `.env`, real API keys, or generated production output.

# Carousel OS Agent Instructions

You are operating Carousel OS, a local AI-agent workspace for generating branded social carousels.

## Account and Brand Model

Carousel OS is multi-account by default. Treat each social account, client, product, or creator brand as a separate local brand folder:

```text
brands/<brand>/
input/images/<brand>/
output/<brand>/
```

The selected brand determines the carousel style:

- `brands/<brand>/DESIGN-SYSTEM.md` controls tone, content structure, audience, and style rules.
- `brands/<brand>/config.json` controls colors, fonts, handle, layout, and Postiz integration IDs.
- `input/images/<brand>/` contains account-specific hook, content, CTA, screenshot, and reference images.
- `createCarousel(slides, "<brand>", "<slug>")` renders with that brand's config.

When a user asks for a carousel and multiple brands exist, ask which brand/account to use unless they already named it. If one brand exists, use it. Do not ask for a website during normal carousel creation.

## When the user asks to initialize or add a brand/account

Use the lowest-friction path.

1. Ask for the brand/account name and social handle.
2. Ask whether they have a website or existing brand references, but make it clear this is optional.
3. If they provide a website and you have web access, inspect it for brand name, logo, colors, typography, audience, and tone.
4. If there is no website or web access, ask for niche/topics, tone, preferred colors, visual style, and content types.
5. Either run `npm run init` interactively or run `npm run init -- --yes --brand "<name>" --handle "<handle>" --website "<url>" --topics "<topics>" --tone "<tone>"`.
6. Refine `brands/<brand>/DESIGN-SYSTEM.md` after website inspection or user preferences.
7. Ask whether they want Postiz publishing. If yes, guide them through `.env` and `npm run postiz:discover`.

## When the user asks to create a carousel

1. Read `brands/HOOK-SYSTEM.md`.
2. Read `brands/<brand>/DESIGN-SYSTEM.md`.
3. Read `brands/<brand>/config.json`.
4. Check `input/images/<brand>/` for usable images and read `input/README.md` if present.
5. Use images by purpose:
   - Hook images (`hook-*.png`, `hook-*.jpg`) are best for `hook-composite` slides.
   - CTA images (`cta-*.png`, `cta-*.jpg`) are best for `cta` slides.
   - Screenshots and product images are best for `screenshot-slide` or `content-image`.
   - Reference images are for visual direction; do not place them directly unless appropriate.
6. If no suitable hook image exists and you are running in Codex or another agent with image-generation access, generate a strong hook image, save it in `input/images/<brand>/`, then use it with `imagePath`. If image generation is unavailable, ask the user to provide an image or render text-only.
7. Choose the slide count based on the content:
   - 2-3 slides for news, hot takes, launches, and single-stat posts.
   - 5-7 slides for tutorials, frameworks, prompt lists, and save-worthy guides.
8. Generate slide content as JSON or a small file in `examples/`.
9. Run the renderer with `createCarousel()`.
10. Report the output folder.

## When the user asks to post

1. Confirm `.env` contains `POSTIZ_API_KEY`.
2. Confirm `brands/<brand>/config.json` contains the platform integration ID.
3. Run `npm run post -- <brand> instagram` or `npm run post -- <brand> tiktok`.
4. For TikTok, include a title, keyword-rich caption, and exactly 5 hashtags.

## Self-Improvement Loop

When the user corrects a mistake or a workflow problem repeats, improve the project instructions so the same mistake is less likely next time.

1. Read `docs/self-improvement.md`.
2. Identify whether the lesson is global, brand-specific, template-specific, input-asset-specific, setup-related, or Postiz-related.
3. Update the narrowest durable file:
   - Global workflow: `AGENTS.md` and `CLAUDE.md`
   - Brand style: `brands/<brand>/DESIGN-SYSTEM.md`
   - Brand assets: `input/images/<brand>/README.md`
   - Templates: `docs/templates.md`
   - Setup/troubleshooting: `docs/setup.md` or `docs/troubleshooting.md`
   - Posting: `docs/postiz.md`
4. Do not store secrets, private API keys, volatile facts, or one-off task details.
5. Verify with a relevant test, render, dry run, or docs check.

Never commit `.env`, real API keys, or generated production output.

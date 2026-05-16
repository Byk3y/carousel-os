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
- `input/images/<brand>/` contains account-specific source images.
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

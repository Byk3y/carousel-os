# Brand and Account System

Each brand or account lives in `brands/<brand>/`. This is how Carousel OS supports multiple accounts in one local workspace.

```text
brands/demo/
  DESIGN-SYSTEM.md
  SETUP.md
  brand-sources.md
  config.json
  logo.svg
```

Use one folder per social account, client, product, or creator brand.

```text
brands/acme-ai/
brands/founder-notes/
brands/client-product/

input/images/acme-ai/
input/images/founder-notes/
input/images/client-product/
```

`DESIGN-SYSTEM.md` tells the agent how the account should sound, structure content, and choose content patterns.

`SETUP.md` gives brand-specific next prompts and Postiz setup reminders.

`brand-sources.md` records the website, topics, tone, carousel types, and visual style used during initialization.

`config.json` controls colors, fonts, handle, layout, and optional Postiz integration IDs.

`createCarousel(slides, "<brand>", "<slug>")` loads `brands/<brand>/config.json`, so the selected brand controls the rendered style. Agents should also read `brands/<brand>/DESIGN-SYSTEM.md` before writing slide content.

Do not store API keys in brand config. Use `.env` for secrets.

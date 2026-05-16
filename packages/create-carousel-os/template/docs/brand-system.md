# Brand System

Each brand lives in `brands/<brand>/`.

```text
brands/demo/
  DESIGN-SYSTEM.md
  SETUP.md
  brand-sources.md
  config.json
  logo.svg
```

`DESIGN-SYSTEM.md` tells the agent how the brand should sound and structure content.

`SETUP.md` gives brand-specific next prompts and Postiz setup reminders.

`brand-sources.md` records the website, topics, tone, carousel types, and visual style used during initialization.

`config.json` controls colors, fonts, handle, layout, and optional Postiz integration IDs.

Do not store API keys in brand config. Use `.env` for secrets.

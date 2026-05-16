# Brand System

Each brand lives in `brands/<brand>/`.

```text
brands/demo/
  DESIGN-SYSTEM.md
  config.json
  logo.svg
```

`DESIGN-SYSTEM.md` tells the agent how the brand should sound and structure content.

`config.json` controls colors, fonts, handle, layout, and optional Postiz integration IDs.

Do not store API keys in brand config. Use `.env` for secrets.

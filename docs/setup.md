# Setup

## Recommended: One-Line Project Create

```bash
npm create carousel-os@latest my-content-system
cd my-content-system
npm install
cp .env.example .env
npm run init
```

## Alternative: Git Clone

```bash
git clone https://github.com/Byk3y/carousel-os
cd carousel-os
npm install
cp .env.example .env
npm run init
```

## Initialize a Brand or Account

Use the guided CLI:

```bash
npm run init
```

Or let your AI agent drive it:

```text
Add a new Carousel OS account for Acme AI.
Website, if useful: https://example.com.
I want to make carousels about AI automation for founders.
```

The setup asks only for what is needed to create the brand/account:

- Brand or account name.
- Social handle.
- Optional website URL.
- Topics.
- Tone.
- Carousel types.
- Visual style.

For agent/non-interactive setup:

```bash
npm run init -- --yes --brand "Acme AI" --handle "@acme" --topics "AI automations" --types "tutorials and launches"
```

Run `npm run init` again for each additional account. Each account gets its own:

- `brands/<brand>/DESIGN-SYSTEM.md`
- `brands/<brand>/config.json`
- `input/images/<brand>/`
- `output/<brand>/`

When creating a carousel, name the account:

```text
Make a carousel for Acme AI about onboarding AI agents.
```

## Render the Demo

```bash
npm run demo
```

The rendered PNGs appear in `output/demo/`.

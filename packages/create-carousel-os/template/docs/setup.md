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

## Initialize a Brand

Use the guided CLI:

```bash
npm run init
```

Or let your AI agent drive it:

```text
Initialize Carousel OS for my brand.
My website is https://example.com.
I want to make carousels about AI automation for founders.
```

The setup asks only for what is needed to create the first brand:

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

## Render the Demo

```bash
npm run demo
```

The rendered PNGs appear in `output/demo/`.

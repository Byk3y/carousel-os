---
name: carousel-os
description: Generate and publish branded social carousels with Carousel OS. Use when initializing a brand, creating carousel slides, rendering PNGs, or posting through Postiz.
---

# Carousel OS

Use this skill when the user wants to initialize a Carousel OS brand, turn a topic or URL into a carousel, render carousel PNGs, or publish through Postiz.

## Core Workflow

1. Read `AGENTS.md` for the repo-level operating rules.
2. Treat each social account/client/product as a separate brand folder under `brands/<brand>/`.
3. For brand/account setup, use `npm run init` or the non-interactive flags documented in `docs/setup.md`. Website input is optional and only used as a brand reference source.
4. For carousel creation, identify the target brand/account first, then read `brands/HOOK-SYSTEM.md`, the brand `DESIGN-SYSTEM.md`, and the brand `config.json` before writing slides.
5. Inspect `input/images/<brand>/` for hook, CTA, screenshot, product, and reference images before choosing templates.
6. If the current agent can generate images, it may create missing hook or CTA images, save them in `input/images/<brand>/`, and use them through `imagePath`.
7. Render with `createCarousel()` from `src/carousel.js`.
8. For publishing, follow `docs/postiz.md` and never expose `.env` secrets.
9. If a user correction reveals a durable workflow gap, follow `docs/self-improvement.md` and update the narrowest relevant instruction file.

## Useful References

- Agent workflow: `AGENTS.md`
- Setup flow: `docs/setup.md`
- Brand/account system: `docs/brand-system.md`
- Input image workflow: `input/README.md`
- Slide templates and JSON shape: `docs/templates.md`
- Postiz publishing: `docs/postiz.md`
- Self-improvement loop: `docs/self-improvement.md`

## Guardrails

- Do not redesign templates unless the user explicitly asks.
- Do not require external Claude skills such as frontend-design for normal carousel generation.
- Do not ask for a website during normal carousel creation. Only ask for a website when initializing or refining a brand/account.
- Do not mix assets between accounts. Keep hook, CTA, screenshot, and reference images inside the matching `input/images/<brand>/` folder.
- Do not commit `.env`, generated output folders, or real Postiz integration IDs.
- Use 2-3 slides for news, hot takes, launches, and single-stat posts.
- Use 5-7 slides for tutorials, frameworks, prompt lists, and save-worthy guides.

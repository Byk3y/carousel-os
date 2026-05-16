---
name: carousel-os
description: Generate and publish branded social carousels with Carousel OS. Use when initializing a brand, creating carousel slides, rendering PNGs, or posting through Postiz.
---

# Carousel OS

Use this skill when the user wants to initialize a Carousel OS brand, turn a topic or URL into a carousel, render carousel PNGs, or publish through Postiz.

## Core Workflow

1. Read `AGENTS.md` for the repo-level operating rules.
2. For brand setup, use `npm run init` or the non-interactive flags documented in `docs/setup.md`.
3. For carousel creation, read `brands/HOOK-SYSTEM.md`, the brand `DESIGN-SYSTEM.md`, and the brand `config.json` before writing slides.
4. Render with `createCarousel()` from `src/carousel.js`.
5. For publishing, follow `docs/postiz.md` and never expose `.env` secrets.

## Useful References

- Agent workflow: `AGENTS.md`
- Setup flow: `docs/setup.md`
- Slide templates and JSON shape: `docs/templates.md`
- Postiz publishing: `docs/postiz.md`

## Guardrails

- Do not redesign templates unless the user explicitly asks.
- Do not require external Claude skills such as frontend-design for normal carousel generation.
- Do not commit `.env`, generated output folders, or real Postiz integration IDs.
- Use 2-3 slides for news, hot takes, launches, and single-stat posts.
- Use 5-7 slides for tutorials, frameworks, prompt lists, and save-worthy guides.

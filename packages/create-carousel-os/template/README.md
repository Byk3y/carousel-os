# Carousel OS

Turn your AI coding agent into a carousel factory.

Carousel OS is a local AI-agent workspace for making branded social carousels. Create a project, open it in Claude Code, Codex, Cursor, Antigravity, or VS Code with an agent, and tell your agent what to post.

No dashboard. No SaaS. No Canva dependency. Just your brand system, reusable HTML templates, local PNG rendering, and optional Postiz publishing.

![Carousel OS demo hook slide](docs/assets/demo-hook.jpg)

## Quickstart

```bash
npm create carousel-os@latest my-content-system
cd my-content-system
npm install
cp .env.example .env
npm run init
```

Then open the folder in your AI coding agent and ask:

```text
Make a carousel for my brand about "5 AI automations every founder should build".
```

GitHub clone still works:

```bash
git clone https://github.com/Byk3y/carousel-os
cd carousel-os
npm install
cp .env.example .env
npm run init
```

If you have a website, paste it during setup. Carousel OS records it as a brand source, and your agent can inspect it to refine the design system. If you do not have a website, init asks for name, handle, topics, tone, carousel types, and visual style.

## What It Does

- Creates reusable brand systems.
- Turns topics into structured carousel slides.
- Renders 1080x1350 PNGs locally with Puppeteer.
- Supports text-only and image-assisted templates.
- Publishes through Postiz when configured.
- Works with Claude Code, Codex, Cursor, Antigravity, and similar coding agents.

## The Workflow

```text
brand system -> slide JSON -> HTML templates -> PNGs -> optional Postiz publishing
```

## Initialization

Interactive:

```bash
npm run init
```

Agent/non-interactive:

```bash
npm run init -- --yes --brand "Acme AI" --handle "@acme" --topics "AI automations" --types "tutorials and launches"
```

This writes:

```text
brands/<brand>/
  DESIGN-SYSTEM.md
  SETUP.md
  brand-sources.md
  config.json
  logo.svg
input/images/<brand>/
```

## Agent Support

Carousel OS ships with repo-local agent instructions:

- `AGENTS.md` for Codex and general coding agents.
- `CLAUDE.md` for Claude Code.
- `.cursor/rules/carousel-os.mdc` for Cursor.
- `.claude/skills/carousel-os/SKILL.md` as an optional Claude Code project skill.

No external skills are required.

## Postiz

Postiz support is built in. Add your API key to `.env`, run:

```bash
npm run postiz:discover
```

Then ask your agent to save the right integration IDs to your brand config.

Read `docs/postiz.md` for details.

## Documentation

- `docs/setup.md`
- `docs/agent-workflows.md`
- `docs/brand-system.md`
- `docs/skills.md`
- `docs/postiz.md`
- `docs/templates.md`
- `docs/troubleshooting.md`

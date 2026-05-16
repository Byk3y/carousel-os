# Skills

Carousel OS works without installing any external skills.

## What Ships In The Repo

- `AGENTS.md` for Codex and general coding agents.
- `CLAUDE.md` for Claude Code.
- `.cursor/rules/carousel-os.mdc` for Cursor.
- `.claude/skills/carousel-os/SKILL.md` as an optional Claude Code project skill.

## Claude Skills

Claude Code discovers project skills from `.claude/skills/<skill-name>/SKILL.md`. The Carousel OS skill is included in generated projects, so Claude Code users do not need to install anything globally.

The skill is an adapter. The engine is still the local project: templates, brand folders, renderer, and Postiz scripts.

## External Skills

Do not require Anthropic's frontend-design skill for normal Carousel OS usage. Carousel OS uses existing templates and brand systems; agents should not redesign the UI unless the user explicitly asks.

# Agent Workflows

Carousel OS is designed to be operated by AI coding agents.

## Universal Prompt

```text
Read AGENTS.md and initialize Carousel OS for my brand.
```

The agent can either ask setup questions and write files directly, or run:

```bash
npm run init
```

For non-interactive setup, agents can pass flags:

```bash
npm run init -- --yes --brand "Acme AI" --handle "@acme" --website "https://example.com" --topics "AI automation" --tone "direct and practical"
```

## Self-Improvement

When an agent makes a repeatable mistake, ask it to improve the workspace:

```text
Review this mistake and update Carousel OS so it is less likely to happen again.
Use the narrowest durable file. Do not store secrets or one-off task details.
```

Agents should follow `docs/self-improvement.md`.

## Claude Code

Open the repo and ask Claude:

```text
Initialize Carousel OS for my brand.
```

Claude should follow `CLAUDE.md`.

## Codex

Open the repo in Codex and ask:

```text
Make a carousel for the demo brand about "3 automation mistakes founders make."
```

Codex should follow `AGENTS.md`.

## Cursor

Open the folder in Cursor. The rule at `.cursor/rules/carousel-os.mdc` tells Cursor to follow `AGENTS.md`.

## Antigravity

Open the folder in Antigravity and point the agent to `AGENTS.md`.

## Project Claude Skill

Generated projects include `.claude/skills/carousel-os/SKILL.md`. Claude Code discovers this project skill automatically when opened from the project folder. It is optional and does not replace `AGENTS.md` or `CLAUDE.md`.

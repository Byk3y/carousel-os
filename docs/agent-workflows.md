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

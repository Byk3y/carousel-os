# Agent Self-Improvement

Carousel OS agents should improve the workspace when a mistake reveals a durable workflow gap.

The goal is not for the agent to rewrite instructions after every run. The goal is to capture repeatable lessons so the next carousel is better.

## When To Capture A Lesson

Capture a lesson when one of these happens:

- The user corrects the agent on a workflow rule.
- The agent uses the wrong brand, image folder, template, slide count, or posting settings.
- A generated carousel has a visual, content, or publishing issue that is likely to repeat.
- A command, setup step, or dependency issue required troubleshooting.
- A brand-specific preference should apply to future posts.

Do not capture one-off preferences, temporary task details, private secrets, or facts that will go stale quickly.

## Where To Store The Lesson

Use the narrowest durable file:

- Brand-specific style, tone, typography, hooks, CTA rules: `brands/<brand>/DESIGN-SYSTEM.md`
- Brand-specific assets and naming conventions: `input/images/<brand>/README.md`
- Global Carousel OS workflow rules: `AGENTS.md` and `CLAUDE.md`
- Template or slide-shape rules: `docs/templates.md`
- Postiz behavior: `docs/postiz.md`
- Setup friction: `docs/setup.md` or `docs/troubleshooting.md`

If the lesson is personal to one user and should not be shared with the repo, suggest a local/user memory file instead of committing it.

## Improvement Loop

After a mistake:

1. Name the mistake plainly.
2. Identify the missing or weak instruction.
3. Propose the smallest durable rule that would prevent it.
4. Ask before changing shared project instructions unless the user already requested the update.
5. Edit the narrowest file.
6. Verify with a relevant command, render, or dry run.
7. Keep the note concise. Avoid dumping session summaries into instruction files.

## Prompt For Agents

```text
Review this mistake and update Carousel OS so it is less likely to happen again.
Use the narrowest durable file. Do not store secrets or one-off task details.
After editing, run the relevant verification command and summarize what changed.
```


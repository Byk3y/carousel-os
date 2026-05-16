# Brand Image Folders

Each brand/account gets its own image folder:

```text
input/images/<brand>/
```

Keep images separated by account so the agent does not mix brand styles or assets.

Recommended naming:

- `hook-<topic>.png` for generated or supplied hook images.
- `cta-<offer>.jpg` for CTA background images.
- `screenshot-<source>.png` for source screenshots or product screenshots.
- `reference-<name>.jpg` for visual references the agent should learn from but not necessarily place directly.

When writing slide JSON, use paths relative to the repo root:

```js
{
  type: 'hook-composite',
  label: 'AI WORKFLOW',
  headline: 'Your AI agent can make **carousels** now.',
  imagePath: './input/images/demo/hook-ai-agents.png'
}
```

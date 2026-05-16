# Templates

Slide templates live in `templates/`.

Common types:

- `hook`
- `hook-composite`
- `content`
- `content-prompt`
- `content-image`
- `screenshot-slide`
- `cta`

Slides are JavaScript objects passed to `createCarousel()`.

```js
{
  type: 'content',
  label: 'STEP 1',
  number: 1,
  headline: 'Create a **brand system** first.',
  body: 'The agent reads your brand system before writing slides.'
}
```

Use `**text**` for the primary highlight color and `__text__` for the secondary highlight color.

## Image Templates

Use repo-relative image paths from `input/images/<brand>/`.

Hook image:

```js
{
  type: 'hook-composite',
  label: 'AI WORKFLOW',
  headline: 'Your AI agent can make **carousels** now.',
  imagePath: './input/images/demo/hook-ai-agents.png'
}
```

CTA image:

```js
{
  type: 'cta',
  headline: 'Build your first carousel.',
  subtitle: 'Use your agent to turn one idea into finished slides.',
  imagePath: './input/images/demo/cta-product-shot.jpg'
}
```

Content image or screenshot:

```js
{
  type: 'content-image',
  label: 'EXAMPLE',
  number: 2,
  headline: 'Show the **proof**.',
  body: 'Use screenshots, receipts, product shots, or diagrams when the image carries the point.',
  imagePath: './input/images/demo/screenshot-dashboard.png'
}
```

If a capable agent such as Codex can generate images, it may create hook or CTA images, save them to `input/images/<brand>/`, then reference them with `imagePath`.

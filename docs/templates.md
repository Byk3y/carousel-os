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

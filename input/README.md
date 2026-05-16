# Input Assets

Put account-specific source assets in `input/images/<brand>/`.

```text
input/images/demo/
  hook-ai-agents.png
  cta-product-shot.jpg
  screenshot-dashboard.png
```

Agents should inspect this folder before creating a carousel for that brand.

Use images by purpose:

- Hook images: strong visual concepts for `hook-composite` slides.
- Content images: screenshots, product shots, receipts, diagrams, or examples for `content-image` and `screenshot-slide`.
- CTA images: product, lead magnet, app, founder, or brand image for `cta` slides.

If no suitable image exists and the agent can generate images, it may create a new hook or CTA image and save it here before rendering.

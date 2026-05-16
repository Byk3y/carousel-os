import { createCarousel } from '../src/carousel.js';

const slides = [
  {
    type: 'hook',
    label: 'TUTORIAL',
    headline: 'Set up a carousel system in **4 steps**.',
    subtitle: 'A simple workflow for turning ideas into posts.'
  },
  {
    type: 'content',
    label: 'STEP 1',
    number: 1,
    headline: 'Create a **brand folder**.',
    body: 'Your brand folder contains the design system, colors, fonts, handle, logo, and optional publishing settings. The agent reads this before writing any slides.'
  },
  {
    type: 'content',
    label: 'STEP 2',
    number: 2,
    headline: 'Write slides as **structured JSON**.',
    body: 'Each slide has a type, label, headline, body, and optional image path. This keeps generation predictable and easy to review before rendering.'
  },
  {
    type: 'content',
    label: 'STEP 3',
    number: 3,
    headline: 'Render PNGs __locally__.',
    body: 'Puppeteer opens the HTML templates at 1080x1350 and saves each slide as a PNG. The final files are ready for Instagram, TikTok photo mode, or manual review.'
  },
  {
    type: 'cta',
    headline: 'Now ask your agent for a topic.',
    subtitle: 'Carousel OS handles the repeatable parts.'
  }
];

const outputDir = await createCarousel(slides, 'demo', 'tutorial-carousel');
console.log(`Carousel saved to: ${outputDir}`);

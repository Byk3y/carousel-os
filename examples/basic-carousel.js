import { createCarousel } from '../src/carousel.js';

const slides = [
  {
    type: 'hook',
    label: 'CAROUSEL OS',
    headline: 'Your AI agent can make **branded carousels** now.',
    subtitle: 'Clone the repo, set up your brand, and tell your agent what to post.'
  },
  {
    type: 'content',
    label: 'THE FLOW',
    number: 1,
    headline: 'The repo gives your agent a **repeatable system**.',
    body: 'Your agent reads the hook system, brand design system, and config file. Then it writes slide content as JSON and renders polished 1080x1350 PNGs with Puppeteer.'
  },
  {
    type: 'content',
    label: 'THE OUTPUT',
    number: 2,
    headline: 'No dashboard. No Canva. Just __local files__.',
    body: 'Generated carousels land in the output folder, organized by brand and date. You can post manually or publish through Postiz when you are ready.'
  },
  {
    type: 'cta',
    headline: 'Build your first carousel.',
    subtitle: 'Open this repo in your AI coding agent and ask it to set up your brand.'
  }
];

const outputDir = await createCarousel(slides, 'demo', 'basic-carousel');
console.log(`Carousel saved to: ${outputDir}`);

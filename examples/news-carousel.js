import { createCarousel } from '../src/carousel.js';

const slides = [
  {
    type: 'hook',
    label: 'AI WORKFLOW',
    headline: 'The old content workflow is **too slow** now.',
    subtitle: 'AI agents changed what one creator can ship in a day.'
  },
  {
    type: 'content',
    label: 'THE SHIFT',
    number: 1,
    headline: 'The bottleneck moved from **design** to judgment.',
    body: 'Templates, rendering, captions, and posting can be automated. The hard part is choosing the right topic, hook, evidence, and angle. Carousel OS gives the agent structure so the human can focus on taste.'
  }
];

const outputDir = await createCarousel(slides, 'demo', 'news-carousel');
console.log(`Carousel saved to: ${outputDir}`);

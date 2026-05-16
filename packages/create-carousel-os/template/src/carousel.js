import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCarousel } from './generate.js';
import { renderSlides } from './render.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_OUTPUT_BASE = path.join(__dirname, '..', 'output');

/**
 * Create a carousel: fill templates + render to PNGs.
 * @param {object[]} slides - array of slide data objects
 * @param {string} brandName - brand folder name (e.g. "demo")
 * @param {string} slug - carousel slug for the folder name (e.g. "claude-code-leaked")
 * @param {string} [outputBase] - override output base directory
 * @returns {string} path to the output directory containing PNGs
 */
export async function createCarousel(slides, brandName, slug, outputBase) {
  const base = outputBase || DEFAULT_OUTPUT_BASE;
  const date = new Date().toISOString().split('T')[0];
  const outputDir = path.join(base, brandName, `${date}-${slug}`);

  const htmlSlides = buildCarousel(slides, brandName);
  const renderData = htmlSlides.map(html => ({ html }));

  await renderSlides(renderData, outputDir, slug);

  return outputDir;
}

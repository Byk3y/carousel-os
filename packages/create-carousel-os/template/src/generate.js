import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const BRANDS_DIR = path.join(__dirname, '..', 'brands');

/**
 * Convert a local file to a base64 data URI.
 */
function toDataUri(filePath) {
  const data = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const mime = ext === 'jpg' ? 'image/jpeg' : ext === 'png' ? 'image/png' : ext === 'svg' ? 'image/svg+xml' : `image/${ext}`;
  return `data:${mime};base64,${data.toString('base64')}`;
}

/**
 * Parse highlight markers in text:
 *   **text** → <span class="highlight">text</span>     (primary accent — usually orange)
 *   __text__ → <span class="highlight-2">text</span>   (secondary accent — usually cyan)
 * Use both colors on the same hook headline to get the multi-color
 * keyword-highlight pattern from viral 2-3 slide carousels.
 */
function parseHighlights(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<span class="highlight">$1</span>')
    .replace(/__(.+?)__/g, '<span class="highlight-2">$1</span>');
}

/**
 * Fill template placeholders like {{key}} with values from a flat object.
 */
function fillTemplate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return vars[key] !== undefined ? vars[key] : match;
  });
}

/**
 * Build a complete HTML string for a single slide.
 */
export function buildSlideHtml(slide, brand) {
  const templateFile = path.join(TEMPLATES_DIR, `${slide.type}.html`);
  let template = fs.readFileSync(templateFile, 'utf-8');

  // Read logo — supports SVG (inline) or PNG/JPG (as img tag with base64)
  let logoSvg = '';
  const svgPath = path.join(BRANDS_DIR, brand.name, 'logo.svg');
  const pngPath = path.join(BRANDS_DIR, brand.name, 'logo.png');
  if (fs.existsSync(pngPath)) {
    const radius = brand.layout.logoRadius;
    const height = brand.layout.logoHeight || 80;
    const radiusStyle = radius ? `border-radius:${radius};` : '';
    logoSvg = `<img src="${toDataUri(pngPath)}" style="height:${height}px;width:auto;${radiusStyle}">`;
  } else if (fs.existsSync(svgPath)) {
    logoSvg = fs.readFileSync(svgPath, 'utf-8');
  }

  const vars = {
    // Brand colors
    hookBackground: brand.colors.hookBackground,
    contentBackground: brand.colors.contentBackground,
    ctaBackground: brand.colors.ctaBackground,
    textPrimary: brand.colors.textPrimary,
    textSecondary: brand.colors.textSecondary,
    accent: brand.colors.accent,
    hookHighlight: brand.colors.hookHighlight || brand.colors.accent,
    ctaText: brand.colors.ctaText || brand.colors.textPrimary,
    // Brand fonts
    fontHeadline: brand.fonts.headline,
    fontCta: brand.fonts.cta || brand.fonts.headline,
    fontBody: brand.fonts.body,
    fontSmall: brand.fonts.small,
    // Brand layout
    padding: String(brand.layout.padding),
    cornerRadius: String(brand.layout.cornerRadius),
    // Brand identity
    handle: brand.handle,
    logoSvg: logoSvg,
    // Slide content
    label: slide.label || '',
    headline: slide.headline ? parseHighlights(slide.headline) : '',
    subtitle: slide.subtitle ? parseHighlights(slide.subtitle) : '',
    body: slide.body ? parseHighlights(slide.body) : '',
    number: slide.number !== undefined ? String(slide.number) : '',
    // Image (embedded as base64 data URI for reliable Puppeteer rendering)
    imagePath: slide.imagePath ? toDataUri(path.resolve(slide.imagePath)) : '',
    // CTA template: conditionally show image or solid background
    ctaImageTag: slide.imagePath ? `<img class="bg-image" src="${toDataUri(path.resolve(slide.imagePath))}">` : '',
    ctaOverlayClass: slide.imagePath ? 'has-image' : 'no-image',
    // Code block (optional terminal snippet)
    codeBlock: slide.code ? `<div class="code-block"><div class="code-dots"><span class="red"></span><span class="yellow"></span><span class="green"></span></div><div class="code-text">${slide.code}</div></div>` : '',
    // Composite hook: optional circle inset image (upper-right corner)
    insetImagePath: slide.insetImagePath ? toDataUri(path.resolve(slide.insetImagePath)) : '',
    insetTag: slide.insetImagePath ? `<div class="inset-circle"><img src="${toDataUri(path.resolve(slide.insetImagePath))}"></div>` : '',
    // Composite hook: category badge color (defaults to brand accent)
    badgeColor: slide.badgeColor || brand.colors.accent,
    // Highlight-2 color (secondary accent for multi-color headlines, defaults to cyan)
    highlight2: brand.colors.highlight2 || '#3DDFD0',
    // Tier card color (for tier-card template, one color per tier)
    tierColor: slide.tierColor || brand.colors.accent,
    // Prompt slide: structured prompt sections
    title: slide.title || '',
    promptNumber: slide.promptNumber || '',
    totalSlides: slide.totalSlides || '',
    role: slide.role || '',
    task: slide.task || '',
    steps: Array.isArray(slide.steps)
      ? slide.steps.map((s, i) => `<div class="step-item"><span class="step-num">${i + 1}.</span><span class="step-text">${s}</span></div>`).join('')
      : '',
    rules: Array.isArray(slide.rules)
      ? slide.rules.map(r => `<div class="rule-item"><span class="rule-bullet">–</span><span class="rule-text">${r}</span></div>`).join('')
      : ''
  };

  return fillTemplate(template, vars);
}

/**
 * Load a brand config from the brands directory.
 */
export function loadBrand(brandName) {
  const configPath = path.join(BRANDS_DIR, brandName, 'config.json');
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

/**
 * Build HTML for all slides in a carousel.
 */
export function buildCarousel(slides, brandName) {
  const brand = loadBrand(brandName);
  return slides.map(slide => buildSlideHtml(slide, brand));
}

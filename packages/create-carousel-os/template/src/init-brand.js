import fs from 'node:fs';
import path from 'node:path';

export function slugifyBrandName(name) {
  const slug = String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'brand';
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function defaultLogoSvg(displayName) {
  const initials = String(displayName || 'Brand')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase() || '')
    .join('') || 'B';

  return `<svg width="220" height="64" viewBox="0 0 220 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="14" fill="#1A1A1A"/>
  <text x="32" y="40" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="800" fill="#F5F0EB">${initials}</text>
  <text x="78" y="40" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="800" fill="#1A1A1A">${escapeXml(displayName || 'Brand')}</text>
</svg>
`;
}

function designSystemMarkdown(input) {
  const websiteLine = input.website ? `Website source: ${input.website}\n\n` : '';

  return `# ${input.brandName} Design System

${websiteLine}## Brand

${input.brandName} creates content about ${input.topics || 'its niche'}.

## Audience

People who care about ${input.topics || 'this topic'} and want useful, practical posts.

## Voice

${input.tone || 'Clear, direct, useful, and specific.'}

## Carousel Defaults

- Primary content types: ${input.carouselTypes || 'mixed'}
- Visual style: ${input.visualStyle || 'mixed'}
- Use 2-3 slides for news, hot takes, launches, and single-stat posts.
- Use 5-7 slides for tutorials, frameworks, prompt lists, and save-worthy guides.
- Highlight important words with \`**primary highlight**\` and secondary words with \`__secondary highlight__\`.

## Content Rules

- Start with a hook that creates curiosity or urgency.
- Make every slide useful on its own.
- Prefer concrete examples, numbers, names, and dates.
- Avoid generic motivational filler.
- End with a clear CTA when the format needs one.
`;
}

function setupMarkdown(input, brandSlug) {
  return `# ${input.brandName} Setup

Brand folder: \`brands/${brandSlug}/\`

## Next Prompts

\`\`\`text
Make a carousel for ${input.brandName} about "<topic>".
\`\`\`

\`\`\`text
Turn this URL into a carousel for ${input.brandName}: <url>
\`\`\`

## Postiz

To publish through Postiz:

1. Add \`POSTIZ_API_KEY\` to \`.env\`.
2. Run \`npm run postiz:discover\`.
3. Save the selected integration IDs in \`brands/${brandSlug}/config.json\`.
`;
}

function brandSourcesMarkdown(input) {
  const website = input.website || 'No website provided.';

  return `# Brand Sources

- Website: ${website}
- Topics: ${input.topics || ''}
- Tone: ${input.tone || ''}
- Carousel types: ${input.carouselTypes || ''}
- Visual style: ${input.visualStyle || ''}
`;
}

function imageFolderReadme(input, brandSlug) {
  return `# ${input.brandName} Images

Use this folder for assets that belong to this account only.

Recommended files:

- \`hook-<topic>.png\` - generated or supplied hook images for \`hook-composite\` slides.
- \`cta-<offer>.jpg\` - CTA background images for \`cta\` slides.
- \`screenshot-<source>.png\` - source screenshots or product screenshots.
- \`reference-<name>.jpg\` - visual references for the agent.

Use repo-relative paths in slide JSON:

\`\`\`js
{
  type: 'hook-composite',
  label: 'HOOK',
  headline: 'A strong **carousel hook** goes here.',
  imagePath: './input/images/${brandSlug}/hook-example.png'
}
\`\`\`
`;
}

function config(input, brandSlug) {
  return {
    name: brandSlug,
    handle: input.handle || '@yourhandle',
    colors: {
      hookBackground: '#E8652B',
      contentBackground: '#F5F0EB',
      ctaBackground: '#E8652B',
      textPrimary: '#1A1A1A',
      textSecondary: '#5D5D5D',
      accent: '#E8652B',
      highlight2: '#3DDFD0',
      hookHighlight: '#F5F0EB',
      ctaText: '#1A1A1A'
    },
    fonts: {
      headline: 'Anton',
      cta: 'Playfair Display',
      body: 'Inter',
      small: 'JetBrains Mono'
    },
    layout: {
      width: 1080,
      height: 1350,
      padding: 80,
      cornerRadius: 24
    },
    postiz: {
      instagram: '',
      tiktok: ''
    }
  };
}

export function buildBrandFiles(input) {
  const brandSlug = slugifyBrandName(input.brandName);

  return {
    brandSlug,
    files: {
      'DESIGN-SYSTEM.md': designSystemMarkdown(input),
      'SETUP.md': setupMarkdown(input, brandSlug),
      'brand-sources.md': brandSourcesMarkdown(input),
      'config.json': config(input, brandSlug),
      'logo.svg': defaultLogoSvg(input.brandName)
    }
  };
}

export function writeBrandFiles(brandFiles, { rootDir = process.cwd(), overwrite = false } = {}) {
  const brandDir = path.join(rootDir, 'brands', brandFiles.brandSlug);
  const imageDir = path.join(rootDir, 'input', 'images', brandFiles.brandSlug);

  if (fs.existsSync(brandDir) && !overwrite) {
    throw new Error(`Brand folder already exists: ${brandDir}`);
  }

  fs.mkdirSync(brandDir, { recursive: true });
  fs.mkdirSync(imageDir, { recursive: true });
  fs.writeFileSync(path.join(imageDir, '.gitkeep'), '');
  fs.writeFileSync(path.join(imageDir, 'README.md'), imageFolderReadme({
    brandName: brandFiles.files['config.json'].name
  }, brandFiles.brandSlug));

  for (const [fileName, content] of Object.entries(brandFiles.files)) {
    const filePath = path.join(brandDir, fileName);
    const body = typeof content === 'string' ? content : `${JSON.stringify(content, null, 2)}\n`;
    fs.writeFileSync(filePath, body);
  }

  return { brandDir };
}

import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { buildBrandFiles, writeBrandFiles } from './init-brand.js';

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function valueFor(flag) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? '' : process.argv[index + 1] || '';
}

function printHelp() {
  console.log(`Carousel OS init

Usage:
  npm run init
  npm run init -- --yes --brand "Acme AI" --handle "@acme" --topics "AI automations"

Options:
  --yes              Use non-interactive defaults where values are missing
  --brand <name>     Brand or account name
  --handle <handle>  Social handle shown on slides
  --website <url>    Optional website source for agent brand extraction
  --topics <text>    Topics this brand creates content about
  --tone <text>      Voice and tone
  --types <text>     Carousel types, such as tutorials or launches
  --visual <text>    text-only, image-heavy, or mixed
  --overwrite        Replace an existing brand folder
`);
}

async function ask(rl, question, fallback = '') {
  const suffix = fallback ? ` (${fallback})` : '';
  const answer = (await rl.question(`${question}${suffix}: `)).trim();
  return answer || fallback;
}

async function collectAnswers() {
  if (hasFlag('--help') || hasFlag('-h')) {
    printHelp();
    process.exit(0);
  }

  const nonInteractive = hasFlag('--yes');
  const seed = {
    brandName: valueFor('--brand'),
    handle: valueFor('--handle'),
    website: valueFor('--website'),
    topics: valueFor('--topics'),
    tone: valueFor('--tone'),
    carouselTypes: valueFor('--types'),
    visualStyle: valueFor('--visual')
  };

  if (nonInteractive) {
    return {
      brandName: seed.brandName || 'My Brand',
      handle: seed.handle || '@yourhandle',
      website: seed.website,
      topics: seed.topics || 'your niche',
      tone: seed.tone || 'clear, useful, and specific',
      carouselTypes: seed.carouselTypes || 'mixed',
      visualStyle: seed.visualStyle || 'mixed'
    };
  }

  const rl = createInterface({ input, output });
  try {
    console.log('\nCarousel OS brand setup\n');
    console.log('This creates local brand files. If you have a website, paste it so your agent can use it as a source.\n');

    return {
      brandName: await ask(rl, 'Brand or account name', seed.brandName || 'My Brand'),
      handle: await ask(rl, 'Social handle to show on slides', seed.handle || '@yourhandle'),
      website: await ask(rl, 'Website URL, optional', seed.website),
      topics: await ask(rl, 'What topics will this brand make carousels about', seed.topics || 'your niche'),
      tone: await ask(rl, 'Tone of voice', seed.tone || 'clear, useful, and specific'),
      carouselTypes: await ask(rl, 'Main carousel types', seed.carouselTypes || 'mixed'),
      visualStyle: await ask(rl, 'Visual style: text-only, image-heavy, or mixed', seed.visualStyle || 'mixed')
    };
  } finally {
    rl.close();
  }
}

const answers = await collectAnswers();
const brandFiles = buildBrandFiles(answers);
const result = writeBrandFiles(brandFiles, { overwrite: hasFlag('--overwrite') });

console.log(`\nBrand initialized: ${brandFiles.brandSlug}`);
console.log(`Files written to: ${result.brandDir}`);
console.log('\nNext steps:');
console.log(`1. Ask your agent: "Make a carousel for ${answers.brandName} about <topic>."`);
console.log('2. If you use Postiz, add POSTIZ_API_KEY to .env and run npm run postiz:discover.');
console.log('3. Put brand images in input/images/' + brandFiles.brandSlug + '/ when needed.\n');

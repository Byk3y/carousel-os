import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from './env.js';
import {
  buildInstagramPayload,
  buildTikTokPhotoPayload,
  createPostizClient
} from './postiz-client.js';

loadEnv();

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? '' : process.argv[index + 1] || '';
}

function positionalArgs() {
  return process.argv.slice(2).filter(arg => !arg.startsWith('--'));
}

const [brandArg, platformArg] = positionalArgs();
const brandName = brandArg || process.env.DEFAULT_BRAND || 'demo';
const platform = platformArg || 'instagram';
const outputBase = process.env.DEFAULT_OUTPUT_DIR || 'output';
const caption = argValue('--caption') || process.env.POST_CAPTION || 'Generated with Carousel OS.';
const title = argValue('--title') || process.env.POST_TITLE || '';

const brandConfigPath = path.resolve('brands', brandName, 'config.json');
const brand = JSON.parse(fs.readFileSync(brandConfigPath, 'utf8'));
const integrationId = brand.postiz?.[platform];

if (!integrationId) {
  throw new Error(`Missing Postiz integration id for "${platform}" in ${brandConfigPath}`);
}

const brandOutputDir = path.resolve(outputBase, brandName);
if (!fs.existsSync(brandOutputDir)) {
  throw new Error(`No output folder found for brand "${brandName}". Render a carousel first.`);
}

const latestFolder = fs.readdirSync(brandOutputDir)
  .map(name => path.join(brandOutputDir, name))
  .filter(filePath => fs.statSync(filePath).isDirectory())
  .sort()
  .at(-1);

if (!latestFolder) {
  throw new Error(`No rendered carousel folders found in ${brandOutputDir}`);
}

const imageFiles = fs.readdirSync(latestFolder)
  .filter(name => name.endsWith('.png'))
  .sort()
  .map(name => path.join(latestFolder, name));

if (imageFiles.length === 0) {
  throw new Error(`No PNG files found in ${latestFolder}`);
}

const client = createPostizClient({
  apiKey: process.env.POSTIZ_API_KEY,
  baseUrl: process.env.POSTIZ_BASE_URL || 'https://api.postiz.com/public/v1'
});

console.log(`Uploading ${imageFiles.length} slides from ${latestFolder}`);
const uploads = [];
for (const file of imageFiles) {
  const upload = await client.uploadFile(file);
  uploads.push({ id: upload.id, path: upload.path });
  console.log(`Uploaded ${path.basename(file)}`);
}

let payload;
if (platform === 'instagram') {
  payload = buildInstagramPayload({ integrationId, caption, uploads });
} else if (platform === 'tiktok') {
  payload = buildTikTokPhotoPayload({ integrationId, title, caption, uploads });
} else {
  throw new Error(`Unsupported platform "${platform}". Supported: instagram, tiktok.`);
}

const result = await client.createPost(payload);
console.log(JSON.stringify(result, null, 2));

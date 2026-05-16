import { loadEnv } from './env.js';
import { createPostizClient } from './postiz-client.js';

loadEnv();

const apiKey = process.env.POSTIZ_API_KEY;
const baseUrl = process.env.POSTIZ_BASE_URL || 'https://api.postiz.com/public/v1';

const client = createPostizClient({ apiKey, baseUrl });
const integrations = await client.listIntegrations();

if (!Array.isArray(integrations) || integrations.length === 0) {
  console.log('No Postiz integrations found. Connect social channels in Postiz first.');
  process.exit(0);
}

console.log('\nConnected Postiz channels:\n');
console.log('Platform'.padEnd(20) + 'Profile'.padEnd(26) + 'Integration ID');
console.log('-'.repeat(80));

for (const integration of integrations) {
  const platform = integration.identifier || 'unknown';
  const profile = integration.profile || integration.name || 'unknown';
  console.log(platform.padEnd(20) + profile.padEnd(26) + integration.id);
}

console.log('\nCopy the IDs you want into brands/<brand>/config.json under the "postiz" key.');
console.log('In Postiz, these are called channels. In the API, they are called integrations.\n');

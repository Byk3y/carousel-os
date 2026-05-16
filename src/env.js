import fs from 'node:fs';
import path from 'node:path';

export function loadEnv(filePath = '.env') {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) return {};

  const parsed = {};
  const lines = fs.readFileSync(abs, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    parsed[key] = value;
    if (process.env[key] === undefined) process.env[key] = value;
  }

  return parsed;
}

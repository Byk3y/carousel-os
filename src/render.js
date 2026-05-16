import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

function findChromeExecutable() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;

  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium'
  ];

  return candidates.find(candidate => fs.existsSync(candidate));
}

/**
 * Render an array of slide objects to PNG files.
 * @param {Array<{html: string}>} slides
 * @param {string} outputDir - directory to save PNGs
 * @param {string} [slug] - shared name for all slides in the carousel
 */
export async function renderSlides(slides, outputDir, slug) {
  fs.mkdirSync(outputDir, { recursive: true });

  const executablePath = findChromeExecutable();
  const browser = await puppeteer.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
    args: ['--allow-file-access-from-files']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const html = typeof slide === 'string' ? slide : slide.html;

    await page.setContent(html, { waitUntil: 'load' });
    // Wait for fonts and images to load
    await page.evaluate(() => Promise.all([
      document.fonts.ready,
      ...Array.from(document.images).map(img =>
        img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })
      )
    ]));
    // Re-run body scripts so auto-sizing works when reusing the same page.
    await page.evaluate(() => {
      const scripts = Array.from(document.body.querySelectorAll('script'));
      for (const s of scripts) {
        try { new Function(s.textContent)(); } catch (e) { /* ignore */ }
      }
    });

    const num = String(i + 1).padStart(2, '0');
    const filename = slug ? `${num}-${slug}.png` : `${num}-slide.png`;

    await page.screenshot({
      path: path.join(outputDir, filename),
      type: 'png',
      clip: { x: 0, y: 0, width: 1080, height: 1350 }
    });
  }

  await browser.close();
}

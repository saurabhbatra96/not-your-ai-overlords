/* Measures hero text contrast against the actual photograph beneath it.
   The house style requires this to be measured, not assumed: rust on the
   portrait once came in at 1.08:1 and looked fine in a screenshot.

   Usage:  CHROME_PATH=... node contrast-check.js [url]        */
const {chromium} = require('playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');

const URL = process.argv[2] || 'file:///work/site/index.html';
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'contrast-'));

const srgb = v => (v / 255 <= 0.03928 ? (v / 255) / 12.92 : Math.pow(((v / 255) + 0.055) / 1.055, 2.4));
const lum = c => 0.2126 * srgb(c[0]) + 0.7152 * srgb(c[1]) + 0.0722 * srgb(c[2]);
const ratio = (fg, bg) => {
    const hi = Math.max(lum(fg), lum(bg)), lo = Math.min(lum(fg), lum(bg));
    return (hi + 0.05) / (lo + 0.05);
};
const hex = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16));

(async () => {
    const browser = await chromium.launch({
        args: ['--no-sandbox'],
        ...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {}),
    });
    let failed = false;

    for (const width of [1280, 390]) {
        const page = await browser.newPage({viewport: {width, height: 900}});
        await page.goto(URL, {waitUntil: 'networkidle'});
        await page.waitForTimeout(400);

        // Measure the text boxes, then hide the text so only the photo remains.
        const targets = await page.evaluate(() => {
            const box = el => {
                const r = el.getBoundingClientRect();
                return {x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height)};
            };
            const found = [];
            const kicker = document.querySelector('.hero .kicker');
            const line = document.querySelector('.hero__line');
            // 4.5:1 for small text, 3:1 for large display type.
            if (kicker) found.push({name: 'kicker', ...box(kicker), fg: getComputedStyle(kicker).color, need: 4.5});
            if (line) found.push({name: 'headline', ...box(line), fg: getComputedStyle(line).color, need: 3.0});
            const inner = document.querySelector('.hero__inner');
            if (inner) inner.style.visibility = 'hidden';
            return found;
        });

        const shot = path.join(TMP, `hero-${width}.png`);
        await page.screenshot({path: shot});
        await page.close();

        const {execFileSync} = require('child_process');
        for (const t of targets) {
            // Worst case for light type is the brightest pixel behind it. Ask
            // ImageMagick for the maximum luma rather than dumping every pixel.
            const maxima = execFileSync('convert', [shot,
                '-crop', `${t.w}x${t.h}+${t.x}+${t.y}`, '+repage',
                '-colorspace', 'Rec709Luma', '-format', '%[fx:maxima]', 'info:'], {encoding: 'utf8'}).trim();
            const v = parseFloat(maxima) * 255;
            const bgLum = srgb(v);
            const fg = (t.fg.match(/\d+/g) || [236, 227, 214]).slice(0, 3).map(Number);
            const fgLum = lum(fg);
            const hi = Math.max(fgLum, bgLum), lo = Math.min(fgLum, bgLum);
            const r = (hi + 0.05) / (lo + 0.05);
            const ok = r >= t.need;
            if (!ok) failed = true;
            console.log(`${String(width).padEnd(5)} ${t.name.padEnd(9)} ${r.toFixed(2)}:1  (needs ${t.need})  ${ok ? 'PASS' : 'FAIL'}`);
        }
    }

    await browser.close();
    fs.rmSync(TMP, {recursive: true, force: true});
    process.exit(failed ? 1 : 0);
})();

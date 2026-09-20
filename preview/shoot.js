const {chromium} = require('playwright');
const path = process.argv[2], out = process.argv[3];
const widths = [[1200, 'desktop'], [810, 'tablet'], [390, 'phone']];
(async () => {
    const browser = await chromium.launch(Object.assign({args: ['--no-sandbox']},
        process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {}));
    for (const [w, name] of widths) {
        const page = await browser.newPage({viewport: {width: w, height: 900}, deviceScaleFactor: 1});
        await page.goto('file://' + path, {waitUntil: 'networkidle'}).catch(() => {});
        await page.waitForTimeout(600);
        await page.screenshot({path: `${out}-${name}.png`, fullPage: true});
        await page.close();
    }
    await browser.close();
    console.log('shot');
})();

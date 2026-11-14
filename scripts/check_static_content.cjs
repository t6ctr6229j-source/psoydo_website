/* Content must remain readable without executing application JavaScript.
   Run against local QA only, never submits forms or sends production events. */
const { chromium } = require('playwright');
const { readdirSync } = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
  const base = process.env.BASE_URL || 'http://127.0.0.1:8080';
  const browser = await chromium.launch({ executablePath: process.env.CHROME, args: ['--no-sandbox'] });
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } });
      await context.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
      const page = await context.newPage();
      for (const file of readdirSync('de').filter(name => name.endsWith('.html'))) {
        const response = await page.goto(`${base}/de/${file}`);
        assert.equal(response.status(), 200, file);
        const h1 = page.locator('main h1');
        assert.equal(await h1.count(), 1, file);
        assert(await h1.isVisible(), `${file}: heading requires JavaScript`);
        const content = await page.locator('main').innerText();
        assert(content.length > 500, `${file}: main content absent without JavaScript`);
        for (const heading of await page.locator('main h2').all()) {
          assert(await heading.isVisible(), `${file}: section heading hidden without JavaScript: ${await heading.textContent()}`);
        }
        const navigation = page.locator('footer a[href]').filter({ hasText: /Produkt|Technologie|Architektur|Use Cases|Sicherheit|Preise|Insights/ });
        assert(await navigation.count() >= 4, `${file}: navigation absent`);
        for (const link of await navigation.all()) {
          assert(await link.isVisible(), `${file}: navigation link hidden: ${await link.textContent()}`);
        }
        assert(await page.locator('footer a[href^="mailto:"]').isVisible(), `${file}: contact unavailable`);
        if (file === 'index.html') {
          assert(await page.getByRole('link', {name:'Zur KI-Datenfreigabe-Checkliste'}).isVisible());
          assert(!(await page.locator('[data-ai-quiz]').isVisible()));
          assert(await page.locator('#pilot-email').isVisible());
        }
      }
      console.log(`PASS: ${width}px, all 22 pages have readable static headings, content, navigation and contact.`);
      await context.close();
    }
    const context = await browser.newContext();
    await context.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
    const page = await context.newPage();
    await page.goto(`${base}/de/index.html`);
    assert(await page.locator('[data-ai-quiz]').isVisible(), 'interactive quiz regressed');
    await page.locator('[data-ai-answer="allow"]').click();
    assert(await page.locator('[data-ai-quiz-feedback]').isVisible(), 'quiz answer feedback missing');
    assert.equal(await page.getByRole('link', {name:'Zur KI-Datenfreigabe-Checkliste'}).count(), 0);
    console.log('PASS: JavaScript-enabled quiz still works; static fallback only appears without scripting.');
    await context.close();
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });

import assert from 'node:assert/strict';
import {readdirSync} from 'node:fs';
export async function checkContactDock(browser, base) {
  for (const width of [390,1440]) {
    const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const external=[];
    await context.route('**/*',route=>{
      if(new URL(route.request().url()).origin!==new URL(base).origin){external.push(route.request().url());return route.abort();}
      return route.continue();
    });
    const page=await context.newPage();
    await page.goto(base+'/de/');
    const dock=page.locator('.contact-dock');
    assert(!(await dock.isVisible()),'dock must not cover consent');
    await page.locator('#consent-decline').click();
    await page.waitForFunction(()=>getComputedStyle(document.querySelector('.contact-dock')).display!=='none');
    for(const file of readdirSync('de').filter(x=>x.endsWith('.html'))) {
      await page.goto(base+'/de/'+file);
      assert.equal(await dock.count(),1,file);
      assert(await dock.isVisible(),file+' contact missing');
      const links=dock.locator('a');
      assert.equal(await links.nth(0).getAttribute('href'),'tel:+4973140321375');
      assert.equal(await links.nth(1).getAttribute('href'),'mailto:info@wescaleit.com');
      for(const link of await links.all()) {
        assert(await link.getAttribute('aria-label'));
        const b=await link.boundingBox();
        assert(b.width>=44&&b.height>=44&&b.x>=0&&b.x+b.width<=width&&b.y+b.height<=900,file+' geometry');
      }
    }
    await page.goto(base+'/de/produkt');
    await dock.locator('a').first().focus();
    await page.keyboard.press('Tab');
    assert(await dock.locator('a').nth(1).evaluate(el=>el===document.activeElement));
    assert(await dock.locator('a').nth(1).evaluate(el=>getComputedStyle(el).outlineStyle!=='none'));
    await page.screenshot({path:`/tmp/psoydo-browser-qa/contact-dock-${width}.png`});
    await page.locator('#consent-reopen').click();
    assert(!(await dock.isVisible()),'reopened consent');
    await page.locator('#consent-decline').click();
    await page.goto(base+'/de/');
    await page.locator('#register').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>document.body.classList.contains('contact-form-visible'));
    assert(!(await dock.isVisible()),'form must remain unobstructed');
    await page.screenshot({path:`/tmp/psoydo-browser-qa/contact-form-clear-${width}.png`});
    await page.evaluate(()=>scrollTo(0,0));
    await page.waitForFunction(()=>!document.body.classList.contains('contact-form-visible'));
    if(width===390){
      await page.locator('.menu-toggle').click();assert(!(await dock.isVisible()),'menu overlap');
      await page.keyboard.press('Escape');assert(await dock.isVisible());
    }
    await page.goto(base+'/missing-contact-test');assert(await dock.isVisible(),'404 contact missing');
    assert.equal(external.length,0,'contact actions must not load external resources');
    await context.close();
    const nojs=await browser.newContext({viewport:{width,height:900},javaScriptEnabled:false});
    const plain=await nojs.newPage();await plain.goto(base+'/de/produkt');
    assert(await plain.locator('.contact-dock').isVisible(),'no-JS contact missing');await nojs.close();
    console.log(`Contact dock passed: ${width}px, all German pages, 404, no-JS, keyboard, consent/menu/form clearance, no external requests.`);
  }
}

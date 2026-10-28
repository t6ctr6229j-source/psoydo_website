import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);

// The pilot contact must work without JavaScript and never load the retired form service.
export async function checkRegistration(browser) {
  for (const width of [390,1440]) {
    for (const javaScriptEnabled of [false,true]) {
      const context=await browser.newContext({viewport:{width,height:900},javaScriptEnabled});
      const external=[];
      await context.route('**/*',async route=>{
        const url=new URL(route.request().url());
        if(url.hostname!=='psoydo.com') { external.push(url.hostname); return route.abort(); }
        const path=url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname;
        return route.fulfill({path:fileURLToPath(new URL(path.slice(1),root))});
      });
      const page=await context.newPage();
      await page.goto('https://psoydo.com/de/');
      if(javaScriptEnabled)await page.locator('#consent-decline').click();
      const contact=page.locator('#pilot-email');
      await contact.scrollIntoViewIfNeeded();
      assert.equal(await contact.isVisible(),true);
      assert.equal(await contact.getAttribute('href'),'mailto:info@wescaleit.com?subject=Psoydo%20Pilotanfrage');
      assert.equal(await page.locator('#pilot-contact iframe').count(),0);
      assert.equal(await page.locator('#pilot-tally-open').count(),1);
      assert.equal(await page.locator('.psoydo-tally-stage').getAttribute('data-tally-state'),'draft');
      assert.equal(await page.locator('#pilot-tally-open').isHidden(),true);
      assert.equal(await page.locator('#pilot-tally-email-cta').isVisible(),true);
      assert.equal(await page.locator('#pilot-tally-email-cta').getAttribute('href'),
        'mailto:info@wescaleit.com?subject=Psoydo%20Pilotanfrage');
      // The draft preview must never display a clipped primary CTA.
      const bounds=await page.locator('#pilot-tally-email-cta').boundingBox();
      const cardBounds=await page.locator('.form-card').boundingBox();
      assert.ok(bounds&&cardBounds&&bounds.y>=cardBounds.y&&bounds.y+bounds.height<=cardBounds.y+cardBounds.height+1,
        'Pilot CTA must be completely inside the visible card');
      assert.equal(await page.locator('#pilot-tally-frame iframe').count(),0);
      assert.equal(await page.locator('#pilot-tally-frame').isHidden(),true);
      assert.equal(await page.locator('script[src*="typeform"]').count(),0);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
      assert.deepEqual(external,[],'Pilot contact must not request external forms or measurement after denial');
      // The iframe and Tally widget must never be requested before click.
      if(javaScriptEnabled){
        // Clicking a draft cannot create a public 404 iframe.
        await page.locator('#pilot-tally-open').evaluate(button=>button.click());
        assert.equal(await page.locator('#pilot-tally-frame iframe').count(),0);
        assert.equal(await page.locator('#psoydo-tally-widget').count(),0);
        // Simulate the post-approval state to retain coverage of the future Tally integration.
        await page.evaluate(()=>{
          document.querySelector('.psoydo-tally-stage').dataset.tallyState='published';
          document.querySelector('#pilot-tally-open').hidden=false;
        });
        await page.locator('#pilot-tally-open').click();
        await page.locator('#pilot-tally-frame iframe').waitFor({state:'attached'});
        assert.equal(await page.locator('#pilot-tally-frame').isVisible(),true);
        assert.equal(await page.locator('#pilot-tally-open').getAttribute('aria-expanded'),'true');
        assert.equal(await page.locator('#pilot-tally-frame iframe').getAttribute('data-tally-src'),
          'https://tally.so/embed/KppMYg?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1');
        assert.equal(await page.locator('#psoydo-tally-widget').count(),1);
        // Spoofed / wrong-origin messages must not count as submissions.
        const events=await page.evaluate(()=>{
          const captured=[];
          window.__psoydoTrack=(name)=>captured.push(name);
          const iframe=document.querySelector('#pilot-tally-frame iframe');
          const payload=JSON.stringify({event:'Tally.FormSubmitted',
            payload:{formId:'KppMYg',id:'qa-only-01',fields:[{title:'Email',answer:{value:'private@example.com'}}]}});
          window.dispatchEvent(new MessageEvent('message',{origin:'https://evil.example',
            source:iframe.contentWindow,data:payload}));
          window.dispatchEvent(new MessageEvent('message',{origin:'https://tally.so',
            source:iframe.contentWindow,data:JSON.stringify({event:'Tally.FormSubmitted',payload:{formId:'other-form',id:'qa-only-02'}})}));
          window.dispatchEvent(new MessageEvent('message',{origin:'https://tally.so',
            source:iframe.contentWindow,data:payload}));
          window.dispatchEvent(new MessageEvent('message',{origin:'https://tally.so',
            source:iframe.contentWindow,data:payload}));
          return captured;
        });
        assert.deepEqual(events,['psoydo_pilot_form_submitted'],
          'Only a genuine-looking first submit for the correct iframe/form is tracked, without answers');
        await page.screenshot({path:`/tmp/psoydo-browser-qa/pilot-tally-${width}.png`});
        await page.locator('#pilot-tally-close').click();
        assert.equal(await page.locator('#pilot-tally-frame iframe').count(),0);
        assert.equal(await page.locator('#pilot-tally-open').getAttribute('aria-expanded'),'false');
      }
      await page.screenshot({path:`/tmp/psoydo-browser-qa/pilot-email-${width}-${javaScriptEnabled}.png`});
      await context.close();
    }
    console.log('Pilot email contact passed:',width);
  }
}

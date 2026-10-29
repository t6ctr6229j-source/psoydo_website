import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);

// The published pilot form is loaded only after a click; no-JS visitors retain email contact.
export async function checkRegistration(browser) {
  for(const width of [390,1440]){
    for(const javaScriptEnabled of [false,true]){
      const context=await browser.newContext({viewport:{width,height:900},javaScriptEnabled});
      const external=[];
      await context.route('**/*',async route=>{
        const url=new URL(route.request().url());
        if(url.hostname!=='psoydo.com'){external.push(url.hostname);return route.abort();}
        const path=url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname;
        return route.fulfill({path:fileURLToPath(new URL(path.slice(1),root))});
      });
      const page=await context.newPage();
      await page.goto('https://psoydo.com/de/');
      if(javaScriptEnabled)await page.locator('#consent-decline').click();
      const fallback=page.locator('#pilot-email');
      await fallback.scrollIntoViewIfNeeded();
      assert.equal(await fallback.isVisible(),true);
      assert.equal(await fallback.getAttribute('href'),
        'mailto:info@wescaleit.com?subject=Psoydo%20Pilotanfrage');
      assert.equal(await page.locator('.psoydo-tally-stage').getAttribute('data-tally-state'),'published');
      assert.equal(await page.locator('#pilot-tally-open').isVisible(),javaScriptEnabled,
        'Form launch only needs JavaScript when it is available');
      assert.equal(await page.locator('#pilot-tally-email-cta').isVisible(),!javaScriptEnabled,
        'No-JS visitors must still be able to contact us');
      assert.equal(await page.locator('#pilot-tally-frame iframe').count(),0);
      assert.equal(await page.locator('#pilot-tally-frame').isHidden(),true);
      assert.equal(await page.locator('#pilot-tally-direct').isHidden(),true);
      assert.equal(await page.locator('script[src*="tally.so"]').count(),0);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true);
      assert.deepEqual(external,[],'No external form or analytics request before explicit consent');
      // The actionable CTA must be inside the actual card, not beneath its clipped edge.
      const mainCTA=page.locator(javaScriptEnabled?'#pilot-tally-open':'#pilot-tally-email-cta');
      const bounds=await mainCTA.boundingBox();
      const cardBounds=await page.locator('.home2-form').boundingBox();
      assert.ok(bounds&&cardBounds&&bounds.y>=cardBounds.y &&
        bounds.y+bounds.height<=cardBounds.y+cardBounds.height+2,
        'Pilot CTA must remain fully inside the form card at '+width+'px');

      if(javaScriptEnabled){
        await page.locator('#pilot-tally-open').click();
        const frame=page.locator('#pilot-tally-frame iframe');
        await frame.waitFor({state:'attached'});
        assert.equal(await page.locator('#pilot-tally-frame').isVisible(),true);
        assert.equal(await page.locator('#pilot-tally-direct').isVisible(),true,
          'The published Tally form must have an external fallback when the iframe fails');
        assert.equal(await page.locator('#pilot-tally-direct a').getAttribute('href'),
          'https://tally.so/r/KppMYg');
        assert.equal(await page.locator('#pilot-tally-open').getAttribute('aria-expanded'),'true');
        const url='https://tally.so/embed/KppMYg?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';
        assert.equal(await frame.getAttribute('src'),url);
        assert.equal(await frame.getAttribute('data-tally-src'),url);
        assert.equal(await page.locator('#psoydo-tally-widget').count(),0,
          'No third-party widget JS should run inside the parent site');
        const events=await page.evaluate(()=>{
          const captured=[];
          window.__psoydoTrack=(name)=>captured.push(name);
          const iframe=document.querySelector('#pilot-tally-frame iframe');
          const payload=JSON.stringify({event:'Tally.FormSubmitted',
            payload:{formId:'KppMYg',id:'qa-only-01',fields:[{title:'Email',answer:{value:'private@example.com'}}]}});
          window.dispatchEvent(new MessageEvent('message',{origin:'https://evil.example',
            source:iframe.contentWindow,data:payload}));
          window.dispatchEvent(new MessageEvent('message',{origin:'https://tally.so',
            source:iframe.contentWindow,data:JSON.stringify({event:'Tally.FormSubmitted',payload:{formId:'wrong',id:'qa-only-02'}})}));
          window.dispatchEvent(new MessageEvent('message',{origin:'https://tally.so',
            source:iframe.contentWindow,data:JSON.stringify({event:'Tally.FormHeight',payload:{formId:'KppMYg',height:1120}})}));
          window.dispatchEvent(new MessageEvent('message',{origin:'https://tally.so',
            source:iframe.contentWindow,data:payload}));
          window.dispatchEvent(new MessageEvent('message',{origin:'https://tally.so',
            source:iframe.contentWindow,data:payload}));
          return captured;
        });
        assert.deepEqual(events,['psoydo_pilot_form_submitted'],
          'Only a valid first form submission should be counted, without personal answers');
        assert.equal(await frame.getAttribute('height'),'1120',
          'A verified Tally resize must be honored');
        await page.screenshot({path:`/tmp/psoydo-browser-qa/pilot-tally-${width}.png`});
        await page.locator('#pilot-tally-close').click();
        assert.equal(await page.locator('#pilot-tally-frame iframe').count(),0);
        assert.equal(await page.locator('#pilot-tally-direct').isHidden(),true);
        assert.equal(await page.locator('#pilot-tally-open').getAttribute('aria-expanded'),'false');
      }
      await page.screenshot({path:`/tmp/psoydo-browser-qa/pilot-contact-${width}-${javaScriptEnabled}.png`});
      await context.close();
    }
    console.log('Published pilot registration and fallback passed:',width);
  }
}

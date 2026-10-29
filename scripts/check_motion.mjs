import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {mkdir} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const output='/tmp/psoydo-browser-qa';

async function openLocal(browser,options={}) {
  const context=await browser.newContext({viewport:{width:1440,height:1000},...options});
  const external=[];
  await context.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.hostname!=='psoydo.com'){external.push(url.href);return route.abort();}
    const path=url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname;
    return route.fulfill({path:fileURLToPath(new URL(path.slice(1),root))});
  });
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('https://psoydo.com/de/?motion=1');
  if(options.javaScriptEnabled!==false)await page.locator('#consent-decline').click();
  return {context,page,external,errors};
}

async function recordState(page) {
  return page.evaluate(()=>({
    state:document.querySelector('[data-transform-demo]').getAttribute('data-state'),
    values:Array.from(document.querySelectorAll('[data-original][data-safe]'),element=>element.textContent),
    context:Array.from(document.querySelectorAll('.transform-row.stable .transform-value'),element=>element.textContent),
    records:document.querySelectorAll('.transform-record').length
  }));
}

export async function checkMotion(browser) {
  await mkdir(output,{recursive:true});

  // Static content and core actions must survive both tiny screens and missing JavaScript.
  for(const width of [320,390,768,1440]) {
    const {context,page}=await openLocal(browser,{viewport:{width,height:900},javaScriptEnabled:false});
    assert.equal(await page.locator('h1').isVisible(),true);
    assert.equal(await page.locator('[data-native-sculpture]').isVisible(),true);
    assert.equal(await page.locator('[data-transform-controls]').isHidden(),true);
    assert.equal(await page.locator('[data-alias-egg]').isHidden(),true);
    assert.equal(await page.locator('#pilot-tally-email-cta').isVisible(),true);
    assert.equal(await page.locator('.psoydo-sculpture-face').evaluate(element=>getComputedStyle(element).animationPlayState),'paused');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,'No-JS overflow at '+width);
    const visibleCopy=await page.locator('.home2-hero h1').evaluate(element=>getComputedStyle(element).opacity);
    assert.equal(Number(visibleCopy),1);
    await page.screenshot({path:output+'/motion-static-'+width+'.png'});
    await context.close();
  }

  // An old force-motion URL must not overrule the visitor's system preference.
  for(const width of [390,1440]) {
    const {context,page,external,errors}=await openLocal(browser,{viewport:{width,height:900},reducedMotion:'reduce'});
    assert.equal(await page.locator('html').getAttribute('data-motion'),'reduced');
    assert.equal(await page.locator('[data-motion-toggle]').first().isDisabled(),true);
    assert.equal(await page.locator('.psoydo-sculpture-face').evaluate(element=>getComputedStyle(element).animationName),'none');
    await page.evaluate(()=>{window.__motionRecord=document.querySelector('.transform-record');});
    const original=page.locator('[data-transform-mode="original"]');
    const protect=page.locator('[data-transform-mode="safe"]');
    await original.click();
    assert.deepEqual((await recordState(page)).values,['Anna Weber','anna.weber@klinik.de','48291']);
    await protect.click();
    assert.deepEqual((await recordState(page)).values,['PERSON_041','MAIL_018','REF_7Q2M9']);
    assert.deepEqual((await recordState(page)).context,['Radiologie','Gerätefreigabe']);
    assert.equal(await page.evaluate(()=>window.__motionRecord===document.querySelector('.transform-record')),true);
    assert.equal((await recordState(page)).records,1);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,'Reduced-motion overflow at '+width);

    const alias=page.locator('[data-alias-toggle]');
    await alias.click();
    assert.equal(await alias.getAttribute('aria-expanded'),'true');
    assert.equal(await page.locator('[data-alias-label]').textContent(),'MARKE_001');
    assert.equal(await page.locator('[data-alias-note]').isVisible(),true);
    await alias.press('Enter');
    assert.equal(await page.locator('[data-alias-label]').textContent(),'PSOYDO');
    assert.equal(await page.locator('[data-alias-note]').isHidden(),true);
    assert.deepEqual(external,[],'The sculpture and Easter egg must not contact external services');
    assert.deepEqual(errors,[]);
    await page.screenshot({path:output+'/motion-alias-'+width+'.png'});
    await context.close();
  }

  const {context,page,external,errors}=await openLocal(browser,{reducedMotion:'no-preference'});
  const face=page.locator('.psoydo-sculpture-face');
  const sculpture=page.locator('[data-psoydo-sculpture]');
  await page.waitForFunction(()=>document.querySelector('[data-psoydo-sculpture]').getAttribute('data-motion-in-view')==='true');
  assert.equal(await face.evaluate(element=>getComputedStyle(element).animationPlayState),'running');
  const firstTransform=await face.evaluate(element=>getComputedStyle(element).transform);
  await page.waitForTimeout(220);
  assert.notEqual(await face.evaluate(element=>getComputedStyle(element).transform),firstTransform,'The hero sculpture actually moves');
  await page.screenshot({path:output+'/motion-hero-desktop.png'});

  await page.locator('[data-motion-toggle]').first().click();
  assert.equal(await page.locator('html').getAttribute('data-motion'),'paused');
  const pausedTransform=await face.evaluate(element=>getComputedStyle(element).transform);
  await page.waitForTimeout(260);
  assert.equal(await face.evaluate(element=>getComputedStyle(element).transform),pausedTransform,'Pause must stop the visible shape');
  await page.locator('[data-motion-toggle]').first().click();

  const demo=page.locator('[data-transform-demo]');
  await demo.scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>document.querySelector('[data-transform-demo]').getAttribute('data-state')==='processing');
  const demoPause=page.locator('[data-transform-controls] [data-motion-toggle]');
  await demoPause.click();
  const pausedRecord=await recordState(page);
  await page.waitForTimeout(420);
  assert.deepEqual(await recordState(page),pausedRecord,'Paused record values must remain stable');
  await demoPause.click();
  await page.waitForFunction(()=>document.querySelector('[data-transform-demo]').getAttribute('data-state')==='safe');
  assert.deepEqual((await recordState(page)).values,['PERSON_041','MAIL_018','REF_7Q2M9']);
  assert.deepEqual((await recordState(page)).context,['Radiologie','Gerätefreigabe']);
  assert.equal(await sculpture.getAttribute('data-motion-in-view'),'false');
  assert.equal(await face.evaluate(element=>getComputedStyle(element).animationPlayState),'paused','Offscreen motion must stop');
  await page.locator('[data-transform-mode="original"]').click();
  await page.waitForTimeout(3500);
  assert.equal((await recordState(page)).state,'original','The automatic pass must not restart after a visitor chooses Original');

  // Exercise the actual visibility event handler while the record is changing.
  await page.locator('[data-transform-mode="safe"]').click();
  await page.waitForTimeout(1000);
  await page.evaluate(()=>{
    Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});
    document.dispatchEvent(new Event('visibilitychange'));
  });
  assert.equal(await page.locator('html').getAttribute('data-motion'),'hidden');
  const hiddenRecord=await recordState(page);
  await page.waitForTimeout(400);
  assert.deepEqual(await recordState(page),hiddenRecord,'A background-tab notification must suspend the timeline');
  await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
  await page.waitForFunction(()=>document.querySelector('[data-transform-demo]').getAttribute('data-state')==='safe');

  await page.locator('[data-transform-mode="original"]').click();
  await page.locator('[data-transform-mode="safe"]').click();
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.documentElement.getAttribute('data-motion')==='reduced');
  assert.equal((await recordState(page)).state,'safe','Changing the OS preference must leave a complete readable state');

  const useCase=page.locator('[data-case-list] a').nth(1);
  const target=await useCase.getAttribute('href');
  await useCase.focus();
  assert.equal(await page.locator('[data-case-list]').evaluate(element=>element.classList.contains('has-case-focus')),true);
  assert.equal(await useCase.getAttribute('href'),target);
  assert.deepEqual(external,[]);
  assert.deepEqual(errors,[]);
  await context.close();
  console.log('Motion QA passed: static/mobile, system preference, pause/resume, viewport, visibility, one-record controls and reversible Easter egg.');
}

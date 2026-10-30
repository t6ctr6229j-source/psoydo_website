import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
const GA='G-EYFT82SFN7';
const KEY='psoydo-consent-v3';

async function submitMessage(page,id,options={}){
 return page.evaluate(({id,options})=>{
  const frame=document.querySelector('#pilot-tally-frame iframe');
  window.dispatchEvent(new MessageEvent('message',{
   origin:options.origin||'https://tally.so',
   source:options.wrongSource?window:frame.contentWindow,
   data:JSON.stringify({event:'Tally.FormSubmitted',payload:{
    formId:options.formId||'KppMYg',id,
    respondentId:'private-respondent',
    fields:[{title:'Email',answer:{value:'private-answer@example.test'}}]
   }})
  }));
 },{id,options});
}

// Mock Google: validate consent/routing without sending measurements or opening a mail client.
export async function checkMeasurement(browser){
 for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  let google=0;
  await context.route('**/*',async route=>{
   const u=new URL(route.request().url());
   if(u.hostname==='www.googletagmanager.com'){
    google++;return route.fulfill({contentType:'text/javascript',body:'window.mockGoogleLoaded=true;'});
   }
   if(u.hostname==='tally.so')return route.fulfill({contentType:'text/html',body:'<!doctype html><p>Local form fixture</p>'});
   if(!['psoydo.com','preview.test','branch.psoydo-website.pages.dev','localhost'].includes(u.hostname))return route.abort();
   const path=u.pathname.endsWith('/')?u.pathname+'index.html':/^\/de\/[a-z0-9-]+$/.test(u.pathname)?u.pathname+'.html':u.pathname;
   return route.fulfill({path:fileURLToPath(new URL(path.slice(1),root))});
  });
  const page=await context.newPage();
  const commands=()=>page.evaluate(()=>Array.from(window.dataLayer||[],x=>Array.from(x)));
  await page.goto('https://psoydo.com/de/?email=do-not-send@example.test#private');
  await page.locator('#consent.show').waitFor();
  assert.equal(google,0);
  assert.equal(await page.locator('#consent-analytics').isChecked(),false);
  assert.equal(await page.locator('#consent-ads').isChecked(),false);
  await page.locator('#consent-decline').click();
  await page.locator('#pilot-email').evaluate(el=>{el.addEventListener('click',event=>event.preventDefault(),{once:true});el.click();});
  await page.locator('#pilot-tally-open').click();
  await submitMessage(page,'qa-declined-submission');
  await page.locator('#pilot-tally-close').click();
  assert.equal((await commands()).filter(x=>x[0]==='event').length,0);
  assert.equal(google,0,'Declined consent must not load Google or send events');
  await page.reload();
  assert.equal(await page.locator('#consent').getAttribute('aria-hidden'),'true');
  await page.locator('#consent-reopen').click();
  await page.locator('#consent-analytics').check();
  await page.evaluate(()=>Object.defineProperty(document,'referrer',{
   configurable:true,value:'https://www.google.com/private-referrer?email=do-not-send@example.test#private'
  }));
  await page.screenshot({path:`/tmp/psoydo-browser-qa/measurement-consent-${width}.png`});
  await page.locator('#consent-accept').click();
  await page.waitForFunction(()=>window.mockGoogleLoaded);
  let rows=await commands();
  assert.equal(google,1);
  assert.deepEqual(rows.filter(x=>x[0]==='config').map(x=>x[1]),[GA]);
  assert.equal(rows.find(x=>x[0]==='config'&&x[1]===GA)[2].send_page_view,true);
  assert.equal(rows.find(x=>x[0]==='consent')[2].ad_storage,'denied');
  assert.equal(rows.find(x=>x[0]==='set')[1].page_location,'https://psoydo.com/de/');
  assert.equal(rows.find(x=>x[0]==='set')[1].page_referrer,'https://www.google.com');
  assert.ok(!JSON.stringify(rows).includes('do-not-send'));
  await page.locator('#pilot-email').evaluate(el=>{el.addEventListener('click',event=>event.preventDefault(),{once:true});el.click();});
  rows=await commands();
  assert.equal(rows.filter(x=>x[0]==='event'&&x[1]==='psoydo_pilot_email_click').length,1);
  assert.equal(rows.filter(x=>x[0]==='event'&&x[1]==='psoydo_registration_submit').length,0);
  await page.locator('#pilot-tally-open').click();
  await submitMessage(page,'qa-wrong-origin',{origin:'https://untrusted.example'});
  await submitMessage(page,'qa-wrong-source',{wrongSource:true});
  await submitMessage(page,'qa-wrong-form',{formId:'wrong'});
  await submitMessage(page,'');
  assert.equal((await commands()).filter(x=>x[0]==='event'&&x[1]==='generate_lead').length,0);
  await submitMessage(page,'qa-submission-a');
  await submitMessage(page,'qa-submission-b');
  await submitMessage(page,'qa-submission-a');
  await submitMessage(page,'qa-submission-b');
  rows=await commands();
  assert.equal(rows.filter(x=>x[0]==='event'&&x[1]==='generate_lead').length,2,
   'Distinct confirmed submissions count once; replays never create another lead');
  assert.equal(rows.filter(x=>x[0]==='event'&&x[1]==='psoydo_pilot_form_submitted').length,2);
  assert.equal(rows.find(x=>x[0]==='event'&&x[1]==='generate_lead')[2].lead_source,'pilot_form');
  assert.equal(rows.find(x=>x[0]==='event'&&x[1]==='generate_lead')[2].form_id,'KppMYg');
  assert.equal(rows.find(x=>x[0]==='event'&&x[1]==='generate_lead')[2].method,'tally');
  assert.ok(!Object.hasOwn(rows.find(x=>x[0]==='event'&&x[1]==='generate_lead')[2],'value'));
  assert.ok(!JSON.stringify(rows).match(/private-|qa-submission|respondent|fields|example\.test/),
   'Answers, submission IDs and private URL details must stay outside analytics');
  await page.locator('#pilot-tally-close').click();
  assert.ok(rows.filter(x=>x[0]==='event').every(x=>x[2].send_to===GA));
  await context.addCookies([{name:'_ga',value:'test',domain:'psoydo.com',path:'/'}]);
  await page.locator('#consent-reopen').click();
  await Promise.all([page.waitForEvent('load'),page.locator('#consent-decline').click()]);
  assert.equal(google,1,'Withdrawal must reload without requesting Google again');
  assert.equal((await context.cookies()).filter(c=>c.name==='_ga').length,0);
  assert.equal(await page.evaluate(id=>window['ga-disable-'+id],GA),true);
  // Ads-only consent must not configure Analytics.
  await page.locator('#consent-reopen').click();
  await page.locator('#consent-ads').check();
  await page.locator('#consent-accept').click();
  await page.waitForFunction(()=>window.mockGoogleLoaded);
  rows=await commands();
  assert.deepEqual(rows.filter(x=>x[0]==='config').map(x=>x[1]),['AW-18355213487']);
  assert.equal(rows.find(x=>x[0]==='consent')[2].analytics_storage,'denied');
  // Grant both after an earlier denial; new document must restore consent correctly.
  await page.locator('#consent-reopen').click();
  await page.locator('#consent-analytics').check();
  await Promise.all([page.waitForEvent('load'),page.locator('#consent-accept').click()]);
  await page.waitForFunction(()=>window.mockGoogleLoaded);
  rows=await commands();
  assert.deepEqual(rows.filter(x=>x[0]==='config').map(x=>x[1]),[GA,'AW-18355213487']);
  assert.equal(rows.find(x=>x[0]==='consent')[2].analytics_storage,'granted');
  await page.goto('https://psoydo.com/de/insights');
  await page.waitForFunction(()=>window.mockGoogleLoaded);
  assert.equal(await page.locator('#consent-reopen').count(),1);
  assert.equal((await commands()).filter(x=>x[0]==='config'&&x[1]===GA).length,1);
  // Old Ads permission never silently becomes Analytics permission.
  await page.evaluate(key=>{localStorage.removeItem(key);localStorage.setItem('psoydo-consent-v2','granted');},KEY);
  const beforeOld=google;
  await page.reload();await page.locator('#consent.show').waitFor();
  assert.equal(google,beforeOld);
  // No production statistics on the preview hostname, even after explicit selection.
  for(const origin of ['https://preview.test','https://branch.psoydo-website.pages.dev','http://localhost','http://psoydo.com']){
   await page.goto(origin+'/de/insights');
   await page.locator('#consent.show').waitFor();
   await page.locator('#consent-analytics').check();await page.locator('#consent-accept').click();
   assert.equal(google,beforeOld,'Non-production origins must not start measurement: '+origin);
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await context.close();console.log('Measurement consent passed:',width);
 }
}


// Labels are presentational, but their typography and layout must not change.
const { chromium } = require('playwright');
const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080';
const REV = '73c580a018fa78a7f60550ea47fb746bb630e320';
const pages = ['index','produkt','anwendungsfaelle','sicherheit','preise','architektur','technologie'];
const css = ['styles.css','polish.css','v3.css','pricing.css','insights.css'];
const previous = new Map([...pages.map(n=>'de/'+n+'.html'),...css].map(p=>[p,execFileSync('git',['show',REV+':'+p],{encoding:'utf8'})]));
const capture = () => [...document.querySelectorAll('body *')].map(el=>{
 const s=getComputedStyle(el),r=el.getBoundingClientRect();
 const props=['display','fontFamily','fontSize','fontWeight','fontStyle','lineHeight','letterSpacing','color','backgroundColor','paddingTop','paddingRight','paddingBottom','paddingLeft','marginTop','marginRight','marginBottom','marginLeft','position','textTransform','textAlign','opacity','transform','gridTemplateColumns','gap'];
 return {tag:el.tagName,text:el.childElementCount?null:el.textContent.trim(),label:el.getAttribute('data-visual-tag'),style:Object.fromEntries(props.map(k=>[k,s[k]])),rect:[r.x,r.y,r.width,r.height].map(v=>Math.round(v*100)/100)};
});
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME,args:['--no-sandbox']});
 try {
  for(const width of [390,1440]) for(const name of pages){
   const results=[];
   for(const before of [true,false]){
    const context=await browser.newContext({viewport:{width,height:900},javaScriptEnabled:false,reducedMotion:'reduce'});
    await context.route('**/*',async route=>{
     const url=new URL(route.request().url());
     if(url.origin!==new URL(BASE).origin)return route.abort();
     let file=url.pathname.replace(/^\//,'');if(file==='de/')file='de/index.html';
     else if(!file.split('/').pop().includes('.'))file+='.html';
     if(before&&previous.has(file))return route.fulfill({status:200,contentType:file.endsWith('.css')?'text/css':'text/html',body:previous.get(file)});
     return route.continue();
    });
    const page=await context.newPage();
    await page.goto(BASE+'/de/'+(name==='index'?'':name),{waitUntil:'networkidle'});
    results.push(await page.evaluate(capture));await context.close();
   }
   const [old,now]=results;assert.equal(now.length,old.length,name+' element count');
   let labels=0;
   for(let i=0;i<old.length;i++){
    assert.equal(now[i].text,old[i].text,name+' text '+i);
    if(now[i].label){labels++;assert.equal(old[i].tag,now[i].label.toUpperCase());}
    else assert.equal(now[i].tag,old[i].tag,name+' tag '+i);
    assert.deepEqual(now[i].style,old[i].style,name+' '+width+' style '+i+' '+JSON.stringify(now[i]));
    assert.deepEqual(now[i].rect,old[i].rect,name+' '+width+' geometry '+i+' '+JSON.stringify(now[i]));
   }
   assert.ok(labels>0);console.log('Semantic label parity PASS',name,width,labels+' labels',now.length+' elements');
  }
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});

/* Manual smoke test: node scripts/checkSinhalaBrowser.cjs (Windows Edge). */
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const {spawn} = require('child_process');
const WebSocket = require('ws');
const root = path.resolve(__dirname, '..');
const artifacts = fs.mkdtempSync(path.join(os.tmpdir(), 'kiyamu-sinhala-'));
const port = 9097, debugPort = 9226;
let serveLegacyBundle = !!process.env.KIYAMU_LEGACY_BUNDLE;
const quickCoreFixture = !!process.env.KIYAMU_QUICK_CORE_FIXTURE;
const legacyCoreId = 'grid-data-imported-quick-core-24';
const oldWords = ['I','do','want','eat','to','good','you','go','like','tell','this','bad','it','is','look','wear','not','color/visual','they','what','when','stop','done','keyboard'];
const legacyCore = {grids:[{id:legacyCoreId,modelName:'GridData',modelVersion:'{"major":6,"minor":0,"patch":0}',isShortVersion:false,label:{en:'Quick Core 24'},minColumnCount:6,rowCount:4,showGlobalGrid:false,gridElements:oldWords.map((word,i)=>({id:'grid-element-legacy-quick-core-'+i,modelName:'GridElement',modelVersion:'{"major":6,"minor":0,"patch":0}',type:'ELEMENT_TYPE_NORMAL',label:{en:word},width:1,height:1,x:i%6,y:Math.floor(i/6),actions:[{id:'grid-action-legacy-quick-core-'+i,modelName:'GridActionSpeak',modelVersion:'{"major":6,"minor":0,"patch":0}'}]}))}],metadata:{modelName:'MetaData',modelVersion:'{"major":6,"minor":0,"patch":0}',homeGridId:legacyCoreId,lastOpenedGridId:legacyCoreId,globalGridActive:false}};
const legacyCatalog = [{name:{en:'Quick Core 24'},url:'quick-core-24.grd.json',selfContained:true,languages:['en'],description:{en:'Saved English core board fixture'},tags:[]}];
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.wasm':'application/wasm','.ttf':'font/ttf','.woff2':'font/woff2'};
const server = http.createServer((req,res) => {
    const name = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {res.writeHead(404).end();return;}
    res.setHeader('Content-Type',mime[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(serveLegacyBundle && name === '/app/build/asterics-aac.bundle.js' ? process.env.KIYAMU_LEGACY_BUNDLE : file).pipe(res);
});
const sleep = ms => new Promise(resolve => setTimeout(resolve,ms));
let browser, ws, seq=0; const pending=new Map(), errors=[];
async function command(method,params={}) {
    const id=++seq;
    return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pending.delete(id);reject(new Error('CDP timeout '+method));},20000);pending.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params}));});
}
async function evaluate(expression) {
    const r=await command('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    if(r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
}
async function waitFor(expression,label,timeout=20000) {
    const until=Date.now()+timeout;
    while(Date.now()<until){if(await evaluate('!!('+expression+')'))return;await sleep(200);}
    throw new Error('Timeout: '+label+'\n'+await evaluate('document.body.innerText.slice(0,1800)'));
}
async function click(selector) {
    const box=await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)throw Error('Missing element');e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
    await command('Input.dispatchMouseEvent',{type:'mousePressed',...box,button:'left',clickCount:1});
    await command('Input.dispatchMouseEvent',{type:'mouseReleased',...box,button:'left',clickCount:1});
    await sleep(250);
}
async function shot(name) {const r=await command('Page.captureScreenshot',{format:'png'});const file=path.join(artifacts,name+'.png');fs.writeFileSync(file,Buffer.from(r.data,'base64'));console.log('SCREENSHOT '+file);}
async function checkSentenceControls() {
    const order = await evaluate("[...document.querySelectorAll('#gridView .element-container')].slice(0,4).map(e=>e.id.replace('grid-element-kiyamu-si-food-',''))");
    if(JSON.stringify(order)!==JSON.stringify(['sentence','speak','undo','clear'])) throw Error('Keyboard order does not follow top row: '+JSON.stringify(order));
    const layout = await evaluate("(()=>{const rect=key=>{const r=document.querySelector('#grid-element-kiyamu-si-food-'+key).getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right}};return {sentence:rect('sentence'),controls:['speak','undo','clear'].map(rect),width:innerWidth,scrollWidth:document.documentElement.scrollWidth}})()");
    let right = layout.sentence.right;
    for(const control of layout.controls) {
        if(Math.abs(control.y-layout.sentence.y)>2 || control.x<right-1 || control.w<44 || control.h<44 || control.right>layout.width+1) throw Error('Sentence control layout failed: '+JSON.stringify(layout));
        right=control.right;
    }
    if(layout.scrollWidth>layout.width) throw Error('Horizontal page overflow');
    console.log('TOP_SENTENCE_CONTROLS passed at '+layout.width+'px');
}
(async()=>{
    await new Promise(resolve=>server.listen(port,'127.0.0.1',resolve));
    browser=spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',['--headless=new','--no-first-run','--disable-background-networking','--no-default-browser-check','--remote-debugging-port='+debugPort,'--user-data-dir='+path.join(artifacts,'profile'),'about:blank'],{windowsHide:true,stdio:'ignore'});
    let pages;
    for(let i=0;i<60;i++){try{pages=await (await fetch('http://127.0.0.1:'+debugPort+'/json/list')).json();if(pages.length)break;}catch{}await sleep(250);}
    if(!pages?.length)throw Error('Could not start Edge debugging');
    ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
    ws.on('message',raw=>{const m=JSON.parse(raw);if(m.id){const p=pending.get(m.id);if(p){clearTimeout(p.timer);pending.delete(m.id);m.error?p.reject(new Error(m.error.message)):p.resolve(m.result);}}else if(m.method==='Runtime.exceptionThrown'){errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);}else if(m.method==='Fetch.requestPaused'){const request=m.params;let response;
        if(quickCoreFixture && /live_metadata(?:_beta)?\.json/.test(request.request.url)) response=legacyCatalog;
        if(quickCoreFixture && /quick-core-24\.grd\.json/.test(request.request.url)) response=legacyCore;
        if(response) command('Fetch.fulfillRequest',{requestId:request.requestId,responseCode:200,responseHeaders:[{name:'Content-Type',value:'application/json'},{name:'Access-Control-Allow-Origin',value:'*'}],body:Buffer.from(JSON.stringify(response)).toString('base64')}).catch(()=>{});
        else command('Fetch.failRequest',{requestId:request.requestId,errorReason:'InternetDisconnected'}).catch(()=>{});}});
    await new Promise(resolve=>ws.once('open',resolve));
    await command('Page.enable');await command('Runtime.enable');await command('Network.enable');
    // All pictures, languages, fonts and starter data must work without remote APIs.
    await command('Fetch.enable',{patterns:[{urlPattern:'https://*'},{urlPattern:'http://*.asterics*'}]});
    await command('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
    await command('Page.navigate',{url:'http://127.0.0.1:'+port+'/'});
    await waitFor("document.querySelector('.start-button')",'Sinhala welcome screen');
    await evaluate('document.fonts.ready.then(()=>true)');
    console.log('WELCOME '+JSON.stringify(await evaluate("({language:document.documentElement.lang,title:document.title,sinhala:document.querySelector('.start-button').innerText})")));
    await shot('welcome');
    await evaluate("(()=>{const e=document.querySelector('#starter-language');e.value='en';e.dispatchEvent(new Event('change',{bubbles:true}));return true})()");
    await waitFor("document.documentElement.lang === 'en'",'English language switch');
    await command('Page.reload');await sleep(700);
    await waitFor("document.querySelector('.start-button') && document.documentElement.lang === 'en'",'saved language preference');
    console.log('LANGUAGE_PREFERENCE passed');
    if(quickCoreFixture && serveLegacyBundle) {
        await click('button.big-button');
        await waitFor("document.querySelector('.preview-buttons .btn-primary')", 'legacy catalog');
        await click('.preview-buttons .btn-primary');
        await waitFor("document.querySelector('#grid-element-legacy-quick-core-0')", 'imported English Quick Core 24');
        console.log('LEGACY_QUICK_CORE_IMPORTED passed');
    } else {
        await click('.start-button');
        await waitFor("document.querySelector('#grid-element-kiyamu-si-"+(serveLegacyBundle?'home':'core24')+"-content-food')",'installed starter home');
    }
    if (serveLegacyBundle) {
        serveLegacyBundle = false;
        await command('Page.reload', {ignoreCache:true}); await sleep(700);
        await waitFor("document.querySelector('#grid-element-kiyamu-si-core24-content-food')", 'Sinhala core replaces saved default');
        console.log('EXISTING_DEFAULT_REPLACED passed');
    }
    const coreTiles = await evaluate("document.querySelectorAll('[id^=grid-element-kiyamu-si-core24-content-]').length");
    if(coreTiles!==24) throw Error('Expected 24 Sinhala core tiles, got '+coreTiles);
    for(const key of ['i','rice','eat']) await click('#grid-element-kiyamu-si-core24-content-'+key);
    const coreSentence = await evaluate("document.querySelector('.collect-container').innerText.replace(/\\s+/g,' ').trim()");
    if(coreSentence!=='මම බත් කනවා') throw Error('Incorrect core sentence: '+coreSentence);
    if(!await evaluate("document.querySelector('#app').__vue__.uiLocked")) {
        await click('#gridView button[tabindex=\"33\"]');
        await waitFor("document.querySelector('#app').__vue__.uiLocked",'child board view');
    }
    await shot('core24-desktop');
    await command('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    await sleep(500);await shot('core24-mobile');
    const coreLayout = await evaluate("({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,buttons:[...document.querySelectorAll('#gridView .element-container')].map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}))})");
    if(coreLayout.width<coreLayout.scrollWidth || coreLayout.buttons.some(b=>b.w<44||b.h<44)) throw Error('Core mobile targets too small or overflowing: '+JSON.stringify(coreLayout));
    await click('#grid-element-kiyamu-si-core24-clear');
    await command('Page.reload');await sleep(700);
    await waitFor("document.querySelector('#grid-element-kiyamu-si-core24-content-food')", 'Sinhala core remains default after reload');
    const profileDatabases = await evaluate("indexedDB.databases().then(dbs=>dbs.map(db=>db.name).filter(name=>name.startsWith('_pouch_')).sort())");
    await command('Page.navigate',{url:'http://127.0.0.1:'+port+'/?gridset_filename=quick-core-24.grd.json'});await sleep(700);
    await waitFor("document.querySelector('#grid-element-kiyamu-si-core24-content-food')",'legacy direct link opens Sinhala core');
    const afterLinkDatabases = await evaluate("indexedDB.databases().then(dbs=>dbs.map(db=>db.name).filter(name=>name.startsWith('_pouch_')).sort())");
    if(JSON.stringify(profileDatabases)!==JSON.stringify(afterLinkDatabases)) throw Error('Legacy direct link created a duplicate profile: '+JSON.stringify({before:profileDatabases,after:afterLinkDatabases}));
    console.log('LEGACY_LINK_REUSES_SINHALA_PROFILE passed');
    await command('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
    await click('#grid-element-kiyamu-si-core24-content-food');
    await waitFor("document.querySelector('#grid-element-kiyamu-si-food-content-water')",'food board');
    await click('#grid-element-kiyamu-si-food-home');
    await waitFor("document.querySelector('#grid-element-kiyamu-si-core24-content-food')",'category returns to Sinhala core');
    await click('#grid-element-kiyamu-si-core24-content-food');
    await waitFor("document.querySelector('#grid-element-kiyamu-si-food-content-water')",'food board return');
    for(const key of ['to-me','water','want'])await click('#grid-element-kiyamu-si-food-content-'+key);
    const sentence=await evaluate("document.querySelector('.collect-container').innerText.replace(/\\s+/g,' ').trim()");
    console.log('SENTENCE '+sentence);
    if(sentence!=='මට වතුර ඕනේ')throw Error('Incorrect Sinhala sentence: '+sentence);
    await click('#grid-element-kiyamu-si-food-no');
    const afterNo=await evaluate("document.querySelector('.collect-container').innerText.replace(/\\s+/g,' ').trim()");
    if(afterNo!==sentence)throw Error('Immediate no changed the sentence');
    await click('#grid-element-kiyamu-si-food-undo');
    const afterUndo=await evaluate("document.querySelector('.collect-container').innerText.replace(/\\s+/g,' ').trim()");
    if(afterUndo!=='මට වතුර')throw Error('Undo removed wrong word: '+afterUndo);
    await click('#grid-element-kiyamu-si-food-clear');
    const afterClear = await evaluate("document.querySelector('.collect-container').innerText.trim()");
    if(afterClear) throw Error('Clear left words in the sentence: ' + afterClear);
    for(const key of ['to-me','water','want']) await click('#grid-element-kiyamu-si-food-content-'+key);
    await click('#grid-element-kiyamu-si-food-speak');
    if(await evaluate("document.querySelector('.collect-container').innerText.replace(/\\s+/g,' ').trim()") !== sentence) throw Error('Speak changed the sentence');
    await checkSentenceControls();
    await shot('food-desktop');
    await command('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    await sleep(600);await checkSentenceControls();await shot('food-mobile');
    console.log('FONT '+JSON.stringify(await evaluate("(()=>{const e=document.querySelector('#grid-element-kiyamu-si-food-content-banana .text-container');const c=document.createElement('canvas').getContext('2d');c.font=getComputedStyle(e).font;return {font:c.font,width:e.clientWidth,measured:c.measureText(e.innerText).width,inline:e.style.cssText,parentFont:getComputedStyle(e.parentNode).font}})()")));
    console.log('LAYOUT '+JSON.stringify(await evaluate("({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,buttons:[...document.querySelectorAll('#gridView .element-container')].map(e=>{const r=e.getBoundingClientRect();return {label:e.innerText,w:Math.round(r.width),h:Math.round(r.height),bottom:Math.round(r.bottom)}})})")));
    await evaluate("navigator.serviceWorker.register('./serviceWorker.js').then(()=>navigator.serviceWorker.ready).then(()=>true)");
    await waitFor('!!navigator.serviceWorker.controller','service worker control',30000);
    await command('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});
    await command('Network.overrideNetworkState',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});
    await command('Page.reload');
    await sleep(1000);
    await waitFor("document.querySelector('#grid-element-kiyamu-si-food-content-water')",'offline reload',30000);
    console.log('OFFLINE_RELOAD passed');
    // Edge keeps navigator.onLine true after CDP/SW reload; model the OS disconnection too.
    await evaluate("Object.defineProperty(navigator, 'onLine', {configurable:true, get:()=>false}); true");
    console.log('SPEECH_STATE '+JSON.stringify(await evaluate("({online:navigator.onLine,sinhalaVoices:speechSynthesis.getVoices().filter(v=>v.lang.startsWith('si')).length,locked:document.querySelector('#app').__vue__.uiLocked})")));
    await click('#grid-element-kiyamu-si-food-content-water');
    await waitFor("document.body.innerText.includes('සිංහල හඬක් හමු වුණේ නැහැ')",'no Sinhala voice warning');
    console.log('VOICE_UNAVAILABLE passed');
    await shot('offline-mobile');
    if(errors.length)throw Error('Browser errors: '+errors.join('\n'));
    console.log('PASS Sinhala browser smoke test. Artifacts: '+artifacts);
})().catch(async error=>{console.error(error.stack);console.error('Browser errors:',errors);try{await shot('failure');}catch{}process.exitCode=1;}).finally(async()=>{try{if(ws?.readyState===WebSocket.OPEN)await command('Browser.close');}catch{}ws?.close();browser?.kill();server.close();setTimeout(()=>process.exit(process.exitCode||0),200);});

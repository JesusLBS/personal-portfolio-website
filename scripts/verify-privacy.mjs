import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { parseArgs } from 'node:util';
import { PRIVACY_MAX_AGE_SECONDS, PRIVACY_VERSION } from '../app/utils/privacyConsent.ts';
import { PRIVACY_LOCATION, isAnalyticsEnabled } from '../app/utils/privacyContent.ts';
const {
  values
} = parseArgs({
  options: {
    mode: { type: 'string', default: 'on' },
    address: { type: 'string', default: 'location' },
    url: {
      type: 'string',
      default: 'http://127.0.0.1:3108'
    },
    chrome: {
      type: 'string'
    },
    artifacts: {
      type: 'string'
    }
  }
});
if (!['on', 'off', 'ui-only'].includes(values.mode)) throw new Error('Use --mode on, off or ui-only.');
if (!['location', 'example'].includes(values.address)) throw new Error('Use --address location or example.');
const exampleAddress = 'Calle Ejemplo 123, Colonia Prueba, C. P. 00000';
const expectedAddress = values.address === 'example' ? exampleAddress : '';
const base = new URL(values.url);
const domainTest = base.hostname === 'www.portfolio.test';
if (base.protocol !== 'http:' || !['localhost', '127.0.0.1', '[::1]', 'www.portfolio.test'].includes(base.hostname)) throw new Error('Run this synthetic check against a local production build.');
const outputDirectory = values.artifacts ? resolve(values.artifacts) : mkdtempSync(join(tmpdir(), 'portfolio-privacy-evidence-'));
mkdirSync(outputDirectory, {
  recursive: true
});
const profileDirectory = mkdtempSync(join(tmpdir(), 'portfolio-privacy-chrome-'));
const chromeBinary = values.chrome || process.env.CHROME_BIN || (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');
const browser = spawn(chromeBinary, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--disable-background-networking', '--remote-debugging-pipe', ...(domainTest ? ['--host-resolver-rules=MAP www.portfolio.test 127.0.0.1', '--no-proxy-server'] : []), `--user-data-dir=${profileDirectory}`], {
  stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe']
});
let sequence = 0;
let buffer = '';
const pending = new Map();
browser.on('error', error => {
  for (const task of pending.values()) {
    clearTimeout(task.timer);
    task.reject(error);
  }
  pending.clear();
});
const events = [];
browser.stdio[4].on('data', data => {
  buffer += data.toString();
  for (let end; (end = buffer.indexOf('\0')) >= 0;) {
    const raw = buffer.slice(0, end);
    buffer = buffer.slice(end + 1);
    if (!raw) continue;
    const message = JSON.parse(raw);
    if (message.id) {
      const waiter = pending.get(message.id);
      if (waiter) {
        clearTimeout(waiter.timer);
        pending.delete(message.id);
        message.error ? waiter.reject(message.error) : waiter.resolve(message.result);
      }
    } else events.push(message);
  }
});
function call(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timeout: ${method}`));
    }, 25000);
    pending.set(id, {
      resolve,
      reject,
      timer
    });
    browser.stdio[3].write(JSON.stringify({
      id,
      method,
      params,
      ...(sessionId ? {
        sessionId
      } : {})
    }) + '\0');
  });
}
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let session;
const evaluate = async expression => {
  const result = await call('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true
  }, session);
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const origin = base.origin;
let browserVersion = 'unknown';
const checks = [];
const fixture = `(()=>{
 const state=window.__privacyProbe={commands:[],views:0};let consent={};let id='';
 const send=()=>{if(!id||window['ga-disable-'+id]||consent.analytics_storage!=='granted')return;state.views++;const scope=location.hostname==='www.portfolio.test'?';Domain=.portfolio.test':'';document.cookie='_ga=fixture;path=/;SameSite=Lax'+scope;document.cookie='_ga_TEST123456=fixture;path=/;SameSite=Lax'+scope;fetch('/__privacy_probe',{method:'POST',keepalive:true}).catch(()=>{});};
 const consume=raw=>{const a=Array.from(raw);state.commands.push(a);if(a[0]==='consent')consent={...consent,...a[2]};if(a[0]==='config'){id=a[1];if(a[2]?.send_page_view!==false)send();}};
 window.dataLayer.forEach(consume);const push=window.dataLayer.push.bind(window.dataLayer);window.dataLayer.push=(...args)=>{args.forEach(consume);return push(...args)};
 const original=history.pushState.bind(history);history.pushState=(...args)=>{original(...args);send()};window.addEventListener('pagehide',send);
})()`;
const originalPush = events.push.bind(events);
events.push = event => {
  if (event.method === 'Fetch.requestPaused') {
    const isTag = event.params.request.url.includes('googletagmanager.com/gtag/js');
    void call('Fetch.fulfillRequest', {
      requestId: event.params.requestId,
      responseCode: isTag ? 200 : 204,
      responseHeaders: isTag ? [{
        name: 'Content-Type',
        value: 'application/javascript'
      }] : [],
      body: isTag ? Buffer.from(fixture).toString('base64') : ''
    }, event.sessionId).catch(() => {});
  }
  return originalPush(event);
};
const requestCount = part => events.filter(e => e.method === 'Network.requestWillBeSent' && e.params.request.url.includes(part)).length;
function assert(value, name, data) {
  checks.push({
    name,
    passed: !!value,
    ...(data ? {
      data
    } : {})
  });
  console.log((value ? 'PASS ' : 'FAIL ') + name);
  if (!value) throw Error(name + ': ' + JSON.stringify(data));
}
async function waitFor(expression) {
  const end = Date.now() + 10000;
  while (Date.now() < end) {
    try {
      if (await evaluate(expression)) return;
    } catch {}
    await pause(100);
  }
  throw Error('Condition timed out: ' + expression);
}
async function click(selector) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({block:'center',behavior:'instant'})`);
  await pause(80);
  const r = await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)throw Error('Missing target');const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2,w:r.width,h:r.height}})()`);
  if (!r.w || !r.h) throw Error('Hidden target ' + selector);
  await call('Input.dispatchMouseEvent', {
    type: 'mousePressed',
    button: 'left',
    clickCount: 1,
    x: r.x,
    y: r.y
  }, session);
  await call('Input.dispatchMouseEvent', {
    type: 'mouseReleased',
    button: 'left',
    clickCount: 1,
    x: r.x,
    y: r.y
  }, session);
  await pause(180);
}
async function escape() {
  await call('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27
  }, session);
  await call('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27
  }, session);
  await pause(150);
}
async function navigate(path = '/') {
  await call('Page.navigate', {
    url: origin + path
  }, session);
  await waitFor(`!!document.querySelector('nav[aria-label="Privacidad"]')`);
  await pause(800);
}
async function noTracking(name) {
  const data = await evaluate(`({tag:!!document.querySelector('script[data-gtag]'),cookies:document.cookie.split(';').map(x=>x.trim().split('=')[0]).filter(x=>/^_ga/.test(x)),banner:!!document.querySelector('[data-privacy-banner]')})`);
  assert(!data.tag && !data.cookies.length, name, data);
}
async function dimensions(name, selector) {
  const d = await evaluate(`(()=>{const root=document.documentElement,e=document.querySelector(${JSON.stringify(selector)});const r=e?.getBoundingClientRect();return {client:root.clientWidth,scroll:root.scrollWidth,inner:innerWidth,left:r?.left,right:r?.right,top:r?.top,bottom:r?.bottom,height:innerHeight}})()`);
  assert(d.scroll <= d.client && d.left >= 0 && d.right <= d.client && d.top >= 0 && d.bottom <= d.height + 1, name, d);
}
async function shot(name) {
  const r = await call('Page.captureScreenshot', {
    format: 'png'
  }, session);
  writeFileSync(join(outputDirectory, name + '.png'), Buffer.from(r.data, 'base64'));
}
async function enableInterception() {
  await call('Page.enable', {}, session);
  await call('Runtime.enable', {}, session);
  await call('Network.enable', {}, session);
  await call('Fetch.enable', {
    patterns: [{
      urlPattern: '*googletagmanager.com/gtag/js*'
    }, {
      urlPattern: '*analytics.google.com/*'
    }, {
      urlPattern: '*google-analytics.com/*'
    }, {
      urlPattern: '*doubleclick.net/*'
    }, {
      urlPattern: '*/__privacy_probe*'
    }]
  }, session);
}
async function checkContact(selector) {
  const expected = expectedAddress || PRIVACY_LOCATION;
  assert(await evaluate(`(()=>{const text=document.querySelector(${JSON.stringify(selector)})?.textContent||'';return text.includes(${JSON.stringify(expected)})&&text.includes(${JSON.stringify(expectedAddress ? 'Domicilio para oír y recibir notificaciones' : 'Ubicación')})})()`), 'published contact matches the configured example or general location');
}
async function runDisabled() {
  for (const path of ['/', '/services', '/privacidad', '/cookies']) {
    await navigate(path);
    assert(await evaluate(`!document.querySelector('[data-privacy-banner]')&&!document.querySelector('[data-privacy-dialog]')&&!document.querySelector('#privacy-footer-preferences')&&!document.querySelector('#privacy-page-preferences')`), path + ' has no Analytics controls when disabled');
    await noTracking(path + ' removes inherited cookies without loading a tag');
    assert(await evaluate(`Object.values(window.__privacyStorageCalls).every(value=>value===0)`), path + ' performs no localStorage reads or writes');
    assert(await evaluate(`window.__privacyStoredChoice()===window.__privacyOriginalChoice`), path + ' preserves an existing acceptance without consulting it');
    assert(await evaluate(`window.__privacyLegacySeeded&&document.cookie.includes('unrelated=keep')`), path + ' cleans legacy cookies and preserves unrelated ones');
    if (path === '/' || path === '/services') {
      assert(await evaluate(`(()=>{const notice=document.querySelector('[data-contact-privacy]');return !!notice?.querySelector('a[href="/privacidad"]')&&!!notice.querySelector('a[href^="mailto:"]')&&notice.textContent.includes('No se solicitan datos sensibles')})()`), path + ' keeps a simplified privacy notice at contact');
      await checkContact('[data-contact-privacy]');
    }
    if (path === '/privacidad') {
      assert(await evaluate(`!document.querySelector('main').innerText.includes('Google Analytics')&&!document.querySelector('main').innerText.includes('Estadísticas opcionales')&&!document.querySelector('a[href*="partner-sites"]')`), 'disabled privacy notice excludes GA purpose, provider and retention');
      assert(await evaluate(`['Netlify','derechos ARCO','20 días hábiles','15 días hábiles','gratuito'].every(text=>document.querySelector('main').innerText.includes(text))`), 'base privacy notice retains hosting, ARCO and contact protections');
      await checkContact('[data-privacy-contact-address]');
    }
    if (path === '/cookies') assert(await evaluate(`!!document.querySelector('[data-privacy-disabled-info]')&&!document.querySelector('main code')`), 'cookies route describes the disabled mode without preference storage');
  }
  for (const width of [320, 390, 768, 1024, 1440]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 829, deviceScaleFactor: 1, mobile: width < 768 }, session);
    for (const path of ['/', '/services', '/privacidad', '/cookies']) {
      await navigate(path);
      assert(await evaluate(`document.documentElement.scrollWidth<=document.documentElement.clientWidth`), width + ' disabled ' + path + ' has no horizontal overflow');
    }
    if (width === 320) await shot('disabled-cookies-mobile');
  }
  await navigate('/');
  await click('#home [data-cv-trigger]');
  await click('[data-cv-preview]');
  assert(await evaluate(`!!document.querySelector('dialog[open] iframe')`), 'CV preview works with Analytics disabled');
  await escape();
  assert(requestCount('googletagmanager.com') === 0 && requestCount('google-analytics.com') === 0 && requestCount('doubleclick.net') === 0 && requestCount('analytics.google.com') === 0, 'disabled mode makes no Google tag or measurement requests despite a valid ID');
  await noTracking('disabled mode remains clean after all routes and interactions');
}
async function runUiOnly() {
  await waitFor(`!!document.querySelector('[data-privacy-banner]')`);
  await checkContact('[data-contact-privacy]');
  await noTracking('enabled UI without a valid ID starts with tracking blocked');
  await shot('preview-banner');
  await click('[data-privacy-accept]');
  assert(await evaluate(`JSON.parse(localStorage.getItem('portfolio-privacy')).analytics===true`), 'UI-only preview can remember acceptance');
  await noTracking('acceptance without a valid ID cannot load Analytics');
  await navigate('/cookies');
  assert(await evaluate(`!!document.querySelector('#privacy-page-preferences')`), 'UI-only preview keeps the preferences entry');
  await click('#privacy-page-preferences');
  await click('[data-privacy-withdraw]');
  assert(await evaluate(`JSON.parse(localStorage.getItem('portfolio-privacy')).analytics===false`), 'UI-only preview can withdraw acceptance');
  await navigate('/privacidad');
  await checkContact('[data-privacy-contact-address]');
  assert(await evaluate(`document.querySelector('main').innerText.includes('Google Analytics')`), 'enabled preview shows the optional Analytics information');
  assert(requestCount('googletagmanager.com') === 0, 'UI-only preview never requests the tag');
}
try {
  browserVersion = (await call('Browser.getVersion')).product;
  const {
    targetId
  } = await call('Target.createTarget', {
    url: 'about:blank'
  });
  session = (await call('Target.attachToTarget', {
    targetId,
    flatten: true
  })).sessionId;
  await enableInterception();
  await call('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  }, session);
  if (values.mode === 'off') {
    await call('Page.addScriptToEvaluateOnNewDocument', { source: `(()=>{if(window.top!==window)return;const storage=localStorage;const original=Storage.prototype.getItem;const value=JSON.stringify({version:${PRIVACY_VERSION},analytics:true,updatedAt:Date.now()});storage.setItem('portfolio-privacy',value);window.__privacyOriginalChoice=value;window.__privacyStoredChoice=()=>original.call(storage,'portfolio-privacy');window.__privacyStorageCalls={getItem:0,setItem:0,removeItem:0,clear:0};for(const name of Object.keys(window.__privacyStorageCalls)){const method=Storage.prototype[name];Storage.prototype[name]=function(...args){if(this===storage)window.__privacyStorageCalls[name]++;return method.apply(this,args)}}const scope=location.hostname==='www.portfolio.test'?';Domain=.portfolio.test':'';document.cookie='_ga=legacy;Path=/;Max-Age=63072000'+scope;document.cookie='_ga_LEGACY=legacy;Path=/;Max-Age=63072000'+scope;document.cookie='unrelated=keep;Path=/'+scope;window.__privacyLegacySeeded=document.cookie.includes('_ga=legacy')})()` }, session);
  }
  await navigate();
  const settings = await evaluate(`(()=>{const config=document.getElementById('__nuxt')?.__vue_app__?.config.globalProperties.$nuxt.$config.public;return {configAvailable:!!config&&'privacyAddress' in config,enabled:config?.analyticsEnabled,addressMatches:config?.privacyAddress===${JSON.stringify(expectedAddress)}}})()`);
  assert(settings.configAvailable && isAnalyticsEnabled(settings.enabled) === (values.mode !== 'off'), 'runtime Analytics switch matches the requested test mode');
  assert(settings.addressMatches, 'test accepts only an empty or explicitly fictitious address');
  await checkContact('[data-contact-privacy]');
  if (values.mode === 'off') await runDisabled();
  else if (values.mode === 'ui-only') await runUiOnly();
  else {
    await waitFor(`!!document.querySelector('[data-privacy-banner]')`);
    await checkContact('[data-privacy-summary]');
    await noTracking('first visit has no tag or Analytics cookies');
    assert(requestCount('googletagmanager.com') === 0, 'first visit makes no Google tag request');
    const thirdParty = events.filter(e => e.method === 'Network.requestWillBeSent').map(e => e.params.request.url).filter(url => /^https?:/.test(url) && new URL(url).origin !== origin);
    assert(thirdParty.length === 0, 'initial visit makes only same-origin resource requests', [...new Set(thirdParty.map(url => new URL(url).origin))]);
    if (domainTest) {
      await evaluate(`document.cookie='_ga=legacy;Domain=.portfolio.test;Path=/;Max-Age=63072000';document.cookie='_ga_LEGACY=legacy;Domain=.portfolio.test;Path=/;Max-Age=63072000';document.cookie='unrelated=keep;Domain=.portfolio.test;Path=/'`);
      const legacy = (await call('Network.getCookies', { urls: [origin] }, session)).cookies;
      assert(legacy.some(cookie => cookie.name === '_ga' && cookie.domain === '.portfolio.test'), 'legacy parent-domain cookie exists before cleanup');
      await navigate('/');
      await noTracking('undecided visit clears legacy parent-domain Analytics cookies');
      assert(await evaluate(`document.cookie.includes('unrelated=keep')`), 'domain cleanup preserves unrelated cookies');
    }
    await shot('banner-desktop');
    assert(await evaluate(`window.dataLayer?.some(x=>x[0]==='config'&&x[1]==='G-TEST123456')`), 'production build uses the synthetic test tag');
    await click('header nav a[href="#about"]');
    assert(await evaluate(`location.hash==='#about'&&!!document.querySelector('[data-privacy-banner]')`), 'undecided visitors can navigate freely');
    await noTracking('ignoring the banner never grants tracking');
    await click('#privacy-banner-preferences');
    await waitFor(`!!document.querySelector('[data-privacy-dialog][open]')`);
    await escape();
    assert(await evaluate(`!localStorage.getItem('portfolio-privacy')&&!!document.querySelector('[data-privacy-banner]')`), 'closing preferences does not imply consent');
    await noTracking('dismissed preferences keep tracking blocked');
    await click('[data-privacy-reject]');
    await waitFor(`!document.querySelector('[data-privacy-banner]')`);
    assert(await evaluate(`JSON.parse(localStorage.getItem('portfolio-privacy')).analytics===false`), 'rejection is saved');
    await noTracking('rejection does not load tracking');
    await navigate('/?mode=client');
    await click('button[aria-label="Abrir opciones de WhatsApp"]');
    await waitFor(`!!document.querySelector('button[aria-label="Abrir opciones de WhatsApp"] .iconify')&&getComputedStyle(document.querySelector('button[aria-label="Abrir opciones de WhatsApp"] .iconify')).maskImage.includes('data:image/svg+xml')`);
    assert(await evaluate(`!!document.querySelector('a[href^="https://wa.me/"]')`), 'client-only WhatsApp icon and toggle work with server-only fallback');
    await navigate('/services');
    await noTracking('rejection survives navigation and reload');
    assert(requestCount('googletagmanager.com') === 0, 'rejected visits make no tag request');
    await click('#privacy-footer-preferences');
    await waitFor(`!!document.querySelector('[data-privacy-dialog][open]')`);
    assert(await evaluate(`!document.querySelector('[data-privacy-analytics]').checked`), 'rejection is reflected in preferences');
    await escape();
    assert(await evaluate(`document.activeElement.id==='privacy-footer-preferences'`), 'Escape restores focus');
    await click('#privacy-footer-preferences');
    await click('[data-privacy-analytics]');
    await click('[data-privacy-save]');
    await waitFor(`window.__privacyProbe?.views>0`);
    assert(requestCount('googletagmanager.com') === 1, 'acceptance loads tag once');
    await click('#privacy-footer-preferences');
    await click('[data-privacy-save]');
    assert(requestCount('googletagmanager.com') === 1, 'saving acceptance again does not duplicate the tag');
    assert(await evaluate(`document.cookie.includes('_ga=')`), 'accepted test tag can create Analytics cookies');
    if (domainTest) {
      const cookies = (await call('Network.getCookies', { urls: [origin] }, session)).cookies;
      assert(cookies.some(cookie => cookie.name === '_ga' && cookie.domain === '.portfolio.test'), 'accepted fixture uses parent-domain Analytics cookies');
    }
    assert(await evaluate(`window.__privacyProbe.commands.filter(x=>x[0]==='consent').every(x=>['ad_storage','ad_user_data','ad_personalization'].every(k=>x[2][k]!=='granted'))`), 'advertising remains denied');
    assert(await evaluate(`window.__privacyProbe.commands.filter(x=>x[0]==='config').every(x=>x[2].allow_google_signals===false&&x[2].allow_ad_personalization_signals===false)`), 'advertising feature flags remain disabled');
    await click('nav[aria-label="Privacidad"] a[href="/cookies"]');
    await waitFor(`location.pathname==='/cookies'`);
    assert(await evaluate(`document.querySelector('h1').textContent.includes('Cookies')`), 'cookies page loads through SPA navigation');
    assert(await evaluate(`document.querySelector('header a[href="/#about"]')!==null`), 'legal navigation links return to profile sections');
    await click('#privacy-page-preferences');
    await waitFor(`!!document.querySelector('[data-privacy-dialog][open]')`);
    const probesBefore = requestCount('/__privacy_probe');
    await click('[data-privacy-withdraw]');
    await waitFor(`!document.querySelector('script[data-gtag]')&&document.querySelector('#privacy-footer-preferences')&&document.documentElement.style.overflow!=='hidden'`);
    await pause(700);
    await noTracking('withdrawal reload removes tag and cookies');
    assert(requestCount('/__privacy_probe') === probesBefore, 'withdrawal emits no further measurement or denial ping');
    await navigate('/');
    await noTracking('withdrawal remains effective after reload');
    for (const [label, value] of [['malformed', '{'], ['expired', JSON.stringify({
      version: 1,
      analytics: true,
      updatedAt: Date.now() - 181 * 86400000
    })], ['old version', JSON.stringify({
      version: 0,
      analytics: true,
      updatedAt: Date.now()
    })], ['future timestamp', JSON.stringify({
      version: 1,
      analytics: true,
      updatedAt: Date.now() + 86400000
    })]]) {
      await evaluate(`localStorage.setItem('portfolio-privacy',${JSON.stringify(value)})`);
      await navigate('/');
      await waitFor(`!!document.querySelector('[data-privacy-banner]')`);
      await noTracking(label + ' fails closed');
    }
    await evaluate(`localStorage.setItem('portfolio-privacy',JSON.stringify({version:${PRIVACY_VERSION},analytics:true,updatedAt:Date.now()-${PRIVACY_MAX_AGE_SECONDS * 1000}+8000}))`);
    await navigate('/');
    await waitFor(`window.__privacyProbe?.views>0`);
    const expiryStarted = Date.now();
    await waitFor(`!!document.querySelector('[data-privacy-banner]')&&!document.querySelector('script[data-gtag]')`);
    assert(Date.now() - expiryStarted < 10000, 'an open page expires consent at its deadline');
    await noTracking('active consent expiration removes tracking');
    await click('[data-privacy-accept]');
    await waitFor(`window.__privacyProbe?.views>0`);
    const main = session;
    const second = await call('Target.createTarget', {
      url: 'about:blank'
    });
    session = (await call('Target.attachToTarget', {
      targetId: second.targetId,
      flatten: true
    })).sessionId;
    await enableInterception();
    await navigate('/services');
    await waitFor(`window.__privacyProbe?.views>0`);
    await click('#privacy-footer-preferences');
    await click('[data-privacy-withdraw]');
    await pause(900);
    session = main;
    await waitFor(`!document.querySelector('script[data-gtag]')&&!!document.querySelector('#privacy-footer-preferences')`);
    await noTracking('withdrawal is synchronized across tabs');
    await call('Target.closeTarget', {
      targetId: second.targetId
    });
    await evaluate(`localStorage.clear()`);
    const blocked = await call('Page.addScriptToEvaluateOnNewDocument', {
      source: `for(const name of ['getItem','setItem','removeItem'])Object.defineProperty(Storage.prototype,name,{configurable:true,value(){throw new DOMException('Storage blocked','SecurityError')}});`
    }, session);
    await navigate('/');
    await waitFor(`!!document.querySelector('[data-privacy-banner]')`);
    await noTracking('blocked storage keeps tracking disabled');
    await click('[data-privacy-reject]');
    assert(await evaluate(`!document.querySelector('[data-privacy-banner]')`), 'rejection works without storage');
    await click('#privacy-footer-preferences');
    assert(await evaluate(`document.querySelector('[data-privacy-dialog]').innerText.includes('No hemos podido')`), 'blocked storage is explained in preferences');
    await escape();
    await call('Page.removeScriptToEvaluateOnNewDocument', {
      identifier: blocked.identifier
    }, session);
    for (const [label, source] of [
      ['all storage blocked', `for(const name of ['getItem','setItem','removeItem'])Object.defineProperty(Storage.prototype,name,{configurable:true,value(){throw new DOMException('Storage blocked','SecurityError')}});`],
      ['writes blocked with stale acceptance', `localStorage.setItem('portfolio-privacy',JSON.stringify({version:${PRIVACY_VERSION},analytics:true,updatedAt:Date.now()}));Object.defineProperty(Storage.prototype,'setItem',{configurable:true,value(){throw new DOMException('Quota exceeded','QuotaExceededError')}});`]
    ]) {
      const override = await call('Page.addScriptToEvaluateOnNewDocument', { source }, session);
      await navigate('/');
      await waitFor(`!!document.querySelector('#privacy-footer-preferences')`);
      await click(await evaluate(`!!document.querySelector('[data-privacy-banner]')`) ? '#privacy-banner-preferences' : '#privacy-footer-preferences');
      await waitFor(`!!document.querySelector('[data-privacy-dialog][open]')`);
      await click('[data-privacy-withdraw]');
      for (const analytics of [false, true]) {
        if (analytics) {
          await click('#privacy-footer-preferences');
          await click('[data-privacy-analytics]');
          await click('[data-privacy-save]');
          await waitFor(`window.__privacyProbe?.views>0`);
        }
        await call('Page.bringToFront', {}, session);
        await evaluate(`if(document.visibilityState!=='visible')throw Error('Page must be visible');window.__noReload=1;document.dispatchEvent(new Event('visibilitychange'))`);
        await pause(1000);
        assert(await evaluate(`window.__noReload===1&&!document.querySelector('[data-privacy-banner]')`), `${label}: ${analytics ? 'acceptance' : 'rejection'} survives visibility without reload`);
        await click('#privacy-footer-preferences');
        assert(await evaluate(`document.querySelector('[data-privacy-analytics]').checked===${analytics}&&document.querySelector('[data-privacy-dialog]').innerText.includes('No hemos podido')`), `${label}: temporary choice and storage warning stay accurate`);
        await escape();
      }
      await click('#privacy-footer-preferences');
      await click('[data-privacy-withdraw]');
      const before = requestCount('/__privacy_probe');
      await evaluate(`document.dispatchEvent(new Event('visibilitychange'));history.pushState({},'',location.pathname+'?withdrawn=1')`);
      await pause(400);
      assert(await evaluate(`window.__noReload===1&&window['ga-disable-G-TEST123456']===true`) && requestCount('/__privacy_probe') === before, `${label}: withdrawal disables the simulated tag without reviving stale consent`);
      await call('Page.removeScriptToEvaluateOnNewDocument', { identifier: override.identifier }, session);
      await evaluate(`localStorage.clear()`);
    }
    for (const width of [320, 390, 768, 1024, 1440]) {
      await call('Emulation.setDeviceMetricsOverride', {
        width,
        height: 829,
        deviceScaleFactor: 1,
        mobile: width < 768
      }, session);
      await navigate('/');
      await waitFor(`!!document.querySelector('[data-privacy-banner]')`);
      await dimensions(width + ' banner fits', '[data-privacy-banner]');
      assert(await evaluate(`document.querySelector('[data-privacy-banner]').getBoundingClientRect().height<=innerHeight/2+1`), width + ' banner uses at most half the viewport');
      assert(await evaluate(`(()=>{const summary=document.querySelector('[data-privacy-summary]');const paragraph=document.querySelector('[data-privacy-analytics-summary]');if(!summary||!paragraph)return false;const area=summary.getBoundingClientRect();const text=paragraph.getBoundingClientRect();return summary.scrollTop===0&&text.top>=area.top-1&&text.bottom<=area.bottom+1&&text.left>=area.left-1&&text.right<=area.right+1})()`), width + ' analytics explanation is fully visible before any summary scroll');
      await click('#privacy-banner-preferences');
      await click('[data-privacy-save]');
      assert(await evaluate(`document.activeElement.id==='privacy-footer-preferences'`), width + ' saving from banner restores focus to a stable control');
      await evaluate(`localStorage.clear()`);
      await navigate('/');
      if (width === 320) await shot('banner-mobile');
      await click('[data-privacy-reject]');
      await click('#privacy-footer-preferences');
      await dimensions(width + ' preferences fit', '[data-privacy-dialog][open]');
      if (width === 320) await shot('preferences-mobile');
      await escape();
      await navigate('/privacidad');
      assert(await evaluate(`document.documentElement.scrollWidth<=document.documentElement.clientWidth`), width + ' notice has no overflow');
      if (width === 320) await shot('notice-mobile');
      await evaluate(`localStorage.clear()`);
    }
    await navigate('/');
    await waitFor(`!!document.querySelector('[data-privacy-banner]')`);
    await click('[data-privacy-reject]');
    await click('#home [data-cv-trigger]');
    await click('[data-cv-preview]');
    assert(await evaluate(`!!document.querySelector('dialog[open] iframe')`), 'CV preview remains functional');
    await escape();
    await click('nav[aria-label="Privacidad"] a[href="/privacidad"]');
    await waitFor(`location.pathname==='/privacidad'`);
    await click('header a[href="/#about"]');
    await waitFor(`location.pathname==='/'&&location.hash==='#about'`);
    assert(await evaluate(`!!document.querySelector('#about')`), 'legal header returns to about section');
  }
  const exceptions = events.filter(e => e.method === 'Runtime.exceptionThrown');
  assert(exceptions.length === 0, 'no uncaught browser exceptions', exceptions.map(e => e.params.exceptionDetails.text));
  assert(requestCount('api.iconify.design') === 0, 'no direct browser requests to Iconify throughout the scenarios');
  console.log(JSON.stringify({
    passed: checks.length,
    artifacts: outputDirectory,
    googleNetwork: 'intercepted with a test tag; no real measurement sent'
  }));
} finally {
  writeFileSync(join(outputDirectory, 'browser-report.json'), JSON.stringify({
    checkedAt: new Date().toISOString(),
    browser: browserVersion,
    node: process.version,
    analyticsMode: values.mode,
    addressScenario: values.address,
    environment: 'local production build with synthetic Google tag',
    cookieScope: domainTest ? 'parent domain .portfolio.test' : 'host-only loopback',
    realGoogleRequests: false,
    checks
  }, null, 2) + '\n');
  await call('Browser.close').catch(() => browser.kill());
  if (browser.exitCode === null) await Promise.race([new Promise(resolve => browser.once('exit', resolve)), pause(2000)]);
  if (browser.exitCode === null) browser.kill();
  try {
    rmSync(profileDirectory, {
      recursive: true,
      force: true
    });
  } catch {}
}

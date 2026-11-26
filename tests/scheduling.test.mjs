import test from 'node:test';
import assert from 'node:assert/strict';
import countryHandler from '../netlify/edge-functions/scheduling-country.js';
import { resolveCalendlyUrl } from '../app/utils/scheduling.ts';

test('public Calendly links retain their booking path', () => {
    assert.equal(resolveCalendlyUrl(' https://calendly.com/portfolio-demo/conversacion '), 'https://calendly.com/portfolio-demo/conversacion');
    assert.equal(resolveCalendlyUrl('https://www.calendly.com/portfolio-demo/conversacion'), 'https://www.calendly.com/portfolio-demo/conversacion');
});

test('missing, malformed or unsafe destinations do not enable scheduling', () => {
    for (const value of [undefined, null, false, {}, '', ' ', 'invalid', '/booking',
        'javascript:alert(1)', 'http://calendly.com/demo/event', 'https://calendly.com/',
        'https://calendly.com.ejemplo.test/demo/event', 'https://ejemplo.test/calendly.com/demo/event',
        'https://user:password@calendly.com/demo/event', 'https://calendly.com:8443/demo/event']) {
        assert.equal(resolveCalendlyUrl(value), '', String(value));
    }
});

test('Mexico is eligible without returning the country or other geolocation', async () => {
    const response = countryHandler(new Request('https://portfolio.test/api/scheduling-country'), {
        geo: { country: { code: 'MX' }, city: 'Example', latitude: 0, longitude: 0 },
    });
    assert.deepEqual(await response.json(), { allowed: true });
});

test('other countries, missing context and unknown locations remain ineligible', async () => {
    for (const context of [undefined, {}, { geo: {} }, { geo: { country: {} } },
        { geo: { country: { code: 'US' } } }, { geo: { country: { code: '' } } }]) {
        const response = countryHandler(new Request('https://portfolio.test/api/scheduling-country'), context);
        assert.deepEqual(await response.json(), { allowed: false });
    }
});

test('a visitor cannot choose the country through query parameters or headers', async () => {
    const request = new Request('https://portfolio.test/api/scheduling-country?country=MX', {
        headers: { 'x-country': 'MX', 'x-nf-geo': '{"country":{"code":"MX"}}' },
    });
    const response = countryHandler(request, { geo: { country: { code: 'US' } } });
    assert.deepEqual(await response.json(), { allowed: false });
});

test('country decisions are not shared through browser or CDN caching', () => {
    const response = countryHandler(new Request('https://portfolio.test/api/scheduling-country'), {});
    assert.match(response.headers.get('cache-control'), /private.*no-store/);
    assert.equal(response.headers.get('netlify-cdn-cache-control'), 'no-store');
    assert.equal(response.headers.get('set-cookie'), null);
});

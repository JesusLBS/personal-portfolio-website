import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyticsCookieNames, parsePrivacyChoice, readStoredPrivacyChoice, writeStoredPrivacyChoice, PRIVACY_MAX_AGE_SECONDS, PRIVACY_STORAGE_KEY, PRIVACY_VERSION, validatePrivacyChoice } from '../app/utils/privacyConsent.ts';

import { isAnalyticsEnabled, resolvePrivacyContact, PRIVACY_LOCATION } from '../app/utils/privacyContent.ts';

const now = Date.UTC(2026, 10, 23);
const choice = analytics => ({ version: PRIVACY_VERSION, analytics, updatedAt: now });

test('requires an explicit boolean choice and supported policy version', () => {
    for (const input of [null, [], {}, true, { ...choice(true), analytics: 'true' }, { ...choice(true), version: 0 }]) {
        assert.equal(validatePrivacyChoice(input, now), null);
    }
    assert.deepEqual(validatePrivacyChoice(choice(false), now), choice(false));
    assert.deepEqual(validatePrivacyChoice(choice(true), now), choice(true));
});

test('expires acceptance and rejection at the same 180-day boundary', () => {
    for (const analytics of [true, false]) {
        const expires = now + PRIVACY_MAX_AGE_SECONDS * 1000;
        assert.deepEqual(validatePrivacyChoice(choice(analytics), expires - 1), choice(analytics));
        assert.equal(validatePrivacyChoice(choice(analytics), expires), null);
    }
});

test('rejects impossible or future timestamps', () => {
    for (const updatedAt of [0, -1, NaN, Infinity, now + 1, now - 0.5, String(now), Number.MAX_SAFE_INTEGER + 1]) {
        assert.equal(validatePrivacyChoice({ ...choice(true), updatedAt }, now), null);
    }
});

const memoryStorage = () => {
    const entries = new Map();
    return { getItem: key => entries.get(key) ?? null, setItem: (key, value) => { entries.set(key, value); }, removeItem: key => { entries.delete(key); } };
};

test('persists acceptance and rejection without adding identifiers or renewing their timestamp on read', () => {
    for (const analytics of [true, false]) {
        const storage = memoryStorage();
        assert.equal(writeStoredPrivacyChoice(() => storage, choice(analytics), now), true);
        assert.deepEqual(readStoredPrivacyChoice(() => storage, now + 1000), { choice: choice(analytics), canPersist: true });
        assert.deepEqual(JSON.parse(storage.getItem(PRIVACY_STORAGE_KEY)), choice(analytics));
    }
});

test('removes invalid or expired preferences without deleting unrelated storage', () => {
    for (const stored of ['{', JSON.stringify({ ...choice(true), version: 0 }), JSON.stringify(choice(true))]) {
        const storage = memoryStorage();
        storage.setItem(PRIVACY_STORAGE_KEY, stored);
        storage.setItem('theme', 'dark');
        const afterExpiry = now + PRIVACY_MAX_AGE_SECONDS * 1000;
        assert.deepEqual(readStoredPrivacyChoice(() => storage, afterExpiry), { choice: null, canPersist: true });
        assert.equal(storage.getItem(PRIVACY_STORAGE_KEY), null);
        assert.equal(storage.getItem('theme'), 'dark');
    }
});

test('fails closed if the browser denies access to the storage object', () => {
    const denied = () => { throw new Error('Storage access denied'); };
    assert.deepEqual(readStoredPrivacyChoice(denied, now), { choice: null, canPersist: false });
    assert.equal(writeStoredPrivacyChoice(denied, choice(true), now), false);
});

test('handles storage read and write failures independently', () => {
    const storage = memoryStorage();
    const unreadable = { ...storage, getItem() { throw new Error('Read denied'); } };
    assert.deepEqual(readStoredPrivacyChoice(() => unreadable, now), { choice: null, canPersist: false });
    const unwritable = { ...storage, setItem() { throw new Error('Quota exceeded'); } };
    assert.equal(writeStoredPrivacyChoice(() => unwritable, choice(false), now), false);
});

test('does not grant analytics if invalid storage cannot be removed', () => {
    const storage = { getItem: () => '{', setItem() {}, removeItem() { throw new Error('Removal denied'); } };
    assert.deepEqual(readStoredPrivacyChoice(() => storage, now), { choice: null, canPersist: false });
});

test('never writes an invalid choice to storage', () => {
    const storage = memoryStorage();
    assert.equal(writeStoredPrivacyChoice(() => storage, { ...choice(true), analytics: 'true' }, now), false);
    assert.equal(storage.getItem(PRIVACY_STORAGE_KEY), null);
});

test('removes a stale acceptance if writing a new rejection fails', () => {
    const storage = memoryStorage();
    storage.setItem(PRIVACY_STORAGE_KEY, JSON.stringify(choice(true)));
    storage.setItem('theme', 'dark');
    const unwritable = { ...storage, setItem() { throw new Error('Quota exceeded'); } };
    assert.equal(writeStoredPrivacyChoice(() => unwritable, choice(false), now), false);
    assert.equal(storage.getItem(PRIVACY_STORAGE_KEY), null);
    assert.equal(storage.getItem('theme'), 'dark');
});

test('malformed storage never grants analytics', () => {
    for (const value of [null, '', '{', 'true', 'null', '[]', '{"analytics":true}']) {
        assert.equal(parsePrivacyChoice(value, now), null);
    }
    assert.deepEqual(parsePrivacyChoice(JSON.stringify(choice(false)), now), choice(false));
});

test('normalizes stored input without adopting extra permissions or identifiers', () => {
    assert.deepEqual(validatePrivacyChoice({ ...choice(true), ads: true, visitorId: 'unused' }, now), choice(true));
});

test('cleans only Analytics cookie names and preserves unrelated cookies', () => {
    assert.deepEqual(analyticsCookieNames('_ga=one; _ga_EXAMPLE=two; session=three; _gid=four; _gat_tag=five; other_ga=six'), ['_ga', '_ga_EXAMPLE', '_gid', '_gat_tag']);
    assert.deepEqual(analyticsCookieNames(''), []);
});


test('enables analytics only for an explicit true value', () => {
    for (const value of [true, 'true']) assert.equal(isAnalyticsEnabled(value), true);
    for (const value of [false, 'false', '', undefined, null, '1', 1, 'TRUE', ' true ', {}, [], ['true']]) {
        assert.equal(isAnalyticsEnabled(value), false);
    }
});

test('resolves an optional notification address without claiming a location is a full address', () => {
    for (const value of ['', '   ', undefined, null, true, {}]) {
        const contact = resolvePrivacyContact(value);
        assert.equal(contact.address, PRIVACY_LOCATION);
        assert.equal(contact.addressLabel, 'Ubicación');
        assert.equal(contact.hasConfiguredAddress, false);
    }
    const contact = resolvePrivacyContact('  Calle Ejemplo 123, Colonia Prueba, C. P. 00000  ');
    assert.equal(contact.address, 'Calle Ejemplo 123, Colonia Prueba, C. P. 00000');
    assert.equal(contact.addressLabel, 'Domicilio para oír y recibir notificaciones');
    assert.equal(contact.hasConfiguredAddress, true);
});

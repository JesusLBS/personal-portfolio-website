export const PRIVACY_STORAGE_KEY = 'portfolio-privacy';
export const PRIVACY_VERSION = 1;
export const PRIVACY_MAX_AGE_SECONDS = 180 * 24 * 60 * 60;

export interface PrivacyChoice {
    version: number;
    analytics: boolean;
    updatedAt: number;
}

interface PrivacyStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}

/** Validate the version, explicit choice and lifetime of an untrusted stored preference. */
export function validatePrivacyChoice(value: unknown, now = Date.now()): PrivacyChoice | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    const choice = value as Partial<PrivacyChoice>;
    if (choice.version !== PRIVACY_VERSION || typeof choice.analytics !== 'boolean') return null;
    if (!Number.isSafeInteger(choice.updatedAt) || choice.updatedAt! <= 0 || choice.updatedAt! > now) return null;
    if (now - choice.updatedAt! >= PRIVACY_MAX_AGE_SECONDS * 1000) return null;
    return { version: PRIVACY_VERSION, analytics: choice.analytics, updatedAt: choice.updatedAt! };
}

/** Parse a stored preference, failing closed for malformed or obsolete values. */
export function parsePrivacyChoice(value: string | null, now = Date.now()): PrivacyChoice | null {
    if (!value) return null;
    try {
        return validatePrivacyChoice(JSON.parse(value), now);
    } catch {
        return null;
    }
}

/** Recover a preference safely, including when access to the storage object is blocked. */
export function readStoredPrivacyChoice(getStorage: () => PrivacyStorage, now = Date.now()) {
    try {
        const storage = getStorage();
        const stored = storage.getItem(PRIVACY_STORAGE_KEY);
        const choice = parsePrivacyChoice(stored, now);
        if (stored && !choice) storage.removeItem(PRIVACY_STORAGE_KEY);
        return { choice, canPersist: true };
    } catch {
        return { choice: null, canPersist: false };
    }
}

/** Persist only a valid preference and report failure without preventing an in-memory choice. */
export function writeStoredPrivacyChoice(getStorage: () => PrivacyStorage, value: PrivacyChoice, now = Date.now()): boolean {
    const choice = validatePrivacyChoice(value, now);
    if (!choice) return false;
    let storage: PrivacyStorage | undefined;
    try {
        storage = getStorage();
        storage.setItem(PRIVACY_STORAGE_KEY, JSON.stringify(choice));
        return true;
    } catch {
        // Avoid reviving an older acceptance after an unsuccessful withdrawal.
        try { storage?.removeItem(PRIVACY_STORAGE_KEY); } catch { /* Storage may be fully blocked. */ }
        return false;
    }
}

/** Select only known Google Analytics cookie names, preserving unrelated site cookies. */
export function analyticsCookieNames(cookieHeader: string): string[] {
    return cookieHeader.split(';').map(part => part.trim().split('=')[0] || '')
        .filter(name => /^(_ga(?:_[A-Za-z0-9_]+)?|_gid|_gat(?:_[A-Za-z0-9_]+)?)$/.test(name));
}

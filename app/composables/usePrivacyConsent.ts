import { computed } from 'vue';
import { readStoredPrivacyChoice, writeStoredPrivacyChoice, PRIVACY_STORAGE_KEY, PRIVACY_VERSION, validatePrivacyChoice } from '~/utils/privacyConsent';
import type { PrivacyChoice } from '~/utils/privacyConsent';

export function usePrivacyConsent() {
    const { analyticsEnabled } = usePrivacySettings();
    const choice = useState<PrivacyChoice | null>('privacy-choice', () => null);
    const isReady = useState('privacy-ready', () => false);
    const isPreferencesOpen = useState('privacy-preferences-open', () => false);
    const returnFocusId = useState<string | null>('privacy-return-focus', () => null);
    const canPersist = useState('privacy-can-persist', () => true);
    const hasTransientChoice = useState('privacy-transient-choice', () => false);
    const showBanner = computed(() => analyticsEnabled.value && isReady.value && choice.value === null);

    const loadChoice = (synchronize = false) => {
        if (!analyticsEnabled.value) return;
        // A failed write can leave an older, opposite choice in storage.
        // Visibility changes must preserve the explicit in-memory decision.
        if (!synchronize && hasTransientChoice.value && validatePrivacyChoice(choice.value)) {
            isReady.value = true;
            return;
        }
        const stored = readStoredPrivacyChoice(() => localStorage);
        const next = stored.choice;
        canPersist.value = stored.canPersist;
        hasTransientChoice.value = false;
        if (choice.value?.updatedAt !== next?.updatedAt || choice.value?.analytics !== next?.analytics) {
            choice.value = next;
        }
        isReady.value = true;
    };

    const saveChoice = (analytics: boolean) => {
        if (!analyticsEnabled.value) return;
        const next = { version: PRIVACY_VERSION, analytics, updatedAt: Date.now() };
        canPersist.value = writeStoredPrivacyChoice(() => localStorage, next);
        hasTransientChoice.value = !canPersist.value;
        choice.value = next;
        isPreferencesOpen.value = false;
    };

    const openPreferences = (triggerId: string) => {
        if (!analyticsEnabled.value) return;
        returnFocusId.value = triggerId;
        isPreferencesOpen.value = true;
    };

    const expireChoice = () => {
        if (!analyticsEnabled.value) return;
        if (choice.value && !validatePrivacyChoice(choice.value)) {
            try { localStorage.removeItem(PRIVACY_STORAGE_KEY); } catch { canPersist.value = false; }
            choice.value = null;
            hasTransientChoice.value = false;
        }
    };

    return { choice, isReady, showBanner, isPreferencesOpen, returnFocusId, canPersist, loadChoice, saveChoice, openPreferences, expireChoice };
}

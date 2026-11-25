import { nextTick, watch } from 'vue';
import { analyticsCookieNames, PRIVACY_MAX_AGE_SECONDS, PRIVACY_STORAGE_KEY, validatePrivacyChoice } from '~/utils/privacyConsent';

export default defineNuxtPlugin((nuxtApp) => {
    const { analyticsEnabled } = usePrivacySettings();
    const { choice, canPersist, loadChoice, expireChoice } = usePrivacyConsent();
    const { gtag, initialize, enableAnalytics, disableAnalytics } = useGtag();
    const route = useRoute();
    const config = useRuntimeConfig().public.gtag as { id?: string } | undefined;
    const tagId = config?.id || '';
    const validTagId = /^G-[A-Z0-9]+$/.test(tagId) && tagId !== 'G-XXXXXXXXXX';
    const trackingAvailable = analyticsEnabled.value && import.meta.env.PROD && validTagId;
    let activated = false;

    const clearAnalyticsCookies = () => {
        const hostParts = location.hostname.split('.');
        const domains = new Set(['', location.hostname]);
        for (let index = 0; index < hostParts.length - 1; index++) {
            domains.add(hostParts.slice(index).join('.'));
        }
        try {
            for (const name of analyticsCookieNames(document.cookie)) {
                for (const domain of domains) {
                    document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
                    if (domain) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
                }
            }
        } catch {
            // Browsers may block cookie access; tracking still remains disabled.
        }
    };

    const applyChoice = async () => {
        const allowed = validatePrivacyChoice(choice.value)?.analytics === true;
        if (!allowed) {
            if (trackingAvailable) disableAnalytics(tagId);
            clearAnalyticsCookies();
            if (activated) {
                activated = false;
                // Without persistence a reload would lose the user's current decision.
                // Keep ga-disable active in this document instead; the dialog explains the limitation.
                if (!canPersist.value) return;
                // Reload discards the tag; verify actual unload traffic with Google after deployment.
                await nextTick();
                location.reload();
            }
            return;
        }
        if (!trackingAvailable || activated) return;
        activated = true;
        enableAnalytics(tagId);
        gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
        });
        gtag('config', tagId, {
            send_page_view: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            cookie_expires: PRIVACY_MAX_AGE_SECONDS,
            cookie_update: false,
        });
        initialize(tagId);
    };

    onNuxtReady(() => {
        if (!analyticsEnabled.value) {
            if (validTagId) disableAnalytics(tagId);
            clearAnalyticsCookies();
            return;
        }
        let expiryTimer: number | undefined;
        const scheduleExpiry = () => {
            window.clearTimeout(expiryTimer);
            const current = validatePrivacyChoice(choice.value);
            if (!current) return;
            const remaining = current.updatedAt + PRIVACY_MAX_AGE_SECONDS * 1000 - Date.now();
            // Long timeouts are chained to stay within the browser's signed 32-bit timer limit.
            expiryTimer = window.setTimeout(() => {
                expireChoice();
                scheduleExpiry();
            }, Math.max(0, Math.min(remaining, 2_147_483_647)));
        };
        const stopChoiceWatch = watch(choice, () => {
            scheduleExpiry();
            void applyChoice();
        }, { flush: 'sync' });
        loadChoice();
        scheduleExpiry();
        void applyChoice();
        const stopRouteWatch = watch(() => route.fullPath, expireChoice);
        const handleStorage = (event: StorageEvent) => {
            if (event.key === PRIVACY_STORAGE_KEY || event.key === null) loadChoice(true);
        };
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                expireChoice();
                loadChoice();
            }
        };
        window.addEventListener('storage', handleStorage);
        document.addEventListener('visibilitychange', handleVisibility);
        nuxtApp.vueApp.onUnmount(() => {
            stopChoiceWatch();
            stopRouteWatch();
            window.clearTimeout(expiryTimer);
            window.removeEventListener('storage', handleStorage);
            document.removeEventListener('visibilitychange', handleVisibility);
        });
    });
});

import { computed } from 'vue';
import { isAnalyticsEnabled, resolvePrivacyContact } from '~/utils/privacyContent';

export function usePrivacySettings() {
    const config = useRuntimeConfig();
    const analyticsEnabled = computed(() => isAnalyticsEnabled(config.public.analyticsEnabled));
    const privacyContact = computed(() => resolvePrivacyContact(config.public.privacyAddress));
    return { analyticsEnabled, privacyContact };
}

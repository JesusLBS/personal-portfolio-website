import { computed } from 'vue';
import { resolveCalendlyUrl } from '~/utils/scheduling';

export function useScheduling() {
    const config = useRuntimeConfig();
    const calendlyUrl = computed(() => resolveCalendlyUrl(config.public.calendlyUrl));
    return { calendlyUrl };
}

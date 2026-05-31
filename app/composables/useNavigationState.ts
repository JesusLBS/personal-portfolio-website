import { ref, computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

/**
 * @returns Navigation state refs and observer controls
 */
export function useNavigationState() {
    const route = useRoute();
    const activeSection = ref<string>('');
    const isDrawerOpen = useState('drawer-open', () => false);

    const isExactlyAtServices = computed(() => route.path === '/services');
    const isClientMode = computed(() =>
        route.path === '/services' || route.query.mode === 'client'
    );

    let observer: IntersectionObserver | null = null;

    /**
     * @param sectionIds - Array of anchor hrefs (e.g. ['#about', '#contact'])
     */
    const observeSections = (sectionIds: string[]) => {
        if (typeof window === 'undefined') return;

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        activeSection.value = `#${entry.target.id}`;
                    }
                });
            },
            { threshold: 0.3 }
        );

        sectionIds.forEach((id) => {
            const el = document.querySelector(id);
            if (el) observer?.observe(el);
        });
    };

    const stopObserving = () => observer?.disconnect();

    onUnmounted(() => stopObserving());

    return {
        isExactlyAtServices,
        isClientMode,
        activeSection,
        isDrawerOpen,
        observeSections,
        stopObserving,
    };
}
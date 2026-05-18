import { computed } from 'vue';
import { useRoute } from 'vue-router';

export const useNavigationState = () => {
    const route = useRoute();

    const isExactlyAtServices = computed(() => route.path === '/services');

    const isClientMode = computed(() => {
        return isExactlyAtServices.value || route.query.mode === 'client';
    });

    return {
        isExactlyAtServices,
        isClientMode
    };
};
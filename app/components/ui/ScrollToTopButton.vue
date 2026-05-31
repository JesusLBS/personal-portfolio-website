<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { useNavigationState } from '~/composables/useNavigationState';

const { isDrawerOpen } = useNavigationState();
const scrollY = ref(0);

const handleScroll = () => { scrollY.value = window.scrollY; };
const isAtTop = computed(() => scrollY.value < 100);

const scrollAction = () => {
    if (isAtTop.value) {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
console.log(isDrawerOpen)
onMounted(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <Transition name="fade">
        <button
            type="button"
            aria-label="Scroll action"
            @click="scrollAction"
            :class="[
                'fixed right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full',
                'border border-zinc-700 bg-zinc-900/80 text-white shadow-lg backdrop-blur-md',
                'transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-400',
                isDrawerOpen ? 'bottom-28 md:bottom-6' : 'bottom-6'
            ]"
        >
            <Icon :name="isAtTop ? 'i-heroicons-arrow-down' : 'i-heroicons-arrow-up'" class="h-5 w-5" />
        </button>
    </Transition>
</template>
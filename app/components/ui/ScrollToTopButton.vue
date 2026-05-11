<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue';

const scrollY = ref(0);

const handleScroll = () => {
    scrollY.value = window.scrollY;
};

const isAtTop = computed(() => scrollY.value < 100);

const isAtBottom = computed(() => {
    return window.innerHeight + scrollY.value >= document.documentElement.scrollHeight - 50;
});

const scrollAction = () => {
    if (isAtTop.value) {
        // scroll down
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    } else {
        // scroll up
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
};

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
        <button type="button" aria-label="Scroll action" @click="scrollAction" class="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full
             border border-zinc-700 bg-zinc-900/80 text-white shadow-lg backdrop-blur-md
             transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-400">
            <Icon :name="isAtTop ? 'i-heroicons-arrow-down' : 'i-heroicons-arrow-up'" class="h-5 w-5" />
        </button>
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
<script setup lang="ts">
import { ref } from 'vue';
import { useNavigationState } from '~/composables/useNavigationState';

const { isClientMode } = useNavigationState();

const whatsappUrl = 'https://wa.me/525529983634?text=Hola%20Jesus,%20me%20interesa%20cotizar%20un%20proyecto%20de%20software.';

const isOpen = ref(false);

const toggleTooltip = () => {
    isOpen.value = !isOpen.value;
};

const closeTooltip = () => {
    setTimeout(() => {
        isOpen.value = false;
    }, 300);
};
</script>

<template>
    <div v-if="isClientMode" class="fixed bottom-24 right-6 z-50 hidden md:flex flex-row-reverse items-center gap-3">

        <button type="button" @click="toggleTooltip" aria-label="Abrir opciones de WhatsApp"
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-500 hover:shadow-emerald-500/20 group relative">
            <span class="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping opacity-75 -z-10" />
            <Icon :name="isOpen ? 'ri:close-line' : 'ri:whatsapp-line'"
                class="h-5 w-5 transition-transform group-hover:scale-110" />
        </button>

        <Transition name="slide-left">
            <div v-if="isOpen" @mouseleave="closeTooltip"
                class="w-56 rounded-xl border border-zinc-800 bg-zinc-950/90 p-3.5 shadow-2xl backdrop-blur-md">
                <p class="text-[11px] font-medium text-zinc-300 leading-normal">
                    ¿Quieres iniciar un chat con Jesús por WhatsApp?
                </p>
                <div class="mt-2.5 flex gap-2">
                    <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" @click="isOpen = false"
                        class="flex-1 rounded-lg bg-emerald-600 py-1.5 text-center text-[10px] font-bold text-white transition hover:bg-emerald-500 shadow-sm">
                        Chatear ahora
                    </a>
                    <button @click="isOpen = false"
                        class="rounded-lg border border-zinc-800 px-2 py-1.5 text-[10px] font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
                        Cancelar
                    </button>
                </div>
            </div>
        </Transition>

    </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
    opacity: 0;
    transform: translateX(12px) scale(0.98);
}
</style>
<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';

const { choice, isPreferencesOpen, returnFocusId, canPersist, saveChoice } = usePrivacyConsent();
const dialog = ref<HTMLDialogElement | null>(null);
const closeButton = ref<HTMLButtonElement | null>(null);
const analytics = ref(false);
let previousOverflow: string | null = null;

const close = () => { isPreferencesOpen.value = false; };
const restoreScroll = () => {
    if (previousOverflow !== null) {
        document.documentElement.style.overflow = previousOverflow;
        previousOverflow = null;
    }
};
const handleClose = () => {
    close();
    restoreScroll();
    const trigger = returnFocusId.value ? document.getElementById(returnFocusId.value) : null;
    (trigger || document.getElementById('privacy-footer-preferences'))?.focus({ preventScroll: true });
    returnFocusId.value = null;
};

watch(isPreferencesOpen, async (open) => {
    if (!open) {
        dialog.value?.close();
        return;
    }
    analytics.value = choice.value?.analytics === true;
    await nextTick();
    if (!isPreferencesOpen.value || !dialog.value) return;
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    dialog.value.showModal();
    closeButton.value?.focus();
});
onBeforeUnmount(() => { dialog.value?.close(); if (import.meta.client) restoreScroll(); });
</script>

<template>
    <dialog ref="dialog" aria-labelledby="privacy-preferences-title" data-privacy-dialog
        class="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100vw-2rem)] max-w-xl overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-white shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm sm:p-6"
        @close="handleClose" @cancel.prevent="close" @click="event => { if (event.target === dialog) close(); }">
        <div class="flex items-start justify-between gap-4">
            <h2 id="privacy-preferences-title" class="text-xl font-semibold">Preferencias de privacidad</h2>
            <button ref="closeButton" type="button" autofocus aria-label="Cerrar preferencias"
                class="shrink-0 rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                @click="close">Cerrar</button>
        </div>
        <p class="mt-4 text-sm leading-6 text-zinc-300">Elige si permites estadísticas de uso. Rechazarlas no limita el portfolio.</p>
        <div class="mt-5 space-y-4">
            <div class="rounded-xl border border-zinc-800 p-4">
                <p class="font-medium">Preferencia necesaria</p>
                <p class="mt-2 text-sm leading-6 text-zinc-400">Guardamos tu elección en este navegador durante 180 días para recordarla. No contiene un identificador de visitante.</p>
            </div>
            <label class="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800 p-4">
                <input v-model="analytics" type="checkbox" data-privacy-analytics
                    class="mt-1 h-5 w-5 shrink-0 accent-cyan-400" aria-describedby="privacy-analytics-description">
                <span>
                    <span class="block font-medium">Analítica opcional</span>
                    <span id="privacy-analytics-description" class="mt-2 block text-sm leading-6 text-zinc-400">Google Analytics mide visitas e interacciones. Este sitio no utiliza campañas ni solicita consentimiento para publicidad.</span>
                </span>
            </label>
        </div>
        <p v-if="!canPersist" role="status" class="mt-4 text-sm leading-6 text-amber-300">No hemos podido guardar o recuperar tu elección. Se aplica en esta página mientras esté abierta. Si retiras la analítica ya cargada, se deshabilita sin recargar para conservar tu decisión. Al recargar o volver a entrar, se consultará de nuevo el almacenamiento disponible.</p>
        <div class="mt-5 flex flex-wrap gap-3">
            <button type="button" data-privacy-save
                class="rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                @click="saveChoice(analytics)">Guardar preferencias</button>
            <button type="button" data-privacy-withdraw
                class="rounded-lg border border-zinc-600 px-4 py-2.5 text-sm font-semibold hover:border-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                @click="saveChoice(false)">Rechazar analítica</button>
        </div>
        <NuxtLink to="/privacidad" class="mt-5 inline-block text-sm text-zinc-400 underline underline-offset-4 hover:text-white" @click="close">Leer aviso de privacidad</NuxtLink>
    </dialog>
</template>

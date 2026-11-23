<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import { useCv } from '~/composables/useCv';

const { cvUrl, downloadName, isPreviewOpen, previewTriggerId } = useCv();
const route = useRoute();
const titleId = `cv-preview-title-${useId()}`;
const dialog = ref<HTMLDialogElement | null>(null);
const closeButton = ref<HTMLButtonElement | null>(null);
const isLoading = ref(true);
let returnFocus: HTMLElement | null = null;
let previousOverflow: string | null = null;

const restoreScroll = () => {
    if (previousOverflow !== null) {
        document.documentElement.style.overflow = previousOverflow;
        previousOverflow = null;
    }
};

const close = () => { isPreviewOpen.value = false; };

const handleClose = () => {
    close();
    restoreScroll();
    if (returnFocus?.isConnected) returnFocus.focus();
    else document.querySelector<HTMLButtonElement>('#drawer-toggle')?.focus();
    returnFocus = null;
    previewTriggerId.value = null;
};

watch(isPreviewOpen, async (isOpen) => {
    if (!isOpen) {
        dialog.value?.close();
        return;
    }

    returnFocus = previewTriggerId.value ? document.getElementById(previewTriggerId.value) : null;
    isLoading.value = true;
    await nextTick();
    if (!isPreviewOpen.value || !dialog.value) return;

    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    dialog.value.showModal();
    closeButton.value?.focus();
});

watch(() => route.fullPath, close);
onBeforeUnmount(() => {
    dialog.value?.close();
    if (import.meta.client) restoreScroll();
    isPreviewOpen.value = false;
});
</script>

<template>
    <dialog ref="dialog" :aria-labelledby="titleId"
        class="fixed inset-0 m-auto h-[90dvh] max-h-[90dvh] w-[calc(100vw-2rem)] max-w-5xl overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950 p-0 text-white shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        @close="handleClose" @cancel.prevent="close" @click="event => { if (event.target === dialog) close(); }">
        <div class="flex h-full min-h-0 flex-col">
            <header class="flex shrink-0 items-center justify-between gap-4 border-b border-zinc-800 px-4 py-3 sm:px-6">
                <h2 :id="titleId" class="text-lg font-semibold">Currículum</h2>
                <button ref="closeButton" type="button" autofocus aria-label="Cerrar previsualización del CV"
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                    @click="close">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" class="h-5 w-5">
                        <path d="m6 6 12 12M6 18 18 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </button>
            </header>

            <div class="relative min-h-0 flex-1 bg-zinc-900">
                <p v-if="isPreviewOpen && isLoading" role="status"
                    class="pointer-events-none absolute inset-0 flex items-center justify-center bg-zinc-900 text-sm text-zinc-300">
                    Cargando CV…
                </p>
                <iframe v-if="isPreviewOpen" :src="cvUrl" title="CV de Jesus Chicho Hernández"
                    class="h-full w-full border-0" @load="isLoading = false" />
            </div>

            <footer class="shrink-0 border-t border-zinc-800 p-4 sm:px-6">
                <p class="text-sm text-zinc-400">También puedes abrir el CV en otra pestaña o descargarlo.</p>
                <div class="mt-3 flex flex-wrap gap-3">
                    <a :href="cvUrl" :download="downloadName" data-cv-download
                        class="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400">
                        Descargar PDF
                    </a>
                    <a :href="cvUrl" target="_blank" rel="noopener noreferrer" data-cv-open
                        class="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400">
                        Abrir en otra pestaña
                    </a>
                </div>
            </footer>
        </div>
    </dialog>
</template>

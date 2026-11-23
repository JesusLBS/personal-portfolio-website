<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useId, watch } from 'vue';
import { useCv } from '~/composables/useCv';

const props = withDefaults(defineProps<{
    variant?: 'default' | 'compact' | 'footer' | 'drawer';
    placement?: 'top' | 'bottom';
    align?: 'left' | 'right';
}>(), {
    variant: 'default',
    placement: 'bottom',
    align: 'left',
});

const emit = defineEmits<{ action: [] }>();
const { cvUrl, downloadName, isPreviewOpen, previewTriggerId } = useCv();
const route = useRoute();
const panelId = `cv-actions-${useId()}`;
const root = ref<HTMLElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
const panel = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const opensAbove = ref(props.placement === 'top');
const panelLeft = ref('0px');

const buttonClasses = computed(() => ({
    default: 'rounded-xl border-zinc-700 px-6 py-3 font-semibold text-white hover:border-zinc-500 hover:bg-zinc-900',
    compact: 'rounded-lg border-zinc-700 px-4 py-2 text-sm font-medium text-white hover:border-zinc-500 hover:bg-zinc-900',
    footer: 'rounded-full border-cyan-400 px-4 py-2 text-sm text-cyan-400 hover:bg-cyan-400 hover:text-zinc-950',
    drawer: 'w-full rounded-lg border-zinc-700 px-4 py-3 text-sm font-medium text-white hover:border-zinc-500 hover:bg-zinc-900',
})[props.variant]);

const closeMenu = (restoreFocus = false) => {
    isOpen.value = false;
    if (restoreFocus) trigger.value?.focus();
};

const openMenu = async (focusFirst = false) => {
    isOpen.value = true;
    await nextTick();
    if (!panel.value || !root.value) return;

    const anchor = root.value.getBoundingClientRect();
    const { width, height } = panel.value.getBoundingClientRect();
    const desiredLeft = props.align === 'right' ? anchor.right - width : anchor.left;
    const left = Math.max(16, Math.min(desiredLeft, document.documentElement.clientWidth - width - 16));
    panelLeft.value = `${left - anchor.left}px`;
    const fitsAbove = anchor.top >= height + 8;
    const fitsBelow = window.innerHeight - anchor.bottom >= height + 8;
    opensAbove.value = props.placement === 'top' ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove;

    if (focusFirst) {
        panel.value?.querySelector<HTMLElement>('button, a')?.focus();
    }
};

const handleOutsideClick = (event: PointerEvent) => {
    if (!root.value?.contains(event.target as Node)) closeMenu();
};

const handleFocusOut = (event: FocusEvent) => {
    if (!root.value?.contains(event.relatedTarget as Node | null)) closeMenu();
};

const preview = () => {
    closeMenu(true);
    previewTriggerId.value = root.value?.closest('#mobile-drawer') ? 'drawer-toggle' : trigger.value?.id ?? null;
    isPreviewOpen.value = true;
    emit('action');
};

const followLink = () => {
    closeMenu(true);
    emit('action');
};

watch(() => route.fullPath, () => closeMenu());
const handleResize = () => closeMenu();
onMounted(() => {
    document.addEventListener('pointerdown', handleOutsideClick);
    window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
    document.removeEventListener('pointerdown', handleOutsideClick);
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <div ref="root" class="relative inline-flex" :class="variant === 'drawer' ? 'w-full' : 'w-fit'"
        @focusout="handleFocusOut" @keydown.esc.stop.prevent="closeMenu(true)">
        <button :id="`${panelId}-trigger`" ref="trigger" type="button" :aria-expanded="isOpen" :aria-controls="panelId"
            aria-label="Opciones del CV" data-cv-trigger
            class="inline-flex items-center justify-center gap-2 border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            :class="buttonClasses" @click="isOpen ? closeMenu() : openMenu()"
            @keydown.down.prevent="openMenu(true)">
            CV
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" class="h-4 w-4 shrink-0 transition-transform"
                :class="isOpen ? 'rotate-180' : ''">
                <path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>

        <div v-if="isOpen" :id="panelId" ref="panel" role="group" aria-label="Acciones del CV"
            class="absolute z-[60] w-60 max-w-[calc(100vw-3rem)] rounded-xl border border-zinc-700 bg-zinc-950 p-1.5 text-sm text-zinc-200 shadow-xl"
            :class="opensAbove ? 'bottom-full mb-2' : 'top-full mt-2'" :style="{ left: panelLeft }">
            <button type="button" data-cv-preview
                class="flex w-full items-center rounded-lg px-3 py-3 text-left transition hover:bg-zinc-800 hover:text-white focus-visible:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                @click="preview">
                Previsualizar CV
            </button>
            <a :href="cvUrl" :download="downloadName" data-cv-download
                class="flex items-center rounded-lg px-3 py-3 transition hover:bg-zinc-800 hover:text-white focus-visible:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                @click="followLink">
                Descargar PDF
            </a>
            <a :href="cvUrl" target="_blank" rel="noopener noreferrer" data-cv-open
                class="flex items-center rounded-lg px-3 py-3 transition hover:bg-zinc-800 hover:text-white focus-visible:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                @click="followLink">
                Abrir en otra pestaña
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
const { calendlyUrl } = useScheduling();
const { data, status, error } = useFetch<{ allowed: boolean }>('/api/scheduling-country', {
    key: 'scheduling-country',
    server: false,
    lazy: true,
    immediate: Boolean(calendlyUrl.value),
    default: () => ({ allowed: false }),
    cache: 'no-store',
    retry: 0,
    timeout: 3000,
});
const canSchedule = computed(() => Boolean(calendlyUrl.value)
    && status.value === 'success' && !error.value && data.value?.allowed === true);
</script>

<template>
    <div v-if="canSchedule" data-contact-scheduling class="mx-auto mt-6 max-w-md">
        <a :href="calendlyUrl" target="_blank" rel="noopener noreferrer"
            class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/50 px-5 py-3 text-sm font-semibold text-white transition hover:border-zinc-500 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 sm:w-auto">
            <Icon name="ri:calendar-line" class="shrink-0 text-base text-cyan-400" aria-hidden="true" />
            <span>Agendar una conversación</span>
            <span class="sr-only">en Calendly, se abre en otra pestaña</span>
        </a>
        <p class="mt-3 text-xs leading-5 text-zinc-400">
            Reuniones en español · Atención en México.<br>
            La reserva se realiza en Calendly.
        </p>
    </div>
</template>

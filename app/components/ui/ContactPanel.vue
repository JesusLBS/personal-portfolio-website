<script setup lang="ts">
import ContactPrivacyNotice from '~/components/privacy/ContactPrivacyNotice.vue';
import ContactScheduling from '~/components/ui/ContactScheduling.vue';

withDefaults(defineProps<{
    title: string;
    subtitle?: string;
    description: string;
    eyebrow?: string;
    emailLabel?: string;
}>(), { emailLabel: 'Enviar mensaje' });
const { privacyContact } = usePrivacySettings();
</script>

<template>
    <section class="relative overflow-hidden px-6 py-28" data-contact-panel>
        <div class="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[100px]" />

        <div class="mx-auto max-w-5xl rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/60 to-zinc-950/20 px-8 py-16 text-center backdrop-blur-sm sm:px-16">
            <p v-if="eyebrow" class="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">
                {{ eyebrow }}
            </p>

            <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {{ title }}
                <template v-if="subtitle">
                    <br>
                    <span class="text-2xl font-medium text-zinc-400 sm:text-3xl">{{ subtitle }}</span>
                </template>
            </h2>

            <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
                {{ description }}
            </p>

            <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a :href="`mailto:${privacyContact.email}`"
                    class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-md transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 sm:w-auto">
                    <Icon name="ri:mail-send-line" class="shrink-0 text-base" aria-hidden="true" />
                    {{ emailLabel }}
                </a>

                <a href="https://wa.me/525529983634" target="_blank" rel="noopener noreferrer"
                    class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/50 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-zinc-500 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 sm:w-auto">
                    <Icon name="ri:whatsapp-line" class="shrink-0 text-base text-emerald-400" aria-hidden="true" />
                    WhatsApp directo
                </a>
            </div>

            <slot name="secondary-links" />

            <ContactScheduling />
            <ContactPrivacyNotice />

            <slot name="details" />
        </div>
    </section>
</template>

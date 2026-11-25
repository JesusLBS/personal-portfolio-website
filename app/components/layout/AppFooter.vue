<script setup lang="ts">
import { computed } from 'vue';
import CvActions from '../ui/CvActions.vue';
const { openPreferences } = usePrivacyConsent();
const { analyticsEnabled } = usePrivacySettings();

const currentYear = new Date().getFullYear();

const lastUpdated = '2026-11-23';

const formattedLastUpdated = computed(() => {
    const date = new Date(`${lastUpdated}T00:00:00`);

    return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/JesusLBS/',
        icon: 'i-simple-icons-github',
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/jesus-chicho-hernandez/',
        icon: 'i-simple-icons-linkedin',
    },
];
</script>

<template>
    <footer class="border-t border-zinc-800 bg-zinc-950">
        <div class="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-start lg:justify-between">

            <div class="space-y-4">
                <div>
                    <h2 class="text-2xl font-bold text-white">
                        Jesus
                        <span class="text-cyan-400">Chicho</span>
                        Hernández
                    </h2>

                    <p class="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
                        Full Stack Software Engineer · Laravel · Vue.js · Angular · APIs REST
                    </p>
                </div>

                <div class="flex items-center gap-4">
                    <a v-for="social in socialLinks" :key="social.name" :href="social.href" target="_blank"
                        rel="noopener noreferrer" class="text-zinc-400 transition hover:text-cyan-400">
                        <span class="sr-only">
                            {{ social.name }}
                        </span>

                        <Icon :name="social.icon" class="h-5 w-5" />
                    </a>
                </div>
            </div>

            <div class="grid gap-6 text-sm text-zinc-400">
                <a href="mailto:chichohdzjesus@gmail.com" class="transition hover:text-cyan-400">
                    chichohdzjesus@gmail.com
                </a>

                <a href="tel:+525529983634" class="transition hover:text-cyan-400">
                    +52 55 2998 3634
                </a>

                <CvActions variant="footer" placement="top" />
            </div>
        </div>

        <div class="border-t border-zinc-800">
            <nav aria-label="Privacidad" class="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-3 px-6 pt-5 text-sm text-zinc-400">
                <NuxtLink to="/privacidad" class="hover:text-white">Aviso de privacidad</NuxtLink>
                <NuxtLink to="/cookies" class="hover:text-white">Cookies</NuxtLink>
                <button v-if="analyticsEnabled" id="privacy-footer-preferences" type="button" class="text-left hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                    @click="openPreferences('privacy-footer-preferences')">Preferencias de privacidad</button>
            </nav>
            <div
                class="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 text-xs text-zinc-400 md:flex-row md:items-center md:justify-between">

                <p>
                    © {{ currentYear }} Jesus Chicho Hernández. Todos los derechos reservados.
                </p>

                <p>
                    Desarrollado con Nuxt 4 + Vue 3 + TailwindCSS
                </p>

                <p>
                    Última actualización: {{ formattedLastUpdated }}
                </p>

            </div>
        </div>
    </footer>
</template>

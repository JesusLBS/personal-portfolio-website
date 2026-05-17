<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isExactlyAtServices = computed(() => route.path === '/services');

const isClientMode = computed(() => {
    return isExactlyAtServices.value || route.query.mode === 'client';
});

const technicalLinks = [
    { label: 'Sobre mí', href: '#about' },
    { label: 'Experiencia', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Arquitectura', href: '#architecture' },
    { label: 'Contacto', href: '#contact' },
];

const servicesLinks = [
    { label: 'Inicio', href: '#hero-services' },
    { label: 'Servicios', href: '#services-list' },
    { label: 'Mi Proceso', href: '#process' },
    { label: 'Contacto', href: '#contact-cta' },
];

const currentLinks = computed(() => isExactlyAtServices.value ? servicesLinks : technicalLinks);
</script>

<template>
    <header class="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

            <NuxtLink to="/" class="text-sm font-semibold tracking-wide text-white">
                Jesus Chicho
            </NuxtLink>

            <nav class="hidden items-center gap-8 md:flex">
                <a v-for="link in currentLinks" :key="link.href" :href="link.href"
                    class="text-sm text-zinc-400 transition hover:text-white">
                    {{ link.label }}
                </a>
            </nav>

            <div class="flex items-center gap-6">

                <NuxtLink v-if="isExactlyAtServices" :to="{ path: '/', query: { mode: 'client' } }"
                    class="text-sm font-medium text-zinc-400 transition hover:text-white">
                    Ver Perfil Técnico →
                </NuxtLink>

                <NuxtLink v-else-if="isClientMode" to="/services"
                    class="text-sm font-medium text-blue-400 transition hover:text-blue-300">
                    ← Volver a Servicios
                </NuxtLink>

                <span v-if="isClientMode" class="h-4 w-[1px] bg-zinc-800" />

                <a v-if="!isClientMode" href="/files/cv_jesus_chicho_hernandez.pdf" target="_blank"
                    class="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-900">
                    Descargar CV
                </a>

                <a v-else :href="isExactlyAtServices ? '#contact-cta' : '/services#contact-cta'"
                    class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
                    Cotizar Proyecto
                </a>
            </div>

        </div>
    </header>
</template>
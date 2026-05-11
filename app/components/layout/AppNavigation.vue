<script setup lang="ts">
const links = [
    {
        label: 'Sobre mí',
        href: '#about',
    },
    {
        label: 'Experiencia',
        href: '#experience',
    },
    {
        label: 'Proyectos',
        href: '#projects',
    },
    {
        label: 'Skills',
        href: '#skills',
    },
    {
        label: 'Contacto',
        href: '#contact',
    },
];
</script>

<template>
    <header class="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

            <a href="/" class="text-sm font-semibold tracking-wide text-white">
                Jesus Chicho
            </a>

            <nav class="hidden items-center gap-8 md:flex">
                <a v-for="link in links" :key="link.href" :href="link.href"
                    class="text-sm text-zinc-400 transition hover:text-white">
                    {{ link.label }}
                </a>
            </nav>

            <a href="/files/cv_jesus_chicho_hernandez.pdf" target="_blank"
                class="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-900">
                Descargar CV
            </a>

        </div>
    </header>
</template>
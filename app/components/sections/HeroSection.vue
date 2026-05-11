<script setup lang="ts">
import AppContainer from '../ui/AppContainer.vue';

const technologies = [
    'Laravel',
    'Node.js',
    'Vue.js',
    'Angular',
    'TypeScript',
    'Python',
    'Azure',
    'Docker',
];
</script>

<template>
    <section id="home" class="relative overflow-hidden border-b border-zinc-800 py-32">
        <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.15),transparent_40%)]" />

        <AppContainer>
            <div class="flex flex-col gap-12">
                <div class="max-w-4xl">
                    <!-- Badge -->
                    <div
                        class="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                        <span class="h-2 w-2 rounded-full bg-cyan-400" />

                        Disponible para nuevas oportunidades
                    </div>

                    <!-- Title -->
                    <h1 class="text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
                        Software Engineer
                        construyendo aplicaciones
                        full stack escalables.
                    </h1>

                    <!-- Description -->
                    <p class="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
                        Ingeniero especializado en arquitectura de sistemas,
                        modernización de aplicaciones e integración de servicios.
                        Experiencia desarrollando soluciones backend y frontend
                        utilizando Laravel, Node.js, Vue.js, Angular y Python.
                    </p>

                    <!-- Actions -->
                    <div class="mt-10 flex flex-wrap gap-4">
                        <a href="#contact"
                            class="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:scale-[1.02]">
                            Contacto
                        </a>

                        <a href="/files/cv_jesus_chicho_hernandez.pdf" target="_blank"
                            class="rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-white transition hover:border-zinc-500 hover:bg-zinc-900">
                            Descargar CV
                        </a>
                    </div>
                </div>

                <!-- Tech stack -->
                <div class="flex flex-wrap gap-3">
                    <span v-for="technology in technologies" :key="technology"
                        class="rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-300">
                        {{ technology }}
                    </span>
                </div>
            </div>
        </AppContainer>
    </section>
</template>
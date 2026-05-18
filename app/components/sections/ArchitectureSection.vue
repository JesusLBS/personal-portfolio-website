<script setup lang="ts">

const architectureItems = [
    {
        category: 'Full Stack Architecture',
        title: 'Water System - Technical Overview',
        description:
            'Diagrama general del sistema mostrando arquitectura frontend y backend, flujo de comunicación, stack tecnológico y organización modular del proyecto.',
        stack: [
            'React',
            'TypeScript',
            'Node.js',
            'Express',
            'MySQL',
            'JWT',
            'REST API',
        ],
        image: '/images/water-system-architecture-overview.png',
    },
    {
        category: 'Backend Architecture',
        title: 'Water System API - System Design Overview',
        description:
            'Diagrama general del backend mostrando arquitectura modular, flujo de request, separación por capas y comunicación con la base de datos.',
        stack: [
            'Node.js',
            'Express',
            'MySQL',
            'Sequelize',
            'JWT',
            'REST API',
        ],
        image: '/images/water-system-backend-architecture-overview.png',
    },
];
</script>

<template>
    <section id="architecture" class="border-b border-zinc-900 px-6 py-24">
        <div class="mx-auto max-w-7xl">

            <div class="mb-16">
                <p class="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-300 font-mono">
                    Architecture
                </p>

                <h2 class="text-4xl font-bold text-white">
                    System Design & Technical Overview
                </h2>

                <p class="mt-4 max-w-3xl leading-8 text-zinc-300">
                    Diagramas técnicos y visuales sobre la arquitectura,
                    estructura modular y flujo general de los proyectos.
                </p>
            </div>

            <div class="grid gap-8 lg:grid-cols-3">
                <article v-for="item in architectureItems" :key="item.title"
                    class="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg">

                    <div class="mb-4">
                        <p class="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold">
                            {{ item.category }}
                        </p>

                        <h3 class="mt-2 text-xl font-semibold text-white">
                            {{ item.title }}
                        </h3>
                    </div>

                    <div class="overflow-hidden rounded-2xl border border-zinc-800">
                        <a :href="item.image" data-fancybox="architecture-gallery"
                            class="block overflow-hidden rounded-2xl border border-zinc-800">
                            <NuxtImg :src="item.image" :alt="item.title" width="900" height="600" loading="lazy"
                                format="webp" densities="1x 2x"
                                class="h-[240px] w-full object-cover transition duration-300 hover:scale-[1.02]" />
                        </a>
                    </div>

                    <p class="mt-4 text-sm leading-7 text-zinc-300 font-light">
                        {{ item.description }}
                    </p>

                    <div class="mt-4 flex flex-wrap gap-2">
                        <span v-for="tech in item.stack" :key="tech"
                            class="rounded-full border border-zinc-700 bg-zinc-950/40 px-3 py-1 text-xs text-zinc-200">
                            {{ tech }}
                        </span>
                    </div>

                </article>
            </div>

        </div>
    </section>
</template>
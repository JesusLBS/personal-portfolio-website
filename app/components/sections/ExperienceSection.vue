<script setup lang="ts">
const experiences = [
    {
        company: 'SWYTI',
        role: 'Senior Systems Developer',
        period: 'Mayo 2025 - Actualidad',
        description: [
            'Optimicé cargas masivas de más de 40,000 registros desde Azure Blob Storage con Laravel, tablas temporales y validaciones por lotes, reduciendo tiempos de 20-60 minutos a pocos minutos.',
            'Implementé procesos asíncronos con Jobs/WebJobs para procesamiento masivo sin bloquear operaciones críticas.',
            'Estandaricé APIs REST con OpenAPI 3 y Postman, mejorando consistencia y documentación entre equipos.',
            'Rediseñé módulos críticos en Laravel/Vue.js, reduciendo más del 50% el tiempo de desarrollo en entregas relacionadas.',
        ],
    },
    {
        company: 'Cerebro Smart Media',
        role: 'Full Stack Developer',
        period: 'Enero 2023 - Enero 2025',
        description: [
            'Desarrollé APIs REST con Node.js y Flask para plataformas de reporteo integradas con servicios de terceros.',
            'Construí módulos frontend en Angular, Vue.js y Nuxt.js con arquitectura modular y consumo desacoplado de APIs.',
            'Implementé automatización de reportes y flujos de datos para reducir tareas manuales del equipo operativo.',
            'Participé en despliegues y mantenimiento de soluciones en ambientes productivos.',
        ],
    },
    {
        company: 'ZURCO',
        role: 'Backend Developer',
        period: 'Marzo 2022 - Enero 2023',
        description: [
            'Migré sistemas legacy de CodeIgniter a Node.js y Angular, modernizando APIs REST y módulos administrativos críticos.',
            'Coordiné con el equipo de desarrollo en refactorización, despliegues y estabilización de entregas en producción.',
            'Desarrollé APIs REST y sistemas internos para operaciones administrativas.',
        ],
    },
];
</script>

<template>
    <section id="experience" class="border-b border-zinc-900 bg-zinc-950 px-6 py-24">
        <div class="mx-auto max-w-7xl">
            <div class="mb-16">
                <p class="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-zinc-300">
                    Experiencia
                </p>

                <h2 class="text-4xl font-bold text-white">
                    Experiencia profesional
                </h2>
            </div>

            <div class="space-y-8">
                <article v-for="experience in experiences" :key="experience.company"
                    class="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-md transition hover:border-zinc-700">

                    <div class="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 class="text-2xl font-semibold text-white">
                                {{ experience.role }}
                            </h3>

                            <p class="mt-1 font-medium text-zinc-300">
                                {{ experience.company }}
                            </p>
                        </div>

                        <span
                            class="w-fit rounded-full border border-zinc-700 bg-zinc-950/50 px-4 py-2 font-mono text-sm text-zinc-300">
                            {{ experience.period }}
                        </span>
                    </div>

                    <ul class="space-y-4">
                        <li v-for="item in experience.description" :key="item"
                            class="relative pl-6 text-sm font-light leading-7 text-zinc-300 before:absolute before:left-1 before:top-[10px] before:h-2 before:w-2 before:rounded-full before:bg-zinc-500 sm:text-base">
                            {{ item }}
                        </li>
                    </ul>
                </article>
            </div>
        </div>
    </section>
</template>
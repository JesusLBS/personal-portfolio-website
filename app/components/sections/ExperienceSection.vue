<script setup lang="ts">
const experiences = [
    {
        company: 'SWYTI',
        role: 'Senior Systems Developer',
        period: 'Mayo 2025 - Actualidad',
        description: [
            'Diseño de procesos asíncronos con Jobs/WebJobs para procesamiento masivo de datos.',
            'Estandarización de APIs REST utilizando OpenAPI 3 y Postman.',
            'Mejora de arquitectura frontend en Vue.js reduciendo código repetitivo.',
            'Rediseño de módulos críticos del sistema mejorando la escalabilidad.',
            'Reducción de más del 50% en tiempos de desarrollo en entregas relacionadas.',
        ],
    },
    {
        company: 'Cerebro Smart Media',
        role: 'Full Stack Developer',
        period: 'Enero 2023 - Enero 2025',
        description: [
            'Construcción de arquitecturas escalables backend y frontend.',
            'Desarrollo de APIs con Node.js y Flask.',
            'Trabajo con Angular, Vue.js y Nuxt.js.',
            'Integración de APIs de terceros para plataformas de reporteo.',
        ],
    },
    {
        company: 'ZURCO',
        role: 'Backend Developer',
        period: 'Marzo 2022 - Enero 2023',
        description: [
            'Migración de sistemas legacy desde CodeIgniter a Node.js y Angular.',
            'Desarrollo de APIs REST y sistemas administrativos.',
            'Soporte en coordinación técnica y despliegues en ambientes productivos.',
        ],
    },
];
</script>

<template>
    <section id="experience" class="border-b border-zinc-900 px-6 py-24">
        <div class="mx-auto max-w-7xl">
            <div class="mb-16">
                <p class="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Experiencia
                </p>

                <h2 class="text-4xl font-bold text-white">
                    Experiencia profesional
                </h2>
            </div>

            <div class="space-y-8">
                <article v-for="experience in experiences" :key="experience.company"
                    class="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 transition hover:border-zinc-700">

                    <div class="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 class="text-2xl font-semibold text-white">
                                {{ experience.role }}
                            </h3>

                            <p class="mt-1 text-zinc-400">
                                {{ experience.company }}
                            </p>
                        </div>

                        <span class="w-fit rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-400">
                            {{ experience.period }}
                        </span>
                    </div>

                    <ul class="space-y-3">
                        <li v-for="item in experience.description" :key="item" class="flex gap-3 text-zinc-400">
                            <span class="mt-2 h-2 w-2 rounded-full bg-zinc-500" />

                            <span>
                                {{ item }}
                            </span>
                        </li>
                    </ul>
                </article>
            </div>
        </div>
    </section>
</template>
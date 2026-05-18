<script setup lang="ts">
const steps = [
    {
        num: '01',
        title: 'Diagnóstico',
        description: 'Sesión técnica para analizar los puntos críticos de tu negocio, cuellos de botella operativos y definir los requerimientos reales.',
    },
    {
        num: '02',
        title: 'Propuesta & Diseño',
        description: 'Establezco el alcance del proyecto, el stack tecnológico óptimo, los diagramas de arquitectura de datos y un presupuesto cerrado.',
    },
    {
        num: '03',
        title: 'Desarrollo Iterativo',
        description: 'Construcción modular del sistema con entregas funcionales continuas ( sprints) para que puedas validar avances en tiempo real.',
    },
    {
        num: '04',
        title: 'Despliegue y Soporte',
        description: 'Puesta en marcha (Deploy) en entornos de producción seguros, optimización final de base de datos y acompañamiento inicial garantizado.',
    },
];
</script>

<template>
    <section id="process" class="px-6 py-24 border-b border-zinc-900 bg-zinc-950">
        <div class="mx-auto max-w-7xl">

            <div class="mb-16">
                <p class="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">Metodología</p>
                <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Cómo trabajaremos juntos
                </h2>
                <p class="mt-4 max-w-2xl text-zinc-400 leading-7">
                    Un proceso iterativo, transparente y estructurado de inicio a fin para asegurar entregas funcionales
                    libres de sorpresas.
                </p>
            </div>

            <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">

                <div v-for="(step, index) in steps" :key="step.title" class="relative group">

                    <div v-if="index < steps.length - 1"
                        class="hidden lg:block absolute top-6 left-16 right-0 h-[1px] bg-gradient-to-r from-zinc-800 to-transparent z-0" />

                    <div
                        class="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-mono font-bold text-blue-400 transition-colors group-hover:border-zinc-700">
                        {{ step.num }}
                    </div>

                    <h3 class="mt-6 text-lg font-bold text-white tracking-tight">
                        {{ step.title }}
                    </h3>

                    <p class="mt-2 text-sm text-zinc-400 leading-6">
                        {{ step.description }}
                    </p>
                </div>

            </div>

        </div>
    </section>
</template>
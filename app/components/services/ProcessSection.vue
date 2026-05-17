<script setup lang="ts">
const steps = [
    {
        title: '1. Diagnóstico',
        description:
            'Analizo tu negocio, procesos y necesidades técnicas reales.',
    },
    {
        title: '2. Propuesta',
        description:
            'Defino arquitectura, solución y alcance del proyecto.',
    },
    {
        title: '3. Desarrollo',
        description:
            'Construcción del sistema con entregas iterativas.',
    },
    {
        title: '4. Entrega y soporte',
        description:
            'Deploy, ajustes finales y acompañamiento inicial.',
    },
];
</script>

<template>
    <section id="process" class="px-6 py-24 border-b border-zinc-900">
        <div class="mx-auto max-w-7xl">

            <h2 class="text-3xl font-bold text-white">
                Proceso de trabajo
            </h2>

            <p class="mt-4 max-w-2xl text-zinc-400">
                Metodología clara para garantizar entregas funcionales y escalables.
            </p>

            <div class="mt-12 grid gap-6 md:grid-cols-2">
                <div v-for="step in steps" :key="step.title"
                    class="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                    <h3 class="text-lg font-semibold text-white">
                        {{ step.title }}
                    </h3>

                    <p class="mt-2 text-sm text-zinc-400 leading-7">
                        {{ step.description }}
                    </p>
                </div>
            </div>

        </div>
    </section>
</template>
<script setup lang="ts">
const services = [
    {
        title: 'Desarrollo Web a Medida',
        description:
            'Sitios web modernos, rápidos y optimizados para conversión y SEO.',
    },
    {
        title: 'Sistemas Administrativos',
        description:
            'Plataformas internas para gestión de usuarios, procesos y operaciones.',
    },
    {
        title: 'APIs y Backend Escalable',
        description:
            'Diseño e implementación de APIs seguras, modulares y escalables.',
    },
    {
        title: 'Automatización de Procesos',
        description:
            'Digitalización de tareas manuales para reducir tiempo y errores.',
    },
];
</script>

<template>
    <section id="services" class="px-6 py-24 border-b border-zinc-900">
        <div class="mx-auto max-w-7xl">

            <h2 class="text-3xl font-bold text-white">
                Servicios
            </h2>

            <p class="mt-4 max-w-2xl text-zinc-400">
                Soluciones enfocadas en mejorar operaciones, presencia digital y escalabilidad.
            </p>

            <div class="mt-12 grid gap-6 md:grid-cols-2">
                <div v-for="s in services" :key="s.title" class="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                    <h3 class="text-lg font-semibold text-white">
                        {{ s.title }}
                    </h3>

                    <p class="mt-2 text-sm text-zinc-400 leading-7">
                        {{ s.description }}
                    </p>
                </div>
            </div>

        </div>
    </section>
</template>
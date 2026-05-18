<script setup lang="ts">
const services = [
    {
        title: 'Desarrollo Web a Medida',
        icon: 'ri:computer-line',
        iconColor: 'text-blue-400',
        description: 'Sitios web modernos, ultrarrápidos y optimizados nativamente para conversión, SEO técnico y excelente retención de usuarios.',
    },
    {
        title: 'Sistemas Administrativos',
        icon: 'ri:dashboard-3-line',
        iconColor: 'text-emerald-400',
        description: 'Paneles de control y plataformas internas a la medida para la gestión de usuarios, flujos de operación complejos y automatización de reportes.',
    },
    {
        title: 'APIs y Backend Escalable',
        icon: 'ri:server-line',
        iconColor: 'text-purple-400',
        description: 'Diseño e implementación de arquitecturas backend seguras, modulares y APIs estructuradas listas para soportar altas cargas de tráfico.',
    },
    {
        title: 'Automatización de Procesos',
        icon: 'ri:cpu-line',
        iconColor: 'text-orange-400',
        description: 'Digitalización e integración de tareas manuales repetitivas mediante scripts y flujos automatizados para mitigar errores y ahorrar horas críticas.',
    },
];
</script>

<template>
    <section id="services-list" class="px-6 py-24 border-b border-zinc-900 relative">
        <div class="mx-auto max-w-7xl">

            <div class="mb-16">
                <p class="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">Capacidades</p>
                <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Servicios de Ingeniería de Software
                </h2>
                <p class="mt-4 max-w-2xl text-zinc-400 leading-7">
                    Soluciones de código estructurado enfocadas directamente en optimizar tus operaciones, escala
                    técnica y presencia digital.
                </p>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
                <div v-for="s in services" :key="s.title"
                    class="group relative rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/40">

                    <div
                        class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 transition-colors group-hover:border-zinc-700">
                        <Icon :name="s.icon" class="text-2xl" :class="s.iconColor" />
                    </div>

                    <h3 class="text-xl font-semibold text-white tracking-tight">
                        {{ s.title }}
                    </h3>

                    <p class="mt-3 text-sm text-zinc-400 leading-7">
                        {{ s.description }}
                    </p>
                </div>
            </div>

        </div>
    </section>
</template>
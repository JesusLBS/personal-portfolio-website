<script setup lang="ts">
const services = [
    'Desarrollo de sitios web profesionales',
    'Sistemas administrativos personalizados',
    'APIs y backend escalable',
    'Automatización de procesos',
];
</script>

<template>
    <section id="hero" class="px-6 py-28 border-b border-zinc-900">
        <div class="mx-auto max-w-7xl">

            <p class="text-sm uppercase tracking-[0.3em] text-zinc-400">
                Desarrollo de software a medida
            </p>

            <h1 class="mt-4 text-5xl font-bold text-white leading-tight">
                Soluciones digitales para empresas que quieren crecer
            </h1>

            <p class="mt-6 max-w-3xl text-zinc-400 leading-8">
                Desarrollo sistemas web, APIs y plataformas escalables enfocadas en rendimiento,
                automatización y crecimiento de negocio.
            </p>

            <div class="mt-10 flex gap-4">
                <a href="#contact-cta" class="rounded-xl bg-white text-black px-6 py-3 text-sm font-semibold">
                    Solicitar propuesta
                </a>

                <a href="#services" class="rounded-xl border border-zinc-700 px-6 py-3 text-sm text-white">
                    Ver servicios
                </a>
            </div>

            <!-- services preview -->
            <div class="mt-16 grid gap-4 md:grid-cols-2">
                <div v-for="item in services" :key="item"
                    class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-zinc-300 text-sm">
                    {{ item }}
                </div>
            </div>

        </div>
    </section>
</template>
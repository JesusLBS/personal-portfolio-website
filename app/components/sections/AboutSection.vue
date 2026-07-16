<script setup lang="ts">

const certifications = [
    {
        title: 'Certificado de gestión de proyectos de Google',
        issuer: 'Coursera',
        date: 'Feb 2024',
        image: '/images/certificado-de-gestion-de-proyectos-de-google.png',
        url: 'https://www.credly.com/badges/b7c7917b-dbf6-4e27-bba3-c331dcc97ce5/public_url',
    },
    {
        title: 'Python Essentials 1',
        issuer: 'Cisco',
        date: 'Feb 2026',
        image: '/images/cisco-python-essential-1.png',
        url: 'https://www.credly.com/badges/0a16ef0e-676f-447c-90df-cc03f89747c0/public_url',
    },
];
</script>

<template>
    <section id="about" class="border-b border-zinc-900 px-6 py-24">
        <div class="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
            <div class="space-y-6">
                <div>
                    <p class="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">
                        Sobre mí
                    </p>

                    <h2 class="text-4xl font-bold text-white">
                        Ingeniero en Desarrollo y Gestión de Software
                    </h2>
                </div>

                <p class="leading-8 text-zinc-400">
                    Desarrollador full stack con más de 5 años de experiencia en Laravel, Vue.js,
                    Angular y Node.js. Me especializo en APIs REST, modernización de sistemas legacy
                    y optimización de procesos críticos con cargas masivas de datos en Azure.
                </p>

                <p class="leading-8 text-zinc-400">
                    He reducido tiempos de procesamiento de cargas de más de 40,000 registros
                    de 20-60 minutos a pocos minutos mediante chunks, tablas temporales,
                    validaciones por lotes y jobs asíncronos. También desarrollo soluciones con
                    Python/Flask e integración de IA aplicada a documentos.
                </p>

                <div class="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
                    <div>
                        <p class="text-xs uppercase tracking-[0.2em] text-zinc-500">Formación</p>
                        <p class="mt-2 text-sm font-medium text-white">
                            Ingeniero en Desarrollo y Gestión de Software
                        </p>
                    </div>

                    <div>
                        <p class="text-xs uppercase tracking-[0.2em] text-zinc-500">Certificaciones</p>
                        <div class="mt-3 space-y-3">
                            <a v-for="cert in certifications" :key="cert.title" :href="cert.url"
                                target="_blank" rel="noopener noreferrer"
                                class="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950/50 p-3 transition hover:border-zinc-600">

                                <div class="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-zinc-800">
                                    <NuxtImg :src="cert.image" :alt="cert.title" width="56" height="56"
                                        loading="lazy" format="webp"
                                        class="h-full w-full object-cover" />
                                </div>

                                <div class="min-w-0 flex-1">
                                    <p class="truncate text-sm font-medium text-white group-hover:text-cyan-400 transition">
                                        {{ cert.title }}
                                    </p>
                                    <p class="text-xs text-zinc-500">
                                        {{ cert.issuer }} · {{ cert.date }}
                                    </p>
                                </div>

                                <Icon name="ri:external-link-line"
                                    class="shrink-0 text-sm text-zinc-500 group-hover:text-cyan-400 transition" />
                            </a>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-4 pt-2">
                    <a href="#projects"
                        class="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90">
                        Ver proyectos
                    </a>

                    <a href="/files/cv_jesus_chicho_hernandez.pdf" target="_blank"
                        class="rounded-xl border border-zinc-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-zinc-500">
                        Descargar CV
                    </a>
                </div>
            </div>

            <div class="flex w-full items-center justify-center">
                <div
                    class="relative aspect-[14/10] w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
                    <a :href="'/images/logo.webp'" class="block h-full w-full cursor-default">
                        <NuxtImg src="/images/logo.webp" alt="Jesus Chicho" width="705" height="500" format="webp"
                            quality="80" loading="lazy" sizes="xs:100vw sm:450px md:600px lg:705px"
                            class="h-full w-full object-cover object-center transition duration-500 hover:scale-[1.01]" />
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>
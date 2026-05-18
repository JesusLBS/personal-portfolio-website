<script setup>
const projects = [
    {
        id: 'clinica-dental',
        badge: 'Sistema Dental & Citas',
        badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        title: 'Plataforma de Gestión Dental',
        description: 'Estructura web completa con catálogo visual de tratamientos, panel administrativo y sistema automatizado para agendar citas las 24 horas.',
        coverImage: '/screenshots/web-dental.png',
        gallery: [
            '/screenshots/web-dental.png',
            '/screenshots/services-dental.png',
            '/screenshots/solicitud-consulta-dental.png',
            '/screenshots/historial-medico-dental.png',
            '/screenshots/home-dental.png'
        ],
        gridSpan: 'md:col-span-7'
    },
    {
        id: 'capital-humano-erps',
        badge: 'Recursos Humanos',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        title: 'Sistema de Gestión de Capital Humano',
        description: 'Plataforma centralizada para la administración de personal, organigramas por departamentos y seguimiento automatizado de candidatos en procesos de selección.',
        coverImage: '/screenshots/empelados-people.png',
        gallery: [
            '/screenshots/empelados-people.png',
            '/screenshots/profile-people.png',
            '/screenshots/departamentos-people.png',
            '/screenshots/candidato-people.png',
            '/screenshots/candidato-2-people.png',
            '/screenshots/login-people.png'
        ],
        gridSpan: 'md:col-span-5'
    }
]
</script>

<template>
    <section id="visual-cases" class="px-6 py-24 border-b border-zinc-900 bg-zinc-950 relative overflow-hidden">
        <div
            class="absolute top-10 left-1/3 z-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[90px] mix-blend-screen pointer-events-none" />
        <div
            class="absolute bottom-10 right-1/3 z-0 h-72 w-72 rounded-full bg-emerald-600/15 blur-[90px] mix-blend-screen pointer-events-none" />

        <div class="mx-auto max-w-7xl">

            <div class="mb-16">
                <p class="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500 font-mono">Portafolio Comercial</p>
                <h2
                    class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                    Sistemas que impulsan operaciones reales
                </h2>
                <p class="mt-4 max-w-2xl text-zinc-400 text-sm sm:text-base leading-7">
                    Una muestra visual de las interfaces limpias, paneles de control optimizados y arquitecturas web
                    adaptadas a las necesidades de cada negocio.
                </p>
            </div>

            <div class="grid gap-8 md:grid-cols-12">
                <div v-for="project in projects" :key="project.id" :class="project.gridSpan"
                    class="group relative rounded-2xl border border-zinc-800/60 bg-zinc-900/10 p-6 flex flex-col justify-between transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-900/30 shadow-lg">

                    <div
                        class="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-800/0 via-zinc-800/0 to-zinc-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    <div class="mb-6">
                        <span :class="project.badgeColor"
                            class="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md border tracking-wider">
                            {{ project.badge }}
                        </span>
                        <h3
                            class="mt-4 text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                            {{ project.title }}
                        </h3>
                        <p class="mt-2 text-xs sm:text-sm text-zinc-400 leading-6 font-light">
                            {{ project.description }}
                        </p>
                    </div>

                    <div class="space-y-4">
                        <a :href="project.coverImage" :data-fancybox="project.id" :data-caption="project.title"
                            class="relative block rounded-xl border border-zinc-800/80 bg-zinc-950 p-2 shadow-2xl transition-all duration-500 group-hover:border-zinc-700 group-hover:translate-y-[-2px] cursor-zoom-in">

                            <div class="flex gap-1.5 pb-2 border-b border-zinc-900 mb-2 items-center px-1">
                                <span
                                    class="h-2 w-2 rounded-full bg-zinc-800 group-hover:bg-red-500/40 transition-colors duration-300" />
                                <span
                                    class="h-2 w-2 rounded-full bg-zinc-800 group-hover:bg-yellow-500/40 transition-colors duration-300" />
                                <span
                                    class="h-2 w-2 rounded-full bg-zinc-800 group-hover:bg-green-500/40 transition-colors duration-300" />
                            </div>

                            <div
                                class="aspect-[16/10] w-full rounded-lg bg-zinc-900/40 flex items-center justify-center overflow-hidden border border-zinc-800/30 relative">
                                <NuxtImg :src="project.coverImage" :alt="project.title" loading="lazy" format="webp"
                                    densities="1x 2x"
                                    class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />

                                <!-- Badge Flotante indicador de galería -->
                                <div
                                    class="absolute bottom-3 right-3 bg-zinc-950/90 border border-zinc-800 text-zinc-400 text-[10px] px-2.5 py-1 rounded-md flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-all shadow-xl font-mono">
                                    <Icon name="ri:images-line" class="text-xs text-blue-400" />
                                    {{ project.gallery.length }} capturas
                                </div>
                            </div>
                        </a>

                        <!-- 2. Carrusel Inferior de Miniaturas (Agrega profundidad visual) -->
                        <div class="flex flex-wrap gap-2 pt-1">
                            <a v-for="(image, imgIndex) in project.gallery.slice(1)" :key="imgIndex" :href="image"
                                :data-fancybox="project.id" :data-caption="`${project.title} - Vista ${imgIndex + 2}`"
                                class="w-12 h-12 sm:w-16 sm:h-11 overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-950 transition-all duration-300 hover:border-zinc-600 hover:scale-105 block relative cursor-zoom-in">

                                <NuxtImg :src="image" width="64" height="44" loading="lazy" format="webp" densities="1x"
                                    :alt="`Muestra de ${project.title}`"
                                    class="w-full h-full object-cover object-top filter brightness-[0.7] hover:brightness-100 transition duration-300" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>
</template>
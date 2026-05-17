<script setup lang="ts">

const projects = [
    {
        title: 'Water System Frontend',
        type: 'Frontend',
        description:
            'Panel administrativo para gestión de socios, usuarios y líneas de agua con consumo de API REST y arquitectura modular.',
        role: 'Frontend Developer',
        stack: ['React', 'TypeScript', 'Formik', 'Yup', 'Axios', 'MUI'],
        highlights: [
            'Arquitectura modular por dominios',
            'Formularios complejos con validación robusta',
            'Consumo desacoplado de API REST',
        ],
        repo: 'https://github.com/JesusLBS/water-system-front-end',
        images: [
            '/screenshots/login.png',
            '/screenshots/detail-socio.png',
        ],
    },
    {
        title: 'Water System Backend',
        type: 'Backend',
        description:
            'API REST escalable con JWT, arquitectura modular y MySQL con Sequelize.',
        role: 'Backend Developer',
        stack: ['Node.js', 'Express', 'MySQL', 'Sequelize', 'JWT'],
        highlights: [
            'Arquitectura por módulos',
            'Autenticación JWT segura',
            'API REST estructurada',
        ],
        repo: 'https://github.com/JesusLBS/water-system-back',
        images: [
            '/screenshots/postman-create-socio.png',
            '/screenshots/postman-login.png',
        ],
    },
];
</script>

<template>
    <section id="projects" class="border-b border-zinc-900 px-6 py-24">
        <div class="mx-auto max-w-7xl">

            <div class="mb-16">
                <p class="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">
                    Projects
                </p>
                <h2 class="text-4xl font-bold text-white">
                    Featured Work
                </h2>
            </div>

            <div class="grid gap-8 md:grid-cols-2">
                <article v-for="project in projects" :key="project.title"
                    class="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <p class="text-xs uppercase text-zinc-400">
                        {{ project.type }}
                    </p>

                    <h3 class="mt-2 text-2xl font-semibold text-white">
                        {{ project.title }}
                    </h3>

                    <p class="mt-3 text-sm text-zinc-400">
                        {{ project.description }}
                    </p>

                    <p class="mt-2 text-xs text-zinc-400">
                        Role: {{ project.role }}
                    </p>

                    <!-- stack -->
                    <div class="mt-4 flex flex-wrap gap-2">
                        <span v-for="t in project.stack" :key="t"
                            class="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                            {{ t }}
                        </span>
                    </div>

                    <!-- highlights -->
                    <ul class="mt-4 list-disc pl-5 text-sm text-zinc-400">
                        <li v-for="h in project.highlights" :key="h">
                            {{ h }}
                        </li>
                    </ul>

                    <div class="mt-5 flex gap-4 text-sm">
                        <a :href="project.repo" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition"
                            aria-label="Abrir repositorio de GitHub en nueva pestaña">
                            Ver código
                            <Icon name="ri:external-link-line" class="text-sm" />
                        </a>
                    </div>

                    <div class="mt-6 flex flex-wrap gap-2">
                        <a v-for="img in project.images" :key="img" :href="img"
                            :data-fancybox="'project-' + project.title.toLowerCase().replace(/\s+/g, '-')"
                            class="inline-block overflow-hidden rounded-xl border border-zinc-800">
                            <NuxtImg :src="img" width="312" height="225" loading="lazy" format="webp" densities="1x 2x"
                                :alt="`Screenshot del proyecto ${project.title}`"
                                class="object-cover transition duration-300 hover:scale-[1.02]" />
                        </a>
                    </div>
                </article>
            </div>

        </div>
    </section>
</template>
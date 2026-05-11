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
            'API REST escalable con autenticación JWT, arquitectura modular y conexión a MySQL con Sequelize.',
        role: 'Backend Developer',
        stack: ['Node.js', 'Express', 'MySQL', 'Sequelize', 'JWT'],
        highlights: [
            'Arquitectura por módulos (Clean-ish)',
            'Autenticación JWT segura',
            'Diseño de API REST estructurada',
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
                <p class="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Projects
                </p>
                <h2 class="text-4xl font-bold text-white">
                    Featured Work
                </h2>
            </div>

            <div class="grid gap-8 md:grid-cols-2">
                <article v-for="project in projects" :key="project.title"
                    class="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <p class="text-xs uppercase text-zinc-500">
                        {{ project.type }}
                    </p>

                    <h3 class="mt-2 text-2xl font-semibold text-white">
                        {{ project.title }}
                    </h3>

                    <p class="mt-3 text-sm text-zinc-400">
                        {{ project.description }}
                    </p>

                    <p class="mt-2 text-xs text-zinc-500">
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

                    <!-- links -->
                    <div class="mt-5 flex gap-4 text-sm">
                        <a :href="project.repo" target="_blank" class="text-blue-400 hover:underline">
                            GitHub
                        </a>
                    </div>

                    <!-- images -->
                    <div class="mt-6 grid gap-2">
                        <img v-for="img in project.images" :key="img" :src="img"
                            class="rounded-xl border border-zinc-800" alt="project" />
                    </div>
                </article>
            </div>

        </div>
    </section>
</template>
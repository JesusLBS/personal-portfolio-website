<script setup lang="ts">

const projects = [
    {
        id: 'water-system-frontend',
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
        coverImage: '/screenshots/login.png',
        gallery: [
            '/screenshots/login.png',
            '/screenshots/detail-socio.png',
        ],
    },
    {
        id: 'water-system-backend',
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
        coverImage: '/screenshots/postman-create-socio.png',
        gallery: [
            '/screenshots/postman-create-socio.png',
            '/screenshots/postman-login.png',
        ],
    },
    {
        id: 'document-intelligence-engine',
        title: 'Document Intelligence Engine',
        type: 'Backend / AI',
        description:
            'Motor de inteligencia documental en Python/Flask que transforma PDFs nativos o escaneados en datos estructurados mediante pipeline OCR, extracción regex e IA.',
        role: 'Backend Developer',
        stack: ['Python', 'Flask', 'PyMuPDF', 'Tesseract', 'OpenCV', 'Gemini', 'Groq', 'Docker'],
        highlights: [
            'Pipeline con diagnóstico OCR automático (PyMuPDF + Tesseract)',
            'Extracción CSF por regex e INE con IA multimodal',
            'Arquitectura limpia con Strategy, Factory y providers intercambiables',
        ],
        repo: 'https://github.com/JesusLBS/document-intelligence-engine',
        coverImage: '/screenshots/doc-intel-process-csf-regex.png',
        gallery: [
            '/screenshots/doc-intel-process-csf-regex.png',
            '/screenshots/doc-intel-process-ine-ai.png',
            '/screenshots/doc-intel-health.png',
            '/screenshots/doc-intel-process-validation-422.png',
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

            <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                <article v-for="project in projects" :key="project.id"
                    class="group flex flex-col rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors duration-300 hover:border-zinc-700">

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

                    <div class="mt-4 flex flex-wrap gap-2">
                        <span v-for="t in project.stack" :key="t"
                            class="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                            {{ t }}
                        </span>
                    </div>

                    <ul class="mt-4 list-disc pl-5 text-sm text-zinc-400">
                        <li v-for="h in project.highlights" :key="h">
                            {{ h }}
                        </li>
                    </ul>

                    <div class="mt-5 flex gap-4 text-sm">
                        <a :href="project.repo" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center gap-1 text-blue-400 transition hover:text-blue-300"
                            aria-label="Abrir repositorio de GitHub en nueva pestaña">
                            Ver código
                            <Icon name="ri:external-link-line" class="text-sm" />
                        </a>
                    </div>

                    <div class="mt-6 space-y-3">
                        <a :href="project.coverImage" :data-fancybox="project.id" :data-caption="project.title"
                            class="relative block cursor-zoom-in rounded-xl border border-zinc-800 bg-zinc-950 p-2 transition duration-300 hover:border-zinc-700">

                            <div class="mb-2 flex items-center gap-1.5 border-b border-zinc-900 px-1 pb-2">
                                <span class="h-2 w-2 rounded-full bg-zinc-800" />
                                <span class="h-2 w-2 rounded-full bg-zinc-800" />
                                <span class="h-2 w-2 rounded-full bg-zinc-800" />
                            </div>

                            <div
                                class="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-zinc-800/30 bg-zinc-900/40">
                                <NuxtImg :src="project.coverImage" :alt="project.title" loading="lazy" format="webp"
                                    densities="1x 2x"
                                    class="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]" />

                                <div v-if="project.gallery.length > 1"
                                    class="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-950/90 px-2.5 py-1 font-mono text-[10px] text-zinc-400 shadow-xl">
                                    <Icon name="ri:images-line" class="text-xs text-blue-400" />
                                    {{ project.gallery.length }} capturas
                                </div>
                            </div>
                        </a>

                        <div v-if="project.gallery.length > 1" class="flex flex-wrap gap-2">
                            <a v-for="(image, imgIndex) in project.gallery.slice(1)" :key="image" :href="image"
                                :data-fancybox="project.id"
                                :data-caption="`${project.title} - Vista ${imgIndex + 2}`"
                                class="block h-11 w-16 cursor-zoom-in overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-950 transition duration-300 hover:scale-105 hover:border-zinc-600 sm:h-11 sm:w-16">

                                <NuxtImg :src="image" width="64" height="44" loading="lazy" format="webp"
                                    densities="1x"
                                    :alt="`Screenshot del proyecto ${project.title}`"
                                    class="h-full w-full object-cover object-top brightness-[0.7] transition duration-300 hover:brightness-100" />
                            </a>
                        </div>
                    </div>
                </article>
            </div>

        </div>
    </section>
</template>

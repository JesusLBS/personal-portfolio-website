<script setup lang="ts">
const experiences = [
    {
        company: 'Solve Credito',
        role: 'Senior Full Stack Engineer',
        period: 'Agosto 2026 - Actualidad',
        isCurrent: true,
        description: [
            'Estabilicé el sistema de originación de crédito en PHP, JavaScript y MySQL, eliminando las caídas recurrentes que requerían reiniciar Apache/PHP varias veces por semana.',
            'Optimicé consultas SQL, paginación y filtros; modernicé el esquema MySQL con índices compuestos, llaves foráneas y migraciones con rollback.',
            'Corregí vulnerabilidades de inyección SQL y reforcé la autenticación y el manejo de sesiones.',
        ],
    },
    {
        company: 'SWYTI',
        role: 'Senior Full Stack Engineer',
        period: 'Mayo 2025 - Julio 2026',
        isCurrent: false,
        description: [
            'Optimicé cargas de más de 40,000 registros desde archivos Excel en Azure Blob Storage con Laravel, tablas temporales y validaciones por lotes, reduciendo tiempos de 20-40 minutos a pocos minutos.',
            'Implementé procesamiento asíncrono de archivos Excel, XML y PDF con Laravel Jobs, Azure WebJobs y batches, mejorando validaciones, manejo de errores y trazabilidad.',
            'Digitalicé formatos de calibración de laboratorio con esquemas JSON y un motor de fórmulas, reduciendo más del 50% el tiempo de desarrollo de nuevas entregas.',
            'Impulsé documentación de APIs con OpenAPI 3 y Postman, pipelines automatizados y buenas prácticas de control de versiones y configuración de entornos.',
            'Desplegué soluciones Laravel en Azure App Service y configuré ambientes productivos.',
        ],
    },
    {
        company: 'Cerebro Smart Media',
        role: 'Senior Full Stack Engineer',
        period: 'Enero 2023 - Enero 2025',
        isCurrent: false,
        description: [
            'Desarrollé una plataforma de reporteo de campañas digitales con datos de Meta, Google y Looker Studio.',
            'Construí APIs con Node.js y Python/Flask, frontends con Angular y Nuxt.js, y asumí el desarrollo de la base de datos y el despliegue de la solución.',
            'Automaticé reportes visuales con métricas, gráficos y datos exportables para entregas semanales, mensuales o bajo demanda.',
            'Implementé procesos de lectura, limpieza y transformación de archivos con Python/Flask.',
        ],
    },
    {
        company: 'ZURCO',
        role: 'Backend Developer',
        period: 'Marzo 2022 - Enero 2023',
        isCurrent: false,
        description: [
            'Migré sistemas legacy de CodeIgniter/PHP hacia Node.js, Angular y Laravel para gestión documental, pagos y validaciones.',
            'Implementé APIs REST con autenticación JWT, middleware, validación de solicitudes y control de acceso.',
            'Definí patrones y buenas prácticas de desarrollo y brindé apoyo técnico y mentoría a un equipo de aproximadamente cuatro desarrolladores.',
            'Integré pagos con Stripe en Node.js: checkout, webhooks, asignación de créditos y manejo de pagos aceptados o rechazados en pruebas y producción.',
        ],
    },
    {
        company: 'ESMEX — Estrategias en Muebles y Exhibidores',
        role: 'Software Developer Intern',
        period: 'Enero 2022 - Febrero 2022',
        isCurrent: false,
        description: [
            'Desarrollé un sistema interno de recursos humanos con Laravel, Jetstream, Inertia.js y Vue.js para centralizar información de empleados, áreas, puestos y documentos.',
            'Implementé módulos de empleados, departamentos, roles y permisos, mejorando la trazabilidad y disponibilidad de la información.',
        ],
    },
    {
        company: 'Clínica Dental Especializada',
        role: 'Web Developer',
        period: 'Mayo 2021 - Diciembre 2021',
        isCurrent: false,
        description: [
            'Desarrollé un sistema web en Laravel para gestión de pacientes, citas, médicos e inventario.',
            'Integré Google Calendar y desplegué la aplicación en AWS EC2 y S3 con base de datos MySQL.',
        ],
    },
];
</script>

<template>
    <section id="experience" class="border-b border-zinc-900 bg-zinc-950 px-6 py-24">
        <div class="mx-auto max-w-7xl">
            <div class="mb-16">
                <p class="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-zinc-300">
                    Experiencia
                </p>

                <h2 class="text-4xl font-bold text-white">
                    Experiencia profesional
                </h2>
            </div>

            <div class="space-y-8">
                <article v-for="experience in experiences" :key="experience.company"
                    class="rounded-3xl border bg-zinc-900 p-8 shadow-md transition"
                    :class="experience.isCurrent ? 'border-cyan-400/40 hover:border-cyan-400/60' : 'border-zinc-800 hover:border-zinc-700'">

                    <div class="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 class="text-2xl font-semibold text-white">
                                {{ experience.role }}
                            </h3>

                            <p class="mt-1 font-medium text-zinc-300">
                                {{ experience.company }}
                            </p>
                        </div>

                        <div class="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                            <span v-if="experience.isCurrent"
                                class="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
                                Puesto actual
                            </span>
                            <span
                                class="w-fit rounded-full border border-zinc-700 bg-zinc-950/50 px-4 py-2 font-mono text-sm text-zinc-300">
                                {{ experience.period }}
                            </span>
                        </div>
                    </div>

                    <ul class="space-y-4">
                        <li v-for="item in experience.description" :key="item"
                            class="relative pl-6 text-sm font-light leading-7 text-zinc-300 before:absolute before:left-1 before:top-[10px] before:h-2 before:w-2 before:rounded-full before:bg-zinc-500 sm:text-base">
                            {{ item }}
                        </li>
                    </ul>
                </article>
            </div>
        </div>
    </section>
</template>

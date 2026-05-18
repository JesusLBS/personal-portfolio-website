<template>
    <section id="visual-cases" class="px-6 py-24 border-b border-zinc-900 bg-zinc-950/20 relative">
        <div class="absolute top-1/2 right-0 -z-10 h-72 w-72 rounded-full bg-blue-500/5 blur-[120px]" />

        <div class="mx-auto max-w-7xl">

            <div class="mb-16">
                <p class="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">Portafolio de Soluciones</p>
                <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Sistemas en producción que generan valor
                </h2>
                <p class="mt-4 max-w-2xl text-zinc-400 leading-7">
                    Una muestra visual de interfaces limpias, paneles de control optimizados y arquitecturas de datos
                    construidas para resolver problemas operativos reales.
                </p>
            </div>

            <div class="grid gap-8 md:grid-cols-12">

                <div
                    class="md:col-span-7 group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-6 overflow-hidden flex flex-col justify-between transition-all hover:border-zinc-700">
                    <div class="mb-6">
                        <span
                            class="text-xs font-mono text-blue-400 uppercase bg-blue-500/10 px-2.5 py-1 rounded-md">Panel
                            de Control & ERP</span>
                        <h3 class="mt-3 text-xl font-bold text-white">Plataforma de Gestión Operativa</h3>
                        <p class="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-6">
                            Control total de flujos de trabajo, automatización de reportes y administración de usuarios
                            en tiempo real con tiempos de respuesta menores a 100ms.
                        </p>
                    </div>

                    <div
                        class="mt-4 relative rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl transition-transform duration-500 group-hover:translate-y-2 group-hover:scale-[1.02]">
                        <div class="flex gap-1 pb-2 border-b border-zinc-900 mb-2">
                            <span class="h-2 w-2 rounded-full bg-zinc-800" />
                            <span class="h-2 w-2 rounded-full bg-zinc-800" />
                            <span class="h-2 w-2 rounded-full bg-zinc-800" />
                        </div>
                        <div
                            class="aspect-[16/10] w-full rounded-lg bg-zinc-900/60 flex items-center justify-center overflow-hidden border border-zinc-800/50">
                            <div class="text-center p-4">
                                <Icon name="ri:dashboard-line" class="text-3xl text-zinc-700 mb-2" />
                                <p class="text-xs font-mono text-zinc-600">[ Interfaz del Sistema / Gráficas
                                    ]</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="md:col-span-5 group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-6 overflow-hidden flex flex-col justify-between transition-all hover:border-zinc-700">
                    <div class="mb-6">
                        <span
                            class="text-xs font-mono text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-1 rounded-md">Optimización
                            de Datos</span>
                        <h3 class="mt-3 text-xl font-bold text-white">Módulos de Reportes Automatizados</h3>
                        <p class="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-6">
                            Migración de hojas de cálculo inestables hacia bases de datos relacionales blindadas con
                            exportación inmediata a formatos ejecutivos.
                        </p>
                    </div>

                    <div
                        class="mt-4 relative rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl transition-transform duration-500 group-hover:translate-y-2 group-hover:scale-[1.02]">
                        <div class="flex gap-1 pb-2 border-b border-zinc-900 mb-2">
                            <span class="h-2 w-2 rounded-full bg-zinc-800" />
                            <span class="h-2 w-2 rounded-full bg-zinc-800" />
                        </div>
                        <div
                            class="aspect-[4/3] w-full rounded-lg bg-zinc-900/60 flex items-center justify-center overflow-hidden border border-zinc-800/50">
                            <div class="text-center p-4">
                                <Icon name="ri:bar-chart-box-line" class="text-3xl text-zinc-700 mb-2" />
                                <p class="text-xs font-mono text-zinc-600">[ Visualización de Datos / Filtros ]</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </section>
</template>
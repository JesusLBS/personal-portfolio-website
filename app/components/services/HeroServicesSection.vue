<template>
    <section id="hero-services" class="relative overflow-hidden border-b border-zinc-900 px-6 py-24 lg:py-32">
        <div class="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[128px]" />
        <div class="absolute bottom-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-500/5 blur-[128px]" />

        <div class="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 lg:items-center">

            <div class="lg:col-span-7 space-y-6 text-left">

                <div
                    class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 animate-pulse">
                    <span class="h-2 w-2 rounded-full bg-emerald-400" />
                    Disponible para nuevos proyectos
                </div>

                <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
                    Transformo tus ideas en
                    <span
                        class="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                        Software Escalable
                    </span> y de Alto Rendimiento.
                </h1>

                <p class="max-w-2xl text-lg leading-8 text-zinc-400">
                    Desarrollo aplicaciones web a la medida, arquitecturas backend robustas y soluciones Full Stack
                    optimizadas para hacer crecer tu negocio. Código limpio, entrega ágil y resultados medibles.
                </p>

                <div class="flex flex-wrap gap-4 pt-2">
                    <a href="#contact-cta"
                        class="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:shadow-blue-500/30">
                        Cotizar mi Proyecto
                    </a>
                    <a href="#services-list"
                        class="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900">
                        Explorar Servicios
                    </a>
                </div>
            </div>

            <div class="lg:col-span-5 relative lg:mt-0 mt-12">
                <div class="relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm shadow-2xl">

                    <div class="flex gap-1.5 pb-4 border-b border-zinc-800/80 mb-4">
                        <span class="h-3 w-3 rounded-full bg-zinc-700" />
                        <span class="h-3 w-3 rounded-full bg-zinc-700" />
                        <span class="h-3 w-3 rounded-full bg-zinc-700" />
                    </div>

                    <div class="space-y-4 font-mono text-xs sm:text-sm text-zinc-500">
                        <div>
                            <span class="text-blue-400">const</span> <span class="text-emerald-400">service</span> =
                            <span class="text-zinc-300">{</span>
                            <div class="pl-4">
                                type: <span class="text-orange-300">'FullStack_Solutions'</span>,<br>
                                performance: <span class="text-orange-300">'99%'</span>,<br>
                                secure: <span class="text-blue-400">true</span>,<br>
                                architecture: <span class="text-orange-300">'Clean_&_Modular'</span>
                            </div>
                            <span class="text-zinc-300">};</span>
                        </div>
                    </div>
                </div>

                <div
                    class="absolute -bottom-6 -left-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl flex items-center gap-3 transition-transform duration-300 hover:scale-105">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs text-zinc-500">Proyectos Entregados</p>
                        <p class="text-lg font-bold text-white">Production Ready</p>
                    </div>
                </div>

                <div
                    class="absolute -top-6 -right-4 rounded-xl border border-zinc-800 bg-zinc-950 p-3 shadow-xl flex items-center gap-2">
                    <span class="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
                    <span class="text-xs font-medium text-zinc-300">Nuxt + Laravel + MySQL</span>
                </div>

            </div>

        </div>
    </section>
</template>
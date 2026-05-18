<template>
    <section id="hero-services"
        class="relative min-h-screen flex items-center overflow-hidden border-b border-zinc-900 px-6 py-20">
        <div
            class="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 lg:items-center w-full transition-transform duration-500 lg:-translate-y-10">

            <div class="lg:col-span-7 space-y-6 text-left">
                <div
                    class="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Disponible para nuevos proyectos
                </div>

                <h1 style="animation-delay: 150ms;"
                    class="animate-fade-in-up text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight opacity-0 fill-mode-forwards">
                    Transformo tus ideas en
                    <span
                        class="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                        Software Escalable
                    </span> y de Alto Rendimiento.
                </h1>

                <p style="animation-delay: 300ms;"
                    class="animate-fade-in-up max-w-2xl text-lg leading-8 text-zinc-400 opacity-0 fill-mode-forwards">
                    Desarrollo aplicaciones web a la medida, arquitecturas backend robustas y soluciones Full Stack
                    optimizadas para hacer crecer tu negocio. Código limpio, entrega ágil y resultados medibles.
                </p>

                <div style="animation-delay: 450ms;"
                    class="animate-fade-in-up flex flex-wrap gap-4 pt-2 opacity-0 fill-mode-forwards">
                    <a href="#contact-cta"
                        class="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/30">
                        Cotizar mi Proyecto
                    </a>
                    <a href="#services-list"
                        class="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-3 text-sm font-semibold text-zinc-300 transition duration-300 hover:border-zinc-700 hover:bg-zinc-900">
                        Explorar Servicios
                    </a>
                </div>
            </div>

            <div style="animation-delay: 600ms;"
                class="animate-fade-in-up lg:col-span-5 relative lg:mt-0 mt-12 opacity-0 fill-mode-forwards">

                <div
                    class="relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm shadow-2xl transition-all duration-500 hover:border-zinc-700">

                    <div class="flex gap-1.5 pb-4 border-b border-zinc-800/80 mb-4">
                        <span class="h-3 w-3 rounded-full bg-zinc-700" />
                        <span class="h-3 w-3 rounded-full bg-zinc-700" />
                        <span class="h-3 w-3 rounded-full bg-zinc-700" />
                    </div>

                    <div class="font-mono text-xs sm:text-sm text-zinc-500 space-y-1 select-none overflow-hidden">
                        <div class="typewriter w-fit whitespace-nowrap overflow-hidden border-r-2 border-transparent">
                            <span class="text-blue-400">const</span> <span class="text-emerald-400">service</span> =
                            <span class="text-zinc-300">{</span>
                        </div>
                        <div class="typewriter w-fit whitespace-nowrap overflow-hidden border-r-2 border-transparent pl-4"
                            style="animation-delay: 1.2s;">
                            type: <span class="text-orange-300">'FullStack_Solutions'</span>,
                        </div>
                        <div class="typewriter w-fit whitespace-nowrap overflow-hidden border-r-2 border-transparent pl-4"
                            style="animation-delay: 2.0s;">
                            performance: <span class="text-orange-300">'99%'</span>,
                        </div>
                        <div class="typewriter w-fit whitespace-nowrap overflow-hidden border-r-2 border-transparent pl-4"
                            style="animation-delay: 2.8s;">
                            secure: <span class="text-blue-400">true</span>,
                        </div>
                        <div class="typewriter w-fit whitespace-nowrap overflow-hidden border-r-2 border-transparent pl-4"
                            style="animation-delay: 3.6s;">
                            architecture: <span class="text-orange-300">'Clean_&_Modular'</span>
                        </div>
                        <div class="typewriter w-fit whitespace-nowrap overflow-hidden border-r-2 border-transparent"
                            style="animation-delay: 4.4s;">
                            <span class="text-zinc-300">};</span><span
                                class="animate-pulse text-blue-400 font-bold ml-0.5">|</span>
                        </div>
                    </div>
                </div>

                <div style="animation-delay: 5.2s;"
                    class="animate-slide-from-bottom absolute -bottom-6 -left-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl flex items-center gap-3 opacity-0 fill-mode-forwards transition-transform duration-300 hover:scale-105 hover:border-zinc-700">
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

                <div style="animation-delay: 4.8s;"
                    class="animate-slide-from-right absolute -top-6 -right-4 rounded-xl border border-zinc-800 bg-zinc-950 p-3 shadow-xl flex items-center gap-2 opacity-0 fill-mode-forwards">
                    <span class="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
                    <span class="text-xs font-medium text-zinc-300">Nuxt + Laravel + MySQL</span>
                </div>

            </div>

        </div>
    </section>
</template>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fill-mode-forwards {
    animation-fill-mode: forwards;
}

.typewriter {
    max-width: 0;
    animation: typing 0.8s steps(30, end) forwards;
}

.animate-slide-from-right {
    animation: slideFromRight 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.animate-slide-from-bottom {
    animation: slideFromBottom 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.animate-glow-slow {
    animation: pulseGlow 8s ease-in-out infinite alternate;
}

.animate-glow-delayed {
    animation: pulseGlow 12s ease-in-out infinite alternate-reverse;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes typing {
    from {
        max-width: 0;
    }

    to {
        max-width: 100%;
    }
}

@keyframes slideFromRight {
    from {
        opacity: 0;
        transform: translateX(15px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideFromBottom {
    from {
        opacity: 0;
        transform: translateY(15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulseGlow {
    from {
        transform: scale(1) translate(0px, 0px);
        opacity: 0.8;
    }

    to {
        transform: scale(1.15) translate(15px, -15px);
        opacity: 1;
    }
}
</style>
<template>
    <section id="about" class="border-b border-zinc-900 px-6 py-24">
        <div class="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
            <div class="space-y-6">
                <div>
                    <p class="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">
                        Sobre mí
                    </p>

                    <h2 class="text-4xl font-bold text-white">
                        Full Stack Developer
                    </h2>
                </div>

                <p class="leading-8 text-zinc-400">
                    Soy desarrollador full stack con experiencia en aplicaciones web modernas, APIs y arquitectura
                    escalable.
                    Me especializo en frontend con Vue y React, así como backend con Laravel, Node.js y Python.
                </p>

                <p class="leading-8 text-zinc-400">
                    Disfruto construir productos enfocados en rendimiento, mantenibilidad y experiencia de usuario.
                </p>

                <div class="flex flex-wrap gap-4 pt-4">
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

            <div class="flex items-center justify-center w-full">
                <div
                    class="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 w-full aspect-[14/10]">
                    <a :href="'/images/logo.webp'" class="block w-full h-full cursor-default">
                        <NuxtImg src="/images/logo.webp" alt="Jesus Chicho" width="705" height="500" format="webp"
                            quality="80" loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 500px, 705px"
                            class="h-full w-full object-cover object-center transition duration-500 hover:scale-[1.01]" />
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>
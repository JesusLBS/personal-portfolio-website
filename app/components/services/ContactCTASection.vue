<template>
    <section id="contact-cta" class="px-6 py-28 relative overflow-hidden">

        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />

        <div
            class="mx-auto max-w-5xl rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/60 to-zinc-950/20 px-8 py-16 text-center backdrop-blur-sm sm:px-16">

            <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                ¿Tienes un sistema en mente?<br>
                <span class="text-zinc-400 font-medium text-2xl sm:text-3xl">Construyamos una solución robusta.</span>
            </h2>

            <p class="mt-4 max-w-xl mx-auto text-sm sm:text-base text-zinc-400 leading-7">
                Cuéntame la idea o el problema operativo de tu empresa. Te ofreceré un análisis de arquitectura técnico
                claro, directo y sin rodeos comerciales.
            </p>

            <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">

                <a href="mailto:chichohdzjesus@gmail.com"
                    class="inline-flex items-center gap-2 w-full sm:w-auto justify-center rounded-xl bg-white text-black px-6 py-3.5 text-sm font-semibold transition hover:bg-zinc-200 shadow-md">
                    <Icon name="ri:mail-send-line" class="text-base" />
                    Enviar correo técnico
                </a>

                <a href="https://wa.me/525529983634" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 w-full sm:w-auto justify-center rounded-xl border border-zinc-700 bg-zinc-900/50 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-900 hover:border-zinc-500">
                    <Icon name="ri:whatsapp-line" class="text-base text-emerald-400" />
                    WhatsApp directo
                </a>
            </div>

            <div class="mt-10 flex items-center justify-center gap-6 text-xs text-zinc-500 font-mono">
                <span class="flex items-center gap-1.5">
                    <Icon name="ri:time-line" class="text-sm" />
                    Respuesta en &lt; 24h
                </span>
                <span class="h-3 w-[1px] bg-zinc-800" />
                <span class="flex items-center gap-1.5">
                    <Icon name="ri:shield-check-line" class="text-sm text-blue-500" />
                    Acuerdo de Confidencialidad (NDA)
                </span>
            </div>

        </div>
    </section>
</template>
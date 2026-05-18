<script setup lang="ts">
import { ref } from 'vue';

const openFaqIndex = ref<number | null>(null);

const toggleFaq = (index: number) => {
    openFaqIndex.value = openFaqIndex.value === index ? null : index;
};

const businessStack = [
    {
        name: 'Node.js & APIs Robustas',
        icon: 'ri:instance-line',
        benefit: 'Motores backend de alta velocidad capaces de procesar miles de operaciones por segundo sin caídas de sistema.'
    },
    {
        name: 'Nuxt & Interfaces Premium',
        icon: 'ri:smartphone-line',
        benefit: 'Paneles y aplicaciones web fluidas, intuitivas y rápidas que reducen el tiempo de capacitación de tu personal.'
    },
    {
        name: 'Bases de Datos Relacionales',
        icon: 'ri:database-2-line',
        benefit: 'Estructuras con integridad de datos y respaldos automatizados para garantizar que la información de tu empresa esté blindada.'
    }
];

const faqs = [
    {
        question: '¿Cómo sé si mi empresa necesita un sistema a la medida o un software ya existente?',
        answer: 'Si tu equipo pasa horas usando hojas de Excel complejas, duplicando tareas a mano, o si los softwares comerciales te cobran licencias carísimas por usuario y no se adaptan a tu forma de trabajar, necesitas una solución a la medida. Yo analizo tu proceso actual y te digo con honestidad si te conviene desarrollar algo propio o usar una herramienta existente.'
    },
    {
        question: '¿Qué pasa si mi presupuesto es limitado o solo quiero empezar con algo básico?',
        answer: 'No tienes que construir una plataforma gigante desde el primer día. Podemos empezar con un MVP (Mínimo Viable): un sistema compacto que resuelva tu problema más urgente de inmediato. Esto reduce tu inversión inicial, automatiza lo más importante y deja la estructura lista para crecer cuando tu negocio lo requiera.'
    },
    {
        question: '¿Cuánto tiempo toma desarrollar un sistema y cuándo veré los primeros resultados?',
        answer: 'El tiempo depende de la complejidad, pero un MVP o sistema básico suele estar listo entre 3 y 6 semanas depedeindo complejidad.'
    },
    {
        question: '¿Cómo garantizamos que el sistema realmente funcione como yo espero?',
        answer: 'Trabajamos por etapas claras. No me escondo a programar durante meses para luego entregarte algo que no te gusta. Cada dos semanas te mostraré avances reales y funcionales en una pantalla de pruebas. Tú los revisas, los apruebas y solo cuando estás conforme, avanzamos a la siguiente fase y se libera el pago correspondiente.'
    }
];
</script>

<template>
    <div class="bg-zinc-950/40 border-b border-zinc-900">

        <div class="mx-auto max-w-7xl px-6 pt-20 pb-12">
            <p class="text-xs font-mono tracking-wider text-blue-400 uppercase mb-3">Infraestructura y Garantía</p>
            <h3 class="text-2xl font-bold text-white tracking-tight">Tecnología de nivel empresarial para tus soluciones
            </h3>

            <div class="mt-8 grid gap-6 sm:grid-cols-3">
                <div v-for="tech in businessStack" :key="tech.name"
                    class="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5 flex gap-4 items-start">
                    <div
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                        <Icon :name="tech.icon" class="text-xl" />
                    </div>
                    <div>
                        <h4 class="text-sm font-semibold text-white">{{ tech.name }}</h4>
                        <p class="mt-1.5 text-xs text-zinc-400 leading-5">{{ tech.benefit }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mx-auto max-w-7xl px-6 py-12">
            <div
                class="rounded-2xl border border-zinc-800/80 bg-gradient-to-r from-zinc-900/60 via-zinc-900/30 to-transparent p-8 grid gap-6 md:grid-cols-12 md:items-center">
                <div class="md:col-span-8">
                    <span
                        class="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400 mb-3">
                        Alcance Flexible
                    </span>
                    <h3 class="text-xl font-bold text-white">Soluciones escalables adaptadas a tu etapa actual</h3>
                    <p class="mt-2 text-sm text-zinc-400 leading-6">
                        No necesitas una inversión multimillonaria para empezar a digitalizar tu empresa. Diseño
                        arquitecturas de software adaptables: podemos iniciar con un **MVP (Mínimo Viable)** enfocado en
                        resolver tu problema más urgente de inmediato, y dejar los cimientos listos para escalar hacia
                        un **sistema robusto de alta disponibilidad** conforme tu negocio lo requiera.
                    </p>
                </div>
                <div class="md:col-span-4 flex md:justify-end">
                    <a href="#contact-cta"
                        class="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition group">
                        Consultar viabilidad de mi idea
                        <span class="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </div>
            </div>
        </div>

        <div class="mx-auto max-w-7xl px-6 pt-12 pb-24 grid gap-12 lg:grid-cols-12">

            <div class="lg:col-span-5 space-y-4">
                <p class="text-xs font-mono tracking-wider text-zinc-500 uppercase">Respuestas Claras</p>
                <h3 class="text-2xl font-bold text-white tracking-tight">
                    Menos tecnicismos, más soluciones para tu negocio
                </h3>
                <p class="text-sm text-zinc-400 leading-7">
                    Invertir en software para tu empresa puede generar dudas o temor a perder dinero. Aquí respondo con
                    total transparencia las preguntas que mis clientes reales se hacen antes de iniciar.
                </p>
                <div class="pt-2">
                    <a href="#contact-cta"
                        class="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition group">
                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ¿Tienes un problema operativo específico? Cuéntamelo aquí
                        <span class="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </div>
            </div>

            <div class="lg:col-span-7 space-y-3">
                <div v-for="(faq, index) in faqs" :key="index"
                    class="rounded-xl border border-zinc-900 bg-zinc-900/10 overflow-hidden transition-colors duration-200"
                    :class="{ 'border-zinc-800 bg-zinc-900/20': openFaqIndex === index }">

                    <button @click="toggleFaq(index)"
                        class="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-sm text-white select-none hover:bg-zinc-900/30 transition-colors">
                        <span>{{ faq.question }}</span>
                        <Icon name="ri:arrow-down-s-line"
                            class="text-zinc-500 text-lg transition-transform duration-300"
                            :class="{ 'rotate-180 text-blue-400': openFaqIndex === index }" />
                    </button>

                    <div class="transition-all duration-300 ease-in-out overflow-hidden"
                        :style="{ maxHeight: openFaqIndex === index ? '200px' : '0px' }">
                        <p
                            class="px-6 pb-5 text-xs sm:text-sm text-zinc-400 leading-6 border-t border-zinc-900/50 pt-3">
                            {{ faq.answer }}
                        </p>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>
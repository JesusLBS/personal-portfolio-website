<script setup lang="ts">
import { onMounted, ref } from 'vue';

const headerRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);

const headerIntersecting = ref(false);
const gridIntersecting = ref(false);

onMounted(() => {
    const headerObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry && entry.isIntersecting) {
                headerIntersecting.value = true;
                if (headerRef.value) headerObserver.unobserve(headerRef.value);
            }
        },
        { rootMargin: "0px 0px -50px 0px", threshold: 0.1 }
    );

    const gridObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry && entry.isIntersecting) {
                gridIntersecting.value = true;
                if (gridRef.value) gridObserver.unobserve(gridRef.value);
            }
        },
        {
            rootMargin: "0px 0px -200px 0px",
            threshold: 0.35
        }
    );

    if (headerRef.value) headerObserver.observe(headerRef.value);
    if (gridRef.value) gridObserver.observe(gridRef.value);
});

const services = [
    {
        icon: 'ri:code-s-slash-line',
        title: 'Desarrollo Web a la Medida',
        description: 'Sistemas web robustos, ERPs y plataformas SaaS escalables diseñadas desde cero para cubrir las necesidades exactas de tu operación.'
    },
    {
        icon: 'ri:database-2-line',
        title: 'Arquitecturas Backend & APIs',
        description: 'Diseño de bases de datos relacionales blindadas y APIs RESTful de alto rendimiento que garantizan la integridad y velocidad de tus datos.'
    },
    {
        icon: 'ri:smartphone-line',
        title: 'Aplicaciones Full Stack',
        description: 'Soluciones integrales de inicio a fin utilizando stacks modernos (Nuxt + Laravel). Interfaces rápidas conectadas a servicios estables.'
    }
];
</script>

<template>
    <section id="services-list" class="px-6 py-28 border-b border-zinc-900 bg-zinc-950/40">
        <div class="mx-auto max-w-7xl">

            <div ref="headerRef"
                class="mb-20 text-center transition-all duration-1000 cubic-bezier-premium opacity-0 translate-y-6"
                :class="{ 'opacity-100 translate-y-0': headerIntersecting }">
                <p class="text-sm uppercase tracking-[0.3em] text-zinc-500">¿Cómo puedo ayudarte?</p>
                <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Servicios de Ingeniería de Software
                </h2>
                <p class="mt-4 mx-auto max-w-2xl text-zinc-400 text-sm sm:text-base leading-7">
                    Soluciones técnicas sin parches ni código obsoleto. Construyo herramientas digitales pensadas en la
                    escalabilidad y el retorno de inversión de tu negocio.
                </p>
            </div>

            <div ref="gridRef" class="grid gap-8 md:grid-cols-3">
                <div v-for="(service, index) in services" :key="index" class="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-8 transition-all
                    duration-[1400ms] cubic-bezier-premium opacity-0 translate-y-28 hover:border-zinc-700
                    hover:bg-zinc-900/30" :class="{ 'opacity-100 translate-y-0': gridIntersecting }"
                    :style="{ 'transition-delay': `${index * 350}ms` }">
                    <div
                        class="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-blue-400 transition-colors group-hover:border-blue-500/30 group-hover:bg-blue-500/5">
                        <Icon :name="service.icon" class="h-6 w-6 transition-transform group-hover:scale-110" />
                    </div>

                    <h3 class="mt-6 text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {{ service.title }}
                    </h3>

                    <p class="mt-3 text-sm text-zinc-400 leading-6">
                        {{ service.description }}
                    </p>

                    <div
                        class="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent group-hover:via-blue-500/30 transition-all duration-500" />
                </div>
            </div>

        </div>
    </section>
</template>

<style scoped>
.cubic-bezier-premium {
    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1);
}
</style>
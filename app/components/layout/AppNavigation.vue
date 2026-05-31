<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useNavigationState } from '~/composables/useNavigationState';

const { isExactlyAtServices, isClientMode, activeSection, isDrawerOpen, observeSections, stopObserving } = useNavigationState();

const logoTarget = computed(() => isClientMode.value ? '/services' : '/');

const technicalLinks = [
    { label: 'Sobre mí', href: '#about' },
    { label: 'Experiencia', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Arquitectura', href: '#architecture' },
    { label: 'Contacto', href: '#contact' },
];

const servicesLinks = [
    { label: 'Inicio', href: '#hero-services' },
    { label: 'Servicios', href: '#services-list' },
    { label: 'Mi Proceso', href: '#process' },
    { label: 'Contacto', href: '#contact-cta' },
];

const currentLinks = computed(() => isExactlyAtServices.value ? servicesLinks : technicalLinks);

const handleMobileNav = (href: string) => {
    isDrawerOpen.value = false;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const handleOutsideClick = (e: MouseEvent) => {
    const drawer = document.getElementById('mobile-drawer');
    const toggle = document.getElementById('drawer-toggle');
    if (drawer && !drawer.contains(e.target as Node) && !toggle?.contains(e.target as Node)) {
        isDrawerOpen.value = false;
    }
};

onMounted(() => {
    const ids = currentLinks.value.map(l => l.href);
    observeSections(ids);
    document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
    stopObserving();
    document.removeEventListener('click', handleOutsideClick);
});
</script>

<template>
    <header class="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

            <NuxtLink :to="logoTarget" class="text-sm font-semibold tracking-wide text-white">
                Jesus Chicho
            </NuxtLink>

            <nav aria-label="Navegación principal" class="hidden items-center gap-8 md:flex">
                <a v-for="link in currentLinks" :key="link.href" :href="link.href" :class="[
                    'text-sm transition',
                    activeSection === link.href
                        ? 'text-white font-bold'
                        : 'text-zinc-400 hover:text-white'
                ]">
                    {{ link.label }}
                </a>
            </nav>

            <div class="flex items-center gap-4">
                <div class="hidden items-center gap-6 md:flex">
                    <NuxtLink v-if="isExactlyAtServices" :to="{ path: '/', query: { mode: 'client' } }"
                        class="text-sm font-medium text-zinc-400 transition hover:text-white">
                        Ver Perfil Técnico →
                    </NuxtLink>
                    <NuxtLink v-else-if="isClientMode" to="/services"
                        class="text-sm font-medium text-blue-400 transition hover:text-blue-300">
                        ← Volver a Servicios
                    </NuxtLink>
                    <span v-if="isClientMode" class="h-4 w-[1px] bg-zinc-800" />
                    <a v-if="!isClientMode" href="/files/cv_jesus_chicho_hernandez.pdf" target="_blank"
                        class="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-900">
                        Descargar CV
                    </a>
                    <a v-else :href="isExactlyAtServices ? '#contact-cta' : '/services#contact-cta'"
                        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
                        Cotizar Proyecto
                    </a>
                </div>

                <button id="drawer-toggle" type="button" aria-label="Toggle menu"
                    class="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 transition hover:border-zinc-500 hover:text-white md:hidden"
                    @click="isDrawerOpen = !isDrawerOpen">
                    <Icon :name="isDrawerOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="h-5 w-5" />
                </button>
            </div>
        </div>
    </header>

    <Transition name="backdrop">
        <div v-if="isDrawerOpen" class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            @click="isDrawerOpen = false" />
    </Transition>

    <Transition name="drawer">
        <div v-if="isDrawerOpen" id="mobile-drawer"
            class="fixed right-0 top-0 z-50 flex h-full w-72 flex-col border-l border-zinc-800 bg-zinc-950 md:hidden">

            <div class="flex h-16 items-center justify-between border-b border-zinc-800 px-6">
                <span class="text-sm font-semibold text-white">Jesus Chicho</span>
                <button type="button" aria-label="Close menu"
                    class="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:text-white"
                    @click="isDrawerOpen = false">
                    <Icon name="i-heroicons-x-mark" class="h-5 w-5" />
                </button>
            </div>

            <nav aria-label="Navegación móvil" class="flex flex-col gap-1 p-4">
                <a v-for="link in currentLinks" :key="link.href" :href="link.href" :class="[
                    'rounded-lg px-4 py-3 text-sm transition',
                    activeSection === link.href
                        ? 'bg-zinc-800 text-white font-medium'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                ]" @click="handleMobileNav(link.href)">
                    {{ link.label }}
                </a>
            </nav>

            <div class="mt-auto border-t border-zinc-800 p-4 flex flex-col gap-3">
                <NuxtLink v-if="isExactlyAtServices" :to="{ path: '/', query: { mode: 'client' } }"
                    class="text-sm font-medium text-zinc-400 transition hover:text-white" @click="isDrawerOpen = false">
                    Ver Perfil Técnico →
                </NuxtLink>
                <NuxtLink v-else-if="isClientMode" to="/services"
                    class="text-sm font-medium text-blue-400 transition hover:text-blue-300"
                    @click="isDrawerOpen = false">
                    ← Volver a Servicios
                </NuxtLink>
                <a v-if="!isClientMode" href="/files/cv_jesus_chicho_hernandez.pdf" target="_blank"
                    class="rounded-lg border border-zinc-700 px-4 py-3 text-center text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-900"
                    @click="isDrawerOpen = false">
                    Descargar CV
                </a>
                <a v-else :href="isExactlyAtServices ? '#contact-cta' : '/services#contact-cta'"
                    class="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-500"
                    @click="isDrawerOpen = false">
                    Cotizar Proyecto
                </a>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-enter-from,
.drawer-leave-to {
    transform: translateX(100%);
}

.backdrop-enter-active,
.backdrop-leave-active {
    transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
    opacity: 0;
}
</style>
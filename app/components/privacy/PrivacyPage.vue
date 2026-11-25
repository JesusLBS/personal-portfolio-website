<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
    <section class="px-6 py-16 sm:py-24">
        <div class="mx-auto max-w-3xl">
            <p class="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-300">Privacidad</p>
            <h1 class="break-words text-3xl font-bold leading-tight text-white sm:text-4xl">{{ title }}</h1>
            <article class="mt-8 space-y-8 break-words text-base leading-8 text-zinc-300 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:text-cyan-300 [&_a]:underline [&_a]:underline-offset-4">
                <slot />
            </article>
            <NuxtLink to="/" class="mt-12 inline-block rounded-lg border border-zinc-700 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-900">Volver al portfolio</NuxtLink>
        </div>
    </section>
</template>

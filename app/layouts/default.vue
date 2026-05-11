<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue';
import AppFooter from '~/components/layout/AppFooter.vue';
import ScrollToTopButton from '~/components/ui/ScrollToTopButton.vue';
</script>

<template>
    <div class="min-h-screen bg-zinc-950 text-white">
        <AppHeader />

        <main>
            <slot />
        </main>

        <AppFooter />
        <ScrollToTopButton />
    </div>
</template>
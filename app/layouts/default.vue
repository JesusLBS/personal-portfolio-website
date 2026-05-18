<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue';
import AppFooter from '~/components/layout/AppFooter.vue';
import ScrollToTopButton from '~/components/ui/ScrollToTopButton.vue';
import FloatingWhatsapp from '~/components/ui/FloatingWhatsapp.vue';
</script>

<template>
    <div class="min-h-screen bg-zinc-950 text-white">
        <AppHeader />

        <main>
            <slot />
        </main>
        <FloatingWhatsapp />
        <AppFooter />
        <ScrollToTopButton />
    </div>
</template>
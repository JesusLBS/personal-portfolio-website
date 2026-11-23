<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue';
import AppFooter from '~/components/layout/AppFooter.vue';
import ScrollToTopButton from '~/components/ui/ScrollToTopButton.vue';
import FloatingWhatsapp from '~/components/ui/FloatingWhatsapp.vue';
import CvPreviewModal from '~/components/ui/CvPreviewModal.vue';
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
        <CvPreviewModal />
    </div>
</template>

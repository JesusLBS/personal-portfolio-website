<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue';
import AppFooter from '~/components/layout/AppFooter.vue';
import ScrollToTopButton from '~/components/ui/ScrollToTopButton.vue';
import FloatingWhatsapp from '~/components/ui/FloatingWhatsapp.vue';
import CvPreviewModal from '~/components/ui/CvPreviewModal.vue';
import PrivacyBanner from '~/components/privacy/PrivacyBanner.vue';
import PrivacyPreferences from '~/components/privacy/PrivacyPreferences.vue';
const { analyticsEnabled } = usePrivacySettings();
</script>

<template>
    <div class="min-h-screen bg-zinc-950 text-white">
        <AppHeader />
        <PrivacyBanner v-if="analyticsEnabled" />

        <main>
            <slot />
        </main>
        <FloatingWhatsapp />
        <AppFooter />
        <ScrollToTopButton />
        <CvPreviewModal />
        <PrivacyPreferences v-if="analyticsEnabled" />
    </div>
</template>

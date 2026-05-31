<script setup lang="ts">
import HeroServicesSection from '~/components/services/HeroServicesSection.vue';
import ServicesSection from '~/components/services/ServicesSection.vue';
import ProcessSection from '~/components/services/ProcessSection.vue';
import ContactCTASection from '~/components/services/ContactCTASection.vue';
import TrustSection from '~/components/services/TrustSection.vue';
import VisualsSection from '~/components/services/VisualsSection.vue';
</script>

<template>
    <main>
        <HeroServicesSection id="hero-services" />
        <ServicesSection id="services-list" />
        <TrustSection id="trust-section"/>
        <VisualsSection id="visual-cases" />
        <ProcessSection id="process" />
        <ContactCTASection id="contact-cta" />
    </main>
</template>
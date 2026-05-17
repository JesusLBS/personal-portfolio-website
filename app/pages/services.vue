<script setup lang="ts">
import HeroServicesSection from '~/components/services/HeroServicesSection.vue';
import ServicesSection from '~/components/services/ServicesSection.vue';
import ProcessSection from '~/components/services/ProcessSection.vue';
import ContactCTASection from '~/components/services/ContactCTASection.vue';
</script>

<template>
    <main>
        <HeroServicesSection id="hero-services" />
        <ServicesSection id="services-list" />
        <ProcessSection id="process" />
        <ContactCTASection id="contact-cta" />
    </main>
</template>
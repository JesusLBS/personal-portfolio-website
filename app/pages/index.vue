<script setup lang="ts">
import AboutSection from '~/components/sections/AboutSection.vue';
import ArchitectureSection from '~/components/sections/ArchitectureSection.vue';
import ContactSection from '~/components/sections/ContactSection.vue';
import ExperienceSection from '~/components/sections/ExperienceSection.vue';
import HeroSection from '~/components/sections/HeroSection.vue';
import ProjectsSection from '~/components/sections/ProjectsSection.vue';
import SkillsSection from '~/components/sections/SkillsSection.vue';

</script>

<template>
    <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ArchitectureSection />
        <ContactSection />
    </main>
</template>
<script setup lang="ts">
import ContactPanel from '~/components/ui/ContactPanel.vue';
</script>

<template>
    <ContactPanel id="contact" eyebrow="Contacto" title="Trabajemos juntos"
        description="Disponible para proyectos freelance, tiempo completo o colaboración técnica.">
        <template #secondary-links>
            <div class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-zinc-400">
                <a href="https://www.linkedin.com/in/jesus-chicho-hernandez/" target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400">
                    <Icon name="ri:linkedin-line" class="shrink-0 text-base" aria-hidden="true" />
                    Ver perfil en LinkedIn
                </a>
                <a href="https://github.com/JesusLBS/" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400">
                    <Icon name="ri:github-line" class="shrink-0 text-base" aria-hidden="true" />
                    Ver repositorios
                </a>
            </div>
        </template>
    </ContactPanel>
</template>

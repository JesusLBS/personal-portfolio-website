<script setup lang="ts">
import ContactPanel from '~/components/ui/ContactPanel.vue';
</script>

<template>
    <ContactPanel id="contact-cta" title="¿Tienes un sistema en mente?" subtitle="Construyamos una solución robusta."
        description="Cuéntame la idea o el problema operativo de tu empresa. Te ofreceré un análisis de arquitectura técnico claro, directo y sin rodeos comerciales."
        email-label="Enviar correo técnico">
        <template #details>
            <div class="mt-10 flex items-center justify-center gap-6 font-mono text-xs text-zinc-500">
                <span class="flex items-center gap-1.5">
                    <Icon name="ri:time-line" class="text-sm" aria-hidden="true" />
                    Respuesta en &lt; 24h
                </span>
                <span class="h-3 w-px bg-zinc-800" aria-hidden="true" />
                <span class="flex items-center gap-1.5">
                    <Icon name="ri:shield-check-line" class="text-sm text-blue-500" aria-hidden="true" />
                    Acuerdo de Confidencialidad (NDA)
                </span>
            </div>
        </template>
    </ContactPanel>
</template>

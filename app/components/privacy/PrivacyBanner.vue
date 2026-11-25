<script setup lang="ts">
const { privacyContact } = usePrivacySettings();
const { showBanner, saveChoice, openPreferences } = usePrivacyConsent();
</script>

<template>
    <section v-if="showBanner" aria-labelledby="privacy-banner-title" data-privacy-banner
        class="fixed inset-x-4 bottom-4 z-[70] mx-auto flex max-h-[50dvh] max-w-5xl flex-col rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-white shadow-2xl sm:p-5">
        <h2 id="privacy-banner-title" class="shrink-0 text-base font-semibold">Tu privacidad</h2>
        <div data-privacy-summary tabindex="0" role="region" aria-label="Resumen del aviso de privacidad"
            class="mt-2 min-h-0 space-y-2 overflow-y-auto text-xs leading-5 text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 sm:text-sm">
            <p data-privacy-analytics-summary>Solo si aceptas, Google Analytics usa identificadores de cookies y datos de navegación para estadísticas opcionales del alcance y uso del portfolio y mejora de su contenido, sin publicidad. Puedes rechazar y seguir navegando o cambiar tu elección desde las preferencias del footer.</p>
            <p><strong>{{ privacyContact.name }}</strong>, responsable. {{ privacyContact.addressLabel }}: {{ privacyContact.address }}.</p>
            <p>El alojamiento procesa IP y datos técnicos para entregar y proteger el sitio. La preferencia local recuerda tu elección; el contacto por correo o WhatsApp utiliza lo que compartas para responderte. No se solicitan datos sensibles.</p>
        </div>
        <p class="mt-2 shrink-0 text-xs leading-5 text-zinc-400 sm:text-sm">
            <NuxtLink to="/privacidad" class="underline underline-offset-4 hover:text-white">Aviso de privacidad integral</NuxtLink>
            <span aria-hidden="true"> · </span>
            <NuxtLink to="/cookies" class="underline underline-offset-4 hover:text-white">Cookies y preferencias</NuxtLink>
        </p>
        <div class="mt-3 grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <button type="button" data-privacy-accept
                class="min-h-10 rounded-lg border border-zinc-600 px-2 py-2 text-xs font-semibold transition hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 sm:px-4 sm:text-sm"
                @click="saveChoice(true)">Aceptar analítica</button>
            <button type="button" data-privacy-reject
                class="min-h-10 rounded-lg border border-zinc-600 px-2 py-2 text-xs font-semibold transition hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 sm:px-4 sm:text-sm"
                @click="saveChoice(false)">Rechazar analítica</button>
            <button id="privacy-banner-preferences" type="button"
                class="col-span-2 rounded-lg px-3 py-1 text-xs text-zinc-300 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 sm:py-2 sm:text-sm"
                @click="openPreferences('privacy-banner-preferences')">Configurar</button>
        </div>
    </section>
</template>

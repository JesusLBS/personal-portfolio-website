<script setup lang="ts">
const { privacyContact } = usePrivacySettings();
const { calendlyUrl } = useScheduling();
</script>

<template>
    <div data-contact-privacy
        class="mx-auto mt-8 max-w-3xl border-t border-zinc-800/80 pt-4 text-left text-xs leading-5 text-zinc-400">
        <p>
            {{ privacyContact.name }} utiliza tu nombre, correo o teléfono y la información que compartas para responder solicitudes profesionales.
            <template v-if="calendlyUrl">Si reservas mediante Calendly, los datos de la reserva se utilizan para organizar la reunión.</template>
            No se solicitan datos sensibles.
        </p>
        <div class="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-8">
            <p class="min-w-0 break-words">
                <span class="font-medium">{{ privacyContact.addressLabel }}:</span>
                {{ privacyContact.address }}.
            </p>
            <div class="min-w-0 space-y-1 sm:text-right">
                <p>
                    Puedes ejercer tus derechos de privacidad en
                    <a :href="`mailto:${privacyContact.email}`"
                        class="block whitespace-nowrap underline underline-offset-4 hover:text-white">{{ privacyContact.email }}</a>
                </p>
                <NuxtLink to="/privacidad" class="inline-block underline underline-offset-4 hover:text-white">
                    Aviso de privacidad integral
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

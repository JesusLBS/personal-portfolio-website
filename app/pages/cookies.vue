<script setup lang="ts">
import PrivacyPage from '~/components/privacy/PrivacyPage.vue';
const { analyticsEnabled, privacyContact } = usePrivacySettings();

const { openPreferences } = usePrivacyConsent();
useSeoMeta({ title: 'Cookies y preferencias | Jesus Chicho Hernández', description: () => analyticsEnabled.value ? 'Cómo se guarda tu elección de privacidad y cuándo se utiliza Google Analytics en este portfolio.' : 'Información sobre cookies y servicios externos de este portfolio, sin analítica activa.' });
useHead({ link: [{ rel: 'canonical', href: 'https://chichohdz.com/cookies' }] });
</script>

<template>
    <PrivacyPage title="Cookies y preferencias">
        <p class="text-sm text-zinc-400">Última actualización: {{ privacyContact.updatedAt }}.</p>
        <template v-if="analyticsEnabled">
                <section>
                    <h2>Tú eliges la analítica</h2>
                    <p>Puedes utilizar el portfolio sin aceptar Google Analytics. Si no eliges una opción, el aviso permanece visible y la analítica sigue bloqueada; puedes continuar leyendo o consultar el CV. La etiqueta y las cookies de analítica solo se habilitan tras tu aceptación. No se utilizan campañas publicitarias ni se solicita permiso para publicidad.</p>
                    <button id="privacy-page-preferences" type="button"
                        class="mt-4 rounded-lg border border-cyan-400 px-4 py-3 text-sm font-semibold text-cyan-300 hover:bg-cyan-400 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                        @click="openPreferences('privacy-page-preferences')">Cambiar preferencias</button>
                </section>
                <section>
                    <h2>Preferencia necesaria del navegador</h2>
                    <p>La clave <code>portfolio-privacy</code> del almacenamiento local recuerda si aceptaste o rechazaste la analítica, la versión de esa elección y su fecha. Su vigencia es de 180 días y no contiene un identificador de visitante. Permite respetar tu decisión sin volver a preguntar en cada página.</p>
                    <p>Si borras este almacenamiento, cambias de navegador o vence la preferencia, se volverá a solicitar tu elección. Si el navegador impide guardarla, la decisión se mantiene mientras esta página esté abierta, también al cambiar de pestaña. Una recarga o nueva entrada volverá a consultar el almacenamiento disponible; no se puede garantizar que esa decisión temporal se conserve.</p>
                </section>
                <section>
                    <h2>Cookies de Google Analytics</h2>
                    <p>Al aceptar, GA4 puede utilizar cookies de primera parte como <code>_ga</code> y <code>_ga_*</code> para distinguir visitas y conservar el estado de las sesiones. El sitio solicita una duración de hasta 180 días, sin renovación automática del plazo de la cookie configurada. La existencia y duración concreta dependen también del navegador y del comportamiento del proveedor.</p>
                    <p>Estas cookies permiten obtener informes generales de visitas, páginas consultadas y procedencia del tráfico para evaluar el alcance del portfolio. Esos informes no confirman la identidad de quien visita la web ni que se trate de un reclutador. La duración de una cookie no indica cuánto tiempo permanece un dato en los servidores de Google ni cuándo se eliminan sus informes agregados.</p>
                </section>
                <section>
                    <h2>Cambiar o retirar tu elección</h2>
                    <p>Abre «Preferencias de privacidad» desde el footer o desde esta página. Puedes activar o desactivar la analítica y guardar. Tras retirarla, el sitio detiene nuevas mediciones y elimina las cookies de Analytics que puede gestionar en su dominio.</p>
                    <p>Si el navegador permite guardar el rechazo, la página se recarga para descartar la etiqueta ya cargada. Si no lo permite, Analytics se deshabilita en el documento abierto sin recargar, para no perder la elección temporal; la biblioteca puede seguir cargada hasta cerrar o recargar esa página.</p>
                    <p>También puedes administrar las cookies y el almacenamiento desde tu navegador. Los datos recibidos anteriormente por Google no se eliminan automáticamente al borrar las cookies; para solicitudes relacionadas con tus datos, consulta el <NuxtLink to="/privacidad">aviso de privacidad</NuxtLink>.</p>
                </section>
                <section>
                    <h2>Servicios externos</h2>
                    <p>Los enlaces de correo, WhatsApp, redes sociales y otros servicios llevan a plataformas con sus propias condiciones. Esta elección de analítica controla el seguimiento de este portfolio, no las preferencias de las plataformas que decidas abrir.</p>
                </section>
        </template>
        <template v-else>
            <section data-privacy-disabled-info>
                <h2>Sin cookies de analítica</h2>
                <p>Este portfolio no utiliza cookies de analítica ni de publicidad, ni almacenamiento para seguimiento. Puedes consultar el contenido y el CV sin elegir preferencias de analítica.</p>
                <p>Si quedan cookies anteriores de Analytics accesibles para este sitio, se eliminan al cargar la página. Una elección guardada anteriormente no se consulta ni se modifica mientras la analítica esté deshabilitada.</p>
            </section>
            <section>
                <h2>Servicios externos</h2>
                <p>Los enlaces de correo, WhatsApp, LinkedIn y otros servicios llevan a plataformas con sus propias condiciones de privacidad y almacenamiento.</p>
                <p>Consulta el <NuxtLink to="/privacidad">aviso de privacidad integral</NuxtLink> para conocer el tratamiento de solicitudes profesionales y los datos técnicos del alojamiento.</p>
            </section>
        </template>
    </PrivacyPage>
</template>

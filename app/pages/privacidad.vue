<script setup lang="ts">
import PrivacyPage from '~/components/privacy/PrivacyPage.vue';
const { analyticsEnabled, privacyContact } = usePrivacySettings();
const { calendlyUrl } = useScheduling();

useSeoMeta({ title: 'Aviso de privacidad | Jesus Chicho Hernández', description: 'Datos, finalidades y medios para ejercer tus derechos de privacidad en este portfolio.' });
useHead({ link: [{ rel: 'canonical', href: 'https://chichohdz.com/privacidad' }] });
</script>

<template>
    <PrivacyPage title="Aviso de privacidad">
        <p class="text-sm text-zinc-400">Última actualización: {{ privacyContact.updatedAt }}.</p>
        <section>
            <h2>Responsable y contacto</h2>
            <p>{{ privacyContact.name }} es responsable del tratamiento de datos asociado a este portfolio y a la atención de las solicitudes profesionales que recibe.</p>
            <p data-privacy-contact-address>{{ privacyContact.addressLabel }}: {{ privacyContact.address }}.</p>
            <p>El responsable atiende directamente las solicitudes de privacidad en <a :href="`mailto:${privacyContact.email}`">{{ privacyContact.email }}</a>.</p>
        </section>
        <section>
            <h2>Qué datos se tratan y para qué</h2>
            <ul>
                <li><strong>Contacto profesional:</strong> nombre, correo, teléfono y la información que decidas compartir por correo o WhatsApp, para responder preguntas, solicitudes de servicios u oportunidades profesionales.</li>
                <li v-if="calendlyUrl"><strong>Agenda de reuniones:</strong> si reservas en Calendly, tu nombre, correo, fecha, horario y la información que decidas compartir se utilizan para organizar la conversación y gestionar la reserva.</li>
                <li v-if="calendlyUrl"><strong>Disponibilidad de la agenda:</strong> el país aproximado de tu conexión, proporcionado por Netlify, se utiliza para mostrar la opción de reserva a visitantes ubicados en México. La aplicación no conserva ese resultado en cookies ni almacenamiento local y no solicita acceso a la ubicación de tu dispositivo.</li>
                <li><strong>Funcionamiento del sitio:</strong> dirección IP y otros datos técnicos de la conexión y de las solicitudes de páginas o archivos, que los proveedores de alojamiento pueden procesar para entregar el contenido y mantener la seguridad del servicio.</li>
                <li v-if="analyticsEnabled"><strong>Estadísticas opcionales:</strong> con tu aceptación, Google Analytics 4 utiliza identificadores de cookies y datos de navegación, páginas consultadas, interacciones, procedencia del tráfico, ubicación geográfica aproximada y datos técnicos del navegador y dispositivo. La finalidad es evaluar el alcance y uso de este perfil profesional y mejorar su contenido.</li>
                <li v-if="analyticsEnabled"><strong>Tu elección de privacidad:</strong> se guarda en este navegador si aceptaste o rechazaste la analítica, la versión de la preferencia y la fecha de tu decisión, para respetarla durante 180 días.</li>
            </ul>
            <p>El sitio no dispone de registro de usuarios ni de formularios propios para solicitar datos sensibles. Evita enviar documentos de identidad, información médica u otros datos sensibles para una consulta inicial.</p>
        </section>
        <section v-if="analyticsEnabled">
            <h2>Analítica y consentimiento</h2>
            <p>Estas estadísticas son una finalidad opcional, distinta de atender un contacto profesional. La etiqueta de Google Analytics se carga únicamente después de aceptar la analítica. Rechazarla no impide consultar el portfolio, sus proyectos o el CV. No se utiliza para campañas ni personalización de anuncios.</p>
            <p>Puedes cambiar tu elección desde «Preferencias de privacidad» en el footer. Si retiras la aceptación, se detienen las nuevas mediciones y se eliminan las cookies de Analytics accesibles para este sitio. La retirada no elimina automáticamente los datos que el proveedor haya recibido con anterioridad.</p>
            <p>Consulta la <NuxtLink to="/cookies">información sobre cookies y preferencias</NuxtLink> para conocer el almacenamiento utilizado.</p>
        </section>
        <section>
            <h2>Proveedores y enlaces externos</h2>
            <p>El sitio utiliza Netlify para alojamiento y entrega del contenido<span v-if="analyticsEnabled">, y Google Analytics para las estadísticas que aceptes</span>. Los proveedores pueden procesar información mediante infraestructura situada en otros países conforme a sus condiciones aplicables.</p>
            <p>Al abrir enlaces de WhatsApp, redes sociales, repositorios o certificaciones, accedes a servicios externos con sus propias prácticas de privacidad. El CV y las capturas se ofrecen desde el portfolio; los datos de las capturas de proyectos son ficticios de demostración.</p>
            <p v-if="calendlyUrl" data-scheduling-notice>La agenda se abre en Calendly, en una nueva pestaña. El portfolio no incorpora su formulario, scripts ni cookies. Al abrirla, Calendly procesa la navegación conforme a sus condiciones y, si reservas, gestiona los datos de la reunión por cuenta del responsable. Las preferencias de Analytics del portfolio no controlan ese servicio externo.</p>
            <ul>
                <li v-if="analyticsEnabled"><a href="https://policies.google.com/technologies/partner-sites?hl=es" target="_blank" rel="noopener noreferrer">Cómo usa Google la información de sitios que utilizan sus servicios</a>.</li>
                <li><a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Información de privacidad de Netlify</a>.</li>
                <li v-if="calendlyUrl"><a href="https://calendly.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Información de privacidad de Calendly</a>.</li>
            </ul>
        </section>
        <section>
            <h2>Conservación y seguridad</h2>
            <p>Los mensajes de contacto permanecen en los servicios de correo o WhatsApp utilizados para la comunicación. Se conservan mientras sean necesarios para atender tu solicitud, mantener la relación profesional y cumplir las obligaciones legales aplicables. Puedes solicitar su cancelación cuando corresponda.</p>
            <p v-if="calendlyUrl">Los datos de las reservas se gestionan en Calendly y en el calendario conectado para atender la reunión y la relación profesional mientras sea necesario. Puedes solicitar su cancelación mediante el correo de privacidad; cancelar una reunión no equivale por sí solo a eliminar sus datos.</p>
            <p v-if="analyticsEnabled">La propiedad de Google Analytics está configurada con una conservación de dos meses para los datos detallados de usuarios y eventos, sin reiniciar ese plazo con cada actividad nueva. Este ajuste no limita la conservación de los informes agregados estándar; las eliminaciones se procesan conforme a las condiciones del proveedor. El plazo de la preferencia de este navegador y la duración de sus cookies son independientes.</p>
            <p>Se limita la información solicitada al propósito del contacto y se utilizan las medidas de seguridad del sitio y sus proveedores para proteger su funcionamiento. Ningún mecanismo permite garantizar una protección absoluta.</p>
        </section>
        <section>
            <h2>Tus derechos y cómo ejercerlos</h2>
            <p>Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de tus datos —derechos ARCO—, limitar su uso o revocar tu consentimiento. Escribe al correo de contacto con el asunto «Privacidad», tu nombre, un medio para recibir respuesta, el derecho que deseas ejercer y los datos que permitan localizar tu solicitud. Para una rectificación, indica la corrección y su soporte.</p>
            <p>Para tramitar derechos ARCO se requiere acreditar tu identidad y, en su caso, la representación mediante la documentación correspondiente. Solicita primero las indicaciones de verificación al correo de contacto; no envíes identificaciones en una consulta inicial. La respuesta se enviará al medio que indiques; si procede el acceso, se facilitará una copia electrónica por un medio acordado.</p>
            <p>El plazo general para comunicar la determinación es de 20 días hábiles desde la recepción de tu solicitud; si procede, se hará efectiva en los 15 días hábiles siguientes a la respuesta. Cada plazo puede ampliarse una sola vez por un periodo igual cuando las circunstancias lo justifiquen. El ejercicio de estos derechos es gratuito, salvo los costos de envío o reproducción que legalmente correspondan.<span v-if="analyticsEnabled"> Para retirar únicamente la analítica de este navegador, utiliza las preferencias del footer.</span></p>
        </section>
        <section>
            <h2>Cambios en este aviso</h2>
            <p>Los cambios se publicarán en esta página con su fecha de actualización. <span v-if="analyticsEnabled">Si cambia el alcance de la elección de analítica, el sitio volverá a solicitarla antes de habilitar ese tratamiento.</span></p>
        </section>
    </PrivacyPage>
</template>

# Agenda de contacto

Actualizado: 2026-11-26. Rama `feature/contact-scheduling`, creada desde `develop` en `073fe9c`. El propietario creó su cuenta y proporcionó el enlace público del evento. Se revisó su página y formulario sin introducir datos ni confirmar reservas. El [estado](STATUS.md) distingue esta revisión de la activación y el despliegue del portfolio.

## Decisión y alcance

Se prepara un enlace externo de Calendly compartido por contacto del perfil y servicios. No se integra un formulario, SDK, iframe, API de reservas ni una base de datos propia. La URL vacía deja la acción oculta y no consulta el país. El propietario confirmó que debe mostrarse solo para México y delegó el mecanismo técnico.

A petición del propietario, el contacto de ambas páginas usa la presentación de servicios mediante [`ContactPanel.vue`](../../app/components/ui/ContactPanel.vue): tarjeta con borde y degradado, botones de correo/WhatsApp, agenda y aviso breve compartidos. El perfil conserva «Trabajemos juntos», la descripción profesional y los accesos a LinkedIn/GitHub; los textos comerciales de servicios permanecen en su página. Los IDs de navegación siguen siendo `contact` y `contact-cta`. El propietario confirmó la revisión local y el funcionamiento de la agenda y de la nueva presentación compartida. La revisión general de SEO se acordó para una etapa posterior.

La acción solo aparece después de recibir `{ allowed: true }` del endpoint del mismo sitio `/api/scheduling-country`. Una respuesta negativa, desconocida, fallida o que excede el tiempo de espera la mantiene oculta. El resto de los medios de contacto continúa disponible. La petición no depende de aceptar Analytics ni guarda país o preferencia en cookies/localStorage.

En Netlify, [`netlify/edge-functions/scheduling-country.js`](../../netlify/edge-functions/scheduling-country.js) lee únicamente `context.geo.country.code` y permite `MX`. Devuelve solo un booleano y usa `private, no-store` más `Netlify-CDN-Cache-Control: no-store`; no imprime logs ni consulta servicios de geolocalización externos. La declaración de ruta está en el propio archivo. No cambia el preset de Nuxt ni las redirecciones existentes.

La geolocalización es aproximada y puede fallar con VPNs o redes móviles. Esta regla controla la visibilidad en el portfolio: no restringe el enlace público en Calendly ni demuestra nacionalidad, residencia o idioma. El enlace sigue presente en la configuración pública del sitio. No presentarlo como un control de acceso a reservas.

## Variables

| Variable | Predeterminado | Uso |
|---|---|---|
| `NUXT_PUBLIC_CALENDLY_URL` | Vacía | Enlace público de reserva. Solo se admite HTTPS en `calendly.com` o `www.calendly.com`, con ruta y sin credenciales ni puertos alternativos. La validación no comprueba que el evento exista |
| `NUXT_SCHEDULING_TEST_COUNTRY` | Vacía | Simulación privada exclusiva del servidor de desarrollo: `MX` permite mostrar, otro valor o vacío oculta. No se utiliza para conceder acceso en builds de producción |

La configuración pública se resuelve en [`useScheduling.ts`](../../app/composables/useScheduling.ts). [`ContactScheduling.vue`](../../app/components/ui/ContactScheduling.vue) solicita la decisión solo en el cliente y conserva la acción oculta durante la carga. Se usa un enlace HTML sin prefetch de Nuxt, con apertura en otra pestaña y `noopener noreferrer`. No se incorporan datos del visitante a la URL.

El servidor Nuxt incluye un [fallback](../../server/api/scheduling-country.get.ts) para `npm run dev` y otros alojamientos: en desarrollo admite la simulación; en producción responde siempre `false`. En Netlify, la Edge Function atiende esa ruta antes del servidor Nuxt. Un build local de Nuxt no acredita el despliegue de esa función: comprobarla en el preview.

Para probar localmente, el propietario puede configurar las dos variables en su archivo de entorno local y reiniciar con el comando habitual `npm run dev`. La comprobación con el enlace recibido utilizó una copia temporal sin leer ni modificar sus archivos de entorno. No configurar la simulación en Netlify. La URL real se añade al contexto elegido del panel después de confirmar los ajustes pendientes; el cambio exige un nuevo deploy.

## Evento recibido y configuración local

Enlace público proporcionado por el propietario: [Conversación profesional](https://calendly.com/chichohdzjesus/30min). Se conserva como referencia de configuración; el valor predeterminado del código sigue vacío.

Para la revisión del propietario con el comando habitual, añadir o actualizar estas claves en su archivo de entorno local y reiniciar `npm run dev`:

```dotenv
NUXT_PUBLIC_CALENDLY_URL=https://calendly.com/chichohdzjesus/30min
NUXT_SCHEDULING_TEST_COUNTRY=MX
```

No se leyó ni modificó el archivo local de entorno. En Netlify se configura solo `NUXT_PUBLIC_CALENDLY_URL`, inicialmente en el contexto de preview; el país lo determina la Edge Function. La URL es pública. La activación en Production se realiza después de revisar el evento y el preview.

### Configuración observada y confirmada

| Elemento | Resultado y procedencia |
|---|---|
| Evento y duración | «Conversación profesional», 30 minutos; capturas del propietario y página pública revisada en Chrome |
| Idioma y finalidad | Interfaz y descripción en español; proyecto, colaboración técnica u oportunidad profesional, atención orientada a México |
| Medio de reunión | Google Meet en la configuración mostrada por el propietario y en la descripción; el enlace de conferencia se facilita al confirmar, no se realizó una reserva para comprobar su generación |
| Zona y horario semanal | Ciudad de México; lunes a jueves 15:00–18:00, viernes 15:00–16:00 y fin de semana desactivado, según captura y confirmación del propietario |
| Muestra de disponibilidad pública | Viernes 27: inicios 15:00 y 15:30; lunes 30: inicios cada 30 minutos entre 15:00 y 17:30. Es una muestra observada el 2026-11-26, no una garantía futura de disponibilidad |
| Anticipación | El propietario confirmó guardar 24 horas. En la revisión pública no había horarios para el día 26; esto es compatible con la configuración, pero no prueba por sí solo el umbral exacto |
| Formulario | Nombre y correo obligatorios; «¿Sobre qué te gustaría conversar?» opcional. La página también permite añadir invitados; no se introdujeron datos ni se envió el formulario |
| Notetaker | La captura inicial mostraba On. Desactivación pendiente de confirmación del propietario; no deducirla del formulario público |
| Permisos y conservación de la cuenta | Sin inspección directa ni valores confirmados; no asumirlos de la vinculación del correo o de la página pública |

Calendly mostró sus propios controles y aviso de cookies. La navegación pública de revisión rechazó las cookies opcionales; las preferencias de esa plataforma son independientes de las del portfolio. Los informes de inspección quedaron temporales, sin credenciales ni datos de invitados.

## Preparación de la cuenta por el propietario

1. Crear la cuenta y conectar el calendario que se utilizará para disponibilidad y reuniones.
2. Crear un evento individual, definir duración, horarios y zona horaria. Mantener descripción y atención en español, orientadas a México.
3. Revisar los campos del formulario de reserva, los permisos de calendario y el medio de reunión. Evitar solicitar datos que no se necesiten para la conversación inicial. Mantener Notetaker desactivado para este alcance de agenda sin grabación ni transcripción; confirmar el ajuste, no inferirlo del idioma o del evento.
4. Compartir únicamente el enlace público permanente del evento obtenido con «Copy link», sin credenciales, tokens ni enlaces de administración. El enlace no se configura en código.
5. Confirmar campos y funcionamiento del evento antes de activarlo en producción. No asumir permisos, conservación ni opciones de cuenta predeterminadas.

El [plan Free](https://calendly.com/pricing) consultado permite un tipo de evento y un calendario. La guía de [Scheduling](https://calendly.com/help/about-scheduling) explica disponibilidad, conexión de calendario y evento; la de [compartir enlaces](https://calendly.com/help/how-to-share-your-scheduling-link) distingue el enlace del evento de la página general.

## Privacidad y verificación

Los avisos breves e integral describen la reserva cuando existe una URL válida. El integral también informa del uso del país aproximado y de Calendly como servicio externo. La página de cookies distingue sus preferencias de las de Analytics del portfolio. Se actualiza la fecha del aviso sin cambiar la versión de consentimiento de GA, cuyo alcance no se modifica.

Calendly distingue el tratamiento de reservas por cuenta de sus clientes de los usos propios de su web en su [aviso de privacidad](https://calendly.com/legal/privacy-notice). Abrir un enlace externo no autoriza todos los tratamientos ni elimina las obligaciones del responsable sobre los datos de la reunión. No se inventa un plazo de cuenta ni se declara su configuración revisada.

Las pruebas y sus límites se registran en [testing](../testing/README.md#agenda-de-contacto). Antes de publicar, revisar el enlace real y los campos, el despliegue de la Edge Function y la respuesta desde México. Los casos no mexicanos y desconocidos se comprueban con contextos controlados; no falsificar cabeceras del visitante como prueba de geolocalización real. Una reserva de prueba que envíe datos se realiza deliberadamente por el propietario.

Fuentes técnicas: [runtime config de Nuxt](https://nuxt.com/docs/4.x/guide/going-further/runtime-config), [contexto geo de Netlify](https://docs.netlify.com/build/edge-functions/api/#geo), [funciones y directorio de Netlify](https://docs.netlify.com/build/edge-functions/get-started/) y [declaraciones de rutas](https://docs.netlify.com/build/edge-functions/declarations/).

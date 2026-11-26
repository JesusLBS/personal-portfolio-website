# Inventario y decisiones de privacidad

Documento técnico de mantenimiento. No es el aviso de privacidad publicado ni una certificación jurídica. Actualizarlo cuando cambien las finalidades, proveedores, datos o controles implementados.

## Alcance y confirmaciones

Revisión inicial: 2026-11-23, sobre el código y una visita al sitio público con un perfil temporal de Chrome, sin enviar formularios. La observación corresponde a esa sesión; no sustituye una revisión de la cuenta de Analytics o del alojamiento.

El propietario confirmó que el sitio se orienta principalmente a México y usa GA4 para aprender su integración y conocer el alcance del portfolio: visitas, procedencia del tráfico y contenido consultado. No gestiona campañas publicitarias. Durante la revisión de cuenta del 2026-11-24 detectó una vinculación no utilizada con Google Ads y la eliminó; también ajustó conservación, uso compartido y medición. Los datos visibles en las capturas de proyectos son ficticios, confirmado por el propietario.

El nombre y los medios de contacto proceden del contenido público existente. El domicilio completo fue retirado del código a petición del propietario. `usePrivacySettings.ts` lo resuelve desde `NUXT_PUBLIC_PRIVACY_ADDRESS`; si está vacía, muestra solo la ubicación general del CV, rotulada como «Ubicación». No guardar una dirección real en Git ni en artefactos de pruebas. La evaluación jurídica y sus fuentes están en [REVIEW.md](REVIEW.md). Los estados y ajustes confirmados de cuenta se conservan en [ACCOUNT-CHECKLIST.md](ACCOUNT-CHECKLIST.md), sin identificadores ni capturas del panel.

## Inventario actual

| Elemento | Datos o interacción | Finalidad y estado |
|---|---|---|
| GA4 / Google tag | Cookies de identificación de Analytics, vistas de página y datos técnicos de navegación | Servicio opcional, apagado por defecto. Con interruptor activo, ID válido y build de producción puede cargar tras aceptación vigente |
| Netlify | Entrega de páginas, recursos y funciones de Nuxt/Nitro | Alojamiento en plan Free, sin Netlify Analytics; métricas de funciones declaradas por el propietario. Sin plazo confirmado de logs operativos |
| Correo | Información que una persona decida enviar al abrir el enlace de contacto | Responder solicitudes profesionales; sin formulario de captura propio en este repositorio |
| WhatsApp | Interacción en un servicio externo cuando el visitante decide abrir el enlace | Contacto para servicios; no se identificó un chat incrustado en el sitio |
| CV | Datos profesionales y de contacto que el propietario publica deliberadamente | Consulta, descarga y previsualización de un PDF del mismo sitio |
| Galerías | Capturas y material de proyectos con datos ficticios, según confirmación del propietario | Demostración de funcionalidades |
| Iconos, fuentes e imágenes | Recursos visuales gestionados por módulos de Nuxt | Iconos con fallback solo de servidor; el navegador usa el endpoint local. Verificar fuentes e imágenes en el build y la red de cada entorno |

No se encontraron formularios propios, cuentas de usuario ni una base de datos de visitantes en el código de esta revisión. Esto no implica ausencia de tratamiento de datos por analítica, alojamiento o contacto externo.

## Evidencia inicial de producción — antes de estos cambios

Durante la revisión de `/` y `/services`:

- Se cargó `gtag.js` desde `www.googletagmanager.com`.
- Se observaron cookies `_ga` y `_ga_*` y solicitudes de medición `page_view` a Google Analytics.
- En la primera carga también hubo una solicitud a `stats.g.doubleclick.net`. La guía CSP de Google distingue destinos asociados a funciones publicitarias; esta conexión justifica revisar vínculos y configuración, pero no demuestra una campaña ni identifica por sí sola el ajuste causante. El propietario eliminó la vinculación encontrada el 2026-11-24. La relación causal sigue siendo una inferencia: comprobar la etiqueta real tras desplegar.
- No se encontraron enlaces a un aviso de privacidad ni controles de consentimiento.
- No había formularios propios ni iframes cargados en esas páginas al entrar; el visor del CV se monta al solicitarlo.

No conservar aquí valores de cookies, identificadores de visitantes, credenciales ni volcados completos de solicitudes. Los dominios y categorías de datos bastan para documentar esta evidencia.

## Conservación y configuración de cuenta

**Confirmado por el propietario en revisión con Claude Code el 2026-11-24:** las cuatro opciones de uso compartido desactivadas, términos de tratamiento aceptados, conservación de usuarios/eventos en dos meses sin reinicio por actividad, funciones publicitarias indicadas desactivadas y vínculo de Ads eliminado. Medición mejorada limitada a páginas/historial, desplazamientos, clics de salida y descargas; recogida granular activa y ocultación de correos habilitada. Codex no accedió directamente a los paneles.

En Netlify se confirmó la variable pública de GA solo en Production, previews sin valor y ausencia de Netlify Analytics. Después, el propietario confirmó la revisión visual del preview y la publicación con Analytics apagado. Esto no sustituye una inspección independiente de red y almacenamiento. Los detalles y la procedencia de cada confirmación están en el [registro de cuenta](ACCOUNT-CHECKLIST.md).

**Pendiente del modo publicado:** inspección independiente de ausencia de tráfico de Google y de accesos a localStorage, y limpieza de cookies heredadas. **Aplazado hasta decidir activar GA:** bloqueo antes de elegir, medición tras aceptar, vistas por ruta sin duplicados, cookies, retirada y destinos de red con proveedor real. La ausencia de medición en previews tampoco tiene una inspección independiente. **No confirmado:** plazo de logs operativos de Netlify y contacto de notificación de la adenda. No inventar valores ni repetir toda la revisión de cuenta para validar esos puntos.

La conservación de datos detallados no equivale a cookies ni informes agregados. El procedimiento interno para localizar y tramitar eliminación de datos de GA4 está en [ACCOUNT-CHECKLIST.md](ACCOUNT-CHECKLIST.md#atención-operativa-de-solicitudes-sobre-datos-de-ga4); no se exige un identificador para consultas o datos ajenos a Analytics.

## Configuración y modos de funcionamiento

| Variable | Predeterminado | Efecto |
|---|---|---|
| `NUXT_PUBLIC_ANALYTICS_ENABLED` | `false` | Activa la interfaz y política de consentimiento con `true`; Nuxt también normaliza `TRUE` y ` true ` al booleano `true` antes de validarlo |
| `NUXT_PUBLIC_GTAG_ID` | Sin ID real | Permite seguimiento únicamente con ID válido, interruptor activo, build de producción y aceptación vigente |
| `NUXT_PUBLIC_PRIVACY_ADDRESS` | Vacía | Texto público del domicilio notificable; vacía muestra «Ubicación» y la ubicación general de Huixquilucan |

En Netlify usar solo `true` o `false` para el interruptor. Nuxt normaliza las variables de runtime con [`destr`](https://github.com/unjs/destr/blob/main/src/index.ts) antes de entregarlas al helper; este acepta únicamente el booleano `true` o la cadena exacta `true` del valor ya resuelto. Los cambios de configuración en Netlify requieren un nuevo despliegue y no cambian retroactivamente páginas abiertas.

La dirección de entorno evita un literal en el repositorio, no oculta lo publicado: `runtimeConfig.public` se serializa al navegador. El valor configurado será visible en HTML y configuración pública. No es un secreto. Referencia: [runtime config de Nuxt](https://nuxt.com/docs/4.x/guide/going-further/runtime-config).

**Modo apagado:** no se monta banner ni diálogo ni se ofrece el botón de preferencias. La aplicación no lee ni modifica `localStorage`. Solo intenta eliminar cookies de Analytics accesibles que dejó una versión anterior; una elección previa queda sin consultar ni alterar. Las páginas legales muestran únicamente contenido base y ambas secciones de contacto incluyen el aviso breve. `nuxt-gtag` en modo manual puede preparar `dataLayer` y comandos locales si hay ID, pero no inserta la etiqueta ni envía mediciones.

**Modo activo:** el banner permite aceptar/rechazar con igual tratamiento visual, navegar sin elegir y abrir preferencias. La etiqueta solo se inicializa si también hay ID válido, build de producción y aceptación vigente. Sin ID, este modo permite revisar la UI en previews sin cargar Google. En el servidor de desarrollo no se carga Analytics.

`portfolio-privacy` conserva versión, elección booleana y fecha durante 180 días; no añade identificadores de visitantes. Las preferencias inválidas, futuras o vencidas no autorizan medición. Se sincronizan pestañas y se programa caducidad. Al retirar se deshabilita Analytics y se borran sus cookies accesibles; si se pudo persistir el rechazo, se recarga para descartar la biblioteca. Si falló guardar, se conserva la elección temporal sin recarga. Una escritura fallida intenta eliminar la preferencia anterior; si también falla borrar, no se garantiza qué dato quedará disponible en otra visita.

Apagar y reactivar el servicio no cambia `PRIVACY_VERSION` ni renueva fechas: una elección anterior válida puede volver a aplicarse al reactivar. No se amplían las finalidades. La analítica debe permanecer apagada si no se quiere utilizar esas aceptaciones al volver a ofrecer el mismo servicio.

Los consentimientos publicitarios permanecen denegados. La preferencia y duración solicitada de cookies son independientes de la conservación de datos detallados de la propiedad. El histórico de cuenta confirmado se mantiene aunque el servicio esté apagado; no prueba que la web esté midiendo. La lógica de consentimiento y cookies se mantiene en `privacyConsent.ts` y la resolución de configuración/contacto en `usePrivacySettings.ts`.

## Avisos y alcance

Con Analytics activo, el banner resume identidad, dirección o ubicación, datos, finalidades y opciones y enlaza a `/privacidad`. El aviso breve de contacto se mantiene en ambos modos porque también se reciben solicitudes profesionales. Las vistas utilizan la misma resolución de contacto. El fundamento jurídico, alcance territorial y evaluación de proveedores están en [REVIEW.md](REVIEW.md); este inventario describe controles, no certifica cumplimiento. La implementación admite dirección profesional, vivienda u omisión del domicilio mediante la misma variable, sin cambiar código. La opción C deja la variable vacía y muestra solo municipio/estado: no satisface el domicilio exigido por el artículo 15 I, incluso con Analytics apagado. El sitio no muestra textos de «pendiente», pero esta limitación queda expresamente registrada. El propietario creó las variables y confirmó la publicación con Analytics apagado, manteniendo la dirección vacía como elección. El [registro de cuenta](ACCOUNT-CHECKLIST.md) distingue esa confirmación de las comprobaciones técnicas independientes todavía pendientes.

## Criterios verificados localmente

Las ejecuciones de cada modo se describen en testing. Con el modo activo, la ejecución cubre los escenarios siguientes con etiqueta simulada; son criterios de mantenimiento ya comprobados, no una lista de correcciones sin terminar. La red del proveedor real se revisa después de desplegar.

- Primera visita sin preferencia: sin etiqueta, cookies de Analytics ni solicitudes de medición.
- Rechazo: mismo resultado tras recargar y navegar entre rutas.
- Aceptación: carga única de la etiqueta y medición permitida, sin consentimientos publicitarios concedidos.
- Retirada: preferencia persistida, bloqueo de nuevas mediciones y comprobación del alcance de eliminación de cookies.
- Preferencia caducada, inválida o almacenamiento bloqueado: comportamiento conservador y sitio utilizable.
- Responsive, teclado y foco de los controles; avisos accesibles desde `/`, `/services` y el footer.
- Prueba en build con configuración de producción, con un ID de prueba: el modo de desarrollo tiene Analytics deshabilitado.
- Revisión final de textos, configuración y condiciones de proveedores. No presentar pendientes como garantías de cumplimiento.

La [documentación de pruebas](../testing/README.md) registra la ejecución local, el informe y los límites de las capturas. Las solicitudes de medición se interceptan con una etiqueta simulada; las cookies de dominio y las transiciones comprobadas no validan la cuenta real ni los listeners de Google. Seguir la lista de cuenta para la verificación real posterior al despliegue.

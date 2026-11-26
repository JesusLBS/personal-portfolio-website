# Comprobaciones manuales de cuentas y producción

Estado actualizado: 2026-11-25. El propietario revisó los paneles de GA4 y Netlify con Claude Code el 2026-11-24 y confirmó los ajustes de la tabla siguiente. Posteriormente creó las variables nuevas, revisó visualmente el preview y confirmó la publicación con Analytics en `false`. Codex recibió esos estados, sin acceso directo a cuentas ni a las capturas originales. La documentación oficial respalda el significado de las opciones; no prueba el estado de una cuenta. La inspección independiente de red y cookies del despliegue publicado sigue pendiente; las pruebas del tag activo fueron aplazadas por el propietario.

No copiar IDs de medición, IDs de visitantes, nombres privados de cuentas, credenciales ni capturas completas del panel. Bastan los estados y opciones descritos aquí. Las etiquetas del panel pueden variar: usar la búsqueda del administrador si no coincide un nombre.

## Registro confirmado por el propietario

Fecha de comprobación y ajustes: 2026-11-24. Se conserva únicamente información de configuración, sin IDs ni datos personales de la cuenta.

| Área | Resultado confirmado y acción realizada | Estado |
|---|---|---|
| Uso compartido de GA4 | Las cuatro opciones están desactivadas; se desactivaron las tres que seguían activas | Confirmado por el propietario |
| Términos de tratamiento de GA | Aceptados desde 2023-09-04 | Confirmado por el propietario; no se infiere una nueva aceptación |
| Conservación de usuarios/eventos | Ambos en 2 meses; reinicio por actividad desactivado | Configuración confirmada; no implica eliminación instantánea ni de informes agregados |
| Recogida | Signals y datos proporcionados por usuarios desactivados; User-ID sin uso; datos granulares de ubicación/dispositivo activados; ninguna región con personalización de anuncios | Confirmado por el propietario |
| Vinculaciones | Se encontró una vinculación de Google Ads no utilizada y se eliminó; ninguna otra vinculación | Ajuste de cuenta confirmado; comprobar red tras desplegar |
| Destinos y etiquetas | Solo el destino de Analytics del flujo web, sin destino publicitario; cero etiquetas conectadas. El panel informó una actualización automática a contenedor de Tag Manager sin etiquetas añadidas | No se añadió una integración de GTM al código |
| Medición mejorada | Cargas y cambios por historial, desplazamientos, clics de salida y descargas activos; búsqueda interna, vídeo y formularios desactivados | Configuración confirmada; falta verificar vistas por ruta y duplicados en producción |
| Ocultación de datos | Ocultación de correos activada; parámetros de URL sin cambios | No constituye garantía de que cualquier dato personal quede eliminado |
| Panel de consentimiento | Sin problemas indicados; señales inactivas con la versión anterior; valor predeterminado para EEE indicado como «No» | Reevaluar tras desplegar; el panel no reemplaza el consentimiento explícito del código |
| Confirmación de recogida de datos de usuario | No aceptada deliberadamente | No aceptarla automáticamente al desplegar; reconsiderar solo si se pretende habilitar una función que la requiera y pueden cumplirse sus condiciones |
| Variable GA4 en Netlify | Limitada a Production; demás contextos sin valor | Separación declarada; comprobar su efecto en la red del contexto correspondiente |
| Contextos Netlify | Producción en master, sin ramas adicionales de despliegue; previews de PR habilitadas | Preview revisado visualmente por el propietario; ausencia de medición sin inspección independiente |
| Plan y observabilidad Netlify | Free, Function Metrics disponible, sin Netlify Analytics | Confirmado; no permite deducir ausencia ni plazo de logs operativos |

Información externa no aportada: plazo específico de retención de logs de Netlify y contacto de notificación de la adenda de GA. No representa una corrección de código pendiente ni requiere repetir los estados ya confirmados. No inventar esos valores ni tratar Function Metrics como prueba de ausencia de tratamiento técnico de solicitudes.

## Variables y publicación confirmadas por el propietario

El propietario informó la creación de las variables nuevas y después confirmó la publicación con `NUXT_PUBLIC_ANALYTICS_ENABLED=false`. La dirección vacía fue la configuración elegida. También confirmó la revisión visual del preview y aplazó las pruebas con el interruptor activo. No se accedió directamente al panel ni se verificaron de forma independiente la red, las cookies o la dirección renderizada. Conservar esta distinción al registrar el resultado de la comprobación real descrita en [despliegue](../deployment/README.md).

La revisión de cuenta anterior permanece válida como registro. La dirección vacía muestra la ubicación general y corresponde a la opción C, que mantiene incompleto el domicilio legal; no se cambia esta conclusión por apagar el servicio. Una activación posterior de GA y publicación de domicilio completo son posibilidades por decidir, no configuraciones ya aplicadas.

Si se modifica la conservación en GA4, actualizar también el párrafo condicional de `privacidad.vue` y su fecha: hoy publica dos meses únicamente con el servicio activo.

## Referencia para revisiones futuras de GA4

| Punto | Dónde buscar | Qué debe comunicar el propietario |
|---|---|---|
| Uso compartido | Administrador → Cuenta → Detalles de la cuenta → Opciones para compartir datos | Estado de cada casilla: Productos y servicios de Google; Contribuciones al modelo y estadísticas empresariales; Asistencia técnica; Recomendaciones para tu empresa |
| Términos de tratamiento | Detalles de la cuenta → Adenda o términos sobre tratamiento de datos | Si figuran aceptados y si hay un contacto de notificación configurado; no enviar sus datos |
| Conservación | Propiedad → Recogida y modificación de datos → Conservación de datos | Periodos mostrados para usuarios/eventos y si está activo reiniciar el plazo con nueva actividad |
| Recogida de datos | Propiedad → Recogida y modificación de datos → Recogida de datos | Google signals, datos proporcionados por usuarios y datos granulares de ubicación/dispositivo, incluidas restricciones regionales si existen |
| Productos vinculados | Propiedad → Vinculaciones con otros productos | Tipos de productos vinculados y si aparece Google Ads u otra plataforma publicitaria; no comunicar números de cuenta |
| Medición mejorada | Flujos de datos → flujo web del portfolio → Medición mejorada → ajustes | Eventos habilitados y, en Vistas de página → opciones avanzadas, estado de los cambios de página basados en el historial del navegador |
| Destinos de la etiqueta | Flujo web → configuración de la etiqueta de Google → destinos, si está disponible | Si solo hay un destino de Analytics o también destinos publicitarios; no enviar IDs |

Para el uso declarado, se recomienda minimizar el uso compartido ajeno al servicio, mantener deshabilitadas funciones publicitarias o de datos proporcionados por usuarios que no se necesiten y revisar los vínculos desconocidos. Son recomendaciones de configuración, no una afirmación sobre el estado actual ni una instrucción de aceptar contratos sin leerlos. Registrar primero lo observado; decidir los cambios con su efecto documentado.

«Productos y servicios de Google» permite usos propios de Google y requiere evaluar su papel y las transferencias; no lo controla el banner. Google explica los estados en [Opciones para compartir datos](https://support.google.com/analytics/answer/1011397?hl=es). Los [términos de tratamiento](https://support.google.com/analytics/answer/3379636?hl=es) distinguen cuentas existentes y nuevas: estas últimas pueden tener aceptación automática. El nombre del documento menciona publicidad aunque se use Analytics sin campañas.

La [conservación de datos](https://support.google.com/analytics/answer/7667196?hl=es) no fija la eliminación de informes agregados. La [recogida granular](https://support.google.com/analytics/answer/12017362?hl=es) y los [controles de datos publicitarios](https://support.google.com/analytics/answer/17016975?hl=es) requieren revisar la configuración efectiva. No deducir ausencia de usos publicitarios de haber desactivado únicamente Google signals.

Este código no añade medición manual por ruta: la comprobación real de la SPA depende de los ajustes de [medición mejorada](https://support.google.com/analytics/answer/9216061?hl=es). Google advierte que los eventos del historial son independientes de `send_page_view` en su [guía de vistas de página](https://developers.google.com/analytics/devguides/collection/ga4/views). Evitar añadir otro seguimiento de rutas sin comprobar duplicados.

## Netlify

- El propietario confirmó la separación por contexto. Comprobar en los siguientes builds de producción y preview que se aplica: cambiar una variable no modifica retroactivamente artefactos desplegados. No copiar el identificador.
- Los términos y el DPA públicos ya fueron contrastados; conservar las referencias siguientes. El plazo específico de logs operativos de esta cuenta no se aportó: no inventarlo ni marcarlo verificado.
- Referencias: [privacidad](https://www.netlify.com/privacy/), [acuerdo Self-Serve](https://www.netlify.com/pdf/self-serve-subscription-agreement.pdf) y [DPA de Netlify](https://www.netlify.com/pdf/netlify-dpa.pdf). El DPA público forma parte del acuerdo aplicable; no se registró una aceptación separada ni se realizó en nombre del propietario. Las [Function Metrics](https://docs.netlify.com/manage/monitoring/function-metrics/) describen uso/rendimiento de funciones, no una etiqueta adicional de analítica de visitantes.

## Atención operativa de solicitudes sobre datos de GA4

Procedimiento interno para una solicitud ARCO recibida en el correo de privacidad; no añade captura de datos ni un formulario al sitio.

1. Registrar recepción, alcance y canal de respuesta, verificar identidad/representación de forma proporcional y aplicar los plazos del aviso. No exigir cookies o un ID de Analytics para atender consultas o datos de contacto ajenos a GA.
2. Para datos concretos de GA4, comprobar si el solicitante conserva y aporta voluntariamente el ID de cliente correspondiente al navegador y periodo. Un correo o un nombre no permiten vincularlo de forma fiable con una visita: este sitio no implementa User-ID ni una asociación de identidades. No reactivar Analytics ni pedir volver a aceptar para crear un identificador nuevo que no localizaría datos anteriores.
3. El `client_id` no equivale literalmente a toda la cadena de una cookie `_ga`. Cuando ya existe la etiqueta aceptada, Google ofrece el comando `get` para consultarlo; cualquier ayuda al solicitante debe ser individual y limitarse al identificador necesario, sin pedir un volcado de cookies. No almacenar IDs reales en Git, informes QA ni el handoff. [Referencia oficial de get](https://developers.google.com/tag-platform/gtagjs/reference#get).
4. Con la propiedad correcta y rol Editor o superior, usar Explorar → Explorador de usuarios, localizar el ID de usuario efectivo correspondiente, revisar la coincidencia y, si procede la solicitud, usar Eliminar usuario y confirmar. Es una operación irreversible que ejecuta el propietario para el caso concreto; no se hizo ningún borrado en esta revisión. [Procedimiento oficial](https://support.google.com/analytics/answer/9283607?hl=es).
5. Registrar la solicitud al proveedor, su estado y la respuesta al titular. La eliminación no es instantánea ni elimina los datos ya agregados asociados al usuario; no prometer esos resultados. La operación descrita es manual y no requiere añadir una integración API. [Medidas de protección de datos de Google](https://support.google.com/analytics/answer/6004245?hl=es).
6. Si no hay identificador verificable o no aparece una coincidencia, comunicar la limitación concreta, consultar las alternativas actuales del proveedor y atender los demás datos localizables. No inferir identidad por ciudad, IP o dispositivo ni convertir la falta de ID en rechazo automático de todos los derechos.

## Comprobación real tras desplegar

Usar un perfil limpio, sin extensiones de bloqueo, y DevTools con el registro de red conservado. No ejecutar el script sintético contra producción.

Primero verificar el modo desplegado. Con Analytics apagado, no hay banner ni preferencias ni acceso a localStorage; se eliminan cookies heredadas accesibles. Comprobar contactos, ubicación/dirección, páginas legales sin analítica y ausencia de tráfico de Google. No marcar la medición real como validada en este modo.

Si posteriormente se activa con ID válido y se redespliega:

1. Sin elección y tras rechazar, verificar ausencia de etiqueta y mediciones de Google; repetir en carga directa, recarga y navegación. Comprobar también que no hay consultas directas a `api.iconify.design`.
2. Al aceptar, verificar una carga de `gtag.js`, una vista inicial y las vistas de rutas sin duplicados. Contar específicamente `page_view`, no todas las solicitudes: una solicitud puede agrupar eventos y otros eventos son distintos de una vista.
3. Revisar consentimiento de Analytics concedido y publicidad denegada. Investigar cualquier conexión a `doubleclick.net` o destinos `/ads`; una conexión aislada no demuestra una campaña ni identifica por sí sola el ajuste responsable.
4. Revisar ámbito y caducidad reales de las cookies. Comprobar eliminación de cookies de dominio accesibles al retirar, incluidas las previas si existen. La prueba local solo usa cookies sintéticas.
5. Tras retirar y recargar, verificar que no se reinicia la etiqueta ni se envían nuevas mediciones. Revisar por separado eventos pendientes al abandonar el documento: el fixture local no reproduce los listeners de Google.
6. Comprobar retirada entre pestañas y, cuando sea posible, Safari/iOS. Tiempo real o DebugView ayudan a confirmar eventos, pero no sustituyen la inspección de red; DebugView puede requerir activar depuración deliberadamente y las visitas anteriores pueden seguir en Tiempo real.

La [guía CSP de Google](https://developers.google.com/tag-platform/security/guides/csp) distingue destinos de Analytics sin funciones de Ads. Es una referencia para investigar conexiones, no una CSP implementada por este proyecto ni una prueba del estado de la cuenta.

## Plantilla para futuras comprobaciones

```text
Fecha de revisión:
Uso compartido (estado de cada casilla):
Términos de tratamiento / contacto de notificación configurado:
Conservación / reinicio por actividad:
Signals / datos de usuarios / datos granulares:
Tipos de productos vinculados / destinos publicitarios:
Medición mejorada / cambios por historial:
Netlify: separación de producción y previews / términos / logs:
Cambios efectuados después de observar esos valores:
```

Actualizar el registro confirmado, el [inventario](README.md) y cualquier texto público afectado cuando cambien estos valores. No sobrescribir una comprobación anterior con una suposición ni marcar la verificación de producción como completada por haber revisado el panel.

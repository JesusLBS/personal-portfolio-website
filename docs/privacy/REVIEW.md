# Revisión jurídica y de contenido

Revisión: 2026-11-24. Alcance: textos públicos, implementación, fuentes oficiales y confirmaciones del propietario. No es una certificación jurídica. El funcionamiento se mantiene en el [inventario](README.md), las pruebas en [testing](../testing/README.md) y las confirmaciones de cuenta y comprobaciones reales en el [registro](ACCOUNT-CHECKLIST.md).

## Marco y criterio de revisión

La [LFPDPPP consultada](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf) fue publicada el 20 de marzo de 2025, entró en vigor al día siguiente y muestra reforma del 14 de noviembre de 2025. Se usa su numeración actual:

| Artículos | Aplicación al portfolio |
|---|---|
| 2 VIII, 7 y 15–16 | Días hábiles, revocación y contenido de los avisos integral y simplificado |
| 28–31 y 34 | Solicitud y atención de derechos ARCO, responsable de su trámite, plazos y gratuidad con las excepciones previstas |
| 2 XV, 35 y 38–40 | Autoridad competente, transferencias y protección de derechos |

El responsable atiende directamente las solicitudes mediante el correo publicado. La autoridad citada por la ley es la Secretaría Anticorrupción y Buen Gobierno; no atribuir las competencias actuales al INAI.

El [Reglamento de 2011](https://www.diputados.gob.mx/LeyesBiblio/regley/Reg_LFPDPPP.pdf) sigue publicado por la Cámara como texto vigente. Los [Lineamientos de 2013](https://sidof.segob.gob.mx/notas/docFuente/5284966) aparecen en el [marco normativo de la Secretaría de Economía de abril de 2026](https://www.gob.mx/se/acciones-y-programas/lineamientos-420952). Son referencias secundarias anteriores a la nueva ley: contrastar su compatibilidad y numeración, sin inferir su desaparición por la abrogación de la ley de 2010 ni afirmar una revisión exhaustiva de todas las publicaciones del DOF. El fundamento principal del aviso simplificado es el artículo 16 actual, no la numeración antigua.

## Avisos, domicilio y finalidades

Con Analytics activo se utiliza el banner como aviso simplificado del tratamiento electrónico: identidad y domicilio, categorías de datos, finalidades, rechazo o modificación y acceso al aviso integral. No basta con llamarlo banner de cookies. El resumen incluye funcionamiento técnico y contacto, además de la analítica opcional. Con el servicio apagado no aparece banner: el aviso breve de las dos secciones de contacto informa de responsable, finalidad, datos sensibles, dirección o ubicación, derechos y enlace al integral. Se mantiene también con el servicio activo para informar en el punto de contacto.

El domicilio completo se retiró del working tree antes de hacer commits, a solicitud del propietario. Se proporciona opcionalmente en `NUXT_PUBLIC_PRIVACY_ADDRESS` y las vistas lo resuelven mediante `usePrivacySettings.ts`. Vacía, se muestra la ubicación general ya pública sin rotularla como domicilio completo. No se inspecciona una dirección particular ni se valida su exactitud postal.

La implementación prepara la opción C por defecto. El artículo 15 I exige identidad y domicilio; conservar únicamente municipio/estado deja el aviso formalmente incompleto. Apagar GA no elimina el tratamiento de alojamiento o contacto profesional ni subsana esa omisión. Registrar esta limitación sin afirmar cumplimiento completo ni trasladar un mensaje técnico de «pendiente» a la web. Una dirección de entorno configurada puede completar el texto, pero su validez y componentes requieren verificación del propietario.

La variable excluye el literal del código versionado; no convierte el texto publicado en confidencial. Si se configura, será visible en las páginas y payload público. Las alternativas de dirección profesional o vivienda usan la misma variable; no hace falta cambiar ni versionar una dirección para alternarlas.

La finalidad pública de GA4 es medir alcance y uso del portfolio y mejorar el contenido. El aprendizaje de integración es contexto de mantenimiento, no una finalidad que justifique datos adicionales. Los informes generales no identifican reclutadores; al requerir aceptación, representan solo parte del tráfico.

No se utiliza la etiqueta para posicionar la web en buscadores. [Search Console](https://support.google.com/webmasters/answer/7576553?hl=es) permite analizar el rendimiento en resultados de búsqueda; no se añade su integración en este trabajo.

La aceptación previa se adopta como decisión de diseño conservadora para la analítica opcional, no como afirmación de que México exige ese mecanismo para todo dato no sensible. Mantener contenido y CV accesibles sin elegir es una decisión proporcionada. No se necesita un muro de cookies para cumplir ese diseño.

## Proveedores, conservación y pendientes

La duración de la preferencia y la configuración solicitada de cookies no acreditan conservación de la cuenta. La propiedad está configurada a dos meses para datos detallados, sin reinicio por actividad, según la revisión aportada por el propietario el 2026-11-24. El aviso publica ese ajuste únicamente con Analytics activo, sin prometer una eliminación instantánea de todos los datos. Si se cambia en la cuenta, actualizar el párrafo y la fecha del aviso; no basta modificar el panel. Las diferencias y comprobaciones pendientes están en el inventario y la lista de cuenta. No prometer eliminación de informes agregados al retirar consentimiento.

La clasificación de Google no se resuelve por el uso gratuito, la ausencia de campañas o una bandera de gtag. Las [opciones para compartir datos](https://support.google.com/analytics/answer/1011397?hl=es) pueden habilitar fines propios de Google. Su consideración bajo categorías jurídicas mexicanas requiere contrastar ajustes, condiciones y tratamiento efectivo; no se traslada automáticamente una etiqueta del RGPD a la LFPDPPP.

La [guía de términos de tratamiento](https://support.google.com/analytics/answer/3379636?hl=es) distingue aceptación para cuentas existentes y automática para cuentas nuevas. No presumir que falta aceptar un contrato por estar fuera de Europa. El propietario confirmó términos de Google aceptados desde 2023 y las cuatro opciones de uso compartido desactivadas. También confirmó la separación de contextos en Netlify; el plazo de logs operativos y el contacto de notificación de la adenda no se aportaron.

Con los estados aportados y el uso de Google bajo los términos de tratamiento, no se identifica una transferencia adicional que motive incorporar una cláusula de consentimiento por uso compartido o Ads en esta revisión. El artículo 35 distingue a los encargados; esto no autoriza a afirmar que cualquier operación futura de proveedores quedaría excluida. El aviso muestra Netlify en ambos modos y Google solo cuando Analytics está activo, sin una declaración absoluta de ausencia de transferencias. Reevaluar al cambiar vínculos, destinos, usos o condiciones.

El acuerdo público [Self-Serve de Netlify, sección 6.5](https://www.netlify.com/pdf/self-serve-subscription-agreement.pdf), incorpora el [DPA](https://www.netlify.com/pdf/netlify-dpa.pdf) para el tratamiento por cuenta del cliente; no se realizó ni se presume una aceptación separada. Las métricas de funciones no equivalen a activar Netlify Analytics ni prueban ausencia de logs técnicos.

La atención de solicitudes exige una operación real del correo, verificación proporcional de identidad y gestión de datos históricos. El [procedimiento interno de GA4](ACCOUNT-CHECKLIST.md#atención-operativa-de-solicitudes-sobre-datos-de-ga4) describe localización, eliminación y limitaciones sin exigir cookies como requisito general; el código no automatiza ese trabajo.

## Ampliación de agenda — 2026-11-26

La preparación de Calendly añade una finalidad de organizar reuniones y un uso transitorio del país aproximado de Netlify para mostrar la acción solo para México. Los avisos informan de ambos cuando existe un enlace válido. La respuesta al navegador contiene solo elegibilidad, sin país, coordenadas ni IP; no se añade persistencia al navegador. Esto minimiza el dato usado por la aplicación, sin afirmar que el alojamiento deje de procesar la conexión. Véanse el [contexto geo de Netlify](https://docs.netlify.com/build/edge-functions/api/#geo) y el contenido informado en el aviso conforme a los artículos 14–16 de la [ley consultada](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf).

El [aviso de Calendly](https://calendly.com/legal/privacy-notice) distingue la gestión de reservas por cuenta de sus clientes de los usos propios de su web. Se revisó el formulario público: nombre y correo obligatorios y pregunta abierta opcional, sin enviar una reserva. La configuración privada, Notetaker, permisos y conservación no se deducen de esa página. El [registro de agenda](../project/SCHEDULING.md#evento-recibido-y-configuración-local) identifica las confirmaciones pendientes antes de activar el enlace. No se presume que un enlace externo elimine las obligaciones del responsable ni se inventa un plazo de conservación del proveedor.

La elección de Analytics no se amplía ni autoriza Calendly. El control por país solo decide mostrar el botón; no impide acceder al enlace compartido ni acredita idioma o residencia. Esta ampliación no cambia la limitación ya documentada del domicilio omitido ni certifica cumplimiento completo.

## Alcance internacional y evidencia

El dominio .com no determina la ley aplicable. El propietario se dirige principalmente a México. La accesibilidad desde Europa no acredita por sí sola oferta dirigida a ese mercado; el seguimiento del comportamiento merece un análisis separado según finalidad. Referencia: [criterios territoriales del EDPB](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_1.pdf). Reevaluar si cambian mercados, servicios o seguimiento.

Las pruebas con etiqueta simulada validan la lógica propia. No demuestran el comportamiento de Google al abandonar la página, ausencia de funciones publicitarias de la cuenta ni cumplimiento legal. La [metodología](../testing/README.md) delimita esos resultados y la comprobación real posterior al despliegue.

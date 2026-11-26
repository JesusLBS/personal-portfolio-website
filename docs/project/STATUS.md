# Estado del portfolio

Actualizado: 2026-11-26.

## Entregas integradas

- Perfil, experiencia, skills y PDF del CV actualizados; responsive de «Sobre mí» y menú corregidos.
- Acciones compartidas del CV: previsualización en modal, descarga y apertura en otra pestaña.
- Contexto común `AGENTS.md`, entradas de Claude/Gemini y documentación de arquitectura, despliegue, privacidad y pruebas integrados.
- Privacidad: implementación `62289d2`, documentación `e8c07cc` y merges a `develop` y `master`. Las notas N2/N3 quedaron corregidas antes de integrar. El propietario confirmó el preview y la publicación con Analytics apagado y dirección vacía; la prueba del tag real se aplazó.
- Dependencias: commits `75b93d1` y `7575e80`, PR #32 a `develop` y #33 a `master`. La instalación limpia, builds y regresiones locales están registrados en [testing](../testing/README.md); los avisos restantes se explican en [mantenimiento](MAINTENANCE.md).
- Agenda y contacto compartido: implementación `68f774e`, documentación `df98feb`, PR #34 a `develop` (`9761378`) y #35 a `master` (`6a93b9b`). El propietario confirmó revisión local, validación del preview y promoción a producción. La agenda y el formulario públicos se revisaron sin confirmar reservas.
- Calendly Notetaker: desactivado, confirmado expresamente por el propietario el 2026-11-26. Esa confirmación cierra el pendiente de la captura inicial que mostraba On.

Los merges se comprobaron en Git. Las revisiones de cuentas, preview y publicación tienen la procedencia indicada: no equivalen a una inspección independiente de paneles, red o logs de Netlify. No se conservó un informe nuevo de PageSpeed ni se atribuyen al asistente las mediciones aportadas por el propietario.

## Estado actual

Los bloques funcionales del plan original están integrados. Este cierre documental registra la entrega; no hay una nueva implementación funcional seleccionada. Al retomar trabajo, comprobar rama y estado real de Git antes de editar.

| Tema | Estado |
|---|---|
| Agenda y diseño de contacto | Integrados y validados por el propietario; configuración, operación y límites en [SCHEDULING.md](SCHEDULING.md) |
| SEO general | Aplazado por decisión del propietario tras sus mediciones de móvil/escritorio. La observación previa sobre el canonical de `/services` se conserva; no se aplicó una corrección |
| Migraciones mayores de módulos | Opcionales, fuera de la actualización compatible; sin implementación seleccionada |
| Analytics real | Sigue apagado por elección del propietario. La activación y sus pruebas reales están aplazadas |

Para una nueva medición, usar [PageSpeed Insights](https://pagespeed.web.dev/) con `https://chichohdz.com/` y `/services`. Los enlaces antiguos a un informe del dominio Netlify no son la referencia de validación actual. Las capturas históricas no representan resultados de cada publicación.

## Confirmaciones del propietario

- El público principal es México y las capturas de proyectos contienen datos ficticios de demostración.
- GA4 sirve para aprender su integración y medir el alcance del portfolio. Los informes generales no identifican reclutadores.
- La revisión de cuenta del 2026-11-24 ajustó conservación, uso compartido y medición; se eliminó una vinculación de Ads no utilizada. No se utilizan campañas.
- Se reutilizan el nombre y los medios de contacto ya públicos. El domicilio completo permanece fuera de Git y puede configurarse mediante una variable pública de entorno.
- Analytics se publicó apagado y la dirección vacía fue la opción elegida. Su activación y la publicación de domicilio completo son decisiones futuras.
- Calendly utiliza un evento individual de 30 minutos en español, con horarios y formulario documentados. Notetaker quedó desactivado según la confirmación del propietario; los demás permisos y plazos de cuenta no se deducen de esa confirmación.

Codex no accedió a los paneles de Analytics, Calendly o Netlify. El [registro de cuenta](../privacy/ACCOUNT-CHECKLIST.md) y el de [agenda](SCHEDULING.md#configuración-observada-y-confirmada) identifican cada procedencia.

## Seguimiento conservado

| Tema | Alcance |
|---|---|
| Red y cookies del alojamiento real | No se realizó una inspección independiente posterior a la publicación; se conserva como límite de la evidencia, sin repetir como pendientes las revisiones del propietario |
| Google tag real | Si el propietario decide activarlo, redesplegar y verificar consentimiento, retirada y vistas por ruta con proveedor real |
| Domicilio | La opción C elegida muestra ubicación general y mantiene E1 abierto; la entrega técnica no acredita cumplimiento jurídico completo |
| Datos de cuentas no aportados | Logs operativos de Netlify, contacto de la adenda de GA y otros permisos/conservación de Calendly: no inventar valores ni presentarlos como fallos del código |
| Contexto global de Dev | Se mantiene por separado en ese repositorio; el portfolio ya tiene AGENTS/CLAUDE/GEMINI |
| Handoff temporal de privacidad | Conserva el historial de QA; el estado actual se mantiene aquí y las decisiones operativas en sus documentos |

## Fuentes y futuras entregas

La [documentación de pruebas](../testing/README.md) distingue las ejecuciones de privacidad, mantenimiento y agenda, los scripts temporales y los límites de la etiqueta simulada. El [flujo de despliegue](../deployment/README.md) sigue siendo rama de trabajo → `develop` → `master`; GitHub recibe las ramas principales ya integradas. La URL permanente de develop no está habilitada según la última configuración aportada.

Las versiones se consultan en manifiesto/lockfile, no en este resumen. Actualizar el documento correspondiente cuando cambie un tema y conservar los resultados históricos con su fecha y procedencia; no convertir una confirmación de cuenta en una prueba técnica ni dejar como activa una rama funcional ya integrada.

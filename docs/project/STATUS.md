# Estado del portfolio

Actualizado: 2026-11-24.

## Estado entregado

- Perfil, experiencia, skills y PDF del CV actualizados.
- Desbordamiento de «Sobre mí» corregido y tamaños de títulos adaptados a móvil.
- Menú compacto mantenido hasta el breakpoint `lg` para evitar desbordamiento de cabecera.
- Acciones compartidas del CV: previsualización en modal, descarga y apertura en otra pestaña.
- Cambios anteriores integrados en `develop` y `master` y desplegados por el propietario.

## Trabajo activo

Entrega conjunta de contexto para IA y privacidad, en `feature/privacy-and-ai-context`, creada desde `develop`.

| Bloque | Estado |
|---|---|
| Entrada común `AGENTS.md` y referencias por herramienta | Completado y validado documentalmente |
| README y mapa de arquitectura | Completados y validados documentalmente |
| Inventario de datos y decisiones de privacidad | Actualizado con revisión de cuenta aportada por el propietario y límites de evidencia |
| Configuración flexible de Analytics | Interruptor apagado por defecto; UI separada de posibilidad de seguimiento; pruebas por modo en testing |
| Avisos y dirección | Contenido según modo; domicilio desde entorno, ubicación general por defecto; opción C formalmente incompleta |
| Pruebas y evidencia | Pruebas unitarias e integración ampliadas; resultados centralizados en la documentación de pruebas |
| Verificación y cierre de documentación | Cuentas documentadas; verificación local completada y etiqueta real/preview pendientes tras desplegar |

## Confirmaciones del propietario

- El público principal es México.
- Las capturas públicas contienen datos ficticios de demostración.
- Se utiliza GA4 para aprender su integración y medir el alcance del portfolio, con ajustes revisados de conservación, uso compartido y medición el 2026-11-24. Los informes generales no identifican reclutadores.
- No se utilizan campañas. Se encontró un vínculo de Ads no usado y el propietario lo eliminó; no hay otros vínculos ni destinos publicitarios según su revisión.
- Se reutilizarán el nombre y los medios de contacto ya publicados en el repositorio.
- El propietario pidió retirar su dirección del código y preparar la opción C con la ubicación general del CV. Una dirección completa puede configurarse después en Netlify; no se versiona ni se trata como un secreto del navegador.
- El propietario informó que ya creó las variables nuevas en Netlify y eligió Analytics en `false` y dirección vacía para la primera validación. Su efecto queda pendiente de comprobar en los despliegues nuevos; activar GA y completar el domicilio posteriormente son opciones por decidir.

La revisión de paneles fue realizada por el propietario con Claude Code y trasladada como estados, sin acceso directo de Codex. El registro y sus límites están en [ACCOUNT-CHECKLIST.md](../privacy/ACCOUNT-CHECKLIST.md). Los resultados de cuenta no sustituyen la comprobación real tras desplegar.

## Siguiente paso

La revisión QA de F1/F2/F3 aprobó la implementación para integrar y desplegar con Analytics apagado. Las notas N2 y N3 quedaron corregidas: la documentación distingue la normalización de Nuxt de la validación del helper y el aviso breve detalla los datos de contacto. Analytics se puede apagar sin UI ni lecturas/escrituras de preferencias y reactivar manteniendo la política de consentimiento. El domicilio no está en el código: se resuelve desde entorno; vacío muestra la ubicación general. Esto no cubre el domicilio exigido por la ley y mantiene E1 abierto en la opción C; la aprobación técnica no cierra esta decisión.

| Momento | Acción restante |
|---|---|
| Antes de integrar | Revisar los ajustes finales y la limitación de C; preparar commits y PRs solo cuando el propietario lo autorice |
| Antes de publicar | Comprobar valores del contexto en Netlify y revisar el preview sin ID real; primer despliegue elegido con Analytics apagado, dirección vacía y limpieza de cookies |
| Después de publicar | Validar modo apagado; si se decide activar GA, configurar true más ID válido, redesplegar y comprobar consentimiento, cookies, retirada y vistas reales |
| Después de integrar | Actualizar el mapa de contexto del repositorio Dev por separado; cerrar o retirar el handoff temporal cuando termine la revisión |

El [flujo de despliegue](../deployment/README.md) distingue el estado actual de la opción de habilitar develop permanentemente, que no se ha aplicado. Todos los cambios de esta entrega siguen sin commit en la misma rama.

El plazo de logs operativos de Netlify y el contacto de notificación de la adenda no fueron aportados: son información externa no confirmada, no ajustes de código pendientes ni una petición de repetir la revisión de cuenta. La [revisión detallada](../privacy/REVIEW.md) conserva los límites del análisis.

## Validación

El responsive y las acciones del CV se verificaron en sesiones anteriores en Chrome a 320, 390, 768, 1024 y 1440 px, además de builds de producción. Los scripts de aquellas sesiones fueron temporales; la suite de privacidad actual añade una comprobación de regresión del visor, sin cubrir exhaustivamente el CV.

Validación documental: enlaces relativos e imports comprobados, scripts contrastados con `package.json` y `git diff --check` sin errores. `.env.example` documenta el interruptor, el ID ficticio y la dirección pública opcional, sin datos reales.

Los resultados anteriores de privacidad se conservan en las rondas históricas. La matriz actual de modos, ubicación/dirección ficticia, unitarias y builds se mantiene en testing y sus informes; no atribuir resultados antiguos a la configuración nueva. La [documentación de pruebas](../testing/README.md) enlaza la evidencia y explica cómo reproducirla y qué queda sin validar.

El build final mostró advertencias sobre la antigüedad de `caniuse-lite` y la generación de sourcemaps de un plugin de Nuxt; no impidieron compilar. No se actualizaron dependencias como parte de esta revisión.

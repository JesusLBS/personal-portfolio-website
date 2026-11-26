# Estado del portfolio

Actualizado: 2026-11-26.

## Estado entregado

- Perfil, experiencia, skills y PDF del CV actualizados.
- Desbordamiento de «Sobre mí» corregido y títulos adaptados a móvil; menú compacto hasta `lg`.
- Acciones compartidas del CV: previsualización en modal, descarga y apertura en otra pestaña.
- Contexto común `AGENTS.md`, entradas de Claude/Gemini y documentación de arquitectura, despliegue, privacidad y pruebas integrados.
- Avisos de privacidad/cookies, preferencias y control opcional de Analytics integrados. Las notas N2/N3 quedaron corregidas antes de los commits.
- La entrega de `feature/privacy-and-ai-context` está confirmada en Git: implementación `62289d2`, documentación `e8c07cc` y merges a `develop` y `master`.
- El propietario confirmó la revisión visual del Deploy Preview y el despliegue a producción con Analytics en `false`. Eligió mantener vacía la variable de domicilio. La activación del tag se pospuso.

La confirmación visual y el despliegue aportados por el propietario no acreditan una inspección independiente de red, cookies o proveedor real. El [registro de cuenta](../privacy/ACCOUNT-CHECKLIST.md) conserva la procedencia y los límites de las comprobaciones.

## Trabajo activo

Mantenimiento de dependencias en `fix/dependency-security`, creada desde `develop` en `b8be0e9`. El [plan de mantenimiento](MAINTENANCE.md) conserva alcance, diagnóstico, pasos y criterios de cierre. Al retomar el trabajo, comprobar primero la rama y el estado real de Git.

| Bloque | Estado |
|---|---|
| Crear rama y cerrar el estado documental de la entrega anterior | Realizado; cambios documentales pendientes de commit |
| Diagnóstico de dependencias y versiones | Repetido después de actualizar y reinstalar; resultados y límites en el plan |
| Actualizar dependencias compatibles y resolver avisos | Aplicado en manifiesto/lockfile, con versión de Node declarada; sin avisos altos ni críticos en la auditoría registrada |
| Validar actualización | Instalación limpia, unitarias, builds y regresiones locales aprobados con Node 22.23.2, fijado en `.nvmrc` para coincidir con el propietario; arranque normal con `npm run dev` y cierre verificados en terminal PTY; evidencia nueva en testing |
| Revisar preview de mantenimiento | Pendiente de commits, PR y despliegue; el preview de privacidad anterior no lo sustituye |
| Agenda de contacto | Evaluada; implementación posterior en su propia rama |
| Migraciones mayores de módulos | Evaluadas como trabajo separado; no aplicadas |

## Confirmaciones del propietario

- El público principal es México y las capturas de proyectos contienen datos ficticios de demostración.
- GA4 sirve para aprender su integración y medir el alcance del portfolio. Los informes generales no identifican reclutadores.
- La revisión de cuenta del 2026-11-24 ajustó conservación, uso compartido y medición; se eliminó una vinculación de Ads no utilizada. No se utilizan campañas.
- Se reutilizan el nombre y los medios de contacto ya públicos. El domicilio completo permanece fuera de Git y puede configurarse mediante una variable pública de entorno.
- El propietario creó las variables nuevas en Netlify, revisó el preview y publicó con Analytics apagado. Una activación posterior y la publicación de domicilio completo son decisiones futuras.

Codex no accedió a los paneles de Analytics o Netlify; el registro de cuenta identifica la procedencia de cada confirmación.

## Seguimiento

| Tema | Estado |
|---|---|
| Red y cookies en producción con modo apagado | Pendiente de inspección independiente; el propietario confirmó publicación y presentación |
| Google tag real | Prueba aplazada por el propietario. Si decide activarlo, redesplegar y comprobar consentimiento, retirada y vistas por ruta |
| Domicilio | La opción C elegida muestra ubicación general y mantiene E1 abierto; la entrega técnica no acredita cumplimiento jurídico completo |
| Logs de Netlify y contacto de la adenda | Información no aportada; no inventar plazos ni tratarla como fallo del repositorio |
| Contexto global de Dev | Actualizar su mapa por separado en ese repositorio; el portfolio ya tiene AGENTS/CLAUDE/GEMINI |
| Handoff temporal de privacidad | Conserva el historial de QA; el estado del proyecto se mantiene aquí y el plan en MAINTENANCE |

El [flujo de despliegue](../deployment/README.md) sigue siendo rama de trabajo → `develop` → `master`. La URL permanente de develop no se ha habilitado según la última configuración aportada.

## Evidencia y mantenimiento del estado

La [documentación de pruebas](../testing/README.md) conserva por separado los resultados de la entrega de privacidad y la nueva validación del mantenimiento: lógica local y etiqueta simulada, sin certificar Google real. Se repitieron las regresiones de responsive, menú, CV, galerías y recursos con las dependencias actualizadas. El detalle de los avisos moderados restantes está en el plan; no presentar la auditoría como libre de avisos.

Cuando se complete un paso del plan, actualizar su resultado allí y este resumen. Al integrar o publicar, sustituir los pasos pendientes por el resultado y su procedencia; no dejar como trabajo activo una rama ya entregada. Las versiones instaladas se consultan en el manifiesto/lockfile, no en este resumen.

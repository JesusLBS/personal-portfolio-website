# AGENTS.md — Personal Portfolio Website

Contexto común para trabajar en este repositorio con cualquier asistente. `CLAUDE.md` y `GEMINI.md` remiten a este archivo; las reglas compartidas se mantienen aquí.

## Proyecto y fuentes

Portfolio personal de Nuxt, con perfil profesional en `/`, servicios en `/services` y páginas legales en `/privacidad` y `/cookies`. La arquitectura y las rutas actuales se explican en [`docs/architecture/README.md`](docs/architecture/README.md). Las versiones y comandos se consultan en `package.json` y, cuando haga falta una versión exacta, en su entrada de `package-lock.json`.

Orden de lectura al comenzar:

1. Este archivo. Si se trabaja desde `~/Dev`, consultar también sus instrucciones globales.
2. [`docs/project/STATUS.md`](docs/project/STATUS.md), para conocer el trabajo activo.
3. El documento necesario para la tarea, según esta tabla.

| Tema | Fuente de verdad |
|---|---|
| Cómo colaborar, Git y validación | Este archivo |
| Uso del proyecto, comandos y despliegue | [`README.md`](README.md) |
| Validación previa, previews y promoción | [`docs/deployment/README.md`](docs/deployment/README.md) |
| Estado y próximos pasos | [`docs/project/STATUS.md`](docs/project/STATUS.md) |
| Mantenimiento de dependencias y fases posteriores | [`docs/project/MAINTENANCE.md`](docs/project/MAINTENANCE.md) |
| Agenda de contacto, país y activación | [`docs/project/SCHEDULING.md`](docs/project/SCHEDULING.md) |
| Componentes, rutas, CV e integraciones | [`docs/architecture/README.md`](docs/architecture/README.md) |
| Datos, proveedores, evidencia y decisiones de privacidad | [`docs/privacy/README.md`](docs/privacy/README.md) |
| Comprobaciones manuales de cuentas | [`docs/privacy/ACCOUNT-CHECKLIST.md`](docs/privacy/ACCOUNT-CHECKLIST.md) |
| Revisión de textos y pendientes jurídicos | [`docs/privacy/REVIEW.md`](docs/privacy/REVIEW.md) |
| Pruebas, reproducción y límites de la evidencia | [`docs/testing/README.md`](docs/testing/README.md) |
| Texto publicado del sitio | Componentes y páginas de `app/` |

Actualizar la fuente correspondiente cuando cambie su tema. Distinguir estado actual, decisiones pendientes y comportamiento realmente verificado.

## Forma de trabajar

- Responder en español. Código, identificadores y mensajes de commit en inglés; conservar el español del contenido del portfolio.
- Antes de editar, revisar rama y estado de Git y preservar cambios existentes del usuario.
- Mantener cambios localizados y el diseño actual. Priorizar componentes reutilizables dentro de las carpetas existentes.
- Consultar documentación oficial para comportamiento de Nuxt, Vue, Tailwind y módulos; contrastarla con la versión instalada. Un ejemplo de una versión más reciente no prueba que la versión del proyecto tenga esa API.
- Las instalaciones y cambios de configuración del entorno se proponen mediante comandos; ejecutarlos solo si el usuario lo pide.
- Completar las tareas autorizadas en el orden acordado, manteniendo separados los cambios que el usuario quiera revisar o confirmar por bloques. Una nueva autorización no es necesaria para cada paso de una tarea ya aprobada.
- No atribuir al repositorio runners, hooks, verificaciones o conexiones externas que no estén configurados.
- Mantener separados cambios implementados, ajustes de cuenta confirmados, resultados locales y comprobaciones posteriores al despliegue. Un informe antiguo de QA conserva su fecha y no convierte una corrección ya aplicada en tarea pendiente.

Referencias: [Nuxt](https://nuxt.com/docs/4.x), [Vue](https://vuejs.org/guide/), [Tailwind CSS v3](https://v3.tailwindcss.com/docs/), [Nuxt Google Tag](https://github.com/johannschopplich/nuxt-gtag), [Nuxt Icon](https://nuxt.com/modules/icon), [Nuxt Image](https://image.nuxt.com/), [Nuxt Fonts](https://fonts.nuxt.com/).

## Git y entrega

- `develop` es integración y `master` es producción. Trabajar en ramas `feature/*`, `fix/*`, `docs/*` o `chore/*` creadas desde `develop`; no editar directamente esas ramas principales.
- `origin` corresponde a Bitbucket: allí se suben ramas de trabajo y se realizan los PRs. La promoción es rama de trabajo → `develop` → `master`.
- `github` corresponde al repositorio público: se sincronizan únicamente `develop` y `master` desde el historial integrado en Bitbucket. Las ramas de trabajo y los PRs se gestionan en Bitbucket.
- El despliegue de producción está vinculado a Bitbucket/`master` en Netlify según el flujo confirmado por el propietario. La vinculación y los contextos de despliegue pertenecen a la configuración de Netlify; `netlify.toml` no los define.
- No ejecutar staging, commits, push, merges ni abrir PRs sin petición explícita. Por defecto, sugerir mensaje y comandos con rutas concretas para que el usuario los ejecute.
- No usar push forzado para sincronizar GitHub. Investigar cualquier divergencia antes de resolverla.

Convención usada en el historial: Conventional Commits con gitmoji en texto, encabezado en minúsculas e inglés y descripción breve en una segunda línea, separada por una línea en blanco. Mantener cada línea del mensaje dentro de 100 caracteres.

```text
<type>: :<gitmoji>: <subject>

<description>
```

Ejemplos de parejas: `feat`/`:sparkles:`, `fix`/`:bug:`, `docs`/`:memo:`, `chore`/`:wrench:`. Revisar cambios en stage, sin stage y archivos nuevos; agrupar por trabajo relacionado. No asumir que hay Husky o commitlint por usar esta convención.

## Contenido, datos y privacidad

- El CV publicado se centraliza en `app/composables/useCv.ts`; mantener coherentes sus acciones y el contenido profesional. Reemplazar el PDF no actualiza los textos de experiencia o skills.
- Las capturas de proyectos contienen datos ficticios de demostración, confirmado por el propietario. Conservar esa condición al añadir o reemplazar material público.
- El repositorio se publica en GitHub: no introducir información privada de clientes, documentos reales de terceros, credenciales ni datos de cuenta de Analytics. Consultar únicamente `.env.example` cuando se necesite una referencia de entorno.
- La finalidad declarada de GA4 es medir el alcance y uso del portfolio y mejorar su contenido. El aprendizaje de integración es contexto técnico del propietario, no una razón para recoger más datos. No se identifican reclutadores mediante informes generales. El propietario no utiliza campañas; la vinculación de Ads encontrada fue eliminada en la revisión del 2026-11-24. No habilitar publicidad como parte de una mejora de estadísticas; mantener el estado de cuenta en su registro, sin inferirlo del código.
- Los ajustes internos de Analytics y Netlify no se deducen de valores predeterminados ni de la ausencia de cambios en código. Registrar evidencia y pendientes en el inventario de privacidad.
- No versionar un domicilio real: usar `NUXT_PUBLIC_PRIVACY_ADDRESS` y el resolutor común. Con la variable vacía se muestra la ubicación general, que no cubre el domicilio legal; registrar esta limitación sin presentarla como cumplimiento completo. Las variables públicas no son secretos.
- Analytics está apagado por defecto mediante `NUXT_PUBLIC_ANALYTICS_ENABLED`. En false no debe haber UI de consentimiento ni acceso a localStorage; se limpian cookies heredadas. Probar ambos modos antes de cambiar esta configuración.
- No inventar domicilio, plazos de conservación, transferencias, permisos o garantías jurídicas. Un texto legal público debe coincidir con el funcionamiento implementado y los datos confirmados del responsable.

## Validación

- Documentación: comprobar enlaces relativos, nombres de scripts, rutas y consistencia entre las fuentes de verdad; ejecutar `git diff --check`. No es necesario compilar por cambios exclusivamente documentales.
- Aplicación: ejecutar `npm run build` y comprobar en navegador los comportamientos afectados. `package.json` no define scripts de lint ni typecheck independiente; no afirmar que se ejecutaron.
- Privacidad: ejecutar `npm run test:privacy` para la política de preferencias. Este script utiliza el test runner de Node y requiere una versión con soporte para `--experimental-strip-types`.
- Integración de privacidad: seguir [`docs/testing/README.md`](docs/testing/README.md) para ejecutar `npm run test:privacy:browser` contra un build local de producción con etiqueta simulada. Chrome debe estar instalado. Los artefactos son temporales por defecto; actualizar `docs/privacy/evidence/` solo deliberadamente.
- Agenda: ejecutar `npm run test:scheduling` cuando cambien la validación de URL o la decisión por país. La simulación local no acredita la Edge Function desplegada; seguir [SCHEDULING.md](docs/project/SCHEDULING.md) para el preview y la activación del enlace.
- Añadir pruebas para reglas, límites o fallos relevantes. No duplicar marcado estático ni instalar otro runner sin necesidad. Documentar comandos y límites al incorporar pruebas.
- Responsive: cubrir 320, 390, 768, 1024 y 1440 px, entrada directa, recarga y navegación desde `/services` a `/?mode=client`. Comprobar desbordamiento horizontal y apertura/cierre del menú.
- CV: comprobar los cinco accesos, foco, teclado, cierre del modal, descarga del archivo actual y apertura en otra pestaña. El PDF solo debe cargarse al solicitar su previsualización.
- Analytics: comprobar red y almacenamiento en un entorno con configuración de producción y un identificador de prueba. Una prueba en `npm run dev`, donde la etiqueta está deshabilitada, no valida consentimiento.
- Informar qué se cambió, qué se verificó y las limitaciones reales. Distinguir las pruebas versionadas de scripts temporales; las capturas visuales no prueban ausencia de tráfico ni cumplimiento jurídico.

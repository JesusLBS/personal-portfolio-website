# Plan de mantenimiento y próximas mejoras

Actualizado: 2026-11-26. El estado resumido y la entrada para retomar trabajo están en [STATUS.md](STATUS.md). Este documento conserva el plan operativo; no sustituye arquitectura, inventario de privacidad ni historial de Git.

## Alcance y ramas

| Orden | Rama | Alcance y estado |
|---|---|---|
| Integrada | `fix/dependency-security` | Commits `75b93d1` y `7575e80`, PR #32 a `develop` y #33 a `master`. Preview validado por el propietario; build de producción iniciado, sin resultado final comunicado |
| Actual | `feature/contact-scheduling` | Creada desde `develop` en `073fe9c`. Enlace y formulario público revisados; agenda y contacto compartido verificados técnicamente y validados en local por el propietario. Ajustes privados y preview pendientes. Detalle en [agenda](SCHEDULING.md) |
| Posterior | `fix/seo-metadata` | Acordada la revisión de SEO después de agenda: metadatos propios de perfil/servicios, canonical de `/services` y auditoría con Lighthouse/PageSpeed. Todavía no implementada |
| Según necesidad | `chore/nuxt-module-upgrades` | Propuesta: migraciones mayores de módulos con revisión de cambios y pruebas propias |

Crear las ramas posteriores desde `develop` actualizado después de integrar el trabajo que corresponda. Los commits de cierre documental y de actualización de paquetes se realizaron por separado. El mapa global de Dev pertenece a otro repositorio y se actualiza fuera de esta entrega.

## Diagnóstico inicial de dependencias

Consulta inicial realizada con el registro oficial de npm sobre el lockfile de `b8be0e9`, Node 26.10.0 y npm 11.19.1. El diagnóstico inicial usó `npm outdated --json`, `npm audit --json` y consultas locales, antes de la instalación descrita más abajo.

El informe inicial registra 39 dependencias afectadas: 6 críticas, 17 altas, 12 moderadas y 4 bajas. Incluye dependencias indirectas y herramientas de desarrollo; no demuestra por sí solo que esos problemas sean explotables en producción. Las cifras son una instantánea de esta consulta y deben volver a medirse al actualizar.

| Paquete | Instalado al iniciar | Aplicado y probado |
|---|---|---|
| `nuxt` | 4.4.5 | 4.7.0 |
| `vue` | 3.5.34 | 3.5.46 |
| `vue-router` | 5.0.7 | 5.5.1 |
| `@nuxt/icon` | 2.2.2 | 2.6.3 |
| `@nuxt/image` | 2.0.0 | 2.2.1 |
| `@fancyapps/ui` | 6.1.14 | 6.1.15 |
| `@nuxtjs/robots` | 6.0.9 | 6.2.4 |
| `@nuxtjs/sitemap` | 8.0.15 | 8.6.2 |

Los saltos de Fonts 0.14 a 1.x, Robots 6 a 7, Sitemap 8 a 9 y `nuxt-gtag` 4 a 5 quedan fuera de la actualización compatible inicial. Una versión más reciente no acredita compatibilidad con esta aplicación.

Permanecen versiones obsoletas indirectas de `inflight`, `glob` y `@koa/router`. No se añadieron como dependencias directas ni se forzaron migraciones mayores para silenciar sus avisos.

Fuentes de contraste:

- [Aviso de Nuxt DevTools](https://github.com/nuxt/nuxt/security/advisories/GHSA-279x-mwfv-vcqv): la base instalaba 3.2.4; esa dependencia afectada desapareció con la nueva estructura de Nuxt. El aviso se limita a desarrollo y no aparece en la auditoría final.
- [Aviso de Vue SSR](https://github.com/vuejs/core/security/advisories/GHSA-g2v6-rqmx-r4w6): contrastar el uso real de datos no confiables antes de atribuir exposición al portfolio.
- [Notas de Nuxt 4.7](https://github.com/nuxt/nuxt/releases/tag/v4.7.0): revisar cambios antes de actualizar; mantener el preset Netlify y no activar Nitro 3 experimental como parte de este mantenimiento.

## Ejecución y criterios de cierre

| Paso | Acción | Estado |
|---|---|---|
| 1 | Crear rama, registrar la publicación anterior y conservar un punto de entrada común | Realizado e integrado en `7575e80` |
| 2 | Repetir diagnóstico y revisar avisos, dependencias de origen y compatibilidad | Realizado; auditoría final después de instalación limpia |
| 3 | Actualizar paquetes dentro de sus rangos declarados y revisar manifiesto/lockfile | Realizado; Nuxt tiene un mínimo explícito de 4.7 y se declaró Node |
| 4 | Revisar avisos restantes y justificar cualquier limitación con su alcance y fuente | Realizado; cadena moderada documentada a continuación |
| 5 | Ejecutar regresiones locales y revisar el preview | Local aprobado; propietario confirmó revisión del preview antes de iniciar producción |
| 6 | Preparar commits y promover mediante PR | Completado por el propietario; commits y merges presentes en el historial local |

Durante la actualización, conservar Analytics apagado por defecto, la activación manual del tag, la política de consentimiento y la dirección opcional. No ejecutar `npm audit fix --force` ni activar funcionalidades experimentales para cerrar la auditoría. Los comandos de instalación/actualización se ejecutan conforme a la autorización y reglas de [AGENTS.md](../../AGENTS.md).

La validación debe incluir unitarias de privacidad, builds node-server y Netlify, y la matriz de navegador con etiqueta simulada documentada en [testing](../testing/README.md). Cubrir carga directa y navegación, responsive a las cinco anchuras habituales, menú, CV y las galerías, imágenes, fuentes, iconos, robots y sitemap afectados por los paquetes actualizados. Repetir la auditoría y revisar el preview sin ID real; un build aprobado no cierra por sí solo la actualización.

## Resultado de la actualización

Se actualizaron los paquetes de la tabla con `npm update --save`. Se fijó `nuxt: ^4.7.0` como mínimo para evitar que la resolución automática volviera a 4.6.3. Fonts, Tailwind y `nuxt-gtag` mantienen sus versiones mayores anteriores. Se corrigió el icono inexistente `ri:images-line` por `ri:multi-image-line` en las dos galerías y se retiró un `console.log` del botón de desplazamiento que imprimía el estado interno. La lógica de privacidad no cambió.

La instalación limpia con `npm ci` y el build Netlify posterior aprobaron. La [ejecución de pruebas](../testing/README.md#validación-del-mantenimiento-de-dependencias) registra los resultados nuevos, sin reutilizar la evidencia histórica como si fuera una nueva ejecución.

La auditoría final registra **9 dependencias afectadas, todas moderadas; ninguna alta, crítica o baja**. Provienen de `minimatch` 10.2.6 en la cadena `nuxt` → `@nuxt/nitro-server` → `nitropack` → `archiver` → `readdir-glob`. npm propaga el mismo problema hacia sus dependientes; no son nueve fallos independientes demostrados en el portfolio.

El [aviso de minimatch](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249) requiere un patrón controlado por el atacante y `optimizationLevel >= 2`. No se identificó una entrada del portfolio que solicite patrones glob; esto no cierra automáticamente el aviso. La corrección está en 11.0.1 o superior. La consulta de npm muestra `readdir-glob` 4 con minimatch 11, pero archiver 8 todavía declara la rama 3; adoptarlo exigiría forzar una versión mayor indirecta o esperar una actualización del proveedor. Queda como seguimiento explícito, sin overrides ni `audit fix --force`. La sugerencia automática de volver a Nuxt 4.6.3 se descartó porque reintroducía avisos corregidos del framework.

`.nvmrc` fija Node 22.23.2, alineado con la versión del propietario, y `engines` refleja los requisitos de Nuxt. Node 26.10.0 se utilizó en el diagnóstico y las primeras pruebas; no es un requisito de esta actualización. El 2026-11-26 se verificaron de nuevo la instalación limpia, unitarias, builds y regresiones con Node 22.23.2 y npm 10.9.8. Comprobar la selección de build y runtime en el preview de Netlify; no se modificó su panel.

La actualización cambió la CLI de 3.35.2 a 4.1.0. La nueva CLI avisa si hereda un `NODE_ENV` distinto del esperado y añade un panel TUI. Se confirmó `local` ya presente en el entorno antes de ejecutar Nuxt. El script `dev` establece `development` y pasa `--no-tui` internamente, manteniendo el comando de uso `npm run dev`. El 2026-11-26 se verificó en una copia temporal con terminal PTY, Node 22.23.2, `NODE_ENV=local` y `NUXT_TUI=1` heredados: inicio y servicios respondieron con HTTP 200, sin la advertencia ni el panel. Tampoco aparecieron el volcado de estado ni el aviso del icono ausente. El cierre con SIGINT terminó con código 130, sin reproducir el mensaje «Something went wrong» de la captura del propietario; no se atribuyó ese mensaje a un fallo de arranque ni se cambió la CLI para ocultarlo. No se modificaron archivos globales del usuario.

El primer build local heredaba `DEBUG` y activaba la instrumentación de Nitro, que generó una referencia ausente a `vue/timing.js` y respuestas 500. Recompilar con `DEBUG=''` resolvió el fallo; las pruebas registradas corresponden al build sin esa instrumentación. No se añadió un workaround al código de la aplicación. Permanece una advertencia de `@nuxt/fonts` 0.14 sobre `addCustomTab` obsoleto; se revisará con la migración del módulo y no impidió compilar. La [guía de DevTools](https://nuxt.com/modules/devtools/module-migration#ndt_dep_0005) confirma que esa API conserva compatibilidad durante el ciclo v4.

## Agenda de contacto: fase actual

El propietario autorizó preparar «Agendar una conversación» en perfil y servicios y eligió mostrarla solo para México. La implementación usa un enlace opcional de Calendly y una decisión basada en el país proporcionado por Netlify. La configuración vacía conserva la función desactivada. Después creó su cuenta, compartió el enlace y se revisaron página, muestra de horarios y formulario públicos sin reservar. Los ajustes privados no se deducen de esa visita. El alcance, los límites y la lista de activación están en [SCHEDULING.md](SCHEDULING.md).

El [plan gratuito de Calendly](https://calendly.com/pricing) contempla un tipo de evento y un calendario. Su [API de reservas](https://developer.calendly.com/api-docs/overview/rate-limits) limita la creación de invitados en Free a cinco peticiones por usuario al día. El enlace externo es la propuesta inicial para reducir mantenimiento; la elección sigue abierta.

Netlify ofrece [país en el contexto de Edge Functions](https://docs.netlify.com/build/edge-functions/api/). Se eligió esa señal para mostrar el botón; otro país, una ubicación desconocida o un fallo lo mantienen oculto. La ubicación no garantiza idioma ni residencia y no restringe las reservas desde un enlace de Calendly compartido.

Al implementar la agenda, revisar proveedor, finalidad de gestionar citas, datos realmente solicitados, aviso e inventario de privacidad. Un embed carga recursos externos y requiere comprobar su comportamiento; no asumir que el consentimiento de Analytics cubre ese servicio. La activación de Google tag real y la decisión del domicilio permanecen independientes de esta mejora.

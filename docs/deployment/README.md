# Revisión previa y despliegue

Estado revisado: 2026-11-26. Este documento explica el flujo; el [estado de la entrega](../project/STATUS.md) indica qué pasos están completados. El propietario confirmó el despliegue de privacidad a producción con Analytics apagado. Codex no modificó la configuración de Netlify ni realizó una inspección independiente del despliegue.

## Configuración confirmada

| Elemento | Estado aportado por el propietario |
|---|---|
| Producción | Bitbucket, rama `master`; entrega de privacidad publicada según confirmación del propietario |
| `develop` | Integración, sin despliegue permanente habilitado |
| Deploy Previews | Habilitados para PR; propietario confirmó la revisión visual del preview de privacidad |
| Variables | ID real de Analytics limitado a Production; el propietario informó la creación de las variables nuevas y eligió Analytics apagado y dirección vacía para la primera validación |

El registro de cuenta y la procedencia de estas confirmaciones están en [ACCOUNT-CHECKLIST.md](../privacy/ACCOUNT-CHECKLIST.md). `netlify.toml` solo declara la redirección del dominio anterior; no configura esas asociaciones.

## Versión de Node

[`.nvmrc`](../../.nvmrc) fija Node 22.23.2, la versión utilizada por el propietario y verificada localmente con esta actualización. La selección inicial de Node 26 correspondía al entorno de pruebas del asistente; el upgrade no exige migrar a esa versión. `package.json` declara el rango admitido por Nuxt. Netlify admite fijar versiones mediante `.nvmrc`, con prioridad sobre la selección del panel; comprobar Node 22.23.2 en el log del siguiente preview. No se modificó la cuenta. [Selección de Node en Netlify](https://docs.netlify.com/build/configure-builds/manage-dependencies/).

El runtime de Functions se selecciona por separado según las versiones admitidas por la plataforma y cualquier override existente. No deducir que coincide con el build: comprobar el runtime del despliegue. [Configuración de Functions](https://docs.netlify.com/build/functions/configuration/#nodejs-version-for-runtime).

## Variables y estado publicado

Los modos y valores predeterminados están en el [inventario](../privacy/README.md#configuración-y-modos-de-funcionamiento). El propietario creó las variables y confirmó la publicación con `NUXT_PUBLIC_ANALYTICS_ENABLED=false`; eligió mantener `NUXT_PUBLIC_PRIVACY_ADDRESS` vacía. El preview y la publicación ya se realizaron. La inspección independiente de red, almacenamiento y texto renderizado sigue pendiente; no se vuelve a marcar como pendiente la creación de variables o el despliegue.

| Contexto o fase | Interruptor | ID | Dirección |
|---|---|---|---|
| Producción publicada, según propietario | `false` | No se utiliza aunque exista | Vacía como opción elegida; comprobar el texto renderizado |
| Producción si se decide usar GA | `true` | ID válido de la propiedad | La misma decisión de dirección |
| Preview para revisar privacidad | `true` | Sin ID real | Vacía o ejemplo ficticio, nunca una dirección particular para QA |

`NUXT_PUBLIC_PRIVACY_ADDRESS` vacía muestra la ubicación general; no completa el requisito legal de domicilio. El valor configurado es público en HTML/runtime config. No ponerlo en `netlify.toml`, commits, capturas o informes. Cambiar variables requiere un nuevo build/deploy; no modifica los despliegues ni pestañas anteriores.

La comprobación técnica pendiente del modo publicado cubre contactos, rutas legales, ausencia de tráfico de Google y limpieza de cookies heredadas, sin banner ni acceso al almacenamiento de preferencias. El propietario aplazó las pruebas del tag activo. Si decide activarlo, configurar `NUXT_PUBLIC_ANALYTICS_ENABLED=true` más ID válido y redesplegar antes de comprobar consentimiento y mediciones reales. Reactivar conserva la versión de la política y puede reutilizar una aceptación anterior que siga vigente; no se amplían datos ni finalidades.

## Procedimiento para futuras entregas

1. Revisar localmente el contenido, ejecutar las comprobaciones aplicables y preparar los commits cuando el propietario lo autorice. Las pruebas existentes están en [testing](../testing/README.md).
2. Subir la rama de trabajo a Bitbucket e integrarla en `develop` mediante PR.
3. Abrir el PR `develop` → `master` y revisar su Deploy Preview antes de fusionar: carga directa, navegación, responsive, menú, CV y controles de privacidad. Confirmar ausencia de Analytics real en ese preview.
4. Tras aprobar el preview, fusionar a `master`, comprobar el build de producción y ejecutar la [verificación real de privacidad](../privacy/ACCOUNT-CHECKLIST.md#comprobación-real-tras-desplegar) del modo elegido. Sincronizar GitHub según el README del proyecto.

Netlify admite previews de PR de Bitbucket si la rama destino es producción o tiene branch deploys habilitados. En el estado confirmado, el PR hacia `master` permite probar antes de publicar; no debe darse por hecho un preview para PR hacia `develop`. [Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/).

La configuración declarada no demuestra un preview exitoso: comprobar la URL y el resultado del build al crear el PR. No se necesita otro sitio Netlify para este flujo.

## Alternativa opcional: URL permanente de develop

Si se necesita revisar cada integración sin abrir el PR a producción, se puede habilitar exclusivamente `develop` como branch deploy en el mismo sitio. Tendría una URL `develop--<sitio>.netlify.app` que se actualizaría al subir cambios. Es una propuesta, no una configuración aplicada. [Branch deploys](https://docs.netlify.com/deploy/deploy-types/branch-deploys/).

Al adoptarla, mantener GA real fuera de ese contexto, revisar la indexación de la URL y actualizar el registro de cuenta. La protección de indexación de previews no debe suponerse para el branch deploy más reciente. No cambiar `master` como rama de producción.

## Alcance de las verificaciones

Las pruebas unitarias comprueban reglas y fallos de almacenamiento. El navegador comprueba presentación e interacción; el build y el preview comprueban además la integración con el alojamiento. Ninguno sustituye los otros.

El repositorio no declara un pipeline que ejecute automáticamente `test:privacy` o `test:privacy:browser`. Tener scripts o un build automático de Netlify no acredita que las pruebas se ejecuten en CI; registrar qué se ejecutó realmente.

El preview con interruptor activo pero sin ID real permite revisar interfaz, rutas y ausencia de medición; no verifica el funcionamiento del proveedor tras aceptar. Las pruebas locales usan etiqueta simulada y la validación de Google real queda en producción. No añadir el ID de producción a previews para cubrir esa diferencia.

Al cerrar la entrega, actualizar STATUS y el registro con resultados reales, sin IDs ni valores de cookies. Conservar las evidencias históricas como tales y distinguir información no aportada de tareas de código pendientes.

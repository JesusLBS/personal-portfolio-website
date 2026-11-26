# Pruebas y evidencia de privacidad

Las pruebas distinguen reglas puras, integración local y servicios reales. No certifican cumplimiento jurídico ni inspeccionan las cuentas del propietario.

## Unitarias

```zsh
npm run test:privacy
```

[`tests/privacy-consent.test.mjs`](../../tests/privacy-consent.test.mjs) usa `node:test` sin dependencias nuevas. Requiere Node compatible con `--experimental-strip-types` y Nuxt. Las 15 pruebas cubren reglas de preferencia, vigencia, valores corruptos, fallos de almacenamiento, preservación de datos ajenos, interruptor explícito y resolución de dirección opcional. Los casos del helper `isAnalyticsEnabled` aceptan únicamente el booleano `true` o la cadena exacta `true`; prueban entradas directas, no la lectura de variables de entorno. Nuxt normaliza esos valores antes de llamar al helper: `TRUE` y ` true ` también llegan como el booleano `true`. En Netlify usar solo `true` o `false`. Los casos de dirección no confunden ubicación con domicilio configurado.

Añadir pruebas para reglas, límites y fallos concretos. No reproducir marcado estático ni instalar otro runner para duplicar verificaciones existentes.

## Navegador reproducible

[`scripts/verify-privacy.mjs`](../../scripts/verify-privacy.mjs) controla Chrome instalado mediante CDP. En macOS utiliza su ruta habitual; puede indicarse `CHROME_BIN` o `--chrome`. Crea un perfil temporal y solo admite loopback o el host fijo `www.portfolio.test`, dirigido a localhost por el propio Chrome. No cambia DNS ni `/etc/hosts`.

El runner acepta `--mode on`, `off` o `ui-only`, y `--address location` o `example`. Antes de capturar comprueba que la configuración tenga dirección vacía o el ejemplo ficticio exacto; no ejecutarlo con dirección ni ID reales. El fixture sustituye gtag e intercepta la medición: no manda datos a la propiedad del propietario.

### Modo apagado con ubicación general

Desde la raíz del repo, compilar y arrancar en una terminal:

```zsh
DEBUG='' NUXT_PUBLIC_ANALYTICS_ENABLED=false NUXT_PUBLIC_PRIVACY_ADDRESS='' NUXT_PUBLIC_GTAG_ID=G-TEST123456 npm run build -- --preset=node-server
HOST=127.0.0.1 PORT=3108 NUXT_PUBLIC_ANALYTICS_ENABLED=false NUXT_PUBLIC_PRIVACY_ADDRESS='' NUXT_PUBLIC_GTAG_ID=G-TEST123456 node .output/server/index.mjs
```

En otra terminal:

```zsh
npm run test:privacy:browser -- --url http://www.portfolio.test:3108 --mode off --address location
```

El ID ficticio presente demuestra que el interruptor es necesario: no debe cargarse Google, aunque haya una aceptación válida antigua. La prueba prepara cookies heredadas solo en el documento principal e instrumenta localStorage antes de ejecutar la aplicación. Comprueba ausencia de lecturas/escrituras, conservación literal de la elección, borrado de cookies de dominio y preservación de cookies ajenas. También verifica avisos de contacto, texto base sin GA, cuatro rutas a cinco anchuras y visor de CV.

Para probar dirección configurada, utilizar en build y servidor exclusivamente `NUXT_PUBLIC_PRIVACY_ADDRESS='Calle Ejemplo 123, Colonia Prueba, C. P. 00000'` y ejecutar `--mode off --address example`.

### Modo activo con dirección ficticia

Detener el servidor antes de recompilar; el build reemplaza sus artefactos:

```zsh
DEBUG='' NUXT_PUBLIC_ANALYTICS_ENABLED=true NUXT_PUBLIC_PRIVACY_ADDRESS='Calle Ejemplo 123, Colonia Prueba, C. P. 00000' NUXT_PUBLIC_GTAG_ID=G-TEST123456 npm run build -- --preset=node-server
HOST=127.0.0.1 PORT=3108 NUXT_PUBLIC_ANALYTICS_ENABLED=true NUXT_PUBLIC_PRIVACY_ADDRESS='Calle Ejemplo 123, Colonia Prueba, C. P. 00000' NUXT_PUBLIC_GTAG_ID=G-TEST123456 node .output/server/index.mjs
```

En la otra terminal:

```zsh
npm run test:privacy:browser -- --url http://www.portfolio.test:3108 --mode on --address example
```

Incluye todas las regresiones previas: aceptación/rechazo, carga única, retirada, caducidad activa, sincronización de pestañas, almacenamiento bloqueado, cookies de dominio padre legadas y nuevas, foco, visibilidad inicial de la explicación, cinco anchuras, navegación, iconos y visor de CV. Los valores de configuración y el contacto publicado también se verifican.

### Preview con UI activa y sin ID

El mismo build de prueba admite overrides de runtime. Arrancarlo con dirección e ID vacíos, manteniendo el interruptor activo:

```zsh
HOST=127.0.0.1 PORT=3108 NUXT_PUBLIC_ANALYTICS_ENABLED=true NUXT_PUBLIC_PRIVACY_ADDRESS='' NUXT_PUBLIC_GTAG_ID='' node .output/server/index.mjs
npm run test:privacy:browser -- --url http://www.portfolio.test:3108 --mode ui-only --address location
```

El servidor ocupa su terminal; ejecutar el segundo comando en otra. Se comprueba que aparece la UI y se guardan preferencias, pero aceptar no carga gtag ni crea cookies. No sustituye una prueba con Google real.

## Ejecución registrada

Fecha: 2026-11-24. Pasaron las unitarias, los builds node-server de ambos modos y el build Netlify con servicio apagado. Versiones concretas de Node/Chrome y fecha UTC en los informes. No se ejecutaron lint ni typecheck independiente; el repo no define esos scripts.

| Escenario | Comprobaciones aprobadas | Informe |
|---|---|---|
| Apagado, ubicación general | 56 | [off/location](../privacy/evidence/browser-off-location.json) |
| Apagado, dirección ficticia | 56 | [off/example](../privacy/evidence/browser-off-example.json) |
| Activo, ID y dirección ficticios | 87 | [on/example](../privacy/evidence/browser-report.json) |
| UI activa, sin ID, ubicación general | 14 | [ui-only/location](../privacy/evidence/browser-preview-location.json) |

Son 213 comprobaciones acumuladas de escenarios, no 213 casos independientes. Los cambios de variables no incrementan la versión de consentimiento: el modo apagado conserva la preferencia sin leerla; al reactivar, la lógica vigente puede recuperar una aceptación válida. Esta transición se sustenta en esos escenarios y las reglas existentes, no en una prueba contra redespliegues de Netlify reales.

## Validación del mantenimiento de dependencias

La primera ejecución del 2026-11-25 utilizó Node 26.10.0 y aprobó 314 comprobaciones de navegador. La validación final del 2026-11-26 se repitió con Node 22.23.2 y npm 10.9.8 para coincidir con el entorno del propietario y el valor actual de `.nvmrc`. Aprobaron la instalación limpia con `npm ci`, las 15 pruebas unitarias y los builds node-server y Netlify. La matriz usa un build de producción node-server con overrides de runtime por escenario. La revisión de seguridad y sus avisos restantes se registran en [MAINTENANCE](../project/MAINTENANCE.md#resultado-de-la-actualización).

| Escenario ejecutado | Comprobaciones aprobadas |
|---|---|
| Apagado, ubicación general | 56 |
| Apagado, dirección ficticia | 56 |
| Activo, ID y dirección ficticios | 87 |
| UI activa, sin ID, ubicación general | 14 |
| Regresiones de aplicación con Analytics apagado | 99 |
| CV desde el menú móvil, teclado y archivo PDF | 6 |

Son 318 comprobaciones de navegador acumuladas entre escenarios en la ejecución final. Las primeras cuatro ejecuciones usan el runner versionado. Las dos últimas utilizaron scripts temporales para comprobar carga directa y navegación desde servicios a `/?mode=client` en las cinco anchuras, menú, los cinco accesos al CV, foco, cierre, descarga efectiva y apertura en otra pestaña, imágenes renderizadas, apertura/cierre de galerías y respuestas de robots/sitemap. Las cuatro comprobaciones añadidas en la ejecución final verifican el icono de galería en inicio y servicios a 320 y 1440 px. Esos scripts adicionales no forman parte de `test:privacy:browser`; sus resultados no amplían automáticamente el alcance del runner versionado.

Los resultados de esta ejecución quedaron en artefactos temporales; no se regeneraron las capturas ni los JSON históricos de `docs/privacy/evidence/`. El tag se sustituyó por un fixture, con dirección e ID ficticios; Google real, Safari/iOS y el alojamiento real siguen fuera de esta validación. El preview de la rama de mantenimiento está pendiente.

Los builds registrados se ejecutaron con `DEBUG=''`. Un `DEBUG` heredado activaba la instrumentación de Nitro y generaba un import ausente de `timing.js` en la salida de Vue, causando un 500 aunque compilara. Se confirmó la causa con el hook de error del servidor y se recompiló sin ese flag. No se modificó la aplicación para ocultar el error. La prueba temporal de navegación espera la finalización de la transición del menú antes de exigir su ausencia en el DOM.

## Arranque habitual de desarrollo

El 2026-11-26 se verificó `npm run dev` con `NODE_ENV=local` heredado. La primera comprobación capturaba stdout y validaba el aviso, pero no la presentación de una terminal interactiva. Después se probó en una PTY con tamaño de terminal real y `NUXT_TUI=1` heredado: el script establece `NODE_ENV=development` y pasa `--no-tui`, mostrando logs tradicionales. La comprobación final utilizó Node 22.23.2. Inicio y servicios respondieron con HTTP 200, sin la advertencia de NODE_ENV, el panel TUI, el volcado `ObjectRefImpl` ni avisos de iconos ausentes. El cierre mediante SIGINT terminó con código 130 y no reprodujo «Something went wrong». Se utilizó una copia temporal del código y las dependencias instaladas, sin archivos locales de entorno, con Analytics apagado y un puerto separado. El proceso de prueba se cerró al terminar, sin intervenir el servidor del usuario.

Esta comprobación corresponde al servidor de desarrollo; no sustituye la matriz de privacidad contra un build de producción. La ejecución final del mantenimiento también comprobó los builds y regresiones descritos arriba.

## Capturas y límites

Los artefactos van por defecto a un directorio temporal; `--artifacts /ruta/temporal` permite elegirlo. La evidencia versionable se actualizó deliberadamente usando únicamente direcciones ficticias o ubicación general.

| Captura | Qué representa |
|---|---|
| [Banner escritorio](../privacy/evidence/banner-desktop.png) | Modo activo con dirección ficticia |
| [Banner móvil](../privacy/evidence/banner-mobile.png) | Explicación visible a 320 px antes de desplazar |
| [Preferencias](../privacy/evidence/preferences-mobile.png) | Diálogo del modo activo |
| [Aviso](../privacy/evidence/notice-mobile.png) | Fragmento del aviso con dirección de demostración, no el domicilio del propietario |
| [Cookies sin analítica](../privacy/evidence/disabled-cookies-mobile.png) | Modo apagado con ubicación general |

Las capturas muestran presentación, no ausencia de red. El fixture respeta ga-disable porque está programado así; sus comandos de publicidad y pings solo son guardas de regresión de nuestra lógica. Las cookies de dominio son sintéticas. No se validan los listeners reales de Google, plazos de cuenta, Safari/iOS, lectores de pantalla ni toda la aplicación. El CV tiene una regresión de previsualización, no una suite exhaustiva de todos sus accesos.

## Despliegue real

Seguir [despliegue](../deployment/README.md) y [ACCOUNT-CHECKLIST](../privacy/ACCOUNT-CHECKLIST.md#comprobación-real-tras-desplegar): primero modo apagado y limpieza; solo si se decide activar, redesplegar con true e ID válido y verificar proveedor, consentimiento, rutas y retirada. Un servidor de desarrollo no carga Analytics; un preview sin ID tampoco comprueba mediciones reales.

Mantener separados estos resultados técnicos de la [limitación jurídica del domicilio omitido](../privacy/REVIEW.md). El valor de una dirección de entorno que se publique sigue siendo público; no usar datos particulares en ninguna prueba ni informe.

# Arquitectura del portfolio

## Aplicación y rutas

La aplicación usa Nuxt, Vue con componentes SFC y TypeScript, y Tailwind CSS. Es un único proyecto sin API de negocio ni base de datos propias en este repositorio. Nuxt/Nitro proporciona renderizado y las rutas internas que necesiten sus módulos. Las dependencias se declaran en [`package.json`](../../package.json).

| Entrada | Responsabilidad |
|---|---|
| [`app/app.vue`](../../app/app.vue) | Monta `NuxtLayout` y `NuxtPage` |
| [`app/layouts/default.vue`](../../app/layouts/default.vue) | Cabecera, banner y preferencias de privacidad, contenido, footer, acciones flotantes y modal compartido del CV |
| [`app/pages/index.vue`](../../app/pages/index.vue) | Perfil técnico: presentación, sobre mí, experiencia, skills, proyectos, arquitectura y contacto |
| [`app/pages/services.vue`](../../app/pages/services.vue) | Presentación de servicios, proceso, proyectos de ejemplo y contacto |
| [`app/pages/privacidad.vue`](../../app/pages/privacidad.vue) y [`app/pages/cookies.vue`](../../app/pages/cookies.vue) | Información pública de privacidad y almacenamiento |
| [`app/assets/css/main.css`](../../app/assets/css/main.css) | Entrada de Tailwind y estilos globales |
| [`nuxt.config.ts`](../../nuxt.config.ts) | Módulos, SEO, dominio, Analytics y preset de Nitro |

`public/` contiene archivos servidos directamente. Las imágenes utilizadas por `NuxtImg` pueden pasar por el proveedor de imágenes configurado por Nuxt. El CSS antiguo de `public/assets/css/style.css` no es la entrada global declarada en Nuxt; no confundirlo con `app/assets/css/main.css`.

## Componentes y estado

- `app/components/layout/`: navegación y footer compartidos.
- `app/components/sections/`: contenido del perfil técnico. Los arrays de experiencia, skills y proyectos se mantienen en sus respectivos componentes; no existe un CMS.
- `app/components/services/`: contenido de la página de servicios.
- `app/components/ui/`: contenedores y controles reutilizables, incluidos los del CV.
- [`ContactPanel.vue`](../../app/components/ui/ContactPanel.vue): presentación compartida del contacto, basada en la tarjeta de servicios. Perfil y servicios conservan sus textos e IDs de sección; el perfil añade LinkedIn/GitHub y servicios sus detalles de atención. El panel monta correo, WhatsApp, agenda opcional y aviso breve una sola vez.
- [`useNavigationState.ts`](../../app/composables/useNavigationState.ts): modo de navegación, menú móvil y observación de secciones.

El enlace «Ver Perfil Técnico» de servicios navega a `/?mode=client`. Esa consulta conserva acciones de contacto orientadas a clientes en la cabecera. Las pruebas deben cubrir tanto esa entrada como `/` sin consulta.

Desde las páginas legales, los enlaces técnicos de la cabecera apuntan a las secciones de `/`. La observación de secciones se actualiza al cambiar de ruta y utiliza el `useRoute` de Nuxt.

La cabecera cambia al menú de escritorio a partir del breakpoint `lg` de Tailwind. «Sobre mí» declara una columna móvil y permite que sus hijos se encojan; preservar estas restricciones para evitar que contenido largo ensanche el documento.

## CV

[`useCv.ts`](../../app/composables/useCv.ts) centraliza la URL del PDF, su nombre de descarga y el estado compartido de previsualización. El documento está en [`public/files/cv_jesus_chicho_hernandez.pdf`](../../public/files/cv_jesus_chicho_hernandez.pdf).

[`CvActions.vue`](../../app/components/ui/CvActions.vue) ofrece previsualización, descarga y apertura en otra pestaña. Se utiliza en cinco lugares: navegación de escritorio, menú móvil, portada, «Sobre mí» y footer. Sus variantes adaptan la presentación a cada ubicación.

[`CvPreviewModal.vue`](../../app/components/ui/CvPreviewModal.vue) se monta una sola vez en el layout. Emplea un diálogo nativo y el visor PDF del navegador. El iframe se crea al abrir la previsualización y se elimina al cerrarla; el modal controla el bloqueo de scroll y la devolución del foco. La descarga y apertura independiente permanecen disponibles dentro del diálogo.

La visualización del PDF depende del soporte del navegador. Comprobar móvil, teclado y las acciones alternativas cuando se modifique este flujo.

## Integraciones

| Integración | Uso actual |
|---|---|
| `nuxt-gtag` | Inicialización manual, solo con interruptor activo, ID válido, build de producción y aceptación vigente; su privacidad se detalla en el [inventario](../privacy/README.md) |
| `@nuxt/icon` | Iconos mediante endpoint local; `fallbackToApi: 'server-only'` impide el fallback directo del navegador a Iconify. El servidor puede consultar el proveedor si falta un icono |
| `@nuxt/image` | Imágenes optimizadas mediante `NuxtImg` |
| `@nuxt/fonts` | Resolución y gestión de fuentes; comprobar las solicitudes reales antes de atribuir conexiones externas a visitantes |
| `@fancyapps/ui` | Galerías de imágenes, configuradas en [`fancybox.client.ts`](../../app/plugins/fancybox.client.ts) |
| Sitemap y robots | Generación y configuración mediante módulos de Nuxt |
| Correo y WhatsApp | Enlaces externos de contacto; no hay un formulario propio ni un chat de WhatsApp incrustado |
| Calendly | Enlace opcional compartido por perfil y servicios, visible tras confirmar México; sin iframe ni API de reservas. Configuración y límites en [agenda](../project/SCHEDULING.md) |

`/api/scheduling-country` es una comprobación técnica de visibilidad, no una API de negocio. Netlify la atiende mediante una Edge Function independiente, declarada en `netlify/edge-functions/scheduling-country.js`. El fallback de Nitro permite simular el país solo durante desarrollo y devuelve `false` en otros servidores de producción. La UI consulta el endpoint solo con URL configurada y no guarda país en almacenamiento del navegador. Los textos de agenda aparecen en las páginas legales cuando hay un enlace válido, independientemente del país del lector.

## Despliegue

El preset actual de Nitro es `netlify`. El flujo de Git y promoción está en [`AGENTS.md`](../../AGENTS.md); el uso operativo está en el [README](../../README.md) y la revisión previa en [despliegue](../deployment/README.md).

[`netlify.toml`](../../netlify.toml) redirige el dominio anterior de Netlify a `https://chichohdz.com`. La asociación del sitio con Bitbucket, la rama de producción, las variables y los Deploy Previews se administran en Netlify. Esos valores no están definidos en este archivo.

Una compilación local contiene binarios de imagen dependientes de la plataforma. El despliegue habitual utiliza el build de Netlify, no los artefactos de macOS generados para validar cambios localmente.

## Preferencias de privacidad

[`privacyConsent.ts`](../../app/utils/privacyConsent.ts) contiene la versión y vigencia de la política, valida datos no confiables y encapsula lectura/escritura con fallos de almacenamiento. [`usePrivacyConsent.ts`](../../app/composables/usePrivacyConsent.ts) comparte la elección y el estado de la interfaz. Con el interruptor activo, la preferencia se guarda en `localStorage` como `portfolio-privacy`, con versión, elección booleana y fecha, durante 180 días; no se añade un identificador de visitante.

[`privacy-consent.client.ts`](../../app/plugins/privacy-consent.client.ts) recupera la elección tras la hidratación y controla `nuxt-gtag`. Con el interruptor apagado solo deshabilita Analytics y limpia cookies heredadas, sin consultar preferencias. En modo activo no carga la etiqueta antes de aceptar. Al retirar el consentimiento, la deshabilita, elimina las cookies de Analytics accesibles y recarga para descartar la biblioteca y sus listeners cuando el rechazo puede persistirse. Si falla el almacenamiento, conserva la elección en memoria y deshabilita la biblioteca en el documento sin recarga. Atiende cambios de otra pestaña y programa el vencimiento mediante temporizadores encadenados para respetar el límite de tiempo del navegador. También comprueba caducidad al navegar o recuperar visibilidad.

`app/components/privacy/` contiene el banner, el diálogo de preferencias y la presentación de las páginas legales. El layout monta los controles solo con el interruptor activo; el footer y la página de cookies permiten reabrirlos en ese modo. En el modo apagado no hay UI de consentimiento. [`privacyContent.ts`](../../app/utils/privacyContent.ts) contiene el contacto público base, la ubicación general, los resolutores puros y la fecha. [`usePrivacySettings.ts`](../../app/composables/usePrivacySettings.ts) resuelve el interruptor y la dirección pública desde runtime config. No hay un domicilio real en el código. `ContactPrivacyNotice.vue` informa junto a los contactos de perfil y servicios en ambos modos. Presenta el resumen separado de ubicación y derechos, en dos columnas desde `sm` y apilado en móvil; el correo ocupa una línea propia.

Las pruebas unitarias están en [`tests/privacy-consent.test.mjs`](../../tests/privacy-consent.test.mjs) y la integración simulada con Chrome en [`scripts/verify-privacy.mjs`](../../scripts/verify-privacy.mjs). Su preparación y evidencia están en la [documentación de pruebas](../testing/README.md). No prueban por sí solas la etiqueta real ni el estado de los proveedores. Las confirmaciones de cuenta están en su [registro](../privacy/ACCOUNT-CHECKLIST.md).

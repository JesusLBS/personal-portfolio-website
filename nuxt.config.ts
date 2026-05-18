// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: [
    '~/assets/css/main.css',
    '@fancyapps/ui/dist/fancybox/fancybox.css'
  ],
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxt/image'],
  nitro: {
    preset: 'netlify',
  },
  app: {
    head: {
      title: 'Jesus Chicho Hernández | Software Engineer',

      htmlAttrs: {
        lang: 'es',
      },

      meta: [
        // Base SEO
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content:
            'Portafolio de Jesus Chicho Hernández, Software Engineer Full Stack especializado en arquitectura de sistemas y desarrollo web.',
        },
        {
          name: 'robots',
          content: 'index, follow',
        },

        // Open Graph
        {
          property: 'og:title',
          content: 'Jesus Chicho Hernández | Portfolio',
        },
        {
          property: 'og:description',
          content: 'Software Engineer Full Stack especializado en desarrollo web',
        },
        {
          property: 'og:image',
          content: 'https://jesus-chicho-hernandez.netlify.app/image-web.png',
        },
        {
          property: 'og:type',
          content: 'website',
        },

        // Twitter
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Jesus Chicho Hernández | Portfolio',
        },
        {
          name: 'twitter:description',
          content: 'Software Engineer Full Stack especializado en desarrollo web',
        },
        {
          name: 'twitter:image',
          content: 'https://jesus-chicho-hernandez.netlify.app/image-web.png',
        },
      ],

      link: [
        {
          rel: 'canonical',
          href: 'https://jesus-chicho-hernandez.netlify.app',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'
        }
      ],
    },
  },
})
// https://nuxt.com/docs/api/configuration/nuxt-config
import { PRIVACY_MAX_AGE_SECONDS } from './app/utils/privacyConsent';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: [
    '~/assets/css/main.css'
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      analyticsEnabled: false,
      privacyAddress: '',
    },
  },
  icon: {
    // Resolve missing icons on the server, without sending visitors to Iconify.
    fallbackToApi: 'server-only',
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxt/image', '@nuxt/fonts', '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-gtag'],
  site: {
    url: 'https://chichohdz.com',
    name: 'Jesus Chicho Hernández | Software Engineer',
  },
  robots: {
    allow: '/',
  },
  gtag: {
    enabled: import.meta.env.PROD, // true in production, false in dev
    initMode: 'manual',
    loadingStrategy: 'async',
    initCommands: [
      ['consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      }],
    ],
    config: {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: PRIVACY_MAX_AGE_SECONDS,
      cookie_update: false,
    },
  },
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
          property: 'og:url',
          content: 'https://chichohdz.com'
        },
        {
          property: 'og:image',
          content: 'https://chichohdz.com/image-web.png',
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
          content: 'https://chichohdz.com/image-web.png',
        },
      ],

      link: [
        {
          rel: 'canonical',
          href: 'https://chichohdz.com',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
        }
      ],
    },
  },
})

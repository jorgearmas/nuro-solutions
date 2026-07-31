export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'app/',
  components: [
    { path: '~/components/ui', prefix: 'App' },
    { path: '~/components/sections', prefix: '' },
  ],
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      // EmailJS credentials (public by design — safe on the client).
      // Values come from .env: NUXT_PUBLIC_EMAILJS_*
      emailjsPublicKey: '',
      emailjsServiceId: '',
      emailjsTemplateId: '',
    },
  },
  devServer: {
    port: 3001   // o el que quieras, 3001, 3002, etc.
  },
  app: {
    head: {
      title: 'Nuro Solutions | Growthcraft Partner',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuro Solutions — Data-driven marketing systems engineered to increase conversions, lower acquisition costs, and scale ROI intentionally.' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap'
        }
      ],
      script: [
        // Google tag (gtag.js)
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-BV819L4NZ8', async: true },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BV819L4NZ8');`
        }
      ]
    }
  }
})
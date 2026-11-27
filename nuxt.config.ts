export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'app/',
  components: [
    { path: '~/components/ui', prefix: 'App' },
    { path: '~/components/sections', prefix: '' },
  ],
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    // ── Server-only (never sent to the browser) ──
    // Nuro Platform base URL, no trailing slash. NUXT_PLATFORM_API_URL
    platformApiUrl: 'http://localhost:8080',
    // Shared secret for the Careers API (same value as WEBSITE_API_KEY in
    // Nuro Platform). NUXT_PLATFORM_API_KEY
    platformApiKey: '',
    public: {
      // EmailJS credentials (public by design — safe on the client).
      // Values come from .env: NUXT_PUBLIC_EMAILJS_*
      emailjsPublicKey: '',
      emailjsServiceId: '',
      emailjsTemplateId: '',
      // Cloudflare Turnstile site key (public by design).
      // NUXT_PUBLIC_TURNSTILE_SITE_KEY
      turnstileSiteKey: '',
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
        { name: 'description', content: 'Nuro Solutions. Data-driven marketing systems engineered to increase conversions, lower acquisition costs, and scale ROI intentionally.' },
      ],
      link: [
        // SVG first: it switches to a white face when the browser uses a dark
        // theme. The .ico is the fallback for browsers without SVG favicons
        // (e.g. Safari). The PNG links are omitted on purpose: Chrome prefers
        // a size-matching PNG over the SVG and would never show the white one.
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
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
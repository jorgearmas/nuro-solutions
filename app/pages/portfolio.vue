<template>
  <div class="port-page">
    <AppNavbar />

    <!-- ── 1. Hero ────────────────────────────────────────── -->
    <section class="snap-sec page-hero">
      <video class="hero-bg-video" autoplay muted loop playsinline preload="auto" aria-hidden="true">
        <source src="https://res.cloudinary.com/dpi6oudmk/video/upload/v1784681665/Background_Portafolio_fpgsbi.mp4" type="video/mp4" />
      </video>
      <div class="hero-bg-overlay" aria-hidden="true"></div>
      <div class="orb" aria-hidden="true"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 w-full">
        <div class="section-tag"><span class="glow-dot"></span>Portfolio</div>
        <h1 class="text-5xl lg:text-7xl font-display mb-6 max-w-3xl">
          Brands we've helped <em class="accent-em">grow.</em>
        </h1>
        <p class="text-muted text-lg max-w-xl leading-relaxed">
          A selection of the businesses we've partnered with to build smarter
          marketing systems and drive measurable results.
        </p>
      </div>
    </section>

    <!-- ── 2. Portfolio Grid + CTA + Footer ─────────────── -->
    <section class="snap-sec cards-section">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 w-full space-y-12">
        <div class="portfolio-grid">
          <div
            v-for="client in clients"
            :key="client.name"
            class="portfolio-card"
          >
            <div class="portfolio-card__top">
              <div class="portfolio-card__logo">
                <img :src="client.logo" :alt="client.name" class="client-logo-img" />
              </div>
              <div class="portfolio-card__meta">
                <div class="portfolio-card__industry">{{ client.industry }}</div>
                <img
                  :src="`https://flagcdn.com/24x18/${client.countryCode}.png`"
                  :alt="client.country"
                  :title="client.country"
                  class="client-flag"
                />
              </div>
            </div>
            <h3 class="font-display text-2xl mb-3 text-center">{{ client.name }}</h3>
            <p class="text-muted leading-relaxed mb-8 text-center">{{ client.description }}</p>
            <div class="portfolio-card__tags">
              <span v-for="tag in client.tags" :key="tag" class="ptag">{{ tag }}</span>
            </div>
            <a v-if="client.url" :href="client.url" target="_blank" class="portfolio-card__link">
              Visit →
            </a>
          </div>
        </div>

      </div>
    </section>

    <!-- ── 3. Core Products + CTA + Footer ───────────────── -->
    <section class="snap-sec products-section">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 w-full space-y-12 py-16">

        <div>
          <div class="section-tag mb-3"><span class="glow-dot"></span>Core Products</div>
          <h2 class="font-display text-4xl lg:text-5xl mb-10">Built by Nuro.</h2>
          <div class="products-grid">
            <a
              v-for="product in coreProducts"
              :key="product.name"
              :href="product.url"
              target="_blank"
              class="product-card"
            >
              <div class="product-card__header">
                <div class="product-card__icon" v-html="product.icon"></div>
                <svg class="product-card__arrow w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h3 class="font-display text-2xl mb-3">{{ product.name }}</h3>
              <p class="text-muted text-sm leading-relaxed mb-6">{{ product.description }}</p>
              <div class="product-card__features">
                <span v-for="f in product.features" :key="f" class="product-feature">
                  <span class="glow-dot"></span>{{ f }}
                </span>
              </div>
            </a>
          </div>
        </div>

        <div class="cta-row">
          <div>
            <h2 class="font-display text-3xl lg:text-4xl mb-3">Want to be our next success story?</h2>
            <p class="text-muted">Let's talk about what we can build together.</p>
          </div>
          <NuxtLink to="/contact" class="btn-primary shrink-0">Get Started →</NuxtLink>
        </div>
      </div>
      <AppFooter />
    </section>

  </div>
</template>

<script setup>
const clients = [
  {
    logo: '/mi-consulting_portafolio.png',
    name: 'MI Consulting',
    industry: 'SQF Consulting',
    countryCode: 'us',
    country: 'USA',
    description: 'Landing page, marketing analytics, and lead generation for a consultancy specializing in Safe Quality Food certification.',
    tags: ['Landing Page', 'Marketing Analytics', 'Lead Generation'],
    url: null,
  },
  {
    logo: '/Reborn_portafolio.png',
    name: 'Reborn Detailing Studio',
    industry: 'Automotive',
    countryCode: 'gt',
    country: 'Guatemala',
    description: 'Full digital strategy: landing page, marketing analytics, lead generation, social media strategy, and content creation.',
    tags: ['Landing Page', 'Social Media', 'Content Creation', 'Lead Generation'],
    url: null,
  },
  {
    logo: '/MEM_portafolio.png',
    name: 'Ministerio de Energía y Minas',
    industry: 'Government',
    countryCode: 'gt',
    country: 'Guatemala',
    description: 'Data management systems development for Guatemala\'s energy and mining sector.',
    tags: ['Systems Dev', 'Data Management'],
    url: null,
  },
  {
    logo: '/UVG_portafolio.png',
    name: 'Universidad del Valle de Guatemala',
    industry: 'Education',
    countryCode: 'gt',
    country: 'Guatemala',
    description: 'Data management systems built for health research at one of Guatemala\'s leading universities.',
    tags: ['Systems Dev', 'Data Management', 'Health Research'],
    url: null,
  },
  {
    logo: '/Medident_portafolio.png',
    name: 'MediDent',
    industry: 'Healthcare',
    countryCode: 'gt',
    country: 'Guatemala',
    description: 'Social media strategy, content generation, and lead generation for a dental healthcare provider.',
    tags: ['Social Media Strategy', 'Content Generation', 'Lead Generation'],
    url: null,
  },
]

const coreProducts = [
  {
    name: 'Nuro Publisher',
    url: 'https://nuropublisher.com/',
    description: 'Automated social media campaign publisher — schedule, publish, and manage content across platforms without the manual work.',
    icon: `<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>`,
    features: ['Multi-Platform Publishing', 'Campaign Automation', 'Content Scheduling', 'Social Media Management'],
  },
]
</script>

<style scoped>
/* ── Scroll container con snap ───────────────── */
.port-page {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y proximity;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.port-page::-webkit-scrollbar { display: none; }

/* ── Snap ────────────────────────────────────── */
.snap-sec {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* ── Hero ────────────────────────────────────── */
.page-hero {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-dark);
}
.hero-bg-video {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  z-index: 0;
}
.hero-bg-overlay {
  position: absolute; inset: 0;
  z-index: 1;
  background: rgba(10, 10, 15, 0.82);
}
.orb {
  position: absolute;
  top: -100px; right: 0;
  width: 500px; height: 500px;
  border-radius: 50%;
  filter: blur(120px);
  background: radial-gradient(circle, rgba(112,64,172,0.12) 0%, transparent 70%);
  pointer-events: none;
  z-index: 2;
}
.page-hero h1 { color: #ffffff; }
.page-hero p { color: rgba(255, 255, 255, 0.72); }
.accent-em {
  font-style: italic;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Portfolio grid section ──────────────────── */
.cards-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: 6rem 0;
}
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(360px, 100%), 1fr));
  gap: 2rem;
}
.portfolio-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2.75rem;
  transition: border-color 0.3s, transform 0.3s;
}
@media (max-width: 640px) {
  .portfolio-card { padding: 1.5rem; }
}
.portfolio-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}
.portfolio-card__top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}
.portfolio-card__logo {
  width: 200px; height: 200px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid var(--color-border);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  padding: 20px;
}
.client-logo-img {
  width: 100%; height: 100%;
  object-fit: contain;
}
.portfolio-card__meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.portfolio-card__industry {
  font-size: 0.7rem;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}
.client-flag {
  width: 24px;
  height: 18px;
  border-radius: 2px;
  object-fit: cover;
  display: block;
}
.portfolio-card__tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; margin-bottom: 1.25rem; }
.ptag {
  font-size: 0.7rem;
  font-family: var(--font-display);
  letter-spacing: 0.05em;
  color: var(--color-accent);
  background: var(--color-accent-glow);
  border: 1px solid rgba(112,64,172,0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}
.portfolio-card__link {
  font-family: var(--font-display);
  font-size: 0.825rem;
  color: var(--color-accent);
  transition: opacity 0.2s;
}
.portfolio-card__link:hover { opacity: 0.7; }

/* ── Core Products section ───────────────────── */
.products-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 480px));
  gap: 2rem;
}
.product-card {
  display: block;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2.5rem;
  text-decoration: none;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}
.product-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(112,64,172,0.06) 0%, rgba(242,119,0,0.06) 100%);
  opacity: 0;
  transition: opacity 0.3s;
}
.product-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(112,64,172,0.12);
}
.product-card:hover::before { opacity: 1; }
.product-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.product-card__icon {
  width: 52px; height: 52px;
  border-radius: 12px;
  background: var(--color-accent-glow);
  border: 1px solid rgba(112,64,172,0.25);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-accent);
}
.product-card__arrow {
  color: var(--color-muted);
  transition: color 0.2s, transform 0.2s;
}
.product-card:hover .product-card__arrow {
  color: var(--color-accent);
  transform: translate(2px, -2px);
}
.product-card__features {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.product-feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.825rem;
  color: var(--color-muted);
}

/* ── CTA row ─────────────────────────────────── */
.cta-row {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 3rem;
}
@media (min-width: 1024px) {
  .cta-row { flex-direction: row; align-items: center; justify-content: space-between; }
}
</style>

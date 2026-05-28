<template>
  <div class="sol-page">
    <AppNavbar />

    <!-- ── 1. Hero ────────────────────────────────────────── -->
    <section class="snap-sec page-hero">
      <div class="orb" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 w-full">
        <div class="section-tag"><span class="glow-dot"></span>Solutions</div>
        <h1 class="text-5xl lg:text-7xl font-display mb-6 max-w-3xl">
          Everything you need to <em class="accent-em">scale with intent.</em>
        </h1>
        <p class="text-muted text-lg max-w-xl leading-relaxed">
          Four integrated service lines that work together to build a complete,
          high-performance marketing engine for your business.
        </p>
      </div>
    </section>

    <!-- ── 2. Service Lines ───────────────────────────────── -->
    <section class="snap-sec services-section">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div class="space-y-6">
          <div
            v-for="(service, i) in services"
            :key="service.title"
            class="service-row"
            :class="{ 'service-row--open': openIndex === i }"
            @click="openIndex = openIndex === i ? null : i"
          >
            <div class="service-row__header">
              <div class="service-row__num">0{{ i + 1 }}</div>
              <div class="service-row__title-group">
                <h2 class="font-display text-2xl lg:text-3xl">{{ service.title }}</h2>
                <div class="service-row__tags">
                  <span v-for="tag in service.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </div>
              <div class="service-row__toggle">
                <svg
                  class="w-5 h-5 transition-transform duration-300"
                  :class="openIndex === i ? 'rotate-45' : ''"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>

            <div class="service-row__body">
              <div class="service-body-inner">
                <p class="text-muted leading-relaxed mb-8 max-w-2xl">{{ service.description }}</p>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-for="item in service.items" :key="item" class="service-item">
                    <span class="glow-dot"></span>
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 3. CTA + Footer ────────────────────────────────── -->
    <section class="snap-sec cta-section">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 w-full py-16">
        <div class="cta-band">
          <p class="section-tag justify-center mb-4"><span class="glow-dot"></span>Let's Build Together</p>
          <h2 class="font-display text-4xl lg:text-5xl mb-4 text-center">Not sure where to start?</h2>
          <p class="text-muted text-center mb-8 max-w-md mx-auto">Tell us about your business and goals. We'll map out exactly which solutions fit your stage.</p>
          <div class="flex justify-center">
            <NuxtLink to="/contact" class="btn-primary">Book a Free Consultation</NuxtLink>
          </div>
        </div>
      </div>
      <AppFooter />
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const openIndex = ref(null)

onMounted(() => {
  document.documentElement.style.scrollSnapType = 'y proximity'
})
onUnmounted(() => {
  document.documentElement.style.scrollSnapType = ''
})

const services = [
  {
    title: 'Marketing & Growth',
    tags: ['Paid Media', 'SEO', 'Email', 'Strategy'],
    description: 'Full-funnel marketing strategies engineered to drive measurable growth. From paid acquisition to organic authority, we build systems that compound over time.',
    items: [
      'Paid Social & Search Campaigns',
      'SEO & Content Strategy',
      'Email & SMS Marketing',
      'Funnel Architecture',
      'Marketing Automation',
      'Performance Analytics',
    ],
  },
  {
    title: 'Social Media',
    tags: ['Content', 'Community', 'Ads', 'Influence'],
    description: 'Social media management and strategy that builds real communities and drives meaningful engagement — not just vanity metrics.',
    items: [
      'Content Calendar & Production',
      'Community Management',
      'Social Advertising',
      'Influencer Partnerships',
      'Brand Voice Development',
      'Platform Strategy',
    ],
  },
  {
    title: 'Web Development',
    tags: ['Design', 'Dev', 'CRO', 'UX'],
    description: 'High-performance websites and landing pages designed to convert. Built fast, built right, built to grow with your business.',
    items: [
      'Landing Page Design',
      'Website Development',
      'Conversion Rate Optimization',
      'UX/UI Design',
      'E-commerce Development',
      'Technical SEO',
    ],
  },
  {
    title: 'Systems Development',
    tags: ['Automation', 'CRM', 'Integrations', 'Data'],
    description: 'Custom systems and integrations that connect your marketing stack, automate repetitive work, and surface insights that drive decisions.',
    items: [
      'CRM Setup & Optimization',
      'Marketing Stack Integration',
      'Custom Automations',
      'Reporting Dashboards',
      'Data Pipeline Architecture',
      'API Integrations',
    ],
  },
]
</script>

<style scoped>
/* ── Snap ────────────────────────────────────── */
.snap-sec {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  will-change: transform;
  transform: translateZ(0);
}

/* ── Hero ────────────────────────────────────── */
.page-hero {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
}
.orb {
  position: absolute;
  top: -100px; right: 0;
  width: 500px; height: 500px;
  border-radius: 50%;
  filter: blur(120px);
  background: radial-gradient(circle, rgba(112,64,172,0.12) 0%, transparent 70%);
  pointer-events: none;
}
.accent-em {
  font-style: italic;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Services section ────────────────────────── */
.services-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  margin-top: -2px;
  padding: 5rem 0;
}

/* ── CTA section ─────────────────────────────── */
.cta-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  margin-top: -2px;
}

/* ── Service rows ────────────────────────────── */
.service-row {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s;
}
.service-row:hover {
  border-color: var(--color-accent);
}
.service-row--open {
  border-color: var(--color-accent);
  background: linear-gradient(135deg, rgba(112, 64, 172, 0.30) 0%, rgba(242, 119, 0, 0.30) 100%);
}
.service-row__header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
}
.service-row__num {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  min-width: 2rem;
}
.service-row__title-group {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}
.service-row__tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tag {
  font-size: 0.7rem;
  font-family: var(--font-display);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  background: var(--color-surface-2, #141a22);
  border: 1px solid var(--color-border);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}
.service-row__toggle {
  color: var(--color-muted);
  transition: color 0.2s;
}
.service-row--open .service-row__toggle { color: var(--color-accent); }

.service-row__body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s ease;
}
.service-row--open .service-row__body {
  grid-template-rows: 1fr;
}
.service-body-inner {
  overflow: hidden;
  padding: 0 2rem 0;
  transition: padding 0.35s ease;
}
.service-row--open .service-body-inner {
  padding: 0 2rem 2rem;
}
.service-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--color-muted);
  padding: 0.75rem 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

/* ── CTA band ────────────────────────────────── */
.cta-band {
  padding: 5rem 3rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}
.cta-band::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(112,64,172,0.07) 0%, transparent 70%);
}
.cta-band > * { position: relative; }
</style>

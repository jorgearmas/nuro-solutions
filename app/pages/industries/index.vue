<template>
  <div class="ind-index">
    <AppNavbar />

    <!-- ── 1. Hero ──────────────────────────────────────────── -->
    <section class="snap-sec hero-section">
      <div class="orb orb-1" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-16 w-full">
        <div class="section-tag"><span class="glow-dot"></span>Industries</div>
        <h1 class="text-5xl lg:text-7xl font-display mb-6 max-w-3xl">
          Built for the sectors<br />that <em class="accent-em">move the world.</em>
        </h1>
        <p class="text-muted text-lg max-w-xl leading-relaxed">
          We understand that different industries have unique challenges.
          Our strategies are tailored to the specific dynamics of each sector we serve.
        </p>
      </div>
    </section>

    <!-- ── 2. Cards + Footer ────────────────────────────────── -->
    <section class="snap-sec cards-section">
      <div class="cards-inner max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div class="grid lg:grid-cols-2 gap-8">
          <NuxtLink
            v-for="ind in industries"
            :key="ind.to"
            :to="ind.to"
            class="industry-card group"
          >
            <div class="industry-card__icon" v-html="ind.icon"></div>
            <div>
              <h2 class="font-display text-2xl mb-3 group-hover:text-accent transition-colors">{{ ind.label }}</h2>
              <p class="text-muted text-sm leading-relaxed mb-6">{{ ind.description }}</p>
              <span class="text-accent text-sm font-display font-600 flex items-center gap-2">
                Learn more
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
      <AppFooter />
    </section>

  </div>
</template>

<script setup>
const industries = [
  {
    label: 'Healthcare',
    to: '/industries/healthcare',
    description: 'Marketing systems designed for hospitals, clinics, and medical practices — compliant, empathetic, and patient-centric.',
    icon: `<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`,
  },
  {
    label: 'Wellness',
    to: '/industries/wellness',
    description: 'Growth strategies for gyms, spas, nutrition brands, and mental health platforms focused on lifestyle transformation.',
    icon: `<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`,
  },
  {
    label: 'Real Estate',
    to: '/industries/real-estate',
    description: 'Lead generation and brand positioning for agents, developers, and property management companies.',
    icon: `<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`,
  },
  {
    label: 'Hospitality',
    to: '/industries/hospitality',
    description: 'Digital marketing for hotels, restaurants, and travel brands that turn guests into loyal advocates.',
    icon: `<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`,
  },
  {
    label: 'Retail',
    to: '/industries/retail',
    description: 'End-to-end digital marketing for retail brands — from acquisition to retention — built to drive sustainable revenue growth.',
    icon: `<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>`,
  },
  {
    label: 'E-Commerce',
    to: '/industries/e-commerce',
    description: 'Performance marketing, CRO, and retention systems built to scale online stores profitably.',
    icon: `<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
  },
  {
    label: 'Education',
    to: '/industries/education',
    description: 'Enrollment marketing and brand building for institutions, EdTech platforms, and online course creators.',
    icon: `<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>`,
  },
]
</script>

<style scoped>
/* ── Contenedor: scroll container con snap propio (no toca html) ── */
.ind-index {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y proximity;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.ind-index::-webkit-scrollbar { display: none; }

/* ── Snap ───────────────────────────────────────────────── */
.snap-sec {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* ── Hero ───────────────────────────────────────────────── */
.hero-section {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
}
.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(112,64,172,0.12) 0%, transparent 70%);
  top: -100px; right: 0;
}
.accent-em {
  font-style: italic;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Cards section ──────────────────────────────────────── */
.cards-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
}
.cards-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* ── Industry card ──────────────────────────────────────── */
.industry-card {
  display: flex;
  gap: 1.75rem;
  padding: 2.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  color: var(--color-text);
}
.industry-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(112,64,172,0.15);
}
.industry-card__icon {
  color: var(--color-accent);
  flex-shrink: 0;
  padding: 1rem;
  background: var(--color-accent-glow);
  border-radius: 10px;
  height: fit-content;
}
</style>

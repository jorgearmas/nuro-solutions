<template>
  <div class="min-h-screen">
    <AppNavbar />

    <!-- ── Hero ─────────────────────────────────────────── -->
    <section class="hero relative min-h-screen flex items-center overflow-hidden">

      <!-- Orbs -->
      <div class="orb orb-1" aria-hidden="true"></div>
      <div class="orb orb-2" aria-hidden="true"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24 w-full">
        <div class="max-w-4xl">

          <!-- Tag -->
          <div class="section-tag">
            <span class="glow-dot"></span>
            Growthcraft Partner
          </div>

          <!-- Headline -->
          <h1 class="hero-headline">
            <span class="block text-text">Your</span>
            <span class="block accent-word">Growthcraft</span>
            <span class="block text-text">Partner</span>
          </h1>

          <!-- Subheadline -->
          <p class="hero-sub">
            Nuro delivers data-driven marketing systems engineered to increase conversions,
            lower acquisition costs, and scale ROI — intentionally.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-4 mt-10">
            <NuxtLink to="/contact" class="btn-primary">
              Get Started
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/portfolio" class="btn-ghost">See Our Work</NuxtLink>
          </div>

          <!-- Stats -->
          <div class="stats-row">
            <div v-for="stat in heroStats" :key="stat.label" class="stat-item">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA Band ───────────────────────────────────────── -->
    <section class="cta-band">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <p class="section-tag justify-center"><span class="glow-dot"></span>Ready to Scale</p>
        <h2 class="text-4xl lg:text-6xl font-display mb-6">
          Making People's Dreams<br />Come True™
        </h2>
        <p class="text-muted mb-10 max-w-md mx-auto">
          Some dreams deserve more than talk — they need someone to believe in the details.
        </p>
        <NuxtLink to="/contact" class="btn-primary">
          Start the Conversation
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const heroStats = [
  { value: '3+', label: 'Years in Market' },
  { value: '20+', label: 'Brands Grown' },
  { value: '200%', label: 'Avg. ROI Increase' },
]

onMounted(async () => {
  const { gsap } = await import('gsap')

  gsap.from('.hero-headline span', {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.2,
  })
  gsap.from('.hero-sub', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.7 })
  gsap.from('.btn-primary, .btn-ghost', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.9 })
  gsap.from('.stat-item', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 1.1 })
})
</script>

<style scoped>
.hero {
  background: linear-gradient(
    to bottom,
    #F9F0E5 0%,
    rgba(112, 64, 172, 0.15) 60%,
    rgba(112, 64, 172, 0.3) 100%
  );
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}
.orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(112,64,172,0.12) 0%, transparent 70%);
  top: -150px; left: -100px;
}
.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(242,119,0,0.08) 0%, transparent 70%);
  bottom: 100px; right: 0;
}

.hero-headline {
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 1;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
}
.accent-word {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  font-size: 1.1rem;
  color: var(--color-muted);
  line-height: 1.7;
  max-width: 520px;
}

.stats-row {
  display: flex;
  gap: 2.5rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}
.stat-item { display: flex; flex-direction: column; gap: 2px; }
.stat-value {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text);
}
.stat-label {
  font-size: 0.75rem;
  color: var(--color-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* CTA Band */
.cta-band {
  padding: 8rem 0;
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

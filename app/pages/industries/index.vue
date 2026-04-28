<template>
  <div class="min-h-screen">
    <AppNavbar />

    <section class="page-hero">
      <div class="orb orb-1" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24">
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

    <section class="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
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
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
const industries = [
  {
    label: 'Healthcare',
    to: '/industries/healthcare',
    description: 'Marketing systems designed for healthcare providers, clinics, and wellness brands — compliant, empathetic, and conversion-focused.',
    icon: `<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`,
  },
  {
    label: 'Power Generation',
    to: '/industries/power_generation',
    description: 'Strategic communications and digital presence for energy companies navigating a rapidly evolving market landscape.',
    icon: `<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
  },
  {
    label: 'Mining',
    to: '/industries/mining',
    description: 'Brand positioning and stakeholder communication strategies for mining and extraction businesses operating at scale.',
    icon: `<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>`,
  },
  {
    label: 'Retail',
    to: '/industries/retail',
    description: 'End-to-end digital marketing for retail brands — from acquisition to retention — built to drive sustainable revenue growth.',
    icon: `<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>`,
  },
]
</script>

<style scoped>
.page-hero {
  position: relative;
  overflow: hidden;
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
  background: radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%);
  top: -100px; right: 0;
}
.accent-em {
  font-style: italic;
  background: linear-gradient(135deg, var(--color-accent) 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
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
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
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

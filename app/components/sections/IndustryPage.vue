<template>
  <div
    class="ind-page"
    :style="industry.theme ? `--ind-color: ${industry.theme.color}; --ind-rgb: ${industry.theme.colorRgb}` : ''"
  >
    <AppNavbar />

    <!-- ── 1. Hero (video) ───────────────────────────────── -->
    <section class="page-hero">

      <video
        v-if="industry.video"
        class="hero-video"
        autoplay muted loop playsinline preload="auto" aria-hidden="true"
      >
        <source :src="industry.video" type="video/mp4" />
      </video>
      <div class="hero-overlay" aria-hidden="true"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-16 w-full">
        <div class="section-tag section-tag--light">
          <span class="glow-dot"></span>
          <NuxtLink to="/industries" class="hover:opacity-80 transition-opacity">Industries</NuxtLink>
          <span class="mx-1 opacity-40">/</span>
          {{ industry.label }}
        </div>
        <h1 class="text-5xl lg:text-7xl font-display mb-6 max-w-3xl text-white">
          {{ industry.headline }}
        </h1>
        <p class="text-white/70 text-lg max-w-xl leading-relaxed">{{ industry.description }}</p>
        <div class="flex gap-4 mt-10">
          <NuxtLink to="/contact" class="btn-primary">Get Started</NuxtLink>
          <NuxtLink to="/solutions" class="btn-ghost btn-ghost--light">Our Solutions</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── 2. Cards ──────────────────────────────────────── -->
    <section class="cards-section">
      <!-- Pages can override the cards layout via the #cards slot.
           Falls back to the generic placeholder grid below. -->
      <slot name="cards">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div class="placeholder-grid">
          <div
            v-for="card in (industry.theme?.cards ?? [{},{},{}])"
            :key="card.title"
            class="placeholder-card"
            :class="{ 'placeholder-card--themed': !!industry.theme }"
          >
            <div class="placeholder-icon">
              <div class="theme-icon-wrap" v-if="industry.theme" v-html="card.icon"></div>
              <div v-else class="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <span class="text-accent font-display font-700">01</span>
              </div>
            </div>
            <div class="placeholder-lines">
              <p v-if="card.title" class="card-title">{{ card.title }}</p>
              <div v-else class="ph-line ph-line--title"></div>
              <p v-if="card.subtitle" class="card-subtitle">{{ card.subtitle }}</p>
              <p v-if="card.body" class="card-body">{{ card.body }}</p>
              <template v-else>
                <div class="ph-line"></div>
                <div class="ph-line ph-line--short"></div>
              </template>
            </div>
            <div v-if="!card.body" class="coming-soon-tag">Content coming soon</div>
          </div>
        </div>
      </div>
      </slot>
    </section>

    <!-- ── 3. CTA + Footer ───────────────────────────────── -->
    <section class="cta-section">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div class="cta-card">
          <div>
            <p class="section-tag mb-4"><span class="glow-dot"></span>Let's Talk</p>
            <h2 class="font-display text-3xl lg:text-4xl mb-3">
              Ready to grow in {{ industry.label }}?
            </h2>
            <p class="text-muted">Tell us about your business and we'll show you what's possible.</p>
          </div>
          <NuxtLink to="/contact" class="btn-primary shrink-0">
            Start the Conversation →
          </NuxtLink>
        </div>
      </div>
      <AppFooter />
    </section>

  </div>
</template>

<script setup>
defineProps({ industry: Object })
</script>

<style scoped>
/* ── Hero ───────────────────────────────────── */
.page-hero {
  position: relative;
  overflow: hidden;
  background: var(--color-dark);
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(10, 10, 15, 0.82);
}

/* ── Section tag sobre oscuro ───────────────── */
.section-tag--light {
  color: rgba(255, 255, 255, 0.6);
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
}
.section-tag--light a { color: rgba(255, 255, 255, 0.6); }

/* ── Btn ghost sobre oscuro ─────────────────── */
.btn-ghost--light {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
  color: #ffffff !important;
}
.btn-ghost--light:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
}

/* ── Cards section ──────────────────────────── */
.cards-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* White, matching the Ideas section on the index page. */
  background-color: #ffffff;
  padding: 6rem 0;
}

/* ── CTA section ────────────────────────────── */
.cta-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  /* Re-map the accent palette to this industry's color. Global classes
     (.btn-primary, .glow-dot, .section-tag) read these vars, so they pick
     up the industry color automatically. Falls back to Nuro purple. */
  --color-accent: var(--ind-color, #7040ac);
  --color-accent-hover: color-mix(in srgb, var(--ind-color, #7040ac) 82%, #000);
  --color-accent-glow: rgba(var(--ind-rgb, 112, 64, 172), 0.28);
}
.cta-section > .max-w-7xl {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

/* ── Placeholder grid ───────────────────────── */
.placeholder-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
.placeholder-card {
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  position: relative;
}
.placeholder-card--themed {
  border-style: solid;
  border-color: rgba(var(--ind-rgb), 0.18);
  transition: border-color 0.3s, box-shadow 0.3s;
}
.placeholder-card--themed:hover {
  border-color: rgba(var(--ind-rgb), 0.45);
  box-shadow: 0 8px 32px rgba(var(--ind-rgb), 0.1);
}

/* ── Ícono temático ─────────────────────────── */
.theme-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: rgba(var(--ind-rgb), 0.1);
  border: 1px solid rgba(var(--ind-rgb), 0.2);
  color: var(--ind-color);
}

/* ── Card content ───────────────────────────── */
.card-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}
.card-subtitle {
  font-size: 0.82rem;
  color: var(--color-muted);
  line-height: 1.5;
  margin: 0;
}
.card-body {
  font-size: 0.82rem;
  color: var(--color-muted);
  line-height: 1.6;
  margin: 0;
  padding-top: 0.25rem;
}
.placeholder-icon { margin-bottom: 1.5rem; }
.placeholder-lines { display: flex; flex-direction: column; gap: 0.65rem; }
.ph-line {
  height: 12px;
  border-radius: 6px;
  background: var(--color-border);
  animation: shimmer 2s ease-in-out infinite;
}
.ph-line--title { height: 20px; width: 60%; }
.ph-line--short { width: 40%; }
@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1; }
}
.coming-soon-tag {
  position: absolute;
  top: 1rem; right: 1rem;
  font-size: 0.65rem;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
}

/* ── CTA card ───────────────────────────────── */
.cta-card {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  background: var(--color-surface);
  border: 1px solid rgba(var(--ind-rgb, 112, 64, 172), 0.22);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(var(--ind-rgb, 112, 64, 172), 0.08);
}
@media (min-width: 768px) {
  .cta-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

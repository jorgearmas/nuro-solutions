<template>
  <div class="careers-page">
    <AppNavbar />

    <!-- ── Hero ── -->
    <section class="careers-hero">
      <div class="orb" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-16 w-full">
        <div class="section-tag"><span class="glow-dot"></span>Careers</div>
        <h1 class="text-5xl lg:text-7xl font-display mb-6 max-w-3xl">
          Build what's next,<br /><em class="accent-em">with us.</em>
        </h1>
        <p class="text-muted text-lg max-w-xl leading-relaxed">
          We're always looking for curious, driven people. Browse our open positions and apply in a couple of minutes, just bring your CV.
        </p>
      </div>
    </section>

    <!-- ── Offers ── -->
    <section class="offers-sec">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 w-full py-16">
        <div class="flex items-baseline justify-between gap-4 mb-8">
          <h2 class="font-display text-3xl">Open positions</h2>
          <span v-if="status === 'ready' && offers.length" class="text-muted text-sm">
            {{ offers.length }} {{ offers.length === 1 ? 'opening' : 'openings' }}
          </span>
        </div>

        <!-- Loading -->
        <div v-if="status === 'loading'" class="offers-grid" aria-busy="true">
          <div v-for="i in 3" :key="i" class="offer-card offer-card--skeleton">
            <span class="sk sk-title"></span>
            <span class="sk sk-line"></span>
            <span class="sk sk-line sk-short"></span>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="status === 'error'" class="offers-empty">
          <p class="font-display text-xl mb-2">We couldn't load the openings.</p>
          <p class="text-muted mb-6">Please try again in a moment.</p>
          <button type="button" class="btn-primary" @click="load">Try again</button>
        </div>

        <!-- Empty -->
        <div v-else-if="!offers.length" class="offers-empty">
          <p class="font-display text-xl mb-2">No open positions right now.</p>
          <p class="text-muted mb-6">
            New roles open often. You can still introduce yourself and we'll keep you in mind.
          </p>
          <NuxtLink to="/contact" class="btn-primary">Get in touch</NuxtLink>
        </div>

        <!-- List -->
        <div v-else class="offers-grid">
          <article v-for="offer in offers" :key="offer.slug" class="offer-card">
            <div class="offer-tags">
              <span class="offer-tag">{{ offer.employment_type.label }}</span>
              <span class="offer-tag">{{ offer.work_mode.label }}</span>
              <span v-if="offer.location" class="offer-tag offer-tag--plain">{{ offer.location }}</span>
            </div>
            <h3 class="offer-title">{{ offer.title }}</h3>
            <p v-if="offer.summary" class="offer-summary">{{ offer.summary }}</p>
            <div class="offer-foot">
              <span class="text-muted text-xs">Posted {{ formatPostedDate(offer.published_at) }}</span>
              <NuxtLink :to="`/careers/${offer.slug}`" class="btn-primary btn-apply">
                Apply
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { formatPostedDate, useCareers } from '~/composables/useCareers'

useHead({
  title: 'Careers | Nuro Solutions',
  meta: [{ name: 'description', content: 'Open positions at Nuro Solutions. Apply online with your CV.' }],
})

// Fetched in the browser (not at build/SSR time) so a site built with
// `nuxt generate` always shows the offers currently published in Nuro Platform.
const { fetchOffers } = useCareers()
const offers = ref([])
const status = ref('loading') // loading | ready | error

async function load() {
  status.value = 'loading'
  try {
    offers.value = await fetchOffers()
    status.value = 'ready'
  } catch (e) {
    console.error('Careers API error:', e)
    status.value = 'error'
  }
}

onMounted(load)
</script>

<style scoped>
.careers-page { background: var(--color-bg); min-height: 100vh; }

.careers-hero {
  position: relative;
  overflow: hidden;
  min-height: 60vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
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

.offers-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
}
.offer-card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.75rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.offer-card:not(.offer-card--skeleton):hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(112, 64, 172, 0.12);
}
.offer-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.offer-tag {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  background: var(--color-accent-glow);
  color: var(--color-accent);
}
.offer-tag--plain {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-muted);
}
.offer-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.offer-summary { color: var(--color-muted); line-height: 1.6; font-size: 0.95rem; }
.offer-foot {
  margin-top: auto;
  padding-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.btn-apply { padding-top: 0.6rem; padding-bottom: 0.6rem; }

.offers-empty {
  text-align: center;
  padding: 4rem 1.5rem;
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: 16px;
}

/* Skeleton */
.offer-card--skeleton { min-height: 200px; }
.sk {
  display: block;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--color-surface-2) 0%, var(--color-border) 50%, var(--color-surface-2) 100%);
  background-size: 200% 100%;
  animation: sk-shimmer 1.4s ease-in-out infinite;
}
.sk-title { height: 1.6rem; width: 70%; margin-bottom: 0.5rem; }
.sk-line { height: 0.85rem; width: 100%; }
.sk-short { width: 55%; }
@keyframes sk-shimmer { to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) {
  .sk { animation: none; }
  .offer-card { transition: none; }
}
</style>

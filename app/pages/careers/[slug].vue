<template>
  <div class="offer-page">
    <AppNavbar />

    <div class="max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
      <NuxtLink to="/careers" class="back-link">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        All positions
      </NuxtLink>

      <!-- Loading -->
      <div v-if="status === 'loading'" class="mt-10" aria-busy="true">
        <span class="sk sk-title"></span>
        <span class="sk sk-line"></span>
        <span class="sk sk-line sk-short"></span>
      </div>

      <!-- Not found / closed -->
      <div v-else-if="status === 'missing'" class="offer-missing">
        <p class="font-display text-2xl mb-2">This position is no longer open.</p>
        <p class="text-muted mb-6">It may have been filled or closed. Take a look at our other openings.</p>
        <NuxtLink to="/careers" class="btn-primary">See open positions</NuxtLink>
      </div>

      <!-- Error -->
      <div v-else-if="status === 'error'" class="offer-missing">
        <p class="font-display text-2xl mb-2">We couldn't load this position.</p>
        <p class="text-muted mb-6">Please try again in a moment.</p>
        <button type="button" class="btn-primary" @click="load">Try again</button>
      </div>

      <!-- Offer + form -->
      <div v-else class="grid lg:grid-cols-5 gap-12 lg:gap-16 mt-10">
        <article class="lg:col-span-3">
          <div class="section-tag"><span class="glow-dot"></span>Open position</div>
          <h1 class="text-4xl lg:text-6xl font-display mb-5">{{ offer.title }}</h1>

          <div class="offer-tags mb-10">
            <span class="offer-tag">{{ offer.employment_type.label }}</span>
            <span class="offer-tag">{{ offer.work_mode.label }}</span>
            <span v-if="offer.location" class="offer-tag offer-tag--plain">{{ offer.location }}</span>
            <span class="offer-tag offer-tag--plain">Posted {{ formatPostedDate(offer.published_at) }}</span>
          </div>

          <!-- Plain text from the platform, rendered with line breaks kept.
               Never v-html: this content is user-entered. -->
          <h2 class="offer-h2">About the role</h2>
          <p class="offer-body">{{ offer.description }}</p>

          <template v-if="requirements.length">
            <h2 class="offer-h2">What we're looking for</h2>
            <ul class="offer-list">
              <li v-for="(item, i) in requirements" :key="i">{{ item }}</li>
            </ul>
          </template>

          <a href="#apply" class="btn-primary mt-10 lg:hidden">Apply now</a>
        </article>

        <aside id="apply" class="lg:col-span-2 apply-col">
          <CareersApplyForm :slug="offer.slug" @closed="status = 'missing'" />
        </aside>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { formatPostedDate, useCareers } from '~/composables/useCareers'

const route = useRoute()
const { fetchOffer } = useCareers()

const offer = ref(null)
const status = ref('loading') // loading | ready | missing | error

// One requirement per line in the platform; strip list markers people type.
const requirements = computed(() =>
  (offer.value?.requirements ?? '')
    .split('\n')
    .map((line) => line.replace(/^\s*[-•*]\s*/, '').trim())
    .filter(Boolean),
)

useHead(() => ({
  title: offer.value ? `${offer.value.title} | Careers | Nuro Solutions` : 'Careers | Nuro Solutions',
  meta: offer.value?.summary ? [{ name: 'description', content: offer.value.summary }] : [],
}))

async function load() {
  status.value = 'loading'
  try {
    offer.value = await fetchOffer(route.params.slug)
    status.value = 'ready'
  } catch (e) {
    const code = e?.response?.status ?? e?.statusCode
    if (code === 404) {
      status.value = 'missing'
    } else {
      console.error('Careers API error:', e)
      status.value = 'error'
    }
  }
}

// Client-side for the same reason as the list: always the live offer.
onMounted(load)
</script>

<style scoped>
.offer-page { background: var(--color-bg); min-height: 100vh; }

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-muted);
  transition: color 0.2s;
}
.back-link:hover { color: var(--color-accent); }

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

.offer-h2 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 2rem 0 0.85rem;
}
.offer-body {
  white-space: pre-line;
  line-height: 1.75;
  color: var(--color-text);
  opacity: 0.85;
  max-width: 65ch;
}
.offer-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 65ch;
}
.offer-list li {
  position: relative;
  padding-left: 1.4rem;
  line-height: 1.6;
}
.offer-list li::before {
  content: '';
  position: absolute;
  left: 0; top: 0.6em;
  width: 7px; height: 7px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-2));
}

.apply-col { scroll-margin-top: 6rem; }

.offer-missing {
  margin-top: 2.5rem;
  text-align: center;
  padding: 4rem 1.5rem;
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: 16px;
}

.sk {
  display: block;
  border-radius: 6px;
  margin-bottom: 0.85rem;
  background: linear-gradient(90deg, var(--color-surface-2) 0%, var(--color-border) 50%, var(--color-surface-2) 100%);
  background-size: 200% 100%;
  animation: sk-shimmer 1.4s ease-in-out infinite;
}
.sk-title { height: 3rem; width: 60%; margin-bottom: 1.5rem; }
.sk-line { height: 1rem; width: 100%; max-width: 640px; }
.sk-short { width: 45%; }
@keyframes sk-shimmer { to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { .sk { animation: none; } }
</style>

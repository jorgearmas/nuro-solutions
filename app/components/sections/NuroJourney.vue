<template>
  <div class="journey-root">

    <!-- ══════════════════════════════════════════
         MOBILE  (< 1024px): carrusel táctil
         ══════════════════════════════════════════ -->
    <div class="mobile-carousel">
      <div
        class="mobile-track"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <div v-for="n in 4" :key="n" class="mobile-slide">
          <div class="mobile-card">
            <img :src="`/room_${n}.png`" class="mobile-card-img" :alt="`Room ${n}`" />
            <span class="mobile-card-num">0{{ n }}</span>
          </div>
        </div>
        <div class="mobile-slide">
          <div class="mobile-card mobile-card--impact">
            <p class="impact-eyebrow">Our Impact</p>
            <div class="impact-stats">
              <div v-for="stat in impactStats" :key="stat.label" class="impact-stat">
                <span class="impact-value">{{ stat.value }}</span>
                <span class="impact-label">{{ stat.label }}</span>
              </div>
            </div>
            <NuxtLink to="/contact" class="impact-cta">
              Let's get the conversation started
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="mobile-dots">
        <span
          v-for="n in 5" :key="n"
          class="mobile-dot"
          :class="{ active: currentSlide === n - 1 }"
          @click="currentSlide = n - 1"
        />
      </div>
      <button class="mobile-arrow mobile-arrow--prev" @click="prev" :disabled="currentSlide === 0">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button class="mobile-arrow mobile-arrow--next" @click="next" :disabled="currentSlide === 4">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>

    <!-- ══════════════════════════════════════════
         DESKTOP (≥ 1024px): scroll inmersivo GSAP
         ══════════════════════════════════════════ -->
    <div ref="scrollContainerRef" class="journey-scroll-container">
      <div class="journey-sticky">

        <div ref="trackRef" class="h-track">
          <div v-for="n in 4" :key="n" class="h-panel" :class="{ 'panel-small': n === 1 }">
            <img :src="`/room_${n}.png`" class="panel-img" draggable="false" alt="" />
            <div class="panel-overlay" />
            <span class="panel-num">0{{ n }}</span>
          </div>
          <div class="h-panel impact-panel">
            <div class="impact-inner">
              <p class="impact-eyebrow">Our Impact</p>
              <div class="impact-stats">
                <div v-for="stat in impactStats" :key="stat.label" class="impact-stat">
                  <span class="impact-value">{{ stat.value }}</span>
                  <span class="impact-label">{{ stat.label }}</span>
                </div>
              </div>
              <NuxtLink to="/contact" class="impact-cta">
                Let's get the conversation started
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="scroll-hint" :style="{ opacity: hintOpacity }">
          <span class="hint-label">Scroll</span>
          <div class="hint-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12l7 7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <div class="progress-bar-wrap">
          <div class="progress-bar" :style="{ width: `${progress * 100}%` }" />
        </div>

        <div class="side-nav">
          <span v-for="n in 5" :key="n" class="nav-dot" :class="{ active: activeRoom === n }" />
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const impactStats = [
  { value: '3+',   label: 'Years in Market' },
  { value: '20+',  label: 'Brands Grown' },
  { value: '200%', label: 'Avg. ROI Increase' },
]

/* ── Mobile carousel ──────────────────────── */
const currentSlide = ref(0)
let touchStartX = 0
function onTouchStart(e) { touchStartX = e.touches[0].clientX }
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (dx < -40) next()
  else if (dx > 40) prev()
}
function next() { if (currentSlide.value < 4) currentSlide.value++ }
function prev() { if (currentSlide.value > 0) currentSlide.value-- }

/* ── Desktop scroll journey ───────────────── */
const scrollContainerRef = ref(null)
const trackRef           = ref(null)
const activeRoom         = ref(1)
const progress           = ref(0)
const hintOpacity        = ref(1)

let gsapLib = null

onMounted(async () => {
  const mod = await import('gsap')
  gsapLib = mod.gsap
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function onScroll() {
  if (!scrollContainerRef.value || !trackRef.value || !gsapLib) return
  // Solo ejecutar en desktop
  if (window.innerWidth < 1024) return

  const rect       = scrollContainerRef.value.getBoundingClientRect()
  const totalRange = scrollContainerRef.value.offsetHeight - window.innerHeight
  const scrolled   = Math.max(0, -rect.top)
  const p          = Math.min(1, scrolled / totalRange)

  progress.value    = p
  hintOpacity.value = Math.max(0, 1 - p * 8)

  const DWELL_START = 0.85
  const trackP = Math.min(p / DWELL_START, 1)
  gsapLib.set(trackRef.value, { x: -(trackP * 4 * window.innerWidth) })
  activeRoom.value = Math.min(5, Math.floor(trackP * 5) + 1)
}
</script>

<style scoped>
/* ════════════════════════════════════════════
   WRAPPER ROOT
   ════════════════════════════════════════════ */
.journey-root {
  /* sin overflow ni transform para no romper el sticky del desktop */
}

/* ════════════════════════════════════════════
   MOBILE CAROUSEL  (oculto en desktop)
   ════════════════════════════════════════════ */
.mobile-carousel { display: none; }

@media (max-width: 1023px) {
  .mobile-carousel {
    display: block;
    position: relative;
    background: #7040AC;
    padding: 2rem 0 3.5rem;
    overflow: hidden;
  }

  /* Ocultar el desktop journey en mobile */
  .journey-scroll-container { display: none; }

  .mobile-track {
    display: flex;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }
  .mobile-slide {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1.5rem;
  }
  .mobile-card {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0,0,0,0.4);
  }
  .mobile-card-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .mobile-card-num {
    position: absolute;
    bottom: 0.75rem; right: 1rem;
    font-family: var(--font-display);
    font-size: 3.5rem;
    font-weight: 800;
    color: rgba(255,255,255,0.1);
    line-height: 1;
    user-select: none;
  }
  .mobile-card--impact {
    background: #0a0a0f;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 2rem 1.5rem;
    aspect-ratio: auto;
    min-height: 240px;
  }
  .mobile-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 1.25rem;
  }
  .mobile-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
  }
  .mobile-dot.active { background: #fff; transform: scale(1.6); }
  .mobile-arrow {
    position: absolute;
    top: 50%; transform: translateY(-60%);
    width: 36px; height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.2);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; padding: 0;
    transition: background 0.2s;
  }
  .mobile-arrow svg { width: 18px; height: 18px; }
  .mobile-arrow:disabled { opacity: 0.25; cursor: default; }
  .mobile-arrow--prev { left: 0.5rem; }
  .mobile-arrow--next { right: 0.5rem; }
  .mobile-arrow:not(:disabled):hover { background: rgba(255,255,255,0.28); }
}

/* ════════════════════════════════════════════
   DESKTOP SCROLL JOURNEY
   ════════════════════════════════════════════ */
.journey-scroll-container {
  height: 600vh;
  position: relative;
  background: #7040AC;
}
.journey-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  background: #7040AC;
}
.h-track {
  display: flex;
  position: absolute;
  inset: 0;
  width: 500vw;
  height: 100%;
  will-change: transform;
}
.h-panel {
  position: relative;
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  overflow: hidden;
}
.panel-img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
}
.panel-small {
  display: flex;
  align-items: center;
  justify-content: center;
}
.panel-small .panel-img {
  position: relative;
  inset: auto;
  width: 60%; height: 68%;
  object-fit: cover;
}
.panel-small .panel-overlay { display: none; }
.panel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.55) 100%);
  pointer-events: none;
}
.panel-num {
  position: absolute;
  bottom: 2.5rem; right: 2.5rem;
  font-family: var(--font-display);
  font-size: clamp(5rem, 12vw, 10rem);
  font-weight: 800;
  color: rgba(255,255,255,0.07);
  line-height: 1;
  letter-spacing: -0.05em;
  user-select: none;
  pointer-events: none;
}
.scroll-hint {
  position: absolute;
  bottom: 3rem; left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  pointer-events: none;
  transition: opacity 0.1s linear;
}
.hint-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
}
.hint-arrow {
  width: 20px; height: 20px;
  color: rgba(255,255,255,0.6);
  animation: bounce-down 1.4s ease-in-out infinite;
}
@keyframes bounce-down {
  0%,100% { transform: translateY(0);   opacity: 0.6; }
  50%     { transform: translateY(6px); opacity: 1;   }
}
.progress-bar-wrap {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: rgba(255,255,255,0.1);
  z-index: 30;
}
.progress-bar {
  height: 100%;
  background: var(--color-accent);
  transition: width 0.05s linear;
  max-width: 100%;
}
.side-nav {
  position: absolute;
  right: 1.5rem; top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 30;
}
.nav-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.30);
  transition: background 0.3s, transform 0.3s;
}
.nav-dot.active { background: #ffffff; transform: scale(1.7); }

/* ── Impact Panel (room 5) ──────────────────── */
.impact-panel {
  background: #0a0a0f;
  display: flex;
  align-items: center;
  justify-content: center;
}
.impact-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  text-align: center;
  padding: 2rem;
}
.impact-eyebrow {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
}
.impact-stats {
  display: flex;
  gap: clamp(2rem, 8vw, 6rem);
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
}
.impact-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.impact-value {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 7.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.impact-label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
}
.impact-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 2rem;
  background: var(--color-accent);
  color: #ffffff;
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 999px;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  white-space: nowrap;
  text-decoration: none;
}
.impact-cta:hover {
  background: #5a32a0;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(112,64,172,0.4);
}
</style>

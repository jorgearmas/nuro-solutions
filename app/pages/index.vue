<template>
  <div class="page-root">
    <AppNavbar />

    <!-- ── Hero ── -->
    <section
      ref="heroRef"
      data-bg="hero"
      class="cover-sec hero-sec flex items-center overflow-hidden"
    >
      <video class="hero-video" autoplay muted loop playsinline preload="auto" aria-hidden="true">
        <source
          src="https://res.cloudinary.com/dpi6oudmk/video/upload/v1779937898/nuro_hero_ydesyu.mp4"
          type="video/mp4"
        />
      </video>
      <div class="hero-overlay" aria-hidden="true"></div>
      <div class="orb orb-1" aria-hidden="true"></div>
      <div class="orb orb-2" aria-hidden="true"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full hero-content">
        <div class="max-w-4xl">
          <div class="section-tag">
            <span class="glow-dot"></span>Growthcraft Partner
          </div>
          <h1 class="hero-headline">
            <span class="block text-white">Your</span>
            <span class="block accent-word">Growthcraft</span>
            <span class="block text-white">Partner</span>
          </h1>
          <p class="hero-sub">
            Nuro delivers data-driven marketing systems engineered to increase conversions,
            lower acquisition costs, and scale ROI — intentionally.
          </p>
          <div class="flex flex-wrap gap-4 mt-10">
            <NuxtLink to="/contact" class="btn-primary">
              Get Started
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/portfolio" class="btn-ghost btn-white">See Our Work</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Ideas ── -->
    <section
      ref="ideasRef"
      data-bg="ideas"
      class="cover-sec ideas-section"
    >
      <h2 class="ideas-title">
        <span class="line-wrap">
          <span class="line-inner" :class="{ 'line-up': ideasVisible }">Can your ideas</span>
        </span>
        <span class="line-wrap">
          <span class="line-inner line-delay" :class="{ 'line-up': ideasVisible }">change the World?</span>
        </span>
      </h2>
    </section>

    <!-- ── Mindset ── -->
    <section
      ref="mindsetRef"
      data-bg="mindset"
      class="cover-sec mindset-section"
    >
      <h2 class="mindset-title">
        <span class="line-wrap">
          <span class="line-inner" :class="{ 'line-up': mindsetVisible }">Experimental Mindset,</span>
        </span>
        <span class="line-wrap">
          <span class="line-inner line-delay" :class="{ 'line-up': mindsetVisible }">Beyond Goal-Obsession</span>
        </span>
      </h2>
    </section>

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
         DESKTOP (≥ 1024px): scroll inmersivo
         ══════════════════════════════════════════ -->
    <div ref="journeyRef" class="journey-scroll-container">
      <div class="journey-sticky">

        <!-- Overlay morado: empieza transparente, fade-in con scroll -->
        <div class="sticky-bg-overlay" :style="{ opacity: stickyBgOpacity }" aria-hidden="true" />

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

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/* ── Impact stats ── */
const impactStats = [
  { value: '3+',   label: 'Years in Market' },
  { value: '20+',  label: 'Brands Grown' },
  { value: '200%', label: 'Avg. ROI Increase' },
]

/* ── Mobile carousel ── */
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

/* ── Section refs ── */
const heroRef    = ref(null)
const ideasRef   = ref(null)
const mindsetRef = ref(null)
const journeyRef = ref(null)
const trackRef   = ref(null)

/* ── State ── */
const ideasVisible    = ref(false)
const mindsetVisible  = ref(false)
const hideNav         = useState('hideNav', () => false)
const activeRoom      = ref(1)
const progress        = ref(0)
const hintOpacity     = ref(1)
const stickyBgOpacity = ref(0) // empieza transparente

/* ── Background classes ── */
const BG_CLASSES = {
  hero:    'bg-hero',
  ideas:   'bg-ideas',
  mindset: 'bg-mindset',
  journey: 'bg-journey',
}

let io      = null
let gsapLib = null

function setBodyBg(name) {
  Object.values(BG_CLASSES).forEach(cls => document.body.classList.remove(cls))
  if (name && BG_CLASSES[name]) {
    document.body.classList.add(BG_CLASSES[name])
  }
}

/* ── Desktop journey scroll ── */
function onJourneyScroll() {
  if (!journeyRef.value || !trackRef.value || !gsapLib) return
  if (window.innerWidth < 1024) return

  const rect       = journeyRef.value.getBoundingClientRect()
  const totalRange = journeyRef.value.offsetHeight - window.innerHeight
  const scrolled   = Math.max(0, -rect.top)
  const p          = Math.min(1, scrolled / totalRange)

  // El crossfade naranja → morado lo dispara journeyIo durante la ENTRADA
  // del container (antes de que p > 0). Aquí solo aseguramos el estado.
  if (p > 0) hideNav.value = true

  progress.value    = p
  hintOpacity.value = Math.max(0, 1 - p * 8)

  stickyBgOpacity.value = Math.min(1, p / 0.15)

  const DWELL_START = 0.85
  const trackP = Math.min(p / DWELL_START, 1)
  gsapLib.set(trackRef.value, { x: -(trackP * 4 * window.innerWidth) })
  activeRoom.value = Math.min(5, Math.floor(trackP * 5) + 1)
}

onMounted(async () => {
  setBodyBg('hero')

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        if (e.target === heroRef.value)     setBodyBg('hero')
        if (e.target === ideasRef.value)   { setBodyBg('ideas');   ideasVisible.value   = true }
        if (e.target === mindsetRef.value) { setBodyBg('mindset'); mindsetVisible.value = true }
      })
    },
    { threshold: 0, rootMargin: '-40% 0px -59% 0px' }
  )

  // journeyIo: dispara el crossfade naranja → morado mientras el container
  // del journey ENTRA al viewport (su top cruza el 45% de la pantalla),
  // así el morado aparece durante la transición, antes del scroll horizontal.
  // rootMargin '0px 0px -55% 0px' → isIntersecting cuando container.top < 45%vh
  const journeyIo = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setBodyBg('journey')   // body: #F27700 → #7040AC (crossfade 0.8s)
          hideNav.value = true
        } else if (e.boundingClientRect.top > 0) {
          // El container salió por abajo (scroll hacia arriba) → restaura Mindset
          setBodyBg('mindset')
          hideNav.value = false
        }
      })
    },
    { threshold: 0, rootMargin: '0px 0px -55% 0px' }
  )

  if (heroRef.value)    io.observe(heroRef.value)
  if (ideasRef.value)   io.observe(ideasRef.value)
  if (mindsetRef.value) io.observe(mindsetRef.value)
  if (journeyRef.value) journeyIo.observe(journeyRef.value)

  window.addEventListener('scroll', onJourneyScroll, { passive: true })

  const { gsap } = await import('gsap')
  gsapLib = gsap
  gsap.from('.hero-headline span',      { y: 60, opacity: 0, duration: 1,   stagger: 0.15, ease: 'power3.out', delay: 0.2 })
  gsap.from('.hero-sub',                { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.7 })
  gsap.from('.btn-primary, .btn-ghost', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1,  ease: 'power3.out', delay: 0.9 })
})

onUnmounted(() => {
  io?.disconnect()
  window.removeEventListener('scroll', onJourneyScroll)
  Object.values(BG_CLASSES).forEach(cls => document.body.classList.remove(cls))
  hideNav.value = false
})
</script>

<style scoped>
/* ── Page root ── */
.page-root {
  overflow-x: clip;
}

/* ── Secciones cover ── */
.cover-sec {
  height: 100vh;
  min-height: 100vh;
  width: 100%;
}

/* ── Hero ── */
.hero-sec {
  background: #0a0a0f;
  position: relative;
}
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  z-index: 0;
}
.hero-overlay {
  position: absolute; inset: 0;
  z-index: 1;
  background: rgba(10, 10, 15, 0.82);
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 2;
}
.orb-1 {
  width: clamp(300px, 50vw, 600px); height: clamp(300px, 50vw, 600px);
  background: radial-gradient(circle, rgba(112,64,172,0.25) 0%, transparent 70%);
  top: -150px; left: -100px;
}
.orb-2 {
  width: clamp(200px, 35vw, 400px); height: clamp(200px, 35vw, 400px);
  background: radial-gradient(circle, rgba(242,119,0,0.15) 0%, transparent 70%);
  bottom: 100px; right: 0;
}
.hero-content {
  padding-top: 5rem;
  padding-bottom: 4rem;
}
.hero-headline {
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 1; letter-spacing: -0.04em;
  margin-bottom: 1.5rem; color: #ffffff;
}
.accent-word {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.72);
  line-height: 1.7; max-width: 520px;
}
.btn-white {
  background: #ffffff !important; border-color: #ffffff !important; color: #0a0a0f !important;
}
.btn-white:hover {
  background: rgba(255,255,255,0.88) !important; border-color: rgba(255,255,255,0.88) !important;
  transform: translateY(-1px);
}

/* ── Ideas ── */
.ideas-section {
  display: flex; align-items: center; justify-content: center;
  padding: 5rem 2rem;
}
.ideas-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.5vw, 3rem);
  font-weight: 400; letter-spacing: -0.04em;
  color: #0a0a0f; text-align: center; line-height: 1.2; max-width: 900px;
}

/* ── Mindset ── */
.mindset-section {
  display: flex; align-items: center; justify-content: center;
  padding: 5rem 2rem;
}
.mindset-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.5vw, 3rem);
  font-weight: 400; letter-spacing: -0.04em;
  color: #ffffff; text-align: center; line-height: 1.2; max-width: 900px;
}

/* ── Split-text animation ── */
.line-wrap {
  display: block; overflow: hidden; padding-bottom: 0.08em;
}
.line-inner {
  display: block;
  transform: translateY(115%);
  transition: transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s;
}
.line-inner.line-up { transform: translateY(0); }
.line-delay { transition-delay: calc(0.7s + 0.18s); }

/* ════════════════════════════════════════════
   MOBILE CAROUSEL
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
  background: transparent; /* el body maneja el color — sin línea de corte */
}
.journey-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  background: transparent; /* el overlay maneja el color */
}

/* Overlay morado — fade-in via JS */
.sticky-bg-overlay {
  position: absolute;
  inset: 0;
  background: #7040AC;
  z-index: 0;
  pointer-events: none;
}

.h-track {
  display: flex;
  position: absolute;
  inset: 0;
  width: 500vw;
  height: 100%;
  will-change: transform;
  z-index: 1;
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

/* ── Impact Panel ── */
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
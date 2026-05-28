<template>
  <div class="page-snap">
    <AppNavbar />

    <!-- ── Hero ─────────────────────────────────────────── -->
    <section class="hero snap-sec relative flex items-start overflow-hidden">

      <!-- Background Video -->
      <video
        class="hero-video"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        aria-hidden="true"
      >
        <source
          src="https://res.cloudinary.com/dpi6oudmk/video/upload/v1779842551/corp_hero_nuro_meck7m.mp4"
          type="video/mp4"
        />
      </video>

      <!-- Video Overlay -->
      <div class="hero-overlay" aria-hidden="true"></div>

      <!-- Orbs -->
      <div class="orb orb-1" aria-hidden="true"></div>
      <div class="orb orb-2" aria-hidden="true"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 w-full hero-content">
        <div class="max-w-4xl">

          <!-- Tag -->
          <div class="section-tag">
            <span class="glow-dot"></span>
            Growthcraft Partner
          </div>

          <!-- Headline -->
          <h1 class="hero-headline">
            <span class="block text-white">Your</span>
            <span class="block accent-word">Growthcraft</span>
            <span class="block text-white">Partner</span>
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
            <NuxtLink to="/portfolio" class="btn-ghost btn-white">See Our Work</NuxtLink>
          </div>

        </div>
      </div>
    </section>

    <!-- ── Can your ideas change the world? ────────────────── -->
    <section ref="ideasRef" class="ideas-section snap-sec">
      <h2 class="ideas-title">
        <span class="line-wrap">
          <span class="line-inner" :class="{ 'line-up': ideasVisible }">
            Can your ideas
          </span>
        </span>
        <span class="line-wrap">
          <span class="line-inner line-delay" :class="{ 'line-up': ideasVisible }">
            change the World?
          </span>
        </span>
      </h2>
    </section>

    <!-- ── Experimental Mindset ─────────────────────────────── -->
    <section
      ref="mindsetRef"
      class="mindset-section snap-sec"
    >
      <h2 class="mindset-title">
        <span class="line-wrap">
          <span class="line-inner" :class="{ 'line-up': mindsetVisible }">
            Experimental Mindset,
          </span>
        </span>
        <span class="line-wrap">
          <span class="line-inner line-delay" :class="{ 'line-up': mindsetVisible }">
            Beyond Goal-Obsession
          </span>
        </span>
      </h2>
    </section>

    <!-- ── Journey Section ──────────────────────────────────── -->
    <div
      ref="journeyRef"
      class="journey-wrap snap-sec"
    >
      <NuroJourney />
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const ideasRef       = ref(null)
const mindsetRef     = ref(null)
const journeyRef     = ref(null)
const ideasVisible   = ref(false)
const mindsetVisible = ref(false)
const journeyVisible = ref(false)
const hideNav        = useState('hideNav', () => false)

let io = null

onUnmounted(() => {
  document.documentElement.style.scrollSnapType = ''
  document.documentElement.style.overflowY = ''
  hideNav.value = false
})


onUnmounted(() => {
  io?.disconnect()
})

onMounted(async () => {
  // Scroll-snap: cada sección ocupa la pantalla
  document.documentElement.style.scrollSnapType = 'y proximity'

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.target === ideasRef.value   && e.isIntersecting) ideasVisible.value   = true
        if (e.target === mindsetRef.value && e.isIntersecting) mindsetVisible.value = true
        if (e.target === journeyRef.value && e.isIntersecting) journeyVisible.value = true
        if (e.target === journeyRef.value) hideNav.value = e.isIntersecting
      })
    },
    { threshold: 0.1 }
  )
  if (ideasRef.value)   io.observe(ideasRef.value)
  if (mindsetRef.value) io.observe(mindsetRef.value)
  if (journeyRef.value) io.observe(journeyRef.value)

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
})
</script>

<style scoped>
.hero {
  background: #0a0a0f;
  overflow: visible;
}

/* El content empuja el hero hasta que el gradiente quede 0.5cm abajo de los botones */
.hero-content {
  padding-bottom: calc(18vh + 0.5cm);
}

/* ── Video de fondo ─────────────────────────── */
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

/* Overlay: oscuro arriba, se difumina hacia el color de la siguiente sección */
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(10, 10, 15, 0.82);
}

/* ── Fade hacia la sección siguiente ────────────────────── */
.hero::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: calc(18vh + 4px);
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 40%,
    rgba(255, 255, 255, 0.55) 70%,
    #ffffff 100%
  );
  z-index: 4;
  pointer-events: none;
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

.hero-headline {
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 1;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
  color: #ffffff;
}
.accent-word {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
  max-width: 520px;
}


/* Botón blanco (override de btn-ghost para el Hero) */
.btn-white {
  background: #ffffff !important;
  border-color: #ffffff !important;
  color: #0a0a0f !important;
}
.btn-white:hover {
  background: rgba(255, 255, 255, 0.88) !important;
  border-color: rgba(255, 255, 255, 0.88) !important;
  transform: translateY(-1px);
}

/* ── Snap ────────────────────────────────────────────────── */
.page-snap {
  overflow-x: hidden; /* evita desborde horizontal de orbs y tracks en mobile */
}
.snap-sec {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  will-change: transform;
  transform: translateZ(0);
}

/* ── Entrada dinámica (eliminada para evitar fondo transparente) */

/* ── Fade journey → footer (crema) ──────────────────────── */
.journey-wrap {
  position: relative;
  margin-top: -4px;
}
.journey-wrap::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: calc(100vh + 4px); /* cubre los 100vh de zona muerta del sticky */
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(249, 240, 229, 0.06) 50%,
    rgba(249, 240, 229, 0.6) 80%,
    #F9F0E5 100%
  );
  z-index: 10;
  pointer-events: none;
}

/* ── Can your ideas ─────────────────────────────────────── */
.ideas-section {
  height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  position: relative;
  overflow: visible;
  margin-top: -4px;
}

/* ── Fade hacia Experimental Mindset (naranja) ──────────── */
.ideas-section::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: calc(18vh + 4px);
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(242, 119, 0, 0.08) 40%,
    rgba(242, 119, 0, 0.55) 70%,
    #F27700 100%
  );
  z-index: 4;
  pointer-events: none;
}
.ideas-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.5vw, 3rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  color: #0a0a0f;
  text-align: center;
  line-height: 1.2;
  max-width: 900px;
}

/* ── Experimental Mindset ───────────────────────────────── */
.mindset-section {
  height: 100vh;
  background: #F27700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  position: relative;
  overflow: visible;
  margin-top: -4px;
}

/* ── Fade hacia Journey/rooms (morado) ──────────────────── */
.mindset-section::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: calc(18vh + 4px);
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(112, 64, 172, 0.08) 40%,
    rgba(112, 64, 172, 0.55) 70%,
    #7040AC 100%
  );
  z-index: 4;
  pointer-events: none;
}
.mindset-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.5vw, 3rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  color: #ffffff;
  text-align: center;
  line-height: 1.2;
  max-width: 900px;
}

/* ── Split line ─────────────────────────────────────────── */
.line-wrap {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em; /* evita que se corte el descender */
}
.line-inner {
  display: block;
  transform: translateY(115%);
  transition: transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s;
}
.line-inner.line-up {
  transform: translateY(0);
}
.line-delay {
  transition-delay: calc(0.7s + 0.18s);
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

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

    <!-- ── Journey ── -->
    <div class="journey-wrap">
      <!-- Centinela: 1px invisible al top del Journey.
           El observer lo detecta en cuanto cruza el viewport. -->
      <div ref="journeySentinelRef" class="journey-sentinel" aria-hidden="true" />
      <NuroJourney />
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const heroRef             = ref(null)
const ideasRef            = ref(null)
const mindsetRef          = ref(null)
const journeySentinelRef  = ref(null)
const ideasVisible        = ref(false)
const mindsetVisible      = ref(false)
const hideNav             = useState('hideNav', () => false)

const BG_CLASSES = {
  hero:    'bg-hero',
  ideas:   'bg-ideas',
  mindset: 'bg-mindset',
}

let io = null

function setBodyBg(name) {
  Object.values(BG_CLASSES).forEach(cls => document.body.classList.remove(cls))
  if (name && name !== 'base' && BG_CLASSES[name]) {
    document.body.classList.add(BG_CLASSES[name])
  }
}

onMounted(async () => {
  setBodyBg('hero')

  // Observer para las secciones de color (hero, ideas, mindset)
  // rootMargin '-40% 0px -59% 0px' → dispara cuando el centro cruza el centro del viewport
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const target = e.target

        if (target === heroRef.value)    setBodyBg('hero')
        if (target === ideasRef.value)  { setBodyBg('ideas');   ideasVisible.value   = true }
        if (target === mindsetRef.value){ setBodyBg('mindset'); mindsetVisible.value = true }

        // El centinela es 1px al tope del Journey —
        // en cuanto asoma en pantalla cambia el color
        if (target === journeySentinelRef.value) {
          setBodyBg('base')
          hideNav.value = true
        }
      })
    },
    {
      threshold: 0,
      rootMargin: '-40% 0px -59% 0px'
    }
  )

  // El centinela usa su propio observer sin rootMargin
  // para que dispare exactamente cuando su borde superior entra al viewport
  const sentinelIo = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setBodyBg('base')
          hideNav.value = true
        } else if (e.boundingClientRect.top > 0) {
          // El centinela salió por abajo (usuario scrolleó de vuelta arriba)
          // — mindset recupera el color
          setBodyBg('mindset')
          hideNav.value = false
        }
      })
    },
    { threshold: 0, rootMargin: '0px 0px 0px 0px' }
  )

  if (heroRef.value)    io.observe(heroRef.value)
  if (ideasRef.value)   io.observe(ideasRef.value)
  if (mindsetRef.value) io.observe(mindsetRef.value)
  if (journeySentinelRef.value) sentinelIo.observe(journeySentinelRef.value)

  const { gsap } = await import('gsap')
  gsap.from('.hero-headline span',      { y: 60, opacity: 0, duration: 1,   stagger: 0.15, ease: 'power3.out', delay: 0.2 })
  gsap.from('.hero-sub',                { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.7 })
  gsap.from('.btn-primary, .btn-ghost', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1,  ease: 'power3.out', delay: 0.9 })
})

onUnmounted(() => {
  io?.disconnect()
  Object.values(BG_CLASSES).forEach(cls => document.body.classList.remove(cls))
  hideNav.value = false
})
</script>

<style scoped>
/* ── Page root ── */
.page-root {
  overflow-x: clip;
}

/* ── Secciones: flujo normal, 100vh cada una ── */
.cover-sec {
  height: 100vh;
  min-height: 100vh;
  width: 100%;
}

/* ── Centinela: invisible, solo marca el inicio del Journey ── */
.journey-sentinel {
  height: 1px;
  width: 100%;
  pointer-events: none;
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

/* ── Journey ── */
.journey-wrap {
  position: relative;
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
</style>
<template>
  <div class="page-root">
    <AppNavbar />

    <!-- ── Hero ── -->
    <section class="hero-sec flex items-center overflow-hidden">
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
            <span class="glow-dot"></span>Rooted in Guatemala, Global reach
          </div>
          <h1 class="hero-headline">
            <span class="block text-white">Your</span>
            <span class="block accent-word">Growthcraft</span>
            <span class="block text-white">Partner</span>
          </h1>
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

    <!-- ── Ideas + Stats ── -->
    <section class="ideas-sec" :class="{ 'ideas-sec--dark': journeyActive }">
      <div class="ideas-inner">
        <div class="ideas-left">
          <h2 class="ideas-title">Can Your <span class="accent-word">Ideas</span> Change The World?</h2>
          <p class="ideas-text">
            At Nuro Solutions, we help companies and professionals shape the commercial
            future they envision.
          </p>
        </div>
        <div class="ideas-right">
          <!-- Vertical ticker: the list is duplicated so the loop is
               seamless; it scrolls bottom→top and pauses on hover. -->
          <div class="ideas-marquee">
            <div class="ideas-track">
              <div v-for="stat in impactStats" :key="`a-${stat.label}`" class="ideas-stat">
                <span class="ideas-stat-value">{{ stat.value }}</span>
                <span class="ideas-stat-label">{{ stat.label }}</span>
              </div>
              <div v-for="stat in impactStats" :key="`b-${stat.label}`" class="ideas-stat" aria-hidden="true">
                <span class="ideas-stat-value">{{ stat.value }}</span>
                <span class="ideas-stat-label">{{ stat.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Journey: Experimental Mindset (horizontal scroll) ──
         Desktop: the section is pinned and the track translates left as you
         scroll, walking through the 4 phases. Mobile: panels stack vertically
         (the horizontal/pin setup is gated to ≥1024px via gsap.matchMedia). -->
    <section class="journey-sec" :class="{ 'journey-sec--dark': journeyActive && !logosActive }" ref="journeyRef">
      <div class="journey-orb journey-orb-1" aria-hidden="true"></div>
      <div class="journey-orb journey-orb-2" aria-hidden="true"></div>
      <div class="journey-stage">
        <h2 class="journey-heading">
          Experimental <span class="accent-word">Mindset</span>, Beyond Goal-Obsession
        </h2>

        <div class="journey-track" ref="trackRef">
          <!-- 01 · Explore -->
          <article class="journey-panel">
            <div class="jp-visual jp-reveal">
              <svg viewBox="0 0 200 200" class="rv" aria-hidden="true">
                <defs>
                  <linearGradient id="jg1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#7040AC" />
                    <stop offset="100%" stop-color="#F27700" />
                  </linearGradient>
                </defs>
                <!-- orbit paths -->
                <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
                <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
                <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
                <!-- sun -->
                <circle class="ex-sun" cx="100" cy="100" r="8" fill="url(#jg1)" />
                <!-- planets: each <g> rotates around the centre at its own speed -->
                <g class="ex-orbit ex-o1"><circle cx="100" cy="60" r="5" fill="url(#jg1)" /></g>
                <g class="ex-orbit ex-o2"><circle cx="100" cy="38" r="6.5" fill="url(#jg1)" /></g>
                <g class="ex-orbit ex-o3"><circle cx="100" cy="18" r="4" fill="url(#jg1)" /></g>
                <g class="ex-orbit ex-o4"><circle cx="100" cy="38" r="4" fill="url(#jg1)" /></g>
              </svg>
            </div>
            <span class="jp-num jp-reveal">01</span>
            <h3 class="jp-title jp-reveal">Explore</h3>
            <p class="jp-line jp-reveal">We map the terrain — data, context and opportunities — before deciding.</p>
          </article>

          <!-- 02 · Experiment -->
          <article class="journey-panel">
            <div class="jp-visual jp-reveal">
              <svg viewBox="0 0 200 200" class="rv" aria-hidden="true">
                <defs>
                  <linearGradient id="jg2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#7040AC" />
                    <stop offset="100%" stop-color="#F27700" />
                  </linearGradient>
                </defs>
                <path class="xp-path" d="M40,100 C85,100 95,55 158,55" fill="none" stroke="url(#jg2)" stroke-width="2" stroke-linecap="round" />
                <path class="xp-path xp-d" d="M40,100 C85,100 95,145 158,145" fill="none" stroke="url(#jg2)" stroke-width="2" stroke-linecap="round" />
                <g fill="url(#jg2)">
                  <circle cx="40" cy="100" r="7" />
                  <circle class="xp-node" cx="158" cy="55" r="6" />
                  <circle class="xp-node xp-nd" cx="158" cy="145" r="6" />
                </g>
              </svg>
            </div>
            <span class="jp-num jp-reveal">02</span>
            <h3 class="jp-title jp-reveal">Experiment</h3>
            <p class="jp-line jp-reveal">We launch small, fast tests to validate hypotheses in the real world.</p>
          </article>

          <!-- 03 · Learn -->
          <article class="journey-panel">
            <div class="jp-visual jp-reveal">
              <svg viewBox="0 0 200 200" class="rv" aria-hidden="true">
                <defs>
                  <linearGradient id="jg3" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#7040AC" />
                    <stop offset="100%" stop-color="#F27700" />
                  </linearGradient>
                </defs>
                <g fill="url(#jg3)" opacity="0.22">
                  <rect class="ln-bar" x="34" y="120" width="16" height="46" rx="3" />
                  <rect class="ln-bar ln-d1" x="62" y="95" width="16" height="71" rx="3" />
                  <rect class="ln-bar ln-d2" x="90" y="110" width="16" height="56" rx="3" />
                  <rect class="ln-bar ln-d3" x="118" y="78" width="16" height="88" rx="3" />
                  <rect class="ln-bar ln-d4" x="146" y="60" width="16" height="106" rx="3" />
                </g>
                <polyline class="ln-line" points="42,118 70,92 98,104 126,72 154,52" fill="none" stroke="url(#jg3)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="154" cy="52" r="4" fill="#F27700" />
              </svg>
            </div>
            <span class="jp-num jp-reveal">03</span>
            <h3 class="jp-title jp-reveal">Learn</h3>
            <p class="jp-line jp-reveal">We measure, read the signals, and discard what doesn't add value.</p>
          </article>

          <!-- 04 · Scale -->
          <article class="journey-panel">
            <div class="jp-visual jp-reveal">
              <svg viewBox="0 0 200 200" class="rv" aria-hidden="true">
                <defs>
                  <linearGradient id="jg4" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#7040AC" />
                    <stop offset="100%" stop-color="#F27700" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke="url(#jg4)" stroke-width="2">
                  <circle class="sc-ring" cx="100" cy="100" r="20" />
                  <circle class="sc-ring sc-d1" cx="100" cy="100" r="20" />
                  <circle class="sc-ring sc-d2" cx="100" cy="100" r="20" />
                </g>
                <circle cx="100" cy="100" r="14" fill="url(#jg4)" />
                <path class="sc-arrow" d="M100,116 L100,84 M100,84 L89,97 M100,84 L111,97" stroke="#7040AC" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <span class="jp-num jp-reveal">04</span>
            <h3 class="jp-title jp-reveal">Scale</h3>
            <p class="jp-line jp-reveal">We amplify what works until it compounds into real growth.</p>
          </article>
        </div>

        <!-- Progress lane: the Nuro face travels left→right along the thread as
             you scroll, doubling as the guide and the progress indicator. The
             4 stations are the rooms; they fill in as the face passes. -->
        <div class="journey-path" aria-hidden="true">
          <div class="journey-thread"></div>
          <div class="journey-thread-fill" :style="{ width: journeyProgress * 100 + '%' }"></div>
          <span
            v-for="i in 4"
            :key="`st-${i}`"
            class="journey-station"
            :class="{ 'journey-station--on': activeRoom >= i - 1 }"
            :style="{ left: ((i - 1) / 3) * 100 + '%' }"
          ></span>
          <div class="journey-traveler" :style="{ left: journeyProgress * 100 + '%' }">
            <div class="tv-disc">
              <img src="/medium_face.png" alt="" class="tv-face" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Portfolio logos marquee ── -->
    <section class="logos-sec" :class="{ 'logos-sec--light': logosActive }" ref="logosSecRef">
      <div class="logos-inner">
        <h2 class="logos-title">
          Real <span class="accent-word">Action</span>, Real Cases
        </h2>
        <!-- Horizontal ticker: the list is duplicated so the loop is
             seamless; it scrolls left→right and pauses on hover. -->
        <div class="logos-marquee">
          <div class="logos-track">
            <div v-for="logo in portfolioLogos" :key="`a-${logo.name}`" class="logo-item">
              <img :src="logo.src" :alt="logo.name" class="logo-img" />
            </div>
            <div v-for="logo in portfolioLogos" :key="`b-${logo.name}`" class="logo-item" aria-hidden="true">
              <img :src="logo.src" :alt="logo.name" class="logo-img" />
            </div>
          </div>
        </div>
        <NuxtLink to="/contact" class="impact-cta">
          Let's get the conversation started
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

/* ── Impact stats ── */
const impactStats = [
  { value: '3+',    label: 'Years in Market' },
  { value: '20+',   label: 'Brands Grown' },
  { value: '60%',   label: 'Increase in Customer Retention' },
  { value: '45%',   label: 'Avg. Acquisition Cost Reduction' },
  { value: '3.5x',  label: 'Average Conversion Rate Growth' },
  { value: '200%',  label: 'Avg. ROI Increase' },
  { value: '100K+', label: 'Data Insights Activated' },
  { value: '15+',   label: 'Data Pipelines Automated' },
  { value: '6K',    label: 'Geolocation Points Mapped' },
  { value: '25+',   label: 'Dynamic Data Capture Interfaces' },
]

/* ── Portfolio logos (horizontal marquee) ── */
const portfolioLogos = [
  { name: 'MI Consulting',          src: '/mi-consulting_portafolio.png' },
  { name: 'Reborn Detailing Studio', src: '/Reborn_portafolio.png' },
  { name: 'MEM',                     src: '/MEM_portafolio.png' },
  { name: 'UVG',                     src: '/UVG_portafolio.png' },
  { name: 'Medident',               src: '/Medident_portafolio.png' },
]

/* ── Journey (horizontal scroll) ──
   journeyActive darkens the Ideas section just before the (dark) journey
   scrolls in, so there is no hard white→black seam at the boundary. */
const journeyRef = ref(null)
const trackRef = ref(null)
const journeyActive = ref(false)
const activeRoom = ref(0)
const journeyProgress = ref(0) // 0→1 across the horizontal scroll (drives the traveller)

/* ── Logos section: crossfade black → white on entry. Starts dark (matching
   the journey above it) and lightens once scrolled in, so the seam never
   shows. ── */
const logosSecRef = ref(null)
const logosActive = ref(false)
let logosIo = null

let mm = null          // gsap.matchMedia instance (journey scroll setup)

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsap.from('.hero-headline span',      { y: 60, opacity: 0, duration: 1,   stagger: 0.15, ease: 'power3.out', delay: 0.2 })
  gsap.from('.btn-primary, .btn-ghost', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1,  ease: 'power3.out', delay: 0.7 })

  mm = gsap.matchMedia()

  // Desktop: pin the journey and translate the track left as you scroll.
  mm.add('(min-width: 1024px)', () => {
    const track = trackRef.value
    const panels = gsap.utils.toArray('.journey-panel')
    const distance = () => track.scrollWidth - window.innerWidth

    // Dwell on room 1: hold the track still for the first HOLD fraction of the
    // scroll, then move linearly. `eased` maps raw scroll progress → track
    // progress so the face/stations track the actual movement (stay put during
    // the dwell). Total scroll is stretched by 1/(1-HOLD) to keep the same
    // travel speed once it starts moving.
    const HOLD = 0.07
    const eased = (p) => (p < HOLD ? 0 : (p - HOLD) / (1 - HOLD))
    const totalScroll = () => distance() / (1 - HOLD)

    // Crossfade Ideas + Journey to dark together and KEEP them dark for the
    // whole horizontal scroll (approach + pin). The end is generous (covers
    // the pin distance plus the journey scrolling away) so the background
    // never flips back to white from the 2nd card onward.
    ScrollTrigger.create({
      trigger: journeyRef.value,
      start: 'top 70%',
      end: () => '+=' + (window.innerHeight * 2 + totalScroll()),
      onToggle: (self) => { journeyActive.value = self.isActive },
    })

    const horizontal = gsap.to(track, {
      x: () => -distance(),
      ease: eased,
      scrollTrigger: {
        trigger: journeyRef.value,
        start: 'top top',
        end: () => '+=' + totalScroll(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = eased(self.progress)
          journeyProgress.value = p
          activeRoom.value = Math.round(p * (panels.length - 1))
        },
      },
    })

    // Per-panel motion, all scrub-tied to the horizontal scroll so nothing
    // ever gets stuck hidden: when a panel is centered its content is fully
    // visible. This also fills the gaps between rooms so the transition isn't
    // empty.
    // Filler: subtle parallax drift on each SVG across its traversal. This is
    // transform-only (never touches opacity), so the text can't get hidden.
    panels.forEach((panel) => {
      gsap.fromTo(
        panel.querySelector('.rv'),
        { xPercent: 12 },
        {
          xPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontal,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        },
      )
    })

    // matchMedia auto-reverts everything created in this scope on cleanup.
  })

  // Mobile: no pin/horizontal scroll — the panels stack vertically, so the
  // crossfade just spans the (tall) stacked section.
  mm.add('(max-width: 1023px)', () => {
    ScrollTrigger.create({
      trigger: journeyRef.value,
      start: 'top 70%',
      end: 'bottom 30%',
      onToggle: (self) => { journeyActive.value = self.isActive },
    })
  })

  if (logosSecRef.value) {
    logosIo = new IntersectionObserver(
      ([entry]) => { logosActive.value = entry.isIntersecting },
      { threshold: 0.35 },
    )
    logosIo.observe(logosSecRef.value)
  }
})

onUnmounted(() => {
  if (mm) mm.revert()
  if (logosIo) logosIo.disconnect()
})
</script>

<style scoped>
/* ── Page root ── */
.page-root {
  overflow-x: clip;
}

/* ── Hero ── */
.hero-sec {
  background: var(--color-dark);
  position: relative;
  min-height: 100vh;
  width: 100%;
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
  padding-top: 8rem;
  padding-bottom: 5rem;
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
.btn-white {
  background: #ffffff !important; border-color: #ffffff !important; color: var(--color-dark) !important;
}
.btn-white:hover {
  background: rgba(255,255,255,0.88) !important; border-color: rgba(255,255,255,0.88) !important;
  transform: translateY(-1px);
}

/* ── Ideas + Stats ── */
.ideas-sec {
  background: var(--color-bg);
  transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
/* Darkens in sync with Mindset so there is no white/black seam between
   the two sections during the crossfade. */
.ideas-sec--dark {
  background: var(--color-dark);
}
.ideas-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: start;
}
@media (min-width: 1024px) {
  .ideas-inner {
    max-width: 1600px;
    grid-template-columns: 1.1fr 1fr;
    gap: 5rem;
    padding: 7rem 2.5rem;
    width: 100%;
    align-items: center;
  }
}
.ideas-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.ideas-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4.5vw, 3.5rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--color-text);
  line-height: 1.25;
}
.ideas-text {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--color-muted);
  max-width: 480px;
}
.ideas-right {
  width: 100%;
}
/* Vertical ticker viewport: clips the scrolling track and fades the
   top/bottom edges so items appear/disappear softly. */
.ideas-marquee {
  position: relative;
  height: 22rem;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 14%, #000 86%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 14%, #000 86%, transparent 100%);
}
@media (min-width: 1024px) {
  .ideas-marquee { height: 30rem; }
}
.ideas-track {
  display: flex;
  flex-direction: column;
  animation: ideas-scroll 48s linear infinite;
  will-change: transform;
}
/* Pause when hovering the ticker. */
.ideas-marquee:hover .ideas-track {
  animation-play-state: paused;
}
@keyframes ideas-scroll {
  from { transform: translateY(0); }
  to   { transform: translateY(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .ideas-track { animation: none; }
}
.ideas-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.4rem;
  /* Uniform vertical rhythm on every item (incl. the last) keeps the
     -50% loop seamless. */
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--color-border);
  cursor: default;
}
.ideas-sec--dark .ideas-stat {
  border-bottom-color: rgba(255, 255, 255, 0.12);
}
.ideas-stat-value {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
@media (min-width: 1024px) {
  .ideas-stat-value { font-size: clamp(2.75rem, 4vw, 4.5rem); }
}
.ideas-stat-label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
}

/* ── Journey (horizontal scroll) ──
   Desktop: .journey-sec is pinned at 100vh and GSAP translates .journey-track
   left through the 4 panels. The heading stays fixed (flex column), the track
   fills the rest. Mobile: the panels stack vertically (see media query). */
/* Starts white (matching Ideas) and crossfades to dark in sync with Ideas —
   driven by the same `journeyActive` flag — so the two sections cross the
   color together and no dividing line ever shows. */
.journey-sec {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: var(--color-bg);
  transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.journey-sec--dark {
  background: var(--color-dark);
}
.journey-stage {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}
/* Ambient drifting glow behind the rooms — fills the space during the
   horizontal transitions so it never feels empty. Pure CSS, never touches
   the content's visibility. */
.journey-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}
.journey-orb-1 {
  width: clamp(280px, 42vw, 640px);
  aspect-ratio: 1;
  background: radial-gradient(circle, rgba(112, 64, 172, 0.45) 0%, transparent 70%);
  top: -8%; left: -6%;
  animation: journey-orb-1 16s ease-in-out infinite;
}
.journey-orb-2 {
  width: clamp(220px, 34vw, 520px);
  aspect-ratio: 1;
  background: radial-gradient(circle, rgba(242, 119, 0, 0.32) 0%, transparent 70%);
  bottom: -10%; right: -6%;
  animation: journey-orb-2 20s ease-in-out infinite;
}
@keyframes journey-orb-1 {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(7vw, 5vh); }
}
@keyframes journey-orb-2 {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(-6vw, -4vh); }
}
.journey-heading {
  flex: 0 0 auto;
  text-align: center;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.5rem, 3.5vw, 3rem);
  letter-spacing: -0.03em;
  color: #ffffff;
  line-height: 1.2;
  max-width: 1000px;
  margin: 0 auto;
  padding: clamp(4.5rem, 9vh, 6.5rem) 1.5rem 0;
}
.journey-track {
  flex: 1 1 auto;
  display: flex;
  width: max-content;
  will-change: transform;
}
.journey-panel {
  flex: 0 0 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  padding: 1rem 1.5rem 7rem;
  text-align: center;
}
/* Sized by the SHORTER of width/height so the SVG never grows tall enough to
   push the title + description past the (clipped) bottom of the panel. */
.jp-visual {
  width: min(40vh, clamp(240px, 30vw, 440px));
  aspect-ratio: 1;
}
.jp-num {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  color: var(--color-accent-2);
}
.jp-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: #ffffff;
  line-height: 1;
}
.jp-line {
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  max-width: 34ch;
}
/* Progress lane + travelling Nuro face (guide) */
.journey-path {
  position: absolute;
  bottom: clamp(1.5rem, 4.5vh, 2.75rem);
  left: 50%;
  transform: translateX(-50%);
  width: min(680px, 78vw);
  height: 52px;
}
.journey-thread,
.journey-thread-fill {
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  border-radius: 2px;
  transform: translateY(-50%);
}
.journey-thread {
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
}
/* Width is set inline from the scroll progress. */
.journey-thread-fill {
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-2));
}
.journey-station {
  position: absolute;
  top: 50%;
  width: 9px; height: 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
  transform: translate(-50%, -50%);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.journey-station--on {
  background: var(--color-accent-2);
  box-shadow: 0 0 0 4px rgba(242, 119, 0, 0.18);
}
/* The face token. Left is set inline from the scroll progress. */
.journey-traveler {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
/* Cream disc gives the (black-mouthed) face contrast on the dark background. */
.tv-disc {
  width: 48px; height: 48px;
  border-radius: 999px;
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 4px rgba(112, 64, 172, 0.18),
              0 8px 22px rgba(242, 119, 0, 0.28);
  animation: tv-bob 2.6s ease-in-out infinite;
}
@keyframes tv-bob {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
.tv-face {
  width: 78%; height: 78%;
  object-fit: contain;
}

/* ── Journey SVG visuals (continuous, subtle, on-brand) ── */
.rv {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}
/* 01 Explore — planets orbiting the centre, each at its own speed (inner
   orbits faster, like a real planetary system). Rotating the group around
   (100,100) carries the planet around its ring. */
.ex-orbit {
  transform-box: view-box;
  transform-origin: 100px 100px;
}
.ex-o1 { animation: ex-orbit 7s linear infinite; }
.ex-o2 { animation: ex-orbit 11s linear infinite; }
.ex-o3 { animation: ex-orbit 16s linear infinite; }
.ex-o4 { animation: ex-orbit 11s linear infinite; animation-delay: -5.5s; }
@keyframes ex-orbit { to { transform: rotate(360deg); } }
.ex-sun { animation: jp-pulse 3s ease-in-out infinite; }
@keyframes jp-pulse { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
/* 02 Experiment — flow along the branching paths + pulsing endpoints */
.xp-path {
  stroke-dasharray: 6 8;
  animation: xp-flow 1.1s linear infinite;
}
.xp-d { animation-delay: 0.2s; }
@keyframes xp-flow { to { stroke-dashoffset: -14; } }
.xp-node { animation: jp-pulse 1.8s ease-in-out infinite; }
.xp-nd { animation-delay: 0.45s; }
/* 03 Learn — bars breathing + line drawing itself */
.ln-bar {
  transform-box: fill-box;
  transform-origin: bottom;
  animation: ln-grow 3s ease-in-out infinite;
}
.ln-d1 { animation-delay: 0.2s; }
.ln-d2 { animation-delay: 0.4s; }
.ln-d3 { animation-delay: 0.6s; }
.ln-d4 { animation-delay: 0.8s; }
@keyframes ln-grow { 0%, 100% { transform: scaleY(0.55); } 50% { transform: scaleY(1); } }
.ln-line {
  stroke-dasharray: 360;
  stroke-dashoffset: 360;
  animation: ln-draw 3.6s ease-in-out infinite;
}
@keyframes ln-draw {
  0%   { stroke-dashoffset: 360; }
  40%  { stroke-dashoffset: 0; }
  75%  { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -360; }
}
/* 04 Scale — concentric rings expanding outward + bobbing arrow */
.sc-ring {
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: sc-expand 3s ease-out infinite;
}
.sc-d1 { animation-delay: 1s; }
.sc-d2 { animation-delay: 2s; }
@keyframes sc-expand {
  0%   { transform: scale(0.4); opacity: 0.9; }
  100% { transform: scale(3.6); opacity: 0; }
}
.sc-arrow {
  transform-box: fill-box;
  transform-origin: center;
  animation: sc-bob 2s ease-in-out infinite;
}
@keyframes sc-bob { 0%, 100% { transform: translateY(2px); } 50% { transform: translateY(-3px); } }

/* Mobile: stack the panels vertically; no pin / horizontal translate. */
@media (max-width: 1023px) {
  .journey-sec { height: auto; overflow: visible; }
  .journey-stage { height: auto; }
  .journey-heading { padding: 4rem 1.5rem 0; }
  .journey-track {
    flex-direction: column;
    width: 100%;
    transform: none !important;
  }
  .journey-panel {
    flex: none;
    width: 100%;
    min-height: 78vh;
  }
  .journey-path { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .rv * { animation: none !important; }
  .journey-orb { animation: none !important; }
  .tv-disc { animation: none !important; }
}

/* ── Portfolio logos marquee ── */
/* Starts black (matching Mindset) and crossfades to white on entry, in
   sync with Mindset returning to white — so the seam never shows. */
.logos-sec {
  background: var(--color-dark);
  transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 6rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logos-sec--light {
  background: var(--color-bg);
}
.logos-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  text-align: center;
  width: 100%;
}
/* Same look as the Mindset statement title; white on the black phase,
   dark once the section crossfades to white. */
.logos-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4.5vw, 3.5rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  color: #ffffff;
  line-height: 1.25;
  max-width: 880px;
  transition: color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.logos-sec--light .logos-title {
  color: var(--color-text);
}
/* Horizontal ticker viewport: clips the scrolling track and fades the
   left/right edges so logos appear/disappear softly. */
.logos-marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
}
.logos-track {
  display: flex;
  align-items: center;
  width: max-content;
  animation: logos-scroll 40s linear infinite;
  will-change: transform;
}
/* Pause when hovering the ticker. */
.logos-marquee:hover .logos-track {
  animation-play-state: paused;
}
/* Track holds two copies; starting at -50% and moving to 0 makes the
   logos travel left→right seamlessly. */
@keyframes logos-scroll {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .logos-track { animation: none; }
}
.logo-item {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 clamp(2rem, 5vw, 4.5rem);
}
.logo-img {
  height: clamp(2.5rem, 5vw, 4rem);
  width: auto;
  object-fit: contain;
  opacity: 0.55;
  filter: grayscale(100%);
  transition: opacity 0.3s ease, filter 0.3s ease;
}
.logo-item:hover .logo-img {
  opacity: 1;
  filter: none;
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
  background: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(112,64,172,0.4);
}
</style>

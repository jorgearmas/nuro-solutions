<template>
  <div class="cd-page">
    <AppNavbar />

    <!-- ── 1. Hero ────────────────────────────────────────── -->
    <section class="snap-sec page-hero">
      <video class="hero-bg-video" autoplay muted loop playsinline preload="auto" aria-hidden="true">
        <source src="https://res.cloudinary.com/dpi6oudmk/video/upload/v1784681649/Background_Core_Drivers_mlkoqm.mp4" type="video/mp4" />
      </video>
      <div class="hero-bg-overlay" aria-hidden="true"></div>
      <div class="orb" aria-hidden="true"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 w-full">
        <div class="section-tag"><span class="glow-dot"></span>Core Drivers</div>
        <h1 class="text-5xl lg:text-7xl font-display mb-6 max-w-3xl">
          The art and science<br />of <em class="accent-em">intentional growth.</em>
        </h1>
        <p class="text-muted text-lg max-w-xl leading-relaxed">
          Three integrated disciplines that power every campaign we build.
          Together they form the Nuro system, where creativity meets data, and
          strategy meets scale.
        </p>
      </div>
    </section>

    <!-- ── 2. Drivers ─────────────────────────────────────── -->
    <section class="snap-sec drivers-section">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div class="space-y-24">
          <div
            v-for="(driver, i) in drivers"
            :key="driver.title"
            class="driver-section"
            :class="i % 2 === 1 ? 'driver-section--reverse' : ''"
          >
            <div class="driver-num-bg">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="driver-content">
              <div class="section-tag mb-6"><span class="glow-dot"></span>Driver {{ String(i + 1).padStart(2, '0') }}</div>
              <h2 class="font-display text-4xl lg:text-5xl mb-6">{{ driver.title }}</h2>
              <p class="text-muted leading-relaxed mb-8 text-lg">{{ driver.description }}</p>
              <ul class="driver-points">
                <li v-for="point in driver.points" :key="point" class="driver-point">
                  <span class="glow-dot"></span>
                  {{ point }}
                </li>
              </ul>
            </div>
            <div class="driver-visual">
              <div class="driver-card-visual" v-html="driver.visual"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 3. Together + CTA + Footer ────────────────────── -->
    <section class="snap-sec together-section">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 w-full space-y-8 py-16">

        <!-- Together block -->
        <div class="together-card">
          <div class="section-tag justify-center mb-4"><span class="glow-dot"></span>The System</div>
          <h2 class="font-display text-4xl lg:text-5xl mb-6 text-center">Stronger together.</h2>
          <p class="text-muted text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            Each driver amplifies the others. Analytical Targeting informs Creative Integration,
            which is measured and scaled through Automation & Data. The result: a self-reinforcing
            growth engine that gets smarter over time.
          </p>
          <div class="flow-diagram">
            <div v-for="(step, i) in flowSteps" :key="step" class="flow-step">
              <div class="flow-bubble">{{ step }}</div>
              <svg v-if="i < flowSteps.length - 1" class="flow-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-row">
          <div>
            <h2 class="font-display text-3xl lg:text-4xl mb-3">Ready to put the system to work?</h2>
            <p class="text-muted">Let's talk about your brand and which drivers apply to you first.</p>
          </div>
          <NuxtLink to="/contact" class="btn-primary shrink-0">Book a Call →</NuxtLink>
        </div>
      </div>
      <AppFooter />
    </section>

  </div>
</template>

<script setup>
const drivers = [
  {
    title: 'Analytical Targeting',
    description: 'Great marketing isn\'t about interruption, it\'s about resonance. We study your audience\'s motivations, fears, and desires to craft messaging that feels personal, not promotional. By combining consumer psychology with behavioral data, we build campaigns that your audience actually feels.',
    points: [
      'Audience archetype mapping',
      'Emotional trigger identification',
      'Message-to-market fit analysis',
      'Behavioral segmentation',
      'Journey-stage personalization',
    ],
    visual: `
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:8px;">
          <div style="width:40px;height:40px;border-radius:50%;background:var(--color-accent-glow);border:1px solid var(--color-accent);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:0.75rem;color:var(--color-accent);font-weight:700;">A1</div>
          <div style="flex:1;">
            <div style="font-family:var(--font-display);font-size:0.875rem;margin-bottom:4px;">High-Intent Decision Maker</div>
            <div style="height:4px;background:var(--color-border);border-radius:2px;"><div style="width:85%;height:100%;background:var(--color-accent);border-radius:2px;"></div></div>
          </div>
          <span style="font-family:var(--font-display);font-size:0.75rem;color:var(--color-accent);">85%</span>
        </div>
        <div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:8px;">
          <div style="width:40px;height:40px;border-radius:50%;background:rgba(37,99,235,0.06);border:1px solid var(--color-border);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:0.75rem;color:var(--color-muted);font-weight:700;">A2</div>
          <div style="flex:1;">
            <div style="font-family:var(--font-display);font-size:0.875rem;color:var(--color-muted);margin-bottom:4px;">Research-Phase Buyer</div>
            <div style="height:4px;background:var(--color-border);border-radius:2px;"><div style="width:62%;height:100%;background:var(--color-muted);border-radius:2px;"></div></div>
          </div>
          <span style="font-family:var(--font-display);font-size:0.75rem;color:var(--color-muted);">62%</span>
        </div>
        <div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:8px;">
          <div style="width:40px;height:40px;border-radius:50%;background:rgba(37,99,235,0.06);border:1px solid var(--color-border);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:0.75rem;color:var(--color-muted);font-weight:700;">A3</div>
          <div style="flex:1;">
            <div style="font-family:var(--font-display);font-size:0.875rem;color:var(--color-muted);margin-bottom:4px;">Awareness Stage Lead</div>
            <div style="height:4px;background:var(--color-border);border-radius:2px;"><div style="width:38%;height:100%;background:var(--color-border);border-radius:2px;"></div></div>
          </div>
          <span style="font-family:var(--font-display);font-size:0.75rem;color:var(--color-muted);">38%</span>
        </div>
      </div>
    `
  },
  {
    title: 'Creative Integration',
    description: 'We believe the artificial divide between creative and strategy kills campaigns. At Nuro, our creative team and strategists work as one. Every asset, every message, every visual is designed with purpose, cohesive across channels and calibrated for performance.',
    points: [
      'Cross-channel brand consistency',
      'Strategy-informed creative briefs',
      'Multi-format content production',
      'A/B creative testing frameworks',
      'Performance creative iteration',
    ],
    visual: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
        <div style="padding:1rem;background:var(--color-surface-2);border:1px solid var(--color-accent);border-radius:8px;text-align:center;">
          <div style="font-family:var(--font-display);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent);margin-bottom:0.5rem;">Strategy</div>
          <div style="font-size:0.8rem;color:var(--color-muted);">Audience insight, channel mix, funnel mapping</div>
        </div>
        <div style="padding:1rem;background:var(--color-surface-2);border:1px solid var(--color-accent);border-radius:8px;text-align:center;">
          <div style="font-family:var(--font-display);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent);margin-bottom:0.5rem;">Creative</div>
          <div style="font-size:0.8rem;color:var(--color-muted);">Copy, design, video, motion</div>
        </div>
        <div style="grid-column:1/-1;padding:1.25rem;background:var(--color-accent-glow);border:1px solid var(--color-accent);border-radius:8px;text-align:center;">
          <div style="font-family:var(--font-display);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent);margin-bottom:0.25rem;">Result</div>
          <div style="font-family:var(--font-display);font-size:1rem;color:var(--color-text);">Cohesive Brand System</div>
        </div>
      </div>
    `
  },
  {
    title: 'Automation & Data-Driven',
    description: 'Intuition starts campaigns. Data wins them. We build automation frameworks that nurture leads at scale without losing the human touch, and pair them with real-time analytics that make every optimization decision faster, clearer, and more confident.',
    points: [
      'Lead nurture automation flows',
      'Real-time performance dashboards',
      'Multi-touch attribution modeling',
      'Predictive audience modeling',
      'Continuous optimization loops',
    ],
    visual: `
      <div style="display:flex;flex-direction:column;align-items:center;gap:0;">

        <div style="width:100%;display:flex;justify-content:space-between;align-items:center;padding:0.7rem 1rem;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:6px 6px 0 0;font-size:0.8rem;">
          <span style="color:var(--color-muted);font-family:var(--font-display);">Lead entered funnel</span>
          <span style="color:var(--color-accent);font-family:var(--font-display);font-size:0.7rem;">AUTO</span>
        </div>
        <div style="width:0;height:0;border-left:12px solid transparent;border-right:12px solid transparent;border-top:10px solid var(--color-border);margin:0 auto;"></div>

        <div style="width:83%;display:flex;justify-content:space-between;align-items:center;padding:0.7rem 1rem;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:6px 6px 0 0;font-size:0.8rem;">
          <span style="color:var(--color-muted);font-family:var(--font-display);">Segment identified</span>
          <span style="color:var(--color-accent);font-family:var(--font-display);font-size:0.7rem;">AUTO</span>
        </div>
        <div style="width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-top:10px solid var(--color-border);margin:0 auto;"></div>

        <div style="width:66%;display:flex;justify-content:space-between;align-items:center;padding:0.7rem 1rem;background:var(--color-accent-glow);border:1px solid var(--color-accent);border-radius:6px 6px 0 0;font-size:0.8rem;">
          <span style="color:var(--color-text);font-family:var(--font-display);">Personalized sequence sent</span>
          <span style="color:var(--color-accent);font-family:var(--font-display);font-size:0.7rem;">✓ LIVE</span>
        </div>
        <div style="width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:10px solid var(--color-accent);opacity:0.5;margin:0 auto;"></div>

        <div style="width:49%;display:flex;justify-content:space-between;align-items:center;padding:0.7rem 1rem;background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:0 0 6px 6px;font-size:0.8rem;">
          <span style="color:var(--color-muted);font-family:var(--font-display);">Conversion tracked → optimize</span>
          <span style="color:var(--color-accent);font-family:var(--font-display);font-size:0.7rem;">LOOP</span>
        </div>
      </div>
    `
  },
]

const flowSteps = ['Analytical Targeting', 'Creative Integration', 'Automation & Data', 'Measurable Growth']
</script>

<style scoped>
/* ── Scroll container con snap ───────────────── */
.cd-page {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y proximity;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.cd-page::-webkit-scrollbar { display: none; }

/* ── Snap ────────────────────────────────────── */
.snap-sec {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* ── Hero ────────────────────────────────────── */
.page-hero {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-dark);
}
.hero-bg-video {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  z-index: 0;
}
.hero-bg-overlay {
  position: absolute; inset: 0;
  z-index: 1;
  background: rgba(10, 10, 15, 0.82);
}
.orb {
  position: absolute;
  top: -100px; right: 0;
  width: 500px; height: 500px;
  border-radius: 50%;
  filter: blur(120px);
  background: radial-gradient(circle, rgba(112,64,172,0.12) 0%, transparent 70%);
  pointer-events: none;
  z-index: 2;
}
.page-hero h1 { color: #ffffff; }
.page-hero p { color: rgba(255, 255, 255, 0.72); }
.accent-em {
  font-style: italic;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Drivers section ─────────────────────────── */
.drivers-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: 6rem 0;
}
.driver-section {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}
@media (max-width: 1024px) {
  .driver-section { grid-template-columns: 1fr; }
}
.driver-section--reverse .driver-content { order: 2; }
.driver-section--reverse .driver-visual  { order: 1; }
@media (max-width: 1024px) {
  .driver-section--reverse .driver-content,
  .driver-section--reverse .driver-visual { order: unset; }
}
.driver-num-bg {
  position: absolute;
  top: -1rem; right: -1rem; left: auto;
  font-family: var(--font-display);
  font-size: 8rem;
  font-weight: 800;
  color: var(--color-border);
  line-height: 1;
  user-select: none;
  pointer-events: none;
}
/* Reversed: visual is on the left, so number goes left too */
.driver-section--reverse .driver-num-bg {
  left: -1rem; right: auto;
}
/* Mobile: número detrás del título → ocultarlo */
@media (max-width: 1024px) {
  .driver-num-bg { display: none; }
}
.driver-points { display: flex; flex-direction: column; gap: 0.75rem; list-style: none; padding: 0; }
.driver-point {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  font-size: 0.875rem;
  color: var(--color-muted);
}
.driver-visual {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2.5rem;
}

/* ── Together + CTA section ──────────────────── */
.together-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}
.together-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 4rem;
}
.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}
.flow-step  { display: flex; align-items: center; gap: 1rem; }
.flow-bubble {
  padding: 0.75rem 1.5rem;
  background: var(--color-bg);
  border: 1px solid var(--color-accent);
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--color-accent);
  white-space: nowrap;
}
.flow-arrow {
  width: 20px; height: 20px;
  color: var(--color-accent);
  opacity: 0.5;
  animation: arrow-pulse 1.4s ease-in-out infinite;
}
.flow-step:nth-child(2) .flow-arrow { animation-delay: 0.18s; }
.flow-step:nth-child(3) .flow-arrow { animation-delay: 0.36s; }

@keyframes arrow-pulse {
  0%   { transform: translateX(0);    opacity: 0.3; }
  50%  { transform: translateX(5px);  opacity: 0.9; }
  100% { transform: translateX(0);    opacity: 0.3; }
}

/* Mobile: diagrama vertical, flechas apuntan hacia abajo */
@media (max-width: 768px) {
  .flow-diagram {
    flex-direction: column;
    align-items: center;
  }
  .flow-step {
    flex-direction: column;
    align-items: center;
  }
  .flow-arrow {
    transform: rotate(90deg);
    animation: arrow-pulse-down 1.4s ease-in-out infinite;
  }
  .flow-step:nth-child(2) .flow-arrow { animation-delay: 0.18s; }
  .flow-step:nth-child(3) .flow-arrow { animation-delay: 0.36s; }

  @keyframes arrow-pulse-down {
    0%   { transform: rotate(90deg) translateX(0);    opacity: 0.3; }
    50%  { transform: rotate(90deg) translateX(5px);  opacity: 0.9; }
    100% { transform: rotate(90deg) translateX(0);    opacity: 0.3; }
  }
}
.cta-row {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 3rem;
}
@media (min-width: 1024px) {
  .cta-row { flex-direction: row; align-items: center; justify-content: space-between; }
}
</style>

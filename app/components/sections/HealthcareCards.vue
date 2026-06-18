<template>
  <div class="hc-wrap w-full max-w-7xl mx-auto px-6 lg:px-10" ref="rootRef">
    <!-- ── Stats band ─────────────────────────────── -->
    <div class="hc-stats">
      <div v-for="(s, i) in stats" :key="s.label" class="hc-stat">
        <span class="hc-stat-value">{{ s.prefix }}{{ display[i] }}{{ s.suffix }}</span>
        <span class="hc-stat-label">{{ s.label }}</span>
      </div>
    </div>

    <!-- ── ECG / heartbeat line ───────────────────── -->
    <div class="hc-ecg" aria-hidden="true">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path class="hc-ecg-base" :d="ecgPath" />
        <path class="hc-ecg-pulse" :d="ecgPath" pathLength="100" />
      </svg>
    </div>

    <!-- ── Cards ──────────────────────────────────── -->
    <div class="hc-grid">
      <article v-for="card in cards" :key="card.title" class="hc-card">
        <div class="hc-icon" v-html="card.icon"></div>
        <p class="hc-card-title">{{ card.title }}</p>
        <p class="hc-card-subtitle">{{ card.subtitle }}</p>
        <p class="hc-card-body">{{ card.body }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({ cards: { type: Array, default: () => [] } })

/* Three flat segments joined by heartbeat spikes, full-width. */
const ecgPath =
  'M0,60 H120 l12,-4 l8,8 l10,-42 l10,76 l10,-38 l8,0 ' +
  'H520 l12,-4 l8,8 l10,-42 l10,76 l10,-38 l8,0 ' +
  'H920 l12,-4 l8,8 l10,-42 l10,76 l10,-38 l8,0 H1200'

const stats = [
  { target: 40, prefix: '+', suffix: '%', label: 'Patient acquisition growth' },
  { target: 100, prefix: '', suffix: '%', label: 'HIPAA-compliant systems' },
  { target: 24, prefix: '', suffix: '/7', label: 'Automated patient intake' },
]

const display = ref(stats.map(() => 0))
const rootRef = ref(null)
let io = null
let counted = false

function runCountUp() {
  const duration = 1500
  const start = performance.now()
  const ease = (t) => 1 - Math.pow(1 - t, 3) // easeOutCubic
  function frame(now) {
    const t = Math.min((now - start) / duration, 1)
    const k = ease(t)
    display.value = stats.map((s) => Math.round(s.target * k))
    if (t < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    display.value = stats.map((s) => s.target)
    return
  }
  if (!rootRef.value) return
  io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !counted) {
        counted = true
        runCountUp()
      }
    },
    { threshold: 0.4 },
  )
  io.observe(rootRef.value)
})

onUnmounted(() => { if (io) io.disconnect() })
</script>

<style scoped>
.hc-wrap {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* ── Stats ─────────────────────────────────────── */
.hc-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
}
@media (max-width: 640px) {
  .hc-stats { grid-template-columns: 1fr; gap: 1.5rem; }
}
.hc-stat {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.hc-stat-value {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.6rem, 6vw, 4rem);
  line-height: 1;
  color: var(--ind-color, #0ea5e9);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}
.hc-stat-label {
  font-size: 0.85rem;
  color: var(--color-muted);
  letter-spacing: 0.01em;
}

/* ── ECG line ──────────────────────────────────── */
.hc-ecg {
  width: 100%;
  height: 70px;
  position: relative;
}
.hc-ecg svg {
  width: 100%;
  height: 100%;
  display: block;
}
.hc-ecg-base {
  fill: none;
  stroke: rgba(var(--ind-rgb, 14, 165, 233), 0.18);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}
.hc-ecg-pulse {
  fill: none;
  stroke: var(--ind-color, #0ea5e9);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 14 86;
  filter: drop-shadow(0 0 6px rgba(var(--ind-rgb, 14, 165, 233), 0.7));
  animation: hc-sweep 2.8s linear infinite;
}
@keyframes hc-sweep {
  from { stroke-dashoffset: 100; }
  to   { stroke-dashoffset: 0; }
}

/* ── Cards ─────────────────────────────────────── */
.hc-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
.hc-card {
  background: var(--color-surface);
  border: 1px solid rgba(var(--ind-rgb, 14, 165, 233), 0.18);
  border-radius: 14px;
  padding: 2rem;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}
.hc-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--ind-rgb, 14, 165, 233), 0.5);
  box-shadow: 0 12px 36px rgba(var(--ind-rgb, 14, 165, 233), 0.14);
}
.hc-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: rgba(var(--ind-rgb, 14, 165, 233), 0.1);
  border: 1px solid rgba(var(--ind-rgb, 14, 165, 233), 0.2);
  color: var(--ind-color, #0ea5e9);
  margin-bottom: 1.5rem;
}
.hc-card-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}
.hc-card-subtitle {
  font-size: 0.85rem;
  color: var(--ind-color, #0ea5e9);
  line-height: 1.5;
  margin: 0 0 0.75rem;
  font-weight: 500;
}
.hc-card-body {
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .hc-ecg-pulse { animation: none; }
  .hc-card { transition: none; }
}
</style>

<template>
  <div
    class="rt-wrap w-full max-w-7xl mx-auto px-6 lg:px-10"
    :class="{ 'rt-active': active }"
    ref="rootRef"
  >
    <!-- ── Sales chart ────────────────────────────── -->
    <div class="rt-stage">
    <div class="rt-chart">
      <svg class="rt-svg" :viewBox="`0 0 ${vbW} 224`" aria-hidden="true">
        <!-- baseline -->
        <line class="rt-axis" :x1="0" y1="200" :x2="vbW" y2="200" />

        <!-- bars -->
        <rect
          v-for="(b, bi) in bars"
          :key="`b${bi}`"
          class="rt-bar"
          :x="b.x" :y="b.top" :width="BW" :height="b.h" rx="4"
          :style="{ '--d': b.d + 's' }"
        />

        <!-- trend line -->
        <polyline
          class="rt-line"
          :points="points"
          pathLength="100"
        />

        <!-- vertices -->
        <circle
          v-for="(p, pi) in dots"
          :key="`p${pi}`"
          class="rt-vertex"
          :class="{ 'rt-vertex--last': pi === dots.length - 1 }"
          :cx="p.cx" :cy="p.cy" r="4"
          :style="{ '--vd': p.d + 's' }"
        />
      </svg>
    </div>

      <!-- side ambience: floating gains -->
      <div class="rt-fx">
        <span
          v-for="(p, pi) in pops"
          :key="`pop${pi}`"
          class="rt-pop"
          :style="{ left: p.left + '%', top: p.top + '%', '--delay': p.delay + 's', '--dur': p.dur + 's' }"
        >{{ p.v }}</span>
      </div>
    </div>

    <!-- ── Cards ──────────────────────────────────── -->
    <div class="rt-grid">
      <article v-for="card in cards" :key="card.title" class="rt-card">
        <div class="rt-icon" v-html="card.icon"></div>
        <p class="rt-card-title">{{ card.title }}</p>
        <p class="rt-card-subtitle">{{ card.subtitle }}</p>
        <p class="rt-card-body">{{ card.body }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({ cards: { type: Array, default: () => [] } })

/* ── Chart layout (deterministic → SSR-safe) ───── */
const BASE_Y = 200
const PAD = 34
const BW = 26
const GAP = 18
const heights = [62, 90, 74, 116, 100, 142, 128, 172]

const bars = heights.map((h, i) => {
  const x = PAD + i * (BW + GAP)
  return { x, h, top: BASE_Y - h, d: +(i * 0.1).toFixed(2) }
})
const vbW = PAD + heights.length * (BW + GAP) - GAP + PAD
const points = bars.map((b) => `${b.x + BW / 2},${b.top - 8}`).join(' ')
const dots = bars.map((b, i) => ({
  cx: b.x + BW / 2,
  cy: b.top - 8,
  d: +(1.5 + i * 0.08).toFixed(2),
}))

/* Floating "+$" gains that pop in random-ish spots (including the sides),
   rise and fade on desynced loops. Deterministic timings → SSR-safe. */
const pops = [
  { v: '+$200',   left: 18, top: 30, delay: 0.4, dur: 3.2 },
  { v: '+$580',   left: 60, top: 16, delay: 1.6, dur: 3.6 },
  { v: '+$1,240', left: 42, top: 40, delay: 2.7, dur: 3.0 },
  { v: '+$90',    left: 78, top: 46, delay: 0.9, dur: 2.8 },
  { v: '+$760',   left: 30, top: 12, delay: 3.4, dur: 3.4 },
  { v: '+$3,400', left: 52, top: 30, delay: 4.3, dur: 3.2 },
  // sides
  { v: '+$310',   left: 4,  top: 22, delay: 1.1, dur: 3.3 },
  { v: '+$1,020', left: 6,  top: 64, delay: 2.4, dur: 3.5 },
  { v: '+$420',   left: 9,  top: 44, delay: 3.9, dur: 3.0 },
  { v: '+$95',    left: 92, top: 56, delay: 0.7, dur: 2.9 },
  { v: '+$640',   left: 90, top: 18, delay: 2.0, dur: 3.1 },
  { v: '+$150',   left: 94, top: 36, delay: 4.6, dur: 2.7 },
]

const active = ref(false)
const rootRef = ref(null)
let io = null

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) { active.value = true; return }
  if (!rootRef.value) return
  io = new IntersectionObserver(
    ([entry]) => { active.value = entry.isIntersecting },
    { threshold: 0.35 },
  )
  io.observe(rootRef.value)
})

onUnmounted(() => { if (io) io.disconnect() })
</script>

<style scoped>
.rt-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

/* ── Chart ─────────────────────────────────────── */
.rt-stage {
  width: 100%;
  max-width: 780px;
  position: relative;
  display: flex;
  justify-content: center;
}
.rt-chart {
  width: 100%;
  max-width: 520px;
}

/* ── Side ambience: floating gains + coins ─────── */
.rt-fx {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.rt-pop {
  position: absolute;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(0.85rem, 1.6vw, 1.15rem);
  color: #9ca3af;
  opacity: 0;
  white-space: nowrap;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
}
.rt-active .rt-pop {
  animation: rt-pop var(--dur, 3s) ease-out var(--delay, 0s) infinite;
}
@keyframes rt-pop {
  0%   { opacity: 0; transform: translateY(12px) scale(0.8); }
  16%  { opacity: 1; transform: translateY(0) scale(1); }
  68%  { opacity: 1; transform: translateY(-18px) scale(1); }
  100% { opacity: 0; transform: translateY(-46px) scale(0.95); }
}
.rt-svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}
.rt-axis {
  stroke: rgba(var(--ind-rgb, 239, 68, 68), 0.25);
  stroke-width: 2;
  stroke-linecap: round;
}

/* bars rise from the baseline */
.rt-bar {
  fill: rgba(var(--ind-rgb, 239, 68, 68), 0.78);
  transform-box: fill-box;
  transform-origin: 50% 100%;
  transform: scaleY(0);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--d, 0s);
}
.rt-active .rt-bar { transform: scaleY(1); }

/* trend line draws itself after the bars */
.rt-line {
  fill: none;
  stroke: var(--ind-color, #ef4444);
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  transition: stroke-dashoffset 1.3s ease;
  transition-delay: 1.3s;
  filter: drop-shadow(0 2px 6px rgba(var(--ind-rgb, 239, 68, 68), 0.35));
}
.rt-active .rt-line { stroke-dashoffset: 0; }

/* vertices pop in along the line */
.rt-vertex {
  fill: #fff;
  stroke: var(--ind-color, #ef4444);
  stroke-width: 3;
  transform-box: fill-box;
  transform-origin: 50% 50%;
  transform: scale(0);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--vd, 0s);
}
.rt-active .rt-vertex { transform: scale(1); }
.rt-active .rt-vertex--last {
  animation: rt-pulse 1.8s ease-in-out 2.4s infinite;
}
@keyframes rt-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.5); }
}

/* ── Cards ─────────────────────────────────────── */
.rt-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
}
.rt-card {
  background: var(--color-surface);
  border: 1px solid rgba(var(--ind-rgb, 239, 68, 68), 0.18);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.4s, border-color 0.4s, box-shadow 0.4s;
}
.rt-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--ind-rgb, 239, 68, 68), 0.5);
  box-shadow: 0 14px 40px rgba(var(--ind-rgb, 239, 68, 68), 0.16);
}
.rt-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(var(--ind-rgb, 239, 68, 68), 0.1);
  border: 1px solid rgba(var(--ind-rgb, 239, 68, 68), 0.2);
  color: var(--ind-color, #ef4444);
  margin-bottom: 1.5rem;
}
.rt-card-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}
.rt-card-subtitle {
  font-size: 0.85rem;
  color: var(--ind-color, #ef4444);
  line-height: 1.5;
  margin: 0 0 0.75rem;
  font-weight: 500;
}
.rt-card-body {
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .rt-bar, .rt-line, .rt-vertex { transition: none; }
  .rt-active .rt-vertex--last { animation: none; }
  .rt-active .rt-pop { animation: none; }
  .rt-card { transition: none; }
}
</style>

<template>
  <div
    class="re-wrap w-full max-w-7xl mx-auto px-6 lg:px-10"
    :class="{ 're-built': built }"
    ref="rootRef"
  >
    <!-- ── Skyline (builds up on scroll) ──────────── -->
    <div class="re-skyline" aria-hidden="true">
      <svg :viewBox="`0 0 ${vbWidth} 270`" preserveAspectRatio="xMidYEnd meet">
        <!-- ground -->
        <line class="re-ground" x1="0" :y1="BASE_Y" :x2="vbWidth" :y2="BASE_Y" />

        <g
          v-for="(b, bi) in buildings"
          :key="bi"
          class="re-bld"
          :class="{ 're-bld--alt': bi % 2 === 1 }"
          :style="{ '--d': b.delay + 's' }"
        >
          <rect
            class="re-body"
            :x="b.x" :y="b.topY" :width="b.w" :height="b.h"
            rx="2"
          />
          <rect
            v-for="(w, wi) in b.windows"
            :key="wi"
            class="re-win"
            :class="{ 're-win--flick': w.flick }"
            :x="w.x" :y="w.y" :width="w.w" :height="w.h"
            rx="1"
            :style="{ transitionDelay: w.d + 's', '--td': w.td + 's', '--tdelay': w.tdelay + 's' }"
          />
        </g>
      </svg>
    </div>

    <!-- ── Cards ──────────────────────────────────── -->
    <div class="re-grid">
      <article v-for="card in cards" :key="card.title" class="re-card">
        <div class="re-icon" v-html="card.icon"></div>
        <p class="re-card-title">{{ card.title }}</p>
        <p class="re-card-subtitle">{{ card.subtitle }}</p>
        <p class="re-card-body">{{ card.body }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({ cards: { type: Array, default: () => [] } })

/* ── Skyline layout (deterministic → SSR-safe) ─── */
const BASE_Y = 250
const GAP = 12
const PAD = 16

const defs = [
  { w: 46, h: 118, cols: 2, rows: 5 },
  { w: 38, h: 172, cols: 2, rows: 7 },
  { w: 56, h: 92,  cols: 3, rows: 3 },
  { w: 40, h: 212, cols: 2, rows: 9 },
  { w: 52, h: 140, cols: 3, rows: 5 },
  { w: 36, h: 100, cols: 2, rows: 4 },
  { w: 48, h: 182, cols: 3, rows: 7 },
]

let cursor = PAD
const buildings = defs.map((b, bi) => {
  const x = cursor
  cursor += b.w + GAP
  const topY = BASE_Y - b.h
  const wp = 8        // inner side padding
  const wgap = 6      // gap between windows
  const rowGap = 8
  const areaW = b.w - wp * 2
  const winW = (areaW - wgap * (b.cols - 1)) / b.cols
  const winH = Math.min(winW * 1.25, 11)
  const windows = []
  for (let r = 0; r < b.rows; r++) {
    for (let c = 0; c < b.cols; c++) {
      const wy = topY + 12 + r * (winH + rowGap)
      if (wy + winH > BASE_Y - 8) continue
      const idx = r * 7 + c * 3 + bi * 11
      windows.push({
        x: x + wp + c * (winW + wgap),
        y: wy,
        w: winW,
        h: winH,
        // light up after the building has risen, staggered deterministically
        d: bi * 0.1 + 0.55 + ((r * 7 + c * 3) % 5) * 0.12,
        // ~43% of windows keep toggling on/off at slow, desynced intervals
        flick: idx % 7 < 3,
        td: 6 + (idx % 5) * 1.6,        // cycle length 6–12.4s
        tdelay: -((idx % 9) * 1.3),     // negative offset → desynced phases
      })
    }
  }
  return { x, topY, w: b.w, h: b.h, windows, delay: bi * 0.1 }
})
const vbWidth = cursor - GAP + PAD

/* ── Trigger on scroll ─────────────────────────── */
const built = ref(false)
const rootRef = ref(null)
let io = null

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) { built.value = true; return }
  if (!rootRef.value) return
  io = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { built.value = true; io.disconnect() } },
    { threshold: 0.35 },
  )
  io.observe(rootRef.value)
})

onUnmounted(() => { if (io) io.disconnect() })
</script>

<style scoped>
.re-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

/* ── Skyline ───────────────────────────────────── */
.re-skyline {
  width: 100%;
  max-width: 760px;
}
.re-skyline svg {
  width: 100%;
  height: auto;
  display: block;
}
.re-ground {
  stroke: rgba(var(--ind-rgb, 245, 158, 11), 0.35);
  stroke-width: 3;
  stroke-linecap: round;
}

/* buildings rise from the ground */
.re-bld {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  transform: scaleY(0);
  transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--d, 0s);
}
.re-built .re-bld { transform: scaleY(1); }

.re-body {
  fill: rgba(var(--ind-rgb, 245, 158, 11), 0.12);
  stroke: rgba(var(--ind-rgb, 245, 158, 11), 0.45);
  stroke-width: 1.5;
}
.re-bld--alt .re-body {
  fill: rgba(var(--ind-rgb, 245, 158, 11), 0.07);
}

/* windows light up */
.re-win {
  fill: rgba(var(--ind-rgb, 245, 158, 11), 0.18);
  transition: fill 0.45s ease;
}
.re-built .re-win {
  fill: var(--ind-color, #f59e0b);
  filter: drop-shadow(0 0 3px rgba(var(--ind-rgb, 245, 158, 11), 0.7));
}
/* living city: some windows keep toggling on/off, slow and desynced */
.re-built .re-win--flick {
  animation: re-twinkle var(--td, 8s) ease-in-out var(--tdelay, 0s) infinite;
}
@keyframes re-twinkle {
  0%, 42%   { opacity: 1; }
  50%, 66%  { opacity: 0.1; }
  74%, 100% { opacity: 1; }
}

/* ── Cards ─────────────────────────────────────── */
.re-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
}
.re-card {
  background: var(--color-surface);
  border: 1px solid rgba(var(--ind-rgb, 245, 158, 11), 0.18);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.4s, border-color 0.4s, box-shadow 0.4s;
}
.re-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--ind-rgb, 245, 158, 11), 0.5);
  box-shadow: 0 14px 40px rgba(var(--ind-rgb, 245, 158, 11), 0.16);
}
.re-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(var(--ind-rgb, 245, 158, 11), 0.1);
  border: 1px solid rgba(var(--ind-rgb, 245, 158, 11), 0.2);
  color: var(--ind-color, #f59e0b);
  margin-bottom: 1.5rem;
}
.re-card-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}
.re-card-subtitle {
  font-size: 0.85rem;
  color: var(--ind-color, #f59e0b);
  line-height: 1.5;
  margin: 0 0 0.75rem;
  font-weight: 500;
}
.re-card-body {
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .re-bld, .re-win { transition: none; }
  .re-win--flick { animation: none; }
  .re-card { transition: none; }
}
</style>

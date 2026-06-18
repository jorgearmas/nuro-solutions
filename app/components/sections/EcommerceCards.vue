<template>
  <div
    class="ec-wrap w-full max-w-7xl mx-auto px-6 lg:px-10"
    :class="{ 'ec-active': active }"
    ref="rootRef"
  >
    <!-- ── Channels feeding the store ─────────────── -->
    <div class="ec-stage" aria-hidden="true">
      <svg viewBox="0 0 400 300">
        <!-- connection lines -->
        <line
          v-for="(n, ni) in nodes"
          :key="`l${ni}`"
          class="ec-link"
          :x1="n.x" :y1="n.y" :x2="store.x" :y2="store.y"
        />

        <!-- store hub glow -->
        <circle class="ec-hub" :cx="store.x" :cy="store.y" r="46" />

        <!-- store icon -->
        <g class="ec-store">
          <!-- awning -->
          <path class="ec-awning" :d="`M${store.x - 30},${store.y - 18} L${store.x + 30},${store.y - 18} L${store.x + 24},${store.y - 32} L${store.x - 24},${store.y - 32} Z`" />
          <line v-for="i in 3" :key="`aw${i}`" class="ec-awning-stripe"
            :x1="store.x - 30 + i * 15" :y1="store.y - 18"
            :x2="store.x - 24 + i * 13" :y2="store.y - 32" />
          <!-- body -->
          <rect class="ec-body" :x="store.x - 26" :y="store.y - 18" width="52" height="40" rx="3" />
          <!-- door -->
          <rect class="ec-door" :x="store.x - 8" :y="store.y + 2" width="16" height="20" rx="2" />
          <!-- window -->
          <rect class="ec-window" :x="store.x - 21" :y="store.y - 8" width="11" height="11" rx="2" />
        </g>

        <!-- travelling pulses (channel → store) -->
        <template v-for="(n, ni) in nodes">
          <circle
            v-for="k in 2"
            :key="`p${ni}-${k}`"
            class="ec-pulse"
            :cx="n.x" :cy="n.y" r="4.5"
            :style="{
              '--dx': (store.x - n.x) + 'px',
              '--dy': (store.y - n.y) + 'px',
              '--dur': n.dur + 's',
              '--delay': (n.delay + (k - 1) * n.dur / 2) + 's',
            }"
          />
        </template>

        <!-- channel nodes -->
        <g v-for="(n, ni) in nodes" :key="`n${ni}`">
          <circle class="ec-node-dot" :cx="n.x" :cy="n.y" r="6" />
          <text class="ec-node-label" :x="n.x" :y="n.y - 12">{{ n.label }}</text>
        </g>
      </svg>
    </div>

    <!-- ── Cards ──────────────────────────────────── -->
    <div class="ec-grid">
      <article v-for="card in cards" :key="card.title" class="ec-card">
        <div class="ec-icon" v-html="card.icon"></div>
        <p class="ec-card-title">{{ card.title }}</p>
        <p class="ec-card-subtitle">{{ card.subtitle }}</p>
        <p class="ec-card-body">{{ card.body }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({ cards: { type: Array, default: () => [] } })

const store = { x: 322, y: 150 }
const nodeDefs = [
  { x: 60, y: 54, label: 'Meta' },
  { x: 38, y: 122, label: 'Google' },
  { x: 54, y: 190, label: 'TikTok' },
  { x: 108, y: 242, label: 'Email' },
  { x: 132, y: 58, label: 'YouTube' },
  { x: 158, y: 210, label: 'Ads' },
  { x: 170, y: 128, label: 'Own Site' },
]
const nodes = nodeDefs.map((n, i) => ({
  ...n,
  dur: 2.2 + (i % 3) * 0.35,
  delay: +(i * 0.28).toFixed(2),
}))

const active = ref(false)
const rootRef = ref(null)
let io = null

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) { active.value = true; return }
  if (!rootRef.value) return
  io = new IntersectionObserver(
    ([entry]) => { active.value = entry.isIntersecting },
    { threshold: 0.3 },
  )
  io.observe(rootRef.value)
})

onUnmounted(() => { if (io) io.disconnect() })
</script>

<style scoped>
.ec-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

/* ── Stage ─────────────────────────────────────── */
.ec-stage {
  width: 100%;
  max-width: 520px;
}
.ec-stage svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

/* connection lines */
.ec-link {
  stroke: rgba(var(--ind-rgb, 6, 182, 212), 0.22);
  stroke-width: 1.5;
}

/* store hub */
.ec-hub {
  fill: rgba(var(--ind-rgb, 6, 182, 212), 0.1);
  stroke: rgba(var(--ind-rgb, 6, 182, 212), 0.3);
  stroke-width: 1.5;
  transform-box: fill-box;
  transform-origin: 50% 50%;
}
.ec-active .ec-hub { animation: ec-hub 2.4s ease-in-out infinite; }
@keyframes ec-hub {
  0%, 100% { transform: scale(0.9); opacity: 0.45; }
  50%      { transform: scale(1.07); opacity: 1; }
}

/* store icon */
.ec-awning { fill: var(--ind-color, #06b6d4); }
.ec-awning-stripe { stroke: rgba(255, 255, 255, 0.6); stroke-width: 1.5; }
.ec-body {
  fill: color-mix(in srgb, var(--ind-color, #06b6d4) 12%, #fff);
  stroke: var(--ind-color, #06b6d4);
  stroke-width: 2.5;
}
.ec-door {
  fill: var(--ind-color, #06b6d4);
}
.ec-window {
  fill: none;
  stroke: var(--ind-color, #06b6d4);
  stroke-width: 2;
}

/* travelling pulses */
.ec-pulse {
  fill: var(--ind-color, #06b6d4);
  filter: drop-shadow(0 0 4px rgba(var(--ind-rgb, 6, 182, 212), 0.7));
  opacity: 0;
}
.ec-active .ec-pulse {
  animation: ec-pulse var(--dur, 2.2s) linear var(--delay, 0s) infinite;
}
@keyframes ec-pulse {
  0%   { transform: translate(0, 0); opacity: 0; }
  15%  { opacity: 1; }
  82%  { opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
}

/* channel nodes */
.ec-node-dot {
  fill: #fff;
  stroke: var(--ind-color, #06b6d4);
  stroke-width: 2.5;
}
.ec-node-label {
  fill: var(--color-muted);
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  text-anchor: middle;
}

/* ── Cards ─────────────────────────────────────── */
.ec-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
}
.ec-card {
  background: var(--color-surface);
  border: 1px solid rgba(var(--ind-rgb, 6, 182, 212), 0.18);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.4s, border-color 0.4s, box-shadow 0.4s;
}
.ec-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--ind-rgb, 6, 182, 212), 0.5);
  box-shadow: 0 14px 40px rgba(var(--ind-rgb, 6, 182, 212), 0.16);
}
.ec-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(var(--ind-rgb, 6, 182, 212), 0.1);
  border: 1px solid rgba(var(--ind-rgb, 6, 182, 212), 0.2);
  color: var(--ind-color, #06b6d4);
  margin-bottom: 1.5rem;
}
.ec-card-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}
.ec-card-subtitle {
  font-size: 0.85rem;
  color: var(--ind-color, #06b6d4);
  line-height: 1.5;
  margin: 0 0 0.75rem;
  font-weight: 500;
}
.ec-card-body {
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .ec-active .ec-hub,
  .ec-active .ec-pulse { animation: none; }
  .ec-card { transition: none; }
}
</style>

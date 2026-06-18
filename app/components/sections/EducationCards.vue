<template>
  <div
    class="ed-wrap w-full max-w-7xl mx-auto px-6 lg:px-10"
    :class="{ 'ed-active': active }"
    ref="rootRef"
  >
    <!-- ── Graduation caps tossed in the air ──────── -->
    <div class="ed-stage" aria-hidden="true">
      <svg viewBox="0 0 440 260">
        <!-- twinkling sparkles -->
        <g v-for="(s, si) in sparkles" :key="`s${si}`" :transform="`translate(${s.x},${s.y}) scale(${s.s})`">
          <path
            class="ed-spark"
            :style="{ '--sd': s.sd + 's', '--sdur': s.dur + 's' }"
            d="M0,-6 C0.8,-1.2 1.2,-0.8 6,0 C1.2,0.8 0.8,1.2 0,6 C-0.8,1.2 -1.2,0.8 -6,0 C-1.2,-0.8 -0.8,-1.2 0,-6 Z"
          />
        </g>

        <!-- tossed caps -->
        <g v-for="(c, ci) in caps" :key="`c${ci}`" :transform="`translate(${c.x},${c.y}) scale(${c.s})`">
          <g
            class="ed-cap"
            :style="{ '--dx': c.dx + 'px', '--r0': c.r0 + 'deg', '--r1': c.r1 + 'deg', '--delay': c.delay + 's', '--dur': c.dur + 's' }"
          >
            <!-- head/cap base -->
            <path class="ed-cap-base" d="M-7,-1 L7,-1 L5,8 Q0,11 -5,8 Z" />
            <!-- mortarboard -->
            <path class="ed-cap-board" d="M0,-9 L18,-3 L0,3 L-18,-3 Z" />
            <!-- button -->
            <circle class="ed-cap-btn" cx="0" cy="-3" r="1.8" />
            <!-- tassel -->
            <path class="ed-cap-tassel" d="M0,-3 L11,-3 L11,9" />
            <circle class="ed-cap-knot" cx="11" cy="11" r="2.2" />
          </g>
        </g>
      </svg>
    </div>

    <!-- ── Cards ──────────────────────────────────── -->
    <div class="ed-grid">
      <article v-for="card in cards" :key="card.title" class="ed-card">
        <div class="ed-icon" v-html="card.icon"></div>
        <p class="ed-card-title">{{ card.title }}</p>
        <p class="ed-card-subtitle">{{ card.subtitle }}</p>
        <p class="ed-card-body">{{ card.body }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({ cards: { type: Array, default: () => [] } })

/* Caps launching upward, spread across the width. Deterministic → SSR-safe. */
const capDefs = [
  { x: 48, y: 212, s: 0.8 }, { x: 110, y: 196, s: 1.05 }, { x: 172, y: 216, s: 0.7 },
  { x: 226, y: 190, s: 0.95 }, { x: 286, y: 212, s: 0.82 }, { x: 346, y: 198, s: 1.0 },
  { x: 400, y: 210, s: 0.65 }, { x: 144, y: 206, s: 0.6 },
]
const caps = capDefs.map((c, i) => {
  const dir = i % 2 ? 1 : -1
  const r0 = -14 + ((i * 13) % 28)
  return {
    ...c,
    dx: dir * (10 + (i % 3) * 8),
    r0,
    r1: r0 + dir * (35 + (i % 2) * 20),
    delay: +(i * 0.5).toFixed(2),
    dur: 3.6 + (i % 3) * 0.5,
  }
})

const sparkleDefs = [
  { x: 70, y: 60, s: 1.0 }, { x: 150, y: 40, s: 0.7 }, { x: 250, y: 55, s: 0.9 },
  { x: 330, y: 38, s: 0.75 }, { x: 390, y: 70, s: 0.65 }, { x: 200, y: 90, s: 0.6 },
  { x: 110, y: 95, s: 0.55 }, { x: 300, y: 100, s: 0.6 },
]
const sparkles = sparkleDefs.map((s, i) => ({
  ...s,
  sd: +((i * 0.43) % 3).toFixed(2),
  dur: 2.6 + (i % 4) * 0.5,
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
.ed-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

/* ── Stage ─────────────────────────────────────── */
.ed-stage {
  width: 100%;
  max-width: 540px;
}
.ed-stage svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

/* caps */
.ed-cap {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  opacity: 0;
}
.ed-active .ed-cap {
  animation: ed-toss var(--dur, 4s) cubic-bezier(0.22, 0.6, 0.35, 1) var(--delay, 0s) infinite;
}
@keyframes ed-toss {
  0%   { transform: translate(0, 0) rotate(var(--r0, 0deg)); opacity: 0; }
  12%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { transform: translate(var(--dx, 0), -156px) rotate(var(--r1, 0deg)); opacity: 0; }
}
.ed-cap-board { fill: var(--ind-color, #6366f1); }
.ed-cap-base { fill: color-mix(in srgb, var(--ind-color, #6366f1) 78%, #000); }
.ed-cap-btn { fill: #f59e0b; }
.ed-cap-tassel {
  fill: none;
  stroke: #f59e0b;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ed-cap-knot { fill: #f59e0b; }

/* sparkles */
.ed-spark {
  fill: var(--ind-color, #6366f1);
  transform-box: fill-box;
  transform-origin: 50% 50%;
  transform: scale(0.25);
  opacity: 0.12;
}
.ed-active .ed-spark {
  animation: ed-twinkle var(--sdur, 3s) ease-in-out var(--sd, 0s) infinite;
}
@keyframes ed-twinkle {
  0%, 100% { transform: scale(0.25); opacity: 0.12; }
  50%      { transform: scale(1); opacity: 0.9; }
}

/* ── Cards ─────────────────────────────────────── */
.ed-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
}
.ed-card {
  background: var(--color-surface);
  border: 1px solid rgba(var(--ind-rgb, 99, 102, 241), 0.18);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.4s, border-color 0.4s, box-shadow 0.4s;
}
.ed-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--ind-rgb, 99, 102, 241), 0.5);
  box-shadow: 0 14px 40px rgba(var(--ind-rgb, 99, 102, 241), 0.16);
}
.ed-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(var(--ind-rgb, 99, 102, 241), 0.1);
  border: 1px solid rgba(var(--ind-rgb, 99, 102, 241), 0.2);
  color: var(--ind-color, #6366f1);
  margin-bottom: 1.5rem;
}
.ed-card-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}
.ed-card-subtitle {
  font-size: 0.85rem;
  color: var(--ind-color, #6366f1);
  line-height: 1.5;
  margin: 0 0 0.75rem;
  font-weight: 500;
}
.ed-card-body {
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .ed-active .ed-cap,
  .ed-active .ed-spark { animation: none; }
  .ed-active .ed-cap { opacity: 1; }
  .ed-card { transition: none; }
}
</style>

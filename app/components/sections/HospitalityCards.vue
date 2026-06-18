<template>
  <div
    class="hp-wrap w-full max-w-7xl mx-auto px-6 lg:px-10"
    :class="{ 'hp-ring': ringing }"
    ref="rootRef"
  >
    <!-- ── Concierge bell + ripples + twinkling reviews ── -->
    <div class="hp-bell-stage" aria-hidden="true">
      <svg viewBox="0 0 540 230">
        <!-- twinkling review stars scattered around -->
        <g
          v-for="(s, si) in stars"
          :key="`s${si}`"
          :transform="`translate(${s.x},${s.y}) scale(${s.s})`"
        >
          <path
            class="hp-star"
            :style="{ '--sd': s.sd + 's', '--sdur': s.dur + 's' }"
            d="M0,-7 C1,-1.4 1.4,-1 7,0 C1.4,1 1,1.4 0,7 C-1,1.4 -1.4,1 -7,0 C-1.4,-1 -1,-1.4 0,-7 Z"
          />
        </g>

        <!-- sound ripples (behind the bell) -->
        <circle class="hp-ripple" cx="270" cy="150" r="34" style="--rd: 0s" />
        <circle class="hp-ripple" cx="270" cy="150" r="34" style="--rd: 0.7s" />
        <circle class="hp-ripple" cx="270" cy="150" r="34" style="--rd: 1.4s" />
        <circle class="hp-ripple" cx="270" cy="150" r="34" style="--rd: 2.1s" />

        <!-- bell -->
        <g class="hp-bell">
          <ellipse class="hp-base" cx="270" cy="185" rx="58" ry="9" />
          <path class="hp-dome" d="M224,183 Q224,123 270,119 Q316,123 316,183 Z" />
          <line class="hp-stem" x1="270" y1="119" x2="270" y2="110" />
          <circle class="hp-btn" cx="270" cy="104" r="6.5" />
        </g>
      </svg>
    </div>

    <!-- ── Cards ──────────────────────────────────── -->
    <div class="hp-grid">
      <article v-for="card in cards" :key="card.title" class="hp-card">
        <div class="hp-icon" v-html="card.icon"></div>
        <p class="hp-card-title">{{ card.title }}</p>
        <p class="hp-card-subtitle">{{ card.subtitle }}</p>
        <p class="hp-card-body">{{ card.body }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({ cards: { type: Array, default: () => [] } })

/* Review stars scattered around the bell (avoiding the central column).
   Deterministic positions/timings → SSR-safe. */
const positions = [
  { x: 60, y: 55, s: 1.1 }, { x: 110, y: 112, s: 0.7 }, { x: 150, y: 44, s: 0.9 },
  { x: 186, y: 140, s: 0.8 }, { x: 202, y: 80, s: 1.0 }, { x: 40, y: 132, s: 0.6 },
  { x: 92, y: 168, s: 0.75 }, { x: 156, y: 96, s: 0.65 }, { x: 240, y: 34, s: 0.7 },
  { x: 300, y: 38, s: 0.8 }, { x: 340, y: 46, s: 0.9 }, { x: 362, y: 120, s: 1.05 },
  { x: 402, y: 70, s: 0.7 }, { x: 446, y: 140, s: 0.85 }, { x: 482, y: 50, s: 1.0 },
  { x: 502, y: 106, s: 0.65 }, { x: 420, y: 28, s: 0.7 }, { x: 330, y: 166, s: 0.7 },
]
const stars = positions.map((p, i) => ({
  ...p,
  sd: +((i * 0.37) % 3).toFixed(2),
  dur: 2.6 + (i % 4) * 0.55,
}))

const ringing = ref(false)
const rootRef = ref(null)
let io = null

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) { ringing.value = true; return }
  if (!rootRef.value) return
  // animate only while the section is on screen (pause off-screen)
  io = new IntersectionObserver(
    ([entry]) => { ringing.value = entry.isIntersecting },
    { threshold: 0.3 },
  )
  io.observe(rootRef.value)
})

onUnmounted(() => { if (io) io.disconnect() })
</script>

<style scoped>
.hp-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

/* ── Bell stage ────────────────────────────────── */
.hp-bell-stage {
  width: 100%;
  max-width: 640px;
}
.hp-bell-stage svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

/* twinkling review stars */
.hp-star {
  fill: var(--ind-color, #ec4899);
  transform-box: fill-box;
  transform-origin: 50% 50%;
  transform: scale(0.25);
  opacity: 0.15;
}
.hp-ring .hp-star {
  animation: hp-twinkle var(--sdur, 3s) ease-in-out var(--sd, 0s) infinite;
}
@keyframes hp-twinkle {
  0%, 100% { transform: scale(0.25); opacity: 0.12; }
  50%      { transform: scale(1); opacity: 1; }
}

/* ripples */
.hp-ripple {
  fill: none;
  stroke: var(--ind-color, #ec4899);
  stroke-width: 2;
  transform-box: fill-box;
  transform-origin: 50% 50%;
  transform: scale(0.3);
  opacity: 0;
}
.hp-ring .hp-ripple {
  animation: hp-ripple 2.8s ease-out var(--rd, 0s) infinite;
}
@keyframes hp-ripple {
  0%   { transform: scale(0.3); opacity: 0; }
  15%  { opacity: 0.5; }
  100% { transform: scale(1.9); opacity: 0; }
}

/* bell */
.hp-bell {
  transform-box: fill-box;
  transform-origin: 50% 100%;
}
.hp-ring .hp-bell {
  animation: hp-tap 2.8s ease-in-out infinite;
}
@keyframes hp-tap {
  0%   { transform: scale(1, 1); }
  4%   { transform: scale(1.07, 0.94); }
  9%   { transform: scale(0.97, 1.04); }
  15%  { transform: scale(1.02, 0.99); }
  22%, 100% { transform: scale(1, 1); }
}
.hp-base {
  fill: rgba(var(--ind-rgb, 236, 72, 153), 0.18);
  stroke: var(--ind-color, #ec4899);
  stroke-width: 2;
}
.hp-dome {
  /* opaque tint (same look as 12% pink on white) so the back edge of the
     base ellipse doesn't show through the dome */
  fill: color-mix(in srgb, var(--ind-color, #ec4899) 12%, #fff);
  stroke: var(--ind-color, #ec4899);
  stroke-width: 2.5;
  stroke-linejoin: round;
}
.hp-stem {
  stroke: var(--ind-color, #ec4899);
  stroke-width: 2.5;
  stroke-linecap: round;
}
.hp-btn {
  fill: var(--ind-color, #ec4899);
}

/* ── Cards ─────────────────────────────────────── */
.hp-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
}
.hp-card {
  background: var(--color-surface);
  border: 1px solid rgba(var(--ind-rgb, 236, 72, 153), 0.18);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.4s, border-color 0.4s, box-shadow 0.4s;
}
.hp-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--ind-rgb, 236, 72, 153), 0.5);
  box-shadow: 0 14px 40px rgba(var(--ind-rgb, 236, 72, 153), 0.16);
}
.hp-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(var(--ind-rgb, 236, 72, 153), 0.1);
  border: 1px solid rgba(var(--ind-rgb, 236, 72, 153), 0.2);
  color: var(--ind-color, #ec4899);
  margin-bottom: 1.5rem;
}
.hp-card-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}
.hp-card-subtitle {
  font-size: 0.85rem;
  color: var(--ind-color, #ec4899);
  line-height: 1.5;
  margin: 0 0 0.75rem;
  font-weight: 500;
}
.hp-card-body {
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .hp-ring .hp-star,
  .hp-ring .hp-ripple,
  .hp-ring .hp-bell { animation: none; }
  .hp-card { transition: none; }
}
</style>

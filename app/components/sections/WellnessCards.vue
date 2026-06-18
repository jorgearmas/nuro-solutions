<template>
  <div
    class="wl-wrap w-full max-w-7xl mx-auto px-6 lg:px-10"
    :class="{ 'wl-grown': grown }"
    ref="rootRef"
  >
    <!-- ── Living garden (plants grow on scroll) ──── -->
    <div class="wl-garden" aria-hidden="true">
      <div
        v-for="(p, pi) in plants"
        :key="pi"
        class="wl-plant"
        :style="{
          '--scale': p.scale,
          '--pd': p.delay + 's',
          '--amp': p.amp + 'deg',
          '--sway': p.dur + 's',
          '--swd': p.swd + 's',
        }"
      >
        <svg viewBox="0 0 220 260">
          <!-- stem (self-draws) -->
          <path
            class="wl-stem"
            pathLength="100"
            d="M110,250 C110,212 105,196 110,170 C115,148 105,134 110,108 C114,88 109,72 110,48"
          />
          <!-- leaves sprout from their base, staggered -->
          <g
            v-for="(t, li) in leaves.slice(0, p.leaves)"
            :key="li"
            :transform="t.tf"
          >
            <path
              class="wl-leaf"
              :class="li % 2 === 1 ? 'wl-leaf--alt' : ''"
              :style="{ transitionDelay: `calc(var(--pd) + ${t.delay}s)` }"
              d="M0,0 C12,-11 32,-9 46,0 C32,9 12,11 0,0 Z"
            />
          </g>
        </svg>
      </div>

      <!-- shared soil line -->
      <span class="wl-ground"></span>
    </div>

    <!-- ── Cards ──────────────────────────────────── -->
    <div class="wl-grid">
      <article v-for="card in cards" :key="card.title" class="wl-card">
        <div class="wl-icon" v-html="card.icon"></div>
        <p class="wl-card-title">{{ card.title }}</p>
        <p class="wl-card-subtitle">{{ card.subtitle }}</p>
        <p class="wl-card-body">{{ card.body }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({ cards: { type: Array, default: () => [] } })

/* 5 plants of varying height (scale), leaf count and entrance delay. */
const plants = [
  { scale: 0.72, leaves: 4, delay: 0.0,  amp: 3.2, dur: 5.0, swd: -1.2 },
  { scale: 1.18, leaves: 6, delay: 0.35, amp: 4.8, dur: 6.4, swd: 0.0 },
  { scale: 0.55, leaves: 3, delay: 0.1,  amp: 2.6, dur: 4.3, swd: -2.4 },
  { scale: 1.0,  leaves: 6, delay: 0.5,  amp: 4.2, dur: 5.8, swd: -0.6 },
  { scale: 0.88, leaves: 5, delay: 0.25, amp: 3.6, dur: 5.2, swd: -3.0 },
]

/* leaf positions along the stem + sprout delay (base, before plant offset) */
const leaves = [
  { tf: 'translate(110,174) rotate(-32) scale(1)',    delay: 0.75 },
  { tf: 'translate(106,140) rotate(-148) scale(0.95)', delay: 0.95 },
  { tf: 'translate(112,110) rotate(-30) scale(0.9)',   delay: 1.15 },
  { tf: 'translate(108,82) rotate(-150) scale(0.82)',  delay: 1.35 },
  { tf: 'translate(110,56) rotate(-58) scale(0.6)',    delay: 1.55 },
  { tf: 'translate(110,56) rotate(-122) scale(0.6)',   delay: 1.65 },
]

const grown = ref(false)
const rootRef = ref(null)
let io = null

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) { grown.value = true; return }
  if (!rootRef.value) return
  io = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { grown.value = true; io.disconnect() } },
    { threshold: 0.4 },
  )
  io.observe(rootRef.value)
})

onUnmounted(() => { if (io) io.disconnect() })
</script>

<style scoped>
.wl-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

/* ── Garden row ────────────────────────────────── */
.wl-garden {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(0.5rem, 2vw, 2rem);
  --base: clamp(120px, 15vw, 200px);
}
.wl-ground {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 640px;
  height: 0;
  border-top: 3px solid rgba(var(--ind-rgb, 34, 197, 94), 0.3);
  border-radius: 999px;
}
.wl-plant svg {
  width: calc(var(--base) * var(--scale, 1));
  height: auto;
  display: block;
  /* gentle wind sway, pivoting from the soil */
  transform-origin: 50% 100%;
  animation: wl-sway var(--sway, 6s) ease-in-out var(--swd, 0s) infinite alternate;
}
@keyframes wl-sway {
  from { transform: rotate(calc(var(--amp, 2deg) * -1)); }
  to   { transform: rotate(var(--amp, 2deg)); }
}

/* stem draws itself */
.wl-stem {
  fill: none;
  stroke: var(--ind-color, #22c55e);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  transition: stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--pd, 0s);
}
.wl-grown .wl-stem { stroke-dashoffset: 0; }

/* leaves sprout from their base */
.wl-leaf {
  fill: var(--ind-color, #22c55e);
  transform-box: fill-box;
  transform-origin: 0% 50%;
  transform: scale(0);
  opacity: 0;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
}
.wl-grown .wl-leaf { transform: scale(1); opacity: 1; }
.wl-leaf--alt { fill: color-mix(in srgb, var(--ind-color, #22c55e) 78%, #0a5); }

/* ── Cards ─────────────────────────────────────── */
.wl-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
}
.wl-card {
  background: var(--color-surface);
  border: 1px solid rgba(var(--ind-rgb, 34, 197, 94), 0.18);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.4s, border-color 0.4s, box-shadow 0.4s;
}
.wl-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--ind-rgb, 34, 197, 94), 0.5);
  box-shadow: 0 14px 40px rgba(var(--ind-rgb, 34, 197, 94), 0.16);
}
.wl-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(var(--ind-rgb, 34, 197, 94), 0.1);
  border: 1px solid rgba(var(--ind-rgb, 34, 197, 94), 0.2);
  color: var(--ind-color, #22c55e);
  margin-bottom: 1.5rem;
}
.wl-card-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}
.wl-card-subtitle {
  font-size: 0.85rem;
  color: var(--ind-color, #22c55e);
  line-height: 1.5;
  margin: 0 0 0.75rem;
  font-weight: 500;
}
.wl-card-body {
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .wl-stem, .wl-leaf { transition: none; }
  .wl-plant svg { animation: none; }
  .wl-card { transition: none; }
}
</style>

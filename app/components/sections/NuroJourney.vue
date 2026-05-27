<template>
  <!-- Scroll container — da 500vh de captura para el scroll horizontal -->
  <div ref="scrollContainerRef" class="journey-scroll-container">
    <div class="journey-sticky">

      <!-- ── Track horizontal con los 4 rooms ─────────────── -->
      <div ref="trackRef" class="h-track">
        <div v-for="n in 4" :key="n" class="h-panel" :class="{ 'panel-small': n === 1 }">
          <img
            :src="`/room_${n}.png`"
            class="panel-img"
            draggable="false"
            alt=""
          />
          <!-- Overlay lateral para dar sensación de profundidad -->
          <div class="panel-overlay" />
          <!-- Número sutil -->
          <span class="panel-num">0{{ n }}</span>
        </div>
      </div>

      <!-- ── Hint de scroll ────────────────────────────────── -->
      <div class="scroll-hint" :style="{ opacity: titleOpacity }">
        <span class="hint-label">Scroll</span>
        <div class="hint-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- ── Progress bar en la base ───────────────────────── -->
      <div class="progress-bar-wrap">
        <div class="progress-bar" :style="{ width: `${progress * 100}%` }" />
      </div>

      <!-- ── Dots laterales ────────────────────────────────── -->
      <div class="side-nav">
        <span
          v-for="n in 4"
          :key="n"
          class="nav-dot"
          :class="{ active: activeRoom === n }"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollContainerRef = ref(null)
const trackRef           = ref(null)

const activeRoom = ref(1)
const progress   = ref(0)

let gsapLib = null

onMounted(async () => {
  const mod = await import('gsap')
  gsapLib = mod.gsap
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function onScroll () {
  if (!scrollContainerRef.value || !trackRef.value || !gsapLib) return

  const rect       = scrollContainerRef.value.getBoundingClientRect()
  const totalRange = scrollContainerRef.value.offsetHeight - window.innerHeight
  const scrolled   = Math.max(0, -rect.top)
  const p          = Math.min(1, scrolled / totalRange)

  progress.value = p

  // Mueve el track horizontalmente: 0 → -3 × vw (room 1 a room 4)
  const vw = window.innerWidth
  gsapLib.set(trackRef.value, { x: -(p * 3 * vw) })

  // Room activa
  activeRoom.value = Math.min(4, Math.floor(p * 4) + 1)

}
</script>

<style scoped>
/* ── Scroll container ───────────────────────────────────── */
.journey-scroll-container {
  height: 800vh;
  position: relative;
}

/* ── Sticky frame ───────────────────────────────────────── */
.journey-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  background: #7040AC;
}

/* ── Track horizontal ───────────────────────────────────── */
.h-track {
  display: flex;
  position: absolute;
  inset: 0;
  width: 400vw;
  height: 100%;
  will-change: transform;
}

/* ── Panel (cada room) ──────────────────────────────────── */
.h-panel {
  position: relative;
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  overflow: hidden;
}

.panel-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Room 1 — más pequeña, sin caja, fondo morado visible alrededor */
.panel-small {
  display: flex;
  align-items: center;
  justify-content: center;
}
.panel-small .panel-img {
  position: relative;
  inset: auto;
  width: 60%;
  height: 68%;
  object-fit: cover;
}
.panel-small .panel-overlay { display: none; }


.panel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.20) 0%,
    transparent      30%,
    transparent      65%,
    rgba(0,0,0,0.55) 100%
  );
  pointer-events: none;
}

.panel-num {
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  font-family: var(--font-display);
  font-size: clamp(5rem, 12vw, 10rem);
  font-weight: 800;
  color: rgba(255,255,255,0.07);
  line-height: 1;
  letter-spacing: -0.05em;
  user-select: none;
  pointer-events: none;
}


/* ── Scroll hint ────────────────────────────────────────── */
.scroll-hint {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  pointer-events: none;
  transition: opacity 0.1s linear;
}

.hint-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
}

.hint-arrow {
  width: 20px;
  height: 20px;
  color: rgba(255,255,255,0.6);
  animation: bounce-down 1.4s ease-in-out infinite;
}

@keyframes bounce-down {
  0%,100% { transform: translateY(0);   opacity: 0.6; }
  50%     { transform: translateY(6px); opacity: 1;   }
}

/* ── Progress bar ───────────────────────────────────────── */
.progress-bar-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255,255,255,0.1);
  z-index: 30;
}

.progress-bar {
  height: 100%;
  background: var(--color-accent);
  transition: width 0.05s linear;
  max-width: 100%;
}

/* ── Dots laterales ─────────────────────────────────────── */
.side-nav {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 30;
}

.nav-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.30);
  transition: background 0.3s, transform 0.3s;
}

.nav-dot.active {
  background: #ffffff;
  transform: scale(1.7);
}
</style>

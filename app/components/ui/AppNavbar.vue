<template>
  <!-- Outer wrapper — positions the pill -->
  <div class="nav-wrapper" :class="{ 'nav-wrapper--hidden': hideNav }">
    <nav class="nav-pill" :class="scrolled ? 'nav-pill--scrolled' : ''">

      <!-- Logo -->
      <a href="/" class="nav-logo">
        <img :src="logoUrl" alt="Nuro Solutions" class="h-6 w-auto" />
      </a>

      <!-- Divider -->
      <div class="nav-divider"></div>

      <!-- Desktop Links -->
      <div class="hidden lg:flex items-center gap-1">
        <template v-for="link in navLinks" :key="link.to">

          <!-- Dropdown -->
          <div
            v-if="link.children"
            class="relative"
            @mouseenter="openDropdown(link.label)"
            @mouseleave="closeDropdown()"
          >
            <button class="nav-link">
              {{ link.label }}
              <svg
                class="w-3 h-3 ml-1 opacity-40 transition-transform duration-200"
                :class="activeDropdown === link.label ? 'rotate-180' : ''"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="dropdown" :class="{ 'dropdown--open': activeDropdown === link.label }">
              <NuxtLink
                v-for="child in link.children"
                :key="child.to"
                :to="child.to"
                class="dropdown-item"
                @click="activeDropdown = null"
              >{{ child.label }}</NuxtLink>
            </div>
          </div>

          <!-- Regular link -->
          <NuxtLink v-else :to="link.to" class="nav-link">
            {{ link.label }}
          </NuxtLink>

        </template>
      </div>

      <!-- CTA -->
      <NuxtLink to="/contact" class="nav-cta hidden lg:inline-flex">
        Get Started
      </NuxtLink>

      <!-- Hamburger (mobile) -->
      <button
        class="lg:hidden flex flex-col justify-center gap-[5px] p-1 ml-1"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <span class="block w-5 h-[1.5px] bg-[#1a1a2e] transition-all duration-300 origin-center"
          :class="menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''"></span>
        <span class="block w-5 h-[1.5px] bg-[#1a1a2e] transition-all duration-300"
          :class="menuOpen ? 'opacity-0' : ''"></span>
        <span class="block w-5 h-[1.5px] bg-[#1a1a2e] transition-all duration-300 origin-center"
          :class="menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''"></span>
      </button>

    </nav>

    <!-- Mobile Menu — below pill -->
    <div class="mobile-menu lg:hidden" :class="menuOpen ? 'mobile-menu--open' : ''">
      <div class="px-4 py-4 flex flex-col gap-1">
        <template v-for="link in navLinks" :key="link.to">
          <NuxtLink
            v-if="!link.children"
            :to="link.to"
            class="mobile-link"
            @click="menuOpen = false"
          >{{ link.label }}</NuxtLink>
          <div v-else>
            <span class="mobile-link-parent">{{ link.label }}</span>
            <div class="pl-4 flex flex-col gap-0.5 mt-1">
              <NuxtLink
                v-for="child in link.children"
                :key="child.to"
                :to="child.to"
                class="mobile-link mobile-link--child"
                @click="menuOpen = false"
              >{{ child.label }}</NuxtLink>
            </div>
          </div>
        </template>
        <NuxtLink to="/contact" class="nav-cta mt-3 justify-center text-center" @click="menuOpen = false">
          Get Started
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const hideNav  = useState('hideNav', () => false)
const scrolled = ref(false)
const menuOpen = ref(false)
const activeDropdown = ref(null)
const logoUrl = '/logo.png'
let dropdownTimer = null

const navLinks = [
  { label: 'Industries', to: '/industries', children: [
    { label: 'Healthcare',  to: '/industries/healthcare' },
    { label: 'Wellness',    to: '/industries/wellness' },
    { label: 'Real Estate', to: '/industries/real-estate' },
    { label: 'Hospitality', to: '/industries/hospitality' },
    { label: 'Retail',      to: '/industries/retail' },
    { label: 'E-Commerce',  to: '/industries/e-commerce' },
    { label: 'Education',   to: '/industries/education' },
  ]},
  { label: 'Solutions', to: '/solutions' },
  { label: 'Core Drivers', to: '/core_drivers' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
]

function openDropdown(label) {
  clearTimeout(dropdownTimer)
  activeDropdown.value = label
}
function closeDropdown() {
  dropdownTimer = setTimeout(() => { activeDropdown.value = null }, 150)
}
function onScroll() { scrolled.value = window.scrollY > 20 }

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* ── Wrapper ─────────────────────────────────────────────── */
.nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 14px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  pointer-events: none; /* let clicks pass through wrapper */
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.nav-wrapper > * { pointer-events: all; }

.nav-wrapper--hidden {
  opacity: 0;
  transform: translateY(-20px);
  pointer-events: none;
}
.nav-wrapper--hidden > * { pointer-events: none; }

/* ── Pill ────────────────────────────────────────────────── */
.nav-pill {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  max-width: 860px;
  padding: 0.4rem 0.4rem 0.4rem 1.25rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(112, 64, 172, 0.12);
  border-radius: 999px;
  box-shadow: 0 4px 24px rgba(112, 64, 172, 0.1), 0 1px 4px rgba(0,0,0,0.04);
  transition: box-shadow 0.3s, background 0.3s;
}
.nav-pill--scrolled {
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 8px 32px rgba(112, 64, 172, 0.15), 0 2px 8px rgba(0,0,0,0.06);
}

/* ── Logo ────────────────────────────────────────────────── */
.nav-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 0.25rem;
}

/* ── Divider ─────────────────────────────────────────────── */
.nav-divider {
  width: 1px;
  height: 20px;
  background: var(--color-border);
  flex-shrink: 0;
  margin: 0 0.75rem;
}

/* ── Nav Links ───────────────────────────────────────────── */
.nav-link {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.75rem;
  font-family: var(--font-display);
  font-size: 0.825rem;
  font-weight: 500;
  color: var(--color-muted);
  border-radius: 999px;
  transition: color 0.2s, background 0.2s;
  background: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}
.nav-link:hover {
  color: var(--color-text);
  background: rgba(112, 64, 172, 0.07);
}
.nav-link.router-link-active {
  color: var(--color-accent);
  background: rgba(112, 64, 172, 0.08);
}

/* ── CTA ─────────────────────────────────────────────────── */
.nav-cta {
  display: inline-flex;
  align-items: center;
  margin-left: auto;
  padding: 0.5rem 1.25rem;
  background: #1a1a2e;
  color: #F9F0E5;
  font-family: var(--font-display);
  font-size: 0.825rem;
  font-weight: 600;
  border-radius: 999px;
  transition: background 0.2s, transform 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}
.nav-cta:hover {
  background: #7040AC;
  transform: translateY(-1px);
}

/* ── Dropdown ────────────────────────────────────────────── */
.dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(-6px);
  min-width: 200px;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 0.4rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
  box-shadow: 0 8px 30px rgba(112,64,172,0.12), 0 2px 8px rgba(0,0,0,0.06);
  max-height: 360px;
  overflow-y: auto;
}
.dropdown--open {
  opacity: 1;
  pointer-events: all;
  transform: translateX(-50%) translateY(0);
}
.dropdown-item {
  display: block;
  padding: 0.6rem 1rem;
  font-size: 0.825rem;
  color: var(--color-muted);
  border-radius: 10px;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}
.dropdown-item:hover {
  background: rgba(112,64,172,0.06);
  color: var(--color-accent);
}

/* ── Mobile Menu ─────────────────────────────────────────── */
.mobile-menu {
  max-height: 0;
  overflow: hidden;
  width: 100%;
  max-width: 860px;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  margin-top: 8px;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 30px rgba(112,64,172,0.1);
}
.mobile-menu--open { max-height: 600px; }

.mobile-link {
  display: block;
  padding: 0.65rem 0.75rem;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-muted);
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}
.mobile-link:hover,
.mobile-link.router-link-active {
  color: var(--color-accent);
  background: rgba(112,64,172,0.05);
}
.mobile-link--child { font-size: 0.875rem; padding: 0.45rem 0.75rem; }
.mobile-link-parent {
  display: block;
  padding: 0.65rem 0.75rem 0.25rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
}
</style>
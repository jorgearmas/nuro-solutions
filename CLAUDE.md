# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server on port 3001
npm run build     # production build
npm run generate  # static site generation
npm run preview   # preview production build
```

No test suite or linter configured.

## Architecture

**Stack:** Nuxt 3 · Vue 3 · Tailwind CSS · GSAP 3 · vee-validate · emailjs-com · Swiper 11

**Source root:** `app/` (configured via `srcDir` in `nuxt.config.ts`)

**Component auto-import prefixes:**
- `app/components/ui/` → prefix `App` (e.g. `AppNavbar`, `AppFooter`)
- `app/components/sections/` → no prefix (e.g. `IndustryPage`, `NuroJourney`)

**Pages:** `app/pages/` — file-based routing. Industry sub-pages all live in `pages/industries/`.

## Design System

**Palette** (defined in both `app/assets/css/main.css` as CSS vars and mirrored in `tailwind.config.js`):
| Token | Value | Role |
|---|---|---|
| `--color-bg` / `bg` | `#F9F0E5` | Crema base background |
| `--color-accent` / `accent` | `#7040AC` | Primary purple |
| `--color-accent-2` / `accent-2` | `#F27700` | Secondary orange |
| `navy` | `#3C4A95` | Dark blue / accent-hover |
| `--color-text` / `text` | `#1a1a2e` | Dark text |
| dark | `#0a0a0f` | Hero/video backgrounds |

**Font:** Satoshi loaded from fontshare API — used for everything (`font-display` and `font-body`).

**Global utility classes** (in `main.css`): `.btn-primary`, `.btn-ghost`, `.section-tag`, `.card`, `.glow-dot`, `.accent-line`. Add visual variants locally with scoped `<style scoped>`, not by modifying these globals.

## Background Crossfade System (index page)

The `body` element drives full-page color transitions via CSS class swaps (not inline styles). The `body` transition is `0.8s cubic-bezier(0.4, 0, 0.2, 1)` defined in `main.css`.

Section-to-color mapping:
```
bg-hero    → #0a0a0f  (dark)
bg-ideas   → #ffffff  (white)
bg-mindset → #F27700  (orange)
bg-journey → #7040AC  (purple)
```

`setBodyBg(name)` in `pages/index.vue` removes all body bg classes and adds the new one. It is driven by two `IntersectionObserver` instances:
1. General `io` — watches hero/ideas/mindset sections with `rootMargin: '-40% 0px -59% 0px'`
2. `journeyIo` — watches the journey container with `rootMargin: '0px 0px -55% 0px'`; fires the orange→purple crossfade on entry and restores mindset on scroll-back (only after `journeyEntered = true` to avoid the false flash on initial load)

The navbar is hidden during the journey via `hideNav` — a global `useState('hideNav')` shared between `AppNavbar` and `pages/index.vue`.

## Journey Scroll Section (index page)

Desktop horizontal scroll effect built without GSAP ScrollTrigger — uses a native `scroll` event listener + manual math:

- `.journey-scroll-container` is `600vh` tall (creates scroll space)
- `.journey-sticky` is `position: sticky; top: 0; height: 100vh`
- `.h-track` contains 5 panels (4 room images + impact panel) laid out `500vw` wide
- Scroll progress `p = scrolled / totalRange` drives:
  - GSAP `set()` to translate the track horizontally
  - `stickyBgOpacity` for the purple overlay fade-in (reaches 1 at `p = 0.15`)
  - `hintOpacity` scroll indicator fade-out
  - `activeRoom` for side-nav dots
- Panel dwell: track movement stops at `DWELL_START = 0.85` so the last 15% of scroll is dwell time on the impact panel

GSAP is lazy-imported (`await import('gsap')`) only in `onMounted`.

Mobile uses the same immersive scroll (`.mobile-carousel` is `display: none`).

## Industry Pages Pattern

Each industry page (`pages/industries/*.vue`) is a thin wrapper:

```vue
<template>
  <IndustryPage :industry="industry" />
</template>
<script setup>
const industry = {
  label: 'Healthcare',
  headline: '...',
  description: '...',
  video: 'https://res.cloudinary.com/...',
  theme: {
    color: '#0EA5E9',
    colorRgb: '14, 165, 233',   // used for rgba() in CSS vars
    cards: [{ title, subtitle, body, icon }],  // icon is raw SVG string
  },
}
</script>
```

`IndustryPage.vue` injects `--ind-color` and `--ind-rgb` as CSS custom properties on the cards section. Cards without `body` show shimmer placeholder lines + a "Content coming soon" badge.

The cards section crossfades `#0a0a0f → var(--color-bg)` via an IntersectionObserver (`threshold: 0.35`) that toggles `.cards-section--crema`. On scroll back (top > 0) it resets to black.

Industry pages use `scroll-snap-type: y proximity` on `.ind-page` (not on `html`), with three snap sections: hero, cards, CTA+footer.

## Videos

All videos hosted on Cloudinary (`res.cloudinary.com/dpi6oudmk`). Loaded via `<source src="...">` inside `<video autoplay muted loop playsinline preload="auto">`.

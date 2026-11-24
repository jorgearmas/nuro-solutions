# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server on port 3001
npm run build     # production build (don't run while dev is running: it overwrites .nuxt)
npm run preview   # preview production build
```

No test suite or linter configured.

## Architecture

**Stack:** Nuxt 3 · Vue 3 · Tailwind CSS · GSAP 3 · vee-validate · emailjs-com · Swiper 11

**Source root:** `app/` (configured via `srcDir` in `nuxt.config.ts`)

**Component auto-import prefixes:**
- `app/components/ui/` → prefix `App` (e.g. `AppNavbar`, `AppFooter`)
- `app/components/sections/` → no prefix (e.g. `IndustryPage`, `CareersApplyForm`)

**Pages:** `app/pages/` — file-based routing. Industry sub-pages live in `pages/industries/` and Careers in `pages/careers/`.

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

## Index Page Sections

`pages/index.vue` has four sections, identified by class: `.hero-sec`, `.ideas-sec`, `.journey-sec`, `.logos-sec`.

Background crossfades use modifier classes on the sections themselves, not `body`:
- `.ideas-sec--dark` when `journeyActive`
- `.journey-sec--dark` when `journeyActive && !logosActive`
- `.logos-sec--light` when `logosActive`

`journeyActive` comes from a GSAP ScrollTrigger. `logosActive` comes from an `IntersectionObserver` with `rootMargin: '0px 0px -55% 0px'`.

## Journey Carousel (index page)

Instagram-style carousel with 4 panels: Explore, Experiment, Learn, Scale. GSAP and ScrollTrigger are lazy-imported in `onMounted`, and `gsap.matchMedia` splits the two layouts:

- **Desktop (>=1024px):** `.journey-sec` is pinned. The scroll range has one equal slice per panel (`SLICE` sets its length in viewport heights). When the slice changes, a time-based tween slides `.journey-track` to that panel, so it never stops between two.
- **Mobile (<=1023px):** no pin. `.journey-track` is a native horizontal scroller with `scroll-snap`.

`activeRoom` drives the active panel and the progress lane. The Nuro face (`.journey-traveler`) hops between stations using `journeyPos`, and `.journey-station` buttons act as the carousel dots. `goToRoom(i)` serves the arrows (desktop only) and stations; each layout installs its own `goToRoomImpl`.

Don't use ScrollTrigger `snap` here: it conflicts with `html { scroll-behavior: smooth }` in `main.css`.

## Careers

Offers are created and published in Nuro Platform (`../nurosolutions-platform`, Recruitment module). This site only displays them and sends applications back.

```
Browser -> /api/careers/* (app/server, Vercel) -> Nuro Platform /api/recruitment/*
```

The browser never calls Nuro Platform directly. The server routes add the secret `X-Website-Key` and the visitor's IP in `X-Client-IP`, forward only whitelisted fields, and turn unexpected platform responses into a generic 502.

- **Pages:** `pages/careers/index.vue` (list) and `pages/careers/[slug].vue` (detail + form). Offers are fetched client-side in `onMounted`.
- **Form:** `components/sections/CareersApplyForm.vue`, with `composables/useCareers.js` and `composables/useTurnstile.js`.
- **Server routes:** `app/server/` (with `srcDir: 'app/'`, Nuxt 3 looks for `server/` there, not at the repo root). Shared logic is in `server/utils/platform.js`.
- **CV limits:** PDF only, max 4 MB, because Vercel functions reject bodies over 4.5 MB. The platform re-validates everything, including the Turnstile token.
- **Offer text:** render as plain text, never with `v-html`.

Environment variables:

| Variable | Where | Exposure |
|---|---|---|
| `NUXT_PLATFORM_API_URL` | Vercel, `.env` | Server only |
| `NUXT_PLATFORM_API_KEY` | Vercel, `.env` | Server only; must equal `WEBSITE_API_KEY` on the platform |
| `NUXT_PUBLIC_TURNSTILE_SITE_KEY` | Vercel, `.env` | Public |

Local dev needs Nuro Platform running on `:8080` (Sail) and Cloudflare's always-pass Turnstile test keys (see `.env.example`). Production uses `nuxt build` on Vercel; `nuxt generate` would drop the server routes and break Careers.

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

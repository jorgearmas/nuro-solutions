<template>
  <footer class="border-t border-border">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-16">

      <!-- Top row -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">

        <!-- Brand -->
        <div class="lg:col-span-2">
          <a href="/" class="flex items-center gap-3 group">
            <img :src="logoUrl" alt="Nuro Solutions" class="h-8 w-auto" />
          </a>
          <p class="text-muted text-sm leading-relaxed max-w-xs">
            Data-driven marketing systems engineered to increase conversions, lower acquisition costs, and scale ROI intentionally.
          </p>
          <div class="flex gap-4 mt-6">
            <a href="https://www.linkedin.com/company/nurosolutions/" target="_blank" class="social-icon" aria-label="LinkedIn">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com" target="_blank" class="social-icon" aria-label="Instagram">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <p class="section-tag mb-4">Navigation</p>
          <ul class="space-y-2">
            <li v-for="link in footerLinks" :key="link.to">
              <NuxtLink :to="link.to" class="footer-link">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <p class="section-tag mb-4">Contact</p>
          <ul class="space-y-3 text-sm text-muted">
            <li>
              <a href="mailto:start@nurosolutions.com" class="footer-link">start@nurosolutions.com</a>
            </li>
            <li>
              <a href="tel:18007242047" class="footer-link">1 (800) 724-2047</a>
            </li>
            <li class="leading-relaxed">Dover City, Delaware 19901</li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
        <p class="text-muted text-xs">© {{ year }} Nuro Solutions LLC. All rights reserved.</p>
        <p class="text-muted text-xs font-display tracking-wider">Making People's Dreams Come True™</p>
        <div class="flex gap-6">
          <NuxtLink to="/privacy-policy" class="text-muted text-xs hover:text-text transition-colors">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="text-muted text-xs hover:text-text transition-colors">Terms & Conditions</NuxtLink>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
const logoUrl = '/logo.png'

const footerLinks = [
  { label: 'Industries', to: '/industries' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Core Drivers', to: '/core_drivers' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
]
</script>

<style scoped>
.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-muted);
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.social-icon:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: var(--color-accent-glow);
}

.footer-link {
  color: var(--color-muted);
  font-size: 0.825rem;
  transition: color 0.2s;
}
.footer-link:hover {
  color: var(--color-text);
}
</style>

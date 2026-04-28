<template>
  <div class="min-h-screen">
    <AppNavbar />

    <section class="page-hero">
      <div class="orb" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24">
        <div class="section-tag">
          <span class="glow-dot"></span>
          <NuxtLink to="/industries" class="hover:text-text transition-colors">Industries</NuxtLink>
          <span class="text-border mx-1">/</span>
          {{ industry.label }}
        </div>
        <h1 class="text-5xl lg:text-7xl font-display mb-6 max-w-3xl">
          {{ industry.headline }}
        </h1>
        <p class="text-muted text-lg max-w-xl leading-relaxed">{{ industry.description }}</p>
        <div class="flex gap-4 mt-10">
          <NuxtLink to="/contact" class="btn-primary">Get Started</NuxtLink>
          <NuxtLink to="/solutions" class="btn-ghost">Our Solutions</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Placeholder content -->
    <section class="max-w-7xl mx-auto px-6 lg:px-10 py-24">
      <div class="placeholder-grid">
        <div v-for="i in 3" :key="i" class="placeholder-card">
          <div class="placeholder-icon">
            <div class="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
              <span class="text-accent font-display font-700">0{{ i }}</span>
            </div>
          </div>
          <div class="placeholder-lines">
            <div class="ph-line ph-line--title"></div>
            <div class="ph-line"></div>
            <div class="ph-line ph-line--short"></div>
          </div>
          <div class="coming-soon-tag">Content coming soon</div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
      <div class="cta-card">
        <div>
          <p class="section-tag mb-4"><span class="glow-dot"></span>Let's Talk</p>
          <h2 class="font-display text-3xl lg:text-4xl mb-3">
            Ready to grow in {{ industry.label }}?
          </h2>
          <p class="text-muted">Tell us about your business and we'll show you what's possible.</p>
        </div>
        <NuxtLink to="/contact" class="btn-primary shrink-0">
          Start the Conversation →
        </NuxtLink>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
const props = defineProps({ industry: Object })
</script>

<style scoped>
.page-hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);
}
.orb {
  position: absolute;
  top: -100px; right: 0;
  width: 500px; height: 500px;
  border-radius: 50%;
  filter: blur(120px);
  background: radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%);
  pointer-events: none;
}
.placeholder-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
.placeholder-card {
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  position: relative;
}
.placeholder-icon { margin-bottom: 1.5rem; }
.placeholder-lines { display: flex; flex-direction: column; gap: 0.75rem; }
.ph-line {
  height: 12px;
  border-radius: 6px;
  background: var(--color-border);
  animation: shimmer 2s ease-in-out infinite;
}
.ph-line--title { height: 20px; width: 60%; }
.ph-line--short { width: 40%; }
@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
.coming-soon-tag {
  position: absolute;
  top: 1rem; right: 1rem;
  font-size: 0.65rem;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  background: var(--color-surface-2, #141a22);
  border: 1px solid var(--color-border);
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
}
.cta-card {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 3rem;
}
@media (min-width: 768px) {
  .cta-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

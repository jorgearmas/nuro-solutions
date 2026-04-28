<template>
  <div class="min-h-screen">
    <AppNavbar />

    <section class="page-hero">
      <div class="orb" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24">
        <div class="section-tag"><span class="glow-dot"></span>Portfolio</div>
        <h1 class="text-5xl lg:text-7xl font-display mb-6 max-w-3xl">
          Brands we've helped <em class="accent-em">grow.</em>
        </h1>
        <p class="text-muted text-lg max-w-xl leading-relaxed">
          A selection of the businesses we've partnered with to build smarter marketing systems and drive measurable results.
        </p>
      </div>
    </section>

    <!-- Portfolio Grid -->
    <section class="max-w-7xl mx-auto px-6 lg:px-10 py-24">
      <div class="portfolio-grid">
        <div
          v-for="client in clients"
          :key="client.name"
          class="portfolio-card"
        >
          <div class="portfolio-card__top">
            <div class="portfolio-card__logo">
              <span class="font-display font-700 text-lg">{{ client.initial }}</span>
            </div>
            <div class="portfolio-card__industry">{{ client.industry }}</div>
          </div>
          <h3 class="font-display text-xl mb-2">{{ client.name }}</h3>
          <p class="text-muted text-sm leading-relaxed mb-6">{{ client.description }}</p>
          <div class="portfolio-card__tags">
            <span v-for="tag in client.tags" :key="tag" class="ptag">{{ tag }}</span>
          </div>
          <a v-if="client.url" :href="client.url" target="_blank" class="portfolio-card__link">
            Visit →
          </a>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
      <div class="section-tag mb-8"><span class="glow-dot"></span>Work Gallery</div>
      <div class="gallery-grid">
        <div
          v-for="n in 6"
          :key="n"
          class="gallery-item"
          :style="`background-image: url('/gallery/${n}.jpg')`"
        >
          <div class="gallery-overlay">
            <span class="gallery-label">Project {{ n }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
      <div class="cta-row">
        <div>
          <h2 class="font-display text-3xl lg:text-4xl mb-3">Want to be our next success story?</h2>
          <p class="text-muted">Let's talk about what we can build together.</p>
        </div>
        <NuxtLink to="/contact" class="btn-primary shrink-0">Get Started →</NuxtLink>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
const clients = [
  {
    initial: 'F',
    name: 'Futeca Gym',
    industry: 'Fitness',
    description: 'Social media strategy and paid campaigns to grow membership and brand awareness for this soccer-focused gym.',
    tags: ['Social Media', 'Paid Ads'],
    url: 'https://www.instagram.com/futecagym/',
  },
  {
    initial: 'L',
    name: 'Look Beauty Handmade',
    industry: 'Beauty & Lifestyle',
    description: 'Brand identity and social content strategy for a handmade beauty brand building its online presence.',
    tags: ['Branding', 'Social Media', 'Content'],
    url: 'https://www.instagram.com/look_beautyhandmade/',
  },
  {
    initial: 'M',
    name: 'Mundo Travel Corp',
    industry: 'Travel & Tourism',
    description: 'Digital marketing and web strategy to increase booking conversions and expand reach for a Guatemalan travel agency.',
    tags: ['Web', 'Marketing', 'Paid Ads'],
    url: 'https://www.instagram.com/mundotravelcorpguatemala/',
  },
  {
    initial: 'G',
    name: 'Go West Markets',
    industry: 'Retail',
    description: 'E-commerce strategy and performance marketing to drive sales growth for this US-based retail brand.',
    tags: ['E-commerce', 'Performance Marketing'],
    url: 'https://gowestmarkets.com',
  },
]
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
.accent-em {
  font-style: italic;
  background: linear-gradient(135deg, var(--color-accent) 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.portfolio-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  transition: border-color 0.3s, transform 0.3s;
}
.portfolio-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}
.portfolio-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}
.portfolio-card__logo {
  width: 48px; height: 48px;
  border-radius: 10px;
  background: var(--color-accent-glow);
  border: 1px solid var(--color-accent);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-accent);
}
.portfolio-card__industry {
  font-size: 0.7rem;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}
.portfolio-card__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem; }
.ptag {
  font-size: 0.7rem;
  font-family: var(--font-display);
  letter-spacing: 0.05em;
  color: var(--color-accent);
  background: var(--color-accent-glow);
  border: 1px solid rgba(37,99,235,0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}
.portfolio-card__link {
  font-family: var(--font-display);
  font-size: 0.825rem;
  color: var(--color-accent);
  transition: opacity 0.2s;
}
.portfolio-card__link:hover { opacity: 0.7; }

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
@media (max-width: 768px) {
  .gallery-grid { grid-template-columns: 1fr 1fr; }
}
.gallery-item {
  aspect-ratio: 4/3;
  border-radius: 10px;
  background-color: var(--color-surface);
  background-size: cover;
  background-position: center;
  border: 1px solid var(--color-border);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s;
}
.gallery-item:hover { transform: scale(1.02); }
.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(8,11,16,0.8) 0%, transparent 50%);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s;
}
.gallery-item:hover .gallery-overlay { opacity: 1; }
.gallery-label {
  font-family: var(--font-display);
  font-size: 0.75rem;
  color: var(--color-text);
}

.cta-row {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 3rem;
}
@media (min-width: 1024px) {
  .cta-row { flex-direction: row; align-items: center; justify-content: space-between; }
}
</style>

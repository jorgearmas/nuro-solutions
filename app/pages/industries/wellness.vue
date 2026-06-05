<template>
  <IndustryPage :industry="industry" />
</template>

<script setup>
const industry = {
  label: 'Wellness',
  headline: 'Grow the brands that help people live better.',
  description: 'Growth strategies for gyms, spas, nutrition brands, and mental health platforms focused on lifestyle transformation.',
  video: 'https://res.cloudinary.com/dpi6oudmk/video/upload/v1779915092/wellness_industries_immsjy.mp4',
  theme: {
    color: '#22C55E',
    colorRgb: '34, 197, 94',
    cards: [
      {
        title: 'Our Methodology',
        subtitle: 'A holistic growth framework tailored to lifestyle and wellness brands.',
        body: 'We blend community-building strategies with performance marketing to create sustainable growth for lifestyle brands. Data-driven decisions meet human-first messaging for authentic connections that convert and retain.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`,
      },
      {
        title: 'Client Transformations',
        subtitle: 'Real results from brands that helped people change their lives.',
        body: 'Our wellness clients see an average 180% increase in qualified lead volume within the first 90 days, with retention rates that significantly outperform industry benchmarks.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`,
      },
      {
        title: 'Community & Retention',
        subtitle: 'Systems that turn first-time buyers into lifetime wellness advocates.',
        body: 'We design loyalty systems and content ecosystems that keep your clients engaged beyond their first purchase — turning satisfied customers into vocal brand ambassadors who drive referrals.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`,
      },
    ],
  },
}
</script>

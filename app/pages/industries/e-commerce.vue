<template>
  <IndustryPage :industry="industry" />
</template>

<script setup>
const industry = {
  label: 'E-Commerce',
  headline: 'Scale your store with systems built to perform.',
  description: 'Performance marketing, CRO, and retention systems built to scale online stores profitably and predictably.',
  video: 'https://res.cloudinary.com/dpi6oudmk/video/upload/v1779915075/ecommerce_industries_lvhtds.mp4',
  theme: {
    color: '#06B6D4',
    colorRgb: '6, 182, 212',
    cards: [
      {
        title: 'Performance Marketing',
        subtitle: 'Paid media systems engineered to maximize ROAS across every channel.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
      },
      {
        title: 'Conversion Rate Optimization',
        subtitle: 'Data-driven testing that turns more browsers into buyers.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>`,
      },
      {
        title: 'Email & Retention',
        subtitle: 'Automated flows that recover carts, upsell, and build repeat buyers.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
      },
    ],
  },
}
</script>

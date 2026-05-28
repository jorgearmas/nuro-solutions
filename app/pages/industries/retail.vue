<template>
  <IndustryPage :industry="industry" />
</template>

<script setup>
const industry = {
  label: 'Retail',
  headline: 'Drive revenue from first click to loyal customer.',
  description: 'End-to-end digital marketing for retail brands — from acquisition to retention — built to drive sustainable revenue growth.',
  video: 'https://res.cloudinary.com/dpi6oudmk/video/upload/v1779915098/retail_industries_vanpbk.mp4',
  theme: {
    color: '#EF4444',
    colorRgb: '239, 68, 68',
    cards: [
      {
        title: 'Customer Acquisition',
        subtitle: 'Paid and organic strategies that bring high-intent shoppers to your store.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>`,
      },
      {
        title: 'In-Store & Online',
        subtitle: 'Unified omnichannel strategies that bridge physical and digital retail.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>`,
      },
      {
        title: 'Retention & LTV',
        subtitle: 'Loyalty programs and email systems that maximize lifetime customer value.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
      },
    ],
  },
}
</script>

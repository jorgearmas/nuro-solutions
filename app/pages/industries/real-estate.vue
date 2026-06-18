<template>
  <IndustryPage :industry="industry">
    <template #cards>
      <RealEstateCards :cards="industry.theme.cards" />
    </template>
  </IndustryPage>
</template>

<script setup>
const industry = {
  label: 'Real Estate',
  headline: 'Marketing that turns properties into opportunities.',
  description: 'Lead generation and brand positioning for agents, developers, and property management companies.',
  video: 'https://res.cloudinary.com/dpi6oudmk/video/upload/v1779915145/real_state_industries_qvmmbz.mp4',
  theme: {
    color: '#F59E0B',
    colorRgb: '245, 158, 11',
    cards: [
      {
        title: 'Lead Generation',
        subtitle: 'High-intent buyer and seller pipelines built to convert at every stage.',
        body: 'We build automated lead funnels powered by targeted paid media and SEO that capture buyers and sellers at every stage of their decision journey — delivering qualified prospects ready to act.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`,
      },
      {
        title: 'Brand Positioning',
        subtitle: 'Establish authority in your market with a brand that commands trust.',
        body: 'From visual identity to thought leadership content, we craft the brand narrative that sets you apart in a crowded market — building the reputation that drives referrals and repeat business at scale.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>`,
      },
      {
        title: 'Market Results',
        subtitle: 'Data-backed campaigns with measurable impact on closings and revenue.',
        body: 'Our real estate clients consistently report lower cost-per-lead, higher close rates, and stronger repeat business — all backed by transparent reporting dashboards that keep you in full control.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
      },
    ],
  },
}
</script>

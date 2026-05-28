<template>
  <IndustryPage :industry="industry" />
</template>

<script setup>
const industry = {
  label: 'Hospitality',
  headline: 'Turn first-time guests into lifelong advocates.',
  description: 'Digital marketing for hotels, restaurants, and travel brands that convert visitors into loyal, returning customers.',
  video: 'https://res.cloudinary.com/dpi6oudmk/video/upload/v1779916221/hospitality_industries_w3fc6n.mp4',
  theme: {
    color: '#EC4899',
    colorRgb: '236, 72, 153',
    cards: [
      {
        title: 'Guest Experience',
        subtitle: 'Marketing that starts before arrival and lasts long after checkout.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>`,
      },
      {
        title: 'Direct Booking Growth',
        subtitle: 'Reduce OTA dependency with strategies that drive direct revenue.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
      },
      {
        title: 'Loyalty & Retention',
        subtitle: 'Programs that keep guests coming back and spreading the word.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`,
      },
    ],
  },
}
</script>

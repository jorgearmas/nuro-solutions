<template>
  <IndustryPage :industry="industry" />
</template>

<script setup>
const industry = {
  label: 'Healthcare',
  headline: 'Marketing that bridges the gap between providers and patients.',
  description: 'Marketing systems designed for hospitals, clinics, and medical practices — compliant, empathetic, and patient-centric.',
  video: 'https://res.cloudinary.com/dpi6oudmk/video/upload/v1779915065/healthcare_industries_de0xo9.mp4',
  theme: {
    color: '#0EA5E9',
    colorRgb: '14, 165, 233',
    cards: [
      {
        title: 'Our Approach',
        subtitle: 'Compliant, empathetic strategies built around the patient journey.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`,
      },
      {
        title: 'Patient Acquisition',
        subtitle: 'Targeted campaigns that bring the right patients to your practice.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
      },
      {
        title: 'Trust & Compliance',
        subtitle: 'HIPAA-ready systems that build credibility and protect your brand.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`,
      },
    ],
  },
}
</script>

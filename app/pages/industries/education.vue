<template>
  <IndustryPage :industry="industry" />
</template>

<script setup>
const industry = {
  label: 'Education',
  headline: 'Enroll more students. Build lasting brands.',
  description: 'Enrollment marketing and brand building for institutions, EdTech platforms, and online course creators.',
  video: 'https://res.cloudinary.com/dpi6oudmk/video/upload/v1779915088/education_industries_czr6gn.mp4',
  theme: {
    color: '#6366F1',
    colorRgb: '99, 102, 241',
    cards: [
      {
        title: 'Enrollment Marketing',
        subtitle: 'Full-funnel campaigns that attract, nurture, and convert prospective students.',
        body: 'Multi-channel campaigns combining paid search, social, and content marketing reach prospective students at every stage of their decision-making process — from first discovery to enrollment.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>`,
      },
      {
        title: 'Institution Branding',
        subtitle: 'Build the authority and reputation that makes students choose you first.',
        body: 'We help schools and EdTech platforms define and communicate their unique value proposition — building the digital presence and thought leadership that commands trust and drives applications.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`,
      },
      {
        title: 'Student Retention',
        subtitle: 'Engagement systems that keep students active, satisfied, and referring others.',
        body: 'Personalized communication flows and community engagement strategies keep enrolled students motivated and satisfied — while turning happy students into active advocates who refer new prospects.',
        icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`,
      },
    ],
  },
}
</script>

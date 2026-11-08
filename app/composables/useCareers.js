// Careers client. The browser only talks to this site's own server routes
// (app/server/api/careers/*); those forward to Nuro Platform with a secret
// key the browser never sees.
//
//   GET  /api/careers/offers              → published offers
//   GET  /api/careers/offers/:slug        → one offer (404 if not open)
//   POST /api/careers/offers/:slug/apply  → multipart form, field `cv` (PDF)

export const CV_MAX_BYTES = 4 * 1024 * 1024 // Vercel caps request bodies at 4.5 MB
export const CV_EXTENSIONS = ['pdf']

const BASE = '/api/careers'

export function useCareers() {
  const fetchOffers = async () => (await $fetch(`${BASE}/offers`)).data

  const fetchOffer = async (slug) =>
    (await $fetch(`${BASE}/offers/${encodeURIComponent(slug)}`)).data

  // `formData` is a FormData. Don't set Content-Type: the browser adds the
  // multipart boundary itself.
  const submitApplication = (slug, formData) =>
    $fetch(`${BASE}/offers/${encodeURIComponent(slug)}/apply`, {
      method: 'POST',
      body: formData,
    })

  return { fetchOffers, fetchOffer, submitApplication }
}

export function formatPostedDate(iso) {
  if (!iso) return ''
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .format(new Date(iso))
}

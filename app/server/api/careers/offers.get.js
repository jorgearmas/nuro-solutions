// GET /api/careers/offers → published offers (via Nuro Platform).
export default defineEventHandler(async (event) => {
  const { data } = await platformFetch(event, '/offers')

  // Let Vercel's edge cache the list briefly: fewer platform calls, and a
  // flood of page views can't be amplified into platform traffic.
  setResponseHeader(event, 'Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300')

  return data
})

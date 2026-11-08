// GET /api/careers/offers/:slug → one published offer (404 if not open).
export default defineEventHandler(async (event) => {
  const slug = assertSlug(getRouterParam(event, 'slug'))
  const { status, data } = await platformFetch(event, `/offers/${slug}`, {}, [200, 404])

  if (status === 404) {
    setResponseHeader(event, 'Cache-Control', 'no-store')
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  setResponseHeader(event, 'Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300')
  return data
})

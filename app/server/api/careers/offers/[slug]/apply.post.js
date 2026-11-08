// POST /api/careers/offers/:slug/apply → forwards an application (multipart,
// with the CV) to Nuro Platform. Only whitelisted fields are forwarded; the
// platform re-validates everything, including the Turnstile token.

// Vercel functions reject bodies over 4.5 MB; the CV itself is capped at 4 MB.
const MAX_BODY_BYTES = 4.5 * 1024 * 1024
const MAX_FIELD_CHARS = 6000
const TEXT_FIELDS = ['full_name', 'email', 'phone', 'linkedin_url', 'message', 'website', 'turnstile_token']

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store')

  const slug = assertSlug(getRouterParam(event, 'slug'))

  const length = Number(getHeader(event, 'content-length') || 0)
  if (length > MAX_BODY_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Your CV must be 4 MB or smaller.' })
  }
  if (!(getHeader(event, 'content-type') || '').startsWith('multipart/form-data')) {
    throw createError({ statusCode: 415, statusMessage: 'Unsupported content type' })
  }

  const parts = (await readMultipartFormData(event)) || []
  const form = new FormData()
  let hasCv = false

  for (const part of parts) {
    if (part.name === 'cv' && part.filename && !hasCv) {
      // Keep a tidy filename; the platform stores the file under a random name
      // anyway and validates the real bytes.
      const name = part.filename.replace(/[^\w.\- ]+/g, '_').slice(0, 120) || 'cv.pdf'
      form.append('cv', new Blob([part.data], { type: part.type || 'application/octet-stream' }), name)
      hasCv = true
    } else if (TEXT_FIELDS.includes(part.name) && !part.filename) {
      form.append(part.name, part.data.toString('utf8').slice(0, MAX_FIELD_CHARS))
    }
    // Anything else is dropped.
  }

  const { status, data } = await platformFetch(
    event,
    `/offers/${slug}/applications`,
    { method: 'POST', body: form },
    [201, 404, 422, 429],
  )

  setResponseStatus(event, status)

  // Pass back only what the form needs.
  if (status === 422) return { message: data?.message, errors: data?.errors || {} }
  return { message: data?.message || '' }
})

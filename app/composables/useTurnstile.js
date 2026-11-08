// Cloudflare Turnstile widget (explicit rendering), loaded once per page.
// Docs: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
let scriptPromise = null

function loadScript() {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = SCRIPT_SRC
      s.async = true
      s.defer = true
      s.onload = () => resolve(window.turnstile)
      s.onerror = () => {
        scriptPromise = null
        reject(new Error('Turnstile failed to load'))
      }
      document.head.appendChild(s)
    })
  }
  return scriptPromise
}

/**
 * Renders the widget into `el` and keeps `token` (a ref) in sync.
 * Returns { reset, remove }. Tokens are single-use: call reset() after
 * every submit attempt that reached the server.
 */
export async function mountTurnstile(el, token, { siteKey, action = 'apply', onError } = {}) {
  const turnstile = await loadScript()

  const id = turnstile.render(el, {
    sitekey: siteKey,
    action, // must match TurnstileVerifier::ACTION on the platform
    theme: 'light',
    callback: (t) => { token.value = t },
    'expired-callback': () => { token.value = '' },
    'error-callback': () => {
      token.value = ''
      onError?.()
    },
  })

  return {
    reset: () => { token.value = ''; turnstile.reset(id) },
    remove: () => turnstile.remove(id),
  }
}

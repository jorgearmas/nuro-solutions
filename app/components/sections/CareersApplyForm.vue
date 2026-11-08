<template>
  <div class="form-card">
    <h2 class="font-display text-2xl mb-1">Apply for this role</h2>
    <p class="text-muted text-sm mb-8">Tell us a bit about yourself and attach your CV. We read every application.</p>

    <div v-if="state === 'success'" class="status-msg status-msg--success" role="status">
      <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      Application sent! Thanks, {{ sentName }}. We'll be in touch if your profile is a fit.
    </div>

    <form v-else class="space-y-6" novalidate @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label" for="ap-name">Full name *</label>
        <input id="ap-name" v-model.trim="form.full_name" type="text" class="form-input" autocomplete="name" placeholder="Ana López" required maxlength="255" />
        <p v-if="errors.full_name" class="field-error">{{ errors.full_name }}</p>
      </div>

      <div class="grid sm:grid-cols-2 gap-5">
        <div class="form-group">
          <label class="form-label" for="ap-email">Email *</label>
          <input id="ap-email" v-model.trim="form.email" type="email" class="form-input" autocomplete="email" placeholder="you@email.com" required maxlength="255" />
          <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
        </div>
        <div class="form-group">
          <label class="form-label" for="ap-phone">Phone</label>
          <input id="ap-phone" v-model.trim="form.phone" type="tel" class="form-input" autocomplete="tel" placeholder="+502 0000 0000" maxlength="40" />
          <p v-if="errors.phone" class="field-error">{{ errors.phone }}</p>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="ap-linkedin">LinkedIn</label>
        <input id="ap-linkedin" v-model.trim="form.linkedin_url" type="url" class="form-input" placeholder="https://www.linkedin.com/in/you" maxlength="255" />
        <p v-if="errors.linkedin_url" class="field-error">{{ errors.linkedin_url }}</p>
      </div>

      <div class="form-group">
        <label class="form-label" for="ap-message">Message</label>
        <textarea id="ap-message" v-model="form.message" class="form-input form-textarea" rows="5" maxlength="5000" placeholder="Why this role? What would you bring to the team?"></textarea>
        <p v-if="errors.message" class="field-error">{{ errors.message }}</p>
      </div>

      <!-- CV upload -->
      <div class="form-group">
        <span id="ap-cv-label" class="form-label">CV *</span>
        <label
          class="cv-drop"
          :class="{ 'cv-drop--over': dragging, 'cv-drop--filled': cv, 'cv-drop--error': errors.cv }"
          @dragover.prevent="dragging = true"
          @dragleave.prevent="dragging = false"
          @drop.prevent="onDrop"
        >
          <input
            ref="fileInput"
            type="file"
            class="sr-only"
            accept=".pdf,application/pdf"
            aria-labelledby="ap-cv-label"
            @change="onPick"
          />
          <svg class="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span v-if="cv" class="cv-file">
            <strong>{{ cv.name }}</strong>
            <span class="text-muted text-xs">{{ formatSize(cv.size) }} · click to change</span>
          </span>
          <span v-else class="cv-file">
            <strong>Drop your CV here or click to browse</strong>
            <span class="text-muted text-xs">PDF only · max 4 MB</span>
          </span>
        </label>
        <p v-if="errors.cv" class="field-error">{{ errors.cv }}</p>
      </div>

      <!-- Honeypot: hidden from people, tempting for bots. Must stay empty. -->
      <div class="hp" aria-hidden="true">
        <label>Website <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" /></label>
      </div>

      <!-- Cloudflare Turnstile (anti-bot). Verified again on the platform. -->
      <div class="form-group">
        <div ref="turnstileEl" class="turnstile"></div>
        <p v-if="errors.turnstile_token" class="field-error">{{ errors.turnstile_token }}</p>
      </div>

      <label class="consent">
        <input v-model="consent" type="checkbox" />
        <span>I agree that Nuro Solutions may store my details and CV to evaluate my application.</span>
      </label>
      <p v-if="errors.consent" class="field-error -mt-4">{{ errors.consent }}</p>

      <div v-if="state === 'error'" class="status-msg status-msg--error" role="alert">
        <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ errorMessage }}
      </div>

      <button type="submit" class="btn-primary w-full justify-center" :disabled="state === 'sending'">
        <span v-if="state === 'sending'">Sending...</span>
        <span v-else>Submit application</span>
        <svg v-if="state !== 'sending'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { CV_EXTENSIONS, CV_MAX_BYTES, useCareers } from '~/composables/useCareers'
import { mountTurnstile } from '~/composables/useTurnstile'

const props = defineProps({
  slug: { type: String, required: true },
})
const emit = defineEmits(['closed'])

const { submitApplication } = useCareers()

const blank = () => ({ full_name: '', email: '', phone: '', linkedin_url: '', message: '', website: '' })
const form = reactive(blank())
const cv = ref(null)
const consent = ref(false)
const dragging = ref(false)
const fileInput = ref(null)
const errors = reactive({})
const state = ref('idle') // idle | sending | success | error
const errorMessage = ref('')
const sentName = ref('')

// Turnstile
const { turnstileSiteKey } = useRuntimeConfig().public
const turnstileEl = ref(null)
const turnstileToken = ref('')
let widget = null

onMounted(async () => {
  if (!turnstileSiteKey) {
    console.error('NUXT_PUBLIC_TURNSTILE_SITE_KEY is not set')
    errors.turnstile_token = 'Verification is unavailable right now. Please email us your CV at start@nurosolutions.com.'
    return
  }
  try {
    widget = await mountTurnstile(turnstileEl.value, turnstileToken, {
      siteKey: turnstileSiteKey,
      onError: () => { errors.turnstile_token = 'Verification failed. Please reload the page and try again.' },
    })
  } catch (e) {
    console.error(e)
    errors.turnstile_token = 'Verification could not load. Please disable blockers for this page or email us your CV.'
  }
})
onBeforeUnmount(() => widget?.remove())

function setFile(file) {
  delete errors.cv
  if (!file) return
  const ext = file.name.split('.').pop()?.toLowerCase()
  if (!CV_EXTENSIONS.includes(ext)) {
    errors.cv = 'Your CV must be a PDF file.'
    return
  }
  if (file.size > CV_MAX_BYTES) {
    errors.cv = 'Your CV must be 4 MB or smaller.'
    return
  }
  cv.value = file
}
function onPick(e) { setFile(e.target.files?.[0]) }
function onDrop(e) {
  dragging.value = false
  setFile(e.dataTransfer?.files?.[0])
}

function formatSize(bytes) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

// Quick checks before hitting the API; the platform re-validates everything.
function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.full_name) errors.full_name = 'Please enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Please enter a valid email.'
  if (form.linkedin_url && !/^https:\/\//i.test(form.linkedin_url)) errors.linkedin_url = 'Use a full https:// link.'
  if (!cv.value) errors.cv = 'Please attach your CV.'
  if (!consent.value) errors.consent = 'Please accept so we can review your application.'
  if (!turnstileToken.value) errors.turnstile_token = 'Please complete the verification.'
  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  if (!validate()) return

  state.value = 'sending'
  const data = new FormData()
  Object.entries(form).forEach(([k, v]) => { if (v) data.append(k, v) })
  data.append('cv', cv.value)
  data.append('turnstile_token', turnstileToken.value)

  try {
    await submitApplication(props.slug, data)
    sentName.value = form.full_name.split(' ')[0]
    state.value = 'success'
    Object.assign(form, blank())
    cv.value = null
    consent.value = false
  } catch (e) {
    state.value = 'error'
    // The token was spent (or rejected) on the server: get a fresh one.
    widget?.reset()
    const code = e?.response?.status ?? e?.statusCode
    if (code === 422) {
      // Map the platform's validation errors onto the fields.
      const fieldErrors = e.data?.errors ?? {}
      Object.entries(fieldErrors).forEach(([k, msgs]) => { errors[k] = msgs[0] })
      errorMessage.value = 'Please review the highlighted fields.'
    } else if (code === 404) {
      errorMessage.value = 'This position is no longer open.'
      emit('closed')
    } else if (code === 413) {
      errors.cv = 'Your CV must be 4 MB or smaller.'
      errorMessage.value = 'Please review the highlighted fields.'
    } else if (code === 429) {
      errorMessage.value = 'Too many attempts. Please wait a few minutes and try again.'
    } else {
      console.error('Application error:', e)
      errorMessage.value = 'Something went wrong. Please try again or email us at start@nurosolutions.com.'
    }
  }
}
</script>

<style scoped>
.form-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: clamp(1.5rem, 4vw, 3rem);
}
.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.form-label {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.form-input {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.875rem 1rem;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.9rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
  outline: none;
}
.form-input::placeholder { color: var(--color-muted); }
.form-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-glow);
}
.form-textarea { resize: vertical; min-height: 130px; }
.field-error { color: #dc2626; font-size: 0.8rem; }

/* CV drop zone */
.cv-drop {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 1.5px dashed var(--color-border);
  border-radius: 10px;
  background: var(--color-surface-2);
  color: var(--color-accent);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.cv-drop:hover,
.cv-drop--over { border-color: var(--color-accent); background: var(--color-accent-glow); }
.cv-drop:focus-within { border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-glow); }
.cv-drop--filled { border-style: solid; }
.cv-drop--error { border-color: #dc2626; }
.cv-file { display: flex; flex-direction: column; gap: 0.15rem; color: var(--color-text); font-size: 0.9rem; min-width: 0; }
.cv-file strong { font-weight: 600; overflow-wrap: anywhere; }

.consent {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.5;
  cursor: pointer;
}
.consent input { margin-top: 0.2rem; accent-color: var(--color-accent); }

.turnstile { min-height: 65px; }

/* Honeypot: off-screen rather than display:none (some bots skip hidden fields). */
.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }

.status-msg {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
}
.status-msg--success {
  background: rgba(34,197,94,0.08);
  border: 1px solid rgba(34,197,94,0.3);
  color: #15803d;
}
.status-msg--error {
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.3);
  color: #b91c1c;
}
button:disabled { opacity: 0.6; cursor: not-allowed; }
</style>

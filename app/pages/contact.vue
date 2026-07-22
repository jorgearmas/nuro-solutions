<template>
  <div class="contact-page">
    <AppNavbar />

    <!-- ── 1. Hero ────────────────────────────────────────── -->
    <section class="snap-sec page-hero">
      <div class="orb" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 w-full">
        <div class="section-tag"><span class="glow-dot"></span>Contact</div>
        <h1 class="text-5xl lg:text-7xl font-display mb-6 max-w-3xl">
          Open door,<br /><em class="accent-em">real dialogue.</em>
        </h1>
        <p class="text-muted text-lg max-w-xl leading-relaxed">
          Whether you're exploring how automation can scale your marketing, want to discuss a new campaign, or simply need a fresh perspective — we're here to listen first.
        </p>
      </div>
    </section>

    <!-- ── 2. Form + Info + Footer ────────────────────────── -->
    <section class="snap-sec form-section">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 w-full py-16">
        <div class="grid lg:grid-cols-5 gap-16">

          <!-- Contact info -->
          <div class="lg:col-span-2 space-y-10">

            <div>
              <p class="section-tag mb-4"><span class="glow-dot"></span>Get in Touch</p>
              <div class="space-y-4">
                <a href="mailto:start@nurosolutions.com" class="contact-item group">
                  <div class="contact-item__icon">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-muted font-display uppercase tracking-widest mb-1">Email</p>
                    <p class="text-text group-hover:text-accent transition-colors">start@nurosolutions.com</p>
                  </div>
                </a>
                <a href="tel:18007242047" class="contact-item group">
                  <div class="contact-item__icon">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-muted font-display uppercase tracking-widest mb-1">Phone</p>
                    <p class="text-text group-hover:text-accent transition-colors">1 (800) 724-2047</p>
                  </div>
                </a>
                <div class="contact-item">
                  <div class="contact-item__icon">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-muted font-display uppercase tracking-widest mb-1">Location</p>
                    <p class="text-text">Dover City, Delaware 19901</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Team -->
            <div>
              <p class="section-tag mb-4"><span class="glow-dot"></span>Frontline Team</p>
              <div class="space-y-4">
                <div v-for="member in team" :key="member.name" class="team-card">
                  <div class="team-card__avatar">{{ member.initials }}</div>
                  <div>
                    <p class="font-display font-600">{{ member.name }}</p>
                    <p class="text-muted text-xs">{{ member.role }}</p>
                    <p class="text-muted text-xs mt-1 leading-relaxed italic">"{{ member.quote }}"</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Form -->
          <div class="lg:col-span-3 flex flex-col gap-5">
            <div class="flex justify-center">
              <a href="https://wa.me/50233585085" target="_blank" class="btn-wa">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contact Us via WhatsApp
              </a>
            </div>
            <div class="form-card flex-1">
              <h2 class="font-display text-2xl mb-1">Send us a message</h2>
              <p class="text-muted text-sm mb-8">We'll respond personally and help you uncover your next move.</p>

              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid sm:grid-cols-2 gap-5">
                  <div class="form-group">
                    <label class="form-label">First name *</label>
                    <input v-model="form.firstName" type="text" class="form-input" placeholder="Chris" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Last name *</label>
                    <input v-model="form.lastName" type="text" class="form-input" placeholder="Ramirez" required />
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Business name *</label>
                  <input v-model="form.business" type="text" class="form-input" placeholder="Nuro Solutions" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Email *</label>
                  <input v-model="form.email" type="email" class="form-input" placeholder="you@company.com" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Phone</label>
                  <input v-model="form.phone" type="tel" class="form-input" placeholder="+1 (800) 000-0000" />
                </div>
                <div class="form-group">
                  <label class="form-label">Message *</label>
                  <textarea v-model="form.message" class="form-input form-textarea" rows="6" placeholder="Tell us what you're building, what keeps you curious, or where you're stuck..." required></textarea>
                </div>

                <div v-if="status === 'success'" class="status-msg status-msg--success">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Message sent! We'll get back to you shortly.
                </div>
                <div v-if="status === 'error'" class="status-msg status-msg--error">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Something went wrong. Please email us directly.
                </div>

                <button type="submit" class="btn-primary w-full justify-center" :disabled="sending">
                  <span v-if="sending">Sending...</span>
                  <span v-else>Send Message</span>
                  <svg v-if="!sending" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </section>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import emailjs from 'emailjs-com'

// ── EmailJS config ──────────────────────────────
// Credenciales desde .env (NUXT_PUBLIC_EMAILJS_*). Son públicas por diseño.
// El destino (start@nurosolutions.com) se configura en el campo "To Email"
// de la plantilla en EmailJS.
const {
  emailjsPublicKey: EMAILJS_PUBLIC_KEY,
  emailjsServiceId: EMAILJS_SERVICE_ID,
  emailjsTemplateId: EMAILJS_TEMPLATE_ID,
} = useRuntimeConfig().public

const form = reactive({ firstName: '', lastName: '', business: '', email: '', phone: '', message: '' })
const status = ref(null)
const sending = ref(false)

const team = [
  { initials: 'CR', name: 'Christopher Ramirez', role: 'Founder & CEO', quote: 'Every dollar we invest in creativity has a measurable purpose behind it.' },
  { initials: 'MP', name: 'Melissa Payes', role: 'Co-founder & CFO', quote: 'We turn strategy into repeatable systems that drive real results.' },
  { initials: 'NE', name: 'Nicolle Enriquez', role: 'CMO', quote: 'Great marketing does not interrupt people, it connects with them.' },
  { initials: 'JA', name: 'Jorge Armas', role: 'CTO', quote: 'Technology is the foundation that transforms vision into scalable reality.' },
]

async function handleSubmit() {
  sending.value = true
  status.value = null
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: 'start@nurosolutions.com',
        from_name: `${form.firstName} ${form.lastName}`.trim(),
        business: form.business,
        reply_to: form.email,
        phone: form.phone,
        message: form.message,
      },
      EMAILJS_PUBLIC_KEY,
    )
    status.value = 'success'
    Object.keys(form).forEach(k => form[k] = '')
  } catch (e) {
    console.error('EmailJS error:', e)
    status.value = 'error'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
/* ── Scroll container con snap ───────────────── */
.contact-page {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y proximity;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.contact-page::-webkit-scrollbar { display: none; }

/* ── Snap ────────────────────────────────────── */
.snap-sec {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* ── Hero ────────────────────────────────────── */
.page-hero {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
}
.orb {
  position: absolute;
  top: -100px; right: 0;
  width: 500px; height: 500px;
  border-radius: 50%;
  filter: blur(120px);
  background: radial-gradient(circle, rgba(112,64,172,0.12) 0%, transparent 70%);
  pointer-events: none;
}
.accent-em {
  font-style: italic;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Form section ────────────────────────────── */
.form-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}

/* ── Contact items ───────────────────────────── */
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  transition: border-color 0.2s;
}
.contact-item:hover { border-color: var(--color-accent); }
.contact-item__icon {
  width: 40px; height: 40px;
  border-radius: 8px;
  background: var(--color-accent-glow);
  border: 1px solid rgba(112,64,172,0.2);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-accent);
  flex-shrink: 0;
}
.contact-item__icon--wa {
  background: rgba(37,211,102,0.08);
  border-color: rgba(37,211,102,0.25);
  color: #25d366;
}

/* ── Team cards ──────────────────────────────── */
.team-card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
}
.team-card__avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--color-accent-glow);
  border: 1px solid var(--color-accent);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-accent);
  flex-shrink: 0;
}

/* ── Form card ───────────────────────────────── */
.form-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 3rem;
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
.form-textarea { resize: vertical; min-height: 160px; }

/* ── Status messages ─────────────────────────── */
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
  color: #4ade80;
}
.status-msg--error {
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.3);
  color: #f87171;
}
button:disabled { opacity: 0.6; cursor: not-allowed; }

/* ── WhatsApp button ─────────────────────────── */
.btn-wa {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.875rem 2rem;
  background: #25d366;
  color: #ffffff;
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  border-radius: 999px;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.25);
}
.btn-wa:hover {
  background: #1ebe5d;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(37, 211, 102, 0.35);
}
</style>

'use client'

import { useState } from 'react'
import Turnstile from 'react-turnstile'
import { useParams } from 'next/navigation'

export default function ContactPage() {
  const params = useParams()
  const locale = (params?.locale as string) || 'ka'
  const isKa = locale === 'ka'

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [token, setToken] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    setStatus('loading')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, turnstileToken: token }),
    })

    setStatus(res.ok ? 'success' : 'error')
  }

  const inputClass = 'w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-gold'

  return (
    <div className="pt-16">
      <section className="bg-dark text-white py-24 text-center px-4">
        <h1 className="font-heading text-4xl mb-4">{isKa ? 'კონტაქტი' : 'Contact Us'}</h1>
        <p className="text-white/70">{isKa ? 'გვიპასუხეთ 24 საათში' : 'We respond within 24 hours'}</p>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          {status === 'success' ? (
            <div className="text-center py-16">
              <p className="text-2xl mb-4">✅</p>
              <h2 className="font-heading text-2xl text-dark mb-4">{isKa ? 'მადლობა!' : 'Thank you!'}</h2>
              <p className="text-secondary">{isKa ? 'თქვენი შეტყობინება მიღებულია. მალე დაგიკავშირდებით.' : "Your message has been received. We'll be in touch shortly."}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-secondary mb-1">{isKa ? 'სახელი *' : 'Name *'}</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm text-secondary mb-1">{isKa ? 'ელ. ფოსტა *' : 'Email *'}</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-secondary mb-1">{isKa ? 'ტელეფონი' : 'Phone'}</label>
                <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm text-secondary mb-1">{isKa ? 'თემა *' : 'Subject *'}</label>
                <input required value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm text-secondary mb-1">{isKa ? 'შეტყობინება *' : 'Message *'}</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className={inputClass} />
              </div>

              <Turnstile
                sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                onVerify={setToken}
              />

              {status === 'error' && (
                <p className="text-red-500 text-sm">{isKa ? 'შეცდომა. სცადეთ ხელახლა.' : 'Something went wrong. Please try again.'}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !token}
                className="w-full bg-gold text-white py-3 rounded font-medium hover:bg-gold-dark disabled:opacity-50 transition-colors"
              >
                {status === 'loading' ? (isKa ? 'იგზავნება...' : 'Sending...') : (isKa ? 'გაგზავნა' : 'Send Message')}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Turnstile from 'react-turnstile'
import RichText from '@/components/ui/RichText'

interface Props {
  locale: string
  strings: {
    subtitle: string
    heading: string
    heroSubtitle: string
    infoSubtitle: string
    info: string
    addressLabel: string
    address: string
    workingHoursLabel: string
    workingHours: string
    phone: string
    email: string
  }
}

export default function ContactPageClient({ locale, strings }: Props) {
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

  const inputClass =
    'w-full border border-gray-200 px-5 py-3.5 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-300 bg-white font-light'

  return (
    <div className="pt-[82px]">
      {/* Hero */}
      <section className="relative bg-navy text-white py-24 md:py-32 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="relative z-10">
          <RichText html={strings.subtitle} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
          <div className="w-12 h-[2px] bg-gold mx-auto mb-8" />
          <RichText html={strings.heading} as="h1" className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 tracking-[-0.02em]" />
          <RichText html={strings.heroSubtitle} as="p" className="text-white/50 text-lg font-light" />
        </div>
      </section>

      {/* Split layout */}
      <section className="py-20 md:py-28 px-4 bg-cream bg-subtle-pattern">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2">
              <RichText html={strings.infoSubtitle} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
              <RichText html={strings.info} as="h2" className="font-heading text-2xl md:text-3xl text-dark mb-8" />

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <RichText html={strings.addressLabel} as="p" className="text-dark font-heading text-sm mb-1" />
                    <a
                      href="https://maps.app.goo.gl/u8enJWpSmMdmJFhY7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary text-sm font-light hover:text-gold transition-colors duration-300"
                    >
                      <RichText html={strings.address} />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-dark font-heading text-sm mb-1">{isKa ? 'ტელეფონი' : 'Phone'}</p>
                    <a href={`tel:${strings.phone.replace(/\s/g, '')}`} className="text-secondary text-sm font-light hover:text-gold transition-colors duration-300">
                      {strings.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-dark font-heading text-sm mb-1">{isKa ? 'ელ. ფოსტა' : 'Email'}</p>
                    <a href={`mailto:${strings.email}`} className="text-secondary text-sm font-light hover:text-gold transition-colors duration-300">
                      {strings.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Working hours */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <RichText html={strings.workingHoursLabel} as="p" className="text-dark font-heading text-sm mb-3" />
                <RichText html={strings.workingHours} as="p" className="text-secondary text-sm font-light" />
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              {status === 'success' ? (
                <div className="text-center py-20 bg-white border border-gray-100">
                  <div className="w-16 h-16 mx-auto mb-6 border border-gold/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h2 className="font-heading text-2xl text-dark mb-4">
                    {isKa ? 'მადლობა!' : 'Thank you!'}
                  </h2>
                  <p className="text-secondary font-light">
                    {isKa
                      ? 'თქვენი შეტყობინება მიღებულია. მალე დაგიკავშირდებით.'
                      : "Your message has been received. We'll be in touch shortly."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-8 md:p-10 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[12px] text-dark uppercase tracking-[0.1em] mb-2 font-medium">
                        {isKa ? 'სახელი *' : 'Name *'}
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-dark uppercase tracking-[0.1em] mb-2 font-medium">
                        {isKa ? 'ელ. ფოსტა *' : 'Email *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] text-dark uppercase tracking-[0.1em] mb-2 font-medium">
                      {isKa ? 'ტელეფონი' : 'Phone'}
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-dark uppercase tracking-[0.1em] mb-2 font-medium">
                      {isKa ? 'თემა *' : 'Subject *'}
                    </label>
                    <input
                      required
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-dark uppercase tracking-[0.1em] mb-2 font-medium">
                      {isKa ? 'შეტყობინება *' : 'Message *'}
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className={inputClass + ' resize-none'}
                    />
                  </div>

                  <Turnstile
                    sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                    onVerify={setToken}
                  />

                  {status === 'error' && (
                    <p className="text-red-500 text-sm font-light">
                      {isKa ? 'შეცდომა. სცადეთ ხელახლა.' : 'Something went wrong. Please try again.'}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading' || !token}
                    className="w-full bg-gold text-white py-4 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gold-dark disabled:opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                  >
                    {status === 'loading'
                      ? (isKa ? 'იგზავნება...' : 'Sending...')
                      : (isKa ? 'გაგზავნა' : 'Send Message')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative">
        <a
          href="https://maps.app.goo.gl/u8enJWpSmMdmJFhY7"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative group"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5!2d44.7827!3d41.7151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQyJzU0LjQiTiA0NMKwNDYnNTcuNyJF!5e0!3m2!1sen!2sge!4v1"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full pointer-events-none"
            title="Strategic Counsel Group Office Location"
          />
          <div className="absolute inset-0 bg-dark/5 group-hover:bg-dark/0 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/80 to-transparent p-8">
            <div className="container mx-auto max-w-6xl flex items-center justify-between">
              <div className="text-white">
                <p className="font-heading text-lg mb-1">Strategic Counsel Group</p>
                <RichText html={strings.address} as="p" className="text-white/70 text-sm font-light" />
              </div>
              <div className="hidden md:flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-300">
                {isKa ? 'რუკაზე ნახვა' : 'View on Map'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            </div>
          </div>
        </a>
      </section>
    </div>
  )
}

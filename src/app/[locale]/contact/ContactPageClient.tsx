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
    whatsapp: string
    telegram: string
    facebook: string
    linkedin: string
    companyName: string
    companyId: string
    legalAddressLabel: string
    legalAddress: string
    officeAddressLabel: string
    officeAddress: string
  }
}

export default function ContactPageClient({ locale, strings }: Props) {
  const isKa = locale === 'ka'

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [token, setToken] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [policyOpened, setPolicyOpened] = useState(false)

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
    <div className="pt-[220px]">
      {/* Hero */}
      <section className="relative bg-section-gradient text-white py-24 md:py-32 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="relative z-10">
          <RichText html={strings.subtitle} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
          <div className="w-12 h-[2px] bg-gold mx-auto mb-8" />
          <RichText html={strings.heading} as="h1" className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 tracking-[-0.02em]" />
          <RichText html={strings.heroSubtitle} as="p" className="text-white/50 text-lg font-light" />
        </div>
      </section>

      {/* Split layout */}
      <section className="bg-white py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-[72rem]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] rounded-2xl overflow-hidden shadow-2xl">
            {/* Left: Contact Info */}
            <div className="bg-white p-10 md:p-14 text-navy">
              <RichText html={strings.info} as="h2" className="font-heading text-lg md:text-xl lg:text-2xl text-navy font-extrabold mb-8 whitespace-nowrap" />

              <div className="space-y-8">
                {/* Company Info + Addresses */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div className="text-[15px] leading-snug font-[520] tracking-tight">
                    <RichText html={strings.addressLabel} as="p" className="text-navy font-heading text-[16px] font-black tracking-[0.06em] mb-2" />
                    <a
                      href="https://maps.app.goo.gl/u8enJWpSmMdmJFhY7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold font-bold tracking-tight hover:text-gold-dark transition-colors duration-300"
                    >
                      {isKa
                        ? 'საქართველო, თბილისი, დ. არაყიშვილის ქ. N3, ოფისი 71'
                        : 'Georgia, Tbilisi, D. Arakishvili St. N3, Office 71'}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-navy font-heading text-[16px] font-black tracking-[0.06em] mb-2">{isKa ? 'ტელეფონი' : 'Phone'}</p>
                    <a href={`tel:${strings.phone.replace(/\s/g, '')}`} className="text-gold text-[15px] font-bold tracking-tight hover:text-gold-dark transition-colors duration-300">
                      {strings.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-navy font-heading text-[16px] font-black tracking-[0.06em] mb-2">{isKa ? 'ელ. ფოსტა' : 'Email'}</p>
                    <a href={`mailto:${strings.email}`} className="text-gold text-[15px] font-bold tracking-tight hover:text-gold-dark transition-colors duration-300">
                      {strings.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Connect with Us */}
              <div className="mt-10 pt-8 border-t border-navy/10">
                <p className="text-navy font-heading text-[18px] font-black tracking-[0.06em] mb-4">
                  {isKa ? 'დაგვიკავშირდით' : 'Connect with Us'}
                </p>
                <div className="flex items-center gap-3">
                  {strings.facebook && (
                    <a
                      href={strings.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  )}
                  {strings.linkedin && (
                    <a
                      href={strings.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {strings.whatsapp && (
                    <a
                      href={`https://wa.me/${strings.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M11.892 0C5.341 0 0 5.341 0 11.892c0 2.096.547 4.142 1.587 5.945L.057 24l6.305-1.654a11.88 11.88 0 005.53 1.367h.004C18.451 23.713 24 18.372 24 11.82 24 5.267 18.451 0 11.892 0zm-.004 21.817h-.003a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981 1-3.648-.235-.374a9.867 9.867 0 01-1.512-5.258c0-5.448 4.434-9.883 9.886-9.883 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.884 9.884z" />
                      </svg>
                    </a>
                  )}
                  {strings.telegram && (
                    <a
                      href={strings.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Telegram"
                      className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Working hours */}
              <div className="mt-10 pt-8 border-t border-navy/10">
                <RichText html={strings.workingHoursLabel} as="p" className="text-navy font-heading text-[18px] font-black tracking-[0.06em] mb-3" />
                <RichText html={strings.workingHours} as="p" className="text-navy/80 text-[18px] font-bold tracking-tight" />
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white p-10 md:p-14">
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

                  <p className="text-secondary text-[13px] leading-relaxed">
                    {isKa
                      ? <>შეტყობინების გამოგზავნით ადასტურებთ, რომ გაეცანით და ეთანხმებით{' '}
                          <a
                            href="/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setPolicyOpened(true)}
                            className="text-gold underline hover:text-gold-dark transition-colors"
                          >
                            პერსონალურ მონაცემთა დამუშავების პოლიტიკას
                          </a>.</>
                      : <>By sending this message you confirm that you have read and agree to the{' '}
                          <a
                            href={`/en/privacy-policy`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setPolicyOpened(true)}
                            className="text-gold underline hover:text-gold-dark transition-colors"
                          >
                            Personal Data Processing Policy
                          </a>.</>
                    }
                  </p>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm font-light">
                      {isKa ? 'შეცდომა. სცადეთ ხელახლა.' : 'Something went wrong. Please try again.'}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading' || !token || !policyOpened}
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

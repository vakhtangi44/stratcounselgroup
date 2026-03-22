'use client'

import { useState } from 'react'

export default function NewsletterForm({ locale }: { locale: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <p className="text-green-400 text-sm">
        {locale === 'ka' ? 'გამოწერა წარმატებულია!' : 'Subscribed successfully!'}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={locale === 'ka' ? 'თქვენი ელ. ფოსტა' : 'Your email'}
        required
        className="flex-1 bg-white/10 text-white placeholder-white/40 border border-white/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold min-w-0"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-gold hover:bg-gold-dark text-white px-3 py-2 rounded text-sm transition-colors shrink-0 disabled:opacity-50"
      >
        {locale === 'ka' ? 'გამოწერა' : 'Subscribe'}
      </button>
    </form>
  )
}

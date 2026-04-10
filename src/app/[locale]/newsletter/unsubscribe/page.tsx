'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useParams } from 'next/navigation'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const params = useParams()
  const locale = (params?.locale as string) || 'ka'
  const isKa = locale === 'ka'
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'missing'>(() => token ? 'loading' : 'missing')

  useEffect(() => {
    if (!token) return
    fetch('/api/newsletter/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    }).then((r) => setStatus(r.ok ? 'success' : 'error'))
  }, [token])

  const messages = {
    loading: isKa ? 'მუშავდება...' : 'Processing...',
    success: isKa ? 'გამოწერა გაუქმებულია.' : 'You have been unsubscribed.',
    error: isKa ? 'შეცდომა. სცადეთ ხელახლა.' : 'Something went wrong.',
    missing: isKa ? 'ბმული არასწორია.' : 'Invalid unsubscribe link.',
  }

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-xl text-dark">{messages[status]}</p>
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense>
      <UnsubscribeContent />
    </Suspense>
  )
}

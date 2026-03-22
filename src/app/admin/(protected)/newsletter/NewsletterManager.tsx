'use client'

import { useState } from 'react'

interface Subscriber {
  id: number
  email: string
  active: boolean
  subscribedAt: Date
}

export default function NewsletterManager({ subscribers }: { subscribers: Subscriber[] }) {
  const [form, setForm] = useState({
    subjectKa: '',
    subjectEn: '',
    bodyKa: '',
    bodyEn: '',
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  async function handleSend(preview: boolean) {
    if (!form.subjectKa || !form.bodyKa) {
      alert('Subject (KA) and Body (KA) are required')
      return
    }
    setLoading(true)
    setResult(null)
    const res = await fetch('/api/admin/newsletter/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, preview }),
    })
    const data = await res.json()
    if (res.ok) {
      setResult(
        preview
          ? 'Preview sent to admin email.'
          : `Sent to ${data.sent} of ${data.total} subscribers.`
      )
    } else {
      setResult(`Error: ${data.error}`)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Send form */}
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl">
        <h2 className="font-heading text-lg text-dark mb-4">Send Newsletter</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">Subject (KA) *</label>
              <input
                value={form.subjectKa}
                onChange={(e) => setForm((f) => ({ ...f, subjectKa: e.target.value }))}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Subject (EN)</label>
              <input
                value={form.subjectEn}
                onChange={(e) => setForm((f) => ({ ...f, subjectEn: e.target.value }))}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">Body (KA) *</label>
              <textarea
                value={form.bodyKa}
                onChange={(e) => setForm((f) => ({ ...f, bodyKa: e.target.value }))}
                rows={8}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Body (EN)</label>
              <textarea
                value={form.bodyEn}
                onChange={(e) => setForm((f) => ({ ...f, bodyEn: e.target.value }))}
                rows={8}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>
          {result && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
              {result}
            </p>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => handleSend(true)}
              disabled={loading}
              className="px-5 py-2 rounded border border-gold text-gold text-sm hover:bg-gold/10 disabled:opacity-50"
            >
              {loading ? '...' : 'Preview (to admin)'}
            </button>
            <button
              onClick={() => handleSend(false)}
              disabled={loading}
              className="bg-gold text-white px-5 py-2 rounded text-sm hover:bg-gold-dark disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send to All Subscribers'}
            </button>
          </div>
        </div>
      </div>

      {/* Subscriber list */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-3xl">
        <h2 className="font-heading text-lg text-dark px-6 py-4 border-b border-gray-100">Subscribers</h2>
        <table className="w-full text-sm">
          <thead className="bg-bg-alt text-secondary">
            <tr>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Subscribed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscribers.map((s) => (
              <tr key={s.id} className="hover:bg-bg-alt/50">
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${s.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {s.active ? 'Active' : 'Unsubscribed'}
                  </span>
                </td>
                <td className="px-4 py-3 text-secondary">
                  {new Date(s.subscribedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 && (
          <p className="text-center text-secondary py-8">No subscribers yet.</p>
        )}
      </div>
    </div>
  )
}

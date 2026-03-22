'use client'

import { Fragment, useState } from 'react'

interface Message {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

export default function MessagesTable({ messages: initial }: { messages: Message[] }) {
  const [messages, setMessages] = useState(initial)
  const [expanded, setExpanded] = useState<number | null>(null)

  async function markRead(id: number, read: boolean) {
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    })
    if (res.ok) {
      setMessages((msgs) => msgs.map((m) => (m.id === id ? { ...m, read } : m)))
    }
  }

  async function deleteMessage(id: number) {
    if (!confirm('Delete this message?')) return
    const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setMessages((msgs) => msgs.filter((m) => m.id !== id))
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-bg-alt text-secondary">
          <tr>
            <th className="text-left px-4 py-3">Name</th>
            <th className="text-left px-4 py-3">Email</th>
            <th className="text-left px-4 py-3">Subject</th>
            <th className="text-left px-4 py-3">Date</th>
            <th className="text-left px-4 py-3">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {messages.map((msg) => (
            <Fragment key={msg.id}>
              <tr
                className={`hover:bg-bg-alt/50 cursor-pointer ${!msg.read ? 'bg-gold/5 font-medium' : ''}`}
                onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
              >
                <td className="px-4 py-3">{msg.name}</td>
                <td className="px-4 py-3 text-secondary">{msg.email}</td>
                <td className="px-4 py-3">{msg.subject}</td>
                <td className="px-4 py-3 text-secondary">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${!msg.read ? 'bg-gold/20 text-gold' : 'bg-gray-100 text-gray-500'}`}>
                    {msg.read ? 'Read' : 'Unread'}
                  </span>
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2">
                    {!msg.read ? (
                      <button
                        onClick={() => markRead(msg.id, true)}
                        className="text-xs text-secondary hover:text-dark"
                      >
                        Mark read
                      </button>
                    ) : (
                      <button
                        onClick={() => markRead(msg.id, false)}
                        className="text-xs text-secondary hover:text-dark"
                      >
                        Mark unread
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              {expanded === msg.id && (
                <tr>
                  <td colSpan={6} className="px-4 py-4 bg-bg-alt/30">
                    <div className="space-y-2">
                      {msg.phone && (
                        <p className="text-sm text-secondary">
                          <span className="font-medium text-dark">Phone:</span> {msg.phone}
                        </p>
                      )}
                      <p className="text-sm whitespace-pre-wrap text-dark">{msg.message}</p>
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                        className="inline-block text-sm text-gold hover:underline"
                      >
                        Reply via email
                      </a>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      {messages.length === 0 && (
        <p className="text-center text-secondary py-8">No messages yet.</p>
      )}
    </div>
  )
}

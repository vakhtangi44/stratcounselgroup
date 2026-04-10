'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface FAQ {
  id: number
  questionKa: string
  questionEn: string
  practiceArea: string
  order: number
  active: boolean
}

export default function FaqReorderList({ initialItems }: { initialItems: FAQ[] }) {
  const [items, setItems] = useState(initialItems)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const dragIndex = useRef<number | null>(null)

  function onDragStart(index: number) {
    dragIndex.current = index
  }

  function onDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    const from = dragIndex.current
    if (from === null || from === index) return
    const updated = [...items]
    const [moved] = updated.splice(from, 1)
    updated.splice(index, 0, moved)
    dragIndex.current = index
    setItems(updated)
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    dragIndex.current = null
  }

  async function saveOrder() {
    setSaving(true)
    await fetch('/api/admin/faq/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items.map((item, i) => ({ id: item.id, order: i }))),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl text-dark">FAQ</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={saveOrder}
            disabled={saving}
            className={`px-4 py-2 rounded text-sm transition-all duration-300 ${
              saved
                ? 'bg-green-100 text-green-700'
                : 'bg-dark text-white hover:bg-navy disabled:opacity-50'
            }`}
          >
            {saving ? 'Saving…' : saved ? 'Order Saved!' : 'Save Order'}
          </button>
          <Link href="/admin/faq/new" className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark">
            + New FAQ
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-alt text-secondary">
            <tr>
              <th className="px-4 py-3 w-8"></th>
              <th className="text-left px-4 py-3">Question (KA)</th>
              <th className="text-left px-4 py-3">Practice Area</th>
              <th className="text-left px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item, i) => (
              <tr
                key={item.id}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragOver={(e) => onDragOver(e, i)}
                onDrop={onDrop}
                className="hover:bg-bg-alt/50 cursor-grab active:cursor-grabbing active:bg-gold/5 transition-colors"
              >
                <td className="px-4 py-3 text-secondary text-lg select-none">⠿</td>
                <td className="px-4 py-3 font-medium max-w-xs truncate">{item.questionKa}</td>
                <td className="px-4 py-3 text-secondary">{item.practiceArea || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/faq/${item.id}/edit`} className="text-gold hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <p className="text-center text-secondary py-8">No FAQs yet.</p>
        )}
      </div>
      <p className="text-xs text-secondary mt-2">Drag rows to reorder, then click "Save Order".</p>
    </div>
  )
}

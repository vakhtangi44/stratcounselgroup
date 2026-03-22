'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  label: string
  valueKa: string
  valueEn: string
  onChangeKa: (val: string) => void
  onChangeEn: (val: string) => void
  multiline?: boolean
  rows?: number
  required?: boolean
}

export default function BilingualField({
  label, valueKa, valueEn, onChangeKa, onChangeEn,
  multiline = false, rows = 3, required = false,
}: Props) {
  const [tab, setTab] = useState<'ka' | 'en'>('ka')
  const inputClass = 'w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold'

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm text-secondary">{label}</label>
        <div className="flex rounded overflow-hidden border border-gray-200 text-xs">
          {(['ka', 'en'] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setTab(l)}
              className={cn('px-3 py-1 transition-colors', tab === l ? 'bg-gold text-white' : 'bg-white text-secondary hover:bg-gray-50')}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      {multiline ? (
        <textarea
          value={tab === 'ka' ? valueKa : valueEn}
          onChange={(e) => tab === 'ka' ? onChangeKa(e.target.value) : onChangeEn(e.target.value)}
          rows={rows}
          required={required && tab === 'ka'}
          className={inputClass}
        />
      ) : (
        <input
          type="text"
          value={tab === 'ka' ? valueKa : valueEn}
          onChange={(e) => tab === 'ka' ? onChangeKa(e.target.value) : onChangeEn(e.target.value)}
          required={required && tab === 'ka'}
          className={inputClass}
        />
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import RichText from '@/components/ui/RichText'

interface Term {
  id: number
  termKa: string
  termEn: string
  definitionKa: string
  definitionEn: string
}

interface Props {
  locale: string
  pageTitle: string
}

export default function GlossaryPageClient({ locale, pageTitle }: Props) {
  const isKa = locale === 'ka'

  const [terms, setTerms] = useState<Term[]>([])
  const [search, setSearch] = useState('')
  const [letter, setLetter] = useState('')

  useEffect(() => {
    fetch('/api/glossary').then((r) => r.json()).then(setTerms)
  }, [])

  const filtered = terms.filter((t) => {
    const term = isKa ? t.termKa : t.termEn
    const def = isKa ? t.definitionKa : t.definitionEn
    const matchSearch = !search || term.toLowerCase().includes(search.toLowerCase()) || def.toLowerCase().includes(search.toLowerCase())
    const matchLetter = !letter || term.toUpperCase().startsWith(letter)
    return matchSearch && matchLetter
  })

  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

  return (
    <div className="pt-16">
      <section className="bg-dark text-white py-24 text-center px-4">
        <RichText html={pageTitle} as="h1" className="font-heading text-4xl mb-4" />
      </section>

      <section className="py-8 px-4 bg-bg-alt border-b">
        <div className="container mx-auto max-w-3xl">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isKa ? 'ძიება...' : 'Search terms...'}
            className="w-full border border-gray-200 rounded px-4 py-3 text-sm mb-4 focus:outline-none focus:border-gold"
          />
          <div className="flex flex-wrap gap-1">
            <button onClick={() => setLetter('')} className={`px-2 py-1 text-xs rounded ${!letter ? 'bg-gold text-white' : 'bg-white border border-gray-200 text-secondary hover:border-gold'}`}>All</button>
            {letters.map((l) => (
              <button key={l} onClick={() => setLetter(letter === l ? '' : l)}
                className={`px-2 py-1 text-xs rounded ${letter === l ? 'bg-gold text-white' : 'bg-white border border-gray-200 text-secondary hover:border-gold'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl space-y-4">
          {filtered.map((term) => (
            <div key={term.id} className="border-b border-gray-100 pb-4">
              <h3 className="font-heading text-lg text-dark mb-1">{isKa ? term.termKa : term.termEn}</h3>
              <p className="text-secondary text-sm">{isKa ? term.definitionKa : term.definitionEn}</p>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-secondary py-8">{isKa ? 'ტერმინი ვერ მოიძებნა' : 'No terms found'}</p>}
        </div>
      </section>
    </div>
  )
}

import type { PressItem } from '@prisma/client'

interface Props {
  items: PressItem[]
}

export default function PressStrip({ items }: Props) {
  if (items.length === 0) return null

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs text-secondary uppercase tracking-widest mb-8">
          As Seen In
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-gold transition-colors font-medium"
            >
              {item.outletName}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { PressItem } from '@prisma/client'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface Props {
  items: PressItem[]
}

export default function PressStrip({ items }: Props) {
  if (items.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gray-200" />
            <p className="text-[11px] text-secondary uppercase tracking-[0.3em] font-medium">
              As Seen In
            </p>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-secondary/60 hover:text-gold transition-colors duration-300 font-heading font-semibold text-lg tracking-wide"
              >
                {item.outletName}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

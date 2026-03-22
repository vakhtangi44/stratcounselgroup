import AnimatedCounter from '@/components/ui/AnimatedCounter'
import type { Statistic } from '@prisma/client'

interface Props {
  stats: Statistic[]
  locale: string
}

export default function StatsSection({ stats, locale }: Props) {
  return (
    <section className="py-16 bg-dark text-white">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.key}>
            <p className="font-heading text-4xl md:text-5xl text-gold mb-2">
              <AnimatedCounter target={parseInt(stat.value)} suffix={stat.suffix ?? ''} />
            </p>
            <p className="text-white/70 text-sm">
              {locale === 'ka' ? stat.labelKa : stat.labelEn}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

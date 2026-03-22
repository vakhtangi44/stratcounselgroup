import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import type { Statistic } from '@prisma/client'

interface Props {
  stats: Statistic[]
  locale: string
}

export default function StatsSection({ stats, locale }: Props) {
  return (
    <section className="py-20 md:py-28 bg-navy text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dark-pattern" />

      {/* Subtle geometric elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.key} delay={i * 150} className="text-center relative">
              {/* Animated gold line above stat */}
              <div className="flex justify-center mb-6">
                <div className="h-[1px] w-8 bg-gold opacity-0 transition-all duration-1000 ease-out"
                  style={{ transitionDelay: `${i * 150 + 300}ms` }}
                  data-stat-line
                />
              </div>
              <p className="font-heading text-5xl md:text-6xl lg:text-7xl text-gold mb-4 tracking-tight transition-all duration-500 hover:animate-shimmer cursor-default">
                <AnimatedCounter target={parseInt(stat.value)} suffix={stat.suffix ?? ''} />
              </p>
              {/* Gold divider */}
              <GoldDivider className="mb-4" />
              <p className="text-white/50 text-sm uppercase tracking-[0.15em] font-light">
                {locale === 'ka' ? stat.labelKa : stat.labelEn}
              </p>

              {/* Separator line between stats (hidden on last in row) */}
              {i < stats.length - 1 && (
                <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent hidden md:block" />
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

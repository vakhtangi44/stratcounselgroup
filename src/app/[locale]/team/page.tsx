import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { unstable_noStore as noStore } from 'next/cache'
import { getSettings, s } from '@/lib/settings'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import RichText from '@/components/ui/RichText'

export default async function TeamPage() {
  noStore()
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  const [members, settings] = await Promise.all([
    db.teamMember.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    }),
    getSettings(),
  ])

  return (
    <div className="pt-[170px]">
      {/* Compact Hero */}
      <section className="relative bg-navy text-white py-[3.9rem] md:py-[5.46rem] text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="relative z-10">
          <RichText html={s(settings, 'page.team.subtitle', locale)} as="p" className="text-gold text-[16.5px] uppercase tracking-[0.3em] mb-3" />
          <div className="gold-divider mx-auto mb-4" />
          <RichText html={s(settings, 'page.team', locale)} as="h1" className="font-heading text-[2.8rem] md:text-[3.4rem] tracking-[-0.02em]" />
        </div>
      </section>

      {/* Team Grid */}
      <section className="pt-[8rem] pb-[8rem] px-4 bg-cream bg-subtle-pattern">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {members.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 100}>
                <Link href={`${prefix}/team/${member.slug}`} className="group block w-full h-full">
                  <div className="flex flex-col h-full">
                    <div className="relative aspect-[10/9] overflow-hidden flex-shrink-0 mb-4">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={isKa ? member.nameKa : member.nameEn}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full bg-gradient-to-br from-dark to-navy" />
                      )}
                    </div>
                    <div className="text-center">
                      <h2 className="font-heading text-[22px] text-dark group-hover:text-gold transition-colors duration-300 leading-snug">
                        {isKa ? member.nameKa : member.nameEn}
                      </h2>
                      <p className="text-secondary text-[17px] mt-1 font-light tracking-wide leading-snug">
                        {isKa ? member.titleKa : member.titleEn}
                      </p>
                      {member.gbaNumber && (
                        <p className="text-[11px] text-gold/70 mt-2 uppercase tracking-[0.15em]">
                          GBA #{member.gbaNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

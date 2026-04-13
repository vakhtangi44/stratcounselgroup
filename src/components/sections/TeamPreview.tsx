import Link from 'next/link'
import Image from 'next/image'
import type { TeamMember } from '@prisma/client'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import RichText from '@/components/ui/RichText'

interface Props {
  members: TeamMember[]
  locale: string
  strings: {
    subtitle: string
    title: string
    meetFullTeam: string
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function TeamPreview({ members, locale, strings }: Props) {
  const prefix = locale === 'en' ? '/en' : ''
  if (members.length === 0) return null

  return (
    <section className="py-20 md:py-28 bg-cream bg-linen">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <RichText html={strings.subtitle} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
          <RichText html={strings.title} as="h2" className="font-heading text-3xl md:text-4xl text-dark gold-underline inline-block" />
          <GoldDivider className="mt-8" />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {members.map((member, i) => (
            <ScrollReveal key={member.id} delay={i * 150}>
              <Link
                href={`${prefix}/team/${member.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-gradient-to-br from-gray-700 to-dark">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={locale === 'ka' ? member.nameKa : member.nameEn}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark to-navy" />
                  )}
                </div>
                <div>
                  <h2 className="font-heading text-[19.9px] text-dark group-hover:text-gold transition-colors duration-300 leading-snug font-bold tracking-tight">
                    {locale === 'ka' ? member.nameKa : member.nameEn}
                  </h2>
                  <p className="text-secondary text-[14.4px] mt-1 font-medium uppercase tracking-[0.02em] leading-snug">
                    {locale === 'ka' ? member.titleKa : member.titleEn}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Elegant divider */}
        <GoldDivider className="my-14" />

        <ScrollReveal className="text-center">
          <Link
            href={`${prefix}/team`}
            className="inline-flex items-center gap-2 text-gold hover:text-gold-dark text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-300"
          >
            <RichText html={strings.meetFullTeam} />
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}

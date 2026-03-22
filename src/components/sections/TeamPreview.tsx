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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {members.map((member, i) => (
            <ScrollReveal key={member.id} delay={i * 150}>
              <Link
                href={`${prefix}/team/${member.slug}`}
                className="group block bg-white overflow-hidden transition-all duration-700 hover:shadow-xl hover:shadow-dark/5"
              >
                <div className="relative h-80 bg-bg-alt overflow-hidden">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={locale === 'ka' ? member.nameKa : member.nameEn}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105 photo-warm-hover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark to-navy">
                      <span className="font-heading text-4xl text-gold/40 tracking-wider">
                        {getInitials(member.nameEn)}
                      </span>
                    </div>
                  )}
                  {/* Gold border on hover at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
                <div className="p-6 border-l-2 border-transparent group-hover:border-gold transition-colors duration-700">
                  <p className="font-heading text-lg text-dark group-hover:text-gold transition-colors duration-500 name-underline-animate">
                    {locale === 'ka' ? member.nameKa : member.nameEn}
                  </p>
                  <p className="text-secondary text-sm mt-1 font-light tracking-wide">
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

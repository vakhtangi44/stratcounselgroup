import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import Hero from '@/components/sections/Hero'
import StatsSection from '@/components/sections/StatsSection'
import TeamPreview from '@/components/sections/TeamPreview'
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel'
import BlogPreview from '@/components/sections/BlogPreview'
import PressStrip from '@/components/sections/PressStrip'
import PracticeAreasGrid from '@/components/sections/PracticeAreasGrid'
import TrustedBy from '@/components/sections/TrustedBy'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'ka'
      ? 'Strategic Counsel Group | ხედვა. სტრატეგია. გავლენა.'
      : 'Strategic Counsel Group | Insight. Strategy. Impact.',
    description: locale === 'ka'
      ? 'გამოცდილი იურიდიული ფირმა თბილისში. კორპორაციული, საგადასახადო, სამედიცინო და ინფრასტრუქტურული სამართალი.'
      : 'Experienced law firm in Tbilisi. Corporate, tax, healthcare, and infrastructure law.',
    openGraph: {
      title: 'Strategic Counsel Group',
      description: 'Insight. Strategy. Impact.',
    },
    alternates: {
      canonical: locale === 'ka' ? 'https://stratcounselgroup.com' : 'https://stratcounselgroup.com/en',
      languages: {
        'ka': 'https://stratcounselgroup.com',
        'en': 'https://stratcounselgroup.com/en',
      },
    },
  }
}

export default async function HomePage() {
  const locale = await getLocale()

  const [stats, teamMembers, testimonials, blogPosts, pressItems] = await Promise.all([
    db.statistic.findMany(),
    db.teamMember.findMany({
      where: { active: true, isFeatured: true },
      orderBy: { order: 'asc' },
      take: 3,
    }),
    db.testimonial.findMany({ where: { active: true }, orderBy: { date: 'desc' } }),
    db.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
    db.pressItem.findMany({ where: { active: true }, orderBy: { date: 'desc' } }),
  ])

  return (
    <>
      <Hero locale={locale} />
      <PracticeAreasGrid locale={locale} />
      <StatsSection stats={stats} locale={locale} />
      <TeamPreview members={teamMembers} locale={locale} />
      <TrustedBy locale={locale} />
      <TestimonialsCarousel testimonials={testimonials} locale={locale} />
      <BlogPreview posts={blogPosts} locale={locale} />
      <PressStrip items={pressItems} />
    </>
  )
}

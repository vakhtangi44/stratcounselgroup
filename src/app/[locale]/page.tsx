import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { getSettings, s } from '@/lib/settings'
import Hero from '@/components/sections/Hero'
import StatsSection from '@/components/sections/StatsSection'
import TeamPreview from '@/components/sections/TeamPreview'
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel'
import BlogPreview from '@/components/sections/BlogPreview'
import PressStrip from '@/components/sections/PressStrip'
import PracticeAreasGrid from '@/components/sections/PracticeAreasGrid'
import TrustedBy from '@/components/sections/TrustedBy'
import ServicesPreview from '@/components/sections/ServicesPreview'

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
  const settings = await getSettings()

  const [stats, teamMembers, testimonials, blogPosts, pressItems, clientCategories, services] = await Promise.all([
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
    db.clientCategory.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      include: { clients: { where: { active: true }, orderBy: { order: 'asc' } } },
    }),
    db.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      include: { items: { orderBy: { order: 'asc' } } },
    }),
  ])

  // Pre-resolve strings for client components
  const heroStrings = {
    heading: s(settings, 'hero.heading', locale),
    subtitle: s(settings, 'hero.subtitle', locale),
    cta1: s(settings, 'hero.cta1', locale),
    cta2: s(settings, 'hero.cta2', locale),
  }

  const testimonialStrings = {
    subtitle: s(settings, 'section.testimonials.subtitle', locale),
    title: s(settings, 'section.testimonials', locale),
  }

  const trustedByStrings = {
    subtitle: s(settings, 'section.trustedBy.subtitle', locale),
    title: s(settings, 'section.trustedBy.title', locale),
    description: s(settings, 'section.trustedBy.description', locale),
    clients: s(settings, 'section.trustedBy.clients', locale),
    sectors: s(settings, 'section.trustedBy.sectors', locale),
    experience: s(settings, 'section.trustedBy.experience', locale),
    confidentiality: s(settings, 'section.trustedBy.confidentiality', locale),
  }

  return (
    <>
      <Hero locale={locale} strings={heroStrings} />
      <PracticeAreasGrid locale={locale} strings={{
        subtitle: s(settings, 'section.practiceAreas.subtitle', locale),
        title: s(settings, 'section.practiceAreas', locale),
        description: s(settings, 'section.practiceAreas.description', locale),
      }} />
      {services.length > 0 && <ServicesPreview services={services} locale={locale} />}
      <StatsSection stats={stats} locale={locale} />
      <TeamPreview members={teamMembers} locale={locale} strings={{
        subtitle: s(settings, 'section.ourTeam.subtitle', locale),
        title: s(settings, 'section.ourTeam', locale),
        meetFullTeam: s(settings, 'section.meetFullTeam', locale),
      }} />
      <TrustedBy locale={locale} categories={clientCategories} strings={trustedByStrings} />
      <TestimonialsCarousel testimonials={testimonials} locale={locale} strings={testimonialStrings} />
      <BlogPreview posts={blogPosts} locale={locale} strings={{
        subtitle: s(settings, 'section.latestArticles.subtitle', locale),
        title: s(settings, 'section.latestArticles', locale),
        allArticles: s(settings, 'section.allArticles', locale),
      }} />
      <PressStrip items={pressItems} asSeenIn={s(settings, 'section.asSeenIn', locale)} />
    </>
  )
}

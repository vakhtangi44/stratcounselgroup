import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { unstable_noStore as noStore } from 'next/cache'
import { getSettings, s } from '@/lib/settings'
import { getSectorsData } from '@/lib/sectors'

export const dynamic = 'force-dynamic'
export const revalidate = 0
import Hero from '@/components/sections/Hero'
import AboutPreview from '@/components/sections/AboutPreview'
import StatsSection from '@/components/sections/StatsSection'
import TeamPreview from '@/components/sections/TeamPreview'
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel'
import BlogPreview from '@/components/sections/BlogPreview'
import PressStrip from '@/components/sections/PressStrip'
import TargetSectors from '@/components/sections/TargetSectors'
import TrustedBy from '@/components/sections/TrustedBy'
import ServicesPreview from '@/components/sections/ServicesPreview'
import type { CategoryData } from '@/components/sections/TrustedBy'

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
  noStore()
  const locale = await getLocale()
  const settings = await getSettings()
  const sectorsEnabled = s(settings, 'sectors.enabled', locale) !== 'false'
  const sectorsData = getSectorsData(settings, locale)

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
      take: 3,
      include: { items: { orderBy: { order: 'asc' } } },
    }),
  ])

  // Pre-resolve strings for client components
  const aboutStrings = {
    heading: s(settings, 'about.heading', locale),
    body: s(settings, 'section.about.shortBody', locale),
    stat: s(settings, 'section.about.stat', locale),
    statLabel: s(settings, 'section.about.statLabel', locale),
    cta: s(settings, 'section.about.cta', locale),
    image: s(settings, 'section.about.image', locale),
    imagePosition: s(settings, 'section.about.imagePosition', locale),
    imageSize: s(settings, 'section.about.imageSize', locale),
  }

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
    viewAll: s(settings, 'section.trustedBy.viewAll', locale),
  }

  return (
    <>
      <Hero locale={locale} strings={heroStrings} />
      <AboutPreview locale={locale} strings={aboutStrings} />
      <TargetSectors locale={locale} sectors={sectorsData} enabled={sectorsEnabled} />
      {services.length > 0 && <ServicesPreview services={services} locale={locale} />}
      <StatsSection stats={stats} locale={locale} />
      <TeamPreview members={teamMembers} locale={locale} strings={{
        subtitle: s(settings, 'section.ourTeam.subtitle', locale),
        title: s(settings, 'section.ourTeam', locale),
        meetFullTeam: s(settings, 'section.meetFullTeam', locale),
      }} />
      <TrustedBy locale={locale} preview categories={clientCategories as unknown as CategoryData[]} strings={trustedByStrings} />
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

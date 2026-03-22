import { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { PRACTICE_AREAS } from '@/lib/practice-areas'

const BASE = 'https://stratcounselgroup.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, members] = await Promise.all([
    db.blogPost.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } }),
    db.teamMember.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
  ])

  const staticPages = ['', '/about', '/practice-areas', '/blog', '/team', '/contact', '/faq', '/glossary', '/press']
  const locales = ['', '/en']

  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE}${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  )

  const practiceAreaUrls = locales.flatMap((locale) =>
    PRACTICE_AREAS.map((area) => ({
      url: `${BASE}${locale}/practice-areas/${area.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  const blogUrls = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${BASE}${locale}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  )

  const teamUrls = locales.flatMap((locale) =>
    members.map((m) => ({
      url: `${BASE}${locale}/team/${m.slug}`,
      lastModified: m.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  )

  return [...staticUrls, ...practiceAreaUrls, ...blogUrls, ...teamUrls]
}

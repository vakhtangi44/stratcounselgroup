import { getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPracticeArea } from '@/lib/practice-areas'
import { db } from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  noStore()
  const { slug } = await params
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  const area = getPracticeArea(slug)
  if (!area) notFound()

  let relatedPosts: Array<{ id: number; slug: string; titleKa: string; titleEn: string }> = []
  let relatedFaq: Array<{ id: number; questionKa: string; questionEn: string; answerKa: string; answerEn: string }> = []

  try {
    [relatedPosts, relatedFaq] = await Promise.all([
      db.blogPost.findMany({
        where: { status: 'published', tags: { some: { practiceArea: slug } } },
        orderBy: { publishedAt: 'desc' },
        take: 3,
      }),
      db.fAQ.findMany({
        where: { active: true, practiceArea: slug },
        orderBy: { order: 'asc' },
      }),
    ])
  } catch {
    // DB queries may fail gracefully
  }

  return (
    <div className="pt-20">
      <section className="bg-dark text-white py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <span className="text-5xl block mb-6">{area.icon}</span>
          <h1 className="font-heading text-4xl mb-4">{isKa ? area.nameKa : area.nameEn}</h1>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {relatedFaq.length > 0 && (
            <div className="mb-16">
              <h2 className="font-heading text-2xl text-dark mb-6">{isKa ? 'ხშირი კითხვები' : 'FAQ'}</h2>
              <div className="space-y-4">
                {relatedFaq.map((faq) => (
                  <details key={faq.id} className="border border-gray-100 rounded-lg p-4">
                    <summary className="cursor-pointer font-medium text-dark">
                      {isKa ? faq.questionKa : faq.questionEn}
                    </summary>
                    <p className="mt-3 text-secondary">{isKa ? faq.answerKa : faq.answerEn}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {relatedPosts.length > 0 && (
            <div>
              <h2 className="font-heading text-2xl text-dark mb-6">{isKa ? 'სტატიები' : 'Related Articles'}</h2>
              <div className="space-y-4">
                {relatedPosts.map((post) => (
                  <Link key={post.id} href={`${prefix}/blog/${post.slug}`} className="block p-4 border border-gray-100 rounded-lg hover:border-gold transition-colors">
                    <h3 className="font-heading text-dark hover:text-gold transition-colors">
                      {isKa ? post.titleKa : post.titleEn}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

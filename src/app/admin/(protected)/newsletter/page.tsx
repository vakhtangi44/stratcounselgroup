import { db } from '@/lib/db'
import NewsletterManager from './NewsletterManager'

export default async function AdminNewsletterPage() {
  const subscribers = await db.newsletterSubscriber.findMany({ orderBy: { subscribedAt: 'desc' } })
  const activeCount = subscribers.filter((s) => s.active).length

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl text-dark">Newsletter</h1>
        <p className="text-secondary text-sm mt-1">
          {activeCount} active subscriber{activeCount !== 1 ? 's' : ''} of {subscribers.length} total
        </p>
      </div>
      <NewsletterManager subscribers={subscribers} />
    </div>
  )
}

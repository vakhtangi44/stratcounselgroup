import { db } from '@/lib/db'

export default async function AdminDashboard() {
  const [posts, team, messages, subscribers] = await Promise.all([
    db.blogPost.count(),
    db.teamMember.count({ where: { active: true } }),
    db.contactMessage.count({ where: { read: false } }),
    db.newsletterSubscriber.count({ where: { active: true } }),
  ])

  const stats = [
    { label: 'Blog Posts', value: posts },
    { label: 'Team Members', value: team },
    { label: 'Unread Messages', value: messages },
    { label: 'Newsletter Subscribers', value: subscribers },
  ]

  return (
    <div>
      <h1 className="font-heading text-2xl text-dark mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-3xl font-heading text-gold">{s.value}</p>
            <p className="text-sm text-secondary mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

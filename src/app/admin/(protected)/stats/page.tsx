import { db } from '@/lib/db'
import StatsEditor from './StatsEditor'

export default async function AdminStatsPage() {
  const stats = await db.statistic.findMany({ orderBy: { id: 'asc' } })

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl text-dark">Statistics</h1>
        <p className="text-secondary text-sm mt-1">Update the numeric values shown on the homepage.</p>
      </div>
      <StatsEditor stats={stats} />
    </div>
  )
}

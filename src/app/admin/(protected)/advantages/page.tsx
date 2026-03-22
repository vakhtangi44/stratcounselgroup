import Link from 'next/link'
import { db } from '@/lib/db'

export default async function AdminAdvantagesPage() {
  const advantages = await db.advantage.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl text-dark">Advantages</h1>
        <Link href="/admin/advantages/new" className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark">
          + New Advantage
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-alt text-secondary">
            <tr>
              <th className="text-left px-4 py-3">Title (KA)</th>
              <th className="text-left px-4 py-3">Title (EN)</th>
              <th className="text-left px-4 py-3">Order</th>
              <th className="text-left px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {advantages.map((adv) => (
              <tr key={adv.id} className="hover:bg-bg-alt/50">
                <td className="px-4 py-3 font-medium max-w-xs truncate">{adv.titleKa}</td>
                <td className="px-4 py-3 text-secondary max-w-xs truncate">{adv.titleEn}</td>
                <td className="px-4 py-3 text-secondary">{adv.order}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${adv.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {adv.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/advantages/${adv.id}/edit`} className="text-gold hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {advantages.length === 0 && (
          <p className="text-center text-secondary py-8">No advantages yet.</p>
        )}
      </div>
    </div>
  )
}

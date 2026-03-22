import Link from 'next/link'
import { db } from '@/lib/db'

export default async function AdminTeamPage() {
  const members = await db.teamMember.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl text-dark">Team Members</h1>
        <Link href="/admin/team/new" className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark">
          + New Member
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-alt text-secondary">
            <tr>
              <th className="text-left px-4 py-3">Name (EN)</th>
              <th className="text-left px-4 py-3">GBA #</th>
              <th className="text-left px-4 py-3">Featured</th>
              <th className="text-left px-4 py-3">Order</th>
              <th className="text-left px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-bg-alt/50">
                <td className="px-4 py-3 font-medium">{m.nameEn}</td>
                <td className="px-4 py-3 text-secondary">{m.gbaNumber || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${m.isFeatured ? 'bg-gold/20 text-gold' : 'bg-gray-100 text-gray-500'}`}>
                    {m.isFeatured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-3 text-secondary">{m.order}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${m.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {m.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/team/${m.id}/edit`} className="text-gold hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {members.length === 0 && (
          <p className="text-center text-secondary py-8">No team members yet.</p>
        )}
      </div>
    </div>
  )
}

import Link from 'next/link'
import { db } from '@/lib/db'

export default async function AdminPressPage() {
  const items = await db.pressItem.findMany({ orderBy: { date: 'desc' } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl text-dark">Press</h1>
        <Link href="/admin/press/new" className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark">
          + New Press Item
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-alt text-secondary">
            <tr>
              <th className="text-left px-4 py-3">Outlet</th>
              <th className="text-left px-4 py-3">Headline (KA)</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-bg-alt/50">
                <td className="px-4 py-3 font-medium">{item.outletName}</td>
                <td className="px-4 py-3 text-secondary max-w-xs truncate">{item.headlineKa}</td>
                <td className="px-4 py-3 text-secondary">{new Date(item.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/press/${item.id}/edit`} className="text-gold hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <p className="text-center text-secondary py-8">No press items yet.</p>
        )}
      </div>
    </div>
  )
}

import { db } from '@/lib/db'
import ClientsManager from './ClientsManager'

export default async function AdminClientsPage() {
  const categories = await db.clientCategory.findMany({
    orderBy: { order: 'asc' },
    include: { clients: { orderBy: { order: 'asc' } } },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl text-dark">Clients</h1>
      </div>
      <ClientsManager initialCategories={categories} />
    </div>
  )
}

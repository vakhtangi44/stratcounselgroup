import { db } from '@/lib/db'
import ClientsManager from './ClientsManager'

export default async function AdminClientsPage() {
  // Flatten all clients across categories into a single sorted list
  const categories = await db.clientCategory.findMany({
    include: { clients: { orderBy: { order: 'asc' } } },
  })
  const clients = categories
    .flatMap((cat) => cat.clients)
    .sort((a, b) => a.order - b.order)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl text-dark">Clients</h1>
      </div>
      <ClientsManager initialClients={clients} />
    </div>
  )
}

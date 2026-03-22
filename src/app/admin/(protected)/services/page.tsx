import { db } from '@/lib/db'
import ServicesManager from './ServicesManager'

export default async function AdminServicesPage() {
  const services = await db.service.findMany({
    orderBy: { order: 'asc' },
    include: { items: { orderBy: { order: 'asc' } } },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl text-dark">Services</h1>
      </div>
      <ServicesManager initialServices={services} />
    </div>
  )
}

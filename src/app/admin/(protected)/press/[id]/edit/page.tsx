import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import PressForm from '../../PressForm'

export default async function EditPressItem({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = await db.pressItem.findUnique({ where: { id: parseInt(id) } })
  if (!item) notFound()
  return (
    <div>
      <h1 className="font-heading text-2xl text-dark mb-6">Edit Press Item</h1>
      <PressForm item={item} />
    </div>
  )
}

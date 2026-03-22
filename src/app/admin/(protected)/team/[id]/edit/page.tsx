import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import TeamForm from '../../TeamForm'

export default async function EditTeamMember({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const member = await db.teamMember.findUnique({ where: { id: parseInt(id) } })
  if (!member) notFound()
  return (
    <div>
      <h1 className="font-heading text-2xl text-dark mb-6">Edit Team Member</h1>
      <TeamForm member={member} />
    </div>
  )
}

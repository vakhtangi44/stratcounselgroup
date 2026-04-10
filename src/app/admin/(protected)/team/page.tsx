import { db } from '@/lib/db'
import TeamReorderList from './TeamReorderList'

export default async function AdminTeamPage() {
  const members = await db.teamMember.findMany({ orderBy: { order: 'asc' } })

  return <TeamReorderList initialMembers={members} />
}

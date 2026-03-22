import { db } from '@/lib/db'
import MessagesTable from './MessagesTable'

export default async function AdminMessagesPage() {
  const messages = await db.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl text-dark">Contact Messages</h1>
        {unreadCount > 0 && (
          <p className="text-secondary text-sm mt-1">
            {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      <MessagesTable messages={messages} />
    </div>
  )
}

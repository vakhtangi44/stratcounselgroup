'use client'

import { useState } from 'react'

interface Client {
  id: number
  name: string
  nameKa: string
  nameEn: string
  logoKa: string | null
  logoEn: string | null
  categoryId: number
  order: number
  active: boolean
}

interface Category {
  id: number
  icon: string
  labelKa: string
  labelEn: string
  order: number
  active: boolean
  clients: Client[]
}

interface Props {
  initialCategories: Category[]
}

export default function ClientsManager({ initialCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [addingClientToCategoryId, setAddingClientToCategoryId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  // New category form state
  const [newCat, setNewCat] = useState({ icon: '🏢', labelKa: '', labelEn: '', order: 0, active: true })
  // New client form state
  const [newClient, setNewClient] = useState({ name: '', nameKa: '', nameEn: '', logoKa: '', logoEn: '', order: 0, active: true })

  async function reload() {
    const res = await fetch('/api/admin/clients')
    if (res.ok) {
      const data = await res.json()
      setCategories(data)
    }
  }

  async function handleCreateCategory() {
    setLoading(true)
    const res = await fetch('/api/admin/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCat),
    })
    if (res.ok) {
      setShowNewCategory(false)
      setNewCat({ icon: '🏢', labelKa: '', labelEn: '', order: 0, active: true })
      await reload()
    }
    setLoading(false)
  }

  async function handleUpdateCategory() {
    if (!editingCategory) return
    setLoading(true)
    const res = await fetch(`/api/admin/clients/${editingCategory.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        icon: editingCategory.icon,
        labelKa: editingCategory.labelKa,
        labelEn: editingCategory.labelEn,
        order: editingCategory.order,
        active: editingCategory.active,
      }),
    })
    if (res.ok) {
      setEditingCategory(null)
      await reload()
    }
    setLoading(false)
  }

  async function handleDeleteCategory(id: number) {
    if (!confirm('Delete this category and all its clients?')) return
    setLoading(true)
    await fetch(`/api/admin/clients/${id}`, { method: 'DELETE' })
    await reload()
    setLoading(false)
  }

  async function handleCreateClient(categoryId: number) {
    setLoading(true)
    const res = await fetch(`/api/admin/clients/${categoryId}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClient),
    })
    if (res.ok) {
      setAddingClientToCategoryId(null)
      setNewClient({ name: '', nameKa: '', nameEn: '', logoKa: '', logoEn: '', order: 0, active: true })
      await reload()
    }
    setLoading(false)
  }

  async function handleUpdateClient() {
    if (!editingClient) return
    setLoading(true)
    const res = await fetch(`/api/admin/clients/client/${editingClient.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editingClient.name,
        nameKa: editingClient.nameKa,
        nameEn: editingClient.nameEn,
        order: editingClient.order,
        active: editingClient.active,
      }),
    })
    if (res.ok) {
      setEditingClient(null)
      await reload()
    }
    setLoading(false)
  }

  async function handleDeleteClient(id: number) {
    if (!confirm('Delete this client?')) return
    setLoading(true)
    await fetch(`/api/admin/clients/client/${id}`, { method: 'DELETE' })
    await reload()
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      {/* Add Category Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowNewCategory(true)}
          className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark"
        >
          + New Category
        </button>
      </div>

      {/* New Category Form */}
      {showNewCategory && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gold/30">
          <h3 className="font-heading text-lg text-dark mb-4">New Category</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-secondary mb-1">Icon (emoji)</label>
              <input
                value={newCat.icon}
                onChange={(e) => setNewCat({ ...newCat, icon: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-secondary mb-1">Order</label>
              <input
                type="number"
                value={newCat.order}
                onChange={(e) => setNewCat({ ...newCat, order: parseInt(e.target.value) || 0 })}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-secondary mb-1">Label (KA)</label>
              <input
                value={newCat.labelKa}
                onChange={(e) => setNewCat({ ...newCat, labelKa: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-secondary mb-1">Label (EN)</label>
              <input
                value={newCat.labelEn}
                onChange={(e) => setNewCat({ ...newCat, labelEn: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm mb-4">
            <input
              type="checkbox"
              checked={newCat.active}
              onChange={(e) => setNewCat({ ...newCat, active: e.target.checked })}
            />
            Active
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleCreateCategory}
              disabled={loading || !newCat.labelKa || !newCat.labelEn}
              className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark disabled:opacity-50"
            >
              Create
            </button>
            <button
              onClick={() => setShowNewCategory(false)}
              className="border px-4 py-2 rounded text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Category Header */}
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-bg-alt/50"
            onClick={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{cat.icon}</span>
              <div>
                <p className="font-medium text-sm text-dark">{cat.labelEn}</p>
                <p className="text-xs text-secondary">{cat.labelKa}</p>
              </div>
              <span className="text-xs text-secondary ml-2">Order: {cat.order}</span>
              <span className={`px-2 py-0.5 rounded text-xs ml-2 ${cat.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {cat.active ? 'Active' : 'Inactive'}
              </span>
              <span className="text-xs text-secondary ml-2">({cat.clients.length} clients)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setEditingCategory({ ...cat }); }}
                className="text-gold hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id); }}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
              <span className="text-secondary text-sm ml-2">{expandedId === cat.id ? '▲' : '▼'}</span>
            </div>
          </div>

          {/* Expanded: Clients List */}
          {expandedId === cat.id && (
            <div className="border-t border-gray-100 px-4 py-3">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs text-secondary font-medium uppercase tracking-wider">Clients</p>
                <button
                  onClick={() => { setAddingClientToCategoryId(cat.id); setNewClient({ name: '', nameKa: '', nameEn: '', logoKa: '', logoEn: '', order: 0, active: true }); }}
                  className="text-gold hover:underline text-xs"
                >
                  + Add Client
                </button>
              </div>

              {/* Add Client Form */}
              {addingClientToCategoryId === cat.id && (
                <div className="bg-bg-alt rounded p-4 mb-3">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-secondary mb-1">Name (EN)</label>
                      <input
                        value={newClient.nameEn}
                        onChange={(e) => setNewClient({ ...newClient, nameEn: e.target.value, name: e.target.value })}
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-secondary mb-1">Name (KA)</label>
                      <input
                        value={newClient.nameKa}
                        onChange={(e) => setNewClient({ ...newClient, nameKa: e.target.value })}
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-secondary mb-1">Logo EN (path or URL)</label>
                      <input
                        value={newClient.logoEn}
                        onChange={(e) => setNewClient({ ...newClient, logoEn: e.target.value })}
                        placeholder="/logos/clients/name-en.png"
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-secondary mb-1">Logo KA (path or URL)</label>
                      <input
                        value={newClient.logoKa}
                        onChange={(e) => setNewClient({ ...newClient, logoKa: e.target.value })}
                        placeholder="/logos/clients/name-ka.png"
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-secondary mb-1">Order</label>
                      <input
                        type="number"
                        value={newClient.order}
                        onChange={(e) => setNewClient({ ...newClient, order: parseInt(e.target.value) || 0 })}
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-sm mb-3">
                    <input
                      type="checkbox"
                      checked={newClient.active}
                      onChange={(e) => setNewClient({ ...newClient, active: e.target.checked })}
                    />
                    Active
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCreateClient(cat.id)}
                      disabled={loading || !newClient.name}
                      className="bg-gold text-white px-3 py-1.5 rounded text-xs hover:bg-gold-dark disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setAddingClientToCategoryId(null)}
                      className="border px-3 py-1.5 rounded text-xs hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Clients Table */}
              {cat.clients.length > 0 ? (
                <table className="w-full text-sm">
                  <thead className="bg-bg-alt text-secondary">
                    <tr>
                      <th className="text-left px-3 py-2">Name (EN)</th>
                      <th className="text-left px-3 py-2">Name (KA)</th>
                      <th className="text-left px-3 py-2">Order</th>
                      <th className="text-left px-3 py-2">Active</th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cat.clients.map((client) => (
                      <tr key={client.id} className="hover:bg-bg-alt/50">
                        <td className="px-3 py-2">{client.nameEn || client.name}</td>
                        <td className="px-3 py-2 text-secondary">{client.nameKa || client.name}</td>
                        <td className="px-3 py-2 text-secondary">{client.order}</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded text-xs ${client.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {client.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <button
                            onClick={() => setEditingClient({ ...client })}
                            className="text-gold hover:underline text-xs mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClient(client.id)}
                            className="text-red-500 hover:underline text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-secondary py-4 text-sm">No clients in this category.</p>
              )}
            </div>
          )}
        </div>
      ))}

      {categories.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-secondary">No client categories yet.</p>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="font-heading text-lg text-dark mb-4">Edit Category</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-secondary mb-1">Icon (emoji)</label>
                <input
                  value={editingCategory.icon}
                  onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Order</label>
                <input
                  type="number"
                  value={editingCategory.order}
                  onChange={(e) => setEditingCategory({ ...editingCategory, order: parseInt(e.target.value) || 0 })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Label (KA)</label>
                <input
                  value={editingCategory.labelKa}
                  onChange={(e) => setEditingCategory({ ...editingCategory, labelKa: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Label (EN)</label>
                <input
                  value={editingCategory.labelEn}
                  onChange={(e) => setEditingCategory({ ...editingCategory, labelEn: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm mb-4">
              <input
                type="checkbox"
                checked={editingCategory.active}
                onChange={(e) => setEditingCategory({ ...editingCategory, active: e.target.checked })}
              />
              Active
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleUpdateCategory}
                disabled={loading}
                className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark disabled:opacity-50"
              >
                Save
              </button>
              <button
                onClick={() => setEditingCategory(null)}
                className="border px-4 py-2 rounded text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {editingClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="font-heading text-lg text-dark mb-4">Edit Client</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-secondary mb-1">Name (EN)</label>
                <input
                  value={editingClient.nameEn}
                  onChange={(e) => setEditingClient({ ...editingClient, nameEn: e.target.value, name: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Name (KA)</label>
                <input
                  value={editingClient.nameKa}
                  onChange={(e) => setEditingClient({ ...editingClient, nameKa: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Logo EN (path or URL)</label>
                <input
                  value={editingClient.logoEn || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, logoEn: e.target.value })}
                  placeholder="/logos/clients/name-en.png"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Logo KA (path or URL)</label>
                <input
                  value={editingClient.logoKa || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, logoKa: e.target.value })}
                  placeholder="/logos/clients/name-ka.png"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Order</label>
                <input
                  type="number"
                  value={editingClient.order}
                  onChange={(e) => setEditingClient({ ...editingClient, order: parseInt(e.target.value) || 0 })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm mb-4">
              <input
                type="checkbox"
                checked={editingClient.active}
                onChange={(e) => setEditingClient({ ...editingClient, active: e.target.checked })}
              />
              Active
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleUpdateClient}
                disabled={loading}
                className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark disabled:opacity-50"
              >
                Save
              </button>
              <button
                onClick={() => setEditingClient(null)}
                className="border px-4 py-2 rounded text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

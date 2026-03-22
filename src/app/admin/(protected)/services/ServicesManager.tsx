'use client'

import { useState } from 'react'

interface ServiceItem {
  id: number
  textKa: string
  textEn: string
  serviceId: number
  order: number
}

interface Service {
  id: number
  titleKa: string
  titleEn: string
  descriptionKa: string
  descriptionEn: string
  order: number
  active: boolean
  items: ServiceItem[]
}

interface Props {
  initialServices: Service[]
}

export default function ServicesManager({ initialServices }: Props) {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null)
  const [showNewService, setShowNewService] = useState(false)
  const [addingItemToServiceId, setAddingItemToServiceId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const [newService, setNewService] = useState({
    titleKa: '', titleEn: '', descriptionKa: '', descriptionEn: '', order: 0, active: true,
  })
  const [newItem, setNewItem] = useState({ textKa: '', textEn: '', order: 0 })

  async function reload() {
    const res = await fetch('/api/admin/services')
    if (res.ok) {
      const data = await res.json()
      setServices(data)
    }
  }

  async function handleCreateService() {
    setLoading(true)
    const res = await fetch('/api/admin/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    })
    if (res.ok) {
      setShowNewService(false)
      setNewService({ titleKa: '', titleEn: '', descriptionKa: '', descriptionEn: '', order: 0, active: true })
      await reload()
    }
    setLoading(false)
  }

  async function handleUpdateService() {
    if (!editingService) return
    setLoading(true)
    const res = await fetch(`/api/admin/services/${editingService.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titleKa: editingService.titleKa,
        titleEn: editingService.titleEn,
        descriptionKa: editingService.descriptionKa,
        descriptionEn: editingService.descriptionEn,
        order: editingService.order,
        active: editingService.active,
      }),
    })
    if (res.ok) {
      setEditingService(null)
      await reload()
    }
    setLoading(false)
  }

  async function handleDeleteService(id: number) {
    if (!confirm('Delete this service and all its items?')) return
    setLoading(true)
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
    await reload()
    setLoading(false)
  }

  async function handleCreateItem(serviceId: number) {
    setLoading(true)
    const res = await fetch(`/api/admin/services/${serviceId}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
    if (res.ok) {
      setAddingItemToServiceId(null)
      setNewItem({ textKa: '', textEn: '', order: 0 })
      await reload()
    }
    setLoading(false)
  }

  async function handleUpdateItem() {
    if (!editingItem) return
    setLoading(true)
    const res = await fetch(`/api/admin/services/item/${editingItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        textKa: editingItem.textKa,
        textEn: editingItem.textEn,
        order: editingItem.order,
      }),
    })
    if (res.ok) {
      setEditingItem(null)
      await reload()
    }
    setLoading(false)
  }

  async function handleDeleteItem(id: number) {
    if (!confirm('Delete this item?')) return
    setLoading(true)
    await fetch(`/api/admin/services/item/${id}`, { method: 'DELETE' })
    await reload()
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      {/* Add Service Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowNewService(true)}
          className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark"
        >
          + New Service
        </button>
      </div>

      {/* New Service Form */}
      {showNewService && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gold/30">
          <h3 className="font-heading text-lg text-dark mb-4">New Service</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-secondary mb-1">Title (KA)</label>
              <input
                value={newService.titleKa}
                onChange={(e) => setNewService({ ...newService, titleKa: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-secondary mb-1">Title (EN)</label>
              <input
                value={newService.titleEn}
                onChange={(e) => setNewService({ ...newService, titleEn: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-secondary mb-1">Description (KA)</label>
              <textarea
                value={newService.descriptionKa}
                onChange={(e) => setNewService({ ...newService, descriptionKa: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-xs text-secondary mb-1">Description (EN)</label>
              <textarea
                value={newService.descriptionEn}
                onChange={(e) => setNewService({ ...newService, descriptionEn: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-xs text-secondary mb-1">Order</label>
              <input
                type="number"
                value={newService.order}
                onChange={(e) => setNewService({ ...newService, order: parseInt(e.target.value) || 0 })}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm mb-4">
            <input
              type="checkbox"
              checked={newService.active}
              onChange={(e) => setNewService({ ...newService, active: e.target.checked })}
            />
            Active
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleCreateService}
              disabled={loading || !newService.titleKa || !newService.titleEn || !newService.descriptionKa || !newService.descriptionEn}
              className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark disabled:opacity-50"
            >
              Create
            </button>
            <button
              onClick={() => setShowNewService(false)}
              className="border px-4 py-2 rounded text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Services List */}
      {services.map((svc) => (
        <div key={svc.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Service Header */}
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-bg-alt/50"
            onClick={() => setExpandedId(expandedId === svc.id ? null : svc.id)}
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium text-sm text-dark">{svc.titleEn}</p>
                <p className="text-xs text-secondary">{svc.titleKa}</p>
              </div>
              <span className="text-xs text-secondary ml-2">Order: {svc.order}</span>
              <span className={`px-2 py-0.5 rounded text-xs ml-2 ${svc.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {svc.active ? 'Active' : 'Inactive'}
              </span>
              <span className="text-xs text-secondary ml-2">({svc.items.length} items)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setEditingService({ ...svc }); }}
                className="text-gold hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDeleteService(svc.id); }}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
              <span className="text-secondary text-sm ml-2">{expandedId === svc.id ? '\u25B2' : '\u25BC'}</span>
            </div>
          </div>

          {/* Expanded: Items List */}
          {expandedId === svc.id && (
            <div className="border-t border-gray-100 px-4 py-3">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs text-secondary font-medium uppercase tracking-wider">Service Items</p>
                <button
                  onClick={() => { setAddingItemToServiceId(svc.id); setNewItem({ textKa: '', textEn: '', order: 0 }); }}
                  className="text-gold hover:underline text-xs"
                >
                  + Add Item
                </button>
              </div>

              {/* Add Item Form */}
              {addingItemToServiceId === svc.id && (
                <div className="bg-bg-alt rounded p-4 mb-3">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-secondary mb-1">Text (KA)</label>
                      <input
                        value={newItem.textKa}
                        onChange={(e) => setNewItem({ ...newItem, textKa: e.target.value })}
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-secondary mb-1">Text (EN)</label>
                      <input
                        value={newItem.textEn}
                        onChange={(e) => setNewItem({ ...newItem, textEn: e.target.value })}
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-secondary mb-1">Order</label>
                      <input
                        type="number"
                        value={newItem.order}
                        onChange={(e) => setNewItem({ ...newItem, order: parseInt(e.target.value) || 0 })}
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCreateItem(svc.id)}
                      disabled={loading || !newItem.textKa || !newItem.textEn}
                      className="bg-gold text-white px-3 py-1.5 rounded text-xs hover:bg-gold-dark disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setAddingItemToServiceId(null)}
                      className="border px-3 py-1.5 rounded text-xs hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Items Table */}
              {svc.items.length > 0 ? (
                <table className="w-full text-sm">
                  <thead className="bg-bg-alt text-secondary">
                    <tr>
                      <th className="text-left px-3 py-2">Text (EN)</th>
                      <th className="text-left px-3 py-2">Text (KA)</th>
                      <th className="text-left px-3 py-2">Order</th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {svc.items.map((item) => (
                      <tr key={item.id} className="hover:bg-bg-alt/50">
                        <td className="px-3 py-2">{item.textEn}</td>
                        <td className="px-3 py-2 text-secondary">{item.textKa}</td>
                        <td className="px-3 py-2 text-secondary">{item.order}</td>
                        <td className="px-3 py-2 text-right">
                          <button
                            onClick={() => setEditingItem({ ...item })}
                            className="text-gold hover:underline text-xs mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
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
                <p className="text-center text-secondary py-4 text-sm">No items in this service.</p>
              )}
            </div>
          )}
        </div>
      ))}

      {services.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-secondary">No services yet.</p>
        </div>
      )}

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="font-heading text-lg text-dark mb-4">Edit Service</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-secondary mb-1">Title (KA)</label>
                <input
                  value={editingService.titleKa}
                  onChange={(e) => setEditingService({ ...editingService, titleKa: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Title (EN)</label>
                <input
                  value={editingService.titleEn}
                  onChange={(e) => setEditingService({ ...editingService, titleEn: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Description (KA)</label>
                <textarea
                  value={editingService.descriptionKa}
                  onChange={(e) => setEditingService({ ...editingService, descriptionKa: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Description (EN)</label>
                <textarea
                  value={editingService.descriptionEn}
                  onChange={(e) => setEditingService({ ...editingService, descriptionEn: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Order</label>
                <input
                  type="number"
                  value={editingService.order}
                  onChange={(e) => setEditingService({ ...editingService, order: parseInt(e.target.value) || 0 })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm mb-4">
              <input
                type="checkbox"
                checked={editingService.active}
                onChange={(e) => setEditingService({ ...editingService, active: e.target.checked })}
              />
              Active
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleUpdateService}
                disabled={loading}
                className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark disabled:opacity-50"
              >
                Save
              </button>
              <button
                onClick={() => setEditingService(null)}
                className="border px-4 py-2 rounded text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="font-heading text-lg text-dark mb-4">Edit Item</h3>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-xs text-secondary mb-1">Text (KA)</label>
                <input
                  value={editingItem.textKa}
                  onChange={(e) => setEditingItem({ ...editingItem, textKa: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Text (EN)</label>
                <input
                  value={editingItem.textEn}
                  onChange={(e) => setEditingItem({ ...editingItem, textEn: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Order</label>
                <input
                  type="number"
                  value={editingItem.order}
                  onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 0 })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleUpdateItem}
                disabled={loading}
                className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark disabled:opacity-50"
              >
                Save
              </button>
              <button
                onClick={() => setEditingItem(null)}
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

'use client'

import { useState, useEffect } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alacena-backend.fly.dev'

interface MenuItem {
    id: string
    name: string
    itemId: string
    section?: string
    isActive: boolean
    notes?: string
    createdAt: string
    updatedAt: string
}

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [error, setError] = useState<string>('')
    const [submitLoading, setSubmitLoading] = useState(false)
    const [formData, setFormData] = useState<Partial<MenuItem>>({
        name: '',
        itemId: '',
        section: '',
        isActive: true,
        notes: '',
    })

    // Cargar datos
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                setError('')
                const [menuRes, itemsRes] = await Promise.all([
                    fetch(`${API_URL}/api/menu-items?limit=50`),
                    fetch(`${API_URL}/api/items?limit=50`),
                ])

                if (!menuRes.ok || !itemsRes.ok) {
                    throw new Error('Error al cargar datos del servidor')
                }

                const menuData = await menuRes.json()
                const itemsData = await itemsRes.json()

                setMenuItems(menuData.data || [])
                setItems(itemsData.data || [])
            } catch (error) {
                console.error('Error loading data:', error)
                setError('No se pudo cargar los datos. Intenta recargar la página.')
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        // Validar campos requeridos
        if (!formData.name || !formData.itemId) {
            setError('Nombre e item son requeridos')
            return
        }

        try {
            setSubmitLoading(true)
            const url = editingId ? `${API_URL}/api/menu-items/${editingId}` : `${API_URL}/api/menu-items`
            const method = editingId ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const responseData = await res.json()

            if (!res.ok) {
                throw new Error(responseData.error || responseData.message || 'Error al guardar')
            }

            // Reload with reduced limit
            const menuRes = await fetch(`${API_URL}/api/menu-items?limit=50`)
            const menuData = await menuRes.json()
            setMenuItems(menuData.data || [])

            setFormData({ name: '', itemId: '', section: '', isActive: true, notes: '' })
            setShowForm(false)
            setEditingId(null)
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Error desconocido'
            console.error('Error:', error)
            setError(`❌ ${errorMsg}`)
        } finally {
            setSubmitLoading(false)
        }
    }

    function handleEdit(menuItem: MenuItem) {
        setFormData(menuItem)
        setEditingId(menuItem.id)
        setShowForm(true)
        setError('')
    }

    async function handleDelete(id: string) {
        if (confirm('¿Estás seguro?')) {
            try {
                setSubmitLoading(true)
                setError('')
                const res = await fetch(`${API_URL}/api/menu-items/${id}`, { method: 'DELETE' })
                const responseData = await res.json()

                if (!res.ok) throw new Error(responseData.error || 'Error al eliminar')

                const menuRes = await fetch(`${API_URL}/api/menu-items?limit=50`)
                const menuData = await menuRes.json()
                setMenuItems(menuData.data || [])
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : 'Error desconocido'
                setError(`❌ ${errorMsg}`)
            } finally {
                setSubmitLoading(false)
            }
        }
    }

    const getItemName = (itemId: string) => items.find(i => i.id === itemId)?.name || itemId

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">🍽️ Menú Público</h1>
                <button
                    onClick={() => {
                        setShowForm(!showForm)
                        setEditingId(null)
                        setFormData({ name: '', itemId: '', section: '', isActive: true, notes: '' })
                        setError('')
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    {showForm ? 'Cancelar' : '+ Nuevo Item de Menú'}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 p-4 rounded text-red-800">
                    {error}
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Nombre visible en menú *"
                            value={formData.name || ''}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={formData.itemId || ''}
                            onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecciona el item asociado</option>
                            {items.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Sección (ej: Tragos, Pastas, Desayunos)"
                            value={formData.section || ''}
                            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="flex items-center gap-2 p-2">
                            <input
                                type="checkbox"
                                checked={formData.isActive || false}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <span className="text-gray-700">Activo en menú</span>
                        </label>
                    </div>

                    <textarea
                        placeholder="Notas"
                        value={formData.notes || ''}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                    />

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={submitLoading}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitLoading ? 'Guardando...' : (editingId ? 'Actualizar' : 'Crear')} Item de Menú
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false)
                                setEditingId(null)
                                setFormData({ name: '', itemId: '', section: '', isActive: true, notes: '' })
                                setError('')
                            }}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            {loading ? (
                <p className="text-gray-600">Cargando...</p>
            ) : menuItems.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded text-center text-gray-600">
                    No hay items en el menú. Crea uno para comenzar.
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Item</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sección</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuItems.map((menuItem) => (
                                <tr key={menuItem.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-3 text-gray-800">{menuItem.name}</td>
                                    <td className="px-6 py-3 text-gray-600">{getItemName(menuItem.itemId)}</td>
                                    <td className="px-6 py-3 text-gray-600">{menuItem.section || '-'}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 text-xs rounded ${menuItem.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {menuItem.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(menuItem)}
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(menuItem.id)}
                                            className="text-red-600 hover:text-red-800 text-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

'use client'

import { useState, useEffect } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alacena-backend.fly.dev'

interface Reserve {
    id: string
    itemId: string
    locationId?: string
    status: 'ACTIVE' | 'TRANSFORMED' | 'CONSUMED' | 'DISCARDED'
    qty?: number
    unit?: string
    notes?: string
    createdAt: string
    updatedAt: string
}

export default function ReservesPage() {
    const [reserves, setReserves] = useState<Reserve[]>([])
    const [items, setItems] = useState<any[]>([])
    const [locations, setLocations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<Reserve>>({
        itemId: '',
        locationId: '',
        status: 'ACTIVE',
        qty: 0,
        unit: 'UNIT',
        notes: '',
    })

    // Cargar datos
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                const [reservesRes, itemsRes, locationsRes] = await Promise.all([
                    fetch(`${API_URL}/api/reserves?limit=50`),
                    fetch(`${API_URL}/api/items?limit=50`),
                    fetch(`${API_URL}/api/locations?limit=50`),
                ])

                const reservesData = await reservesRes.json()
                const itemsData = await itemsRes.json()
                const locationsData = await locationsRes.json()

                setReserves(reservesData.data || [])
                setItems(itemsData.data || [])
                setLocations(locationsData.data || [])
            } catch (error) {
                console.error('Error loading data:', error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            const url = editingId ? `${API_URL}/api/reserves/${editingId}` : `${API_URL}/api/reserves`
            const method = editingId ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error('Error al guardar')

            // Reload
            const reservesRes = await fetch(`${API_URL}/api/reserves?limit=100`)
            const reservesData = await reservesRes.json()
            setReserves(reservesData.data || [])

            setFormData({ itemId: '', locationId: '', status: 'ACTIVE', qty: 0, unit: 'UNIT', notes: '' })
            setShowForm(false)
            setEditingId(null)
        } catch (error) {
            console.error('Error:', error)
            alert('Error al guardar reserva')
        }
    }

    function handleEdit(reserve: Reserve) {
        setFormData(reserve)
        setEditingId(reserve.id)
        setShowForm(true)
    }

    async function handleDelete(id: string) {
        if (confirm('¿Estás seguro?')) {
            try {
                const res = await fetch(`${API_URL}/api/reserves/${id}`, { method: 'DELETE' })
                if (!res.ok) throw new Error('Error al eliminar')

                const reservesRes = await fetch(`${API_URL}/api/reserves?limit=100`)
                const reservesData = await reservesRes.json()
                setReserves(reservesData.data || [])
            } catch (error) {
                console.error('Error:', error)
                alert('Error al eliminar')
            }
        }
    }

    const getItemName = (itemId: string) => items.find(i => i.id === itemId)?.name || itemId
    const getLocationName = (locationId: string) => locations.find(l => l.id === locationId)?.name || locationId

    const statusLabels = { ACTIVE: 'Activa', TRANSFORMED: 'Transformada', CONSUMED: 'Consumida', DISCARDED: 'Descartada' }
    const statusColors = { ACTIVE: 'green', TRANSFORMED: 'yellow', CONSUMED: 'gray', DISCARDED: 'red' }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">📋 Reservas</h1>
                <button
                    onClick={() => {
                        setShowForm(!showForm)
                        setEditingId(null)
                        setFormData({ itemId: '', locationId: '', status: 'ACTIVE', qty: 0, unit: 'UNIT', notes: '' })
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    {showForm ? 'Cancelar' : '+ Nueva Reserva'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            value={formData.itemId || ''}
                            onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
                            required
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecciona un item</option>
                            {items.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={formData.locationId || ''}
                            onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecciona ubicación</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                            value={formData.status || 'ACTIVE'}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="ACTIVE">Activa</option>
                            <option value="TRANSFORMED">Transformada</option>
                            <option value="CONSUMED">Consumida</option>
                            <option value="DISCARDED">Descartada</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Cantidad"
                            value={formData.qty || ''}
                            onChange={(e) => setFormData({ ...formData, qty: e.target.value ? parseInt(e.target.value) : 0 })}
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={formData.unit || 'UNIT'}
                            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="UNIT">Unidad</option>
                            <option value="GRAM">Gramos</option>
                            <option value="ML">Mililitros</option>
                        </select>
                    </div>

                    <textarea
                        placeholder="Notas"
                        value={formData.notes || ''}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                    />

                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        {editingId ? 'Actualizar' : 'Crear'} Reserva
                    </button>
                </form>
            )}

            {loading ? (
                <p className="text-gray-600">Cargando...</p>
            ) : reserves.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded text-center text-gray-600">
                    No hay reservas. Crea una para comenzar.
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Item</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Ubicación</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Cantidad</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Estado</th>
                                <th className="px-4 py-2 text-right font-semibold text-gray-700">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reserves.map((reserve) => {
                                const color = statusColors[reserve.status as keyof typeof statusColors]
                                const colorMap = { green: 'bg-green-100 text-green-800', yellow: 'bg-yellow-100 text-yellow-800', gray: 'bg-gray-100 text-gray-800', red: 'bg-red-100 text-red-800' }
                                const colorClass = colorMap[color as keyof typeof colorMap]
                                return (
                                    <tr key={reserve.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2 text-gray-800">{getItemName(reserve.itemId)}</td>
                                        <td className="px-4 py-2 text-gray-600">{reserve.locationId ? getLocationName(reserve.locationId) : '-'}</td>
                                        <td className="px-4 py-2 text-gray-600">{reserve.qty} {reserve.unit}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 text-xs rounded ${colorClass}`}>
                                                {statusLabels[reserve.status]}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-right space-x-2">
                                            <button onClick={() => handleEdit(reserve)} className="text-blue-600 hover:text-blue-800 text-sm">
                                                Editar
                                            </button>
                                            <button onClick={() => handleDelete(reserve.id)} className="text-red-600 hover:text-red-800 text-sm">
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

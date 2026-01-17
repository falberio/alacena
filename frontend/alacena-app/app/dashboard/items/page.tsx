'use client'

import { useState, useEffect } from 'react'
import { ItemSchema } from '@/lib/validations'
import { ZodError } from 'zod'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alacena-backend.fly.dev'

interface Item {
    id: string
    code?: string
    name: string
    kind: 'PRODUCT' | 'RECIPE'
    category?: string
    notes?: string
    createdAt: string
    updatedAt: string
}

export default function ItemsPage() {
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [generalError, setGeneralError] = useState<string>('')
    const [submitLoading, setSubmitLoading] = useState(false)
    const [formData, setFormData] = useState<Partial<Item>>({
        name: '',
        kind: 'PRODUCT',
        code: '',
        category: '',
        notes: '',
    })

    // Cargar items
    useEffect(() => {
        fetchItems()
    }, [])

    async function fetchItems() {
        try {
            setLoading(true)
            const res = await fetch(`${API_URL}/api/items?limit=50&skip=0`)
            const data = await res.json()
            setItems(data.data || [])
        } catch (error) {
            console.error('Error fetching items:', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setErrors({})
        setGeneralError('')

        try {
            setSubmitLoading(true)
            // Validar con Zod
            const validatedData = ItemSchema.parse(formData)

            const url = editingId ? `${API_URL}/api/items/${editingId}` : `${API_URL}/api/items`
            const method = editingId ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(validatedData),
            })

            const responseData = await res.json()

            if (!res.ok) {
                throw new Error(responseData.error || responseData.message || 'Error al guardar')
            }

            await fetchItems()
            setFormData({ name: '', kind: 'PRODUCT', code: '', category: '', notes: '' })
            setShowForm(false)
            setEditingId(null)
        } catch (error) {
            if (error instanceof ZodError) {
                const fieldErrors: Record<string, string> = {}
                error.issues?.forEach((err: any) => {
                    const path = err.path[0] as string
                    fieldErrors[path] = err.message
                })
                setErrors(fieldErrors)
                setGeneralError('Por favor completa todos los campos requeridos')
            } else {
                const errorMsg = error instanceof Error ? error.message : 'Error desconocido'
                console.error('Error:', error)
                setGeneralError(`❌ ${errorMsg}`)
            }
        } finally {
            setSubmitLoading(false)
        }
    }

    function handleEdit(item: Item) {
        setFormData(item)
        setEditingId(item.id)
        setShowForm(true)
    }

    async function handleDelete(id: string) {
        if (confirm('¿Estás seguro?')) {
            try {
                setGeneralError('')
                const res = await fetch(`${API_URL}/api/items/${id}`, { method: 'DELETE' })
                const responseData = await res.json()

                if (!res.ok) throw new Error(responseData.error || 'Error al eliminar')
                await fetchItems()
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : 'Error desconocido'
                console.error('Error:', error)
                setGeneralError(`❌ ${errorMsg}`)
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">📦 Items</h1>
                <button
                    onClick={() => {
                        setShowForm(!showForm)
                        setEditingId(null)
                        setFormData({ name: '', kind: 'PRODUCT', code: '', category: '', notes: '' })
                        setGeneralError('')
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    {showForm ? 'Cancelar' : '+ Nuevo Item'}
                </button>
            </div>

            {generalError && (
                <div className="bg-red-50 border border-red-200 p-4 rounded text-red-800">
                    {generalError}
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Nombre *"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <input
                            type="text"
                            placeholder="Código"
                            value={formData.code || ''}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            value={formData.kind || 'PRODUCT'}
                            onChange={(e) => setFormData({ ...formData, kind: e.target.value as 'PRODUCT' | 'RECIPE' })}
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="PRODUCT">Producto</option>
                            <option value="RECIPE">Receta</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Categoría"
                            value={formData.category || ''}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <textarea
                        placeholder="Notas"
                        value={formData.notes || ''}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={submitLoading}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitLoading ? 'Guardando...' : (editingId ? 'Actualizar' : 'Crear')} Item
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false)
                                setEditingId(null)
                                setFormData({ name: '', kind: 'PRODUCT', code: '', category: '', notes: '' })
                                setGeneralError('')
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
            ) : items.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded text-center text-gray-600">
                    No hay items. Crea uno para comenzar.
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Código</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tipo</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Categoría</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-3 text-gray-800">{item.name}</td>
                                    <td className="px-6 py-3 text-gray-600">{item.code || '-'}</td>
                                    <td className="px-6 py-3">
                                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                                            {item.kind}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-gray-600">{item.category || '-'}</td>
                                    <td className="px-6 py-3 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
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

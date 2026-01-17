'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const menuItems = [
  { href: '/dashboard', label: '📊 Dashboard', icon: '📊' },
  { href: '/dashboard/items', label: '📦 Items', icon: '📦' },
  { href: '/dashboard/locations', label: '📍 Ubicaciones', icon: '📍' },
  { href: '/dashboard/reserves', label: '📋 Reservas', icon: '📋' },
  { href: '/dashboard/menu', label: '🍽️ Menú', icon: '🍽️' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">🧺 Alacena</h1>
          <p className="text-sm text-gray-600 mt-1">Panel de Administración</p>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-6 py-3 border-l-4 transition-colors ${isActive
                    ? 'border-blue-500 bg-blue-50 text-blue-600 font-semibold'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                  }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 w-64">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← Volver al sitio
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

import Link from 'next/link'
import { ReactNode } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-alacena-900 text-white p-6 overflow-y-auto">
        <Link href="/" className="flex items-center gap-2 mb-8 hover:opacity-80">
          <span className="text-2xl">🫙</span>
          <h1 className="text-xl font-bold">ALACENA</h1>
        </Link>

        <nav className="space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-alacena-300 uppercase tracking-wider mb-3">
              Gestión
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 rounded hover:bg-alacena-700 transition"
                >
                  📊 Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/guest/menu"
                  className="block px-4 py-2 rounded hover:bg-alacena-700 transition"
                >
                  👀 Ver menú público
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

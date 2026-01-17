export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Bienvenido al Dashboard</h1>
        <p className="text-gray-600 mt-2">Administra los items, ubicaciones y reservas de tu alacena</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="📦 Items" description="Gestiona productos y recetas" count="0" />
        <Card title="📍 Ubicaciones" description="Controla dónde están las cosas" count="0" />
        <Card title="📋 Reservas" description="Monitorea el inventario" count="0" />
        <Card title="🍽️ Menú" description="Edita el menú público" count="0" />
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Últimas actividades</h2>
        <p className="text-blue-800">Sistema completamente funcional. Selecciona una sección del menú para comenzar.</p>
      </div>
    </div>
  )
}

function Card({ title, description, count }: { title: string; description: string; count: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="text-3xl mb-2">{title.split(' ')[0]}</div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      <div className="mt-4 text-2xl font-bold text-blue-600">{count}</div>
    </div>
  )
}

import { Equipo, Empleado } from '../lib/models/mysql';
import dbConnect from '../lib/db/mongodb';
import TicketSoporte from '../lib/models/mongodb';
export const dynamic = "force-dynamic"
export default async function Dashboard() {
  await dbConnect();

  const totalEquipos = await Equipo.count();
  const equiposAsignados = await Equipo.count({ where: { estado: 'Asignado' } });
  const equiposDisponibles = await Equipo.count({ where: { estado: 'Disponible' } });
  const equiposReparacion = await Equipo.count({ where: { estado: 'En Reparación' } });
  const totalEmpleados = await Empleado.count();
  const ticketsAbiertos = await TicketSoporte.countDocuments({ estado: 'Abierto' });

  const StatCard = ({ icon, title, value, subtitle, gradient }) => (
    <div className={`card relative overflow-hidden group`}>
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
      <div className="relative">
        <div className="text-4xl mb-4">{icon}</div>
        <p className="text-sm text-gray-600 mb-2">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel del Sistema</h1>
        <p className="text-gray-600">Bienvenido al gestor de inventario y soporte IT</p>
      </div>

      <div className="grid">
        <StatCard 
          icon="📦"
          title="Estado del Inventario"
          value={totalEquipos}
          subtitle="Equipos totales en el sistema"
          gradient="bg-blue-500"
        />
        <StatCard 
          icon="👥"
          title="Personal"
          value={totalEmpleados}
          subtitle="Empleados en plantilla"
          gradient="bg-green-500"
        />
        <StatCard 
          icon="🚨"
          title="Incidencias"
          value={ticketsAbiertos}
          subtitle="Tickets por resolver"
          gradient="bg-red-500"
        />
      </div>

      <div className="grid mt-8">
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Detalles de Inventario</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100">
              <div>
                <p className="text-sm text-gray-600">Asignados</p>
                <p className="text-2xl font-bold text-blue-600">{equiposAsignados}</p>
              </div>
              <div className="text-4xl">✓</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-transparent rounded-lg border border-green-100">
              <div>
                <p className="text-sm text-gray-600">Disponibles</p>
                <p className="text-2xl font-bold text-green-600">{equiposDisponibles}</p>
              </div>
              <div className="text-4xl">✓</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-transparent rounded-lg border border-yellow-100">
              <div>
                <p className="text-sm text-gray-600">En Reparación</p>
                <p className="text-2xl font-bold text-yellow-600">{equiposReparacion}</p>
              </div>
              <div className="text-4xl">⚙️</div>
            </div>
          </div>
        </div>

        {/* <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Acciones Rápidas</h3>
          <div className="flex flex-col gap-3">
            <a href="/inventario/nuevo" className="btn btn-primary text-center">➕ Nuevo Equipo</a>
            <a href="/empleados/editar" className="btn bg-green-600 text-white hover:bg-green-700 text-center">👤 Nuevo Empleado</a>
            <a href="/soporte/nuevo" className="btn bg-purple-600 text-white hover:bg-purple-700 text-center">🎫 Nuevo Ticket</a>
          </div>
        </div> */}
      </div>
    </div>
  );
}

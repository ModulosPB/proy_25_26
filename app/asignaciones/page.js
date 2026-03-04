import { Asignacion, Equipo, Empleado } from '../../lib/models/mysql';

export default async function AsignacionesPage() {
  const asignaciones = await Asignacion.findAll({
    include: [
      { model: Equipo, attributes: ['marca', 'modelo', 'numero_serie'] },
      { model: Empleado, attributes: ['nombre_completo'] }
    ],
    order: [['fecha_entrega', 'DESC']]
  });

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Historial de Asignaciones</h1>
          <p className="text-gray-600">Control de entregas y devoluciones de equipos</p>
        </div>
        <a href="/inventario" className="btn btn-primary">+ Nueva Asignación</a>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="py-3 px-4 text-left">Equipo</th>
              <th className="py-3 px-4 text-left">Empleado</th>
              <th className="py-3 px-4 text-left">Fecha Entrega</th>
              <th className="py-3 px-4 text-left">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {asignaciones.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4">
                  <strong className="block text-gray-900">{a.Equipo?.marca} {a.Equipo?.modelo}</strong>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">{a.Equipo?.numero_serie}</code>
                </td>
                <td className="py-3 px-4 text-gray-700">{a.Empleado?.nombre_completo}</td>
                <td className="py-3 px-4 text-gray-700">{new Date(a.fecha_entrega).toLocaleDateString('es-ES')}</td>
                <td className="py-3 px-4 text-gray-600">{a.observaciones || '-'}</td>
              </tr>
            ))}
            {asignaciones.length === 0 && (
              <tr>
                <td colSpan="4" className="py-12 px-4 text-center text-gray-500">
                  <p className="text-lg">No hay registros de asignaciones.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

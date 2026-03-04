import { Equipo, Categoria, Asignacion, Empleado } from '../../lib/models/mysql';
import Link from 'next/link';
import InventarioList from './InventarioList';

export default async function InventarioPage() {
  const equiposRaw = await Equipo.findAll({
    include: [
      { model: Categoria },
      { 
        model: Asignacion, 
        limit: 1, 
        order: [['fecha_entrega', 'DESC']],
        include: [{ model: Empleado, attributes: ['id', 'nombre_completo'] }]
      }
    ]
  });

  // Convertimos a objeto plano para el componente de cliente
  const equipos = JSON.parse(JSON.stringify(equiposRaw));

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Inventario de Hardware</h1>
          <p className="text-gray-600">Gestiona todos los equipos de la empresa</p>
        </div>
        <Link href="/inventario/nuevo" className="btn btn-primary">+ Nuevo Equipo</Link>
      </div>

      <InventarioList initialEquipos={equipos} />
    </div>
  );
}

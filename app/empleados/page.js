import { Empleado } from '../../lib/models/mysql';
import { createEmpleado } from '../../lib/actions';
import Link from 'next/link';
import DeleteEmpleadoButton from './DeleteButton';

export default async function EmpleadosPage() {
  const empleados = await Empleado.findAll({
    order: [['nombre_completo', 'ASC']]
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestión de Personal</h1>
        <p className="text-gray-600">Administra los empleados y sus datos</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Formulario de Alta */}
        <div className="card lg:col-span-1 h-fit sticky top-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuevo Empleado</h2>
          <form action={createEmpleado} className="space-y-4">
            <div className="form-group">
              <label>Nombre Completo</label>
              <input name="nombre_completo" type="text" placeholder="Ej: Juan Pérez" required />
            </div>
            <div className="form-group">
              <label>Email Corporativo</label>
              <input name="email" type="email" placeholder="juan.perez@empresa.com" required />
            </div>
            <div className="form-group">
              <label>URL Foto</label>
              <input name="foto" type="text" placeholder="https://..." />
            </div>
            <div className="form-group">
              <label>Departamento</label>
              <input name="departamento" type="text" placeholder="IT, Ventas, RRHH..." required />
            </div>
            <div className="form-group">
              <label>Fecha de Ingreso</label>
              <input name="fecha_ingreso" type="date" required />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Dar de Alta
            </button>
          </form>
        </div>

        {/* Columna Derecha: Listado */}
        <div className="card lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Listado de Personal</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 px-4 text-left">Foto</th>
                  <th className="py-3 px-4 text-left">Nombre</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map(emp => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      <img 
                        src={emp.foto || 'https://via.placeholder.com/40'} 
                        alt={emp.nombre_completo}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <strong className="block text-gray-900">{emp.nombre_completo}</strong>
                      <small className="text-gray-500">{emp.departamento}</small>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{emp.email}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Link 
                          href={`/empleados/editar/${emp.id}`}
                          className="text-blue-600 hover:text-blue-800 text-lg"
                          title="Editar"
                        >
                          ✏️
                        </Link>
                        <DeleteEmpleadoButton id={emp.id} nombre={emp.nombre_completo} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

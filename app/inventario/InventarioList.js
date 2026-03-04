'use client';

import { useState } from 'react';
import Link from 'next/link';
import { returnEquipo } from '../../lib/actions';

const BadgeEstado = ({ estado }) => {
  const colors = {
    'Disponible': 'bg-green-100 text-green-800 border-green-300',
    'Asignado': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'En Reparación': 'bg-red-100 text-red-800 border-red-300'
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${colors[estado] || colors['Disponible']}`}>
      {estado}
    </span>
  );
};

export default function InventarioList({ initialEquipos }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const handleReturn = async (id, nombre) => {
    if (confirm(`¿Deseas marcar el equipo ${nombre} como devuelto? El estado pasará a Disponible.`)) {
      await returnEquipo(id);
    }
  };

  const filteredEquipos = initialEquipos.filter(equipo => {
    const matchesSearch = 
      equipo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipo.numero_serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipo.Categorium?.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || equipo.estado === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar por marca, modelo, S/N o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:col-span-2"
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="min-w-48"
        >
          <option value="Todos">Todos los estados</option>
          <option value="Disponible">Disponibles</option>
          <option value="Asignado">Asignados</option>
          <option value="En Reparación">En Reparación</option>
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Marca/Modelo</th>
              <th className="py-3 px-4 text-left">S/N</th>
              <th className="py-3 px-4 text-left">Categoría</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipos.map(equipo => (
              <tr key={equipo.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4 font-mono text-sm text-gray-700">#{equipo.id}</td>
                <td className="py-3 px-4 font-semibold text-gray-900">
                  {equipo.marca} {equipo.modelo}
                </td>
                <td className="py-3 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">
                    {equipo.numero_serie}
                  </code>
                </td>
                <td className="py-3 px-4 text-gray-700">{equipo.Categorium?.nombre || 'N/A'}</td>
                <td className="py-3 px-4">
                  <div className="space-y-2">
                    <BadgeEstado estado={equipo.estado} />
                    {equipo.estado === 'Asignado' && equipo.Asignacions?.[0]?.Empleado && (
                      <div className="text-xs text-gray-600 pt-2">
                        <Link 
                          href={`/empleados/${equipo.Asignacions[0].Empleado.id}`} 
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          👤 {equipo.Asignacions[0].Empleado.nombre_completo}
                        </Link>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-3 items-center">
                    <Link 
                      href={`/inventario/editar/${equipo.id}`} 
                      className="text-blue-600 hover:text-blue-800 text-lg"
                      title="Editar Equipo"
                    >
                      ✏️
                    </Link>
                    {equipo.estado === 'Disponible' && (
                      <Link 
                        href={`/asignaciones/nuevo/${equipo.id}`} 
                        className="text-green-600 hover:text-green-800 text-lg"
                        title="Asignar Equipo"
                      >
                        🤝
                      </Link>
                    )}
                    {equipo.estado === 'Asignado' && (
                      <button 
                        onClick={() => handleReturn(equipo.id, `${equipo.marca} ${equipo.modelo}`)}
                        className="text-purple-600 hover:text-purple-800 text-lg"
                        title="Devolver Equipo"
                      >
                        🔄
                      </button>
                    )}
                    <Link 
                      href={`/soporte/nuevo/${equipo.id}`} 
                      className="text-orange-600 hover:text-orange-800 text-lg"
                      title="Abrir Ticket"
                    >
                      🎫
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEquipos.length === 0 && (
              <tr>
                <td colSpan="6" className="py-12 px-4 text-center text-gray-500">
                  <p className="text-lg">No se encontraron equipos que coincidan con la búsqueda o el filtro.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

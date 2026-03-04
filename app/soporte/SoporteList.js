'use client';

import { useState } from 'react';
import Link from 'next/link';

const BadgePrioridad = ({ prioridad }) => {
  const colors = {
    'Crítica': 'bg-red-100 text-red-800 border-red-300',
    'Alta': 'bg-orange-100 text-orange-800 border-orange-300',
    'Media': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Baja': 'bg-green-100 text-green-800 border-green-300'
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${colors[prioridad] || colors['Media']}`}>
      {prioridad}
    </span>
  );
};

const BadgeEstado = ({ estado }) => {
  const colors = {
    'Abierto': 'bg-blue-100 text-blue-800 border-blue-300',
    'En Proceso': 'bg-purple-100 text-purple-800 border-purple-300',
    'Cerrado': 'bg-green-100 text-green-800 border-green-300'
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${colors[estado] || colors['Abierto']}`}>
      {estado}
    </span>
  );
};

export default function SoporteList({ initialTickets }) {
  const [priorityFilter, setPriorityFilter] = useState('Todas');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const filteredTickets = initialTickets.filter(ticket => {
    const matchesPriority = priorityFilter === 'Todas' || ticket.prioridad === priorityFilter;
    const matchesStatus = statusFilter === 'Todos' || ticket.estado === statusFilter;
    return matchesPriority && matchesStatus;
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="form-group">
          <label>Filtrar por Prioridad</label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="w-full">
            <option value="Todas">Todas las prioridades</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
            <option value="Crítica">Crítica</option>
          </select>
        </div>
        <div className="form-group">
          <label>Filtrar por Estado</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full">
            <option value="Todos">Todos los estados</option>
            <option value="Abierto">Abierto</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Cerrado">Cerrado</option>
          </select>
        </div>
      </div>

      <div className="grid">
        {filteredTickets.map(ticket => (
          <div key={ticket._id} className="card">
            <div className="flex justify-between items-start gap-4 mb-4">
              <BadgePrioridad prioridad={ticket.prioridad} />
              <div className="flex items-end gap-3">
                <Link href={`/soporte/editar/${ticket._id}`} className="text-blue-600 hover:text-blue-800 text-lg" title="Editar Ticket">✏️</Link>
                <small className="text-gray-500">{new Date(ticket.fecha_creacion).toLocaleDateString('es-ES')}</small>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{ticket.asunto}</h3>
            <p className="text-gray-600 text-sm mb-4">{ticket.descripcion}</p>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-600">Equipo: </span>
                  <Link href={`/inventario/${ticket.id_equipo_mysql}`} className="text-blue-600 hover:underline font-semibold">
                    #{ticket.id_equipo_mysql}
                  </Link>
                </div>
                <BadgeEstado estado={ticket.estado} />
              </div>
            </div>
          </div>
        ))}
        {filteredTickets.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p className="text-lg">No hay tickets que coincidan con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </>
  );
}

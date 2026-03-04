'use client';

import { deleteEmpleado } from '../../lib/actions';

export default function DeleteEmpleadoButton({ id, nombre }) {
  const handleDelete = async () => {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${nombre}?`)) {
      await deleteEmpleado(id);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 text-lg"
      title="Borrar"
    >
      🗑️
    </button>
  );
}

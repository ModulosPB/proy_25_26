import { Equipo, Empleado } from '../../../../lib/models/mysql';
import { createAsignacion } from '../../../../lib/actions';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function NuevaAsignacionPage({ params }) {
  const { id } = params;
  const equipo = await Equipo.findByPk(id);
  const empleados = await Empleado.findAll({ order: [['nombre_completo', 'ASC']] });

  if (!equipo || equipo.estado !== 'Disponible') {
    notFound();
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Asignar Hardware</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Registrando entrega de: <strong>{equipo.marca} {equipo.modelo}</strong> (S/N: {equipo.numero_serie})
      </p>

      <form action={createAsignacion}>
        <input type="hidden" name="id_equipo" value={equipo.id} />

        <div className="form-group">
          <label>Seleccionar Empleado</label>
          <select name="id_empleado" required>
            <option value="">Selecciona al receptor...</option>
            {empleados.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.nombre_completo} ({emp.departamento})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Observaciones de la entrega</label>
          <textarea 
            name="observaciones" 
            rows="3" 
            placeholder="Ej: Se entrega con funda y cargador original."
          ></textarea>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary">Confirmar Asignación</button>
          <a href="/inventario" className="btn">Cancelar</a>
        </div>
      </form>
    </div>
  );
}

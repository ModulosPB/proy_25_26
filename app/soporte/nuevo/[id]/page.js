import { Equipo } from '../../../../lib/models/mysql';
import { createTicket } from '../../../../lib/actions';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function NuevoTicketPage({ params }) {
  const { id } = params;
  const equipo = await Equipo.findByPk(id);

  if (!equipo) {
    notFound();
  }

  return (
    <div className="card">
      <h1>Abrir Ticket de Soporte</h1>
      <p style={{ color: 'var(--text-muted)' }}>
        Generando incidencia para: <strong>{equipo.marca} {equipo.modelo}</strong> (S/N: {equipo.numero_serie})
      </p>

      <form action={createTicket}>
        {/* Campo oculto para pasar el ID del equipo a la Server Action */}
        <input type="hidden" name="id_equipo_mysql" value={equipo.id} />

        <div className="form-group">
          <label>Asunto</label>
          <input name="asunto" type="text" placeholder="Ej: No enciende, pantalla rota..." required />
        </div>

        <div className="form-group">
          <label>Descripción detallada</label>
          <textarea name="descripcion" rows="4" placeholder="Describe el problema técnico..." required></textarea>
        </div>

        <div className="form-group">
          <label>Prioridad</label>
          <select name="prioridad" required>
            <option value="Baja">Baja</option>
            <option value="Media" selected>Media</option>
            <option value="Alta">Alta</option>
            <option value="Crítica">Crítica</option>
          </select>
        </div>

        {/* Metadatos técnicos extra (para demostrar la flexibilidad de MongoDB) */}
        <div className="grid" style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label>Sistema Operativo</label>
            <input name="os" type="text" placeholder="Windows 11, macOS..." />
          </div>
          <div className="form-group">
            <label>Navegador</label>
            <input name="browser" type="text" placeholder="Chrome, Firefox..." />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary">Crear Ticket</button>
          <a href="/inventario" className="btn">Cancelar</a>
        </div>
      </form>
    </div>
  );
}

import dbConnect from '../../../../lib/db/mongodb';
import TicketSoporte from '../../../../lib/models/mongodb';
import { updateTicket } from '../../../../lib/actions';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditarTicketPage({ params }) {
  const { id } = params;
  await dbConnect();
  const ticket = await TicketSoporte.findById(id);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Editar Ticket de Soporte</h1>
      <form action={updateTicket}>
        <input type="hidden" name="id" value={ticket._id.toString()} />

        <div className="form-group">
          <label>Asunto</label>
          <input name="asunto" type="text" defaultValue={ticket.asunto} required />
        </div>

        <div className="form-group">
          <label>Descripción detallada</label>
          <textarea name="descripcion" rows="4" defaultValue={ticket.descripcion} required></textarea>
        </div>

        <div className="form-group">
          <label>Prioridad</label>
          <select name="prioridad" defaultValue={ticket.prioridad} required>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
            <option value="Crítica">Crítica</option>
          </select>
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select name="estado" defaultValue={ticket.estado} required>
            <option value="Abierto">Abierto</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Cerrado">Cerrado</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          <a href="/soporte" className="btn">Cancelar</a>
        </div>
      </form>
    </div>
  );
}

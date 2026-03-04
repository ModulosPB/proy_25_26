import { Equipo, Categoria } from '../../../lib/models/mysql';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DetalleEquipoPage({ params }) {
  const { id } = params;
  const equipo = await Equipo.findByPk(id, {
    include: [{ model: Categoria }]
  });

  if (!equipo) {
    notFound();
  }

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/inventario" style={{ textDecoration: 'none' }}>← Volver al Inventario</Link>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h1>{equipo.marca} {equipo.modelo}</h1>
          <span className={`badge badge-${
            equipo.estado === 'Disponible' ? 'success' : 
            equipo.estado === 'Asignado' ? 'warning' : 'danger'
          }`}>
            {equipo.estado}
          </span>
        </div>

        <hr style={{ border: '0', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />

        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <p><strong>ID de Equipo:</strong> #{equipo.id}</p>
            <p><strong>Categoría:</strong> {equipo.Categorium?.nombre || 'N/A'}</p>
          </div>
          <div>
            <p><strong>Número de Serie:</strong> <code>{equipo.numero_serie}</code></p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <Link href={`/inventario/editar/${equipo.id}`} className="btn btn-primary">Editar Datos</Link>
          {equipo.estado === 'Disponible' && (
            <Link href={`/asignaciones/nuevo/${equipo.id}`} className="btn btn-primary" style={{ backgroundColor: 'var(--success)' }}>Asignar Equipo</Link>
          )}
          <Link href={`/soporte/nuevo/${equipo.id}`} className="btn" style={{ background: '#e2e8f0' }}>Abrir Ticket</Link>
        </div>
      </div>
    </div>
  );
}

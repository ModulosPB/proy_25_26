import { Empleado, Equipo, Asignacion } from '../../../lib/models/mysql';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DetalleEmpleadoPage({ params }) {
  const { id } = await params;
  const empleado = await Empleado.findByPk(id);

  if (!empleado) {
    notFound();
  }

  // Buscar equipos asignados actualmente a este empleado
  const asignaciones = await Asignacion.findAll({
    where: { id_empleado: id },
    include: [{ model: Equipo }],
    order: [['fecha_entrega', 'DESC']]
  });

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/empleados" style={{ textDecoration: 'none' }}>← Volver a Empleados</Link>
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <img 
            src={empleado.foto || 'https://via.placeholder.com/150'} 
            alt={empleado.nombre_completo} 
            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary)' }}
          />
          <div>
            <h1>{empleado.nombre_completo}</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>{empleado.departamento}</p>
            <p><strong>Email:</strong> {empleado.email}</p>
            <p><strong>Fecha de Ingreso:</strong> {new Date(empleado.fecha_ingreso).toLocaleDateString()}</p>
          </div>
        </div>

        <hr style={{ border: '0', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />

        <h2>Equipos Asignados</h2>
        <table>
          <thead>
            <tr>
              <th>Equipo</th>
              <th>S/N</th>
              <th>Fecha Entrega</th>
            </tr>
          </thead>
          <tbody>
            {asignaciones.map((a) => (
              <tr key={a.id}>
                <td>
                  <Link href={`/inventario/${a.Equipo?.id}`} style={{ fontWeight: 'bold' }}>
                    {a.Equipo?.marca} {a.Equipo?.modelo}
                  </Link>
                </td>
                <td><code>{a.Equipo?.numero_serie}</code></td>
                <td>{new Date(a.fecha_entrega).toLocaleDateString()}</td>
              </tr>
            ))}
            {asignaciones.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>
                  Este empleado no tiene equipos asignados actualmente.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ marginTop: '2rem' }}>
          <Link href={`/empleados/editar/${empleado.id}`} className="btn btn-primary">Editar Perfil</Link>
        </div>
      </div>
    </div>
  );
}

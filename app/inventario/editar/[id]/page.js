import { Equipo, Categoria } from '../../../../lib/models/mysql';
import { updateEquipo } from '../../../../lib/actions';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditarEquipoPage({ params }) {
  const { id } = await params;
  const equipo = await Equipo.findByPk(id);
  const categorias = await Categoria.findAll();

  if (!equipo) {
    notFound();
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Editar Equipo</h1>
      <form action={updateEquipo}>
        <input type="hidden" name="id" value={equipo.id} />

        <div className="form-group">
          <label>Categoría</label>
          <select name="id_categoria" defaultValue={equipo.id_categoria} required>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Marca</label>
          <input 
            name="marca" 
            type="text" 
            defaultValue={equipo.marca} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Modelo</label>
          <input 
            name="modelo" 
            type="text" 
            defaultValue={equipo.modelo} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Número de Serie</label>
          <input 
            name="numero_serie" 
            type="text" 
            defaultValue={equipo.numero_serie} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select name="estado" defaultValue={equipo.estado} required>
            <option value="Disponible">Disponible</option>
            <option value="Asignado">Asignado</option>
            <option value="En Reparación">En Reparación</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          <a href="/inventario" className="btn">Cancelar</a>
        </div>
      </form>
    </div>
  );
}

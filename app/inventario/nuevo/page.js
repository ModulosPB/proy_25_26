import { Categoria } from '../../../lib/models/mysql';
import { createEquipo } from '../../../lib/actions';

export default async function NuevoEquipoPage() {
  const categorias = await Categoria.findAll();

  return (
    <div className="card">
      <h1>Añadir Nuevo Equipo</h1>
      <form action={createEquipo}>
        <div className="form-group">
          <label>Categoría</label>
          <select name="id_categoria" required>
            <option value="">Selecciona una...</option>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Marca</label>
          <input name="marca" type="text" placeholder="Ej: HP, Dell..." required />
        </div>

        <div className="form-group">
          <label>Modelo</label>
          <input name="modelo" type="text" placeholder="Ej: EliteBook 840" required />
        </div>

        <div className="form-group">
          <label>Número de Serie</label>
          <input name="numero_serie" type="text" placeholder="SN-123-ABC" required />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">Guardar Equipo</button>
          <a href="/inventario" className="btn">Cancelar</a>
        </div>
      </form>
    </div>
  );
}

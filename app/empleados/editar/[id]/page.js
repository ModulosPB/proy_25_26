import { Empleado } from '../../../../lib/models/mysql';
import { updateEmpleado } from '../../../../lib/actions';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditarEmpleadoPage({ params }) {
  const { id } = params;
  const empleado = await Empleado.findByPk(id);

  if (!empleado) {
    notFound();
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Editar Empleado</h1>
      <form action={updateEmpleado}>
        <input type="hidden" name="id" value={empleado.id} />

        <div className="form-group">
          <label>Nombre Completo</label>
          <input 
            name="nombre_completo" 
            type="text" 
            defaultValue={empleado.nombre_completo} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Email Corporativo</label>
          <input 
            name="email" 
            type="email" 
            defaultValue={empleado.email} 
            required 
          />
        </div>

        <div className="form-group">
          <label>URL Foto</label>
          <input 
            name="foto" 
            type="text" 
            defaultValue={empleado.foto} 
          />
        </div>

        <div className="form-group">
          <label>Departamento</label>
          <input 
            name="departamento" 
            type="text" 
            defaultValue={empleado.departamento} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Fecha de Ingreso</label>
          <input 
            name="fecha_ingreso" 
            type="date" 
            defaultValue={empleado.fecha_ingreso} 
            required 
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          <a href="/empleados" className="btn">Cancelar</a>
        </div>
      </form>
    </div>
  );
}

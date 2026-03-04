import { DataTypes } from 'sequelize';
import sequelize from '../db/mysql';

export const Categoria = sequelize.define('Categoria', {
  nombre: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'categorias', timestamps: false });

export const Empleado = sequelize.define('Empleado', {
  nombre_completo: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  departamento: { type: DataTypes.STRING },
  fecha_ingreso: { type: DataTypes.DATEONLY },
  foto: { type: DataTypes.STRING }
}, { tableName: 'empleados', timestamps: false });

export const Equipo = sequelize.define('Equipo', {
  marca: { type: DataTypes.STRING, allowNull: false },
  modelo: { type: DataTypes.STRING, allowNull: false },
  numero_serie: { type: DataTypes.STRING, unique: true, allowNull: false },
  estado: { 
    type: DataTypes.ENUM('Disponible', 'Asignado', 'En Reparación'),
    defaultValue: 'Disponible'
  }
}, { tableName: 'equipos', timestamps: false });

// Definir relaciones
Categoria.hasMany(Equipo, { foreignKey: 'id_categoria' });
Equipo.belongsTo(Categoria, { foreignKey: 'id_categoria' });

export const Asignacion = sequelize.define('Asignacion', {
  fecha_entrega: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  observaciones: { type: DataTypes.TEXT }
}, { tableName: 'asignaciones', timestamps: false });

Asignacion.belongsTo(Equipo, { foreignKey: 'id_equipo' });
Asignacion.belongsTo(Empleado, { foreignKey: 'id_empleado' });

// Relaciones inversas (para permitir include desde Equipo y Empleado)
Equipo.hasMany(Asignacion, { foreignKey: 'id_equipo' });
Empleado.hasMany(Asignacion, { foreignKey: 'id_empleado' });

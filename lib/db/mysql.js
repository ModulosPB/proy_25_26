import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const sequelize = new Sequelize(process.env.MYSQL_URI, {
  dialect: 'mysql',
  dialectModule: mysql2, // Obliga a Next.js a incluir mysql2 en el bundle de Vercel
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false // Recomendado para conexiones seguras en producción
    }
  }
});

// En producción no se intenta sincronizar automáticamente durante el build
// porque la base de datos puede no estar accesible desde la fase de compilación.
// Si necesitas ejecutar sincronización, hazlo manualmente o desde un script
// en el servidor.
if (process.env.NODE_ENV !== 'production') {
  sequelize.sync()
    .then(() => console.log('Tablas sincronizadas en MySQL'))
    .catch(err => console.error('Error al sincronizar tablas:', err));
}

export default sequelize;

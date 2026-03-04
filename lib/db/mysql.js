import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.MYSQL_URI, {
  dialect: 'mysql',
  logging: false
});

// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => console.log('Tablas sincronizadas en MySQL'))
  .catch(err => console.error('Error al sincronizar tablas:', err));

export default sequelize;

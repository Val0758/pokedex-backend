require('dotenv').config(); //INICIALIZAR variables de entrono

const { Sequelize,DataTypes } = require('sequelize');// llamo sequelize import
const usuarioModelo = require('../modelos/usuario');
const pokemonModelo = require('../modelos/pokemon');
const capturadoModelo = require('../modelos/pokemonCapturado');

const sequelize = new Sequelize(  //creo una instancia de sequelize para conexion
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);
//guarda en constante
const Usuario = usuarioModelo(sequelize, DataTypes);
const Pokemon = pokemonModelo(sequelize, DataTypes);
const Capturado = capturadoModelo(sequelize, DataTypes);

sequelize.authenticate()
  .then(() => console.log('Conectado a la base de datos.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

sequelize.sync({ alter: true, force: false }) //Sincronizo a base de datos
  .then(() => console.log('Sincronización completada.'))
  .catch(err => console.error('Error en la sincronización:', err));

module.exports = {
    Usuario,
    Pokemon,
    Capturado,
    sequelize
};

require('dotenv').config(); //Inicializar las variales de entorno

const { Sequelize,DataTypes } = require('sequelize'); //Inicializo la libreria seuilize
//Capturar Modelos
const usuarioModelo = require('../modelos/usuario');
const pokemonModelo = require('../modelos/pokemon');
const capturadoModelo = require('../modelos/pokemonCapturado');

//Inicializar un objeto de tipo sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);
//Guarda autenticacion de la base de datos
const Usuario = usuarioModelo(sequelize, DataTypes);
const Pokemon = pokemonModelo(sequelize, DataTypes);
const Capturado = capturadoModelo(sequelize, DataTypes);

//Funcion para que visualmente autentique y de el mensaje 200,404,500
sequelize.authenticate()
  .then(() => console.log('Conectado a la base de datos.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

  //Sincorinizar= crear las tablas en la base de datos
sequelize.sync({ alter: true, force: false })
  .then(() => console.log('Sincronización completada.'))
  .catch(err => console.error('Error en la sincronización:', err));

module.exports = {
    Usuario,
    Pokemon,
    Capturado,
    sequelize
};

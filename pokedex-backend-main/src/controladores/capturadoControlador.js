const { Capturado } = require('../baseDatos');

const capturarPokemon = async (req, res) => {
  try {
    const capturado = await Capturado.create(req.body);
    res.status(201).json({ mensaje: "Pokemon capturado",resultado:capturado });
  } catch (error) {
    res.status(400).json({ mensaje: error.message,resultado:null });
  }
};
//const Usuario = require('../modelos/usuario'); // Modelo de Usuario
//const Pokemon = require('../modelos/pokemon'); // Modelo de Pokémon

// Función para listar todas las capturas
const listarCapturas = async (req, res) => {
  try {
    const capturado = await Capturado.findAll(); // Obtenemos todos los Pokémon de la base de datos
    res.status(200).json({capturado }); // Enviamos los Pokémon como respuesta en formato JSON
  } catch (error) {
    console.error('Error al obtener los Pokémones capturados:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor', resultado: null });
  }
}

module.exports = {
  listarCapturas,
  capturarPokemon
};
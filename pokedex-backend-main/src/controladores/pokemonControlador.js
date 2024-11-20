const { Pokemon } = require('../baseDatos');

const registrarPokemon = async (req, res) => {
  try {
    const { nombre, tipo,poder} = req.body;
    
    const pokemonExistente = await Pokemon.findOne({
        where: {
            nombre: nombre
        }
    });

    if (pokemonExistente) {
      return res.status(400).json({ mensaje: "El pokemon ya existe",resultado:null });
    }

    const nuevoPokemon = await Pokemon.create({ nombre, tipo,poder });
    res.status(201).json({ mensaje:"Pokemon creado",resultado:nuevoPokemon});
  } catch (error) {
    res.status(400).json({ mensaje: error.message,resultado:null });
  }
};
// Función para listar todos los Pokémon
const listarPokemones = async (req, res) => {
  try {
    const pokemones = await Pokemon.findAll(); // Obtenemos todos los Pokémon de la base de datos
    res.status(200).json({ pokemones }); // Enviamos los Pokémon como respuesta en formato JSON
  } catch (error) {
    console.error('Error al obtener los Pokémon:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor', resultado: null });
  }
}

module.exports = {
  listarPokemones,
  registrarPokemon
};
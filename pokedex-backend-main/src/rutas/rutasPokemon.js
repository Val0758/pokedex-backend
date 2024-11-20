const express = require('express');
const enrutador = express.Router();
const pokemonControlador = require('../controladores/pokemonControlador');

enrutador.post('/registrar', pokemonControlador.registrarPokemon);
// Ruta para listar Pokémon
enrutador.get('/listar', pokemonControlador.listarPokemones);

module.exports = enrutador;
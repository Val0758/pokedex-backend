const express = require('express');
const enrutador = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');

enrutador.post('/registrar', usuarioControlador.registrarUsuario);
// Ruta para listar Pokémon
enrutador.get('/listar', pokemonControlador.listarPokemones);

module.exports = enrutador;
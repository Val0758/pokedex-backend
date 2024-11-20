const express = require('express');
const enrutador = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');

// Ruta para registrar un usuario
enrutador.post('/registrar', usuarioControlador.registrarUsuario);

// Ruta para listar usuarios
enrutador.get('/listar', usuarioControlador.listarUsuarios);

module.exports = enrutador;

const express = require('express');
const enrutador = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');

enrutador.post('/registrar', usuarioControlador.registrarUsuario);

module.exports = enrutador;
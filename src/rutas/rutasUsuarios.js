const express = require('express');
const enrutador = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador'); // <-- Aquí puede estar el problema

enrutador.post('/registrar', usuarioControlador.registrarUsuario); // <-- usuarioControlador.registrarUsuario debe existir

module.exports = enrutador;

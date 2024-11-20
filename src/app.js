require('dotenv').config();  // Cargar variables de entorno
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// Importar rutas
const usuarioRutas = require('./rutas/rutasUsuarios'); // Rutas de usuario
const pokemonRutas = require('./rutas/rutasPokemon');  // Rutas de Pokémon
const capturaRutas = require('./rutas/rutasCapturados');  // Rutas de Capturas

// Middleware
app.use(express.json());  // Para analizar las solicitudes JSON
app.use(cors());  // Permitir solicitudes CORS
app.use(express.static(path.join(__dirname, 'vistas')));

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'vistas', 'index.html'));
});

// Rutas de la API
app.use('/api/usuario', usuarioRutas); // Rutas de Usuario
app.use('/api/pokemon', pokemonRutas); // Rutas de Pokémon
app.use('/api/captura', capturaRutas); // Rutas de Capturas

// Puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
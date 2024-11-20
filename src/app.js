require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// Middleware
app.use(express.json()); // Permite analizar solicitudes JSON
app.use(cors()); // Habilita solicitudes CORS
app.use(express.static(path.join(__dirname))); // Define la carpeta actual como estática

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Importar rutas de la API
const usuarioRutas = require('./rutas/rutasUsuario'); // Rutas de usuario
const pokemonRutas = require('./rutas/rutasPokemon'); // Rutas de Pokémon
const capturaRutas = require('./rutas/rutasCapturado'); // Rutas de Capturas

// Rutas de la API
app.use('/api/usuario', usuarioRutas); // Rutas de Usuario
app.use('/api/pokemon', pokemonRutas); // Rutas de Pokémon
app.use('/api/captura', capturaRutas); // Rutas de Capturas

// Puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})

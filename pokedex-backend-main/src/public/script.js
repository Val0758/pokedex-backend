/// Selección de Elementos del DOM
const formUsuario = document.querySelector('#formUsuario');
const formPokemon = document.querySelector('#formPokemon');
const mensajeResultadoUsuario = document.getElementById('resultadoUsuario');
const mensajeResultadoPokemon = document.getElementById('resultadoPokemon');
const mensajeResultadoCaptura = document.getElementById('resultadoCaptura');
const tablaPokemon = document.getElementById('tablaPokemon').getElementsByTagName('tbody')[0];
const tablaCapturas = document.getElementById('tablaCapturas').getElementsByTagName('tbody')[0];

// URL Base de la API
const API_BASE_URL = 'http://3.145.30.157:3007/api';

// Función para Mostrar Mensajes de Resultado
function mostrarMensaje(elemento, mensaje, color = 'red') {
    elemento.style.display = 'block';
    elemento.style.color = color;
    elemento.textContent = mensaje;
}

// Función para Limpiar Formularios y Mensajes
function limpiarFormulario(form, mensajeElemento) {
    form.reset();
    mensajeElemento.style.display = 'none';
}

// Registrar Usuario
formUsuario.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(formUsuario).entries());

    try {
        const response = await fetch(`${API_BASE_URL}/usuario/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        if (!response.ok) {
            mostrarMensaje(mensajeResultadoUsuario, `Error en datos: ${result.mensaje}`);
            return;
        }

        mostrarMensaje(mensajeResultadoUsuario, '¡Usuario registrado exitosamente!', 'green');
        limpiarFormulario(formUsuario, mensajeResultadoUsuario);

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        mostrarMensaje(mensajeResultadoUsuario, 'Error al registrar usuario. Inténtalo de nuevo más tarde.');
    }
});

// Registrar Pokémon
formPokemon.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(formPokemon).entries());

    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        if (!response.ok) {
            mostrarMensaje(mensajeResultadoPokemon, `Error en datos: ${result.mensaje}`);
            return;
        }

        mostrarMensaje(mensajeResultadoPokemon, '¡Pokémon registrado exitosamente!', 'green');
        limpiarFormulario(formPokemon, mensajeResultadoPokemon);

    } catch (error) {
        console.error('Error al registrar Pokémon:', error);
        mostrarMensaje(mensajeResultadoPokemon, 'Error al registrar Pokémon. Inténtalo de nuevo más tarde.');
    }
});

// Capturar Pokémon
async function capturarPokemon(pokemonId) {
    const cedula = prompt("Introduce tu cédula para capturar el Pokémon:");
    if (!cedula) {
        alert("Debes ingresar tu cédula para capturar el Pokémon.");
        return;
    }

    const data = { usuarioCedula: cedula, pokemonId };

    try {
        const response = await fetch(`${API_BASE_URL}/captura/capturar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        if (!response.ok) {
            mostrarMensaje(mensajeResultadoCaptura, `Error en captura: ${result.mensaje}`);
            return;
        }

        mostrarMensaje(mensajeResultadoCaptura, '¡Pokémon capturado exitosamente!', 'green');
        obtenerCapturas(); // Actualiza la tabla de capturas

    } catch (error) {
        console.error('Error al capturar Pokémon:', error);
        mostrarMensaje(mensajeResultadoCaptura, 'Error al capturar Pokémon. Inténtalo de nuevo más tarde.');
    }
}

// Obtener y Mostrar Pokémon en la Tabla
async function obtenerPokemones() {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/listar`);
        const data = await response.json();

        tablaPokemon.innerHTML = ''; // Limpiamos la tabla antes de mostrar los datos

        if (data.pokemones) {
            data.pokemones.forEach(pokemon => {
                const fila = tablaPokemon.insertRow();
                fila.insertCell(0).textContent = pokemon.nombre;
                fila.insertCell(1).textContent = pokemon.tipo;
                fila.insertCell(2).textContent = pokemon.poder;
                fila.insertCell(3).innerHTML = `<button onclick="capturarPokemon(${pokemon.id})">Capturar</button>`;
            });
        }
    } catch (error) {
        console.error('Error al obtener los Pokémon:', error);
    }
}

// Obtener y Mostrar Capturas en la Tabla
async function obtenerCapturas() {
    try {
        const response = await fetch(`${API_BASE_URL}/captura/listar`);
        const data = await response.json();

        tablaCapturas.innerHTML = ''; // Limpiamos la tabla antes de mostrar los datos

        if (data.capturado) {
            data.capturado.forEach(captura => {
                const fila = tablaCapturas.insertRow();
                fila.insertCell(0).textContent = `${captura.pokemonId}`;
                fila.insertCell(1).textContent = `${captura.usuarioCedula}`;
                fila.insertCell(2).textContent = captura.createdAt;
            });
        }
    } catch (error) {
        console.error('Error al obtener las capturas:', error);
    }
}

// Llamadas Iniciales para Cargar Datos en la Interfaz
obtenerPokemones();
obtenerCapturas();

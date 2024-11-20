/// Elementos del DOM
const formUsuario = document.querySelector('#formUsuario');
const formPokemon = document.querySelector('#formPokemon');
const mensajeResultadoUsuario = document.getElementById('resultadoUsuario');
const mensajeResultadoPokemon = document.getElementById('resultadoPokemon');
const mensajeResultadoCaptura = document.getElementById('resultadoCaptura');

// Registrar Usuario
formUsuario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formUsuario);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://3.145.30.157:3007/api/usuario/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            const mensajeError = result.mensaje;
            mensajeResultadoUsuario.style.display = 'block';
            mensajeResultadoUsuario.textContent = `Error en datos: ${mensajeError}`;
            return;
        }

        mensajeResultadoUsuario.style.display = 'block';
        mensajeResultadoUsuario.textContent = '¡Usuario registrado exitosamente!';
        formUsuario.reset();

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        mensajeResultadoUsuario.style.display = 'block';
        mensajeResultadoUsuario.textContent = 'Error al registrar usuario. Inténtalo de nuevo más tarde.';
    }
});

// Registrar Pokémon
formPokemon.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formPokemon);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://3.145.30.157:3007/api/pokemon/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            const mensajeError = result.mensaje;
            mensajeResultadoPokemon.style.display = 'block';
            mensajeResultadoPokemon.textContent = `Error en datos: ${mensajeError}`;
            return;
        }

        mensajeResultadoPokemon.style.display = 'block';
        mensajeResultadoPokemon.textContent = '¡Pokémon registrado exitosamente!';
        formPokemon.reset();

    } catch (error) {
        console.error('Error al registrar Pokémon:', error);
        mensajeResultadoPokemon.style.display = 'block';
        mensajeResultadoPokemon.textContent = 'Error al registrar Pokémon. Inténtalo de nuevo más tarde.';
    }
});

async function capturarPokemon(pokemonId) {
    const cedula = prompt("Introduce tu cédula para capturar el Pokémon:");

    if (!cedula) {
        alert("Debes ingresar tu cédula para capturar el Pokémon.");
        return;
    }

    const data = {
        usuarioCedula: cedula,
        pokemonId: pokemonId
    };

    try {
        const response = await fetch('http://3.145.30.157:3007/api/captura/capturar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            const mensajeError = result.mensaje;
            mensajeResultadoCaptura.style.display = 'block';
            mensajeResultadoCaptura.textContent = `Error en captura: ${mensajeError}`;
            return;
        }

        // Actualizar la tabla de capturas en la interfaz de usuario
        actualizarTablaCapturas();

        mensajeResultadoCaptura.style.display = 'block';
        mensajeResultadoCaptura.textContent = '¡Pokémon capturado exitosamente!';

    } catch (error) {
        console.error('Error al capturar Pokémon:', error);
        mensajeResultadoCaptura.style.display = 'block';
        mensajeResultadoCaptura.textContent = 'Error al capturar Pokémon. Inténtalo de nuevo más tarde.';
    }
}

async function actualizarTablaCapturas() {
    try {
        const response = await fetch('http://3.145.30.157:3007/api/captura/listar');  // Suponiendo que la API devuelva las capturas
        const capturas = await response.json();

        if (!response.ok) {
            throw new Error("Error al obtener las capturas");
        }

        // Limpiar la tabla de capturas
        const tablaCapturas = document.getElementById('tablaCapturas').getElementsByTagName('tbody')[0];
        tablaCapturas.innerHTML = '';

        // Añadir las nuevas filas a la tabla
        capturas.forEach(captura => {
            const fila = tablaCapturas.insertRow();
            fila.insertCell(0).textContent = captura.pokemon.nombre;
            fila.insertCell(1).textContent = captura.pokemon.tipo;
            fila.insertCell(2).textContent = captura.pokemon.poder;
            fila.insertCell(3).textContent = captura.usuario.nombre;
        });

    } catch (error) {
        console.error('Error al actualizar la tabla de capturas:', error);
    }
}
// Elementos del DOM
const tablaPokemon = document.getElementById('tablaPokemon').getElementsByTagName('tbody')[0];
const tablaCapturas = document.getElementById('tablaCapturas').getElementsByTagName('tbody')[0];

// Función para obtener y mostrar Pokémon
async function obtenerPokemones() {
    try {
      const response = await fetch('http://3.145.30.157:3007/api/pokemon/listar');
      const data = await response.json();
  
      if (data.pokemones) {
        const tablaPokemon = document.getElementById('tablaPokemon').getElementsByTagName('tbody')[0];
        tablaPokemon.innerHTML = '';  // Limpiamos la tabla antes de mostrar los nuevos datos
  
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
  
  // Función para obtener y mostrar las capturas
  async function obtenerCapturas() {
    try {
        const response = await fetch('http://3.145.30.157:3007/api/captura/listar');
        const data = await response.json();

        if (data.capturado) {  
            const tablaCapturas = document.getElementById('tablaCapturas').getElementsByTagName('tbody')[0];
            tablaCapturas.innerHTML = '';  // Limpiamos la tabla antes de mostrar los nuevos datos

            // Añadir las filas de las capturas a la tabla
            data.capturado.forEach(captura => {
                const fila = tablaCapturas.insertRow();
                fila.insertCell(0).textContent = `${captura.pokemonId}`;  // Usando pokemonId
                fila.insertCell(1).textContent = `${captura.usuarioCedula}`;  // Usando usuarioCedula
                fila.insertCell(2).textContent = captura.createdAt;  // Fecha de captura
            });
        } else {
            console.log('No se encontraron capturas');
        }
    } catch (error) {
        console.error('Error al obtener las capturas:', error);
    }
}


  //Llamadas iniciales para cargar los Pokémon y las capturas
  obtenerPokemones();
  obtenerCapturas();
  

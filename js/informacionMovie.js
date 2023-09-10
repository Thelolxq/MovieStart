
// JavaScript para mostrar los detalles de la película
// Obtén la ID de la película de la URL
var urlParams = new URLSearchParams(window.location.search);
var movieId = urlParams.get('id');

// Realiza la consulta a la base de datos usando la ID de la película
axios.get('http://localhost:9000/Peliculas/Detalles/' + movieId)
    .then(function (response) {
        var movieData = response.data;
        var movieDetails = document.getElementById('movie-details');

        // Verifica si se recibieron datos válidos
        if (movieData) {
            // Formatear la fecha de Estreno
            var fechaOriginal = movieData.FechaDeEstreno;
            var fecha = new Date(fechaOriginal);
            var anio = fecha.getFullYear();
            var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
            var dia = fecha.getDate().toString().padStart(2, '0');
            var fechaFormateada = anio + '-' + mes + '-' + dia;

            // Crear elementos HTML y mostrar los detalles de la película
            var movieDiv = document.createElement('div');

            movieDiv.innerHTML = `
                    <div class="contenedor">
                        <img class="img-info" src="${movieData.imagen}" alt="${movieData.Nombre}">
                        <div class="datos">
                        <p class="raiting"><strong>Raiting:</strong> ${movieData.Calificacion}<img class="estrella" src="../img/estrella.png" alt="estrella de rating"></p>
                            <h2>${movieData.Nombre}</h2>
                            <p><strong>Director:</strong> ${movieData.Director}</p>
                            <p><strong>Fecha de Estreno:</strong> ${fechaFormateada}</p>
                            <p><strong>Duración:</strong> ${movieData.Duracion}</p>
                            <p><strong>Descripción:</strong> ${movieData.Descripcion}</p>
                            <p><strong>Categoría:</strong> ${movieData.NombreCategoria}</p>
                            <p><strong>Vistas:</strong> ${movieData.Vistas}</p>
                        </div>
                    </div>    
                    <div class="comentario">
                    <p><strong>Comentarios:</strong><br/><br/> ${movieData.Comentarios}</p>
                    </div>    
                    `;

            movieDetails.appendChild(movieDiv);
        } else {
            console.error('No se recibieron datos válidos de la película.');
        }
    })
    .catch(function (error) {
        console.error('Error al obtener datos de la película:', error);
    });
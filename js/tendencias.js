document.addEventListener('DOMContentLoaded', function () {
    // Declarar las variables globales para almacenar las IDs seleccionadas
    var selectedMovieId = null;
    var selectedSerieId = null;

    // Función para mostrar contenido popular
    function mostrarContenidoPopular(url, contenedorId, detalleUrl) {
        axios.get(url)
            .then(function (response) {
                var data = response.data;
                var contenedor = document.getElementById(contenedorId);

                // Verifica si se recibieron datos válidos
                if (Array.isArray(data) && data.length > 0) {
                    // Crea un div contenedor para las imágenes
                    var imagesContainer = document.createElement('div');
                    imagesContainer.className = 'images-container'; // Agrega la clase CSS para el contenedor

                    // Itera sobre los datos de películas o series y crea elementos HTML
                    data.forEach(function (item) {
                        console.log(item.idPelicula);
                        console.log(item.idSerie);
                        var imageElement = document.createElement('img');

                        // Verifica si la propiedad "imagen" está definida en cada objeto
                        if (item.imagen) {
                            // Configura la imagen
                            imageElement.src = item.imagen;
                            imageElement.alt = item.Nombre;

                            // Crea un enlace para ir a la página de detalles
                            var enlace = document.createElement('a');

                            // Verifica si se trata de una película o serie y asigna el ID correspondiente
                            if (contenedorId === 'movie-tendencia') {
                                enlace.href = detalleUrl + '?id=' + item.idPelicula;
                            } else if (contenedorId === 'series-tendencia') {
                                enlace.href = detalleUrl + '?id=' + item.idSerie;
                            }

                            enlace.appendChild(imageElement);

                            // Agrega el enlace al contenedor
                            imagesContainer.appendChild(enlace);

                            // Agrega un evento click para almacenar el ID seleccionado
                            enlace.addEventListener('click', function () {
                                if (contenedorId === 'movie-tendencia') {
                                    selectedMovieId = item.idPelicula; // Almacena el ID de la película seleccionada
                                } else if (contenedorId === 'serie-tendencia') {
                                    selectedSerieId = item.idSerie; // Almacena el ID de la serie seleccionada
                                }
                            });
                        } else {
                            console.error('La propiedad "imagen" no está definida para el elemento:', item.Nombre);
                        }
                    });

                    // Agrega el contenedor de imágenes al contenedor principal
                    contenedor.appendChild(imagesContainer);
                } else {
                    console.error('No se recibieron datos válidos de películas o series.');
                }
            })
            .catch(function (error) {
                console.error('Error al obtener datos de películas o series:', error);
            });
    }

    // Llama a la función para mostrar películas populares
    mostrarContenidoPopular('http://localhost:9000/Peliculas/Tendencias', 'movie-tendencia', '../pages/Informacion.html');

    // Llama a la función para mostrar series populares
    mostrarContenidoPopular('http://localhost:9000/Series/Tendencias', 'series-tendencia', '../pages/InformacionSeries.html');
});

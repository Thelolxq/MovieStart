axios.get('http://localhost:9000/Peliculas')
    .then(function (response) {
        var movieData = response.data;
        var movieDetails = document.getElementById('movie-details');

        // Verifica si se recibieron datos válidos
        if (Array.isArray(movieData) && movieData.length > 0) {
            // Crea un div contenedor para las imágenes
            var imagesContainer = document.createElement('div');
            imagesContainer.className = 'images-container'; 

            movieData.forEach(function (movie) {
                var movieImage = document.createElement('img');

                if (movie.imagen) {
                    // Configura la imagen
                    movieImage.src = movie.imagen;
                    movieImage.alt = movie.idPelicula;

                    var movieLink = document.createElement('a');
                    movieLink.href = '../pages/Informacion.html?id=' + movie.idPelicula;
                    movieLink.appendChild(movieImage);

                    imagesContainer.appendChild(movieLink);

                    movieImage.addEventListener('click', function () {
                        selectedMovieId = movie.idPelicula;
                    });
                } else {
                    console.error('La propiedad "imagen" no está definida para la película con ID:', movie.idPelicula);
                }
            });

            movieDetails.appendChild(imagesContainer);
        } else {
            console.error('No se recibieron datos válidos de películas.');
        }
    })
    .catch(function (error) {
        console.error('Error al obtener datos de la película:', error);
    });

var selectedMovieId = null;

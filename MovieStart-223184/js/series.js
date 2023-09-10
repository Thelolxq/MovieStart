axios.get('http://localhost:9000/Series/')
    .then(function (response) {
        var serieData = response.data;
        var serieDetails = document.getElementById('serie-details');

        if (Array.isArray(serieData) && serieData.length > 0) {
            var imagesContainer = document.createElement('div');
            imagesContainer.className = 'images-container';

            // Itera sobre los datos de las películas y crea elementos HTML
            serieData.forEach(function (serie) {
                var serieImage = document.createElement('img');

                // Verifica si la propiedad "imagen" está definida en cada objeto
                if (serie.imagen) {
                    // Configura la imagen
                    serieImage.src = serie.imagen;
                    serieImage.alt = serie.idSerie; // Usa el ID de la película como alt

                    // Crea un enlace para ir a la página de detalles de la película
                    var serieLink = document.createElement('a');
                    serieLink.href = '../pages/InformacionSeries.html?id=' + serie.idSerie; // Pasa el ID de la película como parámetro
                    serieLink.appendChild(serieImage);

                    // Agrega el enlace al contenedor
                    imagesContainer.appendChild(serieLink);
                } else {
                    console.error('La propiedad "imagen" no está definida para la película con ID:', serie.idSerie);
                }
            });

            // Agrega el contenedor de imágenes al contenedor principal "movie-details"
            serieDetails.appendChild(imagesContainer);
        } else {
            console.error('No se recibieron datos válidos de películas.');
        }
    })
    .catch(function (error) {
        console.error('Error al obtener datos de la película:', error);
    });

var selectedSerieId = null; // Variable global para almacenar la ID de la película seleccionada

// Cuando el usuario hace clic en una película
serieImage.addEventListener('click', function () {
    selectedSerieId = serie.idSerie; // Almacena la ID de la película seleccionada
});

// JavaScript para mostrar los detalles de la serie
// Obtén la ID de la serie de la URL
var urlParams = new URLSearchParams(window.location.search);
var serieId = urlParams.get('id');

axios.get('http://localhost:9000/Series/Detalles/' + serieId)
    .then(function (response) {
        var serieData = response.data;
        var serieDetails = document.getElementById('serie-details');

        // Verifica si se recibieron datos válidos
        if (serieData) {
            // Formatear la fecha de Estreno
            var fechaOriginal = serieData.FechaDeEstreno;
            var fecha = new Date(fechaOriginal);
            var anio = fecha.getFullYear();
            var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
            var dia = fecha.getDate().toString().padStart(2, '0');
            var fechaFormateada = anio + '-' + mes + '-' + dia;

            var serieDiv = document.createElement('div');

            serieDiv.innerHTML = `
            <div class="contenedor">
                <img src="${serieData.imagen}" alt="${serieData.Nombre}">
                <div class="datos">
                <p class="raiting"><strong>Rating:</strong> ${serieData.Calificacion}<img class="estrella" src="../img/estrella.png" alt="estrella de rating"></p>
                    <h2>${serieData.Nombre}</h2>
                    <p><strong>Director:</strong> ${serieData.Director}</p>
                    <p><strong>Fecha de Estreno:</strong> ${fechaFormateada}</p>
                    <p><strong>Descripción:</strong><br/><br/> ${serieData.Descripcion}</p>
                    <p><strong>Vistas:</strong> ${serieData.Vistas}</p>
                    <p><strong>Categoría:</strong> ${serieData.NombreCategoria}</p>
                </div> 
           </div>
            <div class="comentario">
                <p><strong>Temporada:</strong> ${serieData.Temporada}</p>
                <p><strong>Capitulos:</strong> ${serieData.Capitulos}</p>
            </div>
            `;

            serieDetails.appendChild(serieDiv);
        } else {
            console.error('No se recibieron datos válidos de la serie.');
        }
    })
    .catch(function (error) {
        console.error('Error al obtener datos de la serie:', error);
    });

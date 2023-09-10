function obtenerDatos(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            callback(data);
        }
    };
    xhr.send();
}

obtenerDatos('http://localhost:9000/Series/Top', function(seriesData) {
    obtenerDatos('http://localhost:9000/Peliculas/Top', function(peliculasData) {
        var data = seriesData.concat(peliculasData);

        const nombres = data.map(item => item.Nombre);
        const calificaciones = data.map(item => parseFloat(item.Calificacion));

        const canvas = document.getElementById('graficaCalificaciones');
        const ctx = canvas.getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nombres, 
                datasets: [{
                    label: 'Calificación',
                    data: calificaciones, 
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    borderColor: 'rgba(255, 0,0, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5.0 
                    }
                }
            }
        });
    });
});
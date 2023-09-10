
/*estilizacion del navbar*/
window.addEventListener('scroll', function() {
    var navbar = document.getElementById('header');

    if (window.scrollY > 90) { // Cambia 100 por la cantidad de desplazamiento que desees
        navbar.style.backgroundColor = 'rgb(31,31,32)'; // Cambia 'tu-nuevo-color' al color deseado
    } else {
        navbar.style.backgroundColor = 'transparent'; // Vuelve al color transparente inicial
    }
});
/*slider*/


axios.get("http://localhost:9000/Peliculas")
  .then((response) => {
    const peliculas = response.data

    const divPadre = document.querySelector(".slider")

    peliculas.forEach((pelicula) => {
      const image = document.createElement("img")
      const a =document.createElement("a")
      const divcont=document.createElement("div")
      divcont.classList.add("divCont")

      if(pelicula.imagen){

      
      a.appendChild(image)
      a.href = '../pages/Informacion.html?id=' + pelicula.idPelicula;
      image.classList.add("imagen")
      image.src = pelicula.imagen
      divcont.appendChild(a)
      divPadre.appendChild(divcont)
      }else{
        console.error("error en encontrar imagen")
      }
    })
  })
  .catch((error) => {
    console.error("Error al obtener los datos de la tabla Peliculas:", error)
  })


const express = require('express')
const routesPelicula = express.Router()

routesPelicula.get('/', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const query = `
    SELECT imagen,idPelicula
      FROM peliculas
    `;
    conn.query(query, (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});

routesPelicula.get('/Populares', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const query = `
    SELECT idPelicula,Nombre, Vistas, imagen
    FROM peliculas
    ORDER BY Vistas DESC
    LIMIT 5;
    `;
    conn.query(query, (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});

routesPelicula.get('/Tendencias',(req,res)=>{
  req.getConnection((err,conn)=>{
    if (err) return res.send(err);
    const query ='SELECT Nombre, Calificacion,idPelicula,imagen FROM peliculas ORDER BY Calificacion DESC LIMIT 5;';
    conn.query(query,(err,rows)=>{
      if(err) return res.send(err);
        res.json(rows)
    });
  });
});

routesPelicula.get('/Top',(req,res)=>{
  req.getConnection((err,conn)=>{
    if (err) return res.send(err);
    const query ='SELECT Nombre, Calificacion FROM peliculas ORDER BY Calificacion DESC LIMIT 2;';
    conn.query(query,(err,rows)=>{
      if(err) return res.send(err);
        res.json(rows)
    });
  });
});

routesPelicula.get('/Recientes',(req,res)=>{
  req.getConnection((err,conn)=>{
    if (err) return res.send(err);
    const query ='SELECT idPelicula,Nombre,FechaDeEstreno,imagen FROM peliculas ORDER BY FechaDeEstreno DESC LIMIT 5;';
    conn.query(query,(err,rows)=>{
      if(err) return res.send(err);
        res.json(rows)
    });
  });
});


  routesPelicula.get('/Detalles/:id', (req, res) => {
    const peliculaId = req.params.id; // Obtener el ID de la película desde los parámetros de la URL
  
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      // Consulta para obtener los detalles de la película por su ID
      const query = 'SELECT Nombre, Director, FechaDeEstreno, Duracion, Descripcion, Vistas, Comentarios, categorias.NombreCategoria, Calificacion, imagen FROM peliculas INNER JOIN categorias ON peliculas.idCategoria = categorias.idCategoria WHERE peliculas.idPelicula = ?';
  
      conn.query(query, [peliculaId], (err, rows) => {
        if (err) return res.send(err);
  
        // Verificar si se encontraron detalles de la película
        if (rows.length === 0) {
          return res.status(404).json({ mensaje: 'Detalles de la película no encontrados para la película con ID ' + peliculaId });
        }
  
        // Devolver los detalles de la película en formato JSON
        res.json(rows[0]); // Suponiendo que solo se espera una fila de resultados
      });
    });
  });
  

module.exports = routesPelicula;
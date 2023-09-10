const express = require('express')
const routesSeries = express.Router()

routesSeries.get('/', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const query = `
    SELECT imagen,idSerie
      FROM series
    `;
    conn.query(query, (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});


routesSeries.get('/Populares', (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      const query = `
      SELECT Nombre, Vistas, imagen,idSerie
        FROM series
        ORDER BY Vistas DESC
        LIMIT 5;
      `;
      conn.query(query, (err, rows) => {
        if (err) return res.send(err);
  
        res.json(rows);
      });
    });
  });
  
  routesSeries.get('/Tendencias',(req,res)=>{
    req.getConnection((err,conn)=>{
      if (err) return res.send(err);
      const query ='SELECT Nombre, Calificacion, idSerie, imagen FROM series ORDER BY Calificacion DESC LIMIT 5;';
      conn.query(query,(err,rows)=>{
        if(err) return res.send(err);
          res.json(rows)
      });
    });
  });

  routesSeries.get('/Top',(req,res)=>{
    req.getConnection((err,conn)=>{
      if (err) return res.send(err);
      const query ='SELECT Nombre, Calificacion FROM series ORDER BY Calificacion DESC LIMIT 2;';
      conn.query(query,(err,rows)=>{
        if(err) return res.send(err);
          res.json(rows)
      });
    });
  });


  routesSeries.get('/Recientes',(req,res)=>{
    req.getConnection((err,conn)=>{
      if (err) return res.send(err);
      const query ='SELECT Nombre,FechaDeEstreno,imagen,idSerie FROM series ORDER BY FechaDeEstreno DESC LIMIT 5;';
      conn.query(query,(err,rows)=>{
        if(err) return res.send(err);
          res.json(rows)
      });
    });
  });
  

    
  routesSeries.get('/Detalles/:id', (req, res) => {
    const serieId = req.params.id; // Obtener el ID de la serie desde los parámetros de la URL
  
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      // Consulta para obtener los detalles de la serie por su ID
      const query = 'SELECT Nombre, Director, Temporada, Capitulos, Descripcion, categorias.NombreCategoria, Vistas, FechaDeEstreno, Calificacion, imagen FROM series INNER JOIN categorias ON series.idCategoria = categorias.idCategoria WHERE series.idSerie = ?';
  
      conn.query(query, [serieId], (err, rows) => {
        if (err) return res.send(err);
  
        // Verificar si se encontraron detalles de la serie
        if (rows.length === 0) {
          return res.status(404).json({ mensaje: 'Detalles de la serie no encontrados para la serie con ID ' + serieId });
        }
  
        // Devolver los detalles de la serie en formato JSON
        res.json(rows[0]); // Suponiendo que solo se espera una fila de resultados
      });
    });
  });
  
  
  

module.exports = routesSeries;
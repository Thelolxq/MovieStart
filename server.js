const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const myconn = require('express-myconnection');
const routesSeries = require('./routes/routesSeries');
const routesPelicula = require('./routes/routesPelicula');
const app = express();

app.set('port', process.env.PORT || 9000);

const dbOptions = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'danigomez123',
  database: 'pro-web',
  authPlugin: 'mysql_native_password'
};

// Configurar la conexión a la base de datos con express-myconnection
app.use(myconn(mysql, dbOptions, 'single'));

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

app.use('/Series', routesSeries);
app.use('/Peliculas', routesPelicula);


// Servidor corriendo
app.listen(app.get('port'), () => {
  console.log('Servidor corriendo en el puerto', app.get('port'));
});

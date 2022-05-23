const { response } = require('express');
const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./db/config');
const cors = require('cors');

//Crear servidor express
const app = express();

//base de datos
dbConnection();

//Cors
app.use(cors());

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas de los modulos
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/perfil', require('./routes/perfil'));
app.use('/api/atraccion', require('./routes/atraccion'));
app.use('/api/categoria', require('./routes/categoria'));
app.use('/api/pais', require('./routes/pais'));
app.use('/api/estado', require('./routes/estado'));

//Peticiones
app.listen(process.env.PORT, () => { 
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

//Deploy Heroku
// https://app-backend-travel.herokuapp.com/
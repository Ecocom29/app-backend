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
app.use('/api/usuario', require('./routes/usuario'));
//app.use('/api/usuario', require('./routes/_usuario'));
app.use('/api/evento', require('./routes/evento'));
app.use('/api/perfil', require('./routes/perfil'));
app.use('/api/atraccion', require('./routes/atraccion'));
app.use('/api/categoria', require('./routes/categoria'));
app.use('/api/pais', require('./routes/pais'));
app.use('/api/estado', require('./routes/estado'));
app.use('/api/noticia', require('./routes/noticia'));
app.use('/api/evaluacion', require('./routes/evaluacion'));
app.use('/api/tipoUsuario', require('./routes/tipoUsuario'));

//Peticiones
const PORT_LOCAL = 4000;
app.listen(process.env.PORT || PORT_LOCAL, () => { 
    console.log(`Servidor corriendo en el puerto ${process.env.PORT || PORT_LOCAL}`);
});

//Deploy Heroku
// https://app-backend-travel.herokuapp.com/
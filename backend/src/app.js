const express = require('express');
const morgan = require('morgan');
const cors=require('cors')
const app= express();

//variables de entorno
app.set('port',process.env.PORT || 3000); 

//middlewares
app.use(morgan('dev'));
app.use(express.json()); //para entender el formato json (seria el bodyparser)
app.use(express.urlencoded({extended: false})); //para q pueda entender los datos q vengan de un html
app.use(cors())
//Rutas
app.use('/api/productos',require('./routes/productos.routes'));

module.exports= app;
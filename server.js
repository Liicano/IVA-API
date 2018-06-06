var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Documento = require('./api/models/documentoModel'), //Modelos creados
  Usuario = require('./api/models/usuarioModel'),
  jsonwebtoken = require("jsonwebtoken"),
  bodyParser = require('body-parser');
//PASSPORT
var passport = require('passport');
  
// CONEXION A LA BBDD DE MONGO
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ImpresionesBD'); 

// Passport - SESIONES -
app.use(passport.initialize());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CABEZERAS PARA LAS PETICIONES
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header   ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



var routes = require('./api/routes/routes'); //RUTAS CREADAS
routes(app); //register the route


app.listen(port);

//PRUEBA DE CAMMBIO EN GIT

console.log('API CORRIENDO EN EL PUERTO -> ' + port);

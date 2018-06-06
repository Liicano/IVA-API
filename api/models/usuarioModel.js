'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//MODELO USUARIO
var UsuarioSchema = new Schema({
  cedula: {type: String, required: 'Es necesario ingresar la cedula de identidad'},
  password: {type: String}, 
  nombre: {type: String},
  apellido: {type: String},
  correo: {type: String},
  nivel: {type: String},
  id_maquina: {type: String},
   reglas:[{
        max_impresiones: {type: String},
        intervalo_impresiones: {type: String},
        habilitado: {type: String, default: 'true'},
  }]
});


UsuarioSchema.methods.verifyPassword = function(password, cb) {
  var isMatch = false;
  if (password == this.password) isMatch = true;
    cb(null, isMatch);
};  



module.exports = mongoose.model('Usuarios', UsuarioSchema);

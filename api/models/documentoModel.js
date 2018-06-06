'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//MODELO DOCUMENTO
var DocumentoSchema = new Schema({
  codigo: {type: String},
  nombre: {type: String},
  fecha_envio: {type: Date, default: new Date()},
  tipo_documento: {type: String},
  estado: {type: String},
  cola: {type: String, default: 'true'},
  usuario_emisor:[{
      cedula: {type: String},
      nombre: {type: String},
      apellido: {type: String},
      id_maquina: {type: String},
      max_impresiones: {type: String},
      restringido: {type: String}
  }]
});

module.exports = mongoose.model('Documento', DocumentoSchema);

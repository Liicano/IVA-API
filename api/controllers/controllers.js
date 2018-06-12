  'use strict';

const nodemailer = require('nodemailer');


var mongoose = require('mongoose'),
Usuarios = mongoose.model('Usuarios');

//----------------------------------
//CONTROLADOR GENERAL
//----------------------------------
exports.index = function(req, res) {
  res.send("Bienvenido a la API del sistema de PARSING IVA-VENTAS");
};

//----------------------------------
//CONTROLADORES PARA - USUARIOS -
//----------------------------------

//VER USUARIOS
exports.Ver_Usuarios = function(req, res) {
  Usuarios.find({}, function(err, usuarios) {
    if (err)
      res.send(err);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(usuarios);

  });
};

//INGRESAR NUEVO USUARIO
exports.Ingresar_Usuario = function(req, res) {
  var Nuevo_Usuario = new Usuarios(req.body);
  Nuevo_Usuario.save(function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);
  });
};

//ENCONTRAR USUARIO POR CEDULA
exports.Ver_Usuario = function(req, res) {
  Usuarios.findOne({ 'cedula': req.params.cedula }, function (err, usuario) {
  if (err) 
    res.send(err);
  res.json(usuario);
})
};


//ENCONTRAR USUARIO POR EMAIL
exports.findByEmail = function(req, res) {
  console.log(req.params.email);
  Usuarios.findOne({ 'correo': req.params.email }, function (err, usuario) {
  if (err) 
    res.send(err);
  res.json(usuario);
})
};



//ENCONTRAR USUARIO POR CEDULA PARA CHECK DE LOGIN
exports.CheckLogin = function(req, res) {
var password = req.body.password;
var Check = false;
  Usuarios.findOne({ 'documento_identidad': req.body.cedula }, function (err, usuario) {
  if (err) 
    res.send(err);
  if (usuario && usuario.password == password){Check = true;}
res.json({
  usuario:usuario,
  Check:Check
});
})
};




//MODIFICAR UN USUARIO
exports.Modificar_Usuario = function(req, res) {
  console.log("Modificar usuario req.body -> ",req.body);
  Usuarios.findOneAndUpdate({cedula: req.params.cedula}, req.body, {new: true}, function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);
  });
};


//ELIMINAR UN USUARIO
exports.Eliminar_Usuario = function(req, res) {
Usuarios.remove({
    cedula: req.params.cedula
  }, function(err, usuario) {
    if (err)
      res.send(err);
    res.json({ message: 'Usuario eliminado con exito' });
  });
};

//ELIMINAR POR ID
exports.Eliminar_Usuario_id = function(req, res) {
Usuarios.remove({
    _id: req.params.id
  }, function(err, usuario) {
    if (err)
      res.send(err);
    res.json({ message: 'Usuario eliminado con exito mediante ID' });
  });
};



//ENVIAR EMAIL DE RECUPERACION DE USUARIO
exports.sendEmail = function(req, res) {
 console.log(req.params.email);
 console.log(req.params.password);

 let transporter = nodemailer.createTransport({
              pool:true,
              host: 'smtp.gmail.com',
              port: 465,
              secure: true, // secure:true for port 465, secure:false for port 587
              auth: {
                  user: 'angieurechelopez@gmail.com',
                  pass: 'SophiE*.*'
              },
              tls: {
                  rejectUnauthorized: false
              }
              
          });

          // setup email data with unicode symbols
          let mailOptions = {
              from: '"Impresiones SISTEM 👻" <ImpreSistem@gmail.com>', // sender address
              to: req.params.email, // list of receivers
              subject: 'Recuperacion de contraseña', // Subject line
              text: '', // plain text body
              html: '<br>Su peticion ha sido procesada, Su contraseña es (<i>'+req.params.password+'</i>)</br>'
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message %s sent: %s', info.messageId, info.response);
              res.send("¡Correo enviado con exito!");
          });


};


//----------------------------------
//CONTROLADORES PARA - DOCUMENTO -
//----------------------------------

exports.documentProcesar = function(req, res) {
  var Documento = req.body;
  console.log(req.file);
};
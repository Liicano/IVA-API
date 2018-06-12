'use strict';
var authController = require('../middlewares/passport');
module.exports = function(app) {
var controller = require('../controllers/controllers');

//----------------------------------
//RUTA GENERAL
//----------------------------------
app.route('/').get(controller.index);

app.route('/login').post(controller.CheckLogin);

//----------------------------------
//RUTAS PARA - USUARIOS -
//----------------------------------
  
    app.route('/usuarios')
      .get(/*authController.isAuthenticated,*/ controller.Ver_Usuarios)
      .post(/*authController.isAuthenticated,*/ controller.Ingresar_Usuario);

      //findByEmail
    app.route('/usuarioEmail/:email')
      .get(controller.findByEmail);

    app.route('/usuario/:cedula')
      .get(/*authController.isAuthenticated,*/ controller.Ver_Usuario)
      .put(/*authController.isAuthenticated,*/ controller.Modificar_Usuario)
      .delete(/*authController.isAuthenticated,*/ controller.Eliminar_Usuario);

       app.route('/usuarioID/:id')
       .delete(/*authController.isAuthenticated,*/ controller.Eliminar_Usuario_id);

       //ENVIAR EMAIL DE RECUPERACION
      app.route('/recover/:email/:password')
      .post(controller.sendEmail);



//----------------------------------
//RUTAS PARA - PARSING DE DOCUMENTO -
//----------------------------------


 //RECIBIR DOCUMENTO - EXCEL -
      app.route('/documento/procesar')
      .post(controller.documentProcesar);




};

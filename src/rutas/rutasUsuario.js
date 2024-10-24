const { Router } = require('express');
const { body, query } = require('express-validator');
const modeloCargo = require('../modelos/cargo');
const controladorUsuario = require('../controladores/controladorUsuario');
const ruta = Router();
/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionas con los usuarios
 */

ruta.post('/recuperar', controladorUsuario.generarPin);
ruta.post('/contrasena', controladorUsuario.actualizarContrasena);

    
module.exports = ruta;
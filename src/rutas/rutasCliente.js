const { Router } = require('express');
const { body, query } = require('express-validator');
const modelocliente = require('../modelos/cliente'); 
const controladorCliente = require('../controladores/controladorCliente'); 
const ruta = Router();

ruta.get('/', controladorCliente.inicio);

ruta.get('/listar', controladorCliente.listar);

ruta.post('/guardar', 
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage("El limite de caracteres es de 3 - 50"),
    body("segundonombre").optional().isLength({ min: 0, max: 50 }).withMessage("El limite de caracteres es de 0 - 50"),
    body("primerapellido").isLength({ min: 3, max: 50 }).withMessage("El limite de caracteres es de 3 - 50"),
    body("segundoapellido").optional().isLength({ min: 0, max: 50 }).withMessage("El limite de caracteres es de 0 - 50"),
    body("identidad").isLength({ min: 5, max: 20 }).withMessage("El límite de caracteres para la identidad es de 5 - 20")
    .custom(async value => {
        if (!value) {
            throw new Error('La identidad no permite nulos');
        } else {
            const buscarcliente = await modelocliente.findOne({
                where: { identidad: value }
            });
            if (buscarcliente) {
                throw new Error('La identidad ya está registrada');
            }
        }
    }),
    controladorCliente.guardar
);

ruta.put('/editar', 
    query("id").isInt().withMessage('Solo se permiten valores enteros en el id')
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite nulos');
        } else {
            const buscarcliente = await modelocliente.findOne({
                where: { id: value }
            });
            if (!buscarcliente) {
                throw new Error('El id del cliente no existe');
            }
        }
    }),
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage("El limite de caracteres es de 3 - 50"),
    body("segundonombre").optional().isLength({ min: 0, max: 50 }).withMessage("El limite de caracteres es de 0 - 50"),
    body("primerapellido").isLength({ min: 3, max: 50 }).withMessage("El limite de caracteres es de 3 - 50"),
    body("segundoapellido").optional().isLength({ min: 0, max: 50 }).withMessage("El limite de caracteres es de 0 - 50"),
    body("identidad").isLength({ min: 5, max: 20 }).withMessage("El límite de caracteres para la identidad es de 5 - 20")
    .custom(async value => {
        if (!value) {
            throw new Error('La identidad no permite nulos');
        } else {
            const buscarcliente = await modelocliente.findOne({
                where: { identidad: value }
            });
            if (buscarcliente) {
                throw new Error('La identidad ya está registrada');
            }
        }
    }),
    controladorCliente.modificar
);

ruta.delete('/eliminar', 
    query("id").isInt().withMessage('Solo se permiten valores enteros en el id')
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite nulos');
        } else {
            const buscarcliente = await modelocliente.findOne({
                where: { id: value }
            });
            if (!buscarcliente) {
                throw new Error('El id del cliente no existe');
            }
        }
    }),
    controladorCliente.eliminar
);

module.exports = ruta;
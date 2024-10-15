const { Router } = require('express');
const { body, query } = require('express-validator');
const modeloempleado = require('../modelos/empleados'); 
const controladorempleado = require('../controladores/controladorEmpleado'); 
const ruta = Router();

ruta.get('/', controladorempleado.inicio);

ruta.get('/listar', controladorempleado.listar);

ruta.post('/guardar', 
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage("El límite de caracteres es de 3 - 50"),
    body("segundonombre").optional().isLength({ min: 0, max: 50 }).withMessage("El límite de caracteres es de 0 - 50"),
    body("primerapellido").isLength({ min: 3, max: 50 }).withMessage("El límite de caracteres es de 3 - 50"),
    body("segundoapellido").optional().isLength({ min: 0, max: 50 }).withMessage("El límite de caracteres es de 0 - 50"),
    body("identidad").isLength({ min: 5, max: 20 }).withMessage("El límite de caracteres para la identidad es de 5 - 20")
    .custom(async value => {
        if (!value) {
            throw new Error('La identidad no permite nulos');
        } else {
            const buscarempleado = await modeloempleado.findOne({
                where: { identidad: value }
            });
            if (buscarempleado) {
                throw new Error('La identidad ya está registrada');
            }
        }
    }),
    body("sueldo").isFloat({ min: 0 }).withMessage("El sueldo debe ser un número mayor o igual a 0"),
    body("estado").isIn(['AC', 'IN', 'BL']).withMessage("El estado debe ser 'AC', 'IN' o 'BL'"),
    body("cargoId").isInt().withMessage('El ID del cargo debe ser un número entero'),
    controladorempleado.guardar
);

ruta.put('/editar', 
    query("id").isInt().withMessage('Solo se permiten valores enteros en el id')
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite nulos');
        } else {
            const buscarempleado = await modeloempleado.findOne({
                where: { id: value }
            });
            if (!buscarempleado) {
                throw new Error('El id del empleado no existe');
            }
        }
    }),
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage("El límite de caracteres es de 3 - 50"),
    body("segundonombre").optional().isLength({ min: 0, max: 50 }).withMessage("El límite de caracteres es de 0 - 50"),
    body("primerapellido").isLength({ min: 3, max: 50 }).withMessage("El límite de caracteres es de 3 - 50"),
    body("segundoapellido").optional().isLength({ min: 0, max: 50 }).withMessage("El límite de caracteres es de 0 - 50"),
    body("identidad").isLength({ min: 5, max: 20 }).withMessage("El límite de caracteres para la identidad es de 5 - 20")
    .custom(async value => {
        if (!value) {
            throw new Error('La identidad no permite nulos');
        } else {
            const buscarempleado = await modeloempleado.findOne({
                where: { identidad: value }
            });
            if (buscarempleado) {
                throw new Error('La identidad ya está registrada');
            }
        }
    }),
    body("sueldo").isFloat({ min: 0 }).withMessage("El sueldo debe ser un número mayor o igual a 0"),
    body("estado").isIn(['AC', 'IN', 'BL']).withMessage("El estado debe ser 'AC', 'IN' o 'BL'"),
    body("cargoId").isInt().withMessage('El ID del cargo debe ser un número entero'),
    controladorempleado.modificar
);

ruta.delete('/eliminar', 
    query("id").isInt().withMessage('Solo se permiten valores enteros en el id')
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite nulos');
        } else {
            const buscarempleado = await modeloempleado.findOne({
                where: { id: value }
            });
            if (!buscarempleado) {
                throw new Error('El id del empleado no existe');
            }
        }
    }),
    controladorempleado.eliminar
);

module.exports = ruta;
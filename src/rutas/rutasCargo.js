const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCargo = require('../controladores/controladorCargo');
const modeloCargo = require('../modelos/cargo');
const ruta = Router();

// Ruta de inicio
ruta.get('/', controladorCargo.inicio);

// Listar cargos
ruta.get('/listar', controladorCargo.listar);

// Guardar cargo
ruta.post('/guardar',

    // Validación del nombre
    body("nombre").isLength({ min: 3, max: 50 }).withMessage("El límite de caracteres es de 3 a 50")
        .custom(async value => {
            if (!value) {
                throw new Error("El nombre no permite nulos");
            } else {
                const buscarcargo = await modeloCargo.findOne({
                    where: { nombre: value }
                });
                if (buscarcargo) {
                    throw new Error("El nombre del cargo ya existe");
                }
            }
        }),

    controladorCargo.guardar
);

// Editar cargo
ruta.put('/editar',
    query("id").isInt().withMessage('Solo de permiten valores enteros en el id')
        .custom(async value => {
            if (!value) {
                throw new Error('El id no permite nulos')
            }
            else {
                const buscarcargo = await modeloCargo.findOne({
                    where: { id: value }
                });
                if (!buscarcargo) {
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
    body("nombre").optional().isLength({ min: 3, max: 50 }).withMessage("El limite de caracteres es de 3 - 50")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite nulos')
            }
            else {
                const buscarcargo = await modeloCargo.findOne({
                    where: { nombre: value }
                });
                console.log(buscarcargo);
                if (buscarcargo) {
                    throw new Error('El nombre del cargo ya existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo permite valores boleanos"),
    controladorCargo.modificar);



ruta.delete('/eliminar',
    query("id").isInt().withMessage('Solo de permiten valores enteros en el id')
        .custom(async value => {
            if (!value) {
                throw new Error('El id no permite nulos')
            }
            else {
                const buscarcargo = await modeloCargo.findOne({
                    where: { id: value }
                });
                if (!buscarcargo) {
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
    controladorCargo.eliminar);

module.exports = ruta;


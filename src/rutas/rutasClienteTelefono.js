const { Router } = require('express');
const { body, query } = require('express-validator');
const modeloClienteTelefono = require('../modelos/clienteTelefono');
const modeloCliente = require('../modelos/cliente')
const controladorClienteTelefono = require('../controladores/controladorClienteTelefono');
const ruta = Router();

ruta.get('/', controladorClienteTelefono.inicio);
ruta.get('/listar', controladorClienteTelefono.listar);
ruta.post('/guardar',
    body("telefono")
        .isLength({ min: 7, max: 15 })
        .withMessage("El número de teléfono debe tener entre 7 y 15 caracteres")
        .custom(async value => {
            if (!value) {
                throw new Error('El número de teléfono no permite nulos');
            } else {
                const buscarTelefono = await modeloClienteTelefono.findOne({
                    where: { telefono: value }
                });
                if (buscarTelefono) {
                    throw new Error('El número de teléfono ya existe');
                }
            }
        }),
    body("clienteId")
        .isInt().withMessage("El clienteId debe ser un valor entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El clienteId no permite nulos');
            } else {
                const buscarCliente = await modeloCliente.findOne({
                    where: { id: value }
                });
                if (!buscarCliente) {
                    throw new Error('El clienteId proporcionado no existe');
                }
            }
        }),
    controladorClienteTelefono.guardar
);

ruta.put('/editar',
    query("id")
        .isInt().withMessage('El id debe ser un valor entero')
        .custom(async value => {
            if (!value) {
                throw new Error('El id no permite nulos');
            } else {
                const buscarTelefono = await modeloClienteTelefono.findOne({
                    where: { id: value }
                });
                if (!buscarTelefono) {
                    throw new Error('El id del teléfono no existe');
                }
            }
        }),
    body("telefono")
        .isLength({ min: 7, max: 15 })
        .withMessage("El número de teléfono debe tener entre 7 y 15 caracteres")
        .custom(async value => {
            if (!value) {
                throw new Error('El número de teléfono no permite nulos');
            } else {
                const buscarTelefono = await modeloClienteTelefono.findOne({
                    where: { telefono: value }
                });
                if (buscarTelefono) {
                    throw new Error('El número de teléfono ya existe');
                }
            }
        }),
    body("clienteId")
        .isInt().withMessage("El clienteId debe ser un valor entero")
        .custom(async value => {
            if (value) {
                const buscarCliente = await modeloCliente.findOne({
                    where: { id: value }
                });
                if (!buscarCliente) {
                    throw new Error('El clienteId proporcionado no existe');
                }
            }
        })
        .optional(),
    controladorClienteTelefono.modificar
);

ruta.delete('/eliminar',
    query("id")
        .isInt().withMessage('El id debe ser un valor entero')
        .custom(async value => {
            if (!value) {
                throw new Error('El id no permite nulos');
            } else {
                const buscarTelefono = await modeloClienteTelefono.findOne({
                    where: { id: value }
                });
                if (!buscarTelefono) {
                    throw new Error('El id del teléfono no existe');
                }
            }
        }),
    controladorClienteTelefono.eliminar
);

module.exports = ruta;
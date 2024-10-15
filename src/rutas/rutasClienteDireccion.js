const { Router } = require('express');
const { body, query } = require('express-validator');
const modeloclientedireccion = require('../modelos/ubicacion/clienteDireccion');
const controladorclientedireccion = require('../controladores/controladorClienteDireccion');
const ruta = Router();


ruta.get('/', controladorclientedireccion.inicio);
ruta.get('/listar', controladorclientedireccion.listar);

ruta.post('/guardar',
    body("descripcion").isLength({ min: 3, max: 255 }).withMessage("El límite de caracteres es de 3 - 255"),
    body("clienteId").isInt().withMessage("El clienteId debe ser un valor entero"),
    body("barrioId").isInt().withMessage("El barrioId debe ser un valor entero"),
    controladorclientedireccion.guardar
);

ruta.put('/editar',
    query("id").isInt().withMessage('El id debe ser un valor entero')
        .custom(async value => {
            if (!value) {
                throw new Error('El id no puede ser nulo');
            }
            const buscarclientedireccion = await modeloclientedireccion.findOne({
                where: { id: value }
            });
            if (!buscarclientedireccion) {
                throw new Error('El id de la direccion no existe');
            }
        }),
    body("descripcion").isLength({ min: 3, max: 255 }).withMessage("El límite de caracteres es de 3 - 255"),
    body("clienteId").isInt().withMessage("El clienteId debe ser un valor entero"),
    body("barrioId").isInt().withMessage("El barrioId debe ser un valor entero"),
    controladorclientedireccion.modificar
);

ruta.delete('/eliminar',
    query("id").isInt().withMessage('El id debe ser un valor entero')
        .custom(async value => {
            if (!value) {
                throw new Error('El id no puede ser nulo');
            }
            const buscarclientedireccion = await modeloclientedireccion.findOne({
                where: { id: value }
            });
            if (!buscarclientedireccion) {
                throw new Error('El id de la direccion no existe');
            }
        }),
    controladorclientedireccion.eliminar
);

module.exports = ruta;
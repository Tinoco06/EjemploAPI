const { Router } = require('express');
const ruta = Router();
const { body, query } = require('express-validator');
const controladorBarrio = require('../controladores/controladorBarrio');
const modeloBarrio = require('../modelos/ubicacion/barrio');
const modeloCiudad = require('../modelos/ubicacion/ciudad');
ruta.get('/', controladorBarrio.inicio);
ruta.get('/listar',controladorBarrio.listar);
ruta.post('/guardar',
    body("nombre").isLength({min: 3, max:50}).withMessage("El limite de caracteres es de 3 - 50"),
    body("ciudadId").isInt().withMessage("El id del municipio debe ser un numero entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El id no permite nulos')
        }
        else{
            const buscarmunicipio = await modeloCiudad.findOne({
                where: {id: value}
            });
            if(!buscarmunicipio){
                throw new Error('El id de la ciudad no existe');
            }
        }
    }),
    controladorBarrio.guardar
);

ruta.put('/editar', 
    query("id").isInt().withMessage('Solo de permiten valores enteros en el id')
    .custom(async value =>{
        if(!value){
            throw new Error('El id no permite nulos')
        }
        else{
            const buscarmunicipio = await modeloBarrio.findOne({
                where: {id: value}
            });
            if(!buscarmunicipio){
                throw new Error('El id del municipio no existe');
            }
        }
    }),
    body("nombre").optional().isLength({min: 3, max:50}).withMessage("El limite de caracteres es de 3 - 50"),
    body("ciudadId").optional().isInt().withMessage("El id del barrio debe ser un numero entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El id no permite nulos')
        }
        else{
            const buscarmunicipio = await modeloBarrio.findOne({
                where: {id: value}
            });
            if(!buscarmunicipio){
                throw new Error('El id del barrio no existe');
            }
        }
    }),
    controladorBarrio.modificar);
    
ruta.delete('/eliminar', 
    query("id").isInt().withMessage('Solo de permiten valores enteros en el id')
    .custom(async value =>{
        if(!value){
            throw new Error('El id no permite nulos')
        }
        else{
            const buscarmunicipio = await modeloBarrio.findOne({
                where: {id: value}
            });
            if(!buscarmunicipio){
                throw new Error('El id del municipio no existe');
            }
        }
    }),
    controladorBarrio.eliminar);

module.exports = ruta;
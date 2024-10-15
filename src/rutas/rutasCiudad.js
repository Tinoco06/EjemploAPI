const { Router } = require('express');
const ruta = Router();
const { body, query } = require('express-validator');
const controladorCiudad = require('../controladores/controladorCiudad');
const modeloCiudad = require('../modelos/ubicacion/ciudad');
const modeloMunicipio = require('../modelos/ubicacion/municipio');
ruta.get('/', controladorCiudad.inicio);
ruta.get('/listar',controladorCiudad.listar);
ruta.post('/guardar',
    body("nombre").isLength({min: 3, max:50}).withMessage("El limite de caracteres es de 3 - 50"),
    body("municipioId").isInt().withMessage("El id del municipio debe ser un numero entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El id no permite nulos')
        }
        else{
            const buscarmunicipio = await modeloMunicipio.findOne({
                where: {id: value}
            });
            if(!buscarmunicipio){
                throw new Error('El id del municipio no existe');
            }
        }
    }),
    controladorCiudad.guardar
);

ruta.put('/editar', 
    query("id").isInt().withMessage('Solo de permiten valores enteros en el id')
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
    body("nombre").optional().isLength({min: 3, max:50}).withMessage("El limite de caracteres es de 3 - 50"),
    body("municipioId").optional().isInt().withMessage("El id del municipio debe ser un numero entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El id no permite nulos')
        }
        else{
            const buscarmunicipio = await modeloMunicipio.findOne({
                where: {id: value}
            });
            if(!buscarmunicipio){
                throw new Error('El id del municipio no existe');
            }
        }
    }),
    controladorCiudad.modificar);
    
ruta.delete('/eliminar', 
    query("id").isInt().withMessage('Solo de permiten valores enteros en el id')
    .custom(async value =>{
        if(!value){
            throw new Error('El id no permite nulos')
        }
        else{
            const buscarmunicipio = await modeloCiudad.findOne({
                where: {id: value}
            });
            if(!buscarmunicipio){
                throw new Error('El id del municipio no existe');
            }
        }
    }),
    controladorCiudad.eliminar);

module.exports = ruta;
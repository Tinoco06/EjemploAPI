const { Router } = require('express');
const { body, query } = require('express-validator');
const modeloMunicipio = require('../modelos/ubicacion/municipio');
const modeloDepartamento = require('../modelos/ubicacion/departamento');
const controladorMunicipio = require('../controladores/controladorMunicipio');
const ruta = Router();
ruta.get('/', controladorMunicipio.inicio);
ruta.get('/listar',controladorMunicipio.listar);
ruta.get('/buscariddepartamento',
    query("departamentoId").isInt().withMessage("El id del departamento debe ser un numero entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El id no permite nulos')
        }
        else{
            const buscardepartamento = await modeloDepartamento.findOne({
                where: {id: value}
            });
            if(!buscardepartamento){
                throw new Error('El id del departamento no existe');
            }
        }
    }),
    controladorMunicipio.buscarIdDepartamento);
ruta.post('/guardar', 
    body("codigo").isLength({min: 2, max:2}).withMessage("El limite de caracteres es de 2"),
    body("nombre").isLength({min: 3, max:50}).withMessage("El limite de caracteres es de 3 - 50"),
    body("departamentoId").isInt().withMessage("El id del departamento debe ser un numero entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El id no permite nulos')
        }
        else{
            const buscardepartamento = await modeloDepartamento.findOne({
                where: {id: value}
            });
            if(!buscardepartamento){
                throw new Error('El id del departamento no existe');
            }
        }
    }),
    controladorMunicipio.guardar);

ruta.put('/editar', 
    query("id").isInt().withMessage('Solo de permiten valores enteros en el id')
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
    body("codigo").optional().isLength({min: 2, max:2}).withMessage("El limite de caracteres es de 2"),
    body("nombre").optional().isLength({min: 3, max:50}).withMessage("El limite de caracteres es de 3 - 50"),
    body("departamentoId").optional().isInt().withMessage("El id del departamento debe ser un numero entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El id no permite nulos')
        }
        else{
            const buscardepartamento = await modeloDepartamento.findOne({
                where: {id: value}
            });
            if(!buscardepartamento){
                throw new Error('El id del departamento no existe');
            }
        }
    }),
    controladorMunicipio.modificar);
    
ruta.delete('/eliminar', 
    query("id").isInt().withMessage('Solo de permiten valores enteros en el id')
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
    controladorMunicipio.eliminar);
    
module.exports = ruta;
const { Router } = require('express');
const { body, query } = require('express-validator');
const modeloDepartamento = require('../modelos/ubicacion/departamento');
const controladorDepartamento = require('../controladores/controladorDepartamento');
const ruta = Router();
ruta.get('/', controladorDepartamento.inicio);
ruta.get('/listar',controladorDepartamento.listar);
ruta.post('/guardar', 
    body("codigo").isLength({min: 2, max:2}).withMessage("El limite de caracteres es de 2")
    .custom(async value =>{
        if(!value){
            throw new Error('El codigo no permite nulos')
        }
        else{
            const buscardepartamento = await modeloDepartamento.findOne({
                where: {codigo: value}
            });
            if(buscardepartamento){
                throw new Error('El codigo del departamento ya existe');
            }
        }
    }),
    body("nombre").isLength({min: 3, max:50}).withMessage("El limite de caracteres es de 3 - 50")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite nulos')
        }
        else{
            const buscardepartamento = await modeloDepartamento.findOne({
                where: {nombre: value}
            });
            if(buscardepartamento){
                throw new Error('El nombre del departamento ya existe');
            }
        }
    }),
    controladorDepartamento.guardar);

ruta.put('/editar', 
    query("id").isInt().withMessage('Solo de permiten valores enteros en el id')
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
    body("codigo").optional().isLength({min: 2, max:2}).withMessage("El limite de caracteres es de 2"),
    body("nombre").optional().isLength({min: 3, max:50}).withMessage("El limite de caracteres es de 3 - 50"),
    body("estado").optional().isIn(['AC', 'IN', 'BL']).withMessage("Solo permite valores Activo(AC), Inactivo(IN), Bloqueado(BL)"),
    controladorDepartamento.modificar);
    
ruta.delete('/eliminar', 
    query("id").isInt().withMessage('Solo de permiten valores enteros en el id')
    .custom(async value =>{
        if(!value){
            throw new Error('El id no permite nulos')
        }
        else{
            const buscardepartamento = await modeloDepartamento.findOne({
                where: {id: value}
            });
            if(!buscardepertamento){
                throw new Error('El id del departamento no existe');
            }
        }
    }),
    controladorDepartamento.eliminar);
    
module.exports = ruta;
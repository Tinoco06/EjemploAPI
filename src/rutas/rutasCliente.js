const { Router } = require('express');
const { body, query } = require('express-validator');
const modeloCliente = require('../modelos/cliente');
const controladorCliente = require('../controladores/controladorCliente');
const ruta = Router();
/**
 * @swagger
 * tags:
 *   name: Cargos
 *   description: Operaciones relacionas con los cargos
 */

ruta.get('/', controladorCliente.inicio);
/**
 * @swagger
 * /cargos/listar:
 *   get:
 *     summary: Obtiene la lista de los cargos
 *     tags: [Cargos]
 *     responses:
 *       200:
 *         description: Lista de cargos obtenida con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador unico del cargo
 *                   nombre:
 *                     type: string
 *                     description: Nombre del cargo
 *                   activo:
 *                     type: boolean
 *                     description: Indica el estado del cargo
 *                   
 */
ruta.get('/listar',controladorCliente.listar);
/**
 * @swagger
 * /cargos/guardar:
 *   post:
 *     summary: Crear un cargo
 *     tags: [Cargos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del cargo
 *               activo:
 *                 type: boolean
 *                 description: Estado del cargo
 *     responses:
 *       201:
 *         description: Lista de cargos obtenida con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje del estado de la accion
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Identificador del cargo
 *                     nombre:
 *                       type: string
 *                       description: Nombre del cargo
 *                     activo:
 *                       type: boolean
 *                       description: Estado del cargo
 *                   
 */
ruta.post('/guardar', 
    body("nombre").isLength({min: 3, max:50}).withMessage("El limite de caracteres es de 3 - 50"),
    controladorCliente.guardar);

ruta.put('/editar', 
        query("id").isInt().withMessage('Solo de permiten valores enteros en el id')
        .custom(async value =>{
            if(!value){
                throw new Error('El id no permite nulos')
            }
            else{
                const buscarcargo = await modeloCliente.findOne({
                    where: {id: value}
                });
                if(!buscarcargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
        body("nombre").optional().isLength({min: 3, max:50}).withMessage("El limite de caracteres es de 3 - 50")
        .custom(async value =>{
            if(!value){
                throw new Error('El nombre no permite nulos')
            }
            else{
                const buscarcargo = await modeloCliente.findOne({
                    where: {nombre: value}
                });
                console.log(buscarcargo);
                if(buscarcargo){
                    throw new Error('El nombre del cargo ya existe');
                }
            }
        }),
        body("activo").optional().isBoolean().withMessage("Solo permite valores boleanos"),
        controladorCliente.modificar);
    
ruta.delete('/eliminar', 
    query("id").isInt().withMessage('Solo de permiten valores enteros en el id')
    .custom(async value =>{
        if(!value){
            throw new Error('El id no permite nulos')
        }
        else{
            const buscarcargo = await modeloCliente.findOne({
                where: {id: value}
            });
            if(!buscarcargo){
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorCliente.eliminar);
    
module.exports = ruta;
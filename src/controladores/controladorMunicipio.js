const modeloMunicipio = require('../modelos/ubicacion/municipio');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.inicio = (req, res)=>{
    var info = {
        rutas:[
            {
                descripcion: 'Informacion general de las rutas de departamentos',
                metodo: 'get',
                url: 'servidor:3001/api/municipios/',
                parametros: 'ninguno'   
            },
            {
                descripcion: 'Lista todos los municipios',
                metodo: 'get',
                url: 'servidor:3001/api/municipios/listar',
                parametros: 'ninguno'   
            },
        ]
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(info);
}
exports.listar = async (req, res) => {
    
    try {
        await modeloMunicipio.findAll()
        .then((data)=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(data);
        })
        .catch((er)=>{
            console.log(er);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({msg: "Error en la consulta"});
        });
    } catch (error) {
        console.log(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({msg: "Error en el servidor"});
    }
}

exports.buscarIdDepartamento = async (req, res) => {
    
    try {
        const { departamentoId } = req.query;
        await modeloMunicipio.findAll({
            where: {
                departamentoId
            }
        })
        .then((data)=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(data);
        })
        .catch((er)=>{
            console.log(er);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({msg: "Error en la consulta"});
        });
    } catch (error) {
        console.log(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({msg: "Error en el servidor"});
    }
}

exports.guardar = async (req, res) => {
    const errores = validationResult(req);
    var ers =[];
    errores.errors.forEach(e =>{
        ers.push({campo: e.path, msj: e.msg});
    })
    if(ers.length>0){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ers});
    }
    else{
        try {
            const { nombre, codigo, departamentoId } = req.body;
            const buscarCodigo = await modeloMunicipio.findOne({
                where: {
                    codigo: codigo,
                    departamentoId: departamentoId,
                }
            });
            if(buscarCodigo){
                ers.push({campo: "codigo", msj: "Este codigo ha sido asignado a otro municipio"});
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({ers});
            }
            else{
                const buscarNombre = await modeloMunicipio.findOne({
                    where: {
                        nombre: nombre,
                        departamentoId: departamentoId,
                    }
                });
                if(buscarNombre){
                    ers.push({campo: "nombre", msj: "Este nombre ha sido asignado a otro municipio"});
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ers});
                }
                else{
                    await modeloMunicipio.create({...req.body})
                    .then((data)=>{
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json({msg: "Registro guardado "+ data});        
                    })
                    .catch((er)=>{
                        console.log(er);
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json({msg: "Error en la consulta"});
                    })
                }
            }
        } catch (error) {
            console.log(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({msg: "Error en el servidor"});
        }
    }
}

exports.modificar = async (req, res) => {
    const errores = validationResult(req);
    var ers =[];
    errores.errors.forEach(e =>{
        ers.push({campo: e.path, msj: e.msg});
    })
    if(ers.length>0){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ers});
    }
    else{
        try {
            const { id } = req.query;
            const { nombre, codigo, departamentoId } = req.body;
            const buscarCodigo = await modeloMunicipio.findOne({
                where: {
                    codigo: codigo,
                    [Op.not]: {id: id},
                    departamentoId: departamentoId,
                }
            });
            console.log(buscarCodigo);
            if(buscarCodigo){
                ers.push({campo: "codigo", msj: "Este codigo ha sido asignado a otro municipio"});
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({ers});
            }
            else{
                const buscarNombre = await modeloMunicipio.findOne({
                    where: {
                        nombre: nombre,
                        [Op.not]: {id: id},
                        departamentoId: departamentoId,
                    }
                });
                if(buscarNombre){
                    ers.push({campo: "nombre", msj: "Este nombre ha sido asignado a otro municipio"});
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ers});
                }
                else{
                    await modeloMunicipio.update(
                        {...req.body},
                        { where: { id: id}})
                    .then((data)=>{
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json({msg: "Registro actualizado "+ data});        
                    })
                    .catch((er)=>{
                        console.log(er);
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json({msg: "Error en la consulta"});
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({msg: "Error en el servidor"});
        }
    }
}

exports.eliminar = async (req, res) => {
    const errores = validationResult(req);
    var ers =[];
    errores.errors.forEach(e =>{
        ers.push({campo: e.path, msj: e.msg});
    })
    if(ers.length>0){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ers});
    }
    else{
        try {
            const { id } = req.query;
            await modeloMunicipio.destroy({ where: { id: id}})
            .then((data)=>{
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({msg: "Registro eliminado "+ data});        
            })
            .catch((er)=>{
                console.log(er);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({msg: "Error en la consulta"});
            });
        } catch (error) {
            console.log(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({msg: "Error en el servidor"});
        }
    }
}

const modeloUsuario = require('../modelos/usuario');
const { enviarCorreo } = require('../configuraciones/correo')
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const crypto = require('crypto');
const argon2 = require('argon2');

const generarPin = ()=>{
    return crypto.randomBytes(3).toString('hex').slice(0,6);
}

exports.generarPin = async (req, res) =>{
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
            const { correo } = req.body;
            var usuario = await modeloUsuario.findOne({where: {correo: correo}});
            usuario.pin= generarPin();
            await usuario.save();
            enviarCorreo({
                para: correo,
                asunto: 'Recuperacion de contrasena',
                descripcion: 'Recuperacion de contrasena',
                html: '<h1>PIN: ' + usuario.pin + '</h1><p>Hola</p>'
            });
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({msg: "Se genero un pin "});
        } catch (error) {
            console.log(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({msg: "Error en el servidor"});
        }
    }
     
}

exports.actualizarContrasena = async (req, res) =>{
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
            const { correo, pin, contrasena } = req.body;
            var usuario = await modeloUsuario.findOne({where: {correo: correo}});

            if(usuario.pin == pin){
                const hash = await argon2.hash(contrasena, {
                    type: argon2.argon2id,
                    memoryCost: 2**16,
                    timeCost: 4,
                    parallelism: 2
                });
                usuario.contrasena = hash;
                usuario.pin = "000000";
                await usuario.save();
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({msg: "Resgistro actualizado"});
            }else{
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.json({msg: "Error en el servidor"});
            }
            
        } catch (error) {
            console.log(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({msg: "Error en el servidor"});
        }
    }
     
}

/*
exports.iniciarSesion = async (req, res) =>{
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
            const { usuario, contrasena } = req.body;
            var usuario = await modeloUsuario.findOne({where: {correo: usuario, nombre: usuario}});

            if(usuario.pin == pin){
                const hash = await argon2.hash(contrasena, {
                    type: argon2.argon2id,
                    memoryCost: 2**16,
                    timeCost: 4,
                    parallelism: 2
                });
                usuario.contrasena = hash;
                usuario.pin = "000000";
                await usuario.save();
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({msg: "Resgistro actualizado"});
            }else{
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.json({msg: "Error en el servidor"});
            }
            
        } catch (error) {
            console.log(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({msg: "Error en el servidor"});
        }
    }
     
}*/
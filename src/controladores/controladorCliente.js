const modelocliente = require('../modelos/cliente');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.inicio = (req, res) => {
    var info = {
        rutas: [
            {
                descripcion: 'Información general de las rutas de clientes',
                metodo: 'get',
                url: 'servidor:3001/api/clientes/',
                parametros: 'ninguno'
            },
            {
                descripcion: 'Lista todos los clientes',
                metodo: 'get',
                url: 'servidor:3001/api/clientes/listar',
                parametros: 'ninguno'
            },
        ]
    };
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(info);
}

exports.listar = async (req, res) => {
    try {
        await modelocliente.findAll().then((data) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(data);
        }).catch((er) => {
            console.log(er);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ msg: "Error en la consulta" });
        });
    } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ msg: "Error en el servidor" });
    }
}

exports.buscarPorIdentidad = async (req, res) => {
    try {
        const { identidad } = req.query;
        await modelocliente.findAll({
            where: { identidad }
        }).then((data) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(data);
        }).catch((er) => {
            console.log(er);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ msg: "Error en la consulta" });
        });
    } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ msg: "Error en el servidor" });
    }
}

exports.guardar = async (req, res) => {
    const errores = validationResult(req);
    var ers = [];
    errores.errors.forEach(e => {
        ers.push({ campo: e.path, msj: e.msg });
    })
    if (ers.length > 0) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ ers });
    } else {
        try {
            const { identidad, primernombre, segundonombre, primerapellido, segundoapellido, estado } = req.body;
            const buscarIdentidad = await modelocliente.findOne({
                where: { identidad }
            });
            if (buscarIdentidad) {
                ers.push({ campo: "identidad", msj: "Este número de identidad ya está registrado" });
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({ ers });
            } else {
                await modelocliente.create({ ...req.body })
                    .then((data) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json({ msg: "Registro Guardado", data });
                    }).catch((er) => {
                        console.log(er);
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json({ msg: "Error en la consulta" });
                    });
            }
        } catch (error) {
            console.log(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ msg: "Error en el servidor" });
        }
    }
}

exports.modificar = async (req, res) => {
    const errores = validationResult(req);
    var ers = [];
    errores.errors.forEach(e => {
        ers.push({ campo: e.path, msj: e.msg });
    });
    if (ers.length > 0) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ ers });
    } else {
        try {
            const { id } = req.query;
            const { identidad, primernombre, segundonombre, primerapellido, segundoapellido, estado } = req.body;
            const buscarIdentidad = await modelocliente.findOne({
                where: {
                    identidad,
                    [Op.not]: { id: id }
                }
            });
            if (buscarIdentidad) {
                ers.push({ campo: "identidad", msj: "Este número de identidad ya está registrado" });
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({ ers });
            } else {
                await modelocliente.update(
                    { ...req.body },
                    { where: { id: id } }
                ).then((data) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ msg: "Registro Actualizado", data });
                }).catch((er) => {
                    console.log(er);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ msg: "Error en la consulta" });
                });
            }
        } catch (error) {
            console.log(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ msg: "Error en el servidor" });
        }
    }
}

exports.eliminar = async (req, res) => {
    const errores = validationResult(req);
    var ers = [];
    errores.errors.forEach(e => {
        ers.push({ campo: e.path, msj: e.msg });
    });
    if (ers.length > 0) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ ers });
    } else {
        try {
            const { id } = req.query;
            await modelocliente.destroy({ where: { id: id } })
                .then((data) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ msg: "Registro Eliminado", data });
                }).catch((er) => {
                    console.log(er);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ msg: "Error en la consulta" });
                });
        } catch (error) {
            console.log(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ msg: "Error en el servidor" });
        }
    }
}
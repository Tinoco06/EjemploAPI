const modeloCiudad = require('../modelos/ubicacion/ciudad');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.inicio = (req, res) => {
    var info = {
        rutas: [
            {
                descripcion: 'Informacion general de las rutas de ciudad',
                metodo: 'get',
                url: 'servidor:3001/api/ciudad/',
                parametros: 'ninguno'
            },
            {
                descripcion: 'Lista todos las ciudades',
                metodo: 'get',
                url: 'servidor:3001/api/ciudad/listar',
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
        await modeloCiudad.findAll()
            .then((data) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(data);
            })
            .catch((er) => {
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
    }
    else {
        try {
            const { nombre, municipioId } = req.body;
            const buscarCodigo = await modeloCiudad.findOne({
                where: {
                    codigo: codigo,
                    municipioId: municipioId,
                }
            });
            if (buscarCodigo) {
                ers.push({ campo: "codigo", msj: "Este codigo ha sido asignado a otra ciudad" });
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({ ers });
            } else {
                const buscarNombre = await modeloMunicipio.findOne({
                    where: {
                        nombre: nombre,
                        municipioId: municipioId,
                    }
                });
                if (buscarNombre) {
                    ers.push({ campo: "nombre", msj: "Este nombre ha sido asignado a otro municipio" });
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ ers });
                }
                else {
                        await modeloCiudad.create({ ...req.body })
                        .then((data) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json({ msg: "Registro guardado " + data });
                        })
                        .catch((er) => {
                            console.log(er);
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json({ msg: "Error en la consulta" });
                        })
                }
            }
        }
            catch (error) {
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
        })
        if (ers.length > 0) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ ers });
        }
        else {
            try {
                const { id } = req.query;
                const { nombre, municipioId } = req.body;

                const buscarNombre = await modeloCiudad.findOne({
                    where: {
                        nombre: nombre,
                        [Op.not]: { id: id },
                        municipioId: municipioId,
                    }
                });
                if (buscarNombre) {
                    ers.push({ campo: "nombre", msj: "Este nombre ha sido asignado a otra ciudad" });
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ ers });
                }
                else {
                    await modeloCiudad.update(
                        { ...req.body },
                        { where: { id: id } })
                        .then((data) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json({ msg: "Registro actualizado " + data });
                        })
                        .catch((er) => {
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
        })
        if (ers.length > 0) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ ers });
        }
        else {
            try {
                const { id } = req.query;
                await modeloCiudad.destroy({ where: { id: id } })
                    .then((data) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json({ msg: "Registro eliminado " + data });
                    })
                    .catch((er) => {
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
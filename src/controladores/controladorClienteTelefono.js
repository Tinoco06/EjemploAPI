const modeloClienteTelefono = require('../modelos/clienteTelefono');
const { validationResult } = require('express-validator');
exports.inicio = (req, res) => {
    var info = {
        rutas: [
            {
                descripcion: 'Informacion general de las rutas de telefonos de clientes',
                metodo: 'get',
                url: 'servidor:3001/api/clienteTelefono/',
                parametros: 'ninguno'
            },
            {
                descripcion: 'Lista todos los teléfonos de los clientes',
                metodo: 'get',
                url: 'servidor:3001/api/clienteTelefono/listar',
                parametros: 'ninguno'
            },
        ]
    };
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(info);
};

exports.listar = async (req, res) => {
    try {
        await modeloClienteTelefono.findAll()
            .then((data) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(data);
            })
            .catch((er) => {
                console.log(er);
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.json({ msg: "Error en la consulta" });
            });
    } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ msg: "Error en el servidor" });
    }
};

exports.guardar = async (req, res) => {
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
            await modeloClienteTelefono.create({ ...req.body })
                .then((data) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ msg: "Teléfono guardado", data });
                })
                .catch((er) => {
                    console.log(er);
                    res.statusCode = 500;
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
};

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

            await modeloClienteTelefono.update(
                { ...req.body },
                { where: { id: id } }
            )
                .then((data) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ msg: "Teléfono actualizado", data });
                })
                .catch((er) => {
                    console.log(er);
                    res.statusCode = 500;
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
};

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

            await modeloClienteTelefono.destroy({ where: { id: id } })
                .then((data) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ msg: "Teléfono eliminado", data });
                })
                .catch((er) => {
                    console.log(er);
                    res.statusCode = 500;
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
};
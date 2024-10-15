const modeloclientedireccion = require('../modelos/ubicacion/clienteDireccion');
const { validationResult } = require('express-validator');


exports.inicio = (req, res) => {
    var info = {
        rutas: [
            {
                descripcion: 'Informacion general de las rutas de clientedirecciones',
                metodo: 'get',
                url: 'servidor:3001/api/clientedirecciones/',
                parametros: 'ninguno'
            },
            {
                descripcion: 'Lista todas las direcciones de clientes',
                metodo: 'get',
                url: 'servidor:3001/api/clientedirecciones/listar',
                parametros: 'ninguno'
            },
        ]
    };
    res.status(200).json(info);
};

exports.listar = async (req, res) => {
    try {
        const data = await modeloclientedireccion.findAll();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


exports.guardar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ ers: errores.array() });
    }

    try {
        const { descripcion, clienteId, barrioId } = req.body;
        const data = await modeloclientedireccion.create({ descripcion, clienteId, barrioId });
        res.status(200).json({ msg: "Registro Guardado", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


exports.modificar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ ers: errores.array() });
    }

    try {
        const { id } = req.query;
        const { descripcion, clienteId, barrioId } = req.body;

        const data = await modeloclientedireccion.update(
            { descripcion, clienteId, barrioId },
            { where: { id } }
        );

        res.status(200).json({ msg: "Registro Actualizado", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

exports.eliminar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ ers: errores.array() });
    }

    try {
        const { id } = req.query;
        const data = await modeloclientedireccion.destroy({ where: { id } });

        res.status(200).json({ msg: "Registro Eliminado", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
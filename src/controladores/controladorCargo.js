//Se importan las dependencias, el modelo cargo y la libreia express validator 
//que se usa para validar los datos que vienen en solicitudes HTTP
const modeloCargo = require('../modelos/cargo');
const { validationResult } = require('express-validator');

/*Esta es una funcion que ofrece informacion sobre las rutas disponibles para
el controlador cargo, usando un JSON, solamente funciona como informacion*/
/* req = request. este es un objeto que representa la solicitud HTTP que el cliente envia al servidor
    res= response. es el objeto que da respuesta HTTP que el servidor va enviar al cliente, 
    ej: codigos de estado, definir cabeceras y contenido*/
exports.inicio = (req, res) => {
    //la variable info contiene un objeto JS que se enviara al cliente como parte de la respuesta
    var info = {

        //Informacion de las rutas
        rutas: [
            {
                descripcion: 'Informacion general de las rutas de cargos',
                metodo: 'get',
                url: 'servidor:3001/api/cargos/',
                parametros: 'ninguno'
            },
            {
                descripcion: 'Lista todos los cargos',
                metodo: 'get',
                url: 'servidor:3001/api/cargos/listar',
                parametros: 'ninguno'
            },
        ]
    }
    //Enviamos el codigo de estado 200 que es OK o sea exitosa
    res.statusCode = 200;
    //Establece una cabecera HTTP en la respuesta. Content type indica que la respuesta es JSON
    res.setHeader("Content-Type", "application/json");
    //Metodo proporcionado por express que convierte un objeto JS en JSON y lo envia alcliente
    res.json(info);
}


/*Funcion diseñada para listar todos los registros de la tabla cargo
async = funcion asincrona, es deciq ue puede manejar operaciones que toman tiempo, 
como acceder a la BDD sin bloquear el flujo de ejecución*/
exports.listar = async (req, res) => {
    //try catch para anticipar errores
    try {
        //Await se usa en funciones async para esperar la resolucion de una promesa
        //find all es un metodo de sequelize que recupera los registros de la tabla relacionada con modelo cargo
        await modeloCargo.findAll()
            /*then es lo que maneja la respuesta y data contiene los datos recuperados de la BDD, es decir
            si la consulta tuvo exito ejecutara lo que este dentro de then, en este caso se devuelve OK*/
            .then((data) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(data);
            })
            //En caso de que haya un error en la consulta se ejecutara este bloque
            .catch((er) => {
                //con el console log podemos ver el error que se ha generado
                console.log(er);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({ msg: "Error en la consulta" });
            });
        //En caso de que ocurra un error en todo el bloque se captura en este catch
    } catch (error) {
        //Para ver el error
        console.log(error);
        //Enviamos codigo de estado que indica error en el servidor
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ msg: "Error en el servidor" });
    }
}

/*Funcion que maneja la creacion de nuevos registros en la BDD
luego de validar los datos proporcionados por el cliente*/
exports.guardar = async (req, res) => {
    /*Validacion con express validator
    en errores se almacenaran los errores de validacion que se hayan generado
    en los datos dados por el cliente, ers es un arreglo que contiene los mensajes
    para cada campo que no pase la validacion*/
    const errores = validationResult(req);
    var ers = [];

    //Devuelve el array con todos los errores encontrados, usamos foreach para recorrerlo
    //La funcion pasada al foreach toma cada error (e) y realiza una operacion con el
    errores.errors.forEach(e => {
        //Para cada error que hay en el array errores.errors se añade un nuevo objeto al array ers 
        ers.push({ campo: e.path, msj: e.msg });
    })
    //Si hay errores en la validacion, se responde con los errores en lugar de continuar con la op guardar
    if (ers.length > 0) {

        //Enviamos el codigo OK junto al arreglo de errores en tipo JSON
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ ers });
    }
    //En caso de que no haya errores
    else {
        //Try catch que maneja excepciones
        try {
            //Funcion await de tipo create lo que crea un nuevo registro en la tabla
            await modeloCargo.create({ ...req.body }) // ...req.body contiene los datos que el cliente enviara a esta funcion
                //Si esa creacion fue ecistosa entra al then y envia mensaje de exito
                .then((data) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ msg: "Registro guardado " + data });
                })
                //En caso de que haya un error en la creacion se ejecuta este bloque
                .catch((er) => {
                    console.log(er);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ msg: "Error en la consulta" });
                })
            //En caso de que ocurra un error en todo el bloque se captura en este catch
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
    })
    if (ers.length > 0) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ ers });
    } else {
        try {

            /*Esta linea de codigo se llama desestructuracion de objetos
            Esto significa que se esta extrayendo directamente la propiedad id de req.query
            y asignandola a la constante id
            Con esto logramos que el valor de id sea lo que esta en el parametro id de la URL*/
            const { id } = req.query; //req.query contendra los parametros de la consulta dados por el cliente

            /*Update es el metodo de sequelize que se utiliza para actualizar registros en la base de datos
            este recibe dos argumentos (Datos nuevos / Condiciones: determinan que registros deben ser actualizados)*/
            await modeloCargo.update(
                /* ... es llamado spread operator, sirve para pasar todos los campos que se encuentran en el req.body
                esto permite expandir los valores dentro de un objeto*/
                { ...req.body },
                //Where es la condicion que define que registros en la BDD deben ser actualizados. 
                //id:id especifica que solo debe actualizarse el registro donde el campo id de la BDD coincida con el id recibido en el req.query
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
                })
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
    } else {
        try {
            const { id } = req.query;
            await modeloCargo.destroy({ where: { id: id } })
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


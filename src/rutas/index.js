//Aquí estarán contenidas todas las rutas
//Express tiene un enrutador
const { Router } = require('express');
const ruta = Router(); //Instanciamos el enrutador a la variable ruta

//Definimos una variable de controlador
const controladorInicio = require('../controladores/controladorInicio');

//Empieza la ruta definida dentro del servidor
ruta.get('/', controladorInicio.inicio); 
//Variables de peticion y respuesta
ruta.get('/otra', controladorInicio.otra);

ruta.get('/otra2', controladorInicio.otra2);
/*
ruta.get('/otra',(req, res) => {
    var objeto = { //Así es como declaramos un objeto
        //Estructura clave valor
        //clave - valor
        nombre: "Jorge",
        apellido: "Tinoco",
        clase: "Progra movil 2"
    }; 
    res.json(objeto);
});
*/
//Exportar el modulo y la ruta
module.exports = ruta;
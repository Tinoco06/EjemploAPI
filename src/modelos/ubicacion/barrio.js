//Se importa sequelize, biblioteca para Node.js que permite interactuar
//con bases de datos SQL utilizando objetos JavaScript
const sequelize = require('sequelize');

//Se importa el archivo desde la carpeta configuraciones el cual tiene
//las credenciales y configuracion de la BDD para su conexion
const db = require('../../configuraciones/db');

//Definimos el modelo barrio
//db.define se utiiza para definir un nuevo modelo en sequelize
/*Este metodo toma al menos dos argumentos, el nombre del modelo("barrio")
y un objeto que define los atributos del modelo o sea las columnas de la tabla*/
const Barrio = db.define(
    "barrio",
    {
        //Nombre y estado son los campos de la base de datos
        nombre:{
            type: sequelize.STRING(50),
            allowNull: false
        },
        estado:{
            type: sequelize.ENUM('AC', 'IN', 'BL'),
            allowNull: true,
            defaultValue: 'AC'
        }
    },
    /*Se especifica el nombre de la tabla, esto es opcional ya que 
    sequelize podria generar un nombre automatico basado en el nombre del modelo */
    {
        tableName:"barrios",
    }
);

//Esto exporta elmodelo para que pueda usarse en otras partes de la aplicación
module.exports = Barrio;
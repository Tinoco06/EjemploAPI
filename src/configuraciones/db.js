const sequelize = require('sequelize');
const db = new sequelize(
    process.env.NOMBRE_DB, //Nombre de la base de datos
    process.env.USUARIO_DB, //usuario de la base de datos
    process.env.CONTRASENA_DB,
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
    }

);

module.exports = db;
const sequelize = require('sequelize');
const db = require('../../configuraciones/db');

const ClienteDireccion = db.define(
    "clienteDireccion",
    {
        descripcion:{
            type: sequelize.TEXT,
            allowNull: false
        },
    },
    {
        tableName:"clientedirecciones",
    }
);
module.exports = ClienteDireccion;
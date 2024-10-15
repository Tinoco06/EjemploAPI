const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const { toDefaultValue } = require('sequelize/lib/utils');

const ClienteTelefono = db.define(
    "clientetelefono",
    {
        telefono:{
            type: sequelize.STRING(15),
            allowNull: false,
            }
    },
    {
        tableName: "clientetelefonos",
    }
);

module.exports = ClienteTelefono;
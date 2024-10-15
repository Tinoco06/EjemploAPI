const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const { toDefaultValue } = require('sequelize/lib/utils');

//Definimos la estructura del cargo
const Cargo = db.define(
    //Nombre del modelo
    "cargo",
    //Conjunto de atributos(campos de la tabla)
    {
        nombre:{
            type: sequelize.STRING(50),
            allowNull: false,
            unique:{
                args: true,
                msg: "Ya existe este nombre del cargo"
            }
        },
        descripcion:{
            type: sequelize.TEXT,
            allowNull: true,
        },
        activo:{
            type: sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        }
    },
    {
        tableName: "cargos",
    }
);

module.exports = Cargo;
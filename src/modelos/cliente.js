const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const { toDefaultValue } = require('sequelize/lib/utils');

const Cliente = db.define(
    "cliente",
    {
        identidad:{
            type: sequelize.STRING(20),
            allowNull: false
        },
        primernombre: {
            type: sequelize.STRING(50),
            allowNull: false,
        },
        segundonombre: {
            type: sequelize.STRING(50),
            allowNull: true,
        },
        primerapellido: {
            type: sequelize.STRING(50),
            allowNull: false,
        },
        segundoapellido: {
            type: sequelize.STRING(50),
            allowNull: true,
        },
        imagen:{
            type: sequelize.STRING(250),
            allowNull: true
        },
        estado:{
            type: sequelize.ENUM('AC', 'IN', 'BL'),
            allowNull: true,
            defaultValue: 'AC'
        }
    },
    {
        tableName: "clientes",
    }
);

module.exports = Cliente;
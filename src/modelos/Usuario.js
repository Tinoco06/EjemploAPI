const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const { toDefaultValue, defaultValueSchemable } = require('sequelize/lib/utils');

const Usuario = db.define(
    "usuario",
    {
        nombre:{
            type: sequelize.STRING(50),
            allowNull: false,
            unique:{
                args: true,
                msg: "Ya existe nombre de este usuario"
            }
        },     
        correo:{
            type: sequelize.STRING(255),
            allowNull: false,
            unique:{
                args: true,
                msg: "Ya existe este correo de usuario"
            },
            validate:{
                isEmail: true
            }
        },
        intento:{
            type: sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        contrasena:{
            type: sequelize.STRING(250),
            allowNull: false
        },
        estado:{
            type: sequelize.ENUM('Activo', 'Inactivo', 'Bloqueado', 'Logeado'),
            allowNull: true,
            defaultValue: 'Activo'
        },
        tipoUsuario:{
            type: sequelize.ENUM('Cliente', 'Empleado'),
            allowNull: true,
        },
        pin:{
            type: sequelize.STRING(6),
            allowNull: true,
            defaultValue: '000000'
        }
    },
    {
        tableName: "usuario",
        timestamps: true,
    }
);

module.exports = Usuario;
    
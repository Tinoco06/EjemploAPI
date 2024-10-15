const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const { toDefaultValue } = require('sequelize/lib/utils');

const Usuario = db.define(
    //Nombre de la tabla
    "usuario",
    {
        identidadusuario:{
            type: sequelize.STRING(20),
            allowNull: false,
            unique:{
                args: true,
                msg: "Ya existe este usuario"
            }
        },
        nombreusuario:{
            type: sequelize.STRING(50),
            allowNull: false,
        },
        passwordusuario:{
            type: sequelize.STRING(255),
            allowNull: false,
        },        
        emailusuario:{
            type: sequelize.STRING(255),
            allowNull: false,
        },
        estadousuario:{
            type: sequelize.ENUM('AC', 'IN', 'BL'),
            allowNull: true,
            defaultValue: 'AC',            
        },
        rolusuario:{
            type: sequelize.ENUM('Admin', 'User', 'Cliente'),
            allowNull: true,
            defaultValue: 'User',
        }
    },
    {
        tableName: "usuario",
    }
);

module.exports = Usuario;
    
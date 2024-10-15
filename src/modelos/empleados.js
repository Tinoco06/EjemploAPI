const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const { toDefaultValue } = require('sequelize/lib/utils');

//Definimos la estructura del empleado
const Empleado = db.define(
    //Nombre de la tabla
    "empleado",
    //Conjunto de atributos(campos de la tabla)
    {
        identidad:{
            type: sequelize.STRING(20),
            allowNull: false,
            unique:{
                args: true,
                msg: "Ya existe este DNI"
            }
        },
        primernombre:{
            type: sequelize.STRING(50),
            allowNull: false,
        },
        segundonombre:{
            type: sequelize.STRING(50),
            allowNull: true,
        },
        primerapellido:{
            type: sequelize.STRING(50),
            allowNull: false,
        },
        segundoapellido:{
            type: sequelize.STRING(50),
            allowNull: true,
        },
        sueldo:{
            type: sequelize.DOUBLE,
            allowNull: true,
            defaultValue: 0,
        },
        imagen:{
            type: sequelize.STRING(250),
            allowNull: true,
        },
        estado:{
            type: sequelize.ENUM('AC', 'IN', 'BL'),
            allowNull: true,
            defaultValue: 'AC',            
        }
    },
    {
        tableName: "empleados",
    }
);

module.exports = Empleado;
const sequelize = require('sequelize');
const db = require('../../configuraciones/db');
const { toDefaultValue } = require('sequelize/lib/utils');

const Departamento = db.define(
    "departamento",
    {
        nombre:{
            type: sequelize.STRING(50),
            allowNull: false,
        },
        codigo:{
            type: sequelize.STRING(3
            ),
            allowNull: false,
        },
        estado:{
            type: sequelize.ENUM('AC', 'IN', 'BL'),
            allowNull: true,
            defaultValue: 'AC',            
        }
    }, 
    {
        tableName: "departamentos",
    }
);

module.exports = Departamento;
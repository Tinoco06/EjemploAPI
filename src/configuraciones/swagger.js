const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition:{
        //Propio de la documentacion
        openapi: '3.0.0',
        info: {
            title: 'Ejemplo movil 2',
            version: '1.0.0',
            description: 'Ejemplo visto en clase'
        },
        servers: [
            {
                url: 'http://localhost:'+process.env.PORT+'/API',
                description: 'Servidor local'
            }
        ]
    },

    //Indicar las rutas almacenadas en la carpeta ruta, trae todos los archivos con 
    //extension js
    apis: [path.join(__dirname, "../rutas/*.js")]    
};

const swaggerSpec = swaggerJsdoc(options);

module.Exports = swaggerSpec;
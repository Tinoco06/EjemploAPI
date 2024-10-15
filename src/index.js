//Estas variables requieren los paquetes que se instalaron con anterioridad
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

//cargar las variables de entorno
require('dotenv').config();

//cargar la documentacion
const swaggerUi =  require('swagger-ui-express');
const swaggerSpec = require('./configuraciones/swagger');



const db = require('./configuraciones/db');
const modeloCargo = require('./modelos/cargo');
const modeloEmpleado = require('./modelos/empleados');
const modeloDepartamanto = require('./modelos/ubicacion/departamento');
const modeloMunicipio = require('./modelos/ubicacion/municipio');
const modeloCiudad = require('./modelos/ubicacion/ciudad');
const modeloBarrio = require('./modelos/ubicacion/barrio');
const modeloCliente = require('./modelos/cliente');
const modeloClienteTelefono = require('./modelos/clienteTelefono');
const modeloClienteDireccion = require('./modelos/ubicacion/clienteDireccion');

db.authenticate()
//async es para ejecutarse de forma asincrona
.then(async ()=>{
    console.log("Conexion correcta con la base de datos");
    modeloCargo.hasMany(modeloEmpleado);
    modeloEmpleado.belongsTo(modeloCargo);

    modeloDepartamanto.hasMany(modeloMunicipio);
    modeloMunicipio.belongsTo(modeloDepartamanto);
    modeloMunicipio.hasMany(modeloCiudad);
    modeloCiudad.belongsTo(modeloMunicipio);
    modeloCiudad.hasMany(modeloBarrio);
    modeloBarrio.belongsTo(modeloCiudad);

    modeloCliente.hasMany(modeloClienteTelefono);
    modeloClienteTelefono.belongsTo(modeloCliente);
    modeloCliente.hasMany(modeloClienteDireccion);
    modeloClienteDireccion.belongsTo(modeloCliente);
    modeloBarrio.hasMany(modeloClienteDireccion);
    modeloClienteDireccion.belongsTo(modeloBarrio);

    await modeloCargo.sync().then((data)=>{
        console.log("Modelo cargo creado correctamente");
    });
    await modeloEmpleado.sync().then((data)=>{
        console.log("Modelo empleado creado correctamente");
    });

    await modeloDepartamanto.sync().then((data)=>{
        console.log("Modelo departamento creado correctamente");
    });
    await modeloMunicipio.sync().then((data)=>{
        console.log("Modelo municipio creado correctamente");
    });
    await modeloCiudad.sync().then((data)=>{
        console.log("Modelo ciudad creado correctamente");
    });
    await modeloBarrio.sync().then((data)=>{
        console.log("Modelo barrio creado correctamente");
    });

    await modeloCliente.sync().then((data)=>{
        console.log("Modelo cliente creado correctamente");
    });
    await modeloClienteTelefono.sync().then((data)=>{
        console.log("Modelo clienteTelefono creado correctamente");
    });
    await modeloClienteDireccion.sync().then((data)=>{
        console.log("Modelo ClienteDireccion creado correctamente");
    });
})
.catch((er)=>{
    console.log("Error al conectar la base de datos " + er);
});

const limitador = rateLimit({
    //limitador de peticiones, un usuario solo puede hacer 100 peticiones cada 10 min
    windowsMs: 1000 * 60 * 10,
    max: 100
});

const app = express();
app.set('port', 3001);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors('./configuraciones/cors'));
app.use(limitador);
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', require('./rutas'));
app.use('/api/cargos', require('./rutas/rutasCargo'));
app.use('/api/departamentos', require('./rutas/rutasDepartamento'));
app.use('/api/municipios', require('./rutas/rutasMunicipio'));
app.use('/api/ciudad', require('./rutas/rutasCiudad'));
app.use('/api/barrio', require('./rutas/rutasBarrio'));
app.use('/api/cliente', require('./rutas/rutasCliente'));
app.use('/api/clienteDireccion', require('./rutas/rutasClienteDireccion'));
app.use('/api/clienteTelefono', require('./rutas/rutasClienteTelefono'));
app.use('/api/empleado', require('./rutas/rutasEmpleado'));
app.listen(process.env.PORT, ()=>{
    console.log('Servidor iniciado en el puerto ' + process.env.PORT);
});


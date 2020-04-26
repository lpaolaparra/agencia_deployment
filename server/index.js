// importar express
const express = require('express');
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');
const configs = require('./config');
const db = require('./config/database');

require('dotenv').config({path:'variables.env'})

 db.authenticate()
     .then( () => console.log('DB conectada'))
     .catch(error=> console.log(error)) 

//configurar express
const app = express();

//habilitar pug
app.set('view engine','pug');
//añadir vistas
app.set('views',path.join(__dirname,'./views'));
//cargar carpeta estatica public
app.use(express.static('public'));

//validar si estamos en desarrollo o produccion
const config = configs[app.get('env')];

//creamos la variable para el sitio web
app.locals.titulo = config.nombresito;

//muestra el año actual y genera la ruta
app.use((req,res,next)=>{
    //crear nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    // retorna la ruta lo que esta despues de la diagonal
    res.locals.ruta = req.path;
    return next();
})
//Ejecutamos el body-parser para que se pueda leer los datos que vienen por post
app.use(bodyParser.urlencoded({extended:true}));
//cargar rutas
app.use('/',routes());

/** Puerto y host para la app */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port,host,()=>{
    console.log('El servidor esta funcionando');
});
import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import hotelRoutes from './routes/hotelRoutes';
import categoriaHabitacionRoutes from './routes/categoriaHabitacionRoutes';
import huespedRoutes from './routes/huespedRoutes';
import dosificacionRoutes from './routes/dosificacionRoutes';
import habitacionRoutes from './routes/habitacionRoutes';
import hospedajeRoutes from './routes/hospedajeRoutes';
import productoRoutes from './routes/productoRoutes';
import loginRoutes from './routes/loginRoutes';
import subirArchivosRoutes from './routes/subirArchivosRoutes';
import administradorRoutes from './routes/administradorRoutes';
import usuarioOpRoutes from './routes/usuarioOpRoutes';
import morgan from 'morgan';
import cors from 'cors';
import auth from './middlewares/autenticacion';
import fileUpload from 'express-fileupload';
import facturaRoutes from './routes/facturaRoutes';
import hospedajeHabitacionRoutes from './routes/hospedajeHabitacionRoutes';
import hospedajeProductoRoutes from './routes/hospedajeProductoRoutes';
import extraRoutes from './routes/extraRoutes';
import imageRoutes from './routes/imageRoutes';
//import fileUpload = require('express-fileupload');

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', 3000);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(fileUpload());
    }
    routes(): void {
        this.app.use('/',indexRoutes);
        //this.app.use('/api/hotel', auth, hotelRoutes);
        this.app.use('/api/hotel', hotelRoutes);
        this.app.use('/api/admin', auth, administradorRoutes);
        this.app.use('/api/usuarioop', auth, usuarioOpRoutes); 
        this.app.use('/api/categoriahabitacion',auth, categoriaHabitacionRoutes);
        this.app.use('/api/huesped', auth, huespedRoutes);
        this.app.use('/api/hospedaje', auth, hospedajeRoutes);
        this.app.use('/api/hospedajehabitacion', auth, hospedajeHabitacionRoutes);
        this.app.use('/api/hospedajeproducto', auth, hospedajeProductoRoutes);
        this.app.use('/api/extra', auth, extraRoutes);
        this.app.use('/api/factura', auth, facturaRoutes);
        this.app.use('/api/dosificacion', auth, dosificacionRoutes);
        this.app.use('/api/habitacion', auth, habitacionRoutes);
        this.app.use('/api/producto', auth, productoRoutes);
        this.app.use('/api/subir', auth, subirArchivosRoutes);
        this.app.use('/api/login', loginRoutes); 
        this.app.use('/api/image', imageRoutes);
    }
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server ();
server.start();
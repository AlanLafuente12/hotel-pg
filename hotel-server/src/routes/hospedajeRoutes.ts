import { Router } from 'express';
import { hospedajeController } from '../controllers/hospedajeController';

class HospedajeRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/list/:id', hospedajeController.listarHospedajes);
        this.router.get('/:id', hospedajeController.obtenerHospedaje);
        this.router.post('/', hospedajeController.crearHospedaje);
        this.router.delete('/:id', hospedajeController.eliminarHospedaje);
        this.router.put('/:id', hospedajeController.actualizarHospedaje);
        /*
        // Habitacion
        this.router.get('/habitacion/:idhosp', hospedajeController.obtenerHospedajeHabitaciones);
        this.router.post('/habitacion/', hospedajeController.crearHospedajeHabitacion);
        this.router.put('/habitacion/:idhospedajehabitacion', hospedajeController.actualizarHospedajeHabitacion);
        this.router.delete('/habitacion/:idhosp/:idhab', hospedajeController.eliminarHospedajeHabitacion);
        
        // Producto
        this.router.get('/producto/:idhosp', hospedajeController.obtenerHospedajeProductos);
        this.router.post('/producto/', hospedajeController.crearHospedajeProducto);
        this.router.put('producto/:idhospedajeproducto', hospedajeController.actualizarHospedajeProducto);
        this.router.delete('/producto/:idhosp/:idprod', hospedajeController.eliminarHospedajeProducto);
        */
        // Huesped
        this.router.get('/huesped/:idhosp', hospedajeController.obtenerHospedajeHuespedes);
        this.router.post('/huesped', hospedajeController.crearHospedajeHuesped);
        this.router.delete('/huesped/:idhosp/:idhues', hospedajeController.eliminarHospedajeHuesped);
    }

}

const hospedajeRoutes = new HospedajeRoutes();
export default hospedajeRoutes.router;
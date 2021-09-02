import { Router } from 'express';
import { hospedajeHabitacionController } from '../controllers/hospedajeHabitacionController';

class HospedajeHabitacionRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/:idhosp', hospedajeHabitacionController.obtenerHospedajeHabitaciones);
        this.router.post('/', hospedajeHabitacionController.crearHospedajeHabitacion);
        this.router.put('/', hospedajeHabitacionController.actualizarHospedajeHabitacion);
        this.router.delete('/:idhosp/:idhab', hospedajeHabitacionController.eliminarHospedajeHabitacion);
    }

}

const hospedajeHabitacionRoutes = new HospedajeHabitacionRoutes();
export default hospedajeHabitacionRoutes.router;
import { Router } from 'express';
import { habitacionController } from '../controllers/habitacionController';

class HabitacionRoutes {
    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void {
        this.router.get('/list/:id', habitacionController.listarHabitaciones);
        this.router.get('/list/libres/:id', habitacionController.listarHabitacionesLibres);
        this.router.get('/:id', habitacionController.obtenerHabitacion);
        this.router.post('/', habitacionController.crearHabitacion);
        this.router.delete('/:id', habitacionController.eliminarHabitacion);
        this.router.put('/:id', habitacionController.actualizarHabitacion);
    }

}

const habitacionRoutes = new HabitacionRoutes();
export default habitacionRoutes.router;
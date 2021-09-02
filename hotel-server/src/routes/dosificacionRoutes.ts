import { Router } from 'express';
import { dosificacionController } from '../controllers/dosificacionController';

class DosificacionRoutes {
    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void {
        this.router.get('/list/:idhotel', dosificacionController.listarDosificaciones);
        this.router.get('/last/:idhotel', dosificacionController.obtenerUltimaDosificacion);
        this.router.get('/:id', dosificacionController.obtenerDosificacion);
        this.router.post('/', dosificacionController.crearDosificacion);
        this.router.delete('/:id', dosificacionController.eliminarDosificacion);
    }

}

const dosificacionRoutes = new DosificacionRoutes();
export default dosificacionRoutes.router;
import { Router } from 'express';
import { extraController } from '../controllers/extraController';

class ExtraRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/:idhosp', extraController.obtenerExtras);
        this.router.post('/', extraController.crearExtra);
        this.router.put('/', extraController.actualizarExtra);
        this.router.delete('/:id', extraController.eliminarExtra);
    }

}

const extraRoutes = new ExtraRoutes();
export default extraRoutes.router;
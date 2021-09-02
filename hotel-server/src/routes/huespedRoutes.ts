import { Router } from 'express';
import { huespedController } from '../controllers/huespedController';
import auth from '../middlewares/autenticacion';

class HuespedRoutes {
    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void {
        this.router.get('/list/:id', huespedController.listarHuespedes);
        this.router.get('/:id', huespedController.obtenerHuesped);
        this.router.post('/', huespedController.crearHuesped);
        this.router.delete('/:id', huespedController.eliminarHuesped);
        this.router.put('/:id', huespedController.actualizarHuesped);
    }

}

const huespedRoutes = new HuespedRoutes();
export default huespedRoutes.router;
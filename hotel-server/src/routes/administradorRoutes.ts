import { Router } from 'express';
import { administradorController } from '../controllers/administradorController';
import auth from '../middlewares/autenticacion';

class AdministradorRoutes {
    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void {
        this.router.get('/', administradorController.listarAdmin);
        this.router.get('/:id', administradorController.obtenerAdmin);
        this.router.post('/', administradorController.crearAdmin);
        this.router.delete('/:id', administradorController.eliminarAdmin);
        this.router.put('/:id', administradorController.actualizarAdmin);
    }

}

const administradorRoutes = new AdministradorRoutes();
export default administradorRoutes.router;
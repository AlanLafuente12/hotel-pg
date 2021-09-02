import { Router } from 'express';
import { hospedajeProductoController } from '../controllers/hospedajeProductoController';

class HospedajeProductoRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/:idhosp', hospedajeProductoController.obtenerHospedajeProductos);
        this.router.post('/', hospedajeProductoController.crearHospedajeProducto);
        this.router.put('/', hospedajeProductoController.actualizarHospedajeProducto);
        this.router.delete('/:idhosp/:idprod', hospedajeProductoController.eliminarHospedajeProducto);
    }

}

const hospedajeProductoRoutes = new HospedajeProductoRoutes();
export default hospedajeProductoRoutes.router;
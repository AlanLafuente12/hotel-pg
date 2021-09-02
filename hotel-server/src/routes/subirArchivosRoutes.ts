import { Router } from 'express';
import { subirArchivosController } from '../controllers/subirArchivosController';

class SubirArchivosRoutes {
    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void {
        this.router.put('/imagenhotel/:idHotel', subirArchivosController.subirImagen);
    }
}

const subirArchivosRoutes = new SubirArchivosRoutes();
export default subirArchivosRoutes.router;
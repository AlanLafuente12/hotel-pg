import { Router } from 'express';
import { facturaController } from '../controllers/facturaController';

class FacturaRoutes {
    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void {
        this.router.get('/list/hotel/:id', facturaController.listarFacturasHotel);
        this.router.get('/list/hospedaje/:id', facturaController.listarFacturasHospedaje);
        this.router.get('/:id', facturaController.obtenerFactura);
        this.router.get('/detalles/:idfactura', facturaController.obtenerDetallesFactura);
        this.router.post('/', facturaController.crearFactura);
        this.router.put('/:id', facturaController.actualizarFactura);
        this.router.delete('/:idfactura', facturaController.anularFactura);
    }
}

const facturaRoutes = new FacturaRoutes();
export default facturaRoutes.router;
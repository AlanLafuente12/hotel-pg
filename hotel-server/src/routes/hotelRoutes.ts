import { Router } from 'express';
import { hotelController } from '../controllers/hotelController';
import auth from '../middlewares/autenticacion';

class HotelRoutes {
    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void {
        this.router.get('/', hotelController.listarHoteles);
        this.router.get('/:id', hotelController.obtenerHotel);
        this.router.post('/',auth, hotelController.crearHotel);
        this.router.delete('/:id',auth, hotelController.eliminarHotel);
        this.router.put('/:id', auth, hotelController.actualizarHotel);
    }
}

const hotelRoutes = new HotelRoutes();
export default hotelRoutes.router;
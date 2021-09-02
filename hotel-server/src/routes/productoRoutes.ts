import { Router } from 'express';
import { productoController } from '../controllers/productoController';

class ProductoRoutes {
    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void {
        this.router.get('/list/:id', productoController.listarProductos);
        this.router.get('/list/disponibles/:id', productoController.listarProductosDisponibles);
        this.router.get('/:id', productoController.obtenerProducto);
        this.router.post('/', productoController.crearProducto);
        this.router.delete('/:id', productoController.eliminarProducto);
        this.router.put('/:id', productoController.actualizarProducto);
    }

}

const productoRoutes = new ProductoRoutes();
export default productoRoutes.router;
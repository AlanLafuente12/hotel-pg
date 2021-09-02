import { Router } from 'express';
import { categoriaHabitacionController } from '../controllers/categoriaHabitacionController';

class CategoriaHabitacionRoutes {
    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void {
        this.router.get('/list/:id', categoriaHabitacionController.listarCategoriasHabitacion);
        this.router.get('/:id', categoriaHabitacionController.obtenerCategoriaHabitacion);
        this.router.post('/', categoriaHabitacionController.crearCategoriaHabitacion);
        this.router.delete('/:id', categoriaHabitacionController.eliminarCategoriaHabitacion);
        this.router.put('/:id', categoriaHabitacionController.actualizarCategoriaHabitacion);
    }

}

const categoriaHabitacionRoutes = new CategoriaHabitacionRoutes();
export default categoriaHabitacionRoutes.router;
import { Router } from 'express';
import { usuarioOpController } from '../controllers/usuarioOpController';
import auth from '../middlewares/autenticacion';


class UsuarioOpRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/dehotel/:id', usuarioOpController.listarUsuarioOpDeHotel);
        this.router.get('/gerentes', usuarioOpController.listarUsuarioOpGerente);
        this.router.get('/:id', usuarioOpController.obtenerUsuarioOp);
        this.router.post('/', usuarioOpController.crearUsuarioOp);
        this.router.delete('/:id', usuarioOpController.eliminarUsuarioOp);
        this.router.put('/:id', usuarioOpController.actualizarUsuarioOp);
    }

}

const usuarioOpRoutes = new UsuarioOpRoutes();
export default usuarioOpRoutes.router;
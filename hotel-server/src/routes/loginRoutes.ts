import { Router } from 'express';
import { loginController } from '../controllers/loginController';

class LoginRoutes {
    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void {
        this.router.post('/admin/', loginController.loginAdmin);
        this.router.put('/admin/reset/:id', loginController.cambiarPasswordAdmin);
        this.router.post('/', loginController.loginUser);
        this.router.put('/reset/:id', loginController.cambiarPasswordUser);
    }

}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;
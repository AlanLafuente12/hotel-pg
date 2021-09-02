import { Router } from 'express';
import { imageController } from '../controllers/imageController';

class ImageRoutes {
    public router: Router = Router();

    constructor(){
        this.config();

    }

    config(): void {
        this.router.get('/:nombreArchivo', imageController.getImage);
    }
}

const imageRoutes = new ImageRoutes();
export default imageRoutes.router;
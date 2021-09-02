import { Request, Response } from 'express';
const path = require('path');
const fs = require('fs');

class ImageController {
    
    public async getImage (req: Request, res: Response): Promise<any>{
        // obtener el nombre del archivo
        const { nombreArchivo } = req.params;
        var imagePath = path.resolve(__dirname, `../../uploaded/`, nombreArchivo);
        // verificar si existe
        if (fs.existsSync(imagePath)){
            // si existe enviar la imagen
            res.sendFile(imagePath);
        }else{
            // si no existe enviar una imagen por defecto
            var noImagePath = path.resolve(__dirname, `../../uploaded/noimage.png`);
            res.sendFile(noImagePath);
        }
    }
}

export const imageController = new ImageController();
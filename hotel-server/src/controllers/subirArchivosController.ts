import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
//import fileUpload = require('express-fileupload');
//type UploadedFile = fileUpload.UploadedFile;
const mysqlConnection = require('../database');

class SubirArchivosController {
    public async subirImagen (req: Request, res: Response): Promise<any> {
        try {
            var idHotel  = req.params.idHotel;

    	    if (!req.files)
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No selecciono ningun archivo',
                    error: { message: 'Debe seleccionar una image'}
                });

            var file = req.files.uploaded_image as UploadedFile;
            var splitfilename = file.name.split('.');
            var filetype = splitfilename[splitfilename.length-1];
            var validfiletypes = ['png', 'jpg', 'gif'];

            if(validfiletypes.indexOf(filetype) < 0)
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Extension de archivo no valida',
                    error: { message: 'Las extensiones validas son '+validfiletypes.join(', ')}
                });

            var filename = `hotel-${idHotel}.png`; // ${filetype}
            
            file.mv('uploaded/'+filename, function(err: any) {    
                if (err)
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al mover archivo',
                        error: err
                    });
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Archivo subido con exito',
                    extensionArchivo: filetype
                });
            });

        } catch (error) {
            res.status(500).json(error);

        }
    }
/*
    public async subirImagen (req: Request, res: Response): Promise<any> {
        try {
    	    if (!req.files)
                return res.status(400).send('Ningun archivo fue subido');
            var file = req.files.uploaded_image as UploadedFile;
            console.log(file.name);

            if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
                await file.mv('uploaded/'+file.name, function(err: any) {    
                    if (err)
                        return res.status(500).send(err);
                    return res.status(200).json({message:'Archivo subido con exito'});
                });
            } else {
                res.json({message:'Formato no permitido, solo imagenes con extension .png .jpg'});
            }
        } catch (error) {
            res.status(500).json(error);

        }
    }*/
    
}

export const subirArchivosController = new SubirArchivosController();
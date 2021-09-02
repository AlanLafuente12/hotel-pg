"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirArchivosController = void 0;
//import fileUpload = require('express-fileupload');
//type UploadedFile = fileUpload.UploadedFile;
const mysqlConnection = require('../database');
class SubirArchivosController {
    subirImagen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var idHotel = req.params.idHotel;
                if (!req.files)
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'No selecciono ningun archivo',
                        error: { message: 'Debe seleccionar una image' }
                    });
                var file = req.files.uploaded_image;
                var splitfilename = file.name.split('.');
                var filetype = splitfilename[splitfilename.length - 1];
                var validfiletypes = ['png', 'jpg', 'gif'];
                if (validfiletypes.indexOf(filetype) < 0)
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Extension de archivo no valida',
                        error: { message: 'Las extensiones validas son ' + validfiletypes.join(', ') }
                    });
                var filename = `hotel-${idHotel}.png`; // ${filetype}
                file.mv('uploaded/' + filename, function (err) {
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
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.subirArchivosController = new SubirArchivosController();

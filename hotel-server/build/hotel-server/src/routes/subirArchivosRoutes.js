"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subirArchivosController_1 = require("../controllers/subirArchivosController");
class SubirArchivosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.put('/imagenhotel/:idHotel', subirArchivosController_1.subirArchivosController.subirImagen);
    }
}
const subirArchivosRoutes = new SubirArchivosRoutes();
exports.default = subirArchivosRoutes.router;

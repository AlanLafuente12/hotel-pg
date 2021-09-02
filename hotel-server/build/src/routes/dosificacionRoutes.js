"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dosificacionController_1 = require("../controllers/dosificacionController");
class DosificacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', dosificacionController_1.dosificacionController.listarDosificaciones);
        this.router.get('/:id', dosificacionController_1.dosificacionController.obtenerDosificacion);
        this.router.post('/', dosificacionController_1.dosificacionController.crearDosificacion);
        this.router.delete('/:id', dosificacionController_1.dosificacionController.eliminarDosificacion);
    }
}
const dosificacionRoutes = new DosificacionRoutes();
exports.default = dosificacionRoutes.router;

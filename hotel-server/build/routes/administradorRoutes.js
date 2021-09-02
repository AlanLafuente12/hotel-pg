"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const administradorController_1 = require("../controllers/administradorController");
class AdministradorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', administradorController_1.administradorController.listarAdmin);
        this.router.get('/:id', administradorController_1.administradorController.obtenerAdmin);
        this.router.post('/', administradorController_1.administradorController.crearAdmin);
        this.router.delete('/:id', administradorController_1.administradorController.eliminarAdmin);
        this.router.put('/:id', administradorController_1.administradorController.actualizarAdmin);
    }
}
const administradorRoutes = new AdministradorRoutes();
exports.default = administradorRoutes.router;

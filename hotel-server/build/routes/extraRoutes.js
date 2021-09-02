"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const extraController_1 = require("../controllers/extraController");
class ExtraRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:idhosp', extraController_1.extraController.obtenerExtras);
        this.router.post('/', extraController_1.extraController.crearExtra);
        this.router.put('/', extraController_1.extraController.actualizarExtra);
        this.router.delete('/:id', extraController_1.extraController.eliminarExtra);
    }
}
const extraRoutes = new ExtraRoutes();
exports.default = extraRoutes.router;

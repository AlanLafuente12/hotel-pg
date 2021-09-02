"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const huespedController_1 = require("../controllers/huespedController");
class HuespedRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/list/:id', huespedController_1.huespedController.listarHuespedes);
        this.router.get('/:id', huespedController_1.huespedController.obtenerHuesped);
        this.router.post('/', huespedController_1.huespedController.crearHuesped);
        this.router.delete('/:id', huespedController_1.huespedController.eliminarHuesped);
        this.router.put('/:id', huespedController_1.huespedController.actualizarHuesped);
    }
}
const huespedRoutes = new HuespedRoutes();
exports.default = huespedRoutes.router;

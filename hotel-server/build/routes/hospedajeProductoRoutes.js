"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hospedajeProductoController_1 = require("../controllers/hospedajeProductoController");
class HospedajeProductoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:idhosp', hospedajeProductoController_1.hospedajeProductoController.obtenerHospedajeProductos);
        this.router.post('/', hospedajeProductoController_1.hospedajeProductoController.crearHospedajeProducto);
        this.router.put('/', hospedajeProductoController_1.hospedajeProductoController.actualizarHospedajeProducto);
        this.router.delete('/:idhosp/:idprod', hospedajeProductoController_1.hospedajeProductoController.eliminarHospedajeProducto);
    }
}
const hospedajeProductoRoutes = new HospedajeProductoRoutes();
exports.default = hospedajeProductoRoutes.router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facturaController_1 = require("../controllers/facturaController");
class FacturaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/list/hotel/:id', facturaController_1.facturaController.listarFacturasHotel);
        this.router.get('/list/hospedaje/:id', facturaController_1.facturaController.listarFacturasHospedaje);
        this.router.get('/:id', facturaController_1.facturaController.obtenerFactura);
        this.router.get('/detalles/:idfactura', facturaController_1.facturaController.obtenerDetallesFactura);
        this.router.post('/', facturaController_1.facturaController.crearFactura);
        this.router.put('/:id', facturaController_1.facturaController.actualizarFactura);
        this.router.delete('/:idfactura', facturaController_1.facturaController.anularFactura);
    }
}
const facturaRoutes = new FacturaRoutes();
exports.default = facturaRoutes.router;

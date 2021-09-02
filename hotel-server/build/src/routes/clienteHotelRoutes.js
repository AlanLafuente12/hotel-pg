"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteHotelController_1 = require("../controllers/clienteHotelController");
class ClienteHotelRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', clienteHotelController_1.clienteHotelController.listarClientes);
        this.router.get('/:id', clienteHotelController_1.clienteHotelController.obtenerCliente);
        this.router.post('/', clienteHotelController_1.clienteHotelController.crearCliente);
        this.router.delete('/:id', clienteHotelController_1.clienteHotelController.eliminarCliente);
        this.router.put('/:id', clienteHotelController_1.clienteHotelController.actualizarCliente);
    }
}
const clienteHotelRoutes = new ClienteHotelRoutes();
exports.default = clienteHotelRoutes.router;

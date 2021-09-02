"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoController_1 = require("../controllers/productoController");
class ProductoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', productoController_1.productoController.listarProductos);
        this.router.get('/:id', productoController_1.productoController.obtenerProducto);
        this.router.post('/', productoController_1.productoController.crearProducto);
        this.router.delete('/:id', productoController_1.productoController.eliminarProducto);
        this.router.put('/:id', productoController_1.productoController.actualizarProducto);
    }
}
const productoRoutes = new ProductoRoutes();
exports.default = productoRoutes.router;

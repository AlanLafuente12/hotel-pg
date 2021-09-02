"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaHabitacionController_1 = require("../controllers/categoriaHabitacionController");
class CategoriaHabitacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', categoriaHabitacionController_1.categoriaHabitacionController.listarCategoriasHabitacion);
        this.router.get('/:id', categoriaHabitacionController_1.categoriaHabitacionController.obtenerCategoriaHabitacion);
        this.router.post('/', categoriaHabitacionController_1.categoriaHabitacionController.crearCategoriaHabitacion);
        this.router.delete('/:id', categoriaHabitacionController_1.categoriaHabitacionController.eliminarCategoriaHabitacion);
        this.router.put('/:id', categoriaHabitacionController_1.categoriaHabitacionController.actualizarCategoriaHabitacion);
    }
}
const categoriaHabitacionRoutes = new CategoriaHabitacionRoutes();
exports.default = categoriaHabitacionRoutes.router;

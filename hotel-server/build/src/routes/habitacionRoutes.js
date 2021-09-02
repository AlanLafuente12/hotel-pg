"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habitacionController_1 = require("../controllers/habitacionController");
class HabitacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', habitacionController_1.habitacionController.listarHabitaciones);
        this.router.get('/:id', habitacionController_1.habitacionController.obtenerHabitacion);
        this.router.post('/', habitacionController_1.habitacionController.crearHabitacion);
        this.router.delete('/:id', habitacionController_1.habitacionController.eliminarHabitacion);
        this.router.put('/:id', habitacionController_1.habitacionController.actualizarHabitacion);
    }
}
const habitacionRoutes = new HabitacionRoutes();
exports.default = habitacionRoutes.router;

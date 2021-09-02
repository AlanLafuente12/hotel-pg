"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hospedajeHabitacionController_1 = require("../controllers/hospedajeHabitacionController");
class HospedajeHabitacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:idhosp', hospedajeHabitacionController_1.hospedajeHabitacionController.obtenerHospedajeHabitaciones);
        this.router.post('/', hospedajeHabitacionController_1.hospedajeHabitacionController.crearHospedajeHabitacion);
        this.router.put('/', hospedajeHabitacionController_1.hospedajeHabitacionController.actualizarHospedajeHabitacion);
        this.router.delete('/:idhosp/:idhab', hospedajeHabitacionController_1.hospedajeHabitacionController.eliminarHospedajeHabitacion);
    }
}
const hospedajeHabitacionRoutes = new HospedajeHabitacionRoutes();
exports.default = hospedajeHabitacionRoutes.router;

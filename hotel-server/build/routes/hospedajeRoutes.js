"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hospedajeController_1 = require("../controllers/hospedajeController");
class HospedajeRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/list/:id', hospedajeController_1.hospedajeController.listarHospedajes);
        this.router.get('/:id', hospedajeController_1.hospedajeController.obtenerHospedaje);
        this.router.post('/', hospedajeController_1.hospedajeController.crearHospedaje);
        this.router.delete('/:id', hospedajeController_1.hospedajeController.eliminarHospedaje);
        this.router.put('/:id', hospedajeController_1.hospedajeController.actualizarHospedaje);
        /*
        // Habitacion
        this.router.get('/habitacion/:idhosp', hospedajeController.obtenerHospedajeHabitaciones);
        this.router.post('/habitacion/', hospedajeController.crearHospedajeHabitacion);
        this.router.put('/habitacion/:idhospedajehabitacion', hospedajeController.actualizarHospedajeHabitacion);
        this.router.delete('/habitacion/:idhosp/:idhab', hospedajeController.eliminarHospedajeHabitacion);
        
        // Producto
        this.router.get('/producto/:idhosp', hospedajeController.obtenerHospedajeProductos);
        this.router.post('/producto/', hospedajeController.crearHospedajeProducto);
        this.router.put('producto/:idhospedajeproducto', hospedajeController.actualizarHospedajeProducto);
        this.router.delete('/producto/:idhosp/:idprod', hospedajeController.eliminarHospedajeProducto);
        */
        // Huesped
        this.router.get('/huesped/:idhosp', hospedajeController_1.hospedajeController.obtenerHospedajeHuespedes);
        this.router.post('/huesped', hospedajeController_1.hospedajeController.crearHospedajeHuesped);
        this.router.delete('/huesped/:idhosp/:idhues', hospedajeController_1.hospedajeController.eliminarHospedajeHuesped);
    }
}
const hospedajeRoutes = new HospedajeRoutes();
exports.default = hospedajeRoutes.router;

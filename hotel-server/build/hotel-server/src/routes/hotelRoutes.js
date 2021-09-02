"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotelController_1 = require("../controllers/hotelController");
class HotelRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', hotelController_1.hotelController.listarHoteles);
        this.router.get('/:id', hotelController_1.hotelController.obtenerHotel);
        this.router.post('/', hotelController_1.hotelController.crearHotel);
        this.router.delete('/:id', hotelController_1.hotelController.eliminarHotel);
        this.router.put('/:id', hotelController_1.hotelController.actualizarHotel);
    }
}
const hotelRoutes = new HotelRoutes();
exports.default = hotelRoutes.router;

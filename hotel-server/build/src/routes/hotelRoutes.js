"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotelController_1 = require("../controllers/hotelController");
const autenticacion_1 = __importDefault(require("../middlewares/autenticacion"));
class HotelRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', autenticacion_1.default, hotelController_1.hotelController.listarHoteles);
        this.router.get('/:id', autenticacion_1.default, hotelController_1.hotelController.obtenerHotel);
        this.router.post('/', autenticacion_1.default, hotelController_1.hotelController.crearHotel);
        this.router.delete('/:id', autenticacion_1.default, hotelController_1.hotelController.eliminarHotel);
        this.router.put('/:id', autenticacion_1.default, hotelController_1.hotelController.actualizarHotel);
    }
}
const hotelRoutes = new HotelRoutes();
exports.default = hotelRoutes.router;

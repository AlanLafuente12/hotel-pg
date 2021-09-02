"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HotelRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('Hello from HotelRotes'));
    }
}
const hotelRoutes = new HotelRoutes();
exports.default = hotelRoutes.router;

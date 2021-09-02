"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageController_1 = require("../controllers/imageController");
class ImageRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:nombreArchivo', imageController_1.imageController.getImage);
    }
}
const imageRoutes = new ImageRoutes();
exports.default = imageRoutes.router;

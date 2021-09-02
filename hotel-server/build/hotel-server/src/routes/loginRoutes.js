"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
class LoginRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/admin/', loginController_1.loginController.loginAdmin);
        this.router.put('/admin/reset/:id', loginController_1.loginController.cambiarPasswordAdmin);
        this.router.post('/', loginController_1.loginController.loginUser);
        this.router.put('/reset/:id', loginController_1.loginController.cambiarPasswordUser);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;

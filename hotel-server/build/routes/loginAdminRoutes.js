"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginAdminController_1 = require("../controllers/loginAdminController");
class LoginRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', loginAdminController_1.loginAdminController.loginAdmin);
        this.router.put('/reset/:id', loginAdminController_1.loginAdminController.cambiarPasswordAdmin);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;

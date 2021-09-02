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
        this.router.get('/', loginController_1.loginController.loginAdmin);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;

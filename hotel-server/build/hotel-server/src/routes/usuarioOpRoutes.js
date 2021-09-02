"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioOpController_1 = require("../controllers/usuarioOpController");
class UsuarioOpRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/empleados/:id', usuarioOpController_1.usuarioOpController.listarUsuarioOpEmpleados);
        this.router.get('/gerentes', usuarioOpController_1.usuarioOpController.listarUsuarioOpGerentes);
        this.router.get('/:id', usuarioOpController_1.usuarioOpController.obtenerUsuarioOp);
        this.router.post('/', usuarioOpController_1.usuarioOpController.crearUsuarioOp);
        this.router.delete('/:id', usuarioOpController_1.usuarioOpController.eliminarUsuarioOp);
        this.router.put('/:id', usuarioOpController_1.usuarioOpController.actualizarUsuarioOp);
    }
}
const usuarioOpRoutes = new UsuarioOpRoutes();
exports.default = usuarioOpRoutes.router;

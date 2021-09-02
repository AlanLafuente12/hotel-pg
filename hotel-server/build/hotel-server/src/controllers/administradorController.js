"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.administradorController = void 0;
const mysqlConnection = require('../database');
var validator = require('validator');
var bcrypt = require('bcrypt');
class AdministradorController {
    listarAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mysqlConnection.query("select * from administrador where estado = 'a'", (error, result) => {
                    if (error)
                        return result.status(500).json(error);
                    return res.status(200).json(result);
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    obtenerAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("select * from administrador where id_administrador = ? and estado = 'a'", [id], (error, result) => {
                    if (error)
                        return res.status(500).json(error);
                    if (result.length > 0)
                        return res.status(200).json(result[0]);
                    return res.status(404).json({ message: 'No se encuentra el admin' });
                });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    crearAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                var nombre_usuario = req.body.nombre_usuario;
                var password = req.body.password;
                var validate_nombre_usuario = !validator.isEmpty(nombre_usuario);
                var validate_password = !validator.isEmpty(password);
                if (validate_nombre_usuario && validate_password) {
                    existeAdmin(nombre_usuario, res)
                        .then(existe => {
                        if (existe) {
                            return res.status(200).send({
                                ok: false,
                                mensaje: "El nombre de usuario ya se encuentra en uso"
                            });
                        }
                        else {
                            var password_encriptado = bcrypt.hashSync(password, 10);
                            mysqlConnection.query("insert into administrador (nombre_usuario, password) values (?, ?);", [nombre_usuario, password_encriptado], (error, result) => {
                                if (error)
                                    res.status(500).json(error);
                                res.json({ message: 'Admin creado' });
                            });
                        }
                    });
                }
                else {
                    return res.status(200).send({
                        ok: false,
                        message: "Datos incorrectos"
                    });
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    eliminarAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield mysqlConnection.query("update administrador set estado = 'e' where id_administrador = ?", [id], (error, result) => {
                    if (error)
                        res.status(500).json(error);
                    res.json({ message: 'Admin eliminado' });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    actualizarAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            try {
                var nombre_usuario = req.body.nombre_usuario;
                var validate_nombre_usuario = !validator.isEmpty(nombre_usuario);
                if (validate_nombre_usuario) {
                    existeAdmin(nombre_usuario, res)
                        .then(existe => {
                        if (existe) {
                            return res.status(200).send({
                                ok: false,
                                mensaje: "El nombre de usuario ya se encuentra en uso"
                            });
                        }
                        else {
                            mysqlConnection.query("update administrador set nombre_usuario = ? where id_administrador = ?", [nombre_usuario, id], (error, result) => {
                                if (error)
                                    res.status(500).json(error);
                                res.json({ message: 'Admin actualizado' });
                            });
                        }
                    });
                }
                else {
                    return res.status(200).send({
                        ok: false,
                        message: "Datos incorrectos"
                    });
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
function existeAdmin(nombre_usuario, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield new Promise((resolve, reject) => {
                mysqlConnection.query("select * from administrador where nombre_usuario = ?", nombre_usuario, (error, result) => {
                    if (error) {
                        return res.status(500).send({
                            ok: false,
                            message: "Error al verificar el nombre de usuario"
                        });
                    }
                    if (result.length > 0) {
                        resolve(true);
                    }
                    resolve(false);
                });
            });
        }
        catch (error) {
            res.status(500).json(error);
        }
    });
}
exports.administradorController = new AdministradorController();
